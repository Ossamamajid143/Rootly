"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Truck,
  Gift,
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import type { CustomFormulaProfile, UserQuizAnswers } from "../../types";
import { useCart } from "@/features/cart/cart-provider";

interface FormulaRecommendationPageProps {
  formula: CustomFormulaProfile;
  answers: UserQuizAnswers;
  onRetakeQuiz: () => void;
}

type SupplyTier = "oneMonth" | "twoMonth" | "threeMonth";

export function FormulaRecommendationPage({
  formula,
  answers,
  onRetakeQuiz,
}: FormulaRecommendationPageProps) {
  const cart = useCart();
  const [selectedTier, setSelectedTier] = useState<SupplyTier>("threeMonth");
  const [withCaffeine, setWithCaffeine] = useState<boolean>(
    answers.caffeineIntake !== "none"
  );
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [howToUseOpen, setHowToUseOpen] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const userName = answers.name?.trim() ? answers.name.trim() : "Your";
  const currentPricing = formula.pricing[selectedTier];

  const galleryImages = [
    {
      title: "Supplement Facts",
      type: "facts",
    },
    {
      title: "Clinical Packaging",
      src: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Formula Box & Daily Packs",
      src: "https://images.unsplash.com/photo-1616671285442-992d99d91f1a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Botanical Plant Actives",
      src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleStartNow = async () => {
    setIsAdding(true);
    try {
      // Add formula as custom line item into cart
      cart.addLine(
        {
          merchandiseId: `formula-${formula.slug}-${selectedTier}-${withCaffeine ? "caff" : "nocaff"}`,
          productHandle: `formula-${formula.slug}`,
          productTitle: `${userName}'s Formula · ${formula.title}`,
          variantTitle: `${selectedTier === "threeMonth" ? "3-Month Supply" : selectedTier === "twoMonth" ? "2-Month Supply" : "1-Month Supply"} (${withCaffeine ? "With Caffeine" : "Without Caffeine"})`,
          price: {
            amount: currentPricing.discountedPrice.toString(),
            currencyCode: "USD",
          },
          image: {
            url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
            altText: formula.title,
            width: 800,
            height: 800,
          },
        },
        1
      );
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3500);
    } catch (err) {
      console.error("Failed to add formula to cart:", err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="w-full bg-[#fffdf8] pb-24 text-[#25241f]">
      {/* Top Banner Notice */}
      <div className="bg-[#25241f] text-white text-xs font-semibold py-2 px-4 text-center tracking-widest uppercase">
        Personalized Formulation Complete · Special Welcome Discount Applied
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Main Product / Recommendation Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* LEFT: Supplement Facts Card & Gallery (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Supplement Facts & Badges Box */}
            <div className="border border-[#25241f] rounded-lg p-5 sm:p-6 bg-white shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                
                {/* Supplement Facts Table (md:col-span-8) */}
                <div className="md:col-span-8 border-b md:border-b-0 md:border-r border-[#25241f]/20 pb-5 md:pb-0 md:pr-5">
                  <h3 className="font-serif text-2xl font-bold tracking-tight text-[#25241f]">
                    Supplement Facts
                  </h3>
                  <p className="text-xs text-[#6f6b60] mt-0.5 mb-3">
                    • {formula.slug.toUpperCase()}: 2 capsules per serving, 25 servings per container
                  </p>

                  <div className="border-t-4 border-[#25241f] text-xs">
                    <div className="flex justify-between font-bold py-1.5 border-b border-[#25241f]/30">
                      <span>Amount Per Serving</span>
                      <span>% DV</span>
                    </div>

                    {formula.activeIngredients.map((ing, i) => (
                      <div
                        key={i}
                        className="py-2 border-b border-[#25241f]/15 flex justify-between items-start text-xs"
                      >
                        <div className="pr-3">
                          <p className="font-bold text-[#25241f]">{ing.name}</p>
                          {ing.latinName && (
                            <p className="text-[11px] text-[#6f6b60] italic">
                              {ing.latinName}
                            </p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-semibold text-[#25241f] block">
                            {ing.amount}
                          </span>
                          <span className="text-[10px] text-[#6f6b60]">
                            {ing.dailyValue || "†"}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Caffeine line item conditional */}
                    <div className="py-2 border-b border-[#25241f]/15 flex justify-between items-start text-xs">
                      <div>
                        <p className="font-bold text-[#25241f]">
                          {withCaffeine ? "Natural Caffeine (from Coffeeberry®)" : "Active Co-Factor Blend"}
                        </p>
                        <p className="text-[11px] text-[#6f6b60] italic">
                          {withCaffeine ? "Synergistic botanical stimulant" : "Smooth stimulant-free focus"}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-semibold text-[#25241f] block">
                          {withCaffeine ? "100 mg" : "Matched"}
                        </span>
                        <span className="text-[10px] text-[#6f6b60]">†</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-[#6f6b60] pt-2 italic">
                      † Daily Value (DV) not established.
                    </p>
                    <p className="text-[10px] text-[#6f6b60] pt-1 leading-relaxed">
                      Other Ingredients: Vegetable Cellulose, Microcrystalline Cellulose, Magnesium Stearate, Silicon Dioxide.
                    </p>
                  </div>
                </div>

                {/* Badges Column (md:col-span-4) */}
                <div className="md:col-span-4 flex flex-col justify-around gap-4 text-center md:text-left py-1">
                  <div className="flex items-center md:items-start gap-2.5">
                    <span className="text-xl">🇺🇸</span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#25241f] leading-tight">
                        MADE IN USA
                      </p>
                      <p className="text-[9px] text-[#6f6b60]">With globally sourced ingredients</p>
                    </div>
                  </div>

                  <div className="flex items-center md:items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#25241f] shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#25241f] leading-tight">
                        GMP REGULATED
                      </p>
                      <p className="text-[9px] text-[#6f6b60]">Manufactured in FDA-audited facility</p>
                    </div>
                  </div>

                  <div className="flex items-center md:items-start gap-2.5">
                    <Sparkles className="w-5 h-5 text-[#25241f] shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#25241f] leading-tight">
                        STANDARDIZED
                      </p>
                      <p className="text-[9px] text-[#6f6b60]">Guaranteed active constituent ratios</p>
                    </div>
                  </div>

                  <div className="flex items-center md:items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#25241f] shrink-0 stroke-[2.5]" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#25241f] leading-tight">
                        THIRD-PARTY TESTED
                      </p>
                      <p className="text-[9px] text-[#6f6b60]">Heavy metals & purity certified</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="grid grid-cols-4 gap-2.5">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveThumb(i)}
                  className={`relative aspect-[4/3] rounded-md overflow-hidden border transition-all ${
                    activeThumb === i
                      ? "border-[#25241f] ring-1 ring-[#25241f]"
                      : "border-[#ddd2bf] opacity-75 hover:opacity-100"
                  }`}
                >
                  {img.type === "facts" ? (
                    <div className="w-full h-full bg-[#f8f4eb] flex flex-col items-center justify-center p-1 text-center">
                      <span className="font-serif text-[10px] font-bold uppercase">Supplement</span>
                      <span className="text-[8px] text-[#6f6b60]">Facts</span>
                    </div>
                  ) : (
                    <Image
                      src={img.src!}
                      alt={img.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: Formula Details & Subscription Selector (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Reviews Rating & Name Title */}
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#25241f] mb-2 font-medium">
                <div className="flex text-[#25241f]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#25241f]" />
                  ))}
                </div>
                <span className="font-bold">4.7 Stars</span>
                <span className="text-[#6f6b60]">({formula.reviewCount.toLocaleString()} Reviews)</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#25241f] lowercase first-letter:capitalize">
                {userName}&apos;s Formula
              </h1>

              {/* Goal Pills */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {formula.goals.map((goal, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#25241f]/30 px-3 py-1 text-xs font-semibold text-[#25241f]"
                  >
                    <span>{goal.icon}</span>
                    <span>{goal.label}</span>
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-base text-[#4a4740] leading-relaxed">
                {formula.description}
              </p>
            </div>

            {/* WITH / WITHOUT CAFFEINE Tabs */}
            <div className="border-b border-[#25241f]/20">
              <div className="grid grid-cols-2 text-center text-xs font-bold tracking-wider uppercase">
                <button
                  type="button"
                  onClick={() => setWithCaffeine(true)}
                  className={`pb-3 transition-colors ${
                    withCaffeine
                      ? "border-b-2 border-[#25241f] text-[#25241f]"
                      : "text-[#8c887e] hover:text-[#25241f]"
                  }`}
                >
                  WITH CAFFEINE
                </button>
                <button
                  type="button"
                  onClick={() => setWithCaffeine(false)}
                  className={`pb-3 transition-colors ${
                    !withCaffeine
                      ? "border-b-2 border-[#25241f] text-[#25241f]"
                      : "text-[#8c887e] hover:text-[#25241f]"
                  }`}
                >
                  WITHOUT CAFFEINE
                </button>
              </div>
            </div>

            {/* Subscription Supply Tiers */}
            <div className="space-y-3">
              
              {/* 1 Month Supply */}
              <label
                onClick={() => setSelectedTier("oneMonth")}
                className={`relative flex items-center justify-between p-4 rounded-md border cursor-pointer transition-all ${
                  selectedTier === "oneMonth"
                    ? "border-[#25241f] bg-[#fdfbf7] shadow-xs"
                    : "border-[#25241f]/40 hover:border-[#25241f] bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedTier === "oneMonth"
                        ? "border-[#25241f] bg-white"
                        : "border-[#6f6b60]"
                    }`}
                  >
                    {selectedTier === "oneMonth" && (
                      <div className="w-2 h-2 rounded-full bg-[#25241f]" />
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-[#25241f]">1 Month Supply</span>
                    <div className="mt-1">
                      <span className="bg-[#fbf377] text-black font-bold text-[11px] px-1.5 py-0.5 rounded-xs">
                        Save 54%
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6f6b60] mt-1.5">
                      {formula.pricing.oneMonth.perDose} · Ships Every 25 Days
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="line-through text-xs text-[#8c887e] block">
                    ${formula.pricing.oneMonth.originalPrice}
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#25241f]">
                    ${formula.pricing.oneMonth.discountedPrice}
                  </span>
                  <span className="block text-[10px] text-[#6f6b60]">
                    then $79/mo
                  </span>
                </div>
              </label>

              {/* 2 Month Supply */}
              <label
                onClick={() => setSelectedTier("twoMonth")}
                className={`relative flex items-center justify-between p-4 rounded-md border cursor-pointer transition-all ${
                  selectedTier === "twoMonth"
                    ? "border-[#25241f] bg-[#fdfbf7] shadow-xs"
                    : "border-[#25241f]/40 hover:border-[#25241f] bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedTier === "twoMonth"
                        ? "border-[#25241f] bg-white"
                        : "border-[#6f6b60]"
                    }`}
                  >
                    {selectedTier === "twoMonth" && (
                      <div className="w-2 h-2 rounded-full bg-[#25241f]" />
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-[#25241f]">2 Month Supply</span>
                    <div className="mt-1">
                      <span className="bg-[#fbf377] text-black font-bold text-[11px] px-1.5 py-0.5 rounded-xs">
                        Save 58%
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6f6b60] mt-1.5">
                      {formula.pricing.twoMonth.perDose} · Ships Every 50 Days
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="line-through text-xs text-[#8c887e] block">
                    ${formula.pricing.twoMonth.originalPrice}
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#25241f]">
                    ${formula.pricing.twoMonth.discountedPrice}
                  </span>
                  <span className="block text-[10px] text-[#6f6b60]">
                    then $74/mo
                  </span>
                </div>
              </label>

              {/* 3 Month Supply (Best Value) */}
              <label
                onClick={() => setSelectedTier("threeMonth")}
                className={`relative flex items-center justify-between p-4 rounded-md border cursor-pointer transition-all ${
                  selectedTier === "threeMonth"
                    ? "border-[#25241f] bg-[#fdfbf7] shadow-xs ring-1 ring-[#25241f]"
                    : "border-[#25241f]/40 hover:border-[#25241f] bg-white"
                }`}
              >
                {/* Best Value Pill */}
                <span className="absolute -top-2.5 right-4 bg-[#25241f] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Best Value
                </span>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedTier === "threeMonth"
                        ? "border-[#25241f] bg-white"
                        : "border-[#6f6b60]"
                    }`}
                  >
                    {selectedTier === "threeMonth" && (
                      <div className="w-2 h-2 rounded-full bg-[#25241f]" />
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-[#25241f]">3 Month Supply</span>
                    <div className="mt-1">
                      <span className="bg-[#fbf377] text-black font-bold text-[11px] px-1.5 py-0.5 rounded-xs">
                        Save 62%
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6f6b60] mt-1.5">
                      {formula.pricing.threeMonth.perDose} · Ships Every 75 Days
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="line-through text-xs text-[#8c887e] block">
                    ${formula.pricing.threeMonth.originalPrice}
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#25241f]">
                    ${formula.pricing.threeMonth.discountedPrice}
                  </span>
                  <span className="block text-[10px] text-[#6f6b60]">
                    then $69/mo
                  </span>
                </div>
              </label>

            </div>

            {/* Start Now CTA Button */}
            <div>
              <button
                type="button"
                onClick={handleStartNow}
                disabled={isAdding}
                className="w-full min-h-[54px] sm:min-h-[58px] rounded-md bg-[#25241f] hover:bg-[#3d3a33] text-white font-medium text-base sm:text-lg transition-all duration-150 shadow-md flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75"
              >
                {isAdding ? (
                  <span>Adding to your order...</span>
                ) : addedSuccess ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-5 h-5 stroke-[2.5]" /> Formula Added to Cart!
                  </span>
                ) : (
                  <>
                    <span>Start Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center mt-3">
                <button
                  type="button"
                  onClick={handleStartNow}
                  className="text-xs text-[#25241f] underline font-medium hover:text-[#755525] transition-colors"
                >
                  One time purchase, ${formula.pricing.oneTimePrice}
                </button>
              </div>
            </div>

            {/* Reassurance Icons */}
            <div className="border-t border-[#ddd2bf]/70 pt-5 space-y-2.5 text-xs text-[#4a4740]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#25241f]" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#25241f]" />
                <span>Free shipping on all formula orders</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Gift className="w-4 h-4 text-[#25241f]" />
                <span>Free gifts included with your subscription routine</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#ddd2bf]/70 divide-y divide-[#ddd2bf]/50">
              
              {/* Ingredients Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setIngredientsOpen(!ingredientsOpen)}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-lg font-medium text-[#25241f] hover:text-[#755525] transition-colors"
                >
                  <span>Ingredients & Botanical Mechanism</span>
                  {ingredientsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {ingredientsOpen && (
                  <div className="pb-5 space-y-4 text-xs sm:text-sm text-[#4a4740]">
                    {formula.activeIngredients.map((ing, i) => (
                      <div key={i} className="bg-[#f8f4eb]/60 rounded-md p-3.5 border border-[#ddd2bf]/60">
                        <div className="flex justify-between items-baseline mb-1">
                          <p className="font-bold text-[#25241f]">{ing.name}</p>
                          <span className="text-xs font-mono font-semibold text-[#755525]">{ing.amount}</span>
                        </div>
                        <p className="text-[11px] text-[#755525] font-medium mb-1">{ing.purpose}</p>
                        <p className="text-xs text-[#6f6b60] leading-relaxed">{ing.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* How To Use Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setHowToUseOpen(!howToUseOpen)}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-lg font-medium text-[#25241f] hover:text-[#755525] transition-colors"
                >
                  <span>How To Take Your Daily Routine</span>
                  {howToUseOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {howToUseOpen && (
                  <div className="pb-5 space-y-3 text-xs sm:text-sm text-[#4a4740] leading-relaxed">
                    <p><strong>Dosage:</strong> {formula.howToUse.dosage}</p>
                    <p><strong>Timing:</strong> {formula.howToUse.timing}</p>
                    <p><strong>Clinical Protocol:</strong> {formula.howToUse.instructions}</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* ============================================================== */}
        {/* BELOW THE FOLD: 30-Day Clinical Customer Outcomes (Screenshot 3) */}
        {/* ============================================================== */}
        <section className="mt-20 pt-16 border-t border-[#ddd2bf]">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#25241f] leading-tight">
              {formula.slug.charAt(0).toUpperCase() + formula.slug.slice(1)} has helped hundreds of thousands of customers focus—and follow through.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#6f6b60] max-w-2xl mx-auto leading-relaxed">
              Don&apos;t just take our word for it. See for yourself what customers experience within 30 days of taking their personalized formula.
            </p>
          </div>

          {/* 3 Outcome Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            
            {/* Card 1: Vertical Bar (e.g. 83% felt more focused) */}
            <div className="bg-white border border-[#ddd2bf] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <p className="font-serif text-4xl sm:text-5xl font-bold text-[#25241f]">
                  {formula.metrics.primary1.stat}
                </p>
                <p className="text-xs sm:text-sm text-[#4a4740] mt-2 font-medium">
                  {formula.metrics.primary1.label}
                </p>
              </div>

              {/* Vertical Thermometer / Cylinder Gauge */}
              <div className="mt-8 flex items-center justify-center">
                <div className="relative w-20 h-56 border border-[#25241f] rounded-xs bg-white overflow-hidden flex flex-col justify-end">
                  {/* Gauge marker lines */}
                  <div className="absolute top-[25%] left-0 right-0 border-b border-[#25241f]/20 z-10" />
                  <div className="absolute top-[50%] left-0 right-0 border-b border-[#25241f]/20 z-10" />
                  <div className="absolute top-[75%] left-0 right-0 border-b border-[#25241f]/20 z-10" />
                  {/* Target line */}
                  <div
                    className="absolute left-0 right-0 border-b-2 border-[#25241f] z-20"
                    style={{ bottom: `${formula.metrics.primary1.percentage}%` }}
                  />

                  {/* Gradient fill */}
                  <div
                    className="w-full bg-gradient-to-t from-[#40a9ff] to-[#69c0ff] transition-all duration-1000 ease-out"
                    style={{ height: `${formula.metrics.primary1.percentage}%` }}
                  />
                </div>

                {/* Y-Axis percentage labels */}
                <div className="ml-3 h-56 flex flex-col justify-between text-[10px] font-mono text-[#8c887e]">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>
              </div>
            </div>

            {/* Card 2: Vertical Bar (e.g. 78% reduction in brain fog) */}
            <div className="bg-white border border-[#ddd2bf] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <p className="font-serif text-4xl sm:text-5xl font-bold text-[#25241f]">
                  {formula.metrics.primary2.stat}
                </p>
                <p className="text-xs sm:text-sm text-[#4a4740] mt-2 font-medium">
                  {formula.metrics.primary2.label}
                </p>
              </div>

              {/* Vertical Thermometer Gauge */}
              <div className="mt-8 flex items-center justify-center">
                <div className="relative w-20 h-56 border border-[#25241f] rounded-xs bg-white overflow-hidden flex flex-col justify-end">
                  <div className="absolute top-[25%] left-0 right-0 border-b border-[#25241f]/20 z-10" />
                  <div className="absolute top-[50%] left-0 right-0 border-b border-[#25241f]/20 z-10" />
                  <div className="absolute top-[75%] left-0 right-0 border-b border-[#25241f]/20 z-10" />
                  <div
                    className="absolute left-0 right-0 border-b-2 border-[#25241f] z-20"
                    style={{ bottom: `${formula.metrics.primary2.percentage}%` }}
                  />

                  <div
                    className="w-full bg-gradient-to-t from-[#40a9ff] to-[#69c0ff] transition-all duration-1000 ease-out"
                    style={{ height: `${formula.metrics.primary2.percentage}%` }}
                  />
                </div>

                <div className="ml-3 h-56 flex flex-col justify-between text-[10px] font-mono text-[#8c887e]">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>
              </div>
            </div>

            {/* Card 3: Horizontal Progress Bars */}
            <div className="bg-white border border-[#ddd2bf] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <p className="text-xs text-[#6f6b60] uppercase tracking-wider font-semibold">
                  Results from real customers* within
                </p>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#25241f] mt-1">
                  30 days
                </p>
              </div>

              {/* Progress bars list */}
              <div className="space-y-5 my-6">
                {formula.metrics.bars.map((bar, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center text-xs font-semibold text-[#25241f] mb-1.5">
                      <span>{bar.label}</span>
                      <span className="bg-[#fbf377] text-black font-bold text-[11px] px-1.5 py-0.5 rounded-xs">
                        {bar.percentage}%
                      </span>
                    </div>
                    <div className="h-6 border border-[#25241f] rounded-xs bg-white overflow-hidden p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-[#bae7ff] to-[#40a9ff] transition-all duration-1000 ease-out"
                        style={{ width: `${bar.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-[#8c887e] italic">
                *Based on active feedback logs and double-blind customer perception metrics.
              </p>
            </div>

          </div>

          {/* Bottom Retake Button */}
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={onRetakeQuiz}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#6f6b60] hover:text-[#25241f] transition-colors py-2 px-4 rounded-full border border-[#ddd2bf] hover:bg-[#f8f4eb]"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Diagnostic Quiz
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
