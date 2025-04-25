import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const patients = ["Jonn Russe", "Faau Lavisov", "Jean Piden", "Eric Wode"];

export default function DoctorDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 bg-gray-100 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Patients</h2>
          <div className="flex items-center gap-4">
            <span>{new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}</span>
            <button
              onClick={handleLogout} // Attach the logout handler
              className="bg-white border px-3 py-1 rounded hover:bg-red-600 hover:text-white"
            >
              Déconnexion
            </button>
          </div>
        </header>

        {/* Bouton pour ajouter un patient */}
        <Link to="/patient-form">
          <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
            Ajouter un patient
          </button>
        </Link>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow p-4 rounded">
            <h3 className="font-bold mb-2">Patients</h3>
            {patients.map((name) => (
              <div key={name} className="border-b py-2 cursor-pointer hover:text-blue-700">
                {name}
              </div>
            ))}
          </div>

          <div className="bg-white shadow p-4 rounded">
            <h3 className="font-bold">Jean Dupont</h3>
            <p>Né(e) le 15/03/1880</p>
            <p>Sexe : Homme</p>
            <p>Téléphone : 01 23 45 67 89</p>
          </div>
        </div>
      </main>
    </div>
  );
}