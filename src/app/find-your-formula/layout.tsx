import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Formula | Rootly",
  description:
    "Take our 2-minute diagnostic questionnaire to find your personalized, clinically proven adaptogen blend.",
};

export default function FindYourFormulaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fffdf8] text-[#25241f] selection:bg-[#e7dac5]">
      {children}
    </div>
  );
}
