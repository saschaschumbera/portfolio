import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import DatenschutzContent from "@/components/legal/DatenschutzContent";
import GlanzstueckLegalFrame from "@/components/glanzstueck/GlanzstueckLegalFrame";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["800"] });

export const metadata: Metadata = {
  title: { absolute: "Datenschutz | Glanzstück Media" },
  description: "Datenschutzerklärung von Glanzstück Media (Sascha Schumbera).",
};

export default function GlanzstueckDatenschutzPage() {
  return (
    <div className={display.variable}>
      <GlanzstueckLegalFrame>
        <DatenschutzContent
          homeHref="/glanzstueck-media"
          homeLabel={{ de: "Zurück zu Glanzstück Media", en: "Back to Glanzstück Media" }}
          legalBase="/glanzstueck-media"
        />
      </GlanzstueckLegalFrame>
    </div>
  );
}
