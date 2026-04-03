"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Brain, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projekte", href: "#projects" },
  { label: "Erfahrung", href: "#experience" },
  { label: "Kontakt", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
        <a href="#" className="flex items-center gap-2 group">
          <div
            className="relative w-8 h-8 rounded-lg flex items-center justify-center group-hover:opacity-80 transition-all duration-300"
            style={{
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.30)",
            }}
          >
            <Brain size={16} style={{ color: "var(--accent)" }} />
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border"
              style={{ background: "#22c55e", borderColor: "var(--bg-base)" }}
            />
          </div>
          <span
            className="text-xs font-semibold hidden sm:block transition-colors duration-200"
            style={{ color: "var(--text-2)" }}
          >
            Sascha Schumbera
          </span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm transition-colors duration-200 hover:opacity-100"
                style={{ color: "var(--text-2)" }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
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

          <a
            href="/cv-sascha-schumbera.pdf"
            download
            className="text-xs font-medium px-4 py-2 rounded-full transition-all duration-200"
            style={{
              border: "1px solid var(--accent)",
              color: "var(--accent)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = "var(--accent)";
              (e.target as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "transparent";
              (e.target as HTMLElement).style.color = "var(--accent)";
            }}
          >
            CV Download
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
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
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm transition-colors"
                    style={{ color: "var(--text-2)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/cv-sascha-schumbera.pdf"
                  download
                  className="text-xs font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  CV Download
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
