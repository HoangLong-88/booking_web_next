interface LoginPayload {
  contact: string;
  password: string;
  keepLoggedIn?: boolean
}

export const loginService = {
    login: async (contact: string ,password: string ,keepLoggedIn: boolean) => {
        const payload: LoginPayload = { contact, password, keepLoggedIn };
        const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
        });
        return {
        ok: res.ok,
        status: res.status,
        data: await res.json()
        };
    }
}