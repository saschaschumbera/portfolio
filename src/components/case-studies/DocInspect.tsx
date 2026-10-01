"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { caseStudyDocinspect } from "@/lib/caseStudyDocinspectTranslations";

const SHOT_SIZE: Record<string, { width: number; height: number }> = {
  "/case-studies/docinspect-report.png": { width: 1744, height: 1630 },
  "/case-studies/docinspect-employer.png": { width: 1744, height: 1086 },
  "/case-studies/docinspect-redacted.png": { width: 1596, height: 940 },
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--text-3)" }}>
      {children}
    </p>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pt-10 mt-16" style={{ borderTop: "1px solid var(--border)" }}>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6" style={{ color: "var(--text-1)" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DocInspectCaseStudy() {
  const { lang } = useLang();
  const tx = caseStudyDocinspect[lang];

  return (
    <article className="px-6 pt-28 pb-24">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm mb-12 transition-colors text-[var(--text-3)] hover:text-[var(--text-1)]"
        >
          <ArrowLeft size={14} />
          {tx.back}
        </Link>

        {/* Hero */}
        <Label>{tx.hero.tag}</Label>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2" style={{ color: "var(--text-1)" }}>
          {tx.hero.title}
        </h1>
        <p className="text-lg mb-6" style={{ color: "var(--accent)" }}>{tx.hero.subtitle}</p>
        <p className="text-base md:text-lg leading-relaxed max-w-3xl mb-6" style={{ color: "var(--text-2)" }}>
          {tx.hero.pitch}
        </p>
        <p className="text-xs font-mono mb-2" style={{ color: "var(--text-3)" }}>{tx.hero.tags.join(" · ")}</p>
        <p className="text-xs" style={{ color: "var(--text-3)" }}>{tx.repoNote}</p>

        {/* Kennzahlen */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {tx.metrics.map((m) => (
            <div key={m.label} className="pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-2xl md:text-3xl font-semibold tracking-tight mb-1" style={{ color: "var(--text-1)" }}>
                {m.value}
              </p>
              <p className="text-xs leading-snug" style={{ color: "var(--text-3)" }}>{m.label}</p>
            </div>
          ))}
        </div>

        {/* Screenshots */}
        <div className="space-y-10 mt-16">
          {tx.screenshots.map((s) => (
            <figure key={s.src}>
              <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <Image src={s.src} alt={s.caption} {...SHOT_SIZE[s.src]} sizes="(min-width: 896px) 896px, 100vw"
                       className="w-full h-auto" />
              </div>
              <figcaption className="text-sm leading-relaxed mt-3" style={{ color: "var(--text-3)" }}>
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <Section title={tx.problem.title}>
          <div className="space-y-4 text-base leading-relaxed max-w-3xl" style={{ color: "var(--text-2)" }}>
            {tx.problem.content.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
        </Section>

        <Section title={tx.principle.title}>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
            {tx.principle.items.map((item) => (
              <div key={item.title}>
                <h3 className="text-base font-semibold mb-1" style={{ color: "var(--text-1)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{item.content}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={tx.pipeline.title}>
          <ol className="space-y-3">
            {tx.pipeline.steps.map((step, i) => (
              <li key={step} className="grid grid-cols-[2rem_1fr] text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                <span className="font-mono" style={{ color: "var(--text-3)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section title={tx.forensics.title}>
          <p className="text-base leading-relaxed max-w-3xl mb-12" style={{ color: "var(--text-2)" }}>
            {tx.forensics.intro}
          </p>
          <div className="space-y-14">
            {tx.forensics.signals.map((signal) => (
              <div key={signal.title}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-1)" }}>{signal.title}</h3>
                <dl className="grid md:grid-cols-3 gap-x-8 gap-y-4 mb-5">
                  {(["forger", "trace", "how"] as const).map((key) => (
                    <div key={key} className="pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                      <dt className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-3)" }}>
                        {tx.forensics.labels[key]}
                      </dt>
                      <dd className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{signal[key]}</dd>
                    </div>
                  ))}
                </dl>
                {signal.images.length > 0 && (
                  <figure>
                    <div className={`grid gap-4 ${signal.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
                      {signal.images.map((img) => (
                        <div key={img.src}>
                          {img.label && (
                            <p className="text-xs font-mono mb-1.5" style={{ color: "var(--text-3)" }}>{img.label}</p>
                          )}
                          <div className="rounded-md overflow-hidden" style={{ border: "1px solid var(--border)", maxWidth: img.width }}>
                            <Image src={img.src} alt={signal.caption} width={img.width} height={img.height}
                                   className="w-full h-auto" style={{ imageRendering: "auto" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <figcaption className="text-sm leading-relaxed mt-3 max-w-3xl" style={{ color: "var(--text-3)" }}>
                      {signal.caption}
                    </figcaption>
                  </figure>
                )}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-16 mb-4" style={{ color: "var(--text-1)" }}>{tx.forensics.tableTitle}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {tx.forensics.tableHead.map((h, i) => (
                    <th key={h} className={`py-2 font-mono text-xs uppercase tracking-widest font-normal ${i ? "text-right pl-4" : "text-left"}`}
                        style={{ color: "var(--text-3)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tx.forensics.tableRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td key={i} className={`py-3 ${i ? "text-right pl-4 whitespace-nowrap font-semibold" : ""}`}
                          style={{ color: i ? "var(--text-1)" : "var(--text-2)", borderBottom: "1px solid var(--border)" }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-12 mb-4" style={{ color: "var(--text-1)" }}>{tx.forensics.limitsTitle}</h3>
          <ul className="space-y-3 max-w-3xl">
            {tx.forensics.limits.map((item) => (
              <li key={item.slice(0, 24)} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                <span aria-hidden="true" style={{ color: "var(--text-3)" }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={tx.deepDives.title}>
          <div className="space-y-10">
            {tx.deepDives.items.map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-1)" }}>{item.title}</h3>
                <p className="text-base leading-relaxed max-w-3xl" style={{ color: "var(--text-2)" }}>{item.content}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={tx.evals.title}>
          <ul style={{ borderBottom: "1px solid var(--border)" }}>
            {tx.evals.rows.map((row) => (
              <li key={row.label} className="grid md:grid-cols-12 gap-x-6 gap-y-1 py-5" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="md:col-span-4">
                  <p className="text-base font-semibold" style={{ color: "var(--text-1)" }}>{row.label}</p>
                  <p className="text-xs" style={{ color: "var(--text-3)" }}>{row.detail}</p>
                </div>
                <p className="md:col-span-8 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{row.result}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={tx.limits.title}>
          <ul className="space-y-3 max-w-3xl">
            {tx.limits.items.map((item) => (
              <li key={item.slice(0, 24)} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                <span aria-hidden="true" style={{ color: "var(--text-3)" }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </article>
  );
}
