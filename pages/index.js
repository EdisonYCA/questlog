import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={`min-h-screen text-white ${geistSans.variable}`}>
      {/* Navigation */}
      <nav className="p-4 flex gap-8 text-2xl">
        <Link href="/journal" className="text-pink-500 hover:text-pink-400">Journal</Link>
        <Link href="/calendar" className="text-pink-500 hover:text-pink-400">Calendar</Link>
        <Link href="/quests" className="text-pink-500 hover:text-pink-400">Quests</Link>
        <div className="ml-auto">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto p-4 mt-20 text-center">
        <h1 className="text-6xl font-bold mb-6">Welcome to QuestLog</h1>
        <p className="text-xl text-gray-300 mb-8">Track your journey, plan your adventures, and chronicle your achievements.</p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/journal" 
            className="bg-[#4A2B3A] text-white px-8 py-4 rounded-lg text-xl hover:bg-[#5A3B4A] transition-colors"
          >
            Start Journaling
          </Link>
        </div>
      </div>
    </main>
  );
}
