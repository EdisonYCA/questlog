import MainQuest from "../../components/Quest/MainQuest";
import LevelIndicator from "@/components/Quest/LevelIndicator";
import SideQuest from "@/components/Quest/SideQuest";
import Navbar from "@/components/landing/Navbar";
import { useState, useEffect } from "react";
import { useStateContext } from "@/context/StateContext";
const { user } = useStateContext();

useEffect(() => {
  if (!user) {
    router.push("/login");
  }
}, [user]);

// dummmy data for now
const mainQuests = [
  {
    title: "Hit the gym",
    description: "Complete your daily workout routine",
    timeframe: "12:00AM - 11:59PM",
    reward: "100 DATA FRAGMENTS",
  },
  {
    title: "Complete Project Milestone",
    description: "Finish the core functionality implementation",
    timeframe: "10:00AM-12:00PM",
    reward: "150 DATA FRAGMENTS",
  },
  {
    title: "Team Meeting",
    description: "Sync with the team on weekly progress",
    timeframe: "1:00PM-2:00PM",
    reward: "80 DATA FRAGMENTS",
  },
];

const sideQuests = [
  {
    title: "Patch the Firewall Breach",
    description: "Tidy up workspace",
    reward: "30 DATA FRAGMENTS",
  },
  {
    title: "Code Review",
    description: "Review pending pull requests",
    reward: "45 DATA FRAGMENTS",
  },
  {
    title: "Update Documentation",
    description: "Add missing API documentation",
    reward: "25 DATA FRAGMENTS",
  },
];

export default function QuestsPage() {
  const navigation = [
    { name: "Journal", href: "/dashboard/journal", current: false },
    { name: "Calendar", href: "/dashboard/calendar", current: false },
    { name: "Quests", href: "/dashboard/quests", current: true },
  ];

  return (
    <div className="min-h-screen bg-[#150A18] text-white relative">
      {/* Background grid with diagonal lines */}
      <div className="fixed inset-0 bg-[linear-gradient(#711142_1px,transparent_1px),linear-gradient(90deg,#711142_1px,transparent_1px)] bg-[size:35px_35px] opacity-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(45deg,#711142_1px,transparent_1px)] bg-[size:35px_35px] opacity-5 pointer-events-none" />

      {/* Navigation and Content */}
      <div className="relative z-50">
        <Navbar navLinks={navigation} />
        <div className="relative z-10 p-8 pt-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h1 className="text-5xl font-bold text-[#FF2E63] mb-2 font-mono">
                  QUESTS
                </h1>
                <p className="text-xl text-[#08F7FE] font-medium font-mono">
                  These are your quests for the day
                </p>
              </div>
              <LevelIndicator level={6} title="CHROMEARCHITECT" />
            </div>

            {/* Main Quests Section */}
            <div className="mb-12">
              <h2 className="text-2xl text-[#FF2E63] mb-6 font-semibold font-mono flex items-center">
                <span className="inline-block w-2 h-2 bg-[#FF2E63] rounded-full mr-3" />
                Main Quest Log
                <div className="ml-4 h-[1px] flex-grow bg-gradient-to-r from-[#FF2E63]/30 to-transparent" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mainQuests.map((quest, index) => (
                  <MainQuest
                    key={index}
                    title={quest.title}
                    description={quest.description}
                    timeframe={quest.timeframe}
                    reward={quest.reward}
                  />
                ))}
              </div>
            </div>

            {/* Side Quests Section */}
            <div>
              <h2 className="text-2xl text-[#08F7FE] mb-6 font-semibold font-mono flex items-center">
                <span className="inline-block w-2 h-2 bg-[#08F7FE] rounded-full mr-3" />
                Side Quest Log
                <div className="ml-4 h-[1px] flex-grow bg-gradient-to-r from-[#08F7FE]/30 to-transparent" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sideQuests.map((quest, index) => (
                  <SideQuest
                    key={index}
                    title={quest.title}
                    description={quest.description}
                    reward={quest.reward}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
