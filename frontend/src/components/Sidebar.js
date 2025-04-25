import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function SidebarItem({ icon, label, to }) {
  return (
    <Link to={to} className="flex items-center space-x-3 hover:bg-blue-800 p-2 rounded cursor-pointer">
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col p-4 space-y-6 fixed h-full">
      <h1 className="text-xl font-bold">Cabinet medical</h1>
      <nav className="space-y-3">
        <SidebarItem icon="🏠" label="Accueil" to="/" />
        <SidebarItem icon="👤" label="Patients" to="/patient-search" />
        <SidebarItem icon="📆" label="Calendrier" to="/calendar" />
        <SidebarItem icon="💊" label="Ordonnances" to="/prescriptions" />
        <SidebarItem icon="📄" label="Documents" to="/documents" />
        <SidebarItem icon="🔍" label="Vidal" to="/vidal" />
        <SidebarItem icon="⚙️" label="Paramètres" to="/settings" />
      </nav>
    </aside>
  );
}