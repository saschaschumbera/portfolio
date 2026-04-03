import type { Metadata } from "next";
import DatenschutzContent from "@/components/legal/DatenschutzContent";

export const metadata: Metadata = {
  title: "Datenschutz / Privacy Policy | Sascha Schumbera",
  description: "Datenschutzerklärung und Privacy Policy für diese Website.",
};

export default function DatenschutzPage() {
  return <DatenschutzContent />;
}