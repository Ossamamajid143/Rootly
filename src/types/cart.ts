import type { Money, Product } from "@/types/product";

export type CartLine = {
  id: string;
  product: Product;
  quantity: number;
};

export type Cart = {
  id: string;
  lines: CartLine[];
  totalQuantity: number;
  subtotal: Money;
};
