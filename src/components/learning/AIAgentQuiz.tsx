'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Brain, AlertCircle, ChevronRight, Award } from 'lucide-react';
import { QuizQuestion } from '@/data/ai-agent-fundamentals';

interface AIAgentQuizProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, answers: Record<string, string>) => void;
}

export const AIAgentQuiz: React.FC<AIAgentQuizProps> = ({
  questions,
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestion.id];
  const isAnswered = selectedAnswer !== undefined;

  const handleAnswerSelect = (optionId: string) => {
    if (!isAnswered) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion.id]: optionId
      });
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      // Quiz completed
      const score = calculateScore();
      setQuizCompleted(true);
      onComplete?.(score, selectedAnswers);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      const answer = selectedAnswers[question.id];
      const correctOption = question.options.find(opt => opt.isCorrect);
      if (answer === correctOption?.id) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const getOptionClasses = (option: any) => {
    if (!isAnswered) {
      return 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 cursor-pointer';
    }
    
    if (option.isCorrect) {
      return 'bg-green-900/30 border-green-700/50';
    }
    
    if (selectedAnswer === option.id && !option.isCorrect) {
      return 'bg-red-900/30 border-red-700/50';
    }
    
    return 'bg-gray-800/20 border-gray-800/30';
  };

  const difficultyColors = {
    beginner: { bg: 'bg-green-900/20', border: 'border-green-700/50', text: 'text-green-400' },
    intermediate: { bg: 'bg-yellow-900/20', border: 'border-yellow-700/50', text: 'text-yellow-400' },
    advanced: { bg: 'bg-red-900/20', border: 'border-red-700/50', text: 'text-red-400' }
  };

  if (quizCompleted) {
    const score = calculateScore();
    const correctAnswers = questions.filter(q => {
      const answer = selectedAnswers[q.id];
      const correctOption = q.options.find(opt => opt.isCorrect);
      return answer === correctOption?.id;
    }).length;

    return (
      <div className="w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center"
        >
          <Award className="w-16 h-16 mx-auto mb-4 text-amber-400" />
          <h2 className="text-2xl font-bold text-white mb-4">Quiz Completed!</h2>
          <div className="mb-6">
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {Math.round(score)}%
            </p>
            <p className="text-gray-400 mt-2">
              You got {correctAnswers} out of {questions.length} questions correct
            </p>
          </div>
          
          {/* Score breakdown */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800/30 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-400">{correctAnswers}</p>
              <p className="text-xs text-gray-500">Correct</p>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-4">
              <p className="text-2xl font-bold text-red-400">{questions.length - correctAnswers}</p>
              <p className="text-xs text-gray-500">Incorrect</p>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-4">
              <p className="text-2xl font-bold text-blue-400">{questions.length}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className={`text-xs px-2 py-1 rounded-lg ${difficultyColors[currentQuestion.difficulty].bg} ${difficultyColors[currentQuestion.difficulty].border} ${difficultyColors[currentQuestion.difficulty].text} border`}>
            {currentQuestion.difficulty}
          </span>
        </div>
        <div className="h-2 bg-gray-700/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Brain className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
          <h3 className="text-lg font-medium text-white">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Category and tags */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs px-2 py-1 bg-blue-900/20 border border-blue-700/50 text-blue-400 rounded-lg">
            {currentQuestion.category.replace('-', ' ')}
          </span>
          {currentQuestion.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-xs text-gray-500">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, idx) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => handleAnswerSelect(option.id)}
            className={`
              p-4 rounded-lg border transition-all duration-200 flex items-center gap-3
              ${getOptionClasses(option)}
            `}
          >
            <div className={`
              w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0
              ${isAnswered 
                ? option.isCorrect 
                  ? 'border-green-400 bg-green-400/20' 
                  : selectedAnswer === option.id 
                    ? 'border-red-400 bg-red-400/20'
                    : 'border-gray-600'
                : 'border-gray-600'
              }
            `}>
              {isAnswered && (
                option.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : selectedAnswer === option.id ? (
                  <XCircle className="w-5 h-5 text-red-400" />
                ) : (
                  <span className="text-xs text-gray-500">{option.id.toUpperCase()}</span>
                )
              )}
              {!isAnswered && (
                <span className="text-xs text-gray-400">{option.id.toUpperCase()}</span>
              )}
            </div>
            <p className="text-gray-300 flex-1">{option.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-400 mb-1">Explanation</p>
                  <p className="text-sm text-gray-300">
                    {currentQuestion.explanation}
                  </p>
                  {currentQuestion.conceptsCovered.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">Concepts covered:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentQuestion.conceptsCovered.map((concept, idx) => (
                          <span 
                            key={idx}
                            className="text-xs px-2 py-1 bg-gray-800/50 rounded text-gray-400"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next button */}
      <div className="flex justify-end">
        <button
          onClick={handleNextQuestion}
          disabled={!isAnswered}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
            ${isAnswered 
              ? 'bg-purple-500 hover:bg-purple-600 text-white' 
              : 'bg-gray-800/20 text-gray-600 cursor-not-allowed'
            }
          `}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};