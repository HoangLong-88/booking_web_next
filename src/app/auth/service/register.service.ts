interface RegisterPayload {
  contact: string;
  password: string;
  name?: string;
  keepLoggedIn?: boolean
}

export const registerService = {
    register: async (contact: string ,password: string ,keepLoggedIn: boolean,name?: string) => {
        const payload: RegisterPayload = { contact, password };
        if (name) {
          payload.name = name;
          payload.keepLoggedIn = keepLoggedIn}
        const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, name , password, keepLoggedIn })
        });
        return {
        ok: res.ok,
        status: res.status,
        data: await res.json()
        };
    }
}