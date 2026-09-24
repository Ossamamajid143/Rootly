"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Minus, Plus, Trash2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/cart-provider";
import { useAuth } from "@/features/auth/auth-provider";
import { formatMoney } from "@/lib/format-money";
import { productRoute, storefrontRoutes } from "@/config/navigation";

export function CartView() {
  const { lines, updateLine, removeLine } = useCart();
  const { user, accessToken, openAuthModal } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const reduceMotion = useReducedMotion();
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + Number(line.price.amount) * line.quantity, 0),
    [lines]
  );
  const currency = lines[0]?.price.currencyCode;

  async function proceedToShopifyCheckout() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: lines.map(({ merchandiseId, quantity }) => ({ merchandiseId, quantity })),
          buyerIdentity: accessToken
            ? { customerAccessToken: accessToken }
            : user?.email
            ? { email: user.email }
            : undefined,
        }),
      });
      const result = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !result.checkoutUrl) throw new Error(result.error || "Checkout is unavailable.");
      window.location.assign(result.checkoutUrl);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Checkout is unavailable.");
      setLoading(false);
    }
  }

  function handleCheckout() {
    if (user) {
      // Already signed in — go straight to Shopify checkout
      void proceedToShopifyCheckout();
    } else {
      // Not signed in — open auth modal, then checkout after success
      openAuthModal(() => {
        // Called once user signs in or registers successfully
        void proceedToShopifyCheckout();
      }, "register");
    }
  }

  if (!lines.length)
    return (
      <div className="rounded-[2.5rem] border border-border bg-surface p-8 text-center sm:p-14">
        <h2 className="font-display text-4xl font-semibold text-forest">Your bag is ready for a first ritual.</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted">
          Add a ROOTLY product and it will appear here. Your bag is saved on this device.
        </p>
        <Link
          href={storefrontRoutes.shop}
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-forest px-7 text-sm font-bold text-white"
        >
          Explore the collection <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    );

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_390px] lg:items-start">
      {/* Line Items */}
      <div>
        <Link
          href={storefrontRoutes.shop}
          className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-brand underline underline-offset-4"
        >
          Continue shopping <ArrowRight size={15} aria-hidden="true" />
        </Link>

        <div className="space-y-4">
          {lines.map((line) => (
            <motion.article
              layout={!reduceMotion}
              key={line.merchandiseId}
              className="grid grid-cols-[100px_1fr] gap-5 rounded-[1.5rem] border border-border bg-surface p-4 sm:grid-cols-[130px_1fr] sm:p-5"
            >
              <Link
                href={productRoute(line.productHandle)}
                aria-label={`View ${line.productTitle}`}
                className="relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-sand"
              >
                {line.image && (
                  <Image
                    src={line.image.url}
                    alt={line.image.altText || line.productTitle}
                    fill
                    sizes="130px"
                    className="object-contain p-2"
                  />
                )}
              </Link>

              <div className="flex min-w-0 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={productRoute(line.productHandle)}
                      className="font-display text-2xl font-semibold leading-tight text-forest"
                    >
                      {line.productTitle}
                    </Link>
                    {line.variantTitle !== "Default Title" && (
                      <p className="mt-1 text-xs text-muted">{line.variantTitle}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${line.productTitle}`}
                    onClick={() => removeLine(line.merchandiseId)}
                    className="grid size-10 shrink-0 place-items-center rounded-full text-muted hover:bg-sand hover:text-brand"
                  >
                    <Trash2 size={17} aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateLine(line.merchandiseId, line.quantity - 1)}
                      className="grid size-10 place-items-center"
                    >
                      <Minus size={15} aria-hidden="true" />
                    </button>
                    <span className="w-7 text-center text-sm font-bold tabular-nums">{line.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateLine(line.merchandiseId, line.quantity + 1)}
                      className="grid size-10 place-items-center"
                    >
                      <Plus size={15} aria-hidden="true" />
                    </button>
                  </div>
                  <p className="font-bold">
                    {formatMoney({
                      amount: String(Number(line.price.amount) * line.quantity),
                      currencyCode: line.price.currencyCode,
                    })}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <aside className="rounded-[2rem] bg-forest p-7 text-white lg:sticky lg:top-28">
        <h2 className="font-display text-3xl font-semibold text-white">Order summary</h2>

        <div className="mt-6 flex items-center justify-between border-y border-white/15 py-5 text-sm">
          <span className="text-white/70">Subtotal</span>
          <strong>
            {currency ? formatMoney({ amount: String(subtotal), currencyCode: currency }) : "—"}
          </strong>
        </div>

        <p className="mt-4 text-xs leading-6 text-white/60">
          Shipping and any applicable charges are calculated securely at Shopify checkout.
        </p>

        {/* Signed-in badge */}
        {user && (
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-xs text-white/80">
            <UserRound size={14} />
            <span>
              Checking out as <strong className="text-white">{user.displayName || user.email}</strong>
            </span>
          </div>
        )}

        {/* Not signed in — prompt */}
        {!user && (
          <div className="mt-5 rounded-xl bg-white/10 px-3 py-3 text-xs text-white/80 leading-5">
            <p>
              <span className="font-bold text-white">Create a free account</span> to track your order, save your
              formula, and checkout securely.
            </p>
            <button
              type="button"
              onClick={() => openAuthModal(undefined, "signin")}
              className="mt-2 text-[11px] font-bold underline text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Already have an account? Sign in →
            </button>
          </div>
        )}

        <Button
          size="lg"
          onClick={handleCheckout}
          disabled={loading}
          className="mt-5 w-full gap-2 bg-white text-forest hover:bg-sand hover:text-forest"
        >
          {loading
            ? "Preparing checkout…"
            : user
            ? "Checkout securely"
            : "Create account & Checkout"}
          <ArrowRight size={18} aria-hidden="true" />
        </Button>

        {error && (
          <p role="alert" className="mt-4 rounded-xl bg-white/10 p-3 text-sm leading-6 text-white">
            {error}
          </p>
        )}
      </aside>
    </div>
  );
}
