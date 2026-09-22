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

export function FormulaQuizContainer() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<UserQuizAnswers>({});
  const [textInputValue, setTextInputValue] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = QUIZ_STEPS[stepIndex];

  const handleNext = () => {
    if (stepIndex < QUIZ_STEPS.length - 1) {
      setStepIndex((prev) => prev + 1);
      setTextInputValue("");
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
      setTextInputValue("");
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

  const handleTextInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInputValue.trim()) return;

    if (currentStep.id === "name") {
      setAnswers((prev) => ({ ...prev, name: textInputValue.trim() }));
    } else if (currentStep.id === "email") {
      setAnswers((prev) => ({ ...prev, email: textInputValue.trim() }));
    }
    handleNext();
  };

  const selectedFormula = selectFormulaForUser(answers.goals || []);

  // When analyzing loader completes, show recommendation page
  const handleAnalyzingComplete = () => {
    setIsCompleted(true);
  };

  const handleRetake = () => {
    setIsCompleted(false);
    setStepIndex(0);
    setAnswers({});
    setTextInputValue("");
  };

  return (
    <div className="min-h-screen bg-[#fffdf8] flex flex-col font-sans selection:bg-[#e7dac5]">
      {/* Distraction-Free Header */}
      <QuizHeader
        progress={currentStep.progressPercentage}
        onBack={handleBack}
        canGoBack={stepIndex > 0 && !isCompleted}
        isCompleted={isCompleted}
      />

      <main className="flex-1 flex flex-col justify-center pt-20 pb-16 sm:pt-24 sm:pb-20 px-4 sm:px-6">
        {isCompleted ? (
          <FormulaRecommendationPage
            formula={selectedFormula}
            answers={answers}
            onRetakeQuiz={handleRetake}
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
                        className="w-full min-h-[52px] sm:min-h-[56px] rounded-md bg-[#25241f] hover:bg-[#3d3a33] disabled:opacity-50 text-white font-medium text-base transition-colors duration-150 shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
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
                          </label>
                        )}
                        <input
                          type={currentStep.type === "email-collection" ? "email" : "text"}
                          value={textInputValue}
                          onChange={(e) => setTextInputValue(e.target.value)}
                          placeholder={currentStep.inputPlaceholder}
                          autoFocus
                          required
                          className="w-full min-h-[56px] px-4 rounded-md border border-[#25241f]/70 bg-white text-base text-[#25241f] placeholder:text-[#8c887e] focus:outline-none focus:ring-2 focus:ring-[#755525] focus:border-transparent transition-all"
                        />
                        {currentStep.inputSubtext && (
                          <p className="text-xs text-[#8c887e] mt-2">
                            {currentStep.inputSubtext}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full min-h-[52px] sm:min-h-[56px] rounded-md bg-[#25241f] hover:bg-[#3d3a33] text-white font-medium text-base transition-colors duration-150 shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
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
