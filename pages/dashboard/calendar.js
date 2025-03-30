// pages/calendar.js
import WeeklyCalendar from "../../components/calendar/calendar";
import Navbar from "../../components/landing/Navbar";

// Navigation links (taken from your Journal component)
const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Calendar", href: "/dashboard/calendar", current: false },
  { name: "Quests", href: "/dashboard/quests", current: false },
];

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar navLinks={navigation} />
      <WeeklyCalendar />
    </div>
  );
}
