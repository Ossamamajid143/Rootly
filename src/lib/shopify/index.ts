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
import { cartCreateMutation } from "@/lib/shopify/mutations/cart";
import {
  customerCreateMutation,
  customerAccessTokenCreateMutation,
  customerAccessTokenDeleteMutation,
} from "@/lib/shopify/mutations/customer";
import { customerQuery } from "@/lib/shopify/queries/customer";

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

export async function createShopifyCheckout(
  lines: Array<{ merchandiseId: string; quantity: number }>,
  buyerIdentity?: { customerAccessToken?: string; email?: string }
) {
  if (!isShopifyConfigured()) {
    throw new Error("Shopify checkout is not configured.");
  }

  const identity = buyerIdentity?.customerAccessToken || buyerIdentity?.email ? buyerIdentity : undefined;

  const data = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; totalQuantity: number; checkoutUrl: string } | null;
      userErrors: Array<{ message: string }>;
    };
  }, {
    lines: Array<{ merchandiseId: string; quantity: number }>;
    buyerIdentity?: { customerAccessToken?: string; email?: string };
  }>({
    query: cartCreateMutation,
    variables: { lines, buyerIdentity: identity },
    revalidate: 0,
  });

  if (data.cartCreate.userErrors.length || !data.cartCreate.cart) {
    throw new Error(data.cartCreate.userErrors[0]?.message || "Unable to create Shopify checkout.");
  }

  return data.cartCreate.cart;
}

export interface CustomerAuthResult {
  customer?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    acceptsMarketing?: boolean;
  };
  accessToken?: string;
  expiresAt?: string;
  error?: string;
}

export async function createCustomerAccount(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  acceptsMarketing?: boolean;
}): Promise<CustomerAuthResult> {
  if (!isShopifyConfigured()) {
    throw new Error("Shopify is not configured.");
  }

  // 1. Create Customer
  const createData = await shopifyFetch<{
    customerCreate: {
      customer: {
        id: string;
        email: string;
        firstName?: string;
        lastName?: string;
        displayName?: string;
        acceptsMarketing?: boolean;
      } | null;
      customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
    };
  }, { input: typeof input }>({
    query: customerCreateMutation,
    variables: { input },
    revalidate: 0,
  });

  if (createData.customerCreate.customerUserErrors.length) {
    return {
      error: createData.customerCreate.customerUserErrors[0].message,
    };
  }

  // 2. Generate Access Token immediately
  const tokenResult = await loginCustomer(input.email, input.password);
  return {
    customer: createData.customerCreate.customer || undefined,
    accessToken: tokenResult.accessToken,
    expiresAt: tokenResult.expiresAt,
    error: tokenResult.error,
  };
}

export async function loginCustomer(
  email: string,
  password: string
): Promise<CustomerAuthResult> {
  if (!isShopifyConfigured()) {
    throw new Error("Shopify is not configured.");
  }

  const tokenData = await shopifyFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: {
        accessToken: string;
        expiresAt: string;
      } | null;
      customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
    };
  }, { input: { email: string; password: string } }>({
    query: customerAccessTokenCreateMutation,
    variables: { input: { email, password } },
    revalidate: 0,
  });

  if (tokenData.customerAccessTokenCreate.customerUserErrors.length) {
    return {
      error: tokenData.customerAccessTokenCreate.customerUserErrors[0].message,
    };
  }

  const token = tokenData.customerAccessTokenCreate.customerAccessToken;
  if (!token) {
    return { error: "Failed to generate customer token." };
  }

  // Fetch customer details with this token
  const customerDetails = await getCustomerDetails(token.accessToken);

  return {
    customer: customerDetails.customer || undefined,
    accessToken: token.accessToken,
    expiresAt: token.expiresAt,
  };
}

export async function getCustomerDetails(customerAccessToken: string) {
  if (!isShopifyConfigured()) {
    return { customer: null };
  }

  try {
    const data = await shopifyFetch<{
      customer: {
        id: string;
        firstName?: string;
        lastName?: string;
        displayName?: string;
        email: string;
        phone?: string;
        acceptsMarketing?: boolean;
        orders?: {
          edges: Array<{
            node: {
              id: string;
              name: string;
              orderNumber: number;
              processedAt: string;
              financialStatus: string;
              fulfillmentStatus: string;
              totalPrice: {
                amount: string;
                currencyCode: string;
              };
              lineItems: {
                edges: Array<{
                  node: {
                    title: string;
                    quantity: number;
                  };
                }>;
              };
            };
          }>;
        };
      } | null;
    }, { customerAccessToken: string }>({
      query: customerQuery,
      variables: { customerAccessToken },
      revalidate: 0,
    });

    return { customer: data.customer };
  } catch (error) {
    console.error("Failed to query customer details:", error);
    return { customer: null };
  }
}

export async function logoutCustomer(customerAccessToken: string) {
  if (!isShopifyConfigured()) return;
  try {
    await shopifyFetch({
      query: customerAccessTokenDeleteMutation,
      variables: { customerAccessToken },
      revalidate: 0,
    });
  } catch (error) {
    console.error("Failed to delete customer access token:", error);
  }
}
