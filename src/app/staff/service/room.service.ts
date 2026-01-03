import { getToken } from "@/utils/storeLoginToken";
export const roomService = {
    getFormData: async () => {
        const res = await fetch('/api/staff/rooms/form-data', {
            method: 'GET'
        });
        const json = await res.json()
        return {
            ok: res.ok,
            status: res.status,
            data: json.data
        }
    },
      createRoom: async (formData: FormData) => {
        const token = getToken();
        const res = await fetch('/api/staff/rooms/add', {
            method: 'POST',
            body: formData,
            headers: {"Authorization": `Bearer ${token}`},
        })

        const data = await res.json()

        return {
        ok: res.ok,
        status: res.status,
        data
    }
  }
}