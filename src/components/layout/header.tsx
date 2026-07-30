import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { mainNavigation } from "@/config/navigation";

interface HeaderProps {
  cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
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
                  className="text-sm font-semibold text-foreground transition-colors hover:text-brand"
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
            className="hidden size-11 items-center justify-center rounded-full transition-colors hover:bg-sand lg:inline-flex"
          >
            <Search size={20} strokeWidth={1.6} />
          </Link>

          <Link
            href="/account"
            aria-label="Account"
            className="hidden size-11 items-center justify-center rounded-full transition-colors hover:bg-sand lg:inline-flex"
          >
            <UserRound size={20} strokeWidth={1.6} />
          </Link>

          <Link
            href="/cart"
            aria-label={`Shopping cart with ${cartCount} items`}
            className="relative inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-sand"
          >
            <ShoppingBag size={21} strokeWidth={1.6} />

            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </Container>
    </header>
  );
}
