interface RegisterPayload {
  contact: string;
  password: string;
  name?: string;
}

export const registerService = {
    register: async (contact: string ,password: string ,name?: string) => {
        const payload: RegisterPayload = { contact, password };
        if (name) payload.name = name;
        console.log("Sending register payload:", payload);
        const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, name , password })
        });
        return {
        ok: res.ok,
        status: res.status,
        data: await res.json()
        };
    }
}