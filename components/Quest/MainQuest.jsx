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
        <div className={`quest-card rounded-lg p-6 border-l-4 ${isCompleted ? 'border-green-400' : 'border-cyan-400'} relative overflow-hidden 
      transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)] 
      hover:scale-[1.02] cursor-pointer group`}>
      {/* Glowing effect */}
      <div className={`absolute -inset-1 ${isCompleted ? 'bg-green-400/20' : 'bg-cyan-400/20'} blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-400' : 'bg-cyan-400'} bg-opacity-50 
            ring-2 ${isCompleted ? 'ring-green-400/70' : 'ring-cyan-400/70'} transition-all duration-300 group-hover:ring-4 group-hover:bg-opacity-60`}>
            {isCompleted ? (
              <FaCheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <BiBrain className="w-6 h-6 text-cyan-500" />
            )}
          </div>
          <div>
            <div className={`text-sm font-bold mb-1 ${isCompleted ? 'text-green-400' : 'text-cyan-400'} tracking-wider`}>
              MAIN QUEST {isCompleted && '• COMPLETED'}
            </div>
            <h3 className={`text-2xl font-bold ${isCompleted ? 'text-green-200' : 'text-white'} tracking-wide transition-colors duration-300 
              group-hover:text-cyan-200`}>{title}</h3>
          </div>
        </div>
        
        {timeframe && !isCompleted && (
          <div className="space-y-2">
            <div className="text-gray-300 font-medium flex items-center">
              <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full mr-2" />
              {timeframe}
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-400 transition-all duration-1000 ease-in-out"
                style={{ width: `${100 - progress}%` }}
              />
            </div>
          </div>
        )}
        
        <div className={`text-gray-300 mb-4 mt-4 pl-4 border-l-2 ${isCompleted ? 'border-green-400/30' : 'border-cyan-400/30'} transition-all duration-300 
          group-hover:border-cyan-400/50 group-hover:pl-6 ${isCompleted && 'line-through opacity-70'}`}>
          {description}
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <div className={`text-sm font-bold ${isCompleted ? 'text-green-400' : 'text-cyan-400'} flex items-center transition-all duration-300 
            group-hover:text-cyan-300 group-hover:translate-x-2`}>
            <span className="text-lg mr-2">+</span>
            {reward}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCompleted(!isCompleted);
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 
              ${isCompleted 
                ? 'bg-green-400/20 text-green-400 hover:bg-green-400/30' 
                : 'bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30'}`}
          >
            {isCompleted ? 'Completed!' : 'Complete Quest'}
          </button>
        </div>
      </div>
    </div>
    );
  }
