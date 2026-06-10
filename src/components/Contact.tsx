"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const schema = z.object({
  naam: z.string().min(2, "Vul je naam in (minimaal 2 tekens)"),
  email: z.string().email("Vul een geldig e-mailadres in"),
  bericht: z.string().min(10, "Je bericht is te kort (minimaal 10 tekens)"),
});

type FormData = z.infer<typeof schema>;

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "E-mail",
    value: "info@trusttapz.nl",
    href: "mailto:info@trusttapz.nl",
  },
  {
    icon: Phone,
    label: "Telefoon",
    value: "Op aanvraag",
    href: null,
  },
  {
    icon: MapPin,
    label: "Locatie",
    value: "Gevestigd in Nederland",
    href: null,
  },
];

function InputField({
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
      <label
        className="block text-sm font-semibold mb-1.5"
        style={{ color: "#374151" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1.5px solid #2563eb",
  color: "#111827",
};

function onFocusInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "#2563eb";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)";
}

function onBlurInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "#bfdbfe";
  e.currentTarget.style.boxShadow = "none";
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      reset();
    } catch {
      setServerError(true);
    }
  }

  return (
    <section id="contact" className="py-24 px-6 sm:px-12" style={{ background: "#eff6ff" }}>
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
            Contact
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: "#111827", fontFamily: "var(--font-dm-sans)" }}
          >
            Neem contact op
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#6b7280" }}>
            Heb je een vraag? We helpen je graag verder.
          </p>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          >
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center gap-4 py-20 rounded-2xl text-center"
                style={{ background: "#ffffff", border: "1.5px solid #2563eb" }}
              >
                <CheckCircle size={48} strokeWidth={1.5} style={{ color: "#2563eb" }} />
                <h3 className="text-xl font-bold" style={{ color: "#111827" }}>
                  Bericht verstuurd!
                </h3>
                <p className="text-sm" style={{ color: "#6b7280" }}>
                  We nemen zo snel mogelijk contact met je op.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm font-semibold transition-opacity hover:opacity-75"
                  style={{ color: "#1d4ed8" }}
                >
                  Nog een bericht sturen →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

                {/* Naam */}
                <InputField label="Naam" error={errors.naam?.message}>
                  <input
                    {...register("naam")}
                    type="text"
                    placeholder="Jouw naam"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={onFocusInput}
                    onBlur={onBlurInput}
                  />
                </InputField>

                {/* E-mail */}
                <InputField label="E-mailadres" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="jouw@email.nl"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={onFocusInput}
                    onBlur={onBlurInput}
                  />
                </InputField>

                {/* Bericht */}
                <InputField label="Bericht" error={errors.bericht?.message}>
                  <textarea
                    {...register("bericht")}
                    rows={5}
                    placeholder="Stel je vraag of beschrijf je situatie..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                    style={inputStyle}
                    onFocus={onFocusInput}
                    onBlur={onBlurInput}
                  />
                </InputField>

                {serverError && (
                  <p className="text-sm text-center" style={{ color: "#ef4444" }}>
                    Er is iets misgegaan. Probeer het opnieuw of mail ons direct.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    boxShadow: "0 3px 16px rgba(37,99,235,0.3)",
                  }}
                >
                  <Send size={15} strokeWidth={2.2} />
                  {isSubmitting ? "Versturen…" : "Verstuur"}
                </button>
              </form>
            )}
          </motion.div>

          {/* ── Contact info ── */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          >
            <div
              className="rounded-2xl p-8 flex flex-col gap-6"
              style={{ background: "#ffffff", border: "1.5px solid #2563eb" }}
            >
              <h3 className="text-lg font-extrabold" style={{ color: "#111827" }}>
                Contactgegevens
              </h3>

              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3.5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "#dbeafe" }}
                  >
                    <Icon size={16} strokeWidth={2} style={{ color: "#1d4ed8" }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                      style={{ color: "#9ca3af" }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium transition-opacity hover:opacity-75"
                        style={{ color: "#111827" }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: "#111827" }}>
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Response-time badge */}
            <div
              className="rounded-xl px-5 py-4 text-sm font-medium"
              style={{
                background: "#ffffff",
                border: "1.5px solid #2563eb",
                color: "#111827",
              }}
            >
              <span className="font-bold" style={{ color: "#1d4ed8" }}>⚡ Snelle reactie.</span> We reageren doorgaans binnen één werkdag.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
