"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Zap,
  Shield,
  Palette,
  Clock,
  TrendingUp,
  Server,
  Clapperboard,
  Cpu,
  Eye,
  Music,
  Upload,
  Search,
  FileText,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLang } from "../LanguageProvider";
import { caseStudyTiktok } from "@/lib/caseStudyTiktokTranslations";

const ACCENT = "#ec4899";

/* ── tiny reusable bits ───────────────────────────────────────── */
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

/* ── pipeline stage icons ─────────────────────────────────────── */
const stageIcons = [Search, FileText, Clapperboard, Palette, Music, Upload];

/* ── deep-dive icons ──────────────────────────────────────────── */
const deepDiveIcons = [AlertTriangle, Shield, Palette];

export default function TikTokAutopilotCaseStudy() {
  const mounted = useIsMounted();
  const { lang } = useLang();
  const tx = caseStudyTiktok[lang];

  const heroRef = useRef(null);
  const archRef = useRef(null);
  const deepRef = useRef(null);
  const resultRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const archInView = useInView(archRef, { once: true, margin: "-80px" });
  const deepInView = useInView(deepRef, { once: true, margin: "-80px" });
  const resultInView = useInView(resultRef, { once: true, margin: "-80px" });

  const stages =
    lang === "de"
      ? [
          { name: "Scrape", desc: "TikTok via Playwright" },
          { name: "Extract", desc: "Whisper + OCR + CC" },
          { name: "Build", desc: "Gemini TTS + FFmpeg" },
          { name: "Overlay", desc: "HeyGen HyperFrames" },
          { name: "Mix", desc: "Background Music" },
          { name: "Upload", desc: "TikTok, IG & YT" },
        ]
      : [
          { name: "Scrape", desc: "TikTok via Playwright" },
          { name: "Extract", desc: "Whisper + OCR + CC" },
          { name: "Build", desc: "Gemini TTS + FFmpeg" },
          { name: "Overlay", desc: "HeyGen HyperFrames" },
          { name: "Mix", desc: "Background Music" },
          { name: "Upload", desc: "TikTok, IG & YT" },
        ];

  const metrics =
    lang === "de"
      ? [
          { value: "4", label: "Kanäle in Produktion" },
          { value: "12+", label: "Videos / Tag" },
          { value: "3", label: "Plattformen" },
          { value: "0 €", label: "Manuelle Arbeit" },
        ]
      : [
          { value: "4", label: "Channels in Production" },
          { value: "12+", label: "Videos / Day" },
          { value: "3", label: "Platforms" },
          { value: "€0", label: "Manual Labor" },
        ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg-base)", color: "var(--text-1)" }}
    >
      {/* ── Back link ───────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
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
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: `${ACCENT}15` }}
            >
              <Clapperboard size={28} style={{ color: ACCENT }} />
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
                  backgroundImage: `linear-gradient(135deg, ${ACCENT}, #a855f7)`,
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

            {/* Tags */}
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

          {/* Metrics */}
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

      {/* ── Architecture Pipeline ───────────────────────────────── */}
      <section
        ref={archRef}
        className="py-20 px-6"
        style={{ background: "var(--bg-section)" }}
      >
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
              className="text-sm mb-10 max-w-2xl leading-relaxed"
              style={{ color: "var(--text-3)" }}
            >
              {tx.sections.architecture.content}
            </p>
          </motion.div>

          {/* Visual pipeline */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stages.map((stage, i) => {
              const Icon = stageIcons[i];
              return (
                <motion.div
                  key={stage.name}
                  initial={mounted ? { opacity: 0, y: 20 } : false}
                  animate={archInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.08 * i + 0.2 }}
                  className="relative p-4 rounded-xl text-center group"
                  style={{
                    border: "1px solid var(--border)",
                    background:
                      "color-mix(in srgb, var(--bg-card) 70%, transparent)",
                  }}
                >
                  {/* Step number */}
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: ACCENT, color: "#fff" }}
                  >
                    {i + 1}
                  </div>

                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 mt-2 transition-colors"
                    style={{ background: `${ACCENT}12` }}
                  >
                    <Icon
                      size={18}
                      style={{ color: ACCENT }}
                    />
                  </div>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: "var(--text-1)" }}
                  >
                    {stage.name}
                  </p>
                  <p
                    className="text-[11px] leading-snug"
                    style={{ color: "var(--text-3)" }}
                  >
                    {stage.desc}
                  </p>

                  {/* Connector arrow (not on last) */}
                  {i < stages.length - 1 && (
                    <div
                      className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-lg"
                      style={{ color: "var(--border)" }}
                    >
                      →
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Data flow detail */}
          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={archInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-10 p-6 rounded-xl"
            style={{
              border: "1px solid var(--border)",
              background:
                "color-mix(in srgb, var(--bg-card) 50%, transparent)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Server size={18} style={{ color: ACCENT }} />
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--text-1)" }}
              >
                {lang === "de" ? "Orchestrierung" : "Orchestration"}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-xs" style={{ color: "var(--text-3)" }}>
              <div className="flex items-start gap-2">
                <Clock size={14} className="mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                <span>
                  {lang === "de"
                    ? "Windows Task Scheduler steuert die Generate- und Upload-Zyklen pro Kanal (z.B. inner_child: 07:00 Generate, 09/15/21 Upload)."
                    : "Windows Task Scheduler controls generate and upload cycles per channel (e.g. inner_child: 07:00 generate, 09/15/21 upload)."}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Cpu size={14} className="mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                <span>
                  {lang === "de"
                    ? "16 rotierende Gemini API Keys mit Round-Robin und Mindestabstand (0.7s) verhindern Rate-Limit-Überschreitungen."
                    : "16 rotating Gemini API keys with round-robin and minimum interval (0.7s) prevent rate-limit violations."}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Eye size={14} className="mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                <span>
                  {lang === "de"
                    ? "Kanalübergreifendes Analytics-Reporting (22:15) und wöchentliche Brand-Checks per Telegram-Benachrichtigung."
                    : "Cross-channel analytics reporting (22:15) and weekly brand checks via Telegram notification."}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Deep Dives ──────────────────────────────────────────── */}
      <section ref={deepRef} className="py-20 px-6">
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

      {/* ── Results / Impact ────────────────────────────────────── */}
      <section
        ref={resultRef}
        className="py-20 px-6"
        style={{ background: "var(--bg-section)" }}
      >
        <div className="max-w-5xl mx-auto">
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
              <TrendingUp
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
                "Playwright",
                "Whisper",
                "Tesseract OCR",
                "Gemini TTS",
                "FFmpeg",
                "yt-dlp",
                "HeyGen HyperFrames",
                "GSAP",
                "Windows Task Scheduler",
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
      </section>
    </div>
  );
}
