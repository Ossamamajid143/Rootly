"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { ProductImage } from "@/types/product";

export function ProductGallery({ title, images }: { title: string; images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const reduceMotion = useReducedMotion();
  const image = images[active];
  const select = useCallback((next: number) => setActive((next + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!lightbox) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const keys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowRight") select(active + 1);
      if (event.key === "ArrowLeft") select(active - 1);
    };
    window.addEventListener("keydown", keys);
    return () => { document.body.style.overflow = original; window.removeEventListener("keydown", keys); };
  }, [active, lightbox, select]);

  if (!image) return <div className="grid aspect-[4/5] place-items-center rounded-[2rem] bg-sand text-muted">Product image unavailable</div>;

  const media = (sizes: string) => <Image src={image.url} alt={image.altText || `${title}, image ${active + 1}`} fill priority={active === 0} sizes={sizes} className="object-contain p-6 sm:p-10" />;

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-border bg-sand/70">
        <AnimatePresence mode="wait">
          <motion.div key={image.url} className="absolute inset-0" initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.38 }}>{media("(max-width: 767px) 100vw, 55vw")}</motion.div>
        </AnimatePresence>
        <button type="button" aria-label="Open image zoom" onClick={() => setLightbox(true)} className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-surface/90 text-forest shadow-sm backdrop-blur transition hover:scale-105"><Expand size={19} aria-hidden="true" /></button>
        {images.length > 1 && <><button type="button" aria-label="Previous image" onClick={() => select(active - 1)} className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-forest text-white"><ChevronLeft aria-hidden="true" /></button><button type="button" aria-label="Next image" onClick={() => select(active + 1)} className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-forest text-white"><ChevronRight aria-hidden="true" /></button></>}
      </div>
      {images.length > 1 && <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto" role="list" aria-label="Product thumbnails">{images.map((item, index) => <button key={item.url} type="button" onClick={() => setActive(index)} aria-label={`Show image ${index + 1}`} aria-current={active === index ? "true" : undefined} className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-2xl border bg-sand ${active === index ? "border-brand ring-1 ring-brand" : "border-border"}`}><Image src={item.url} alt="" fill sizes="80px" className="object-contain p-2" /></button>)}</div>}

      <AnimatePresence>
        {lightbox && <motion.div role="dialog" aria-modal="true" aria-label={`${title} image viewer`} className="fixed inset-0 z-[120] bg-forest/96 p-4 sm:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button type="button" aria-label="Close image viewer" onClick={() => setLightbox(false)} className="absolute right-5 top-5 z-10 grid size-12 place-items-center rounded-full bg-white text-forest"><X aria-hidden="true" /></button><div className="relative size-full">{media("100vw")}</div></motion.div>}
      </AnimatePresence>
    </div>
  );
}
