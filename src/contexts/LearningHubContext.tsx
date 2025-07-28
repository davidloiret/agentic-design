'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
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

// Helper functions for localStorage caching
const getCacheKey = (userId: string) => `learning-hub-${userId}`;

const loadFromCache = (userId: string): Partial<LearningHubStats> | null => {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(getCacheKey(userId));
    if (cached) {
      const data = JSON.parse(cached);
      // Check if cache is less than 5 minutes old
      if (Date.now() - data.timestamp < 5 * 60 * 1000) {
        return data.stats;
      }
    }
  } catch (error) {
    console.warn('Failed to load from cache:', error);
  }
  return null;
};

const saveToCache = (userId: string, stats: LearningHubStats) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getCacheKey(userId), JSON.stringify({
      stats,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.warn('Failed to save to cache:', error);
  }
};

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

    // Try to load from cache first
    if (!hasInitialized) {
      const cachedData = loadFromCache(user.id);
      if (cachedData) {
        console.log('[LearningHub] Loading from cache...');
        setProgress(cachedData.progress || []);
        setAchievements(cachedData.achievements || []);
        setXp(cachedData.xp || null);
        setStreak(cachedData.streak || null);
        setHasInitialized(true);
        // Still fetch fresh data in background
      }
    }

    // Only show loading on initial load if no cache, not on refresh
    if (!hasInitialized && !loadFromCache(user.id)) {
      setLoading(true);
    }
    setError(null);

    try {
      console.log('[LearningHub] Fetching learning hub data...');
      const data = await learningHubApi.getStats();
      console.log('[LearningHub] Received data:', data);
      
      // Check for new achievements
      const previousAchievementIds = achievements.map(a => a.id);
      const newAchievementsList = (data.achievements || []).filter(
        achievement => !previousAchievementIds.includes(achievement.id)
      );
      
      if (newAchievementsList.length > 0 && hasInitialized) {
        console.log('[LearningHub] New achievements unlocked:', newAchievementsList);
        setNewAchievements(prev => [...prev, ...newAchievementsList]);
      }
      
      setProgress(data.progress || []);
      setAchievements(data.achievements || []);
      setXp(data.xp);
      setStreak(data.streak);
      
      // Save to cache
      saveToCache(user.id, data);
    } catch (err) {
      console.error('[LearningHub] Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load learning hub data');
      
      // Only initialize with defaults if we haven't initialized yet and no cache
      if (!hasInitialized && !loadFromCache(user.id)) {
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
    .filter(p => p.isCompleted)
    .map(p => p.lessonId);
    
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