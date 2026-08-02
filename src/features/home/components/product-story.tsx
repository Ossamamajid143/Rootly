import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OrganicDivider } from "@/components/ui/organic-divider";
import { storefrontRoutes } from "@/config/navigation";

export function ProductStory() {
  return (
    <section className="relative bg-forest text-white">
      <OrganicDivider />
      <Container className="grid min-h-[82svh] items-center gap-12 py-16 md:grid-cols-2 md:py-24 lg:gap-20">
        <ScrollReveal direction="right" className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">Ancient plants, modern rhythm</p>
          <h2 className="mt-5 text-balance font-display text-5xl font-semibold leading-[0.94] text-white sm:text-6xl lg:text-7xl">
            A simpler way to bring botanicals into your day.
          </h2>
          <p className="mt-7 max-w-lg text-base leading-8 text-white/72 sm:text-lg">
            ROOTLY brings focused herbal powders and thoughtful blends into clear, repeatable routines. Pick your ritual, understand what is inside, and make it your own.
          </p>
          <ButtonLink href={storefrontRoutes.about} variant="secondary" className="mt-8 gap-2 border-sand text-white hover:bg-white/10">
            Our approach <ArrowRight size={17} aria-hidden="true" />
          </ButtonLink>
        </ScrollReveal>

        <ScrollReveal direction="left">
          <ParallaxMedia className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-[3rem_1rem_3rem_1rem] border border-white/15 bg-sand shadow-[0_30px_90px_rgba(0,0,0,0.26)]">
            <Image
              src="/images/products/Moringa.jpeg"
              alt="ROOTLY Moringa powder pouch"
              fill
              sizes="(max-width: 767px) 92vw, 48vw"
              className="object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-[1.4rem] bg-forest/88 p-5 backdrop-blur-md sm:inset-x-7 sm:bottom-7">
              <p className="font-display text-2xl font-semibold text-white">One plant. Many possible rituals.</p>
              <p className="mt-1 text-sm text-white/68">Smoothies, breakfast bowls, or the routine that works for you.</p>
            </div>
          </ParallaxMedia>
        </ScrollReveal>
      </Container>
    </section>
  );
}
