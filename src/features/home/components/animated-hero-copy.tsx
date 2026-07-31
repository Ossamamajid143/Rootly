"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { ButtonLink } from "@/components/ui/button";

const categories = [
  "Herbal powders",
  "Functional blends",
  "Ashwagandha",
  "Moringa",
  "Everyday rituals",
];

const ease = [0.22, 1, 0.36, 1] as const;

export function AnimatedHeroCopy() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = { opacity: 1, y: 0 };

  return (
    <div className="relative z-10 min-w-0 max-w-[600px]">
      <motion.p
        className="text-xs font-semibold uppercase tracking-normal text-brand sm:text-sm"
        initial={
          shouldReduceMotion
            ? reveal
            : { opacity: 0, y: 10, letterSpacing: "0.1em" }
        }
        animate={{ ...reveal, letterSpacing: "0em" }}
        transition={{ duration: shouldReduceMotion ? 0.15 : 0.55, ease }}
      >
        Rooted in everyday wellness
      </motion.p>

      <h1
        aria-label="Daily wellness, rooted in nature."
        className="mt-5 font-display text-[2.625rem] font-semibold leading-[0.98] tracking-normal text-forest min-[360px]:text-[2.75rem] sm:text-[clamp(2.75rem,4.2vw,5rem)]"
      >
        <span aria-hidden="true" className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={shouldReduceMotion ? reveal : { opacity: 0, y: "105%" }}
            animate={reveal}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.08,
              duration: shouldReduceMotion ? 0.15 : 0.72,
              ease,
            }}
          >
            Daily wellness,
          </motion.span>
        </span>
        <span
          aria-hidden="true"
          className="relative block overflow-hidden pb-[0.12em]"
        >
          <motion.span
            className="relative z-10 block"
            initial={shouldReduceMotion ? reveal : { opacity: 0, y: "105%" }}
            animate={reveal}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.17,
              duration: shouldReduceMotion ? 0.15 : 0.72,
              ease,
            }}
          >
            rooted in nature.
          </motion.span>
          <motion.span
            aria-hidden="true"
            className="absolute bottom-[0.13em] left-0 h-[0.13em] w-[82%] origin-left rounded-full bg-sand"
            initial={{
              opacity: shouldReduceMotion ? 1 : 0,
              scaleX: shouldReduceMotion ? 1 : 0,
            }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.55,
              duration: shouldReduceMotion ? 0.15 : 0.5,
              ease,
            }}
          />
        </span>
      </h1>

      <motion.p
        className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8"
        initial={shouldReduceMotion ? reveal : { opacity: 0, y: 16 }}
        animate={reveal}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.48,
          duration: shouldReduceMotion ? 0.15 : 0.55,
          ease,
        }}
      >
        Thoughtfully crafted herbal powders and plant-based blends for simple,
        intentional everyday routines.
      </motion.p>

      <motion.div
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
        initial={shouldReduceMotion ? reveal : { opacity: 0, y: 16 }}
        animate={reveal}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.58,
          duration: shouldReduceMotion ? 0.15 : 0.55,
          ease,
        }}
      >
        <ButtonLink
          href="/shop"
          size="lg"
          className="group w-full gap-2 sm:w-auto"
        >
          Shop all products
          <ArrowRight
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
          />
        </ButtonLink>

        <ButtonLink
          href="/wellness-goals"
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto"
        >
          Explore wellness goals
        </ButtonLink>
      </motion.div>

      <motion.div
        className="mt-8 overflow-hidden border-y border-border py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        initial={shouldReduceMotion ? reveal : { opacity: 0, y: 12 }}
        animate={reveal}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.68,
          duration: shouldReduceMotion ? 0.15 : 0.5,
          ease,
        }}
      >
        <div className="rootly-category-ticker flex w-max items-center">
          {[0, 1].map((group) => (
            <ul
              key={group}
              aria-hidden={group === 1 ? "true" : undefined}
              aria-label={group === 0 ? "Product categories" : undefined}
              className="flex shrink-0 items-center"
            >
              {categories.map((category) => (
                <li
                  key={`${group}-${category}`}
                  className="flex shrink-0 items-center text-xs font-semibold text-muted sm:text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="mx-4 size-1 rounded-full bg-sage"
                  />
                  {category}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
