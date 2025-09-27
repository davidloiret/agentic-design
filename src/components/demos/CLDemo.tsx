import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Brain, Shield, Database, TrendingUp, AlertTriangle, Layers, ChevronRight, Lock, Unlock } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  domain: string;
  color: string;
  learned: boolean;
  performance: number;
  forgetting: number;
}

interface Strategy {
  id: string;
  name: string;
  description: string;
  effectiveness: number;
  active: boolean;
}

interface MemoryBuffer {
  taskId: string;
  samples: number;
  importance: number;
}

const initialTasks: Task[] = [
  { id: 'task1', name: 'Image Classification', domain: 'Vision', color: 'blue', learned: false, performance: 0, forgetting: 0 },
  { id: 'task2', name: 'Object Detection', domain: 'Vision', color: 'green', learned: false, performance: 0, forgetting: 0 },
  { id: 'task3', name: 'Text Generation', domain: 'NLP', color: 'purple', learned: false, performance: 0, forgetting: 0 },
  { id: 'task4', name: 'Sentiment Analysis', domain: 'NLP', color: 'orange', learned: false, performance: 0, forgetting: 0 },
  { id: 'task5', name: 'Speech Recognition', domain: 'Audio', color: 'red', learned: false, performance: 0, forgetting: 0 }
];

const strategies: Strategy[] = [
  { id: 'ewc', name: 'Elastic Weight Consolidation', description: 'Protects important weights', effectiveness: 85, active: true },
  { id: 'replay', name: 'Experience Replay', description: 'Rehearses past examples', effectiveness: 90, active: true },
  { id: 'distillation', name: 'Knowledge Distillation', description: 'Preserves past predictions', effectiveness: 80, active: false },
  { id: 'dynamic', name: 'Dynamic Architecture', description: 'Expands network capacity', effectiveness: 75, active: false }
];

const CLDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(-1);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'learning' | 'consolidating' | 'testing' | 'complete'>('idle');
  const [epoch, setEpoch] = useState(0);
  const [totalEpochs] = useState(3);

  // Continual learning metrics
  const [averagePerformance, setAveragePerformance] = useState(0);
  const [averageForgetting, setAverageForgetting] = useState(0);
  const [forwardTransfer, setForwardTransfer] = useState(0);
  const [backwardTransfer, setBackwardTransfer] = useState(0);

  // Memory management
  const [memoryBuffer, setMemoryBuffer] = useState<MemoryBuffer[]>([]);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [activeStrategies, setActiveStrategies] = useState(strategies);

  // Visualization states
  const [showForgetting, setShowForgetting] = useState(false);
  const [protectedWeights, setProtectedWeights] = useState(new Set<string>());
  const [replayActive, setReplayActive] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const runAllTasks = async () => {
      // Process all tasks sequentially in one continuous flow
      for (let taskIdx = 0; taskIdx < tasks.length; taskIdx++) {
        setCurrentTaskIndex(taskIdx);
        const currentTask = tasks[taskIdx];

        // Phase 1: Learning new task
        setCurrentPhase('learning');

        for (let e = 0; e < totalEpochs; e++) {
          setEpoch(e + 1);

          // Simulate learning progress
          await new Promise(resolve => setTimeout(resolve, 500));

          // Update current task performance
          const newPerformance = Math.min(95, (e + 1) * 30 + Math.random() * 10);

          // Check for catastrophic forgetting on previous tasks
          const updatedTasks = tasks.map((task, idx) => {
            if (idx === taskIdx) {
              return { ...task, performance: newPerformance, learned: true };
            } else if (task.learned) {
              // Simulate forgetting based on active strategies
              const forgettingRate = calculateForgetting(idx, taskIdx);
              const preventionFactor = getPreventionFactor();
              const actualForgetting = forgettingRate * (1 - preventionFactor);

              return {
                ...task,
                performance: Math.max(20, task.performance - actualForgetting),
                forgetting: task.forgetting + actualForgetting
              };
            }
            return task;
          });

          setTasks(updatedTasks);

          // Update metrics
          updateMetrics(updatedTasks);

          // Show forgetting warning if significant
          if (e === 1 && taskIdx > 0) {
            setShowForgetting(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            setShowForgetting(false);
          }
        }

        // Phase 2: Consolidation
        setCurrentPhase('consolidating');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Apply continual learning strategies
        if (activeStrategies.find(s => s.id === 'ewc' && s.active)) {
          // Protect important weights
          setProtectedWeights(prev => new Set([...prev, currentTask.id]));
        }

        if (activeStrategies.find(s => s.id === 'replay' && s.active)) {
          // Add to replay buffer
          setReplayActive(true);
          setMemoryBuffer(prev => [...prev, {
            taskId: currentTask.id,
            samples: 100,
            importance: 0.8 + Math.random() * 0.2
          }]);
          setMemoryUsage(prev => Math.min(100, prev + 20));

          // Replay past experiences
          await new Promise(resolve => setTimeout(resolve, 800));

          // Recover some performance on previous tasks
          const recoveredTasks = tasks.map((task, idx) => {
            if (idx < taskIdx && task.learned) {
              return {
                ...task,
                performance: Math.min(95, task.performance + 10),
                forgetting: Math.max(0, task.forgetting - 5)
              };
            }
            return task;
          });

          setTasks(recoveredTasks);
          setReplayActive(false);
        }

        // Phase 3: Testing
        setCurrentPhase('testing');
        await new Promise(resolve => setTimeout(resolve, 800));

        // Reset epoch for next task
        setEpoch(0);
      }

      // All tasks complete
      setCurrentPhase('complete');
      setIsRunning(false);
    };

    runAllTasks();
  }, [isRunning]); // Only depend on isRunning, not currentTaskIndex

  const calculateForgetting = (taskIdx: number, currentIdx: number): number => {
    const distance = currentIdx - taskIdx;
    return Math.min(15, distance * 3 + Math.random() * 5);
  };

  const getPreventionFactor = (): number => {
    const activeCount = activeStrategies.filter(s => s.active).length;
    const totalEffectiveness = activeStrategies
      .filter(s => s.active)
      .reduce((sum, s) => sum + s.effectiveness, 0);

    return Math.min(0.9, totalEffectiveness / 100 / Math.max(1, activeCount));
  };

  const updateMetrics = (updatedTasks: Task[]) => {
    const learnedTasks = updatedTasks.filter(t => t.learned);
    if (learnedTasks.length === 0) return;

    const avgPerf = learnedTasks.reduce((sum, t) => sum + t.performance, 0) / learnedTasks.length;
    const avgForg = learnedTasks.reduce((sum, t) => sum + t.forgetting, 0) / learnedTasks.length;

    setAveragePerformance(avgPerf);
    setAverageForgetting(avgForg);

    // Simulate transfer learning effects
    setForwardTransfer(Math.min(30, currentTaskIndex * 6));
    setBackwardTransfer(Math.max(0, 20 - avgForg));
  };

  const handleStart = () => {
    handleReset();
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTasks(initialTasks);
    setCurrentTaskIndex(-1);
    setCurrentPhase('idle');
    setEpoch(0);
    setAveragePerformance(0);
    setAverageForgetting(0);
    setForwardTransfer(0);
    setBackwardTransfer(0);
    setMemoryBuffer([]);
    setMemoryUsage(0);
    setProtectedWeights(new Set());
    setShowForgetting(false);
    setReplayActive(false);
  };

  const toggleStrategy = (strategyId: string) => {
    if (!isRunning) {
      setActiveStrategies(prev => prev.map(s =>
        s.id === strategyId ? { ...s, active: !s.active } : s
      ));
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'learning': return 'text-blue-400';
      case 'consolidating': return 'text-yellow-400';
      case 'testing': return 'text-purple-400';
      case 'complete': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-100">Continual Learning (CL)</h2>
          <p className="text-sm text-gray-400">Sequential task learning with forgetting prevention</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4" />
            Start
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Continual Learning Pipeline */}
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-yellow-400" />
          Continual Learning Pipeline
        </h3>
        <div className="flex items-center justify-between">
          {['Learning', 'Consolidating', 'Testing', 'Next Task'].map((phase, idx) => (
            <React.Fragment key={phase}>
              <div className={`flex flex-col items-center ${
                currentPhase === phase.toLowerCase() || (currentPhase === 'complete' && idx === 3)
                  ? getPhaseColor(phase.toLowerCase())
                  : 'text-gray-600'
              }`}>
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 transition-all ${
                  currentPhase === phase.toLowerCase() || (currentPhase === 'complete' && idx === 3)
                    ? 'border-current bg-current/20'
                    : 'border-gray-600'
                }`}>
                  {idx === 0 && <Brain className="w-5 h-5" />}
                  {idx === 1 && <Shield className="w-5 h-5" />}
                  {idx === 2 && <TrendingUp className="w-5 h-5" />}
                  {idx === 3 && <Database className="w-5 h-5" />}
                </div>
                <span className="text-xs">{phase}</span>
              </div>
              {idx < 3 && (
                <ChevronRight className={`w-5 h-5 ${
                  currentPhase !== 'idle' ? 'text-blue-400' : 'text-gray-600'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
        {currentTaskIndex >= 0 && (
          <div className="mt-2 text-center text-xs text-gray-400">
            Task {currentTaskIndex + 1}/{tasks.length} • Epoch {epoch}/{totalEpochs}
          </div>
        )}
      </div>

      {/* Main Demo Area */}
      <div className="grid grid-cols-2 gap-4">
        {/* Task Sequence & Performance */}
        <div className="space-y-4">
          {/* Task Sequence */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-400" />
              Task Sequence
            </h3>
            <div className="space-y-2">
              {tasks.map((task, idx) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg border transition-all relative ${
                    idx === currentTaskIndex
                      ? 'bg-blue-900/30 border-blue-500 scale-105'
                      : task.learned
                      ? 'bg-gray-700/50 border-gray-500'
                      : 'bg-gray-700/30 border-gray-600'
                  }`}
                >
                  {showForgetting && task.learned && idx < currentTaskIndex && (
                    <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 animate-pulse">
                      <AlertTriangle className="w-3 h-3 text-white" />
                    </div>
                  )}

                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {protectedWeights.has(task.id) && (
                        <Lock className="w-3 h-3 text-yellow-400" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-200">{task.name}</div>
                        <div className="text-xs text-gray-400">{task.domain}</div>
                      </div>
                    </div>
                    <div className="text-xs">
                      {idx < currentTaskIndex ? (
                        <span className="text-green-400">Learned</span>
                      ) : idx === currentTaskIndex ? (
                        <span className="text-blue-400">Learning</span>
                      ) : (
                        <span className="text-gray-500">Pending</span>
                      )}
                    </div>
                  </div>

                  {task.learned && (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Performance:</span>
                        <span className={task.performance > 70 ? 'text-green-400' : 'text-yellow-400'}>
                          {task.performance.toFixed(1)}%
                        </span>
                      </div>
                      <div className="bg-gray-700/50 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            task.performance > 70 ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${task.performance}%` }}
                        />
                      </div>

                      {task.forgetting > 0 && (
                        <>
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-gray-400">Forgetting:</span>
                            <span className="text-red-400">{task.forgetting.toFixed(1)}%</span>
                          </div>
                          <div className="bg-gray-700/50 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500 transition-all duration-500"
                              style={{ width: `${Math.min(100, task.forgetting * 2)}%` }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Memory Buffer */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              Experience Replay Buffer
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Memory Usage:</span>
                <span className="text-purple-300">{memoryUsage.toFixed(0)}%</span>
              </div>
              <div className="bg-gray-700/50 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-500"
                  style={{ width: `${memoryUsage}%` }}
                />
              </div>

              {memoryBuffer.length > 0 && (
                <div className="mt-2 space-y-1">
                  {memoryBuffer.map((mem, idx) => (
                    <div key={idx} className={`flex items-center justify-between text-xs ${
                      replayActive ? 'text-purple-300 animate-pulse' : 'text-gray-400'
                    }`}>
                      <span>Task {mem.taskId.slice(-1)}</span>
                      <span>{mem.samples} samples</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Strategies & Metrics */}
        <div className="space-y-4">
          {/* Anti-Forgetting Strategies */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              Anti-Forgetting Strategies
            </h3>
            <div className="space-y-2">
              {activeStrategies.map((strategy) => (
                <button
                  key={strategy.id}
                  onClick={() => toggleStrategy(strategy.id)}
                  disabled={isRunning}
                  className={`w-full p-2 rounded-lg border transition-all text-left ${
                    strategy.active
                      ? 'bg-green-900/30 border-green-500'
                      : 'bg-gray-700/30 border-gray-600'
                  } ${isRunning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-700/50'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        strategy.active ? 'bg-green-400' : 'bg-gray-500'
                      }`} />
                      <div>
                        <div className="text-xs font-medium text-gray-200">{strategy.name}</div>
                        <div className="text-xs text-gray-400">{strategy.description}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {strategy.effectiveness}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* CL Metrics */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Continual Learning Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-700/30 p-2 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Avg Performance</div>
                <div className="text-lg font-semibold text-green-300">
                  {averagePerformance.toFixed(1)}%
                </div>
              </div>
              <div className="bg-gray-700/30 p-2 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Avg Forgetting</div>
                <div className="text-lg font-semibold text-red-300">
                  {averageForgetting.toFixed(1)}%
                </div>
              </div>
              <div className="bg-gray-700/30 p-2 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Forward Transfer</div>
                <div className="text-lg font-semibold text-blue-300">
                  +{forwardTransfer.toFixed(0)}%
                </div>
              </div>
              <div className="bg-gray-700/30 p-2 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Backward Transfer</div>
                <div className="text-lg font-semibold text-purple-300">
                  {backwardTransfer > 0 ? '+' : ''}{backwardTransfer.toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Overview */}
      <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-400" />
          Continual Learning Algorithm Overview
        </h4>
        <div className="space-y-2 text-xs text-gray-400">
          <p>
            <strong className="text-gray-300">Sequential Learning:</strong> Train on tasks sequentially while maintaining performance on all previous tasks.
          </p>
          <p>
            <strong className="text-gray-300">Elastic Weight Consolidation:</strong> Identifies and protects important parameters to prevent catastrophic forgetting.
          </p>
          <p>
            <strong className="text-gray-300">Experience Replay:</strong> Stores and rehearses examples from previous tasks during new task learning.
          </p>
          <p>
            <strong className="text-gray-300">Transfer Learning:</strong> Leverages knowledge from previous tasks to improve learning efficiency on new tasks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CLDemo;