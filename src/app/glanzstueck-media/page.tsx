import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import GlanzstueckMedia from "@/components/glanzstueck/GlanzstueckMedia";

// Display face of the brand (same family as in the sample clips).
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["700", "800"] });

// Standalone landing page for the video side business "Glanzstück Media".
// Deliberately NOT linked from the recruiter-facing portfolio (no Navbar/Footer/ChatBot).
export const metadata: Metadata = {
  title: { absolute: "Glanzstück Media — Produktvideos für Software & Apps" },
  description:
    "Kurze Produkt- und Erklärvideos für Software, Apps und lokale Dienstleister: animierte Typografie, App-Bildschirme, 3D-Elemente und Sounddesign — für Website und Social Media.",
  openGraph: {
    type: "website",
    url: "https://sascha-schumbera.dev/glanzstueck-media",
    siteName: "Glanzstück Media",
    title: "Glanzstück Media — Produktvideos für Software & Apps",
    description: "Kurze Produktvideos, die man sofort versteht.",
    locale: "de_DE",
    images: [{ url: "/glanzstueck-media/story-21-47.jpg", width: 1280, height: 720 }],
  },
};

export default function GlanzstueckMediaPage() {
  return (
    <div className={`${display.variable} w-full`}>
      <GlanzstueckMedia />
    </div>
  );
}
