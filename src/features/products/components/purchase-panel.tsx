"use client";

import { useMemo, useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import { Button } from "@/components/ui/button";
import { lineFromVariant, useCart } from "@/features/cart/cart-provider";
import type { Product } from "@/types/product";

export function PurchasePanel({ product }: { product: Product }) {
  const defaultVariant = product.variants.find((variant) => variant.availableForSale) ?? product.variants[0];
  const [variantId, setVariantId] = useState(defaultVariant?.id || "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addLine } = useCart();
  const variant = useMemo(() => product.variants.find((item) => item.id === variantId) ?? defaultVariant, [defaultVariant, product.variants, variantId]);

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{product.productType || "ROOTLY botanical"}</p>
      <h1 className="mt-4 text-balance font-display text-5xl font-semibold leading-[0.94] text-forest sm:text-6xl">{product.title}</h1>
      <div className="mt-5 flex items-center justify-between gap-5">
        <p className="font-display text-3xl font-semibold text-forest">{formatMoney(variant?.price ?? product.priceRange.minVariantPrice)}</p>
        <p className={`rounded-full px-3 py-1.5 text-xs font-bold ${variant?.availableForSale ? "bg-sage/20 text-forest" : "bg-sand text-brand-dark"}`}>{variant?.availableForSale ? "In stock" : "Unavailable"}</p>
      </div>
      {product.description && <p className="mt-6 text-base leading-8 text-muted">{product.description}</p>}

      {product.variants.length > 1 && <label className="mt-8 block"><span className="text-xs font-bold uppercase tracking-[0.16em] text-foreground">Choose option</span><select value={variantId} onChange={(event) => setVariantId(event.target.value)} className="mt-3 min-h-12 w-full rounded-2xl border border-border bg-surface px-4">{product.variants.map((item) => <option key={item.id} value={item.id} disabled={!item.availableForSale}>{item.title}{!item.availableForSale ? " — unavailable" : ""}</option>)}</select></label>}

      <div className="mt-7 grid grid-cols-[auto_1fr] gap-3">
        <div className="flex min-h-14 items-center rounded-full border border-border bg-surface" aria-label="Quantity selector"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="grid size-12 place-items-center"><Minus size={17} aria-hidden="true" /></button><span className="w-8 text-center font-bold tabular-nums" aria-live="polite">{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(99, value + 1))} className="grid size-12 place-items-center"><Plus size={17} aria-hidden="true" /></button></div>
        <Button size="lg" disabled={!variant?.availableForSale} className="gap-2 bg-forest text-white hover:bg-brand" onClick={() => { if (!variant) return; addLine(lineFromVariant({ productHandle: product.handle, productTitle: product.title, image: product.featuredImage, variant }), quantity); setAdded(true); window.setTimeout(() => setAdded(false), 1800); }}>{added ? <Check size={19} aria-hidden="true" /> : <ShoppingBag size={19} aria-hidden="true" />}{added ? "Added to bag" : "Add to bag"}</Button>
      </div>
      <p className="mt-4 text-center text-xs leading-5 text-muted">Secure checkout is completed through Shopify.</p>
    </div>
  );
}
