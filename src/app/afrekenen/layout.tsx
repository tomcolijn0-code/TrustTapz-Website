import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afrekenen",
  description: "Vul je gegevens in en plaats je TrustTapz bestelling.",
  robots: { index: false, follow: false },
};

export default function AfrekelenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
