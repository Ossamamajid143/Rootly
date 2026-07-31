export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: { nodes: ShopifyImage[] };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  variants: { nodes: ShopifyVariant[] };
};

export type ShopifyProductConnection = {
  products: { nodes: ShopifyProduct[] };
};

export type ShopifyProductResult = {
  product: ShopifyProduct | null;
};

export type ShopifyFeaturedCollectionResult = {
  collection: {
    products: { nodes: ShopifyProduct[] };
  } | null;
};

export type ShopifyCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  products: { nodes: ShopifyProduct[] };
};

export type ShopifyCollectionResult = {
  collection: ShopifyCollection | null;
};
