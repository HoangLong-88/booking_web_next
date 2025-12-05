"use client";
import AdminSidebar from "@/component/admin/Sidebar";
import Link from "next/link";
import { useGuests } from "./hook/useGuests";

type Guest = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  bookingsCount?: number;
  createdAt?: string;
};

const MOCK: Guest[] = Array.from({ length: 18 }).map((_, i) => ({
  id: String(i + 1),
  name: `Guest ${i + 1}`,
  email: `guest${i + 1}@example.com`,
  phone: `+84 9${10000000 + i}`,
  bookingsCount: Math.floor(Math.random() * 5),
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

export default function GuestsListPage() {
  const {
    loading,
    pageData,
    query,
    setQuery,
    page,
    setPage,
    total,
    totalPages,
    error,
    remove,
  } = useGuests(8);

  const handleDelete = (id: string) => {
    if (!confirm("Delete guest?")) return;
    remove(id);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto flex">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Guests</h1>
              <p className="text-sm text-slate-500">Manage all guest records</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/guests/new" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                New Guest
              </Link>
            </div>
          </header>

          <section className="bg-white dark:bg-slate-800 rounded-md shadow-sm p-4">
            <div className="flex items-center gap-3 mb-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email or phone..."
                className="flex-1 px-3 py-2 border rounded-md bg-white/50 dark:bg-slate-700 outline-none"
              />
              <div className="text-sm text-slate-500">Total: {total}</div>
            </div>

            {loading ? (
              <div className="py-20 text-center text-slate-400">Loading...</div>
            ) : (
              <>
                {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-slate-500">
                        <th className="py-3 px-3">Name</th>
                        <th className="py-3 px-3">Email</th>
                        <th className="py-3 px-3">Phone</th>
                        <th className="py-3 px-3">Bookings</th>
                        <th className="py-3 px-3">Joined</th>
                        <th className="py-3 px-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageData.map((g) => (
                        <tr key={g.id} className="border-t border-gray-100 dark:border-slate-700">
                          <td className="py-3 px-3">{g.name}</td>
                          <td className="py-3 px-3 text-slate-600">{g.email ?? "-"}</td>
                          <td className="py-3 px-3">{g.phone ?? "-"}</td>
                          <td className="py-3 px-3">{g.bookingsCount ?? 0}</td>
                          <td className="py-3 px-3">{g.createdAt ? new Date(g.createdAt).toLocaleDateString() : "-"}</td>
                          <td className="py-3 px-3">
                            <div className="flex gap-2">
                              <Link href={`/admin/guests/${g.id}`} className="text-sm px-2 py-1 border rounded text-blue-600">
                                View
                              </Link>
                              <button
                                onClick={() => handleDelete(g.id)}
                                className="text-sm px-2 py-1 border rounded text-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {pageData.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">
                            No results
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* pagination */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    Page {page} of {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}