"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Brain, TrendingUp, Cpu } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/translations";

const icons = [TrendingUp, Brain, Cpu];

export default function About() {
  const mounted = useIsMounted();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLang();
  const tx = t[lang].about;

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
              {tx.tag}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: "var(--text-1)" }}>
              {tx.heading1}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a78bfa]">
                {tx.heading2}
              </span>
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
              <p>{tx.p1}</p>
              <p>{tx.p2}</p>
              <p>{tx.p3}</p>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            {tx.highlights.map(({ label, desc }, i) => {
              const Icon = icons[i];
              return (
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
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
