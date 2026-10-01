"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/translations";

const sectionIds = ["projects", "about", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { toggle } = useTheme();
  const { lang, toggle: toggleLang } = useLang();
  const tx = t[lang].nav;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      // Narrow horizontal band around the viewport center → exactly one active section
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
          style={{ color: "var(--text-1)" }}
        >
          Sascha Schumbera
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex gap-8">
          {tx.links.map((l) => {
            const isActive = activeSection === l.href;
            return (
              <li key={l.href}>
                <a
                  href={`/${l.href}`}
                  className="text-sm transition-colors duration-200 hover:opacity-100"
                  style={{
                    color: isActive ? "var(--text-1)" : "var(--text-3)",
                  }}
                  aria-current={isActive ? "true" : undefined}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-2)",
              background: "var(--bg-card)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
            aria-label="Switch language"
          >
            {lang === "de" ? "EN" : "DE"}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Theme umschalten"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-2)",
            }}
          >
            <span className="theme-icon theme-icon-sun" aria-hidden="true">
              <Sun size={14} />
            </span>
            <span className="theme-icon theme-icon-moon" aria-hidden="true">
              <Moon size={14} />
            </span>
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          {/* Language toggle mobile */}
          <button
            onClick={toggleLang}
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-2)",
              background: "var(--bg-card)",
            }}
            aria-label="Switch language"
          >
            {lang === "de" ? "EN" : "DE"}
          </button>

          <button
            onClick={toggle}
            aria-label="Theme umschalten"
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-2)",
            }}
          >
            <span className="theme-icon theme-icon-sun" aria-hidden="true">
              <Sun size={14} />
            </span>
            <span className="theme-icon theme-icon-moon" aria-hidden="true">
              <Moon size={14} />
            </span>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ color: "var(--text-2)" }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="absolute top-16 -mt-px left-0 right-0 h-px origin-left"
        style={{
          scaleX: progress,
          background: "var(--text-1)",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "var(--nav-bg)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {tx.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={`/${l.href}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm transition-colors"
                    style={{ color: "var(--text-2)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
