import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Your selection"
        title="Your cart is currently empty."
        description="The working cart will be added when we create our mock products and Shopify-ready product types."
      />
    </main>
  );
}
