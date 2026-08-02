import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { storefrontRoutes } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Account",
  description: "ROOTLY customer account and order-support information.",
};

export default function AccountPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Your account"
        title="Manage your ROOTLY account."
        description="A clear home for customer details, orders and support."
      />
      <Container className="py-12 sm:py-20">
        <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-border bg-surface p-8 text-center shadow-[var(--shadow-soft)] sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Customer accounts</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-forest">Secure sign-in is not connected yet.</h2>
          <p className="mt-5 text-sm leading-7 text-muted">ROOTLY will use Shopify Customer Accounts here. Until that destination is configured, we won’t show a form that cannot securely authenticate you.</p>
          <Link href={storefrontRoutes.contact} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-forest px-7 text-sm font-bold text-white transition hover:bg-brand">Get order support</Link>
        </div>
      </Container>
    </main>
  );
}
