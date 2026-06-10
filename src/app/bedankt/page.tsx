import { Metadata } from "next";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import BedanktContent from "@/components/BedanktContent";

export const metadata: Metadata = {
  title: "Bestelling geplaatst!",
  robots: { index: false, follow: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export default async function BedanktPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  // No session_id → redirect home
  if (!sessionId) redirect("/");

  let naam = "";
  let email = "";

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Guard against accessing the page without a completed payment
    if (session.payment_status !== "paid") redirect("/geannuleerd");

    naam  = session.metadata?.voornaam ?? "";
    email = session.customer_email ?? session.metadata?.email ?? "";
  } catch {
    // Invalid session_id or Stripe error → redirect home
    redirect("/");
  }

  return <BedanktContent naam={naam} email={email} />;
}
