import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { storeConfig } from "@/config/site";

interface PolicySection {
  title: string;
  paragraphs: readonly string[];
}

interface PolicyPageProps {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly PolicySection[];
}

export function PolicyPage({
  eyebrow,
  title,
  description,
  sections,
}: PolicyPageProps) {
  return (
    <main>
      <PageIntro
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <Container className="py-12 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
          <article className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <aside className="rounded-[2rem] border border-border bg-surface p-6 lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
              Need clarification?
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Contact ROOTLY before placing an order if you need information
              that is not covered here.
            </p>
            <a
              href={`mailto:${storeConfig.email}`}
              className="mt-5 inline-flex font-semibold text-brand underline decoration-1 underline-offset-4"
            >
              {storeConfig.email}
            </a>
          </aside>
        </div>
      </Container>
    </main>
  );
}
