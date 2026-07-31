import { productFragment } from "@/lib/shopify/fragments/product";

export const featuredProductsQuery = /* GraphQL */ `
  query FeaturedProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first) {
        nodes {
          ...ProductFields
        }
      }
    }
  }
  ${productFragment}
`;

export const collectionByHandleQuery = /* GraphQL */ `
  query CollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(first: $first) {
        nodes {
          ...ProductFields
        }
      }
    }
  }
  ${productFragment}
`;
