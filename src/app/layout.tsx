import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const BASE_URL = "https://trusttapz.nl";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "TrustTapz. Één tik. Meer Google Reviews.",
    template: "%s | TrustTapz",
  },
  description:
    "Met één tik op een TrustTapz NFC-kaart opent je klant direct jouw Google Review-pagina. Geen app, geen account. Meer reviews, betere ranking, meer omzet.",
  keywords: [
    "NFC kaart reviews",
    "Google Reviews verzamelen",
    "review kaart horeca",
    "meer reviews lokaal bedrijf",
    "TrustTapz",
    "NFC tap review",
  ],
  authors: [{ name: "TrustTapz", url: BASE_URL }],
  creator: "TrustTapz",
  publisher: "TrustTapz",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: BASE_URL,
    siteName: "TrustTapz",
    title: "TrustTapz. Één tik. Meer Google Reviews.",
    description:
      "Met één tik op een TrustTapz NFC-kaart opent je klant direct jouw Google Review-pagina. Meer reviews, hogere Google-ranking, meer klanten.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TrustTapz. Één tik. Meer klanten.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrustTapz. Één tik. Meer Google Reviews.",
    description:
      "Met één tik op een TrustTapz NFC-kaart opent je klant direct jouw Google Review-pagina.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={dmSans.variable}>
      <body className="min-h-screen bg-background text-text-primary font-sans antialiased flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
