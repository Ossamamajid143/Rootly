import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { AnimatedHeroCopy } from "@/features/home/components/animated-hero-copy";
import {
  HeroProductStage,
  type HeroSlide,
} from "@/features/home/components/hero-product-stage";
import { getFeaturedProducts } from "@/lib/shopify";

export const localProductSlides: HeroSlide[] = [
  {
    id: "ashwagandha-powder",
    title: "Ashwagandha Powder",
    subtitle: "Herbal powder · 150g",
    image: {
      url: "/images/products/Ashwaganda.jpeg",
      altText: "ROOTLY Ashwagandha dehydrated superfood powder pouch",
    },
    href: "/products/ashwagandha-powder",
  },
  {
    id: "balance-blend",
    title: "Balance Blend",
    subtitle: "Plant-based blend · 165g",
    image: {
      url: "/images/products/Balance.jpeg",
      altText: "ROOTLY Balance plant-based blend pouch",
    },
    href: "/products/balance-blend",
  },
  {
    id: "ease-blend",
    title: "Ease Blend",
    subtitle: "Plant-based blend · 120g",
    image: {
      url: "/images/products/Ease.jpeg",
      altText: "ROOTLY Ease plant-based blend pouch",
    },
    href: "/products/ease-blend",
  },
  {
    id: "moringa-powder",
    title: "Moringa Powder",
    subtitle: "Herbal powder · 120g",
    image: {
      url: "/images/products/Moringa.jpeg",
      altText: "ROOTLY Moringa dehydrated superfood powder pouch",
    },
    href: "/products/moringa-powder",
  },
  {
    id: "pulse-blend",
    title: "Pulse Blend",
    subtitle: "Functional blend · 150g",
    image: {
      url: "/images/products/Pulse.jpeg",
      altText: "ROOTLY Pulse beetroot, pomegranate and cinnamon blend pouch",
    },
    href: "/products/pulse-blend",
  },
];

export async function HeroSection() {
  const featuredProducts = await getFeaturedProducts(5);
  const shopifySlides = featuredProducts.flatMap<HeroSlide>((product) =>
    product.featuredImage
      ? [
          {
            id: product.id,
            title: product.title,
            subtitle: product.productType || undefined,
            image: {
              url: product.featuredImage.url,
              altText: product.featuredImage.altText || product.title,
            },
            href: `/products/${product.handle}`,
          },
        ]
      : [],
  );
  const slides = shopifySlides.length > 0 ? shopifySlides : localProductSlides;

  return (
    <section className="editorial-grid relative isolate overflow-hidden border-b border-border bg-[radial-gradient(circle_at_78%_43%,rgba(124,137,109,0.24),transparent_31%),radial-gradient(circle_at_66%_18%,rgba(231,218,197,0.82),transparent_27%)]">
      <div
        aria-hidden="true"
        className="absolute -right-20 top-10 hidden size-80 rounded-full border border-brand/10 opacity-60 sm:block lg:right-[4%] lg:size-96"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[7%] right-[38%] hidden size-3 rounded-full bg-brand/20 lg:block"
      />
      <Container className="relative grid min-h-[calc(100svh-108px)] items-center gap-7 py-9 sm:py-12 md:gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-10 lg:py-12 xl:gap-14">
        <AnimatedHeroCopy />

        <Reveal className="min-w-0 w-full" delay={0.18} y={16}>
          <HeroProductStage slides={slides} />
        </Reveal>
      </Container>
    </section>
  );
}
