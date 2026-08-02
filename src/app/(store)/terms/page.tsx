import type { Metadata } from "next";

import { PolicyPage } from "@/components/ui/policy-page";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The current catalogue, wellness-information and checkout terms for the ROOTLY storefront.",
};

const sections = [
  {
    title: "Using the storefront",
    paragraphs: [
      "ROOTLY provides this storefront to help visitors explore plant-based products, ingredients and general wellness themes. The wellness-goal categories and educational content are for product discovery and general wellbeing; they are not medical advice.",
      "Use the product label and product page information when deciding whether a product fits your routine. Contact an appropriate health professional when personal medical guidance is needed.",
    ],
  },
  {
    title: "Products, prices and availability",
    paragraphs: [
      "Product titles, variants, prices, currency, availability and catalogue images are loaded from the connected Shopify store when that integration is configured. The current information shown for a selected variant is the information used to prepare checkout.",
      "Adding a product to the local bag does not reserve stock or complete an order.",
    ],
  },
  {
    title: "Orders and checkout",
    paragraphs: [
      "Orders are completed through the secure Shopify checkout destination. Shipping options and applicable charges are presented there before completion. An order is not submitted by ROOTLY’s local bag or quantity controls alone.",
    ],
  },
  {
    title: "Questions and support",
    paragraphs: [
      "Use the ROOTLY contact address for product, order or storefront questions. Do not send payment-card details by email.",
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <PolicyPage
      eyebrow="Store terms"
      title="Terms and conditions."
      description="The terms supported by the current ROOTLY catalogue and Shopify checkout implementation."
      sections={sections}
    />
  );
}
