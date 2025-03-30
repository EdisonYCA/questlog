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
      backgroundColor: "#10b981", // ✅ was "color"
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

    setEditingEvent(null); // creating new task
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
      color: event.backgroundColor || event.color || "#ec4899",
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

  return (
    <div className="min-h-screen bg-black text-white font-mono p-6">
      <h1 className="text-4xl font-bold text-pink-500 mb-6 drop-shadow-[0_0_8px_rgba(255,0,255,0.8)] text-center">
        QuestLog Scheduler
      </h1>

      <div className="bg-gray-950 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,255,255,0.3)] border border-pink-600">
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
        initialDate={editingEvent?.date || selectedInfo?.date}
        initialStart={editingEvent?.start || selectedInfo?.start}
        initialEnd={editingEvent?.end || selectedInfo?.end}
        initialTitle={editingEvent?.title || ""}
        initialDescription={editingEvent?.description || ""}
        initialColor={editingEvent?.color || "#ec4899"}
      />
    </div>
  );
}
