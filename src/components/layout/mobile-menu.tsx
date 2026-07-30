"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import type { NavigationItem } from "@/config/navigation";

interface MobileMenuProps {
  items: NavigationItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-sand"
      >
        <Menu size={23} strokeWidth={1.7} />
      </button>

      {isOpen &&
        createPortal(
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[100] lg:hidden"
          >
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-foreground/40"
            />

            <div className="absolute inset-y-0 left-0 flex w-[min(88%,380px)] flex-col bg-background px-6 py-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <Image
                  src="/images/brand/rootly-logo.svg"
                  alt="ROOTLY"
                  width={120}
                  height={42}
                  className="h-auto w-28"
                />

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-sand"
                >
                  <X size={23} strokeWidth={1.7} />
                </button>
              </div>

              <nav className="mt-10" aria-label="Mobile navigation">
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between border-b border-border py-4 font-display text-3xl font-semibold text-forest"
                      >
                        {item.label}

                        <ArrowUpRight
                          size={20}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto border-t border-border pt-6">
                <p className="text-sm leading-6 text-muted">
                  Thoughtfully sourced herbs and plant-based wellness products.
                </p>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  Rooted in everyday wellness
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
