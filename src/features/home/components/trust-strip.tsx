import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  Leaf,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";

interface TrustItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const trustItems: TrustItem[] = [
  {
    icon: Leaf,
    title: "Plant focused",
    description: "A focused range of herbs and plant-based powders.",
  },
  {
    icon: BookOpenCheck,
    title: "Ingredient clarity",
    description: "Straightforward ingredient and usage information.",
  },
  {
    icon: Sparkles,
    title: "Simple routines",
    description: "Wellness products made for uncomplicated daily use.",
  },
  {
    icon: MapPin,
    title: "Across Pakistan",
    description: "ROOTLY products delivered conveniently nationwide.",
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Why choose ROOTLY"
      className="border-y border-border bg-surface py-20 sm:py-28"
    >
      <Container>
        <Reveal className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Why ROOTLY</p>
          <h2 className="mt-4 text-balance font-display text-5xl font-semibold leading-[0.95] text-forest sm:text-6xl">Good routines start with clarity.</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.title}
                delay={index * 0.06}
                y={12}
                className={[
                  "h-full",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <article className="group flex h-full min-h-64 flex-col rounded-[1.75rem] border border-border bg-background p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-[1.1rem] bg-sand text-brand transition-transform duration-300 group-hover:scale-105">
                    <Icon
                      size={20}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-auto pt-10">
                    <h3 className="font-display text-2xl font-semibold text-forest">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
