import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentProps,
} from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dark border border-brand",
  secondary:
    "border border-brand bg-transparent text-brand hover:bg-sand",
  ghost:
    "border border-transparent bg-transparent text-foreground hover:bg-sand",
  light:
    "border border-white bg-white text-forest hover:border-sand hover:bg-sand hover:text-forest",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-10 px-5 text-sm",
  md: "min-h-12 px-7 text-sm",
  lg: "min-h-14 px-8 text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-full font-semibold",
    "transition-[color,background-color,border-color,transform] duration-200",
    "hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-0 active:scale-[0.985]",
    "motion-reduce:transform-none",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-brand focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className
  );
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
