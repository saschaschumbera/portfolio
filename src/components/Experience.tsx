"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/translations";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mounted = useIsMounted();
  const { lang } = useLang();
  const tx = t[lang].experience;

  return (
    <section id="experience" className="py-24 px-6" style={{ background: "var(--bg-section)" }} ref={ref}>
      <div className="max-w-4xl mx-auto">
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
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "var(--border)" }}
          />

          <div className="space-y-10">
            {tx.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={mounted ? { opacity: 0, x: i % 2 === 0 ? -30 : 30 } : false}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-6 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10 mt-1.5"
                  style={{
                    background: "var(--bg-base)",
                    borderColor: item.type === "education" ? "var(--accent-gold)" : "var(--accent)",
                  }}
                />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />

                {/* Card */}
                <div className="ml-12 md:ml-0 flex-1 md:max-w-[calc(50%-2rem)]">
                  <div
                    className="p-5 rounded-xl transition-colors duration-300"
                    style={{
                      border: "1px solid var(--border)",
                      background: "color-mix(in srgb, var(--bg-card) 50%, transparent)",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.20)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-sm font-semibold leading-snug" style={{ color: "var(--text-1)" }}>
                          {item.role}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: item.type === "education" ? "var(--accent-gold)" : "var(--accent)" }}
                        >
                          {item.company}
                        </p>
                      </div>
                      <span className="text-xs whitespace-nowrap" style={{ color: "var(--text-3)" }}>
                        {item.period}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-3)" }}>
                      {item.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs rounded-full"
                          style={{
                            background: "rgba(99,102,241,0.08)",
                            border: "1px solid rgba(99,102,241,0.20)",
                            color: "var(--text-2)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
