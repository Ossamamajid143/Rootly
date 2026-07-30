import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
};

export function Heading({
  as: Tag = "h2",
  className,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-serif text-4xl leading-[1.05] tracking-[-0.03em] text-[#253426] sm:text-5xl",
        className,
      )}
      {...props}
    />
  );
}
