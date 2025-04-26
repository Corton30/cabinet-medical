import React, { useEffect, useRef, useCallback } from "react";
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
  const timeoutRef = useRef(null); // Use useRef for the timeout variable

  const resetTimeout = useCallback(() => {
    // Clear the existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Set a new timeout for 10 seconds
    timeoutRef.current = setTimeout(() => {
      localStorage.removeItem("token"); // Remove the token
      navigate("/login"); // Redirect to login
    }, 20*60*1000); // 20mins
  }, [navigate]); // Dependency array includes 'navigate'

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }

    // Add event listeners for user activity
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keydown", resetTimeout);

    // Start the initial timeout
    resetTimeout();

    // Cleanup event listeners and timeout on component unmount
    return () => {
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keydown", resetTimeout);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [navigate, resetTimeout]); // Include 'resetTimeout' in the dependency array

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col p-4 space-y-6 fixed h-full">
      <h1 className="text-xl font-bold">Cabinet medical</h1>
      <nav className="space-y-3">
        <SidebarItem icon="🏠" label="Accueil" to="/" />
        <SidebarItem icon="👤" label="Patients" to="/patient-search" />
        <SidebarItem icon="📆" label="Calendrier" to="/calendar" />
        <SidebarItem icon="💊" label="Ordonnances" to="/ordonnance" />
        <SidebarItem icon="📄" label="Documents" to="/documents" />
        <SidebarItem icon="🔍" label="Vidal" to="/vidal" />
        <SidebarItem icon="⚙️" label="Paramètres" to="/settings" />
      </nav>
    </aside>
  );
}