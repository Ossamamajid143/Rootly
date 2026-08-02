"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ProductImage } from "@/types/product";
import { cn } from "@/lib/utils";

export function ProductMediaFrame({
  title,
  images,
  priority = false,
  sizes = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
  className,
}: {
  title: string;
  images: ProductImage[];
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const reduceMotion = useReducedMotion();
  const primary = images[0];
  const secondary = images[1];

  return (
    <div className={cn("group/media relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/80 bg-[radial-gradient(circle_at_50%_42%,#f7f0e3_0%,#e7dac5_72%)]", className)}>
      {primary ? (
        <>
          <motion.div
            className="absolute inset-[5%] sm:inset-[7%]"
            animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={primary.url}
              alt={primary.altText || title}
              fill
              priority={priority}
              sizes={sizes}
              onLoad={() => setLoaded(true)}
              className={cn(
                "object-contain object-center drop-shadow-[0_22px_26px_rgba(51,57,42,0.18)] transition-[opacity,filter,transform] duration-700 group-hover/media:scale-[1.025]",
                loaded ? "opacity-100 blur-0" : "opacity-0 blur-md",
              )}
            />
          </motion.div>
          {secondary && (
            <div className="absolute inset-[5%] opacity-0 transition-opacity duration-500 group-hover/media:opacity-100 sm:inset-[7%]">
              <Image
                src={secondary.url}
                alt={secondary.altText || `${title}, alternate view`}
                fill
                sizes={sizes}
                className="object-contain object-center drop-shadow-[0_22px_26px_rgba(51,57,42,0.18)]"
              />
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 grid place-items-center px-8 text-center text-sm text-muted">
          Product image unavailable
        </div>
      )}
    </div>
  );
}
