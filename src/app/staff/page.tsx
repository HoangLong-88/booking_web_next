"use client";
import AdminSidebar from "@/component/admin/Sidebar";
import { useState } from "react";
import { GuestsListComponent } from "../admin/components/userList";
import StayForm from "./component/stayForm";
import RoomsForm from "./component/roomForm";

export default function AdminPage() {
  const [active, setActive] = useState("dashboard");

    const renderComponent = () => {
    switch (active) {
      case "guests":
        return <GuestsListComponent />;
      case "stays":
        return <StayForm />;
      // case "bookings":
      //   return <BookingsComponent />;
      case "rooms":
        return <RoomsForm />;
      // case "settings":
      //   return <SettingsComponent />;
      default:
        return ;
    }
  };

  return (
    <div className="min-h-screen  flex flex-row bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <div className="flex-0">
          <AdminSidebar active={active} 
          onSelect={setActive}
          className={`pt-30 ${ active === 'location' ? `pt-20` : `` }`}/>
        </div>
        <div className={`flex-1  mt-[8rem] ${ active === 'dashboard' ? `overflow-hidden`: `overflow-y-auto` }`}>
          {renderComponent()}
        </div>
    </div>  
  );
}