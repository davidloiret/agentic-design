'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Star, Zap, Flame, Award, Medal, Target, Crown, Sparkles, X } from 'lucide-react';
import { UserAchievement } from '@/lib/learning-hub-api';

interface AchievementNotificationProps {
  achievement: UserAchievement;
  onComplete?: () => void;
}

const getAchievementIcon = (type: string) => {
  switch (type) {
    case 'first_lesson':
    case 'first_quiz':
      return Star;
    case 'week_streak':
    case 'month_streak':
      return Flame;
    case 'course_complete':
      return Trophy;
    case 'perfect_score':
      return Target;
    case 'speed_learner':
      return Zap;
    case 'master':
      return Crown;
    default:
      return Award;
  }
};

const getAchievementColor = (type: string) => {
  switch (type) {
    case 'first_lesson':
    case 'first_quiz':
      return 'from-blue-400 to-blue-600';
    case 'week_streak':
      return 'from-orange-400 to-red-600';
    case 'month_streak':
      return 'from-red-400 to-purple-600';
    case 'course_complete':
      return 'from-yellow-400 to-orange-600';
    case 'perfect_score':
      return 'from-green-400 to-emerald-600';
    case 'speed_learner':
      return 'from-purple-400 to-pink-600';
    case 'master':
      return 'from-yellow-300 via-yellow-400 to-yellow-600';
    default:
      return 'from-gray-400 to-gray-600';
  }
};

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({ 
  achievement, 
  onComplete 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isDismissed, setIsDismissed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const Icon = getAchievementIcon(achievement.type);
  const gradientColor = getAchievementColor(achievement.type);

  useEffect(() => {
    // Show animation
    setTimeout(() => setIsVisible(true), 100);
    
    // Generate particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    }));
    setParticles(newParticles);

    // Play sound effect
    if (typeof window !== 'undefined' && window.Audio) {
      // Use a data URL for the achievement sound (a simple bell chime)
      const audioData = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE';
      audioRef.current = new Audio(audioData);
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {
        // Ignore audio errors (e.g., autoplay blocked)
      });
    }

    // Auto-hide after 7 seconds
    hideTimeoutRef.current = setTimeout(() => {
      if (!isDismissed) {
        handleDismiss();
      }
    }, 7000);

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [achievement]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setTimeout(() => {
      onComplete?.();
    }, 500);
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[9999] transition-all duration-500 ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-full opacity-0 scale-95'
      }`}
    >
      {/* Main notification card */}
      <div className="relative bg-gray-900 rounded-2xl p-1 shadow-2xl overflow-hidden">
        {/* Animated gradient border */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradientColor} animate-pulse`} />
        
        {/* Content container */}
        <div className="relative bg-gray-900 rounded-xl p-8 m-[2px]">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>

          {/* Particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-float"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${particle.x}px, ${particle.y}px)`,
                animation: `float ${2 + Math.random() * 2}s ease-out forwards`,
              }}
            />
          ))}

          {/* Sparkles decoration */}
          <Sparkles className="absolute top-2 right-2 w-6 h-6 text-yellow-400 animate-pulse" />
          <Sparkles className="absolute bottom-2 left-2 w-6 h-6 text-yellow-400 animate-pulse" />

          {/* Achievement content */}
          <div className="flex flex-col items-center text-center relative z-10">
            {/* Icon with glow effect */}
            <div className="mb-4 relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${gradientColor} blur-2xl opacity-50 animate-pulse`} />
              <div className={`relative w-20 h-20 bg-gradient-to-br ${gradientColor} rounded-2xl flex items-center justify-center transform rotate-12 animate-bounce-slow`}>
                <Icon className="w-10 h-10 text-white transform -rotate-12" />
              </div>
            </div>

            {/* Achievement unlocked text */}
            <div className="mb-2">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Achievement Unlocked!
              </p>
            </div>

            {/* Achievement details */}
            <h3 className="text-2xl font-bold text-white mb-2 max-w-sm">
              {achievement.title}
            </h3>
            <p className="text-gray-300 mb-4 max-w-sm">
              {achievement.description}
            </p>

            {/* XP reward */}
            <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full px-4 py-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">+{achievement.xpReward} XP</span>
            </div>
          </div>

          {/* Progress bar animation */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
            <div 
              className={`h-full bg-gradient-to-r ${gradientColor} animate-progress`}
              style={{ animationDuration: '7s' }}
            />
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            opacity: 1;
            transform: translate(var(--x), var(--y)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(calc(var(--x) * 3), calc(var(--y) * 3 - 100px)) scale(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0) rotate(12deg);
          }
          50% {
            transform: translateY(-10px) rotate(12deg);
          }
        }

        @keyframes progress {
          0% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }

        .animate-float {
          --x: ${particles[0]?.x || 0}px;
          --y: ${particles[0]?.y || 0}px;
        }
      `}</style>
    </div>
  );
};

// Achievement Queue Component
interface AchievementQueueProps {
  achievements: UserAchievement[];
  onAchievementShown?: (achievement: UserAchievement) => void;
}

export const AchievementQueue: React.FC<AchievementQueueProps> = ({ 
  achievements, 
  onAchievementShown 
}) => {
  const [queue, setQueue] = useState<UserAchievement[]>([]);
  const [currentAchievement, setCurrentAchievement] = useState<UserAchievement | null>(null);

  useEffect(() => {
    if (achievements.length > 0) {
      setQueue(prev => [...prev, ...achievements]);
    }
  }, [achievements]);

  useEffect(() => {
    if (!currentAchievement && queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrentAchievement(next);
      setQueue(rest);
      onAchievementShown?.(next);
    }
  }, [queue, currentAchievement, onAchievementShown]);

  const handleComplete = () => {
    setCurrentAchievement(null);
  };

  if (!currentAchievement) return null;

  return (
    <AchievementNotification
      achievement={currentAchievement}
      onComplete={handleComplete}
    />
  );
};