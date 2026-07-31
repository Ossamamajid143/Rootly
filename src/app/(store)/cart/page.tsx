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
        description="Your selected ROOTLY products will appear here when cart functionality is added."
      />
    </main>
  );
}
