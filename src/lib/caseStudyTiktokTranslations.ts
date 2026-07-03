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
        content: "Die Pipeline besteht aus sechs vollautomatisierten Stufen, orchestriert durch einen zentralen Scheduler.",
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
        content: "The pipeline consists of six fully automated stages, orchestrated by a central scheduler.",
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
