export const caseStudyTiktok = {
  de: {
    back: "Zurück zur Übersicht",
    hero: {
      title: "Case Study: TikTok Autopilot",
      subtitle: "Vollautonome Headless Data- & AI-Pipeline",
      pitch: "Von der Daten-Beschaffung bis zum Upload: Ein autonomes MLOps-System, das ohne manuelle Eingriffe täglich Videos generiert, schneidet und hochlädt.",
      tags: ["Python", "Playwright", "Whisper", "Gemini", "OCR", "FFmpeg"],
    },
    sections: {
      architecture: {
        title: "Die Architektur",
        content: "Die Pipeline besteht aus sechs vollautomatisierten Stufen, orchestriert durch einen zentralen Scheduler. Als Quelle dienen je nach Kanal gescrapte TikTok-Videos (Playwright) oder kuratierte, faktengeprüfte Recherche-Datenbanken, die ein autonomer KI-Agent nachts selbstständig nachfüllt.",
        mermaid: `
graph TD
    A[1. Scrape<br>Playwright] -->|TikTok Hashtags| B[2. Extract<br>Whisper + OCR]
    B -->|Transkript + CC| C[3. Build<br>Gemini TTS + FFmpeg]
    C -->|Audio + Video| D[3b. Overlays<br>HeyGen HyperFrames]
    D -->|Finance Charts| E[4. Mix<br>Background Music]
    E --> F[5. Enqueue<br>Slot Management]
    F --> G[6. Headless Upload<br>TikTok & IG & YT]
        `,
      },
      deepDives: {
        title: "Deep Dives & Herausforderungen",
        items: [
          {
            title: "1. Resilientes Error Handling (TTS Defekte)",
            content: "Text-to-Speech Modelle wie Gemini halluzinieren gelegentlich (verschlucken Satzteile oder interpretieren Ziffern falsch). Ich habe ein eigenes Quality Gate (Bag-of-Words & Similarity) gebaut, das das finale Audio zurücktranskribiert (Whisper) und gegen das Original-Skript abgleicht. Fehler werden erkannt und eine Neusynthese getriggert.",
          },
          {
            title: "2. Headless Automation (Consent Walls)",
            content: "Der Upload erfolgt headless via Playwright. Größtes Problem: Unberechenbare UI-Blocker wie die 'Meta Consent Wall' bei Instagram oder in-App Dialoge ('Automatische Inhaltsprüfungen'). Die Pipeline erkennt diese Blocker per DOM-Inspektion und klickt sie autonom durch, um die Upload-Quote bei 100% zu halten.",
          },
          {
            title: "3. Hybrid Visuals (Code-to-Video)",
            content: "Für den 'Finance'-Kanal reichen statische Videos nicht aus. Ich nutze HeyGen HyperFrames (HTML/CSS/GSAP), um datengetriebene Charts und Overlays per Code zu generieren. FFmpeg montiert diese dynamischen Overlays framengenau über Hintergrund-Videos (Grok Imagine).",
          },
          {
            title: "4. Autonomer Research-Agent (Self-Refueling)",
            content: "Zwei Kanäle beziehen ihre Inhalte nicht aus Scraping, sondern aus faktengeprüften Recherche-Datenbanken. Damit diese nie leerlaufen, füllt ein nächtlicher Task sie autonom nach: Ein Gate prüft den Füllstand, ein headless laufender KI-Agent recherchiert neue Fälle und Themen im Internet, ein Validator prüft Struktur und Fakten. Das System beschafft sich seinen Rohstoff selbst.",
          },
          {
            title: "5. Datengetriebenes Brand-Management",
            content: "Als einer der Kanäle bei ~2k Reichweite stagnierte, zeigte die Analyse: Brand-Drift, nicht Qualität. Die Nische wurde datenbasiert verbreitert und ein wöchentlicher, automatischer Brand-Check etabliert, der Ausreißer, Follower-Wachstum und Skip-Quote gegen die Baseline prüft — das Verdikt kommt per Telegram.",
          },
        ]
      },
      engineering: {
        tag: "Unter der Haube",
        title: "Engineering Details",
        items: [
          {
            title: "Selbstkorrigierendes TTS-Quality-Gate",
            content: "Jedes Voiceover wird per Whisper zurücktranskribiert und über Bag-of-Words- und Similarity-Scoring gegen das Originalskript verifiziert. Fällt der Score durch, triggert die Pipeline autonom eine Neusynthese — defekte Audios erreichen nie den Schnitt.",
          },
          {
            title: "API-Key-Orchestrierung",
            content: "16 rotierende Gemini-Keys im Round-Robin mit erzwungenem Mindestabstand von 0,7 s pro Request. Rate-Limits werden nicht abgefangen, sondern by design nie erreicht.",
          },
          {
            title: "Code-to-Video-Rendering",
            content: "Datengetriebene Finanz-Charts entstehen als HTML/CSS/GSAP-Animationen (HeyGen HyperFrames) und werden von FFmpeg framegenau über KI-generierte Hintergrundvideos (Grok Imagine) komponiert.",
          },
          {
            title: "DOM-basierte Blocker-Erkennung",
            content: "Consent Walls und In-App-Dialoge werden zur Laufzeit per DOM-Inspektion erkannt und autonom weggeklickt — Upload-Quote 100 %, ohne menschlichen Eingriff.",
          },
          {
            title: "Slot-basiertes Publishing",
            content: "Fertige Videos landen in einer Upload-Queue mit kanalspezifischen Slots. Der Scheduler fährt Generate- und Upload-Zyklen pro Kanal getrennt — z. B. 07:00 Generate, 09/15/21 Upload.",
          },
          {
            title: "Cost Engineering",
            content: "Aggressives Caching von Zwischenartefakten und zentrales Rate-Limit-Management drücken die operativen Kosten auf unter 0,05 € für 3 Videos pro Tag.",
          },
          {
            title: "CC-first-Extraktion",
            content: "Statt jeden Kandidaten 1–3 Minuten auf CPU zu transkribieren, holt die Pipeline zuerst TikToks eigenen Untertitel-Track (~1 s, ohne Video-Download). Whisper und OCR sind nur noch Fallback; ein Caption-Vor-Gate verwirft Off-Topic-Kandidaten, bevor überhaupt transkribiert wird.",
          },
          {
            title: "Instagram-Caption-Injection",
            content: "Instagram übernimmt Composer-Text stillschweigend nicht in den Publish-Request. Der Uploader injiziert die Caption deshalb per Request-Interception direkt in den Submit-Payload — verifiziert gegen die Live-og:description, nie gegen das DOM, abgesichert durch einen täglichen automatischen Gegencheck.",
          },
          {
            title: "Cross-Platform-Publishing",
            content: "YouTube Shorts werden einen Tag im Voraus über die YouTube Data API geplant, Instagram Reels laufen über geteilte bzw. kanaleigene Konten in alternierenden Tages-Slots — orchestriert vom selben Scheduler wie TikTok.",
          },
        ],
      },
      results: {
        title: "Business Impact",
        content: "Das System läuft produktiv auf 4 Kanälen. Es spart pro Woche über 40 Stunden manuelle Arbeit und skaliert beliebig. Durch das intelligente Caching und die API-Rate-Limit-Verwaltung betragen die operativen Kosten für 3 Videos pro Tag weniger als 0,05 €.",
        channelsLabel: "Live in Produktion",
      }
    }
  },
  en: {
    back: "Back to Portfolio",
    hero: {
      title: "Case Study: TikTok Autopilot",
      subtitle: "Fully Autonomous Headless Data & AI Pipeline",
      pitch: "From data acquisition to upload: An autonomous MLOps system that generates, edits, and uploads videos daily without manual intervention.",
      tags: ["Python", "Playwright", "Whisper", "Gemini", "OCR", "FFmpeg"],
    },
    sections: {
      architecture: {
        title: "The Architecture",
        content: "The pipeline consists of six fully automated stages, orchestrated by a central scheduler. Depending on the channel, the source is either scraped TikTok videos (Playwright) or curated, fact-checked research databases that an autonomous AI agent refills overnight.",
        mermaid: `
graph TD
    A[1. Scrape<br>Playwright] -->|TikTok Hashtags| B[2. Extract<br>Whisper + OCR]
    B -->|Transcript + CC| C[3. Build<br>Gemini TTS + FFmpeg]
    C -->|Audio + Video| D[3b. Overlays<br>HeyGen HyperFrames]
    D -->|Finance Charts| E[4. Mix<br>Background Music]
    E --> F[5. Enqueue<br>Slot Management]
    F --> G[6. Headless Upload<br>TikTok & IG & YT]
        `,
      },
      deepDives: {
        title: "Deep Dives & Challenges",
        items: [
          {
            title: "1. Resilient Error Handling (TTS Defects)",
            content: "Text-to-Speech models like Gemini occasionally hallucinate (skip parts of sentences or misinterpret digits). I built a custom quality gate (Bag-of-Words & Similarity) that back-transcribes the final audio (Whisper) and compares it against the original script. Errors are caught and a resynthesis is triggered autonomously.",
          },
          {
            title: "2. Headless Automation (Consent Walls)",
            content: "Uploads are handled headless via Playwright. The biggest hurdle: Unpredictable UI blockers like the 'Meta Consent Wall' on Instagram or in-app dialogs. The pipeline detects these blockers via DOM inspection and clicks through them autonomously, keeping the upload success rate at 100%.",
          },
          {
            title: "3. Hybrid Visuals (Code-to-Video)",
            content: "For the 'Finance' channel, static videos aren't enough. I use HeyGen HyperFrames (HTML/CSS/GSAP) to generate data-driven charts and overlays via code. FFmpeg accurately composites these dynamic overlays onto background videos (Grok Imagine).",
          },
          {
            title: "4. Autonomous Research Agent (Self-Refueling)",
            content: "Two channels don't source their content from scraping but from fact-checked research databases. To keep them from ever running dry, a nightly task refills them autonomously: a gate checks the fill level, a headless AI agent researches new cases and topics on the web, a validator checks structure and facts. The system procures its own raw material.",
          },
          {
            title: "5. Data-Driven Brand Management",
            content: "When one channel plateaued at ~2k reach, analysis showed brand drift — not quality — was the cause. The niche was widened based on data, and a weekly automated brand check now compares outliers, follower growth and skip rate against the baseline — the verdict is delivered via Telegram.",
          },
        ]
      },
      engineering: {
        tag: "Under the Hood",
        title: "Engineering Details",
        items: [
          {
            title: "Self-Correcting TTS Quality Gate",
            content: "Every voiceover is back-transcribed with Whisper and verified against the original script via bag-of-words and similarity scoring. If the score fails, the pipeline autonomously triggers a resynthesis — defective audio never reaches the edit.",
          },
          {
            title: "API Key Orchestration",
            content: "16 rotating Gemini keys in round-robin with an enforced minimum interval of 0.7s per request. Rate limits aren't handled — by design, they are never hit.",
          },
          {
            title: "Code-to-Video Rendering",
            content: "Data-driven finance charts are built as HTML/CSS/GSAP animations (HeyGen HyperFrames) and composited frame-accurately by FFmpeg onto AI-generated background videos (Grok Imagine).",
          },
          {
            title: "DOM-Based Blocker Detection",
            content: "Consent walls and in-app dialogs are detected at runtime via DOM inspection and dismissed autonomously — 100% upload success rate, zero human intervention.",
          },
          {
            title: "Slot-Based Publishing",
            content: "Finished videos enter an upload queue with channel-specific slots. The scheduler runs generate and upload cycles separately per channel — e.g. 07:00 generate, 09/15/21 upload.",
          },
          {
            title: "Cost Engineering",
            content: "Aggressive caching of intermediate artifacts and central rate-limit management push operational costs below €0.05 for 3 videos per day.",
          },
          {
            title: "CC-First Extraction",
            content: "Instead of transcribing every candidate for 1–3 minutes on CPU, the pipeline first fetches TikTok's own subtitle track (~1s, no video download needed). Whisper and OCR are fallback only; a caption pre-gate discards off-topic candidates before anything gets transcribed.",
          },
          {
            title: "Instagram Caption Injection",
            content: "Instagram silently drops composer text from the publish request. The uploader therefore injects the caption via request interception directly into the submit payload — verified against the live og:description, never the DOM, backed by a daily automated live check.",
          },
          {
            title: "Cross-Platform Publishing",
            content: "YouTube Shorts are scheduled one day ahead via the YouTube Data API; Instagram Reels run on shared or channel-owned accounts in alternating daily slots — orchestrated by the same scheduler as TikTok.",
          },
        ],
      },
      results: {
        title: "Business Impact",
        content: "The system runs in production across 4 channels. It saves over 40 hours of manual work per week and scales infinitely. Thanks to smart caching and API rate limit management, operational costs for 3 videos a day are under €0.05.",
        channelsLabel: "Live in Production",
      }
    }
  }
};
