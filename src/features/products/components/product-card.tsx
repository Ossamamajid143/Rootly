import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { Product } from "@/types/product";
import { ProductMediaFrame } from "@/features/products/components/product-media-frame";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import { productRoute } from "@/config/navigation";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = formatMoney(product.priceRange.minVariantPrice);
  const badge = product.tags.find((tag) => /best|new|featured/i.test(tag));

  return (
    <article className="group/card flex h-full flex-col">
      <Link
        href={productRoute(product.handle)}
        className="group block focus-visible:outline-none"
      >
        <div className="relative transition-transform duration-300 group-hover/card:-translate-y-1 motion-reduce:transform-none">
          <ProductMediaFrame
            title={product.title}
            images={product.images.length ? product.images : product.featuredImage ? [product.featuredImage] : []}
          />

          {badge && (
            <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
              {badge}
            </span>
          )}

          {!product.availableForSale && (
            <span className="absolute inset-x-4 bottom-4 rounded-full bg-foreground px-4 py-2 text-center text-xs font-bold text-white">
              Currently unavailable
            </span>
          )}
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {product.productType}
          </p>

          <div className="mt-2 flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold leading-tight text-forest sm:text-3xl">
              {product.title}
            </h3>

            <ArrowUpRight
              size={20}
              strokeWidth={1.5}
              className="mt-1 shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
            {product.description}
          </p>

        </div>
      </Link>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <p className="font-semibold text-foreground">{price}</p>
        <AddToCartButton product={product} className="min-h-11 gap-1.5 px-5 text-xs" />
      </div>
    </article>
  );
}
