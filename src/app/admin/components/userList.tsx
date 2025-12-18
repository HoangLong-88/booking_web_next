import React, { FC }from "react";
import { useState } from "react";
import { useFetchUser } from "../hook/useFetchUser";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/providers/authProvider";

const GuestsListComponent: React.FC = () => {
  const [tab, setTab] = useState<"customer" | "staff">("customer");
  const { user } = useAuth();
  if (!user) return null;
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
  } = useFetchUser(tab);
  return (
    <div className="max-w-7xl w-full h-full max-h-full flex">

        <main className="flex-1 p-6">
          <header className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">
                  {tab === "customer" ? "Customer" : "Staff"}
                </h1>
                <p className="text-sm text-slate-500">
                  Manage all {tab === "customer" ? "customer" : "staff"} records
                </p>
              </div>

              {tab === "customer" && (
                <Link
                  href="/admin/guests/new"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  New Guest
                </Link>
              )}
            </div>

            {/* Tabs */}
            <div className="mt-4 border-b flex gap-6">
              <button
                onClick={() => setTab("customer")}
                className={`pb-2 text-sm font-medium transition
                  ${
                    tab === "customer"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                Customers
              </button>

              {user.role === 'admin' ? <button
                onClick={() => setTab("staff")}
                className={`pb-2 text-sm font-medium transition
                  ${
                    tab === "staff"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                Staff
              </button> : null}
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
                        <th className="py-3 px-3"></th>
                        <th className="py-3 px-3">ID</th>
                        <th className="py-3 px-3">Name</th>
                        <th className="py-3 px-3">Email</th>
                        <th className="py-3 px-3">Phone</th>
                        <th className="py-3 px-3">Bookings</th>
                        <th className="py-3 px-3">Joined</th>
                        <th className="py-3 px-3">Updated</th>
                        <th className="py-3 px-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageData.map((g) => (
                        <tr key={g.id} className="border-t border-gray-100 dark:border-slate-700">
                          <td className="py-1 px-1">
                            <Image 
                            src={g.avatar_url ?? '/images/default-avatar.png'}
                            alt="user avatar"
                            width={30}
                            height={30}
                            ></Image>
                          </td>
                          <td className="py-3 px-3">{g.id}</td>
                          <td className="py-3 px-3">{g.name ?? "_" }</td>
                          <td className="py-3 px-3 text-slate-600">{g.email ?? "-"}</td>
                          <td className="py-3 px-3">{g.phone ?? "_"}</td>
                          <td className="py-3 px-3">{g.bookingsCount ?? 0}</td>
                          <td className="py-3 px-3">{g.createdAt ? new Date(g.createdAt).toLocaleDateString() : "_"}</td>
                          <td className="py-3 px-3">{g.updatedAt ? new Date(g.updatedAt).toLocaleDateString() : "_"}</td>
                          <td className="py-3 px-3">
                            <div className="flex gap-2">
                              <Link href={`/admin/guests/${g.id}`} className="text-sm px-2 py-1 border rounded text-blue-600">
                                View
                              </Link>
                              <button
                                onClick={() => {}}
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
  );
}
export { GuestsListComponent };