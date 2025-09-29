import React, { useState } from 'react';
import {
  BookOpen, CheckCircle, ChevronRight, ChevronLeft,
  Lightbulb, Target, List, Brain, Trophy, ArrowRight,
  Eye, Code, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TheorySection {
  id: string;
  title: string;
  content: string;
  examples?: {
    title: string;
    description: string;
    code?: string;
  }[];
  keyPoints?: string[];
  interactiveElement?: {
    type: 'visualization' | 'exercise' | 'diagram';
    data: any;
  };
}

interface TheoryLesson {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  prerequisites?: string[];
  sections: TheorySection[];
  summary: string[];
  nextSteps: string[];
  checkYourUnderstanding: {
    question: string;
    answer: string;
  }[];
}

interface TheoryLessonComponentProps {
  lesson: TheoryLesson;
  xpReward: number;
  onComplete: (score: number, xpEarned: number) => void;
  onExit: () => void;
}

export const TheoryLessonComponent: React.FC<TheoryLessonComponentProps> = ({
  lesson,
  xpReward,
  onComplete,
  onExit
}) => {
  const [currentView, setCurrentView] = useState<'objectives' | 'content' | 'summary' | 'check'>('objectives');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [expandedExample, setExpandedExample] = useState<number | null>(null);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set());

  const currentSection = lesson.sections[currentSectionIndex];
  const totalSections = lesson.sections.length;
  const progress = (completedSections.size / totalSections) * 100;

  const handleNextSection = () => {
    const newCompleted = new Set(completedSections);
    newCompleted.add(currentSectionIndex);
    setCompletedSections(newCompleted);

    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setExpandedExample(null);
    } else {
      setCurrentView('summary');
    }
  };

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setExpandedExample(null);
    }
  };

  const toggleAnswer = (index: number) => {
    const newRevealed = new Set(revealedAnswers);
    if (newRevealed.has(index)) {
      newRevealed.delete(index);
    } else {
      newRevealed.add(index);
    }
    setRevealedAnswers(newRevealed);
  };

  const handleComplete = () => {
    onComplete(100, xpReward);
  };

  const renderObjectives = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{lesson.title}</h1>
            <p className="text-gray-400 mt-1">{lesson.description}</p>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Learning Objectives</h2>
          </div>
          <ul className="space-y-3">
            {lesson.learningObjectives.map((objective, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
          <div className="flex items-center space-x-2">
            <List className="w-4 h-4" />
            <span>{totalSections} sections</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>{xpReward} XP</span>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('content')}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center space-x-2"
        >
          <span>Start Learning</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  const renderContent = () => (
    <motion.div
      key={currentSectionIndex}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-5xl mx-auto"
    >
      <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
        {/* Header with progress */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={onExit}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <div className="h-6 w-px bg-gray-600" />
            <span className="text-sm text-gray-400">
              Section {currentSectionIndex + 1} of {totalSections}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">{currentSection.title}</h2>
          </div>
        </div>

        {/* Section Content */}
        <div className="prose prose-invert max-w-none mb-8">
          {currentSection.content.split('\n\n').map((paragraph, index) => {
            // Handle code blocks
            if (paragraph.startsWith('```')) {
              const codeContent = paragraph.replace(/```/g, '').trim();
              return (
                <pre key={index} className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                  <code className="text-sm text-gray-300">{codeContent}</code>
                </pre>
              );
            }

            // Handle regular paragraphs with markdown-style formatting
            const formattedText = paragraph
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
              .replace(/\*(.+?)\*/g, '<em class="text-blue-300">$1</em>')
              .replace(/`(.+?)`/g, '<code class="bg-gray-900 px-2 py-1 rounded text-sm text-cyan-300">$1</code>');

            return (
              <p
                key={index}
                className="text-gray-300 leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: formattedText }}
              />
            );
          })}
        </div>

        {/* Examples */}
        {currentSection.examples && currentSection.examples.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h3 className="text-xl font-semibold text-white">Examples</h3>
            </div>
            <div className="space-y-4">
              {currentSection.examples.map((example, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedExample(expandedExample === index ? null : index)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Code className="w-5 h-5 text-cyan-400" />
                      <span className="font-medium text-white">{example.title}</span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedExample === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedExample === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-700"
                      >
                        <div className="p-4">
                          <p className="text-gray-400 mb-3">{example.description}</p>
                          {example.code && (
                            <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto">
                              <code className="text-sm text-gray-300">{example.code}</code>
                            </pre>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Points */}
        {currentSection.keyPoints && currentSection.keyPoints.length > 0 && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Key Takeaways</h3>
            </div>
            <ul className="space-y-2">
              {currentSection.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-700">
          <button
            onClick={handlePreviousSection}
            disabled={currentSectionIndex === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 ${
              currentSectionIndex === 0
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNextSection}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center space-x-2"
          >
            <span>{currentSectionIndex === totalSections - 1 ? 'View Summary' : 'Next Section'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderSummary = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-green-500/20 rounded-xl">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Lesson Complete!</h2>
            <p className="text-gray-400">You've finished {lesson.title}</p>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Summary</h3>
          <ul className="space-y-3">
            {lesson.summary.map((point, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <ul className="space-y-3">
            {lesson.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start space-x-3">
                <ArrowRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentView('check')}
            className="flex-1 px-6 py-4 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all flex items-center justify-center space-x-2"
          >
            <Eye className="w-5 h-5" />
            <span>Check Your Understanding</span>
          </button>
          <button
            onClick={handleComplete}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center space-x-2"
          >
            <Trophy className="w-5 h-5" />
            <span>Complete (+{xpReward} XP)</span>
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderCheckUnderstanding = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Brain className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Check Your Understanding</h2>
            <p className="text-gray-400">Test your knowledge with these questions</p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {lesson.checkYourUnderstanding.map((item, index) => (
            <div key={index} className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400 font-semibold">{index + 1}</span>
                </div>
                <p className="text-white font-medium flex-1">{item.question}</p>
              </div>

              <button
                onClick={() => toggleAnswer(index)}
                className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium mb-3"
              >
                {revealedAnswers.has(index) ? 'Hide Answer' : 'Show Answer'}
              </button>

              <AnimatePresence>
                {revealedAnswers.has(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-lg p-4"
                  >
                    <p className="text-gray-300">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentView('summary')}
            className="flex-1 px-6 py-4 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all"
          >
            Back to Summary
          </button>
          <button
            onClick={handleComplete}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center space-x-2"
          >
            <Trophy className="w-5 h-5" />
            <span>Complete Lesson (+{xpReward} XP)</span>
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-12">
      <AnimatePresence mode="wait">
        {currentView === 'objectives' && renderObjectives()}
        {currentView === 'content' && renderContent()}
        {currentView === 'summary' && renderSummary()}
        {currentView === 'check' && renderCheckUnderstanding()}
      </AnimatePresence>
    </div>
  );
};