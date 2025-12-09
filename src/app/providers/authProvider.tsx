'use client'
import React, { createContext, useState, useEffect, useContext } from "react";
import { getToken, clearToken } from "@/utils/storeLoginToken";
import type { User } from "@/types/user";
import { usePathname } from "next/navigation";

interface AuthContextType<T = unknown> {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setUser(null);
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.text())
      .then((text) => {
        try {
          return JSON.parse(text);
        } catch {
          return null;
        }
      })
      .then((data) => {
        if (data?.user) setUser(data.user);
        else {
          clearToken();
          setUser(null);
        }
      });
  }, []);

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};

export { AuthProvider, useAuth };