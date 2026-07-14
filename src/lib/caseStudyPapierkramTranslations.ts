export const caseStudyPapierkram = {
  de: {
    back: "Zurück zur Übersicht",
    hero: {
      title: "Case Study: Papierkram-Orakel",
      subtitle: "Lokales RAG-System für den privaten Papierkram",
      pitch: "Bedienungsanleitungen, Verträge, Garantien, Rezepte: der Ordner, den niemand liest — verwandelt in eine Wissensbasis, die Fragen in Alltagssprache beantwortet und jede Aussage mit Datei und Seite belegt.",
      tags: ["Python", "RAG", "Hybrid Search", "SQLite", "Sentence-Transformers", "Tesseract OCR"],
    },
    sections: {
      why: {
        title: "Warum dieses Projekt?",
        content: "Jeder Haushalt besitzt einen Ordner (oder zwanzig), dessen Inhalt praktisch nie gelesen wird — bis die Waschmaschine blinkt oder eine Kündigungsfrist droht. Klassische Volltextsuche scheitert, weil man die Wortwahl des Dokuments nicht kennt; ein LLM einfach fragen scheitert, weil es den Mietvertrag nicht kennt und im Zweifel halluziniert. RAG (Retrieval Augmented Generation) löst genau dieses Problem: Erst finden, dann formulieren. Bewusst lokal gebaut — private Verträge und Belege gehören nicht als Suchindex in eine Cloud, und eine SQLite-Datei pro Wissensgebiet bedeutet: kein Vendor-Lock-in, jederzeit exportierbar, löschbar, versionierbar.",
        useCasesLabel: "Wofür es im Alltag taugt",
        useCases: [
          "Gerätehandbücher & Fehlercodes",
          "Verträge & Kündigungsfristen",
          "Garantien & Kaufbelege",
          "Steuerunterlagen",
          "Hausbau-Dokumente",
          "Familienrezepte",
        ],
      },
      architecture: {
        title: "Die Architektur",
        content: "Zwei Phasen: Bei der Indexierung werden Dokumente geparst (inkl. OCR für Scans und Handyfotos), absatzweise in ~700-Zeichen-Chunks geschnitten, lokal embedded und in einer SQLite-Datei mit Vektor- und Volltextindex abgelegt. Bei jeder Frage laufen Vektor-Suche und BM25 parallel, werden per Reciprocal Rank Fusion verschmolzen, ein Cross-Encoder sortiert die Kandidaten fein — und erst dann formuliert ein LLM die Antwort, strikt begrenzt auf die gefundenen Textstellen.",
        diagramAlt: "Workflow-Diagramm: Indexierung und Abfrage der lokalen RAG-Pipeline",
        facts: [
          "Ein einziger Cloud-Schritt: Suche, Ranking und OCR laufen komplett lokal auf CPU — nur die finale Antwortformulierung nutzt ein LLM.",
          "Hybrid statt nur semantisch: BM25 rettet exakte Treffer wie Artikelnummern, bei denen reine Vektor-Suche das »bedeutungsähnlichste«, aber falsche Teil wählen würde.",
          "Domain-Architektur: Jedes Wissensgebiet ist ein Ordner mit YAML-Konfiguration (Persona, Chunking, Retrieval-Parameter) — neue Gebiete ohne eine Zeile Kern-Code.",
        ],
      },
      deepDives: {
        title: "Deep Dives & Herausforderungen",
        items: [
          {
            title: "1. Hybrid Search mit Reciprocal Rank Fusion",
            content: "Semantische Suche findet »Feinwäsche-Programm«, wenn man nach »Wolle waschen« fragt — aber sie verwechselt Ersatzteil 4055-C mit 4055-D, weil beide fast identisch klingen. Deshalb laufen Vektor-KNN (sqlite-vec) und BM25-Volltextsuche (FTS5) parallel; die Fusion arbeitet rein rangbasiert (Score = Σ 1/(60+Rang)), wodurch Cosine-Distanz und BM25-Score vergleichbar werden, ohne Normalisierungs-Tricks. Ein Chunk, der in beiden Listen vorn liegt, gewinnt.",
          },
          {
            title: "2. Ehrlichkeit durch Architektur, nicht durch Hoffnung",
            content: "Das LLM bekommt ausschließlich die gefundenen Textstellen plus die Anweisung, jede Aussage mit [Quelle: Datei | Ort] zu belegen und Nichtwissen zuzugeben. Im Praxistest mit echten Bauprojekt-Dokumenten antwortete das System auf eine Frage nach Kosten, die nirgends dokumentiert waren: »Das steht nicht in den Unterlagen« — statt plausibel klingende Zahlen zu erfinden. Genau dieses Verhalten ist das Qualitätsmerkmal eines RAG-Systems.",
          },
          {
            title: "3. OCR-Fallback für die analoge Realität",
            content: "Der Papierkram-Ordner enthält nicht nur digitale PDFs, sondern gescannte Kaufbelege und Handyfotos von Quittungen. Die Parser-Registry erkennt Seiten ohne Textebene und schickt sie automatisch durch Tesseract-OCR — im Praxistest wurde ein gescannter Behörden-Schriftwechsel korrekt indexiert und zitierfähig, inklusive Kennzeichnung »(OCR)« in der Quellenangabe.",
          },
          {
            title: "4. Reranking mit Kandidaten-Pool",
            content: "Der Cross-Encoder liest Frage und Chunk gemeinsam und bewertet die Relevanz deutlich genauer als der Vergleich zweier vorab berechneter Vektoren. Damit er etwas zu entscheiden hat, holt die Hybrid-Suche bewusst einen vergrößerten Kandidaten-Pool (Vektor-Top-8 + BM25-Top-8), aus dem nach dem Reranking die besten vier ans LLM gehen.",
          },
          {
            title: "5. Qualität messbar machen statt durchklicken",
            content: "Ein Eval-Testset mit 20 handgeschriebenen Fragen prüft Retrieval-Trefferquote und Antwort-Korrektheit gegen erwartete Quellen und Stichworte — inklusive bewusst harter Fälle wie fast identischer Artikelnummern und einem synthetisch gescannten PDF ohne Textebene. Aktueller Stand: 20/20 Retrieval-Treffer, 20/20 korrekte Antworten.",
          },
        ],
      },
      llmSwap: {
        tag: "Austauschbares LLM-Backend",
        title: "Das LLM ist der kleinste Baustein — und in Minuten ersetzt",
        content: "Die gesamte Intelligenz der Suche — Embeddings, Hybrid-Retrieval, Reranking — läuft lokal und modellunabhängig. Das Sprachmodell kommt erst im allerletzten Schritt ins Spiel und ist hinter einer einzigen Funktion gekapselt: generate_answer(domain, frage, fundstellen). Wer volle Offline-Fähigkeit will, tauscht diese eine Funktion gegen einen Ollama-Call — der Rest des Systems merkt davon nichts.",
        options: [
          {
            title: "Claude CLI (aktuell)",
            desc: "Headless über die bestehende Subscription, Modell pro Wissensgebiet wählbar (haiku/sonnet/opus).",
          },
          {
            title: "Ollama — komplett lokal",
            desc: "Ein HTTP-Call an localhost statt Subprocess: qwen2.5 oder llama3.1 machen das System nach dem Erstsetup vollständig offline-fähig.",
          },
          {
            title: "Beliebige API",
            desc: "Anthropic-, OpenAI- oder ein anderer API-Call — Prompt-Aufbau und Zitatpflicht bleiben identisch.",
          },
        ],
        note: "Suche und Ranking bleiben in jedem Fall lokal — getauscht wird nur, wer den letzten Satz formuliert.",
      },
      engineering: {
        tag: "Unter der Haube",
        title: "Engineering Details",
        items: [
          {
            title: "Eine SQLite-Datei pro Wissensgebiet",
            content: "Drei Tabellen mit geteilter Row-ID: Klartext + Metadaten, FTS5-Volltextindex, sqlite-vec-Vektorindex (384 Dim.). Export, Backup oder Löschen = eine Datei kopieren oder entfernen.",
          },
          {
            title: "Absatzbewusstes Chunking",
            content: "~700 Zeichen mit 10 % Overlap, geschnitten an Absatzgrenzen statt mitten im Satz; überlange Absätze fallen auf ein Sliding Window zurück. Jeder Chunk behält Datei und Fundstelle für das spätere Zitat.",
          },
          {
            title: "Lokale Modelle, lazy geladen",
            content: "Multilingualer MiniLM-Bi-Encoder für Embeddings, mmarco-Cross-Encoder fürs Reranking — beide CPU-tauglich und erst beim ersten Zugriff geladen, damit die CLI ohne Modell-Load startet.",
          },
          {
            title: "Parser-Registry",
            content: "Dateiendung → Parser-Funktion: PDF (digital + Scan), DOCX inkl. Tabellen, Markdown, TXT, JPG/PNG/HEIC. Neue Formate sind eine Funktion im Dict, kein Umbau.",
          },
          {
            title: "Abgesicherter LLM-Aufruf",
            content: "Headless-Call mit deaktivierten Tools, ohne Session-Persistenz, mit Timeout; leere Trefferliste erzeugt eine statische Antwort ganz ohne LLM-Call.",
          },
          {
            title: "Web-UI für Nicht-Techniker",
            content: "FastAPI + Chat-Oberfläche: neues Wissensgebiet anlegen, Dateien per Drag & Drop hochladen, indexieren, fragen — der komplette Workflow ohne Terminal.",
          },
        ],
      },
      results: {
        title: "Ergebnis",
        content: "Das System beantwortet im Eval 20 von 20 Testfragen korrekt und mit richtiger Quelle — darunter die klassische RAG-Falle fast identischer Artikelnummern und ein nur per OCR lesbares Scan-PDF. Im Praxistest mit echten Hausbau-Dokumenten lieferte es seitengenaue Antworten aus einer 20-seitigen Baubeschreibung, kombinierte Behördenschreiben und Leitfaden zu einer sauber zitierten Antwort — und gab bei einer nicht dokumentierten Kostenfrage ehrlich zu, die Antwort nicht zu kennen.",
      },
    },
  },
  en: {
    back: "Back to Portfolio",
    hero: {
      title: "Case Study: Papierkram-Orakel",
      subtitle: "A Local RAG System for Household Paperwork",
      pitch: "Appliance manuals, contracts, warranties, recipes: the folder nobody ever reads — turned into a knowledge base that answers plain-language questions and backs every statement with file and page.",
      tags: ["Python", "RAG", "Hybrid Search", "SQLite", "Sentence-Transformers", "Tesseract OCR"],
    },
    sections: {
      why: {
        title: "Why this project?",
        content: "Every household owns a folder (or twenty) whose contents are never read — until the washing machine blinks or a cancellation deadline looms. Classic full-text search fails because you don't know the document's wording; simply asking an LLM fails because it has never seen your lease and will hallucinate when in doubt. RAG (Retrieval Augmented Generation) solves exactly this: retrieve first, phrase later. Deliberately built local-first — private contracts and receipts don't belong in a cloud search index, and one SQLite file per knowledge domain means no vendor lock-in: exportable, deletable, versionable at any time.",
        useCasesLabel: "What it's good for day-to-day",
        useCases: [
          "Appliance manuals & error codes",
          "Contracts & cancellation deadlines",
          "Warranties & receipts",
          "Tax documents",
          "Home-building paperwork",
          "Family recipes",
        ],
      },
      architecture: {
        title: "The Architecture",
        content: "Two phases: During indexing, documents are parsed (including OCR for scans and phone photos), cut into ~700-character chunks along paragraph boundaries, embedded locally and stored in a SQLite file with both a vector and a full-text index. On every question, vector search and BM25 run in parallel, get fused via Reciprocal Rank Fusion, a cross-encoder re-ranks the candidates — and only then does an LLM phrase the answer, strictly limited to the retrieved passages.",
        diagramAlt: "Workflow diagram: indexing and querying of the local RAG pipeline",
        facts: [
          "A single cloud step: search, ranking and OCR run fully local on CPU — only the final answer phrasing uses an LLM.",
          "Hybrid instead of semantic-only: BM25 rescues exact matches like part numbers, where pure vector search would pick the most similar-sounding but wrong part.",
          "Domain architecture: every knowledge domain is a folder with a YAML config (persona, chunking, retrieval parameters) — new domains without touching a line of core code.",
        ],
      },
      deepDives: {
        title: "Deep Dives & Challenges",
        items: [
          {
            title: "1. Hybrid Search with Reciprocal Rank Fusion",
            content: "Semantic search finds the \"delicates program\" when you ask about \"washing wool\" — but it confuses spare part 4055-C with 4055-D because both sound nearly identical. That's why vector KNN (sqlite-vec) and BM25 full-text search (FTS5) run in parallel; the fusion is purely rank-based (score = Σ 1/(60+rank)), which makes cosine distance and BM25 scores comparable without any normalisation tricks. A chunk ranking high in both lists wins.",
          },
          {
            title: "2. Honesty by architecture, not by hope",
            content: "The LLM receives nothing but the retrieved passages plus the instruction to back every statement with [source: file | location] and to admit ignorance. In a real-world test with actual construction-project documents, the system answered a question about costs that were documented nowhere with \"that's not in the documents\" — instead of inventing plausible-sounding numbers. Exactly this behaviour is the quality hallmark of a RAG system.",
          },
          {
            title: "3. OCR fallback for analogue reality",
            content: "The paperwork folder doesn't just hold digital PDFs but scanned receipts and phone photos of invoices. The parser registry detects pages without a text layer and routes them through Tesseract OCR automatically — in the real-world test, a scanned exchange of letters with a public authority was indexed and became citable, flagged with \"(OCR)\" in the source reference.",
          },
          {
            title: "4. Reranking with a candidate pool",
            content: "The cross-encoder reads question and chunk together and judges relevance far more accurately than comparing two precomputed vectors. To give it something to decide, the hybrid search deliberately fetches an enlarged candidate pool (vector top-8 + BM25 top-8), from which the best four go to the LLM after reranking.",
          },
          {
            title: "5. Making quality measurable instead of clicking through",
            content: "An eval set of 20 hand-written questions checks retrieval hit rate and answer correctness against expected sources and keywords — including deliberately hard cases like near-identical part numbers and a synthetically scanned PDF without a text layer. Current state: 20/20 retrieval hits, 20/20 correct answers.",
          },
        ],
      },
      llmSwap: {
        tag: "Swappable LLM Backend",
        title: "The LLM is the smallest building block — replaced in minutes",
        content: "All the intelligence of the search — embeddings, hybrid retrieval, reranking — runs locally and model-agnostic. The language model only enters at the very last step and is encapsulated behind a single function: generate_answer(domain, question, passages). If you want full offline capability, you swap this one function for an Ollama call — the rest of the system never notices.",
        options: [
          {
            title: "Claude CLI (current)",
            desc: "Headless via the existing subscription, model selectable per knowledge domain (haiku/sonnet/opus).",
          },
          {
            title: "Ollama — fully local",
            desc: "An HTTP call to localhost instead of a subprocess: qwen2.5 or llama3.1 make the system fully offline-capable after initial setup.",
          },
          {
            title: "Any API",
            desc: "Anthropic, OpenAI or any other API call — prompt construction and citation contract stay identical.",
          },
        ],
        note: "Search and ranking stay local either way — the only thing you swap is who phrases the final sentence.",
      },
      engineering: {
        tag: "Under the Hood",
        title: "Engineering Details",
        items: [
          {
            title: "One SQLite file per knowledge domain",
            content: "Three tables sharing one row ID: plain text + metadata, FTS5 full-text index, sqlite-vec vector index (384 dims). Export, backup or delete = copy or remove a single file.",
          },
          {
            title: "Paragraph-aware chunking",
            content: "~700 characters with 10% overlap, cut at paragraph boundaries instead of mid-sentence; oversized paragraphs fall back to a sliding window. Every chunk keeps file and location for the later citation.",
          },
          {
            title: "Local models, lazily loaded",
            content: "Multilingual MiniLM bi-encoder for embeddings, mmarco cross-encoder for reranking — both CPU-friendly and loaded on first use, so the CLI starts without paying the model-load cost.",
          },
          {
            title: "Parser registry",
            content: "File extension → parser function: PDF (digital + scan), DOCX including tables, Markdown, TXT, JPG/PNG/HEIC. New formats are one function in a dict, not a refactor.",
          },
          {
            title: "Hardened LLM call",
            content: "Headless call with all tools disabled, no session persistence, with a timeout; an empty result list produces a static answer without any LLM call at all.",
          },
          {
            title: "Web UI for non-techies",
            content: "FastAPI + chat interface: create a knowledge domain, drag & drop files, index, ask — the complete workflow without a terminal.",
          },
        ],
      },
      results: {
        title: "Result",
        content: "The system answers 20 out of 20 eval questions correctly and with the right source — including the classic RAG trap of near-identical part numbers and a scan-PDF readable only via OCR. In a real-world test with actual home-building documents it delivered page-accurate answers from a 20-page construction specification, combined an authority letter and a guideline into one cleanly cited answer — and honestly admitted not knowing the answer to an undocumented cost question.",
      },
    },
  },
};
