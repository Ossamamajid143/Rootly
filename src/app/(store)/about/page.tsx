import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ButtonLink } from "@/components/ui/button";
import { productRoute, storefrontRoutes } from "@/config/navigation";
import { getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Learn about ROOTLY and our approach to plant-based wellness.",
};

export default async function AboutPage() {
  const products = await getProducts();
  const product1 = products[0];
  const product2 = products[1];

  return (
    <main>
      <PageIntro
        eyebrow="Our story"
        title="Wellness should feel natural, simple and honest."
        description="ROOTLY was created to make traditional herbs and plant-based ingredients easier to understand and include in everyday life."
      />
      <section className="py-16 sm:py-24">
        <Container className="space-y-20 sm:space-y-28">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <ScrollReveal direction="right" className="lg:pr-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">01 / Why ROOTLY</p>
              <h2 className="mt-5 text-balance font-display text-5xl font-semibold leading-[0.96] text-forest sm:text-6xl">Traditional plants, made easier to meet.</h2>
              <p className="mt-6 text-base leading-8 text-muted">ROOTLY was created to make traditional herbs and plant-based ingredients easier to understand and include in everyday life. The idea is deliberately simple: focused products, clear presentation and routines that can belong to real days.</p>
            </ScrollReveal>
            {product1?.featuredImage?.url ? (
              <ScrollReveal direction="left" className="relative aspect-[5/4] overflow-hidden rounded-[3rem_1rem_3rem_1rem] border border-border bg-sand">
                <Image
                  src={product1.featuredImage.url}
                  alt={product1.featuredImage.altText || product1.title}
                  fill
                  sizes="(max-width: 1023px) 100vw, 58vw"
                  className="object-contain p-8 sm:p-12"
                />
              </ScrollReveal>
            ) : (
              <ScrollReveal direction="left" className="flex aspect-[5/4] items-center justify-center rounded-[3rem_1rem_3rem_1rem] border border-border bg-sand p-8 text-center font-display text-2xl text-forest">
                ROOTLY Botanicals
              </ScrollReveal>
            )}
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            {product2?.featuredImage?.url ? (
              <ScrollReveal direction="right" className="relative aspect-[5/4] overflow-hidden rounded-[1rem_3rem_1rem_3rem] border border-border bg-sage/20 lg:order-1">
                <Image
                  src={product2.featuredImage.url}
                  alt={product2.featuredImage.altText || product2.title}
                  fill
                  sizes="(max-width: 1023px) 100vw, 58vw"
                  className="object-contain p-8 sm:p-12"
                />
              </ScrollReveal>
            ) : (
              <ScrollReveal direction="right" className="flex aspect-[5/4] items-center justify-center rounded-[1rem_3rem_1rem_3rem] border border-border bg-sage/20 p-8 text-center font-display text-2xl text-forest lg:order-1">
                Pure Plant Formulations
              </ScrollReveal>
            )}
            <ScrollReveal direction="left" className="lg:order-2 lg:pl-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">02 / Our approach</p>
              <h2 className="mt-5 text-balance font-display text-5xl font-semibold leading-[0.96] text-forest sm:text-6xl">Clarity before complexity.</h2>
              <p className="mt-6 text-base leading-8 text-muted">ROOTLY’s earthy identity reflects a grounded approach to wellbeing. We believe people should be able to see what a product is, understand how it fits, and decide whether it belongs in their routine—without exaggerated promises.</p>
              <ButtonLink href={storefrontRoutes.ingredients} variant="secondary" className="mt-8">Explore ingredients</ButtonLink>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
