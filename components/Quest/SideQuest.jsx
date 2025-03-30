import { GiCrossedSwords } from 'react-icons/gi';
import { FaCheckCircle } from 'react-icons/fa';
import React, { useState } from 'react';

export default function SideQuest({ title, description, reward }) {
    const [isCompleted, setIsCompleted] = useState(false);
    
    return (
        <div className="bg-[#1F1225] relative group">
            {/* Angular cuts using pseudo-elements */}
            <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-[#08F7FE]" />
            <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-[#08F7FE]" />
            <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-[#08F7FE]" />
            <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-[#08F7FE]" />
            
            {/* Decorative lines */}
            <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#08F7FE] to-transparent" />
            <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-[#08F7FE] to-transparent" />
            
            <div className="p-6 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isCompleted ? 'bg-[#FF2E63]/20' : 'bg-[#08F7FE]/20'
                    } rotate-45 transition-all duration-300 group-hover:rotate-[225deg] ring-2 ${
                        isCompleted ? 'ring-[#FF2E63]' : 'ring-[#08F7FE]'
                    }`}>
                        <div className="-rotate-45 transition-all duration-300 group-hover:rotate-[-225deg]">
                            {isCompleted ? (
                                <FaCheckCircle className="w-6 h-6 text-[#FF2E63]" />
                            ) : (
                                <GiCrossedSwords className="w-6 h-6 text-[#08F7FE]" />
                            )}
                        </div>
                    </div>
                    <div>
                        <div className={`text-sm font-bold mb-1 ${
                            isCompleted ? 'text-[#FF2E63]' : 'text-[#08F7FE]'
                        } tracking-wider font-mono`}>
                            SIDE QUEST {isCompleted && '• COMPLETED'}
                        </div>
                        <h3 className="text-xl font-bold text-white transition-colors duration-300 
                            group-hover:text-[#08F7FE] font-mono">
                            {title}
                        </h3>
                    </div>
                </div>
                
                <div className={`text-gray-300 mb-4 pl-4 border-l ${
                    isCompleted ? 'border-[#FF2E63]/30' : 'border-[#08F7FE]/30'
                } transition-all duration-300 group-hover:border-[#08F7FE]/50 group-hover:pl-6 ${
                    isCompleted && 'line-through opacity-70'
                } font-mono`}>
                    {description}
                </div>
                
                <div className="flex items-center justify-between mt-6">
                    <div className={`text-sm font-bold ${
                        isCompleted ? 'text-[#FF2E63]' : 'text-[#08F7FE]'
                    } flex items-center transition-all duration-300 group-hover:text-[#08F7FE] group-hover:-translate-x-2 font-mono`}>
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
                                ? 'text-[#FF2E63]' 
                                : 'text-[#08F7FE]'
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
