"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Brain, TrendingUp, Cpu } from "lucide-react";

const highlights = [
  {
    icon: TrendingUp,
    label: "10+ Jahre Finance",
    desc: "Kredit, Risiko & Automatisierung in führenden Finanzinstituten",
  },
  {
    icon: Brain,
    label: "AI-First Developer",
    desc: "End-to-End KI-Produkte mit LLMs, Agentic AI und OCR-Pipelines",
  },
  {
    icon: Cpu,
    label: "B.Sc. Angewandte KI",
    desc: "Studium an der IU Internationale Hochschule (2025–2029)",
  },
];

export default function About() {
  const mounted = useIsMounted();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={mounted ? { opacity: 0, y: 30 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Text */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
              About
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: "var(--text-1)" }}>
              Wo Finanz-Expertise
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a78bfa]">
                auf KI trifft
              </span>
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
              <p>
                Was mich von reinen Entwicklern unterscheidet: Ich habe über zehn
                Jahre lang eigenverantwortlich Kreditentscheidungen getroffen,
                Risikomodelle angewendet und Betrugsparameter analysiert — bevor
                ich anfing, KI-Systeme genau dafür zu bauen.
              </p>
              <p>
                Bei Bank11 habe ich Automatisierungslösungen mit SQL und
                SCHUFA-DSS umgesetzt sowie Power-BI-Dashboards für das
                Management-Reporting erstellt. Bei De Lage Landen habe ich
                Kreditentscheidungsprozesse mit VBA & UIPath automatisiert. Ich
                weiß, welche Probleme wirklich schmerzen — und wie KI sie löst.
              </p>
              <p>
                Heute baue ich End-to-End KI-Anwendungen mit Python, FastAPI,
                LLMs und Multi-Agent-Systemen — mit dem Blick eines Praktikers,
                der beide Welten kennt.
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={mounted ? { opacity: 0, x: 30 } : false}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i + 0.2 }}
                className="flex gap-4 p-5 rounded-xl transition-colors duration-300"
                style={{
                  border: "1px solid var(--border)",
                  background: "color-mix(in srgb, var(--bg-card) 50%, transparent)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.30)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(99,102,241,0.10)" }}
                >
                  <Icon size={18} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>{label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
