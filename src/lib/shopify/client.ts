import "server-only";

type ShopifyRequestOptions<TVariables> = {
  query: string;
  variables?: TVariables;
  revalidate?: number;
  tags?: string[];
};

type ShopifyResponse<TData> = {
  data?: TData;
  errors?: Array<{ message: string }>;
};

export function isShopifyConfigured() {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
      process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN &&
      process.env.SHOPIFY_STOREFRONT_API_VERSION,
  );
}

function getShopifyConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION;

  const missingVariables = [
    ["SHOPIFY_STORE_DOMAIN", domain],
    ["SHOPIFY_STOREFRONT_PRIVATE_TOKEN", privateToken],
    ["SHOPIFY_STOREFRONT_API_VERSION", apiVersion],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (!domain || !privateToken || !apiVersion) {
    throw new Error(
      `Shopify is not configured. Add ${missingVariables.join(", ")} to .env.local.`,
    );
  }

  return {
    apiVersion,
    domain: domain.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    privateToken,
  };
}

export async function shopifyFetch<
  TData,
  TVariables extends Record<string, unknown> = Record<string, never>,
>({
  query,
  variables,
  revalidate = 300,
  tags,
}: ShopifyRequestOptions<TVariables>): Promise<TData> {
  const { apiVersion, domain, privateToken } = getShopifyConfig();

  const response = await fetch(
    `https://${domain}/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": privateToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate, tags },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Shopify Storefront API request failed with HTTP ${response.status}.`,
    );
  }

  let result: ShopifyResponse<TData>;

  try {
    result = (await response.json()) as ShopifyResponse<TData>;
  } catch {
    throw new Error("Shopify Storefront API returned an invalid response.");
  }

  if (result.errors?.length) {
    throw new Error("Shopify Storefront API returned a GraphQL error.");
  }

  if (!result.data) {
    throw new Error("Shopify Storefront API returned no data.");
  }

  return result.data;
}
