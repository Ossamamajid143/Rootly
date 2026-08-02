export function OrganicDivider({ dark = false }: { dark?: boolean }) {
  return (
    <div className="relative h-7 overflow-hidden" aria-hidden="true">
      <svg className="absolute -left-[2%] top-0 h-7 w-[104%]" viewBox="0 0 1200 28" preserveAspectRatio="none">
        <path
          d="M0 13C90 0 134 26 220 13S350 1 440 14 570 25 660 12 800 2 885 14s144 13 220-1 119-7 180 1V28H0Z"
          fill={dark ? "#2d4231" : "#f8f4eb"}
        />
      </svg>
    </div>
  );
}
