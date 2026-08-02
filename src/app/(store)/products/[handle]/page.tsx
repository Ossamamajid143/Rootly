import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { PurchasePanel } from "@/features/products/components/purchase-panel";
import { ProductAccordions } from "@/features/products/components/product-accordions";
import { ProductCard } from "@/features/products/components/product-card";
import { storefrontRoutes } from "@/config/navigation";

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    handle: product.handle,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const related = (await getProducts()).filter((item) => item.id !== product.id).slice(0, 4);

  return <main>
    <Container className="py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href={storefrontRoutes.home} className="hover:text-brand">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={storefrontRoutes.shop} className="hover:text-brand">Shop</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">{product.title}</li>
        </ol>
      </nav>
      <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-start lg:gap-20">
        <ScrollReveal direction="right"><ProductGallery title={product.title} images={product.images.length ? product.images : product.featuredImage ? [product.featuredImage] : []} /></ScrollReveal>
        <ScrollReveal direction="left" className="md:sticky md:top-28"><PurchasePanel product={product} /><ProductAccordions description={product.description} /></ScrollReveal>
      </div>
    </Container>
    {related.length > 0 && <section className="border-t border-border bg-surface py-20 sm:py-24"><Container><div className="flex items-end justify-between gap-6"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Keep exploring</p><h2 className="mt-4 font-display text-5xl font-semibold text-forest">More from ROOTLY.</h2></div></div><div className="no-scrollbar mt-10 flex snap-x gap-5 overflow-x-auto pb-3">{related.map((item) => <div key={item.id} className="w-[82vw] max-w-md shrink-0 snap-start sm:w-[45vw] lg:w-[31vw]"><ProductCard product={item} /></div>)}</div></Container></section>}
  </main>;
}
