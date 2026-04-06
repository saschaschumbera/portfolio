"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/translations";

const skillGroups = [
  { key: "ai", color: "#6366f1" },
  { key: "programming", color: "#a78bfa" },
  { key: "engineering", color: "#e879f9" },
  { key: "data", color: "#34d399" },
  { key: "finance", color: "#fb923c" },
  { key: "tools", color: "#38bdf8" },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mounted = useIsMounted();
  const { lang } = useLang();
  const tx = t[lang].skills;

  return (
    <section id="skills" className="py-24 px-6" style={{ background: "var(--bg-section)" }} ref={ref}>
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
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map(({ key, color }, gi) => {
            const category = tx.categories.find((c) => c.key === key)?.label ?? key;
            const skills = tx.groups[key as keyof typeof tx.groups] ?? [];
            return (
              <motion.div
                key={key}
                initial={mounted ? { opacity: 0, y: 30 } : false}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: gi * 0.08 }}
                className="p-5 rounded-xl transition-all duration-300 group"
                style={{
                  border: "1px solid var(--border)",
                  background: "color-mix(in srgb, var(--bg-card) 40%, transparent)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--text-2)" }}>
                    {category}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs rounded-full border transition-all duration-200"
                      style={{
                        borderColor: `${color}30`,
                        background: `${color}08`,
                        color: "var(--text-2)",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
