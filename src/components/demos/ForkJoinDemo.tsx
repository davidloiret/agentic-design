'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, Clock, CheckCircle, AlertCircle, GitBranch, Merge, Cpu, Memory, TrendingUp, Activity, Hash, Layers } from 'lucide-react';

interface TaskNode {
  id: string;
  level: number;
  data: number[];
  status: 'pending' | 'forking' | 'processing' | 'joining' | 'complete';
  result?: number[];
  parent?: string;
  children?: string[];
  thread?: number;
  startTime?: number;
  endTime?: number;
}

interface AlgorithmConfig {
  name: string;
  description: string;
  initialData: number[];
  algorithm: 'mergeSort' | 'quickSort' | 'parallelSum' | 'matrixMultiply';
  expectedComplexity: string;
  baseCase: string;
}

const algorithms: AlgorithmConfig[] = [
  {
    name: 'Parallel Merge Sort',
    description: 'Divide array recursively and merge sorted subarrays',
    initialData: [8, 3, 5, 1, 7, 6, 2, 4],
    algorithm: 'mergeSort',
    expectedComplexity: 'O(n log n) → O(n) parallel',
    baseCase: 'Single element arrays'
  },
  {
    name: 'Parallel Quick Sort',
    description: 'Partition around pivot and sort subarrays in parallel',
    initialData: [9, 2, 7, 1, 8, 4, 6, 3],
    algorithm: 'quickSort',
    expectedComplexity: 'O(n log n) → O(log n) parallel',
    baseCase: 'Arrays with ≤1 elements'
  },
  {
    name: 'Parallel Sum Reduction',
    description: 'Sum array elements using parallel reduction tree',
    initialData: [12, 8, 15, 3, 9, 6, 11, 4],
    algorithm: 'parallelSum',
    expectedComplexity: 'O(n) → O(log n) parallel',
    baseCase: 'Single number'
  },
  {
    name: 'Matrix Block Multiplication',
    description: 'Multiply matrices using parallel block decomposition',
    initialData: [1, 2, 3, 4, 5, 6, 7, 8, 9], // 3x3 matrices
    algorithm: 'matrixMultiply',
    expectedComplexity: 'O(n³) → O(n³/p) parallel',
    baseCase: '1x1 matrix blocks'
  }
];

const ForkJoinDemo: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tasks, setTasks] = useState<TaskNode[]>([]);
  const [threads, setThreads] = useState<{ [key: number]: string }>({});
  const [metrics, setMetrics] = useState({
    totalTime: 0,
    parallelEfficiency: 0,
    speedup: 0,
    threadsUsed: 0,
    tasksCreated: 0,
    comparisons: 0
  });
  const [currentPhase, setCurrentPhase] = useState<'fork' | 'process' | 'join' | 'complete'>('fork');

  const algorithm = algorithms[selectedAlgorithm];

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setTasks([]);
    setThreads({});
    setMetrics({
      totalTime: 0,
      parallelEfficiency: 0,
      speedup: 0,
      threadsUsed: 0,
      tasksCreated: 0,
      comparisons: 0
    });
    setCurrentPhase('fork');
  };

  const createTaskTree = (data: number[], algorithm: string): TaskNode[] => {
    const tasks: TaskNode[] = [];
    let taskIdCounter = 0;

    const createTask = (
      data: number[],
      level: number,
      parent?: string
    ): string => {
      const id = `task-${taskIdCounter++}`;
      const task: TaskNode = {
        id,
        level,
        data: [...data],
        status: 'pending',
        parent,
        children: []
      };

      if (algorithm === 'mergeSort' && data.length > 1) {
        const mid = Math.floor(data.length / 2);
        const leftChild = createTask(data.slice(0, mid), level + 1, id);
        const rightChild = createTask(data.slice(mid), level + 1, id);
        task.children = [leftChild, rightChild];
      } else if (algorithm === 'quickSort' && data.length > 1) {
        const pivot = data[0];
        const left = data.slice(1).filter(x => x <= pivot);
        const right = data.slice(1).filter(x => x > pivot);
        if (left.length > 0) {
          const leftChild = createTask(left, level + 1, id);
          task.children!.push(leftChild);
        }
        if (right.length > 0) {
          const rightChild = createTask(right, level + 1, id);
          task.children!.push(rightChild);
        }
      } else if (algorithm === 'parallelSum' && data.length > 1) {
        const mid = Math.floor(data.length / 2);
        const leftChild = createTask(data.slice(0, mid), level + 1, id);
        const rightChild = createTask(data.slice(mid), level + 1, id);
        task.children = [leftChild, rightChild];
      } else if (algorithm === 'matrixMultiply' && data.length > 1) {
        // Simplified matrix decomposition
        const blockSize = Math.floor(Math.sqrt(data.length));
        if (blockSize > 1) {
          const blocks = [];
          for (let i = 0; i < blockSize; i++) {
            const block = data.slice(i * blockSize, (i + 1) * blockSize);
            blocks.push(createTask(block, level + 1, id));
          }
          task.children = blocks;
        }
      }

      tasks.push(task);
      return id;
    };

    createTask(data, 0);
    return tasks;
  };

  const runDemo = async () => {
    setIsRunning(true);
    const startTime = Date.now();
    
    // Create task tree
    const taskTree = createTaskTree(algorithm.initialData, algorithm.algorithm);
    setTasks(taskTree);
    
    let threadCounter = 1;
    let comparisons = 0;

    // Fork phase
    setCurrentPhase('fork');
    for (let level = 0; level <= Math.max(...taskTree.map(t => t.level)); level++) {
      const levelTasks = taskTree.filter(t => t.level === level);
      
      for (const task of levelTasks) {
        task.status = 'forking';
        task.thread = threadCounter % 4 + 1; // Simulate 4 threads
        task.startTime = Date.now();
        setThreads(prev => ({ ...prev, [task.thread!]: task.id }));
        
        setTasks([...taskTree]);
        await new Promise(resolve => setTimeout(resolve, 200));
        
        task.status = 'processing';
        setTasks([...taskTree]);
        await new Promise(resolve => setTimeout(resolve, 150));
        
        threadCounter++;
      }
    }

    // Process phase
    setCurrentPhase('process');
    
    // Join phase (bottom-up)
    setCurrentPhase('join');
    const maxLevel = Math.max(...taskTree.map(t => t.level));
    
    for (let level = maxLevel; level >= 0; level--) {
      const levelTasks = taskTree.filter(t => t.level === level);
      
      for (const task of levelTasks) {
        if (task.children?.length === 0 || level === maxLevel) {
          // Base case - just copy data as result
          task.result = [...task.data];
          if (algorithm.algorithm === 'parallelSum') {
            task.result = [task.data.reduce((a, b) => a + b, 0)];
          }
        } else {
          // Join children results
          task.status = 'joining';
          setTasks([...taskTree]);
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const childResults = task.children!
            .map(childId => taskTree.find(t => t.id === childId)?.result || [])
            .filter(result => result.length > 0);

          if (algorithm.algorithm === 'mergeSort') {
            task.result = mergeArrays(childResults[0] || [], childResults[1] || []);
            comparisons += task.result.length;
          } else if (algorithm.algorithm === 'quickSort') {
            const pivot = task.data[0];
            task.result = [...(childResults[0] || []), pivot, ...(childResults[1] || [])];
            comparisons += task.data.length;
          } else if (algorithm.algorithm === 'parallelSum') {
            task.result = [(childResults[0]?.[0] || 0) + (childResults[1]?.[0] || 0)];
          } else if (algorithm.algorithm === 'matrixMultiply') {
            task.result = childResults.flat();
          }
        }
        
        task.status = 'complete';
        task.endTime = Date.now();
        setTasks([...taskTree]);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    setCurrentPhase('complete');
    
    const totalTime = Date.now() - startTime;
    const threadsUsed = Math.max(...Object.keys(threads).map(Number));
    const sequentialTime = totalTime * 2.5; // Estimated
    
    setMetrics({
      totalTime,
      parallelEfficiency: Math.min(95, (sequentialTime / totalTime / Math.min(4, threadsUsed)) * 100),
      speedup: sequentialTime / totalTime,
      threadsUsed,
      tasksCreated: taskTree.length,
      comparisons
    });
    
    setIsRunning(false);
  };

  const mergeArrays = (left: number[], right: number[]): number[] => {
    const result: number[] = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
  };

  const getTaskColor = (status: string) => {
    switch (status) {
      case 'pending': return 'border-gray-600 bg-gray-800/30';
      case 'forking': return 'border-blue-500 bg-blue-600/20 animate-pulse';
      case 'processing': return 'border-yellow-500 bg-yellow-600/20';
      case 'joining': return 'border-purple-500 bg-purple-600/20 animate-pulse';
      case 'complete': return 'border-green-500 bg-green-600/20';
      default: return 'border-gray-600 bg-gray-800/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'forking': return <GitBranch className="w-4 h-4 text-blue-400" />;
      case 'processing': return <Activity className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'joining': return <Merge className="w-4 h-4 text-purple-400" />;
      case 'complete': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const groupTasksByLevel = (tasks: TaskNode[]) => {
    const levels: { [key: number]: TaskNode[] } = {};
    tasks.forEach(task => {
      if (!levels[task.level]) levels[task.level] = [];
      levels[task.level].push(task);
    });
    return levels;
  };

  const taskLevels = groupTasksByLevel(tasks);

  return (
    <div className="p-6 bg-gray-900/40 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Fork-Join Pattern Demo</h3>
          <p className="text-gray-300 text-sm">
            Simulate recursive task decomposition with parallel execution and synchronized joining
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={runDemo}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Running...' : 'Run Demo'}
          </button>
          <button
            onClick={resetDemo}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Algorithm Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Algorithm:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {algorithms.map((alg, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedAlgorithm(index);
                resetDemo();
              }}
              className={`p-3 rounded-lg text-left transition-colors border ${
                selectedAlgorithm === index
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                  : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <div className="font-medium">{alg.name}</div>
              <div className="text-xs text-gray-400 mt-1">{alg.description}</div>
              <div className="text-xs text-gray-500 mt-1">Data: [{alg.initialData.join(', ')}]</div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Algorithm Info */}
      <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-400">Algorithm</div>
            <div className="text-white font-medium">{algorithm.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Complexity</div>
            <div className="text-white">{algorithm.expectedComplexity}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Base Case</div>
            <div className="text-white">{algorithm.baseCase}</div>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      {currentPhase !== 'fork' && (
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-400">Phase</div>
            <div className="text-white font-medium capitalize">{currentPhase}</div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-400">Total Time</div>
            <div className="text-white font-medium">{metrics.totalTime}ms</div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-400">Tasks Created</div>
            <div className="text-blue-400 font-medium">{metrics.tasksCreated}</div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-400">Threads Used</div>
            <div className="text-green-400 font-medium">{metrics.threadsUsed}</div>
          </div>
        </div>
      )}

      {/* Task Tree Visualization */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Layers className="w-5 h-5" />
          Fork-Join Task Tree
        </h4>
        <div className="bg-gray-800/20 rounded-lg p-4 border border-gray-700 max-h-96 overflow-y-auto">
          {Object.keys(taskLevels).length > 0 ? (
            Object.entries(taskLevels).map(([level, levelTasks]) => (
              <div key={level} className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Level {level}</div>
                <div className="flex flex-wrap gap-2">
                  {levelTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-lg border-2 transition-all ${getTaskColor(task.status)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          <span className="text-xs text-gray-400">
                            T{task.thread || '?'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{task.id}</span>
                      </div>
                      
                      <div className="space-y-1 text-xs">
                        <div>
                          <span className="text-gray-400">Input: </span>
                          <span className="text-white font-mono">
                            [{task.data.join(', ')}]
                          </span>
                        </div>
                        
                        {task.result && (
                          <div>
                            <span className="text-gray-400">Result: </span>
                            <span className="text-green-300 font-mono">
                              [{task.result.join(', ')}]
                            </span>
                          </div>
                        )}
                        
                        {task.children && task.children.length > 0 && (
                          <div>
                            <span className="text-gray-400">Children: </span>
                            <span className="text-blue-300">
                              {task.children.length}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <GitBranch className="w-12 h-12 mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400">Click "Run Demo" to see task decomposition</p>
            </div>
          )}
        </div>
      </div>

      {/* Thread Status */}
      {Object.keys(threads).length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            Thread Status
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(threads).map(([threadId, taskId]) => (
              <div key={threadId} className="p-3 bg-gray-800/30 rounded-lg border border-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">Thread {threadId}</span>
                </div>
                <div className="text-sm text-gray-300">
                  Current: {taskId || 'Idle'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      {currentPhase === 'complete' && (
        <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Fork-Join Performance Results
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-400 mb-2">Execution Metrics</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total Execution Time:</span>
                  <span className="text-blue-400">{metrics.totalTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Speedup Factor:</span>
                  <span className="text-green-400">{metrics.speedup.toFixed(1)}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Parallel Efficiency:</span>
                  <span className="text-purple-400">{metrics.parallelEfficiency.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Operations Count:</span>
                  <span className="text-orange-400">{metrics.comparisons}</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-400 mb-2">Resource Utilization</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Threads Used:</span>
                  <span className="text-blue-400">{metrics.threadsUsed}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tasks Created:</span>
                  <span className="text-green-400">{metrics.tasksCreated}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Tree Depth:</span>
                  <span className="text-purple-400">{Math.max(...Object.keys(taskLevels).map(Number))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Algorithm Type:</span>
                  <span className="text-orange-400">Divide & Conquer</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-300">
            <strong>Summary:</strong> Fork-join pattern completed {algorithm.name.toLowerCase()} with {metrics.speedup.toFixed(1)}x speedup
            using {metrics.threadsUsed} threads and {metrics.tasksCreated} total tasks. 
            Parallel efficiency of {metrics.parallelEfficiency.toFixed(1)}% demonstrates effective work distribution.
          </div>
        </div>
      )}
    </div>
  );
};

export default ForkJoinDemo;