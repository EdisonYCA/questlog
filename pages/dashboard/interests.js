import { useRouter } from "next/router";
import { useStateContext } from "@/context/StateContext";
import { useState, useEffect } from "react";
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
];

const genres = [
  "Psychology",
  "Cyberpunk",
  "Fantasy",
  "Sci-fi",
  "Horror",
  "Mystery",
  "Romance",
  "Romance"
];

export default function InterestsPage() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const router = useRouter();

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleContinue = () => {
    if (selectedTopics.length > 0 && selectedGenres.length > 0) {
      // Here you would typically save the selected topics to your backend/database
      console.log("Selected topics:", selectedTopics);
      console.log("Selected genres:", selectedGenres);
      router.push("/dashboard/journal");
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
  const { user } = useStateContext();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

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
                ${
                  selectedTopics.includes(topic)
                    ? "bg-gradient-to-r from-[#FF2E63] to-[#7B2DFF] text-white shadow-[0_0_20px_rgba(255,46,99,0.3)] scale-105"
                    : "bg-[rgba(26,26,46,0.7)] text-white border border-[rgba(8,247,254,0.3)] hover:shadow-[0_0_15px_rgba(8,247,254,0.2)] hover:scale-105"
                ${selectedInterests.includes(interest)
                  ? 'bg-gradient-to-r from-[#FF2E63] to-[#7B2DFF] text-white shadow-[0_0_20px_rgba(255,46,99,0.3)] scale-105'
                  : 'bg-[rgba(26,26,46,0.7)] text-white border border-[rgba(8,247,254,0.3)] hover:shadow-[0_0_15px_rgba(8,247,254,0.2)] hover:scale-105'
                }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <p className="text-2xl text-[#8A8A8A] mb-5 font-mono">
          Select what style of game you want to play.
        </p>

        <div className="flex flex-wrap gap-4 mb-12">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300
                ${
                  selectedGenres.includes(genre)
                    ? "bg-gradient-to-r from-[#08F7FE] to-[#7B2DFF] text-white shadow-[0_0_20px_rgba(8,247,254,0.3)] scale-105"
                    : "bg-[rgba(26,26,46,0.7)] text-white border border-[rgba(8,247,254,0.3)] hover:shadow-[0_0_15px_rgba(8,247,254,0.2)] hover:scale-105"
                }`}
            >
              {genre}
              {interest}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className={`w-full py-4 rounded-full text-xl font-semibold transition-all duration-300 font-mono
            ${
              selectedTopics.length > 0 && selectedGenres.length > 0
                ? "bg-gradient-to-r from-[#FF2E63] to-[#7B2DFF] text-white hover:shadow-[0_0_30px_rgba(255,46,99,0.4)] hover:scale-[1.02]"
                : "bg-[rgba(26,26,46,0.7)] text-[#8A8A8A] cursor-not-allowed"
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
