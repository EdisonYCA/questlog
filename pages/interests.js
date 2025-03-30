import { useState } from 'react';
import { useRouter } from 'next/router';
import { saveUserInterests } from '@/backend/database';

const interests = [
  "Technology",
  "Health",
  "Science",
  "Travel",
  "Art",
  "Finance",
  "History",
  "Productivity",
  "Sports",
  "Gaming",
  "Psychology",
  "Cyberpunk",
  "Fantasy",
  "Sci-fi",
  "Horror",
  "Mystery",
  "Romance"
];

export default function InterestsPage() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const router = useRouter();

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleContinue = async () => {
    if (selectedInterests.length > 0) {
      try {
        await saveUserInterests(selectedInterests);
        router.push('/dashboard/journal');
      } catch (error) {
        console.error('Error saving interests:', error);
        // You might want to show an error message to the user here
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F] flex flex-col items-center px-4 py-16 relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] to-[#0D0D0F] pointer-events-none" />
      
      <div className="max-w-2xl w-full relative z-10">
        <h1 className="text-5xl font-bold text-white mb-4 font-mono">
          What interests you?
        </h1>
        <p className="text-2xl text-[#8A8A8A] mb-5 font-mono">
          Select all the topics that interest you.
        </p>

        <div className="flex flex-wrap gap-4 mb-12">
          {interests.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300
                ${selectedInterests.includes(interest)
                  ? 'bg-gradient-to-r from-[#FF2E63] to-[#7B2DFF] text-white shadow-[0_0_20px_rgba(255,46,99,0.3)] scale-105'
                  : 'bg-[rgba(26,26,46,0.7)] text-white border border-[rgba(8,247,254,0.3)] hover:shadow-[0_0_15px_rgba(8,247,254,0.2)] hover:scale-105'
                }`}
            >
              {interest}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className={`w-full py-4 rounded-full text-xl font-semibold transition-all duration-300 font-mono
            ${selectedInterests.length > 0
              ? 'bg-gradient-to-r from-[#FF2E63] to-[#7B2DFF] text-white hover:shadow-[0_0_30px_rgba(255,46,99,0.4)] hover:scale-[1.02]'
              : 'bg-[rgba(26,26,46,0.7)] text-[#8A8A8A] cursor-not-allowed'
            }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
} 