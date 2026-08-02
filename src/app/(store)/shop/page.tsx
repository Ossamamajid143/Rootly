import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { ShopCatalog } from "@/features/shop/components/shop-catalog";
import { getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore ROOTLY herbs, powders and adaptogen blends.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main>
      <PageIntro
        eyebrow="Our collection"
        title="Plant-powered products for everyday rituals."
        description="Explore thoughtfully selected herbs, functional powders and adaptogen blends."
      />
      <Section className="pt-12 sm:pt-16">
        <Container>
          {products.length > 0 ? (
            <ShopCatalog products={products} />
          ) : (
            <div className="border-y border-border py-12">
              <h2 className="font-display text-3xl font-semibold text-forest">
                No products are available right now.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
                Please check back soon for the ROOTLY collection.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
