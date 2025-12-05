import { useEffect, useMemo, useState, useCallback } from "react";
import { fetchGuestsFromApi, deleteGuestById, Guest } from "../service/guestService";

const MOCK: Guest[] = Array.from({ length: 18 }).map((_, i) => ({
  id: String(i + 1),
  name: `Guest ${i + 1}`,
  email: `guest${i + 1}@example.com`,
  phone: `+84 9${10000000 + i}`,
  bookingsCount: Math.floor(Math.random() * 5),
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

export function useGuests(pageSize = 8) {
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGuestsFromApi();
      setGuests(data.length ? data : MOCK);
    } catch (err) {
      console.warn("useGuests: fetch failed, fallback to mock", err);
      setGuests(MOCK);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return guests;
    return guests.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        (g.email ?? "").toLowerCase().includes(q) ||
        (g.phone ?? "").toLowerCase().includes(q)
    );
  }, [guests, query]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const remove = useCallback(
    async (id: string) => {
      // optimistic UI
      const prev = guests;
      setGuests((s) => s.filter((g) => g.id !== id));
      try {
        await deleteGuestById(id);
      } catch (err) {
        setError("Failed to delete guest");
        setGuests(prev); // rollback
        await load();
      }
    },
    [guests, load]
  );

  return {
    loading,
    guests,
    query,
    setQuery,
    page,
    setPage,
    pageSize,
    pageData,
    total,
    totalPages,
    error,
    load,
    remove,
  } as const;
}