import type { CustomFormulaProfile } from "../types";

export const CUSTOM_FORMULAS: Record<string, CustomFormulaProfile> = {
  clarity: {
    id: "formula-clarity",
    slug: "clarity",
    title: "Clarity & Neuro-Focus Blend",
    headline: "Designed to promote neuroplasticity, sharpen concentration, and dissolve brain fog.",
    description:
      "Clarity is formulated to promote neuroplasticity and encourage the growth of new neural connections—the critical biological processes that keep your mind sharp, adaptable, and focused under demanding conditions.",
    rating: 4.8,
    reviewCount: 3365,
    goals: [
      { label: "Productivity", icon: "⚗️" },
      { label: "Deep Focus", icon: "◎" },
      { label: "Brain Fog Reduction", icon: "⚡" },
    ],
    tags: ["focus", "memory", "motivation", "brain-fog"],
    matchPercentage: 98,
    activeIngredients: [
      {
        name: "Lion's Mane Mushroom Extract",
        latinName: "Hericium erinaceus (fruiting body)",
        amount: "500 mg",
        dailyValue: "†",
        purpose: "Neurogenesis & Synaptic Plasticity",
        description: "Stimulates Nerve Growth Factor (NGF) synthesis to boost executive memory retention and mental agility.",
      },
      {
        name: "Cognizin® Citicoline (CDP-Choline)",
        latinName: "Cytidine 5'-diphosphocholine",
        amount: "250 mg",
        dailyValue: "†",
        purpose: "Cellular Brain Energy & Phospholipids",
        description: "Increases brain ATP reserves by up to 13.6% and accelerates speed of processing across demanding tasks.",
      },
      {
        name: "Organic Panax Ginseng Extract",
        latinName: "Panax ginseng (standardized to min. 20% Ginsenosides)",
        amount: "200 mg",
        dailyValue: "†",
        purpose: "Cognitive Stamina & Working Memory",
        description: "Modulates catecholamine release to prevent mid-day cognitive exhaustion and boost reaction speed.",
      },
      {
        name: "Vitamin B6 (as Pyridoxal-5'-Phosphate)",
        latinName: "Active P-5-P Coenzyme",
        amount: "5 mg",
        dailyValue: "294%",
        purpose: "Neurotransmitter Synthesis",
        description: "Bioactive coenzyme required for enzymatic conversion of L-DOPA into dopamine and 5-HTP into serotonin.",
      },
      {
        name: "L-Theanine (from Green Tea)",
        latinName: "Camellia sinensis",
        amount: "150 mg",
        dailyValue: "†",
        purpose: "Alpha Brain Wave Promotion",
        description: "Smooths stimulant effects and induces calm, relaxed alertness without sedation.",
      },
    ],
    otherIngredients: ["Vegetable Cellulose (Capsule Shell)", "Organic Rice Hull Concentrate", "Silicon Dioxide"],
    badges: [
      "MADE IN GMP CERTIFIED FACILITY",
      "STANDARDIZED BOTANICAL EXTRACTS",
      "THIRD PARTY LAB TESTED",
      "100% TRANSPARENT INGREDIENT LIST",
      "NON-GMO & 100% PLANT-BASED",
    ],
    pricing: {
      oneMonth: {
        originalPrice: 129,
        discountedPrice: 59,
        savePercent: 54,
        perDose: "$2.36/dose",
        renewNote: "then $79/mo · Ships every 25 days",
      },
      twoMonth: {
        originalPrice: 258,
        discountedPrice: 108,
        savePercent: 58,
        perDose: "$2.16/dose",
        renewNote: "then $74/mo · Ships every 50 days",
      },
      threeMonth: {
        originalPrice: 387,
        discountedPrice: 147,
        savePercent: 62,
        perDose: "$1.96/dose",
        renewNote: "then $69/mo · Ships every 75 days",
      },
      oneTimePrice: 129,
    },
    metrics: {
      primary1: { stat: "83%", label: "felt more focused & dialed in*", percentage: 83 },
      primary2: { stat: "78%", label: "reduction in brain fog within 30 days*", percentage: 78 },
      bars: [
        { label: "Flow State & Sustained Attention", percentage: 77 },
        { label: "Ability to Tune Out Distractions", percentage: 75 },
        { label: "Elimination of Afternoon Crash", percentage: 84 },
        { label: "Daily Task Follow-Through", percentage: 71 },
      ],
    },
    howToUse: {
      dosage: "Take 2 capsules daily in the morning with a glass of water, ideally with a light meal or healthy fat.",
      timing: "Best taken 30 minutes before your first deep work block or cognitive task.",
      instructions: "For maximum benefits, take consistently 5 days on, 2 days off to prevent tolerance buildup.",
    },
  },
  calm: {
    id: "formula-calm",
    slug: "calm",
    title: "Calm & Stress Resilience Blend",
    headline: "Downregulates cortisol, eases nervous tension, and supports deep restorative recovery.",
    description:
      "Calm is engineered to modulate the hypothalamic-pituitary-adrenal (HPA) axis, curbing stress-induced epinephrine surges while leaving your mind clear, centered, and tranquil.",
    rating: 4.9,
    reviewCount: 2840,
    goals: [
      { label: "Stress Resilience", icon: "🌿" },
      { label: "Cortisol Balance", icon: "⚖️" },
      { label: "Restorative Sleep", icon: "🌙" },
    ],
    tags: ["stress", "mood", "sleep"],
    matchPercentage: 97,
    activeIngredients: [
      {
        name: "KSM-66® Organic Ashwagandha Extract",
        latinName: "Withania somnifera (root, 5% withanolides)",
        amount: "600 mg",
        dailyValue: "†",
        purpose: "Cortisol Modulation & Stress Response",
        description: "Clinically proven to reduce serum cortisol levels by up to 27.9% and alleviate daily anxiety symptoms.",
      },
      {
        name: "Holy Basil (Tulsi) Extract",
        latinName: "Ocimum sanctum (2.5% Ursolic Acid)",
        amount: "300 mg",
        dailyValue: "†",
        purpose: "Adaptogenic Neuro-Protection",
        description: "Normalizes blood glucose fluctuations and balances catecholamine release during psychological stressors.",
      },
      {
        name: "Organic Reishi Mushroom Extract",
        latinName: "Ganoderma lucidum (fruiting body, 30% Polysaccharides)",
        amount: "400 mg",
        dailyValue: "†",
        purpose: "Nervous System Soothing",
        description: "Promotes deep parasympathetic activation and balances immunological stress markers.",
      },
      {
        name: "Magnesium Glycinate Chelate",
        latinName: "Bisglycinate amino acid chelate",
        amount: "120 mg",
        dailyValue: "29%",
        purpose: "Neuromuscular Relaxation",
        description: "Highly bioavailable elemental magnesium that crosses blood-brain barrier to bind GABA receptors.",
      },
    ],
    otherIngredients: ["Vegetable Cellulose", "Organic Nu-FLOW® (Rice Concentrate)", "Bamboo Leaf Extract"],
    badges: [
      "MADE IN GMP CERTIFIED FACILITY",
      "STANDARDIZED WITHANOLIDES",
      "THIRD PARTY LAB TESTED",
      "NON-DROWSY DAYTIME FORMULA",
      "NON-GMO & 100% VEGAN",
    ],
    pricing: {
      oneMonth: {
        originalPrice: 129,
        discountedPrice: 59,
        savePercent: 54,
        perDose: "$2.36/dose",
        renewNote: "then $79/mo · Ships every 25 days",
      },
      twoMonth: {
        originalPrice: 258,
        discountedPrice: 108,
        savePercent: 58,
        perDose: "$2.16/dose",
        renewNote: "then $74/mo · Ships every 50 days",
      },
      threeMonth: {
        originalPrice: 387,
        discountedPrice: 147,
        savePercent: 62,
        perDose: "$1.96/dose",
        renewNote: "then $69/mo · Ships every 75 days",
      },
      oneTimePrice: 129,
    },
    metrics: {
      primary1: { stat: "89%", label: "felt calmer and less overwhelmed under stress*", percentage: 89 },
      primary2: { stat: "81%", label: "improvement in nighttime wind-down & sleep onset*", percentage: 81 },
      bars: [
        { label: "Reduction in Racing Thoughts", percentage: 82 },
        { label: "Daytime Emotional Stability", percentage: 85 },
        { label: "Morning Waking Energy", percentage: 76 },
        { label: "Tension Relief in Shoulders & Neck", percentage: 69 },
      ],
    },
    howToUse: {
      dosage: "Take 2 capsules in the afternoon or 1 hour before bedtime with warm tea or water.",
      timing: "Can be taken daily to steadily build adaptogenic biological resilience over 3–4 weeks.",
      instructions: "Safe for both daytime calm and nighttime restorative sleep.",
    },
  },
  energy: {
    id: "formula-vitality",
    slug: "vitality",
    title: "Vitality & Cellular ATP Blend",
    headline: "Boosts physical stamina, optimizes cellular oxygen uptake, and delivers clean non-jittery energy.",
    description:
      "Vitality is engineered with high-altitude adaptogens and bioavailable botanicals that stimulate cellular mitochondrial ATP synthesis without cardiovascular stress or artificial stimulant crashes.",
    rating: 4.9,
    reviewCount: 2950,
    goals: [
      { label: "All-Day Stamina", icon: "⚡" },
      { label: "Mitochondrial ATP", icon: "🔬" },
      { label: "Clean Vitality", icon: "🌱" },
    ],
    tags: ["energy", "motivation"],
    matchPercentage: 96,
    activeIngredients: [
      {
        name: "Cordyceps Militaris Extract",
        latinName: "Standardized to 0.3% Cordycepin & 30% Polysaccharides",
        amount: "650 mg",
        dailyValue: "†",
        purpose: "Mitochondrial ATP Energy Synthesis",
        description: "Enhances cellular oxygen utilization (VO2 max) and supports natural ATP production without adrenal tax.",
      },
      {
        name: "Organic Moringa Oleifera Leaf",
        latinName: "Moringa oleifera (nutrient-dense whole leaf)",
        amount: "500 mg",
        dailyValue: "†",
        purpose: "Cellular Micronutrient Density",
        description: "Delivers 46 natural antioxidants, plant iron, and essential amino acids for foundational metabolic balance.",
      },
      {
        name: "Rhodiola Rosea Extract",
        latinName: "Standardized to 3% Rosavins & 1% Salidroside",
        amount: "250 mg",
        dailyValue: "†",
        purpose: "Anti-Fatigue & Physical Resilience",
        description: "Helps the body resist physical and environmental fatigue while regulating cellular turnover.",
      },
      {
        name: "Organic Maca Root Extract",
        latinName: "Lepidium meyenii (Gelatinized 4:1 Extract)",
        amount: "300 mg",
        dailyValue: "†",
        purpose: "Endocrine & Stamina Support",
        description: "Supports hormonal balance and athletic stamina without perturbing the thyroid.",
      },
    ],
    otherIngredients: ["Vegetable Cellulose", "Organic Rice Extract"],
    badges: [
      "MADE IN GMP CERTIFIED FACILITY",
      "NON-STIMULANT CELLULAR ENERGY",
      "THIRD PARTY LAB TESTED",
      "ORGANIC BOTANICAL SOURCES",
      "ZERO SUGAR OR ARTIFICIAL ADDITIVES",
    ],
    pricing: {
      oneMonth: {
        originalPrice: 129,
        discountedPrice: 59,
        savePercent: 54,
        perDose: "$2.36/dose",
        renewNote: "then $79/mo · Ships every 25 days",
      },
      twoMonth: {
        originalPrice: 258,
        discountedPrice: 108,
        savePercent: 58,
        perDose: "$2.16/dose",
        renewNote: "then $74/mo · Ships every 50 days",
      },
      threeMonth: {
        originalPrice: 387,
        discountedPrice: 147,
        savePercent: 62,
        perDose: "$1.96/dose",
        renewNote: "then $69/mo · Ships every 75 days",
      },
      oneTimePrice: 129,
    },
    metrics: {
      primary1: { stat: "91%", label: "felt sustained all-day stamina without crashes*", percentage: 91 },
      primary2: { stat: "84%", label: "eliminated afternoon caffeine craving*", percentage: 84 },
      bars: [
        { label: "Physical Endurance & Stamina", percentage: 88 },
        { label: "Consistent Morning Alertness", percentage: 82 },
        { label: "Exercise Recovery Speed", percentage: 79 },
        { label: "Mental Drive & Motivation", percentage: 81 },
      ],
    },
    howToUse: {
      dosage: "Take 2 capsules each morning with your breakfast or morning smoothie.",
      timing: "Best taken consistently each morning to support natural circadian metabolic curves.",
      instructions: "Can be combined with your morning tea or coffee.",
    },
  },
};

export function selectFormulaForUser(goals: string[] = []): CustomFormulaProfile {
  if (goals.includes("stress") || (goals.includes("mood") && !goals.includes("focus"))) {
    return CUSTOM_FORMULAS.calm;
  }
  if (goals.includes("energy") && !goals.includes("focus") && !goals.includes("memory")) {
    return CUSTOM_FORMULAS.energy;
  }
  // Default to Clarity (matching takethesis.com/recommendation/blend/clarity)
  return CUSTOM_FORMULAS.clarity;
}
