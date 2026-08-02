"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { wellnessGoals } from "@/config/wellness-goals";
import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/types/product";

const productKeywords: Record<string, string[]> = {
  "energy-stamina": ["pulse", "moringa", "balance"],
  "stress-calm": ["ease", "ashwagandha", "balance"],
  digestion: ["balance", "moringa"],
  immunity: ["moringa", "ashwagandha"],
  "hair-skin": ["moringa", "balance"],
  "healthy-weight": ["balance", "moringa"],
};

export function WellnessExplorer({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const goal = wellnessGoals[active];
  const matches = products.filter((product) => {
    const haystack = `${product.handle} ${product.title} ${product.tags.join(" ")}`.toLowerCase();
    return product.tags.includes(goal.handle) || productKeywords[goal.handle]?.some((keyword) => haystack.includes(keyword));
  }).slice(0, 3);

  return <div>
    <div role="tablist" aria-label="Wellness goals" className="no-scrollbar flex overflow-x-auto border-b border-border">
      {wellnessGoals.map((item, index) => <button id={`goal-tab-${item.handle}`} key={item.handle} type="button" role="tab" aria-selected={active === index} aria-controls={`goal-panel-${item.handle}`} onClick={() => setActive(index)} className={`relative min-h-14 shrink-0 px-5 text-sm font-bold ${active === index ? "text-forest" : "text-muted"}`}>{item.title}{active === index && <motion.span layoutId="wellness-tab" className="absolute inset-x-2 bottom-0 h-0.5 bg-brand" />}</button>)}
    </div>
    <AnimatePresence mode="wait">
      <motion.section key={goal.handle} id={`goal-panel-${goal.handle}`} role="tabpanel" aria-labelledby={`goal-tab-${goal.handle}`} initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid gap-10 py-10 lg:grid-cols-[0.7fr_1.3fr] lg:py-14">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Selected goal</p><h2 className="mt-4 font-display text-5xl font-semibold leading-[0.96] text-forest sm:text-6xl">{goal.title}</h2><p className="mt-6 text-base leading-8 text-muted">{goal.description}</p><p className="mt-5 text-xs leading-6 text-muted">These categories are for product discovery and general wellbeing only; they are not medical advice.</p></div>
        <div>{matches.length > 0 ? <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{matches.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-[2rem] border border-border bg-surface p-8 text-sm leading-7 text-muted">No Shopify products are tagged for this goal yet. The section stays intentionally empty rather than suggesting an unrelated product.</div>}</div>
      </motion.section>
    </AnimatePresence>
  </div>;
}
