import { useEffect, useMemo, useState } from "react";
import { fetchCustomerAndStaffFromApi } from "../service/userService";
import type { User } from "@/types/user";
import type { UserApi } from "@/types/api/userApi";

type RoleTab = "customer" | "staff";

export function useFetchUser(tab: RoleTab, pageSize = 10) {
  const [customers, setCustomers] = useState<User[]>([]);
  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  /* ================= FETCH ================= */
   useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchCustomerAndStaffFromApi();

        // map customers
        setCustomers(
          res.customers.map(mapUserApiToUser)
        );

        // map staff
        setStaff(
          res.staff.map(mapUserApiToUser)
        );
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const source = tab === "customer" ? customers : staff;

  /* ================= RESET PAGE WHEN TAB / QUERY CHANGES ================= */
  useEffect(() => {
    setPage(1);
  }, [tab, query]);
  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return source.filter((u) =>
      [u.name, u.email, u.phone]
        .some((v) => v?.toLowerCase().includes(query.toLowerCase()))
    );
  }, [source, query]);

  /* ================= PAGINATION ================= */
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  /* ================= RETURN ================= */
  return {
    loading,
    pageData,
    query,
    setQuery,
    page,
    setPage,
    total,
    totalPages,
    error,
  };
}
function mapUserApiToUser(u: UserApi): User {
  return {
    id: String(u.id),
    name: u.name,
    email: u.email,
    phone: u.phone,
    role: u.role,
    bookingsCount: u.bookings_count ?? 0,
    createdAt: u.created_at ?? undefined,
    updatedAt: u.updated_at ?? undefined,
    avatar_url: u.avatar_url ?? undefined,
  };
}