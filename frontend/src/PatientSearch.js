import React, { useState } from "react";
import axios from "axios";

const PatientSearch = () => {
  const [nss, setNss] = useState("");
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

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
        </div>
      )}
    </div>
  );
};

export default PatientSearch;