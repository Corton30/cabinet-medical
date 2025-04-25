import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const PatientSearch = () => {
  const [nss, setNss] = useState("");
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const [patients, setPatients] = useState([]); // List of patients for the left side
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch a list of patients for the left side
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/patients");
        setPatients(response.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
    fetchPatients();
  }, []);

  const handleSearch = async (nssToSearch = nss) => {
    try {
      setError(""); // Clear previous errors
      const response = await axios.get(`http://localhost:5001/api/patients/nss/${nssToSearch}`);
      setPatient(response.data);
    } catch (err) {
      setPatient(null);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handleUpdate = () => {
    if (patient && patient._id) {
      navigate(`/patient-update/${patient._id}`); // Navigate to the update form with the patient ID
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 bg-gray-100 p-6 overflow-y-auto">


        <div className="flex gap-6">
          {/* Left Side: List of Patients */}
          <div className="w-1/3 bg-white shadow-md rounded-lg p-4">
            {/* Separate Block for the Button */}
            <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
              <button
                onClick={() => navigate("/patient-form")} // Redirect to the patient creation form
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              >
                Ajouter un Patient
              </button>
            </div>

            {/* Scrollable Patient List */}
            <div className="max-h-[500px] overflow-y-scroll">
              {/* Title for the Patient List */}
              <h3 className="text-lg font-bold mb-4 text-gray-800">Liste des Patients</h3>

              {/* Patient List */}
              <ul className="space-y-2">
                {patients.map((p) => (
                  <li
                    key={p._id}
                    className="border-b pb-2 cursor-pointer hover:text-blue-600"
                    onClick={() => {
                      setNss(p.nss); // Set NSS for quick search
                      handleSearch(p.nss); // Automatically fetch details
                    }}
                  >
                    <p><strong>Nom:</strong> {p.nom}</p>
                    <p><strong>Prénom:</strong> {p.prenom}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Search by NSS */}
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
                onClick={() => handleSearch()}
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

                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
                >
                  Modifier les Informations
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientSearch;