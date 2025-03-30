import { GiCrossedSwords } from 'react-icons/gi';
import { FaCheckCircle } from 'react-icons/fa';
import React, { useState } from 'react';


export default function SideQuest({ title, description, reward }) {
    const [isCompleted, setIsCompleted] = useState(false);
    
    return (
        <div className={`quest-card rounded-lg p-6 border-2 ${isCompleted ? 'border-green-500/50' : 'border-purple-500/50'} relative overflow-hidden 
      transition-all duration-300 ease-in-out ${isCompleted ? 'hover:border-green-400' : 'hover:border-purple-400'} hover:-translate-y-1 
      hover:shadow-[0_10px_20px_-5px_${isCompleted ? 'rgba(74,222,128,0.3)' : 'rgba(168,85,247,0.3)'}] cursor-pointer group`}>

      {/* Lines on side of box */}
      <div className="absolute top-0 right-0 w-24 h-24 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
        <div className={`absolute top-4 right-4 w-px h-8 ${isCompleted ? 'bg-green-500/30' : 'bg-purple-500/30'} transform rotate-45 transition-all duration-300 
          group-hover:h-10 ${isCompleted ? 'group-hover:bg-green-400/40' : 'group-hover:bg-purple-400/40'}`} />
        <div className={`absolute top-4 right-8 w-px h-6 ${isCompleted ? 'bg-green-500/20' : 'bg-purple-500/20'} transform rotate-45 transition-all duration-300 
          group-hover:h-8 ${isCompleted ? 'group-hover:bg-green-400/30' : 'group-hover:bg-purple-400/30'}`} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-green-500' : 'bg-purple-500'} bg-opacity-30 rotate-45 
            transition-all duration-300 group-hover:rotate-[225deg] group-hover:bg-opacity-40`}>
            <div className="-rotate-45 transition-all duration-300 group-hover:rotate-[-225deg]">
              {isCompleted ? (
                <FaCheckCircle className="w-6 h-6 text-green-400 transition-all duration-300 group-hover:text-green-300" />
              ) : (
                <GiCrossedSwords className="w-6 h-6 text-purple-400 transition-all duration-300 group-hover:text-purple-300" />
              )}
            </div>
          </div>
          <div>
            <div className={`text-sm font-bold mb-1 ${isCompleted ? 'text-green-400' : 'text-purple-400'} tracking-wider transition-colors duration-300 
              ${isCompleted ? 'group-hover:text-green-300' : 'group-hover:text-purple-300'}`}>
              SIDE QUEST {isCompleted && '• COMPLETED'}
            </div>
            <h3 className={`text-xl font-bold ${isCompleted ? 'text-green-100' : 'text-white'} transition-colors duration-300 
              ${isCompleted ? 'group-hover:text-green-100' : 'group-hover:text-purple-100'}`}>
              {title}
            </h3>
          </div>
        </div>
        
        <div className={`text-gray-300 mb-4 pl-4 border-l ${isCompleted ? 'border-green-500/30' : 'border-purple-500/30'} transition-all duration-300 
          ${isCompleted ? 'group-hover:border-green-400/50' : 'group-hover:border-purple-400/50'} group-hover:pl-6 ${isCompleted && 'line-through opacity-70'}`}>
          {description}
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <div className={`text-sm font-bold ${isCompleted ? 'text-green-400' : 'text-purple-400'} flex items-center transition-all duration-300 
            ${isCompleted ? 'group-hover:text-green-300' : 'group-hover:text-purple-300'} group-hover:-translate-x-2`}>
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
                : 'bg-purple-400/20 text-purple-400 hover:bg-purple-400/30'}`}
          >
            {isCompleted ? 'Completed!' : 'Complete Quest'}
          </button>
        </div>
      </div>
    </div>
    );
  }
