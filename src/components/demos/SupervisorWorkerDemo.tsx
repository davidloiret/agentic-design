'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Users, UserCheck, Send, CheckCircle, AlertCircle, Clock, Zap, BarChart3, Package, Activity, ArrowDown, ArrowUp, Briefcase, ListChecks } from 'lucide-react';

interface Worker {
  id: string;
  name: string;
  type: string;
  specialization: string[];
  status: 'idle' | 'assigned' | 'working' | 'reporting' | 'completed' | 'error';
  currentTask: Task | null;
  performance: {
    tasksCompleted: number;
    successRate: number;
    avgCompletionTime: number;
    reliability: number;
  };
  workload: number;
  color: string;
  icon: string;
}

interface Task {
  id: string;
  name: string;
  type: string;
  complexity: 'low' | 'medium' | 'high';
  priority: 'low' | 'normal' | 'high' | 'critical';
  requirements: string[];
  estimatedTime: number;
  actualTime?: number;
  status: 'pending' | 'assigned' | 'in-progress' | 'review' | 'completed' | 'failed';
  assignedTo?: string;
  progress: number;
  result?: any;
  dependencies?: string[];
}

interface Supervisor {
  id: string;
  name: string;
  status: 'idle' | 'planning' | 'assigning' | 'monitoring' | 'reviewing' | 'reporting';
  currentPhase: string;
  tasksQueue: Task[];
  completedTasks: Task[];
  metrics: {
    totalTasks: number;
    completedTasks: number;
    averageTime: number;
    successRate: number;
  };
}

interface Communication {
  id: string;
  from: string;
  to: string;
  type: 'assignment' | 'status' | 'result' | 'error' | 'query' | 'instruction';
  message: string;
  timestamp: number;
  priority: 'low' | 'normal' | 'high';
}

interface Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  deadline: string;
  complexity: 'simple' | 'moderate' | 'complex';
}

const WORKERS: Worker[] = [
  {
    id: 'worker-1',
    name: 'Data Analyst',
    type: 'analytical',
    specialization: ['data-processing', 'statistical-analysis', 'reporting'],
    status: 'idle',
    currentTask: null,
    performance: {
      tasksCompleted: 0,
      successRate: 0.95,
      avgCompletionTime: 3.2,
      reliability: 0.98
    },
    workload: 0,
    color: 'text-blue-400',
    icon: '📊'
  },
  {
    id: 'worker-2',
    name: 'Code Developer',
    type: 'technical',
    specialization: ['coding', 'debugging', 'optimization'],
    status: 'idle',
    currentTask: null,
    performance: {
      tasksCompleted: 0,
      successRate: 0.92,
      avgCompletionTime: 4.5,
      reliability: 0.94
    },
    workload: 0,
    color: 'text-green-400',
    icon: '💻'
  },
  {
    id: 'worker-3',
    name: 'Content Writer',
    type: 'creative',
    specialization: ['writing', 'editing', 'documentation'],
    status: 'idle',
    currentTask: null,
    performance: {
      tasksCompleted: 0,
      successRate: 0.96,
      avgCompletionTime: 2.8,
      reliability: 0.97
    },
    workload: 0,
    color: 'text-purple-400',
    icon: '✍️'
  },
  {
    id: 'worker-4',
    name: 'QA Tester',
    type: 'quality',
    specialization: ['testing', 'validation', 'quality-assurance'],
    status: 'idle',
    currentTask: null,
    performance: {
      tasksCompleted: 0,
      successRate: 0.98,
      avgCompletionTime: 3.0,
      reliability: 0.99
    },
    workload: 0,
    color: 'text-yellow-400',
    icon: '🔍'
  },
  {
    id: 'worker-5',
    name: 'Research Specialist',
    type: 'research',
    specialization: ['research', 'fact-checking', 'sourcing'],
    status: 'idle',
    currentTask: null,
    performance: {
      tasksCompleted: 0,
      successRate: 0.94,
      avgCompletionTime: 3.8,
      reliability: 0.95
    },
    workload: 0,
    color: 'text-orange-400',
    icon: '🔬'
  }
];

const PROJECTS: Project[] = [
  {
    id: 'software-release',
    name: 'Software Product Release',
    description: 'Complete development, testing, and documentation for new feature release',
    tasks: [
      { id: 't1', name: 'Requirements Analysis', type: 'analytical', complexity: 'medium', priority: 'high', requirements: ['data-processing'], estimatedTime: 3, status: 'pending', progress: 0 },
      { id: 't2', name: 'Feature Development', type: 'technical', complexity: 'high', priority: 'critical', requirements: ['coding'], estimatedTime: 5, status: 'pending', progress: 0, dependencies: ['t1'] },
      { id: 't3', name: 'Unit Testing', type: 'quality', complexity: 'medium', priority: 'high', requirements: ['testing'], estimatedTime: 3, status: 'pending', progress: 0, dependencies: ['t2'] },
      { id: 't4', name: 'Documentation', type: 'creative', complexity: 'low', priority: 'normal', requirements: ['writing'], estimatedTime: 2, status: 'pending', progress: 0, dependencies: ['t2'] },
      { id: 't5', name: 'Integration Testing', type: 'quality', complexity: 'high', priority: 'high', requirements: ['testing'], estimatedTime: 4, status: 'pending', progress: 0, dependencies: ['t3'] },
      { id: 't6', name: 'Performance Analysis', type: 'analytical', complexity: 'medium', priority: 'normal', requirements: ['statistical-analysis'], estimatedTime: 3, status: 'pending', progress: 0, dependencies: ['t5'] }
    ],
    deadline: '2024-12-15',
    complexity: 'complex'
  },
  {
    id: 'market-research',
    name: 'Market Research Report',
    description: 'Comprehensive market analysis with data collection and insights',
    tasks: [
      { id: 't1', name: 'Data Collection', type: 'research', complexity: 'medium', priority: 'high', requirements: ['research'], estimatedTime: 4, status: 'pending', progress: 0 },
      { id: 't2', name: 'Data Processing', type: 'analytical', complexity: 'high', priority: 'high', requirements: ['data-processing'], estimatedTime: 3, status: 'pending', progress: 0, dependencies: ['t1'] },
      { id: 't3', name: 'Statistical Analysis', type: 'analytical', complexity: 'high', priority: 'critical', requirements: ['statistical-analysis'], estimatedTime: 4, status: 'pending', progress: 0, dependencies: ['t2'] },
      { id: 't4', name: 'Report Writing', type: 'creative', complexity: 'medium', priority: 'normal', requirements: ['writing'], estimatedTime: 3, status: 'pending', progress: 0, dependencies: ['t3'] },
      { id: 't5', name: 'Fact Checking', type: 'research', complexity: 'low', priority: 'high', requirements: ['fact-checking'], estimatedTime: 2, status: 'pending', progress: 0, dependencies: ['t4'] }
    ],
    deadline: '2024-11-30',
    complexity: 'moderate'
  },
  {
    id: 'content-campaign',
    name: 'Content Marketing Campaign',
    description: 'Multi-channel content creation and optimization',
    tasks: [
      { id: 't1', name: 'Content Strategy', type: 'creative', complexity: 'medium', priority: 'high', requirements: ['writing'], estimatedTime: 2, status: 'pending', progress: 0 },
      { id: 't2', name: 'Keyword Research', type: 'research', complexity: 'low', priority: 'normal', requirements: ['research'], estimatedTime: 2, status: 'pending', progress: 0 },
      { id: 't3', name: 'Article Writing', type: 'creative', complexity: 'medium', priority: 'high', requirements: ['writing'], estimatedTime: 4, status: 'pending', progress: 0, dependencies: ['t1', 't2'] },
      { id: 't4', name: 'Code Examples', type: 'technical', complexity: 'low', priority: 'normal', requirements: ['coding'], estimatedTime: 2, status: 'pending', progress: 0, dependencies: ['t3'] },
      { id: 't5', name: 'Quality Review', type: 'quality', complexity: 'low', priority: 'normal', requirements: ['validation'], estimatedTime: 2, status: 'pending', progress: 0, dependencies: ['t3', 't4'] }
    ],
    deadline: '2024-11-20',
    complexity: 'moderate'
  }
];

export default function SupervisorWorkerDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [workers, setWorkers] = useState<Worker[]>(WORKERS);
  const [supervisor, setSupervisor] = useState<Supervisor>({
    id: 'supervisor-1',
    name: 'Project Supervisor',
    status: 'idle',
    currentPhase: 'Planning',
    tasksQueue: [],
    completedTasks: [],
    metrics: {
      totalTasks: 0,
      completedTasks: 0,
      averageTime: 0,
      successRate: 0
    }
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'planning' | 'assigning' | 'executing' | 'reviewing' | 'complete'>('idle');
  const [logs, setLogs] = useState<Array<{ timestamp: string; type: string; message: string }>>([]);

  const addLog = useCallback((type: string, message: string) => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    }]);
  }, []);

  const sendCommunication = useCallback((from: string, to: string, type: Communication['type'], message: string, priority: Communication['priority'] = 'normal') => {
    const comm: Communication = {
      id: `comm-${Date.now()}-${Math.random()}`,
      from,
      to,
      type,
      message,
      timestamp: Date.now(),
      priority
    };

    setCommunications(prev => [...prev, comm]);

    // Log based on type
    const fromName = from === 'supervisor-1' ? 'Supervisor' : workers.find(w => w.id === from)?.name || from;
    const toName = to === 'supervisor-1' ? 'Supervisor' : to === 'all' ? 'All Workers' : workers.find(w => w.id === to)?.name || to;

    addLog(type, `${fromName} → ${toName}: ${message}`);
  }, [workers, addLog]);

  const planTasks = useCallback(async (project: Project) => {
    setSupervisor(prev => ({ ...prev, status: 'planning' }));
    addLog('plan', `📋 Planning project: ${project.name}`);

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Analyze dependencies and create execution order
    const sortedTasks = [...project.tasks].sort((a, b) => {
      if (b.priority === 'critical' && a.priority !== 'critical') return 1;
      if (a.priority === 'critical' && b.priority !== 'critical') return -1;
      if (b.priority === 'high' && a.priority === 'normal') return 1;
      if (a.priority === 'high' && b.priority === 'normal') return -1;
      return 0;
    });

    addLog('plan', `Identified ${sortedTasks.length} tasks with dependencies`);

    sortedTasks.forEach(task => {
      addLog('plan', `  • ${task.name} (${task.complexity} complexity, ${task.priority} priority)`);
    });

    setSupervisor(prev => ({
      ...prev,
      tasksQueue: sortedTasks,
      metrics: { ...prev.metrics, totalTasks: sortedTasks.length }
    }));

    setTasks(sortedTasks);

    sendCommunication('supervisor-1', 'all', 'instruction', `Starting ${project.name} with ${sortedTasks.length} tasks`, 'high');
  }, [speed, addLog, sendCommunication]);

  const assignTaskToWorker = useCallback((task: Task): string | null => {
    // Find the best available worker for the task
    const availableWorkers = workers.filter(w =>
      w.status === 'idle' &&
      task.requirements.some(req => w.specialization.includes(req))
    );

    if (availableWorkers.length === 0) return null;

    // Score workers based on performance and workload
    const scoredWorkers = availableWorkers.map(worker => ({
      worker,
      score: worker.performance.successRate * 100 -
             worker.workload * 10 -
             worker.performance.avgCompletionTime * 5 +
             worker.performance.reliability * 50
    }));

    scoredWorkers.sort((a, b) => b.score - a.score);
    return scoredWorkers[0]?.worker.id || null;
  }, [workers]);

  const executeTask = useCallback(async (taskId: string, workerId: string) => {
    const worker = workers.find(w => w.id === workerId);
    const task = tasks.find(t => t.id === taskId);

    if (!worker || !task) return;

    // Update worker status
    setWorkers(prev => prev.map(w =>
      w.id === workerId ? { ...w, status: 'working', currentTask: task, workload: w.workload + 1 } : w
    ));

    // Update task status
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, status: 'in-progress', assignedTo: workerId } : t
    ));

    sendCommunication(workerId, 'supervisor-1', 'status', `Started working on: ${task.name}`);

    // Simulate task execution with progress updates
    const steps = 5;
    for (let i = 1; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, (task.estimatedTime * 200) / speed));

      const progress = (i / steps) * 100;

      setTasks(prev => prev.map(t =>
        t.id === taskId ? { ...t, progress } : t
      ));

      if (i === Math.floor(steps / 2)) {
        sendCommunication(workerId, 'supervisor-1', 'status', `${task.name}: ${progress}% complete`);
      }

      // Chance of issues
      if (Math.random() < 0.05) {
        setWorkers(prev => prev.map(w =>
          w.id === workerId ? { ...w, status: 'error' } : w
        ));

        sendCommunication(workerId, 'supervisor-1', 'error', `Issue with ${task.name}, requesting assistance`, 'high');

        await new Promise(resolve => setTimeout(resolve, 1000 / speed));

        sendCommunication('supervisor-1', workerId, 'instruction', 'Continue with alternative approach');

        setWorkers(prev => prev.map(w =>
          w.id === workerId ? { ...w, status: 'working' } : w
        ));
      }
    }

    // Complete task
    const actualTime = task.estimatedTime + (Math.random() - 0.5) * 2;

    setTasks(prev => prev.map(t =>
      t.id === taskId ? {
        ...t,
        status: 'completed',
        progress: 100,
        actualTime,
        result: { success: true, output: `${task.name} completed successfully` }
      } : t
    ));

    setWorkers(prev => prev.map(w =>
      w.id === workerId ? {
        ...w,
        status: 'reporting',
        currentTask: null,
        performance: {
          ...w.performance,
          tasksCompleted: w.performance.tasksCompleted + 1
        }
      } : w
    ));

    sendCommunication(workerId, 'supervisor-1', 'result', `✅ Completed: ${task.name} in ${actualTime.toFixed(1)}s`);

    await new Promise(resolve => setTimeout(resolve, 500 / speed));

    // Worker becomes idle again
    setWorkers(prev => prev.map(w =>
      w.id === workerId ? { ...w, status: 'idle', workload: Math.max(0, w.workload - 1) } : w
    ));

    // Update supervisor metrics
    setSupervisor(prev => ({
      ...prev,
      completedTasks: [...prev.completedTasks, task],
      metrics: {
        ...prev.metrics,
        completedTasks: prev.metrics.completedTasks + 1,
        averageTime: (prev.metrics.averageTime * prev.metrics.completedTasks + actualTime) / (prev.metrics.completedTasks + 1)
      }
    }));

    addLog('complete', `✅ ${worker.name} completed: ${task.name}`);
  }, [workers, tasks, speed, addLog, sendCommunication]);

  const runSupervisorWorkerPattern = useCallback(async () => {
    const project = PROJECTS[selectedProjectIndex];

    // Reset state
    setWorkers(WORKERS.map(w => ({ ...w, status: 'idle', currentTask: null, workload: 0 })));
    setSupervisor({
      id: 'supervisor-1',
      name: 'Project Supervisor',
      status: 'idle',
      currentPhase: 'Planning',
      tasksQueue: [],
      completedTasks: [],
      metrics: { totalTasks: 0, completedTasks: 0, averageTime: 0, successRate: 0 }
    });
    setCommunications([]);
    setLogs([]);

    addLog('start', `🎯 Starting Supervisor-Worker Pattern for: ${project.name}`);
    addLog('info', project.description);

    // Phase 1: Planning
    setCurrentPhase('planning');
    await planTasks(project);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Phase 2: Task Assignment & Execution
    setCurrentPhase('assigning');
    setSupervisor(prev => ({ ...prev, status: 'assigning' }));
    addLog('assign', '📋 Assigning tasks to workers based on specialization');

    const taskQueue = [...tasks];
    const executingTasks = new Map<string, Promise<void>>();

    while (taskQueue.length > 0 || executingTasks.size > 0) {
      // Try to assign pending tasks
      for (let i = taskQueue.length - 1; i >= 0; i--) {
        const task = taskQueue[i];

        // Check dependencies
        if (task.dependencies) {
          const depsCompleted = task.dependencies.every(depId =>
            tasks.find(t => t.id === depId)?.status === 'completed'
          );
          if (!depsCompleted) continue;
        }

        const workerId = assignTaskToWorker(task);

        if (workerId) {
          taskQueue.splice(i, 1);

          const worker = workers.find(w => w.id === workerId);
          if (worker) {
            sendCommunication('supervisor-1', workerId, 'assignment',
              `Assigned: ${task.name} (Priority: ${task.priority})`,
              task.priority === 'critical' ? 'high' : 'normal'
            );

            setCurrentPhase('executing');
            setSupervisor(prev => ({ ...prev, status: 'monitoring' }));

            const executionPromise = executeTask(task.id, workerId);
            executingTasks.set(task.id, executionPromise);

            executionPromise.then(() => {
              executingTasks.delete(task.id);
            });
          }
        }
      }

      // Wait a bit before next assignment cycle
      await new Promise(resolve => setTimeout(resolve, 500 / speed));
    }

    // Phase 3: Review
    setCurrentPhase('reviewing');
    setSupervisor(prev => ({ ...prev, status: 'reviewing' }));
    addLog('review', '📊 Reviewing project completion and worker performance');

    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    const completedCount = tasks.filter(t => t.status === 'completed').length;
    const successRate = (completedCount / tasks.length) * 100;

    setSupervisor(prev => ({
      ...prev,
      metrics: { ...prev.metrics, successRate }
    }));

    // Generate summary
    sendCommunication('supervisor-1', 'all', 'result',
      `Project completed: ${completedCount}/${tasks.length} tasks, ${successRate.toFixed(1)}% success rate`,
      'high'
    );

    setCurrentPhase('complete');
    setSupervisor(prev => ({ ...prev, status: 'reporting' }));
    addLog('complete', `🎉 Project completed successfully!`);
  }, [selectedProjectIndex, tasks, speed, addLog, sendCommunication, planTasks, assignTaskToWorker, executeTask]);

  useEffect(() => {
    if (isRunning && currentPhase === 'idle') {
      runSupervisorWorkerPattern();
    } else if (isRunning && currentPhase === 'complete') {
      setIsRunning(false);
    }
  }, [isRunning, currentPhase, runSupervisorWorkerPattern]);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentPhase('idle');
    setWorkers(WORKERS.map(w => ({ ...w, status: 'idle', currentTask: null, workload: 0 })));
    setSupervisor({
      id: 'supervisor-1',
      name: 'Project Supervisor',
      status: 'idle',
      currentPhase: 'Planning',
      tasksQueue: [],
      completedTasks: [],
      metrics: { totalTasks: 0, completedTasks: 0, averageTime: 0, successRate: 0 }
    });
    setTasks([]);
    setCommunications([]);
    setLogs([]);
  };

  const getWorkerStatusColor = (status: Worker['status']) => {
    switch (status) {
      case 'idle': return 'text-gray-400';
      case 'assigned': return 'text-blue-400';
      case 'working': return 'text-yellow-400';
      case 'reporting': return 'text-green-400';
      case 'completed': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Supervisor-Worker Pattern Demo</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Project:</label>
              <select
                value={selectedProjectIndex}
                onChange={(e) => setSelectedProjectIndex(Number(e.target.value))}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isRunning}
              >
                {PROJECTS.map((project, idx) => (
                  <option key={project.id} value={idx}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Speed:</label>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={3}>3x</option>
              </select>
            </div>

            <button
              onClick={() => setIsRunning(!isRunning)}
              disabled={currentPhase === 'complete'}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>

            <button
              onClick={handleReset}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7 space-y-4">
            {/* Supervisor Status */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="w-5 h-5 text-purple-400" />
                <h4 className="text-sm font-semibold text-white">Supervisor</h4>
                <span className={`ml-auto text-xs px-2 py-1 rounded ${
                  supervisor.status === 'monitoring' ? 'bg-yellow-900 text-yellow-300' :
                  supervisor.status === 'assigning' ? 'bg-blue-900 text-blue-300' :
                  supervisor.status === 'reviewing' ? 'bg-green-900 text-green-300' :
                  'bg-gray-700 text-gray-300'
                }`}>
                  {supervisor.status}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3 text-xs">
                <div className="bg-gray-700 rounded p-2">
                  <div className="text-gray-500">Total Tasks</div>
                  <div className="text-lg font-bold text-white">{supervisor.metrics.totalTasks}</div>
                </div>
                <div className="bg-gray-700 rounded p-2">
                  <div className="text-gray-500">Completed</div>
                  <div className="text-lg font-bold text-green-400">{supervisor.metrics.completedTasks}</div>
                </div>
                <div className="bg-gray-700 rounded p-2">
                  <div className="text-gray-500">Avg Time</div>
                  <div className="text-lg font-bold text-blue-400">{supervisor.metrics.averageTime.toFixed(1)}s</div>
                </div>
                <div className="bg-gray-700 rounded p-2">
                  <div className="text-gray-500">Success</div>
                  <div className="text-lg font-bold text-yellow-400">{supervisor.metrics.successRate.toFixed(0)}%</div>
                </div>
              </div>
            </div>

            {/* Workers Grid */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <h4 className="text-sm font-semibold text-white">Workers</h4>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {workers.map(worker => (
                  <div
                    key={worker.id}
                    className={`bg-gray-700 rounded-lg p-3 border-2 transition-all ${
                      worker.status === 'working' ? 'border-yellow-500 animate-pulse' :
                      worker.status === 'error' ? 'border-red-500' :
                      worker.status === 'reporting' ? 'border-green-500' :
                      'border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{worker.icon}</span>
                        <span className={`text-sm font-medium ${worker.color}`}>
                          {worker.name}
                        </span>
                      </div>
                      <span className={`text-xs ${getWorkerStatusColor(worker.status)}`}>
                        {worker.status}
                      </span>
                    </div>

                    {worker.currentTask && (
                      <div className="text-xs text-gray-400 mb-2">
                        Working on: {worker.currentTask.name}
                        {worker.currentTask.progress > 0 && (
                          <div className="mt-1">
                            <div className="w-full bg-gray-600 rounded-full h-1">
                              <div
                                className="bg-yellow-400 h-1 rounded-full transition-all"
                                style={{ width: `${worker.currentTask.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="text-xs text-gray-500 space-y-1">
                      <div>Tasks: {worker.performance.tasksCompleted}</div>
                      <div>Success: {(worker.performance.successRate * 100).toFixed(0)}%</div>
                      <div>Reliability: {(worker.performance.reliability * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks Board */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="w-5 h-5 text-green-400" />
                <h4 className="text-sm font-semibold text-white">Task Board</h4>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-2 rounded border ${
                      task.status === 'completed' ? 'border-green-600 bg-green-900/20' :
                      task.status === 'in-progress' ? 'border-yellow-600 bg-yellow-900/20' :
                      task.status === 'failed' ? 'border-red-600 bg-red-900/20' :
                      'border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.status === 'completed' ? 'bg-green-400' :
                        task.status === 'in-progress' ? 'bg-yellow-400 animate-pulse' :
                        task.status === 'failed' ? 'bg-red-400' :
                        'bg-gray-500'
                      }`} />
                      <div>
                        <div className="text-sm text-white">{task.name}</div>
                        <div className="text-xs text-gray-400">
                          {task.complexity} | {task.priority} priority
                          {task.assignedTo && ` | ${workers.find(w => w.id === task.assignedTo)?.name}`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {task.status === 'in-progress' && (
                        <span className="text-xs text-yellow-400">{task.progress}%</span>
                      )}
                      {task.status === 'completed' && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Communications */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Send className="w-5 h-5 text-cyan-400" />
                <h4 className="text-sm font-semibold text-white">Communications</h4>
              </div>

              <div className="space-y-1 max-h-32 overflow-y-auto">
                {communications.slice(-5).reverse().map(comm => (
                  <div key={comm.id} className="flex items-center gap-2 text-xs">
                    <span className={`${
                      comm.priority === 'high' ? 'text-red-400' :
                      comm.priority === 'normal' ? 'text-blue-400' :
                      'text-gray-400'
                    }`}>
                      {comm.from === 'supervisor-1' ? '👔' : '👷'}
                    </span>
                    <span className="text-gray-500">→</span>
                    <span className="text-gray-400">
                      {comm.to === 'all' ? '👥' : comm.to === 'supervisor-1' ? '👔' : '👷'}
                    </span>
                    <span className={`flex-1 ${
                      comm.type === 'error' ? 'text-red-300' :
                      comm.type === 'result' ? 'text-green-300' :
                      'text-gray-300'
                    }`}>
                      {comm.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 h-[600px] flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h4 className="text-sm font-semibold text-white">Execution Log</h4>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-600">{log.timestamp}</span>
                    <span className={`font-semibold ${
                      log.type === 'start' ? 'text-blue-400' :
                      log.type === 'plan' ? 'text-purple-400' :
                      log.type === 'assign' ? 'text-cyan-400' :
                      log.type === 'assignment' ? 'text-cyan-400' :
                      log.type === 'status' ? 'text-yellow-400' :
                      log.type === 'result' ? 'text-green-400' :
                      log.type === 'error' ? 'text-red-400' :
                      log.type === 'instruction' ? 'text-orange-400' :
                      log.type === 'review' ? 'text-indigo-400' :
                      log.type === 'complete' ? 'text-green-400' :
                      'text-gray-400'
                    }`}>
                      [{log.type.toUpperCase()}]
                    </span>
                    <span className="text-gray-300 flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Phase Indicator */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            {['planning', 'assigning', 'executing', 'reviewing', 'complete'].map((phase) => (
              <div key={phase} className="flex-1 text-center">
                <div className={`text-xs mb-1 ${
                  currentPhase === phase ? 'text-white font-semibold' : 'text-gray-500'
                }`}>
                  {phase.charAt(0).toUpperCase() + phase.slice(1)}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`h-0.5 w-full ${
                      ['planning', 'assigning', 'executing', 'reviewing', 'complete'].indexOf(phase) <=
                      ['planning', 'assigning', 'executing', 'reviewing', 'complete'].indexOf(currentPhase)
                        ? 'bg-purple-500' : 'bg-gray-700'
                    }`} />
                  </div>
                  <div className={`relative w-3 h-3 mx-auto rounded-full border-2 ${
                    currentPhase === phase
                      ? 'bg-purple-500 border-purple-400 animate-pulse'
                      : ['planning', 'assigning', 'executing', 'reviewing', 'complete'].indexOf(phase) <
                        ['planning', 'assigning', 'executing', 'reviewing', 'complete'].indexOf(currentPhase)
                        ? 'bg-purple-500 border-purple-400'
                        : 'bg-gray-800 border-gray-600'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}