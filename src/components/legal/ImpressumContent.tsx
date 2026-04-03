"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

export default function ImpressumContent() {
  const { lang } = useLang();
  const isDE = lang === "de";

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <p className="text-sm mb-3" style={{ color: "var(--text-3)" }}>
            {isDE ? "Rechtliche Informationen" : "Legal Information"}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4">{isDE ? "Impressum" : "Legal Notice"}</h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
            {isDE
              ? "Angaben gemäß § 5 DDG und § 18 Abs. 2 MStV."
              : "Provider information pursuant to German legal requirements (§ 5 DDG, § 18 Abs. 2 MStV)."}
          </p>
        </header>

        <section
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="space-y-7 text-sm sm:text-base leading-relaxed">
            <div>
              <h2 className="font-semibold mb-2">{isDE ? "Anbieter" : "Provider"}</h2>
              <p style={{ color: "var(--text-2)" }}>
                Sascha Schumbera
                <br />
                Schiefbahner Straße 28
                <br />
                41352 Korschenbroich
                <br />
                {isDE ? "Deutschland" : "Germany"}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2">{isDE ? "Kontakt" : "Contact"}</h2>
              <p style={{ color: "var(--text-2)" }}>
                E-Mail: sascha.schumbera@mail.de
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2">
                {isDE
                  ? "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV"
                  : "Responsible for content pursuant to Sec. 18 para. 2 MStV"}
              </h2>
              <p style={{ color: "var(--text-2)" }}>
                Sascha Schumbera
                <br />
                Schiefbahner Straße 28
                <br />
                41352 Korschenbroich
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2">
                {isDE ? "Streitbeilegung" : "Dispute Resolution"}
              </h2>
              <p style={{ color: "var(--text-2)" }}>
                {isDE
                  ? "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: "
                  : "The European Commission provides a platform for online dispute resolution (ODR): "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                {isDE
                  ? " Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
                  : " I am neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board."}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85"
            style={{
              background: "var(--accent)",
              color: "white",
            }}
          >
            {isDE ? "Zur Startseite" : "Back to Home"}
          </Link>
        </div>
      </div>
    </main>
  );
}