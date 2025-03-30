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
    <div className="min-h-screen bg-[#150A18] text-white relative">
      {/* Background grid with diagonal lines */}
      <div className="fixed inset-0 bg-[linear-gradient(#711142_1px,transparent_1px),linear-gradient(90deg,#711142_1px,transparent_1px)] bg-[size:35px_35px] opacity-10" />
      <div className="fixed inset-0 bg-[linear-gradient(45deg,#711142_1px,transparent_1px)] bg-[size:35px_35px] opacity-5" />
      
      <Navbar navLinks={navigation} />
      <WeeklyCalendar />
    </div>
  );
}
