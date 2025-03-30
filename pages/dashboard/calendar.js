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
    <main className="min-h-screen bg-[#150A18] text-white relative">
      {/* Background grid with diagonal lines */}
      <div className="fixed inset-0 bg-[linear-gradient(#711142_1px,transparent_1px),linear-gradient(90deg,#711142_1px,transparent_1px)] bg-[size:35px_35px] opacity-10" />
      <div className="fixed inset-0 bg-[linear-gradient(45deg,#711142_1px,transparent_1px)] bg-[size:35px_35px] opacity-5" />
      <Navbar navLinks={navigation} />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <WeeklyCalendar />
      </div>
    </main>
  );
}
