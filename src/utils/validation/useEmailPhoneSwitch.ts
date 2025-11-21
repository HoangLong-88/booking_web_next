
import { useState, useEffect} from "react";
import React from "react";

function useAuthSwitchForm() {
    const [switchToPhone, setSwitchToPhone] = React.useState(false);
    const [ email, setEmail ] = useState<string>("");
    const [ phone, setPhone] = useState<string>("");
    const [ isValid, setIsValid ] = useState<boolean | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!switchToPhone && email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                setIsValid(emailRegex.test(email));
            } else if (switchToPhone && phone) {
                const phoneRegex = /^\+?[0-9]\d{1,14}$/;
                setIsValid(phoneRegex.test(phone));
            } else {
                setIsValid(null);
            }
        }, 500); // 500ms debounce
        return () => clearTimeout(timer);
    }, [email, phone, switchToPhone]);       
    return {
    switchToPhone,
    setSwitchToPhone,
    email,
    setEmail,
    phone,
    setPhone,
    isValid,
  };
}
export { useAuthSwitchForm };