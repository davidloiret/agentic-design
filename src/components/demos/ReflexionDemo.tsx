'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Brain, History, Target, TrendingUp, AlertCircle, CheckCircle, Lightbulb, BookOpen, RefreshCw, MessageSquare } from 'lucide-react';

interface Episode {
  id: string;
  attempt: number;
  action: string;
  result: 'success' | 'failure' | 'partial';
  score: number;
  context: {
    task: string;
    approach: string;
    parameters: any;
  };
}

interface Reflection {
  episodeId: string;
  type: 'tactical' | 'strategic' | 'conceptual';
  insight: string;
  actionableLesson: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
}

interface MemoryEntry {
  id: string;
  pattern: string;
  successRate: number;
  applications: number;
  lastUsed: string;
  refinements: string[];
}

interface LearningTask {
  id: string;
  type: 'problem-solving' | 'optimization' | 'creative' | 'analytical';
  title: string;
  description: string;
  objective: string;
  targetScore: number;
  maxAttempts: number;
}

interface PerformanceMetrics {
  attemptNumber: number;
  score: number;
  improvement: number;
  strategiesUsed: string[];
  timeToSolution: number;
}

const LEARNING_TASKS: LearningTask[] = [
  {
    id: 'code-optimization',
    type: 'optimization',
    title: 'Algorithm Optimization',
    description: 'Optimize a sorting algorithm for better performance',
    objective: 'Reduce time complexity from O(n²) to O(n log n)',
    targetScore: 90,
    maxAttempts: 4
  },
  {
    id: 'puzzle-solving',
    type: 'problem-solving',
    title: 'Logic Puzzle Solver',
    description: 'Solve increasingly complex logic puzzles',
    objective: 'Find the optimal solution path with minimal steps',
    targetScore: 85,
    maxAttempts: 5
  },
  {
    id: 'creative-writing',
    type: 'creative',
    title: 'Story Generation',
    description: 'Generate engaging story openings',
    objective: 'Create compelling narrative hooks that engage readers',
    targetScore: 80,
    maxAttempts: 3
  },
  {
    id: 'data-analysis',
    type: 'analytical',
    title: 'Pattern Recognition',
    description: 'Identify patterns in complex datasets',
    objective: 'Discover hidden correlations and insights',
    targetScore: 88,
    maxAttempts: 4
  }
];

const generateEpisode = (task: LearningTask, attempt: number, previousReflections: Reflection[]): Episode => {
  const baseScore = 45 + Math.random() * 20;
  const learningBonus = previousReflections.length * 8;
  const attemptBonus = attempt * 5;
  const score = Math.min(100, baseScore + learningBonus + attemptBonus);

  const approaches: { [key: string]: string[] } = {
    'code-optimization': [
      'Bubble sort implementation',
      'Quick sort with random pivot',
      'Merge sort with optimization',
      'Heap sort with improved heapify'
    ],
    'puzzle-solving': [
      'Brute force search',
      'Heuristic-guided search',
      'A* with improved heuristic',
      'Dynamic programming approach'
    ],
    'creative-writing': [
      'Traditional narrative opening',
      'In medias res technique',
      'Character-driven hook with dialogue',
      'Atmospheric scene-setting'
    ],
    'data-analysis': [
      'Basic statistical analysis',
      'Correlation matrix exploration',
      'Machine learning clustering',
      'Advanced pattern mining'
    ]
  };

  const approach = approaches[task.id]?.[Math.min(attempt, 3)] || 'Standard approach';

  return {
    id: `episode-${task.id}-${attempt}`,
    attempt,
    action: `Attempt ${attempt + 1}: ${approach}`,
    result: score >= task.targetScore ? 'success' : score >= task.targetScore * 0.8 ? 'partial' : 'failure',
    score,
    context: {
      task: task.title,
      approach,
      parameters: {
        complexity: attempt > 2 ? 'high' : 'medium',
        optimization: attempt > 1 ? 'enabled' : 'disabled'
      }
    }
  };
};

const generateReflection = (episode: Episode, task: LearningTask, previousEpisodes: Episode[]): Reflection => {
  const reflectionTypes: { [key: string]: { [key: string]: Reflection } } = {
    'code-optimization': {
      failure: {
        episodeId: episode.id,
        type: 'tactical',
        insight: 'The bubble sort approach has inherent O(n²) complexity that cannot be optimized further',
        actionableLesson: 'Switch to divide-and-conquer algorithms like merge sort or quick sort for better complexity',
        confidence: 0.85,
        impact: 'high'
      },
      partial: {
        episodeId: episode.id,
        type: 'strategic',
        insight: 'Quick sort performs well on average but degrades on sorted data',
        actionableLesson: 'Implement pivot selection strategy and consider hybrid approaches',
        confidence: 0.9,
        impact: 'medium'
      },
      success: {
        episodeId: episode.id,
        type: 'conceptual',
        insight: 'Heap sort provides consistent O(n log n) performance with in-place sorting',
        actionableLesson: 'Prioritize algorithms with guaranteed complexity bounds for production systems',
        confidence: 0.95,
        impact: 'high'
      }
    },
    'puzzle-solving': {
      failure: {
        episodeId: episode.id,
        type: 'tactical',
        insight: 'Brute force exploration leads to exponential search space',
        actionableLesson: 'Apply heuristics to prune unpromising branches early',
        confidence: 0.88,
        impact: 'high'
      },
      partial: {
        episodeId: episode.id,
        type: 'strategic',
        insight: 'Heuristics improve performance but may miss optimal solutions',
        actionableLesson: 'Balance exploration vs exploitation with admissible heuristics',
        confidence: 0.82,
        impact: 'medium'
      },
      success: {
        episodeId: episode.id,
        type: 'conceptual',
        insight: 'Dynamic programming eliminates redundant computation through memoization',
        actionableLesson: 'Identify overlapping subproblems to apply DP effectively',
        confidence: 0.92,
        impact: 'high'
      }
    },
    'creative-writing': {
      failure: {
        episodeId: episode.id,
        type: 'tactical',
        insight: 'Generic openings fail to capture reader attention',
        actionableLesson: 'Start with conflict, mystery, or unexpected elements',
        confidence: 0.78,
        impact: 'medium'
      },
      partial: {
        episodeId: episode.id,
        type: 'strategic',
        insight: 'In medias res creates engagement but may confuse without context',
        actionableLesson: 'Balance action with necessary exposition through dialogue',
        confidence: 0.83,
        impact: 'medium'
      },
      success: {
        episodeId: episode.id,
        type: 'conceptual',
        insight: 'Character voice and immediate conflict create emotional investment',
        actionableLesson: 'Prioritize character-driven narratives with clear stakes',
        confidence: 0.87,
        impact: 'high'
      }
    },
    'data-analysis': {
      failure: {
        episodeId: episode.id,
        type: 'tactical',
        insight: 'Simple statistics miss non-linear relationships',
        actionableLesson: 'Apply dimensionality reduction and clustering techniques',
        confidence: 0.84,
        impact: 'high'
      },
      partial: {
        episodeId: episode.id,
        type: 'strategic',
        insight: 'Correlation analysis reveals linear patterns but not causation',
        actionableLesson: 'Combine correlation with domain knowledge and hypothesis testing',
        confidence: 0.89,
        impact: 'medium'
      },
      success: {
        episodeId: episode.id,
        type: 'conceptual',
        insight: 'Ensemble methods capture complex patterns through multiple perspectives',
        actionableLesson: 'Layer complementary analytical approaches for robust insights',
        confidence: 0.91,
        impact: 'high'
      }
    }
  };

  const taskReflections = reflectionTypes[task.id];
  if (taskReflections) {
    if (episode.result === 'success') return taskReflections.success;
    if (episode.result === 'partial') return taskReflections.partial;
    return taskReflections.failure;
  }

  // Default reflection
  return {
    episodeId: episode.id,
    type: 'tactical',
    insight: `Performance score of ${episode.score} indicates room for improvement`,
    actionableLesson: 'Analyze failure points and adjust approach',
    confidence: 0.75,
    impact: 'medium'
  };
};

const consolidateMemory = (reflections: Reflection[], task: LearningTask): MemoryEntry[] => {
  const memories: MemoryEntry[] = [];

  // Group reflections by impact and type
  const highImpactReflections = reflections.filter(r => r.impact === 'high');

  if (highImpactReflections.length > 0) {
    memories.push({
      id: `memory-${task.id}-1`,
      pattern: highImpactReflections[0].actionableLesson,
      successRate: 0.85,
      applications: highImpactReflections.length,
      lastUsed: new Date().toISOString(),
      refinements: highImpactReflections.slice(1).map(r => r.insight)
    });
  }

  // Add strategic patterns
  const strategicReflections = reflections.filter(r => r.type === 'strategic');
  if (strategicReflections.length > 0) {
    memories.push({
      id: `memory-${task.id}-2`,
      pattern: 'Balance exploration with exploitation in solution search',
      successRate: 0.78,
      applications: strategicReflections.length,
      lastUsed: new Date().toISOString(),
      refinements: strategicReflections.map(r => r.actionableLesson)
    });
  }

  return memories;
};

export const ReflexionDemo: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState(LEARNING_TASKS[0]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [memory, setMemory] = useState<MemoryEntry[]>([]);
  const [performance, setPerformance] = useState<PerformanceMetrics[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [speed, setSpeed] = useState(2);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const resetDemo = useCallback(() => {
    setCurrentPhase('');
    setIsRunning(false);
    setCurrentAttempt(0);
    setEpisodes([]);
    setReflections([]);
    setMemory([]);
    setPerformance([]);
    setFinalScore(0);
    setExecutionLog([]);
  }, []);

  useEffect(() => {
    resetDemo();
  }, [selectedTask, resetDemo]);

  const runReflexionCycle = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🚀 Starting Reflexion learning cycle...']);

    let allEpisodes: Episode[] = [];
    let allReflections: Reflection[] = [];
    let metrics: PerformanceMetrics[] = [];
    let successAchieved = false;

    for (let attempt = 0; attempt < selectedTask.maxAttempts && !successAchieved; attempt++) {
      setCurrentAttempt(attempt);

      // Phase 1: Action/Episode
      setCurrentPhase('action');
      setExecutionLog(prev => [...prev, `🎯 Attempt ${attempt + 1}/${selectedTask.maxAttempts}...`]);
      await new Promise(resolve => setTimeout(resolve, 1500 / speed));

      const episode = generateEpisode(selectedTask, attempt, allReflections);
      allEpisodes.push(episode);
      setEpisodes([...allEpisodes]);

      setExecutionLog(prev => [...prev, `✅ Action completed: ${episode.approach}`]);
      setExecutionLog(prev => [...prev, `  → Score: ${episode.score.toFixed(1)}/100`]);
      setExecutionLog(prev => [...prev, `  → Result: ${episode.result}`]);

      // Check for success
      if (episode.result === 'success') {
        successAchieved = true;
        setExecutionLog(prev => [...prev, `🎯 Target score achieved!`]);
      }

      // Phase 2: Reflection
      if (!successAchieved || attempt === 0) {
        setCurrentPhase('reflection');
        setExecutionLog(prev => [...prev, `🤔 Reflecting on performance...`]);
        await new Promise(resolve => setTimeout(resolve, 1200 / speed));

        const reflection = generateReflection(episode, selectedTask, allEpisodes);
        allReflections.push(reflection);
        setReflections([...allReflections]);

        setExecutionLog(prev => [...prev, `💡 Insight: ${reflection.insight}`]);
        setExecutionLog(prev => [...prev, `  → Type: ${reflection.type}`]);
        setExecutionLog(prev => [...prev, `  → Impact: ${reflection.impact}`]);
        setExecutionLog(prev => [...prev, `  → Confidence: ${(reflection.confidence * 100).toFixed(0)}%`]);
      }

      // Phase 3: Memory Update
      if (allReflections.length > 0 && (attempt % 2 === 1 || successAchieved)) {
        setCurrentPhase('memory');
        setExecutionLog(prev => [...prev, `📚 Updating episodic memory...`]);
        await new Promise(resolve => setTimeout(resolve, 800 / speed));

        const memoryEntries = consolidateMemory(allReflections, selectedTask);
        setMemory(memoryEntries);
        setExecutionLog(prev => [...prev, `✅ Memory consolidated: ${memoryEntries.length} patterns stored`]);
      }

      // Track performance
      const metric: PerformanceMetrics = {
        attemptNumber: attempt + 1,
        score: episode.score,
        improvement: attempt > 0 ? episode.score - allEpisodes[attempt - 1].score : 0,
        strategiesUsed: allReflections.map(r => r.type),
        timeToSolution: (attempt + 1) * 2
      };
      metrics.push(metric);
      setPerformance([...metrics]);
    }

    // Final phase
    setCurrentPhase('complete');
    const bestEpisode = allEpisodes.reduce((best, ep) => ep.score > best.score ? ep : best);
    setFinalScore(bestEpisode.score);

    setExecutionLog(prev => [...prev, '📊 Learning cycle complete!']);
    setExecutionLog(prev => [...prev, `  → Best score: ${bestEpisode.score.toFixed(1)}/100`]);
    setExecutionLog(prev => [...prev, `  → Total reflections: ${allReflections.length}`]);
    setExecutionLog(prev => [...prev, `  → Patterns learned: ${memory.length}`]);

    const improvement = allEpisodes.length > 1
      ? allEpisodes[allEpisodes.length - 1].score - allEpisodes[0].score
      : 0;
    setExecutionLog(prev => [...prev, `  → Overall improvement: ${improvement > 0 ? '+' : ''}${improvement.toFixed(1)} points`]);

    setIsRunning(false);
  }, [selectedTask, speed, memory]);

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'action': return <Target className="w-4 h-4" />;
      case 'reflection': return <Brain className="w-4 h-4" />;
      case 'memory': return <BookOpen className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'success': return 'text-green-400';
      case 'partial': return 'text-yellow-400';
      case 'failure': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🔄</span>
          Reflexion Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how agents learn from experience through self-reflection and episodic memory to improve performance.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Learning Task
            </label>
            <select
              value={selectedTask.id}
              onChange={(e) => {
                const task = LEARNING_TASKS.find(t => t.id === e.target.value);
                if (task) setSelectedTask(task);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LEARNING_TASKS.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <button
                onClick={runReflexionCycle}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Learning...' : 'Start Learning'}
              </button>

              <button
                onClick={resetDemo}
                disabled={isRunning}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Task Details */}
        <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-white">{selectedTask.title}</h4>
            <div className="flex gap-3 text-sm">
              <span className="text-gray-400">Target: {selectedTask.targetScore}/100</span>
              <span className="text-gray-400">Max Attempts: {selectedTask.maxAttempts}</span>
            </div>
          </div>
          <p className="text-sm text-gray-300 mb-2">{selectedTask.description}</p>
          <div className="text-sm text-blue-400">Objective: {selectedTask.objective}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Timeline */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Learning Timeline</h3>

          {/* Episodes & Reflections */}
          <div className="space-y-4 mb-6">
            {episodes.map((episode, idx) => {
              const reflection = reflections.find(r => r.episodeId === episode.id);
              const isActive = currentAttempt === idx && isRunning;

              return (
                <div key={episode.id} className={`border rounded-lg transition-all ${
                  isActive ? 'border-blue-500 bg-blue-900/20' :
                  episode.result === 'success' ? 'border-green-500 bg-green-900/20' :
                  episode.result === 'partial' ? 'border-yellow-500 bg-yellow-900/20' :
                  'border-red-500 bg-red-900/20'
                }`}>
                  <div className="p-4">
                    {/* Episode Header */}
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white flex items-center gap-2">
                        Attempt {episode.attempt + 1}
                        {isActive && currentPhase && getPhaseIcon(currentPhase)}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-bold ${getResultColor(episode.result)}`}>
                          {episode.result.toUpperCase()}
                        </span>
                        <span className="text-lg font-bold text-white">
                          {episode.score.toFixed(1)}/100
                        </span>
                      </div>
                    </div>

                    {/* Episode Details */}
                    <div className="mb-3 p-3 bg-gray-900/50 rounded">
                      <div className="text-sm text-gray-300">
                        <div className="mb-1"><strong>Approach:</strong> {episode.context.approach}</div>
                        <div className="text-xs text-gray-400">
                          Complexity: {episode.context.parameters.complexity} |
                          Optimization: {episode.context.parameters.optimization}
                        </div>
                      </div>
                    </div>

                    {/* Reflection */}
                    {reflection && (
                      <div className="p-3 bg-gray-900/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-purple-400 flex items-center gap-1">
                            <Lightbulb className="w-3 h-3" /> Reflection
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            reflection.type === 'conceptual' ? 'bg-purple-600' :
                            reflection.type === 'strategic' ? 'bg-blue-600' :
                            'bg-gray-600'
                          } text-white`}>
                            {reflection.type}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-400">Insight:</span>
                            <div className="text-gray-300">{reflection.insight}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Lesson:</span>
                            <div className="text-blue-300">{reflection.actionableLesson}</div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>
                              Impact: <span className={getImpactColor(reflection.impact)}>{reflection.impact}</span>
                            </span>
                            <span>
                              Confidence: <span className="text-green-400">{(reflection.confidence * 100).toFixed(0)}%</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Active Phase Indicator */}
                    {isActive && currentPhase && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-blue-400">
                        <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                        <span className="capitalize">{currentPhase} in progress...</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Performance Chart */}
          {performance.length > 0 && (
            <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30">
              <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Performance Trajectory
              </h4>
              <div className="space-y-2">
                {performance.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-sm text-gray-300 w-20">Attempt {metric.attemptNumber}</span>
                    <div className="flex-1 bg-gray-700 rounded h-6 relative">
                      <div
                        className="absolute top-0 left-0 h-full rounded bg-gradient-to-r from-blue-500 to-green-500"
                        style={{ width: `${metric.score}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                        {metric.score.toFixed(1)}
                      </span>
                    </div>
                    {metric.improvement !== 0 && (
                      <span className={`text-xs ${metric.improvement > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.improvement > 0 ? '+' : ''}{metric.improvement.toFixed(1)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Memory & Execution Log */}
        <div className="space-y-6">
          {/* Episodic Memory */}
          {memory.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Episodic Memory
              </h3>
              <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 space-y-3">
                {memory.map((entry) => (
                  <div key={entry.id} className="border-b border-gray-700 pb-3 last:border-0">
                    <div className="text-sm text-blue-400 mb-1">{entry.pattern}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                      <div>Success: {(entry.successRate * 100).toFixed(0)}%</div>
                      <div>Used: {entry.applications}x</div>
                    </div>
                    {entry.refinements.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500">Refinements:</div>
                        <ul className="text-xs text-gray-400 mt-1">
                          {entry.refinements.slice(0, 2).map((ref, idx) => (
                            <li key={idx} className="truncate">• {ref}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Execution Log */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Execution Log</h3>
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-64 overflow-y-auto">
              {executionLog.length === 0 ? (
                <div className="text-gray-400 text-center text-sm mt-8">
                  Execution log will appear here...
                </div>
              ) : (
                <div className="space-y-1">
                  {executionLog.map((log, index) => (
                    <div key={index} className="text-sm text-gray-300 font-mono">
                      <span className="text-gray-500 mr-2">{String(index + 1).padStart(2, '0')}.</span>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Final Result */}
          {finalScore > 0 && (
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">Final Result</span>
                <span className={`text-2xl font-bold ${
                  finalScore >= selectedTask.targetScore ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {finalScore.toFixed(1)}/100
                </span>
              </div>
              <div className="text-sm text-gray-300">
                {finalScore >= selectedTask.targetScore ? (
                  <span className="text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Target achieved through reflexive learning!
                  </span>
                ) : (
                  <span className="text-yellow-400">
                    Progress made: {(finalScore / selectedTask.targetScore * 100).toFixed(0)}% of target
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReflexionDemo;