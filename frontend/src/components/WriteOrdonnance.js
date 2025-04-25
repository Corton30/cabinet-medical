import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const WriteOrdonnance = () => {
  const { nss } = useParams(); // Get NSS from the URL
  const [medicaments, setMedicaments] = useState([]);
  const [selectedMedicament, setSelectedMedicament] = useState("");
  const [dose, setDose] = useState("");
  const [frequence, setFrequence] = useState("");
  const [ordonnanceMedicaments, setOrdonnanceMedicaments] = useState([]);

  useEffect(() => {
    // Fetch the list of medicaments
    const fetchMedicaments = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/medicaments");
        setMedicaments(response.data);
      } catch (err) {
        console.error("Failed to fetch medicaments:", err);
      }
    };
    fetchMedicaments();
  }, []);

  const handleAddMedicament = () => {
    if (selectedMedicament && dose && frequence) {
      const medicament = medicaments.find((m) => m._id === selectedMedicament);
      setOrdonnanceMedicaments([
        ...ordonnanceMedicaments,
        { id: selectedMedicament, nom: medicament.nom, dose, frequence },
      ]);
      setSelectedMedicament("");
      setDose("");
      setFrequence("");
    }
  };

  const handleRemoveMedicament = (id) => {
    setOrdonnanceMedicaments(ordonnanceMedicaments.filter((m) => m.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ordonnance = {
        patient_nss: nss,
        medicaments: ordonnanceMedicaments.map(({ id, dose, frequence }) => ({
          id_medicament: id,
          dose,
          frequence,
        })),
      };
      await axios.post("http://localhost:5001/api/ordonnances", ordonnance);
      alert("Ordonnance created successfully!");
    } catch (err) {
      console.error("Failed to create ordonnance:", err);
      alert("Failed to create ordonnance.");
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 bg-gray-100 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Créer une ordonnance pour NSS: {nss}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Médicament</label>
            <select
              value={selectedMedicament}
              onChange={(e) => setSelectedMedicament(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Sélectionner un médicament</option>
              {medicaments.map((medicament) => (
                <option key={medicament._id} value={medicament._id}>
                  {medicament.nom}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Dose</label>
            <input
              type="text"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Fréquence</label>
            <input
              type="text"
              value={frequence}
              onChange={(e) => setFrequence(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button
            type="button"
            onClick={handleAddMedicament}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ajouter
          </button>
          <table className="w-full border mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Nom</th>
                <th className="border px-4 py-2">Dose</th>
                <th className="border px-4 py-2">Fréquence</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {ordonnanceMedicaments.map((medicament) => (
                <tr key={medicament.id}>
                  <td className="border px-4 py-2">{medicament.nom}</td>
                  <td className="border px-4 py-2">{medicament.dose}</td>
                  <td className="border px-4 py-2">{medicament.frequence}</td>
                  <td className="border px-4 py-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicament(medicament.id)}
                      className="text-red-600 hover:underline"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
          >
            Enregistrer l'ordonnance
          </button>
        </form>
      </main>
    </div>
  );
};

export default WriteOrdonnance;