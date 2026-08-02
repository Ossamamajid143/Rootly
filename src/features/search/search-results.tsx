"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/types/product";

export function SearchResults({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const reduceMotion = useReducedMotion();
  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return products.filter((product) => `${product.title} ${product.description} ${product.productType} ${product.tags.join(" ")}`.toLowerCase().includes(normalized));
  }, [products, query]);

  return <div>
    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="relative mx-auto max-w-3xl"><Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-brand" aria-hidden="true" /><label htmlFor="store-search" className="sr-only">Search the ROOTLY catalogue</label><input id="store-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products or ingredients" className="min-h-16 w-full rounded-full border border-border bg-surface pl-14 pr-14 text-base shadow-[var(--shadow-soft)] placeholder:text-muted/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20" />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full hover:bg-sand"><X size={18} aria-hidden="true" /></button>}</motion.div>
    <div className="mt-14" aria-live="polite">{query.trim() ? <>{matches.length ? <><p className="mb-8 text-sm text-muted">{matches.length} {matches.length === 1 ? "result" : "results"} for <strong className="text-foreground">“{query.trim()}”</strong></p><div className="grid gap-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3">{matches.map((product, index) => <motion.div key={product.id} initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : index * 0.04 }}><ProductCard product={product} /></motion.div>)}</div></> : <div className="rounded-[2rem] border border-border bg-surface p-10 text-center"><h2 className="font-display text-3xl font-semibold text-forest">No matches found.</h2><p className="mt-3 text-sm leading-6 text-muted">Try a product name, ingredient, or broader wellness term.</p></div>}</> : <div className="text-center text-sm text-muted">Start typing to explore the live Shopify catalogue.</div>}</div>
  </div>;
}
