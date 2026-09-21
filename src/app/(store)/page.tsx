import { FeaturedProductsSection } from "@/features/home/components/featured-products-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { ProductStory } from "@/features/home/components/product-story";
import { WellnessShowcase } from "@/features/home/components/wellness-showcase";
import { IngredientCarousel } from "@/features/home/components/ingredient-carousel";
import { FinalCta } from "@/features/home/components/final-cta";
import { getFeaturedProducts, getProducts } from "@/lib/shopify";

export default async function HomePage() {
  const products = await getProducts();
  const featured = await getFeaturedProducts(1);
  const storyProduct = featured[0] || products[0] || null;

  return (
    <main>
      <HeroSection />
      <ProductStory product={storyProduct} />
      <FeaturedProductsSection />
      <WellnessShowcase products={products} />
      <IngredientCarousel products={products} />
      <FinalCta />
    </main>
  );
}

