import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PRODUCTEN, getProduct } from "@/lib/productenData";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return PRODUCTEN.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product niet gevonden" };
  return {
    title: product.naam,
    description: product.beschrijving,
    alternates: {
      canonical: `https://trusttapz.nl/producten/${params.slug}`,
    },
    openGraph: {
      title: `${product.naam} | TrustTapz`,
      description: product.beschrijving,
    },
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const otherProducts = PRODUCTEN.filter((p) => p.slug !== params.slug);

  return <ProductDetail product={product} otherProducts={otherProducts} />;
}
