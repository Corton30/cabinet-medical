import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // For month/week/day views
import timeGridPlugin from "@fullcalendar/timegrid"; // For time grid views
import interactionPlugin from "@fullcalendar/interaction"; // For drag and drop and selection
import Sidebar from "./Sidebar"; // Import the Sidebar component

const Calendar = () => {
  const [events, setEvents] = useState([
    { id: "1", title: "Consultation - Jean Dupont", start: "2025-04-28T10:00:00", end: "2025-04-28T11:00:00" },
    { id: "2", title: "Consultation - Marie Curie", start: "2025-04-29T14:00:00", end: "2025-04-29T15:00:00" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" }); // State for new event details

  // Handle date selection (when a user selects a date or range)
  const handleDateSelect = (info) => {
    setNewEvent({ title: "", start: info.startStr, end: info.endStr }); // Set start and end dates
    setIsModalOpen(true); // Open the modal
  };

  // Handle adding the new event
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      const eventToAdd = {
        id: String(events.length + 1), // Generate a new ID
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
      };
      setEvents([...events, eventToAdd]); // Add the new event to the state
      setIsModalOpen(false); // Close the modal
      setNewEvent({ title: "", start: "", end: "" }); // Reset the new event state
    } else {
      alert("Veuillez remplir tous les champs pour ajouter un événement.");
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
                <label className="block text-gray-700 font-medium mb-2">Titre de l'événement</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez le titre de l'événement"
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