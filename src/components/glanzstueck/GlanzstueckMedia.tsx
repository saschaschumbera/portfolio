"use client";

import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Own visual identity, independent of the portfolio theme (no CSS vars from globals.css).
const C = {
  ink: "#0F0F0D",
  ink2: "#1A1A17",
  paper: "#F3EEE6",
  coral: "#FF5A36",
  muted: "#A39E95",
  line: "rgba(243,238,230,0.14)",
};
const MAIL =
  "mailto:sascha.schumbera@mail.de?subject=" + encodeURIComponent("Videoanfrage über Glanzstück Media");
const display = "var(--font-display), var(--font-geist-sans), sans-serif";

const WORK = [
  {
    id: "story",
    src: "/glanzstueck-media/story-21-47.mp4",
    poster: "/glanzstueck-media/story-21-47.jpg",
    n: "01",
    title: "„21:47 Uhr“",
    kind: "Story",
    len: "28 s",
    text: "Eine Friseurin, ein Handy, das nicht aufhört zu summen — und eine App, die das löst. 3D-Handy, echtes Problem, klare Lösung.",
  },
  {
    id: "kinetic",
    src: "/glanzstueck-media/kinetic-klingeln.mp4",
    poster: "/glanzstueck-media/kinetic-klingeln.jpg",
    n: "02",
    title: "„Klingeln.“",
    kind: "Kinetic Type",
    len: "18 s",
    text: "Riesige Schrift im Takt der Musik. Kurz, laut, gemacht für Instagram, TikTok und LinkedIn.",
  },
  {
    id: "onetake",
    src: "/glanzstueck-media/one-take-termin.mp4",
    poster: "/glanzstueck-media/one-take-termin.jpg",
    n: "03",
    title: "„Ein Termin reist“",
    kind: "One Take",
    len: "20 s",
    text: "Eine einzige Kamerafahrt: vom Handy der Kundin in den Salonkalender und hinaus durchs Schaufenster.",
  },
];

const SERVICES = [
  ["Story & Skript", "Kein Feature-Katalog: eine kleine Geschichte, in der sich Ihre Kunden wiedererkennen."],
  ["Typo & App-Screens", "Animierte Schrift und Ihre echte Oberfläche — groß, lesbar, auf den Punkt."],
  ["3D-Elemente", "Handys, Geräte und Objekte in 3D, wenn es dem Video Gewicht gibt."],
  ["Musik & Sound", "Lizenzierte Musik und Sounddesign, abgemischt für Website und Social Media."],
  ["Alle Formate", "16:9 für die Website, 9:16 für Reels und Shorts, 1:1 für den Feed."],
];

const STEPS = [
  ["Kurzes Gespräch", "Sie erzählen, was Ihr Produkt kann und für wen. Screenshots oder ein Testzugang genügen."],
  ["Storyboard & Entwurf", "Sie bekommen den Ablauf und eine erste Fassung zum Abstimmen — bevor viel Zeit fließt."],
  ["Feinschliff & Lieferung", "Eine Korrekturrunde inklusive, danach die fertigen Dateien in allen gewünschten Formaten."],
];

function Spark({ size = 18, color = C.coral }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0Z" fill={color} />
    </svg>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function WorkTile({ w, big, onOpen }: { w: (typeof WORK)[number]; big?: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const play = () => ref.current?.play().catch(() => {});
  const stop = () => {
    if (!ref.current) return;
    ref.current.pause();
    ref.current.currentTime = 0;
  };
  return (
    <Reveal>
      <button
        onClick={onOpen}
        onMouseEnter={play}
        onMouseLeave={stop}
        onFocus={play}
        onBlur={stop}
        className="group block w-full text-left"
        aria-label={`Video ${w.title} mit Ton abspielen`}
      >
        <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16 / 9", background: C.ink2 }}>
          <video
            ref={ref}
            src={w.src}
            poster={w.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span
            className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-transform duration-300 group-hover:scale-105"
            style={{ background: C.coral, color: C.ink }}
          >
            ▶ Mit Ton ansehen
          </span>
          <span
            className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: "rgba(15,15,13,.7)", color: C.paper }}
          >
            {w.len}
          </span>
        </div>
        <div className={`mt-5 flex gap-5 ${big ? "md:items-end md:justify-between" : ""} flex-col ${big ? "md:flex-row" : ""}`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: C.coral }}>
              {w.n} · {w.kind}
            </p>
            <h3 className="mt-1 text-3xl md:text-4xl" style={{ fontFamily: display, fontWeight: 800, letterSpacing: "-0.03em" }}>
              {w.title}
            </h3>
          </div>
          <p className={`text-base leading-relaxed ${big ? "md:max-w-md" : ""}`} style={{ color: "#5C5850" }}>
            {w.text}
          </p>
        </div>
      </button>
    </Reveal>
  );
}

export default function GlanzstueckMedia() {
  const reduce = useReducedMotion();
  const heroVideo = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (reduce === false) heroVideo.current?.play().catch(() => {});
  }, [reduce]);
  const [open, setOpen] = useState<(typeof WORK)[number] | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const ticker = ["Produktvideos", "Animierte Typografie", "App-Screens", "3D", "Sounddesign", "16:9 · 9:16 · 1:1", "Erklärvideos"];

  return (
    <MotionConfig reducedMotion="user">
    <div style={{ background: C.ink, color: C.paper }} className="min-h-screen w-full">
      <style>{`
        @keyframes gm-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .gm-marquee { animation: gm-marquee 28s linear infinite }
        @media (prefers-reduced-motion: reduce) { .gm-marquee { animation: none } }
      `}</style>

      {/* ── Top bar ─────────────────────────────────────────── */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/glanzstueck-media" className="flex items-center gap-2" aria-label="Glanzstück Media">
          <Spark />
          <span className="text-lg" style={{ fontFamily: display, fontWeight: 800, letterSpacing: "-0.02em" }}>
            Glanzstück Media
          </span>
        </Link>
        <a
          href={MAIL}
          className="rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
          style={{ border: `1px solid ${C.line}` }}
          onMouseEnter={(e) => ((e.currentTarget.style.background = C.paper), (e.currentTarget.style.color = C.ink))}
          onMouseLeave={(e) => ((e.currentTarget.style.background = "transparent"), (e.currentTarget.style.color = C.paper))}
        >
          Projekt anfragen
        </a>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 md:px-10 lg:grid-cols-12 lg:pt-16">
        <div className="lg:col-span-7">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: display, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.92 }}
            className="text-[13vw] sm:text-7xl lg:text-[104px]"
          >
            Produktvideos,
            <br />
            die man sofort
            <br />
            <span style={{ color: C.coral }}>versteht.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 max-w-xl text-lg leading-relaxed"
            style={{ color: C.muted }}
          >
            Kurze Videos für Software, Apps und Dienstleister: eine kleine Geschichte, Ihre echte Oberfläche,
            animierte Schrift und gutes Sounddesign. Für Website, Pitch und Social Media.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href={MAIL} className="rounded-full px-7 py-4 text-base font-bold transition-transform hover:scale-[1.03]" style={{ background: C.coral, color: C.ink }}>
              Projekt anfragen →
            </a>
            <a href="#arbeiten" className="rounded-full px-7 py-4 text-base font-semibold" style={{ border: `1px solid ${C.line}` }}>
              Beispiele ansehen
            </a>
          </motion.div>
        </div>
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: "16 / 9", boxShadow: "0 40px 80px rgba(0,0,0,.45)" }}>
            <video
              ref={heroVideo}
              src="/glanzstueck-media/hero-loop.mp4"
              poster="/glanzstueck-media/hero-loop.jpg"
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-3 text-xs" style={{ color: C.muted }}>
            Ausschnitt aus „Klingeln.“ — Beispielprojekt, fiktive Marke
          </p>
        </motion.div>
      </section>

      {/* ── Ticker ──────────────────────────────────────────── */}
      <div className="overflow-hidden py-5" style={{ background: C.coral, color: C.ink }} aria-hidden="true">
        <div className="gm-marquee flex w-max">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {ticker.map((t) => (
                <span key={t + k} className="flex items-center gap-6 px-6 text-2xl md:text-3xl" style={{ fontFamily: display, fontWeight: 800, letterSpacing: "-0.02em" }}>
                  {t}
                  <Spark size={20} color={C.ink} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Work ────────────────────────────────────────────── */}
      <section id="arbeiten" className="scroll-mt-4" style={{ background: C.paper, color: C.ink }}>
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <h2 className="text-5xl md:text-7xl" style={{ fontFamily: display, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95 }}>
              Ein Produkt.
              <br />
              <span style={{ color: C.coral }}>Drei Stile.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: "#5C5850" }}>
              Beispielprojekt für die fiktive Termin-App „buchbar“: dieselbe Botschaft, drei Herangehensweisen.
              Welcher Stil zu Ihrem Produkt passt, klären wir im ersten Gespräch.
            </p>
          </Reveal>
          <div className="mt-16">
            <WorkTile w={WORK[0]} big onOpen={() => setOpen(WORK[0])} />
          </div>
          <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-10">
            <WorkTile w={WORK[1]} onOpen={() => setOpen(WORK[1])} />
            <WorkTile w={WORK[2]} onOpen={() => setOpen(WORK[2])} />
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 className="text-5xl md:text-7xl" style={{ fontFamily: display, fontWeight: 800, letterSpacing: "-0.04em" }}>
            Was drin ist.
          </h2>
        </Reveal>
        <div className="mt-14">
          {SERVICES.map(([title, text], i) => (
            <Reveal key={title} delay={i * 0.05}>
              <div className="group grid items-baseline gap-2 py-7 md:grid-cols-12 md:gap-8" style={{ borderTop: `1px solid ${C.line}` }}>
                <span className="text-sm font-semibold md:col-span-1" style={{ color: C.coral }}>
                  0{i + 1}
                </span>
                <h3
                  className="text-3xl transition-colors md:col-span-5 md:text-5xl"
                  style={{ fontFamily: display, fontWeight: 800, letterSpacing: "-0.03em" }}
                >
                  {title}
                </h3>
                <p className="text-base leading-relaxed md:col-span-6 md:text-lg" style={{ color: C.muted }}>
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────── */}
      <section style={{ background: C.ink2 }}>
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <h2 className="text-5xl md:text-7xl" style={{ fontFamily: display, fontWeight: 800, letterSpacing: "-0.04em" }}>
              So läuft&apos;s.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            {STEPS.map(([title, text], i) => (
              <Reveal key={title} delay={i * 0.12}>
                <div>
                  <span className="block text-8xl" style={{ fontFamily: display, fontWeight: 800, color: C.coral, lineHeight: 1 }}>
                    {i + 1}
                  </span>
                  <h3 className="mt-6 text-2xl md:text-3xl" style={{ fontFamily: display, fontWeight: 800, letterSpacing: "-0.02em" }}>
                    {title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed" style={{ color: C.muted }}>
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section style={{ background: C.coral, color: C.ink }}>
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
          <Reveal>
            <h2 className="text-[14vw] md:text-[120px]" style={{ fontFamily: display, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.9 }}>
              Ihr Produkt.
              <br />
              Als Glanzstück.
            </h2>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <a href={MAIL} className="rounded-full px-8 py-5 text-lg font-bold transition-transform hover:scale-[1.03]" style={{ background: C.ink, color: C.paper }}>
                Projekt anfragen →
              </a>
              <a href={MAIL} className="text-lg font-semibold underline decoration-2 underline-offset-4">
                sascha.schumbera@mail.de
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-10" style={{ color: C.muted }}>
        <div className="flex items-center gap-2">
          <Spark size={14} />
          <span>© {new Date().getFullYear()} Glanzstück Media · ein Angebot von Sascha Schumbera</span>
        </div>
        <div className="flex gap-6">
          <Link href="/glanzstueck-media/impressum" className="hover:underline">Impressum</Link>
          <Link href="/glanzstueck-media/datenschutz" className="hover:underline">Datenschutz</Link>
        </div>
      </footer>

      {/* ── Lightbox ────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(10,10,8,.92)" }}
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Video ${open.title}`}
        >
          <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <video src={open.src} poster={open.poster} controls autoPlay playsInline className="w-full rounded-2xl" />
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm" style={{ color: C.muted }}>
                {open.title} · Beispielprojekt, fiktive Marke „buchbar“
              </p>
              <button onClick={() => setOpen(null)} className="rounded-full px-5 py-2 text-sm font-semibold" style={{ background: C.paper, color: C.ink }}>
                Schließen ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </MotionConfig>
  );
}
