'use client';

import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Brain, Code, Database, Calculator, Puzzle, TrendingUp, AlertTriangle, Target } from 'lucide-react';

type Phase = 'idle' | 'domain-evaluation' | 'capability-assessment' | 'analysis' | 'complete';

interface Task {
  id: string;
  name: string;
  domain: string;
  status: 'pending' | 'running' | 'completed';
  result?: 'pass' | 'fail';
}

interface Domain {
  id: string;
  name: string;
  icon: React.ReactNode;
  score: number;
  status: 'pending' | 'evaluating' | 'completed';
}

interface Capability {
  id: string;
  name: string;
  description: string;
  score: number;
  rating: 'excellent' | 'good' | 'fair' | 'poor';
  status: 'pending' | 'assessing' | 'completed';
}

export default function MmauBenchmarkDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [domains, setDomains] = useState<Domain[]>([
    { id: 'tool-use', name: 'Tool-use', icon: <Code className="w-4 h-4" />, score: 0, status: 'pending' },
    { id: 'dag-qa', name: 'DAG QA', icon: <Puzzle className="w-4 h-4" />, score: 0, status: 'pending' },
    { id: 'data-science', name: 'Data Science', icon: <Database className="w-4 h-4" />, score: 0, status: 'pending' },
    { id: 'programming', name: 'Programming', icon: <Code className="w-4 h-4" />, score: 0, status: 'pending' },
    { id: 'mathematics', name: 'Mathematics', icon: <Calculator className="w-4 h-4" />, score: 0, status: 'pending' }
  ]);
  const [capabilities, setCapabilities] = useState<Capability[]>([
    { id: 'understanding', name: 'Understanding', description: 'Comprehend complex instructions', score: 0, rating: 'fair', status: 'pending' },
    { id: 'reasoning', name: 'Reasoning', description: 'Apply logical thinking', score: 0, rating: 'fair', status: 'pending' },
    { id: 'planning', name: 'Planning', description: 'Break down complex tasks', score: 0, rating: 'fair', status: 'pending' },
    { id: 'problem-solving', name: 'Problem-solving', description: 'Find creative solutions', score: 0, rating: 'fair', status: 'pending' },
    { id: 'self-correction', name: 'Self-correction', description: 'Identify and fix mistakes', score: 0, rating: 'fair', status: 'pending' }
  ]);
  const [overallScore, setOverallScore] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  const sampleTasks: Task[] = [
    { id: 't1', name: 'API Documentation Parsing', domain: 'tool-use', status: 'pending' },
    { id: 't2', name: 'Function Call Composition', domain: 'tool-use', status: 'pending' },
    { id: 't3', name: 'Dependency Graph Analysis', domain: 'dag-qa', status: 'pending' },
    { id: 't4', name: 'Data Cleaning Pipeline', domain: 'data-science', status: 'pending' },
    { id: 't5', name: 'Algorithm Implementation', domain: 'programming', status: 'pending' },
    { id: 't6', name: 'Calculus Problem Solving', domain: 'mathematics', status: 'pending' }
  ];

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'idle') {
      setCurrentTask(null);
      setDomains(prev => prev.map(d => ({ ...d, score: 0, status: 'pending' })));
      setCapabilities(prev => prev.map(c => ({ ...c, score: 0, rating: 'fair', status: 'pending' })));
      setOverallScore(0);
      setTasksCompleted(0);
    }

    if (phase === 'domain-evaluation') {
      let taskIndex = 0;

      const runNextTask = () => {
        if (taskIndex >= sampleTasks.length) {
          const timeout = setTimeout(() => {
            setCurrentTask(null);
            setPhase('capability-assessment');
          }, 200);
          timeouts.push(timeout);
          return;
        }

        const task = sampleTasks[taskIndex];
        const timeout1 = setTimeout(() => {
          // Mark domain as evaluating
          setDomains(prev => prev.map(d =>
            d.id === task.domain ? { ...d, status: 'evaluating' as const } : d
          ));

          // Show current task
          setCurrentTask({ ...task, status: 'running' });

          const timeout2 = setTimeout(() => {
            // Task completes
            const success = Math.random() > 0.25;
            setCurrentTask({ ...task, status: 'completed', result: success ? 'pass' : 'fail' });
            setTasksCompleted(prev => prev + 1);

            // Update domain score
            setDomains(prev => prev.map(d => {
              if (d.id === task.domain) {
                const tasksInDomain = sampleTasks.filter(t => t.domain === task.domain).length;
                const completedInDomain = taskIndex + 1;
                const isLastInDomain = completedInDomain === tasksInDomain ||
                  !sampleTasks.slice(taskIndex + 1).some(t => t.domain === task.domain);

                const newScore = d.score + (success ? 0.73 : 0.4);
                return {
                  ...d,
                  score: isLastInDomain ? newScore / tasksInDomain : newScore,
                  status: isLastInDomain ? 'completed' as const : d.status
                };
              }
              return d;
            }));

            taskIndex++;
            const timeout3 = setTimeout(runNextTask, 100);
            timeouts.push(timeout3);
          }, 250);
          timeouts.push(timeout2);
        }, 100);
        timeouts.push(timeout1);
      };

      runNextTask();
    }

    if (phase === 'capability-assessment') {
      let capIndex = 0;

      const assessCapability = () => {
        if (capIndex >= capabilities.length) {
          const timeout = setTimeout(() => {
            setPhase('analysis');
          }, 200);
          timeouts.push(timeout);
          return;
        }

        const capability = capabilities[capIndex];
        const timeout1 = setTimeout(() => {
          setCapabilities(prev => prev.map((c, idx) =>
            idx === capIndex ? { ...c, status: 'assessing' as const } : c
          ));

          const timeout2 = setTimeout(() => {
            let score: number;
            let rating: 'excellent' | 'good' | 'fair' | 'poor';

            // Scores based on capability type
            if (capability.id === 'understanding') {
              score = 0.74 + Math.random() * 0.07;
              rating = 'good';
            } else if (capability.id === 'problem-solving') {
              score = 0.68 + Math.random() * 0.06;
              rating = 'good';
            } else if (capability.id === 'reasoning') {
              score = 0.66 + Math.random() * 0.05;
              rating = 'good';
            } else if (capability.id === 'planning') {
              score = 0.61 + Math.random() * 0.05;
              rating = 'fair';
            } else {
              score = 0.59 + Math.random() * 0.05;
              rating = 'fair';
            }

            setCapabilities(prev => prev.map((c, idx) =>
              idx === capIndex ? { ...c, score, rating, status: 'completed' as const } : c
            ));

            capIndex++;
            const timeout3 = setTimeout(assessCapability, 150);
            timeouts.push(timeout3);
          }, 200);
          timeouts.push(timeout2);
        }, 50);
        timeouts.push(timeout1);
      };

      assessCapability();
    }

    if (phase === 'analysis') {
      const timeout = setTimeout(() => {
        const domainScores = domains.map(d => d.score);
        const avgScore = domainScores.reduce((a, b) => a + b, 0) / domainScores.length;
        setOverallScore(avgScore);

        const timeout2 = setTimeout(() => {
          setPhase('complete');
        }, 500);
        timeouts.push(timeout2);
      }, 300);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [phase]);

  const runDemo = () => {
    setPhase('domain-evaluation');
  };

  const resetDemo = () => {
    setPhase('idle');
  };

  const getRatingColor = (rating: 'excellent' | 'good' | 'fair' | 'poor') => {
    switch (rating) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'fair': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
    }
  };

  const getRatingBg = (rating: 'excellent' | 'good' | 'fair' | 'poor') => {
    switch (rating) {
      case 'excellent': return 'bg-green-500/10';
      case 'good': return 'bg-blue-500/10';
      case 'fair': return 'bg-yellow-500/10';
      case 'poor': return 'bg-red-500/10';
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">MMAU Benchmark Demo</h3>
            <p className="text-sm text-gray-400">5 domains • 20 tasks • 5 capabilities</p>
          </div>
        </div>
        <button
          onClick={phase === 'complete' ? resetDemo : runDemo}
          disabled={phase !== 'idle' && phase !== 'complete'}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg flex items-center gap-2 ${
            phase === 'idle' || phase === 'complete'
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
              : 'bg-slate-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Play className="w-4 h-4" />
          {phase === 'complete' ? 'Run Again' : 'Start Evaluation'}
        </button>
      </div>

      {phase !== 'idle' && (
        <div className="space-y-6">
          {/* Current Task */}
          {currentTask && phase === 'domain-evaluation' && (
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-blue-400" />
                <h4 className="font-semibold text-white">Current Task</h4>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">{currentTask.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Domain: {domains.find(d => d.id === currentTask.domain)?.name} • Task {tasksCompleted + 1}/20
                  </div>
                </div>
                {currentTask.status === 'running' && (
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                )}
                {currentTask.status === 'completed' && currentTask.result === 'pass' && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
                {currentTask.status === 'completed' && currentTask.result === 'fail' && (
                  <div className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">Failed</div>
                )}
              </div>
            </div>
          )}

          {/* Domain Evaluation */}
          {(phase === 'domain-evaluation' || phase === 'capability-assessment' || phase === 'analysis' || phase === 'complete') && (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-4 h-4 text-blue-400" />
                <h4 className="font-semibold text-white">Domain Performance</h4>
              </div>
              <div className="space-y-2">
                {domains.map(domain => (
                  <div key={domain.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded border border-slate-600/30">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-400">{domain.icon}</div>
                      <div className="font-medium text-white text-sm">{domain.name}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {domain.status === 'completed' && (
                        <div className="text-sm font-medium text-white">
                          {(domain.score * 100).toFixed(1)}%
                        </div>
                      )}
                      {domain.status === 'evaluating' && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      )}
                      {domain.status === 'completed' && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Capability Assessment */}
          {(phase === 'capability-assessment' || phase === 'analysis' || phase === 'complete') && (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <h4 className="font-semibold text-white">Capability Assessment</h4>
              </div>
              <div className="space-y-2">
                {capabilities.map(capability => (
                  <div key={capability.id} className="p-3 bg-slate-800/30 rounded border border-slate-600/30">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-white text-sm">{capability.name}</div>
                      <div className="flex items-center gap-2">
                        {capability.status === 'completed' && (
                          <>
                            <div className="text-sm font-medium text-white">
                              {(capability.score * 100).toFixed(1)}%
                            </div>
                            <div className={`px-2 py-0.5 rounded text-xs font-medium ${getRatingBg(capability.rating)} ${getRatingColor(capability.rating)}`}>
                              {capability.rating}
                            </div>
                          </>
                        )}
                        {capability.status === 'assessing' && (
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{capability.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis & Results */}
          {(phase === 'analysis' || phase === 'complete') && (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <h4 className="font-semibold text-white">Overall Results</h4>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/30">
                <div className="text-sm text-gray-300 mb-1">MMAU Score</div>
                <div className="text-3xl font-bold text-white">{(overallScore * 100).toFixed(1)}%</div>
                <div className="text-xs text-gray-400 mt-2">
                  {tasksCompleted} tasks completed across 5 domains
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-500/10 rounded border border-amber-500/30 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                <div className="text-sm text-amber-200">
                  MMAU evaluates agents holistically: understanding, reasoning, planning, problem-solving, and self-correction
                </div>
              </div>
            </div>
          )}

          {/* Completion */}
          {phase === 'complete' && (
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/30">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <div className="font-semibold text-white">Evaluation Complete</div>
                  <div className="text-sm text-gray-300">
                    Assessed all 5 capabilities across 20 diverse tasks
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {phase === 'idle' && (
        <div className="text-center py-12">
          <div className="mb-4">
            <Brain className="w-16 h-16 text-purple-500/30 mx-auto" />
          </div>
          <p className="text-gray-400 mb-2">Click "Start Evaluation" to see MMAU in action</p>
          <p className="text-sm text-gray-500">Watch how agents are evaluated across domains and capabilities</p>
        </div>
      )}
    </div>
  );
}