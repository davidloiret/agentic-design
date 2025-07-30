'use client';

import React from 'react';
import { Brain, TrendingUp, Target, Award, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryProgress {
  categoryId: string;
  categoryName: string;
  flashcardsCompleted: number;
  totalFlashcards: number;
  quizScore: number | null;
  lastStudied: Date | null;
}

interface LearningProgressProps {
  progress: CategoryProgress[];
  totalXP: number;
  streakDays: number;
}

export const LearningProgress: React.FC<LearningProgressProps> = ({
  progress,
  totalXP,
  streakDays
}) => {
  const overallProgress = progress.reduce((acc, cat) => {
    const flashcardProgress = (cat.flashcardsCompleted / cat.totalFlashcards) * 100;
    const quizProgress = cat.quizScore || 0;
    return acc + (flashcardProgress + quizProgress) / 2;
  }, 0) / progress.length;

  const categoryIcons: Record<string, React.ComponentType<any>> = {
    'core-concepts': Brain,
    'agent-architectures': Target,
    'perception-sensing': CheckCircle,
    'planning-reasoning': TrendingUp,
    'multi-agent-systems': Award,
    'learning-adaptation': Clock
  };

  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, string> = {
      'core-concepts': 'blue',
      'agent-architectures': 'purple',
      'perception-sensing': 'green',
      'planning-reasoning': 'orange',
      'multi-agent-systems': 'red',
      'learning-adaptation': 'teal'
    };
    return colors[categoryId] || 'gray';
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-900/20', text: 'text-blue-400', border: 'border-blue-700/50' },
      purple: { bg: 'bg-purple-900/20', text: 'text-purple-400', border: 'border-purple-700/50' },
      green: { bg: 'bg-green-900/20', text: 'text-green-400', border: 'border-green-700/50' },
      orange: { bg: 'bg-orange-900/20', text: 'text-orange-400', border: 'border-orange-700/50' },
      red: { bg: 'bg-red-900/20', text: 'text-red-400', border: 'border-red-700/50' },
      teal: { bg: 'bg-teal-900/20', text: 'text-teal-400', border: 'border-teal-700/50' },
      gray: { bg: 'bg-gray-900/20', text: 'text-gray-400', border: 'border-gray-700/50' }
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium">Overall Progress</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-white">{Math.round(overallProgress)}%</span>
          </div>
          <div className="mt-2 h-1 bg-gray-700/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium">Total XP</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-white">{totalXP}</span>
            <span className="text-xs text-green-400">+50 today</span>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium">Study Streak</span>
            <Target className="w-4 h-4 text-orange-400" />
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-white">{streakDays} days</span>
            <span className="text-xs text-orange-400">🔥</span>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium">Categories</span>
            <Brain className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-white">{progress.length}</span>
            <span className="text-xs text-gray-400">Active</span>
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Category Progress</h3>
        {progress.map((category, idx) => {
          const Icon = categoryIcons[category.categoryId] || Brain;
          const color = getCategoryColor(category.categoryId);
          const colorClasses = getColorClasses(color);
          const flashcardProgress = (category.flashcardsCompleted / category.totalFlashcards) * 100;

          return (
            <motion.div
              key={category.categoryId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`${colorClasses.bg} backdrop-blur-sm border ${colorClasses.border} rounded-xl p-4`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${colorClasses.bg} border ${colorClasses.border}`}>
                    <Icon className={`w-5 h-5 ${colorClasses.text}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{category.categoryName}</h4>
                    <p className="text-xs text-gray-500">
                      {category.lastStudied 
                        ? `Last studied ${new Date(category.lastStudied).toLocaleDateString()}`
                        : 'Not started yet'
                      }
                    </p>
                  </div>
                </div>
                {category.quizScore !== null && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Quiz Score</p>
                    <p className={`text-lg font-bold ${colorClasses.text}`}>
                      {category.quizScore}%
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">Flashcards</span>
                    <span className="text-gray-300">
                      {category.flashcardsCompleted}/{category.totalFlashcards}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${colorClasses.text} opacity-60`}
                      style={{ background: `linear-gradient(to right, currentColor, currentColor)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${flashcardProgress}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};