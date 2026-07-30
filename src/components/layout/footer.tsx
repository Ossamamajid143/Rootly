import Link from "next/link";

import { Container } from "@/components/ui/container";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-[#253426] py-12 text-[#f8f5ed]">
      <Container className="grid gap-10 sm:grid-cols-2 sm:items-end">
        <div>
          <Link className="text-3xl font-semibold tracking-[-0.04em]" href="/">
            {siteConfig.name}
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#f8f5ed]/70">
            {siteConfig.description}
          </p>
        </div>
        <div className="sm:text-right">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end"
          >
            {footerNavigation.map((item) => (
              <Link
                className="text-sm text-[#f8f5ed]/70 hover:text-white"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mt-5 text-xs text-[#f8f5ed]/45">
            © {new Date().getFullYear()} Rootly
          </p>
        </div>
      </Container>
    </footer>
  );
}
