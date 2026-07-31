import { productFragment } from "@/lib/shopify/fragments/product";

export const productsQuery = /* GraphQL */ `
  query Products($first: Int!) {
    products(first: $first) {
      nodes {
        ...ProductFields
      }
    }
  }
  ${productFragment}
`;
