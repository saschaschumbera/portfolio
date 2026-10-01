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
      { value: "119", label: "automatisierte Tests" },
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
    forensics: {
      title: "Wie die Forensik Fälschungen erkennt",
      intro: "Gefälschte Gehaltsnachweise entstehen fast nie neu, sondern durch Bearbeiten einer echten Abrechnung — im PDF-Editor oder im Bildprogramm. Jede Bearbeitung hinterlässt Spuren, oft unsichtbar für das Auge, aber messbar in der Datei: Computerschrift ist exakt, ein Lohnprogramm schreibt seine Dokumente immer gleich, ein Scan hat nie reines Weiß. DocInspect prüft diese Spuren ohne KI — direkt aus der Struktur des PDFs bzw. aus den Pixeln des Scans.",
      labels: { forger: "Was der Fälscher tut", trace: "Welche Spur bleibt", how: "Wie DocInspect sie misst" },
      signals: [
        {
          title: "Überdeckte Werte — der Röntgenblick",
          forger: "Legt im PDF einen weißen Kasten über den alten Betrag und schreibt den neuen darüber.",
          trace: "Der alte Betrag ist nicht gelöscht, nur verdeckt — er steht weiter in der Datei. Ein PDF wird in fester Reihenfolge gezeichnet: erst der Text, danach der Kasten darüber.",
          how: "Für jedes Textstück prüft DocInspect, ob später eine weiße Fläche darüber gezeichnet wurde. Gefundene Originalwerte werden im Bericht genannt — und nie an die KI gegeben.",
          images: [{ src: "/case-studies/forensik-roentgen.png", width: 366, height: 98, label: "" }],
          caption: "Schwarz: der sichtbare, gefälschte Wert. Rot: der Originalwert, der unter dem weißen Kasten noch in der Datei steht.",
        },
        {
          title: "Schrift, Größe und Ausrichtung",
          forger: "Wählt im PDF-Editor eine Schrift, die „gleich aussieht“, und schätzt Größe und Position nach Augenmaß.",
          trace: "Computerschrift ist exakt: Alle Beträge einer Spalte stehen in derselben Schrift und Größe, enden auf den Bruchteil eines Punktes an derselben rechten Kante und sitzen auf der Grundlinie ihrer Zeile.",
          how: "DocInspect liest für jedes Zeichen Schriftart, Größe und Position aus der Datei. Abweichungen ab 0,2 Punkt in der Größe, 0,3 Punkt an der rechten Kante oder 0,5 Punkt in der Grundlinie werden gemeldet — gemessen an der letzten Ziffer, damit DATEVs „85,00-“ nicht stört.",
          images: [
            { src: "/case-studies/forensik-schrift-original.png", width: 366, height: 98, label: "Original" },
            { src: "/case-studies/forensik-schrift-bearbeitet.png", width: 366, height: 98, label: "Bearbeitet" },
          ],
          caption: "Links das Original in Arial 9,5 pt, rechts der eingefügte Wert in Helvetica 8,3 pt. Mit bloßem Auge kaum zu sehen — in der Datei eindeutig.",
        },
        {
          title: "Spuren in der Dateistruktur",
          forger: "Arbeitet sorgfältig: entfernt den alten Text vollständig, nimmt dieselbe Schrift in derselben Größe, richtet exakt aus und rechnet alle Werte stimmig nach.",
          trace: "Das Bearbeitungsprogramm hängt den neuen Text als zusätzlichen Inhaltsblock an die Seite an und bettet die Schrift ein zweites Mal ein. Echte Lohnprogramme — DATEV, Lexware, Abacus, Power-Lohn — schreiben genau einen Inhaltsblock je Seite und jede Schrift einmal.",
          how: "DocInspect zählt die Inhaltsblöcke jeder Seite und prüft, ob dieselbe Schrift im selben Schnitt mehrfach eingebettet ist. So fallen auch Fälschungen auf, gegen die Regelwerk und Sichtprüfung machtlos sind.",
          images: [],
          caption: "",
        },
        {
          title: "Unsichtbarer Text",
          forger: "Versteckt Anweisungen an die KI oder passende Zahlen im Dokument — weiß auf weiß, im unsichtbaren Darstellungsmodus oder winzig klein.",
          trace: "Der Text steht in der Datei, hat aber keinen sichtbaren Kontrast zu seinem Hintergrund.",
          how: "DocInspect berechnet für jedes Textstück den Helligkeitsabstand zur Fläche darunter. Was für Menschen unsichtbar ist, wird gemeldet und gar nicht erst an die KI gegeben.",
          images: [],
          caption: "",
        },
        {
          title: "Übermalte Stellen in Scans",
          forger: "Übermalt den Betrag in einem gescannten Nachweis im Bildprogramm mit Weiß und schreibt neue Ziffern darüber.",
          trace: "Ein Scan hat nie reines Weiß — Papier ist leicht grau und rauscht. Die übermalte Fläche ist heller als das Papier um sie herum.",
          how: "DocInspect misst die Helligkeit des Untergrunds in kleinen Kacheln und vergleicht sie mit dem Papierton der Seite. Ist das Papier ohnehin reinweiß, entfällt die Prüfung — dann gäbe es keinen Kontrast.",
          images: [
            { src: "/case-studies/forensik-scan-normal.png", width: 494, height: 202, label: "Scan" },
            { src: "/case-studies/forensik-scan-kontrast.png", width: 494, height: 202, label: "Kontrastverstärkt" },
          ],
          caption: "Links der Scan, wie ihn ein Mensch sieht. Rechts dieselbe Stelle kontrastverstärkt: Die übermalten Flächen leuchten, weil sie heller sind als das Papier.",
        },
      ],
      tableTitle: "Was erkannt wird",
      tableHead: ["Fälschung", "erkannt", "Fehlalarme"],
      tableRows: [
        ["Im PDF überklebt, neuer Wert in anderer Schrift", "5/5", "0"],
        ["Im PDF sorgfältig bearbeitet — gleiche Schrift, Größe und Position", "5/5 (vorher 0/5)", "0"],
        ["Scan im Bildprogramm mit Weiß übermalt", "10/10", "0/10"],
        ["Echte Abrechnungen echter Lohnprogramme", "—", "0/9"],
      ],
      limitsTitle: "Was die Forensik nicht erkennt",
      limits: [
        "Ein komplett neu erstelltes Dokument mit stimmigen Werten hat keine Bearbeitungsspur — dagegen hilft nur der Abgleich mit dem Gehaltseingang auf dem Kontoauszug.",
        "Scans, die mit der Papierfarbe übermalt wurden, und kopierte (geklonte) Ziffern: gemessen, aber nach der JPEG-Kompression nicht zuverlässig von echten Scans zu trennen — deshalb bewusst nicht eingebaut.",
        "Zeichenabstände: bei sorgfältigen Fälschungen identisch mit dem Original — ebenfalls gemessen und verworfen.",
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
          content: "„Vor jeder KI-Verarbeitung pseudonymisiert“ klang gut — eine gezielte Gegenprobe zeigte, dass es nicht stimmte. Der Codex-Agent erbte meine persönliche Konfiguration und las trotz Read-only-Sandbox eine Testdatei außerhalb seines Arbeitsordners; über eine präparierte Abrechnung (Prompt-Injection) wäre das ausnutzbar gewesen. Dazu: Namensteile unter drei Zeichen blieben im Klartext, „Stellplatz 40,00“ wurde als Straße ersetzt und der Betrag zerstört, und die Arbeitgeber-Recherche hätte bei Einzelunternehmen den Namen der Person an die Websuche geschickt. Jetzt läuft der Agent isoliert ohne Datei- und Werkzeugzugriff (ein Skript weist es mit einer Kennwort-Datei nach), jede Lücke hat einen Regressionstest — und die Zusage ist so formuliert, wie sie belegbar ist. Danach der Angriff von außen: Drei präparierte Abrechnungen mit sichtbaren und versteckten Anweisungen an die KI — keine wurde GRÜN, kein Dateiinhalt kam zurück. Ein abschließendes, unabhängiges Code-Review fand zehn weitere Punkte; jeder wurde erst per Test reproduziert, neun bestätigten sich und sind behoben.",
        },
      ],
    },
    evals: {
      title: "Die Zahlen",
      rows: [
        { label: "Synthetisches Set", detail: "65 Abrechnungen, 7 Manipulationsarten, 3 Layouts", result: "30/30 erkannt · 1/30 Fehlalarm (GELB) · 1820/1820 Felder korrekt" },
        { label: "Echte Lohnprogramme", detail: "9 öffentliche Muster, 2005–2025, inkl. Scan", result: "0 fälschlich ROT durch Regeln oder Lesefehler" },
        { label: "Arbeitgeber-Recherche", detail: "8 reale, 10 erfundene Arbeitgeber", result: "8/8 belegt · 10/10 markiert" },
        { label: "Prompt-Injection", detail: "sichtbare und versteckte Anweisungen, Versuch, eine lokale Datei auszulesen", result: "3/3 abgewehrt: nie GRÜN, kein Dateiinhalt ausgeleitet" },
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
      { value: "119", label: "automated tests" },
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
    forensics: {
      title: "How the forensics detect forgeries",
      intro: "Forged proof of income is almost never created from scratch — it is an edited genuine payslip, changed in a PDF editor or an image program. Every edit leaves traces, often invisible to the eye but measurable in the file: computer type is exact, payroll software always writes its documents the same way, a scan never contains pure white. DocInspect checks these traces without AI — directly from the PDF's structure or the scan's pixels.",
      labels: { forger: "What the forger does", trace: "What trace remains", how: "How DocInspect measures it" },
      signals: [
        {
          title: "Covered values — the X-ray view",
          forger: "Places a white box over the old amount in the PDF and writes the new one on top.",
          trace: "The old amount isn't deleted, just covered — it is still in the file. A PDF is drawn in a fixed order: first the text, then the box on top.",
          how: "For every piece of text DocInspect checks whether a white area was drawn over it later. Recovered original values are named in the report — and never passed to the AI.",
          images: [{ src: "/case-studies/forensik-roentgen.png", width: 366, height: 98, label: "" }],
          caption: "Black: the visible, forged value. Red: the original value, still in the file underneath the white box.",
        },
        {
          title: "Font, size and alignment",
          forger: "Picks a font in the PDF editor that \"looks the same\" and estimates size and position by eye.",
          trace: "Computer type is exact: all amounts in a column share the same font and size, end at the same right edge to a fraction of a point and sit on their row's baseline.",
          how: "DocInspect reads font, size and position of every character from the file. Deviations from 0.2 pt in size, 0.3 pt at the right edge or 0.5 pt in the baseline are reported — measured at the last digit, so DATEV's \"85,00-\" doesn't interfere.",
          images: [
            { src: "/case-studies/forensik-schrift-original.png", width: 366, height: 98, label: "Original" },
            { src: "/case-studies/forensik-schrift-bearbeitet.png", width: 366, height: 98, label: "Edited" },
          ],
          caption: "Left the original in Arial 9.5 pt, right the inserted value in Helvetica 8.3 pt. Barely visible to the eye — unambiguous in the file.",
        },
        {
          title: "Traces in the file structure",
          forger: "Works carefully: removes the old text completely, uses the same font at the same size, aligns exactly and recalculates every value consistently.",
          trace: "The editing tool appends the new text as an additional content block to the page and embeds the font a second time. Genuine payroll software — DATEV, Lexware, Abacus, Power-Lohn — writes exactly one content block per page and each font once.",
          how: "DocInspect counts the content blocks of every page and checks whether the same font in the same style is embedded more than once. This catches forgeries that rules and visual inspection can't.",
          images: [],
          caption: "",
        },
        {
          title: "Invisible text",
          forger: "Hides instructions to the AI or matching numbers in the document — white on white, in invisible render mode or tiny.",
          trace: "The text is in the file but has no visible contrast to its background.",
          how: "DocInspect computes the brightness difference between every piece of text and the area beneath it. Anything invisible to humans is reported and never passed to the AI.",
          images: [],
          caption: "",
        },
        {
          title: "Painted-over areas in scans",
          forger: "Paints over the amount in a scanned document with white in an image program and writes new digits on top.",
          trace: "A scan never contains pure white — paper is slightly grey and noisy. The painted-over area is brighter than the surrounding paper.",
          how: "DocInspect measures the background brightness in small tiles and compares it with the page's paper tone. If the paper is pure white anyway, the check is skipped — there would be no contrast.",
          images: [
            { src: "/case-studies/forensik-scan-normal.png", width: 494, height: 202, label: "Scan" },
            { src: "/case-studies/forensik-scan-kontrast.png", width: 494, height: 202, label: "Contrast-enhanced" },
          ],
          caption: "Left the scan as a human sees it. Right the same spot contrast-enhanced: the painted-over areas glow because they are brighter than the paper.",
        },
      ],
      tableTitle: "What is detected",
      tableHead: ["Forgery", "detected", "false alarms"],
      tableRows: [
        ["Pasted over in the PDF, new value in a different font", "5/5", "0"],
        ["Carefully edited in the PDF — same font, size and position", "5/5 (before: 0/5)", "0"],
        ["Scan painted over with white in an image program", "10/10", "0/10"],
        ["Genuine payslips from real payroll software", "—", "0/9"],
      ],
      limitsTitle: "What the forensics don't detect",
      limits: [
        "A document created from scratch with consistent values has no editing trace — only a match against the salary credit on the bank statement helps there.",
        "Scans painted over with the paper colour and copied (cloned) digits: measured, but after JPEG compression not reliably separable from genuine scans — deliberately not built.",
        "Character spacing: identical to the original in careful forgeries — also measured and discarded.",
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
          content: "\"Pseudonymised before any AI processing\" sounded good — a targeted counter-check showed it wasn't true. The Codex agent inherited my personal configuration and, despite a read-only sandbox, read a test file outside its working directory; a crafted payslip (prompt injection) could have exploited that. On top: name parts shorter than three characters stayed in plain text, \"Stellplatz 40,00\" (a parking deduction) was replaced as a street and the amount destroyed, and for sole proprietorships the employer research would have sent the person's name to web search. Now the agent runs isolated without file or tool access (a script proves it with a canary file), every gap has a regression test — and the promise is worded exactly as far as it can be proven. Then the attack from outside: three crafted payslips with visible and hidden instructions to the AI — none turned GREEN, no file content came back. A final independent code review found ten more issues; each was first reproduced with a test, nine were confirmed and fixed.",
        },
      ],
    },
    evals: {
      title: "The numbers",
      rows: [
        { label: "Synthetic set", detail: "65 payslips, 7 manipulation types, 3 layouts", result: "30/30 detected · 1/30 false alarm (YELLOW) · 1820/1820 fields correct" },
        { label: "Real payroll software", detail: "9 public samples, 2005–2025, incl. a scan", result: "0 false RED from rules or misreadings" },
        { label: "Employer research", detail: "8 real, 10 invented employers", result: "8/8 verified · 10/10 flagged" },
        { label: "Prompt injection", detail: "visible and hidden instructions, attempt to read a local file", result: "3/3 repelled: never GREEN, no file content leaked" },
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
