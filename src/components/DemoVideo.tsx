"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Volume2 } from "lucide-react";

// Stummes Demo-Video in der Projektübersicht: lädt erst, wenn es ins Bild scrollt, läuft dann in Schleife
// und pausiert außerhalb. Kein Autoplay bei „Bewegung reduzieren“ oder Datensparmodus — dann nur das Standbild.
export default function DemoVideo({
  src,
  poster,
  label,
  onWatchWithSound,
}: {
  src: string;
  poster: string;
  label: string;
  onWatchWithSound: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    setAutoplay(!reduced && !saveData);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !autoplay) return;
    if (inView) {
      if (!video.src) video.src = src;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, autoplay, src]);

  // Sprache gewechselt: laufendes Video auf die andere Fassung umstellen
  useEffect(() => {
    const video = ref.current;
    if (video?.src && !video.src.endsWith(src)) {
      video.src = src;
      if (inView && autoplay) video.play().catch(() => {});
    }
  }, [src, inView, autoplay]);

  return (
    <div className="relative rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)", background: "#0a0a0f" }}>
      <video
        ref={ref}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        className="block w-full aspect-video"
      />
      <button
        type="button"
        onClick={onWatchWithSound}
        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm transition-opacity hover:opacity-85"
        style={{ background: "rgba(0,0,0,0.6)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
      >
        <Volume2 size={13} />
        {label}
      </button>
    </div>
  );
}
