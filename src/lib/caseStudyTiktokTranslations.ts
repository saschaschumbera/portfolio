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
      results: {
        title: "Business Impact",
        content: "Das System läuft produktiv auf 4 Kanälen (darunter @geldnerd und @gedankenguide). Es spart pro Woche über 40 Stunden manuelle Arbeit und skaliert beliebig. Durch das intelligente Caching und die API-Rate-Limit-Verwaltung betragen die operativen Kosten für 3 Videos pro Tag weniger als 0,05 €.",
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
      results: {
        title: "Business Impact",
        content: "The system runs in production across 4 channels (including @geldnerd and @gedankenguide). It saves over 40 hours of manual work per week and scales infinitely. Thanks to smart caching and API rate limit management, operational costs for 3 videos a day are under €0.05.",
      }
    }
  }
};
