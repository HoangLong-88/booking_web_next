import { useState } from "react";
import { loginService } from "../service/login.service";
import { saveToken } from "@/utils/storeLoginToken";
import { useRouter } from "next/navigation";

interface RegisterResult<T = unknown> {
  ok: boolean;
  status: number;
  data: T;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [loginerror, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleLogin = async (
    contact: string,
    password: string,
    keepLoggedIn: boolean,
  ): Promise<RegisterResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await loginService.login(contact, password, keepLoggedIn);
      if (!res.ok) {
        setError(res.data?.message || "Login failed");
      }
      if (res.data.remember_token) {
        saveToken(res.data.remember_token, keepLoggedIn);
      } else if (res.data.token) {
        saveToken(res.data.token, keepLoggedIn);
      }
      if (res.data.user.role === "admin") {
        router.push("/admin");
        window.location.reload();
        return res;
      }
      router.push("/");
      window.location.reload();
      return res;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loginerror,
    handleLogin,
  };
}
