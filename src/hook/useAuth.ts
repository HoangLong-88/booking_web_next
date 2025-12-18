import { useEffect, useState } from "react";

export function useAuth() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    if (!token) return null;
    return { token };
}
