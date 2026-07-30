import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-[#87652f] uppercase">
        404 · Page not found
      </p>
      <Heading as="h1">This path has not taken root.</Heading>
      <p className="mt-5 text-[#253426]/60">
        The page may have moved, or it may no longer be available.
      </p>
      <Link
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[#253426] px-6 text-sm font-semibold text-white"
        href="/"
      >
        Return home
      </Link>
    </Container>
  );
}
