import React, { useState, useEffect } from 'react';
import { BiBrain } from 'react-icons/bi';
import { FaCheckCircle } from 'react-icons/fa';

export default function MainQuest({ title, description, timeframe, reward }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (timeframe) {
      // Parse timeframe and calculate progress
      const [startTime, endTime] = timeframe.split('-').map(time => {
        const [_, h, m, meridiem] = time.match(/(\d+):(\d+)([AP]M)/);
        let hours = parseInt(h, 10);
        const minutes = parseInt(m, 10);
        if (meridiem === "PM" && hours !== 12) hours += 12;
        if (meridiem === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
      });
      
      const updateProgress = () => {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const totalDuration = endTime - startTime;
        const elapsed = currentMinutes - startTime;
        const newProgress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
        setProgress(newProgress);
      };

      updateProgress();
      const interval = setInterval(updateProgress, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [timeframe]);

  return (
    <div className="bg-[#1F1225] relative group">
      {/* Angular cuts using pseudo-elements */}
      <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-[#FF2E63]" />
      <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-[#FF2E63]" />
      <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-[#FF2E63]" />
      <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-[#FF2E63]" />
      
      {/* Decorative lines */}
      <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#FF2E63] to-transparent" />
      <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-[#FF2E63] to-transparent" />

      <div className="p-6 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isCompleted ? 'bg-[#08F7FE]/20' : 'bg-[#FF2E63]/20'
          } ring-2 ${
            isCompleted ? 'ring-[#08F7FE]' : 'ring-[#FF2E63]'
          } transition-all duration-300 group-hover:ring-4`}>
            {isCompleted ? (
              <FaCheckCircle className="w-6 h-6 text-[#08F7FE]" />
            ) : (
              <BiBrain className="w-6 h-6 text-[#FF2E63]" />
            )}
          </div>
          <div>
            <div className={`text-sm font-bold mb-1 ${
              isCompleted ? 'text-[#08F7FE]' : 'text-[#FF2E63]'
            } tracking-wider font-mono`}>
              MAIN QUEST {isCompleted && '• COMPLETED'}
            </div>
            <h3 className="text-2xl font-bold text-white tracking-wide transition-colors duration-300 
              group-hover:text-[#FF2E63] font-mono">{title}</h3>
          </div>
        </div>
        
        {timeframe && !isCompleted && (
          <div className="space-y-2">
            <div className="text-gray-300 font-medium flex items-center font-mono">
              <span className="inline-block w-2 h-2 bg-[#FF2E63] rounded-full mr-2" />
              {timeframe}
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-[#1F1225] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF2E63] to-[#08F7FE] transition-all duration-1000 ease-in-out"
                style={{ width: `${100 - progress}%` }}
              />
            </div>
          </div>
        )}
        
        <div className={`text-gray-300 mb-4 mt-4 pl-4 border-l-2 ${
          isCompleted ? 'border-[#08F7FE]/30' : 'border-[#FF2E63]/30'
        } transition-all duration-300 group-hover:border-[#FF2E63]/50 group-hover:pl-6 ${
          isCompleted && 'line-through opacity-70'
        } font-mono`}>
          {description}
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <div className={`text-sm font-bold ${
            isCompleted ? 'text-[#08F7FE]' : 'text-[#FF2E63]'
          } flex items-center transition-all duration-300 group-hover:text-[#FF2E63] group-hover:translate-x-2 font-mono`}>
            <span className="text-lg mr-2">+</span>
            {reward}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCompleted(!isCompleted);
            }}
            className={`px-4 py-2 font-semibold transition-all duration-300 font-mono relative
              ${isCompleted 
                ? 'text-[#08F7FE]' 
                : 'text-[#FF2E63]'
              }`}
          >
            {/* Button angular cuts */}
            <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-current" />
            <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-current" />
            <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-current" />
            <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-current" />
            {isCompleted ? 'Completed!' : 'Complete Quest'}
          </button>
        </div>
      </div>
    </div>
  );
}
