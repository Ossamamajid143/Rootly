import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import {
  footerNavigationGroups,
  storefrontRoutes,
} from "@/config/navigation";
import { siteConfig, socialLinks } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#203024] py-12 text-[#f8f5ed] sm:py-16">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
        <div>
          <Link className="inline-block" href={storefrontRoutes.home} aria-label="ROOTLY homepage">
            <Image src="/images/brand/rootly-logo.svg" alt="ROOTLY" width={146} height={52} className="brightness-0 invert" />
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#f8f5ed]/70">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex items-center gap-2" aria-label="ROOTLY social media">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="ROOTLY on Instagram"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 focus-visible:ring-white"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[19px]" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="ROOTLY on Facebook"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 focus-visible:ring-white"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[19px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {footerNavigationGroups.map((group) => (
              <div key={group.label}>
                <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-sand">
                  {group.label}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        className="text-sm text-[#f8f5ed]/70 transition-colors hover:text-white"
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <p className="mt-8 text-xs text-[#f8f5ed]/45 lg:text-right">
            © {new Date().getFullYear()} Rootly
          </p>
        </div>
      </Container>
    </footer>
  );
}
