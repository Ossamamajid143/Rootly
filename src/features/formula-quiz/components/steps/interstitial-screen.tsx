"use client";

import Image from "next/image";
import type { InterstitialInfo } from "../../types";

interface InterstitialScreenProps {
  info: InterstitialInfo;
  onNext: () => void;
}

export function InterstitialScreen({ info, onNext }: InterstitialScreenProps) {
  return (
    <div className="w-full max-w-xl mx-auto text-center animate-fadeIn">
      {info.eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#755525] mb-2">
          {info.eyebrow}
        </p>
      )}

      {/* Main Stat Headline */}
      <h2 className="font-serif text-3xl sm:text-4xl text-[#25241f] leading-snug font-medium mb-6">
        <span className="font-semibold text-4xl sm:text-5xl">{info.statNumber}</span>{" "}
        {info.statLabel}
      </h2>

      {/* Hero Image */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm my-6 border border-[#ddd2bf]/50">
        <Image
          src={info.imageSrc}
          alt="Clinical and lifestyle formulation"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
          priority
        />
      </div>

      {info.description && (
        <p className="text-sm sm:text-base text-[#6f6b60] leading-relaxed mb-4">
          {info.description}
        </p>
      )}

      {info.disclaimer && (
        <p className="text-xs text-[#8c887e] italic leading-normal mb-8">
          {info.disclaimer}
        </p>
      )}

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        className="w-full min-h-[52px] sm:min-h-[56px] rounded-md bg-[#25241f] hover:bg-[#3d3a33] text-white font-medium text-base transition-colors duration-150 shadow-md active:scale-[0.99]"
      >
        Next
      </button>
    </div>
  );
}
