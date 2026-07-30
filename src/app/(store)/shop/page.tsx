import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore ROOTLY herbs, powders and adaptogen blends.",
};

export default function ShopPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Our collection"
        title="Plant-powered products for everyday rituals."
        description="Explore thoughtfully selected herbs, functional powders and adaptogen blends."
      />
    </main>
  );
}
