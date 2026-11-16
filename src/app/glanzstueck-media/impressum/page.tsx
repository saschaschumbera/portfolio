import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import ImpressumContent from "@/components/legal/ImpressumContent";
import GlanzstueckLegalFrame from "@/components/glanzstueck/GlanzstueckLegalFrame";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["800"] });

export const metadata: Metadata = {
  title: { absolute: "Impressum | Glanzstück Media" },
  description: "Anbieterkennzeichnung von Glanzstück Media (Sascha Schumbera).",
};

export default function GlanzstueckImpressumPage() {
  return (
    <div className={display.variable}>
      <GlanzstueckLegalFrame>
        <ImpressumContent homeHref="/glanzstueck-media" homeLabel={{ de: "Zurück zu Glanzstück Media", en: "Back to Glanzstück Media" }} />
      </GlanzstueckLegalFrame>
    </div>
  );
}
