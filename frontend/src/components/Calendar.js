import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // For month/week/day views
import timeGridPlugin from "@fullcalendar/timegrid"; // For time grid views
import interactionPlugin from "@fullcalendar/interaction"; // For drag and drop and selection
import Sidebar from "./Sidebar"; // Import the Sidebar component
import Select from "react-select"; // Import React Select
import axios from "axios"; // For API requests

const Calendar = () => {
  const [events, setEvents] = useState([]); // Initialize with an empty array
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [newEvent, setNewEvent] = useState({ patientId: "", start: "", end: "" }); // State for new event details
  const [patients, setPatients] = useState([]); // State to store patients

  // Fetch patients from the backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/patients"); // Replace with your API endpoint
        const patientOptions = response.data.map((patient) => ({
          value: patient._id,
          label: `${patient.nom} ${patient.prenom}`,
        }));
        setPatients(patientOptions);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };

    fetchPatients();
  }, []);

  // Handle date selection (when a user selects a date or range)
  const handleDateSelect = (info) => {
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    setNewEvent({
      patientId: "",
      start: formatDate(info.start), // Prefill start date
      end: formatDate(new Date(info.start.getTime() + 30 * 60 * 1000)), // Prefill end date (30 minutes later)
    });
    setIsModalOpen(true); // Open the modal
  };

  // Handle adding the new event
  const handleAddEvent = () => {
    if (newEvent.patientId && newEvent.start && newEvent.end) {
      const selectedPatient = patients.find((p) => p.value === newEvent.patientId);
      const eventToAdd = {
        id: String(events.length + 1), // Generate a new ID
        title: selectedPatient.label, // Use the patient's name as the event title
        start: newEvent.start,
        end: newEvent.end,
      };
      setEvents([...events, eventToAdd]); // Add the new event to the state
      setIsModalOpen(false); // Close the modal
      setNewEvent({ patientId: "", start: "", end: "" }); // Reset the new event state
    } else {
      alert("Veuillez sélectionner un patient et remplir toutes les informations.");
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 bg-gray-100 p-6 overflow-hidden">
        <h2 className="text-2xl font-bold mb-4">Calendrier</h2>
        <div className="h-full">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth" // Default view
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events} // Pass events to the calendar
            selectable={true} // Allow date selection
            editable={true} // Allow drag-and-drop and resizing
            select={handleDateSelect} // Handle date selection
            height="100%" // Make the calendar fill the container
          />
        </div>

        {/* Modal for Adding Events */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-bold mb-4">Ajouter un événement</h3>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Sélectionner un patient</label>
                <Select
                  options={patients}
                  value={patients.find((p) => p.value === newEvent.patientId)}
                  onChange={(selectedOption) =>
                    setNewEvent({ ...newEvent, patientId: selectedOption.value })
                  }
                  placeholder="Rechercher un patient..."
                  isSearchable
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Date et heure de début</label>
                <input
                  type="datetime-local"
                  value={newEvent.start}
                  onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Date et heure de fin</label>
                <input
                  type="datetime-local"
                  value={newEvent.end}
                  onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddEvent}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Calendar;