import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { ProductGrid } from "@/features/products/components/product-grid";
import { getFeaturedProducts } from "@/lib/shopify";

export async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <Section>
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-[#87652f] uppercase">
              Everyday support
            </p>
            <Heading>Start with the essentials</Heading>
          </div>
          <Link
            className="hidden text-sm font-semibold underline-offset-4 hover:underline sm:block"
            href="/shop"
          >
            Shop all
          </Link>
        </div>
        {featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts} />
        ) : (
          <div className="border-y border-border py-10">
            <p className="text-sm leading-6 text-muted">
              No featured products are available right now.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
