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

export const FALLBACK_EN =
  "I'm not sure about that. Best to ask Sascha directly — he's reachable by email: sascha.schumbera@mail.de";

export const SUGGESTIONS = [
  "Was macht Sascha besonders?",
  "Welche KI-Projekte hat er gebaut?",
  "Wie kann ich ihn kontaktieren?",
  "Was ist sein Tech-Stack?",
];

export const SUGGESTIONS_EN = [
  "What makes Sascha stand out?",
  "Which AI projects has he built?",
  "How can I contact him?",
  "What is his tech stack?",
];

export const RULES_EN: Rule[] = [
  { keywords: ["hello", "hi", "hey", "good morning", "good evening"], answer: "Hi! Great to have you here. I'm happy to answer questions about Sascha — his background, projects, skills or how to contact him." },
  { keywords: ["contact", "email", "mail", "reach", "write"], answer: "Sascha is reachable by email: sascha.schumbera@mail.de — or via the contact section on this page." },
  { keywords: ["phone", "mobile", "number", "call"], answer: "Sascha's phone number is not public, but he's very responsive by email: sascha.schumbera@mail.de" },
  { keywords: ["freelance", "hire", "project", "cooperation", "collaboration", "work together"], answer: "For collaboration and project enquiries, reach Sascha directly by email: sascha.schumbera@mail.de" },
  { keywords: ["who is", "about sascha", "about him", "introduction", "profile"], answer: "Sascha Schumbera is an AI-oriented software developer from NRW, Germany. He combines over 10 years of finance and banking experience with modern AI development, building end-to-end AI products — from document analysis to multi-agent systems." },
  { keywords: ["location", "where", "lives", "based", "germany", "nrw"], answer: "Sascha lives and works in NRW, Germany." },
  { keywords: ["stand out", "unique", "different", "special", "why sascha", "strength", "makes him"], answer: "Sascha combines over 10 years of finance and banking experience with AI-oriented software development — including credit decisions up to €250,000, risk model application, and banking automation. That domain expertise is his biggest differentiator as an AI developer." },
  { keywords: ["soft skill", "personality", "work style", "character"], answer: "Sascha is known for analytical thinking, structured work approach, fast onboarding into complex systems, and strong communication at the interface of business and IT." },
  { keywords: ["language", "english", "german"], answer: "Sascha speaks German as his native language and English at a business-fluent level." },
  { keywords: ["current", "currently", "now", "today", "right now"], answer: "Sascha currently works as a specialist (IT specialist) in credit risk management at Bank11 (since September 2023) and studies B.Sc. Applied Artificial Intelligence at IU International University in parallel." },
  { keywords: ["bank11"], answer: "At Bank11, Sascha has been building automation solutions with SQL and SCHUFA-DSS since 09/2023, designing low-code decision systems, creating Power BI dashboards for credit risk reporting and fraud detection, and training colleagues on AI tools." },
  { keywords: ["experience", "career", "background", "history"], answer: "Sascha's career: specialist at RCI Banque (2016–2021, acting team lead) → Full-Stack developer at Adelta Finanz → Retail Underwriter at De Lage Landen → Credit Risk Specialist at Bank11 (present). Studying B.Sc. Applied AI at IU since 2025." },
  { keywords: ["years", "how long", "experience"], answer: "Sascha has over 10 years of professional experience, with a strong focus on finance and banking." },
  { keywords: ["degree", "bachelor", "university", "studies", "iu"], answer: "Sascha has been studying B.Sc. Applied Artificial Intelligence at IU International University since November 2025 (planned: 11/2025 – 10/2029)." },
  { keywords: ["project", "built", "developed", "created", "work", "portfolio"], answer: "Sascha has independently built two AI products: DocInspect (AI document analysis with Privacy-by-Design) and a Contract Manager (self-hosted document management, 100% local). More projects are in development." },
  { keywords: ["docinspect", "document analysis", "risk assessment"], answer: "DocInspect is an end-to-end web application for AI-powered analysis of contracts and documents. Highlights: Privacy-by-Design (local pseudonymisation before LLM processing), OCR pipeline for PDF/DOCX/TXT/image files, multi-agent workflow with provider routing & fallback, risk scoring with traffic-light logic." },
  { keywords: ["contract manager", "contract management", "self-hosted", "self hosted", "privacy", "gdpr"], answer: "The Contract Manager is a privacy-oriented, locally operated full-stack web application in a self-hosted approach. Features: upload/camera capture with OCR, detection of amounts, deadlines and metadata, search & filter functions, no cloud dependency." },
  { keywords: ["skill", "knowledge", "tech stack", "technology", "tools", "can he"], answer: "Core skills: Python, SQL, TypeScript. AI tools: Claude Code, Cursor, GitHub Copilot, LangGraph, Prompt Engineering, local LLMs. Data: Power BI, SAS, DAX. Engineering: FastAPI, OCR pipelines, data modelling. Automation: Power Automate, UIPath (RPA), SCHUFA-DSS." },
  { keywords: ["python"], answer: "Python is Sascha's main programming language for AI development — used for FastAPI backends, OCR pipelines, LLM integration, automation scripts and data processing." },
  { keywords: ["sql"], answer: "SQL is a daily tool for Sascha — for automation solutions at Bank11, data analysis, reporting and the development of SAS programs for data preparation." },
  { keywords: ["typescript", "next.js", "nextjs", "react", "frontend"], answer: "Sascha uses TypeScript and React/Next.js on the frontend — this portfolio is built with it. He combines modern web technologies with his AI focus for complete end-to-end products." },
  { keywords: ["power bi", "dashboard", "reporting", "visualisation"], answer: "Power BI is a core tool in Sascha's credit risk management work — for management dashboards, credit risk reporting and fraud detection visualisations. He's proficient in DAX for complex calculations." },
  { keywords: ["ai", "artificial intelligence", "machine learning", "llm", "agentic"], answer: "Sascha's AI focus: Agentic AI, production-ready LLM applications, multi-agent systems and AI-first development. He uses Claude Code, LangGraph, local LLMs and prompt engineering — and has independently built AI products that solve real business problems." },
  { keywords: ["github", "repository", "repo", "code", "open source"], answer: "You can find Sascha's GitHub profile directly on this page — in the hero section or the contact section." },
  { keywords: ["linkedin", "network", "social media", "connect"], answer: "Sascha's LinkedIn profile is linked on this page — in the hero section and contact section. You can connect with him there directly." },
  { keywords: ["thank", "thanks", "great", "awesome", "perfect", "cool"], answer: "You're welcome! If you have more questions, I'm here. Sascha also looks forward to a direct message: sascha.schumbera@mail.de" },
  { keywords: ["bye", "goodbye", "see you", "ciao"], answer: "Goodbye! If you have more questions — I'm always here. And Sascha appreciates your interest!" },
  { keywords: ["available", "open to", "job", "position", "opportunity"], answer: "For specific project or position enquiries, reach Sascha directly by email: sascha.schumbera@mail.de — he welcomes interesting opportunities." },
];

function matchRules(rules: Rule[], input: string, fallback: string): string {
  const lower = input.toLowerCase();
  for (const rule of rules) {
    if (
      rule.keywords.some((kw) =>
        new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(lower)
      )
    ) {
      return rule.answer;
    }
  }
  return fallback;
}

export function findAnswer(input: string): string {
  return matchRules(RULES, input, FALLBACK);
}

export function findAnswerEn(input: string): string {
  return matchRules(RULES_EN, input, FALLBACK_EN);
}
