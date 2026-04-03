import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-6 px-6" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs" style={{ color: "var(--text-3)" }}>
          © {new Date().getFullYear()} Sascha Schumbera
        </p>
        <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-3)" }}>
          <p>Built with Next.js · Framer Motion · Tailwind CSS</p>
          <Link href="/impressum" className="hover:opacity-80 transition-opacity underline underline-offset-4">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:opacity-80 transition-opacity underline underline-offset-4">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}
