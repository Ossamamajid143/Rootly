import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { Container } from "@/components/ui/container";
import { IngredientExplorer } from "@/features/wellness/components/ingredient-explorer";
import { getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Ingredients",
  description: "Learn about the ingredients used in ROOTLY products.",
};

export default async function IngredientsPage() {
  const products = await getProducts();
  return (
    <main>
      <PageIntro
        eyebrow="Know what you use"
        title="Simple ingredients, thoughtfully selected."
        description="Learn where our ingredients come from, how they are traditionally used and how to include them in your routine."
      />
      <Container className="py-12 sm:py-20"><IngredientExplorer products={products} /></Container>
    </main>
  );
}
