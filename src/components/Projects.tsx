"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/translations";
import DemoVideo from "./DemoVideo";

type FeaturedMeta = {
  caseStudyUrl: string;
  github: string | null;
  tags: string[];
  demo?: { src: Record<"de" | "en", string>; poster: Record<"de" | "en", string> };
  externalLinks?: { label: string; url: string }[];
};

// Index-gekoppelt an t.<lang>.projects.featured — Reihenfolge muss übereinstimmen.
const featuredMeta: FeaturedMeta[] = [
  {
    caseStudyUrl: "/case-studies/docinspect",
    github: null,
    tags: ["Python", "PyMuPDF", "Codex CLI", "Pydantic", "Tesseract OCR", "FastAPI"],
    demo: {
      src: { de: "/projects/docinspect-demo-de.mp4", en: "/projects/docinspect-demo-en.mp4" },
      poster: { de: "/projects/docinspect-demo-de.jpg", en: "/projects/docinspect-demo-en.jpg" },
    },
  },
  {
    caseStudyUrl: "/case-studies/papierkram-orakel",
    github: "https://github.com/saschaschumbera/papierkram-orakel",
    tags: ["Python", "RAG", "Hybrid Search", "SQLite", "Sentence-Transformers", "OCR"],
    demo: {
      src: { de: "/projects/papierkram-demo-de.mp4", en: "/projects/papierkram-demo-en.mp4" },
      poster: { de: "/projects/papierkram-demo-de.jpg", en: "/projects/papierkram-demo-en.jpg" },
    },
  },
  {
    caseStudyUrl: "/case-studies/tiktok-autopilot",
    github: null,
    tags: ["Python", "Gemini", "Whisper", "Playwright", "FFmpeg", "ETL"],
    demo: {
      src: { de: "/projects/tiktok-demo-de.mp4", en: "/projects/tiktok-demo-en.mp4" },
      poster: { de: "/projects/tiktok-demo-de.jpg", en: "/projects/tiktok-demo-en.jpg" },
    },
    externalLinks: [
      { label: "@gedankenguide", url: "https://www.tiktok.com/@gedankenguide" },
      { label: "@geldnerd", url: "https://www.tiktok.com/@geldnerd" },
    ],
  },
];

function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mounted = useIsMounted();
  return (
    <motion.div
      ref={ref}
      initial={mounted ? { opacity: 0, y: 24 } : false}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { lang } = useLang();
  const tx = t[lang].projects;

  return (
    <section id="projects" className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="pt-10 mb-16">
          <div style={{ borderTop: "1px solid var(--border)" }} className="pt-10">
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--text-3)" }}>
              {tx.tag}
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3" style={{ color: "var(--text-1)" }}>
              {tx.heading}
            </h2>
            <p className="text-base max-w-xl" style={{ color: "var(--text-3)" }}>
              {tx.subheading}
            </p>
          </div>
        </FadeIn>

        {/* Showcases */}
        <div className="space-y-24 md:space-y-32">
          {tx.featured.map((item, i) => {
            const meta = featuredMeta[i];
            return (
              <FadeIn key={item.title}>
                <article className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                  {/* Text */}
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <p className="text-xs font-mono mb-3" style={{ color: "var(--text-3)" }}>
                      {String(i + 1).padStart(2, "0")} · {item.status}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-1" style={{ color: "var(--text-1)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm mb-5" style={{ color: "var(--accent)" }}>{item.subtitle}</p>
                    <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-2)" }}>
                      {item.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {item.metrics.map((m) => (
                        <div key={m.label} className="pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                          <p className="text-xl md:text-2xl font-semibold tracking-tight mb-1 whitespace-nowrap" style={{ color: "var(--text-1)" }}>
                            {m.value}
                          </p>
                          <p className="text-xs leading-snug" style={{ color: "var(--text-3)" }}>{m.label}</p>
                        </div>
                      ))}
                    </div>

                    <ul className="space-y-2 mb-6">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                          <span aria-hidden="true" style={{ color: "var(--text-3)" }}>—</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <p className="text-xs font-mono mb-8" style={{ color: "var(--text-3)" }}>
                      {meta.tags.join(" · ")}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                      <a
                        href={meta.caseStudyUrl}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-85"
                        style={{ background: "var(--text-1)", color: "var(--bg-base)" }}
                      >
                        {tx.readCaseStudy}
                        <ArrowUpRight size={14} />
                      </a>
                      {meta.github ? (
                        <a
                          href={meta.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm underline underline-offset-4 decoration-[var(--border)] hover:decoration-current"
                          style={{ color: "var(--text-1)" }}
                        >
                          {tx.viewCode}
                          <ArrowUpRight size={14} />
                        </a>
                      ) : (
                        <span className="text-xs" style={{ color: "var(--text-3)" }}>{tx.repoOnRequest}</span>
                      )}
                    </div>
                  </div>

                  {/* Media */}
                  <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""} ${meta.demo ? "order-first lg:order-none" : ""}`}>
                    {meta.demo && (
                      <>
                        <DemoVideo
                          src={meta.demo.src[lang]}
                          poster={meta.demo.poster[lang]}
                          label={tx.watchWithSound}
                          onWatchWithSound={() => setActiveVideo(meta.demo!.src[lang])}
                        />
                        <p className="text-xs font-mono mt-3" style={{ color: "var(--text-3)" }}>{item.demoCaption}</p>
                      </>
                    )}
                    {meta.externalLinks && (
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                        {meta.externalLinks.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono transition-colors text-[var(--text-3)] hover:text-[var(--text-1)]"
                          >
                            {link.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        {/* Video Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)" }}
            onClick={() => setActiveVideo(null)}
          >
            <div className="relative rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
                aria-label="Video schließen"
              >
                <X size={14} />
              </button>
              <video
                src={activeVideo}
                controls
                autoPlay
                className="rounded-2xl max-w-[90vw]"
                style={{ maxHeight: "82vh", background: "#000" }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
