import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { ProductGrid } from "@/features/products/components/product-grid";
import { getProducts } from "@/lib/shopify";
import {
  getWellnessGoal,
  wellnessGoals,
} from "@/config/wellness-goals";
import { storefrontRoutes } from "@/config/navigation";

type WellnessGoalPageProps = {
  params: Promise<{ handle: string }>;
};

export function generateStaticParams() {
  return wellnessGoals.map((goal) => ({ handle: goal.handle }));
}

export async function generateMetadata({
  params,
}: WellnessGoalPageProps): Promise<Metadata> {
  const { handle } = await params;
  const goal = getWellnessGoal(handle);

  return goal
    ? { title: goal.title, description: goal.description }
    : { title: "Wellness goal not found" };
}

export default async function WellnessGoalPage({
  params,
}: WellnessGoalPageProps) {
  const { handle } = await params;
  const goal = getWellnessGoal(handle);

  if (!goal) {
    notFound();
  }

  const products = await getProducts();
  const matchingProducts = products.filter((product) =>
    product.tags.includes(goal.handle),
  );

  return (
    <>
      <div className="bg-[#f3efe6] py-20 sm:py-28">
        <Container>
          <Link
            href={storefrontRoutes.wellnessGoals}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand underline underline-offset-4"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All wellness goals
          </Link>
          <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-[#87652f] uppercase">
            Wellness goal
          </p>
          <Heading as="h1" className="max-w-3xl">
            {goal.title}
          </Heading>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#253426]/65">
            {goal.description}
          </p>
        </Container>
      </div>
      <Section>
        <Container>
          <p className="mb-8 text-sm font-semibold text-[#253426]/55">
            Recommended for this goal
          </p>
          <ProductGrid products={matchingProducts} />
        </Container>
      </Section>
    </>
  );
}
