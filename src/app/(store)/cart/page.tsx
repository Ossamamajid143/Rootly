import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { Container } from "@/components/ui/container";
import { CartView } from "@/features/cart/components/cart-view";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Your selection"
        title="Your ROOTLY bag."
        description="Review your selection, adjust quantities and continue to secure Shopify checkout."
      />
      <Container className="py-12 sm:py-20"><CartView /></Container>
    </main>
  );
}
