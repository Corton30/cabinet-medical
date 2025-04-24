import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PatientForm.css"; 

const PatientForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    antecedents: "",
    allergies_connues: false,
    nss: "",
    telephone: "",
    adresse: "",
    email: "",
    sexe: "Homme",
  });

  const [allergies, setAllergies] = useState([]); // List of allergies from the DB
  const [selectedAllergies, setSelectedAllergies] = useState([]); // Selected allergies
  const [message, setMessage] = useState("");
  const [selectedAllergy, setSelectedAllergy] = useState("");


  // Fetch allergies from the backend
  useEffect(() => {
    const fetchAllergies = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/allergies");
        setAllergies(response.data);
      } catch (err) {
        console.error("Error fetching allergies:", err);
      }
    };
    fetchAllergies();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddAllergy = () => {
    if (selectedAllergy && !selectedAllergies.some((a) => a._id === selectedAllergy)) {
      const allergy = allergies.find((a) => a._id === selectedAllergy);
      setSelectedAllergies([...selectedAllergies, allergy]);
      setSelectedAllergy(""); // Reset the dropdown
    }
  };
  const handleDeleteAllergy = (allergyId) => {
    setSelectedAllergies(selectedAllergies.filter((a) => a._id !== allergyId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save the patient
      const patientResponse = await axios.post("http://localhost:5001/api/patients", formData);
      const patientId = patientResponse.data._id;

      // Save the selected allergies in the patientAllergies table
      if (formData.allergies_connues && selectedAllergies.length > 0) {
        await Promise.all(
          selectedAllergies.map((allergyId) =>
            axios.post("http://localhost:5001/api/patient-allergies", {
              id_patient: patientId,
              id_allergie: allergyId,
            })
          )
        );
      }

      setMessage("Patient créé avec succès!");
      setFormData({
        nom: "",
        prenom: "",
        date_naissance: "",
        antecedents: "",
        allergies_connues: false,
        nss: "",
        telephone: "",
        adresse: "",
        email: "",
        sexe: "Homme",
      });
      setSelectedAllergies([]);
    } catch (err) {
      setMessage(err.response?.data?.error || "Une erreur s'est produite.");
    }
  };

    return (
    <div className="container">
      <h1>Créer un Patient</h1>
      <form onSubmit={handleSubmit}>
        <label>Nom:</label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
  
        <label>Prénom:</label>
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
  
        <label>Date de Naissance:</label>
        <input
          type="date"
          name="date_naissance"
          value={formData.date_naissance}
          onChange={handleChange}
          required
        />
  
        <label>Antécédents:</label>
        <textarea
          name="antecedents"
          value={formData.antecedents}
          onChange={handleChange}
        />
  
        <label>NSS:</label>
        <input
          type="number"
          name="nss"
          value={formData.nss}
          onChange={handleChange}
          required
        />
  
        <label>Téléphone:</label>
        <input
          type="text"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          required
        />
  
        <label>Adresse:</label>
        <input
          type="text"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          required
        />
  
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
  
        <label>Sexe:</label>
        <select
          name="sexe"
          value={formData.sexe}
          onChange={handleChange}
          required
        >
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
        </select>
  
        <label className="checkbox-container">
          <input
            type="checkbox"
            name="allergies_connues"
            checked={formData.allergies_connues}
            onChange={handleChange}
          />
          Allergies Connues
        </label>
  
        {formData.allergies_connues && (
          <div className="table-container">
            <h3>Allergies</h3>
            <select
              value={selectedAllergy}
              onChange={(e) => setSelectedAllergy(e.target.value)}
            >
              <option value="">Sélectionner une allergie</option>
              {allergies.map((allergy) => (
                <option key={allergy._id} value={allergy._id}>
                  {allergy.nom}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddAllergy}>
              Ajouter
            </button>
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedAllergies.map((allergy) => (
                  <tr key={allergy._id}>
                    <td>{allergy.nom}</td>
                    <td>
                      <button onClick={() => handleDeleteAllergy(allergy._id)}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
  
        <button type="submit">Créer</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PatientForm;