"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Money, ProductImage, ProductVariant } from "@/types/product";

export type StoredCartLine = {
  merchandiseId: string;
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  price: Money;
  image: ProductImage | null;
  quantity: number;
};

type CartContextValue = {
  lines: StoredCartLine[];
  totalQuantity: number;
  addLine: (line: Omit<StoredCartLine, "quantity">, quantity?: number) => void;
  updateLine: (merchandiseId: string, quantity: number) => void;
  removeLine: (merchandiseId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "rootly-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<StoredCartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) setLines(JSON.parse(stored) as StoredCartLine[]);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [hydrated, lines]);

  const addLine = useCallback((line: Omit<StoredCartLine, "quantity">, quantity = 1) => {
    setLines((current) => {
      const existing = current.find((item) => item.merchandiseId === line.merchandiseId);
      if (existing) {
        return current.map((item) => item.merchandiseId === line.merchandiseId ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item);
      }
      return [...current, { ...line, quantity: Math.max(1, quantity) }];
    });
  }, []);

  const updateLine = useCallback((merchandiseId: string, quantity: number) => {
    setLines((current) => quantity <= 0
      ? current.filter((item) => item.merchandiseId !== merchandiseId)
      : current.map((item) => item.merchandiseId === merchandiseId ? { ...item, quantity: Math.min(99, quantity) } : item));
  }, []);

  const value = useMemo(() => ({
    lines,
    totalQuantity: lines.reduce((total, line) => total + line.quantity, 0),
    addLine,
    updateLine,
    removeLine: (merchandiseId: string) => setLines((current) => current.filter((item) => item.merchandiseId !== merchandiseId)),
    clearCart: () => setLines([]),
  }), [addLine, lines, updateLine]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

export function lineFromVariant({
  productHandle,
  productTitle,
  image,
  variant,
}: {
  productHandle: string;
  productTitle: string;
  image: ProductImage | null;
  variant: ProductVariant;
}): Omit<StoredCartLine, "quantity"> {
  return {
    merchandiseId: variant.id,
    productHandle,
    productTitle,
    variantTitle: variant.title,
    price: variant.price,
    image,
  };
}
