import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PatientForm from "./components/PatientForm";
import PatientSearch from "./components/PatientSearch";
import PatientUpdateForm from "./components/PatientUpdateForm";
//import DoctorDashboard from "./DoctorDashboard"; <Route path="/Dashboard/:id" element={<DoctorDashboard />} />

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Gestion des Patients</h1>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/patient-form" style={{ marginRight: "20px" }}>Créer un Patient</Link>
          <Link to="/patient-search"style={{ marginRight: "20px" }}>Rechercher un Patient</Link>

        </nav>
        <Routes>
          <Route path="/patient-form" element={<PatientForm />} />
          <Route path="/patient-search" element={<PatientSearch />} />
          <Route path="/patient-update/:id" element={<PatientUpdateForm />} />
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;