"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Library,
  Shuffle,
  ShieldCheck,
  ScanLine,
  Target,
  FlaskConical,
  Database,
  Scissors,
  Cpu,
  FileStack,
  Lock,
  MonitorSmartphone,
  Terminal,
  HardDrive,
  Plug,
  CheckCircle2,
} from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLang } from "../LanguageProvider";
import { useTheme } from "../ThemeProvider";
import { caseStudyPapierkram } from "@/lib/caseStudyPapierkramTranslations";

const ACCENT = "#f97316";

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold tracking-widest uppercase mb-3"
      style={{ color: ACCENT }}
    >
      {children}
    </p>
  );
}

function Metric({
  value,
  label,
  delay,
  inView,
  mounted,
}: {
  value: string;
  label: string;
  delay: number;
  inView: boolean;
  mounted: boolean;
}) {
  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 20 } : false}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center p-5 rounded-xl"
      style={{
        border: "1px solid var(--border)",
        background: "color-mix(in srgb, var(--bg-card) 60%, transparent)",
      }}
    >
      <p className="text-3xl font-bold mb-1" style={{ color: ACCENT }}>
        {value}
      </p>
      <p className="text-xs" style={{ color: "var(--text-3)" }}>
        {label}
      </p>
    </motion.div>
  );
}

const deepDiveIcons = [Shuffle, ShieldCheck, ScanLine, Target, FlaskConical];
const engineeringIcons = [Database, Scissors, Cpu, FileStack, Lock, MonitorSmartphone];
const swapIcons = [Terminal, HardDrive, Plug];

export default function PapierkramOrakelCaseStudy() {
  const mounted = useIsMounted();
  const { lang } = useLang();
  const { theme } = useTheme();
  const tx = caseStudyPapierkram[lang];

  const heroRef = useRef(null);
  const whyRef = useRef(null);
  const archRef = useRef(null);
  const deepRef = useRef(null);
  const swapRef = useRef(null);
  const engRef = useRef(null);
  const resultRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-80px" });
  const archInView = useInView(archRef, { once: true, margin: "-80px" });
  const deepInView = useInView(deepRef, { once: true, margin: "-80px" });
  const swapInView = useInView(swapRef, { once: true, margin: "-80px" });
  const engInView = useInView(engRef, { once: true, margin: "-80px" });
  const resultInView = useInView(resultRef, { once: true, margin: "-80px" });

  const metrics =
    lang === "de"
      ? [
          { value: "100 %", label: "Suche & Ranking lokal" },
          { value: "20/20", label: "Eval-Fragen korrekt" },
          { value: "7", label: "Dateiformate inkl. Scans & Fotos" },
          { value: "1", label: "Cloud-Schritt — austauschbar" },
        ]
      : [
          { value: "100 %", label: "Search & Ranking Local" },
          { value: "20/20", label: "Eval Questions Correct" },
          { value: "7", label: "File Formats incl. Scans & Photos" },
          { value: "1", label: "Cloud Step — Swappable" },
        ];

  // Theme is only known on the client; fall back to dark (SSR default) until mounted.
  const diagramSrc = `/case-studies/papierkram-workflow-${lang}-${mounted ? theme : "dark"}.svg`;

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg-base)", color: "var(--text-1)" }}
    >
      {/* ── Back link ───────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pt-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm transition-colors"
          style={{ color: "var(--text-3)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = ACCENT;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-3)";
          }}
        >
          <ArrowLeft size={16} />
          {tx.back}
        </Link>
      </div>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section ref={heroRef} className="pt-16 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={mounted ? { opacity: 0, y: 30 } : false}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: `${ACCENT}15` }}
            >
              <Library size={28} style={{ color: ACCENT }} />
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              style={{ color: "var(--text-1)" }}
            >
              {tx.hero.title.split(":")[0]}:
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${ACCENT}, #f59e0b)`,
                }}
              >
                {tx.hero.title.split(":")[1]?.trim()}
              </span>
            </h1>

            <p
              className="text-lg md:text-xl mb-3 font-medium"
              style={{ color: "var(--text-2)" }}
            >
              {tx.hero.subtitle}
            </p>

            <p
              className="text-sm max-w-2xl mx-auto mb-8 leading-relaxed"
              style={{ color: "var(--text-3)" }}
            >
              {tx.hero.pitch}
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {tx.hero.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full font-medium"
                  style={{
                    background: `${ACCENT}12`,
                    border: `1px solid ${ACCENT}30`,
                    color: ACCENT,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <Metric
                key={m.label}
                value={m.value}
                label={m.label}
                delay={0.1 * i + 0.3}
                inView={heroInView}
                mounted={mounted}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why ─────────────────────────────────────────────────── */}
      <section
        ref={whyRef}
        className="py-20 px-6"
        style={{ background: "var(--bg-section)" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={mounted ? { opacity: 0, y: 30 } : false}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>{lang === "de" ? "Motivation" : "Motivation"}</SectionTag>
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "var(--text-1)" }}
            >
              {tx.sections.why.title}
            </h2>
            <p
              className="text-sm max-w-3xl leading-relaxed mb-8"
              style={{ color: "var(--text-3)" }}
            >
              {tx.sections.why.content}
            </p>

            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "var(--text-3)" }}
            >
              {tx.sections.why.useCasesLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {tx.sections.why.useCases.map((uc) => (
                <span
                  key={uc}
                  className="px-3 py-1.5 text-xs rounded-full"
                  style={{
                    border: "1px solid var(--border)",
                    background:
                      "color-mix(in srgb, var(--bg-card) 50%, transparent)",
                    color: "var(--text-2)",
                  }}
                >
                  {uc}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Architecture ────────────────────────────────────────── */}
      <section ref={archRef} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={mounted ? { opacity: 0, y: 30 } : false}
            animate={archInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>{lang === "de" ? "Architektur" : "Architecture"}</SectionTag>
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "var(--text-1)" }}
            >
              {tx.sections.architecture.title}
            </h2>
            <p
              className="text-sm mb-10 max-w-3xl leading-relaxed"
              style={{ color: "var(--text-3)" }}
            >
              {tx.sections.architecture.content}
            </p>
          </motion.div>

          {/* Workflow diagram */}
          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={archInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={diagramSrc}
              alt={tx.sections.architecture.diagramAlt}
              className="w-full h-auto block"
            />
          </motion.div>

          {/* Key facts */}
          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={archInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 p-6 rounded-xl"
            style={{
              border: "1px solid var(--border)",
              background: "color-mix(in srgb, var(--bg-card) 50%, transparent)",
            }}
          >
            <div className="grid md:grid-cols-3 gap-4 text-xs" style={{ color: "var(--text-3)" }}>
              {tx.sections.architecture.facts.map((fact) => (
                <div key={fact} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Deep Dives ──────────────────────────────────────────── */}
      <section
        ref={deepRef}
        className="py-20 px-6"
        style={{ background: "var(--bg-section)" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={mounted ? { opacity: 0, y: 30 } : false}
            animate={deepInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>Deep Dives</SectionTag>
            <h2
              className="text-3xl font-bold mb-10"
              style={{ color: "var(--text-1)" }}
            >
              {tx.sections.deepDives.title}
            </h2>
          </motion.div>

          <div className="space-y-6">
            {tx.sections.deepDives.items.map((item, i) => {
              const Icon = deepDiveIcons[i];
              return (
                <motion.div
                  key={item.title}
                  initial={mounted ? { opacity: 0, x: -20 } : false}
                  animate={deepInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 * i + 0.2 }}
                  className="p-6 rounded-xl transition-all duration-300"
                  style={{
                    border: "1px solid var(--border)",
                    background:
                      "color-mix(in srgb, var(--bg-card) 50%, transparent)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${ACCENT}08`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
                      style={{ background: `${ACCENT}12` }}
                    >
                      <Icon size={18} style={{ color: ACCENT }} />
                    </div>
                    <div>
                      <h3
                        className="text-base font-semibold mb-2"
                        style={{ color: "var(--text-1)" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-3)" }}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Swappable LLM backend ───────────────────────────────── */}
      <section ref={swapRef} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={mounted ? { opacity: 0, y: 30 } : false}
            animate={swapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>{tx.sections.llmSwap.tag}</SectionTag>
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "var(--text-1)" }}
            >
              {tx.sections.llmSwap.title}
            </h2>
            <p
              className="text-sm max-w-3xl leading-relaxed mb-10"
              style={{ color: "var(--text-3)" }}
            >
              {tx.sections.llmSwap.content}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {tx.sections.llmSwap.options.map((opt, i) => {
              const Icon = swapIcons[i];
              return (
                <motion.div
                  key={opt.title}
                  initial={mounted ? { opacity: 0, y: 20 } : false}
                  animate={swapInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.12 * i + 0.2 }}
                  className="p-6 rounded-xl"
                  style={{
                    border: i === 1 ? `1px solid ${ACCENT}50` : "1px solid var(--border)",
                    background:
                      "color-mix(in srgb, var(--bg-card) 60%, transparent)",
                    boxShadow: i === 1 ? `0 0 24px ${ACCENT}10` : "none",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${ACCENT}12` }}
                  >
                    <Icon size={18} style={{ color: ACCENT }} />
                  </div>
                  <h3
                    className="text-sm font-semibold mb-2"
                    style={{ color: "var(--text-1)" }}
                  >
                    {opt.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-3)" }}
                  >
                    {opt.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={mounted ? { opacity: 0 } : false}
            animate={swapInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xs text-center mt-8"
            style={{ color: "var(--text-3)" }}
          >
            {tx.sections.llmSwap.note}
          </motion.p>
        </div>
      </section>

      {/* ── Engineering + Results ───────────────────────────────── */}
      <section
        className="py-20 px-6"
        style={{ background: "var(--bg-section)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div ref={engRef}>
            <motion.div
              initial={mounted ? { opacity: 0, y: 30 } : false}
              animate={engInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionTag>{tx.sections.engineering.tag}</SectionTag>
              <h2
                className="text-3xl font-bold mb-10"
                style={{ color: "var(--text-1)" }}
              >
                {tx.sections.engineering.title}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tx.sections.engineering.items.map((item, i) => {
                const Icon = engineeringIcons[i];
                return (
                  <motion.div
                    key={item.title}
                    initial={mounted ? { opacity: 0, y: 20 } : false}
                    animate={engInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.08 * i + 0.2 }}
                    className="p-5 rounded-xl"
                    style={{
                      border: "1px solid var(--border)",
                      background:
                        "color-mix(in srgb, var(--bg-card) 50%, transparent)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: `${ACCENT}12` }}
                    >
                      <Icon size={16} style={{ color: ACCENT }} />
                    </div>
                    <h3
                      className="text-sm font-semibold mb-2"
                      style={{ color: "var(--text-1)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--text-3)" }}
                    >
                      {item.content}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Results */}
          <div ref={resultRef} className="mt-20">
            <motion.div
              initial={mounted ? { opacity: 0, y: 30 } : false}
              animate={resultInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <SectionTag>{lang === "de" ? "Ergebnis" : "Result"}</SectionTag>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: "var(--text-1)" }}
              >
                {tx.sections.results.title}
              </h2>

              <div
                className="max-w-3xl mx-auto p-8 rounded-2xl"
                style={{
                  border: `1px solid ${ACCENT}30`,
                  background:
                    "color-mix(in srgb, var(--bg-card) 60%, transparent)",
                  boxShadow: `0 0 40px ${ACCENT}08`,
                }}
              >
                <ShieldCheck
                  size={32}
                  className="mx-auto mb-4"
                  style={{ color: ACCENT }}
                />
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-2)" }}
                >
                  {tx.sections.results.content}
                </p>
              </div>
            </motion.div>

            {/* Tech stack summary */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : false}
              animate={resultInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12"
            >
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-4 text-center"
                style={{ color: "var(--text-3)" }}
              >
                Tech Stack
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Python",
                  "SQLite + sqlite-vec",
                  "FTS5 / BM25",
                  "Sentence-Transformers",
                  "Cross-Encoder Reranking",
                  "Tesseract OCR",
                  "PyMuPDF",
                  "FastAPI",
                  "Claude CLI",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs rounded-full"
                    style={{
                      border: "1px solid var(--border)",
                      background:
                        "color-mix(in srgb, var(--bg-card) 50%, transparent)",
                      color: "var(--text-2)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Back CTA */}
            <motion.div
              initial={mounted ? { opacity: 0 } : false}
              animate={resultInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all"
                style={{
                  background: ACCENT,
                  color: "#fff",
                  boxShadow: `0 0 20px ${ACCENT}40`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                <ArrowLeft size={16} />
                {tx.back}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
