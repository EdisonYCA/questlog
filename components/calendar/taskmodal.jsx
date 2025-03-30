import { useState, useEffect } from "react";

const colorOptions = [
  "#ec4899", // pink
  "#10b981", // green
  "#3b82f6", // blue
  "#f59e0b", // yellow
  "#ef4444", // red
  "#8b5cf6", // purple
];

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  initialDate,
  initialStart,
  initialEnd,
  initialTitle,
  initialDescription,
  initialColor,
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ec4899"); // default pink

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle ?? "");
      setDescription(initialDescription ?? "");
      setDate(initialDate ?? "");
      setStartTime(initialStart ?? "");
      setEndTime(initialEnd ?? "");
      setColor(initialColor ?? "#ec4899");
    }
  }, [
    isOpen,
    initialDate,
    initialStart,
    initialEnd,
    initialTitle,
    initialDescription,
    initialColor,
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Add Task</h2>

        <div className="space-y-2">
          <label className="block text-sm">Title</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="block text-sm">Date</label>
          <input
            type="date"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="block text-sm">Start Time</label>
          <input
            type="time"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <label className="block text-sm">End Time</label>
          <input
            type="time"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          {/* Color buttons under End Time */}
          <div className="mt-2">
            <label className="block text-sm">Color</label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === c ? "ring-2 ring-white" : "border-gray-700"
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  aria-label={`Pick color ${c}`}
                >
                  &nbsp;
                </button>
              ))}
            </div>
          </div>

          <label className="block text-sm mt-4">Description</label>
          <textarea
            rows="3"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Bottom buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ title, date, startTime, endTime, description, color });
              onClose();
            }}
            className="px-4 py-2 bg-pink-600 rounded hover:bg-pink-500"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}
