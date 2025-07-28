'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { 
  learningHubApi, 
  LearningHubStats, 
  UserProgress, 
  UserAchievement, 
  UserXp, 
  UserStreak,
  UpdateProgressRequest 
} from '@/lib/learning-hub-api';

interface LearningHubContextType {
  // Data
  progress: UserProgress[];
  achievements: UserAchievement[];
  xp: UserXp | null;
  streak: UserStreak | null;
  
  // State
  loading: boolean;
  error: string | null;
  
  // Actions
  updateProgress: (data: UpdateProgressRequest) => Promise<void>;
  refreshData: () => Promise<void>;
  
  // Computed values for easier UI access
  level: number;
  totalXp: number;
  currentStreak: number;
  completedChallenges: string[];
  
  // New achievements tracking
  newAchievements: UserAchievement[];
  clearNewAchievements: () => void;
}

const LearningHubContext = createContext<LearningHubContextType | undefined>(undefined);


export function LearningHubProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  
  // State
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [xp, setXp] = useState<UserXp | null>(null);
  const [streak, setStreak] = useState<UserStreak | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [newAchievements, setNewAchievements] = useState<UserAchievement[]>([]);

  // Load learning hub data
  const refreshData = useCallback(async () => {
    // Don't start loading if auth is still loading
    if (authLoading) return;
    
    if (!user) {
      // Clear data if no user
      // setProgress([]);
      // setAchievements([]);
      // setXp(null);
      // setStreak(null);
      // setLoading(false);
      // setHasInitialized(true);
      return;
    }

    // Only show loading on initial load if no cache, not on refresh
    if (!hasInitialized) {
      setLoading(true);
    }
    setError(null);

    try {
      console.log('[LearningHub] Fetching learning hub data...');
      const data = await learningHubApi.getStats();
      console.log('[LearningHub] Received data:', data);
      
      // Check for new achievements
      const previousAchievementIds = achievements.map((a: UserAchievement) => a.id);
      const newAchievementsList = (data.achievements || []).filter(
        (achievement: UserAchievement) => !previousAchievementIds.includes(achievement.id)
      );
      
      if (newAchievementsList.length > 0 && hasInitialized) {
        console.log('[LearningHub] New achievements unlocked:', newAchievementsList);
        setNewAchievements((prev: UserAchievement[]) => [...prev, ...newAchievementsList]);
      }
      
      setProgress(data.progress || []);
      setAchievements(data.achievements || []);
      setXp(data.xp);
      setStreak(data.streak);
    } catch (err) {
      console.error('[LearningHub] Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load learning hub data');
      
      if (!hasInitialized) {
        setProgress([]);
        setAchievements([]);
        setXp(null);
        setStreak(null);
      }
    } finally {
      setLoading(false);
      setHasInitialized(true);
    }
  }, [user, authLoading, hasInitialized]);
  // Update progress
  const updateProgress = async (data: UpdateProgressRequest) => {
    if (!user) return;
    
    try {
      console.log('[LearningHub] Updating progress:', data);
      const result = await learningHubApi.updateProgress(data);
      console.log('[LearningHub] Progress updated:', result);
      
      // Refresh all data to get updated achievements, XP, streak, etc.
      await refreshData();
    } catch (err) {
      console.error('[LearningHub] Error updating progress:', err);
      setError(err instanceof Error ? err.message : 'Failed to update progress');
      throw err;
    }
  };

  // Computed values for easier UI access
  const level = xp?.level || 1;
  const totalXp = xp?.totalXp || 0;
  const currentStreak = streak?.currentStreak || 0;
  
  // Extract completed lessons/challenges from progress
  const completedChallenges = progress
    .filter((p: UserProgress) => p.isCompleted)
    .map((p: UserProgress) => p.lessonId);
    
  const clearNewAchievements = () => {
    setNewAchievements([]);
  };

  const value: LearningHubContextType = {
    // Data
    progress,
    achievements,
    xp,
    streak,
    
    // State
    loading,
    error,
    
    // Actions
    updateProgress,
    refreshData,
    
    // Computed values
    level,
    totalXp,
    currentStreak,
    completedChallenges,
    
    // New achievements tracking
    newAchievements,
    clearNewAchievements,
  };

  // Load data when user changes or auth loading completes
  useEffect(() => {
    if (!authLoading) {
      refreshData();
    }
  }, [user, authLoading, refreshData]);

  return (
    <LearningHubContext.Provider value={value}>
      {children}
    </LearningHubContext.Provider>
  );
}

export const useLearningHub = () => {
  const context = useContext(LearningHubContext);
  if (context === undefined) {
    throw new Error('useLearningHub must be used within a LearningHubProvider');
  }
  return context;
};