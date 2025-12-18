import { getToken } from "@/utils/storeLoginToken";
export const stayService = {
    getFormData: async () => {
        const res = await fetch('/api/staff/stays/form-data', {
            method: 'GET'
        });
        const json = await res.json()
        return {
            ok: res.ok,
            status: res.status,
            data: json.data
        }
    },
      createStay: async (formData: FormData) => {
        const token = getToken();
        const res = await fetch('/api/staff/stays/add', {
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