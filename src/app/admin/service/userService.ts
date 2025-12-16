import type { UserApi } from "@/types/api/userApi";

export type UserGroupResponse = {
  customers: UserApi[];
  staff: UserApi[];
};


export async function fetchCustomerAndStaffFromApi() {
  const res = await fetch("/api/admin/user/get", { cache: "no-store" });
  if (!res.ok) throw new Error(`fetch users failed: ${res.status}`);

  const json = await res.json();
  return {
    customers: json.data.customers ?? [],
    staff: json.data.staff ?? [],
  };
}

export async function deleteGuestById(id: string): Promise<void> {
  const res = await fetch(`/api/admin/guests/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`delete guest failed: ${res.status}`);
}