import Link from "next/link";
import Logo from "./Logo";
import { Mail, MapPin } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Hoe het werkt", href: "/#hoe-het-werkt" },
  { label: "Producten", href: "/producten" },
];


export default function Footer() {
  return (
    <footer style={{ background: "#0a0f1e" }}>
      {/* Top border accent */}
      <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #2563eb 40%, #1d4ed8 60%, transparent)" }} />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10 mb-14">

          {/* Brand column */}
          <div>
            <Logo variant="dark" width={180} height={41} idPrefix="footer" />
            <p className="mt-5 text-sm leading-relaxed" style={{ color: "rgba(249,250,251,0.45)", maxWidth: 260 }}>
              TrustTapz is een NFC-kaart die klanten met één tik naar jouw Google Review-pagina brengt. Geen app, geen account, geen gedoe, gewoon meer reviews.
            </p>

          </div>

          {/* Navigatie */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#2563eb" }}>
              Navigatie
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-80"
                    style={{ color: "rgba(249,250,251,0.5)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#2563eb" }}>
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hallo@trusttapz.nl"
                  className="flex items-center gap-2.5 text-sm transition-colors hover:opacity-80 group"
                  style={{ color: "rgba(249,250,251,0.5)" }}
                >
                  <Mail size={14} style={{ color: "#2563eb", flexShrink: 0 }} />
                  hallo@trusttapz.nl
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(249,250,251,0.5)" }}>
                <MapPin size={14} style={{ color: "#2563eb", flexShrink: 0, marginTop: 1 }} />
                Nederland
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs" style={{ color: "rgba(249,250,251,0.28)" }}>
            © {new Date().getFullYear()} TrustTapz. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-5">
            {[
              { label: "Algemene voorwaarden", href: "/voorwaarden" },
              { label: "Privacybeleid", href: "/privacy" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-xs transition-opacity hover:opacity-70"
                style={{ color: "rgba(249,250,251,0.28)" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
