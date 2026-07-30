import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Search"
        title="Find the right ROOTLY product."
        description="Product search will be connected when we add the Shopify product catalogue."
      />
    </main>
  );
}
