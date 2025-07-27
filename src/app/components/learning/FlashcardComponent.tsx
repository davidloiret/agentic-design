import React, { useState, useEffect } from 'react';
import { RotateCcw, Eye, EyeOff, CheckCircle, XCircle, Star, ArrowLeft, ArrowRight, Shuffle } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  lastReviewed?: Date;
  reviewCount: number;
  correctCount: number;
}

interface FlashcardComponentProps {
  flashcards: Flashcard[];
  title: string;
  description: string;
  xpReward: number;
  onComplete: (score: number, xpEarned: number) => void;
  onExit: () => void;
}

export const FlashcardComponent: React.FC<FlashcardComponentProps> = ({
  flashcards,
  title,
  description,
  xpReward,
  onComplete,
  onExit
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsReviewed, setCardsReviewed] = useState<Set<string>>(new Set());
  const [correctAnswers, setCorrectAnswers] = useState<Set<string>>(new Set());
  const [sessionStartTime] = useState<number>(Date.now());
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setShuffledCards([...flashcards]);
  }, [flashcards]);

  const currentCard = shuffledCards[currentCardIndex];

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnowCard = (knew: boolean) => {
    if (!currentCard) return;

    const newReviewed = new Set(cardsReviewed);
    newReviewed.add(currentCard.id);
    setCardsReviewed(newReviewed);

    if (knew) {
      const newCorrect = new Set(correctAnswers);
      newCorrect.add(currentCard.id);
      setCorrectAnswers(newCorrect);
    }

    // Move to next card or finish
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const getScorePercentage = () => {
    if (cardsReviewed.size === 0) return 0;
    return Math.round((correctAnswers.size / cardsReviewed.size) * 100);
  };

  const getXpEarned = () => {
    const scorePercentage = getScorePercentage();
    if (scorePercentage >= 90) return xpReward;
    if (scorePercentage >= 75) return Math.floor(xpReward * 0.8);
    if (scorePercentage >= 60) return Math.floor(xpReward * 0.6);
    if (scorePercentage >= 40) return Math.floor(xpReward * 0.4);
    return Math.floor(xpReward * 0.2);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
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

  const handleStartStudy = () => {
    setHasStarted(true);
  };

  const handleFinish = () => {
    onComplete(getScorePercentage(), getXpEarned());
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setCardsReviewed(new Set());
    setCorrectAnswers(new Set());
    setShowResults(false);
    setHasStarted(false);
    shuffleCards();
  };

  // Pre-study screen
  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto p-0 sm:p-6">
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className="p-4 bg-rose-400/20 rounded-full w-16 h-16 mx-auto mb-4">
              <Eye className="w-8 h-8 text-rose-400 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-gray-400 text-lg">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <Eye className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Cards to Study</p>
              <p className="text-white font-bold">{flashcards.length}</p>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">XP Reward</p>
              <p className="text-white font-bold">{xpReward}</p>
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-6 mb-8">
            <h3 className="text-white font-semibold mb-4">How it works:</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>• Study each flashcard carefully</p>
              <p>• Click the card to reveal the answer</p>
              <p>• Rate your knowledge honestly</p>
              <p>• Review difficult concepts multiple times</p>
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
              onClick={handleStartStudy}
              className="px-8 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium"
            >
              Start Studying
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const totalTime = Date.now() - sessionStartTime;
    const scorePercentage = getScorePercentage();
    const xpEarned = getXpEarned();

    return (
      <div className="max-w-4xl mx-auto p-0 sm:p-6">
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 ${
              scorePercentage >= 80 ? 'bg-green-400/20' : 
              scorePercentage >= 60 ? 'bg-yellow-400/20' : 'bg-red-400/20'
            }`}>
              <CheckCircle className={`w-8 h-8 mx-auto ${
                scorePercentage >= 80 ? 'text-green-400' : 
                scorePercentage >= 60 ? 'text-yellow-400' : 'text-red-400'
              }`} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Study Session Complete!</h1>
            <p className="text-gray-400">Great job reviewing your flashcards</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <p className="text-gray-400 text-sm">Cards Mastered</p>
              <p className="text-2xl font-bold text-white">{correctAnswers.size}/{cardsReviewed.size}</p>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <p className="text-gray-400 text-sm">Success Rate</p>
              <p className={`text-2xl font-bold ${
                scorePercentage >= 80 ? 'text-green-400' : 
                scorePercentage >= 60 ? 'text-yellow-400' : 'text-red-400'
              }`}>{scorePercentage}%</p>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <p className="text-gray-400 text-sm">XP Earned</p>
              <p className="text-2xl font-bold text-yellow-400">{xpEarned}</p>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <p className="text-gray-400 text-sm">Time Spent</p>
              <p className="text-2xl font-bold text-white">{formatTime(totalTime)}</p>
            </div>
          </div>

          {/* Performance breakdown */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-400/5 border border-green-400/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">Mastered</span>
                </div>
                <p className="text-2xl font-bold text-white">{correctAnswers.size}</p>
              </div>
              <div className="bg-red-400/5 border border-red-400/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-medium">Need Review</span>
                </div>
                <p className="text-2xl font-bold text-white">{cardsReviewed.size - correctAnswers.size}</p>
              </div>
              <div className="bg-gray-400/5 border border-gray-400/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 font-medium">Not Seen</span>
                </div>
                <p className="text-2xl font-bold text-white">{flashcards.length - cardsReviewed.size}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Study Again</span>
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

  // Study mode screen
  if (!currentCard) {
    return (
      <div className="max-w-4xl mx-auto p-0 sm:p-6">
        <div className="text-center py-20">
          <p className="text-gray-400">No flashcards available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-0 sm:p-6">
      {/* Header */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">
              Card {currentCardIndex + 1} of {shuffledCards.length}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(currentCard.difficulty)}`}>
              {currentCard.difficulty}
            </span>
            <span className="text-gray-400 text-xs bg-gray-700 px-2 py-1 rounded">
              {currentCard.topic}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={shuffleCards}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Shuffle cards"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-400">
              {correctAnswers.size}/{cardsReviewed.size} mastered
            </span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-rose-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / shuffledCards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="perspective-1000 mb-6">
        <div 
          className={`relative w-full h-80 cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleCardFlip}
        >
          {/* Front of card */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 h-full flex flex-col justify-center items-center text-center">
              <div className="mb-4">
                <Eye className="w-8 h-8 text-rose-400 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-4">
                {currentCard.front}
              </h2>
              <p className="text-gray-400 text-sm">Click to reveal answer</p>
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 h-full flex flex-col justify-center items-center text-center">
              <div className="mb-4">
                <EyeOff className="w-8 h-8 text-green-400 mx-auto" />
              </div>
              <div className="text-lg text-white mb-6 max-w-md">
                {currentCard.back}
              </div>
              <p className="text-gray-400 text-sm">Rate your knowledge below</p>
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge rating buttons - only show when flipped */}
      {isFlipped && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6">
          <p className="text-white text-center mb-4">Did you know this?</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleKnowCard(false)}
              className="px-6 py-3 bg-red-500/20 text-red-400 border border-red-400/30 rounded-lg hover:bg-red-500/30 transition-colors flex items-center space-x-2"
            >
              <XCircle className="w-4 h-4" />
              <span>No, study more</span>
            </button>
            <button
              onClick={() => handleKnowCard(true)}
              className="px-6 py-3 bg-green-500/20 text-green-400 border border-green-400/30 rounded-lg hover:bg-green-500/30 transition-colors flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Yes, got it!</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        
        <button
          onClick={handleNextCard}
          disabled={currentCardIndex === shuffledCards.length - 1}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}; 