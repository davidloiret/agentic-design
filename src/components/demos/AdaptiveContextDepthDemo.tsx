'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Brain, BarChart3, Activity, Zap, ArrowRight, Clock, ChevronRight, Cpu, Database, Settings } from 'lucide-react';

interface Task {
  id: string;
  query: string;
  type: string;
  complexity: number;
  requiredDepth: number;
  estimatedMemory: number;
  estimatedTime: number;
  domains: string[];
}

interface Agent {
  id: string;
  name: string;
  specialty: string;
  status: 'idle' | 'assigned' | 'processing' | 'completed';
  workload: number;
  memoryUsage: number;
  contextDepth: number;
  icon: React.ComponentType<any>;
}

interface ContextLevel {
  level: number;
  name: string;
  description: string;
  memoryRequirement: number;
  active: boolean;
  utilization: number;
}

interface AdaptiveContextDepthDemoProps {
  className?: string;
}

const sampleTasks: Task[] = [
  {
    id: 't1',
    query: "What are the basic machine learning algorithms?",
    type: "Factual Query",
    complexity: 1,
    requiredDepth: 1,
    estimatedMemory: 200,
    estimatedTime: 15,
    domains: ['machine-learning']
  },
  {
    id: 't2',
    query: "Compare TensorFlow vs PyTorch for computer vision",
    type: "Comparative Analysis",
    complexity: 3,
    requiredDepth: 3,
    estimatedMemory: 800,
    estimatedTime: 150,
    domains: ['computer-vision', 'frameworks']
  },
  {
    id: 't3',
    query: "Design an AI system for autonomous vehicle safety",
    type: "System Design",
    complexity: 5,
    requiredDepth: 5,
    estimatedMemory: 2500,
    estimatedTime: 1200,
    domains: ['computer-vision', 'control-systems', 'safety', 'ethics']
  },
  {
    id: 't4',
    query: "Explain neural network backpropagation",
    type: "Educational",
    complexity: 2,
    requiredDepth: 2,
    estimatedMemory: 400,
    estimatedTime: 80,
    domains: ['neural-networks']
  }
];

const initialAgents: Agent[] = [
  {
    id: 'knowledge-agent',
    name: 'Knowledge Agent',
    specialty: 'Factual information and basic queries',
    status: 'idle',
    workload: 0,
    memoryUsage: 0,
    contextDepth: 0,
    icon: Brain
  },
  {
    id: 'analysis-agent',
    name: 'Analysis Agent',
    specialty: 'Comparative analysis and deep reasoning',
    status: 'idle',
    workload: 0,
    memoryUsage: 0,
    contextDepth: 0,
    icon: Zap
  },
  {
    id: 'cv-agent',
    name: 'Computer Vision Agent',
    specialty: 'Visual processing and CV frameworks',
    status: 'idle',
    workload: 0,
    memoryUsage: 0,
    contextDepth: 0,
    icon: Database
  },
  {
    id: 'systems-agent',
    name: 'Systems Agent',
    specialty: 'System design and architecture',
    status: 'idle',
    workload: 0,
    memoryUsage: 0,
    contextDepth: 0,
    icon: Settings
  },
  {
    id: 'safety-agent',
    name: 'Safety Agent',
    specialty: 'Safety analysis and compliance',
    status: 'idle',
    workload: 0,
    memoryUsage: 0,
    contextDepth: 0,
    icon: Activity
  }
];

const contextLevels: ContextLevel[] = [
  {
    level: 1,
    name: "Basic Facts",
    description: "Simple factual retrieval and direct answers",
    memoryRequirement: 200,
    active: false,
    utilization: 0
  },
  {
    level: 2,
    name: "Simple Reasoning",
    description: "Basic analysis and explanation",
    memoryRequirement: 400,
    active: false,
    utilization: 0
  },
  {
    level: 3,
    name: "Multi-step Analysis",
    description: "Comparative analysis and synthesis",
    memoryRequirement: 800,
    active: false,
    utilization: 0
  },
  {
    level: 4,
    name: "Complex Synthesis",
    description: "Integration of multiple domains",
    memoryRequirement: 1600,
    active: false,
    utilization: 0
  },
  {
    level: 5,
    name: "System Design",
    description: "Complete system architecture and planning",
    memoryRequirement: 2500,
    active: false,
    utilization: 0
  }
];

export const AdaptiveContextDepthDemo: React.FC<AdaptiveContextDepthDemoProps> = ({ className = '' }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [contexts, setContexts] = useState<ContextLevel[]>(contextLevels);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskQueue, setTaskQueue] = useState<Task[]>([]);
  const [processedTasks, setProcessedTasks] = useState<Task[]>([]);
  const [systemMetrics, setSystemMetrics] = useState({
    totalMemoryUsage: 0,
    averageProcessingTime: 0,
    activeContextLevels: 0,
    systemEfficiency: 100,
    taskThroughput: 0,
    resourceUtilization: 0
  });

  const steps = [
    'Task Analysis',
    'Complexity Assessment',
    'Context Depth Selection',
    'Agent Assignment',
    'Resource Allocation',
    'Processing Execution',
    'Performance Monitoring',
    'Adaptive Optimization'
  ];

  const resetDemo = useCallback(() => {
    setIsRunning(false);
    setCurrentStep(0);
    setAgents(initialAgents);
    setContexts(contextLevels);
    setCurrentTask(null);
    setTaskQueue([]);
    setProcessedTasks([]);
    setSystemMetrics({
      totalMemoryUsage: 0,
      averageProcessingTime: 0,
      activeContextLevels: 0,
      systemEfficiency: 100,
      taskThroughput: 0,
      resourceUtilization: 0
    });
  }, []);

  const selectOptimalAgents = (task: Task): string[] => {
    const requiredAgents: string[] = [];
    
    if (task.complexity >= 1) requiredAgents.push('knowledge-agent');
    if (task.complexity >= 3) requiredAgents.push('analysis-agent');
    if (task.domains.includes('computer-vision')) requiredAgents.push('cv-agent');
    if (task.domains.includes('control-systems') || task.domains.includes('safety')) {
      requiredAgents.push('systems-agent', 'safety-agent');
    }
    
    return requiredAgents;
  };

  const updateContextLevels = (requiredDepth: number) => {
    setContexts(prev => prev.map(context => ({
      ...context,
      active: context.level <= requiredDepth,
      utilization: context.level <= requiredDepth ? 
        Math.min(100, 50 + (requiredDepth / 5) * 50) : 0
    })));
  };

  const assignAgentsToTask = (task: Task, agentIds: string[]) => {
    setAgents(prev => prev.map(agent => {
      if (agentIds.includes(agent.id)) {
        return {
          ...agent,
          status: 'assigned',
          workload: Math.min(100, 20 * task.complexity),
          memoryUsage: Math.floor(task.estimatedMemory / agentIds.length),
          contextDepth: task.requiredDepth
        };
      }
      return agent;
    }));
  };

  const processTask = async (task: Task) => {
    setCurrentTask(task);
    
    // Step 1: Complexity Assessment
    setCurrentStep(1);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Step 2: Context Depth Selection
    setCurrentStep(2);
    updateContextLevels(task.requiredDepth);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 3: Agent Assignment
    setCurrentStep(3);
    const selectedAgents = selectOptimalAgents(task);
    assignAgentsToTask(task, selectedAgents);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Step 4: Processing Execution
    setCurrentStep(5);
    setAgents(prev => prev.map(agent => 
      selectedAgents.includes(agent.id) ? { ...agent, status: 'processing' } : agent
    ));
    await new Promise(resolve => setTimeout(resolve, task.estimatedTime / 10));
    
    // Step 5: Completion
    setAgents(prev => prev.map(agent => 
      selectedAgents.includes(agent.id) ? { ...agent, status: 'completed' } : agent
    ));
    
    // Update metrics
    setSystemMetrics(prev => ({
      ...prev,
      totalMemoryUsage: prev.totalMemoryUsage + task.estimatedMemory,
      averageProcessingTime: (prev.averageProcessingTime + task.estimatedTime) / 2,
      activeContextLevels: task.requiredDepth,
      taskThroughput: prev.taskThroughput + 1,
      resourceUtilization: Math.min(100, (selectedAgents.length / 5) * 100)
    }));
    
    setProcessedTasks(prev => [...prev, task]);
    setCurrentTask(null);
  };

  const runSimulation = useCallback(async () => {
    if (!isRunning) return;
    
    for (const task of sampleTasks) {
      if (!isRunning) break;
      
      setTaskQueue(prev => [...prev, task]);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await processTask(task);
      
      // Reset agents for next task
      setAgents(initialAgents);
      setContexts(contextLevels);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsRunning(false);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      runSimulation();
    }
  }, [isRunning, runSimulation]);

  const startDemo = () => {
    setIsRunning(true);
    setCurrentStep(0);
  };

  const pauseDemo = () => {
    setIsRunning(false);
  };

  return (
    <div className={`bg-gray-900 text-white p-6 rounded-lg ${className}`}>
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Adaptive Context Depth Simulation</h2>
          <p className="text-gray-400">Dynamic context adjustment based on task complexity in multi-agent systems</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            disabled={!isRunning && processedTasks.length >= sampleTasks.length}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-cyan-600 hover:bg-cyan-700'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetDemo}
            disabled={isRunning}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">Processing Step</span>
          <span className="text-sm text-gray-400">{currentStep + 1} / {steps.length}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-cyan-400">
          {steps[currentStep]}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Current Task Panel */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            Current Task
          </h3>
          {currentTask ? (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <div className="font-medium text-cyan-300 mb-2">{currentTask.type}</div>
                <div className="text-sm text-gray-300 mb-3">"{currentTask.query}"</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400">Complexity:</span>
                    <div className="text-yellow-400 font-bold">{currentTask.complexity}/5</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Depth:</span>
                    <div className="text-purple-400 font-bold">{currentTask.requiredDepth}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Memory:</span>
                    <div className="text-green-400 font-bold">{currentTask.estimatedMemory}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Time:</span>
                    <div className="text-red-400 font-bold">{currentTask.estimatedTime}ms</div>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-gray-400 text-xs">Domains:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentTask.domains.map(domain => (
                      <span key={domain} className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Waiting for next task...</p>
            </div>
          )}
        </div>

        {/* Context Levels */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            Context Levels
          </h3>
          <div className="space-y-3">
            {contexts.map((context) => (
              <div
                key={context.level}
                className={`p-3 rounded-lg border transition-all ${
                  context.active
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-gray-600 bg-gray-700/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">Level {context.level}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    context.active ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-300'
                  }`}>
                    {context.active ? 'ACTIVE' : 'IDLE'}
                  </span>
                </div>
                <div className="text-xs text-gray-300 mb-2">{context.name}</div>
                <div className="text-xs text-gray-400 mb-2">{context.description}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Memory: {context.memoryRequirement}</span>
                  <span className="text-purple-400">{context.utilization}%</span>
                </div>
                {context.active && (
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
                    <div 
                      className="bg-purple-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${context.utilization}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Agents */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-400" />
            AI Agents
          </h3>
          <div className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`p-3 rounded-lg border transition-all ${
                  agent.status === 'idle'
                    ? 'border-gray-600 bg-gray-700/30'
                    : agent.status === 'assigned'
                    ? 'border-yellow-500 bg-yellow-500/10'
                    : agent.status === 'processing'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-green-500 bg-green-500/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <agent.icon className="w-4 h-4" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{agent.name}</div>
                    <div className="text-xs text-gray-400">{agent.specialty}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    agent.status === 'idle'
                      ? 'bg-gray-600 text-gray-300'
                      : agent.status === 'assigned'
                      ? 'bg-yellow-600 text-yellow-100'
                      : agent.status === 'processing'
                      ? 'bg-blue-600 text-blue-100'
                      : 'bg-green-600 text-green-100'
                  }`}>
                    {agent.status.toUpperCase()}
                  </span>
                  {agent.status !== 'idle' && (
                    <Clock className="w-3 h-3 text-gray-400 animate-pulse" />
                  )}
                </div>
                {agent.status !== 'idle' && (
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Context Depth:</span>
                      <span className="text-purple-400">{agent.contextDepth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Memory:</span>
                      <span className="text-green-400">{agent.memoryUsage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Workload:</span>
                      <span className="text-blue-400">{agent.workload}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Task Processing */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            Task Processing
          </h3>
          
          <div className="space-y-4">
            {/* Task Queue */}
            <div>
              <div className="text-sm font-medium mb-2">Queue ({taskQueue.length})</div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {taskQueue.slice(-3).map((task, index) => (
                  <div key={task.id} className="text-xs p-2 bg-gray-700/30 rounded">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">{task.type}</span>
                      <span className="text-yellow-400">Depth {task.requiredDepth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Processed Tasks */}
            <div>
              <div className="text-sm font-medium mb-2">Completed ({processedTasks.length})</div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {processedTasks.slice(-3).map((task) => (
                  <div key={task.id} className="text-xs p-2 bg-green-500/10 border border-green-500/30 rounded">
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">{task.type}</span>
                      <span className="text-green-400">✓</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-cyan-400">{systemMetrics.totalMemoryUsage}</div>
          <div className="text-xs text-gray-400">Total Memory (tokens)</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-yellow-400">{systemMetrics.averageProcessingTime.toFixed(0)}ms</div>
          <div className="text-xs text-gray-400">Avg Processing Time</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-400">{systemMetrics.activeContextLevels}</div>
          <div className="text-xs text-gray-400">Active Context Levels</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-400">{systemMetrics.systemEfficiency}%</div>
          <div className="text-xs text-gray-400">System Efficiency</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-400">{systemMetrics.taskThroughput}</div>
          <div className="text-xs text-gray-400">Tasks Processed</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-400">{systemMetrics.resourceUtilization}%</div>
          <div className="text-xs text-gray-400">Resource Utilization</div>
        </div>
      </div>

      {/* Step Information */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Current Step: {steps[currentStep]}</h4>
        <div className="text-sm text-gray-300">
          {currentStep === 0 && "System receives and parses incoming task requirements and determines processing approach."}
          {currentStep === 1 && "AI analyzes task complexity using multiple dimensions including domain expertise, reasoning depth, and resource requirements."}
          {currentStep === 2 && "System selects optimal context depth level based on complexity assessment and resource constraints."}
          {currentStep === 3 && "Appropriate specialist agents are assigned based on required domains and workload balancing."}
          {currentStep === 4 && "Memory and compute resources are allocated dynamically based on context depth and agent requirements."}
          {currentStep === 5 && "Agents process the task collaboratively using allocated context and resources."}
          {currentStep === 6 && "System monitors performance metrics and resource utilization in real-time."}
          {currentStep === 7 && "Context depth and resource allocation are optimized based on performance feedback and system load."}
        </div>
      </div>
    </div>
  );
};

export default AdaptiveContextDepthDemo;