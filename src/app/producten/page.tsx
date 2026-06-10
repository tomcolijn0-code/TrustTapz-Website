import { Metadata } from "next";
import ProductSelectie from "@/components/ProductSelectie";

export const metadata: Metadata = {
  title: "Onze producten",
  description:
    "Bekijk onze NFC-producten voor Google Reviews. Kaart, standaard of sticker, geprogrammeerd op jouw review pagina. Eenmalige betaling, geen abonnement.",
  alternates: {
    canonical: "https://trusttapz.nl/producten",
  },
  openGraph: {
    title: "Onze producten | TrustTapz",
    description:
      "NFC-kaart, standaard of sticker, elk product geprogrammeerd op jouw Google Review pagina.",
    url: "https://trusttapz.nl/producten",
  },
};

export default function ProductenPage() {
  return <ProductSelectie koptitel="Onze producten" extraPadding />;
}
