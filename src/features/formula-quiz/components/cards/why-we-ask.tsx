import type { WhyWeAskInfo } from "../../types";

interface WhyWeAskProps {
  info: WhyWeAskInfo;
}

export function WhyWeAsk({ info }: WhyWeAskProps) {
  // Replace highlighted terms with yellow background highlighter
  const renderHighlightedText = (text: string, highlights: string[] = []) => {
    if (!highlights.length) return text;
    
    // Sort highlights by length descending to avoid partial replacements
    const sorted = [...highlights].sort((a, b) => b.length - a.length);
    const regex = new RegExp(`(${sorted.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const isMatch = sorted.some((h) => h.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <span
            key={index}
            className="bg-[#fbf377] text-[#1a1a1a] px-1 py-0.5 rounded-[2px] font-semibold"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="mt-8 pt-6 border-t border-[#ddd2bf]/50 text-left">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6f6b60] mb-2">
        {info.trigger || "WHY WE ASK"}
      </p>
      <p className="text-sm sm:text-base text-[#25241f] leading-relaxed font-normal">
        {renderHighlightedText(info.text, info.highlights)}
      </p>

      {info.sources && info.sources.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-xs text-[#6f6b60] font-medium">Based on research from:</span>
          <div className="flex flex-wrap items-center gap-2">
            {info.sources.map((source, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-sm bg-[#f2ede4] text-[#25241f] text-xs font-semibold tracking-tight border border-[#ddd2bf]"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
