import { productFragment } from "@/lib/shopify/fragments/product";

export const productByHandleQuery = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
  ${productFragment}
`;
