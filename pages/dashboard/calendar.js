// pages/calendar.js
import WeeklyCalendar from "../../components/calendar/calendar";
import Navbar from "@/components/landing/Navbar";

// Navigation links (taken from your Journal component)
const navigation = [
  { name: "Journal", href: "/dashboard/journal", current: false },
  { name: "Calendar", href: "/dashboard/calendar", current: true },
  { name: "Quests", href: "/dashboard/quests", current: false },
];

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-[#150A18] text-white">
      <Navbar navLinks={navigation} />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Calendar</h1>
        <WeeklyCalendar />
      </div>
    </main>
  );
}
