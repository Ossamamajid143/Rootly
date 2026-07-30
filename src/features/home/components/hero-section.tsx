import {
  ArrowRight,
  Leaf,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const productTypes = [
  "Ashwagandha",
  "Beetroot",
  "Adaptogen blends",
];

export function HeroSection() {
  return (
    <section className="overflow-hidden border-b border-border">
      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:min-h-[calc(100svh-116px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            <Leaf size={15} strokeWidth={1.8} />

            Rooted in everyday wellness
          </div>

          <h1 className="font-display text-[clamp(3.6rem,7vw,7rem)] font-semibold leading-[0.84] tracking-[-0.035em] text-forest">
            Wellness that starts at the root.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Thoughtfully selected herbs, functional powders and plant-based
            blends made for simple everyday rituals.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href="/shop"
              size="lg"
              className="gap-2"
            >
              Shop all products

              <ArrowRight
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </ButtonLink>

            <ButtonLink
              href="/wellness-goals"
              variant="secondary"
              size="lg"
            >
              Shop by wellness goal
            </ButtonLink>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6 text-sm text-muted">
            <span>Herbs</span>
            <span aria-hidden="true">•</span>
            <span>Functional powders</span>
            <span aria-hidden="true">•</span>
            <span>Adaptogen blends</span>
          </div>
        </div>

        <div className="relative">
          <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] bg-forest p-7 text-background sm:min-h-[580px] sm:p-10">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 size-72 rounded-full border border-background/20"
            />

            <div
              aria-hidden="true"
              className="absolute -right-8 -top-8 size-72 rounded-full border border-background/10"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-28 -left-28 size-80 rounded-full bg-sage/35"
            />

            <div className="relative z-10 flex h-full min-h-[420px] flex-col sm:min-h-[500px]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/75">
                  ROOTLY Botanicals
                </p>

                <Sparkles
                  size={22}
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              </div>

              <div className="my-auto py-14">
                <p className="font-display text-5xl font-semibold leading-none sm:text-7xl">
                  Pure plants.
                  <br />
                  Purposeful
                  <br />
                  rituals.
                </p>

                <div className="mt-9 flex flex-wrap gap-2">
                  {productTypes.map((productType) => (
                    <span
                      key={productType}
                      className="rounded-full border border-background/30 bg-background/10 px-4 py-2 text-sm backdrop-blur"
                    >
                      {productType}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-background/25 pt-5">
                <p className="max-w-sm text-sm leading-6 text-background/75">
                  Plant-based products designed to fit naturally into your
                  everyday routine.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-4 -mt-6 w-fit rounded-2xl border border-border bg-surface px-5 py-4 shadow-sm sm:ml-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Naturally simple
            </p>

            <p className="mt-1 font-display text-xl font-semibold text-forest">
              Wellness without confusion
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
