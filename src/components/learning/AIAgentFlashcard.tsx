'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Sparkles, Brain, Tag } from 'lucide-react';
import { Flashcard } from '@/data/ai-agent-fundamentals';

interface AIAgentFlashcardProps {
  flashcard: Flashcard;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  currentIndex?: number;
  totalCards?: number;
}

export const AIAgentFlashcard: React.FC<AIAgentFlashcardProps> = ({
  flashcard,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
  currentIndex = 0,
  totalCards = 1
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const difficultyColors = {
    beginner: { bg: 'bg-green-900/20', border: 'border-green-700/50', text: 'text-green-400' },
    intermediate: { bg: 'bg-yellow-900/20', border: 'border-yellow-700/50', text: 'text-yellow-400' },
    advanced: { bg: 'bg-red-900/20', border: 'border-red-700/50', text: 'text-red-400' }
  };

  const difficulty = difficultyColors[flashcard.difficulty];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <span className="text-sm text-gray-400">
            Card {currentIndex + 1} of {totalCards}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-lg ${difficulty.bg} ${difficulty.border} ${difficulty.text} border`}>
            {flashcard.difficulty}
          </span>
        </div>
      </div>

      {/* Card container */}
      <div className="relative h-96 mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={isFlipped ? 'back' : 'front'}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 cursor-pointer hover:bg-gray-800/40 transition-all"
              onClick={handleFlip}
            >
              <div className="h-full flex flex-col">
                {!isFlipped ? (
                  <>
                    {/* Front of card */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-400">Question</h3>
                      <RotateCcw className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-xl md:text-2xl text-white text-center font-medium leading-relaxed">
                        {flashcard.front}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-4">
                      Click to reveal answer
                    </p>
                  </>
                ) : (
                  <>
                    {/* Back of card */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-400">Answer</h3>
                      <RotateCcw className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {flashcard.back}
                      </div>
                      
                      {/* Related concepts */}
                      {flashcard.relatedConcepts && flashcard.relatedConcepts.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-gray-700/50">
                          <p className="text-xs text-gray-500 mb-2">Related Concepts:</p>
                          <div className="flex flex-wrap gap-2">
                            {flashcard.relatedConcepts.map((concept, idx) => (
                              <span 
                                key={idx}
                                className="text-xs px-2 py-1 bg-purple-900/20 border border-purple-700/50 text-purple-400 rounded-lg"
                              >
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-4">
                      Click to see question
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-gray-500" />
          {flashcard.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="text-xs px-2 py-1 bg-gray-800/30 border border-gray-700/50 text-gray-400 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
            ${hasPrevious 
              ? 'bg-gray-800/30 text-gray-300 hover:bg-gray-800/50 border border-gray-700/50' 
              : 'bg-gray-800/20 text-gray-600 cursor-not-allowed border border-gray-800/30'
            }
          `}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={handleFlip}
          className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Flip Card
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
            ${hasNext 
              ? 'bg-gray-800/30 text-gray-300 hover:bg-gray-800/50 border border-gray-700/50' 
              : 'bg-gray-800/20 text-gray-600 cursor-not-allowed border border-gray-800/30'
            }
          `}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};