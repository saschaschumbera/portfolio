import type { Metadata } from "next";
import PapierkramOrakelCaseStudy from "@/components/case-studies/PapierkramOrakel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "Case Study: Papierkram-Orakel | Sascha Schumbera",
  description:
    "Deep dive into a local RAG system for household paperwork: hybrid search (sqlite-vec + BM25 with Reciprocal Rank Fusion), cross-encoder reranking, Tesseract OCR fallback and a swappable LLM backend — local via Ollama if desired.",
};

export default function PapierkramOrakelPage() {
  return (
    <>
      <Navbar />
      <main>
        <PapierkramOrakelCaseStudy />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
