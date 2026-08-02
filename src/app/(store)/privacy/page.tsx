import type { Metadata } from "next";

import { PolicyPage } from "@/components/ui/policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the current ROOTLY storefront handles cart, search and checkout information.",
};

const sections = [
  {
    title: "Cart information on your device",
    paragraphs: [
      "The storefront saves the contents of your bag in your browser so the selection can remain available when you return on the same device. That saved cart includes Shopify merchandise identifiers, product and variant names, displayed prices, image references and quantities.",
      "You can remove individual items in the cart. Clearing this site’s browser storage also removes the locally saved cart.",
    ],
  },
  {
    title: "Search and shop filters",
    paragraphs: [
      "Catalogue searches are filtered in the browser from the products loaded for the page. Shop filter choices may be reflected in the page URL so that the filtered view can be navigated without a full page reload.",
    ],
  },
  {
    title: "Shopify checkout",
    paragraphs: [
      "When you choose checkout, the storefront sends the selected Shopify merchandise identifiers and quantities to ROOTLY’s checkout endpoint. Shopify then creates the secure checkout destination and the browser is redirected there.",
      "Personal, delivery and payment information entered after that redirect is handled within the Shopify checkout experience rather than by the local cart stored in this storefront.",
    ],
  },
  {
    title: "Contact messages",
    paragraphs: [
      "If you email ROOTLY, the information you include is used to understand and respond to that request. Avoid sending payment-card details by email.",
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="Storefront privacy"
      title="Privacy policy."
      description="A plain-language summary of the data handling implemented in this ROOTLY storefront."
      sections={sections}
    />
  );
}
