"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;

  return (
    <footer className="py-6 px-6" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs" style={{ color: "var(--text-3)" }}>
          © {new Date().getFullYear()} Sascha Schumbera
        </p>
        <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-3)" }}>
          <p>{tx.builtWith}</p>
          <Link href="/impressum" className="hover:opacity-80 transition-opacity underline underline-offset-4">
            {tx.impressum}
          </Link>
          <Link href="/datenschutz" className="hover:opacity-80 transition-opacity underline underline-offset-4">
            {tx.datenschutz}
          </Link>
        </div>
      </div>
    </footer>
  );
}
