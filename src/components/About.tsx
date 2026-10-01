"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/translations";

export default function About() {
  const mounted = useIsMounted();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLang();
  const tx = t[lang].about;

  return (
    <section id="about" className="px-6 py-24" ref={ref}>
      <motion.div
        initial={mounted ? { opacity: 0, y: 24 } : false}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto pt-10 grid md:grid-cols-12 gap-12"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="md:col-span-6">
          <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--text-3)" }}>
            {tx.tag}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6" style={{ color: "var(--text-1)" }}>
            {tx.heading}
          </h2>
          <div className="space-y-4 text-base leading-relaxed mb-10" style={{ color: "var(--text-2)" }}>
            <p>{tx.p1}</p>
            <p>{tx.p2}</p>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "var(--text-3)" }}>
            {tx.stackLabel}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
            {tx.stack}
          </p>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--text-3)" }}>
            {tx.timelineLabel}
          </p>
          <ul>
            {tx.timeline.map((item) => (
              <li
                key={item.role}
                className="flex justify-between gap-4 py-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-1)" }}>{item.role}</p>
                  <p className="text-xs" style={{ color: "var(--text-3)" }}>{item.company}</p>
                </div>
                <p className="text-xs font-mono whitespace-nowrap pt-0.5" style={{ color: "var(--text-3)" }}>
                  {item.period}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
