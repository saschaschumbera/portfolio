// Semantic matching layer for the chatbot.
//
// This upgrades the keyword matcher (chatbotKnowledge.ts) to meaning-based
// retrieval: the user's question is compared against a set of canonical
// question phrasings (chatbotIntents.ts), and the closest one decides which
// rule answers — instead of requiring a literal keyword hit.
//
// Everything runs locally in the visitor's browser via Transformers.js. The
// model and the ONNX/WASM runtime are served from this site's own /public
// folder, so no external request is made (keeps the strict CSP `connect-src
// 'self'` intact).

import { RULES, RULES_EN, type Rule } from "./chatbotKnowledge";
import { INTENT_QUESTIONS, INTENT_QUESTIONS_EN } from "./chatbotIntents";

// Multilingual model (DE + EN), int8-quantised → ~112 MB, lazy-loaded.
const MODEL_ID = "Xenova/multilingual-e5-small";

// Below this cosine similarity we don't trust the best match and let the
// keyword matcher try instead. Calibrated against e5 scores (real matches land
// ~0.89–0.95, off-topic questions ~0.81).
const SIMILARITY_THRESHOLD = 0.84;

type FeatureExtractor = (
  text: string | string[],
  options: { pooling: "mean"; normalize: boolean },
) => Promise<{ tolist: () => number[][] }>;

// One searchable phrasing and the answer it maps to.
type Entry = { text: string; answer: string };

let extractor: FeatureExtractor | null = null;
let indexDE: { entries: Entry[]; vecs: number[][] } = { entries: [], vecs: [] };
let indexEN: { entries: Entry[]; vecs: number[][] } = { entries: [], vecs: [] };
let initPromise: Promise<void> | null = null;
let ready = false;

export function isSemanticReady(): boolean {
  return ready;
}

// e5 models are trained with explicit "query:" / "passage:" prefixes.
const asQuery = (text: string) => `query: ${text}`;
const asPassage = (text: string) => `passage: ${text}`;

// Map each intent's question phrasings to the answer of the rule it identifies.
function buildEntries(rules: Rule[], intents: Record<string, string[]>): Entry[] {
  const entries: Entry[] = [];
  for (const [key, questions] of Object.entries(intents)) {
    const rule = rules.find((r) => r.keywords.includes(key));
    if (!rule) continue; // intent key no longer matches a rule — skip defensively
    for (const text of questions) entries.push({ text, answer: rule.answer });
  }
  return entries;
}

async function embed(texts: string[]): Promise<number[][]> {
  if (!extractor) throw new Error("extractor not initialised");
  const output = await extractor(texts, { pooling: "mean", normalize: true });
  return output.tolist();
}

// Loads the model + precomputes the question index once. Safe to call repeatedly.
export function initSemantic(): Promise<void> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const { pipeline, env } = await import("@huggingface/transformers");

    // Serve model + runtime from our own domain only.
    env.allowRemoteModels = false;
    env.allowLocalModels = true;
    env.localModelPath = "/models/";
    const wasm = env.backends?.onnx?.wasm;
    if (wasm) {
      wasm.wasmPaths = "/ort/";
      // No cross-origin isolation (no COEP header) → no SharedArrayBuffer →
      // single-threaded WASM. The model is tiny, so this is plenty fast.
      wasm.numThreads = 1;
    }

    // dtype "q8" → loads the int8 model_quantized.onnx we ship; device "wasm"
    // runs on CPU everywhere (no WebGPU requirement).
    extractor = (await pipeline("feature-extraction", MODEL_ID, {
      dtype: "q8",
      device: "wasm",
    })) as unknown as FeatureExtractor;

    const entriesDE = buildEntries(RULES, INTENT_QUESTIONS);
    const entriesEN = buildEntries(RULES_EN, INTENT_QUESTIONS_EN);
    indexDE = { entries: entriesDE, vecs: await embed(entriesDE.map((e) => asPassage(e.text))) };
    indexEN = { entries: entriesEN, vecs: await embed(entriesEN.map((e) => asPassage(e.text))) };

    ready = true;
  })();

  return initPromise;
}

function dot(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum; // vectors are L2-normalised → dot product == cosine similarity
}

// Returns the best matching answer, or null when nothing is confidently close
// (the caller then falls back to keyword matching). Assumes initSemantic() has
// completed (isSemanticReady() === true).
export async function semanticAnswer(input: string, isEN: boolean): Promise<string | null> {
  const { entries, vecs } = isEN ? indexEN : indexDE;
  if (entries.length === 0) return null;

  const [queryVec] = await embed([asQuery(input)]);

  let bestIdx = -1;
  let bestScore = -Infinity;
  for (let i = 0; i < vecs.length; i++) {
    const score = dot(queryVec, vecs[i]);
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }

  if (bestIdx === -1 || bestScore < SIMILARITY_THRESHOLD) return null;
  return entries[bestIdx].answer;
}
