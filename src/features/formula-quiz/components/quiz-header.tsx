"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface QuizHeaderProps {
  progress: number;
  onBack: () => void;
  canGoBack: boolean;
  isCompleted?: boolean;
  isModal?: boolean;
  onContinueToStore?: () => void;
}

export function QuizHeader({
  progress,
  onBack,
  canGoBack,
  isCompleted = false,
  isModal = false,
  onContinueToStore,
}: QuizHeaderProps) {
  return (
    <header className={`${isModal ? "sticky top-0 z-20 w-full" : "fixed top-0 left-0 right-0 z-50"} bg-[#fffdf8]/95 backdrop-blur-md border-b border-[#ddd2bf]/40 transition-all duration-300`}>
      {/* Top Thin Progress Line */}
      {!isCompleted && (
        <div className="h-1 w-full bg-[#e7dac5]/40 overflow-hidden">
          <div
            className="h-full bg-[#755525] transition-all duration-500 ease-out"
            style={{ width: `${Math.max(4, Math.min(100, progress))}%` }}
          />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {canGoBack && !isCompleted ? (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#6f6b60] hover:text-[#25241f] transition-colors py-2 px-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#755525]/30 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> BACK
          </button>
        ) : (
          <div className="w-20" />
        )}

        {/* Brand Logo - In modal mode while incomplete, disable navigation to prevent bypassing */}
        {isModal && !isCompleted ? (
          <span className="select-none" aria-label="Rootly">
            <Image
              src="/images/brand/rootly-logo.svg"
              alt="Rootly"
              width={110}
              height={36}
              priority
              className="h-8 w-auto object-contain"
            />
          </span>
        ) : (
          <Link
            href="/"
            onClick={(e) => {
              if (isModal && onContinueToStore) {
                e.preventDefault();
                onContinueToStore();
              }
            }}
            className="hover:opacity-80 transition-opacity"
            aria-label="Rootly — home"
          >
            <Image
              src="/images/brand/rootly-logo.svg"
              alt="Rootly"
              width={110}
              height={36}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>
        )}

        {!isCompleted ? (
          <span className="w-20 text-right text-xs font-mono font-semibold text-[#6f6b60]">
            {progress}%
          </span>
        ) : onContinueToStore ? (
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider text-[#755525] bg-[#e7dac5]/50 px-2.5 py-1 rounded-full">
              Matched
            </span>
            <button
              type="button"
              onClick={onContinueToStore}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white bg-[#25241f] hover:bg-[#3d3a33] transition-colors py-1.5 px-3 rounded-md shadow-xs cursor-pointer"
            >
              <span>Explore Store</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        ) : (
          <div className="w-20 text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#755525] bg-[#e7dac5]/50 px-2.5 py-1 rounded-full">
              Matched
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
