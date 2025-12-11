import React from "react";
import LocationList from "../location/locationList";

export function DashboardComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage your application.</p>
      <LocationList />
    </div>
  );
}