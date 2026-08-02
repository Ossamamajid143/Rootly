"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/types/product";

type SortValue = "featured" | "price-asc" | "price-desc" | "name";

export function ShopCatalog({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [category, setCategory] = useState(params.get("category") || "all");
  const [price, setPrice] = useState(params.get("price") || "all");
  const [sort, setSort] = useState<SortValue>((params.get("sort") as SortValue) || "featured");
  const categories = useMemo(() => ["all", ...Array.from(new Set(products.map((product) => product.productType).filter(Boolean)))], [products]);
  const amounts = products.map((product) => Number(product.priceRange.minVariantPrice.amount)).filter(Number.isFinite);
  const midpoint = amounts.length ? (Math.min(...amounts) + Math.max(...amounts)) / 2 : 0;

  useEffect(() => {
    const next = new URLSearchParams();
    if (category !== "all") next.set("category", category);
    if (price !== "all") next.set("price", price);
    if (sort !== "featured") next.set("sort", sort);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [category, pathname, price, router, sort]);

  useEffect(() => {
    if (!drawerOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => event.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = original; window.removeEventListener("keydown", close); };
  }, [drawerOpen]);

  const visible = useMemo(() => products
    .filter((product) => category === "all" || product.productType === category)
    .filter((product) => {
      const amount = Number(product.priceRange.minVariantPrice.amount);
      if (price === "low") return amount <= midpoint;
      if (price === "high") return amount > midpoint;
      return true;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return Number(a.priceRange.minVariantPrice.amount) - Number(b.priceRange.minVariantPrice.amount);
      if (sort === "price-desc") return Number(b.priceRange.minVariantPrice.amount) - Number(a.priceRange.minVariantPrice.amount);
      if (sort === "name") return a.title.localeCompare(b.title);
      return 0;
    }), [category, midpoint, price, products, sort]);

  const filters = (
    <div className="space-y-9">
      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Category</legend>
        <div className="mt-4 space-y-2">
          {categories.map((item) => <label key={item} className="flex cursor-pointer items-center gap-3 py-1.5 text-sm"><input type="radio" name="category" checked={category === item} onChange={() => setCategory(item)} className="size-4 accent-[var(--brand)]" /><span>{item === "all" ? "All products" : item}</span></label>)}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Price</legend>
        <div className="mt-4 space-y-2">
          {[{ value: "all", label: "Any price" }, { value: "low", label: "Lower half" }, { value: "high", label: "Upper half" }].map((item) => <label key={item.value} className="flex cursor-pointer items-center gap-3 py-1.5 text-sm"><input type="radio" name="price" checked={price === item.value} onChange={() => setPrice(item.value)} className="size-4 accent-[var(--brand)]" /><span>{item.label}</span></label>)}
        </div>
      </fieldset>
      <button type="button" className="text-sm font-bold text-brand underline underline-offset-4" onClick={() => { setCategory("all"); setPrice("all"); setSort("featured"); }}>Clear filters</button>
    </div>
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <p className="text-sm text-muted"><strong className="text-foreground tabular-nums">{visible.length}</strong> {visible.length === 1 ? "product" : "products"}</p>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setDrawerOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-bold lg:hidden"><SlidersHorizontal size={17} aria-hidden="true" /> Filters</button>
          <label className="flex items-center gap-3 text-sm"><span className="hidden text-muted sm:inline">Sort</span><select value={sort} onChange={(event) => setSort(event.target.value as SortValue)} className="min-h-11 rounded-full border border-border bg-surface px-4 pr-9"><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name</option></select></label>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[230px_1fr]">
        <aside className="hidden border-r border-border pr-8 lg:block" aria-label="Shop filters">{filters}</aside>
        <motion.div layout={!reduceMotion} className="grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((product) => <motion.div layout={!reduceMotion} key={product.id} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}><ProductCard product={product} /></motion.div>)}
          </AnimatePresence>
          {!visible.length && <p className="col-span-full rounded-[1.5rem] border border-border bg-surface p-8 text-muted">No products match those filters.</p>}
        </motion.div>
      </div>

      <AnimatePresence>
        {drawerOpen && <div className="fixed inset-0 z-[100] lg:hidden"><motion.button type="button" aria-label="Close filters" onClick={() => setDrawerOpen(false)} className="absolute inset-0 bg-foreground/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside role="dialog" aria-modal="true" aria-label="Product filters" className="absolute inset-y-0 right-0 w-[min(90%,390px)] overflow-y-auto bg-background p-6" initial={reduceMotion ? { opacity: 0 } : { x: "100%" }} animate={{ x: 0, opacity: 1 }} exit={reduceMotion ? { opacity: 0 } : { x: "100%" }} transition={{ duration: reduceMotion ? 0.01 : 0.35 }}><div className="mb-9 flex items-center justify-between"><h2 className="font-display text-3xl font-semibold text-forest">Filter products</h2><button type="button" aria-label="Close filters" onClick={() => setDrawerOpen(false)} className="grid size-11 place-items-center rounded-full border border-border"><X aria-hidden="true" /></button></div>{filters}<button type="button" onClick={() => setDrawerOpen(false)} className="mt-10 min-h-12 w-full rounded-full bg-forest px-6 font-bold text-white">View {visible.length} products</button></motion.aside></div>}
      </AnimatePresence>
    </div>
  );
}
