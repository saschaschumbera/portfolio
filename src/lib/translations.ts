export const t = {
  de: {
    nav: {
      links: [
        { label: "Projekte", href: "#projects" },
        { label: "Über mich", href: "#about" },
        { label: "Kontakt", href: "#contact" },
      ],
    },
    hero: {
      headline: "Ich automatisiere Unternehmens\u00ADprozesse mit KI.",
      intro: "10 Jahre Kreditrisiko und Banking, heute KI-Entwicklung: Ich weiß, wo Prozesse in Finanzunternehmen hängen — und baue die Systeme, die sie lösen. Nachvollziehbar, mit belegbaren Ergebnissen und Datenschutz von Anfang an.",
      meta: "Referent Kreditrisikosteuerung bei Bank11 · B.Sc. Angewandte KI (laufend) · Korschenbroich, NRW",
      availability: "Offen für Rollen in KI & Prozessautomatisierung",
      cvRequest: "Lebenslauf anfordern",
      cvSubject: "Anfrage Lebenslauf",
      askBot: "Meinen KI-Assistenten fragen",
    },
    projects: {
      tag: "Projekte",
      heading: "Ausgewählte Arbeiten",
      subheading: "Zwei Systeme im Detail — gebaut, getestet und im Einsatz.",
      repoOnRequest: "Repository auf Anfrage",
      readCaseStudy: "Case Study lesen",
      viewCode: "Code auf GitHub",
      demoVideo: "Demo-Video",
      moreHeading: "Weitere Projekte",
      featured: [
        {
          title: "Papierkram-Orakel",
          subtitle: "Lokales RAG-Wissenssystem mit Quellenpflicht",
          status: "Abgeschlossen · Open Source",
          description: "Verwandelt einen Ordner voller Dokumente — Anleitungen, Verträge, Garantien — in eine befragbare Wissensbasis. Jede Antwort nennt Datei und Seite. Suche und Ranking laufen komplett lokal; an das Sprachmodell gehen nur die belegten Textstellen. Dasselbe Muster trägt überall, wo Antworten aus Richtlinien, Verträgen oder Handbüchern nachprüfbar sein müssen.",
          metrics: [
            { value: "20/20", label: "Eval-Fragen korrekt und mit richtiger Quelle" },
            { value: "36", label: "Offline-Unit-Tests in der CI" },
            { value: "100 %", label: "lokale Suche & Ranking, ohne LLM" },
          ],
          highlights: [
            "Hybrid Search: Vektor-Suche (sqlite-vec) + BM25 (FTS5), fusioniert per Reciprocal Rank Fusion — exakte Nummern schlagen semantische Beinahe-Treffer",
            "Zitatpflicht statt Halluzination: das LLM sieht nur belegte Textstellen und muss Nichtwissen zugeben",
            "Eval-getrieben entwickelt: ein aufgedeckter Retrieval-Fehler führte zur wichtigsten Architektur-Entscheidung",
          ],
        },
        {
          title: "TikTok Autopilot",
          subtitle: "Autonome AI-Pipeline im Dauerbetrieb",
          status: "Produktiv (Live)",
          description: "Ein headless Daten- und KI-System, das ohne manuelle Eingriffe täglich Videos recherchiert, redigiert, vertont, schneidet und veröffentlicht. Der Kern ist nicht der Content, sondern der Betrieb: Qualitäts-Gates, Fehler-Recovery, Kostenkontrolle und Monitoring — so, wie ein Produktivsystem laufen muss.",
          metrics: [
            { value: "6", label: "vollautomatisierte Pipeline-Stufen" },
            { value: "4", label: "Kanäle im täglichen Produktivbetrieb" },
            { value: "< 0,05 €", label: "Betriebskosten für 3 Videos pro Tag" },
          ],
          highlights: [
            "Automatisierte Quality-Gates erkennen KI-Halluzinationen, bevor etwas veröffentlicht wird",
            "Resilienz: Fehler-Recovery, zentrales Rate-Limit-Management und Caching von Zwischenartefakten",
            "Wöchentlicher automatischer Performance-Check gegen die Baseline, Verdikt per Telegram",
          ],
        },
      ],
      more: [
        {
          title: "DocInspect",
          subtitle: "KI-gestützte Vertrags- und Dokumentenanalyse",
          status: "In Entwicklung",
          description: "Analysiert Verträge und Dokumente mit Risiko-Scoring in Ampellogik und Handlungsempfehlungen. Privacy-by-Design: sensible Daten werden lokal pseudonymisiert, bevor ein Multi-Agent-Workflow mit Provider-Routing sie verarbeitet.",
        },
      ],
    },
    about: {
      tag: "Über mich",
      heading: "Wo Finanz-Expertise auf KI trifft",
      p1: "Über zehn Jahre lang habe ich eigenverantwortlich Kreditentscheidungen getroffen, Risikomodelle angewendet und Betrugsparameter analysiert — und dabei Prozesse mit SQL, VBA, UIPath und Power BI automatisiert. Ich weiß, welche Probleme in Unternehmen wirklich schmerzen.",
      p2: "Heute baue ich End-to-End KI-Anwendungen mit Python, LLMs und Agenten. Ich suche eine Rolle, in der ich genau das zusammenbringe: Fachprozesse verstehen und sie mit KI vereinfachen und automatisieren.",
      stackLabel: "Werkzeuge",
      stack: "Python · SQL · TypeScript · FastAPI · Next.js · LLM-APIs (Claude, Gemini) · RAG · Agentic AI · Ollama · Playwright · OCR · Power BI · SAS",
      timelineLabel: "Werdegang",
      timeline: [
        { period: "seit 09/2023", role: "Referent Kreditrisikosteuerung", company: "Bank11" },
        { period: "11/2025 – 10/2029", role: "B.Sc. Angewandte KI (laufend)", company: "IU Internationale Hochschule" },
        { period: "2022 – 2023", role: "Retail Underwriter", company: "De Lage Landen Leasing" },
        { period: "2022", role: "Application Developer — Full Stack", company: "Adelta Finanz AG" },
        { period: "2016 – 2021", role: "Kreditentscheidung & komm. Gruppenleitung", company: "RCI Banque" },
      ],
    },
    contact: {
      tag: "Kontakt",
      heading: "Sprechen wir",
      subheading: "Sie suchen jemanden, der Fachprozesse versteht und sie mit KI automatisiert? Ich freue mich über Ihre Nachricht — den Lebenslauf schicke ich gern auf Anfrage.",
      location: "Korschenbroich, NRW — Deutschland",
    },
    footer: {
      impressum: "Impressum",
      datenschutz: "Datenschutz",
      builtWith: "Built with Next.js · Motion · Tailwind CSS",
    },
    chatbot: {
      title: "Sascha's Assistent",
      online: "Online",
      placeholder: "Frage stellen...",
      initialMessage: "Hi! Ich beantworte gerne Fragen über Sascha — seinen Werdegang, Projekte, Skills oder wie du ihn kontaktieren kannst.",
      suggestions: [
        "Was macht Sascha besonders?",
        "Welche KI-Projekte hat er gebaut?",
        "Wie kann ich ihn kontaktieren?",
        "Was ist sein Tech-Stack?",
      ],
      close: "Chat schließen",
      open: "Chat öffnen",
    },
  },

  en: {
    nav: {
      links: [
        { label: "Projects", href: "#projects" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ],
    },
    hero: {
      headline: "I automate business processes with AI.",
      intro: "10 years in credit risk and banking, now AI development: I know where processes in financial companies get stuck — and I build the systems that fix them. Traceable, with verifiable results and privacy built in from the start.",
      meta: "Credit Risk Specialist at Bank11 · B.Sc. Applied AI (ongoing) · Korschenbroich, Germany",
      availability: "Open to roles in AI & process automation",
      cvRequest: "Request my CV",
      cvSubject: "CV request",
      askBot: "Ask my AI assistant",
    },
    projects: {
      tag: "Projects",
      heading: "Selected Work",
      subheading: "Two systems in depth — built, tested and in use.",
      repoOnRequest: "Repository on request",
      readCaseStudy: "Read case study",
      viewCode: "Code on GitHub",
      demoVideo: "Demo video",
      moreHeading: "More Projects",
      featured: [
        {
          title: "Papierkram-Orakel",
          subtitle: "Local RAG Knowledge System with Mandatory Citations",
          status: "Completed · Open Source",
          description: "Turns a folder full of documents — manuals, contracts, warranties — into a queryable knowledge base. Every answer names file and page. Search and ranking run fully local; only the cited passages are sent to the language model. The same pattern applies wherever answers from policies, contracts or handbooks must be verifiable.",
          metrics: [
            { value: "20/20", label: "eval questions correct, with the right source" },
            { value: "36", label: "offline unit tests in CI" },
            { value: "100%", label: "local search & ranking, no LLM" },
          ],
          highlights: [
            "Hybrid search: vector search (sqlite-vec) + BM25 (FTS5), fused via Reciprocal Rank Fusion — exact numbers beat semantic near-misses",
            "Citations over hallucination: the LLM only sees retrieved passages and must admit when it doesn't know",
            "Eval-driven: an uncovered retrieval failure led to the key architecture decision",
          ],
        },
        {
          title: "TikTok Autopilot",
          subtitle: "Autonomous AI Pipeline in Continuous Operation",
          status: "Live (Production)",
          description: "A headless data and AI system that researches, edits, voices, cuts and publishes videos every day without manual intervention. The core isn't the content but the operations: quality gates, error recovery, cost control and monitoring — the way a production system has to run.",
          metrics: [
            { value: "6", label: "fully automated pipeline stages" },
            { value: "4", label: "channels in daily production" },
            { value: "< €0.05", label: "running cost for 3 videos per day" },
          ],
          highlights: [
            "Automated quality gates catch AI hallucinations before anything is published",
            "Resilience: error recovery, central rate-limit management and caching of intermediate artefacts",
            "Weekly automated performance check against the baseline, verdict via Telegram",
          ],
        },
      ],
      more: [
        {
          title: "DocInspect",
          subtitle: "AI-Powered Contract & Document Analysis",
          status: "In Development",
          description: "Analyses contracts and documents with traffic-light risk scoring and recommendations. Privacy-by-Design: sensitive data is pseudonymised locally before a multi-agent workflow with provider routing processes it.",
        },
      ],
    },
    about: {
      tag: "About",
      heading: "Where finance expertise meets AI",
      p1: "For over ten years I made independent credit decisions, applied risk models and analysed fraud parameters — automating processes with SQL, VBA, UIPath and Power BI along the way. I know which problems really hurt in a company.",
      p2: "Today I build end-to-end AI applications with Python, LLMs and agents. I'm looking for a role that brings exactly this together: understanding business processes and simplifying and automating them with AI.",
      stackLabel: "Toolbox",
      stack: "Python · SQL · TypeScript · FastAPI · Next.js · LLM APIs (Claude, Gemini) · RAG · Agentic AI · Ollama · Playwright · OCR · Power BI · SAS",
      timelineLabel: "Experience",
      timeline: [
        { period: "since 09/2023", role: "Credit Risk Management Specialist", company: "Bank11" },
        { period: "11/2025 – 10/2029", role: "B.Sc. Applied AI (ongoing)", company: "IU International University" },
        { period: "2022 – 2023", role: "Retail Underwriter", company: "De Lage Landen Leasing" },
        { period: "2022", role: "Application Developer — Full Stack", company: "Adelta Finanz AG" },
        { period: "2016 – 2021", role: "Credit Decisions & Acting Team Lead", company: "RCI Banque" },
      ],
    },
    contact: {
      tag: "Contact",
      heading: "Let's talk",
      subheading: "Looking for someone who understands business processes and automates them with AI? I look forward to your message — my CV is available on request.",
      location: "Korschenbroich, NRW — Germany",
    },
    footer: {
      impressum: "Imprint",
      datenschutz: "Privacy Policy",
      builtWith: "Built with Next.js · Motion · Tailwind CSS",
    },
    chatbot: {
      title: "Sascha's Assistant",
      online: "Online",
      placeholder: "Ask a question...",
      initialMessage: "Hi! I'm happy to answer questions about Sascha — his background, projects, skills or how to get in touch.",
      suggestions: [
        "What makes Sascha stand out?",
        "Which AI projects has he built?",
        "How can I contact him?",
        "What is his tech stack?",
      ],
      close: "Close chat",
      open: "Open chat",
    },
  },
};

export type Lang = "de" | "en";
