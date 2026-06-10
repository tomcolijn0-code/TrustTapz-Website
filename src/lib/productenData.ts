export interface PrijsTier {
  aantal: number;
  prijs: number;
  besparing?: number; // hardcoded besparing in €; indien aanwezig, wordt dynamische berekening overgeslagen
}

export interface KleurVariant {
  kleur: string;
  afbeelding: string;
  galerij: string[];
}

export interface Product {
  slug: string;
  naam: string;
  vanafPrijs: string;
  beschrijving: string;
  prijsTiers: PrijsTier[];
  afbeelding: string;
  galerij: string[];
  kleurVarianten?: KleurVariant[];
}

export const PRODUCTEN: Product[] = [
  {
    slug: "nfc-kaart",
    naam: "Google Review NFC Kaart",
    vanafPrijs: "€14,95",
    beschrijving:
      "Laat klanten in één tik een Google Review achter. Gemaakt van gerecycled plastic, werkt op elke moderne smartphone en heeft geen app of account nodig. Verkrijgbaar in wit en zwart. Geprogrammeerd op jouw bedrijf, direct klaar voor gebruik.",
    prijsTiers: [
      { aantal: 1,  prijs: 14.95 },
      { aantal: 3,  prijs: 38.85 },
      { aantal: 5,  prijs: 59.75 },
      { aantal: 10, prijs: 109.50 },
      { aantal: 20, prijs: 199.00 },
    ],
    afbeelding: "/images/producten/02_nfc-google-review-kaart/Wit/nfc-google-review-kaart-productfoto-wit.png",
    galerij: [
      "/images/producten/02_nfc-google-review-kaart/Wit/nfc-google-review-kaart-in-gebruik-balie.png",
      "/images/producten/02_nfc-google-review-kaart/Wit/nfc-google-review-kaart-in-gebruik-sfeerbeeld.png",
      "/images/producten/02_nfc-google-review-kaart/Wit/nfc-google-review-kaart-in-houder-met-telefoon.png",
      "/images/producten/02_nfc-google-review-kaart/Wit/nfc-google-review-kaart-naast-telefoon-marmer.png",
    ],
    kleurVarianten: [
      {
        kleur: "Wit",
        afbeelding: "/images/producten/02_nfc-google-review-kaart/Wit/nfc-google-review-kaart-productfoto-wit.png",
        galerij: [
          "/images/producten/02_nfc-google-review-kaart/Wit/nfc-google-review-kaart-in-gebruik-balie.png",
          "/images/producten/02_nfc-google-review-kaart/Wit/nfc-google-review-kaart-in-gebruik-sfeerbeeld.png",
          "/images/producten/02_nfc-google-review-kaart/Wit/nfc-google-review-kaart-in-houder-met-telefoon.png",
          "/images/producten/02_nfc-google-review-kaart/Wit/nfc-google-review-kaart-naast-telefoon-marmer.png",
        ],
      },
      {
        kleur: "Zwart",
        afbeelding: "/images/producten/02_nfc-google-review-kaart/Zwart/nfc-google-review-kaart-zwart-1.png",
        galerij: [
          "/images/producten/02_nfc-google-review-kaart/Zwart/nfc-google-review-kaart-zwart-2.png",
          "/images/producten/02_nfc-google-review-kaart/Zwart/nfc-google-review-kaart-zwart-3.png",
          "/images/producten/02_nfc-google-review-kaart/Zwart/nfc-google-review-kaart-zwart-4.png",
          "/images/producten/02_nfc-google-review-kaart/Zwart/nfc-google-review-kaart-zwart-5.png",
        ],
      },
    ],
  },
  {
    slug: "nfc-standaard",
    naam: "Google Review NFC Standaard",
    vanafPrijs: "€24,99",
    beschrijving:
      "Een stijlvolle balie-standaard die klanten uitnodigt om een review achter te laten. Gemaakt van gerecycled plastic, compact van formaat en verkrijgbaar in wit en zwart. Zet hem neer bij de kassa en laat reviews voor je werken.",
    prijsTiers: [
      { aantal: 1,  prijs: 24.99 },
      { aantal: 3,  prijs: 65.97 },
      { aantal: 5,  prijs: 99.95 },
      { aantal: 10, prijs: 179.90 },
      { aantal: 20, prijs: 319.80 },
    ],
    afbeelding: "/images/producten/01_nfc-google-review-standaard/Wit/nfc-google-review-standaard-wit-vooraanzicht.png",
    galerij: [
      "/images/producten/01_nfc-google-review-standaard/Wit/nfc-google-review-standaard-sfeerbeeld-salon.png",
      "/images/producten/01_nfc-google-review-standaard/Wit/nfc-google-review-standaard-wit-zijaanzicht-links.png",
      "/images/producten/01_nfc-google-review-standaard/Wit/nfc-google-review-standaard-wit-zijaanzicht-rechts.png",
    ],
    kleurVarianten: [
      {
        kleur: "Wit",
        afbeelding: "/images/producten/01_nfc-google-review-standaard/Wit/nfc-google-review-standaard-wit-vooraanzicht.png",
        galerij: [
          "/images/producten/01_nfc-google-review-standaard/Wit/nfc-google-review-standaard-wit-zijaanzicht-links.png",
          "/images/producten/01_nfc-google-review-standaard/Wit/nfc-google-review-standaard-wit-zijaanzicht-rechts.png",
          "/images/producten/01_nfc-google-review-standaard/Wit/nfc-google-review-standaard-sfeerbeeld-salon.png",
        ],
      },
      {
        kleur: "Zwart",
        afbeelding: "/images/producten/01_nfc-google-review-standaard/Zwart/nfc-google-review-standaard-zwart-1.png",
        galerij: [
          "/images/producten/01_nfc-google-review-standaard/Zwart/nfc-google-review-standaard-zwart-2.png",
          "/images/producten/01_nfc-google-review-standaard/Zwart/nfc-google-review-standaard-zwart-3.png",
          "/images/producten/01_nfc-google-review-standaard/Zwart/nfc-google-review-standaard-zwart-4.png",
        ],
      },
    ],
  },
  {
    slug: "nfc-sticker",
    naam: "Google Review NFC Sticker",
    vanafPrijs: "€29,80",
    beschrijving:
      "Plak hem op elke ondergrond. Gemaakt van gerecycled plastic en past op je toonbank, deur, raam of visitekaartje. Één tik en je klant staat direct op jouw reviewpagina. Verkrijgbaar in wit en zwart.",
    prijsTiers: [
      { aantal: 20,  prijs: 29.80,  besparing: 0      },
      { aantal: 50,  prijs: 59.50,  besparing: 15.00  },
      { aantal: 100, prijs: 99.00,  besparing: 50.00  },
      { aantal: 150, prijs: 127.50, besparing: 96.00  },
      { aantal: 200, prijs: 148.00, besparing: 150.00 },
    ],
    afbeelding: "/images/producten/03_google-review-stickers/wit/google-review-sticker-wit-op-doos.png",
    galerij: [
      "/images/producten/03_google-review-stickers/wit/google-review-sticker-wit-stickervel-met-doos.png",
      "/images/producten/03_google-review-stickers/zwart/google-review-sticker-zwart-op-doos.png",
      "/images/producten/03_google-review-stickers/zwart/google-review-sticker-zwart-stickervel-cadeaudoos.png",
    ],
    kleurVarianten: [
      {
        kleur: "Wit",
        afbeelding: "/images/producten/03_google-review-stickers/wit/google-review-sticker-wit-op-doos.png",
        galerij: [
          "/images/producten/03_google-review-stickers/wit/google-review-sticker-wit-stickervel-met-doos.png",
          "/images/producten/03_google-review-stickers/wit/google-review-sticker-wit-aanbrengen-op-doos.png",
          "/images/producten/03_google-review-stickers/wit/google-review-sticker-wit-dozen-formaten.png",
          "/images/producten/03_google-review-stickers/wit/google-review-sticker-wit-open-doos-vloeipapier.png",
        ],
      },
      {
        kleur: "Zwart",
        afbeelding: "/images/producten/03_google-review-stickers/zwart/google-review-sticker-zwart-op-doos.png",
        galerij: [
          "/images/producten/03_google-review-stickers/zwart/google-review-sticker-zwart-stickervel-cadeaudoos.png",
          "/images/producten/03_google-review-stickers/zwart/google-review-sticker-zwart-aanbrengen-op-doos.png",
          "/images/producten/03_google-review-stickers/zwart/google-review-sticker-zwart-dozen-formaten.png",
          "/images/producten/03_google-review-stickers/zwart/google-review-sticker-zwart-open-doos-vloeipapier.png",
        ],
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTEN.find((p) => p.slug === slug);
}

export const formatPrijs = (n: number) =>
  "€" + n.toFixed(2).replace(".", ",");
