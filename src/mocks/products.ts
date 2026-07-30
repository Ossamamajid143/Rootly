import type { Product } from "@/types/product";

// Temporary development data.
// Replace prices, sizes and descriptions with the real ROOTLY catalogue.

export const products: Product[] = [
  {
    id: "mock-product-ashwagandha",
    handle: "ashwagandha-powder",
    title: "Ashwagandha Powder",
    description:
      "Finely milled botanical powder made for warm drinks, smoothies and simple everyday rituals.",
    productType: "Herbal Powder",
    tags: ["ashwagandha", "herbs", "daily-routine"],
    badge: "Popular",
    availableForSale: true,
    featuredImage: {
      url: "/images/products/Ashwaganda.jpeg",
      altText: "ROOTLY Ashwagandha powder pouch",
      width: 1131,
      height: 1600,
    },

    priceRange: {
      minVariantPrice: {
        amount: "1850.00",
        currencyCode: "PKR",
      },
    },

    variants: [
      {
        id: "mock-variant-ashwagandha-100g",
        title: "100g",
        availableForSale: true,
        price: {
          amount: "1850.00",
          currencyCode: "PKR",
        },
        compareAtPrice: null,
        selectedOptions: [
          {
            name: "Size",
            value: "100g",
          },
        ],
      },
    ],
  },
  {
    id: "mock-product-beetroot",
    handle: "beetroot-powder",
    title: "Beetroot Powder",
    description:
      "Naturally vibrant beetroot powder created for smoothies, juices and everyday recipes.",
    productType: "Functional Powder",
    tags: ["beetroot", "functional-powder", "smoothies"],
    availableForSale: true,
    featuredImage: {
      url: "/images/products/Pulse.jpeg",
      altText: "ROOTLY Pulse beetroot, pomegranate and cinnamon blend pouch",
      width: 1131,
      height: 1600,
    },

    priceRange: {
      minVariantPrice: {
        amount: "1250.00",
        currencyCode: "PKR",
      },
    },

    variants: [
      {
        id: "mock-variant-beetroot-100g",
        title: "100g",
        availableForSale: true,
        price: {
          amount: "1250.00",
          currencyCode: "PKR",
        },
        compareAtPrice: null,
        selectedOptions: [
          {
            name: "Size",
            value: "100g",
          },
        ],
      },
    ],
  },
  {
    id: "mock-product-adaptogen",
    handle: "daily-adaptogen-blend",
    title: "Daily Adaptogen Blend",
    description:
      "A convenient plant-based blend designed to make everyday wellness routines feel simple.",
    productType: "Adaptogen Blend",
    tags: ["adaptogens", "blend", "daily-routine"],
    badge: "New",
    availableForSale: true,
    featuredImage: {
      url: "/images/products/Balance.jpeg",
      altText: "ROOTLY Balance adaptogen blend pouch",
      width: 1131,
      height: 1600,
    },

    priceRange: {
      minVariantPrice: {
        amount: "2200.00",
        currencyCode: "PKR",
      },
    },

    variants: [
      {
        id: "mock-variant-adaptogen-150g",
        title: "150g",
        availableForSale: true,
        price: {
          amount: "2200.00",
          currencyCode: "PKR",
        },
        compareAtPrice: null,
        selectedOptions: [
          {
            name: "Size",
            value: "150g",
          },
        ],
      },
    ],
  },
];

export const featuredProducts = products.slice(0, 3);

export function getProductByHandle(handle: string) {
  return products.find((product) => product.handle === handle);
}
