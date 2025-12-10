"use client";
import AdminSidebar from "@/component/admin/Sidebar";
import Link from "next/link";
import { useGuests } from "./hook/useGuests";
import { useState } from "react";
import { GuestsListComponent } from "./components/guests";
import LocationForm from "./components/location/locationForm";
import { DashboardComponent } from "./components/dashboard/dashboard";

type Guest = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  bookingsCount?: number;
  createdAt?: string;
};  

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
  const [active, setActive] = useState("dashboard");

  const handleDelete = (id: string) => {
    if (!confirm("Delete guest?")) return;
    remove(id);
  };

    const renderComponent = () => {
    switch (active) {
      case "guests":
        return <GuestsListComponent />;
      case "location":
        return <LocationForm />;
      // case "bookings":
      //   return <BookingsComponent />;
      // case "rooms":
      //   return <RoomsComponent />;
      // case "settings":
      //   return <SettingsComponent />;
      default:
        return <DashboardComponent />;
    }
  };

  return (
    <div className="min-h-screen flex flex-row bg-slate-50 dark:bg-slate-900 text-slate-900 mt-[4.5rem] dark:text-slate-100">
      <AdminSidebar active={active} onSelect={setActive}/>
      <div className="max-w-7xl w-full max-h-full flex">

        <main className="flex-1 p-6">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
}