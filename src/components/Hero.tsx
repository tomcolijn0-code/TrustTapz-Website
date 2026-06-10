"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NfcAnimation from "./NfcAnimation";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
});

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Subtiele grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Hero body */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

          {/* Text column */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                color: "#2563eb",
              }}
              variants={fadeUp(0)}
              initial="hidden"
              animate="show"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2563eb]" />
              </span>
              NFC-technologie voor lokale bedrijven
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.07] tracking-tight mb-6"
              style={{ color: "#111827", fontFamily: "var(--font-dm-sans)" }}
              variants={fadeUp(0.1)}
              initial="hidden"
              animate="show"
            >
              Meer reviews.{" "}
              <span style={{ color: "#2563eb" }}>
                Minder moeite.
              </span>
            </motion.h1>

            {/* Subkop */}
            <motion.p
              className="text-lg sm:text-xl max-w-xl leading-relaxed mb-10"
              style={{ color: "#6b7280" }}
              variants={fadeUp(0.2)}
              initial="hidden"
              animate="show"
            >
              Eén tik met de telefoon op jouw TrustTapz‑kaart en jouw klant
              opent direct jouw Google Review‑pagina. Geen app, geen account,
              geen gedoe. Wél meer reviews.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeUp(0.3)}
              initial="hidden"
              animate="show"
            >
              <Link
                href="/producten"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  boxShadow: "0 4px 24px rgba(37,99,235,0.3)",
                }}
              >
                Bestellen
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h12M12 4l6 6-6 6" />
                </svg>
              </Link>

              <Link
                href="#hoe-het-werkt"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:bg-[#eff6ff] active:scale-[0.97]"
                style={{
                  border: "1.5px solid #bfdbfe",
                  color: "#374151",
                }}
              >
                Hoe het werkt
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="10" r="8" />
                  <path d="M10 6v4l3 3" />
                </svg>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex flex-wrap items-center gap-5 mt-12 text-sm"
              style={{ color: "#6b7280" }}
              variants={fadeUp(0.4)}
              initial="hidden"
              animate="show"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["#1d4ed8", "#2563eb", "#60a5fa"].map((c, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{ background: c }} />
                  ))}
                </div>
                <span>+200 tevreden bedrijven</span>
              </div>
              <div className="w-px h-4 bg-[#e5e7eb]" />
              <div className="flex items-center gap-1.5">
                {[0,1,2,3,4].map(i => (
                  <svg key={i} width="13" height="13" viewBox="0 0 10 10" fill="#ffb300">
                    <polygon points="5,0.5 6.5,3.8 10,4.2 7.5,6.5 8.2,10 5,8.2 1.8,10 2.5,6.5 0,4.2 3.5,3.8" />
                  </svg>
                ))}
                <span>4.9 gemiddeld</span>
              </div>
            </motion.div>
          </div>

          {/* Animation column */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.75, ease: EASE, delay: 0.18 } }}
          >
            <NfcAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
