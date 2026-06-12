import { ImageResponse } from "next/og";

export const alt = "Sascha Schumbera — AI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
          backgroundImage:
            "radial-gradient(circle at 25% 35%, rgba(99,102,241,0.25), transparent 45%), radial-gradient(circle at 75% 65%, rgba(167,139,250,0.18), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 28px",
            borderRadius: 999,
            border: "1px solid rgba(99,102,241,0.4)",
            background: "rgba(99,102,241,0.12)",
            color: "#a5b4fc",
            fontSize: 26,
            marginBottom: 44,
          }}
        >
          AI &amp; Automatisierung im Finanzkontext
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#e2e8f0",
            letterSpacing: -2,
          }}
        >
          Sascha&nbsp;
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #6366f1, #a78bfa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Schumbera
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#94a3b8",
            marginTop: 24,
          }}
        >
          AI-orientierter Softwareentwickler · 10+ Jahre Finance
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#6366f1",
            marginTop: 56,
          }}
        >
          sascha-schumbera.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
