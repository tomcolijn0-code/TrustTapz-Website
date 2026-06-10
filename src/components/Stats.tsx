"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Stat {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  decimals?: number;
}

const stats: Stat[] = [
  {
    value: 97,
    suffix: "%",
    label: "leest reviews",
    sublabel:
      "van consumenten bekijkt online beoordelingen vóór een lokale aankoopbeslissing.",
  },
  {
    prefix: "+",
    value: 3,
    suffix: " posities",
    label: "hoger in Google",
    sublabel:
      "bedrijven met meer dan 20 recente reviews ranken gemiddeld 3 posities hoger in lokale zoekresultaten.",
  },
  {
    prefix: "+",
    value: 31,
    suffix: "%",
    label: "meer omzet",
    sublabel:
      "hogere omzet realiseren bedrijven met een uitstekende reviewscore ten opzichte van concurrenten.",
  },
];

function useCounter(target: number, decimals = 0, active: boolean) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 1600;

  useEffect(() => {
    if (!active) return;
    startRef.current = null;

    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / DURATION, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    }

    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [active, target, decimals]);

  return count;
}

function StatCard({ stat, index, inView }: { stat: Stat; index: number; inView: boolean }) {
  const count = useCounter(stat.value, stat.decimals, inView);
  const display = stat.decimals
    ? count.toFixed(stat.decimals)
    : Math.round(count).toString();

  return (
    <div
      className="flex flex-col items-center text-center px-8 py-10 rounded-3xl"
      style={{
        background: "#eff6ff",
        border: "1px solid #bfdbfe",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ${EASE.join(",")} ${0.1 + index * 0.15}s, transform 0.55s ${EASE.join(",")} ${0.1 + index * 0.15}s`,
      }}
    >
      {/* Big number */}
      <div
        className="text-6xl sm:text-7xl font-extrabold leading-none mb-3 tabular-nums"
        style={{
          background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        {stat.prefix ?? ""}{display}{stat.suffix}
      </div>

      <div
        className="text-lg font-bold mb-3"
        style={{ color: "#111827" }}
      >
        {stat.label}
      </div>
      <p
        className="text-sm leading-relaxed max-w-[220px]"
        style={{ color: "#6b7280" }}
      >
        {stat.sublabel}
      </p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 px-6 sm:px-12"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.55s ease, transform 0.55s ease`,
          }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              background: "#eff6ff",
              color: "#1d4ed8",
              border: "1px solid #bfdbfe",
            }}
          >
            Reviews in cijfers
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            style={{ color: "#111827", fontFamily: "var(--font-dm-sans)" }}
          >
            Waarom reviews{" "}
            <span style={{ color: "#2563eb" }}>niet wachten</span>
          </h2>
        </div>

        {/* Stat cards */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} inView={inView} />
          ))}
        </div>

        {/* Source footnote */}
        <p
          className="text-center text-xs mt-10"
          style={{ color: "#9ca3af" }}
        >
          Bronnen: BrightLocal Consumer Review Survey 2023 · Harvard Business Review · Moz Local Search Ranking Factors
        </p>
      </div>
    </section>
  );
}
