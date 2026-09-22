"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface QuizHeaderProps {
  progress: number;
  onBack: () => void;
  canGoBack: boolean;
  isCompleted?: boolean;
}

export function QuizHeader({
  progress,
  onBack,
  canGoBack,
  isCompleted = false,
}: QuizHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fffdf8]/95 backdrop-blur-md border-b border-[#ddd2bf]/40 transition-all duration-300">
      {/* Top Thin Progress Line */}
      {!isCompleted && (
        <div className="h-1 w-full bg-[#e7dac5]/40 overflow-hidden">
          <div
            className="h-full bg-[#755525] transition-all duration-500 ease-out"
            style={{ width: `${Math.max(4, Math.min(100, progress))}%` }}
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {canGoBack && !isCompleted ? (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#6f6b60] hover:text-[#25241f] transition-colors py-2 px-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#755525]/30"
          >
            <ChevronLeft className="w-4 h-4" /> BACK
          </button>
        ) : (
          <div className="w-16" />
        )}

        <Link
          href="/"
          className="font-serif text-2xl sm:text-3xl tracking-wide text-[#25241f] font-semibold hover:opacity-90 transition-opacity"
        >
          Thesis
        </Link>

        {!isCompleted ? (
          <span className="w-16 text-right text-xs font-mono font-semibold text-[#6f6b60]">
            {progress}%
          </span>
        ) : (
          <div className="w-16 text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#755525] bg-[#e7dac5]/50 px-2.5 py-1 rounded-full">
              Matched
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
