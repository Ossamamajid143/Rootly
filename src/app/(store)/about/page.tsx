import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Learn about ROOTLY and our approach to plant-based wellness.",
};

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Our story"
        title="Wellness should feel natural, simple and honest."
        description="ROOTLY was created to make traditional herbs and plant-based ingredients easier to understand and include in everyday life."
      />
    </main>
  );
}
