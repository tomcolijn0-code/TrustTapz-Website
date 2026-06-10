"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import Logo from "./Logo";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const NAV_LINKS = [
  { label: "Hoe het werkt", href: "/#hoe-het-werkt" },
  { label: "Producten",     href: "/producten" },
  { label: "Contact",       href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, isOpen: cartOpen, setIsOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      style={{
        background: "#ffffff",
        borderBottom: scrolled
          ? "1px solid #e5e7eb"
          : "1px solid transparent",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="TrustTapz home">
          <Logo variant="light" idPrefix="nav" />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold transition-colors duration-150"
              style={{ color: "#6b7280" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#111827")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6b7280")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop: cart icon + CTA grouped together */}
        <div className="hidden md:flex items-center flex-shrink-0" style={{ gap: 10 }}>
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors"
            aria-label="Winkelmandje openen"
            style={{ color: "#6b7280" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            <ShoppingBag size={20} strokeWidth={1.9} />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ background: "#2563eb" }}
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          <Link
            href="/producten"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.04] active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              boxShadow: "0 2px 16px rgba(37,99,235,0.25)",
            }}
          >
            Bestellen
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10h12M12 4l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Cart icon — mobile */}
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="md:hidden relative flex items-center justify-center w-9 h-9 rounded-lg"
          aria-label="Winkelmandje openen"
          style={{ color: "#6b7280" }}
        >
          <ShoppingBag size={20} strokeWidth={1.9} />
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center text-white"
              style={{ background: "#2563eb" }}
            >
              {totalItems}
            </motion.span>
          )}
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: "#374151" }}
          onClick={() => setOpen(v => !v)}
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            style={{
              overflow: "hidden",
              background: "#ffffff",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <nav className="px-6 py-5 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-semibold py-3 border-b"
                  style={{ color: "#374151", borderColor: "#e5e7eb" }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/producten"
                className="mt-3 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  boxShadow: "0 2px 14px rgba(37,99,235,0.25)",
                }}
                onClick={() => setOpen(false)}
              >
                Bestellen
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h12M12 4l6 6-6 6" />
                </svg>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>

    {/* Cart drawer — rendered outside header so it covers full viewport */}
    <CartDrawer />
    </>
  );
}
