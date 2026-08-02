"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = direction === "left" ? { x: 34 } : direction === "right" ? { x: -34 } : direction === "up" ? { y: 28 } : {};

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, filter: "blur(5px)", ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -8% 0px" }}
      transition={{ delay: reduceMotion ? 0 : delay, duration: reduceMotion ? 0.01 : 0.78 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ScrollReveal className={cn("overflow-hidden", className)}>
      {children}
    </ScrollReveal>
  );
}

export const StaggerReveal = ScrollReveal;
