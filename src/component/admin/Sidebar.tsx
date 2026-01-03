"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { sidebarVariant } from "@/libs/animations/sidebar";
import { useState } from "react";
import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import { CustomButton } from "../ui/Button";
import {
  LayoutDashboard,
  Users,
  MapPin,
  CalendarCheck,
  Bed,
  Settings,
  Hotel
} from "lucide-react";
import { cn } from "@/libs/utils";
import { useAuth } from "@/app/providers/authProvider";

type SidebarProps = {
    active: string; 
    onSelect: (key: string) => void;
    className?: string;
    userRole?: string;
};

export default function AdminSidebar({ active, onSelect, className }: SidebarProps) {
  const { user } = useAuth();
  const path = usePathname() || "";
  const [open, setOpen] = useState(true);

  if (!user) return null;

  const adminItems = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { key: "guests", label: "Guests - Staffs", icon: <Users size={20} /> },
    { key: "location", label: "Locations", icon: <MapPin size={20} /> },
    { key: "bookings", label: "Bookings", icon: <CalendarCheck size={20} /> },
    { key: "rooms", label: "Rooms", icon: <Bed size={20} /> },
    { key: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const staffItems = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { key: "guests", label: "Guests", icon: <Users size={20} /> },
    { key: "bookings", label: "Bookings", icon: <CalendarCheck size={20} /> },
    { key: "stays", label: "Stays", icon: <Hotel size={20}/>},
    { key: "rooms", label: "Rooms", icon: <Bed size={20} /> },
  ];

  const menuItems =
  user.role === "admin"
    ? adminItems
    : user.role === "staff"
    ? staffItems
    : [];
  return (
  <motion.aside
    variants={sidebarVariant}
    animate={open ? "expanded" : "collapsed"}
    className={cn(
      `h-screen bg-white dark:bg-slate-900 border-r border-gray-200  
      dark:border-slate-700 flex flex-col 
      px-4 overflow-hidden ${open ? 'min-w-64' : 'min-w-16'}`,
      className
    )}
  >
    {/* Nút toggle */}
    <div className="flex items-center justify-between">
      {open && (
        <div className="mb-4">
          <Link href="/admin" className="text-xl font-semibold">
            {user.role === 'admin' ? 'Admin Panel' : 'Staff Panel'}
          </Link>
        </div>
      )}
      <CustomButton 
        variant={'destructive'}
        onClick={() => setOpen((s) => !s)}
        className="mb-4 p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800"
      >
        {open ? <PanelLeftClose /> : <PanelRightClose />}
      </CustomButton>
    </div>
    
    {/* Menu */}
    <ul className="space-y-2">
      {menuItems.map((item) => (
        <li key={item.key}>
          <CustomButton
            variant="destructive"
            onClick={() => onSelect(item.key)}
            className={`
              w-full transition flex items-center 
              ${open ? "justify-start px-3" : "justify-center px-0"} py-2
              ${active === item.key ? "bg-slate-700" : "hover:bg-slate-800"}
            `}
          >
            {open 
              ? item.label 
              : <span className="flex justify-center w-full">{item.icon}</span>
            }
          </CustomButton>
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
);
}