"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { sidebarVariant, overlayVariant } from "@/libs/animations/sidebar";
import { useState } from "react";

export default function AdminSidebar() {
  const path = usePathname() || "";
  const [open, setOpen] = useState(true);

  const items = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/guests", label: "Guests" },
    { href: "/admin/bookings", label: "Bookings" },
    { href: "/admin/rooms", label: "Rooms" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
      <>
      <motion.aside
      variants={sidebarVariant}
      animate={open ? "expanded" : "collapsed"}
      className="h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex flex-col p-4 overflow-hidden"
    >
      {/* Nút toggle */}
      <button
        onClick={() => setOpen((s) => !s)}
        className="mb-4 p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800"
      >
        {open ? "←" : "→"}
      </button>

      {/* Logo */}
      {open && (
        <div className="mb-4">
          <Link href="/admin" className="text-xl font-semibold">
            Admin
          </Link>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 space-y-1">
        {items.map((it: any) => {
          const active = path.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                active
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {/* Icon placeholder */}
              <div className="w-5 h-5 bg-slate-300 dark:bg-slate-700 rounded"></div>

              {/* Ẩn label khi collapsed */}
              {open && <span className="truncate">{it.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Quick actions */}
      {open && (
        <div className="mt-auto space-y-2">
          <Link href="/admin/guests/new" className="block bg-blue-600 text-white px-3 py-2 rounded text-center">
            Add guest
          </Link>
          <Link href="/admin/bookings/new" className="block border border-gray-300 px-3 py-2 rounded text-center">
            New booking
          </Link>
        </div>
      )}
    </motion.aside>
    </>
  );
}