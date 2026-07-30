import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui/page-intro";
import { Container } from "@/components/ui/container";
import { formatMoney } from "@/lib/format-money";
import {
  getProductByHandle,
  products,
} from "@/mocks/products";

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export function generateStaticParams() {
  return products.map((product) => ({
    handle: product.handle,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);

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
  const product = getProductByHandle(handle);

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

      <Container className="py-12">
        <p className="text-sm uppercase tracking-[0.16em] text-muted">
          Starting from
        </p>

        <p className="mt-2 font-display text-4xl font-semibold text-forest">
          {formatMoney(product.priceRange.minVariantPrice)}
        </p>

        <p className="mt-5 max-w-xl text-sm leading-6 text-muted">
          The complete product gallery, size selector, quantity control and
          add-to-cart functionality will be created in the product-page phase.
        </p>
      </Container>
    </main>
  );
}
