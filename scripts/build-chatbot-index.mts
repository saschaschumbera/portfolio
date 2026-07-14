// Precomputes the semantic chatbot's passage embeddings at build time.
//
// The browser previously embedded all intent phrasings itself after the model
// download, which delayed "ready" by several seconds on slow devices. This
// script runs the same model in Node (run via tsx, wired into predev/prebuild
// after fetch-chatbot-assets.mjs) and writes the vectors to
// public/models/chatbot-index.json, which chatbotSemantic.ts fetches instead.
// Texts missing from the JSON (stale index) are still embedded in the browser.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline, env } from "@huggingface/transformers";
import { RULES, RULES_EN, type Rule } from "../src/components/chatbotKnowledge";
import { INTENT_QUESTIONS, INTENT_QUESTIONS_EN } from "../src/components/chatbotIntents";

const MODEL_ID = "Xenova/multilingual-e5-small";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const modelsDir = path.join(root, "public", "models");
const outFile = path.join(modelsDir, "chatbot-index.json");

// Same selection as buildEntries() in chatbotSemantic.ts: only phrasings whose
// intent key still matches a rule end up in the runtime index.
function collectTexts(rules: Rule[], intents: Record<string, string[]>): string[] {
  const texts: string[] = [];
  for (const [key, questions] of Object.entries(intents)) {
    if (!rules.some((r) => r.keywords.includes(key))) continue;
    texts.push(...questions);
  }
  return texts;
}

const texts = [...new Set([
  ...collectTexts(RULES, INTENT_QUESTIONS),
  ...collectTexts(RULES_EN, INTENT_QUESTIONS_EN),
])];

// Skip when the output is newer than everything it depends on (local dev
// restarts; a fresh CI checkout never has the gitignored output file).
const sources = [
  fileURLToPath(import.meta.url),
  path.join(root, "src", "components", "chatbotKnowledge.ts"),
  path.join(root, "src", "components", "chatbotIntents.ts"),
];
if (fs.existsSync(outFile)) {
  const outMtime = fs.statSync(outFile).mtimeMs;
  if (sources.every((f) => fs.statSync(f).mtimeMs < outMtime)) {
    console.log("Chatbot index up to date.");
    process.exit(0);
  }
}

// Same weights the browser uses (fetched into /public by the fetch script).
env.allowRemoteModels = false;
env.allowLocalModels = true;
env.localModelPath = modelsDir;

const extractor = await pipeline("feature-extraction", MODEL_ID, { dtype: "q8" });

// Same embedding recipe as the runtime: "passage: " prefix, mean pooling,
// L2-normalised. 5 decimals keep the JSON small; the cosine error is < 1e-4.
const output = await extractor(texts.map((t) => `passage: ${t}`), { pooling: "mean", normalize: true });
const vecs = output.tolist() as number[][];

const vectors: Record<string, number[]> = {};
texts.forEach((t, i) => {
  vectors[t] = vecs[i].map((v) => Math.round(v * 1e5) / 1e5);
});

fs.writeFileSync(outFile, JSON.stringify({ model: MODEL_ID, vectors }));
const kb = (fs.statSync(outFile).size / 1024).toFixed(0);
console.log(`Chatbot index built: ${texts.length} passages, ${kb} KB.`);
