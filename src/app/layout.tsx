import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { MotionProvider } from "@/components/motion/motion-provider";
import { CartProvider } from "@/features/cart/cart-provider";
import { AuthProvider } from "@/features/auth/auth-provider";
import { MandatoryQuizModal } from "@/features/formula-quiz/components/mandatory-quiz-modal";
import { siteConfig } from "@/config/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${manrope.variable} ${cormorant.variable} antialiased`}
      >
        <MotionProvider>
          <CartProvider>
            <AuthProvider>
              <MandatoryQuizModal />
              {children}
            </AuthProvider>
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
