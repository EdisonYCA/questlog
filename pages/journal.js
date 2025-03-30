import { Geist, Geist_Mono, Inter, Comic_Neue } from "next/font/google";
import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { app } from "@/library/firebaseConfig";

const db = getFirestore(app);

export default function Journal() {
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', body: '' });
  const [entries, setEntries] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ... existing useEffect and other functions ...

  const getAIInsights = async () => {
    if (entries.length === 0) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          journalEntries: entries,
          type: 'suggestions'
        }),
      });

      const data = await response.json();
      setAiResponse(data.response);
    } catch (error) {
      console.error('Error getting AI insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => setIsEntryOpen(true)}
            className="bg-[#4A2B3A] text-white px-6 py-3 rounded-lg text-xl hover:bg-[#5A3B4A] transition-colors"
          >
            Add New Entry
          </button>
          
          {entries.length > 0 && (
            <button
              onClick={getAIInsights}
              disabled={isLoading}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Analyzing...' : 'Get AI Insights'}
            </button>
          )}
        </div>

        {/* AI Response Section */}
        {aiResponse && (
          <div className="mb-8 bg-[#1F1225] rounded-xl p-6">
            <h2 className="text-2xl text-purple-400 mb-4">AI Insights</h2>
            <p className="text-gray-300 whitespace-pre-line">{aiResponse}</p>
          </div>
        )}

        {/* Rest of your existing JSX ... */}
      </div>
    </main>
  );
} 