import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { Container } from "@/components/ui/container";
import { WellnessExplorer } from "@/features/wellness/components/wellness-explorer";
import { getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Wellness Goals",
  description: "Explore ROOTLY products according to your wellness goals.",
};

export default async function WellnessGoalsPage() {
  const products = await getProducts();
  return (
    <main>
      <PageIntro
        eyebrow="Find your ritual"
        title="Shop according to your wellness goals."
        description="Discover plant-based products for energy, balance, daily nutrition, immune support and overall wellbeing."
      />
      <Container className="py-12 sm:py-20"><WellnessExplorer products={products} /></Container>
    </main>
  );
}
