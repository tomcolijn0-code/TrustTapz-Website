"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTEN } from "@/lib/productenData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Card ───────────────────────────────────────────────────────────── */

function ProductKaart({ product, index }: { product: typeof PRODUCTEN[number]; index: number }) {

  return (
    <motion.div
      className="group flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "#ffffff",
        border: "1.5px solid #bfdbfe",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.08 + index * 0.1 }}
      whileHover={{
        y: -6,
        boxShadow: "0 16px 40px rgba(37,99,235,0.14)",
        borderColor: "#2563eb",
        transition: { duration: 0.2 },
      }}
    >
      {/* Afbeelding */}
      <div
        className="w-full overflow-hidden"
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Image
          src={product.afbeelding}
          alt={product.naam}
          width={440}
          height={440}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-extrabold mb-1" style={{ color: "#111827" }}>
          {product.naam}
        </h3>
        <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
          Vanaf{" "}
          <span className="font-bold" style={{ color: "#1d4ed8" }}>
            {product.vanafPrijs}
          </span>
        </p>

        <Link
          href={`/producten/${product.slug}`}
          className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            color: "#fff",
            boxShadow: "0 3px 14px rgba(37,99,235,0.28)",
          }}
        >
          Bekijk product
          <ArrowRight size={15} strokeWidth={2.4} />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */

export default function ProductSelectie({
  koptitel = "Kies jouw NFC-product",
  extraPadding = false,
}: {
  koptitel?: string;
  extraPadding?: boolean;
}) {
  return (
    <section
      id="prijzen"
      className="px-6 sm:px-12"
      style={{
        background: "#ffffff",
        paddingTop: extraPadding ? "7rem" : "6rem",
        paddingBottom: "6rem",
      }}
    >
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
            Onze producten
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: "#111827", fontFamily: "var(--font-dm-sans)" }}
          >
            {koptitel.includes(" ") ? (
              <>
                {koptitel.split(" ").slice(0, -1).join(" ")}{" "}
                <span style={{ color: "#2563eb" }}>
                  {koptitel.split(" ").slice(-1)[0]}
                </span>
              </>
            ) : (
              <span style={{ color: "#2563eb" }}>{koptitel}</span>
            )}
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#6b7280" }}>
            Geprogrammeerd op jouw Google Review pagina. Eenmalige betaling.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {PRODUCTEN.map((product, i) => (
            <ProductKaart key={product.slug} product={product} index={i} />
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-sm font-medium"
          style={{ color: "#6b7280" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
        >
          {[
            "✓ Altijd gratis geprogrammeerd",
            "✓ Geen abonnement",
            "✓ Binnen 3 werkdagen geleverd",
            "✓ Werkt op elke smartphone",
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
