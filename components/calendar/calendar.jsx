import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import TaskModal from "./TaskModal";


export default function WeeklyCalendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Example Quest",
      start: "2025-03-29T10:00:00",
      end: "2025-03-29T11:00:00",
      description: "A sample task",
      backgroundColor: "#10b981", 
    },
  ]);
  

  const formatTime = (date) => date.toTimeString().slice(0, 5);
  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleSelect = (info) => {
    const start = new Date(info.startStr);
    const end = new Date(info.endStr);

    setSelectedInfo({
      date: formatDate(start),
      start: info.allDay ? "08:00" : formatTime(start),
      end: info.allDay ? "09:00" : formatTime(end),
    });

    setEditingEvent(null); 
    setModalOpen(true);
  };

  const handleEventClick = (info) => {
    const event = info.event;
    const start = new Date(event.start);
    const end = new Date(event.end);

    setEditingEvent({
      id: event.id,
      title: event.title,
      date: formatDate(start),
      start: formatTime(start),
      end: formatTime(end),
      description: event.extendedProps.description || "",
      color: event.backgroundColor || event.color || "#f59e0b",
    });

    setSelectedInfo(null); // not a new one
    setModalOpen(true);
  };

  const handleSave = (task) => {
    if (editingEvent?.id) {
      // Edit mode
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id
            ? {
                ...ev,
                title: task.title,
                start: `${task.date}T${task.startTime}`,
                end: `${task.date}T${task.endTime}`,
                description: task.description,
                color: task.color,
              }
            : ev
        )
      );
    } else {
      // New event mode
      const newEvent = {
        id: Date.now().toString(),
        title: task.title || "Untitled",
        start: `${task.date}T${task.startTime}`,
        end: `${task.date}T${task.endTime}`,
        description: task.description,
        color: task.color,
      };
      setEvents((prev) => [...prev, newEvent]);
    }

    setEditingEvent(null);
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (editingEvent?.id) {
      setEvents((prev) => prev.filter((ev) => ev.id !== editingEvent.id));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono p-6">
      <h1 className="text-4xl font-bold text-cyan-500 mb-6 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] text-center">
        QuestLog Scheduler
      </h1>


      <div className="bg-gray-950 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,255,255,0.3)] border border-cyan-600">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          editable={true}
          select={handleSelect}
          eventClick={handleEventClick}
          events={events}
          height="auto"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          dayHeaderClassNames={() => "bg-gray-800 text-pink-400"}
          slotLabelClassNames={() => "text-cyan-300"}
          eventDidMount={(info) => {
            if (info.event.extendedProps.description) {
              info.el.setAttribute("title", info.event.extendedProps.description);
            }
          }}
        />
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSave}
        onDelete={handleDelete}
        initialDate={editingEvent?.date || selectedInfo?.date}
        initialStart={editingEvent?.start || selectedInfo?.start}
        initialEnd={editingEvent?.end || selectedInfo?.end}
        initialTitle={editingEvent?.title || ""}
        initialDescription={editingEvent?.description || ""}
        initialColor={editingEvent?.color || "#f59e0b"}
        isEditing={!!editingEvent}
      />
      
      {/* Updated calendar styling */}
      <style jsx global>{`
        /* Clean up calendar borders and cells */
        .fc {
          --fc-border-color: rgba(64, 64, 64, 0.5);
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: rgba(31, 41, 55, 0.5);
          --fc-list-event-hover-bg-color: rgba(31, 41, 55, 0.7);
        }

        /* Remove excess borders */
        .fc-theme-standard td, 
        .fc-theme-standard th {
          border-color: var(--fc-border-color);
          border-style: solid;
          border-width: 0.5px;
        }

        /* Soften the cell backgrounds */
        .fc-day {
          background: rgba(17, 24, 39, 0.3);
        }

        /* Style the header */
        .fc-toolbar-title {
          color: #06b6d4;
          font-size: 1.25rem !important;
        }

        /* Style the buttons */
        .fc-button {
          background: rgba(31, 41, 55, 0.8) !important;
          border: 1px solid rgba(6, 182, 212, 0.3) !important;
          color: #06b6d4 !important;
        }

        .fc-button:hover {
          background: rgba(31, 41, 55, 1) !important;
          border-color: #06b6d4 !important;
        }

        .fc-button-active {
          background: rgba(6, 182, 212, 0.2) !important;
          border-color: #06b6d4 !important;
        }

        /* Style today's date */
        .fc-day-today {
          background: rgba(6, 182, 212, 0.1) !important;
        }

        /* Clean up time grid */
        .fc-timegrid-slot {
          height: 3rem !important;
          border-bottom: 0.5px solid var(--fc-border-color) !important;
        }

        .fc-timegrid-slot-label {
          color: #06b6d4;
        }

        /* Event styling */
        .fc-event {
          border: none !important;
          border-radius: 4px !important;
          padding: 2px 4px !important;
        }

        /* Day Grid hover effect */
        .fc-daygrid-day {
          position: relative;
          overflow: hidden;
        }
        .fc-daygrid-day::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 255, 255, 0.1) 0%,
            rgba(0, 255, 255, 0.3) 50%,
            rgba(0, 255, 255, 0.1) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          transform: scale(1.2);
          pointer-events: none;
          z-index: 1;
        }
        .fc-daygrid-day:hover::before {
          opacity: 1;
          transform: scale(1);
        }

        /* Time Grid hover effect */
        .fc-timegrid-slot {
          position: relative;
          overflow: hidden;
        }
        .fc-timegrid-slot::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at center,
            rgba(0, 255, 255, 0.4) 0%,
            rgba(0, 255, 255, 0.1) 70%,
            transparent 100%
          );
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
          z-index: 1;
        }
        .fc-timegrid-slot:hover::before {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </div>
  );
}

// testingg
