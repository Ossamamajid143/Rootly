import { Container } from "@/components/ui/container";

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
    <section className="border-b border-border py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
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
        </div>
      </Container>
    </section>
  );
}
