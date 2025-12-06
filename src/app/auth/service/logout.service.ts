import { getToken, clearToken } from "@/utils/storeLoginToken";
export const logoutService = {
    logout: async () => {
        const token = getToken();
        if (!token) {
            return {
                ok: false,
                status: 400
            };
        }
        const res = await fetch("/api/auth/logout", {
        method: "POST", 
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        });
        clearToken();
        
        return {
        ok: res.ok,
        status: res.status,
        data: await res.json()
        };
    }
}