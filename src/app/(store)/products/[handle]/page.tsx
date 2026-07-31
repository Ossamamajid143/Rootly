import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui/page-intro";
import { Container } from "@/components/ui/container";
import { formatMoney } from "@/lib/format-money";
import { getProductByHandle, getProducts } from "@/lib/shopify";

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    handle: product.handle,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <PageIntro
        eyebrow={product.productType}
        title={product.title}
        description={product.description}
      />

      <Container className="grid gap-10 py-12 md:grid-cols-2 md:items-start lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-sand">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted">
              Product image unavailable
            </div>
          )}
        </div>

        <div className="pt-2 md:sticky md:top-28">
          <p className="text-sm uppercase tracking-[0.16em] text-muted">
            Starting from
          </p>

          <p className="mt-2 font-display text-4xl font-semibold text-forest">
            {formatMoney(product.priceRange.minVariantPrice)}
          </p>

          <p className="mt-5 text-sm font-semibold text-foreground">
            {product.availableForSale
              ? "Available"
              : "Currently unavailable"}
          </p>
        </div>
      </Container>
    </main>
  );
}
