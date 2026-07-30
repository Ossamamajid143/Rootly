import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export function Hero() {
  return (
    <section className="overflow-hidden bg-[#f3efe6]">
      <Container className="grid min-h-[650px] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-semibold tracking-[0.18em] text-[#87652f] uppercase">
            Rooted in better routines
          </p>
          <Heading as="h1" className="text-6xl sm:text-7xl lg:text-8xl">
            Wellness that fits real life.
          </Heading>
          <p className="mt-7 max-w-lg text-lg leading-8 text-[#253426]/65">
            Thoughtful essentials made to support how you want to feel—without
            making your routine more complicated.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-12 items-center rounded-full bg-[#253426] px-7 text-sm font-semibold text-white hover:bg-[#394c3a]"
              href="/shop"
            >
              Shop essentials
            </Link>
            <Link
              className="inline-flex min-h-12 items-center rounded-full border border-[#253426]/20 px-7 text-sm font-semibold hover:bg-white/60"
              href="/about"
            >
              Our approach
            </Link>
          </div>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-lg rounded-[3rem] bg-[#a78d5d] p-6">
          <div className="flex h-full items-end rounded-[2.2rem] border border-white/30 bg-gradient-to-b from-[#d7c49f] via-[#b19664] to-[#6f5937] p-8">
            <p className="max-w-xs font-serif text-4xl leading-tight text-white">
              Small rituals. Steady roots.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
