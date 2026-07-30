import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { ProductGrid } from "@/features/products/components/product-grid";
import { featuredProducts } from "@/mocks/products";

export function FeaturedProducts() {
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
        <ProductGrid products={featuredProducts} />
      </Container>
    </Section>
  );
}
