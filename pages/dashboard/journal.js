import { useState, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import { addJournalEntry, getJournalEntries } from "@/backend/database";
import { useStateContext } from "@/context/StateContext";
import { useRouter } from "next/router";

export default function Journal() {
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: "", body: "" });
  const [entries, setEntries] = useState([]);
  const { user, loading } = useStateContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadEntries();
    }
  }, [user]);

  const loadEntries = async () => {
    try {
      const userEntries = await getJournalEntries(user.uid);
      setEntries(userEntries);
    } catch (error) {
      console.error("Error loading entries:", error);
    }
  };

  const formatText = (text) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i !== text.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addJournalEntry(user.uid, newEntry);
      setNewEntry({ title: "", body: "" });
      loadEntries();
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  // Group entries by date
  const groupedEntries = entries.reduce((groups, entry) => {
    if (!groups[entry.date]) {
      groups[entry.date] = [];
    }
    groups[entry.date].push(entry);
    return groups;
  }, {});

  // Get today's date
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const navigation = [
    { name: "Journal", href: "/dashboard/journal", current: true },
    { name: "Calendar", href: "/dashboard/calendar", current: false },
    { name: "Quests", href: "/dashboard/quests", current: false },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#150A18] text-white relative">
      {/* Enhanced background grid with diagonal lines */}
      <div className="fixed inset-0 bg-[linear-gradient(#711142_1px,transparent_1px),linear-gradient(90deg,#711142_1px,transparent_1px)] bg-[size:35px_35px] opacity-10" />
      <div className="fixed inset-0 bg-[linear-gradient(45deg,#711142_1px,transparent_1px)] bg-[size:35px_35px] opacity-5" />

      <Navbar navLinks={navigation} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 pb-24">
        {/* Entries Stream */}
        <div className="space-y-12">
          {/* Today section */}
          {groupedEntries[today] && (
            <section>
              <h2 className="text-[#FF2E63] text-2xl mb-6 font-mono flex items-center">
                <span className="w-2 h-2 bg-[#FF2E63] mr-2 animate-pulse" />
                Today
                <span className="ml-2 text-sm text-[#FF2E63]/50">[LIVE]</span>
              </h2>
              {groupedEntries[today].map((entry) => (
                <div
                  key={entry.id}
                  className="bg-[#1F1225] mb-4 relative group"
                >
                  {/* Angular cuts using pseudo-elements */}
                  <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-[#FF2E63]" />
                  <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-[#FF2E63]" />
                  <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-[#FF2E63]" />
                  <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-[#FF2E63]" />

                  {/* Main content with skewed edges */}
                  <div className="p-6 relative">
                    <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#FF2E63] to-transparent" />
                    <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-[#FF2E63] to-transparent" />

                    <h3 className="text-2xl mb-3 font-mono text-[#FF2E63] flex items-center">
                      <span className="w-1 h-1 bg-[#FF2E63] mr-2" />
                      {entry.title}
                      <div className="ml-4 h-[1px] flex-grow bg-gradient-to-r from-[#FF2E63]/30 to-transparent" />
                    </h3>

                    <div className="relative">
                      <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-[#FF2E63] via-[#FF2E63]/50 to-transparent" />
                      <p className="text-gray-300 mb-3 whitespace-pre-line pl-4">
                        {formatText(entry.body)}
                      </p>
                    </div>

                    <div className="flex items-center mt-4">
                      <p className="text-[#FF2E63]/70 text-sm font-mono">
                        {entry.date}
                      </p>
                      <div className="ml-4 h-[1px] flex-grow bg-gradient-to-r from-[#FF2E63]/30 to-transparent" />
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Past entries */}
          {Object.entries(groupedEntries)
            .filter(([date]) => date !== today)
            .map(([date, dateEntries]) => (
              <section key={date}>
                <h2 className="text-[#08F7FE] text-2xl mb-6 font-mono flex items-center">
                  <span className="w-2 h-2 bg-[#08F7FE] mr-2" />
                  {date}
                  <div className="ml-4 h-[1px] flex-grow bg-gradient-to-r from-[#08F7FE]/30 to-transparent" />
                </h2>
                {dateEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-[#1F1225] mb-4 relative group"
                  >
                    {/* Angular cuts using pseudo-elements */}
                    <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-[#08F7FE]" />
                    <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-[#08F7FE]" />
                    <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-[#08F7FE]" />
                    <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-[#08F7FE]" />

                    {/* Main content with skewed edges */}
                    <div className="p-6 relative">
                      <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#08F7FE] to-transparent" />
                      <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-[#08F7FE] to-transparent" />

                      <h3 className="text-2xl mb-3 font-mono text-[#08F7FE] flex items-center">
                        <span className="w-1 h-1 bg-[#08F7FE] mr-2" />
                        {entry.title}
                        <div className="ml-4 h-[1px] flex-grow bg-gradient-to-r from-[#08F7FE]/30 to-transparent" />
                      </h3>

                      <div className="relative">
                        <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-[#08F7FE] via-[#08F7FE]/50 to-transparent" />
                        <p className="text-gray-300 mb-3 whitespace-pre-line pl-4">
                          {formatText(entry.body)}
                        </p>
                      </div>

                      <div className="flex items-center mt-4">
                        <p className="text-[#08F7FE]/70 text-sm font-mono">
                          {entry.date}
                        </p>
                        <div className="ml-4 h-[1px] flex-grow bg-gradient-to-r from-[#08F7FE]/30 to-transparent" />
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            ))}

          {/* Empty state with enhanced styling */}
          {entries.length === 0 && (
            <div className="text-center py-20 relative">
              <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-[#FF2E63]" />
              <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-[#FF2E63]" />
              <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-[#FF2E63]" />
              <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-[#FF2E63]" />
              <p className="text-gray-500 italic font-mono">
                NO ENTRIES FOUND IN DATABASE
              </p>
              <div className="mt-2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#FF2E63]/30 to-transparent mx-auto" />
              <p className="mt-2 text-[#FF2E63]/50 text-sm font-mono">
                SYSTEM STATUS: READY FOR INPUT
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Add New Entry Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <button
          onClick={() => setIsEntryOpen(true)}
          className="bg-[#1F1225] text-[#FF2E63] px-8 py-4 font-mono text-xl relative group overflow-hidden"
        >
          <div className="absolute -top-[2px] -left-[2px] w-3 h-3 border-t-2 border-l-2 border-[#FF2E63] group-hover:w-4 group-hover:h-4 transition-all" />
          <div className="absolute -top-[2px] -right-[2px] w-3 h-3 border-t-2 border-r-2 border-[#FF2E63] group-hover:w-4 group-hover:h-4 transition-all" />
          <div className="absolute -bottom-[2px] -left-[2px] w-3 h-3 border-b-2 border-l-2 border-[#FF2E63] group-hover:w-4 group-hover:h-4 transition-all" />
          <div className="absolute -bottom-[2px] -right-[2px] w-3 h-3 border-b-2 border-r-2 border-[#FF2E63] group-hover:w-4 group-hover:h-4 transition-all" />
          <div className="relative z-10 flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>NEW ENTRY</span>
          </div>
          <div className="absolute inset-0 bg-[#FF2E63]/10 translate-y-full group-hover:translate-y-0 transition-transform" />
        </button>
      </div>

      {/* Modal Backdrop */}
      {isEntryOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsEntryOpen(false)}
        />
      )}

      {/* Enhanced Entry Modal */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 transition-all duration-300 ${
          isEntryOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-[#1F1225] p-6 relative">
          {/* Angular corners for modal */}
          <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-[#FF2E63]" />
          <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-[#FF2E63]" />
          <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-[#FF2E63]" />
          <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-[#FF2E63]" />

          {/* Decorative lines */}
          <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#FF2E63] to-transparent" />
          <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-[#FF2E63] to-transparent" />

          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-mono text-[#FF2E63] flex items-center">
              <span className="w-2 h-2 bg-[#FF2E63] mr-2 animate-pulse" />
              NEW ENTRY
              <div className="ml-4 h-[1px] w-24 bg-gradient-to-r from-[#FF2E63]/30 to-transparent" />
            </h2>
            <button
              onClick={() => {
                setIsEntryOpen(false);
                setNewEntry({ title: "", body: "" });
              }}
              className="text-[#FF2E63] hover:text-[#ff4777] transition-colors relative group"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Title Input with enhanced styling */}
          <div className="relative mb-4">
            <div className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-[#FF2E63]/20 via-[#FF2E63]/20 to-transparent" />
            <input
              type="text"
              placeholder="Title"
              value={newEntry.title}
              onChange={(e) =>
                setNewEntry({ ...newEntry, title: e.target.value })
              }
              className="w-full text-2xl font-mono text-white placeholder-gray-500 bg-transparent focus:outline-none pb-2"
            />
          </div>

          {/* Body Input with enhanced styling */}
          <div className="relative mb-6">
            <div className="absolute -top-[2px] -left-[2px] w-3 h-3 border-t-2 border-l-2 border-[#FF2E63]/20" />
            <div className="absolute -top-[2px] -right-[2px] w-3 h-3 border-t-2 border-r-2 border-[#FF2E63]/20" />
            <div className="absolute -bottom-[2px] -left-[2px] w-3 h-3 border-b-2 border-l-2 border-[#FF2E63]/20" />
            <div className="absolute -bottom-[2px] -right-[2px] w-3 h-3 border-b-2 border-r-2 border-[#FF2E63]/20" />
            <textarea
              placeholder="Write your entry here..."
              value={newEntry.body}
              onChange={(e) =>
                setNewEntry({ ...newEntry, body: e.target.value })
              }
              className="w-full h-64 text-white font-mono placeholder-gray-500 bg-[#150A18] focus:outline-none resize-none p-4"
            />
          </div>

          {/* Submit Button with enhanced styling */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={
                newEntry.title.trim() === "" && newEntry.body.trim() === ""
              }
              className="relative group overflow-hidden"
            >
              <div className="absolute -top-[2px] -left-[2px] w-3 h-3 border-t-2 border-l-2 border-[#FF2E63] group-hover:w-4 group-hover:h-4 transition-all" />
              <div className="absolute -top-[2px] -right-[2px] w-3 h-3 border-t-2 border-r-2 border-[#FF2E63] group-hover:w-4 group-hover:h-4 transition-all" />
              <div className="absolute -bottom-[2px] -left-[2px] w-3 h-3 border-b-2 border-l-2 border-[#FF2E63] group-hover:w-4 group-hover:h-4 transition-all" />
              <div className="absolute -bottom-[2px] -right-[2px] w-3 h-3 border-b-2 border-r-2 border-[#FF2E63] group-hover:w-4 group-hover:h-4 transition-all" />
              <div className="relative z-10 px-6 py-3 text-[#FF2E63] font-mono">
                SUBMIT ENTRY
              </div>
              <div className="absolute inset-0 bg-[#FF2E63]/10 translate-y-full group-hover:translate-y-0 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}