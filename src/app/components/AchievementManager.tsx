'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useLearningHub } from '@/contexts/LearningHubContext';
import { useAuth } from '@/contexts/AuthContext';
import { AchievementQueue } from './AchievementNotification';
import { XpNotificationQueue } from './XpNotification';
import { StreakNotification } from './StreakNotification';
import { UserAchievement } from '@/lib/learning-hub-api';

export const AchievementManager: React.FC = () => {
  const { newAchievements, clearNewAchievements, xp, level, currentStreak } = useLearningHub();
  const { user } = useAuth();
  const [shownAchievements, setShownAchievements] = useState<Set<string>>(new Set());
  const [achievementsToShow, setAchievementsToShow] = useState<UserAchievement[]>([]);
  const [xpNotifications, setXpNotifications] = useState<any[]>([]);
  const [showStreakNotification, setShowStreakNotification] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Track previous values to detect changes
  const prevXp = useRef(xp?.totalXp || 0);
  const prevLevel = useRef(level || 1);
  const prevStreak = useRef(currentStreak || 0);

  // Helper function to get localStorage key for user achievements
  const getShownAchievementsKey = () => {
    return user ? `shownAchievements_${user.id}` : 'shownAchievements_guest';
  };

  // Load shown achievements from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      try {
        const stored = localStorage.getItem(getShownAchievementsKey());
        if (stored) {
          const parsed = JSON.parse(stored);
          setShownAchievements(new Set(parsed));
          console.log('[AchievementManager] Loaded shown achievements from storage:', parsed);
        }
      } catch (error) {
        console.error('Failed to load shown achievements:', error);
      }
      setIsInitialized(true);
    }
  }, [user]);

  // Save shown achievements to localStorage when they change
  useEffect(() => {
    if (isInitialized && shownAchievements.size > 0) {
      try {
        localStorage.setItem(
          getShownAchievementsKey(),
          JSON.stringify(Array.from(shownAchievements))
        );
        console.log('[AchievementManager] Saved shown achievements to storage:', Array.from(shownAchievements));
      } catch (error) {
        console.error('Failed to save shown achievements:', error);
      }
    }
  }, [shownAchievements, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    // Filter out achievements we've already shown
    const unseenAchievements = newAchievements.filter(
      achievement => !shownAchievements.has(achievement.id)
    );

    if (unseenAchievements.length > 0) {
      console.log('[AchievementManager] New achievements to show:', unseenAchievements);
      setAchievementsToShow(unseenAchievements);
      
      // Mark these achievements as shown
      const newShownSet = new Set(shownAchievements);
      unseenAchievements.forEach(achievement => {
        newShownSet.add(achievement.id);
      });
      setShownAchievements(newShownSet);
      
      // Clear the new achievements from context after showing
      clearNewAchievements();
    }
  }, [newAchievements, shownAchievements, clearNewAchievements, isInitialized]);

  const handleAchievementShown = (achievement: UserAchievement) => {
    console.log('[AchievementManager] Achievement shown:', achievement.title);
    
    // Play additional celebration effects
    if (typeof window !== 'undefined') {
      // Create confetti effect
      createConfetti();
    }
  };
  
  // Check for XP changes
  useEffect(() => {
    if (xp && xp.totalXp > prevXp.current && prevXp.current > 0) {
      const xpGained = xp.totalXp - prevXp.current;
      const isLevelUp = level > prevLevel.current;
      
      console.log('[AchievementManager] XP gained:', xpGained, 'Level up:', isLevelUp);
      
      setXpNotifications(prev => [...prev, {
        xpGained,
        totalXp: xp.totalXp,
        level: level,
        isLevelUp
      }]);
      
      prevXp.current = xp.totalXp;
      prevLevel.current = level;
    }
  }, [xp, level]);
  
  // Check for streak changes
  useEffect(() => {
    if (currentStreak > prevStreak.current && prevStreak.current >= 0) {
      console.log('[AchievementManager] Streak increased:', currentStreak);
      setShowStreakNotification(true);
      prevStreak.current = currentStreak;
    }
  }, [currentStreak]);

  return (
    <>
      <AchievementQueue
        achievements={achievementsToShow}
        onAchievementShown={handleAchievementShown}
      />
      <XpNotificationQueue notifications={xpNotifications} />
      {showStreakNotification && (
        <StreakNotification
          currentStreak={currentStreak}
          isNewRecord={currentStreak > prevStreak.current}
          onComplete={() => setShowStreakNotification(false)}
        />
      )}
    </>
  );
};

// Confetti effect function
function createConfetti() {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#F7DC6F'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.opacity = '1';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '10000';
    
    document.body.appendChild(confetti);
    
    // Animate confetti
    const duration = Math.random() * 3 + 2; // 2-5 seconds
    const horizontalMovement = (Math.random() - 0.5) * 100;
    
    confetti.animate([
      { 
        transform: `translateY(0) translateX(0) rotate(0deg)`,
        opacity: 1 
      },
      { 
        transform: `translateY(${window.innerHeight + 10}px) translateX(${horizontalMovement}px) rotate(${Math.random() * 720}deg)`,
        opacity: 0
      }
    ], {
      duration: duration * 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, duration * 1000);
  }
}