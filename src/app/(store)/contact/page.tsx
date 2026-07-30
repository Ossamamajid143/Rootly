import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { storeConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Rootly team.",
};

export default function ContactPage() {
  return (
    <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-2">
      <div>
        <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-[#87652f] uppercase">
          We are here to help
        </p>
        <Heading as="h1">Let&apos;s talk.</Heading>
        <p className="mt-5 max-w-md text-lg leading-8 text-[#253426]/60">
          Questions about products, orders, or finding the right place to
          start? Send us a note.
        </p>
      </div>
      <div className="rounded-[2rem] bg-[#f3efe6] p-8 sm:p-10">
        <p className="text-sm font-semibold">Email us</p>
        <a
          className="mt-3 block font-serif text-3xl text-[#87652f] underline decoration-1 underline-offset-8"
          href={`mailto:${storeConfig.email}`}
        >
          {storeConfig.email}
        </a>
        <p className="mt-10 border-t border-[#253426]/15 pt-6 text-sm leading-6 text-[#253426]/60">
          We usually reply within two business days.
        </p>
      </div>
    </Container>
  );
}
