import { Metadata } from "next";
import Hero from "@/components/Hero";
import HoeHetWerkt from "@/components/HoeHetWerkt";
import ProductSelectie from "@/components/ProductSelectie";
import Voordelen from "@/components/Voordelen";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "TrustTapz. Één tik. Meer Google Reviews.",
  description:
    "Eén tik met de telefoon op jouw TrustTapz NFC-kaart en jouw klant opent direct jouw Google Review-pagina. Geen app, geen account. Meer reviews, hogere ranking, meer omzet.",
  alternates: {
    canonical: "https://trusttapz.nl",
  },
  openGraph: {
    title: "TrustTapz. Één tik. Meer Google Reviews.",
    description:
      "Met een TrustTapz NFC-kaart verzamel je moeiteloos Google Reviews. Eenmalige betaling, gratis verzending.",
    url: "https://trusttapz.nl",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <HoeHetWerkt />
      <ProductSelectie />
      <Voordelen />
      <Stats />
      <Contact />
    </>
  );
}
