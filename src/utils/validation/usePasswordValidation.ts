import { useState, useEffect } from "react";

interface PasswordValidationResult {
  isValid: boolean;
  passworderror: string | null;
}

export const usePasswordValidation = (
  password: string,
  confirmPassword: string
): PasswordValidationResult => {
  const [isValid, setIsValid] = useState(false);
  const [passworderror, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
    if (!password && !confirmPassword) {
      setIsValid(false);
      setError(null);
      return;
    }
    if (password.length < 8) {
      setIsValid(false);
      setError("passwordTooShort");
      return;
    }
    if (confirmPassword && password !== confirmPassword) {
      setIsValid(false);
      setError("passwordsDoNotMatch");
      return;
    }

    setIsValid(true);
    setError(null);
    }, 200)
    return () => clearTimeout(timeout)
  }, [password, confirmPassword]);

  return { isValid, passworderror };
};
