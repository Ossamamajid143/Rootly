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
      className="border-b border-border bg-surface"
    >
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.title}
                delay={index * 0.06}
                y={12}
                className={[
                  "py-7 sm:px-6 lg:py-9",
                  index === 0 ? "sm:pl-0" : "",
                  index !== trustItems.length - 1
                    ? "lg:border-r lg:border-border"
                    : "",
                  index === trustItems.length - 1
                    ? "lg:pr-0"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <article className="flex h-full gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sand text-brand">
                    <Icon
                      size={20}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h2 className="font-sans text-sm font-bold text-foreground">
                      {item.title}
                    </h2>

                    <p className="mt-1 max-w-[240px] text-sm leading-6 text-muted">
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
