import type { Product } from "@/types/product";

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  products: Product[];
};
