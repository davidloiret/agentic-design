"use client"

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
  MessageSquare,
  Shield,
  ChevronRight,
  BarChart,
  Users,
  TrendingUp,
  Moon,
  Sun,
  Sparkles,
  Swords,
  Map,
  Compass,
  Flag,
  Gift
} from 'lucide-react';
import { useLearningHub } from '@/contexts/LearningHubContext';
import { QuizComponent } from './learning/QuizComponent';
import { FlashcardComponent } from './learning/FlashcardComponent';
import { CodeChallengeComponent } from './learning/CodeChallengeComponent';
import { TheoryLessonComponent } from './learning/TheoryLessonComponent';
import { BrainMascot } from '@/components/BrainMascot';
import { learningContent } from '../data/learning-content';
import { theoryLessons } from '../data/knowledge-representation';
import { promptingTheoryLessons } from '../data/master-prompting';
import {
  introductionToRedTeamingLesson,
  promptInjectionJailbreakingLesson,
  adversarialTestingPatternsLesson,
  securityEvaluationFrameworksLesson,
  defenseMechanismsLesson
} from '../data/ai-red-teaming';
import { allJourneys, Journey, Chapter, Lesson, achievements as journeyAchievements } from '../data/learning-journeys';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion } from '../data/types';

// Red Teaming Theory Lessons mapping
const redTeamingTheoryLessons: { [key: string]: any } = {
  'introduction-to-red-teaming': introductionToRedTeamingLesson,
  'prompt-injection-jailbreaking': promptInjectionJailbreakingLesson,
  'adversarial-testing-patterns': adversarialTestingPatternsLesson,
  'security-evaluation-frameworks': securityEvaluationFrameworksLesson,
  'defense-mechanisms': defenseMechanismsLesson
};

interface LearningHubJourneyProps {
  techniques?: any[];
  categories?: any[];
}

const LEVELS = [
  { level: 1, title: 'Novice Explorer', xpRequired: 0, color: 'text-gray-400' },
  { level: 2, title: 'Apprentice Learner', xpRequired: 100, color: 'text-green-400' },
  { level: 3, title: 'Knowledge Seeker', xpRequired: 300, color: 'text-blue-400' },
  { level: 4, title: 'Pattern Practitioner', xpRequired: 600, color: 'text-purple-400' },
  { level: 5, title: 'AI Engineer', xpRequired: 1200, color: 'text-orange-400' },
  { level: 6, title: 'System Architect', xpRequired: 2500, color: 'text-red-400' },
  { level: 7, title: 'Master Builder', xpRequired: 5000, color: 'text-yellow-400' },
  { level: 8, title: 'Innovation Leader', xpRequired: 8000, color: 'text-pink-400' },
  { level: 9, title: 'AI Visionary', xpRequired: 12000, color: 'text-indigo-400' },
  { level: 10, title: 'Legendary Master', xpRequired: 20000, color: 'text-rose-400' },
];

const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    MessageSquare,
    Brain,
    Shield,
    Trophy,
    Star,
    Flame,
    Zap,
    Moon,
    Sun,
    Award
  };
  return icons[iconName] || BookOpen;
};

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

export const LearningHubJourney: React.FC<LearningHubJourneyProps> = ({ techniques = [], categories = [] }) => {
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

  // View states
  const [activeView, setActiveView] = useState<'dashboard' | 'journeys' | 'journey-detail' | 'chapter' | 'lesson' | 'achievements' | 'certification' | 'leaderboard'>('dashboard');
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  // Journey-specific progress tracking
  const [journeyProgress, setJourneyProgress] = useState<{ [journeyId: string]: {
    completedChapters: string[],
    completedLessons: string[],
    totalXp: number,
    currentChapter?: string
  } }>({});

  // Initialize journey progress from backend data
  useEffect(() => {
    if (progress && progress.length > 0) {
      const newJourneyProgress: typeof journeyProgress = {};

      // Group progress by journey
      progress.forEach(p => {
        if (p.journeyId) {
          if (!newJourneyProgress[p.journeyId]) {
            newJourneyProgress[p.journeyId] = {
              completedChapters: [],
              completedLessons: [],
              totalXp: 0
            };
          }

          // Add completed lesson if it's completed
          if (p.isCompleted && p.lessonId && !newJourneyProgress[p.journeyId].completedLessons.includes(p.lessonId)) {
            newJourneyProgress[p.journeyId].completedLessons.push(p.lessonId);
          }

          // Check if chapter is complete
          if (p.chapterId && p.isCompleted) {
            const journey = allJourneys.find(j => j.id === p.journeyId);
            const chapter = journey?.chapters.find(c => c.id === p.chapterId);
            if (chapter) {
              const allLessonsComplete = chapter.lessons.every(l =>
                progress.some(prog =>
                  prog.journeyId === p.journeyId &&
                  prog.chapterId === p.chapterId &&
                  prog.lessonId === l.id &&
                  prog.isCompleted
                )
              );

              if (allLessonsComplete && !newJourneyProgress[p.journeyId].completedChapters.includes(p.chapterId)) {
                newJourneyProgress[p.journeyId].completedChapters.push(p.chapterId);
              }
            }
          }
        }
      });

      setJourneyProgress(newJourneyProgress);
    }
  }, [progress]);

  const getCurrentLevel = () => {
    return LEVELS.reduce((prev, current) => 
      totalXp >= current.xpRequired ? current : prev
    );
  };

  const getNextLevel = () => {
    return LEVELS.find(level => level.xpRequired > totalXp) || LEVELS[LEVELS.length - 1];
  };

  const getJourneyIcon = (journey: Journey) => {
    const Icon = getIconComponent(journey.icon);
    return <Icon className="w-6 h-6" />;
  };

  const getJourneyColor = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      red: 'from-red-500 to-red-600',
      green: 'from-green-500 to-green-600'
    };
    return colors[color] || 'from-gray-500 to-gray-600';
  };

  const isJourneyUnlocked = (journey: Journey) => {
    // Dev mode: unlock all journeys for testing
    if (process.env.NEXT_PUBLIC_DEV_XP_BOOST === 'true') return true;

    if (!journey.unlockRequirements) return true;

    const { level: requiredLevel, completedJourneys } = journey.unlockRequirements;

    if (requiredLevel && level < requiredLevel) return false;
    if (completedJourneys) {
      return completedJourneys.every(jId =>
        journeyProgress[jId]?.completedChapters.length ===
        allJourneys.find(j => j.id === jId)?.chapters.length
      );
    }

    return true;
  };

  const getChapterProgress = (chapterId: string, journeyId: string) => {
    const progress = journeyProgress[journeyId];
    if (!progress) return 0;

    const chapter = selectedJourney?.chapters.find(c => c.id === chapterId);
    if (!chapter) return 0;

    const completedLessons = chapter.lessons.filter(l =>
      progress.completedLessons.includes(l.id)
    ).length;

    return (completedLessons / chapter.lessons.length) * 100;
  };

  // Breadcrumb navigation component
  const renderBreadcrumbs = () => {
    const breadcrumbs: { label: string; onClick: (() => void) | null; isActive: boolean }[] = [];

    // Always start with Learning Hub
    breadcrumbs.push({
      label: 'Learning Hub',
      onClick: () => {
        setSelectedJourney(null);
        setSelectedChapter(null);
        setSelectedLesson(null);
        setActiveView('dashboard');
      },
      isActive: activeView === 'dashboard'
    });

    // Add journey if selected
    if (selectedJourney && (activeView === 'journey-detail' || activeView === 'chapter' || activeView === 'lesson')) {
      breadcrumbs.push({
        label: selectedJourney.title,
        onClick: () => {
          setSelectedChapter(null);
          setSelectedLesson(null);
          setActiveView('journey-detail');
        },
        isActive: activeView === 'journey-detail'
      });
    }

    // Add chapter if selected
    if (selectedChapter && (activeView === 'chapter' || activeView === 'lesson')) {
      breadcrumbs.push({
        label: selectedChapter.title,
        onClick: () => {
          setSelectedLesson(null);
          setActiveView('chapter');
        },
        isActive: activeView === 'chapter'
      });
    }

    // Add lesson if selected
    if (selectedLesson && activeView === 'lesson') {
      breadcrumbs.push({
        label: selectedLesson.title,
        onClick: null, // Current page, not clickable
        isActive: true
      });
    }

    // Add achievements/certification if on those views
    if (activeView === 'achievements') {
      breadcrumbs.push({
        label: 'Achievements',
        onClick: null,
        isActive: true
      });
    }

    if (activeView === 'certification') {
      breadcrumbs.push({
        label: 'Certification',
        onClick: null,
        isActive: true
      });
    }

    // Only render if there are 2+ breadcrumbs (not just dashboard)
    if (breadcrumbs.length === 1) return null;

    return (
      <div className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/50 -mx-6 mb-6">
        <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
              {crumb.onClick ? (
                <button
                  onClick={crumb.onClick}
                  className={`transition-colors ${
                    crumb.isActive
                      ? 'text-white font-medium'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-white font-medium">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    );
  };

  const handleLessonComplete = async (lessonId: string, score: number, xpEarned: number) => {
    if (!selectedJourney || !selectedChapter) return;

    // Update local progress
    const newProgress = { ...journeyProgress };
    if (!newProgress[selectedJourney.id]) {
      newProgress[selectedJourney.id] = {
        completedChapters: [],
        completedLessons: [],
        totalXp: 0
      };
    }
    
    if (!newProgress[selectedJourney.id].completedLessons.includes(lessonId)) {
      newProgress[selectedJourney.id].completedLessons.push(lessonId);
      newProgress[selectedJourney.id].totalXp += xpEarned;
    }

    // Check if chapter is complete
    const chapterLessons = selectedChapter.lessons.map(l => l.id);
    const chapterComplete = chapterLessons.every(id => 
      newProgress[selectedJourney.id].completedLessons.includes(id)
    );
    
    if (chapterComplete && !newProgress[selectedJourney.id].completedChapters.includes(selectedChapter.id)) {
      newProgress[selectedJourney.id].completedChapters.push(selectedChapter.id);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    setJourneyProgress(newProgress);

    // Update backend
    try {
      await updateProgress({
        xpEarned: 10, // Standard XP for lesson completion
        userId: '', // Will be filled by context
        courseId: selectedJourney.id,
        journeyId: selectedJourney.id,
        chapterId: selectedChapter.id,
        lessonId: lessonId,
        isCompleted: true,
        score: 100,
        completedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to update progress:', error);
    }

    // Return to chapter view
    setSelectedLesson(null);
    setActiveView('chapter');
  };

  const renderJourneySelection = () => {
    return (
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Learning Journey
            </h1>
            <p className="text-xl text-gray-300">
              Master AI engineering through gamified, hands-on learning paths
            </p>
          </motion.div>
        </div>

        {/* Level & Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 rounded-2xl p-6 mb-8 border border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{level}</div>
              <div className="text-sm text-gray-400">{getCurrentLevel().title}</div>
              <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalXp % (getNextLevel().xpRequired - getCurrentLevel().xpRequired)) / (getNextLevel().xpRequired - getCurrentLevel().xpRequired) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{totalXp}</div>
              <div className="text-sm text-gray-400">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">{currentStreak}</div>
              <div className="text-sm text-gray-400">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{achievements.length}</div>
              <div className="text-sm text-gray-400">Achievements</div>
            </div>
          </div>
        </motion.div>

        {/* Journey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {allJourneys.map((journey, index) => {
            const unlocked = isJourneyUnlocked(journey);
            const progress = journeyProgress[journey.id];
            const completionPercentage = progress 
              ? (progress.completedChapters.length / journey.chapters.length) * 100 
              : 0;

            return (
              <motion.div
                key={journey.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={unlocked ? { scale: 1.03 } : {}}
                className={`relative bg-gray-800/50 rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                  unlocked 
                    ? 'border-gray-600 hover:border-gray-500' 
                    : 'border-gray-700 opacity-75'
                }`}
                onClick={() => {
                  console.log('Journey clicked:', journey.id, 'unlocked:', unlocked);
                  if (unlocked) {
                    setSelectedJourney(journey);
                    setActiveView('journey-detail');
                    console.log('Journey detail view set for:', journey.title);
                  } else {
                    console.log('Journey is locked:', journey.id);
                  }
                }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getJourneyColor(journey.color)} opacity-10`} />
                
                {/* Lock Badge */}
                {!unlocked && (
                  <div className="absolute top-4 right-4 bg-gray-900/80 rounded-lg p-2">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                )}

                {/* Content */}
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${getJourneyColor(journey.color)}`}>
                      {getJourneyIcon(journey)}
                    </div>
                    {completionPercentage === 100 && (
                      <div className="bg-green-500/20 rounded-full p-2">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{journey.title}</h3>
                  <div className="text-gray-300 mb-6 prose prose-sm prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{journey.description}</ReactMarkdown>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Chapters</span>
                      <span className="text-white font-medium">{journey.chapters.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Total XP</span>
                      <span className="text-blue-400 font-medium">{journey.totalXpReward}</span>
                    </div>
                    {journey.badge && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Reward</span>
                        <span className="text-yellow-400 font-medium">{journey.badge.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {unlocked && progress && (
                    <div className="mt-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">{Math.round(completionPercentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${completionPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Unlock Requirements */}
                  {!unlocked && journey.unlockRequirements && (
                    <div className="mt-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="text-sm text-yellow-400 font-medium mb-2">Unlock Requirements:</div>
                      {journey.unlockRequirements.level && (
                        <div className="text-sm text-gray-300">
                          • Reach Level {journey.unlockRequirements.level}
                        </div>
                      )}
                      {journey.unlockRequirements.completedJourneys && (
                        <div className="text-sm text-gray-300">
                          • Complete: {journey.unlockRequirements.completedJourneys.join(', ')}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                      unlocked 
                        ? 'bg-gradient-to-r ' + getJourneyColor(journey.color) + ' text-white hover:opacity-90'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!unlocked}
                  >
                    <span>{completionPercentage > 0 ? 'Continue Journey' : 'Start Journey'}</span>
                    {unlocked && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setActiveView('leaderboard')}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all flex items-center space-x-4"
          >
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <BarChart className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="text-left">
              <h4 className="text-white font-medium">Leaderboard</h4>
              <p className="text-sm text-gray-400">Compare with others</p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setActiveView('achievements')}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all flex items-center space-x-4"
          >
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-left">
              <h4 className="text-white font-medium">Achievements</h4>
              <p className="text-sm text-gray-400">View your badges</p>
            </div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 flex items-center space-x-4"
          >
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-left">
              <h4 className="text-white font-medium">Study Groups</h4>
              <p className="text-sm text-gray-400">Coming soon</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  const renderJourneyDetail = () => {
    if (!selectedJourney) return null;

    const progress = journeyProgress[selectedJourney.id];
    const completedChapters = progress?.completedChapters.length || 0;

    return (
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        {renderBreadcrumbs()}

        {/* Journey Header */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <div className={`p-4 rounded-xl bg-gradient-to-br ${getJourneyColor(selectedJourney.color)}`}>
                {getJourneyIcon(selectedJourney)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{selectedJourney.title}</h1>
                <div className="text-gray-300 text-lg mb-4 prose prose-lg prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedJourney.description}</ReactMarkdown>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{selectedJourney.chapters.length} Chapters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{selectedJourney.totalXpReward} Total XP</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{completedChapters}/{selectedJourney.chapters.length} Complete</span>
                  </div>
                </div>
              </div>
            </div>
            {selectedJourney.badge && (
              <div className="text-center">
                <div className="p-4 bg-gray-700/50 rounded-xl">
                  <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-300">Journey Badge</div>
                  <div className="text-white font-medium">{selectedJourney.badge.name}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chapter List */}
        <div className="space-y-4">
          {selectedJourney.chapters.map((chapter, index) => {
            // Dev mode: unlock all chapters for testing
            const isUnlocked = process.env.NEXT_PUBLIC_DEV_XP_BOOST === 'true' ||
                               !chapter.unlockAfter ||
                               progress?.completedChapters.includes(chapter.unlockAfter);
            const chapterProgress = getChapterProgress(chapter.id, selectedJourney.id);
            const isComplete = chapterProgress === 100;

            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-800/50 rounded-xl border transition-all ${
                  isUnlocked 
                    ? 'border-gray-600 hover:border-gray-500 cursor-pointer' 
                    : 'border-gray-700 opacity-60'
                }`}
                onClick={() => {
                  if (isUnlocked) {
                    setSelectedChapter(chapter);
                    setActiveView('chapter');
                  }
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      {/* Chapter Number */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        isComplete 
                          ? 'bg-green-500/20 text-green-400' 
                          : isUnlocked 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-gray-700 text-gray-500'
                      }`}>
                        {isComplete ? <CheckCircle className="w-6 h-6" /> : chapter.order}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{chapter.title}</h3>
                        <div className="text-gray-300 mb-4 prose prose-sm prose-invert max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{chapter.description}</ReactMarkdown>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{chapter.lessons.length} Lessons</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{chapter.xpReward} XP</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{chapter.estimatedTime} min</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!isUnlocked && (
                      <div className="bg-gray-700/50 rounded-lg p-2">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {isUnlocked && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">{Math.round(chapterProgress)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${
                            isComplete 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                              : 'bg-gradient-to-r from-blue-500 to-purple-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${chapterProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Lock Message */}
                  {!isUnlocked && chapter.unlockAfter && (
                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="text-sm text-yellow-400">
                        Complete "{selectedJourney.chapters.find(c => c.id === chapter.unlockAfter)?.title}" to unlock
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderChapterView = () => {
    if (!selectedChapter || !selectedJourney) return null;

    const progress = journeyProgress[selectedJourney.id];
    const completedLessons = progress?.completedLessons || [];

    return (
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        {renderBreadcrumbs()}

        {/* Chapter Header */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-400">{selectedChapter.order}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{selectedChapter.title}</h1>
              <div className="text-gray-300 prose prose-base prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedChapter.description}</ReactMarkdown>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{selectedChapter.lessons.length} Lessons</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{selectedChapter.xpReward} XP Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{selectedChapter.estimatedTime} min Total</span>
            </div>
          </div>
        </div>

        {/* Lesson List */}
        <div className="space-y-4">
          {selectedChapter.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            // Dev mode: unlock all lessons for testing
            const isLocked = process.env.NEXT_PUBLIC_DEV_XP_BOOST === 'true'
              ? false
              : index > 0 && !completedLessons.includes(selectedChapter.lessons[index - 1].id);
            
            const getDifficultyColor = (difficulty: string) => {
              switch (difficulty) {
                case 'beginner': return 'text-green-400 bg-green-400/10';
                case 'intermediate': return 'text-yellow-400 bg-yellow-400/10';
                case 'advanced': return 'text-orange-400 bg-orange-400/10';
                case 'expert': return 'text-red-400 bg-red-400/10';
                default: return 'text-gray-400 bg-gray-400/10';
              }
            };

            const getLessonIcon = (type: string) => {
              switch (type) {
                case 'theory': return BookOpen;
                case 'flashcard': return Sparkles;
                case 'quiz': return Brain;
                case 'code': return Code;
                case 'pattern-select': return Target;
                case 'case-study': return Compass;
                case 'sandbox': return Play;
                default: return BookOpen;
              }
            };

            const LessonIcon = getLessonIcon(lesson.type);

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-800/50 rounded-xl border transition-all ${
                  !isLocked 
                    ? 'border-gray-600 hover:border-gray-500 cursor-pointer' 
                    : 'border-gray-700 opacity-60'
                }`}
                onClick={() => {
                  if (!isLocked) {
                    setSelectedLesson(lesson);
                    setActiveView('lesson');
                  }
                }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        isCompleted 
                          ? 'bg-green-500/20' 
                          : 'bg-gray-700/50'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                          <LessonIcon className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-1">{lesson.title}</h3>
                        <div className="text-gray-400 text-sm mb-3 prose prose-sm prose-invert max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.description}</ReactMarkdown>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
                            {lesson.difficulty}
                          </span>
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <Star className="w-3 h-3" />
                            <span>{lesson.xpReward} XP</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.estimatedTime} min</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
                      {!isLocked && !isCompleted && <Play className="w-5 h-5 text-blue-400" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Chapter Completion Reward */}
        {selectedChapter.badge && (
          <div className="mt-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Gift className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Chapter Completion Reward</h4>
                <p className="text-gray-300 text-sm">
                  Complete all lessons to earn the <span className="text-yellow-400">{selectedChapter.badge.name}</span> badge!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const getQuizContent = (challengeId: string): QuizQuestion[] => {
    let content;
    switch (challengeId) {
      case 'reasoning-quiz':
        content = learningContent.quizzes.reasoningTechniques;
        break;
      case 'chaining-quiz':
        content = learningContent.quizzes.promptChaining;
        break;
      case 'routing-quiz':
        content = learningContent.quizzes.routingTechniques;
        break;
      case 'tool-use-quiz':
        content = learningContent.quizzes.toolUse;
        break;
      case 'orchestration-quiz':
        content = learningContent.quizzes.workflowOrchestration;
        break;
      case 'planning-quiz':
        content = learningContent.quizzes.planningExecution;
        break;
      case 'agent-fundamentals-quiz':
        content = learningContent.quizzes.agentFundamentals;
        break;
      case 'agent-architectures-quiz':
        content = learningContent.quizzes.agentArchitectures;
        break;
      case 'set-theory-fundamentals-quiz':
        content = learningContent.quizzes.setTheoryFundamentals;
        break;
      case 'graph-theory-quiz':
        content = learningContent.quizzes.graphTheory;
        break;
      case 'logic-fundamentals-quiz':
        content = learningContent.quizzes.logicFundamentals;
        break;
      case 'linear-algebra-quiz':
        content = learningContent.quizzes.linearAlgebra;
        break;
      case 'conditional-probability-quiz':
        content = learningContent.quizzes.conditionalProbability;
        break;
      case 'probability-statistics-quiz':
        content = learningContent.quizzes.conditionalProbability;
        break;
      case 'ontologies-quiz':
        content = learningContent.quizzes.ontologies;
        break;
      case 'knowledge-graphs-quiz':
        content = learningContent.quizzes.knowledgeGraphs;
        break;
      case 'neural-symbolic-quiz':
        content = learningContent.quizzes.neuralSymbolic;
        break;
      // Master Prompting Quizzes
      case 'basic-prompting-quiz':
        content = learningContent.quizzes.basicPrompting;
        break;
      case 'prompt-patterns-quiz':
        content = learningContent.quizzes.promptPatterns;
        break;
      case 'advanced-prompting-quiz':
        content = learningContent.quizzes.advancedPrompting;
        break;
      case 'optimization-testing-quiz':
        content = learningContent.quizzes.optimizationTesting;
        break;
      case 'practical-application-quiz':
        content = learningContent.quizzes.practicalApplication;
        break;
      // AI Red Teaming Quizzes
      case 'red-team-fundamentals-quiz':
        content = learningContent.quizzes.redTeamFundamentals;
        break;
      case 'prompt-injection-quiz':
        content = learningContent.quizzes.promptInjection;
        break;
      case 'adversarial-testing-quiz':
        content = learningContent.quizzes.adversarialTesting;
        break;
      case 'security-frameworks-quiz':
        content = learningContent.quizzes.securityFrameworks;
        break;
      case 'defense-mechanisms-quiz':
        content = learningContent.quizzes.defenseMechanisms;
        break;
      case 'advanced-red-teaming-quiz':
        content = learningContent.quizzes.advancedRedTeaming;
        break;
      default:
        return [];
    }

    // Handle both Quiz objects (with questions property) and QuizQuestion[] arrays
    return Array.isArray(content) ? content : content.questions;
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
      case 'agent-components-flashcards':
        return learningContent.flashcards.agentComponents;
      case 'agent-architectures-flashcards':
        return learningContent.flashcards.agentArchitectures;
      case 'set-notation-flashcards':
        return learningContent.flashcards.setNotation;
      case 'set-operations-flashcards':
        return learningContent.flashcards.setOperations;
      case 'graph-types-flashcards':
        return learningContent.flashcards.graphTypes;
      case 'graph-terminology-flashcards':
        return learningContent.flashcards.graphTerminology;
      case 'propositional-logic-flashcards':
        return learningContent.flashcards.propositionalLogic;
      case 'relations-properties-flashcards':
        return learningContent.flashcards.relationsProperties;
      case 'vectors-flashcards':
        return learningContent.flashcards.vectors;
      case 'probability-basics-flashcards':
        return learningContent.flashcards.probabilityBasics;
      case 'distributions-flashcards':
        return learningContent.flashcards.distributions;
      case 'ontologies-flashcards':
        return learningContent.flashcards.ontologies;
      case 'knowledge-graphs-flashcards':
        return learningContent.flashcards.knowledgeGraphs;
      case 'neural-symbolic-flashcards':
        return learningContent.flashcards.neuralSymbolic;
      // Master Prompting Flashcards
      case 'prompt-components-flashcards':
        return learningContent.flashcards.promptComponents;
      case 'zero-shot-prompting-flashcards':
        return learningContent.flashcards.zeroShotPrompting;
      case 'few-shot-prompting-flashcards':
        return learningContent.flashcards.fewShotPrompting;
      case 'chain-of-thought-flashcards':
        return learningContent.flashcards.chainOfThought;
      case 'prompt-chaining-flashcards':
        return learningContent.flashcards.promptChaining;
      case 'prompt-metrics-flashcards':
        return []; // TODO: Add prompt metrics flashcards when available
      case 'advanced-techniques-flashcards':
        return learningContent.flashcards.advancedTechniques;
      case 'common-pitfalls-flashcards':
        return learningContent.flashcards.commonPitfalls;
      // AI Red Teaming Flashcards
      case 'red-team-flashcards':
        return learningContent.flashcards.redTeamFundamentals;
      case 'red-team-operations-flashcards':
        return learningContent.flashcards.redTeamOperations;
      default:
        return [];
    }
  };

  const getCodeChallengeContent = (challengeId: string) => {
    // Map learning module challenge IDs to actual code challenge IDs
    const challengeMapping: { [key: string]: string } = {
      'implement-tot': 'implement-tot-reasoning',
      'build-react-agent': 'implement-react-agent',
      'build-dynamic-router': 'implement-dynamic-routing',
      // Master Prompting Code Challenges
      'implement-few-shot': 'implement-few-shot-challenge',
      'implement-cot-prompt': 'implement-cot-prompt-challenge',
      'build-prompt-chain': 'build-prompt-chain-challenge',
      'implement-self-consistency': 'implement-self-consistency-challenge',
      'implement-prompt-testing': 'implement-prompt-testing-challenge',
      'build-prompt-library': 'build-prompt-library-challenge',
      // AI Red Teaming Code Challenges
      'prompt-injection-detector': 'prompt-injection-challenge',
      'adversarial-example-generator': 'adversarial-generator-challenge',
      'security-evaluation-framework': 'security-evaluation-challenge',
      'defensive-ai-system': 'defensive-system-challenge'
    };
    
    const actualChallengeId = challengeMapping[challengeId] || challengeId;
    const challenge = learningContent.codeChallenges.find(c => c.id === actualChallengeId);
    return challenge || null;
  };

  const renderLesson = () => {
    if (!selectedLesson) return null;

    const isQuickPractice = selectedLesson.id.startsWith('quick-');
    const exitAction = () => {
      setSelectedLesson(null);
      setActiveView(isQuickPractice ? 'dashboard' : 'chapter');
    };

    // Render breadcrumbs for non-quick practice lessons
    const breadcrumbsWrapper = (content: React.ReactNode) => (
      <div>
        {!isQuickPractice && renderBreadcrumbs()}
        {content}
      </div>
    );

    // Map lesson types to existing components
    if (selectedLesson.type === 'quiz' && selectedLesson.challenges) {
      const quizId = selectedLesson.challenges[0];
      const quizContent = getQuizContent(quizId);
      return breadcrumbsWrapper(
        <QuizComponent
          questions={quizContent}
          title={selectedLesson.title}
          description={selectedLesson.description}
          xpReward={selectedLesson.xpReward}
          timeLimit={selectedLesson.estimatedTime * 60}
          onComplete={(score, xpEarned) => {
            if (isQuickPractice) {
              // For quick practice, just go back to dashboard
              exitAction();
            } else {
              handleLessonComplete(selectedLesson.id, score, xpEarned);
            }
          }}
          onExit={exitAction}
        />
      );
    }

    if (selectedLesson.type === 'flashcard' && selectedLesson.challenges) {
      const flashcardId = selectedLesson.challenges[0];
      const flashcardContent = getFlashcardContent(flashcardId);
      return breadcrumbsWrapper(
        <FlashcardComponent
          flashcards={flashcardContent}
          title={selectedLesson.title}
          description={selectedLesson.description}
          xpReward={selectedLesson.xpReward}
          onComplete={(score, xpEarned) => {
            if (isQuickPractice) {
              exitAction();
            } else {
              handleLessonComplete(selectedLesson.id, score, xpEarned);
            }
          }}
          onExit={exitAction}
        />
      );
    }

    if ((selectedLesson.type === 'code' || selectedLesson.type === 'sandbox') && selectedLesson.challenges) {
      const challengeId = selectedLesson.challenges[0];
      const challenge = getCodeChallengeContent(challengeId);
      if (challenge) {
        return breadcrumbsWrapper(
          <CodeChallengeComponent
            challenge={challenge}
            xpReward={selectedLesson.xpReward}
            onComplete={(score, xpEarned) => {
              if (isQuickPractice) {
                exitAction();
              } else {
                handleLessonComplete(selectedLesson.id, score, xpEarned);
              }
            }}
            onExit={exitAction}
          />
        );
      }
    }

    if (selectedLesson.type === 'theory') {
      const theoryLesson = theoryLessons[selectedLesson.id] || promptingTheoryLessons[selectedLesson.id] || redTeamingTheoryLessons[selectedLesson.id];
      if (theoryLesson) {
        return breadcrumbsWrapper(
          <TheoryLessonComponent
            lesson={theoryLesson}
            xpReward={selectedLesson.xpReward}
            onComplete={(score, xpEarned) => {
              if (isQuickPractice) {
                exitAction();
              } else {
                handleLessonComplete(selectedLesson.id, score, xpEarned);
              }
            }}
            onExit={exitAction}
          />
        );
      }
    }

    // Handle case-study lessons
    if (selectedLesson.type === 'case-study') {
      // For now, create a placeholder case study content
      // In the future, this could be replaced with dedicated case study content
      const caseStudyContent = {
        id: selectedLesson.id,
        title: selectedLesson.title,
        description: selectedLesson.description,
        learningObjectives: [
          'Apply theoretical knowledge to practical scenarios',
          'Develop end-to-end solutions for complex problems',
          'Demonstrate mastery of journey concepts',
          'Build portfolio-worthy projects'
        ],
        sections: [
          {
            id: 'case-study-overview',
            title: 'Case Study Overview',
            content: `In this comprehensive case study, you'll work through a realistic scenario that requires applying multiple concepts and techniques from your learning journey. This hands-on project will test your understanding and ability to implement solutions in practice.`,
            examples: []
          },
          {
            id: 'project-requirements',
            title: 'Project Requirements',
            content: `• Analyze the given scenario and identify key challenges
• Design a solution using the patterns and techniques you've learned
• Implement your solution with proper documentation
• Test and validate your approach
• Present your findings and recommendations`,
            examples: []
          },
          {
            id: 'assessment-criteria',
            title: 'Assessment Criteria',
            content: `Your work will be evaluated based on:
• Correctness and completeness of the solution
• Application of learned concepts and best practices
• Code quality and documentation
• Innovation and creative problem-solving
• Performance and optimization considerations`,
            examples: []
          }
        ],
        summary: [
          'This capstone project brings together all the concepts you\'ve learned in this journey.',
          'You\'ll analyze real-world scenarios and apply your knowledge to solve complex problems.'
        ],
        nextSteps: [
          'Complete the case study project',
          'Review and refine your solution',
          'Share your work with the community'
        ],
        checkYourUnderstanding: [
          {
            question: 'What are the key concepts you applied in this case study?',
            answer: 'Review the patterns and techniques you used throughout the project.'
          }
        ]
      };

      return breadcrumbsWrapper(
        <TheoryLessonComponent
          lesson={caseStudyContent}
          xpReward={selectedLesson.xpReward}
          onComplete={(score, xpEarned) => {
            if (isQuickPractice) {
              exitAction();
            } else {
              handleLessonComplete(selectedLesson.id, score, xpEarned);
            }
          }}
          onExit={exitAction}
        />
      );
    }

    // Default content for other lesson types
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">{selectedLesson.title}</h2>
          <div className="text-gray-300 mb-6 prose prose-base prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedLesson.description}</ReactMarkdown>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
            <p className="text-gray-400 text-center">
              Interactive content for {selectedLesson.type} lessons coming soon!
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setSelectedLesson(null);
                setActiveView('chapter');
              }}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Chapter
            </button>
            <button
              onClick={() => handleLessonComplete(selectedLesson.id, 100, selectedLesson.xpReward)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Mark Complete (Demo)
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Celebration Animation
  const renderCelebration = () => {
    if (!showCelebration) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-gray-900/90 rounded-2xl p-8 text-center">
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Chapter Complete!</h2>
            <p className="text-gray-300">Excellent work! Keep up the momentum!</p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
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

  const renderDashboard = () => {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();
    const completedJourneys = allJourneys.filter(j => {
      const progress = journeyProgress[j.id];
      return progress && progress.completedChapters.length === j.chapters.length;
    }).length;

    return (
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">AI Engineering Learning Hub</h1>
          <p className="text-xl text-gray-300">Your personalized journey to AI mastery</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Your Level</h3>
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">Level {level}</div>
            <p className="text-sm text-gray-400">{currentLevel.title}</p>
            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressToNextLevel()}%` }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Total XP</h3>
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-2">{totalXp}</div>
            <p className="text-sm text-gray-400">{nextLevel.xpRequired - totalXp} to next level</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Streak</h3>
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-orange-400 mb-2">{currentStreak} days</div>
            <p className="text-sm text-gray-400">Keep it up!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Progress</h3>
              <Trophy className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-green-400 mb-2">{completedJourneys}/{allJourneys.length}</div>
            <p className="text-sm text-gray-400">Journeys complete</p>
          </motion.div>
        </div>

        {/* Journey Progress Overview */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Journey Progress</h3>
          <div className="space-y-4">
            {allJourneys.map(journey => {
              const progress = journeyProgress[journey.id];
              const completionPercentage = progress 
                ? (progress.completedChapters.length / journey.chapters.length) * 100 
                : 0;

              return (
                <div
                  key={journey.id}
                  className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700/30 p-3 rounded-lg transition-colors"
                  onClick={() => {
                    setSelectedJourney(journey);
                    setActiveView('journey-detail');
                  }}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${getJourneyColor(journey.color)}`}>
                    {getJourneyIcon(journey)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-white font-medium">{journey.title}</span>
                      <span className="text-sm text-gray-400">{Math.round(completionPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Practice Section */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
            Quick Practice by Journey
          </h3>
          
          {/* Master Agentic Patterns */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-white mb-3 flex items-center">
              <Brain className="w-4 h-4 mr-2 text-purple-400" />
              Master Agentic Patterns
            </h4>
            
            {/* Reasoning Techniques */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-300 mb-2">Reasoning Techniques</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setSelectedLesson({
                      id: 'quick-reasoning-flashcards',
                      title: 'Reasoning Patterns Flashcards',
                      description: 'Learn CoT, ToT, LRT, GoT, ReAct patterns',
                      type: 'flashcard',
                      difficulty: 'beginner',
                      xpReward: 40,
                      estimatedTime: 20,
                      challenges: ['reasoning-flashcards']
                    });
                    setActiveView('lesson');
                  }}
                  className="bg-gray-900/50 rounded-lg p-3 hover:bg-gray-700/50 transition-all text-left"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-medium text-sm">Flashcards</span>
                  </div>
                  <p className="text-xs text-gray-400">20 min • 40 XP</p>
                </button>

                <button
                  onClick={() => {
                    setSelectedLesson({
                      id: 'quick-reasoning-quiz',
                      title: 'Reasoning Techniques Quiz',
                      description: 'Test your knowledge of reasoning patterns',
                      type: 'quiz',
                      difficulty: 'beginner',
                      xpReward: 60,
                      estimatedTime: 25,
                      challenges: ['reasoning-quiz']
                    });
                    setActiveView('lesson');
                  }}
                  className="bg-gray-900/50 rounded-lg p-3 hover:bg-gray-700/50 transition-all text-left"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-medium text-sm">Quiz</span>
                  </div>
                  <p className="text-xs text-gray-400">25 min • 60 XP</p>
                </button>

                <button
                  onClick={() => {
                    setSelectedLesson({
                      id: 'quick-implement-tot',
                      title: 'Build Tree of Thought',
                      description: 'Implement ToT reasoning system',
                      type: 'code',
                      difficulty: 'intermediate',
                      xpReward: 100,
                      estimatedTime: 60,
                      challenges: ['implement-tot']
                    });
                    setActiveView('lesson');
                  }}
                  className="bg-gray-900/50 rounded-lg p-3 hover:bg-gray-700/50 transition-all text-left"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Code className="w-4 h-4 text-purple-400" />
                    <span className="text-white font-medium text-sm">Code Challenge</span>
                  </div>
                  <p className="text-xs text-gray-400">60 min • 100 XP</p>
                </button>
              </div>
            </div>

            {/* Routing Techniques */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-300 mb-2">Intelligent Routing</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setSelectedLesson({
                      id: 'quick-routing-flashcards',
                      title: 'Routing Patterns Flashcards',
                      description: 'Learn routing and load balancing',
                      type: 'flashcard',
                      difficulty: 'intermediate',
                      xpReward: 40,
                      estimatedTime: 20,
                      challenges: ['routing-flashcards']
                    });
                    setActiveView('lesson');
                  }}
                  className="bg-gray-900/50 rounded-lg p-3 hover:bg-gray-700/50 transition-all text-left"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-medium text-sm">Flashcards</span>
                  </div>
                  <p className="text-xs text-gray-400">20 min • 40 XP</p>
                </button>

                <button
                  onClick={() => {
                    setSelectedLesson({
                      id: 'quick-routing-quiz',
                      title: 'Routing Techniques Quiz',
                      description: 'Test routing knowledge',
                      type: 'quiz',
                      difficulty: 'intermediate',
                      xpReward: 55,
                      estimatedTime: 25,
                      challenges: ['routing-quiz']
                    });
                    setActiveView('lesson');
                  }}
                  className="bg-gray-900/50 rounded-lg p-3 hover:bg-gray-700/50 transition-all text-left"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-medium text-sm">Quiz</span>
                  </div>
                  <p className="text-xs text-gray-400">25 min • 55 XP</p>
                </button>

                <button
                  onClick={() => {
                    setSelectedLesson({
                      id: 'quick-dynamic-router',
                      title: 'Build Dynamic Router',
                      description: 'Create routing system',
                      type: 'code',
                      difficulty: 'advanced',
                      xpReward: 120,
                      estimatedTime: 75,
                      challenges: ['build-dynamic-router']
                    });
                    setActiveView('lesson');
                  }}
                  className="bg-gray-900/50 rounded-lg p-3 hover:bg-gray-700/50 transition-all text-left"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Code className="w-4 h-4 text-purple-400" />
                    <span className="text-white font-medium text-sm">Code Challenge</span>
                  </div>
                  <p className="text-xs text-gray-400">75 min • 120 XP</p>
                </button>
              </div>
            </div>
          </div>

          {/* Master Prompting */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-white mb-3 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-blue-400" />
              Master Prompting
            </h4>
            
            {/* Prompt Chaining */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-300 mb-2">Prompt Chaining</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setSelectedLesson({
                      id: 'quick-chaining-flashcards',
                      title: 'Chaining Patterns Flashcards',
                      description: 'Master prompt chaining approaches',
                      type: 'flashcard',
                      difficulty: 'beginner',
                      xpReward: 35,
                      estimatedTime: 18,
                      challenges: ['chaining-flashcards']
                    });
                    setActiveView('lesson');
                  }}
                  className="bg-gray-900/50 rounded-lg p-3 hover:bg-gray-700/50 transition-all text-left"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-medium text-sm">Flashcards</span>
                  </div>
                  <p className="text-xs text-gray-400">18 min • 35 XP</p>
                </button>

                <button
                  onClick={() => {
                    setSelectedLesson({
                      id: 'quick-chaining-quiz',
                      title: 'Prompt Chaining Quiz',
                      description: 'Test your understanding',
                      type: 'quiz',
                      difficulty: 'beginner',
                      xpReward: 50,
                      estimatedTime: 22,
                      challenges: ['chaining-quiz']
                    });
                    setActiveView('lesson');
                  }}
                  className="bg-gray-900/50 rounded-lg p-3 hover:bg-gray-700/50 transition-all text-left"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-medium text-sm">Quiz</span>
                  </div>
                  <p className="text-xs text-gray-400">22 min • 50 XP</p>
                </button>

                <button
                  disabled
                  className="bg-gray-900/50 rounded-lg p-3 opacity-50 cursor-not-allowed text-left"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Code className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500 font-medium text-sm">Coming Soon</span>
                  </div>
                  <p className="text-xs text-gray-500">Build chain system</p>
                </button>
              </div>
            </div>
          </div>

          {/* More topics button */}
          <button
            onClick={() => setActiveView('journeys')}
            className="w-full py-2 bg-gray-900/50 rounded-lg hover:bg-gray-700/50 transition-all text-center text-sm text-gray-400 hover:text-white"
          >
            View all topics in Learning Journeys →
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setActiveView('journeys')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center hover:opacity-90 transition-opacity"
          >
            <Map className="w-8 h-8 mx-auto mb-3" />
            <h4 className="text-lg font-semibold mb-2">Continue Learning</h4>
            <p className="text-sm opacity-90">Pick up where you left off</p>
          </button>

          <button
            onClick={() => setActiveView('achievements')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 text-center hover:opacity-90 transition-opacity"
          >
            <Trophy className="w-8 h-8 mx-auto mb-3" />
            <h4 className="text-lg font-semibold mb-2">View Achievements</h4>
            <p className="text-sm opacity-90">{achievements.length} unlocked</p>
          </button>

          <button
            onClick={() => setActiveView('certification')}
            className="bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl p-6 text-center hover:opacity-90 transition-opacity"
          >
            <Medal className="w-8 h-8 mx-auto mb-3" />
            <h4 className="text-lg font-semibold mb-2">Certification Path</h4>
            <p className="text-sm opacity-90">Track your progress</p>
          </button>
        </div>
      </div>
    );
  };

  const getProgressToNextLevel = () => {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();
    if (currentLevel === nextLevel) return 100;
    
    const progress = ((totalXp - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100;
    return Math.min(progress, 100);
  };

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

    const getProgressPercentage = (achievement: Achievement) => {
      if (achievement.progress.required === 0) return 100;
      return Math.min((achievement.progress.current / achievement.progress.required) * 100, 100);
    };

    const isUnlocked = (achievement: Achievement) => {
      return achievement.progress.current >= achievement.progress.required;
    };

    const totalAchievements = allAchievements.length;
    const unlockedAchievements = allAchievements.filter(a => isUnlocked(a)).length;

    return (
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        {renderBreadcrumbs()}

        {/* Header */}
        <div className="text-center mb-8">
          <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Your Achievements</h2>
          <p className="text-gray-400">{unlockedAchievements}/{totalAchievements} Unlocked</p>
        </div>

        {/* Achievement Grid */}
        <div className="space-y-8">
          {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-white mb-4">{categoryNames[category]}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryAchievements.map((achievement) => {
                  const progress = getProgressPercentage(achievement);
                  const unlocked = isUnlocked(achievement);
                  const Icon = achievement.icon;
                  
                  return (
                    <div
                      key={achievement.id}
                      className={`bg-gray-800/50 rounded-xl p-6 border ${
                        unlocked ? 'border-yellow-600' : 'border-gray-700'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${
                          unlocked 
                            ? `bg-gradient-to-br ${rarityColors[achievement.rarity]}` 
                            : 'bg-gray-700'
                        }`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        {unlocked && <CheckCircle className="w-5 h-5 text-green-400" />}
                      </div>
                      
                      <h4 className="font-semibold text-white mb-2">{achievement.title}</h4>
                      <div className="text-gray-400 text-sm mb-4 prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{achievement.description}</ReactMarkdown>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Progress</span>
                          <span className="text-gray-400">
                            {achievement.progress.current}/{achievement.progress.required}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div 
                            className={`h-2 rounded-full ${
                              unlocked 
                                ? 'bg-gradient-to-r from-green-400 to-green-500' 
                                : 'bg-gradient-to-r from-blue-400 to-blue-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCertification = () => {
    const completedJourneys = allJourneys.filter(j => {
      const progress = journeyProgress[j.id];
      return progress && progress.completedChapters.length === j.chapters.length;
    });

    const totalChapters = allJourneys.reduce((sum, j) => sum + j.chapters.length, 0);
    const completedChapters = allJourneys.reduce((sum, j) => {
      const progress = journeyProgress[j.id];
      return sum + (progress?.completedChapters.length || 0);
    }, 0);

    return (
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        {renderBreadcrumbs()}

        {/* Header */}
        <div className="text-center mb-8">
          <Medal className="w-20 h-20 text-rose-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">AI Engineer Certification</h2>
          <p className="text-gray-400">Complete all journeys to earn your certification</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6">Certification Requirements</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
              <span className="text-gray-300">Complete All Journeys</span>
              <span className={`font-medium ${completedJourneys.length === allJourneys.length ? 'text-green-400' : 'text-yellow-400'}`}>
                {completedJourneys.length}/{allJourneys.length}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
              <span className="text-gray-300">Reach Level 7</span>
              <span className={`font-medium ${level >= 7 ? 'text-green-400' : 'text-yellow-400'}`}>
                Level {level}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
              <span className="text-gray-300">Complete All Chapters</span>
              <span className={`font-medium ${completedChapters === totalChapters ? 'text-green-400' : 'text-yellow-400'}`}>
                {completedChapters}/{totalChapters}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
              <span className="text-gray-300">Earn 10,000 XP</span>
              <span className={`font-medium ${totalXp >= 10000 ? 'text-green-400' : 'text-yellow-400'}`}>
                {totalXp}/10,000
              </span>
            </div>
          </div>
        </div>

        {/* Journey Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allJourneys.map(journey => {
            const progress = journeyProgress[journey.id];
            const isComplete = progress && progress.completedChapters.length === journey.chapters.length;
            
            return (
              <div
                key={journey.id}
                className={`bg-gray-800/50 rounded-xl p-6 border ${
                  isComplete ? 'border-green-600' : 'border-gray-700'
                }`}
              >
                <div className={`p-3 rounded-lg bg-gradient-to-br ${getJourneyColor(journey.color)} mb-4`}>
                  {getJourneyIcon(journey)}
                </div>
                <h4 className="text-white font-medium mb-2">{journey.title}</h4>
                <div className="flex items-center space-x-2">
                  {isComplete ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 text-sm">Complete</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 text-sm">In Progress</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Certification Ready */}
        {completedJourneys.length === allJourneys.length && level >= 7 && (
          <div className="mt-8 bg-gradient-to-r from-rose-500/20 to-purple-500/20 rounded-xl p-8 border border-rose-500/50 text-center">
            <Sparkles className="w-12 h-12 text-rose-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Congratulations!</h3>
            <p className="text-gray-300 mb-6">You've completed all requirements for certification!</p>
            <button className="px-8 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium">
              Claim Your Certificate
            </button>
          </div>
        )}
      </div>
    );
  };

  // Main render
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="w-full px-6 py-8">
        {/* Navigation Bar */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <BrainMascot 
                  size="small"
                  expression="love"
                  glasses={true}
                  color="purple"
                  animate={true}
                />
                <h1 className="text-2xl font-bold text-white">Learning Hub</h1>
              </div>
              <nav className="flex space-x-1">
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeView === 'dashboard' 
                      ? 'bg-rose-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveView('journeys')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeView === 'journeys' || activeView === 'journey-detail' || activeView === 'chapter' || activeView === 'lesson'
                      ? 'bg-rose-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Journeys
                </button>
                <button
                  onClick={() => setActiveView('achievements')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeView === 'achievements' 
                      ? 'bg-rose-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Achievements
                </button>
                <button
                  onClick={() => setActiveView('certification')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeView === 'certification' 
                      ? 'bg-rose-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Certification
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">{currentStreak} day streak</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">Level {level}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic View Rendering */}
        {activeView === 'dashboard' && renderDashboard()}
        {activeView === 'journeys' && renderJourneySelection()}
        {activeView === 'journey-detail' && renderJourneyDetail()}
        {activeView === 'chapter' && renderChapterView()}
        {activeView === 'lesson' && renderLesson()}
        {activeView === 'achievements' && renderAchievements()}
        {activeView === 'certification' && renderCertification()}
        
        {/* Celebration Overlay */}
        {renderCelebration()}
      </div>
    </div>
  );
};