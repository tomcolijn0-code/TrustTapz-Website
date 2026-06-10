"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Props {
  naam: string;
  email: string;
}

export default function BedanktContent({ naam, email }: Props) {
  const { clearCart } = useCart();

  // Clear the cart exactly once after a confirmed payment
  useEffect(() => {
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full">

        {/* Animated checkmark */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}
          >
            <CheckCircle size={52} strokeWidth={1.4} style={{ color: "#2563eb" }} />
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
            {naam ? `Bedankt, ${naam}!` : "Bedankt voor je bestelling!"}
          </h1>
          <p className="text-base leading-relaxed mb-2" style={{ color: "#6b7280" }}>
            Je betaling is ontvangen. We programmeren jouw NFC-kaarten op je Google
            Review pagina en leveren ze binnen{" "}
            <span className="font-semibold" style={{ color: "#111827" }}>3 werkdagen</span>.
          </p>
          {email && (
            <p className="text-sm" style={{ color: "#9ca3af" }}>
              Een bevestiging is verstuurd naar{" "}
              <span className="font-medium" style={{ color: "#374151" }}>{email}</span>.
            </p>
          )}
        </motion.div>

        {/* Info strip */}
        <motion.div
          className="my-8 rounded-2xl p-5 flex flex-col gap-3 text-left"
          style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
        >
          {[
            { icon: "✅", text: "Betaling bevestigd" },
            { icon: "🔧", text: "Kaarten worden geprogrammeerd op jouw Google Review link" },
            { icon: "📦", text: "Verzending binnen 3 werkdagen" },
          ].map((step) => (
            <div key={step.text} className="flex items-start gap-3 text-sm" style={{ color: "#374151" }}>
              <span className="text-base leading-none mt-0.5">{step.icon}</span>
              <span>{step.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.35 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-75"
            style={{ color: "#1d4ed8" }}
          >
            <ArrowLeft size={14} strokeWidth={2.4} />
            Terug naar home
          </Link>
          <span className="hidden sm:block w-px h-4" style={{ background: "#e5e7eb" }} />
          <Link
            href="/producten"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-75"
            style={{ color: "#6b7280" }}
          >
            <Package size={14} strokeWidth={2.2} />
            Meer producten bekijken
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
