"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, FileSearch, X, Video, PenLine } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/translations";

const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const projectMeta = [
  { icon: FileSearch, accent: "#6366f1", github: null, videoSrc: "/projects/docinspect-demo.mp4", tags: ["Python", "FastAPI", "OCR", "LLM", "Multi-Agent", "Privacy-by-Design"] },
  { icon: Shield, accent: "#f59e0b", github: null, videoSrc: "/projects/vertragsverwaltung-demo.mp4", tags: ["Python", "API-Design", "OCR", "SQL", "Self-Hosted", "Fullstack"] },
  { icon: PenLine, accent: "#22c55e", github: null, videoSrc: "/projects/smartnotes-demo.mp4", tags: ["Node.js", "Express", "Google Gemini API", "Canvas API", "Markdown", "Fullstack"] },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mounted = useIsMounted();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { lang } = useLang();
  const tx = t[lang].projects;

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
            {tx.tag}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-1)" }}>
            {tx.heading}
          </h2>
          <p className="text-sm mt-3 max-w-xl mx-auto" style={{ color: "var(--text-3)" }}>
            {tx.subheading}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {tx.items.map((item, i) => {
            const { icon: Icon, accent, github, highlights: _h, videoSrc, tags } = { ...projectMeta[i], highlights: item.highlights };
            return (
              <motion.article
                key={item.title}
                initial={mounted ? { opacity: 0, y: 40 } : false}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative p-6 rounded-2xl transition-all duration-300 overflow-hidden"
                style={{
                  border: "1px solid var(--border)",
                  background: "color-mix(in srgb, var(--bg-card) 40%, transparent)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in srgb, var(--border) 80%, transparent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: accent }}
                />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${accent}18` }}
                    >
                      <Icon size={18} style={{ color: accent }} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold" style={{ color: "var(--text-1)" }}>
                        {item.title}
                      </h3>
                      <p className="text-xs" style={{ color: "var(--text-3)" }}>{item.subtitle}</p>
                    </div>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full border"
                    style={{
                      color: accent,
                      borderColor: `${accent}40`,
                      background: `${accent}10`,
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-3)" }}>
                  {item.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1 mb-5">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-2)" }}>
                      <span style={{ color: accent }} className="text-[10px]">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full"
                      style={{
                        background: "var(--bg-base)",
                        border: "1px solid var(--border)",
                        color: "var(--text-3)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {github ? (
                    <a
                      href={github}
                      className="flex items-center gap-1.5 text-xs transition-colors"
                      style={{ color: "var(--text-3)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
                    >
                      <GithubIcon />
                      GitHub
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-3)" }}>
                      <GithubIcon />
                      {tx.repoOnRequest}
                    </span>
                  )}
                  {videoSrc && (
                    <button
                      type="button"
                      onClick={() => setActiveVideo(videoSrc)}
                      className="flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity"
                      style={{ color: accent }}
                    >
                      <Video size={13} />
                      {tx.demoVideo}
                    </button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Coming soon card */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 p-5 rounded-2xl border-dashed text-center"
          style={{ border: "1px dashed var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-3)" }}>
            {tx.comingSoon}
          </p>
        </motion.div>

        {/* Video Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)" }}
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="w-full max-w-4xl rounded-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
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
                className="w-full rounded-2xl"
                style={{ maxHeight: "80vh", background: "#000" }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
