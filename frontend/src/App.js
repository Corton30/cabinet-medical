import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login"; 
import Register from "./components/Register"; 
import PatientForm from "./components/PatientForm";
import PatientSearch from "./components/PatientSearch";
import PatientUpdateForm from "./components/PatientUpdateForm";
import DoctorDashboard from "./components/DoctorDashboard"; 



function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>


        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/" element={<DoctorDashboard />} />
          <Route path="/patient-form" element={<PatientForm />} />
          <Route path="/patient-search" element={<PatientSearch />} />
          <Route path="/patient-update/:id" element={<PatientUpdateForm />} />

          

        </Routes>
      </div>
    </Router>
  );
}

export default App;