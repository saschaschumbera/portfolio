"use client";

import Link from "next/link";

// Wraps the portfolio's legal content in the Glanzstück Media look by overriding the theme
// variables locally, so the legal texts stay single-sourced.
const vars = {
  "--bg-base": "#0F0F0D",
  "--bg-card": "#1A1A17",
  "--border": "rgba(243,238,230,0.14)",
  "--text-1": "#F3EEE6",
  "--text-2": "#A39E95",
  "--text-3": "#7D786F",
  "--accent": "#FF5A36",
} as React.CSSProperties;

export default function GlanzstueckLegalFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...vars, background: "#0F0F0D", color: "#F3EEE6" }} className="min-h-screen w-full">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/glanzstueck-media" className="flex items-center gap-2" aria-label="Zurück zu Glanzstück Media">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0Z" fill="#FF5A36" />
          </svg>
          <span
            className="text-lg"
            style={{ fontFamily: "var(--font-display), var(--font-geist-sans), sans-serif", fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            Glanzstück Media
          </span>
        </Link>
        <Link href="/glanzstueck-media" className="text-sm font-semibold hover:underline" style={{ color: "#A39E95" }}>
          ← Zurück
        </Link>
      </header>
      {children}
    </div>
  );
}
