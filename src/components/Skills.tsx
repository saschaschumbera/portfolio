"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";

const skillGroups = [
  {
    category: "AI & LLMs",
    color: "#6366f1",
    skills: [
      "Claude Code",
      "Cursor",
      "GitHub Copilot",
      "LangGraph",
      "Prompt Engineering",
      "Agentic AI",
      "Lokale LLMs",
      "AI-first Development",
    ],
  },
  {
    category: "Programmierung",
    color: "#a78bfa",
    skills: ["Python", "SQL", "TypeScript"],
  },
  {
    category: "Software & Data Engineering",
    color: "#f59e0b",
    skills: [
      "API-Design",
      "OCR-Pipelines",
      "Datenmodellierung",
      "Prozessautomatisierung",
      "Multi-Agent-Systeme",
      "Privacy-by-Design",
    ],
  },
  {
    category: "Daten & Reporting",
    color: "#34d399",
    skills: ["Power BI", "SAS", "DAX", "Excel/VBA"],
  },
  {
    category: "Finance-Domain",
    color: "#fb923c",
    skills: [
      "Kreditrisikosteuerung",
      "Scoring-Modelle",
      "Betrugserkennung",
      "SCHUFA-DSS",
      "Kreditentscheidung",
      "Risikomodelle",
    ],
  },
  {
    category: "Tools & Automation",
    color: "#38bdf8",
    skills: ["Power Automate", "UIPath (RPA)", "SCHUFA-DSS"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mounted = useIsMounted();

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
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-1)" }}>
            Werkzeugkasten
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map(({ category, color, skills }, gi) => (
            <motion.div
              key={category}
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
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: color }}
                />
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
          ))}
        </div>
      </div>
    </section>
  );
}
