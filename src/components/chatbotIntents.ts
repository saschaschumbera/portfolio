// Canonical question phrasings for the semantic chatbot.
//
// These power the meaning-based matching: each intent lists a few ways a
// visitor might ask about a topic. At runtime every phrasing is embedded and
// the closest one decides which rule answers (see chatbotSemantic.ts).
//
// Each key is a keyword that uniquely identifies a rule in chatbotKnowledge.ts
// (RULES / RULES_EN) — so the answers stay in one place and are never
// duplicated here. Rules without an entry remain reachable via keyword matching.

export const INTENT_QUESTIONS: Record<string, string[]> = {
  skill: ["Welche Skills hat Sascha?", "Welche Programmiersprachen und Technologien kann er?", "Womit arbeitet und entwickelt er?"],
  erfahrung: ["Was ist Saschas beruflicher Werdegang?", "Wo hat er früher gearbeitet?", "Welche Berufserfahrung hat er?", "Wie sieht seine berufliche Laufbahn und Karriere aus?"],
  kontakt: ["Wie kann ich Sascha kontaktieren?", "Wie erreiche ich ihn?", "Wie kann ich ihm schreiben?"],
  studium: ["Was studiert Sascha?", "Wo macht er sein Studium?", "Welchen Studiengang belegt er?"],
  finanz: ["Welchen Finanz-Hintergrund hat Sascha?", "Hat er Erfahrung im Bankwesen?", "Was hat er im Banking gemacht?"],
  ki: ["Was macht Sascha im Bereich KI?", "Kennt er sich mit neuronalen Netzen und Machine Learning aus?", "Was sind seine KI-Schwerpunkte?", "Arbeitet er mit Sprachmodellen und LLMs?"],
  standort: ["Wo wohnt Sascha?", "In welcher Stadt lebt er?", "Wo ist er ansässig?"],
  besonders: ["Was macht Sascha besonders?", "Was ist seine Stärke?", "Warum sollte man ihn einstellen?", "Was hebt ihn von anderen Bewerbern ab?"],
  "soft skill": ["Wie ist seine Arbeitsweise?", "Welche persönlichen Stärken hat er?", "Wie würdest du seinen Charakter beschreiben?"],
  sprache: ["Welche Sprachen spricht Sascha?", "Kann er Englisch?", "Welche Fremdsprachen beherrscht er?"],
  aktuell: ["Was macht Sascha aktuell?", "Woran arbeitet er gerade?", "Was ist sein aktueller Job?"],
  bank11: ["Was macht Sascha bei Bank11?", "Welche Aufgaben hat er bei der Bank11?"],
  projekt: ["Welche eigenen Projekte hat Sascha umgesetzt?", "Welche KI-Projekte hat er entwickelt?", "Hat er ein Portfolio an Projekten?", "Was sind seine aktuellen Projekte?", "Welche Projekte hat er gebaut?"],
  python: ["Kann Sascha Python?", "Wofür nutzt er Python?"],
  sql: ["Kann Sascha SQL?", "Wofür setzt er SQL ein?"],
  typescript: ["Kann Sascha mit React oder Next.js umgehen?", "Macht er auch Frontend-Entwicklung?", "Beherrscht er TypeScript?"],
  "power bi": ["Kann Sascha Power BI?", "Hat er Erfahrung mit Dashboards und Reporting?"],
  "prompt engineering": ["Kann Sascha Prompt Engineering?", "Wie arbeitet er mit Prompts für LLMs?"],
  langgraph: ["Arbeitet Sascha mit Multi-Agent-Systemen?", "Kennt er LangGraph oder Agenten-Workflows?"],
  lokal: ["Arbeitet Sascha mit lokalen LLMs?", "Kann er KI ohne Cloud betreiben?", "Was ist mit On-Premise-KI?"],
  verfügbar: ["Sucht Sascha gerade einen Job?", "Ist er für neue Positionen offen?", "Kann man ihn für eine Stelle anfragen?"],
  github: ["Wo finde ich Saschas GitHub?", "Hat er ein GitHub-Profil?"],
  linkedin: ["Wo finde ich Sascha auf LinkedIn?", "Kann ich mich mit ihm vernetzen?"],
  lebenslauf: ["Kann ich Saschas Lebenslauf bekommen?", "Gibt es seinen CV zum Download?"],
  vertragsverwaltung: ["Was ist die Vertragsverwaltungs-App?", "Was kann das Tool mit OCR und Kündigungsfristen?", "Hat er eine App für Verträge gebaut?"],
  dokumentenablage: ["Was ist die Dokumentenablage?", "Hat er ein Tool zur Dokumentenverwaltung gebaut?"],
  obsidian: ["Was ist der Obsidian-KI-Agent?", "Hat er etwas mit RAG und Vektordatenbanken gebaut?", "Hat er einen lokalen Wissensassistenten entwickelt?"],
  telegram: ["Was ist der Personal Agent?", "Hat er einen agentischen Assistenten gebaut?", "Hat er etwas mit Computer-Use oder Telegram gemacht?"],
  "smart-notes": ["Was ist Smart-Notes?", "Hat er ein KI-Notiztool mit Gemini gebaut?"],
  battlesnake: ["Was ist sein Battlesnake-Projekt?", "Hat er eine Spiel-KI programmiert?"],
  sadidauto: ["Was ist Sadidauto?", "Hat er etwas mit Computer Vision oder Bilderkennung gebaut?", "Hat er einen Automatisierungsbot mit OpenCV gemacht?"],
  tiktok: ["Hat er etwas mit KI-Videos oder TikTok-Automatisierung gebaut?", "Was sind seine Content-Automatisierungs-Projekte?", "Hat er Medien-Pipelines entwickelt?"],
  papierkram: ["Was ist das Papierkram-Orakel?", "Hat er ein RAG-System für private Dokumente gebaut?", "Kann man mit seinem System eigene Dokumente per KI befragen?", "Hat er etwas mit Hybrid Search oder BM25 gemacht?"],
  docinspect: ["Was ist DocInspect?", "Hat er ein Tool zur KI-Dokumentenanalyse gebaut?", "Was macht seine App zur Risikobewertung von Verträgen?"],
};

export const INTENT_QUESTIONS_EN: Record<string, string[]> = {
  skill: ["What are Sascha's skills?", "Which programming languages and technologies does he know?", "What does he work with?"],
  experience: ["What is Sascha's career background?", "Where has he worked before?", "How much experience does he have?"],
  contact: ["How can I contact Sascha?", "How do I reach him?", "How can I get in touch?"],
  degree: ["What does Sascha study?", "Where is he studying?", "What is his degree?"],
  "stand out": ["What makes Sascha special?", "What is his strength?", "Why should someone hire him?"],
  current: ["What is Sascha doing right now?", "What is his current job?", "What is he working on?"],
  ai: ["What does Sascha do in AI?", "Does he know about neural networks and machine learning?", "What are his AI focus areas?"],
  python: ["Can Sascha do Python?", "What does he use Python for?"],
  sql: ["Can Sascha do SQL?", "What does he use SQL for?"],
  typescript: ["Does he do frontend with React or Next.js?", "Does he know TypeScript?"],
  "power bi": ["Can Sascha do Power BI?", "Does he have experience with dashboards and reporting?"],
  location: ["Where does Sascha live?", "Which city is he based in?"],
  available: ["Is Sascha looking for a job?", "Is he open to new positions?", "Can I hire him?"],
  github: ["Where can I find Sascha's GitHub?", "Does he have a GitHub profile?"],
  linkedin: ["Where can I find Sascha on LinkedIn?", "Can I connect with him?"],
  contract: ["What is the contract manager app?", "Did he build an app for contracts with OCR?", "What does the contract tool with deadline tracking do?"],
  obsidian: ["What is the Obsidian AI agent?", "Did he build something with RAG and vector databases?", "Did he develop a local knowledge assistant?"],
  telegram: ["What is the Personal Agent?", "Did he build an agentic assistant?", "Did he do anything with computer-use or Telegram?"],
  "smart-notes": ["What is Smart-Notes?", "Did he build an AI note tool with Gemini?"],
  battlesnake: ["What is his Battlesnake project?", "Did he program a game AI?"],
  sadidauto: ["What is Sadidauto?", "Did he build something with computer vision or image recognition?"],
  tiktok: ["Did he build anything with AI videos or TikTok automation?", "What are his content-automation projects?", "Did he develop media pipelines?"],
  project: ["What projects has Sascha built?", "Which AI projects did he develop?", "What are his own projects?", "Does he have a project portfolio?"],
  papierkram: ["What is the Papierkram-Orakel?", "Did he build a RAG system for private documents?", "Can I query my own documents with his AI system?", "Did he do anything with hybrid search or BM25?"],
  docinspect: ["What is DocInspect?", "Did he build an AI document analysis tool?", "What does his contract risk assessment app do?"],
};
