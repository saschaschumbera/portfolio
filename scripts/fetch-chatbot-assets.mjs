// Provisions the in-browser chatbot model + ONNX runtime into /public.
//
// These files are ~150 MB total and exceed GitHub's 100 MB/file limit, so they
// are NOT committed. This script fetches them on demand and is wired into the
// predev/prebuild npm hooks, so local dev and the Vercel build both populate
// them automatically. Idempotent: existing files are skipped.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const MODEL = "Xenova/multilingual-e5-small";
const modelDir = path.join(root, "public", "models", MODEL);
const ortDir = path.join(root, "public", "ort");
const base = `https://huggingface.co/${MODEL}/resolve/main`;

// Tokenizer/config + the int8-quantised ONNX weights the browser loads.
const modelFiles = [
  "config.json",
  "tokenizer.json",
  "tokenizer_config.json",
  "special_tokens_map.json",
  "onnx/model_quantized.onnx",
];

// onnxruntime-web runtime, served from our own domain to satisfy CSP
// connect-src. ORT picks one build variant at runtime (e.g. .asyncify for
// single-threaded wasm) and fetches both its .mjs loader and .wasm from here,
// so we ship every ort-wasm-* file to cover whichever it chooses.
const ortSrc = path.join(root, "node_modules", "onnxruntime-web", "dist");
const wasmFiles = fs.existsSync(ortSrc)
  ? fs.readdirSync(ortSrc).filter((f) => /^ort-wasm-.*\.(mjs|wasm)$/.test(f))
  : [];

async function download(url, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return fs.statSync(dest).size;
}

let changed = false;

for (const f of modelFiles) {
  const dest = path.join(modelDir, f);
  if (fs.existsSync(dest)) continue;
  const bytes = await download(`${base}/${f}`, dest);
  console.log(`↓ model/${f} (${(bytes / 1e6).toFixed(1)} MB)`);
  changed = true;
}

for (const f of wasmFiles) {
  const dest = path.join(ortDir, f);
  if (fs.existsSync(dest)) continue;
  const src = path.join(ortSrc, f);
  if (!fs.existsSync(src)) {
    console.warn(`! ${f} not found in node_modules — run npm install first`);
    continue;
  }
  fs.mkdirSync(ortDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`⎘ ort/${f}`);
  changed = true;
}

console.log(changed ? "Chatbot assets ready." : "Chatbot assets already present.");
