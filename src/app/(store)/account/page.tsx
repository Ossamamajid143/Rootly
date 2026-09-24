"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserRound,
  Package,
  Mail,
  LogOut,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/features/auth/auth-provider";
import { formatMoney } from "@/lib/format-money";
import { Container } from "@/components/ui/container";
import type { CustomerOrder } from "@/features/auth/types";

function statusLabel(financialStatus: string, fulfillmentStatus: string) {
  if (fulfillmentStatus === "FULFILLED") return { label: "Delivered", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
  if (fulfillmentStatus === "IN_PROGRESS" || fulfillmentStatus === "PARTIAL") return { label: "Shipped", icon: Truck, color: "text-blue-600 bg-blue-50 border-blue-200" };
  if (financialStatus === "PAID") return { label: "Processing", icon: Clock, color: "text-amber-600 bg-amber-50 border-amber-200" };
  return { label: financialStatus, icon: Package, color: "text-[#6f6b60] bg-[#f8f4eb] border-[#ddd2bf]" };
}

export default function AccountDashboard() {
  const { user, isLoading, isAuthenticated, openAuthModal, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      openAuthModal(() => {
        router.refresh();
      }, "signin");
    }
  }, [isLoading, isAuthenticated, openAuthModal, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#fffdf8]">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#755525] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-[#6f6b60] font-medium">Loading your account…</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#fffdf8]">
        <Container className="py-20 text-center">
          <UserRound className="w-12 h-12 text-[#ddd2bf] mx-auto mb-4" />
          <h1 className="font-serif text-3xl font-semibold text-[#25241f] mb-2">Sign in to your account</h1>
          <p className="text-sm text-[#6f6b60] mb-8 max-w-md mx-auto">
            View your orders, manage your personalized formula, and update account details.
          </p>
          <button
            type="button"
            onClick={() => openAuthModal(undefined, "signin")}
            className="inline-flex items-center gap-2 min-h-12 rounded-full bg-[#25241f] hover:bg-[#3d3a33] text-white font-bold text-sm px-8 transition-colors cursor-pointer"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </Container>
      </main>
    );
  }

  const orders = user.orders?.edges?.map((e) => e.node) ?? [];

  return (
    <main className="min-h-screen bg-[#fffdf8]">
      <Container className="py-10 sm:py-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#755525] mb-1">Your Account</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#25241f] leading-tight">
              Welcome back{user.firstName ? `, ${user.firstName}` : ""}
            </h1>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6f6b60] hover:text-[#25241f] border border-[#ddd2bf] hover:bg-[#f8f4eb] transition-colors py-2.5 px-5 rounded-full cursor-pointer self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">

          {/* Profile Card */}
          <div className="rounded-2xl border border-[#ddd2bf] bg-white p-6 shadow-xs space-y-5 lg:sticky lg:top-24">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#f4ece0] flex items-center justify-center text-[#755525] shrink-0">
                <UserRound className="w-7 h-7" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[#25241f] truncate">
                  {user.displayName || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "ROOTLY Member"}
                </p>
                <p className="text-xs text-[#6f6b60] truncate">{user.email}</p>
              </div>
            </div>

            <div className="border-t border-[#ddd2bf]/60 pt-5 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-[#4a4740]">
                <Mail className="w-4 h-4 text-[#755525] shrink-0" />
                <span className="break-all">{user.email}</span>
              </div>

              <div className="flex items-center gap-3 text-[#4a4740]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {user.acceptsMarketing ? "Subscribed to email updates" : "Not subscribed to emails"}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[#4a4740]">
                <Package className="w-4 h-4 text-[#755525] shrink-0" />
                <span>{orders.length} order{orders.length !== 1 ? "s" : ""} placed</span>
              </div>
            </div>

            <Link
              href="/find-your-formula"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#755525] border border-[#ddd2bf] bg-[#f8f4eb] hover:bg-[#f0e8d9] transition-colors py-2.5 px-4 rounded-xl"
            >
              Retake Formula Quiz →
            </Link>
          </div>

          {/* Orders */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#25241f] mb-5">Order History</h2>

            {orders.length === 0 ? (
              <div className="rounded-2xl border border-[#ddd2bf] bg-white p-10 text-center">
                <Package className="w-10 h-10 text-[#ddd2bf] mx-auto mb-3" />
                <p className="font-semibold text-[#25241f] mb-1">No orders yet</p>
                <p className="text-sm text-[#6f6b60] mb-6">
                  Once you place your first order, it will appear here.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 min-h-10 rounded-full bg-[#25241f] hover:bg-[#3d3a33] text-white text-xs font-bold px-6 transition-colors"
                >
                  Explore the Collection <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order: CustomerOrder) => {
                  const { label, icon: StatusIcon, color } = statusLabel(
                    order.financialStatus,
                    order.fulfillmentStatus
                  );
                  const itemNames = order.lineItems?.edges
                    ?.slice(0, 3)
                    .map((e) => e.node.title)
                    .join(", ");

                  return (
                    <div
                      key={order.id}
                      className="rounded-2xl border border-[#ddd2bf] bg-white p-5 sm:p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div>
                          <p className="font-bold text-[#25241f] text-base">{order.name}</p>
                          <p className="text-xs text-[#6f6b60] mt-0.5">
                            {new Date(order.processedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${color}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {label}
                          </span>
                          <span className="font-bold text-[#25241f] text-sm">
                            {formatMoney({
                              amount: order.totalPrice.amount,
                              currencyCode: order.totalPrice.currencyCode,
                            })}
                          </span>
                        </div>
                      </div>

                      {itemNames && (
                        <p className="text-xs text-[#6f6b60] bg-[#f8f4eb] rounded-lg px-3 py-2 leading-relaxed">
                          {itemNames}
                          {(order.lineItems?.edges?.length ?? 0) > 3 &&
                            ` +${(order.lineItems?.edges?.length ?? 0) - 3} more`}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
