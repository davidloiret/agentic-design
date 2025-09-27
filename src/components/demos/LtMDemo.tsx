'use client';

import React, { useState, useEffect } from 'react';
import { Layers, TrendingUp, CheckCircle, Brain, Sparkles, ArrowRight, PlayCircle, RotateCcw, Lightbulb } from 'lucide-react';

interface SubProblem {
  id: string;
  level: number;
  question: string;
  solution: string;
  understanding: string;
  status: 'pending' | 'solving' | 'solved';
  dependsOn: string[];
}

interface ProblemExample {
  id: string;
  title: string;
  description: string;
  complexProblem: string;
  subProblems: SubProblem[];
  finalAnswer: string;
}

const LtMDemo: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>('compound-interest');
  const [isRunning, setIsRunning] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  const [activeSubProblem, setActiveSubProblem] = useState<string | null>(null);
  const [showFinalAnswer, setShowFinalAnswer] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  const examples: ProblemExample[] = [
    {
      id: 'compound-interest',
      title: 'Compound Interest',
      description: 'Break down a complex financial calculation into understandable steps',
      complexProblem: 'Calculate compound interest for $10,000 invested at 8% annual rate for 15 years with quarterly compounding',
      subProblems: [
        {
          id: 'sp1-1',
          level: 1,
          question: 'What is simple interest?',
          solution: '8% of $10,000 = $10,000 × 0.08 = $800 per year',
          understanding: 'Simple interest is straightforward: principal × rate',
          status: 'pending',
          dependsOn: []
        },
        {
          id: 'sp1-2',
          level: 1,
          question: 'What does quarterly compounding mean?',
          solution: 'Quarterly = 4 times per year. 15 years = 15 × 4 = 60 periods',
          understanding: 'Time periods: quarterly means dividing the year into 4 parts',
          status: 'pending',
          dependsOn: []
        },
        {
          id: 'sp1-3',
          level: 1,
          question: 'What is the growth concept?',
          solution: 'Money grows each period, and the new amount becomes the base for the next period',
          understanding: 'Compound growth: each period builds on the previous total',
          status: 'pending',
          dependsOn: []
        },
        {
          id: 'sp2-1',
          level: 2,
          question: 'What is the quarterly interest rate?',
          solution: 'Annual 8% ÷ 4 quarters = 2% per quarter = 0.02',
          understanding: 'Rate per period = Annual rate ÷ periods per year',
          status: 'pending',
          dependsOn: ['sp1-1', 'sp1-2']
        },
        {
          id: 'sp2-2',
          level: 2,
          question: 'How does compound growth work over 2 quarters?',
          solution: 'Q1: $10,000 × 1.02 = $10,200. Q2: $10,200 × 1.02 = $10,404',
          understanding: 'Pattern: multiply by (1 + rate) each period',
          status: 'pending',
          dependsOn: ['sp2-1', 'sp1-3']
        },
        {
          id: 'sp3-1',
          level: 3,
          question: 'What is the general formula?',
          solution: 'For n periods at rate r: A = P(1 + r)ⁿ = P(1 + 0.02)⁶⁰',
          understanding: 'Generalized the pattern from simple examples',
          status: 'pending',
          dependsOn: ['sp2-2']
        },
        {
          id: 'sp4-1',
          level: 4,
          question: 'Apply formula to original problem',
          solution: 'A = $10,000 × (1.02)⁶⁰ = $10,000 × 3.281 = $32,810',
          understanding: 'Final calculation using built-up understanding',
          status: 'pending',
          dependsOn: ['sp3-1']
        }
      ],
      finalAnswer: '$32,810 - We built understanding from simple interest to compound formula, then applied it!'
    },
    {
      id: 'recursive-function',
      title: 'Recursive Factorial',
      description: 'Understand recursion by building from simple cases',
      complexProblem: 'Implement factorial(5) using recursion',
      subProblems: [
        {
          id: 'rf1-1',
          level: 1,
          question: 'What is factorial of 0?',
          solution: 'factorial(0) = 1 (base case by definition)',
          understanding: 'The simplest case - our foundation',
          status: 'pending',
          dependsOn: []
        },
        {
          id: 'rf1-2',
          level: 1,
          question: 'What is factorial of 1?',
          solution: 'factorial(1) = 1 × factorial(0) = 1 × 1 = 1',
          understanding: 'Building on the base case',
          status: 'pending',
          dependsOn: ['rf1-1']
        },
        {
          id: 'rf2-1',
          level: 2,
          question: 'What is factorial of 2?',
          solution: 'factorial(2) = 2 × factorial(1) = 2 × 1 = 2',
          understanding: 'Pattern emerges: n × factorial(n-1)',
          status: 'pending',
          dependsOn: ['rf1-2']
        },
        {
          id: 'rf2-2',
          level: 2,
          question: 'What is factorial of 3?',
          solution: 'factorial(3) = 3 × factorial(2) = 3 × 2 = 6',
          understanding: 'Recursive pattern confirmed',
          status: 'pending',
          dependsOn: ['rf2-1']
        },
        {
          id: 'rf3-1',
          level: 3,
          question: 'What is the general recursive formula?',
          solution: 'factorial(n) = n × factorial(n-1), with base case factorial(0) = 1',
          understanding: 'Generalized the recursive pattern',
          status: 'pending',
          dependsOn: ['rf2-2']
        },
        {
          id: 'rf4-1',
          level: 4,
          question: 'Apply to factorial(5)',
          solution: 'factorial(5) = 5 × 4 × 3 × 2 × 1 × 1 = 120',
          understanding: 'Confidently apply the recursive formula',
          status: 'pending',
          dependsOn: ['rf3-1']
        }
      ],
      finalAnswer: '120 - We understood recursion by building from the simplest cases!'
    },
    {
      id: 'algorithm-design',
      title: 'Binary Search',
      description: 'Design an efficient search algorithm step by step',
      complexProblem: 'Design an algorithm to search for element 7 in sorted array [1,3,5,7,9,11,13]',
      subProblems: [
        {
          id: 'bs1-1',
          level: 1,
          question: 'How does linear search work?',
          solution: 'Check each element one by one: 1, 3, 5, 7 (found!) - Takes 4 steps',
          understanding: 'Simple but potentially slow for large arrays',
          status: 'pending',
          dependsOn: []
        },
        {
          id: 'bs1-2',
          level: 1,
          question: 'What advantage does sorting give us?',
          solution: 'We know 7 > 5, so it must be in the right half',
          understanding: 'Sorting enables elimination of half the search space',
          status: 'pending',
          dependsOn: []
        },
        {
          id: 'bs2-1',
          level: 2,
          question: 'How to find the middle element?',
          solution: 'Middle index = (start + end) / 2 = (0 + 6) / 2 = 3. Array[3] = 7',
          understanding: 'Check middle to divide search space',
          status: 'pending',
          dependsOn: ['bs1-2']
        },
        {
          id: 'bs2-2',
          level: 2,
          question: 'What if target > middle?',
          solution: 'Search right half [9,11,13]. What if target < middle? Search left half.',
          understanding: 'Eliminate half the remaining elements each time',
          status: 'pending',
          dependsOn: ['bs2-1']
        },
        {
          id: 'bs3-1',
          level: 3,
          question: 'What is the general algorithm?',
          solution: 'While search space exists: check middle, if found return, else search left/right half',
          understanding: 'Binary search: repeatedly halve search space',
          status: 'pending',
          dependsOn: ['bs2-2']
        },
        {
          id: 'bs4-1',
          level: 4,
          question: 'Apply to find 7 in [1,3,5,7,9,11,13]',
          solution: 'Step 1: middle=7 at index 3. Found immediately! Complexity: O(log n)',
          understanding: 'Much faster than linear search for large arrays',
          status: 'pending',
          dependsOn: ['bs3-1']
        }
      ],
      finalAnswer: 'Found at index 3 in 1 step! Binary search is O(log n) vs O(n) for linear search.'
    }
  ];

  const getCurrentExample = (): ProblemExample => {
    return examples.find(ex => ex.id === selectedExample) || examples[0];
  };

  const getMaxLevel = (example: ProblemExample): number => {
    return Math.max(...example.subProblems.map(sp => sp.level));
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentLevel(0);
    setSolvedProblems(new Set());
    setActiveSubProblem(null);
    setShowFinalAnswer(false);
    setAnimationProgress(0);
  };

  const runLeastToMost = async () => {
    resetDemo();
    setIsRunning(true);
    const example = getCurrentExample();
    const maxLevel = getMaxLevel(example);
    const solved = new Set<string>();

    for (let level = 1; level <= maxLevel; level++) {
      setCurrentLevel(level);
      setAnimationProgress(0);

      const problemsAtLevel = example.subProblems.filter(sp => sp.level === level);

      for (const subProblem of problemsAtLevel) {
        setActiveSubProblem(subProblem.id);
        setAnimationProgress(0);

        await new Promise(resolve => setTimeout(resolve, 800));

        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += 10;
          setAnimationProgress(progress);
          if (progress >= 100) clearInterval(progressInterval);
        }, 100);

        await new Promise(resolve => setTimeout(resolve, 1500));

        solved.add(subProblem.id);
        setSolvedProblems(new Set(solved));
        setActiveSubProblem(null);

        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setShowFinalAnswer(true);
    setIsRunning(false);
  };

  const getLevelColor = (level: number) => {
    const colors = [
      'border-green-500 bg-green-950',
      'border-cyan-500 bg-cyan-950',
      'border-purple-500 bg-purple-950',
      'border-orange-500 bg-orange-950'
    ];
    return colors[(level - 1) % colors.length] || colors[0];
  };

  const getLevelLabel = (level: number) => {
    const labels = ['Foundation', 'Combine Concepts', 'Generalize', 'Apply'];
    return labels[level - 1] || `Level ${level}`;
  };

  const example = getCurrentExample();
  const maxLevel = getMaxLevel(example);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Least-to-Most Prompting Demo</h2>
        <p className="text-gray-400 mb-6">
          Progressive problem decomposition: break complex problems into simpler sub-problems,
          solving from easiest to most complex while building understanding at each level.
        </p>

        {/* Example Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Select Problem Type</h3>
          <div className="flex flex-wrap gap-3">
            {examples.map(ex => (
              <button
                key={ex.id}
                onClick={() => {
                  setSelectedExample(ex.id);
                  resetDemo();
                }}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedExample === ex.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {ex.title}
              </button>
            ))}
          </div>
        </div>

        {/* Problem Description */}
        <div className="mb-6 bg-gray-900 p-4 rounded border border-gray-700">
          <h3 className="text-lg font-semibold mb-2 text-gray-200 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            {example.title}
          </h3>
          <p className="text-sm text-gray-400 mb-3">{example.description}</p>
          <div className="bg-red-950 border border-red-800 rounded p-3">
            <p className="text-sm font-medium text-red-300 mb-1">❌ Complex Problem (Direct Approach Often Fails):</p>
            <p className="text-gray-200">{example.complexProblem}</p>
          </div>
        </div>

        {/* Level-by-Level Breakdown */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            Progressive Problem Decomposition
          </h3>

          <div className="space-y-4">
            {Array.from({ length: maxLevel }, (_, i) => i + 1).map(level => {
              const problemsAtLevel = example.subProblems.filter(sp => sp.level === level);
              const isCurrentLevel = currentLevel === level;
              const isPastLevel = currentLevel > level;

              return (
                <div key={level} className="space-y-2">
                  <div className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    isCurrentLevel ? getLevelColor(level) : isPastLevel ? 'border-gray-600 bg-gray-800' : 'border-gray-700 bg-gray-900'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      isCurrentLevel ? 'bg-white text-gray-900' :
                      isPastLevel ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {isPastLevel ? <CheckCircle className="w-5 h-5" /> : level}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">
                        Level {level}: {getLevelLabel(level)}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {problemsAtLevel.length} sub-problem{problemsAtLevel.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    {isCurrentLevel && (
                      <TrendingUp className="w-5 h-5 text-yellow-400 animate-pulse" />
                    )}
                  </div>

                  {/* Sub-problems at this level */}
                  <div className="ml-11 space-y-2">
                    {problemsAtLevel.map(subProblem => {
                      const isSolved = solvedProblems.has(subProblem.id);
                      const isActive = activeSubProblem === subProblem.id;

                      return (
                        <div
                          key={subProblem.id}
                          className={`p-3 rounded-lg border transition-all ${
                            isActive ? 'border-yellow-500 bg-yellow-950' :
                            isSolved ? 'border-green-700 bg-green-950' :
                            'border-gray-700 bg-gray-900 opacity-60'
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-2">
                            {isSolved ? (
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            ) : isActive ? (
                              <Brain className="w-5 h-5 text-yellow-400 animate-pulse flex-shrink-0 mt-0.5" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-200 mb-1">
                                {subProblem.question}
                              </p>
                              {(isSolved || isActive) && (
                                <>
                                  <p className="text-sm text-green-300 mb-1">
                                    💡 {subProblem.solution}
                                  </p>
                                  <p className="text-xs text-gray-400 italic">
                                    {subProblem.understanding}
                                  </p>
                                </>
                              )}
                              {isActive && animationProgress > 0 && (
                                <div className="mt-2 w-full bg-gray-800 rounded-full h-1.5">
                                  <div
                                    className="bg-yellow-500 h-1.5 rounded-full transition-all duration-300"
                                    style={{ width: `${animationProgress}%` }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Answer */}
        {showFinalAnswer && (
          <div className="mb-6 bg-green-950 border-2 border-green-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-green-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              ✅ Final Answer
            </h3>
            <p className="text-white text-lg mb-2">{example.finalAnswer}</p>
            <p className="text-sm text-green-300">
              By breaking down the complex problem and building understanding from simple to complex,
              we arrived at the correct solution with confidence!
            </p>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-3">
          <button
            onClick={runLeastToMost}
            disabled={isRunning}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isRunning ? (
              <>
                <Brain className="w-5 h-5 animate-pulse" />
                Solving Step by Step...
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                Run Least-to-Most Decomposition
              </>
            )}
          </button>
          <button
            onClick={resetDemo}
            disabled={isRunning}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        {/* How It Works */}
        <div className="mt-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" />
            How Least-to-Most Prompting Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold flex-shrink-0">1.</span>
              <div>
                <p className="font-medium text-gray-200">Decomposition</p>
                <p className="text-xs text-gray-400">Break complex problem into hierarchy of simpler sub-problems</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold flex-shrink-0">2.</span>
              <div>
                <p className="font-medium text-gray-200">Sequential Solving (Least → Most)</p>
                <p className="text-xs text-gray-400">Solve sub-problems starting with simplest, progressing to more complex</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold flex-shrink-0">3.</span>
              <div>
                <p className="font-medium text-gray-200">Context Building</p>
                <p className="text-xs text-gray-400">Each solution provides context and foundation for the next level</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold flex-shrink-0">4.</span>
              <div>
                <p className="font-medium text-gray-200">Integration</p>
                <p className="text-xs text-gray-400">Combine all sub-solutions to solve the original complex problem</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mt-6 bg-blue-950 border border-blue-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-blue-300">Key Benefits</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">Builds understanding progressively from simple to complex</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">Each step validated before proceeding to next level</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">Reduces cognitive load on the model</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">More accurate than direct complex reasoning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LtMDemo;