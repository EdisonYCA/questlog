import { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
export default function Journal() {
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', body: '' });
  const [entries, setEntries] = useState([]);

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

  const navigation = [
    { name: "Journal", href: "/dashboard/journal", current: true },
    { name: "Calendar", href: "/dashboard/calendar", current: false },
    { name: "Quests", href: "/dashboard/quests", current: false },
  ]


  return (
    <main className={`min-h-screen bg-[#150A18] text-white relative`}>
      <Navbar navLinks={navigation}/>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 pb-24">
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

      {/* Fixed Add New Entry Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <button 
          onClick={() => setIsEntryOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
          </svg>
          Add New Entry
        </button>
      </div>

      {/* Backdrop with blur */}
      {isEntryOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 z-40"
          onClick={() => setIsEntryOpen(false)}
        />
      )}

      {/* New Entry Modal */}
      <div 
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-xl z-50 transition-all duration-300 ${
          isEntryOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="p-6">
          {/* Header with buttons */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">New Journal Entry</h2>
            <button 
              onClick={() => {
                setIsEntryOpen(false);
                setNewEntry({ title: '', body: '' });
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={newEntry.title}
            onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
            className="w-full text-2xl font-semibold text-gray-900 placeholder-gray-400 focus:outline-none mb-4 border-b border-gray-200 pb-2"
          />

          {/* Body Input */}
          <textarea
            placeholder="Write your entry here..."
            value={newEntry.body}
            onChange={(e) => setNewEntry({ ...newEntry, body: e.target.value })}
            className="w-full h-64 text-gray-900 placeholder-gray-400 focus:outline-none resize-none border border-gray-200 rounded-lg p-4 mb-6"
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <button 
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={newEntry.title.trim() === '' && newEntry.body.trim() === ''}
            >
              Post Entry
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 