"use client";

import Link from "next/link";
import { useState } from "react";

export default function DocInspectDemoPage() {
  const [fileName, setFileName] = useState("vertrag_muster.pdf");
  const [risk, setRisk] = useState("Mittel");

  return (
    <main className="min-h-screen px-6 py-10" style={{ background: "var(--bg-base)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-1)" }}>
            Demo: DocInspect
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
          Live-Demoansicht zur Dokumentenanalyse (Frontend-Simulation).
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}>
            <p className="text-xs mb-2" style={{ color: "var(--text-3)" }}>Dateiname</p>
            <input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full text-sm rounded-lg px-3 py-2 bg-transparent"
              style={{ border: "1px solid var(--border)", color: "var(--text-1)" }}
            />
          </div>

          <div className="p-4 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}>
            <p className="text-xs mb-2" style={{ color: "var(--text-3)" }}>Risiko-Level</p>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className="w-full text-sm rounded-lg px-3 py-2 bg-transparent"
              style={{ border: "1px solid var(--border)", color: "var(--text-1)" }}
            >
              <option value="Niedrig">Niedrig</option>
              <option value="Mittel">Mittel</option>
              <option value="Hoch">Hoch</option>
            </select>
          </div>
        </div>

        <div className="p-5 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}>
          <p className="text-xs mb-2" style={{ color: "var(--text-3)" }}>Analyseergebnis</p>
          <p className="text-sm mb-2" style={{ color: "var(--text-1)" }}>
            Dokument: {fileName || "vertrag_muster.pdf"}
          </p>
          <p className="text-sm mb-2" style={{ color: "var(--text-2)" }}>
            Erkannt: Kündigungsfrist, Zahlungsziel, Haftungsklausel
          </p>
          <p className="text-sm" style={{ color: risk === "Hoch" ? "#ef4444" : risk === "Mittel" ? "#f59e0b" : "#22c55e" }}>
            Risiko: {risk}
          </p>
        </div>

        <p className="text-xs mt-4" style={{ color: "var(--text-3)" }}>
          Hinweis: Diese Demo zeigt den UX-Flow und ist als simulierte Vorschau gedacht.
        </p>
      </div>
    </main>
  );
}
