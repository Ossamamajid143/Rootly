import { Container } from "@/components/ui/container";
import { OrganicDivider } from "@/components/ui/organic-divider";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

interface PageIntroProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: PageIntroProps) {
  return (
    <section className="editorial-grid relative border-b border-border bg-sand/40 pt-16 sm:pt-24">
      <Container className="pb-16 sm:pb-24">
        <ScrollReveal className="max-w-4xl">
          {eyebrow && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand sm:text-sm">
              {eyebrow}
            </p>
          )}

          <h1 className="font-display text-5xl font-semibold leading-[0.95] text-forest sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {description}
          </p>
        </ScrollReveal>
      </Container>
      <OrganicDivider />
    </section>
  );
}
