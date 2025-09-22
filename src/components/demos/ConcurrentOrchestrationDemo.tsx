'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Users, Brain, Zap, Eye, FileText, Code, TrendingUp, Shield, Globe, Clock, CheckCircle, AlertCircle, Loader, GitMerge, Activity } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
  specialty: string;
  status: 'idle' | 'working' | 'completed' | 'merging';
  progress: number;
  result?: any;
  startTime?: number;
  endTime?: number;
}

interface Task {
  id: string;
  name: string;
  description: string;
  type: 'analysis' | 'generation' | 'optimization' | 'validation';
  complexity: 'low' | 'medium' | 'high';
  requiredPerspectives: string[];
}

interface Perspective {
  agentId: string;
  content: any;
  confidence: number;
  processingTime: number;
  insights: string[];
}

interface ConsensusResult {
  combined: any;
  confidence: number;
  agreements: string[];
  conflicts: string[];
  resolution: string;
}

const AGENTS: Agent[] = [
  {
    id: 'analyst',
    name: 'Data Analyst',
    role: 'Statistical Analysis',
    icon: <TrendingUp className="w-4 h-4" />,
    color: 'text-blue-400',
    specialty: 'Quantitative analysis and pattern recognition',
    status: 'idle',
    progress: 0
  },
  {
    id: 'creative',
    name: 'Creative Agent',
    role: 'Innovative Solutions',
    icon: <Zap className="w-4 h-4" />,
    color: 'text-yellow-400',
    specialty: 'Out-of-the-box thinking and novel approaches',
    status: 'idle',
    progress: 0
  },
  {
    id: 'critic',
    name: 'Critical Reviewer',
    role: 'Quality Assessment',
    icon: <Eye className="w-4 h-4" />,
    color: 'text-red-400',
    specialty: 'Risk assessment and flaw detection',
    status: 'idle',
    progress: 0
  },
  {
    id: 'engineer',
    name: 'Technical Expert',
    role: 'Implementation',
    icon: <Code className="w-4 h-4" />,
    color: 'text-green-400',
    specialty: 'Technical feasibility and best practices',
    status: 'idle',
    progress: 0
  },
  {
    id: 'strategist',
    name: 'Strategic Planner',
    role: 'Long-term Vision',
    icon: <Globe className="w-4 h-4" />,
    color: 'text-purple-400',
    specialty: 'Business impact and strategic alignment',
    status: 'idle',
    progress: 0
  },
  {
    id: 'security',
    name: 'Security Auditor',
    role: 'Safety & Compliance',
    icon: <Shield className="w-4 h-4" />,
    color: 'text-cyan-400',
    specialty: 'Security vulnerabilities and compliance',
    status: 'idle',
    progress: 0
  }
];

const TASKS: Task[] = [
  {
    id: 'product-launch',
    name: 'Product Launch Strategy',
    description: 'Develop comprehensive launch plan for new AI product',
    type: 'generation',
    complexity: 'high',
    requiredPerspectives: ['market-analysis', 'technical-feasibility', 'risk-assessment', 'creative-marketing']
  },
  {
    id: 'system-optimization',
    name: 'System Performance Optimization',
    description: 'Identify and resolve performance bottlenecks',
    type: 'optimization',
    complexity: 'medium',
    requiredPerspectives: ['technical-analysis', 'cost-benefit', 'implementation-plan']
  },
  {
    id: 'market-analysis',
    name: 'Market Opportunity Analysis',
    description: 'Evaluate potential market segments for expansion',
    type: 'analysis',
    complexity: 'medium',
    requiredPerspectives: ['data-analysis', 'strategic-vision', 'risk-evaluation']
  },
  {
    id: 'security-audit',
    name: 'Security Architecture Review',
    description: 'Comprehensive security assessment of system architecture',
    type: 'validation',
    complexity: 'high',
    requiredPerspectives: ['security-assessment', 'technical-review', 'compliance-check']
  }
];

export default function ConcurrentOrchestrationDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [perspectives, setPerspectives] = useState<Perspective[]>([]);
  const [consensusResult, setConsensusResult] = useState<ConsensusResult | null>(null);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'distributing' | 'processing' | 'merging' | 'consensus' | 'complete'>('idle');
  const [logs, setLogs] = useState<Array<{ timestamp: string; type: string; message: string }>>([]);
  const [activeConnections, setActiveConnections] = useState<Array<{ from: string; to: string }>>([]);

  const addLog = useCallback((type: string, message: string) => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    }]);
  }, []);

  const generatePerspective = (agent: Agent, task: Task): Perspective => {
    const baseTime = task.complexity === 'high' ? 3000 : task.complexity === 'medium' ? 2000 : 1000;
    const insights: string[] = [];

    switch (agent.id) {
      case 'analyst':
        insights.push('Data shows 73% market readiness');
        insights.push('Projected ROI: 245% over 2 years');
        insights.push('Key demographic: 25-40 tech-savvy');
        break;
      case 'creative':
        insights.push('Unique positioning opportunity identified');
        insights.push('Viral marketing potential: High');
        insights.push('Brand differentiation strategy ready');
        break;
      case 'critic':
        insights.push('3 critical risks identified');
        insights.push('Competition response time: 2-3 months');
        insights.push('Regulatory compliance needed in 2 regions');
        break;
      case 'engineer':
        insights.push('Technical feasibility: 95% confirmed');
        insights.push('Infrastructure scaling ready');
        insights.push('API integration time: 2 weeks');
        break;
      case 'strategist':
        insights.push('Aligns with Q3 business objectives');
        insights.push('Partnership opportunities available');
        insights.push('Market entry timing optimal');
        break;
      case 'security':
        insights.push('Security posture: Strong');
        insights.push('GDPR/CCPA compliant');
        insights.push('Zero critical vulnerabilities');
        break;
    }

    return {
      agentId: agent.id,
      content: {
        analysis: `${agent.name} perspective on ${task.name}`,
        recommendations: insights.slice(0, 2),
        concerns: insights.slice(2),
        confidence: Math.random() * 0.3 + 0.7
      },
      confidence: Math.random() * 0.3 + 0.7,
      processingTime: baseTime + Math.random() * 1000,
      insights
    };
  };

  const processAgent = useCallback(async (agent: Agent, task: Task) => {
    const processingTime = (task.complexity === 'high' ? 4000 : 2500) / speed;
    const steps = 10;
    const stepTime = processingTime / steps;

    setAgents(prev => prev.map(a =>
      a.id === agent.id ? { ...a, status: 'working', startTime: Date.now() } : a
    ));

    addLog('start', `${agent.name} started processing`);

    // Simulate progress
    for (let i = 1; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepTime));
      setAgents(prev => prev.map(a =>
        a.id === agent.id ? { ...a, progress: (i / steps) * 100 } : a
      ));

      if (i === 5) {
        addLog('progress', `${agent.name}: ${agent.specialty}`);
      }
    }

    const perspective = generatePerspective(agent, task);

    setAgents(prev => prev.map(a =>
      a.id === agent.id ? {
        ...a,
        status: 'completed',
        endTime: Date.now(),
        result: perspective.content
      } : a
    ));

    setPerspectives(prev => [...prev, perspective]);

    addLog('complete', `${agent.name} completed analysis (confidence: ${(perspective.confidence * 100).toFixed(0)}%)`);

    return perspective;
  }, [speed, addLog]);

  const mergeResults = useCallback(async () => {
    setCurrentPhase('merging');
    addLog('merge', '🔄 Merging agent perspectives...');

    // Simulate connections between agents
    const connections: Array<{ from: string; to: string }> = [];
    for (let i = 0; i < agents.length; i++) {
      for (let j = i + 1; j < agents.length; j++) {
        connections.push({
          from: agents[i].id,
          to: agents[j].id
        });
      }
    }

    // Animate connections
    for (const conn of connections) {
      setActiveConnections([conn]);
      await new Promise(resolve => setTimeout(resolve, 100 / speed));
    }

    setActiveConnections([]);

    // Build consensus
    setCurrentPhase('consensus');
    addLog('consensus', '🤝 Building consensus from diverse perspectives');

    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    const avgConfidence = perspectives.reduce((sum, p) => sum + p.confidence, 0) / perspectives.length;

    const consensus: ConsensusResult = {
      combined: {
        summary: 'Comprehensive multi-agent analysis complete',
        totalInsights: perspectives.reduce((sum, p) => sum + p.insights.length, 0),
        perspectives: perspectives.length,
        processingTime: Math.max(...perspectives.map(p => p.processingTime))
      },
      confidence: avgConfidence,
      agreements: [
        'Market opportunity confirmed',
        'Technical feasibility validated',
        'Timeline is achievable'
      ],
      conflicts: [
        'Risk tolerance varies across agents',
        'Resource allocation priorities differ'
      ],
      resolution: 'Weighted consensus achieved with high confidence'
    };

    setConsensusResult(consensus);
    addLog('success', `✅ Consensus reached (confidence: ${(avgConfidence * 100).toFixed(0)}%)`);

    return consensus;
  }, [agents, perspectives, speed, addLog]);

  const runConcurrentOrchestration = useCallback(async () => {
    if (isRunning) return;

    setIsRunning(true);
    const task = TASKS[selectedTaskIndex];

    // Reset state
    setAgents(AGENTS.map(a => ({ ...a, status: 'idle', progress: 0, result: undefined })));
    setPerspectives([]);
    setConsensusResult(null);
    setLogs([]);
    setActiveConnections([]);

    addLog('start', `🚀 Starting concurrent orchestration: ${task.name}`);
    addLog('info', task.description);

    // Phase 1: Distribution
    setCurrentPhase('distributing');
    addLog('phase', '📤 Distributing task to all agents');

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Phase 2: Concurrent Processing
    setCurrentPhase('processing');
    addLog('phase', '⚡ All agents working simultaneously');

    // Process all agents concurrently
    const agentPromises = agents.map(agent => processAgent(agent, task));
    await Promise.all(agentPromises);

    // Phase 3: Merge Results
    await mergeResults();

    // Phase 4: Complete
    setCurrentPhase('complete');
    addLog('complete', '🎉 Concurrent orchestration complete');

    setIsRunning(false);
  }, [isRunning, selectedTaskIndex, agents, speed, processAgent, mergeResults, addLog]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setAgents(AGENTS.map(a => ({ ...a, status: 'idle', progress: 0, result: undefined })));
    setPerspectives([]);
    setConsensusResult(null);
    setCurrentPhase('idle');
    setLogs([]);
    setActiveConnections([]);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            Concurrent Orchestration Demo
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Multiple agents work simultaneously on the same task for diverse perspectives
          </p>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={selectedTaskIndex}
            onChange={(e) => setSelectedTaskIndex(Number(e.target.value))}
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm text-white"
            disabled={isRunning}
          >
            {TASKS.map((task, idx) => (
              <option key={idx} value={idx}>{task.name}</option>
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
              onClick={runConcurrentOrchestration}
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
                  Start Orchestration
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

      {/* Agent Grid */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-white">Concurrent Agents</h4>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">
              Phase: <span className="text-purple-400 font-semibold">{currentPhase}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {agents.map(agent => (
            <div
              key={agent.id}
              className={`relative bg-gray-800 rounded-lg p-4 border-2 transition-all ${
                agent.status === 'working' ? 'border-yellow-500 animate-pulse' :
                agent.status === 'completed' ? 'border-green-500' :
                agent.status === 'merging' ? 'border-purple-500' :
                'border-gray-700'
              }`}
            >
              {/* Agent Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={agent.color}>{agent.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{agent.name}</div>
                    <div className="text-xs text-gray-400">{agent.role}</div>
                  </div>
                </div>
                {agent.status === 'working' && (
                  <Loader className="w-4 h-4 text-yellow-400 animate-spin" />
                )}
                {agent.status === 'completed' && (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                )}
              </div>

              {/* Specialty */}
              <div className="text-xs text-gray-500 mb-3">{agent.specialty}</div>

              {/* Progress Bar */}
              {agent.status !== 'idle' && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs text-gray-400">{Math.round(agent.progress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all"
                      style={{ width: `${agent.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Result Preview */}
              {agent.result && (
                <div className="mt-3 p-2 bg-gray-900 rounded text-xs">
                  <div className="text-green-400 mb-1">Analysis Complete</div>
                  <div className="text-gray-400">
                    Confidence: {(agent.result.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              )}

              {/* Processing Time */}
              {agent.startTime && agent.endTime && (
                <div className="mt-2 text-xs text-gray-500">
                  Time: {((agent.endTime - agent.startTime) / 1000).toFixed(1)}s
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Connection Visualization */}
        {activeConnections.length > 0 && (
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <GitMerge className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-gray-400">Merging perspectives...</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              {activeConnections.map(conn => (
                <div key={`${conn.from}-${conn.to}`} className="flex items-center gap-2 text-xs">
                  <span className="text-purple-400">
                    {agents.find(a => a.id === conn.from)?.name}
                  </span>
                  <span className="text-gray-600">↔</span>
                  <span className="text-purple-400">
                    {agents.find(a => a.id === conn.to)?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Perspectives & Consensus */}
      <div className="grid grid-cols-2 gap-4">
        {/* Collected Perspectives */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-cyan-400" />
            <h4 className="text-sm font-semibold text-white">Collected Perspectives</h4>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {perspectives.map((perspective, idx) => {
              const agent = agents.find(a => a.id === perspective.agentId);
              return (
                <div key={idx} className="bg-gray-900 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-semibold ${agent?.color}`}>
                      {agent?.icon} {agent?.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {(perspective.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                  <div className="space-y-1">
                    {perspective.insights.slice(0, 2).map((insight, i) => (
                      <div key={i} className="text-xs text-gray-400">• {insight}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Consensus Result */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h4 className="text-sm font-semibold text-white">Consensus Result</h4>
          </div>

          {consensusResult ? (
            <div className="space-y-3">
              <div className="bg-gray-900 rounded p-3">
                <div className="text-sm font-semibold text-white mb-2">
                  {consensusResult.combined.summary}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">Perspectives:</span>
                    <span className="ml-1 text-white">{consensusResult.combined.perspectives}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Insights:</span>
                    <span className="ml-1 text-white">{consensusResult.combined.totalInsights}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Confidence:</span>
                    <span className="ml-1 text-green-400">
                      {(consensusResult.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Time:</span>
                    <span className="ml-1 text-white">
                      {(consensusResult.combined.processingTime / 1000).toFixed(1)}s
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="text-xs font-semibold text-green-400 mb-1">Agreements</div>
                  {consensusResult.agreements.map((agreement, i) => (
                    <div key={i} className="text-xs text-gray-400">✓ {agreement}</div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-semibold text-yellow-400 mb-1">Conflicts</div>
                  {consensusResult.conflicts.map((conflict, i) => (
                    <div key={i} className="text-xs text-gray-400">⚠ {conflict}</div>
                  ))}
                </div>
                <div className="text-xs text-purple-400 font-semibold">
                  {consensusResult.resolution}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div className="text-sm">Waiting for agent perspectives...</div>
            </div>
          )}
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
                log.type === 'phase' ? 'text-purple-400' :
                log.type === 'progress' ? 'text-yellow-400' :
                log.type === 'complete' ? 'text-green-400' :
                log.type === 'merge' ? 'text-cyan-400' :
                log.type === 'consensus' ? 'text-pink-400' :
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