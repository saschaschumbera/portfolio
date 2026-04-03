export default function Footer() {
  return (
    <footer className="py-6 px-6" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs" style={{ color: "var(--text-3)" }}>
          © {new Date().getFullYear()} Sascha Schumbera
        </p>
        <p className="text-xs" style={{ color: "var(--text-3)" }}>
          Built with Next.js · Framer Motion · Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
