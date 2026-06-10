"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Product {
  naam: string;
  prijs: string;
  per?: string;
  features: string[];
  badge?: string;
  cta: string;
  ctaHref: string;
  highlight?: boolean;
  enterprise?: boolean;
}

const PRODUCTEN: Product[] = [
  {
    naam: "Starter Kaart",
    prijs: "€19,95",
    features: [
      "1 NFC-kaart",
      "Geprogrammeerd op jouw Google Review pagina",
      "Werkt op elke smartphone",
      "Geen app nodig",
    ],
    cta: "Bestellen",
    ctaHref: "/bestellen",
  },
  {
    naam: "Duo Pack",
    prijs: "€34,95",
    features: [
      "2 NFC-kaarten",
      "Ideaal voor meerdere locaties in je zaak",
      "Geprogrammeerd op jouw Google Review pagina",
      "Geen app nodig",
    ],
    cta: "Bestellen",
    ctaHref: "/bestellen",
  },
  {
    naam: "Team Pack",
    prijs: "€79,00",
    features: [
      "5 NFC-kaarten",
      "Gratis verzending",
      "Geprogrammeerd op jouw Google Review pagina",
      "Geen app nodig",
    ],
    cta: "Bestellen",
    ctaHref: "/bestellen",
  },
  {
    naam: "Business Pack",
    prijs: "€139,00",
    badge: "Meest gekozen",
    highlight: true,
    features: [
      "10 NFC-kaarten",
      "Gratis verzending",
      "Prioriteit support",
      "Geprogrammeerd op jouw Google Review pagina",
    ],
    cta: "Bestellen",
    ctaHref: "/bestellen",
  },
  {
    naam: "Pro Pack",
    prijs: "€229,00",
    features: [
      "20 NFC-kaarten",
      "Gratis verzending",
      "Prioriteit support",
      "Branded kaarten met jouw huisstijl",
    ],
    cta: "Bestellen",
    ctaHref: "/bestellen",
  },
  {
    naam: "Enterprise",
    prijs: "Op aanvraag",
    enterprise: true,
    features: [
      "25+ NFC-kaarten",
      "Volledig op maat",
      "Eigen huisstijl op de kaarten",
      "Dedicated accountmanager",
    ],
    cta: "Neem contact op",
    ctaHref: "/contact",
  },
];

function ProductKaart({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      className="relative flex flex-col rounded-2xl p-6"
      style={{
        background: product.highlight ? "#eff6ff" : "#ffffff",
        border: product.highlight ? "2px solid #2563eb" : "1.5px solid #bfdbfe",
        boxShadow: product.highlight
          ? "0 8px 32px rgba(37,99,235,0.15)"
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.05 + index * 0.08 }}
      whileHover={{
        y: -5,
        boxShadow: product.highlight
          ? "0 16px 48px rgba(37,99,235,0.2)"
          : "0 12px 36px rgba(37,99,235,0.12)",
        transition: { duration: 0.2 },
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              boxShadow: "0 2px 12px rgba(37,99,235,0.35)",
            }}
          >
            <Sparkles size={11} strokeWidth={2.2} />
            {product.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-5 mt-1">
        <h3
          className="text-lg font-extrabold mb-3"
          style={{ color: "#111827" }}
        >
          {product.naam}
        </h3>

        {/* Price */}
        {product.enterprise ? (
          <div
            className="text-2xl font-extrabold"
            style={{ color: "#1d4ed8" }}
          >
            Op aanvraag
          </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span
              className="text-4xl font-extrabold tabular-nums"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {product.prijs}
            </span>
            <span className="text-sm font-medium" style={{ color: "#9ca3af" }}>
              eenmalig
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div
        className="mb-5"
        style={{ height: 1, background: product.highlight ? "#bfdbfe" : "#e5e7eb" }}
      />

      {/* Features */}
      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check
              size={15}
              className="flex-shrink-0 mt-0.5"
              style={{ color: "#2563eb" }}
              strokeWidth={2.5}
            />
            <span className="text-sm leading-snug" style={{ color: "#374151" }}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={product.ctaHref}
        className="block w-full text-center py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
        style={
          product.highlight || product.enterprise
            ? {
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                color: "#fff",
                boxShadow: "0 3px 16px rgba(37,99,235,0.3)",
              }
            : {
                background: "#eff6ff",
                color: "#1d4ed8",
                border: "1.5px solid #bfdbfe",
              }
        }
      >
        {product.cta}
      </Link>
    </motion.div>
  );
}

export default function Producten() {
  return (
    <section id="prijzen" className="bg-white py-24 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">

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
            Kies jouw pakket
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: "#111827", fontFamily: "var(--font-dm-sans)" }}
          >
            Eenvoudig starten,{" "}
            <span style={{ color: "#2563eb" }}>direct resultaat</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#6b7280" }}>
            Eenmalige betaling. Geen abonnement. Altijd gratis geprogrammeerd.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {PRODUCTEN.map((product, i) => (
            <ProductKaart key={product.naam} product={product} index={i} />
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-sm font-medium"
          style={{ color: "#6b7280" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
        >
          {[
            "✓ Altijd gratis geprogrammeerd",
            "✓ Geen abonnement",
            "✓ Gratis verzending vanaf Team Pack",
            "✓ Binnen 3 werkdagen geleverd",
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
