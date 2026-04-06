"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/translations";

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mounted = useIsMounted();
  const { lang } = useLang();
  const tx = t[lang].contact;

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={mounted ? { opacity: 0, y: 30 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
            {tx.tag}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text-1)" }}>
            {tx.heading}
          </h2>
          <p className="text-sm mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: "var(--text-3)" }}>
            {tx.subheading}
          </p>

          {/* Main CTA */}
          <motion.a
            href="mailto:sascha.schumbera@mail.de"
            initial={mounted ? { opacity: 0, scale: 0.95 } : false}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-sm text-white transition-all duration-200 mb-10"
            style={{ background: "var(--accent)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-h)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; }}
          >
            <Mail size={16} />
            sascha.schumbera [at] mail.de
          </motion.a>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-xs" style={{ color: "var(--text-3)" }}>{tx.or}</span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          {/* Social */}
          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center gap-5"
          >
            {[
              { icon: GithubIcon, href: "https://github.com/saschaschumbera", label: "GitHub" },
              { icon: LinkedinIcon, href: "https://www.linkedin.com/in/sascha-schumbera/", label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs transition-all duration-200"
                style={{ border: "1px solid var(--border)", color: "var(--text-2)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.40)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
                }}
              >
                <Icon />
                {label}
              </a>
            ))}
          </motion.div>

          {/* Location */}
          <motion.p
            initial={mounted ? { opacity: 0 } : false}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-1.5 text-xs mt-8"
            style={{ color: "var(--text-3)" }}
          >
            <MapPin size={12} />
            {tx.location}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
