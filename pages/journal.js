import { Geist, Geist_Mono, Inter, Comic_Neue } from "next/font/google";
import { useState } from 'react';

{/* 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const comic_neue = Comic_Neue({
  variable: "--font-comic-neue",
  weight: ["400", "700"],
  subsets: ["latin"],
});

*/}

export default function Journal() {
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', body: '' });
  const [entries, setEntries] = useState([]);

  // Function to preserve line breaks
  const formatText = (text) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i !== text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  const handleSubmit = () => {
    if (newEntry.title.trim() === '' && newEntry.body.trim() === '') return;
    
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newEntryObj = {
      id: Date.now(),
      title: newEntry.title,
      body: newEntry.body,
      date: currentDate
    };

    setEntries([newEntryObj, ...entries]);
    setNewEntry({ title: '', body: '' });
    setIsEntryOpen(false);
  };

  // Group entries by date
  const groupedEntries = entries.reduce((groups, entry) => {
    if (!groups[entry.date]) {
      groups[entry.date] = [];
    }
    groups[entry.date].push(entry);
    return groups;
  }, {});

  // Get today's date in the same format as entry dates
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <main className={`min-h-screen bg-[#150A18] text-white relative`}>
      {/* Navigation */}
      <nav className="p-4 flex gap-8 text-2xl">
        <a href="./journal" className="text-[#007AFF] border-b-2 border-[#007AFF]">Journal</a>
        <a href="./calendar" className="text-pink-500">Calendar</a>
        <a href="./quests" className="text-pink-500">Quests</a>
        <div className="ml-auto">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Add New Entry Button */}
        <button 
          onClick={() => setIsEntryOpen(true)}
          className="bg-[#4A2B3A] text-white px-6 py-3 rounded-lg text-xl mb-8 hover:bg-[#5A3B4A] transition-colors"
        >
          Add New Entry
        </button>

        {/* Entries Stream */}
        <div className="space-y-12">
          {/* Today section - only show if there are entries */}
          {groupedEntries[today] && (
            <section>
              <h2 className="text-pink-500 text-2xl mb-4">Today</h2>
              {groupedEntries[today].map((entry) => (
                <div 
                  key={entry.id} 
                  className="bg-[#1F1225] rounded-xl p-4 mb-4 transform transition-all duration-200 hover:scale-[1.01] hover:shadow-lg hover:shadow-pink-500/10"
                >
                  <h3 className="text-2xl mb-3">{entry.title}</h3>
                  <p className="text-gray-300 mb-3 whitespace-pre-line">{formatText(entry.body)}</p>
                  <p className="text-[#711142] text-sm">{entry.date}</p>
                </div>
              ))}
            </section>
          )}

          {/* Other dates */}
          {Object.entries(groupedEntries)
            .filter(([date]) => date !== today)
            .map(([date, dateEntries]) => (
              <section key={date}>
                <h2 className="text-pink-500 text-2xl mb-4">{date}</h2>
                {dateEntries.map((entry) => (
                  <div 
                    key={entry.id} 
                    className="bg-[#1F1225] rounded-xl p-4 mb-4 transform transition-all duration-200 hover:scale-[1.01] hover:shadow-lg hover:shadow-pink-500/10"
                  >
                    <h3 className="text-2xl mb-3">{entry.title}</h3>
                    <p className="text-gray-300 mb-3 whitespace-pre-line">{formatText(entry.body)}</p>
                    <p className="text-[#711142] text-sm">{entry.date}</p>
                  </div>
                ))}
              </section>
            ))}

          {/* Show message when no entries at all */}
          {entries.length === 0 && (
            <div className="text-gray-500 italic text-center">No journal entries yet</div>
          )}
        </div>
      </div>

      {/* Backdrop with blur */}
      {isEntryOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300"
          onClick={() => setIsEntryOpen(false)}
        />
      )}

      {/* New Entry Sliding Panel */}
      <div 
        className={`fixed inset-x-0 bottom-0 bg-white rounded-t-3xl transform transition-transform duration-300 ease-in-out z-50 ${
          isEntryOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: '85vh' }}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header with buttons */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={handleSubmit}
              className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              disabled={newEntry.title.trim() === '' && newEntry.body.trim() === ''}
            >
              Post
            </button>
            <button 
              onClick={() => {
                setIsEntryOpen(false);
                setNewEntry({ title: '', body: '' });
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={newEntry.title}
            onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
            className="text-2xl font-semibold text-gray-900 placeholder-gray-400 focus:outline-none mb-4"
          />

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-4"></div>

          {/* Body Input */}
          <textarea
            placeholder="Body"
            value={newEntry.body}
            onChange={(e) => setNewEntry({ ...newEntry, body: e.target.value })}
            className="flex-grow text-gray-900 placeholder-gray-400 focus:outline-none resize-none"
          />
        </div>
      </div>
    </main>
  );
} 