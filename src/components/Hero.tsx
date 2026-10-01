"use client";

import { motion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { FileText, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/translations";

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = () => <Mail size={16} />;

const socials = [
  { icon: GithubIcon, href: "https://github.com/saschaschumbera", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/sascha-schumbera/", label: "LinkedIn" },
  { icon: MailIcon, href: "mailto:sascha.schumbera@mail.de", label: "E-Mail" },
];

export default function Hero() {
  const mounted = useIsMounted();
  const { lang } = useLang();
  const tx = t[lang].hero;

  return (
    <section className="px-6 pt-28 pb-16 md:pt-44 md:pb-28">
      <motion.div
        initial={mounted ? { opacity: 0, y: 16 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Image
            src="/profile.jpg"
            alt="Sascha Schumbera"
            width={44}
            height={44}
            className="w-11 h-11 rounded-full object-cover object-top"
            priority
          />
          <div>
            <h1 className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>
              Sascha Schumbera
            </h1>
            <p className="flex items-baseline gap-1.5 text-xs" style={{ color: "var(--text-3)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0 -translate-y-px" aria-hidden="true" />
              {tx.availability}
            </p>
          </div>
        </div>

        <p
          className="text-[2rem] sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.08] max-w-4xl mb-8"
          style={{ color: "var(--text-1)" }}
        >
          {tx.headline}
        </p>

        <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-4" style={{ color: "var(--text-2)" }}>
          {tx.intro}
        </p>
        <p className="text-sm max-w-2xl mb-10" style={{ color: "var(--text-3)" }}>
          {tx.meta}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`mailto:sascha.schumbera@mail.de?subject=${encodeURIComponent(tx.cvSubject)}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-85"
            style={{ background: "var(--text-1)", color: "var(--bg-base)" }}
          >
            <FileText size={14} />
            {tx.cvRequest}
          </a>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("chatbot:open"))}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors hover:border-[var(--text-3)]"
            style={{ border: "1px solid var(--border)", color: "var(--text-1)" }}
          >
            <MessageCircle size={14} />
            {tx.askBot}
          </button>
          <div className="flex items-center gap-5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="transition-colors duration-200 text-[var(--text-3)] hover:text-[var(--text-1)]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
