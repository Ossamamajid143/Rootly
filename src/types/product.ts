export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ProductImage {
  url: string;
  altText: string;
  width?: number;
  height?: number;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: SelectedOption[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  badge?: string;
  availableForSale: boolean;
  featuredImage: ProductImage | null;

  priceRange: {
    minVariantPrice: Money;
  };

  variants: ProductVariant[];
}
