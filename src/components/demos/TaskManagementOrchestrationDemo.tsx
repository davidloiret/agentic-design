'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, ListTodo, Clock, Users, AlertTriangle, CheckCircle, Circle, Check, Activity, GitBranch, TrendingUp, Package, Zap, BarChart3, RefreshCw, Settings } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  description: string;
  type: 'sequential' | 'parallel' | 'conditional' | 'iterative';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'ready' | 'running' | 'completed' | 'failed' | 'blocked' | 'skipped';
  progress: number;
  estimatedDuration: number;
  actualDuration?: number;
  dependencies: string[];
  assignedAgent?: string;
  subtasks: string[];
  retries: number;
  maxRetries: number;
  resources: {
    cpu: number;
    memory: number;
    api_calls: number;
  };
  conditions?: {
    preconditions: string[];
    postconditions: string[];
    skipCondition?: string;
  };
  metadata: {
    startTime?: number;
    endTime?: number;
    errors: string[];
    outputs: any[];
  };
}

interface Agent {
  id: string;
  name: string;
  type: 'specialist' | 'generalist' | 'coordinator';
  capabilities: string[];
  status: 'idle' | 'busy' | 'offline';
  currentTask?: string;
  performance: {
    tasksCompleted: number;
    successRate: number;
    avgDuration: number;
  };
  resources: {
    cpu: number;
    memory: number;
  };
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  tasks: Map<string, Task>;
  agents: Map<string, Agent>;
  status: 'planning' | 'executing' | 'paused' | 'completed' | 'failed';
  progress: number;
  startTime?: number;
  endTime?: number;
  adaptations: Adaptation[];
}

interface Adaptation {
  timestamp: number;
  type: 'reallocation' | 'retry' | 'skip' | 'parallelize' | 'reschedule';
  reason: string;
  taskId: string;
  details: string;
  impact: 'positive' | 'negative' | 'neutral';
}

interface ExecutionMetrics {
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  averageDuration: number;
  resourceUtilization: {
    cpu: number;
    memory: number;
    api: number;
  };
  bottlenecks: string[];
  estimatedTimeRemaining: number;
}

const SAMPLE_WORKFLOWS = [
  {
    id: 'data-pipeline',
    name: 'Data Processing Pipeline',
    description: 'ETL pipeline with data validation and transformation',
    tasks: [
      {
        id: 'extract-data',
        name: 'Extract Data',
        type: 'sequential' as const,
        priority: 'critical' as const,
        dependencies: [],
        subtasks: ['connect-db', 'query-data', 'validate-schema']
      },
      {
        id: 'clean-data',
        name: 'Clean Data',
        type: 'parallel' as const,
        priority: 'high' as const,
        dependencies: ['extract-data'],
        subtasks: ['remove-duplicates', 'handle-nulls', 'normalize-values']
      },
      {
        id: 'transform-data',
        name: 'Transform Data',
        type: 'sequential' as const,
        priority: 'high' as const,
        dependencies: ['clean-data'],
        subtasks: ['apply-rules', 'aggregate-metrics', 'create-features']
      },
      {
        id: 'validate-output',
        name: 'Validate Output',
        type: 'conditional' as const,
        priority: 'medium' as const,
        dependencies: ['transform-data'],
        subtasks: ['check-quality', 'verify-constraints']
      },
      {
        id: 'load-data',
        name: 'Load to Warehouse',
        type: 'sequential' as const,
        priority: 'high' as const,
        dependencies: ['validate-output'],
        subtasks: ['connect-warehouse', 'upload-data', 'verify-upload']
      }
    ]
  },
  {
    id: 'ml-training',
    name: 'ML Model Training Pipeline',
    description: 'End-to-end machine learning model training workflow',
    tasks: [
      {
        id: 'prepare-dataset',
        name: 'Prepare Dataset',
        type: 'sequential' as const,
        priority: 'critical' as const,
        dependencies: [],
        subtasks: ['load-data', 'split-data', 'augment-data']
      },
      {
        id: 'feature-engineering',
        name: 'Feature Engineering',
        type: 'parallel' as const,
        priority: 'high' as const,
        dependencies: ['prepare-dataset'],
        subtasks: ['extract-features', 'select-features', 'scale-features']
      },
      {
        id: 'train-models',
        name: 'Train Models',
        type: 'parallel' as const,
        priority: 'critical' as const,
        dependencies: ['feature-engineering'],
        subtasks: ['train-baseline', 'train-advanced', 'train-ensemble']
      },
      {
        id: 'evaluate-models',
        name: 'Evaluate Models',
        type: 'sequential' as const,
        priority: 'high' as const,
        dependencies: ['train-models'],
        subtasks: ['compute-metrics', 'cross-validate', 'compare-models']
      },
      {
        id: 'hyperparameter-tuning',
        name: 'Hyperparameter Tuning',
        type: 'iterative' as const,
        priority: 'medium' as const,
        dependencies: ['evaluate-models'],
        subtasks: ['grid-search', 'update-params', 'retrain']
      },
      {
        id: 'deploy-model',
        name: 'Deploy Best Model',
        type: 'sequential' as const,
        priority: 'high' as const,
        dependencies: ['hyperparameter-tuning'],
        subtasks: ['package-model', 'test-endpoint', 'monitor-performance']
      }
    ]
  },
  {
    id: 'content-generation',
    name: 'Content Generation Workflow',
    description: 'Multi-stage content creation with review cycles',
    tasks: [
      {
        id: 'research',
        name: 'Research Topic',
        type: 'parallel' as const,
        priority: 'high' as const,
        dependencies: [],
        subtasks: ['gather-sources', 'analyze-competitors', 'identify-keywords']
      },
      {
        id: 'outline',
        name: 'Create Outline',
        type: 'sequential' as const,
        priority: 'high' as const,
        dependencies: ['research'],
        subtasks: ['structure-content', 'define-sections']
      },
      {
        id: 'write-content',
        name: 'Write Content',
        type: 'parallel' as const,
        priority: 'critical' as const,
        dependencies: ['outline'],
        subtasks: ['write-intro', 'write-body', 'write-conclusion']
      },
      {
        id: 'review-edit',
        name: 'Review & Edit',
        type: 'iterative' as const,
        priority: 'high' as const,
        dependencies: ['write-content'],
        subtasks: ['fact-check', 'grammar-check', 'style-review']
      },
      {
        id: 'optimize-seo',
        name: 'SEO Optimization',
        type: 'sequential' as const,
        priority: 'medium' as const,
        dependencies: ['review-edit'],
        subtasks: ['add-metadata', 'optimize-keywords', 'create-schema']
      },
      {
        id: 'publish',
        name: 'Publish Content',
        type: 'sequential' as const,
        priority: 'high' as const,
        dependencies: ['optimize-seo'],
        subtasks: ['format-content', 'upload-media', 'schedule-post']
      }
    ]
  },
  {
    id: 'incident-response',
    name: 'Incident Response Workflow',
    description: 'Critical incident handling with escalation',
    tasks: [
      {
        id: 'detect-incident',
        name: 'Detect Incident',
        type: 'sequential' as const,
        priority: 'critical' as const,
        dependencies: [],
        subtasks: ['monitor-alerts', 'validate-severity']
      },
      {
        id: 'triage',
        name: 'Triage',
        type: 'conditional' as const,
        priority: 'critical' as const,
        dependencies: ['detect-incident'],
        subtasks: ['assess-impact', 'assign-priority', 'notify-team']
      },
      {
        id: 'investigate',
        name: 'Investigate',
        type: 'parallel' as const,
        priority: 'critical' as const,
        dependencies: ['triage'],
        subtasks: ['analyze-logs', 'check-metrics', 'trace-root-cause']
      },
      {
        id: 'mitigate',
        name: 'Mitigate',
        type: 'sequential' as const,
        priority: 'critical' as const,
        dependencies: ['investigate'],
        subtasks: ['apply-fix', 'verify-fix', 'rollback-if-needed']
      },
      {
        id: 'document',
        name: 'Document',
        type: 'sequential' as const,
        priority: 'medium' as const,
        dependencies: ['mitigate'],
        subtasks: ['write-report', 'update-runbook', 'schedule-postmortem']
      }
    ]
  }
];

const AVAILABLE_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Data Specialist',
    type: 'specialist',
    capabilities: ['data-processing', 'validation', 'transformation'],
    status: 'idle',
    performance: { tasksCompleted: 0, successRate: 0.92, avgDuration: 3.2 },
    resources: { cpu: 0, memory: 0 }
  },
  {
    id: 'agent-2',
    name: 'ML Engineer',
    type: 'specialist',
    capabilities: ['model-training', 'feature-engineering', 'evaluation'],
    status: 'idle',
    performance: { tasksCompleted: 0, successRate: 0.88, avgDuration: 5.5 },
    resources: { cpu: 0, memory: 0 }
  },
  {
    id: 'agent-3',
    name: 'Content Creator',
    type: 'specialist',
    capabilities: ['writing', 'research', 'editing'],
    status: 'idle',
    performance: { tasksCompleted: 0, successRate: 0.95, avgDuration: 2.8 },
    resources: { cpu: 0, memory: 0 }
  },
  {
    id: 'agent-4',
    name: 'General Worker',
    type: 'generalist',
    capabilities: ['general-tasks', 'validation', 'monitoring'],
    status: 'idle',
    performance: { tasksCompleted: 0, successRate: 0.85, avgDuration: 3.0 },
    resources: { cpu: 0, memory: 0 }
  },
  {
    id: 'agent-5',
    name: 'Coordinator',
    type: 'coordinator',
    capabilities: ['orchestration', 'monitoring', 'adaptation'],
    status: 'idle',
    performance: { tasksCompleted: 0, successRate: 0.98, avgDuration: 1.5 },
    resources: { cpu: 0, memory: 0 }
  }
];

export default function TaskManagementOrchestrationDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedWorkflowIndex, setSelectedWorkflowIndex] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'planning' | 'executing' | 'monitoring' | 'adapting' | 'complete'>('idle');
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [tasks, setTasks] = useState<Map<string, Task>>(new Map());
  const [, forceUpdate] = useState({});
  const [agents, setAgents] = useState<Map<string, Agent>>(new Map());
  const [metrics, setMetrics] = useState<ExecutionMetrics | null>(null);
  const [logs, setLogs] = useState<Array<{ timestamp: string; type: string; message: string }>>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [justCompletedTaskId, setJustCompletedTaskId] = useState<string | null>(null);

  const addLog = useCallback((type: string, message: string) => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    }]);
  }, []);

  const initializeWorkflow = useCallback((workflowTemplate: any): Workflow => {
    const tasksMap = new Map<string, Task>();
    const agentsMap = new Map<string, Agent>();

    // Initialize tasks
    workflowTemplate.tasks.forEach((taskTemplate: any) => {
      const task: Task = {
        ...taskTemplate,
        status: 'pending',
        progress: 0,
        estimatedDuration: 4 + Math.random() * 6,
        retries: 0,
        maxRetries: 3,
        resources: {
          cpu: Math.floor(20 + Math.random() * 30),
          memory: Math.floor(100 + Math.random() * 200),
          api_calls: Math.floor(Math.random() * 10)
        },
        conditions: {
          preconditions: taskTemplate.dependencies,
          postconditions: [`${taskTemplate.id}-completed`]
        },
        metadata: {
          errors: [],
          outputs: []
        }
      };
      tasksMap.set(task.id, task);
    });

    // Initialize agents
    AVAILABLE_AGENTS.forEach(agent => {
      agentsMap.set(agent.id, { ...agent, status: 'idle', currentTask: undefined });
    });

    return {
      id: workflowTemplate.id,
      name: workflowTemplate.name,
      description: workflowTemplate.description,
      tasks: tasksMap,
      agents: agentsMap,
      status: 'planning',
      progress: 0,
      adaptations: []
    };
  }, []);

  const assignAgentToTask = useCallback((task: Task, agents: Map<string, Agent>): string | null => {
    // Find best available agent based on capabilities and performance
    const availableAgents = Array.from(agents.values()).filter(a => a.status === 'idle');

    if (availableAgents.length === 0) return null;

    // Score agents based on task requirements
    const scores = availableAgents.map(agent => {
      let score = agent.performance.successRate * 100;

      // Prefer specialists for specific tasks
      if (task.name.toLowerCase().includes('data') && agent.capabilities.includes('data-processing')) {
        score += 20;
      } else if (task.name.toLowerCase().includes('model') && agent.capabilities.includes('model-training')) {
        score += 20;
      } else if (task.name.toLowerCase().includes('content') && agent.capabilities.includes('writing')) {
        score += 20;
      }

      // Consider agent performance
      score -= agent.performance.avgDuration * 2;

      return { agent, score };
    });

    scores.sort((a, b) => b.score - a.score);
    return scores[0]?.agent.id || null;
  }, []);

  const updateTaskStatus = useCallback((taskId: string, status: Task['status'], progress?: number) => {
    setTasks(prev => {
      const newTasks = new Map(prev);
      const task = newTasks.get(taskId);
      if (task) {
        task.status = status;
        if (progress !== undefined) task.progress = progress;
        if (status === 'running' && !task.metadata.startTime) {
          task.metadata.startTime = Date.now();
        } else if (status === 'completed' || status === 'failed') {
          task.metadata.endTime = Date.now();
          if (task.metadata.startTime) {
            task.actualDuration = (task.metadata.endTime - task.metadata.startTime) / 1000;
          }
        }
      }
      return newTasks;
    });
  }, []);

  const executeTask = useCallback(async (taskId: string, currentTasks: Map<string, Task>, currentAgents: Map<string, Agent>) => {
    // Get task from current tasks map
    let task = currentTasks.get(taskId);
    if (!task) {
      console.error(`Task ${taskId} not found`);
      return;
    }

    console.log(`Starting execution of task: ${task.name}`);

    // Mark task as running
    updateTaskStatus(taskId, 'running', 0);
    addLog('execute', `🚀 Starting task: ${task.name}`);

    // Assign agent
    const agentId = assignAgentToTask(task, currentAgents);
    if (agentId) {
      const agent = currentAgents.get(agentId);
      if (agent) {
        agent.status = 'busy';
        agent.currentTask = taskId;
        task.assignedAgent = agentId;
        setAgents(new Map(currentAgents));
        addLog('assign', `Assigned ${agent.name} to ${task.name}`);
      }
    }

    // Simulate task execution with visible progress
    const steps = 5;
    for (let i = 1; i <= steps; i++) {
      // Longer wait time to see progress
      await new Promise(resolve => setTimeout(resolve, (task.estimatedDuration * 300) / speed));
      const progress = (i / steps) * 100;
      updateTaskStatus(taskId, 'running', progress);

      // Log progress updates
      if (i % 2 === 0 || i === steps) {
        addLog('progress', `📊 ${task.name}: ${progress.toFixed(0)}% complete`);
      }

      // Get fresh task reference to check retries
      task = currentTasks.get(taskId) || task;

      // Random chance of failure (reduced to 5%)
      if (Math.random() < 0.05 && task.retries < task.maxRetries) {
        updateTaskStatus(taskId, 'failed');
        task.metadata.errors.push(`Error at step ${i}`);
        addLog('error', `❌ Task ${task.name} failed at step ${i}`);

        // Retry logic
        if (task.retries < task.maxRetries) {
          task.retries++;
          addLog('retry', `Retrying ${task.name} (attempt ${task.retries + 1}/${task.maxRetries + 1})`);
          await new Promise(resolve => setTimeout(resolve, 1000 / speed));
          return executeTask(taskId, currentTasks, currentAgents);
        }
        return;
      }
    }

    // Complete task
    console.log(`Completing task: ${task.name}`);
    updateTaskStatus(taskId, 'completed', 100);

    // Update task metadata
    task = currentTasks.get(taskId) || task;
    task.metadata.outputs.push({ result: 'success', data: {} });

    addLog('complete', `✅ Completed task: ${task.name}`);

    // Trigger animation for completed task
    setJustCompletedTaskId(taskId);
    console.log(`Just completed task ID set to: ${taskId}`);

    // Force re-render
    forceUpdate({});

    setTimeout(() => {
      setJustCompletedTaskId(null);
      console.log(`Cleared just completed task ID`);
    }, 2000);

    // Free up agent
    if (task.assignedAgent) {
      const agent = currentAgents.get(task.assignedAgent);
      if (agent) {
        agent.status = 'idle';
        agent.currentTask = undefined;
        agent.performance.tasksCompleted++;
        setAgents(new Map(currentAgents));
      }
    }
  }, [speed, addLog, assignAgentToTask, updateTaskStatus]);

  const checkDependencies = useCallback((task: Task, tasks: Map<string, Task>): boolean => {
    return task.dependencies.every(depId => {
      const depTask = tasks.get(depId);
      return depTask && depTask.status === 'completed';
    });
  }, []);

  const executeWorkflow = useCallback(async () => {
    addLog('start', 'Starting workflow execution');
    setCurrentPhase('executing');

    console.log('Starting workflow with tasks:', Array.from(tasks.keys()));

    const taskQueue: string[] = [];
    const executingTasks = new Set<string>();

    // Initialize task queue
    tasks.forEach((task, taskId) => {
      if (checkDependencies(task, tasks)) {
        updateTaskStatus(taskId, 'ready');
        taskQueue.push(taskId);
        console.log(`Task ${taskId} is ready to execute`);
      }
    });

    console.log('Initial task queue:', taskQueue);

    while (taskQueue.length > 0 || executingTasks.size > 0) {
      // Start ready tasks
      while (taskQueue.length > 0) {
        const taskId = taskQueue.shift()!;
        const task = tasks.get(taskId);

        if (!task) continue;

        // Check for available agents
        const hasAvailableAgent = Array.from(agents.values()).some(a => a.status === 'idle');

        if (task.type === 'parallel' && hasAvailableAgent) {
          executingTasks.add(taskId);
          console.log(`Starting parallel task: ${taskId}`);
          executeTask(taskId, tasks, agents).then(() => {
            executingTasks.delete(taskId);

            // Check for newly ready tasks
            setTasks(prevTasks => {
              const newTasks = new Map(prevTasks);
              newTasks.forEach((t, id) => {
                if (t.status === 'pending' && checkDependencies(t, newTasks)) {
                  t.status = 'ready';
                  taskQueue.push(id);
                }
              });
              return newTasks;
            });
          });
        } else if (task.type === 'sequential' && executingTasks.size === 0 && hasAvailableAgent) {
          executingTasks.add(taskId);
          await executeTask(taskId, tasks, agents);
          executingTasks.delete(taskId);

          // Check for newly ready tasks
          tasks.forEach((t, id) => {
            if (t.status === 'pending' && checkDependencies(t, tasks)) {
              updateTaskStatus(id, 'ready');
              taskQueue.push(id);
            }
          });
        } else if (task.type === 'conditional') {
          // Simulate conditional logic
          if (Math.random() > 0.3) {
            executingTasks.add(taskId);
            await executeTask(taskId, tasks, agents);
            executingTasks.delete(taskId);
          } else {
            updateTaskStatus(taskId, 'skipped');
            addLog('skip', `Skipped conditional task: ${task.name}`);
          }

          // Check for newly ready tasks
          tasks.forEach((t, id) => {
            if (t.status === 'pending' && checkDependencies(t, tasks)) {
              updateTaskStatus(id, 'ready');
              taskQueue.push(id);
            }
          });
        } else {
          // Put task back in queue if no agent available
          taskQueue.push(taskId);
          await new Promise(resolve => setTimeout(resolve, 500 / speed));
        }
      }

      await new Promise(resolve => setTimeout(resolve, 500 / speed));

      // Monitor and adapt
      if (Math.random() < 0.2) {
        setCurrentPhase('adapting');
        const adaptation = await performAdaptation();
        if (adaptation && workflow) {
          workflow.adaptations.push(adaptation);
          setWorkflow({ ...workflow });
        }
        setCurrentPhase('executing');
      }

      // Update metrics
      updateMetrics();
    }

    addLog('complete', 'Workflow execution completed');
    setCurrentPhase('complete');
  }, [tasks, agents, speed, addLog, checkDependencies, updateTaskStatus, executeTask, workflow]);

  const performAdaptation = useCallback(async (): Promise<Adaptation | null> => {
    // Identify bottlenecks or issues
    const runningTasks = Array.from(tasks.values()).filter(t => t.status === 'running');
    const blockedTasks = Array.from(tasks.values()).filter(t => t.status === 'blocked');

    if (blockedTasks.length > 0) {
      const task = blockedTasks[0];
      addLog('adapt', `Addressing blocked task: ${task.name}`);

      return {
        timestamp: Date.now(),
        type: 'reallocation',
        reason: 'Task blocked due to resource constraints',
        taskId: task.id,
        details: 'Reallocating resources to unblock task',
        impact: 'positive'
      };
    }

    if (runningTasks.length > 3) {
      addLog('adapt', 'Detected resource contention, optimizing allocation');

      return {
        timestamp: Date.now(),
        type: 'reschedule',
        reason: 'Too many concurrent tasks',
        taskId: runningTasks[0].id,
        details: 'Rescheduling tasks to reduce contention',
        impact: 'positive'
      };
    }

    return null;
  }, [tasks, addLog]);

  const updateMetrics = useCallback(() => {
    const allTasks = Array.from(tasks.values());
    const completedTasks = allTasks.filter(t => t.status === 'completed');
    const failedTasks = allTasks.filter(t => t.status === 'failed');
    const runningTasks = allTasks.filter(t => t.status === 'running');

    const avgDuration = completedTasks.length > 0
      ? completedTasks.reduce((sum, t) => sum + (t.actualDuration || 0), 0) / completedTasks.length
      : 0;

    const cpuUsage = runningTasks.reduce((sum, t) => sum + t.resources.cpu, 0);
    const memoryUsage = runningTasks.reduce((sum, t) => sum + t.resources.memory, 0);
    const apiUsage = runningTasks.reduce((sum, t) => sum + t.resources.api_calls, 0);

    const remainingTasks = allTasks.filter(t => ['pending', 'ready', 'running'].includes(t.status));
    const estimatedRemaining = remainingTasks.reduce((sum, t) => sum + t.estimatedDuration, 0);

    setMetrics({
      totalTasks: allTasks.length,
      completedTasks: completedTasks.length,
      failedTasks: failedTasks.length,
      averageDuration: avgDuration,
      resourceUtilization: {
        cpu: Math.min(100, cpuUsage),
        memory: Math.min(100, memoryUsage / 10),
        api: Math.min(100, apiUsage * 10)
      },
      bottlenecks: runningTasks.length > 3 ? ['High concurrency detected'] : [],
      estimatedTimeRemaining: estimatedRemaining
    });

    // Update workflow progress
    if (workflow) {
      workflow.progress = (completedTasks.length / allTasks.length) * 100;
      setWorkflow({ ...workflow });
    }
  }, [tasks, workflow]);

  const runOrchestration = useCallback(async () => {
    const workflowTemplate = SAMPLE_WORKFLOWS[selectedWorkflowIndex];
    const newWorkflow = initializeWorkflow(workflowTemplate);

    setWorkflow(newWorkflow);
    setTasks(newWorkflow.tasks);
    setAgents(newWorkflow.agents);
    setLogs([]);
    setMetrics(null);
    setJustCompletedTaskId(null);

    addLog('init', `🎯 Initializing workflow: ${newWorkflow.name}`);
    addLog('info', newWorkflow.description);

    // Planning phase
    setCurrentPhase('planning');
    addLog('plan', '📋 Analyzing task dependencies and resource requirements');
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    addLog('plan', `📊 Identified ${newWorkflow.tasks.size} tasks with ${newWorkflow.agents.size} available agents`);

    // List all tasks
    newWorkflow.tasks.forEach(task => {
      addLog('plan', `  • ${task.name} (${task.type}, ${task.priority})`);
    });

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Execute workflow
    await executeWorkflow();
  }, [selectedWorkflowIndex, speed, addLog, initializeWorkflow, executeWorkflow]);

  useEffect(() => {
    if (isRunning && currentPhase === 'idle') {
      runOrchestration();
    } else if (isRunning && currentPhase === 'complete') {
      setIsRunning(false);
    }
  }, [isRunning, currentPhase, runOrchestration]);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentPhase('idle');
    setWorkflow(null);
    setTasks(new Map());
    setAgents(new Map());
    setMetrics(null);
    setLogs([]);
    setSelectedTaskId(null);
  };

  const getTaskStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-900';
      case 'running': return 'text-blue-400 bg-blue-900';
      case 'failed': return 'text-red-400 bg-red-900';
      case 'blocked': return 'text-orange-400 bg-orange-900';
      case 'ready': return 'text-yellow-400 bg-yellow-900';
      case 'skipped': return 'text-gray-400 bg-gray-700';
      default: return 'text-gray-500 bg-gray-800';
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ListTodo className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Task Management & Orchestration Demo</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Workflow:</label>
              <select
                value={selectedWorkflowIndex}
                onChange={(e) => setSelectedWorkflowIndex(Number(e.target.value))}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isRunning}
              >
                {SAMPLE_WORKFLOWS.map((workflow, idx) => (
                  <option key={workflow.id} value={idx}>
                    {workflow.name}
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
            {/* Workflow Progress */}
            {workflow && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    <h4 className="text-sm font-semibold text-white">{workflow.name}</h4>
                  </div>
                  <span className="text-xs text-gray-400">{workflow.progress.toFixed(1)}% Complete</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${workflow.progress}%` }}
                  />
                </div>
                {/* Recently completed task highlight */}
                {justCompletedTaskId && tasks.get(justCompletedTaskId) && (
                  <div className="bg-green-900/30 border border-green-600 rounded p-2 animate-pulse">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 animate-bounce" />
                      <span className="text-xs text-green-300">
                        Just completed: {tasks.get(justCompletedTaskId)?.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Task Grid */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch className="w-5 h-5 text-blue-400" />
                <h4 className="text-sm font-semibold text-white">Task Execution</h4>
                <span className="text-xs text-gray-500 ml-auto">Click task for details</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Array.from(tasks.values()).map(task => (
                  <div
                    key={task.id}
                    className={`p-3 rounded border ${
                      selectedTaskId === task.id ? 'border-purple-500' : 'border-gray-700'
                    } cursor-pointer hover:border-gray-600 transition-all duration-300 ${
                      task.status === 'completed' ? 'bg-green-900/10' : ''
                    }`}
                    onClick={() => setSelectedTaskId(task.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`transition-all duration-500 ${
                        task.status === 'completed' ? 'text-green-400' :
                        task.status === 'running' ? 'text-blue-400 animate-pulse' :
                        task.status === 'failed' ? 'text-red-400' :
                        task.status === 'blocked' ? 'text-orange-400' :
                        task.status === 'skipped' ? 'text-gray-500' :
                        'text-gray-600'
                      } ${justCompletedTaskId === task.id ? 'animate-bounce' : ''}`}>
                        {task.status === 'completed' ? (
                          <CheckCircle className={`w-5 h-5 ${justCompletedTaskId === task.id ? 'scale-125' : ''} transition-transform`} />
                        ) : task.status === 'running' ? (
                          <div className="relative">
                            <Circle className="w-5 h-5" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
                            </div>
                          </div>
                        ) : task.status === 'failed' ? (
                          <AlertTriangle className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm font-medium ${
                          task.status === 'completed' ? 'text-green-300' :
                          task.status === 'running' ? 'text-white' :
                          'text-gray-300'
                        }`}>
                          {task.name}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${getTaskStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-3">
                        <span className={`${task.priority === 'critical' ? 'text-red-400' :
                                         task.priority === 'high' ? 'text-orange-400' :
                                         task.priority === 'medium' ? 'text-yellow-400' :
                                         'text-gray-400'}`}>
                          {task.priority.toUpperCase()}
                        </span>
                        <span>{task.type}</span>
                        {task.assignedAgent && (
                          <span className="text-blue-400">
                            {agents.get(task.assignedAgent)?.name}
                          </span>
                        )}
                      </div>
                      {task.status === 'completed' && task.actualDuration && (
                        <span className="text-green-400 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          {task.actualDuration.toFixed(1)}s
                        </span>
                      )}
                    </div>
                    {/* Show dependencies */}
                    {task.dependencies.length > 0 && task.status === 'pending' && (
                      <div className="mt-2 text-xs text-gray-500">
                        <span className="text-yellow-400">⚠️</span> Waiting for: {task.dependencies.join(', ')}
                      </div>
                    )}
                    {/* Show subtasks */}
                    {task.subtasks.length > 0 && (
                      <div className="mt-2 flex items-center gap-1">
                        <span className="text-xs text-gray-500">Subtasks:</span>
                        <div className="flex gap-1">
                          {task.subtasks.map((subtaskId, idx) => (
                            <div key={idx} className={`w-2 h-2 rounded-full ${
                              task.status === 'completed' ? 'bg-green-400' :
                              task.status === 'running' && idx < Math.floor(task.progress / (100 / task.subtasks.length)) ? 'bg-blue-400' :
                              'bg-gray-600'
                            }`} />
                          ))}
                        </div>
                      </div>
                    )}
                    {task.status === 'running' && (
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Progress</span>
                          <span className="text-xs text-blue-400 font-medium">{task.progress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500 relative"
                            style={{ width: `${task.progress}%` }}
                          >
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-50 animate-pulse" />
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Steps:</span>
                          {[20, 40, 60, 80, 100].map((step, idx) => (
                            <div
                              key={idx}
                              className={`w-6 h-1 rounded ${
                                task.progress >= step ? 'bg-blue-400' : 'bg-gray-600'
                              } transition-colors duration-300`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {task.retries > 0 && (
                      <div className="mt-1 text-xs text-orange-400">
                        Retried {task.retries} time{task.retries > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Agents Status */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-green-400" />
                <h4 className="text-sm font-semibold text-white">Agent Status</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Array.from(agents.values()).map(agent => (
                  <div key={agent.id} className="bg-gray-700 rounded p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-white">{agent.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        agent.status === 'idle' ? 'bg-gray-600 text-gray-300' :
                        agent.status === 'busy' ? 'bg-blue-900 text-blue-300' :
                        'bg-red-900 text-red-300'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                    {agent.currentTask && (
                      <div className="text-xs text-gray-400">
                        Working on: {tasks.get(agent.currentTask)?.name}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      Success: {(agent.performance.successRate * 100).toFixed(0)}% |
                      Completed: {agent.performance.tasksCompleted}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics Dashboard */}
            {metrics && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-yellow-400" />
                  <h4 className="text-sm font-semibold text-white">Execution Metrics</h4>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{metrics.completedTasks}</div>
                    <div className="text-xs text-gray-500">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{metrics.failedTasks}</div>
                    <div className="text-xs text-gray-500">Failed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {metrics.estimatedTimeRemaining.toFixed(1)}s
                    </div>
                    <div className="text-xs text-gray-500">Est. Remaining</div>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-400">CPU Usage</span>
                      <span className="text-gray-300">{metrics.resourceUtilization.cpu}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-green-500 h-1.5 rounded-full"
                        style={{ width: `${metrics.resourceUtilization.cpu}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-400">Memory</span>
                      <span className="text-gray-300">{metrics.resourceUtilization.memory}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{ width: `${metrics.resourceUtilization.memory}%` }}
                      />
                    </div>
                  </div>
                </div>
                {metrics.bottlenecks.length > 0 && (
                  <div className="mt-3 bg-orange-900/30 border border-orange-700 rounded p-2">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-orange-400" />
                      <span className="text-xs text-orange-300">{metrics.bottlenecks[0]}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Adaptations */}
            {workflow && workflow.adaptations.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="w-5 h-5 text-orange-400" />
                  <h4 className="text-sm font-semibold text-white">Workflow Adaptations</h4>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {workflow.adaptations.map((adaptation, idx) => (
                    <div key={idx} className="bg-gray-700 rounded p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-white">
                          {adaptation.type.replace('-', ' ').toUpperCase()}
                        </span>
                        <span className={`text-xs ${
                          adaptation.impact === 'positive' ? 'text-green-400' :
                          adaptation.impact === 'negative' ? 'text-red-400' :
                          'text-gray-400'
                        }`}>
                          {adaptation.impact}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">{adaptation.details}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-5">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 h-[600px] flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h4 className="text-sm font-semibold text-white">Orchestration Log</h4>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-600">{log.timestamp}</span>
                    <span className={`font-semibold ${
                      log.type === 'init' ? 'text-blue-400' :
                      log.type === 'plan' ? 'text-purple-400' :
                      log.type === 'execute' ? 'text-green-400' :
                      log.type === 'assign' ? 'text-cyan-400' :
                      log.type === 'complete' ? 'text-green-400' :
                      log.type === 'error' ? 'text-red-400' :
                      log.type === 'retry' ? 'text-orange-400' :
                      log.type === 'skip' ? 'text-gray-400' :
                      log.type === 'adapt' ? 'text-yellow-400' :
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
            {['planning', 'executing', 'monitoring', 'adapting', 'complete'].map((phase) => (
              <div key={phase} className="flex-1 text-center">
                <div className={`text-xs mb-1 ${
                  currentPhase === phase ? 'text-white font-semibold' : 'text-gray-500'
                }`}>
                  {phase.charAt(0).toUpperCase() + phase.slice(1)}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`h-0.5 w-full ${
                      ['planning', 'executing', 'monitoring', 'adapting', 'complete'].indexOf(phase) <=
                      ['planning', 'executing', 'monitoring', 'adapting', 'complete'].indexOf(currentPhase)
                        ? 'bg-purple-500' : 'bg-gray-700'
                    }`} />
                  </div>
                  <div className={`relative w-3 h-3 mx-auto rounded-full border-2 ${
                    currentPhase === phase
                      ? 'bg-purple-500 border-purple-400 animate-pulse'
                      : ['planning', 'executing', 'monitoring', 'adapting', 'complete'].indexOf(phase) <
                        ['planning', 'executing', 'monitoring', 'adapting', 'complete'].indexOf(currentPhase)
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