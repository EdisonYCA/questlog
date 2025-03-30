import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Dummy data for demonstration
const initialQuests = [
  { id: 1, title: "Complete Daily Workout", date: "2024-03-10", reward: "100 XP", type: "Health" },
  { id: 2, title: "Read Technical Article", date: "2024-03-09", reward: "150 XP", type: "Technology" },
  { id: 3, title: "Team Meeting", date: "2024-03-08", reward: "80 XP", type: "Productivity" },
  { id: 4, title: "Code Review", date: "2024-03-07", reward: "120 XP", type: "Technology" },
  { id: 5, title: "Debug Database", date: "2024-03-06", reward: "200 XP", type: "Technology" },
  { id: 6, title: "Update Documentation", date: "2024-03-05", reward: "90 XP", type: "Productivity" },
  { id: 7, title: "Evening Run", date: "2024-03-04", reward: "100 XP", type: "Health" },
  { id: 8, title: "Learn Neural Networks", date: "2024-03-03", reward: "180 XP", type: "Technology" }
];

const friendRankings = [
  { name: "CyberNinja", rank: 1, score: 15000 },
  { name: "PixelWarrior", rank: 2, score: 14500 },
  { name: "NeonHacker", rank: 3, score: 14000 },
  { name: "ByteMaster", rank: 4, score: 13500 },
  { name: "DataPhantom", rank: 5, score: 13000 },
];

export default function ProfilePage() {
  const [completedQuests, setCompletedQuests] = useState(initialQuests);
  const [displayCount, setDisplayCount] = useState(4);
  
  // Add XP data
  const currentXP = 13500;
  const nextRankXP = 15000;
  const currentLevel = 4;
  const xpProgress = (currentXP / nextRankXP) * 100;

  const loadMore = () => {
    // In a real app, you would fetch more quests from the backend
    setDisplayCount(prev => prev + 5);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F] text-white relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] to-[#0D0D0F] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 border-b border-[rgba(8,247,254,0.2)] bg-[rgba(26,26,46,0.5)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <Link href="/journal" className="text-[#FF2E63] hover:text-[#ff4777] transition-colors font-mono text-xl">
                Journal
              </Link>
              <Link href="/calendar" className="text-[#FF2E63] hover:text-[#ff4777] transition-colors font-mono text-xl">
                Calendar
              </Link>
              <Link href="/quests" className="text-[#FF2E63] hover:text-[#ff4777] transition-colors font-mono text-xl">
                Quests
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#7B2DFF] p-1">
            <div className="w-full h-full rounded-full bg-[#1A1A2E] flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-bold font-mono text-white">User Name</h1>
        </div>

        {/* Stats and Rank Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Stats Card */}
          <div className="bg-[rgba(26,26,46,0.7)] rounded-xl p-6 border border-[rgba(8,247,254,0.2)] backdrop-blur-md">
            <h2 className="text-xl font-mono text-[#08F7FE] mb-4">Stats</h2>
            <div className="space-y-3">
              <p className="font-mono text-[#8A8A8A]">Current Streak: <span className="text-white">85</span></p>
              <p className="font-mono text-[#8A8A8A]">Longest Streak: <span className="text-white">108</span></p>
              <p className="font-mono text-[#8A8A8A]">Friend Rank: <span className="text-white">4</span></p>
              <p className="font-mono text-[#8A8A8A]">Quests Completed: <span className="text-white">82</span></p>
            </div>
          </div>

          {/* Current Rank */}
          <div className="bg-[rgba(26,26,46,0.7)] rounded-xl p-6 border border-[rgba(8,247,254,0.2)] backdrop-blur-md flex flex-col items-center justify-center">
            <h2 className="text-xl font-mono text-[#08F7FE] mb-4">Current Rank</h2>
            <div className="w-24 h-24 bg-gradient-to-r from-[#FF2E63] to-[#7B2DFF] rounded-lg flex items-center justify-center">
              <span className="text-4xl font-bold">{currentLevel}</span>
            </div>
            <p className="mt-4 font-mono text-[#FFD300]">CYBER KNIGHT</p>
            
            {/* XP Progress Section */}
            <div className="w-full mt-4">
              <div className="flex justify-between text-sm font-mono mb-2">
                <span className="text-[#8A8A8A]">XP: {currentXP}</span>
                <span className="text-[#8A8A8A]">Next: {nextRankXP}</span>
              </div>
              <div className="h-2 bg-[rgba(8,247,254,0.1)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FF2E63] to-[#7B2DFF] transition-all duration-300"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <div className="text-center mt-2">
                <span className="text-sm font-mono text-[#8A8A8A]">
                  {nextRankXP - currentXP} XP to next rank
                </span>
              </div>
            </div>
          </div>

          {/* Friend Rankings */}
          <div className="bg-[rgba(26,26,46,0.7)] rounded-xl p-6 border border-[rgba(8,247,254,0.2)] backdrop-blur-md">
            <h2 className="text-xl font-mono text-[#08F7FE] mb-4">Friend Rankings</h2>
            <div className="space-y-3">
              {friendRankings.map((friend, index) => (
                <div key={friend.name} className="flex items-center justify-between">
                  <span className="font-mono text-[#8A8A8A]">{friend.rank}. {friend.name}</span>
                  <span className="font-mono text-[#FF2E63]">{friend.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Completed Quests Section */}
        <div className="bg-[rgba(26,26,46,0.7)] rounded-xl p-6 border border-[rgba(8,247,254,0.2)] backdrop-blur-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-mono text-[#08F7FE]">Completed Quests</h2>
            <span className="text-sm font-mono text-[#8A8A8A]">
              Showing {Math.min(displayCount, completedQuests.length)} of {completedQuests.length}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {completedQuests.slice(0, displayCount).map((quest) => (
              <div 
                key={quest.id}
                className="bg-[rgba(13,13,15,0.7)] rounded-lg p-4 border border-[rgba(8,247,254,0.1)] hover:border-[rgba(8,247,254,0.3)] transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-sm font-mono text-[#FF2E63] mb-2">{quest.type}</div>
                <h3 className="font-mono text-white mb-2">{quest.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-[#8A8A8A]">{quest.date}</span>
                  <span className="text-sm font-mono text-[#08F7FE]">{quest.reward}</span>
                </div>
              </div>
            ))}
          </div>
          
          {displayCount < completedQuests.length && (
            <button
              onClick={loadMore}
              className="mt-6 w-full py-4 rounded-lg font-mono text-[#08F7FE] border-2 border-[rgba(8,247,254,0.3)] 
                hover:bg-gradient-to-r hover:from-[rgba(8,247,254,0.1)] hover:to-transparent
                hover:border-[#08F7FE] transition-all duration-300 flex items-center justify-center gap-2
                group"
            >
              <span>Load More Quests</span>
              <span className="text-xl group-hover:translate-y-1 transition-transform duration-300">↓</span>
            </button>
          )}
        </div>
      </main>
    </div>
  );
} 