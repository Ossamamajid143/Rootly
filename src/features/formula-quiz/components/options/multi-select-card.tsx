"use client";

import { Check } from "lucide-react";
import type { QuizOption } from "../../types";

interface MultiSelectCardProps {
  option: QuizOption;
  isSelected: boolean;
  onToggle: (optionId: string) => void;
}

export function MultiSelectCard({
  option,
  isSelected,
  onToggle,
}: MultiSelectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(option.id)}
      className={`w-full relative flex items-center justify-center min-h-[56px] sm:min-h-[62px] rounded-md border text-center transition-all duration-150 active:scale-[0.995] px-4 py-3 ${
        isSelected
          ? "bg-[#e5dfd5] border-[#25241f] text-[#25241f] font-medium shadow-xs"
          : "bg-white border-[#25241f]/70 text-[#25241f] hover:border-[#25241f] hover:bg-[#faf8f3]"
      }`}
    >
      <span className="flex items-center justify-center gap-2 text-sm sm:text-base leading-snug">
        {isSelected && (
          <Check className="w-4 h-4 text-[#25241f] stroke-[2.5]" />
        )}
        <span>{option.label}</span>
      </span>
    </button>
  );
}
