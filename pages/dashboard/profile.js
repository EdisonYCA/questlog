import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";
import { useRouter } from "next/router";
import { db } from "@/library/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Dummy data for demonstration
const initialQuests = [
  {
    id: 1,
    title: "Complete Daily Workout",
    date: "2024-03-10",
    reward: "100 XP",
    type: "Health",
  },
  {
    id: 2,
    title: "Read Technical Article",
    date: "2024-03-09",
    reward: "150 XP",
    type: "Technology",
  },
  {
    id: 3,
    title: "Team Meeting",
    date: "2024-03-08",
    reward: "80 XP",
    type: "Productivity",
  },
  {
    id: 4,
    title: "Code Review",
    date: "2024-03-07",
    reward: "120 XP",
    type: "Technology",
  },
  {
    id: 5,
    title: "Debug Database",
    date: "2024-03-06",
    reward: "200 XP",
    type: "Technology",
  },
  {
    id: 6,
    title: "Update Documentation",
    date: "2024-03-05",
    reward: "90 XP",
    type: "Productivity",
  },
  {
    id: 7,
    title: "Evening Run",
    date: "2024-03-04",
    reward: "100 XP",
    type: "Health",
  },
  {
    id: 8,
    title: "Learn Neural Networks",
    date: "2024-03-03",
    reward: "180 XP",
    type: "Technology",
  },
];

const friendRankings = [
  { name: "CyberNinja", rank: 1, score: 15000 },
  { name: "PixelWarrior", rank: 2, score: 14500 },
  { name: "NeonHacker", rank: 3, score: 14000 },
  { name: "ByteMaster", rank: 4, score: 13500 },
  { name: "DataPhantom", rank: 5, score: 13000 },
];

export default function ProfilePage() {
  const [completedQuests, setCompletedQuests] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [loading, setLoading] = useState(true);

  // Add XP data
  const currentXP = 13500;
  const nextRankXP = 15000;
  const currentLevel = 4;
  const xpProgress = (currentXP / nextRankXP) * 100;

  const loadMore = () => {
    setDisplayCount((prev) => prev + 5);
  };

  const { user } = useStateContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchCompletedQuests = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCompletedQuests(userData.completeQuests || []);
        }
      } catch (error) {
        console.error("Error fetching completed quests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedQuests();
  }, [user, router]);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#150A18] text-white flex items-center justify-center">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#150A18] text-white relative">
      {/* Background grid with diagonal lines */}
      <div className="fixed inset-0 bg-[linear-gradient(#711142_1px,transparent_1px),linear-gradient(90deg,#711142_1px,transparent_1px)] bg-[size:35px_35px] opacity-10" />
      <div className="fixed inset-0 bg-[linear-gradient(45deg,#711142_1px,transparent_1px)] bg-[size:35px_35px] opacity-5" />

      {/* Navigation */}
      <nav className="relative z-10 border-b border-[#08F7FE]/20 bg-[#1F1225]/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <Link
                href="/dashboard/journal"
                className="text-[#FF2E63] hover:text-[#ff4777] transition-colors font-mono text-xl"
              >
                Journal
              </Link>
              <Link
                href="/dashboard/calendar"
                className="text-[#FF2E63] hover:text-[#ff4777] transition-colors font-mono text-xl"
              >
                Calendar
              </Link>
              <Link
                href="/dashboard/quests"
                className="text-[#FF2E63] hover:text-[#ff4777] transition-colors font-mono text-xl"
              >
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
          <div className="w-32 h-32 relative">
            {/* Angular cuts for profile picture */}
            <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-[#FF2E63]" />
            <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-[#FF2E63]" />
            <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-[#FF2E63]" />
            <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-[#FF2E63]" />

            <div className="w-full h-full bg-gradient-to-r from-[#FF2E63] to-[#08F7FE] p-1">
              <div className="w-full h-full bg-[#1F1225] flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-bold font-mono text-white">
            {user.email}
          </h1>
        </div>

        {/* Stats and Rank Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#1F1225] relative group">
            {/* Angular cuts */}
            <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-[#FF2E63]" />
            <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-[#FF2E63]" />
            <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-[#FF2E63]" />
            <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-[#FF2E63]" />

            {/* Decorative lines */}
            <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#FF2E63] to-transparent" />
            <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-[#FF2E63] to-transparent" />

            <div className="p-6 relative z-10">
              <h2 className="text-xl font-mono text-[#FF2E63] mb-4">
                Current Rank
              </h2>
              <div className="text-4xl font-bold text-white mb-2">
                {currentLevel}
              </div>
              <div className="text-[#FF2E63] font-mono">CYBER KNIGHT</div>

              {/* XP Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-sm font-mono mb-2">
                  <span className="text-[#08F7FE]">{currentXP} XP</span>
                  <span className="text-[#FF2E63]">{nextRankXP} XP</span>
                </div>
                <div className="h-2 bg-[#1F1225] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF2E63] to-[#08F7FE] transition-all duration-1000"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
                <div className="text-sm font-mono text-[#8A8A8A] mt-2">
                  {nextRankXP - currentXP} XP until next rank
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1F1225] relative group">
            {/* Angular cuts */}
            <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-[#FF2E63]" />
            <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-[#FF2E63]" />
            <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-[#FF2E63]" />
            <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-[#FF2E63]" />

            {/* Decorative lines */}
            <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#FF2E63] to-transparent" />
            <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-[#FF2E63] to-transparent" />

            <div className="p-6 relative z-10">
              <h2 className="text-xl font-mono text-[#FF2E63] mb-4">
                Quest Statistics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {completedQuests.length}
                  </div>
                  <div className="text-sm font-mono text-[#8A8A8A]">
                    Completed Quests
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {currentXP}
                  </div>
                  <div className="text-sm font-mono text-[#8A8A8A]">
                    Total XP Earned
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Quests Section */}
        <div className="bg-[#1F1225] relative group">
          {/* Angular cuts */}
          <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-[#FF2E63]" />
          <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-[#FF2E63]" />
          <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-[#FF2E63]" />
          <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-[#FF2E63]" />

          {/* Decorative lines */}
          <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#FF2E63] to-transparent" />
          <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-[#FF2E63] to-transparent" />

          <div className="p-6 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-mono text-[#FF2E63]">
                Completed Quests
              </h2>
              <span className="text-sm font-mono text-[#8A8A8A]">
                Showing {Math.min(displayCount, completedQuests.length)} of{" "}
                {completedQuests.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {completedQuests.slice(0, displayCount).map((quest, index) => (
                <div
                  key={index}
                  className="bg-[#1F1225] relative group/quest hover:bg-[#2A1A35] transition-colors duration-300"
                >
                  {/* Angular cuts for quest card */}
                  <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-[#FF2E63]" />
                  <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-[#FF2E63]" />
                  <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-[#FF2E63]" />
                  <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-[#FF2E63]" />

                  {/* Decorative lines */}
                  <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#FF2E63] to-transparent" />
                  <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-[#FF2E63] to-transparent" />

                  <div className="p-6 relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        quest.difficulty === 'Main Quest' ? 'bg-[#FF2E63]/20' : 'bg-[#08F7FE]/20'
                      } ring-2 ${
                        quest.difficulty === 'Main Quest' ? 'ring-[#FF2E63]' : 'ring-[#08F7FE]'
                      }`}>
                        <span className={`text-lg ${
                          quest.difficulty === 'Main Quest' ? 'text-[#FF2E63]' : 'text-[#08F7FE]'
                        }`}>
                          {quest.difficulty === 'Main Quest' ? '⚔️' : '🎯'}
                        </span>
                      </div>
                      <span className={`text-sm font-mono ${
                        quest.difficulty === 'Main Quest' ? 'text-[#FF2E63]' : 'text-[#08F7FE]'
                      }`}>
                        {quest.difficulty || 'Main Quest'}
                      </span>
                    </div>

                    <h3 className="font-mono text-white text-lg mb-4 group-hover/quest:text-[#FF2E63] transition-colors duration-300">
                      {quest.title}
                    </h3>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center text-sm font-mono text-[#8A8A8A]">
                        <span className="inline-block w-2 h-2 bg-[#FF2E63] rounded-full mr-2" />
                        {quest.time || 'Completed'}
                      </div>
                      <div className="flex items-center text-sm font-mono text-[#08F7FE]">
                        <span className="inline-block w-2 h-2 bg-[#08F7FE] rounded-full mr-2" />
                        {quest.reward}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {displayCount < completedQuests.length && (
              <button
                onClick={loadMore}
                className="mt-6 w-full py-4 font-mono text-[#08F7FE] relative group/button"
              >
                {/* Button angular cuts */}
                <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-current" />
                <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-current" />
                <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-current" />
                <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-current" />

                <div className="flex items-center justify-center gap-2">
                  <span>Load More Quests</span>
                  <span className="text-xl group-hover/button:translate-y-1 transition-transform duration-300">
                    ↓
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
