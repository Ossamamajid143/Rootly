import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { storefrontRoutes } from "@/config/navigation";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-dark py-20 text-white sm:py-28">
      <div className="editorial-grid absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="absolute -right-24 -top-32 size-[32rem] rounded-full border border-white/10" aria-hidden="true" />
      <Container className="relative">
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">Root your routine</p>
          <h2 className="mt-5 text-balance font-display text-5xl font-semibold leading-[0.94] text-white sm:text-6xl lg:text-7xl">Small rituals. Thoughtful ingredients. Your pace.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/72">Explore ROOTLY&apos;s focused collection of plant powders and blends, delivered to your door.</p>
          <ButtonLink href={storefrontRoutes.shop} variant="light" size="lg" className="mt-9 gap-2">Shop the collection <ArrowRight size={18} aria-hidden="true" /></ButtonLink>
        </ScrollReveal>
      </Container>
    </section>
  );
}
