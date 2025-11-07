import { Input } from "./auth_input";
import { Label } from "./auth_input_label";
import { CustomButton } from "@/component/ui/Button";

import Link from "next/link";

interface AuthInputProps {
  type: "email" | "phone";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean | null;
}

export function AuthContactField({ type, value, onChange, isValid }: AuthInputProps) {
  const placeholder =
    type === "email" ? "chatgpt@mail.ln" : "+1 234 567 8901";
  const label =
    type === "email"
      ? "Please check if the email address you've entered is correct."
      : "Please check if the phone number you've entered is correct.";

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
        onChange={onChange}
        className={
          isValid === null
            ? ""
            : isValid
            ? "border-green-500 pr-10"
            : "border-red-500 pr-10"
        }
      />
        <Label htmlFor={type}>
            {type === "phone" ? "Phone number" : "Email address"}
        </Label>
      {isValid === null ? null : isValid ? (
        <CustomButton
          variant="default"
          asChild
          className="relative opacity-80 w-full shadow-lg mr-[0.5rem] top-2"
        >
          <Link href="#" className="px-6 py-2 text-white">
            Continue
          </Link>
        </CustomButton>
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
