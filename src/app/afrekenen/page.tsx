"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Truck, HelpCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrijs } from "@/lib/productenData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VERZENDKOSTEN = 4.95;
const GRATIS_DREMPEL = 50;

/* ─── Schema ─────────────────────────────────────────────────────────── */

const schema = z.object({
  voornaam:    z.string().min(2,  "Vul je voornaam in"),
  achternaam:  z.string().min(2,  "Vul je achternaam in"),
  email:       z.string().email( "Vul een geldig e-mailadres in"),
  telefoon:    z.string().min(10, "Vul een geldig telefoonnummer in"),
  straat:      z.string().min(2,  "Vul je straatnaam in"),
  huisnummer:  z.string().min(1,  "Vul je huisnummer in"),
  postcode:    z.string().min(4,  "Vul je postcode in"),
  plaats:      z.string().min(2,  "Vul je woonplaats in"),
  land:        z.string().min(2,  "Vul je land in"),
  reviewUrl:   z.string().url(   "Vul een geldige URL in (bijv. https://g.page/...)"),
});

type FormData = z.infer<typeof schema>;

/* ─── Helpers ────────────────────────────────────────────────────────── */

const inputBase = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all";
const inputStyle: React.CSSProperties = {
  background: "#eff6ff",
  border: "1.5px solid #bfdbfe",
  color: "#111827",
};

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "#2563eb";
  e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(37,99,235,0.12)";
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "#bfdbfe";
  e.currentTarget.style.boxShadow   = "none";
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color: "#374151" }}>
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs" style={{ color: "#ef4444" }}>{error}</p>
      )}
    </div>
  );
}

function StepHeader({ nr, label }: { nr: number; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
      >
        {nr}
      </span>
      <h2 className="text-base font-extrabold" style={{ color: "#111827" }}>
        {label}
      </h2>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function AfrekelenPage() {
  const { items, totalPrice } = useCart();
  const [serverError, setServerError] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const verzending = totalPrice >= GRATIS_DREMPEL ? 0 : VERZENDKOSTEN;
  const totaal = totalPrice + verzending;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { land: "Nederland" },
  });

  async function onSubmit(data: FormData) {
    setServerError(false);
    setRedirecting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: data, items }),
      });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setServerError(true);
      setRedirecting(false);
    }
  }

  const busy = isSubmitting || redirecting;

  /* Empty cart */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-5 px-6 text-center pt-16">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: "#eff6ff" }}
        >
          <ShoppingBag size={28} style={{ color: "#bfdbfe" }} strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-extrabold text-lg" style={{ color: "#111827" }}>
            Je winkelmandje is leeg
          </p>
          <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>
            Voeg eerst producten toe voordat je afrekent.
          </p>
        </div>
        <Link
          href="/producten"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
        >
          Bekijk producten
        </Link>
      </div>
    );
  }

  /* Checkout form */
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 pt-28 pb-20">

        {/* Back link */}
        <Link
          href="/producten"
          className="inline-flex items-center gap-1.5 text-sm font-semibold mb-8 transition-opacity hover:opacity-70"
          style={{ color: "#6b7280" }}
        >
          <ArrowLeft size={15} strokeWidth={2.4} />
          Terug naar winkel
        </Link>

        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-10"
          style={{ color: "#111827", fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          Afrekenen
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">

          {/* ── Form ── */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          >

            {/* Step 1: Contactgegevens */}
            <div
              className="rounded-2xl p-7"
              style={{ border: "1.5px solid #e5e7eb" }}
            >
              <StepHeader nr={1} label="Contactgegevens" />
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Voornaam" error={errors.voornaam?.message}>
                    <input {...register("voornaam")} type="text" placeholder="Jan"
                      className={inputBase} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </Field>
                  <Field label="Achternaam" error={errors.achternaam?.message}>
                    <input {...register("achternaam")} type="text" placeholder="de Vries"
                      className={inputBase} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </Field>
                </div>
                <Field label="E-mailadres" error={errors.email?.message}>
                  <input {...register("email")} type="email" placeholder="jan@bedrijf.nl"
                    className={inputBase} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </Field>
                <Field label="Telefoonnummer" error={errors.telefoon?.message}>
                  <input {...register("telefoon")} type="tel" placeholder="+31 6 12345678"
                    className={inputBase} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </Field>
              </div>
            </div>

            {/* Step 2: Bezorgadres */}
            <div
              className="rounded-2xl p-7"
              style={{ border: "1.5px solid #e5e7eb" }}
            >
              <StepHeader nr={2} label="Bezorgadres" />
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-[1fr_120px] gap-4">
                  <Field label="Straat" error={errors.straat?.message}>
                    <input {...register("straat")} type="text" placeholder="Kerkstraat"
                      className={inputBase} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </Field>
                  <Field label="Huisnummer" error={errors.huisnummer?.message}>
                    <input {...register("huisnummer")} type="text" placeholder="12A"
                      className={inputBase} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </Field>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-4">
                  <Field label="Postcode" error={errors.postcode?.message}>
                    <input {...register("postcode")} type="text" placeholder="1234 AB"
                      className={inputBase} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </Field>
                  <Field label="Plaats" error={errors.plaats?.message}>
                    <input {...register("plaats")} type="text" placeholder="Amsterdam"
                      className={inputBase} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </Field>
                </div>
                <Field label="Land" error={errors.land?.message}>
                  <select {...register("land")}
                    className={inputBase} style={inputStyle} onFocus={onFocus} onBlur={onBlur}
                  >
                    <option value="Nederland">Nederland</option>
                    <option value="België">België</option>
                    <option value="Duitsland">Duitsland</option>
                    <option value="Anders">Anders</option>
                  </select>
                </Field>
              </div>
            </div>

            {/* Step 3: Google Review link */}
            <div
              className="rounded-2xl p-7"
              style={{ border: "1.5px solid #e5e7eb" }}
            >
              <StepHeader nr={3} label="Google Review link" />
              <div className="flex flex-col gap-3">
                <Field label="Jouw Google Review pagina URL" error={errors.reviewUrl?.message}>
                  <input
                    {...register("reviewUrl")}
                    type="url"
                    placeholder="https://g.page/r/..."
                    className={inputBase}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </Field>
                <div
                  className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm"
                  style={{
                    background: "rgba(37,99,235,0.06)",
                    border: "1px solid rgba(37,99,235,0.18)",
                    color: "#374151",
                  }}
                >
                  <HelpCircle size={15} strokeWidth={2} className="flex-shrink-0 mt-0.5" style={{ color: "#1d4ed8" }} />
                  <span>
                    Zoek je bedrijf op{" "}
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                      className="font-semibold underline" style={{ color: "#1d4ed8" }}>
                      Google Maps
                    </a>
                    , klik op{" "}
                    <span className="font-semibold">&apos;Reviews schrijven&apos;</span>{" "}
                    en kopieer de link.
                  </span>
                </div>
              </div>
            </div>

            {serverError && (
              <p className="text-sm text-center" style={{ color: "#ef4444" }}>
                Er is iets misgegaan. Probeer opnieuw of mail ons op hallo@trusttapz.nl.
              </p>
            )}

            {/* Submit — mobile only (desktop has it in the summary) */}
            <button
              type="submit"
              disabled={busy}
              className="lg:hidden flex items-center justify-center w-full py-4 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 4px 18px rgba(37,99,235,0.3)",
              }}
            >
              {busy ? "Doorsturen naar betaling…" : "Bestelling plaatsen"}
            </button>
          </motion.form>

          {/* ── Order summary ── */}
          <motion.div
            className="lg:sticky"
            style={{ top: 104 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1.5px solid #2563eb" }}
            >
              {/* Header */}
              <div
                className="px-6 py-4 flex items-center gap-2.5"
                style={{ background: "#eff6ff", borderBottom: "1px solid #bfdbfe" }}
              >
                <ShoppingBag size={17} style={{ color: "#1d4ed8" }} strokeWidth={2} />
                <h3 className="font-extrabold text-sm" style={{ color: "#111827" }}>
                  Jouw bestelling
                </h3>
              </div>

              {/* Items */}
              <div className="px-6 py-4 flex flex-col gap-3">
                {items.map((item) => (
                  <div key={`${item.slug}-${item.aantal}-${item.variant ?? ""}`} className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold leading-snug" style={{ color: "#111827" }}>
                        {item.naam}{item.variant ? ` — ${item.variant}` : ""}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                        {item.aantal} {item.aantal === 1 ? "stuk" : "stuks"}
                      </p>
                    </div>
                    <span className="text-sm font-bold flex-shrink-0" style={{ color: "#374151" }}>
                      {formatPrijs(item.prijs)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totalen */}
              <div
                className="px-6 py-5 flex flex-col gap-3"
                style={{ borderTop: "1px solid #f3f4f6" }}
              >
                <div className="flex justify-between text-sm" style={{ color: "#6b7280" }}>
                  <span>Subtotaal</span>
                  <span className="font-medium" style={{ color: "#374151" }}>{formatPrijs(totalPrice)}</span>
                </div>

                <div className="flex justify-between text-sm" style={{ color: "#6b7280" }}>
                  <span className="flex items-center gap-1.5">
                    <Truck size={13} strokeWidth={2} />
                    Verzendkosten
                  </span>
                  {verzending === 0 ? (
                    <span className="font-semibold" style={{ color: "#1d4ed8" }}>Gratis</span>
                  ) : (
                    <span className="font-medium" style={{ color: "#374151" }}>{formatPrijs(verzending)}</span>
                  )}
                </div>

                {verzending > 0 && (
                  <p className="text-xs" style={{ color: "#9ca3af" }}>
                    Gratis verzending vanaf {formatPrijs(GRATIS_DREMPEL)}
                  </p>
                )}

                <div
                  className="flex justify-between items-center pt-3"
                  style={{ borderTop: "1px solid #f3f4f6" }}
                >
                  <span className="font-extrabold text-base" style={{ color: "#111827" }}>
                    Totaal
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
                    {formatPrijs(totaal)}
                  </span>
                </div>
              </div>

              {/* Submit — desktop */}
              <div className="px-6 pb-6">
                <button
                  type="submit"
                  form="checkout-form"
                  onClick={handleSubmit(onSubmit)}
                  disabled={busy}
                  className="flex items-center justify-center w-full py-4 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    boxShadow: "0 4px 18px rgba(37,99,235,0.3)",
                  }}
                >
                  {busy ? "Doorsturen naar betaling…" : "Bestelling plaatsen"}
                </button>
                <p className="text-center text-xs mt-3" style={{ color: "#9ca3af" }}>
                  Binnen 3 werkdagen geleverd · Gratis geprogrammeerd
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
