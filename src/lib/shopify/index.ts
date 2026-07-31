import "server-only";

import {
  isShopifyConfigured,
  shopifyFetch,
} from "@/lib/shopify/client";
import { mapShopifyProduct } from "@/lib/shopify/mappers/product";
import {
  collectionByHandleQuery,
  featuredProductsQuery,
} from "@/lib/shopify/queries/collections";
import { productByHandleQuery } from "@/lib/shopify/queries/product";
import { productsQuery } from "@/lib/shopify/queries/products";
import type {
  ShopifyCollectionResult,
  ShopifyFeaturedCollectionResult,
  ShopifyProductConnection,
  ShopifyProductResult,
} from "@/lib/shopify/types";
import type { Collection } from "@/types/collection";
import type { Product } from "@/types/product";

const CATALOG_REVALIDATE_SECONDS = 300;

export async function getProducts(): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    return [];
  }

  const data = await shopifyFetch<
    ShopifyProductConnection,
    { first: number }
  >({
    query: productsQuery,
    variables: { first: 100 },
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: ["shopify-products"],
  });

  return data.products.nodes.map(mapShopifyProduct);
}

export async function getFeaturedProducts(first = 3): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    return [];
  }

  const data = await shopifyFetch<
    ShopifyFeaturedCollectionResult,
    { handle: string; first: number }
  >({
    query: featuredProductsQuery,
    variables: { handle: "featured-products", first },
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: ["shopify-featured-products"],
  });

  return data.collection?.products.nodes.map(mapShopifyProduct) ?? [];
}

export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  if (!isShopifyConfigured()) {
    return null;
  }

  const data = await shopifyFetch<
    ShopifyProductResult,
    { handle: string }
  >({
    query: productByHandleQuery,
    variables: { handle },
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [`shopify-product-${handle}`],
  });

  return data.product ? mapShopifyProduct(data.product) : null;
}

export async function getCollectionByHandle(
  handle: string,
): Promise<Collection | null> {
  if (!isShopifyConfigured()) {
    return null;
  }

  const data = await shopifyFetch<
    ShopifyCollectionResult,
    { handle: string; first: number }
  >({
    query: collectionByHandleQuery,
    variables: { handle, first: 100 },
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [`shopify-collection-${handle}`],
  });

  if (!data.collection) {
    return null;
  }

  return {
    ...data.collection,
    products: data.collection.products.nodes.map(mapShopifyProduct),
  };
}
