"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const path = usePathname() || "";

  const items = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/guests", label: "Guests" },
    { href: "/admin/bookings", label: "Bookings" },
    { href: "/admin/rooms", label: "Rooms" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white/90 dark:bg-slate-900/90 border-r border-gray-100 dark:border-slate-800 p-4">
      <div className="mb-6 px-2">
        <Link href="/admin" className="block text-xl font-bold text-slate-700 dark:text-slate-100">
          Admin
        </Link>
      </div>

      <nav className="space-y-1">
        {items.map((it) => {
          const active = path.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                active
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span className="truncate">{it.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 px-3">
        <h4 className="text-xs text-slate-400 uppercase tracking-wide">Quick actions</h4>
        <div className="mt-2 flex flex-col gap-2">
          <Link href="/admin/guests/new" className="text-sm bg-blue-600 text-white px-3 py-2 rounded-md text-center">
            Add guest
          </Link>
          <Link href="/admin/bookings/new" className="text-sm border border-gray-200 px-3 py-2 rounded-md text-center">
            New booking
          </Link>
        </div>
      </div>
    </aside>
  );
}