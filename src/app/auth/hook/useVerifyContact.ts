'use client'
import { useState } from "react";
import { checkEmailExists, checkPhoneExists } from "../service/verify_contact";

export interface UseVerifyContactProps {
    switchToPhone: boolean;
    email: string;
    phone: string;
}
export interface UseVerifyContactReturn {
    checking: boolean;
    exists: boolean | null;
    handleContinue: () => Promise<boolean>;
}
export function useVerifyContact({ switchToPhone, email, phone}: UseVerifyContactProps): UseVerifyContactReturn {
    const [checking, setChecking] = useState(false);
    const [exists, setExists] = useState<boolean | null>(null);

    const handleContinue = async () => {
        setChecking(true);
        setExists(null);

        try {
            let responseExists = false;

            if (switchToPhone) {
                const response = await checkPhoneExists(phone);
                responseExists = !!response.exists;
            } else {
                const response = await checkEmailExists(email);
                responseExists = !!response.exists;
            }
            setExists(responseExists)
            return responseExists;
        }
        catch (error) {
            console.error("Error verifying contact:", error);
            setExists(null);
            return false;
        }
        finally {
            setChecking(false);
        }
    };
    return {
        checking,
        exists,
        handleContinue,
    };
}