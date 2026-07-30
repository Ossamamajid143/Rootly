import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Your account"
        title="Manage your ROOTLY account."
        description="Customer login and order history will be connected through Shopify later."
      />
    </main>
  );
}
