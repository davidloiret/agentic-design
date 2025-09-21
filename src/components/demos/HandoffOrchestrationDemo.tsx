'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, Users, Zap, FileText, Code, Shield, Globe, TrendingUp, Brain, CheckCircle, AlertCircle, Loader, GitBranch, Activity, Package } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
  capabilities: string[];
  currentLoad: number;
  status: 'idle' | 'active' | 'handoff-out' | 'handoff-in' | 'completed';
  specialties: Record<string, number>; // Capability scores 0-1
}

interface Task {
  id: string;
  type: string;
  content: any;
  requirements: string[];
  complexity: number;
  currentAgent?: string;
  previousAgents: string[];
  progress: number;
  context: Record<string, any>;
}

interface Handoff {
  id: string;
  fromAgent: string;
  toAgent: string;
  reason: string;
  context: Record<string, any>;
  timestamp: number;
  type: 'capability' | 'load' | 'context' | 'completion';
}

interface HandoffDecision {
  shouldHandoff: boolean;
  targetAgent?: string;
  reason?: string;
  confidence: number;
}

const AGENTS: Agent[] = [
  {
    id: 'analyst',
    name: 'Data Analyst',
    role: 'Analysis & Insights',
    icon: <TrendingUp className="w-4 h-4" />,
    color: 'text-blue-400',
    capabilities: ['data-analysis', 'statistics', 'visualization', 'reporting'],
    currentLoad: 0,
    status: 'idle',
    specialties: {
      'data-analysis': 0.95,
      'statistics': 0.9,
      'visualization': 0.8,
      'reporting': 0.85,
      'implementation': 0.3,
      'security': 0.4
    }
  },
  {
    id: 'developer',
    name: 'Developer',
    role: 'Implementation',
    icon: <Code className="w-4 h-4" />,
    color: 'text-green-400',
    capabilities: ['coding', 'api-integration', 'database', 'optimization'],
    currentLoad: 0,
    status: 'idle',
    specialties: {
      'coding': 0.95,
      'api-integration': 0.9,
      'database': 0.85,
      'optimization': 0.8,
      'data-analysis': 0.5,
      'security': 0.7
    }
  },
  {
    id: 'security',
    name: 'Security Expert',
    role: 'Security & Compliance',
    icon: <Shield className="w-4 h-4" />,
    color: 'text-red-400',
    capabilities: ['security-audit', 'compliance', 'risk-assessment', 'encryption'],
    currentLoad: 0,
    status: 'idle',
    specialties: {
      'security-audit': 0.95,
      'compliance': 0.9,
      'risk-assessment': 0.92,
      'encryption': 0.88,
      'implementation': 0.6,
      'data-analysis': 0.5
    }
  },
  {
    id: 'architect',
    name: 'Solution Architect',
    role: 'System Design',
    icon: <Globe className="w-4 h-4" />,
    color: 'text-purple-400',
    capabilities: ['system-design', 'architecture', 'integration', 'scalability'],
    currentLoad: 0,
    status: 'idle',
    specialties: {
      'system-design': 0.95,
      'architecture': 0.93,
      'integration': 0.88,
      'scalability': 0.9,
      'implementation': 0.7,
      'data-analysis': 0.6
    }
  },
  {
    id: 'ml-engineer',
    name: 'ML Engineer',
    role: 'Machine Learning',
    icon: <Brain className="w-4 h-4" />,
    color: 'text-yellow-400',
    capabilities: ['model-training', 'feature-engineering', 'deployment', 'evaluation'],
    currentLoad: 0,
    status: 'idle',
    specialties: {
      'model-training': 0.95,
      'feature-engineering': 0.9,
      'deployment': 0.85,
      'evaluation': 0.88,
      'data-analysis': 0.8,
      'optimization': 0.85
    }
  },
  {
    id: 'product',
    name: 'Product Manager',
    role: 'Requirements & Strategy',
    icon: <Package className="w-4 h-4" />,
    color: 'text-cyan-400',
    capabilities: ['requirements', 'prioritization', 'user-research', 'roadmap'],
    currentLoad: 0,
    status: 'idle',
    specialties: {
      'requirements': 0.95,
      'prioritization': 0.9,
      'user-research': 0.88,
      'roadmap': 0.92,
      'data-analysis': 0.3,  // Low score to trigger handoff
      'feature-engineering': 0.2,  // Low score to trigger handoff
      'model-training': 0.15,  // Low score to trigger handoff
      'evaluation': 0.25,  // Low score to trigger handoff
      'security-audit': 0.2,  // Low score to trigger handoff
      'deployment': 0.2,  // Low score to trigger handoff
      'integration': 0.3,  // Low score to trigger handoff
      'architecture': 0.3,  // Low score to trigger handoff
      'coding': 0.2,  // Low score to trigger handoff
      'database': 0.25,  // Low score to trigger handoff
      'encryption': 0.15,  // Low score to trigger handoff
      'api-integration': 0.2,  // Low score to trigger handoff
      'compliance': 0.3,  // Low score to trigger handoff
      'risk-assessment': 0.35,  // Low score to trigger handoff
      'optimization': 0.2,  // Low score to trigger handoff
      'visualization': 0.4,  // Low score to trigger handoff
      'scalability': 0.25,  // Low score to trigger handoff
      'system-design': 0.3
    }
  }
];

const WORKFLOWS = [
  {
    id: 'ml-pipeline',
    name: 'ML Model Development',
    description: 'End-to-end machine learning pipeline',
    stages: [
      { type: 'requirements', content: 'Define ML objectives and success metrics' },
      { type: 'data-analysis', content: 'Explore and analyze training data' },
      { type: 'feature-engineering', content: 'Create and select features' },
      { type: 'model-training', content: 'Train and tune ML models' },
      { type: 'evaluation', content: 'Evaluate model performance' },
      { type: 'security-audit', content: 'Assess model security and bias' },
      { type: 'deployment', content: 'Deploy model to production' },
      { type: 'integration', content: 'Integrate with existing systems' }
    ]
  },
  {
    id: 'secure-api',
    name: 'Secure API Development',
    description: 'Build a secure, scalable API',
    stages: [
      { type: 'requirements', content: 'Gather API requirements' },
      { type: 'architecture', content: 'Design API architecture' },
      { type: 'security-audit', content: 'Define security requirements' },
      { type: 'coding', content: 'Implement API endpoints' },
      { type: 'database', content: 'Design data models' },
      { type: 'encryption', content: 'Implement encryption' },
      { type: 'api-integration', content: 'Setup authentication' },
      { type: 'compliance', content: 'Ensure compliance' }
    ]
  },
  {
    id: 'data-platform',
    name: 'Data Platform Migration',
    description: 'Migrate to modern data platform',
    stages: [
      { type: 'data-analysis', content: 'Analyze current data landscape' },
      { type: 'architecture', content: 'Design target architecture' },
      { type: 'risk-assessment', content: 'Assess migration risks' },
      { type: 'database', content: 'Setup new database systems' },
      { type: 'coding', content: 'Build data pipelines' },
      { type: 'optimization', content: 'Optimize performance' },
      { type: 'visualization', content: 'Create monitoring dashboards' },
      { type: 'scalability', content: 'Ensure platform scalability' }
    ]
  }
];

export default function HandoffOrchestrationDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedWorkflowIndex, setSelectedWorkflowIndex] = useState(0);
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [handoffs, setHandoffs] = useState<Handoff[]>([]);
  const [currentStageIndex, setCurrentStageIndex] = useState(-1);
  const [logs, setLogs] = useState<Array<{ timestamp: string; type: string; message: string }>>([]);
  const [activeHandoff, setActiveHandoff] = useState<{ from: string; to: string } | null>(null);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const addLog = useCallback((type: string, message: string) => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    }]);
  }, []);

  const evaluateHandoffNeed = useCallback((agent: Agent, task: Task): HandoffDecision => {
    // Map task types to agent specialties
    const capabilityMap: Record<string, string> = {
      'requirements': 'requirements',
      'data-analysis': 'data-analysis',
      'feature-engineering': 'feature-engineering',
      'model-training': 'model-training',
      'evaluation': 'evaluation',
      'security-audit': 'security-audit',
      'deployment': 'deployment',
      'integration': 'integration',
      'architecture': 'architecture',
      'coding': 'coding',
      'database': 'database',
      'encryption': 'encryption',
      'api-integration': 'api-integration',
      'compliance': 'compliance',
      'risk-assessment': 'risk-assessment',
      'optimization': 'optimization',
      'visualization': 'visualization',
      'scalability': 'scalability'
    };

    const requiredCapability = capabilityMap[task.type] || task.type;
    const agentScore = agent.specialties[requiredCapability] || 0.1;

    // Find best agent for this task
    const bestAgent = agents.reduce((best, candidate) => {
      const candidateScore = candidate.specialties[requiredCapability] || 0.1;
      const bestScore = best.specialties[requiredCapability] || 0.1;
      return candidateScore > bestScore ? candidate : best;
    });

    // Decision factors
    const scoreDifference = (bestAgent.specialties[requiredCapability] || 0.1) - agentScore;
    const loadFactor = agent.currentLoad > 60 ? 0.2 : 0;
    const contextSwitch = task.previousAgents.includes(bestAgent.id) ? -0.1 : 0;

    const handoffScore = scoreDifference + loadFactor + contextSwitch;

    // Lower threshold and ensure we handoff when there's a clearly better agent
    if ((handoffScore > 0.05 || scoreDifference > 0.1) && bestAgent.id !== agent.id) {
      let reason = '';
      if (scoreDifference > 0.1) {
        reason = `${bestAgent.name} has superior ${task.type} capabilities`;
      } else if (loadFactor > 0) {
        reason = `${agent.name} is overloaded, delegating to ${bestAgent.name}`;
      } else {
        reason = `Context requires ${bestAgent.name}'s expertise for ${task.type}`;
      }

      return {
        shouldHandoff: true,
        targetAgent: bestAgent.id,
        reason,
        confidence: Math.min(handoffScore + 0.5, 1)
      };
    }

    return {
      shouldHandoff: false,
      confidence: agentScore
    };
  }, [agents]);

  const performHandoff = useCallback(async (fromAgentId: string, toAgentId: string, task: Task, reason: string) => {
    const fromAgent = agents.find(a => a.id === fromAgentId);
    const toAgent = agents.find(a => a.id === toAgentId);

    if (!fromAgent || !toAgent) return;

    // Start handoff animation
    setActiveHandoff({ from: fromAgentId, to: toAgentId });

    // Update agent statuses
    setAgents(prev => prev.map(a => {
      if (a.id === fromAgentId) return { ...a, status: 'handoff-out', currentLoad: 0 };
      if (a.id === toAgentId) return { ...a, status: 'handoff-in' };
      return a;
    }));

    addLog('handoff', `🤝 ${fromAgent.name} → ${toAgent.name}: ${reason}`);

    // Create handoff record
    const handoff: Handoff = {
      id: `handoff-${Date.now()}`,
      fromAgent: fromAgentId,
      toAgent: toAgentId,
      reason,
      context: task.context,
      timestamp: Date.now(),
      type: reason.includes('capabilities') ? 'capability' :
            reason.includes('overload') ? 'load' :
            reason.includes('Context') ? 'context' : 'completion'
    };

    setHandoffs(prev => [...prev, handoff]);

    // Simulate handoff time
    await new Promise(resolve => setTimeout(resolve, 800 / speed));

    // Complete handoff
    setAgents(prev => prev.map(a => {
      if (a.id === fromAgentId) return { ...a, status: 'idle' };
      if (a.id === toAgentId) return { ...a, status: 'active', currentLoad: 50 };
      return a;
    }));

    setActiveHandoff(null);

    // Update task
    setCurrentTask(prev => prev ? {
      ...prev,
      currentAgent: toAgentId,
      previousAgents: [...prev.previousAgents, fromAgentId],
      context: { ...prev.context, lastHandoff: handoff.id }
    } : null);

    addLog('transfer', `${toAgent.name} took control of ${task.type} task`);
  }, [agents, speed, addLog]);

  const processStage = useCallback(async (stage: any, stageIndex: number) => {
    const task: Task = {
      id: `task-${Date.now()}`,
      type: stage.type,
      content: stage.content,
      requirements: [stage.type],
      complexity: Math.random() * 0.5 + 0.5,
      previousAgents: [],
      progress: 0,
      context: { stage: stageIndex }
    };

    setCurrentTask(task);
    setCurrentStageIndex(stageIndex);

    // Always start with Product Manager to demonstrate handoffs
    // This ensures we see handoffs as the PM delegates to specialists
    let currentAgentId = 'product';

    // For the first stage (requirements), PM is already optimal
    // For other stages, we'll let the handoff logic transfer to the right specialist
    task.currentAgent = currentAgentId;

    // Activate initial agent
    setAgents(prev => prev.map(a =>
      a.id === currentAgentId ? { ...a, status: 'active', currentLoad: 50 } : a
    ));

    addLog('assign', `${agents.find(a => a.id === currentAgentId)?.name} assigned to ${stage.type}`);

    // Process with potential handoffs
    let processingComplete = false;
    let iterations = 0;
    const maxIterations = 2;
    let hasHandedOff = false;

    while (!processingComplete && iterations < maxIterations) {
      iterations++;

      // Simulate initial processing
      const steps = 3;
      for (let i = 1; i <= steps; i++) {
        await new Promise(resolve => setTimeout(resolve, 300 / speed));

        setCurrentTask(prev => prev ? {
          ...prev,
          progress: (i / steps) * 50
        } : null);

        // Update agent load
        setAgents(prev => prev.map(a =>
          a.id === task.currentAgent ? {
            ...a,
            currentLoad: Math.min(40 + i * 15, 80)
          } : a
        ));
      }

      // Always evaluate handoff on first iteration to demonstrate the mechanism
      const currentAgent = agents.find(a => a.id === task.currentAgent);
      if (currentAgent && !hasHandedOff) {
        const decision = evaluateHandoffNeed(currentAgent, task);

        if (decision.shouldHandoff && decision.targetAgent) {
          await performHandoff(currentAgent.id, decision.targetAgent, task, decision.reason || '');
          task.currentAgent = decision.targetAgent;
          hasHandedOff = true;

          // Continue processing with new agent
          for (let i = 1; i <= steps; i++) {
            await new Promise(resolve => setTimeout(resolve, 300 / speed));
            setCurrentTask(prev => prev ? {
              ...prev,
              progress: 50 + (i / steps) * 50
            } : null);
          }
        } else {
          // Complete processing with current agent
          for (let i = 1; i <= steps; i++) {
            await new Promise(resolve => setTimeout(resolve, 300 / speed));
            setCurrentTask(prev => prev ? {
              ...prev,
              progress: 50 + (i / steps) * 50
            } : null);
          }
        }
        processingComplete = true;
      } else {
        processingComplete = true;
      }
    }

    // Complete stage
    const finalAgent = agents.find(a => a.id === task.currentAgent);
    if (finalAgent) {
      setAgents(prev => prev.map(a =>
        a.id === finalAgent.id ? { ...a, status: 'completed', currentLoad: 0 } : a
      ));
      addLog('complete', `${finalAgent.name} completed ${stage.type}`);
    }

    setCompletedStages(prev => [...prev, stageIndex]);
    setCurrentTask(prev => prev ? { ...prev, progress: 100 } : null);

    await new Promise(resolve => setTimeout(resolve, 500 / speed));

    // Reset agent status
    setAgents(prev => prev.map(a => ({ ...a, status: 'idle', currentLoad: 0 })));
  }, [agents, speed, addLog, evaluateHandoffNeed, performHandoff]);

  const runHandoffOrchestration = useCallback(async () => {
    if (isRunning) return;

    setIsRunning(true);
    const workflow = WORKFLOWS[selectedWorkflowIndex];

    // Reset state
    setAgents(AGENTS.map(a => ({ ...a, status: 'idle', currentLoad: 0 })));
    setCurrentTask(null);
    setHandoffs([]);
    setCurrentStageIndex(-1);
    setLogs([]);
    setActiveHandoff(null);
    setCompletedStages([]);

    addLog('start', `🚀 Starting handoff orchestration: ${workflow.name}`);
    addLog('info', workflow.description);

    // Process each stage
    for (let i = 0; i < workflow.stages.length; i++) {
      const stage = workflow.stages[i];
      await processStage(stage, i);

      // Brief pause between stages
      if (i < workflow.stages.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300 / speed));
      }
    }

    // Get the final handoff count from state
    setHandoffs(prev => {
      addLog('success', `✅ Workflow completed with ${prev.length} handoffs`);
      return prev;
    });

    setCurrentStageIndex(-1);
    setIsRunning(false);
  }, [isRunning, selectedWorkflowIndex, speed, processStage, addLog]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setAgents(AGENTS.map(a => ({ ...a, status: 'idle', currentLoad: 0 })));
    setCurrentTask(null);
    setHandoffs([]);
    setCurrentStageIndex(-1);
    setLogs([]);
    setActiveHandoff(null);
    setCompletedStages([]);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-400" />
            Handoff Orchestration Demo
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Watch agents dynamically transfer control based on context and capabilities
          </p>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={selectedWorkflowIndex}
            onChange={(e) => setSelectedWorkflowIndex(Number(e.target.value))}
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm text-white"
            disabled={isRunning}
          >
            {WORKFLOWS.map((workflow, idx) => (
              <option key={idx} value={idx}>{workflow.name}</option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Speed:</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24"
              disabled={isRunning}
            />
            <span className="text-sm text-gray-400 w-12">{speed}x</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runHandoffOrchestration}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                isRunning
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  Running
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Workflow
                </>
              )}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Workflow Progress */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <h4 className="text-sm font-semibold text-white mb-3">Workflow Progress</h4>
        <div className="flex items-center space-x-2">
          {WORKFLOWS[selectedWorkflowIndex].stages.map((stage, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                  completedStages.includes(idx) ? 'bg-green-900 text-green-400' :
                  currentStageIndex === idx ? 'bg-purple-900 text-purple-400 animate-pulse' :
                  'bg-gray-800 text-gray-500'
                }`}>
                  {completedStages.includes(idx) ? '✓' : idx + 1}
                </div>
                <div className="text-xs text-gray-500 mt-1 max-w-[80px] text-center truncate">
                  {stage.type}
                </div>
              </div>
              {idx < WORKFLOWS[selectedWorkflowIndex].stages.length - 1 && (
                <ArrowRight className="w-4 h-4 text-gray-600" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Agent Network */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-white">Agent Network</h4>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">
              Active Handoffs: <span className="text-purple-400 font-semibold">{handoffs.length}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {agents.map(agent => (
            <div
              key={agent.id}
              className={`relative bg-gray-800 rounded-lg p-4 border-2 transition-all ${
                agent.status === 'active' ? 'border-green-500 shadow-lg shadow-green-500/20' :
                agent.status === 'handoff-out' ? 'border-yellow-500 animate-pulse' :
                agent.status === 'handoff-in' ? 'border-blue-500 animate-pulse' :
                agent.status === 'completed' ? 'border-green-600' :
                'border-gray-700'
              }`}
            >
              {/* Agent Info */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={agent.color}>{agent.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{agent.name}</div>
                    <div className="text-xs text-gray-400">{agent.role}</div>
                  </div>
                </div>
                {agent.status === 'active' && (
                  <Loader className="w-4 h-4 text-green-400 animate-spin" />
                )}
                {agent.status === 'completed' && (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                )}
              </div>

              {/* Capabilities */}
              <div className="text-xs text-gray-500 mb-2">
                {agent.capabilities.slice(0, 2).join(', ')}
              </div>

              {/* Current Load */}
              {agent.currentLoad > 0 && (
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Load</span>
                    <span className="text-xs text-gray-400">{agent.currentLoad}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        agent.currentLoad > 70 ? 'bg-red-500' :
                        agent.currentLoad > 40 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${agent.currentLoad}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Status Badge */}
              <div className={`text-xs px-2 py-1 rounded text-center ${
                agent.status === 'active' ? 'bg-green-900 text-green-300' :
                agent.status === 'handoff-out' ? 'bg-yellow-900 text-yellow-300' :
                agent.status === 'handoff-in' ? 'bg-blue-900 text-blue-300' :
                agent.status === 'completed' ? 'bg-green-900 text-green-300' :
                'bg-gray-900 text-gray-500'
              }`}>
                {agent.status === 'handoff-out' ? 'Transferring' :
                 agent.status === 'handoff-in' ? 'Receiving' :
                 agent.status}
              </div>
            </div>
          ))}
        </div>

        {/* Active Handoff Visualization */}
        {activeHandoff && (
          <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-purple-500">
            <div className="flex items-center justify-center gap-4">
              <span className="text-yellow-400">
                {agents.find(a => a.id === activeHandoff.from)?.name}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-500 to-blue-500 animate-pulse" />
                <ArrowRight className="w-4 h-4 text-purple-400" />
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 animate-pulse" />
              </div>
              <span className="text-blue-400">
                {agents.find(a => a.id === activeHandoff.to)?.name}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Current Task & Handoff History */}
      <div className="grid grid-cols-2 gap-4">
        {/* Current Task */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h4 className="text-sm font-semibold text-white">Current Task</h4>
          </div>

          {currentTask ? (
            <div className="space-y-2">
              <div className="bg-gray-900 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">{currentTask.type}</span>
                  <span className="text-xs text-gray-400">
                    Stage {(currentTask.context.stage || 0) + 1}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{currentTask.content}</div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs text-gray-500">{Math.round(currentTask.progress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all"
                      style={{ width: `${currentTask.progress}%` }}
                    />
                  </div>
                </div>

                {/* Current Agent */}
                {currentTask.currentAgent && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-gray-500">Assigned to:</span>
                    <span className="text-xs text-purple-400 font-semibold">
                      {agents.find(a => a.id === currentTask.currentAgent)?.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div className="text-sm">No active task</div>
            </div>
          )}
        </div>

        {/* Handoff History */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <h4 className="text-sm font-semibold text-white">Handoff History</h4>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {handoffs.length > 0 ? (
              handoffs.map((handoff, idx) => {
                const fromAgent = agents.find(a => a.id === handoff.fromAgent);
                const toAgent = agents.find(a => a.id === handoff.toAgent);
                return (
                  <div key={handoff.id} className="bg-gray-900 rounded p-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`font-semibold ${fromAgent?.color}`}>
                        {fromAgent?.name}
                      </span>
                      <ArrowRight className="w-3 h-3 text-gray-500" />
                      <span className={`font-semibold ${toAgent?.color}`}>
                        {toAgent?.name}
                      </span>
                      <span className={`ml-auto px-2 py-0.5 rounded ${
                        handoff.type === 'capability' ? 'bg-purple-900 text-purple-300' :
                        handoff.type === 'load' ? 'bg-yellow-900 text-yellow-300' :
                        handoff.type === 'context' ? 'bg-blue-900 text-blue-300' :
                        'bg-green-900 text-green-300'
                      }`}>
                        {handoff.type}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{handoff.reason}</div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-500 py-4">
                <div className="text-sm">No handoffs yet</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 h-48 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold text-white">Orchestration Log</h4>
        </div>

        <div className="space-y-1 font-mono text-xs">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-gray-600">{log.timestamp}</span>
              <span className={`font-semibold ${
                log.type === 'start' ? 'text-blue-400' :
                log.type === 'assign' ? 'text-purple-400' :
                log.type === 'handoff' ? 'text-yellow-400' :
                log.type === 'transfer' ? 'text-cyan-400' :
                log.type === 'complete' ? 'text-green-400' :
                log.type === 'success' ? 'text-green-400' :
                'text-gray-400'
              }`}>
                [{log.type.toUpperCase()}]
              </span>
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}