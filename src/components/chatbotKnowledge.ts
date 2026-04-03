export type Rule = { keywords: string[]; answer: string };

export const RULES: Rule[] = [
  {
    keywords: ["wetter", "temperatur", "regen", "sonnig", "bewölkt", "prognose"],
    answer: "Dazu habe ich leider keinen Live-Wetterzugriff. Wenn du mir einen Ort nennst, kann ich dir aber sagen, wie du schnell die genaue Wetterprognose findest.",
  },
  {
    keywords: ["uhrzeit", "wie spät", "zeit", "datum", "welcher tag", "heute datum"],
    answer: "Ich habe hier keinen zuverlässigen Live-Zeitdienst. Für tagesaktuelle Uhrzeit und Datum nutze am besten direkt dein Gerät oder eine Suchanfrage.",
  },
  {
    keywords: ["aktien", "aktienkurs", "bitcoin", "krypto", "eur usd", "dax", "nasdaq", "s&p"],
    answer: "Live-Kurse kann ich hier nicht abrufen. Ich kann dir aber gerne erklären, wie Saschas Finance-Erfahrung und Data-Skills in solchen Themen praktisch einsetzbar sind.",
  },
  {
    keywords: ["verkehr", "stau", "route", "navi", "fahrzeit", "autobahn"],
    answer: "Für Live-Verkehrsdaten habe ich hier keinen Zugriff. Für aktuelle Routen und Stauinfos nutze am besten Maps oder dein Navi.",
  },
  {
    keywords: ["hallo", "hi", "hey", "guten tag", "guten morgen", "guten abend", "moin", "servus", "grüß"],
    answer: "Hi! Schön, dass du vorbeischaust. Ich beantworte gerne Fragen über Sascha — Werdegang, Projekte, Skills oder Kontakt. Einfach fragen!",
  },
  {
    keywords: ["kontakt", "contact", "email", "mail", "erreichen", "schreiben"],
    answer: "Sascha ist per E-Mail erreichbar: sascha.schumbera@mail.de — oder über den Kontakt-Bereich auf dieser Seite. Er freut sich über jede Nachricht.",
  },
  {
    keywords: ["telefon", "handy", "nummer", "phone", "anrufen", "tel"],
    answer: "Saschas Telefonnummer ist nicht öffentlich, aber er ist sehr gut per E-Mail erreichbar: sascha.schumbera@mail.de",
  },
  {
    keywords: ["freelance", "hire", "einstellen", "anfrage", "kooperation", "zusammenarbeit"],
    answer: "Bei Anfragen zu Zusammenarbeit und Projekten erreichst du Sascha am besten direkt per E-Mail: sascha.schumbera@mail.de",
  },
  {
    keywords: ["wer bist", "wer ist", "über sascha", "about", "vorstellung", "stell dich vor", "profil"],
    answer: "Sascha Schumbera ist AI-orientierter Softwareentwickler aus NRW. Er kombiniert über 10 Jahre Finanz- und Banking-Erfahrung mit moderner KI-Entwicklung und baut End-to-End AI-Produkte — von Dokumentenanalyse bis Multi-Agent-Systemen.",
  },
  {
    keywords: ["standort", "wohnort", "wo wohnt", "wo lebt", "location", "nrw", "düsseldorf", "mönchengladbach"],
    answer: "Sascha lebt und arbeitet in NRW.",
  },
  {
    keywords: ["besonders", "unterschied", "alleinstellung", "unique", "warum sascha", "stärke", "macht sascha aus", "macht ihn aus", "zeichnet ihn", "hebt ihn", "was macht er"],
    answer: "Sascha verbindet über 10 Jahre Finanz- und Banking-Erfahrung mit KI-orientierter Softwareentwicklung. Dazu gehören u. a. Kreditentscheidungen bis 250.000 €, Arbeit mit Risikomodellen sowie Automatisierung und Reporting im Bankenumfeld.",
  },
  {
    keywords: ["soft skill", "persönlichkeit", "arbeitsweise", "charakter", "stärken"],
    answer: "Sascha zeichnet sich aus durch analytische Denkweise, strukturierte Arbeitsweise, schnelle Einarbeitung in komplexe Systeme und Kommunikationsstärke an der Schnittstelle zwischen Fachbereich und IT.",
  },
  {
    keywords: ["sprache", "englisch", "deutsch", "fremdsprache"],
    answer: "Sascha spricht Deutsch als Muttersprache und Englisch auf verhandlungssicherem Niveau.",
  },
  {
    keywords: ["aktuell", "derzeit", "momentan", "jetzt", "current"],
    answer: "Aktuell arbeitet Sascha als Referent (Fachinformatiker) in der Kreditrisikosteuerung bei Bank11 (seit September 2023) und studiert parallel B.Sc. Angewandte Künstliche Intelligenz an der IU Internationale Hochschule.",
  },
  {
    keywords: ["bank11"],
    answer: "Bei Bank11 für Privatkunden und Handel GmbH entwickelt Sascha seit 09/2023 Automatisierungslösungen mit SQL und SCHUFA-DSS, konzipiert Low-Code-Entscheidungssysteme, erstellt Power-BI-Dashboards für Kreditrisiko-Reporting und Betrugserkennung (Umsatzraketen) und schult Fachkollegen im Umgang mit KI-Tools.",
  },
  {
    keywords: ["schufa", "dss", "entscheidungssystem", "low-code", "low code"],
    answer: "Bei Bank11 hat Sascha ein Low-Code-Entscheidungssystem auf Basis des SCHUFA Decision Support Systems (SCHUFA-DSS) konzipiert und umgesetzt — zur automatisierten Unterstützung von Kreditentscheidungsprozessen.",
  },
  {
    keywords: ["betrug", "fraud", "umsatzrakete", "betrugserkennung"],
    answer: "Im Rahmen seiner Tätigkeit bei Bank11 hat Sascha Power-BI-Dashboards zur Betrugserkennung sogenannter Umsatzraketen entwickelt — inklusive datengestützter Visualisierungen zur Früherkennung verdächtiger Muster.",
  },
  {
    keywords: ["de lage landen", "lage landen", "leasing", "retail underwriter", "underwriter"],
    answer: "Von April 2022 bis August 2023 war Sascha Retail Underwriter bei De Lage Landen Leasing GmbH. Dort automatisierte er Kreditentscheidungsprozesse mit VBA und UIPath, analysierte Prozesse mit SQL und Power BI und war fachlicher Ansprechpartner für das Kreditentscheidungstool Credithub — für die DACH-Region und Polen.",
  },
  {
    keywords: ["credithub", "uipath", "rpa", "roboter", "prozessautomatisierung"],
    answer: "Sascha hat bei De Lage Landen mit UIPath (RPA) Kreditentscheidungsprozesse automatisiert — u.a. Archivierung von Dokumenten und automatisierte Einarbeitungspläne. Zudem war er fachlicher Ansprechpartner für das Kreditentscheidungstool Credithub in der DACH-Region und Polen.",
  },
  {
    keywords: ["adelta", "adelta finanz", "full stack", "fullstack", "finanzapplikation"],
    answer: "Von Januar bis März 2022 war Sascha Application Developer (Full Stack) bei der Adelta Finanz AG — zuständig für Entwicklung und Anpassung von Finanzapplikationen und schnelle Einarbeitung in bestehende Architekturen.",
  },
  {
    keywords: ["rci", "rci banque", "renault", "gruppenleiter", "kreditabrechnung"],
    answer: "Sascha war mehrere Jahre bei RCI Banque S.A.: erst als Sachbearbeiter Kreditabrechnung (2016–2017), dann als Sachbearbeiter Kreditentscheidung mit Entscheidungskompetenz bis 250.000 € (2018–2021), und zuletzt als kommissarischer Gruppenleiter Kreditabrechnung (Dez. 2020 – Sept. 2021).",
  },
  {
    keywords: ["kreditentscheidung", "entscheidungskompetenz", "250.000", "kreditvergabe"],
    answer: "Als Sachbearbeiter Kreditentscheidung bei RCI Banque S.A. traf Sascha eigenverantwortlich Kreditentscheidungen auf Basis quantitativer Risikomodelle — mit einer Entscheidungskompetenz von bis zu 250.000 €.",
  },
  {
    keywords: ["erfahrung", "werdegang", "beruf", "laufbahn", "karriere"],
    answer: "Saschas Karriere: Sachbearbeiter bei RCI Banque (2016–2021, zuletzt Gruppenleiter) → Full-Stack-Developer bei Adelta Finanz → Retail Underwriter bei De Lage Landen → Referent Kreditrisikosteuerung bei Bank11 (heute). Parallel: B.Sc. Angewandte KI an der IU (seit 2025).",
  },
  {
    keywords: ["wie lange", "jahre", "berufsjahre", "erfahrung hat"],
    answer: "Sascha hat über 10 Jahre Berufserfahrung mit starkem Schwerpunkt im Finanz- und Banking-Umfeld.",
  },
  {
    keywords: ["studium", "bachelor", "bsc", "angewandte ki", "iu", "internationale hochschule"],
    answer: "Sascha studiert seit November 2025 B.Sc. Angewandte Künstliche Intelligenz an der IU Internationale Hochschule (geplanter Zeitraum: 11/2025 bis 10/2029).",
  },
  {
    keywords: ["bildung", "abschluss", "qualifikation", "ausbildung", "zertifikat"],
    answer: "Saschas Bildungsweg: kaufmännische Ausbildung → Berufserfahrung im Finanzsektor → B.Sc. Angewandte Künstliche Intelligenz an der IU (seit 2025, laufend).",
  },
  {
    keywords: ["projekt", "gebaut", "entwickelt", "eigene", "work", "portfolio"],
    answer: "Sascha hat zwei eigenständige KI-Produkte entwickelt: DocInspect (KI-Dokumentenanalyse mit Privacy-by-Design) und Vertragsverwaltung (Self-Hosted Dokumentenmanagement, 100% lokal). Weitere Projekte sind in Entwicklung.",
  },
  {
    keywords: ["docinspect", "dokumentenanalyse", "risikobewertung", "risikoanalyse"],
    answer: "DocInspect ist eine End-to-End Webanwendung zur KI-Analyse von Verträgen und Dokumenten. Highlights: Privacy-by-Design (lokale Pseudonymisierung vor LLM-Verarbeitung), OCR-Pipeline für PDF/DOCX/TXT/Bilddateien via Tesseract, Multi-Agent-Workflow mit Provider-Routing & Fallback, Risiko-Scoring in Ampellogik mit Handlungsempfehlungen.",
  },
  {
    keywords: ["vertragsverwaltung", "self-hosted", "dokumentenmanagement", "dsgvo", "datenschutz"],
    answer: "Die Vertragsverwaltung ist eine datenschutzorientierte, lokal betriebene Fullstack-Webanwendung im Self-Hosted Ansatz. Features laut CV: Upload/Kamera-Erfassung mit OCR, Erkennung von Beträgen, Fristen und Metadaten, Such- und Filterfunktionen, Versionierung sowie Import/Export.",
  },
  {
    keywords: ["privacy", "pseudonymisierung", "datenschutz", "privacy by design"],
    answer: "Ein zentrales Thema in Saschas Projekten ist Privacy-by-Design: Bei DocInspect werden sensible Daten lokal pseudonymisiert, bevor sie externe LLM-APIs erreichen. Bei der Vertragsverwaltung werden alle Daten ausschließlich lokal verarbeitet — kein Byte verlässt die eigene Infrastruktur.",
  },
  {
    keywords: ["ocr", "texterkennung", "tesseract", "scan", "bilddatei"],
    answer: "Sascha hat OCR-Pipelines mit Tesseract implementiert — für die Textextraktion aus gescannten Dokumenten, Bilddateien und komplexen PDFs. Beide Projekte (DocInspect und Vertragsverwaltung) nutzen diese OCR-Technologie.",
  },
  {
    keywords: ["multi.agent", "agent system", "provider routing", "fallback"],
    answer: "DocInspect nutzt einen Multi-Agent-Ansatz mit robustem Provider-Routing: Fällt ein LLM-Provider aus, greift automatisch ein Fallback-System ein. Das ermöglicht hohe Verfügbarkeit auch in produktionsnahen Umgebungen.",
  },
  {
    keywords: ["skill", "kenntnisse", "fähigkeit", "kann er", "tech stack", "tech-stack", "technologie", "womit arbeitet", "womit entwickelt"],
    answer: "Kern-Skills: Python, SQL, TypeScript. AI-Tools: Claude Code, Cursor, GitHub Copilot, LangGraph, Prompt Engineering, lokale LLMs. Data: Power BI, SAS, DAX. Engineering: FastAPI, OCR-Pipelines, Datenmodellierung. Automation: Power Automate, UIPath (RPA), SCHUFA-DSS.",
  },
  {
    keywords: ["python"],
    answer: "Python ist Saschas Hauptprogrammiersprache für AI-Entwicklung — eingesetzt für FastAPI-Backends, OCR-Pipelines, LLM-Integration, Automatisierungsskripte und Datenverarbeitung.",
  },
  {
    keywords: ["sql"],
    answer: "SQL ist ein tägliches Werkzeug für Sascha — für Automatisierungslösungen bei Bank11, Datenauswertungen, Reporting und die Entwicklung von SAS-Programmen zur Datenaufbereitung.",
  },
  {
    keywords: ["typescript", "next.js", "nextjs", "react", "frontend", "tailwind"],
    answer: "TypeScript und React/Next.js setzt Sascha im Frontend ein — dieses Portfolio ist damit gebaut. Er kombiniert moderne Web-Technologien mit seinem AI-Fokus für vollständige End-to-End-Produkte.",
  },
  {
    keywords: ["claude", "cursor", "copilot", "antigravity", "agentic ide"],
    answer: "Sascha setzt auf AI-first Development: Claude Code, Cursor und GitHub Copilot sind täglich im Einsatz. Er nutzt diese Tools nicht nur, sondern reviewt KI-generierten Code kritisch und integriert AI-Assistenten produktionsnah.",
  },
  {
    keywords: ["langgraph", "langchain", "workflow", "graph"],
    answer: "LangGraph nutzt Sascha für die Orchestrierung von Multi-Agent-Workflows — z.B. in DocInspect für das Provider-Routing und den strukturierten Analyse-Ablauf. Graph-basierte Pipelines ermöglichen robuste Fallback-Logik und parallele Agenten-Ausführung.",
  },
  {
    keywords: ["power bi", "dashboard", "reporting", "visualisierung", "bericht"],
    answer: "Power BI ist ein Kernwerkzeug bei Saschas Arbeit in der Kreditrisikosteuerung — für Management-Dashboards, Kreditrisiko-Reporting und Fraud-Detection-Visualisierungen. Er beherrscht DAX für komplexe Berechnungen.",
  },
  {
    keywords: ["sas", "sas program", "kampagne", "datenaufbereitung"],
    answer: "SAS nutzt Sascha bei Bank11 für die Automatisierung der Datenaufbereitung bei Kundenkampagnen — speziell die Entwicklung von SAS- und SQL-Programmen zur strukturierten Datenverarbeitung.",
  },
  {
    keywords: ["power automate", "automatisierung", "workflow automatisierung"],
    answer: "Power Automate gehört zu Saschas Low-Code-Werkzeugkasten für Prozessautomatisierungen im Microsoft-Umfeld.",
  },
  {
    keywords: ["vba", "excel", "makro"],
    answer: "VBA und Excel/Makros hat Sascha bei RCI Banque und De Lage Landen für Prozessoptimierungen und Reportings eingesetzt — u.a. für automatisierte Einarbeitungspläne und Kreditlinienauswertungen.",
  },
  {
    keywords: ["api", "fastapi", "backend", "rest", "schnittstelle"],
    answer: "API-Design ist ein Schwerpunkt von Sascha — er entwickelt REST-APIs mit FastAPI (Python) und hat vollständige Backend-Systeme für seine KI-Projekte aufgebaut, inkl. Datei-Upload, LLM-Integration und Datenmodellierung.",
  },
  {
    keywords: ["lokal", "lokale llm", "ollama", "offline", "on-premise"],
    answer: "Sascha arbeitet auch mit lokal betriebenen LLMs — ohne Cloud-Abhängigkeit. Das ist besonders relevant für datenschutzsensible Anwendungsfälle im Finanzbereich, wo Daten die eigene Infrastruktur nicht verlassen dürfen.",
  },
  {
    keywords: ["prompt engineering", "prompt", "prompting"],
    answer: "Prompt Engineering ist ein expliziter Teil von Saschas AI-Skillset — er entwickelt und optimiert Prompts für LLM-Workflows, Multi-Agent-Systeme und strukturierte Ausgaben.",
  },
  {
    keywords: ["ki schulung", "schulung", "wissenstransfer", "training", "unterrichten", "lehren"],
    answer: "Bei Bank11 führt Sascha Schulungen für Fachkollegen durch — im Umgang mit KI- und Datenanalyse-Tools wie Insights Agentic IDE und Power BI. Er vermittelt komplexe Themen verständlich an nicht-technische Kollegen.",
  },
  {
    keywords: ["datenmodell", "datenbankdesign", "datenbank", "relationale", "sql design"],
    answer: "Datenmodellierung gehört zu Saschas Engineering-Skills: Er hat relationale Datenbankmodelle für seine Fullstack-Projekte konzipiert und umgesetzt — mit Fokus auf Performance und Nachvollziehbarkeit.",
  },
  {
    keywords: ["ki", "ai", "künstliche intelligenz", "machine learning", "deep learning", "llm", "agentic"],
    answer: "Saschas KI-Fokus: Agentic AI, produktionsnahe LLM-Anwendungen, Multi-Agent-Systeme und AI-first Development. Er nutzt Claude Code, LangGraph, lokale LLMs und Prompt Engineering — und hat eigenständige KI-Produkte entwickelt, die echte Geschäftsprobleme lösen.",
  },
  {
    keywords: ["studiert", "studieren", "ects", "hochschule", "akademisch"],
    answer: "Sascha studiert seit November 2025 B.Sc. Angewandte Künstliche Intelligenz an der IU Internationale Hochschule (11/2025 bis 10/2029).",
  },
  {
    keywords: ["finanz", "banking", "bank", "kredit", "risiko", "kreditrisiko"],
    answer: "Saschas Finanz-Hintergrund umfasst über 10 Jahre: Kreditabrechnung → Kreditentscheidung (bis 250.000 €) → Gruppenleitung → Retail Underwriting → Kreditrisikosteuerung mit AI/BI-Tools. Diese Domain-Expertise ist sein größtes Differenzierungsmerkmal als AI-Entwickler.",
  },
  {
    keywords: ["github", "repository", "repo", "code", "open source"],
    answer: "Saschas GitHub-Profil findest du direkt auf dieser Seite — im Hero-Bereich oder im Kontakt-Bereich. Dort sind seine Projekte und Code-Repositories verlinkt.",
  },
  {
    keywords: ["linkedin", "xing", "netzwerk", "social media"],
    answer: "Saschas LinkedIn-Profil ist auf dieser Seite verlinkt — im Hero-Bereich und im Kontakt-Bereich. Dort kann man sich auch direkt vernetzen.",
  },
  {
    keywords: ["danke", "thanks", "thx", "super", "cool", "toll", "klasse", "perfekt", "top", "nice", "gut gemacht"],
    answer: "Gerne! Wenn du noch weitere Fragen hast, bin ich hier. Sascha freut sich natürlich auch über eine direkte Nachricht: sascha.schumbera@mail.de",
  },
  {
    keywords: ["tschüss", "bye", "ciao", "auf wiedersehen", "bis dann"],
    answer: "Tschüss! Falls du nochmal Fragen hast — ich bin immer hier. Und Sascha freut sich über dein Interesse!",
  },
  {
    keywords: ["lebenslauf", "cv", "resume", "herunterladen", "download"],
    answer: "Für Saschas Lebenslauf wende dich am besten direkt per E-Mail an ihn: sascha.schumbera@mail.de — er schickt ihn dir gerne zu.",
  },
  {
    keywords: ["verfügbar", "offen", "jobsuche", "stelle", "position", "anstellung", "wechsel", "opportunity"],
    answer: "Für konkrete Anfragen zu Projekten oder Positionen erreichst du Sascha direkt per E-Mail: sascha.schumbera@mail.de — er freut sich über interessante Möglichkeiten.",
  },
  {
    keywords: ["was kannst du", "was weißt du", "was kann ich fragen", "hilfe", "help", "themen"],
    answer: "Ich beantworte Fragen über Sascha — seinen Werdegang, Projekte, Skills, Tech-Stack, Finanz-Hintergrund oder wie du ihn kontaktieren kannst. Einfach fragen!",
  },
];

export const FALLBACK =
  "Das weiß ich leider nicht genau. Am besten fragst du Sascha direkt — er ist per E-Mail erreichbar: sascha.schumbera@mail.de";

export const SUGGESTIONS = [
  "Was macht Sascha besonders?",
  "Welche KI-Projekte hat er gebaut?",
  "Wie kann ich ihn kontaktieren?",
  "Was ist sein Tech-Stack?",
];

export function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const rule of RULES) {
    if (
      rule.keywords.some((kw) =>
        new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\\]\\]/g, "\\\\$&")}\\b`).test(lower)
      )
    ) {
      return rule.answer;
    }
  }
  return FALLBACK;
}
