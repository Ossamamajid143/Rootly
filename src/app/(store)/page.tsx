import { FeaturedProductsSection } from "@/features/home/components/featured-products-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { TrustStrip } from "@/features/home/components/trust-strip";
import { ProductStory } from "@/features/home/components/product-story";
import { WellnessShowcase } from "@/features/home/components/wellness-showcase";
import { IngredientCarousel } from "@/features/home/components/ingredient-carousel";
import { FinalCta } from "@/features/home/components/final-cta";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProductStory />
      <FeaturedProductsSection />
      <WellnessShowcase />
      <IngredientCarousel />
      <TrustStrip />
      <FinalCta />
    </main>
  );
}
