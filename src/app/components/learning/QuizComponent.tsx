import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Brain, Clock, Star, ArrowRight, RotateCcw, Trophy } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  title: string;
  description: string;
  xpReward: number;
  timeLimit?: number; // in seconds
  onComplete: (score: number, xpEarned: number) => void;
  onExit: () => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  questions,
  title,
  description,
  xpReward,
  timeLimit,
  onComplete,
  onExit
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit || 0);
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now());
  const [hasStarted, setHasStarted] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!hasStarted || !timeLimit || showResults) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, timeLimit, showResults]);

  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (showResults) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScorePercentage = () => {
    return Math.round((calculateScore() / questions.length) * 100);
  };

  const getXpEarned = () => {
    const scorePercentage = getScorePercentage();
    if (scorePercentage >= 80) return xpReward;
    if (scorePercentage >= 60) return Math.floor(xpReward * 0.7);
    if (scorePercentage >= 40) return Math.floor(xpReward * 0.4);
    return Math.floor(xpReward * 0.2);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const handleStartQuiz = () => {
    setHasStarted(true);
    setQuizStartTime(Date.now());
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
    setTimeRemaining(timeLimit || 0);
    setHasStarted(false);
  };

  const handleFinish = () => {
    console.log('[QuizComponent] Calling onComplete with:', { 
      scorePercentage: getScorePercentage(), 
      xpEarned: getXpEarned() 
    });
    onComplete(getScorePercentage(), getXpEarned());
  };

  // Pre-quiz screen
  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto p-0 sm:p-6">
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className="p-4 bg-rose-400/20 rounded-full w-16 h-16 mx-auto mb-4">
              <Brain className="w-8 h-8 text-rose-400 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-gray-400 text-lg">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <Brain className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Questions</p>
              <p className="text-white font-bold">{questions.length}</p>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">XP Reward</p>
              <p className="text-white font-bold">{xpReward}</p>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <Clock className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Time Limit</p>
              <p className="text-white font-bold">
                {timeLimit ? formatTime(timeLimit) : 'Unlimited'}
              </p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={onExit}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleStartQuiz}
              className="px-8 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const score = calculateScore();
    const percentage = getScorePercentage();
    const xpEarned = getXpEarned();
    const timeTaken = Math.floor((Date.now() - quizStartTime) / 1000);

    return (
      <div className="max-w-4xl mx-auto p-0 sm:p-6">
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 ${
              percentage >= 80 ? 'bg-green-400/20' : 
              percentage >= 60 ? 'bg-yellow-400/20' : 'bg-red-400/20'
            }`}>
              <Trophy className={`w-8 h-8 mx-auto ${
                percentage >= 80 ? 'text-green-400' : 
                percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
              }`} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h1>
            <p className="text-gray-400">Here's how you performed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <p className="text-gray-400 text-sm">Score</p>
              <p className="text-2xl font-bold text-white">{score}/{questions.length}</p>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <p className="text-gray-400 text-sm">Percentage</p>
              <p className={`text-2xl font-bold ${
                percentage >= 80 ? 'text-green-400' : 
                percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
              }`}>{percentage}%</p>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <p className="text-gray-400 text-sm">XP Earned</p>
              <p className="text-2xl font-bold text-yellow-400">{xpEarned}</p>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <p className="text-gray-400 text-sm">Time Taken</p>
              <p className="text-2xl font-bold text-white">{formatTime(timeTaken)}</p>
            </div>
          </div>

          {/* Question Review */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Question Review</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                return (
                  <div key={question.id} className={`p-4 rounded-lg border ${
                    isCorrect ? 'border-green-400/30 bg-green-400/5' : 'border-red-400/30 bg-red-400/5'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-white font-medium mb-2">{question.question}</p>
                        <p className="text-sm text-gray-400 mb-1">
                          <span className="font-medium">Your answer:</span> {question.options[userAnswer] || 'Not answered'}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-400 mb-2">
                            <span className="font-medium">Correct answer:</span> {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry</span>
            </button>
            <button
              onClick={handleFinish}
              className="px-8 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz question screen
  return (
    <div className="max-w-4xl mx-auto p-0 sm:p-6">
      {/* Header */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(currentQuestion.difficulty)}`}>
              {currentQuestion.difficulty}
            </span>
            <span className="text-gray-400 text-xs bg-gray-700 px-2 py-1 rounded">
              {currentQuestion.topic}
            </span>
          </div>
          {timeLimit && (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <span className={`text-sm font-mono ${
                timeRemaining < 60 ? 'text-red-400' : 'text-white'
              }`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-rose-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-8">
          {currentQuestion.question}
        </h2>

        <div className="space-y-4 mb-8">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                selectedAnswers[currentQuestionIndex] === index
                  ? 'border-rose-400 bg-rose-400/10 text-white'
                  : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'border-rose-400 bg-rose-400'
                    : 'border-gray-500'
                }`}>
                  {selectedAnswers[currentQuestionIndex] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestionIndex] === -1}
            className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>{currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}; 