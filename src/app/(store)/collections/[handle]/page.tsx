import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { ProductGrid } from "@/features/products/components/product-grid";
import { getCollectionByHandle } from "@/lib/shopify";

type CollectionPageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  return collection
    ? { title: collection.title, description: collection.description }
    : { title: "Collection not found" };
}

export default async function CollectionPage({
  params,
}: CollectionPageProps) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    notFound();
  }

  return (
    <>
      <div className="bg-[#536654] py-20 text-[#f8f5ed] sm:py-28">
        <Container>
          <p className="mb-4 text-xs font-semibold tracking-[0.16em] uppercase opacity-60">
            Rootly collection
          </p>
          <Heading as="h1" className="max-w-3xl text-[#f8f5ed]">
            {collection.title}
          </Heading>
          <p className="mt-5 max-w-xl text-lg leading-8 opacity-70">
            {collection.description}
          </p>
        </Container>
      </div>
      <Section>
        <Container>
          <ProductGrid products={collection.products} />
        </Container>
      </Section>
    </>
  );
}
