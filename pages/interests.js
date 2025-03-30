import { useState } from 'react';
import { useRouter } from 'next/router';

const topics = [
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
  "Psychology"
];

const genres = [
  "Cyberpunk",
  "Fantasy",
  "Sci-fi",
  "Horror",
  "Mystery",
  "Romance",

];

export default function InterestsPage() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const router = useRouter();

  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleContinue = () => {
    if (selectedTopics.length > 0 && selectedGenres.length > 0) {
      // Here you would typically save the selected topics to your backend/database
      console.log('Selected topics:', selectedTopics);
      console.log('Selected genres:', selectedGenres);
      router.push('/journal'); 
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-16">
      <div className="max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-black mb-4">
          What interests you?
        </h1>
        <p className="text-2xl text-gray-600 mb-5">
          Select all the topics you're interested in.
        </p>

        <div className="flex flex-wrap gap-4 mb-12">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => toggleTopic(topic)}
              className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-200
                ${selectedTopics.includes(topic)
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-black shadow-md hover:shadow-lg hover:scale-105'
                } border border-gray-200`}
            >
              {topic}
            </button>
          ))}
        </div>

        <p className="text-2xl text-gray-600 mb-5">
          Select what style of game you want to play.
        </p>

        <div className="flex flex-wrap gap-4 mb-12">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-200
                ${selectedGenres.includes(genre)
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-black shadow-md hover:shadow-lg hover:scale-105'
                } border border-gray-200`}
            >
              {genre}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className={`w-full py-4 rounded-full text-xl font-semibold transition-all duration-200
            ${selectedTopics.length > 0 && selectedGenres.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:scale-[1.02] shadow-md'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
} 