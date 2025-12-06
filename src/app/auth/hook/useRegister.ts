import { useState } from "react";
import { registerService } from "../service/register.service";
import { saveToken } from "@/utils/storeLoginToken";
import { useRouter } from "next/navigation";

interface RegisterResult<T = unknown> {
  ok: boolean;
  status: number;
  data: T;
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [registererror, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleRegister = async (
    contact: string,
    password: string,
    keepLoggedIn: boolean,
    name?: string,
  ): Promise<RegisterResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await registerService.register(contact, password, keepLoggedIn, name);
      if (!res.ok) {
        setError(res.data?.message || "Registration failed");
      }
      if (res.data.remember_token) {
        saveToken(res.data.remember_token, keepLoggedIn);
      } else if (res.data.token) {
        saveToken(res.data.token, keepLoggedIn);
      }
      router.push("/");

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
    registererror,
    handleRegister,
  };
}
