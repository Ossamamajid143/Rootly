"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FormulaQuizContainer } from "./formula-quiz-container";

export function MandatoryQuizModal() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already completed the diagnostic quiz
    try {
      const isCompleted =
        localStorage.getItem("rootly_quiz_completed") === "true" ||
        document.cookie.includes("rootly_quiz_completed=true");

      if (!isCompleted) {
        setIsOpen(true);
      }
    } catch {
      // Fallback if storage access is restricted
      setIsOpen(true);
    } finally {
      setMounted(true);
    }
  }, []);

  // Trap Escape key to ensure the popup is strictly mandatory
  useEffect(() => {
    if (!isOpen) return;

    const blockEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("keydown", blockEscapeKey, true);
    return () => window.removeEventListener("keydown", blockEscapeKey, true);
  }, [isOpen]);

  // Lock body & html scrolling so background website cannot be interacted with
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isOpen]);

  const handleUnlockAndContinue = () => {
    try {
      localStorage.setItem("rootly_quiz_completed", "true");
      document.cookie =
        "rootly_quiz_completed=true; path=/; max-age=31536000; SameSite=Lax";
    } catch (e) {
      console.error("[Mandatory Quiz] Failed to persist completion flag:", e);
    }
    setIsOpen(false);
  };

  // Do not render on server, when already closed, or if the user is already on the dedicated /find-your-formula page
  if (
    !mounted ||
    !isOpen ||
    pathname?.startsWith("/find-your-formula") ||
    pathname?.startsWith("/api")
  ) {
    return null;
  }

  return (
    <div
      id="mandatory-formula-quiz-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Find Your Formula Diagnostic Consultation"
      className="fixed inset-0 z-[9999] bg-black/65 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-5 md:p-8 overflow-y-auto selection:bg-[#e7dac5]"
      style={{ overscrollBehavior: "contain" }}
    >
      {/* Floating Modal Window */}
      <div
        className="relative w-full max-w-2xl bg-[#fffdf8] rounded-2xl shadow-2xl border border-[#ddd2bf] overflow-hidden my-auto flex flex-col max-h-[94vh] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Modal Quiz Content */}
        <div className="flex-1 overflow-y-auto">
          <FormulaQuizContainer
            isModal={true}
            onCompleteAndContinue={handleUnlockAndContinue}
          />
        </div>
      </div>
    </div>
  );
}
