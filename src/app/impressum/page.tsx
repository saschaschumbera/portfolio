import type { Metadata } from "next";
import ImpressumContent from "@/components/legal/ImpressumContent";

export const metadata: Metadata = {
  title: "Impressum / Legal Notice | Sascha Schumbera",
  description: "Rechtliche Anbieterkennzeichnung und Legal Notice.",
};

export default function ImpressumPage() {
  return <ImpressumContent />;
}