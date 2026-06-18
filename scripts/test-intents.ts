// Validates the real intent set (chatbotIntents.ts) against a broad question
// catalogue, using the actual rules for answers. Run: npx tsx scripts/test-intents.ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline, env } from "@huggingface/transformers";
import { RULES } from "../src/components/chatbotKnowledge";
import { INTENT_QUESTIONS } from "../src/components/chatbotIntents";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
env.allowRemoteModels = false;
env.allowLocalModels = true;
(env as { localModelPath: string }).localModelPath = path.join(__dirname, "..", "public", "models");

const THRESHOLD = 0.84;

// Build index: every canonical question -> the intent key it belongs to.
const entries: { key: string; text: string }[] = [];
for (const [key, questions] of Object.entries(INTENT_QUESTIONS)) {
  const rule = RULES.find((r) => r.keywords.includes(key));
  if (!rule) { console.log(`!! intent key has no rule: ${key}`); continue; }
  for (const text of questions) entries.push({ key, text });
}

// [question, expected intent key | "FALLBACK"]
const tests: [string, string][] = [
  ["Was kann er programmieren?", "skill"],
  ["Welche Tools nutzt er für KI?", "skill"],
  ["Wo hat er überall gearbeitet?", "erfahrung"],
  ["Erzähl mir von seiner Laufbahn", "erfahrung"],
  ["Wie nehme ich Kontakt auf?", "kontakt"],
  ["Wie schreibe ich ihm eine Mail?", "kontakt"],
  ["An welcher Uni ist er?", "studium"],
  ["Was lernt er im Studium?", "studium"],
  ["Was hat er mit Banken zu tun?", "finanz"],
  ["Hat er im Kreditbereich gearbeitet?", "finanz"],
  ["Versteht er etwas von Machine Learning?", "ki"],
  ["Arbeitet er mit Sprachmodellen?", "ki"],
  ["Wo lebt er?", "standort"],
  ["Was hebt ihn von anderen ab?", "besonders"],
  ["Wie tickt er als Person?", "soft skill"],
  ["Spricht er Englisch?", "sprache"],
  ["Woran arbeitet er momentan?", "aktuell"],
  ["Was sind seine aktuellen Projekte?", "projekt"],
  ["Beherrscht er React?", "typescript"],
  ["Kann er Dashboards bauen?", "power bi"],
  ["Baut er Agenten-Systeme?", "langgraph"],
  ["Kann er KI lokal ohne Cloud laufen lassen?", "lokal"],
  ["Sucht er gerade eine neue Stelle?", "verfügbar"],
  ["Wo ist sein GitHub?", "github"],
  ["Bekomme ich seinen Lebenslauf?", "lebenslauf"],
  // project questions
  ["Hat er eine App für Verträge gebaut?", "vertragsverwaltung"],
  ["Was ist der Obsidian-Agent?", "obsidian"],
  ["Hat er etwas mit RAG und Vektordatenbanken gemacht?", "obsidian"],
  ["Hat er einen agentischen Assistenten gebaut?", "telegram"],
  ["Hat er ein KI-Notiztool gebaut?", "smart-notes"],
  ["Hat er eine Spiel-KI programmiert?", "battlesnake"],
  ["Hat er einen Bot mit Bilderkennung gebaut?", "sadidauto"],
  ["Hat er KI-Videos automatisiert?", "tiktok"],
  ["Welche eigenen Projekte hat er gebaut?", "projekt"],
  // off-topic -> should fall through (FALLBACK)
  ["Was ist die Hauptstadt von Frankreich?", "FALLBACK"],
  ["Erzähl mir einen Witz", "FALLBACK"],
];

const dot = (a: number[], b: number[]) => a.reduce((s, v, i) => s + v * b[i], 0);

async function main() {
  const extractor = await pipeline("feature-extraction", "Xenova/multilingual-e5-small", { dtype: "q8" });
  const embed = async (t: string[]) =>
    (await (extractor as any)(t, { pooling: "mean", normalize: true })).tolist() as number[][];

  const vecs = await embed(entries.map((e) => `passage: ${e.text}`));

  let correct = 0;
  for (const [q, expected] of tests) {
    const [qv] = await embed([`query: ${q}`]);
    let best = -1, bestScore = -Infinity;
    vecs.forEach((v, i) => { const s = dot(qv, v); if (s > bestScore) { bestScore = s; best = i; } });
    const got = bestScore >= THRESHOLD ? entries[best].key : "FALLBACK";
    const ok = got === expected;
    if (ok) correct++;
    console.log(`${ok ? "OK " : "XX "} ${bestScore.toFixed(3)} want=${expected.padEnd(10)} got=${got.padEnd(10)} "${q}"`);
  }
  console.log(`\n-> ${correct}/${tests.length} correct (threshold ${THRESHOLD})`);
}

main();
