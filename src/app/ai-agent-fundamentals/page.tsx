'use client';

import React, { useState, useEffect } from 'react';
import { Brain, BookOpen, Target, Sparkles, ChevronRight, Award } from 'lucide-react';
import { aiAgentFundamentals, LearningCategory } from '@/data/ai-agent-fundamentals';
import { AIAgentFlashcard } from '@/components/learning/AIAgentFlashcard';
import { AIAgentQuiz } from '@/components/learning/AIAgentQuiz';
import { LearningProgress } from '@/components/learning/LearningProgress';
import { motion } from 'framer-motion';

type ViewMode = 'overview' | 'flashcards' | 'quiz' | 'progress';

export default function AIAgentFundamentalsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [selectedCategory, setSelectedCategory] = useState<LearningCategory | null>(null);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [progress, setProgress] = useState<any[]>([]);
  const [totalXP, setTotalXP] = useState(0);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('aiAgentProgress');
    const savedXP = localStorage.getItem('aiAgentXP');
    
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    } else {
      // Initialize progress
      const initialProgress = aiAgentFundamentals.map(cat => ({
        categoryId: cat.id,
        categoryName: cat.title,
        flashcardsCompleted: 0,
        totalFlashcards: cat.flashcards.length,
        quizScore: null,
        lastStudied: null
      }));
      setProgress(initialProgress);
    }
    
    if (savedXP) {
      setTotalXP(parseInt(savedXP));
    }
  }, []);

  // Save progress
  useEffect(() => {
    if (progress.length > 0) {
      localStorage.setItem('aiAgentProgress', JSON.stringify(progress));
    }
    localStorage.setItem('aiAgentXP', totalXP.toString());
  }, [progress, totalXP]);

  const handleCategorySelect = (category: LearningCategory) => {
    setSelectedCategory(category);
    setCurrentFlashcardIndex(0);
  };

  const handleQuizComplete = (score: number) => {
    if (selectedCategory) {
      setProgress(prev => prev.map(p => 
        p.categoryId === selectedCategory.id 
          ? { ...p, quizScore: score, lastStudied: new Date() }
          : p
      ));
      setTotalXP(prev => prev + Math.round(score));
    }
  };

  const getTabClasses = (mode: ViewMode, isActive: boolean) => {
    const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2';
    
    if (!isActive) {
      return `${baseClasses} bg-gray-800/30 text-gray-400 hover:bg-gray-800/50 border border-gray-700/50`;
    }

    const colorMap = {
      'overview': 'bg-purple-500 text-white',
      'flashcards': 'bg-blue-500 text-white',
      'quiz': 'bg-green-500 text-white',
      'progress': 'bg-amber-500 text-white'
    };

    return `${baseClasses} ${colorMap[mode]}`;
  };

  const categoryIcons: Record<string, React.ComponentType<any>> = {
    'core-concepts': Brain,
    'agent-architectures': Target,
    'perception-sensing': BookOpen,
    'planning-reasoning': Sparkles,
    'multi-agent-systems': Award,
    'learning-adaptation': ChevronRight
  };

  const getCategoryColorClasses = (categoryId: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      'core-concepts': { bg: 'bg-blue-900/20', text: 'text-blue-400', border: 'border-blue-700/50' },
      'agent-architectures': { bg: 'bg-purple-900/20', text: 'text-purple-400', border: 'border-purple-700/50' },
      'perception-sensing': { bg: 'bg-green-900/20', text: 'text-green-400', border: 'border-green-700/50' },
      'planning-reasoning': { bg: 'bg-orange-900/20', text: 'text-orange-400', border: 'border-orange-700/50' },
      'multi-agent-systems': { bg: 'bg-red-900/20', text: 'text-red-400', border: 'border-red-700/50' },
      'learning-adaptation': { bg: 'bg-teal-900/20', text: 'text-teal-400', border: 'border-teal-700/50' }
    };
    return colorMap[categoryId] || { bg: 'bg-gray-900/20', text: 'text-gray-400', border: 'border-gray-700/50' };
  };

  return (
    <div className="w-full max-w-none p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <Brain className="w-12 h-12 mx-auto mb-4 text-purple-400" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
          AI Agent Fundamentals
        </h1>
        <p className="text-gray-400">
          Master the core concepts of AI agents through interactive flashcards and quizzes
        </p>
      </div>

      {/* View Mode Tabs */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setViewMode('overview')}
          className={getTabClasses('overview', viewMode === 'overview')}
        >
          <BookOpen className="w-5 h-5" />
          Overview
        </button>
        <button
          onClick={() => setViewMode('flashcards')}
          className={getTabClasses('flashcards', viewMode === 'flashcards')}
        >
          <Brain className="w-5 h-5" />
          Flashcards
        </button>
        <button
          onClick={() => setViewMode('quiz')}
          className={getTabClasses('quiz', viewMode === 'quiz')}
        >
          <Target className="w-5 h-5" />
          Quiz
        </button>
        <button
          onClick={() => setViewMode('progress')}
          className={getTabClasses('progress', viewMode === 'progress')}
        >
          <Award className="w-5 h-5" />
          Progress
        </button>
      </div>

      {/* Content */}
      <div className="bg-gray-800/20 rounded-xl p-6">
        {viewMode === 'overview' && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Learning Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiAgentFundamentals.map((category, idx) => {
                const Icon = categoryIcons[category.id] || Brain;
                const colorClasses = getCategoryColorClasses(category.id);
                const categoryProgress = progress.find(p => p.categoryId === category.id);
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`
                      ${colorClasses.bg} backdrop-blur-sm border ${colorClasses.border} 
                      rounded-xl p-6 cursor-pointer hover:scale-105 transition-all
                    `}
                    onClick={() => {
                      handleCategorySelect(category);
                      setViewMode('flashcards');
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Icon className={`w-8 h-8 ${colorClasses.text}`} />
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Cards</p>
                        <p className="text-sm font-bold text-white">{category.flashcards.length}</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{category.description}</p>
                    
                    {categoryProgress && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Progress</span>
                          <span className={colorClasses.text}>
                            {Math.round((categoryProgress.flashcardsCompleted / categoryProgress.totalFlashcards) * 100)}%
                          </span>
                        </div>
                        <div className="h-1 bg-gray-700/50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${colorClasses.text} opacity-60`}
                            style={{ 
                              width: `${(categoryProgress.flashcardsCompleted / categoryProgress.totalFlashcards) * 100}%`,
                              background: 'currentColor'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {viewMode === 'flashcards' && (
          <div>
            {selectedCategory ? (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">{selectedCategory.title}</h2>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Back to categories
                  </button>
                </div>
                <AIAgentFlashcard
                  flashcard={selectedCategory.flashcards[currentFlashcardIndex]}
                  currentIndex={currentFlashcardIndex}
                  totalCards={selectedCategory.flashcards.length}
                  hasNext={currentFlashcardIndex < selectedCategory.flashcards.length - 1}
                  hasPrevious={currentFlashcardIndex > 0}
                  onNext={() => setCurrentFlashcardIndex(prev => Math.min(prev + 1, selectedCategory.flashcards.length - 1))}
                  onPrevious={() => setCurrentFlashcardIndex(prev => Math.max(prev - 1, 0))}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <Brain className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Select a category from the overview to start studying</p>
                <button
                  onClick={() => setViewMode('overview')}
                  className="mt-4 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
                >
                  Go to Overview
                </button>
              </div>
            )}
          </div>
        )}

        {viewMode === 'quiz' && (
          <div>
            {selectedCategory ? (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">{selectedCategory.title} Quiz</h2>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Back to categories
                  </button>
                </div>
                <AIAgentQuiz
                  questions={selectedCategory.quizQuestions}
                  onComplete={handleQuizComplete}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Select a category from the overview to take a quiz</p>
                <button
                  onClick={() => setViewMode('overview')}
                  className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                >
                  Go to Overview
                </button>
              </div>
            )}
          </div>
        )}

        {viewMode === 'progress' && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">Your Learning Progress</h2>
            <LearningProgress
              progress={progress}
              totalXP={totalXP}
              streakDays={1} // You can implement streak tracking later
            />
          </div>
        )}
      </div>
    </div>
  );
}