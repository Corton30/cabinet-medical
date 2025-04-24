import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/PatientSearch.css";

const PatientSearch = () => {
  const [nss, setNss] = useState("");
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      setError(""); // Clear previous errors
      const response = await axios.get(`http://localhost:5001/api/patients/nss/${nss}`);
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Search Patient by NSS</h1>
      <div>
        <input
          type="text"
          placeholder="Enter NSS"
          value={nss}
          onChange={(e) => setNss(e.target.value)}
          style={{ padding: "10px", width: "300px", marginRight: "10px" }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
          Search
        </button>
      </div>
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
      {patient && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px" }}>
          <h2>Patient Information</h2>
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
            <div>
              <h3>Allergies</h3>
              <ul>
                {patient.allergies.map((allergy) => (
                  <li key={allergy.id_allergie._id}>{allergy.id_allergie.nom}</li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={handleUpdate} style={{ padding: "10px 20px", marginTop: "20px" }}>
            Update Patient Info
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientSearch;