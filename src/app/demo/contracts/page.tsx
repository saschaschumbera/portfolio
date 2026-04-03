"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContractsDemoPage() {
  const [query, setQuery] = useState("Kündigungsfrist");

  return (
    <main className="min-h-screen px-6 py-10" style={{ background: "var(--bg-base)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-1)" }}>
            Demo: Vertragsverwaltung
          </h1>
          <Link
            href="/#projects"
            className="text-sm px-4 py-2 rounded-full"
            style={{ border: "1px solid var(--border)", color: "var(--text-2)" }}
          >
            Zurück zu Projekten
          </Link>
        </div>

        <p className="text-sm mb-6" style={{ color: "var(--text-3)" }}>
          Live-Demoansicht für Suche und Metadaten-Auswertung (Frontend-Simulation).
        </p>

        <div className="p-4 rounded-xl mb-4" style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}>
          <p className="text-xs mb-2" style={{ color: "var(--text-3)" }}>Suchbegriff</p>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm rounded-lg px-3 py-2 bg-transparent"
            style={{ border: "1px solid var(--border)", color: "var(--text-1)" }}
          />
        </div>

        <div className="p-5 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}>
          <p className="text-xs mb-2" style={{ color: "var(--text-3)" }}>Trefferliste</p>
          <p className="text-sm" style={{ color: "var(--text-1)" }}>
            {query || "Kündigungsfrist"} - Liefervertrag_2025.pdf
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>
            Metadaten: Frist 30 Tage, Betrag 24.000 EUR, Status aktiv
          </p>
        </div>

        <p className="text-xs mt-4" style={{ color: "var(--text-3)" }}>
          Hinweis: Diese Demo zeigt den UX-Flow und ist als simulierte Vorschau gedacht.
        </p>
      </div>
    </main>
  );
}
