import type { Metadata } from "next";
import DocInspectCaseStudy from "@/components/case-studies/DocInspect";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "Case Study: DocInspect",
  description:
    "Checking German payslips for credit applications: deterministic rules, PDF forensics and employer research decide — the AI only reads, every value is verified against the document, personal data is pseudonymised locally.",
  alternates: { canonical: "/case-studies/docinspect" },
};

export default function DocInspectPage() {
  return (
    <>
      <Navbar />
      <main>
        <DocInspectCaseStudy />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
