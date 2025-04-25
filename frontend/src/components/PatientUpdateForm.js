import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const PatientUpdateForm = () => {
  const { id: patientId } = useParams();
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

  const [allergies, setAllergies] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedAllergy, setSelectedAllergy] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPatientAndAllergies = async () => {
      try {
        const patientResponse = await axios.get(`http://localhost:5001/api/patients/${patientId}`);
        setFormData(patientResponse.data);

        const allergiesResponse = await axios.get("http://localhost:5001/api/allergies");
        setAllergies(allergiesResponse.data);

        const patientAllergiesResponse = await axios.get(
          `http://localhost:5001/api/patient-allergies/${patientId}`
        );
        setSelectedAllergies(patientAllergiesResponse.data.map((pa) => pa.id_allergie));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (patientId) {
      fetchPatientAndAllergies();
    }
  }, [patientId]);

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
      setSelectedAllergy("");
    }
  };

  const handleDeleteAllergy = (allergyId) => {
    setSelectedAllergies(selectedAllergies.filter((a) => a._id !== allergyId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/patients/${patientId}`, formData);

      await axios.put(`http://localhost:5001/api/patient-allergies/${patientId}`, {
        allergies: selectedAllergies.map((a) => a._id),
      });

      setMessage("Patient mis à jour avec succès!");
    } catch (err) {
      console.error("Error during submission:", err);
      setMessage(err.response?.data?.error || "Une erreur s'est produite.");
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 bg-gray-100 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Mettre à jour un Patient</h2>
        </header>

        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Nom:</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Prénom:</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Date de Naissance:</label>
              <input
                type="date"
                name="date_naissance"
                value={formData.date_naissance?.split("T")[0]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Antécédents:</label>
              <textarea
                name="antecedents"
                value={formData.antecedents}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">NSS:</label>
              <input
                type="number"
                name="nss"
                value={formData.nss}
                onChange={handleChange}
                required
                disabled
                className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Téléphone:</label>
              <input
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Adresse:</label>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Sexe:</label>
              <select
                name="sexe"
                value={formData.sexe}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="allergies_connues"
                  checked={formData.allergies_connues}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Allergies Connues</span>
              </label>
            </div>
            {formData.allergies_connues && (
              <div className="mt-4">
                <h3 className="font-bold text-gray-800 mb-2">Allergies</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <select
                    value={selectedAllergy}
                    onChange={(e) => setSelectedAllergy(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner une allergie</option>
                    {allergies.map((allergy) => (
                      <option key={allergy._id} value={allergy._id}>
                        {allergy.nom}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddAllergy}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Ajouter
                  </button>
                </div>
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 text-left">Nom</th>
                      <th className="border px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAllergies.map((allergy) => (
                      <tr key={allergy._id}>
                        <td className="border px-4 py-2">{allergy.nom}</td>
                        <td className="border px-4 py-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteAllergy(allergy._id)}
                            className="text-red-600 hover:underline"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
            >
              Mettre à jour
            </button>
          </form>
          {message && (
            <p className="mt-4 text-green-600 font-medium">{message}</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientUpdateForm;