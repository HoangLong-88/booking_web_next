export type Guest = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  bookingsCount?: number;
  createdAt?: string;
};

export async function fetchGuestsFromApi(): Promise<Guest[]> {
  const res = await fetch("/api/admin/guests", { cache: "no-store" });
  if (!res.ok) throw new Error(`fetch guests failed: ${res.status}`);
  const json = await res.json();
  // API may return array or { data: [] }
  return Array.isArray(json) ? json : json.data ?? [];
}

export async function deleteGuestById(id: string): Promise<void> {
  const res = await fetch(`/api/admin/guests/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`delete guest failed: ${res.status}`);
}