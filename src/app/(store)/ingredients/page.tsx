import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Ingredients",
  description: "Learn about the ingredients used in ROOTLY products.",
};

export default function IngredientsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Know what you use"
        title="Simple ingredients, thoughtfully selected."
        description="Learn where our ingredients come from, how they are traditionally used and how to include them in your routine."
      />
    </main>
  );
}
