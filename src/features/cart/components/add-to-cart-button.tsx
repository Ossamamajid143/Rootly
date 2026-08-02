"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lineFromVariant, useCart } from "@/features/cart/cart-provider";
import type { Product } from "@/types/product";

export function AddToCartButton({ product, quantity = 1, className }: { product: Product; quantity?: number; className?: string }) {
  const { addLine } = useCart();
  const [added, setAdded] = useState(false);
  const variant = product.variants.find((item) => item.availableForSale) ?? product.variants[0];
  const disabled = !product.availableForSale || !variant;

  return (
    <Button
      disabled={disabled}
      className={className}
      onClick={() => {
        if (!variant) return;
        addLine(lineFromVariant({ productHandle: product.handle, productTitle: product.title, image: product.featuredImage, variant }), quantity);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
    >
      {added ? <Check size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
      {disabled ? "Unavailable" : added ? "Added to bag" : "Quick add"}
    </Button>
  );
}
