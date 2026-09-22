"use client";

import { Check } from "lucide-react";
import type { QuizOption } from "../../types";

interface SingleSelectCardProps {
  option: QuizOption;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
}

export function SingleSelectCard({
  option,
  isSelected,
  onSelect,
}: SingleSelectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={`w-full relative flex items-center min-h-[58px] sm:min-h-[64px] rounded-md border text-left transition-all duration-150 active:scale-[0.995] ${
        isSelected
          ? "bg-[#e5dfd5] border-[#25241f] text-[#25241f] font-medium shadow-xs"
          : "bg-white border-[#25241f]/70 text-[#25241f] hover:border-[#25241f] hover:bg-[#faf8f3]"
      }`}
    >
      {/* Social Proof Percentage (if provided, as seen in Thesis) */}
      {option.percentage && (
        <div className="w-16 sm:w-20 shrink-0 text-center font-sans text-xs sm:text-sm font-semibold text-[#25241f] border-r border-[#25241f]/20 py-3 self-stretch flex items-center justify-center">
          {option.percentage}
        </div>
      )}

      {/* Label and Checkmark */}
      <div className="flex-1 flex items-center justify-center px-4 py-3 text-center">
        <span className="flex items-center justify-center gap-2 text-sm sm:text-base leading-snug">
          {isSelected && (
            <Check className="w-4 h-4 text-[#25241f] stroke-[2.5]" />
          )}
          <span>{option.label}</span>
        </span>
      </div>
    </button>
  );
}
