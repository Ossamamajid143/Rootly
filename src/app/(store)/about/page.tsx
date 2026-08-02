import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Learn about ROOTLY and our approach to plant-based wellness.",
};

export default function AboutPage() {
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
            <ScrollReveal direction="left" className="relative aspect-[5/4] overflow-hidden rounded-[3rem_1rem_3rem_1rem] border border-border bg-sand"><Image src="/images/products/Balance.jpeg" alt="ROOTLY Balance plant-based blend" fill sizes="(max-width: 1023px) 100vw, 58vw" className="object-contain p-8 sm:p-12" /></ScrollReveal>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <ScrollReveal direction="right" className="relative aspect-[5/4] overflow-hidden rounded-[1rem_3rem_1rem_3rem] border border-border bg-sage/20 lg:order-1"><Image src="/images/products/Ashwaganda.jpeg" alt="ROOTLY Ashwagandha Powder" fill sizes="(max-width: 1023px) 100vw, 58vw" className="object-contain p-8 sm:p-12" /></ScrollReveal>
            <ScrollReveal direction="left" className="lg:order-2 lg:pl-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">02 / Our approach</p><h2 className="mt-5 text-balance font-display text-5xl font-semibold leading-[0.96] text-forest sm:text-6xl">Clarity before complexity.</h2><p className="mt-6 text-base leading-8 text-muted">ROOTLY’s earthy identity reflects a grounded approach to wellbeing. We believe people should be able to see what a product is, understand how it fits, and decide whether it belongs in their routine—without exaggerated promises.</p><ButtonLink href="/ingredients" variant="secondary" className="mt-8">Explore ingredients</ButtonLink></ScrollReveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
