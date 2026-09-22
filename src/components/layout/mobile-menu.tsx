"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  isPrimaryNavigationItemActive,
  storefrontRoutes,
  type NavigationItem,
} from "@/config/navigation";

interface MobileMenuProps {
  items: readonly NavigationItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

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

      {isOpen && typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[100] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.28 }}
          >
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-foreground/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="absolute inset-y-0 left-0 flex w-[min(90%,410px)] flex-col overflow-y-auto bg-background px-6 py-5 shadow-2xl"
              initial={reduceMotion ? { opacity: 0 } : { x: "-100%" }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "-100%" }}
              transition={{ duration: reduceMotion ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-border pb-5">
                <Link
                  href={storefrontRoutes.home}
                  aria-label="ROOTLY homepage"
                  onClick={() => setIsOpen(false)}
                  className="rounded-sm"
                >
                  <Image
                    src="/images/brand/rootly-logo.svg"
                    alt="ROOTLY"
                    width={120}
                    height={42}
                    className="h-auto w-28"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-sand"
                >
                  <X size={23} strokeWidth={1.7} />
                </button>
              </div>

              <div className="mt-6">
                <Link
                  href={storefrontRoutes.findYourFormula}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-2xl bg-brand px-5 py-4 text-white shadow-md transition-transform hover:scale-[1.01]"
                >
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-brand-light font-bold">Personalized Routine</span>
                    <span className="font-display text-xl font-semibold">Find Your Formula</span>
                  </div>
                  <ArrowUpRight size={20} strokeWidth={2} />
                </Link>
              </div>

              <nav className="mt-6" aria-label="Mobile navigation">
                <ul className="space-y-2">
                  {items.map((item, index) => {
                    const isActive = isPrimaryNavigationItemActive(
                      item.href,
                      pathname,
                    );

                    return (
                      <motion.li
                        key={item.href}
                        initial={
                          reduceMotion ? false : { opacity: 0, x: -18 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: reduceMotion ? 0 : 0.1 + index * 0.055,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className={`flex items-center justify-between border-b py-4 font-display text-3xl font-semibold transition-colors ${
                            isActive
                              ? "border-brand text-brand"
                              : "border-border text-forest hover:text-brand"
                          }`}
                        >
                          {item.label}

                          <ArrowUpRight
                            size={20}
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
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
            </motion.div>
          </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
