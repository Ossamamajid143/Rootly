import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { Container } from "@/components/ui/container";
import { SearchResults } from "@/features/search/search-results";
import { getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Search",
  description: "Search ROOTLY products, ingredients and wellness rituals.",
};

export default async function SearchPage() {
  const products = await getProducts();
  return (
    <main>
      <PageIntro
        eyebrow="Search"
        title="Find the right ROOTLY product."
        description="Search the ROOTLY catalogue by product, ingredient or ritual."
      />
      <Container className="py-12 sm:py-20"><SearchResults products={products} /></Container>
    </main>
  );
}
