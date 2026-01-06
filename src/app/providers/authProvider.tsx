'use client'
import React, { createContext, useState, useEffect, useContext, useRef } from "react";
import { getToken, clearToken } from "@/utils/storeLoginToken";
import type { User } from "@/types/user";
import { usePathname } from "next/navigation";

interface AuthContextType<T = unknown> {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  loading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRef = useRef(false); // chống gọi nhiều lần

  useEffect(() => {
    if (fetchRef.current) return;
    fetchRef.current = true;

    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
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
      })
      .catch(()=>{
        clearToken()
        setUser(null)
      })
      .finally(()=>{
        setLoading(false)
      });
  }, []);

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ loading, user, setUser, logout }}>
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