import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = formatMoney(product.priceRange.minVariantPrice);

  return (
    <article>
      <Link
        href={`/products/${product.handle}`}
        className="group block"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-sand">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8"
              style={{
                background:
                  "radial-gradient(circle at 80% 15%, rgba(117, 85, 37, 0.22), transparent 35%), linear-gradient(145deg, #e7dac5, #f8f4eb)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  ROOTLY
                </span>

                <Leaf
                  size={22}
                  strokeWidth={1.5}
                  className="text-brand"
                  aria-hidden="true"
                />
              </div>

              <div>
                <p className="font-display text-4xl font-semibold leading-none text-forest sm:text-5xl">
                  {product.title}
                </p>

                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand">
                  {product.productType}
                </p>
              </div>
            </div>
          )}

          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-surface px-4 py-2 text-xs font-bold text-brand shadow-sm">
              {product.badge}
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

          <p className="mt-4 font-semibold text-foreground">
            {price}
          </p>
        </div>
      </Link>
    </article>
  );
}
