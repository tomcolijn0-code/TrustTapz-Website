"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Search, Sparkles, BadgeCheck } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const benefits = [
  {
    icon: TrendingUp,
    title: "Meer reviews",
    description:
      "Zo laag mogelijke drempel = meer beoordelingen. Klanten doen het direct, niet 'later'.",
  },
  {
    icon: Search,
    title: "Betere SEO",
    description:
      "Google beloont bedrijven met veel recente reviews met een hogere lokale ranking.",
  },
  {
    icon: Sparkles,
    title: "Professionele uitstraling",
    description:
      "Moderne NFC‑technologie wekt vertrouwen en laat zien dat jij vooruitdenkt.",
  },
  {
    icon: BadgeCheck,
    title: "Eenmalige betaling",
    description:
      "Geen abonnement, geen verborgen kosten. Betaal één keer en profiteer voor altijd.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0 },
};

export default function Voordelen() {
  const benefitsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(benefitsRef, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-6 sm:px-12" style={{ background: "#eff6ff" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: "#ffffff", color: "#1d4ed8", border: "1px solid #bfdbfe" }}
          >
            Voordelen voor de ondernemer
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: "#111827", fontFamily: "var(--font-dm-sans)" }}
          >
            Waarom kiezen voor{" "}
            <span style={{ color: "#2563eb" }}>TrustTapz?</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#6b7280" }}>
            Eén slim kaartje dat dag in dag uit voor jou werkt.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div ref={benefitsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                className="flex gap-4 p-6 rounded-2xl"
                style={{ background: "#ffffff", border: "1px solid #bfdbfe" }}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.12 }}
                whileHover={{ y: -4, boxShadow: "0 12px 36px rgba(37,99,235,0.12)", transition: { duration: 0.2 } }}
              >
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
                >
                  <Icon size={20} color="white" strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="font-extrabold text-base mb-1" style={{ color: "#111827" }}>
                    {b.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                    {b.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <a
            href="/producten"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-xl font-extrabold text-base text-white transition-all hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(37,99,235,0.35)] active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
            }}
          >
            Nu bestellen
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10h12M12 4l6 6-6 6" />
            </svg>
          </a>
          <p className="mt-4 text-sm" style={{ color: "#6b7280" }}>
            Eenmalige betaling · Gratis verzending · Binnen 3 dagen in huis
          </p>
        </motion.div>

      </div>
    </section>
  );
}
