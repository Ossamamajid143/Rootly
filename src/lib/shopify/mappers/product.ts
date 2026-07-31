import type { ShopifyProduct } from "@/lib/shopify/types";
import type { Product } from "@/types/product";

export function mapShopifyProduct(product: ShopifyProduct): Product {
  return {
    ...product,
    images: product.images.nodes,
    variants: product.variants.nodes,
  };
}
