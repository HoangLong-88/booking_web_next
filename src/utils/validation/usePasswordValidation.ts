import { useState, useEffect } from "react";

interface PasswordValidationResult {
  isValid: boolean;
  error: string | null;
}

export const usePasswordValidation = (
  password: string,
  confirmPassword: string
): PasswordValidationResult => {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!password && !confirmPassword) {
      setIsValid(false);
      setError(null);
      return;
    }

    if (password.length < 8) {
      setIsValid(false);
      setError("Password must be at least 8 characters");
      return;
    }

    if (confirmPassword && password !== confirmPassword) {
      setIsValid(false);
      setError("Passwords do not match");
      return;
    }

    setIsValid(true);
    setError(null);
  }, [password, confirmPassword]);

  return { isValid, error };
};
