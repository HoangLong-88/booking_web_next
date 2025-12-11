"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { sidebarVariant } from "@/libs/animations/sidebar";
import { useState } from "react";

type SidebarProps = {
    active: string;
    onSelect: (key: string) => void;
};

export default function AdminSidebar({ active, onSelect }: SidebarProps) {
  const path = usePathname() || "";
  const [open, setOpen] = useState(true);

  const items = [
      { key: "dashboard", label: "Dashboard" },
      { key: "guests", label: "Guests" },
      { key: "location", label: "Locations" },
      { key: "bookings", label: "Bookings" },
      { key: "rooms", label: "Rooms" },
      { key: "settings", label: "Settings" },
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
       <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.key}>
            <button
              onClick={() => onSelect(item.key)}
              className={`w-full text-left px-3 py-2 rounded-xl transition 
                ${active === item.key ? "bg-slate-700" : "hover:bg-slate-800"}
              `}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

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