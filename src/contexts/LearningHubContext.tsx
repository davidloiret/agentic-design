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
  // Update progress with optimistic updates
  const updateProgress = async (data: UpdateProgressRequest) => {
    if (!user) return;
    
    // Optimistically update local state immediately
    const optimisticUpdate = () => {
      // Update progress
      setProgress(prev => {
        const existingIndex = prev.findIndex(p => 
          p.lessonId === data.lessonId && 
          p.chapterId === data.chapterId && 
          p.journeyId === data.journeyId
        );
        
        const newProgress: UserProgress = {
          id: existingIndex >= 0 ? prev[existingIndex].id : `temp-${Date.now()}`,
          userId: user.id,
          courseId: data.courseId,
          journeyId: data.journeyId,
          chapterId: data.chapterId,
          lessonId: data.lessonId,
          progressPercentage: data.isCompleted ? 100 : 0,
          isCompleted: data.isCompleted || false,
          score: data.score || 0,
          completedAt: data.isCompleted ? new Date().toISOString() : null,
          createdAt: existingIndex >= 0 ? prev[existingIndex].createdAt : new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = newProgress;
          return updated;
        } else {
          return [...prev, newProgress];
        }
      });
      
      // Optimistically update XP
      if (data.xpEarned && data.xpEarned > 0) {
        setXp(prev => {
          if (!prev) return null;
          const newTotalXp = prev.totalXp + data.xpEarned!;
          
          // Simple level calculation (you may want to adjust this)
          let newLevel = prev.level;
          let xpThreshold = prev.level * 100; // Example: 100 XP per level
          
          while (newTotalXp >= xpThreshold) {
            newLevel++;
            xpThreshold = newLevel * 100;
          }
          
          return {
            ...prev,
            totalXp: newTotalXp,
            level: newLevel
          };
        });
      }
    };
    
    // Apply optimistic update immediately
    optimisticUpdate();
    
    // Save to backend in the background
    try {
      console.log('[LearningHub] Saving progress to backend:', data);
      const result = await learningHubApi.updateProgress(data);
      console.log('[LearningHub] Progress saved successfully:', result);
      
      // Refresh data in background to sync any server-side calculations
      // (achievements, accurate XP calculations, etc.)
      // Don't await this - let it run in background
      refreshData().catch(err => {
        console.error('[LearningHub] Background refresh failed:', err);
      });
    } catch (err) {
      console.error('[LearningHub] Error saving progress:', err);
      setError(err instanceof Error ? err.message : 'Failed to save progress');
      
      // On error, refresh data to revert to server state
      await refreshData();
      
      // Re-throw to let calling component handle the error
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