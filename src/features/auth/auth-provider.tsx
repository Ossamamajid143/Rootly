"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { CustomerUser, RegisterInput } from "./types";
import { AuthModal } from "./components/auth-modal";

interface AuthContextType {
  user: CustomerUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterInput) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  openAuthModal: (onSuccess?: (user: CustomerUser) => void, initialMode?: "signin" | "register") => void;
  closeAuthModal: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"signin" | "register">("register");
  const [onSuccessCallback, setOnSuccessCallback] = useState<((user: CustomerUser) => void) | null>(null);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json() as { user: CustomerUser | null; accessToken?: string | null };
        setUser(data.user);
        if (data.accessToken) setAccessToken(data.accessToken);
      } else {
        setUser(null);
        setAccessToken(null);
      }
    } catch (err) {
      console.error("[AuthProvider] Failed to fetch session:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json() as { success?: boolean; user?: CustomerUser; accessToken?: string; error?: string };

      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Sign-in failed. Please check your credentials." };
      }

      setUser(data.user || null);
      if (data.accessToken) setAccessToken(data.accessToken);

      if (onSuccessCallback && data.user) {
        onSuccessCallback(data.user);
        setOnSuccessCallback(null);
      }
      setIsAuthModalOpen(false);

      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Network error during sign-in." };
    }
  };

  const register = async (input: RegisterInput) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json() as { success?: boolean; user?: CustomerUser; accessToken?: string; error?: string };

      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Account registration failed." };
      }

      setUser(data.user || null);
      if (data.accessToken) setAccessToken(data.accessToken);

      if (onSuccessCallback && data.user) {
        onSuccessCallback(data.user);
        setOnSuccessCallback(null);
      }
      setIsAuthModalOpen(false);

      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Network error during registration." };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("[AuthProvider] Logout error:", err);
    } finally {
      setUser(null);
      setAccessToken(null);
      window.location.href = "/";
    }
  };

  const openAuthModal = (onSuccess?: (user: CustomerUser) => void, initialMode: "signin" | "register" = "register") => {
    setModalMode(initialMode);
    if (onSuccess) {
      setOnSuccessCallback(() => onSuccess);
    } else {
      setOnSuccessCallback(null);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setOnSuccessCallback(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        logout,
        openAuthModal,
        closeAuthModal,
        refreshUser,
      }}
    >
      {children}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        mode={modalMode}
        onSwitchMode={setModalMode}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
