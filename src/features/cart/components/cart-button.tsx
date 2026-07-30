export function CartButton() {
  return (
    <button
      aria-label="Open cart, 0 items"
      className="rounded-full border border-[#253426]/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-[#f3efe6]"
      type="button"
    >
      Bag <span aria-hidden="true">(0)</span>
    </button>
  );
}
