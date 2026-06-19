import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sascha Schumbera",
  url: "https://sascha-schumbera.dev",
  image: "https://sascha-schumbera.dev/profile.jpg",
  jobTitle: "AI-orientierter Softwareentwickler",
  description:
    "AI-orientierter Softwareentwickler mit über 10 Jahren Finance- und Banking-Erfahrung. Schwerpunkt: KI-gestützte Dokumentenanalyse, OCR-Workflows und Multi-Agent-Systeme.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Korschenbroich",
    addressRegion: "NRW",
    addressCountry: "DE",
  },
  sameAs: [
    "https://github.com/saschaschumbera",
    "https://www.linkedin.com/in/sascha-schumbera/",
  ],
  knowsAbout: [
    "Künstliche Intelligenz",
    "LLM-Anwendungen",
    "Dokumentenanalyse",
    "OCR",
    "Kreditrisikosteuerung",
    "Python",
    "SQL",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
