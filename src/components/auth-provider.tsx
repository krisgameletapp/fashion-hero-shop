"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { UserRole, SellerTier } from "@/types/priority";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tier: SellerTier;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => void;
}

function deriveRoleAndTier(email: string): { role: UserRole; tier: SellerTier } {
  const e = email.toLowerCase();
  if (e.includes("priority")) return { role: "seller", tier: "priority" };
  if (e.includes("topmarg")) return { role: "seller", tier: "top-margin" };
  if (e.includes("negotiated")) return { role: "seller", tier: "negotiated" };
  if (e.includes("seller")) return { role: "seller", tier: "standard" };
  return { role: "buyer", tier: "standard" };
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "stepforward_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    // Mock login — always succeeds
    const { role, tier } = deriveRoleAndTier(email);
    const newUser: User = {
      email,
      firstName: email.split("@")[0],
      lastName: "",
      role,
      tier,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  const register = useCallback(async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    const newUser: User = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: "buyer",
      tier: "standard",
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
