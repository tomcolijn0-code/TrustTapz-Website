"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";

const PAUSE = 3200;

const EASE_IN:  [number, number, number, number] = [0.32, 0, 0.67, 0];
const EASE_OUT: [number, number, number, number] = [0.33, 1, 0.68, 1];

const phoneVariants: Variants = {
  idle: { x: 52, y: -28, rotate: -14 },
  tap:  { x: 8,  y: 10,  rotate: -5, transition: { duration: 0.42, ease: EASE_IN,  delay: 1.0 } },
  back: { x: 52, y: -28, rotate: -14, transition: { duration: 0.52, ease: EASE_OUT, delay: 1 } },
};

const ripple: Variants = {
  hidden: { scale: 0.3, opacity: 0 },
  show:   { scale: 1.8, opacity: [0, 0.6, 0], transition: { duration: 0.55, ease: "easeOut" } },
};

const wave = (delay: number): Variants => ({
  hidden: { scale: 0.8, opacity: 0 },
  show:   { scale: [0.8, 1.5], opacity: [0.55, 0], transition: { duration: 0.65, ease: "easeOut", delay } },
});

const starPop: Variants = {
  hidden: { scale: 0, opacity: 0, y: 6 },
  show:   { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 20, delay: 0.5 } },
  exit:   { scale: 0, opacity: 0, transition: { duration: 0.2, delay: 0.65 } },
};

export default function NfcAnimation() {
  const phone  = useAnimation();
  const rpl    = useAnimation();
  const star   = useAnimation();
  const w1     = useAnimation();
  const w2     = useAnimation();

  useEffect(() => {
    let alive = true;
    async function loop() {
      while (alive) {
        await phone.start("tap");
        w1.start("show");
        await w2.start("show");
        rpl.start("show");
        await star.start("show");
        await new Promise(r => setTimeout(r, 850));
        star.start("exit");
        await phone.start("back");
        rpl.set("hidden"); star.set("hidden"); w1.set("hidden"); w2.set("hidden");
        await new Promise(r => setTimeout(r, PAUSE));
      }
    }
    // Defer één tick zodat alle motion-elementen gemount zijn
    // voordat controls.start() wordt aangeroepen (Framer Motion v12)
    const id = setTimeout(() => { if (alive) loop(); }, 0);
    return () => { alive = false; clearTimeout(id); };
  }, [phone, rpl, star, w1, w2]);

  return (
    <div
      className="relative w-72 h-72 select-none rounded-3xl"
      style={{
        background: "linear-gradient(145deg, #dbeafe 0%, #eff6ff 100%)",
        boxShadow: "0 8px 40px rgba(37,99,235,0.1)",
      }}
    >
      {/* Subtiele glow */}
      <div className="absolute inset-0 rounded-3xl opacity-40 blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle at 60% 40%, #bfdbfe 0%, transparent 70%)" }} />

      {/* NFC Card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="relative w-44 h-28 rounded-2xl flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
            boxShadow: "0 8px 40px rgba(37,99,235,0.35)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />

          {/* Wave rings on card */}
          <motion.div className="absolute inset-0 rounded-2xl border-2 border-white/35"
            variants={wave(0)} initial="hidden" animate={w1} />
          <motion.div className="absolute inset-0 rounded-2xl border-2 border-white/20"
            variants={wave(0.2)} initial="hidden" animate={w2} />

          {/* Card content */}
          <div className="relative z-10 flex flex-col items-center gap-1.5">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="10" cy="14" r="3" fill="white" opacity="0.95" />
              <path d="M15 10 Q20 14 15 18" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.9" />
              <path d="M18 7  Q25 14 18 21" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.5" />
            </svg>
            <span className="text-white font-bold text-[9px] tracking-widest uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>
              TrustTapz
            </span>
          </div>
        </div>
      </div>

      {/* Phone */}
      <motion.div
        className="absolute right-2 top-4 z-20"
        variants={phoneVariants}
        initial="idle"
        animate={phone}
      >
        <div
          className="relative w-16 h-28 rounded-[18px] flex flex-col items-center overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #1e293b 0%, #0f172a 100%)",
            border: "1.5px solid rgba(37,99,235,0.25)",
            boxShadow: "0 12px 36px rgba(15,23,42,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Notch */}
          <div className="w-9 h-1.5 bg-[#0f172a] rounded-b-full mt-1" />

          {/* Screen */}
          <div className="flex-1 flex flex-col items-center justify-center gap-1 px-2 w-full">
            <div className="w-full h-1 bg-white/10 rounded-full" />
            <div className="w-3/4 h-1 bg-white/10 rounded-full" />

            {/* Google review popup */}
            <motion.div
              className="mt-2 flex flex-col items-center gap-0.5"
              variants={starPop}
              initial="hidden"
              animate={star}
            >
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-[#4285F4]">
                G
              </div>
              <div className="flex gap-px mt-0.5">
                {[0,1,2,3,4].map(i => (
                  <svg key={i} width="7" height="7" viewBox="0 0 10 10" fill="#ffb300">
                    <polygon points="5,0.5 6.5,3.8 10,4.2 7.5,6.5 8.2,10 5,8.2 1.8,10 2.5,6.5 0,4.2 3.5,3.8" />
                  </svg>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Home bar */}
          <div className="w-7 h-1 bg-white/15 rounded-full mb-1.5" />
        </div>
      </motion.div>

      {/* Tap ripple */}
      <motion.div
        className="absolute left-[48%] top-[47%] w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 z-10"
        style={{ borderColor: "rgba(37,99,235,0.5)" }}
        variants={ripple}
        initial="hidden"
        animate={rpl}
      />
    </div>
  );
}
