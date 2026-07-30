import { FeaturedProductsSection } from "@/features/home/components/featured-products-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { TrustStrip } from "@/features/home/components/trust-strip";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustStrip />
      <FeaturedProductsSection />
    </main>
  );
}
