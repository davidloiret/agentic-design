"use client"

import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Star, 
  Flame, 
  Target, 
  Code, 
  Brain, 
  Zap, 
  Award, 
  BookOpen, 
  Play, 
  Lock,
  CheckCircle,
  Clock,
  GraduationCap,
  Medal,
  Info,
  ArrowRight,
  XCircle,
} from 'lucide-react';
import { useLearningHub } from '@/contexts/LearningHubContext';
import { QuizComponent } from './learning/QuizComponent';
import { FlashcardComponent } from './learning/FlashcardComponent';
import { CodeChallengeComponent } from './learning/CodeChallengeComponent';
import { learningContent } from '../data/learning-content';
import { motion, AnimatePresence } from 'framer-motion';

interface LearningHubProps {
  // We'll pass in techniques and categories for learning content
  techniques?: any[];
  categories?: any[];
}

interface Challenge {
  id: string;
  type: 'flashcard' | 'quiz' | 'code' | 'pattern-select' | 'system-build';
  title: string;
  description: string;
  xpReward: number;
  timeEstimate: number; // in minutes
  completed: boolean;
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  xpReward: number;
  challenges: Challenge[];
  prerequisite?: string;
  isLocked: boolean;
}

const LEVELS = [
  { level: 1, title: 'Novice', xpRequired: 0, color: 'text-gray-400' },
  { level: 2, title: 'Learner', xpRequired: 100, color: 'text-green-400' },
  { level: 3, title: 'Explorer', xpRequired: 250, color: 'text-blue-400' },
  { level: 4, title: 'Practitioner', xpRequired: 500, color: 'text-purple-400' },
  { level: 5, title: 'Engineer', xpRequired: 1000, color: 'text-orange-400' },
  { level: 6, title: 'Architect', xpRequired: 2000, color: 'text-red-400' },
  { level: 7, title: 'Master', xpRequired: 4000, color: 'text-yellow-400' },
];

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  xpReward: number;
  progress: { current: number; required: number };
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  unlockDate?: string;
}

export const LearningHubConnected: React.FC<LearningHubProps> = ({ techniques = [], categories = [] }) => {
  const { 
    progress, 
    achievements, 
    loading, 
    error, 
    updateProgress, 
    refreshData,
    level,
    totalXp,
    currentStreak,
    completedChallenges 
  } = useLearningHub();

  const [activeView, setActiveView] = useState<'dashboard' | 'learning' | 'achievements' | 'certification' | 'challenge'>('dashboard');
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [savingProgress, setSavingProgress] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const learningModules: LearningModule[] = [
    {
      id: 'reasoning-techniques',
      title: 'Reasoning Techniques',
      description: 'Master advanced AI reasoning patterns like Chain of Thought, Tree of Thoughts, and Graph of Thought',
      difficulty: 'beginner',
      xpReward: 200,
      isLocked: false,
      challenges: [
        {
          id: 'reasoning-flashcards',
          type: 'flashcard',
          title: 'Reasoning Patterns Flashcards',
          description: 'Learn CoT, ToT, LRT, GoT, ReAct, and other reasoning techniques',
          xpReward: 40,
          timeEstimate: 20,
          completed: completedChallenges.includes('reasoning-flashcards')
        },
        {
          id: 'reasoning-quiz',
          type: 'quiz',
          title: 'Reasoning Techniques Quiz',
          description: 'Test your knowledge of advanced reasoning patterns',
          xpReward: 60,
          timeEstimate: 25,
          completed: completedChallenges.includes('reasoning-quiz')
        },
        {
          id: 'implement-tot',
          type: 'code',
          title: 'Build Tree of Thought System',
          description: 'Implement a Tree of Thought reasoning system with backtracking',
          xpReward: 100,
          timeEstimate: 60,
          completed: completedChallenges.includes('implement-tot')
        }
      ]
    },
    {
      id: 'prompt-chaining',
      title: 'Prompt Chaining Patterns',
      description: 'Learn Sequential, Parallel, Conditional, and Hierarchical chaining techniques',
      difficulty: 'beginner',
      xpReward: 150,
      isLocked: false,
      challenges: [
        {
          id: 'chaining-flashcards',
          type: 'flashcard',
          title: 'Chaining Patterns Flashcards',
          description: 'Master different prompt chaining approaches',
          xpReward: 35,
          timeEstimate: 18,
          completed: completedChallenges.includes('chaining-flashcards')
        },
        {
          id: 'chaining-quiz',
          type: 'quiz',
          title: 'Prompt Chaining Quiz',
          description: 'Test your understanding of chaining patterns',
          xpReward: 50,
          timeEstimate: 22,
          completed: completedChallenges.includes('chaining-quiz')
        }
      ]
    },
    {
      id: 'routing-techniques',
      title: 'Intelligent Routing',
      description: 'Learn Dynamic, Content-based, Capability, and Geographic routing patterns',
      difficulty: 'intermediate',
      xpReward: 200,
      isLocked: totalXp < 200,
      challenges: [
        {
          id: 'routing-flashcards',
          type: 'flashcard',
          title: 'Routing Patterns Flashcards',
          description: 'Learn intelligent routing and load balancing techniques',
          xpReward: 40,
          timeEstimate: 20,
          completed: completedChallenges.includes('routing-flashcards')
        },
        {
          id: 'routing-quiz',
          type: 'quiz',
          title: 'Routing Techniques Quiz',
          description: 'Test your knowledge of routing and distribution patterns',
          xpReward: 55,
          timeEstimate: 25,
          completed: completedChallenges.includes('routing-quiz')
        },
        {
          id: 'build-dynamic-router',
          type: 'code',
          title: 'Build Dynamic Routing System',
          description: 'Create a context-aware dynamic routing system',
          xpReward: 120,
          timeEstimate: 75,
          completed: completedChallenges.includes('build-dynamic-router')
        }
      ]
    },
    {
      id: 'tool-use',
      title: 'Tool Use & Integration',
      description: 'Master Function Calling, API Integration, Code Execution, and MCP',
      difficulty: 'intermediate',
      xpReward: 250,
      isLocked: totalXp < 350,
      challenges: [
        {
          id: 'tool-use-flashcards',
          type: 'flashcard',
          title: 'Tool Integration Flashcards',
          description: 'Learn function calling, API integration, and tool orchestration',
          xpReward: 45,
          timeEstimate: 22,
          completed: completedChallenges.includes('tool-use-flashcards')
        },
        {
          id: 'tool-use-quiz',
          type: 'quiz',
          title: 'Tool Use Quiz',
          description: 'Test your knowledge of tool integration patterns',
          xpReward: 65,
          timeEstimate: 28,
          completed: completedChallenges.includes('tool-use-quiz')
        },
        {
          id: 'build-react-agent',
          type: 'code',
          title: 'Build Advanced ReAct Agent',
          description: 'Create a sophisticated ReAct agent with tool learning',
          xpReward: 140,
          timeEstimate: 90,
          completed: completedChallenges.includes('build-react-agent')
        }
      ]
    },
    {
      id: 'workflow-orchestration',
      title: 'Workflow Orchestration',
      description: 'Learn Event-Driven, Actor Model, Federated, and Progressive Enhancement patterns',
      difficulty: 'advanced',
      xpReward: 300,
      isLocked: totalXp < 600,
      challenges: [
        {
          id: 'orchestration-flashcards',
          type: 'flashcard',
          title: 'Orchestration Patterns Flashcards',
          description: 'Master workflow coordination and distributed processing',
          xpReward: 50,
          timeEstimate: 25,
          completed: completedChallenges.includes('orchestration-flashcards')
        },
        {
          id: 'orchestration-quiz',
          type: 'quiz',
          title: 'Workflow Orchestration Quiz',
          description: 'Test your knowledge of advanced orchestration patterns',
          xpReward: 75,
          timeEstimate: 35,
          completed: completedChallenges.includes('orchestration-quiz')
        }
      ]
    },
    {
      id: 'planning-execution',
      title: 'Planning & Execution',
      description: 'Learn Hierarchical Planning, Goal Decomposition, Constraint Satisfaction, and Scenario Planning',
      difficulty: 'advanced',
      xpReward: 350,
      isLocked: totalXp < 900,
      challenges: [
        {
          id: 'planning-flashcards',
          type: 'flashcard',
          title: 'Planning Patterns Flashcards',
          description: 'Master complex planning and execution strategies',
          xpReward: 55,
          timeEstimate: 28,
          completed: completedChallenges.includes('planning-flashcards')
        },
        {
          id: 'planning-quiz',
          type: 'quiz',
          title: 'Planning & Execution Quiz',
          description: 'Test your knowledge of advanced planning techniques',
          xpReward: 80,
          timeEstimate: 40,
          completed: completedChallenges.includes('planning-quiz')
        }
      ]
    },
    {
      id: 'pattern-mastery',
      title: 'Pattern Selection Mastery',
      description: 'Choose the right patterns for complex real-world scenarios',
      difficulty: 'expert',
      xpReward: 400,
      isLocked: totalXp < 1200,
      challenges: [
        {
          id: 'advanced-pattern-selection',
          type: 'pattern-select',
          title: 'Advanced Pattern Selection',
          description: 'Select optimal patterns for complex enterprise scenarios',
          xpReward: 100,
          timeEstimate: 45,
          completed: completedChallenges.includes('advanced-pattern-selection')
        },
        {
          id: 'system-architecture',
          type: 'system-build',
          title: 'AI System Architecture Challenge',
          description: 'Design complete AI systems using multiple patterns',
          xpReward: 200,
          timeEstimate: 120,
          completed: completedChallenges.includes('system-architecture')
        }
      ]
    }
  ];

  const getCurrentLevel = () => {
    return LEVELS.reduce((prev, current) => 
      totalXp >= current.xpRequired ? current : prev
    );
  };

  const getNextLevel = () => {
    return LEVELS.find(level => level.xpRequired > totalXp) || LEVELS[LEVELS.length - 1];
  };

  const getProgressToNextLevel = () => {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();
    if (currentLevel === nextLevel) return 100;
    
    const progress = ((totalXp - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100;
    return Math.min(progress, 100);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/10';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'advanced': return 'text-orange-400 bg-orange-400/10';
      case 'expert': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'flashcard': return BookOpen;
      case 'quiz': return Brain;
      case 'code': return Code;
      case 'pattern-select': return Target;
      case 'system-build': return Award;
      default: return Play;
    }
  };

  const handleChallengeComplete = async (challengeId: string, score: number, xpEarned: number) => {
    console.log('[Learning Hub] Challenge completed:', { challengeId, score, xpEarned });
    console.log('[Learning Hub] Score represents percentage:', score, '%');
    setSaveError(null);
    setSaveSuccess(false);
    setSavingProgress(true);
    
    // Map challenge ID to course/lesson structure
    const courseMapping: { [key: string]: { courseId: string; lessonId: string } } = {
      'reasoning-flashcards': { courseId: 'reasoning-techniques', lessonId: 'reasoning-flashcards' },
      'reasoning-quiz': { courseId: 'reasoning-techniques', lessonId: 'reasoning-quiz' },
      'implement-tot': { courseId: 'reasoning-techniques', lessonId: 'implement-tot' },
      'chaining-flashcards': { courseId: 'prompt-chaining', lessonId: 'chaining-flashcards' },
      'chaining-quiz': { courseId: 'prompt-chaining', lessonId: 'chaining-quiz' },
      'routing-flashcards': { courseId: 'routing-techniques', lessonId: 'routing-flashcards' },
      'routing-quiz': { courseId: 'routing-techniques', lessonId: 'routing-quiz' },
      'build-dynamic-router': { courseId: 'routing-techniques', lessonId: 'build-dynamic-router' },
      'tool-use-flashcards': { courseId: 'tool-use', lessonId: 'tool-use-flashcards' },
      'tool-use-quiz': { courseId: 'tool-use', lessonId: 'tool-use-quiz' },
      'build-react-agent': { courseId: 'tool-use', lessonId: 'build-react-agent' },
      'orchestration-flashcards': { courseId: 'workflow-orchestration', lessonId: 'orchestration-flashcards' },
      'orchestration-quiz': { courseId: 'workflow-orchestration', lessonId: 'orchestration-quiz' },
      'planning-flashcards': { courseId: 'planning-execution', lessonId: 'planning-flashcards' },
      'planning-quiz': { courseId: 'planning-execution', lessonId: 'planning-quiz' },
      'advanced-pattern-selection': { courseId: 'pattern-mastery', lessonId: 'advanced-pattern-selection' },
      'system-architecture': { courseId: 'pattern-mastery', lessonId: 'system-architecture' },
    };

    const mapping = courseMapping[challengeId];
    if (!mapping) {
      console.error('No mapping found for challenge:', challengeId);
      setSaveError('Configuration error: Challenge not mapped properly');
      setSavingProgress(false);
      return;
    }

    // Retry logic with exponential backoff
    const maxRetries = 3;
    let retryCount = 0;
    let lastError: Error | null = null;

    while (retryCount < maxRetries) {
      try {
        // Calculate time spent based on challenge estimate (convert minutes to seconds)
        const challenge = selectedChallenge;
        const timeSpent = challenge ? challenge.timeEstimate * 60 : 0;

        // Prepare progress update data
        // Always mark as 100% when challenge is completed (regardless of score)
        // The score affects XP earned, not completion status
        const progressData = {
          xpEarned: challenge?.xpReward || 10, // Use challenge XP reward or default
          userId: '', // Will be filled by context
          courseId: mapping.courseId,
          journeyId: mapping.courseId, // Use courseId as journeyId for now
          chapterId: mapping.courseId, // Use courseId as chapterId for now  
          lessonId: mapping.lessonId,
          isCompleted: true,
          score: 100, // Challenge completed successfully
          completedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        console.log('[Learning Hub] Sending progress update:', progressData);
        
        // Update progress in backend (this will trigger achievements, XP, streak updates automatically)
        await updateProgress(progressData);

        // Success! Clear any errors and return to learning view
        setSaveError(null);
        setSavingProgress(false);
        setSaveSuccess(true);
        console.log('[Learning Hub] Progress saved successfully');
        
        // Show success message briefly before transitioning
        setTimeout(() => {
          setSaveSuccess(false);
          setActiveView('learning');
          setSelectedChallenge(null);
        }, 1500);
        return;
      } catch (error) {
        lastError = error as Error;
        retryCount++;
        console.error(`Failed to update progress (attempt ${retryCount}/${maxRetries}):`, error);
        
        if (retryCount < maxRetries) {
          // Wait with exponential backoff before retrying
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
        }
      }
    }

    setSavingProgress(false);
    setSaveError(
      `Failed to save your progress after ${maxRetries} attempts. ` +
      `Please check your internet connection and try again. ` +
      `Error: ${lastError?.message || 'Unknown error'}`
    );
  };

  const handleChallengeStart = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setActiveView('challenge');
  };

  const handleChallengeExit = () => {
    setSavingProgress(false);
    setSaveError(null);
    setSaveSuccess(false);
    setActiveView('learning');
    setSelectedChallenge(null);
  };

  // Show loading state only on initial load
  if (loading && totalXp === 0 && progress.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="hidden md:block">
            <div className="h-8 bg-gray-700 rounded animate-pulse mb-2 w-64"></div>
            <div className="h-4 bg-gray-800 rounded animate-pulse w-96"></div>
          </div>
          <div className="flex space-x-1 md:space-x-2 w-full md:w-auto">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex-1 md:flex-none h-10 bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-4 md:p-6 border border-gray-700">
                <div className="h-6 bg-gray-700 rounded animate-pulse mb-4"></div>
                <div className="h-8 bg-gray-600 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-3"></div>
                <div className="h-3 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
            <p className="text-red-400 mb-2">Failed to load learning hub data</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
          <button
            onClick={refreshData}
            className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const getQuizContent = (challengeId: string) => {
    switch (challengeId) {
      case 'reasoning-quiz':
        return learningContent.quizzes.reasoningTechniques;
      case 'chaining-quiz':
        return learningContent.quizzes.promptChaining;
      case 'routing-quiz':
        return learningContent.quizzes.routingTechniques;
      case 'tool-use-quiz':
        return learningContent.quizzes.toolUse;
      case 'orchestration-quiz':
        return learningContent.quizzes.workflowOrchestration;
      case 'planning-quiz':
        return learningContent.quizzes.planningExecution;
      default:
        return [];
    }
  };

  const getFlashcardContent = (challengeId: string) => {
    switch (challengeId) {
      case 'reasoning-flashcards':
        return learningContent.flashcards.reasoningTechniques;
      case 'chaining-flashcards':
        return learningContent.flashcards.promptChaining;
      case 'routing-flashcards':
        return learningContent.flashcards.routingTechniques;
      case 'tool-use-flashcards':
        return learningContent.flashcards.toolUse;
      case 'orchestration-flashcards':
        return learningContent.flashcards.workflowOrchestration;
      case 'planning-flashcards':
        return learningContent.flashcards.planningExecution;
      default:
        return [];
    }
  };

  const getCodeChallengeContent = (challengeId: string) => {
    // Map learning module challenge IDs to actual code challenge IDs
    const challengeMapping: { [key: string]: string } = {
      'implement-tot': 'implement-tot-reasoning',
      'build-react-agent': 'implement-react-agent',
      'build-dynamic-router': 'implement-dynamic-routing'
    };
    
    const actualChallengeId = challengeMapping[challengeId] || challengeId;
    const challenge = learningContent.codeChallenges.find(c => c.id === actualChallengeId);
    return challenge || null;
  };

  const getPatternSelectionContent = (challengeId: string) => {
    return learningContent.patternSelectionChallenges;
  };

  const getAchievementDefinitions = (): Achievement[] => [
    // Completion Achievements
    { 
      id: 'completionist', 
      title: 'Completionist', 
      description: 'Complete 5 courses with 100% completion', 
      icon: Award, 
      category: 'completion',
      xpReward: 500,
      progress: { current: 0, required: 5 },
      rarity: 'legendary',
      unlockDate: '7/29/2025'
    },
    // Speed Achievements
    { 
      id: 'speed-demon', 
      title: 'Speed Demon', 
      description: 'Complete a course in under 24 hours', 
      icon: Zap, 
      category: 'speed',
      xpReward: 300,
      progress: { current: achievements.some(a => a.id === 'speed-demon') ? 1 : 0, required: 1 },
      rarity: 'epic',
      unlockDate: achievements.find(a => a.id === 'speed-demon')?.unlockedAt
    },
    { 
      id: 'speed-learner', 
      title: 'Speed Learner', 
      description: 'Complete 5 lessons in one day', 
      icon: Flame, 
      category: 'speed',
      xpReward: 200,
      progress: { current: 0, required: 5 },
      rarity: 'rare'
    },
    // Course Achievements
    { 
      id: 'course-master', 
      title: 'Course Master', 
      description: 'Complete an entire course', 
      icon: GraduationCap, 
      category: 'courses',
      xpReward: 200,
      progress: { current: achievements.some(a => a.id === 'course-master') ? 1 : 0, required: 1 },
      rarity: 'rare',
      unlockDate: achievements.find(a => a.id === 'course-master')?.unlockedAt
    },
    { 
      id: 'course-collector', 
      title: 'Course Collector', 
      description: 'Complete 10 different courses', 
      icon: BookOpen, 
      category: 'courses',
      xpReward: 400,
      progress: { current: 0, required: 10 },
      rarity: 'epic'
    },
    // Experience Achievements
    { 
      id: 'experience-hunter', 
      title: 'Experience Hunter', 
      description: 'Reach XP milestones', 
      icon: Star, 
      category: 'experience',
      xpReward: 0,
      progress: { current: totalXp, required: 1000 },
      rarity: 'common'
    },
    { 
      id: 'xp-master', 
      title: 'XP Master', 
      description: 'Earn 5000 total XP', 
      icon: Trophy, 
      category: 'experience',
      xpReward: 500,
      progress: { current: totalXp, required: 5000 },
      rarity: 'legendary'
    },
    // Streak Achievements
    { 
      id: 'week-streak', 
      title: 'Consistent Learner', 
      description: '7-day learning streak', 
      icon: Flame, 
      category: 'consistency',
      xpReward: 150,
      progress: { current: currentStreak, required: 7 },
      rarity: 'rare'
    },
    { 
      id: 'month-streak', 
      title: 'Dedication Master', 
      description: '30-day learning streak', 
      icon: Medal, 
      category: 'consistency',
      xpReward: 500,
      progress: { current: currentStreak, required: 30 },
      rarity: 'legendary'
    },
    // Challenge Achievements
    { 
      id: 'first-steps', 
      title: 'First Steps', 
      description: 'Complete your first challenge', 
      icon: Play, 
      category: 'milestones',
      xpReward: 50,
      progress: { current: completedChallenges.length > 0 ? 1 : 0, required: 1 },
      rarity: 'common'
    },
    { 
      id: 'code-master', 
      title: 'Code Master', 
      description: 'Complete 10 coding challenges', 
      icon: Code, 
      category: 'challenges',
      xpReward: 300,
      progress: { current: completedChallenges.filter(id => id.includes('build') || id.includes('implement')).length, required: 10 },
      rarity: 'epic'
    },
    { 
      id: 'pattern-expert', 
      title: 'Pattern Expert', 
      description: 'Master all design patterns', 
      icon: Brain, 
      category: 'mastery',
      xpReward: 600,
      progress: { current: 0, required: 20 },
      rarity: 'legendary'
    },
    { 
      id: 'system-architect', 
      title: 'System Architect', 
      description: 'Build 5 complete systems', 
      icon: Target, 
      category: 'mastery',
      xpReward: 800,
      progress: { current: 0, required: 5 },
      rarity: 'mythic'
    },
  ];

  const renderAchievements = () => {
    const allAchievements = getAchievementDefinitions();
    const achievementsByCategory = allAchievements.reduce((acc, achievement) => {
      if (!acc[achievement.category]) {
        acc[achievement.category] = [];
      }
      acc[achievement.category].push(achievement);
      return acc;
    }, {} as Record<string, Achievement[]>);

    const categoryNames: Record<string, string> = {
      completion: 'Completion Mastery',
      speed: 'Speed & Efficiency',
      courses: 'Course Progress',
      experience: 'Experience Points',
      consistency: 'Learning Consistency',
      milestones: 'Milestones',
      challenges: 'Challenge Completion',
      mastery: 'True Mastery'
    };

    const rarityColors = {
      common: 'from-gray-600 to-gray-500',
      rare: 'from-blue-600 to-blue-500',
      epic: 'from-purple-600 to-purple-500',
      legendary: 'from-yellow-600 to-yellow-500',
      mythic: 'from-rose-600 to-rose-500'
    };

    const rarityGlow = {
      common: '',
      rare: 'shadow-blue-500/20',
      epic: 'shadow-purple-500/30',
      legendary: 'shadow-yellow-500/40',
      mythic: 'shadow-rose-500/50'
    };

    const getProgressPercentage = (achievement: Achievement) => {
      if (achievement.progress.required === 0) return 100;
      return Math.min((achievement.progress.current / achievement.progress.required) * 100, 100);
    };

    const isUnlocked = (achievement: Achievement) => {
      return achievement.progress.current >= achievement.progress.required;
    };

    const totalAchievements = allAchievements.length;
    const unlockedAchievements = allAchievements.filter(a => isUnlocked(a)).length;
    const overallProgress = (unlockedAchievements / totalAchievements) * 100;

    return (
      <div className="space-y-8">
        {/* Header with Trophy */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
            <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
              {unlockedAchievements}
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Your Achievements</h2>
          <p className="text-gray-400 mb-4">Unlock achievements by completing challenges and reaching milestones</p>
          
          {/* Overall Progress */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Overall Progress</span>
              <span className="text-white font-medium">{unlockedAchievements}/{totalAchievements} Unlocked</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <motion.div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-1000 ease-out"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Achievement Categories */}
        <div className="space-y-8">
          {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <div className="w-2 h-6 bg-rose-400 rounded-full mr-3" />
                {categoryNames[category]}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryAchievements.map((achievement) => {
                  const progress = getProgressPercentage(achievement);
                  const unlocked = isUnlocked(achievement);
                  const Icon = achievement.icon;
                  
                  return (
                    <motion.div
                      key={achievement.id}
                      className={`relative bg-gray-800/50 rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
                        unlocked 
                          ? `border-transparent bg-gradient-to-br ${rarityColors[achievement.rarity]} p-[1px]` 
                          : 'border-gray-700 hover:border-gray-600'
                      } ${unlocked ? `shadow-lg ${rarityGlow[achievement.rarity]}` : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`bg-gray-900 rounded-xl p-6 h-full relative ${
                        unlocked ? 'bg-opacity-95' : 'bg-opacity-50'
                      }`}>
                        {/* Glow effect for unlocked achievements */}
                        {unlocked && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30 pointer-events-none rounded-xl" />
                        )}
                        {/* Unlock Badge */}
                        {unlocked && (
                          <div className="absolute top-2 right-2">
                            <div className="bg-green-500 rounded-full p-1">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                        
                        {/* Icon */}
                        <div className={`relative mb-4 ${
                          unlocked ? '' : 'opacity-50 grayscale'
                        }`}>
                          <div className={`p-4 rounded-full inline-block relative ${
                            unlocked
                              ? `bg-gradient-to-br ${rarityColors[achievement.rarity]} ${achievement.rarity === 'legendary' || achievement.rarity === 'mythic' ? 'animate-pulse' : ''}`
                              : 'bg-gray-700'
                          }`}>
                            <Icon className="w-8 h-8 text-white" />
                            {unlocked && (achievement.rarity === 'legendary' || achievement.rarity === 'mythic') && (
                              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${rarityColors[achievement.rarity]} blur-xl opacity-50`} />
                            )}
                          </div>
                          {!unlocked && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Lock className="w-6 h-6 text-gray-500" />
                            </div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <h4 className={`font-semibold mb-2 ${
                          unlocked ? 'text-white' : 'text-gray-400'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">
                          {achievement.description}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Progress</span>
                            <span className={unlocked ? 'text-green-400' : 'text-gray-400'}>
                              {achievement.progress.current}/{achievement.progress.required}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                unlocked 
                                  ? 'bg-gradient-to-r from-green-400 to-green-500' 
                                  : 'bg-gradient-to-r from-blue-400 to-blue-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                        
                        {/* Rewards */}
                        <div className="mt-4 flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            achievement.rarity === 'common' ? 'bg-gray-700 text-gray-300' :
                            achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                            achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                            achievement.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-rose-500/20 text-rose-400'
                          }`}>
                            {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                          </span>
                          {achievement.xpReward > 0 && (
                            <span className="text-xs text-gray-400 flex items-center">
                              <Zap className="w-3 h-3 mr-1" />
                              +{achievement.xpReward} XP
                            </span>
                          )}
                        </div>
                        
                        {/* Unlock Date */}
                        {unlocked && achievement.unlockDate && (
                          <div className="mt-2 text-xs text-gray-500 text-center">
                            Unlocked {new Date(achievement.unlockDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats Summary */}
        <div className="mt-12 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Achievement Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{unlockedAchievements}</div>
              <div className="text-sm text-gray-400">Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{totalAchievements - unlockedAchievements}</div>
              <div className="text-sm text-gray-400">Locked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {allAchievements.filter(a => isUnlocked(a) && a.xpReward > 0).reduce((sum, a) => sum + a.xpReward, 0)}
              </div>
              <div className="text-sm text-gray-400">XP Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{Math.round(overallProgress)}%</div>
              <div className="text-sm text-gray-400">Complete</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();

    return (
      <div className="space-y-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 rounded-xl p-4 md:p-6 border border-gray-700 relative overflow-hidden"
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="text-base md:text-lg font-semibold text-white">Your Level</h3>
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                </motion.div>
              </div>
              <motion.div 
                className="text-xl md:text-2xl font-bold text-white mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                Level {level}
              </motion.div>
              <div className="text-sm text-gray-400 mb-3">
                {currentLevel.title}
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 md:h-3 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 md:h-3 rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((totalXp / nextLevel.xpRequired) * 100, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                </motion.div>
              </div>
              <div className="text-xs md:text-sm text-gray-400 mt-2">
                {totalXp} / {nextLevel.xpRequired} XP to next level
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 rounded-xl p-4 md:p-6 border border-gray-700 relative overflow-hidden"
          >
            {/* Animated particles */}
            <AnimatePresence>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  initial={{ 
                    x: Math.random() * 100, 
                    y: 100,
                    opacity: 0 
                  }}
                  animate={{ 
                    x: Math.random() * 100, 
                    y: -20,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              ))}
            </AnimatePresence>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="text-base md:text-lg font-semibold text-white">Experience Points</h3>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </motion.div>
              </div>
              <motion.div 
                className="text-xl md:text-2xl font-bold text-blue-400 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {totalXp} XP
              </motion.div>
              <div className="text-sm text-gray-400">
                Total earned
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 rounded-xl p-4 md:p-6 border border-gray-700 relative overflow-hidden"
          >
            {/* Animated flame glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="text-base md:text-lg font-semibold text-white">Learning Streak</h3>
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Flame className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
                </motion.div>
              </div>
              <motion.div 
                className="text-xl md:text-2xl font-bold text-orange-400 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {currentStreak} days
              </motion.div>
              <div className="text-sm text-gray-400">
                Keep it up!
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              Recent Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.slice(-4).map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                  <div className="p-2 bg-yellow-400/20 rounded-lg">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">{achievement.title}</h4>
                    <p className="text-gray-400 text-xs">{achievement.description}</p>
                    <p className="text-blue-400 text-xs">+{achievement.xpReward} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unlock Requirements Info */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Info className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">Module Progression System</h3>
              <p className="text-gray-300 text-sm mb-4">
                Complete challenges to earn XP and unlock advanced modules. Each module builds upon previous knowledge.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Reasoning Techniques</span>
                    <span className="text-green-400">✓ Unlocked</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Prompt Chaining</span>
                    <span className="text-green-400">✓ Unlocked</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Intelligent Routing</span>
                    <span className={totalXp >= 200 ? "text-green-400" : "text-yellow-400"}>
                      {totalXp >= 200 ? "✓ Unlocked" : "200 XP required"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Tool Use & Integration</span>
                    <span className={totalXp >= 350 ? "text-green-400" : "text-yellow-400"}>
                      {totalXp >= 350 ? "✓ Unlocked" : "350 XP required"}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Workflow Orchestration</span>
                    <span className={totalXp >= 600 ? "text-green-400" : "text-red-400"}>
                      {totalXp >= 600 ? "✓ Unlocked" : "600 XP required"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Planning & Execution</span>
                    <span className={totalXp >= 900 ? "text-green-400" : "text-red-400"}>
                      {totalXp >= 900 ? "✓ Unlocked" : "900 XP required"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Pattern Selection Mastery</span>
                    <span className={totalXp >= 1200 ? "text-green-400" : "text-purple-400"}>
                      {totalXp >= 1200 ? "✓ Unlocked" : "1200 XP required"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Recommendations */}
        {totalXp < 200 && (
          <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Target className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Next Goal: Unlock Intelligent Routing</h3>
                <p className="text-gray-300 text-sm mb-4">
                  You need <strong>{200 - totalXp} more XP</strong> to unlock the Intelligent Routing module. Here's the fastest path:
                </p>
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Recommended: Complete Reasoning Techniques</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">• Reasoning Patterns Flashcards</span>
                      <span className="text-blue-400">+40 XP (20 min)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">• Reasoning Techniques Quiz</span>
                      <span className="text-blue-400">+60 XP (25 min)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">• Build Tree of Thought System</span>
                      <span className="text-blue-400">+100 XP (60 min)</span>
                    </div>
                    <div className="border-t border-gray-600 pt-2 mt-2">
                      <div className="flex items-center justify-between font-medium">
                        <span className="text-white">Total:</span>
                        <span className="text-green-400">+200 XP → Unlocks Routing!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Activity
          </h3>
          {progress.length > 0 ? (
            <div className="space-y-3">
              {progress.slice(-3).map((progressItem) => (
                <div key={progressItem.id} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">
                    {progressItem.isCompleted ? 'Completed' : `Progress ${progressItem.progressPercentage}%`}: {progressItem.lessonId}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No completed challenges yet</p>
              <button
                onClick={() => setActiveView('learning')}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-base font-medium min-h-[44px] min-w-[120px]"
              >
                Start Learning
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderLearningModule = () => {
    const learningModule = learningModules.find(m => m.id === selectedModule);
    if (!learningModule) return null;

    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();

    // Calculate XP requirement for locked modules
    const getUnlockRequirement = (moduleId: string) => {
      switch (moduleId) {
        case 'routing-techniques': return 200;
        case 'tool-use': return 350;
        case 'workflow-orchestration': return 600;
        case 'planning-execution': return 900;
        case 'pattern-mastery': return 1200;
        default: return 0;
      }
    };

    const unlockRequirement = getUnlockRequirement(learningModule.id);
    const isUnlockable = learningModule.isLocked && totalXp >= unlockRequirement;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <button 
            onClick={() => setSelectedModule('')}
            className="text-rose-400 hover:text-rose-300 transition-colors"
          >
            ← Back to Learning
          </button>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-3 rounded-full ${getDifficultyColor(learningModule.difficulty)}`}>
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{learningModule.title}</h2>
              <p className="text-gray-400">{learningModule.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 mt-4">
            <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(learningModule.difficulty)}`}>
              {learningModule.difficulty}
            </span>
            <span className="text-sm text-gray-400 flex items-center">
              <Star className="w-4 h-4 mr-1" />
              {learningModule.xpReward} XP Total
            </span>
            <span className="text-sm text-gray-400 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {(learningModule.challenges || []).reduce((sum, c) => sum + c.timeEstimate, 0)} min
            </span>
          </div>
        </div>

        {/* Unlock Requirements */}
        {learningModule.isLocked && (
          <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-medium text-sm">Unlock Requirements</span>
            </div>
            <div className="text-sm text-gray-300">
              <div className="flex items-center justify-between">
                <span>Required XP:</span>
                <span className="font-medium">{unlockRequirement} XP</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Your XP:</span>
                <span className={totalXp >= unlockRequirement ? 'text-green-400' : 'text-red-400'}>
                  {totalXp} XP
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span>Still needed:</span>
                <span className="font-medium text-yellow-400">
                  {Math.max(0, unlockRequirement - totalXp)} XP
                </span>
              </div>
            </div>
            {totalXp >= unlockRequirement && (
              <div className="mt-2 text-xs text-green-400">
                ✨ Ready to unlock! Complete any challenge to activate.
              </div>
            )}
          </div>
        )}

        <div className="grid gap-4">
          {(learningModule.challenges || []).map((challenge) => {
            const Icon = getChallengeIcon(challenge.type);
            return (
              <div 
                key={challenge.id}
                className="bg-gray-800/50 rounded-xl p-4 md:p-6 border border-gray-600 hover:bg-gray-700/50 transition-all cursor-pointer min-h-[80px] md:min-h-[auto]"
                onClick={() => handleChallengeStart(challenge)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-rose-400/20 rounded-lg">
                      <Icon className="w-6 h-6 text-rose-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{challenge.title}</h3>
                      <p className="text-gray-400 text-sm">{challenge.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          {challenge.xpReward} XP
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {challenge.timeEstimate} min
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {challenge.completed && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    <Play className="w-5 h-5 text-rose-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        {/* Title - Hidden on mobile */}
        <div className="hidden md:block">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Learning Hub</h1>
              <p className="text-gray-400">Master AI engineering through gamified challenges</p>
            </div>
            {loading && (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rose-500"></div>
            )}
          </div>
        </div>
        
        {/* Navigation - Always visible */}
        <div className="flex space-x-1 md:space-x-2 w-full md:w-auto">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-2 rounded-lg transition-all text-sm md:text-base ${
              activeView === 'dashboard' 
                ? 'bg-rose-400 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <span className="hidden sm:inline">Dashboard</span>
            <Star className="w-4 h-4 sm:hidden mx-auto" />
          </button>
          <button
            onClick={() => {
              setActiveView('learning');
              setSelectedModule('');
            }}
            className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-2 rounded-lg transition-all text-sm md:text-base ${
              activeView === 'learning' 
                ? 'bg-rose-400 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <span className="hidden sm:inline">Learning</span>
            <BookOpen className="w-4 h-4 sm:hidden mx-auto" />
          </button>
          <button
            onClick={() => setActiveView('achievements')}
            className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-2 rounded-lg transition-all text-sm md:text-base ${
              activeView === 'achievements' 
                ? 'bg-rose-400 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <span className="hidden sm:inline">Achievements</span>
            <Trophy className="w-4 h-4 sm:hidden mx-auto" />
          </button>
          <button
            onClick={() => setActiveView('certification')}
            className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-2 rounded-lg transition-all text-sm md:text-base ${
              activeView === 'certification' 
                ? 'bg-rose-400 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <span className="hidden sm:inline">Certification</span>
            <Medal className="w-4 h-4 sm:hidden mx-auto" />
          </button>
        </div>
      </div>

      {/* Content */}
      {activeView === 'dashboard' && renderDashboard()}
      
      {/* Learning Modules */}
      {activeView === 'learning' && !selectedModule && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Learning Modules</h2>
            <div className="text-sm text-gray-400">
              {totalXp} XP • Level {level}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningModules.map((module, index) => {
              const completedChallenges = module.challenges.filter(c => c.completed).length;
              const totalChallenges = module.challenges.length;
              const progress = totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0;
              
              // Calculate XP requirement for locked modules
              const getUnlockRequirement = (moduleId: string) => {
                switch (moduleId) {
                  case 'routing-techniques': return 200;
                  case 'tool-use': return 350;
                  case 'workflow-orchestration': return 600;
                  case 'planning-execution': return 900;
                  case 'pattern-mastery': return 1200;
                  default: return 0;
                }
              };

              const unlockRequirement = getUnlockRequirement(module.id);
              const isUnlockable = module.isLocked && totalXp >= unlockRequirement;
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!module.isLocked ? { scale: 1.03, borderColor: '#4B5563' } : {}}
                  className={`relative bg-gray-800/50 rounded-xl p-6 border transition-all ${
                    module.isLocked 
                      ? 'border-gray-600 opacity-75' 
                      : 'border-gray-700 hover:border-gray-600 cursor-pointer'
                  }`}
                  onClick={() => !module.isLocked && setSelectedModule(module.id)}
                >
                  {/* Lock Overlay */}
                  {module.isLocked && (
                    <motion.div 
                      className="absolute top-4 right-4"
                      animate={isUnlockable ? {
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      <div className={`p-2 rounded-lg ${isUnlockable ? 'bg-yellow-500/20' : 'bg-gray-700/80'}`}>
                        <Lock className={`w-4 h-4 ${isUnlockable ? 'text-yellow-400' : 'text-gray-400'}`} />
                      </div>
                    </motion.div>
                  )}

                  {/* Sparkle effect for unlocked modules */}
                  {!module.isLocked && progress < 100 && (
                    <AnimatePresence>
                      {[...Array(2)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full"
                          initial={{ 
                            x: Math.random() * 200, 
                            y: Math.random() * 100,
                            opacity: 0 
                          }}
                          animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 1,
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                        />
                      ))}
                    </AnimatePresence>
                  )}

                  {/* Module Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 ${module.isLocked ? 'text-gray-400' : 'text-white'}`}>
                        {module.title}
                      </h3>
                      <p className={`text-sm ${module.isLocked ? 'text-gray-500' : 'text-gray-300'}`}>
                        {module.description}
                      </p>
                    </div>
                  </div>

                  {/* Unlock Requirements */}
                  {module.isLocked && (
                    <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Info className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-medium text-sm">Unlock Requirements</span>
                      </div>
                      <div className="text-sm text-gray-300">
                        <div className="flex items-center justify-between">
                          <span>Required XP:</span>
                          <span className="font-medium">{unlockRequirement} XP</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Your XP:</span>
                          <span className={totalXp >= unlockRequirement ? 'text-green-400' : 'text-red-400'}>
                            {totalXp} XP
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span>Still needed:</span>
                          <span className="font-medium text-yellow-400">
                            {Math.max(0, unlockRequirement - totalXp)} XP
                          </span>
                        </div>
                      </div>
                      {totalXp >= unlockRequirement && (
                        <div className="mt-2 text-xs text-green-400">
                          ✨ Ready to unlock! Complete any challenge to activate.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Module Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className={`text-sm ${module.isLocked ? 'text-gray-500' : 'text-gray-400'}`}>Difficulty</p>
                      <p className={`font-medium ${getDifficultyColor(module.difficulty)} ${module.isLocked ? 'opacity-50' : ''}`}>
                        {module.difficulty}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className={`text-sm ${module.isLocked ? 'text-gray-500' : 'text-gray-400'}`}>Max XP</p>
                      <p className={`font-medium ${module.isLocked ? 'text-gray-500' : 'text-blue-400'}`}>
                        {module.xpReward}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className={`text-sm ${module.isLocked ? 'text-gray-500' : 'text-gray-400'}`}>Challenges</p>
                      <p className={`font-medium ${module.isLocked ? 'text-gray-500' : 'text-white'}`}>
                        {totalChallenges}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {!module.isLocked && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">{completedChallenges}/{totalChallenges}</span>
                          {progress === 100 && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            >
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className={`h-2 rounded-full relative ${
                            progress === 100 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                              : 'bg-gradient-to-r from-blue-500 to-purple-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1,
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {!module.isLocked && (
                    <button
                      onClick={() => setSelectedModule(module.id)}
                      className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 text-base font-medium min-h-[44px]"
                    >
                      <span>{progress === 100 ? 'Review' : 'Continue'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Module View */}
      {activeView === 'learning' && selectedModule && renderLearningModule()}

      {activeView === 'challenge' && selectedChallenge && (
        <>
          {/* Saving indicator and error notification */}
          {(savingProgress || saveError || saveSuccess) && (
            <div className="fixed top-20 right-4 z-50 max-w-md">
              {savingProgress && (
                <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mb-4 flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                  <p className="text-blue-300">Saving your progress...</p>
                </div>
              )}
              {saveSuccess && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4 flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <p className="text-green-300">Progress saved successfully!</p>
                </div>
              )}
              {saveError && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-red-300 font-medium mb-1">Failed to save progress</p>
                      <p className="text-red-200 text-sm mb-3">{saveError}</p>
                      <button
                        onClick={() => {
                          setSaveError(null);
                          if (selectedChallenge) {
                            // Retry with same values - challenge was completed
                            handleChallengeComplete(selectedChallenge.id, 100, selectedChallenge.xpReward);
                          }
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                      >
                        Retry Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {selectedChallenge.type === 'quiz' && (
            <QuizComponent
              questions={getQuizContent(selectedChallenge.id)}
              title={selectedChallenge.title}
              description={selectedChallenge.description}
              xpReward={selectedChallenge.xpReward}
              timeLimit={selectedChallenge.timeEstimate * 60} // Convert minutes to seconds
              onComplete={(score, xpEarned) => handleChallengeComplete(selectedChallenge.id, score, xpEarned)}
              onExit={handleChallengeExit}
            />
          )}
          {selectedChallenge.type === 'flashcard' && (
            <FlashcardComponent
              flashcards={getFlashcardContent(selectedChallenge.id)}
              title={selectedChallenge.title}
              description={selectedChallenge.description}
              xpReward={selectedChallenge.xpReward}
              onComplete={(score, xpEarned) => handleChallengeComplete(selectedChallenge.id, score, xpEarned)}
              onExit={handleChallengeExit}
            />
          )}
          {selectedChallenge.type === 'code' && (
            <CodeChallengeComponent
              challenge={getCodeChallengeContent(selectedChallenge.id) || learningContent.codeChallenges[0]}
              xpReward={selectedChallenge.xpReward}
              onComplete={(score, xpEarned) => handleChallengeComplete(selectedChallenge.id, score, xpEarned)}
              onExit={handleChallengeExit}
            />
          )}
          {selectedChallenge.type === 'pattern-select' && (
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
              <div className="text-center mb-8">
                <Target className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">{selectedChallenge.title}</h2>
                <p className="text-gray-400 mb-6">{selectedChallenge.description}</p>
                
                <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Available Pattern Selection Challenges:</h3>
                  <div className="space-y-4">
                    {learningContent.patternSelectionChallenges.map((challenge) => (
                      <div key={challenge.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">{challenge.scenario}</h4>
                            <p className="text-gray-400 text-sm">{challenge.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                                {challenge.difficulty}
                              </span>
                              <span className="text-xs text-gray-500">{challenge.options.length} options</span>
                            </div>
                          </div>
                          <Target className="w-8 h-8 text-purple-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-gray-400 mb-6">
                  Interactive pattern selection challenges are coming soon! You'll analyze real-world 
                  scenarios and choose the optimal agentic design patterns.
                </p>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleChallengeExit}
                  className="px-8 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                >
                  Back to Learning
                </button>
              </div>
            </div>
          )}
          {selectedChallenge.type === 'system-build' && (
            <div className="text-center py-20">
              <Award className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">System Building Challenge</h2>
              <p className="text-gray-400 mb-6">
                Design and architect complete AI systems using multiple agentic design patterns. 
                These advanced challenges will test your ability to create production-ready AI solutions.
              </p>
              <p className="text-gray-400 mb-6">Interactive system building challenges coming soon!</p>
              <button
                onClick={handleChallengeExit}
                className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
              >
                Back to Learning
              </button>
            </div>
          )}
        </>
      )}
      {activeView === 'achievements' && renderAchievements()}
      {activeView === 'certification' && (
        <div className="text-center py-20">
          <Medal className="w-16 h-16 text-rose-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">AI Engineer Certification</h2>
          <p className="text-gray-400 mb-6">Complete all modules to unlock certification!</p>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 max-w-md mx-auto">
            <h3 className="text-white font-semibold mb-4">Certification Progress</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Modules Completed</span>
                <span className="text-blue-400">
                  {learningModules.filter(m => !m.isLocked).length} / {learningModules.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Total XP</span>
                <span className="text-blue-400">{totalXp} XP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Current Level</span>
                <span className="text-blue-400">Level {level}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};