import type { Collection } from "@/types/collection";

export const collections: Collection[] = [
  {
    handle: "daily-rituals",
    title: "Daily Rituals",
    description: "Simple formulas designed to fit naturally into every day.",
    productHandles: ["daily-greens", "calm-minerals"],
  },
  {
    handle: "clear-energy",
    title: "Clear Energy",
    description: "Support for focused days, built without unnecessary noise.",
    productHandles: ["daily-greens", "focus-drops"],
  },
];

export function getCollection(handle: string) {
  return collections.find((collection) => collection.handle === handle);
}
