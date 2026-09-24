"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QUIZ_STEPS } from "../data/quiz-questions";
import { selectFormulaForUser } from "../data/formulas";
import type { UserQuizAnswers } from "../types";
import { QuizHeader } from "./quiz-header";
import { SingleSelectCard } from "./options/single-select-card";
import { MultiSelectCard } from "./options/multi-select-card";
import { WhyWeAsk } from "./cards/why-we-ask";
import { InterstitialScreen } from "./steps/interstitial-screen";
import { FormulationLoader } from "./steps/formulation-loader";
import { FormulaRecommendationPage } from "./results/formula-recommendation-page";
import { ArrowRight } from "lucide-react";

interface FormulaQuizContainerProps {
  isModal?: boolean;
  onCompleteAndContinue?: () => void;
}

export function FormulaQuizContainer({
  isModal = false,
  onCompleteAndContinue,
}: FormulaQuizContainerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<UserQuizAnswers>({});
  const [textInputValue, setTextInputValue] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = QUIZ_STEPS[stepIndex];

  const handleNext = () => {
    if (stepIndex < QUIZ_STEPS.length - 1) {
      setStepIndex((prev) => prev + 1);
      setTextInputValue("");
      setEmailError("");
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
      setTextInputValue("");
      setEmailError("");
    }
  };

  const handleSingleSelect = (stepId: string, optionId: string) => {
    if (stepId === "age") setAnswers((prev) => ({ ...prev, age: optionId }));
    if (stepId === "sex") setAnswers((prev) => ({ ...prev, sex: optionId }));
    if (stepId === "energy-dip") setAnswers((prev) => ({ ...prev, energyDip: optionId }));
    if (stepId === "caffeine") setAnswers((prev) => ({ ...prev, caffeineIntake: optionId }));
    if (stepId === "sleep") setAnswers((prev) => ({ ...prev, sleepQuality: optionId }));
    if (stepId === "brain-fog") setAnswers((prev) => ({ ...prev, brainFog: optionId }));

    // Instant smooth advance with brief visual confirmation
    setTimeout(() => {
      handleNext();
    }, 220);
  };

  const handleToggleGoal = (optionId: string) => {
    setAnswers((prev) => {
      const current = prev.goals || [];
      const updated = current.includes(optionId)
        ? current.filter((g) => g !== optionId)
        : [...current, optionId];
      return { ...prev, goals: updated };
    });
  };

  const submitLeadToBackend = async (
    userAnswers: UserQuizAnswers,
    formula: ReturnType<typeof selectFormulaForUser>
  ) => {
    try {
      await fetch("/api/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userAnswers.email,
          name: userAnswers.name,
          marketingConsent: Boolean(userAnswers.marketingConsent),
          answers: userAnswers,
          formula: {
            id: formula.id,
            slug: formula.slug,
            title: formula.title,
            matchPercentage: formula.matchPercentage,
          },
        }),
      });
    } catch (err) {
      console.error("[Quiz Lead Submission] Failed to submit lead to backend:", err);
    }
  };

  const handleTextInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    const trimmed = textInputValue.trim();

    if (currentStep.id === "name") {
      if (!trimmed) return;
      setAnswers((prev) => ({ ...prev, name: trimmed }));
      handleNext();
    } else if (currentStep.id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!trimmed || !emailRegex.test(trimmed)) {
        setEmailError("Please enter a valid email address to receive your results.");
        return;
      }

      const updatedAnswers: UserQuizAnswers = {
        ...answers,
        email: trimmed,
        marketingConsent,
      };
      setAnswers(updatedAnswers);

      // Submit lead to backend and Shopify customer API with explicit marketing consent
      const formula = selectFormulaForUser(updatedAnswers.goals || []);
      void submitLeadToBackend(updatedAnswers, formula);

      handleNext();
    }
  };

  const selectedFormula = selectFormulaForUser(answers.goals || []);

  // When analyzing loader completes, show recommendation page and record completion
  const handleAnalyzingComplete = () => {
    setIsCompleted(true);
    try {
      localStorage.setItem("rootly_quiz_completed", "true");
      document.cookie = "rootly_quiz_completed=true; path=/; max-age=31536000; SameSite=Lax";
    } catch (e) {
      console.error("Failed to save quiz completion state:", e);
    }
  };

  const handleRetake = () => {
    setIsCompleted(false);
    setStepIndex(0);
    setAnswers({});
    setTextInputValue("");
    setEmailError("");
  };

  return (
    <div className={`${isModal ? "flex-1 flex flex-col w-full" : "min-h-screen"} bg-[#fffdf8] flex flex-col font-sans selection:bg-[#e7dac5]`}>
      {/* Distraction-Free Header */}
      <QuizHeader
        progress={currentStep.progressPercentage}
        onBack={handleBack}
        canGoBack={stepIndex > 0 && !isCompleted}
        isCompleted={isCompleted}
        isModal={isModal}
        onContinueToStore={onCompleteAndContinue}
      />

      <main className={`flex-1 flex flex-col justify-center ${isModal ? "py-6 sm:py-8 px-4 sm:px-8" : "pt-20 pb-16 sm:pt-24 sm:pb-20 px-4 sm:px-6"}`}>
        {isCompleted ? (
          <FormulaRecommendationPage
            formula={selectedFormula}
            answers={answers}
            onRetakeQuiz={handleRetake}
            onContinueToStore={onCompleteAndContinue}
          />
        ) : (
          <div className="w-full max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                {/* 1. SINGLE-SELECT STEP (Age, Sex, Energy Dip, Caffeine, Sleep, Brain Fog) */}
                {currentStep.type === "single-select" && (
                  <div className="text-center">
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#25241f] leading-snug font-medium mb-8">
                      {currentStep.title}
                    </h2>

                    <div className="space-y-3">
                      {currentStep.options?.map((opt) => {
                        const currentAnswer =
                          currentStep.id === "age"
                            ? answers.age
                            : currentStep.id === "sex"
                            ? answers.sex
                            : currentStep.id === "energy-dip"
                            ? answers.energyDip
                            : currentStep.id === "caffeine"
                            ? answers.caffeineIntake
                            : currentStep.id === "sleep"
                            ? answers.sleepQuality
                            : currentStep.id === "brain-fog"
                            ? answers.brainFog
                            : undefined;

                        const isSelected = currentAnswer === opt.id;

                        return (
                          <SingleSelectCard
                            key={opt.id}
                            option={opt}
                            isSelected={isSelected}
                            onSelect={(id) => handleSingleSelect(currentStep.id, id)}
                          />
                        );
                      })}
                    </div>

                    {/* Why We Ask Card */}
                    {currentStep.whyWeAsk && <WhyWeAsk info={currentStep.whyWeAsk} />}
                  </div>
                )}

                {/* 2. MULTI-SELECT STEP (Goals) */}
                {currentStep.type === "multi-select" && (
                  <div className="text-center">
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#25241f] leading-snug font-medium mb-2">
                      {currentStep.title}
                    </h2>
                    {currentStep.subtitle && (
                      <p className="text-sm text-[#6f6b60] mb-8 font-medium">
                        {currentStep.subtitle}
                      </p>
                    )}

                    <div className="space-y-3">
                      {currentStep.options?.map((opt) => {
                        const isSelected = answers.goals?.includes(opt.id) || false;
                        return (
                          <MultiSelectCard
                            key={opt.id}
                            option={opt}
                            isSelected={isSelected}
                            onToggle={handleToggleGoal}
                          />
                        );
                      })}
                    </div>

                    {/* Next Action Button */}
                    <div className="mt-8">
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={(answers.goals?.length || 0) === 0}
                        className="w-full min-h-[52px] sm:min-h-[56px] rounded-md bg-[#25241f] hover:bg-[#3d3a33] disabled:opacity-50 text-white font-medium text-base transition-colors duration-150 shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. INTERSTITIAL PROOF SCREEN */}
                {currentStep.type === "interstitial" && currentStep.interstitial && (
                  <InterstitialScreen
                    info={currentStep.interstitial}
                    onNext={handleNext}
                  />
                )}

                {/* 4. TEXT / EMAIL INPUT STEPS */}
                {(currentStep.type === "text-input" || currentStep.type === "email-collection") && (
                  <div className="text-center">
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#25241f] leading-snug font-medium mb-2">
                      {currentStep.title}
                    </h2>
                    {currentStep.subtitle && (
                      <p className="text-sm text-[#6f6b60] mb-8">
                        {currentStep.subtitle}
                      </p>
                    )}

                    <form onSubmit={handleTextInputSubmit} className="space-y-5 text-left">
                      <div>
                        {currentStep.inputLabel && (
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#6f6b60] mb-2">
                            {currentStep.inputLabel}
                            {currentStep.type === "email-collection" && (
                              <span className="text-red-600 ml-1" title="Required">*</span>
                            )}
                          </label>
                        )}
                        <input
                          type={currentStep.type === "email-collection" ? "email" : "text"}
                          value={textInputValue}
                          onChange={(e) => {
                            setTextInputValue(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          placeholder={currentStep.inputPlaceholder}
                          autoFocus
                          required
                          aria-required="true"
                          className={`w-full min-h-[56px] px-4 rounded-md border ${
                            emailError
                              ? "border-red-500 focus:ring-red-500"
                              : "border-[#25241f]/70 focus:ring-[#755525]"
                          } bg-white text-base text-[#25241f] placeholder:text-[#8c887e] focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        />
                        {emailError ? (
                          <p className="text-xs text-red-600 mt-2 font-medium">{emailError}</p>
                        ) : currentStep.inputSubtext ? (
                          <p className="text-xs text-[#8c887e] mt-2">
                            {currentStep.inputSubtext}
                          </p>
                        ) : null}
                      </div>

                      {/* Required Email Collection Step: Unchecked marketing consent checkbox */}
                      {currentStep.type === "email-collection" && (
                        <div className="pt-1 pb-1">
                          <label className="flex items-start gap-3 cursor-pointer select-none group">
                            <input
                              type="checkbox"
                              id="marketing-consent-checkbox"
                              checked={marketingConsent}
                              onChange={(e) => setMarketingConsent(e.target.checked)}
                              className="mt-0.5 h-4 w-4 rounded border-[#25241f]/40 text-[#755525] focus:ring-[#755525] accent-[#755525] cursor-pointer shrink-0"
                            />
                            <span className="text-xs text-[#6f6b60] group-hover:text-[#25241f] transition-colors leading-relaxed">
                              I agree to receive promotional emails, botanical research insights, and exclusive discounts from Rootly. (Optional)
                            </span>
                          </label>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full min-h-[52px] sm:min-h-[56px] rounded-md bg-[#25241f] hover:bg-[#3d3a33] text-white font-medium text-base transition-colors duration-150 shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}

                {/* 5. ANALYZING / FORMULATION LOADER */}
                {currentStep.type === "analyzing" && (
                  <FormulationLoader onComplete={handleAnalyzingComplete} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
