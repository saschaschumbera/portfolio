"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { ArrowDown, Download, Mail } from "lucide-react";
import Image from "next/image";

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const roles = ["AI-orientierter Softwareentwickler", "Referent Kreditrisikosteuerung", "B.Sc. Angewandte KI (laufend)"];
const quickFacts = [
  "10+ Jahre Finanz- und Banking-Erfahrung",
  "KI-gestützte Dokumentenanalyse & OCR-Workflows",
  "AI-orientierte End-to-End Produktentwicklung",
  "Schwerpunkte: Python, SQL, Power BI, OCR",
];

export default function Hero() {
  const mounted = useIsMounted();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 120);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(to right, var(--accent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--glow-1)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--glow-2)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Avatar */}
        <motion.div
          initial={mounted ? { opacity: 0, scale: 0.8 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div
              className="w-28 h-28 rounded-full overflow-hidden"
              style={{
                boxShadow: "0 0 0 4px var(--bg-base), 0 0 0 6px rgba(99,102,241,0.4), 0 0 24px rgba(99,102,241,0.2)",
              }}
            >
              <Image
                src="/profile.jpg"
                alt="Sascha Schumbera"
                width={112}
                height={112}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#22c55e] border-2"
              style={{ borderColor: "var(--bg-base)" }}
              title="Available"
            />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{
            border: "1px solid rgba(99,102,241,0.30)",
            background: "rgba(99,102,241,0.10)",
            color: "var(--accent)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
          AI & Automatisierung im Finanzkontext
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={mounted ? { opacity: 0, y: 30 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
          style={{ color: "var(--text-1)" }}
        >
          Sascha{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a78bfa]">
            Schumbera
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={mounted ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-10 flex items-center justify-center mb-6"
        >
          <span className="text-xl md:text-2xl font-light" style={{ color: "var(--text-2)" }}>
            {displayed}
            <span className="animate-pulse" style={{ color: "var(--accent)" }}>|</span>
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--text-3)" }}
        >
          KI-Anwendungen für dokumenten- und datengetriebene Prozesse. Über 10 Jahre Banking-Erfahrung
          trifft auf moderne AI-Entwicklung — von Dokumentenanalyse bis zu
          Multi-Agent-Systemen.
        </motion.p>

        <motion.div
          initial={mounted ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {quickFacts.map((fact) => (
            <span
              key={fact}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                border: "1px solid var(--border)",
                background: "color-mix(in srgb, var(--bg-card) 45%, transparent)",
                color: "var(--text-2)",
              }}
            >
              {fact}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href="mailto:sascha.schumbera@mail.de"
            className="px-8 py-3 rounded-full font-medium text-sm transition-all duration-200"
            style={{ background: "var(--accent)", color: "#fff" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-h)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; }}
          >
            Projekt anfragen
          </a>
          <a
            href="#projects"
            className="px-8 py-3 rounded-full font-medium text-sm transition-all duration-200"
            style={{ border: "1px solid var(--border)", color: "var(--text-2)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
            }}
          >
            Projekte ansehen
          </a>
          <a
            href="/cv-sascha-schumbera.pdf"
            download
            className="px-8 py-3 rounded-full font-medium text-sm transition-all duration-200 inline-flex items-center justify-center gap-2"
            style={{ border: "1px solid var(--border)", color: "var(--text-2)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
            }}
          >
            <Download size={16} />
            CV downloaden
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={mounted ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex justify-center gap-6"
        >
          {[
            { icon: GithubIcon, href: "https://github.com/saschaschumbera", label: "GitHub" },
            { icon: LinkedinIcon, href: "https://www.linkedin.com/in/sascha-schumbera/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:sascha.schumbera@mail.de", label: "E-Mail" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="transition-colors duration-200"
              style={{ color: "var(--text-3)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
            >
              <Icon />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-colors"
        style={{ color: "var(--text-3)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  );
}
