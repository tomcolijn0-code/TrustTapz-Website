"use client";

import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
import { useRef } from "react";
import { Smartphone, Globe, Star } from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const steps = [
  {
    number: "01",
    icon: Smartphone,
    title: "Klant tikt",
    description:
      "De klant houdt zijn telefoon tegen jouw TrustTapz‑kaart. Geen app nodig, elke moderne smartphone werkt.",
  },
  {
    number: "02",
    icon: Globe,
    title: "Pagina opent direct",
    description:
      "De Google Review‑pagina van jouw bedrijf opent automatisch. Geen zoeken, geen klikken, geen omwegen.",
  },
  {
    number: "03",
    icon: Star,
    title: "Review geplaatst",
    description:
      "De klant laat zijn beoordeling achter. Eén tik is alles wat nodig was om van tevreden klant naar publiek ambassadeur te gaan.",
  },
];

/* ─── Animation helpers ─────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0 },
};

function AnimatedStep({
  step,
  index,
  inView,
}: {
  step: (typeof steps)[0];
  index: number;
  inView: boolean;
}) {
  const Icon = step.icon;
  const isLast = index === steps.length - 1;

  return (
    <motion.div
      className="relative flex flex-col items-center text-center"
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ duration: 0.55, ease: EASE, delay: 0.1 + index * 0.15 }}
    >
      {/* Connector line (between steps) */}
      {!isLast && (
        <motion.div
          className="hidden lg:block absolute top-10 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px"
          style={{ background: "linear-gradient(90deg, #bfdbfe 0%, #bfdbfe 100%)" }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 + index * 0.15 }}
        />
      )}

      {/* Icon circle */}
      <div
        className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          boxShadow: "0 8px 32px rgba(37,99,235,0.3)",
        }}
      >
        <Icon size={30} color="white" strokeWidth={1.8} />
        {/* Step number badge */}
        <span
          className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full text-[10px] font-extrabold flex items-center justify-center"
          style={{ background: "#0a0f1e", color: "#2563eb", border: "1.5px solid #2563eb" }}
        >
          {index + 1}
        </span>
      </div>

      <h3 className="text-xl font-extrabold mb-3" style={{ color: "#111827" }}>
        {step.title}
      </h3>
      <p className="text-[15px] leading-relaxed max-w-[220px]" style={{ color: "#6b7280" }}>
        {step.description}
      </p>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────── */

export default function HoeHetWerkt() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" });

  return (
    <section id="hoe-het-werkt" className="py-24 px-6 sm:px-12" style={{ background: "#eff6ff" }}>
      <div className="max-w-5xl mx-auto">

        {/* ── Stappen ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: "#ffffff", color: "#1d4ed8", border: "1px solid #bfdbfe" }}
          >
            Hoe het werkt
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: "#111827" }}
          >
            Drie stappen.{" "}
            <span style={{ color: "#2563eb" }}>Één tik.</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#6b7280" }}>
            Voor de klant is het zo eenvoudig als het maar kan en voor jou levert het elke dag nieuwe reviews op.
          </p>
        </motion.div>

        <div ref={stepsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-6">
          {steps.map((step, i) => (
            <AnimatedStep key={step.number} step={step} index={i} inView={stepsInView} />
          ))}
        </div>

      </div>
    </section>
  );
}
