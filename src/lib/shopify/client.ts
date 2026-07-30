type ShopifyRequestOptions<TVariables> = {
  query: string;
  variables?: TVariables;
};

type ShopifyResponse<TData> = {
  data?: TData;
  errors?: Array<{ message: string }>;
};

export async function shopifyFetch<
  TData,
  TVariables extends Record<string, unknown> = Record<string, never>,
>({ query, variables }: ShopifyRequestOptions<TVariables>): Promise<TData> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    throw new Error(
      "Shopify is not configured. Add SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.",
    );
  }

  const response = await fetch(`https://${domain}/api/2026-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = (await response.json()) as ShopifyResponse<TData>;

  if (!response.ok || result.errors?.length || !result.data) {
    throw new Error(
      result.errors?.map((error) => error.message).join(", ") ||
        "Shopify request failed.",
    );
  }

  return result.data;
}
