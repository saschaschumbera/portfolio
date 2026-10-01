"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { X, Play, ArrowUpRight } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/translations";

type FeaturedMeta = {
  caseStudyUrl: string;
  github: string | null;
  tags: string[];
  videos?: { label: string; src: string }[];
  image?: { src: string; width: number; height: number; alt: string };
  externalLinks?: { label: string; url: string }[];
};

// Index-gekoppelt an t.<lang>.projects.featured — Reihenfolge muss übereinstimmen.
const featuredMeta: FeaturedMeta[] = [
  {
    caseStudyUrl: "/case-studies/docinspect",
    github: null,
    tags: ["Python", "PyMuPDF", "Codex CLI", "Pydantic", "Tesseract OCR", "FastAPI"],
    image: { src: "/case-studies/docinspect-report.png", width: 1744, height: 1630, alt: "DocInspect — Prüfbericht einer manipulierten Gehaltsabrechnung" },
  },
  {
    caseStudyUrl: "/case-studies/papierkram-orakel",
    github: "https://github.com/saschaschumbera/papierkram-orakel",
    tags: ["Python", "RAG", "Hybrid Search", "SQLite", "Sentence-Transformers", "OCR"],
    image: { src: "/case-studies/papierkram-ui-chat.png", width: 1568, height: 662, alt: "Papierkram-Orakel — Chat mit Quellenangabe" },
  },
  {
    caseStudyUrl: "/case-studies/tiktok-autopilot",
    github: null,
    tags: ["Python", "Gemini", "Whisper", "Playwright", "FFmpeg", "ETL"],
    videos: [
      { label: "Gedankenguide", src: "/projects/tiktok-gedankenguide.mp4" },
      { label: "Geldnerd", src: "/projects/tiktok-geldnerd.mp4" },
    ],
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
                  <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    {meta.videos && (
                      <>
                        <div className="grid grid-cols-2 gap-3 max-w-lg">
                          {meta.videos.map((v) => (
                            <button
                              key={v.src}
                              type="button"
                              onClick={() => setActiveVideo(v.src)}
                              className="group/video relative aspect-[9/16] rounded-lg overflow-hidden"
                              style={{ border: "1px solid var(--border)", background: "#000" }}
                              aria-label={`${v.label} — ${tx.demoVideo}`}
                            >
                              <video
                                src={`${v.src}#t=0.1`}
                                preload="metadata"
                                muted
                                playsInline
                                tabIndex={-1}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-[1.04]"
                              />
                              <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/video:bg-black/0 transition-colors duration-300">
                                <span
                                  className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover/video:scale-110"
                                  style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.25)" }}
                                >
                                  <Play size={13} fill="#fff" style={{ color: "#fff", marginLeft: 1 }} />
                                </span>
                              </span>
                              <span
                                className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-medium rounded-full whitespace-nowrap"
                                style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
                              >
                                {v.label}
                              </span>
                            </button>
                          ))}
                        </div>
                        {meta.externalLinks && (
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
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
                      </>
                    )}
                    {meta.image && (
                      <a
                        href={meta.caseStudyUrl}
                        className="block rounded-lg overflow-hidden transition-opacity hover:opacity-90"
                        style={{ border: "1px solid var(--border)" }}
                      >
                        <Image
                          src={meta.image.src}
                          alt={meta.image.alt}
                          width={meta.image.width}
                          height={meta.image.height}
                          sizes="(min-width: 1024px) 60vw, 100vw"
                          className="w-full h-auto"
                        />
                      </a>
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
