'use client';

import React, { useState, useEffect } from 'react';
import { Zap, TrendingUp, Star } from 'lucide-react';

interface XpNotificationProps {
  xpGained: number;
  totalXp: number;
  level?: number;
  isLevelUp?: boolean;
  onComplete?: () => void;
}

export const XpNotification: React.FC<XpNotificationProps> = ({
  xpGained,
  totalXp,
  level,
  isLevelUp = false,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show animation
    setTimeout(() => setIsVisible(true), 100);
    
    // Animate XP progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= xpGained) {
          clearInterval(progressInterval);
          return xpGained;
        }
        return prev + Math.ceil(xpGained / 20);
      });
    }, 50);

    // Auto-hide
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 300);
    }, isLevelUp ? 4000 : 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hideTimer);
    };
  }, [xpGained, isLevelUp, onComplete]);

  return (
    <div
      className={`fixed bottom-24 right-6 z-[9998] transition-all duration-300 ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-full opacity-0 scale-95'
      }`}
    >
      {isLevelUp ? (
        // Level up notification
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Star className="w-12 h-12 text-white animate-spin-slow" />
              <div className="absolute inset-0 blur-xl bg-white/30 animate-pulse" />
            </div>
            <div className="text-white">
              <p className="text-sm font-medium opacity-90">LEVEL UP!</p>
              <p className="text-2xl font-bold">Level {level}</p>
              <p className="text-sm opacity-90">+{xpGained} XP</p>
            </div>
          </div>
        </div>
      ) : (
        // Regular XP gain notification
        <div className="bg-gray-900 rounded-xl p-4 shadow-2xl border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Zap className="w-8 h-8 text-yellow-400" />
              <div className="absolute inset-0 blur-lg bg-yellow-400/30 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-yellow-400">+{progress}</span>
                <span className="text-gray-400 text-sm">XP</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <TrendingUp className="w-3 h-3" />
                <span>{totalXp.toLocaleString()} total</span>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
              style={{ width: `${(progress / xpGained) * 100}%` }}
            />
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

// XP Notification Queue
interface XpQueueProps {
  notifications: Array<{
    xpGained: number;
    totalXp: number;
    level?: number;
    isLevelUp?: boolean;
  }>;
}

export const XpNotificationQueue: React.FC<XpQueueProps> = ({ notifications }) => {
  const [queue, setQueue] = useState<typeof notifications>([]);
  const [current, setCurrent] = useState<typeof notifications[0] | null>(null);

  useEffect(() => {
    if (notifications.length > 0) {
      setQueue(prev => [...prev, ...notifications]);
    }
  }, [notifications]);

  useEffect(() => {
    if (!current && queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrent(next);
      setQueue(rest);
    }
  }, [queue, current]);

  const handleComplete = () => {
    setCurrent(null);
  };

  if (!current) return null;

  return (
    <XpNotification
      {...current}
      onComplete={handleComplete}
    />
  );
};