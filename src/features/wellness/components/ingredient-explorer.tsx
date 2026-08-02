"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/types/product";

const ingredients = [
  { name: "Ashwagandha", key: "ashwagandha", copy: "A traditional botanical presented by ROOTLY as a focused single-ingredient powder. Refer to the product label and product page for usage and cautions." },
  { name: "Moringa", key: "moringa", copy: "A leaf powder that can be incorporated into familiar foods and drinks. ROOTLY keeps the format straightforward and easy to identify." },
  { name: "Beetroot", key: "beet", copy: "A familiar root ingredient used within ROOTLY’s Pulse blend. Explore the product details for the complete blend composition." },
  { name: "Pomegranate", key: "pomegranate", copy: "A fruit ingredient included in ROOTLY’s Pulse blend alongside other clearly named plant ingredients." },
];

export function IngredientExplorer({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const item = ingredients[active];
  const matches = products.filter((product) => `${product.title} ${product.description} ${product.tags.join(" ")}`.toLowerCase().includes(item.key)).slice(0, 3);

  return <div>
    <div role="tablist" aria-label="Ingredients" className="no-scrollbar flex overflow-x-auto border-b border-border">{ingredients.map((ingredient, index) => <button key={ingredient.key} id={`ingredient-tab-${ingredient.key}`} role="tab" aria-selected={active === index} aria-controls={`ingredient-panel-${ingredient.key}`} onClick={() => setActive(index)} className={`relative min-h-14 shrink-0 px-6 text-sm font-bold ${active === index ? "text-forest" : "text-muted"}`}>{ingredient.name}{active === index && <motion.span layoutId="ingredient-tab" className="absolute inset-x-3 bottom-0 h-0.5 bg-brand" />}</button>)}</div>
    <AnimatePresence mode="wait"><motion.section key={item.key} id={`ingredient-panel-${item.key}`} role="tabpanel" aria-labelledby={`ingredient-tab-${item.key}`} initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid gap-10 py-10 lg:grid-cols-[0.7fr_1.3fr] lg:py-14"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Ingredient focus</p><h2 className="mt-4 font-display text-5xl font-semibold text-forest sm:text-6xl">{item.name}</h2><p className="mt-6 text-base leading-8 text-muted">{item.copy}</p></div><div>{matches.length ? <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{matches.map((product) => <ProductCard product={product} key={product.id} />)}</div> : <div className="rounded-[2rem] border border-border bg-surface p-8 text-sm leading-7 text-muted">No currently loaded Shopify product includes this ingredient in its title, description, or tags.</div>}</div></motion.section></AnimatePresence>
  </div>;
}
