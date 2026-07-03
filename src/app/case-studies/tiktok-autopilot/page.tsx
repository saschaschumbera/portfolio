import type { Metadata } from "next";
import TikTokAutopilotCaseStudy from "@/components/case-studies/TikTokAutopilot";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "Case Study: TikTok Autopilot | Sascha Schumbera",
  description:
    "Deep dive into a fully autonomous headless data & AI pipeline for social media: scraping, transcription, LLM gating, Gemini TTS, video editing and headless upload via Playwright.",
};

export default function TikTokAutopilotPage() {
  return (
    <>
      <Navbar />
      <main>
        <TikTokAutopilotCaseStudy />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
