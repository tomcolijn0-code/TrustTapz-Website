"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Product, KleurVariant, formatPrijs } from "@/lib/productenData";
import { useCart } from "@/context/CartContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Pricing table ──────────────────────────────────────────────────── */

// Welke tier-index krijgt het "Meest gekozen" label per product
const MEEST_GEKOZEN: Record<string, number> = {
  "nfc-kaart":     2, // 5 stuks
  "nfc-standaard": 1, // 3 stuks
  "nfc-sticker":   2, // 100 stuks
};

// Label van de offerte-rij onderaan de tabel
const OFFERTE_LABEL: Record<string, string> = {
  "nfc-kaart":     "20+",
  "nfc-standaard": "20+",
  "nfc-sticker":   "200+",
};

// Producten die de tabel-UI gebruiken (ipv losse knoppen)
const TABEL_SLUGS = ["nfc-kaart", "nfc-standaard", "nfc-sticker"];

interface KaartPrijsTabelProps {
  tiers: { aantal: number; prijs: number; besparing?: number }[];
  selectedIndex: number;
  onSelect: (i: number) => void;
  meestGekozenIndex: number;
  offerteLabel: string;
}

function KaartPrijsTabel({ tiers, selectedIndex, onSelect, meestGekozenIndex, offerteLabel }: KaartPrijsTabelProps) {
  const basisPrijsPerStuk = tiers[0].prijs;

  return (
    <div className="w-full overflow-x-auto rounded-2xl" style={{ border: "1.5px solid #bfdbfe" }}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: "#eff6ff", borderBottom: "1px solid #bfdbfe" }}>
            {["Aantal", "Totaal", "Besparing"].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-semibold"
                style={{ color: "#374151", fontSize: 12, letterSpacing: "0.03em", whiteSpace: "nowrap" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, i) => {
            const referentie = basisPrijsPerStuk * tier.aantal;
            const besparing = tier.besparing !== undefined
              ? tier.besparing
              : i === 0 ? 0 : referentie - tier.prijs;
            const isMeestGekozen = i === meestGekozenIndex;
            const isActive = i === selectedIndex;

            return (
              <tr
                key={tier.aantal}
                onClick={() => onSelect(i)}
                className="cursor-pointer transition-all"
                style={{
                  background: isMeestGekozen ? "#eff6ff" : isActive ? "#f8fafc" : "#ffffff",
                  outline: isActive ? "1.5px solid #2563eb" : undefined,
                  borderBottom: "1px solid #f1f5f9",
                  position: "relative",
                }}
              >
                {/* Aantal */}
                <td className="px-4 py-3.5" style={{ whiteSpace: "nowrap" }}>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all"
                      style={{
                        borderColor: isActive ? "#2563eb" : "#d1d5db",
                        background: isActive ? "#2563eb" : "transparent",
                        boxShadow: isActive ? "0 0 0 3px rgba(37,99,235,0.15)" : "none",
                      }}
                    />
                    <span className="font-semibold" style={{ color: "#111827" }}>
                      {tier.aantal} {tier.aantal === 1 ? "stuk" : "stuks"}
                    </span>
                    {isMeestGekozen && (
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: "#2563eb", color: "#ffffff" }}
                      >
                        Meest gekozen
                      </span>
                    )}
                  </div>
                </td>

                {/* Totaal */}
                <td className="px-4 py-3.5 font-bold" style={{ color: "#111827", whiteSpace: "nowrap" }}>
                  {formatPrijs(tier.prijs)}
                </td>

                {/* Besparing */}
                <td className="px-4 py-3.5" style={{ whiteSpace: "nowrap" }}>
                  {besparing > 0 ? (
                    <span className="font-semibold" style={{ color: "#16a34a" }}>
                      -{formatPrijs(besparing)}
                    </span>
                  ) : (
                    <span style={{ color: "#9ca3af" }}>—</span>
                  )}
                </td>

              </tr>
            );
          })}
          {/* Offerte rij */}
          <tr style={{ background: "#eff6ff", borderTop: "1px solid #bfdbfe" }}>
            <td className="px-4 py-3.5">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: "#d1d5db" }} />
                <span className="font-semibold" style={{ color: "#111827" }}>{offerteLabel}</span>
              </div>
            </td>
            <td className="px-4 py-3.5" colSpan={2}>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
                style={{ color: "#2563eb" }}
              >
                Neem contact op voor een offerte op maat
                <ArrowRight size={13} strokeWidth={2.4} />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ─── Swipeable galerij ──────────────────────────────────────────────── */

interface GalerijProps {
  images: string[];
  productNaam: string;
}

function ProductGalerij({ images, productNaam }: GalerijProps) {
  const [index, setIndex] = useState(0);
  const [dir, setDir]     = useState(0);

  const total = images.length;
  const showControls = total > 1;

  function goTo(newIndex: number, newDir?: number) {
    const d = newDir ?? (newIndex > index ? 1 : -1);
    setDir(d);
    setIndex(newIndex);
  }
  function prev() { goTo((index - 1 + total) % total, -1); }
  function next() { goTo((index + 1) % total,         1); }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -50) next();
    else if (info.offset.x > 50) prev();
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center:              { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="flex flex-col gap-3">

      {/* ── Hoofdfoto ───────────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ background: "#ffffff", border: "1px solid #e5e7eb" }}
      >
        {/* Slide area */}
        <div className="overflow-hidden" style={{ touchAction: "pan-y" }}>
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.div
              key={index}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: EASE }}
              drag={showControls ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              style={{ cursor: showControls ? "grab" : "default" }}
              whileDrag={{ cursor: "grabbing" }}
            >
              <Image
                src={images[index]}
                alt={`${productNaam} — foto ${index + 1}`}
                width={800}
                height={800}
                className="w-full h-auto object-contain select-none"
                priority={index === 0}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pijltjes (desktop) */}
        {showControls && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-10"
              style={{
                background: "rgba(255,255,255,0.92)",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              aria-label="Vorige foto"
            >
              <ChevronLeft size={16} strokeWidth={2.5} style={{ color: "#374151" }} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-10"
              style={{
                background: "rgba(255,255,255,0.92)",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              aria-label="Volgende foto"
            >
              <ChevronRight size={16} strokeWidth={2.5} style={{ color: "#374151" }} />
            </button>
          </>
        )}

        {/* Teller (1/5) */}
        {showControls && (
          <div
            className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold tabular-nums pointer-events-none"
            style={{
              background: "rgba(0,0,0,0.42)",
              color: "#ffffff",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          >
            {index + 1}/{total}
          </div>
        )}
      </div>

      {/* ── Thumbnails ──────────────────────────────────────────────── */}
      {showControls && (
        <div className="flex gap-2.5 flex-wrap">
          {images.map((src, i) => {
            const isActive = i === index;
            return (
              <button
                key={src}
                onClick={() => goTo(i)}
                className="rounded-xl overflow-hidden transition-all hover:opacity-80 flex-shrink-0"
                style={{
                  width: 72,
                  height: 72,
                  background: "#ffffff",
                  border: isActive ? "2px solid #2563eb" : "2px solid #e5e7eb",
                  padding: 4,
                  boxShadow: isActive ? "0 0 0 2px rgba(37,99,235,0.18)" : "none",
                }}
                aria-label={`Foto ${i + 1} van ${productNaam}`}
              >
                <Image
                  src={src}
                  alt={`${productNaam} foto ${i + 1}`}
                  width={144}
                  height={144}
                  className="w-full h-full object-contain"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Props ──────────────────────────────────────────────────────────── */

interface Props {
  product: Product;
  otherProducts: Product[];
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function ProductDetail({ product, otherProducts }: Props) {
  const usesTabel = TABEL_SLUGS.includes(product.slug);
  const meestGekozenIndex = MEEST_GEKOZEN[product.slug] ?? 0;

  // Kleur-switcher
  const heeftKleuren = !!product.kleurVarianten?.length;
  const [selectedKleur, setSelectedKleur] = useState<string>(
    product.kleurVarianten?.[0]?.kleur ?? ""
  );
  const activeVariant: KleurVariant | undefined = product.kleurVarianten?.find(
    (v) => v.kleur === selectedKleur
  );
  const allImages = activeVariant
    ? [activeVariant.afbeelding, ...activeVariant.galerij]
    : [product.afbeelding, ...product.galerij];

  function handleKleurChange(variant: KleurVariant) {
    setSelectedKleur(variant.kleur);
    // ProductGalerij reset via key={allImages[0]}
  }

  const [selectedTierIndex, setSelectedTierIndex] = useState(
    usesTabel ? meestGekozenIndex : 0
  );
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const tier = product.prijsTiers[selectedTierIndex];

  function handleAddToCart() {
    addItem({
      slug:    product.slug,
      naam:    product.naam,
      aantal:  tier.aantal,
      prijs:   tier.prijs,
      ...(heeftKleuren && selectedKleur ? { variant: selectedKleur } : {}),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-white pt-28 pb-20 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">

          {/* Back link */}
          <Link
            href="/producten"
            className="inline-flex items-center gap-1.5 text-sm font-semibold mb-10 transition-opacity hover:opacity-70"
            style={{ color: "#6b7280" }}
          >
            <ArrowLeft size={15} strokeWidth={2.4} />
            Terug naar producten
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Image + galerij */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {/* key=allImages[0] → herstart galerij automatisch bij kleurwissel */}
              <ProductGalerij
                key={allImages[0]}
                images={allImages}
                productNaam={product.naam}
              />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                style={{ background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" }}
              >
                NFC-product
              </span>

              <h1
                className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
                style={{ color: "#111827", fontFamily: "var(--font-dm-sans)" }}
              >
                {product.naam}
              </h1>

              <p className="text-base leading-relaxed mb-8" style={{ color: "#6b7280" }}>
                {product.beschrijving}
              </p>

              {/* ── Kleur-switcher ────────────────────────────────────── */}
              {heeftKleuren && product.kleurVarianten && (
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-3" style={{ color: "#374151" }}>
                    Kleur
                  </p>
                  <div className="flex gap-2">
                    {product.kleurVarianten.map((v) => {
                      const isActive = v.kleur === selectedKleur;
                      return (
                        <button
                          key={v.kleur}
                          onClick={() => handleKleurChange(v)}
                          className="px-5 py-2 rounded-xl text-sm font-bold transition-all hover:scale-[1.03] active:scale-[0.97]"
                          style={
                            isActive
                              ? {
                                  background: "#2563eb",
                                  color: "#ffffff",
                                  boxShadow: "0 3px 12px rgba(37,99,235,0.28)",
                                }
                              : {
                                  background: "#f9fafb",
                                  color: "#374151",
                                  border: "1.5px solid #e5e7eb",
                                }
                          }
                        >
                          {v.kleur}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Tabel-producten: pricing table ───────────────────── */}
              {usesTabel ? (
                <>
                  <p className="text-sm font-semibold mb-3" style={{ color: "#374151" }}>
                    Selecteer hoeveelheid
                  </p>
                  <KaartPrijsTabel
                    tiers={product.prijsTiers}
                    selectedIndex={selectedTierIndex}
                    onSelect={setSelectedTierIndex}
                    meestGekozenIndex={meestGekozenIndex}
                    offerteLabel={OFFERTE_LABEL[product.slug] ?? "20+"}
                  />

                  {/* Selected price summary */}
                  <div
                    className="flex items-center justify-between rounded-xl px-5 py-3.5 mt-4 mb-5"
                    style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
                  >
                    <span className="text-sm font-medium" style={{ color: "#6b7280" }}>
                      {tier.aantal} {tier.aantal === 1 ? "stuk" : "stuks"}, eenmalige betaling
                    </span>
                    <span
                      className="text-2xl font-extrabold tabular-nums"
                      style={{
                        background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {formatPrijs(tier.prijs)}
                    </span>
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: added
                        ? "linear-gradient(135deg, #1d4ed8 0%, #15803d 100%)"
                        : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                      boxShadow: "0 4px 20px rgba(37,99,235,0.32)",
                      transition: "background 0.3s ease",
                    }}
                  >
                    {added ? (
                      <><Check size={17} strokeWidth={2.5} />Toegevoegd aan winkelmandje!</>
                    ) : (
                      <><ShoppingCart size={17} strokeWidth={2} />Voeg toe aan winkelmandje</>
                    )}
                  </button>

                  {/* Trust badges + disclaimer */}
                  <div className="flex flex-wrap gap-4 mt-5 text-xs font-medium" style={{ color: "#9ca3af" }}>
                    {["✓ Altijd gratis geprogrammeerd", "✓ Geen abonnement", "✓ Binnen 3 werkdagen"].map(b => (
                      <span key={b}>{b}</span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed" style={{ color: "#9ca3af" }}>
                    Alle prijzen excl. BTW. Eenmalige aanschaf, geen abonnement. Verzending gratis vanaf €30.
                  </p>
                </>
              ) : (
                /* ── Overige producten: standaard tier selector ───────── */
                <>
                  <div className="mb-6">
                    <p className="text-sm font-semibold mb-3" style={{ color: "#374151" }}>
                      Kies hoeveelheid
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {product.prijsTiers.map((t, i) => {
                        const active = i === selectedTierIndex;
                        return (
                          <button
                            key={t.aantal}
                            onClick={() => setSelectedTierIndex(i)}
                            className="flex flex-col items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.03]"
                            style={
                              active
                                ? {
                                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                    color: "#ffffff",
                                    boxShadow: "0 3px 14px rgba(37,99,235,0.3)",
                                    border: "1.5px solid transparent",
                                  }
                                : {
                                    background: "#f9fafb",
                                    color: "#374151",
                                    border: "1.5px solid #e5e7eb",
                                  }
                            }
                          >
                            <span>{t.aantal} st</span>
                            <span
                              className="text-xs font-medium mt-0.5"
                              style={{ color: active ? "rgba(255,255,255,0.85)" : "#9ca3af" }}
                            >
                              {formatPrijs(t.prijs)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between rounded-xl px-5 py-3.5 mb-6"
                    style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
                  >
                    <span className="text-sm font-medium" style={{ color: "#6b7280" }}>
                      {tier.aantal} {tier.aantal === 1 ? "stuk" : "stuks"}, eenmalige betaling
                    </span>
                    <span
                      className="text-2xl font-extrabold tabular-nums"
                      style={{
                        background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {formatPrijs(tier.prijs)}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: added
                        ? "linear-gradient(135deg, #1d4ed8 0%, #15803d 100%)"
                        : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                      boxShadow: "0 4px 20px rgba(37,99,235,0.32)",
                      transition: "background 0.3s ease",
                    }}
                  >
                    {added ? (
                      <><Check size={17} strokeWidth={2.5} />Toegevoegd aan winkelmandje!</>
                    ) : (
                      <><ShoppingCart size={17} strokeWidth={2} />Voeg toe aan winkelmandje</>
                    )}
                  </button>

                  <div className="flex flex-wrap gap-4 mt-5 text-xs font-medium" style={{ color: "#9ca3af" }}>
                    {["✓ Altijd gratis geprogrammeerd", "✓ Geen abonnement", "✓ Binnen 3 werkdagen"].map(b => (
                      <span key={b}>{b}</span>
                    ))}
                  </div>
                </>
              )}

            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Bekijk ook ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-12" style={{ background: "#eff6ff" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-8" style={{ color: "#111827" }}>
            Bekijk ook
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherProducts.map((op, i) => {
              return (
                <motion.div
                  key={op.slug}
                  className="flex flex-col rounded-2xl overflow-hidden"
                  style={{ background: "#ffffff", border: "1.5px solid #bfdbfe" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: EASE, delay: i * 0.08 }}
                  whileHover={{ y: -4, borderColor: "#2563eb", transition: { duration: 0.2 } }}
                >
                  <div
                    className="w-full overflow-hidden"
                    style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}
                  >
                    <Image
                      src={op.afbeelding}
                      alt={op.naam}
                      width={320}
                      height={320}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div className="p-5 flex flex-col">
                    <h3 className="text-base font-extrabold mb-1" style={{ color: "#111827" }}>
                      {op.naam}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
                      Vanaf <span className="font-bold" style={{ color: "#1d4ed8" }}>{op.vanafPrijs}</span>
                    </p>
                    <Link
                      href={`/producten/${op.slug}`}
                      className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
                      style={{
                        background: "#eff6ff",
                        color: "#1d4ed8",
                        border: "1.5px solid #bfdbfe",
                      }}
                    >
                      Bekijk product
                      <ArrowRight size={14} strokeWidth={2.4} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
