export const caseStudyDocinspect = {
  de: {
    back: "Zurück zur Übersicht",
    repoNote: "Repository privat — Einblick auf Anfrage",
    hero: {
      tag: "Case Study",
      title: "DocInspect",
      subtitle: "Prüfung von Gehaltsabrechnungen für Kreditanträge",
      pitch: "Gefälschte Einkommensnachweise sind ein Klassiker im Kreditbetrug. DocInspect prüft eine Gehaltsabrechnung in Sekunden: Rechnet sie? Stimmen Sozialabgaben und Kennungen? Wurde das PDF nachträglich bearbeitet? Gibt es den Arbeitgeber? Jeder Befund ist nachrechenbar — und die KI entscheidet nie über Betrug.",
      tags: ["Python", "PyMuPDF", "Codex CLI", "Pydantic", "Tesseract OCR", "FastAPI"],
    },
    metrics: [
      { value: "30/30", label: "manipulierte Abrechnungen erkannt (synthetisches Eval)" },
      { value: "0", label: "fälschlich ROT auf Mustern echter Lohnprogramme" },
      { value: "10/10", label: "erfundene Arbeitgeber per Websuche markiert" },
      { value: "67", label: "automatisierte Tests" },
    ],
    screenshots: [
      {
        src: "/case-studies/docinspect-report.png",
        caption: "Überklebte Abrechnung: Brutto und Netto wurden weiß überdeckt und neu geschrieben. Die PDF-Forensik findet die verdeckten Originalwerte und die abweichende Schrift, die Regeln die nicht mehr passenden Rentenbeiträge.",
      },
      {
        src: "/case-studies/docinspect-employer.png",
        caption: "Rechnerisch einwandfrei, aber der Arbeitgeber ist erfunden: Die Websuche findet an der angegebenen Adresse eine andere Kanzlei. Ergebnis GELB — ein fehlender Webtreffer allein beweist keinen Betrug.",
      },
      {
        src: "/case-studies/docinspect-redacted.png",
        caption: "Was die KI tatsächlich sieht: Name, Geburtsdatum, SV-Nummer und Steuer-ID sind lokal durch Platzhalter ersetzt. Beträge bleiben lesbar — ohne sie keine Extraktion.",
      },
    ],
    problem: {
      title: "Das Problem",
      content: [
        "Zehn Jahre Kreditentscheidung haben mir gezeigt, wie Einkommensnachweise manipuliert werden: ein höheres Brutto, das nicht zu den Abzügen passt; eine SV-Nummer, die es nicht gibt; ein Arbeitgeber, den niemand kennt; ein Jahresbrutto, das nicht zum Monat passt; Zahlen in einer Schrift, die vom Rest des Dokuments abweicht.",
        "Ein Sachbearbeiter erkennt das — wenn er Zeit hat, nachzurechnen. Ein LLM zu fragen „Ist das gefälscht?“ ist keine Lösung: Das Urteil ist nicht nachvollziehbar, und keine Bank darf eine Kreditentscheidung auf ein Bauchgefühl stützen.",
      ],
    },
    principle: {
      title: "Das Prinzip: Die KI liest, Regeln entscheiden",
      items: [
        { title: "KI nur fürs Lesen", content: "Das Modell überträgt Werte wörtlich in ein festes Schema. Es rechnet nicht, es bewertet nicht." },
        { title: "Jeder Wert belegt", content: "Der Code prüft, ob jeder ausgelesene Betrag, jedes Datum, jede Kennung tatsächlich im Dokument steht." },
        { title: "Regeln entscheiden", content: "Arithmetik, Sozialversicherung, Prüfziffern, Datums- und Jahreswerte, PDF-Forensik — jedes Urteil mit Soll und Ist." },
        { title: "Nie ROT auf Unsicherem", content: "Beruht ein harter Befund auf einem nicht belegten Wert oder einem Scan, wird er GELB: Ein Lesefehler darf keinen Betrugsverdacht auslösen." },
      ],
    },
    pipeline: {
      title: "Der Ablauf",
      steps: [
        "PDF lesen — wie ein Mensch es sieht: weiß überdeckte Originalwerte fliegen raus, Scans gehen durch Tesseract-OCR",
        "Lokal pseudonymisieren: Name, SV-Nummer, Steuer-ID, Konto, Datumsangaben, Straße und Konfession werden zu Platzhaltern — fail-closed",
        "KI-Extraktion auf den Platzhaltern (isolierter Codex-Agent ohne Datei- und Werkzeugzugriff, festes JSON-Schema), danach exakte Rückübersetzung",
        "Belegprüfung: Jeder Wert muss im Dokument stehen — auch in DATEV-Schreibweisen wie „67940“ für 679,40",
        "Regelwerk, PDF-Forensik und Arbeitgeber-Recherche → Ampel mit Begründung",
      ],
    },
    deepDives: {
      title: "Deep Dives",
      items: [
        {
          title: "1. Der überklebte Wert",
          content: "Der typische Fälscher-Workflow: alten Betrag mit einem weißen Kasten überdecken, neuen darüberschreiben. Optisch sauber — strukturell nicht. In der PDF-Zeichenfolge liegt der Originalwert weiter vor dem Kasten, und der neue Wert steht meist in einer anderen Schrift. DocInspect vergleicht die Zeichenreihenfolge von Text und Flächen und die Schriftfamilien aller Beträge. Nebeneffekt: Die KI bekommt nur den sichtbaren Text — anfangs hatte sie den verdeckten Originalwert ausgelesen.",
        },
        {
          title: "2. Warum die KI nichts umrechnen darf",
          content: "Erster Versuch: Beträge als Zahl im Format 1234.56 anfordern. Ergebnis: Aus „6.225,00“ wurde 6.15. Die Belegprüfung fing es sofort ab — der Wert stand nirgends im Dokument. Seitdem kopiert das Modell Werte nur wörtlich, umgerechnet wird im Code. Dasselbe Muster später bei Netto-Abzügen: Ein abstrakter „Saldo“ wurde als Auszahlungsbetrag missverstanden; einzelne Posten mit der Angabe Abzug oder Bezug funktionieren zuverlässig.",
        },
        {
          title: "3. Der Realitätscheck kippte sieben Annahmen",
          content: "Auf synthetischen Daten stand alles bei 100 %. Dann neun öffentliche Muster echter Lohnprogramme (DATEV, Lexware, Abacus, Power-Lohn): Sozialabgaben auf ein anderes SV-Brutto (Gehaltsumwandlung), DATEV-Beträge ohne Komma, freiwillig Versicherte mit netto verrechnetem KV-Beitrag, Jahreswerte nur als SV-Brutto, einzeln positionierte Wörter ohne Leerzeichen in der Textebene. Ohne Anpassung hätte es Fehlalarme gegeben. Danach: kein einziges fälschliches ROT durch Regeln oder Lesefehler — die zwei verbliebenen ROTs sind Test-Steuer-IDs in DATEV-Mustern, korrekt erkannt.",
        },
        {
          title: "4. Der Platzhalter, der eine Steuer-ID erfand",
          content: "Pseudonymisierung ersetzt personenbezogene Werte durch Platzhalter. Ein sprechender Platzhalter wie [STEUERID_1] auf einer harmlosen Zahlenreihe (Urlaubstage „30 270 270 540“) ließ das Modell eine Steuer-ID ausgeben, die es im Dokument gar nicht gab. Ganz neutrale Platzhalter wiederum verwirrten es bei DATEV-Tabellen, wo Beschriftung und Wert in verschiedenen Zeilen stehen. Die Lösung: Ein Platzhalter trägt nur dann eine Bedeutung, wenn das Format sie beweist — bei gültiger Prüfziffer. Und ein „PLZ + Ort“-Muster gibt es bewusst nicht: Es hätte DATEV-Beträge ohne Komma zerstört.",
        },
        {
          title: "5. Gibt es den Arbeitgeber?",
          content: "Die KI recherchiert per Websuche Firmenwebsite, kununu, LinkedIn und Handelsregister — der Code ruft danach jede genannte Quelle selbst ab und prüft, ob der Firmenname dort steht. Eine erfundene URL zählt nicht. Ergebnis: 8 von 8 echten Arbeitgebern belegt, 10 von 10 erfundenen markiert, meist mit präzisem Grund („Lindenallee 19 liegt in 50968 Köln, nicht 50667“). Ein zufällig realer Firmenname fiel über die falsche Adresse auf — genau das Muster „echte Firma, falsche Anschrift“.",
        },
        {
          title: "6. Die eigene Datenschutz-Zusage auf den Prüfstand gestellt",
          content: "„Vor jeder KI-Verarbeitung pseudonymisiert“ klang gut — eine gezielte Gegenprobe zeigte, dass es nicht stimmte. Der Codex-Agent erbte meine persönliche Konfiguration und las trotz Read-only-Sandbox eine Testdatei außerhalb seines Arbeitsordners; über eine präparierte Abrechnung (Prompt-Injection) wäre das ausnutzbar gewesen. Dazu: Namensteile unter drei Zeichen blieben im Klartext, „Stellplatz 40,00“ wurde als Straße ersetzt und der Betrag zerstört, und die Arbeitgeber-Recherche hätte bei Einzelunternehmen den Namen der Person an die Websuche geschickt. Jetzt läuft der Agent isoliert ohne Datei- und Werkzeugzugriff (ein Skript weist es mit einer Kennwort-Datei nach), jede Lücke hat einen Regressionstest — und die Zusage ist so formuliert, wie sie belegbar ist.",
        },
      ],
    },
    evals: {
      title: "Die Zahlen",
      rows: [
        { label: "Synthetisches Set", detail: "65 Abrechnungen, 7 Manipulationsarten, 3 Layouts", result: "30/30 erkannt · 1/30 Fehlalarm (GELB) · 1815/1820 Felder korrekt" },
        { label: "Echte Lohnprogramme", detail: "9 öffentliche Muster, 2005–2025, inkl. Scan", result: "0 fälschlich ROT durch Regeln oder Lesefehler" },
        { label: "Arbeitgeber-Recherche", detail: "8 reale, 10 erfundene Arbeitgeber", result: "8/8 belegt · 10/10 markiert" },
      ],
    },
    limits: {
      title: "Grenzen — bewusst benannt",
      items: [
        "Eine gute Fälschung, die alle Werte konsistent neu berechnet, erkennt keine Plausibilitätsprüfung (0/5 im Eval). Dafür braucht es den Abgleich mit dem Gehaltseingang auf dem Kontoauszug.",
        "Die Lohnsteuer wird noch nicht nachgerechnet; geplant ist der offizielle BMF-Programmablaufplan.",
        "Scans werden per OCR gelesen, aber nie ROT — OCR-Fehler stehen auch im Belegtext und lassen sich dort nicht erkennen.",
        "Prototyp mit Codex CLI über ein ChatGPT-Abo (~10 s pro Extraktion); im Betrieb ein direkter API-Aufruf oder ein lokales Modell.",
      ],
    },
  },
  en: {
    back: "Back to overview",
    repoNote: "Private repository — access on request",
    hero: {
      tag: "Case Study",
      title: "DocInspect",
      subtitle: "Checking payslips for credit applications",
      pitch: "Forged proof of income is a classic in credit fraud. DocInspect checks a German payslip in seconds: Does it add up? Are social security contributions and identifiers valid? Was the PDF edited afterwards? Does the employer exist? Every finding can be recalculated — and the AI never decides on fraud.",
      tags: ["Python", "PyMuPDF", "Codex CLI", "Pydantic", "Tesseract OCR", "FastAPI"],
    },
    metrics: [
      { value: "30/30", label: "manipulated payslips detected (synthetic eval)" },
      { value: "0", label: "false RED on samples from real payroll software" },
      { value: "10/10", label: "invented employers flagged via web search" },
      { value: "67", label: "automated tests" },
    ],
    screenshots: [
      {
        src: "/case-studies/docinspect-report.png",
        caption: "Edited payslip: gross and net were covered with white boxes and rewritten. PDF forensics finds the hidden original values and the deviating font; the rules find pension contributions that no longer match.",
      },
      {
        src: "/case-studies/docinspect-employer.png",
        caption: "Arithmetically flawless, but the employer is invented: web research finds a different firm at the given address. Result YELLOW — a missing web hit alone proves no fraud.",
      },
      {
        src: "/case-studies/docinspect-redacted.png",
        caption: "What the AI actually sees: name, date of birth, social security and tax ID are replaced locally by placeholders. Amounts stay readable — without them, no extraction.",
      },
    ],
    problem: {
      title: "The problem",
      content: [
        "Ten years of credit decisions showed me how proof of income gets manipulated: a higher gross salary that doesn't match the deductions; a social security number that doesn't exist; an employer nobody knows; a year-to-date total that doesn't fit the month; figures in a font that differs from the rest of the document.",
        "A loan officer spots this — if there's time to recalculate. Asking an LLM \"is this forged?\" is no solution: the verdict isn't traceable, and no bank may base a credit decision on a gut feeling.",
      ],
    },
    principle: {
      title: "The principle: AI reads, rules decide",
      items: [
        { title: "AI only reads", content: "The model copies values verbatim into a fixed schema. It doesn't calculate, it doesn't judge." },
        { title: "Every value verified", content: "Code checks that every extracted amount, date and identifier actually appears in the document." },
        { title: "Rules decide", content: "Arithmetic, social security, check digits, dates and year-to-date values, PDF forensics — every verdict with expected and actual." },
        { title: "Never RED on uncertainty", content: "If a hard finding rests on an unverified value or a scan, it becomes YELLOW: a misreading must never trigger a fraud suspicion." },
      ],
    },
    pipeline: {
      title: "The pipeline",
      steps: [
        "Read the PDF as a human sees it: white-covered originals are dropped, scans go through Tesseract OCR",
        "Pseudonymise locally: name, social security and tax ID, bank account, dates, street and religion become placeholders — fail-closed",
        "AI extraction on the placeholders (isolated Codex agent without file or tool access, fixed JSON schema), then exact back-translation",
        "Evidence check: every value must appear in the document — including DATEV notations like \"67940\" for 679.40",
        "Rules, PDF forensics and employer research → traffic light with reasons",
      ],
    },
    deepDives: {
      title: "Deep dives",
      items: [
        {
          title: "1. The pasted-over value",
          content: "The typical forger's workflow: cover the old amount with a white box, write the new one on top. Visually clean — structurally not. In the PDF's drawing order, the original value still sits before the box, and the new value usually comes in a different font. DocInspect compares the drawing order of text and fills and the font families of all amounts. Side effect: the AI only receives the visible text — initially it had read the hidden original value.",
        },
        {
          title: "2. Why the AI must not convert anything",
          content: "First attempt: request amounts as numbers in 1234.56 format. Result: \"6.225,00\" became 6.15. The evidence check caught it immediately — the value appeared nowhere in the document. Since then the model only copies values verbatim; conversion happens in code. Same pattern later with net deductions: an abstract \"balance\" was mistaken for the payout amount; individual items marked as deduction or addition work reliably.",
        },
        {
          title: "3. The reality check overturned seven assumptions",
          content: "On synthetic data everything stood at 100%. Then nine public samples from real payroll software (DATEV, Lexware, Abacus, Power-Lohn): contributions on a different social security base (salary conversion), DATEV amounts without a decimal comma, voluntarily insured employees with health insurance settled from net pay, year-to-date values only as social security base, individually positioned words without spaces in the text layer. Without adjustments there would have been false alarms. Afterwards: not a single false RED from rules or misreadings — the two remaining REDs are test tax IDs in DATEV samples, correctly detected.",
        },
        {
          title: "4. The placeholder that invented a tax ID",
          content: "Pseudonymisation replaces personal values with placeholders. A telling placeholder like [STEUERID_1] on a harmless row of numbers (vacation days \"30 270 270 540\") made the model output a tax ID that didn't exist in the document. Fully neutral placeholders, in turn, confused it in DATEV tables where label and value sit in different rows. The fix: a placeholder carries a meaning only if the format proves it — with a valid check digit. And there is deliberately no \"postcode + city\" pattern: it would have destroyed DATEV amounts without a comma.",
        },
        {
          title: "5. Does the employer exist?",
          content: "The AI researches company website, kununu, LinkedIn and the commercial register via web search — then code fetches every cited source itself and checks that the company name appears there. An invented URL doesn't count. Result: 8 of 8 real employers verified, 10 of 10 invented ones flagged, usually with a precise reason (\"Lindenallee 19 is in 50968 Cologne, not 50667\"). A coincidentally real company name was caught via its wrong address — exactly the \"real company, wrong address\" pattern.",
        },
        {
          title: "6. Putting my own privacy promise to the test",
          content: "\"Pseudonymised before any AI processing\" sounded good — a targeted counter-check showed it wasn't true. The Codex agent inherited my personal configuration and, despite a read-only sandbox, read a test file outside its working directory; a crafted payslip (prompt injection) could have exploited that. On top: name parts shorter than three characters stayed in plain text, \"Stellplatz 40,00\" (a parking deduction) was replaced as a street and the amount destroyed, and for sole proprietorships the employer research would have sent the person's name to web search. Now the agent runs isolated without file or tool access (a script proves it with a canary file), every gap has a regression test — and the promise is worded exactly as far as it can be proven.",
        },
      ],
    },
    evals: {
      title: "The numbers",
      rows: [
        { label: "Synthetic set", detail: "65 payslips, 7 manipulation types, 3 layouts", result: "30/30 detected · 1/30 false alarm (YELLOW) · 1815/1820 fields correct" },
        { label: "Real payroll software", detail: "9 public samples, 2005–2025, incl. a scan", result: "0 false RED from rules or misreadings" },
        { label: "Employer research", detail: "8 real, 10 invented employers", result: "8/8 verified · 10/10 flagged" },
      ],
    },
    limits: {
      title: "Limits — named deliberately",
      items: [
        "A good forgery that recalculates all values consistently cannot be caught by any plausibility check (0/5 in the eval). That needs a match against the salary credit on the bank statement.",
        "Income tax is not yet recalculated; the official BMF program flowchart is planned.",
        "Scans are read via OCR but never RED — OCR errors also appear in the evidence text and can't be detected there.",
        "Prototype using the Codex CLI via a ChatGPT subscription (~10 s per extraction); in production a direct API call or a local model.",
      ],
    },
  },
};
