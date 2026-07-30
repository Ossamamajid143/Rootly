import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Wellness Goals",
  description: "Explore ROOTLY products according to your wellness goals.",
};

export default function WellnessGoalsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Find your ritual"
        title="Shop according to your wellness goals."
        description="Discover plant-based products for energy, balance, daily nutrition, immune support and overall wellbeing."
      />
    </main>
  );
}
