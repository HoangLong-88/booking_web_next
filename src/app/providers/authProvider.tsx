'use client'
import React, { createContext, useState, useEffect, useContext } from "react";
import { getToken, clearToken } from "@/utils/storeLoginToken";
import type { User } from "@/types/user";

interface AuthContextType<T = unknown> {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          const text = await res.text();

          try {
            return JSON.parse(text);
          } catch {
            console.error("Invalid JSON from /api/auth/me:", text);
            return null;
          }
        })
        .then(data => {
            if (data.user) setUser(data.user);
            else clearToken(); // invalid token
      });
    }   
  }, []);

  const logout = () => {
    setUser(null);
    clearToken();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};

export { AuthProvider, useAuth };