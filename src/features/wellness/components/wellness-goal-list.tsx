import Link from "next/link";

import type { WellnessGoal } from "@/mocks/wellness-goals";

export function WellnessGoalList({ goals }: { goals: WellnessGoal[] }) {
  return (
    <div className="grid divide-y divide-[#253426]/15 border-y border-[#253426]/15">
      {goals.map((goal, index) => (
        <Link
          className="group grid gap-3 py-7 sm:grid-cols-[3rem_1fr_auto] sm:items-center"
          href={`/wellness-goals/${goal.handle}`}
          key={goal.handle}
        >
          <span className="text-xs font-semibold text-[#87652f]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-xl font-semibold">{goal.title}</h3>
            <p className="mt-1 text-sm text-[#253426]/60">{goal.description}</p>
          </div>
          <span
            aria-hidden="true"
            className="text-2xl transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
