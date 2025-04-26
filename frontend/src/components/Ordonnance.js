import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Ordonnance = () => {
  const [nss, setNss] = useState("");
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSearch = async () => {
    try {
      setError(""); // Clear previous errors
      const response = await axios.get(`http://localhost:5001/api/patients/nss/${nss}`);
      setPatient(response.data); // Set the patient data
    } catch (err) {
      setPatient(null);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handleWriteOrdonnance = () => {
    navigate(`/write-ordonnance/${nss}`); // Navigate to the WriteOrdonnance route with the NSS
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 bg-gray-100 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Ordonnance</h1>

        {/* Search by NSS */}
        <div className="w-2/3 bg-white shadow-md rounded-lg p-6">
          <h1 className="text-xl font-bold mb-4 text-gray-800">Recherche de patient par NSS</h1>
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              placeholder="Entrez le numéro de sécurité sociale"
              value={nss}
              onChange={(e) => setNss(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Rechercher
            </button>
          </div>

          {error && (
            <p className="text-red-600 font-medium mb-4">{error}</p>
          )}

          {patient && (
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2 text-gray-800">Informations du Patient</h2>
              <p><strong>Nom:</strong> {patient.nom}</p>
              <p><strong>Prénom:</strong> {patient.prenom}</p>
              <p><strong>Date de Naissance:</strong> {new Date(patient.date_naissance).toLocaleDateString()}</p>
              <p><strong>NSS:</strong> {patient.nss}</p>
              <p><strong>Téléphone:</strong> {patient.telephone}</p>
              <p><strong>Adresse:</strong> {patient.adresse}</p>
              <p><strong>Email:</strong> {patient.email}</p>
              <p><strong>Sexe:</strong> {patient.sexe}</p>
              <p><strong>Allergies Connues:</strong> {patient.allergies_connues ? "Oui" : "Non"}</p>

              {patient.allergies && patient.allergies.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-bold text-gray-800 mb-2">Allergies</h3>
                  <ul className="list-disc list-inside">
                    {patient.allergies.map((allergy) => (
                      <li key={allergy.id_allergie._id}>{allergy.id_allergie.nom}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Button to open WriteOrdonnance */}
              <button
                onClick={handleWriteOrdonnance}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
              >
                Créer une Ordonnance
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Ordonnance;