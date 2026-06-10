"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, XCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function GeannuleerdPage() {
  const { setIsOpen } = useCart();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full">

        {/* Icon */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "#fef2f2" }}
          >
            <XCircle size={52} strokeWidth={1.4} style={{ color: "#ef4444" }} />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
        >
          <h1
            className="text-3xl font-extrabold mb-3 tracking-tight"
            style={{ color: "#111827", fontFamily: "var(--font-dm-sans)" }}
          >
            Betaling afgebroken
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#6b7280" }}>
            Je betaling is niet voltooid. Je winkelmandje staat nog klaar en
            je kunt het op elk moment afrekenen.
          </p>
        </motion.div>

        {/* Info strip */}
        <motion.div
          className="my-8 rounded-2xl p-5 text-sm text-left"
          style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", color: "#374151" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
        >
          <p>
            Er is <strong>geen bedrag afgeschreven</strong>. Je gegevens zijn niet opgeslagen.
            Probeer het opnieuw of neem contact met ons op als je problemen ondervindt.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-3 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.35 }}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center justify-center gap-2 w-full max-w-xs py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              boxShadow: "0 3px 16px rgba(37,99,235,0.3)",
            }}
          >
            <ShoppingCart size={16} strokeWidth={2} />
            Terug naar winkelmandje
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
            style={{ color: "#9ca3af" }}
          >
            <ArrowLeft size={13} strokeWidth={2.4} />
            Terug naar home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
