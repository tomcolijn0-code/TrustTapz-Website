"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart, CartItem } from "@/context/CartContext";
import { formatPrijs } from "@/lib/productenData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SLUG_LABELS: Record<string, string> = {
  "nfc-kaart":     "NFC Kaart",
  "nfc-standaard": "NFC Standaard",
  "nfc-sticker":   "NFC Sticker",
};

function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem } = useCart();

  return (
    <div
      className="flex items-start gap-3 py-4"
      style={{ borderBottom: "1px solid #f3f4f6" }}
    >
      {/* Color dot */}
      <div
        className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
        style={{ background: "linear-gradient(135deg, #dbeafe, #bfdbfe)" }}
      >
        <span className="text-xs font-bold" style={{ color: "#1d4ed8" }}>
          {SLUG_LABELS[item.slug]?.slice(4, 6) ?? "NF"}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-snug truncate" style={{ color: "#111827" }}>
          {item.naam}{item.variant ? ` — ${item.variant}` : ""}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
          {item.aantal} {item.aantal === 1 ? "stuk" : "stuks"}
        </p>
        <p className="text-sm font-bold mt-1" style={{ color: "#1d4ed8" }}>
          {formatPrijs(item.prijs)}
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.slug, item.aantal, item.variant)}
        className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
        aria-label="Verwijder"
        style={{ color: "#d1d5db" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
      >
        <Trash2 size={15} strokeWidth={2} />
      </button>
    </div>
  );
}

export default function CartDrawer() {
  const { items, totalPrice, totalItems, isOpen, setIsOpen, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer panel */}
          <motion.div
            className="fixed right-0 top-0 h-full z-[70] flex flex-col"
            style={{
              width: "min(420px, 100vw)",
              background: "#ffffff",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid #f3f4f6" }}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={20} style={{ color: "#1d4ed8" }} strokeWidth={2} />
                <h2 className="text-base font-extrabold" style={{ color: "#111827" }}>
                  Winkelmandje
                </h2>
                {totalItems > 0 && (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: "#eff6ff", color: "#1d4ed8" }}
                  >
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg transition-colors"
                aria-label="Winkelmandje sluiten"
                style={{ color: "#9ca3af" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "#eff6ff" }}
                  >
                    <ShoppingBag size={28} style={{ color: "#bfdbfe" }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#111827" }}>
                      Je winkelmandje is leeg
                    </p>
                    <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>
                      Voeg een product toe om te beginnen.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
                    style={{ color: "#1d4ed8" }}
                  >
                    Bekijk producten
                    <ArrowRight size={14} strokeWidth={2.4} />
                  </button>
                </div>
              ) : (
                /* Items list */
                <div>
                  {items.map((item) => (
                    <CartItemRow key={`${item.slug}-${item.aantal}-${item.variant ?? ""}`} item={item} />
                  ))}

                  {/* Clear cart */}
                  <button
                    onClick={clearCart}
                    className="mt-3 text-xs transition-opacity hover:opacity-75"
                    style={{ color: "#9ca3af" }}
                  >
                    Winkelmandje leegmaken
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-5"
                style={{ borderTop: "1px solid #f3f4f6" }}
              >
                {/* Subtotaal */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold" style={{ color: "#374151" }}>
                    Subtotaal
                  </span>
                  <span
                    className="text-xl font-extrabold tabular-nums"
                    style={{
                      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {formatPrijs(totalPrice)}
                  </span>
                </div>

                <Link
                  href="/afrekenen"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    boxShadow: "0 4px 18px rgba(37,99,235,0.32)",
                  }}
                >
                  Afrekenen
                  <ArrowRight size={15} strokeWidth={2.4} />
                </Link>

                <p className="text-center text-xs mt-3" style={{ color: "#9ca3af" }}>
                  Gratis verzending vanaf Team Pack
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
