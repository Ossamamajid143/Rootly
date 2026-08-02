"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { storefrontRoutes } from "@/config/navigation";

const ingredients = [
  { name: "Ashwagandha", image: "Ashwaganda.jpeg", eyebrow: "A focused single ingredient", copy: "ROOTLY’s Ashwagandha Powder keeps the format straightforward, making the ingredient easy to understand and simple to add to an established routine." },
  { name: "Moringa", image: "Moringa.jpeg", eyebrow: "A nutrient-rich leaf powder", copy: "Moringa is presented as a versatile plant powder. Explore the product page for ROOTLY’s own ingredient, usage, and caution information." },
  { name: "Beetroot blend", image: "Pulse.jpeg", eyebrow: "Plants working together", copy: "Pulse combines familiar plant ingredients in one measured blend, designed for a convenient and consistent everyday ritual." },
];

export function IngredientCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const select = (next: number) => {
    setDirection(next > active ? 1 : -1);
    setActive((next + ingredients.length) % ingredients.length);
  };
  const item = ingredients[active];

  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Ingredient notes</p>
            <h2 className="mt-4 text-balance font-display text-5xl font-semibold leading-[0.95] text-forest sm:text-6xl">Know what makes the ritual.</h2>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => select(active - 1)} aria-label="Previous ingredient" className="grid size-12 place-items-center rounded-full border border-forest text-forest transition hover:bg-forest hover:text-white"><ChevronLeft aria-hidden="true" /></button>
            <button type="button" onClick={() => select(active + 1)} aria-label="Next ingredient" className="grid size-12 place-items-center rounded-full bg-forest text-white transition hover:bg-brand"><ChevronRight aria-hidden="true" /></button>
          </div>
        </div>

        <div role="region" aria-label="Ingredient education carousel" aria-roledescription="carousel" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowRight") select(active + 1); if (event.key === "ArrowLeft") select(active - 1); }} className="mt-12 overflow-hidden rounded-[2.5rem] border border-border bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={item.name}
              custom={direction}
              initial={reduceMotion ? false : { opacity: 0, x: direction * 44 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -44 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.45 }}
              drag={reduceMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.06}
              onDragEnd={(_, info) => { if (info.offset.x < -50) select(active + 1); if (info.offset.x > 50) select(active - 1); }}
              className="grid min-h-[520px] md:grid-cols-2"
            >
              <div className="relative min-h-[360px] bg-sand md:min-h-0">
                <Image src={`/images/products/${item.image}`} alt={`ROOTLY product featuring ${item.name}`} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-contain p-7 sm:p-12" />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{item.eyebrow}</p>
                <h3 className="mt-5 font-display text-5xl font-semibold text-forest sm:text-6xl">{item.name}</h3>
                <p className="mt-6 max-w-lg text-base leading-8 text-muted">{item.copy}</p>
                <Link href={storefrontRoutes.ingredients} className="mt-8 w-fit border-b border-brand pb-1 text-sm font-bold text-brand">Explore ingredients</Link>
              </div>
            </motion.article>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-2 border-t border-border py-4">
            {ingredients.map((ingredient, index) => <button key={ingredient.name} type="button" onClick={() => select(index)} aria-label={`Show ${ingredient.name}`} aria-current={active === index ? "true" : undefined} className="grid size-9 place-items-center rounded-full"><span className={`h-1.5 rounded-full transition-all ${active === index ? "w-7 bg-brand" : "w-1.5 bg-border"}`} /></button>)}
          </div>
        </div>
      </Container>
    </section>
  );
}
