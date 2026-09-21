import type { Money } from "@/types/product";

export function formatMoney(money: Money) {
  const amount = Number(money.amount);

  if (!Number.isFinite(amount)) {
    return `${money.currencyCode} ${money.amount}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
}
