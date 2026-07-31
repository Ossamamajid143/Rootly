export type WellnessGoal = {
  handle: string;
  title: string;
  description: string;
};

export const wellnessGoals: WellnessGoal[] = [
  {
    handle: "daily-foundation",
    title: "Daily foundation",
    description: "Build a steady baseline with small, repeatable rituals.",
  },
  {
    handle: "energy-focus",
    title: "Energy & focus",
    description:
      "Feel clear and capable through the natural rhythm of your day.",
  },
  {
    handle: "rest-recovery",
    title: "Rest & recovery",
    description: "Create room for deeper rest and more intentional recovery.",
  },
];

export function getWellnessGoal(handle: string) {
  return wellnessGoals.find((goal) => goal.handle === handle);
}
