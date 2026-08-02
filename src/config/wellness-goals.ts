export type WellnessGoal = {
  handle: string;
  title: string;
  description: string;
};

export const wellnessGoals: WellnessGoal[] = [
  {
    handle: "energy-stamina",
    title: "Energy & stamina",
    description: "Explore plant-based additions for steady everyday routines and active days.",
  },
  {
    handle: "stress-calm",
    title: "Stress & calm",
    description:
      "Build a quiet, repeatable ritual that helps you make space to unwind.",
  },
  {
    handle: "digestion",
    title: "Digestion",
    description: "Discover simple food-first routines designed to fit comfortably into your day.",
  },
  {
    handle: "immunity",
    title: "Immunity",
    description: "Support a varied daily routine with nutrient-rich plant ingredients.",
  },
  {
    handle: "hair-skin",
    title: "Hair & skin support",
    description: "Explore nutrition-minded rituals that complement everyday care from within.",
  },
  {
    handle: "healthy-weight",
    title: "Healthy weight support",
    description: "Pair balanced habits with straightforward plant-based additions—without quick-fix promises.",
  },
];

export function getWellnessGoal(handle: string) {
  return wellnessGoals.find((goal) => goal.handle === handle);
}
