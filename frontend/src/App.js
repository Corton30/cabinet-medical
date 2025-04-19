import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PatientForm from "./PatientForm";
import PatientSearch from "./PatientSearch";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Cabinet Médical</h1>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/patient-form" style={{ marginRight: "20px" }}>Créer un Patient</Link>
          <Link to="/patient-search">Rechercher un Patient</Link>
        </nav>
        <Routes>
          <Route path="/patient-form" element={<PatientForm />} />
          <Route path="/patient-search" element={<PatientSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;