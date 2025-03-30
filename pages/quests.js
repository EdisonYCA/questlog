import MainQuest from "../components/MainQuest";
import LevelIndicator from "@/components/LevelIndicator";
import SideQuest from "@/components/SideQuest";


// dummmy data for now 
const mainQuests = [
    {
      title: "Hit the gym",
      description: "Complete your daily workout routine",
      timeframe: "12:00AM - 11:59PM",
      reward: "100 DATA FRAGMENTS"
    },
    {
      title: "Complete Project Milestone",
      description: "Finish the core functionality implementation",
      timeframe: "10:00AM-12:00PM",
      reward: "150 DATA FRAGMENTS"
    },
    {
      title: "Team Meeting",
      description: "Sync with the team on weekly progress",
      timeframe: "1:00PM-2:00PM",
      reward: "80 DATA FRAGMENTS"
    }
  ];

  const sideQuests = [
    {
      title: "Patch the Firewall Breach",
      description: "Tidy up workspace",
      reward: "30 DATA FRAGMENTS"
    },
    {
      title: "Code Review",
      description: "Review pending pull requests",
      reward: "45 DATA FRAGMENTS"
    },
    {
      title: "Update Documentation",
      description: "Add missing API documentation",
      reward: "25 DATA FRAGMENTS"
    }
  ];


export default function QuestsPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-gray-900/50 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-5xl font-bold text-cyan-400 mb-2">QUESTS</h1>
              <p className="text-xl text-purple-400 font-medium">
                These are your quests for the day
              </p>
            </div>
            <LevelIndicator level={6} title="CHROMEARCHITECT" />
          </div>

          {/* Main Quests Section */}
          <div className="mb-12">
            <h2 className="text-2xl text-cyan-400 mb-6 font-semibold flex items-center">
              <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full mr-3" />
              Main Quest Log
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
            <h2 className="text-2xl text-purple-400 mb-6 font-semibold flex items-center">
              <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mr-3" />
              Side Quest Log
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
    );
  }
