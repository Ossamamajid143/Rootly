"use client";

import { useState } from "react";
import { X, ArrowRight, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../auth-provider";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "signin" | "register";
  onSwitchMode: (mode: "signin" | "register") => void;
}

export function AuthModal({
  isOpen,
  onClose,
  mode,
  onSwitchMode,
}: AuthModalProps) {
  const { login, register } = useAuth();

  // Sign In State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Register State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);

  // Common UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(signInEmail, signInPassword);
      if (!res.success) {
        setError(res.error || "Invalid email or password.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in error.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (registerPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await register({
        email: registerEmail,
        password: registerPassword,
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
        acceptsMarketing,
      });

      if (!res.success) {
        setError(res.error || "Registration failed. Email may already exist.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto"
    >
      <div
        className="relative w-full max-w-lg bg-[#fffdf8] rounded-3xl border border-[#ddd2bf] shadow-2xl p-6 sm:p-8 my-auto overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-[#6f6b60] hover:text-[#25241f] hover:bg-[#ddd2bf]/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4ece0] text-[#755525] text-xs font-bold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Account Required for Checkout</span>
          </div>

          <h2 className="font-serif text-3xl font-semibold text-[#25241f]">
            {mode === "register" ? "Create your ROOTLY account" : "Welcome back to ROOTLY"}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#6f6b60] max-w-sm mx-auto">
            {mode === "register"
              ? "Create your account to secure your customized formula, track order shipments, and complete checkout."
              : "Sign in to access your saved formula, past orders, and proceed to checkout."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-full bg-[#f4ece0] p-1 mb-6 text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => {
              onSwitchMode("register");
              setError(null);
            }}
            className={`flex-1 py-2 rounded-full transition-all cursor-pointer ${
              mode === "register"
                ? "bg-[#25241f] text-white shadow-xs"
                : "text-[#6f6b60] hover:text-[#25241f]"
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => {
              onSwitchMode("signin");
              setError(null);
            }}
            className={`flex-1 py-2 rounded-full transition-all cursor-pointer ${
              mode === "signin"
                ? "bg-[#25241f] text-white shadow-xs"
                : "text-[#6f6b60] hover:text-[#25241f]"
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Mode 1: Register Form */}
        {mode === "register" && (
          <form onSubmit={handleRegister} className="space-y-4 text-left">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6f6b60] mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jane"
                  className="w-full h-11 px-3.5 rounded-xl border border-[#25241f]/30 bg-white text-sm text-[#25241f] placeholder:text-[#8c887e] focus:outline-none focus:ring-2 focus:ring-[#755525]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6f6b60] mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full h-11 px-3.5 rounded-xl border border-[#25241f]/30 bg-white text-sm text-[#25241f] placeholder:text-[#8c887e] focus:outline-none focus:ring-2 focus:ring-[#755525]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6f6b60] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full h-11 px-3.5 rounded-xl border border-[#25241f]/30 bg-white text-sm text-[#25241f] placeholder:text-[#8c887e] focus:outline-none focus:ring-2 focus:ring-[#755525]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6f6b60] mb-1.5">
                Password (min 6 characters)
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-3.5 rounded-xl border border-[#25241f]/30 bg-white text-sm text-[#25241f] placeholder:text-[#8c887e] focus:outline-none focus:ring-2 focus:ring-[#755525]"
              />
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#6f6b60]">
                <input
                  type="checkbox"
                  checked={acceptsMarketing}
                  onChange={(e) => setAcceptsMarketing(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#25241f]/40 text-[#755525] accent-[#755525]"
                />
                <span className="leading-snug">
                  Keep me informed about clinical updates, formula adjustments, and member perks.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 rounded-xl bg-[#25241f] hover:bg-[#3d3a33] text-white font-bold text-sm uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-75"
            >
              {loading ? (
                <span>Creating your account…</span>
              ) : (
                <>
                  <span>Create Account & Continue to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Mode 2: Sign In Form */}
        {mode === "signin" && (
          <form onSubmit={handleSignIn} className="space-y-4 text-left">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6f6b60] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full h-11 px-3.5 rounded-xl border border-[#25241f]/30 bg-white text-sm text-[#25241f] placeholder:text-[#8c887e] focus:outline-none focus:ring-2 focus:ring-[#755525]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6f6b60] mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-3.5 rounded-xl border border-[#25241f]/30 bg-white text-sm text-[#25241f] placeholder:text-[#8c887e] focus:outline-none focus:ring-2 focus:ring-[#755525]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 rounded-xl bg-[#25241f] hover:bg-[#3d3a33] text-white font-bold text-sm uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-75"
            >
              {loading ? (
                <span>Signing in…</span>
              ) : (
                <>
                  <span>Sign In & Continue to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-[#ddd2bf]/60 flex items-center justify-center gap-2 text-xs text-[#8c887e]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#755525]" />
          <span>Encrypted with 256-bit SSL for your protection</span>
        </div>
      </div>
    </div>
  );
}
