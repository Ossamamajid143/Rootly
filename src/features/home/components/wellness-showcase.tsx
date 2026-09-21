"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { wellnessGoals } from "@/config/wellness-goals";
import { wellnessGoalRoute } from "@/config/navigation";
import type { Product } from "@/types/product";

interface WellnessShowcaseProps {
  products?: Product[];
}

export function WellnessShowcase({ products = [] }: WellnessShowcaseProps) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const goal = wellnessGoals[active];

  // Match a Shopify product by title/description or cycle through available Shopify products
  const activeProduct =
    products.find((p) =>
      `${p.title} ${p.tags.join(" ")} ${p.description}`.toLowerCase().includes(goal.title.toLowerCase())
    ) || (products.length > 0 ? products[active % products.length] : null);

  const imageUrl = activeProduct?.featuredImage?.url;
  const imageAlt = activeProduct?.featuredImage?.altText || activeProduct?.title || goal.title;

  return (
    <section className="overflow-hidden bg-[#ede4d5] py-20 sm:py-28">
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Find your starting point</p>
            <h2 className="mt-4 text-balance font-display text-5xl font-semibold leading-[0.94] text-forest sm:text-6xl lg:text-7xl">Shop by wellness goal.</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted">Wellness is personal. Use these themes to explore products, then choose a ritual that feels realistic for you.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] bg-sage/25 max-lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={goal.handle}
                className="absolute inset-0"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.45 }}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    sizes="55vw"
                    className="object-contain p-12 sm:p-16"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-forest/80 via-forest/60 to-brand/40" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/30 to-transparent" />
                <div className="absolute inset-x-8 bottom-8 text-white">
                  <p className="max-w-xl font-display text-4xl font-semibold text-white">{goal.title}</p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">{goal.description}</p>
                  {activeProduct && (
                    <p className="mt-3 text-xs font-semibold tracking-wider uppercase text-sand">
                      Featured: {activeProduct.title}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2 lg:block lg:overflow-visible">
            {wellnessGoals.map((item, index) => (
              <Link
                href={wellnessGoalRoute(item.handle)}
                key={item.handle}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                aria-label={`Explore ${item.title}`}
                className={`group min-w-[82vw] snap-center rounded-[1.5rem] border p-5 text-left transition-[background-color,border-color,transform] duration-300 sm:min-w-[55vw] lg:flex lg:min-w-0 lg:items-center lg:gap-6 lg:rounded-none lg:border-x-0 lg:border-t-0 lg:px-0 lg:py-5 ${active === index ? "border-forest bg-forest text-white lg:bg-transparent lg:text-forest" : "border-border bg-background text-foreground lg:bg-transparent"}`}
              >
                <span className={`text-xs font-bold tabular-nums ${active === index ? "text-sand lg:text-brand" : "text-brand"}`}>{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-7 block lg:mt-0 lg:flex-1">
                  <span className="block font-display text-3xl font-semibold leading-none">{item.title}</span>
                  <span className={`mt-3 block text-sm leading-6 lg:hidden ${active === index ? "text-white/72" : "text-muted"}`}>{item.description}</span>
                </span>
                <ArrowUpRight className="mt-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 lg:mt-0" size={20} aria-hidden="true" />
              </Link>
            ))}
            <Link href={wellnessGoalRoute(goal.handle)} className="hidden min-h-12 items-center justify-center rounded-full bg-brand px-7 text-sm font-semibold text-white transition hover:bg-brand-dark lg:mt-7 lg:inline-flex">Explore selected goal</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
