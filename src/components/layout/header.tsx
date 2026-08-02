"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Search,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { mainNavigation } from "@/config/navigation";
import { useCart } from "@/features/cart/cart-provider";

interface HeaderProps {
  cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
  const cart = useCart();
  const visibleCartCount = cart.totalQuantity || cartCount;
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const previousY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 12);
      if (y < 80) setIsVisible(true);
      else if (Math.abs(y - previousY.current) > 8) setIsVisible(y < previousY.current);
      previousY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-site-header
      initial={false}
      animate={{ y: isVisible ? 0 : "-110%" }}
      transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
        isScrolled
          ? "border-border/90 bg-background/92 shadow-[0_10px_30px_rgba(43,54,40,0.08)]"
          : "border-transparent bg-background/80"
      }`}
    >
      <Container className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center lg:h-20 lg:grid-cols-[auto_1fr_auto]">
        <div className="justify-self-start lg:hidden">
          <MobileMenu items={mainNavigation} />
        </div>

        <Link
          href="/"
          aria-label="ROOTLY homepage"
          className="justify-self-center lg:justify-self-start"
        >
          <Image
            src="/images/brand/rootly-logo.svg"
            alt="ROOTLY"
            width={132}
            height={48}
            priority
            className="h-auto w-28 sm:w-32"
          />
        </Link>

        <nav
          className="hidden justify-self-center lg:block"
          aria-label="Main navigation"
        >
          <ul className="flex items-center gap-8">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`relative py-2 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-brand after:transition-transform ${
                    pathname === item.href
                      ? "text-brand after:scale-x-100"
                      : "text-foreground after:scale-x-0 hover:text-brand hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden size-11 items-center justify-center rounded-full transition-[color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-sand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:inline-flex"
          >
            <Search size={20} strokeWidth={1.6} />
          </Link>

          <Link
            href="/account"
            aria-label="Account"
            className="hidden size-11 items-center justify-center rounded-full transition-[color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-sand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:inline-flex"
          >
            <UserRound size={20} strokeWidth={1.6} />
          </Link>

          <Link
            href="/cart"
            aria-label={`Shopping cart with ${visibleCartCount} items`}
            className="relative inline-flex size-11 items-center justify-center rounded-full transition-[color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-sand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <ShoppingBag size={21} strokeWidth={1.6} />

            {visibleCartCount > 0 && (
              <span className="absolute right-0 top-0 flex size-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white tabular-nums">
                {visibleCartCount > 99 ? "99+" : visibleCartCount}
              </span>
            )}
          </Link>
        </div>
      </Container>
    </motion.header>
  );
}
