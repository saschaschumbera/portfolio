"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

export default function DatenschutzContent() {
  const { lang } = useLang();
  const isDE = lang === "de";

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <p className="text-sm mb-3" style={{ color: "var(--text-3)" }}>
            {isDE ? "Rechtliche Informationen" : "Legal Information"}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
            {isDE ? "Datenschutzerklärung" : "Privacy Policy"}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
            {isDE
              ? "Informationen zur Verarbeitung personenbezogener Daten auf dieser Website gemäß DSGVO."
              : "Information about the processing of personal data on this website in accordance with the GDPR."}
          </p>
        </header>

        <section
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="space-y-7 text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
            <div>
              <h2 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                {isDE ? "1. Verantwortlicher" : "1. Controller"}
              </h2>
              <p>
                Sascha Schumbera
                <br />
                Schiefbahner Straße 28
                <br />
                41352 Korschenbroich
                <br />
                E-Mail: sascha.schumbera@mail.de
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                {isDE ? "2. Hosting" : "2. Hosting"}
              </h2>
              <p>
                {isDE
                  ? "Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Vercel verarbeitet dabei Verbindungs- und Auslieferungsdaten als Auftragsverarbeiter. Rechtsgrundlage für den Betrieb der Website ist Art. 6 Abs. 1 lit. f DSGVO (sicherer und effizienter Betrieb)."
                  : "This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Vercel processes connection and delivery data as a processor. The legal basis for operating the website is Art. 6(1)(f) GDPR (secure and efficient operation)."}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                {isDE ? "3. Server-Logfiles" : "3. Server Log Files"}
              </h2>
              <p>
                {isDE
                  ? "Beim Aufruf der Website werden technische Logdaten verarbeitet (z. B. IP-Adresse, Datum/Uhrzeit, angefragte URL, Statuscode, Referrer, User-Agent). Diese Daten werden zur Stabilität, Sicherheit und Missbrauchserkennung benötigt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO."
                  : "When accessing the website, technical log data is processed (e.g., IP address, date/time, requested URL, status code, referrer, user agent). This data is required for stability, security, and abuse prevention. Legal basis: Art. 6(1)(f) GDPR."}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                4. Vercel Analytics
              </h2>
              <p>
                {isDE
                  ? "Diese Website nutzt Vercel Analytics zur statistischen Auswertung der Nutzung. Anbieter ist Vercel Inc., USA. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Reichweitenanalyse und Optimierung)."
                  : "This website uses Vercel Analytics for statistical usage analysis. The provider is Vercel Inc., USA. Processing is based on Art. 6(1)(f) GDPR (reach analysis and optimization)."}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                {isDE ? "5. Optionale Nutzungsprotokollierung" : "5. Optional Usage Logging"}
              </h2>
              <p>
                {isDE
                  ? "Wenn die interne Ereignisprotokollierung aktiviert ist, werden Interaktionen auf der Seite (z. B. Seitenaufrufe, Klicks, Formular-Events, technische Metadaten) serverseitig protokolliert. Die Verarbeitung dient der Fehlersuche, Sicherheitsüberwachung und technischen Verbesserung (Art. 6 Abs. 1 lit. f DSGVO). Inhalte sensibler Eingaben werden nicht im Klartext gespeichert."
                  : "If internal event logging is enabled, interactions on the site (e.g., page views, clicks, form events, technical metadata) are logged server-side. Processing is used for troubleshooting, security monitoring, and technical improvement (Art. 6(1)(f) GDPR). Sensitive input content is not stored in plain text."}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                {isDE ? "6. Kontaktaufnahme" : "6. Contact"}
              </h2>
              <p>
                {isDE
                  ? "Bei Kontaktaufnahme per E-Mail werden die von dir übermittelten Daten zur Bearbeitung deines Anliegens verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche/vertragliche Kommunikation) oder Art. 6 Abs. 1 lit. f DSGVO."
                  : "If you contact us by email, the data you provide will be processed to handle your request. The legal basis is Art. 6(1)(b) GDPR (pre-contractual/contractual communication) or Art. 6(1)(f) GDPR."}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                {isDE ? "7. Empfänger" : "7. Recipients"}
              </h2>
              <p>
                {isDE
                  ? "Empfänger personenbezogener Daten können technische Dienstleister sein, insbesondere Hosting- und Analyseanbieter (z. B. Vercel). Eine Weitergabe erfolgt nur, soweit dies für den Betrieb, die Sicherheit und die Auswertung der Website erforderlich ist."
                  : "Recipients of personal data may include technical service providers, especially hosting and analytics providers (e.g., Vercel). Data is only shared to the extent necessary for operation, security, and analysis of the website."}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                {isDE ? "8. Drittlandtransfer" : "8. Third-Country Transfer"}
              </h2>
              <p>
                {isDE
                  ? "Bei der Nutzung von Vercel kann eine Datenverarbeitung in Drittländern, insbesondere den USA, nicht ausgeschlossen werden. Die Übermittlung erfolgt auf Grundlage geeigneter Garantien gemäß Art. 44 ff. DSGVO (z. B. Standardvertragsklauseln und/oder EU-U.S. Data Privacy Framework, soweit anwendbar)."
                  : "When using Vercel, data processing in third countries, especially the USA, cannot be excluded. Transfers are based on appropriate safeguards pursuant to Art. 44 et seq. GDPR (e.g., Standard Contractual Clauses and/or the EU-U.S. Data Privacy Framework, where applicable)."}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                {isDE ? "9. Speicherdauer" : "9. Storage Period"}
              </h2>
              <p>
                {isDE
                  ? "Personenbezogene Daten werden nur so lange gespeichert, wie es für die jeweiligen Zwecke erforderlich ist. Kontaktdaten werden nach abschließender Bearbeitung gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen. Technische Log- und Ereignisdaten werden regelmäßig bereinigt, sobald sie für Sicherheits- und Analysezwecke nicht mehr benötigt werden."
                  : "Personal data is stored only as long as necessary for the respective purposes. Contact data is deleted after final handling unless statutory retention obligations apply. Technical log and event data is regularly cleared once no longer required for security and analytics purposes."}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                {isDE ? "10. Rechte betroffener Personen" : "10. Data Subject Rights"}
              </h2>
              <p>
                {isDE
                  ? "Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen. Zudem besteht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde."
                  : "You have the right to access, rectification, erasure, restriction of processing, data portability, and to object to certain processing activities. You also have the right to lodge a complaint with a data protection supervisory authority."}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                {isDE ? "11. Widerspruchsrecht (Art. 21 DSGVO)" : "11. Right to Object (Art. 21 GDPR)"}
              </h2>
              <p>
                {isDE
                  ? "Soweit die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht, kannst du aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit Widerspruch gegen die Verarbeitung einlegen."
                  : "Where processing is based on Art. 6(1)(f) GDPR, you may object at any time for reasons arising from your particular situation."}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                {isDE ? "12. Zuständige Aufsichtsbehörde" : "12. Supervisory Authority"}
              </h2>
              <p>
                {isDE
                  ? "Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2-4, 40213 Düsseldorf, www.ldi.nrw.de"
                  : "State Commissioner for Data Protection and Freedom of Information North Rhine-Westphalia, Kavalleriestraße 2-4, 40213 Düsseldorf, Germany, www.ldi.nrw.de"}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                {isDE ? "13. Stand" : "13. Version"}
              </h2>
              <p>{isDE ? "Stand: April 2026" : "Version: April 2026"}</p>
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
          <Link
            href="/impressum"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-2)",
              background: "var(--bg-card)",
            }}
          >
            {isDE ? "Zum Impressum" : "Legal Notice"}
          </Link>
        </div>
      </div>
    </main>
  );
}