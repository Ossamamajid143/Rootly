import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/features/products/components/product-card";
import { getFeaturedProducts } from "@/lib/shopify";
import { storefrontRoutes } from "@/config/navigation";

export async function FeaturedProductsSection() {
  const featuredProducts = await getFeaturedProducts(5);

  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          y={20}
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand sm:text-sm">
              Featured botanicals
            </p>

            <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.95] text-forest sm:text-6xl">
              The ROOTLY collection, in full view.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted">
              Explore some of ROOTLY’s foundational herbs, functional powders
              and plant-based blends.
            </p>
          </div>

          <ButtonLink
            href={storefrontRoutes.shop}
            variant="ghost"
            className="w-fit gap-2 px-0 hover:bg-transparent hover:text-brand"
          >
            View all products

            <ArrowRight
              size={18}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </ButtonLink>
        </Reveal>

        {featuredProducts.length > 0 ? (
          <div className="mt-12 grid gap-x-7 gap-y-16 md:grid-cols-2">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.075} y={22}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-12 border-y border-border py-10" y={20}>
            <p className="text-sm leading-6 text-muted">
              No featured products are available right now.
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
