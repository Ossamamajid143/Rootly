import type { Metadata } from "next";

import { PolicyPage } from "@/components/ui/policy-page";

export const metadata: Metadata = {
  title: "Shipping and Returns",
  description:
    "Current shipping, checkout and return-support information for ROOTLY orders.",
};

const sections = [
  {
    title: "Delivery and shipping charges",
    paragraphs: [
      "The ROOTLY storefront is presented for delivery across Pakistan. Available shipping options and any applicable charges are calculated and displayed during secure Shopify checkout before an order is completed.",
      "A product appearing in the catalogue does not by itself confirm availability. Current availability is shown with the product and confirmed again through checkout.",
    ],
  },
  {
    title: "Return requests",
    paragraphs: [
      "Return eligibility, time limits and return addresses are not published in this storefront. Contact ROOTLY before sending any item back so the team can review the order and provide the instructions that apply to it.",
      "Include the order details and a clear description of the issue when requesting support. The contact page states that ROOTLY usually replies within two business days.",
    ],
  },
  {
    title: "Checkout and order support",
    paragraphs: [
      "Checkout is completed through Shopify. Questions about a submitted order, delivery or a possible return should be directed to ROOTLY using the support email shown on this page.",
    ],
  },
] as const;

export default function ShippingReturnsPage() {
  return (
    <PolicyPage
      eyebrow="Order information"
      title="Shipping and returns."
      description="The delivery and support information currently available through the ROOTLY storefront."
      sections={sections}
    />
  );
}
