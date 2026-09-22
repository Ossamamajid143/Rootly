export type StepType =
  | "single-select"
  | "multi-select"
  | "interstitial"
  | "text-input"
  | "email-collection"
  | "analyzing"
  | "result";

export interface QuizOption {
  id: string;
  label: string;
  percentage?: string; // Social proof stat (e.g., "53%")
  badge?: string;
  tag?: string;
}

export interface WhyWeAskInfo {
  trigger?: string;
  text: string;
  highlights?: string[];
  citations?: string[];
  sources?: string[];
}

export interface InterstitialInfo {
  eyebrow?: string;
  statNumber: string;
  statLabel: string;
  description: string;
  imageSrc: string;
  disclaimer?: string;
  logos?: string[];
}

export interface QuizStep {
  id: string;
  type: StepType;
  category?: string;
  title: string;
  subtitle?: string;
  options?: QuizOption[];
  whyWeAsk?: WhyWeAskInfo;
  interstitial?: InterstitialInfo;
  inputPlaceholder?: string;
  inputLabel?: string;
  inputSubtext?: string;
  progressPercentage: number;
}

export interface UserQuizAnswers {
  age?: string;
  sex?: string;
  goals?: string[];
  energyDip?: string;
  caffeineIntake?: string;
  sleepQuality?: string;
  brainFog?: string;
  name?: string;
  email?: string;
  withCaffeine?: boolean;
}

export interface ClinicalOutcomeMetric {
  label: string;
  percentage: number;
  description?: string;
}

export interface FormulaIngredient {
  name: string;
  latinName?: string;
  amount: string;
  dailyValue?: string;
  purpose: string;
  description: string;
}

export interface CustomFormulaProfile {
  id: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  rating: number;
  reviewCount: number;
  goals: Array<{ label: string; icon: string }>;
  tags: string[];
  matchPercentage: number;
  activeIngredients: FormulaIngredient[];
  otherIngredients: string[];
  badges: string[];
  pricing: {
    oneMonth: { originalPrice: number; discountedPrice: number; savePercent: number; perDose: string; renewNote: string };
    twoMonth: { originalPrice: number; discountedPrice: number; savePercent: number; perDose: string; renewNote: string };
    threeMonth: { originalPrice: number; discountedPrice: number; savePercent: number; perDose: string; renewNote: string };
    oneTimePrice: number;
  };
  metrics: {
    primary1: { stat: string; label: string; percentage: number };
    primary2: { stat: string; label: string; percentage: number };
    bars: ClinicalOutcomeMetric[];
  };
  howToUse: {
    dosage: string;
    timing: string;
    instructions: string;
  };
}
