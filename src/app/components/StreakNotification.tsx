'use client';

import React, { useState, useEffect } from 'react';
import { Flame, Calendar, TrendingUp } from 'lucide-react';

interface StreakNotificationProps {
  currentStreak: number;
  isNewRecord?: boolean;
  onComplete?: () => void;
}

export const StreakNotification: React.FC<StreakNotificationProps> = ({
  currentStreak,
  isNewRecord = false,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [flames, setFlames] = useState<Array<{ id: number; delay: number }>>([]);

  useEffect(() => {
    // Show animation
    setTimeout(() => setIsVisible(true), 100);
    
    // Generate flame particles
    const flameParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 0.1,
    }));
    setFlames(flameParticles);

    // Auto-hide
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 300);
    }, 3500);

    return () => {
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  const getStreakMessage = () => {
    if (currentStreak >= 30) return "Unstoppable! 🔥";
    if (currentStreak >= 14) return "On Fire! 🔥";
    if (currentStreak >= 7) return "Great Work! ⭐";
    if (currentStreak >= 3) return "Keep Going! 💪";
    return "Nice Start! 🌟";
  };

  return (
    <div
      className={`fixed top-24 left-6 z-[9998] transition-all duration-500 ${
        isVisible 
          ? 'translate-x-0 opacity-100 scale-100' 
          : '-translate-x-full opacity-0 scale-95'
      }`}
    >
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-1 shadow-2xl">
        <div className="bg-gray-900 rounded-lg p-5 m-[2px]">
          {/* Flame particles */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            {flames.map((flame) => (
              <div
                key={flame.id}
                className="absolute bottom-0 w-2 h-2 bg-orange-400 rounded-full animate-float-up"
                style={{
                  left: `${10 + flame.id * 10}%`,
                  animationDelay: `${flame.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center space-x-4">
            <div className="relative">
              <Flame className="w-12 h-12 text-orange-400 animate-pulse" />
              {isNewRecord && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
              )}
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-2xl font-bold text-white">{currentStreak} Day Streak!</p>
                {isNewRecord && (
                  <span className="text-xs bg-yellow-400 text-gray-900 px-2 py-1 rounded-full font-bold">
                    NEW RECORD
                  </span>
                )}
              </div>
              <p className="text-orange-300 font-medium">{getStreakMessage()}</p>
              <div className="flex items-center space-x-3 mt-2 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>Daily learning goal achieved</span>
                </div>
                {currentStreak >= 7 && (
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{Math.floor(currentStreak / 7)} weeks</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Streak progress visualization */}
          <div className="mt-4 flex space-x-1">
            {Array.from({ length: Math.min(currentStreak, 7) }, (_, i) => (
              <div
                key={i}
                className="flex-1 h-1 bg-orange-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
            {currentStreak < 7 && Array.from({ length: 7 - currentStreak }, (_, i) => (
              <div
                key={`empty-${i}`}
                className="flex-1 h-1 bg-gray-700 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
          }
        }
        
        .animate-float-up {
          animation: float-up 2s ease-out infinite;
        }
      `}</style>
    </div>
  );
};