import { useTranslation } from "react-i18next";
import { Input } from "./auth_input";
import { Label } from "./auth_input_label";
import { CustomButton } from "@/component/ui/Button";

import Link from "next/link";

interface AuthInputProps {
  type: "email" | "phone";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean | null;
  checking: boolean;
  exists: boolean | null;
  onContinue:() => void;
  onContactChange?: (contact: string) => void;
}

export function AuthContactField({ type, value, onChange, isValid, checking, exists, onContinue, onContactChange }: AuthInputProps) {
    const { t } = useTranslation()
  const placeholder =
    type === "email" ? "chatgpt@mail.ln" : "+1 234 567 8901";
  const label = 
    type === "email"
      ? t("authpage:email_format_error")
      : t("authpage:phone_format_error");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (onContactChange) {
      onContactChange(e.target.value);
    }
  };
  
  return (
    <div className="relative">
      <Input
        id={type}
        name={type}
        type={type === "email" ? "email" : "tel"}
        autoComplete={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={
          isValid === null
            ? ""
            : isValid
            ? "border-green-500 pr-10 focus-visible:ring-green-500"
            : "border-red-500 pr-10 focus-visible:ring-red-500"
        }
      />
        <Label htmlFor={type}>
            {type === "phone" ? t("authpage:auth_type.phone") : t("authpage:auth_type.email")}
        </Label>
      {isValid === null ? null : isValid ? (
        <>
          <CustomButton
            variant="default"
            className="relative opacity-70 w-full shadow-lg mr-[0.5rem] top-2 text-white"
            onClick={onContinue}
            disabled={checking}
          >
            {checking ? "Checking..." : "Continue"}
          </CustomButton>
          {exists !== null && (
            <p
              className={`mt-2 text-sm font-semibold ${
                exists ? "text-green-600" : "text-blue-600"
              }`}
            >
            </p>
          )}
        </>
      ) : (
        <>
          <div className="absolute inset-y-0 right-0 flex items-center -top-1/3 pr-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="fill-red-600 opacity-70"
            >
              <path d="M12 15.75A1.125 1.125 0 1 0 12 18a1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m.75-2.25V5.25a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12m1.5 0c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12"></path>
            </svg>
          </div>

          <div className="text-red-600 text-xs mt-1">{label}</div>
        </>
      )}
    </div>
  );
}
