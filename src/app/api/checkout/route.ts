import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

const VERZENDKOSTEN_CENTS = 495;
const GRATIS_DREMPEL = 50;

interface CartItem {
  slug: string;
  naam: string;
  aantal: number;
  prijs: number; // EUR, decimals
  variant?: string; // bijv. "Wit" of "Zwart"
}

interface CheckoutBody {
  items: CartItem[];
  formData: {
    voornaam: string;
    achternaam: string;
    email: string;
    telefoon: string;
    straat: string;
    huisnummer: string;
    postcode: string;
    plaats: string;
    land: string;
    reviewUrl: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const { items, formData }: CheckoutBody = await req.json();

    if (!items?.length || !formData?.email) {
      return NextResponse.json({ error: "Ontbrekende gegevens" }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? "http://localhost:3000";
    const subtotaal = items.reduce((sum, i) => sum + i.prijs, 0);
    const heeftGratisVerzending = subtotaal >= GRATIS_DREMPEL;

    // Build Stripe line items from cart
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.variant ? `${item.naam} — ${item.variant}` : item.naam,
          description: `${item.aantal} ${item.aantal === 1 ? "stuk" : "stuks"} · geprogrammeerd op jouw Google Review pagina`,
        },
        unit_amount: Math.round(item.prijs * 100),
      },
      quantity: 1,
    }));

    // Add shipping line item when applicable
    if (!heeftGratisVerzending) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Verzendkosten" },
          unit_amount: VERZENDKOSTEN_CENTS,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: formData.email,

      // Pre-fill shipping address
      shipping_address_collection: {
        allowed_countries: ["NL", "BE", "DE"],
      },

      // Metadata for order fulfillment (e.g. via webhook)
      metadata: {
        voornaam:   formData.voornaam,
        achternaam: formData.achternaam,
        email:      formData.email,
        telefoon:   formData.telefoon,
        straat:     formData.straat,
        huisnummer: formData.huisnummer,
        postcode:   formData.postcode,
        plaats:     formData.plaats,
        land:       formData.land,
        reviewUrl:  formData.reviewUrl,
      },

      success_url: `${origin}/bedankt?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${origin}/geannuleerd`,

      locale: "nl",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: "Kon betaling niet starten" }, { status: 500 });
  }
}
