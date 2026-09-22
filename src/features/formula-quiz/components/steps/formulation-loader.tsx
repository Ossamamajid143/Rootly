"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface FormulationLoaderProps {
  onComplete: () => void;
}

const FORMULATION_STAGES = [
  "Analyzing metabolic & circadian inputs...",
  "Cross-referencing clinical adaptogen database...",
  "Calibrating active constituent milligram ratios...",
  "Formulating your custom personalized blend...",
];

export function FormulationLoader({ onComplete }: FormulationLoaderProps) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < FORMULATION_STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return prev;
        }
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full max-w-md mx-auto text-center py-12 sm:py-20 px-4">
      {/* Animated Scientific Pulse */}
      <div className="relative mx-auto w-24 h-24 mb-10 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-[#755525]/20 animate-ping" />
        <div className="absolute inset-2 rounded-full border-2 border-t-[#755525] border-r-[#755525] border-b-transparent border-l-transparent animate-spin" />
        <div className="w-12 h-12 rounded-full bg-[#f2ede4] flex items-center justify-center text-[#755525] font-serif text-lg font-bold shadow-inner">
          R
        </div>
      </div>

      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#25241f] mb-3">
        Formulating Your Blend
      </h3>
      <p className="text-sm text-[#6f6b60] mb-8">
        Tailoring precise botanical dosages to your unique biological profile.
      </p>

      {/* Stage Checklist */}
      <div className="space-y-3.5 text-left bg-white/70 backdrop-blur-sm border border-[#ddd2bf]/70 rounded-xl p-5 shadow-xs">
        {FORMULATION_STAGES.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                idx > currentStage ? "opacity-35" : "opacity-100"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 transition-colors ${
                  isDone
                    ? "bg-[#755525] text-white"
                    : isCurrent
                    ? "border-2 border-[#755525] bg-[#f8f4eb]"
                    : "border border-[#ddd2bf] bg-white"
                }`}
              >
                {isDone ? (
                  <Check className="w-3 h-3 stroke-[3]" />
                ) : isCurrent ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#755525] animate-pulse" />
                ) : null}
              </div>
              <span
                className={`text-xs sm:text-sm ${
                  isCurrent
                    ? "font-semibold text-[#25241f]"
                    : isDone
                    ? "text-[#4a4740]"
                    : "text-[#8c887e]"
                }`}
              >
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
