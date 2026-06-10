"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, Scissors, Smile, Activity, ShoppingBag, Wrench } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sectoren = [
  {
    icon: UtensilsCrossed,
    naam: "Horeca",
    reden:
      "93% van de gasten kiest een restaurant op basis van reviews. Eén slechte week online kost je tafels.",
  },
  {
    icon: Scissors,
    naam: "Kapsalons",
    reden:
      "Nieuwe klanten vertrouwen blindeling op recente ervaringen. Zonder reviews kiezen ze de salon verderop.",
  },
  {
    icon: Smile,
    naam: "Tandartsen",
    reden:
      "Patiënten kiezen hun tandarts vaker op reviews dan op afstand. Vertrouwen is alles in de zorg.",
  },
  {
    icon: Activity,
    naam: "Fysiotherapeuten",
    reden:
      "Een hoge reviewscore verhoogt doorverwijzingen van huisartsen én directe online aanmeldingen.",
  },
  {
    icon: ShoppingBag,
    naam: "Winkels",
    reden:
      "Lokale winkels met 4,5+ sterren trekken 70% meer bezoekers uit Google Maps dan onbeoordeelde winkels.",
  },
  {
    icon: Wrench,
    naam: "Loodgieters",
    reden:
      "Bij spoed kiest iemand razendsnel. De loodgieter met de meeste reviews wint, altijd.",
  },
];

export default function Sectoren() {
  return (
    <section className="bg-white py-24 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" }}
          >
            Voor elke sector
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: "#111827", fontFamily: "var(--font-dm-sans)" }}
          >
            Reviews zijn cruciaal{" "}
            <span style={{ color: "#2563eb" }}>in jouw branche</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#6b7280" }}>
            Ongeacht je sector, klanten zoeken online bevestiging voordat ze jou bellen of binnenlopen.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectoren.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.naam}
                className="group relative flex flex-col gap-4 p-6 rounded-2xl cursor-default"
                style={{
                  border: "1.5px solid #bfdbfe",
                  background: "#ffffff",
                }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.08 }}
                whileHover={{
                  y: -6,
                  borderColor: "#2563eb",
                  backgroundColor: "#eff6ff",
                  boxShadow: "0 16px 40px rgba(37,99,235,0.12)",
                  transition: { duration: 0.2 },
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    boxShadow: "0 4px 16px rgba(37,99,235,0.25)",
                  }}
                >
                  <Icon size={22} color="white" strokeWidth={1.8} />
                </div>

                {/* Text */}
                <div>
                  <h3
                    className="text-lg font-extrabold mb-2"
                    style={{ color: "#111827" }}
                  >
                    {sector.naam}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                    {sector.reden}
                  </p>
                </div>

                {/* Subtle corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at top right, rgba(37,99,235,0.08), transparent 70%)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="text-base mb-6" style={{ color: "#6b7280" }}>
            Staat jouw sector er niet bij?{" "}
            <a href="/contact" className="font-semibold underline underline-offset-2" style={{ color: "#2563eb" }}>
              Neem contact op
            </a>{" "}
            TrustTapz werkt voor elk lokaal bedrijf.
          </p>
          <a
            href="/bestellen"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-xl font-extrabold text-base text-white transition-all hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
            }}
          >
            Bestel jouw TrustTapz-kaart
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10h12M12 4l6 6-6 6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
