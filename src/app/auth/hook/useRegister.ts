import { useState } from "react";
import { registerService } from "../service/register.service";

interface RegisterResult<T = unknown> {
  ok: boolean;
  status: number;
  data: T;
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [registererror, setError] = useState<string | null>(null);

  const handleRegister = async (
    contact: string,
    password: string,
    name?: string
  ): Promise<RegisterResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await registerService.register(contact, password, name);
      if (!res.ok) {
        setError(res.data?.message || "Registration failed");
      }
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
