import React from 'react';

const patients = ["Jonn Russe", "Faau Lavisov", "Jean Piden", "Eric Wode"];

export default function DoctorDashboard() {
  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-4 space-y-6 fixed h-full">
        <h1 className="text-xl font-bold">DOC_Médecin</h1>
        <nav className="space-y-3">
          <SidebarItem icon="🏠" label="Accueil" />
          <SidebarItem icon="👤" label="Patients" />
          <SidebarItem icon="📆" label="Calendrier" />
          <SidebarItem icon="💊" label="Ordonnances" />
          <SidebarItem icon="📄" label="Documents" />
          <SidebarItem icon="🔍" label="Vidal" />
          <SidebarItem icon="⚙️" label="Paramètres" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 bg-gray-100 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Patients</h2>
          <div className="flex items-center gap-4">
            <span>{new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}</span>
            <button className="bg-white border px-3 py-1 rounded hover:bg-gray-200">Déconnexion</button>
          </div>
        </header>

        <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Ajouter un patient</button>

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

function SidebarItem({ icon, label }) {
  return (
    <div className="flex items-center space-x-3 hover:bg-blue-800 p-2 rounded cursor-pointer">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}
