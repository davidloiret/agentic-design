import { api } from './api-client';

// Types
export interface UserProgress {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  courseId: string;
  score: number;
  lessonId: string;
  progressPercentage: number;
  isCompleted: boolean;
  completedAt?: string | null;
  timeSpent?: number;
  lastAccessedAt?: string;
  chapterId?: string;
  journeyId?: string;
}

export interface UserAchievement {
  id: string;
  type: string;
  title: string;
  description: string;
  icon?: string;
  xpReward: number;
  metadata?: string;
  unlockedAt: string;
}

export interface UserXp {
  id: string;
  totalXp: number;
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
}

export interface UserXpTransaction {
  id: string;
  amount: number;
  source: string;
  sourceId?: string;
  description?: string;
  earnedAt: string;
}

export interface UserStreak {
  id: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate?: string;
  totalActiveDays: number;
}

export interface LearningHubStats {
  progress: UserProgress[];
  achievements: UserAchievement[];
  xp: UserXp | null;
  streak: UserStreak | null;
  recentTransactions: UserXpTransaction[];
}

export interface UpdateProgressRequest {
  xpEarned: number | null;
  userId: string;
  courseId: string;
  journeyId: string;
  chapterId: string;
  lessonId: string;
  isCompleted: boolean | null;
  score: number | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// API Functions
export const learningHubApi = {
  // Get all user learning hub data in one call
  async getStats(): Promise<LearningHubStats> {
    const response = await api.get('/api/v1/learning-hub/stats');
    return await response.json();
  },

  // Update user progress for a lesson
  async updateProgress(data: UpdateProgressRequest): Promise<{
    success: boolean;
    data: UserProgress;
    message: string;
  }> {
    const response = await api.post('/api/v1/learning-hub/progress', data);
    return await response.json();
  },

  // Get user progress (optionally filtered by course)
  async getProgress(courseId?: string): Promise<{
    progress: UserProgress[];
    courseProgress?: {
      totalLessons: number;
      completedLessons: number;
      progressPercentage: number;
      totalTimeSpent: number;
    };
  }> {
    const url = courseId 
      ? `/api/v1/learning-hub/progress?courseId=${courseId}`
      : '/api/v1/learning-hub/progress';
    const response = await api.get(url);
    return await response.json();
  },

  // Get user achievements
  async getAchievements(): Promise<{
    success: boolean;
    data: UserAchievement[];
  }> {
    const response = await api.get('/api/v1/learning-hub/achievements');
    return await response.json();
  },

  // Get user XP data
  async getXp(): Promise<{
    userXp: UserXp | null;
    transactions: UserXpTransaction[];
    xpBySource: { source: string; total: number }[];
  }> {
    const response = await api.get('/api/v1/learning-hub/xp');
    return await response.json();
  },

  // Get user streak
  async getStreak(): Promise<{
    success: boolean;
    data: UserStreak | null;
  }> {
    const response = await api.get('/api/v1/learning-hub/streak');
    return await response.json();
  },

  // Get leaderboards
  async getLeaderboard(): Promise<{
    xpLeaderboard: UserXp[];
    streakLeaderboard: UserStreak[];
  }> {
    const response = await api.get('/api/v1/learning-hub/leaderboard');
    return await response.json();
  },

  // Get course-specific progress
  async getCourseProgress(courseId: string): Promise<{
    progress: UserProgress[];
    courseProgress?: {
      totalLessons: number;
      completedLessons: number;
      progressPercentage: number;
      totalTimeSpent: number;
    };
  }> {
    const response = await api.get(`/api/v1/learning-hub/progress/${courseId}`);
    return await response.json();
  }
};