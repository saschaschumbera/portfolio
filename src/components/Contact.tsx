"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/translations";

const links = [
  { href: "https://github.com/saschaschumbera", label: "GitHub" },
  { href: "https://www.linkedin.com/in/sascha-schumbera/", label: "LinkedIn" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mounted = useIsMounted();
  const { lang } = useLang();
  const tx = t[lang].contact;

  return (
    <section id="contact" className="px-6 pt-8 pb-28" ref={ref}>
      <motion.div
        initial={mounted ? { opacity: 0, y: 24 } : false}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto pt-10"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--text-3)" }}>
          {tx.tag}
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4" style={{ color: "var(--text-1)" }}>
          {tx.heading}
        </h2>
        <p className="text-base max-w-xl leading-relaxed mb-10" style={{ color: "var(--text-2)" }}>
          {tx.subheading}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-8">
          <a
            href="mailto:sascha.schumbera@mail.de"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-85"
            style={{ background: "var(--text-1)", color: "var(--bg-base)" }}
          >
            <Mail size={15} />
            sascha.schumbera [at] mail.de
          </a>
          {links.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="inline-flex items-center gap-1 text-sm underline underline-offset-4 decoration-[var(--border)] hover:decoration-current"
              style={{ color: "var(--text-1)" }}
            >
              {label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>

        <p className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-3)" }}>
          <MapPin size={12} />
          {tx.location}
        </p>
      </motion.div>
    </section>
  );
}
