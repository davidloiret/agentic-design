'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  ArrowRight,
  Brain,
  Zap,
  Shield,
  DollarSign,
  AlertTriangle,
  UserCheck,
  Activity,
  CheckCircle,
  Clock,
  MessageSquare,
  Eye,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

// Types for agent coordination
type AgentId = 'triage' | 'technical' | 'billing' | 'escalation' | 'quality' | 'human';
type AgentStatus = 'idle' | 'analyzing' | 'processing' | 'handing-off' | 'complete' | 'monitoring';
type WorkflowPhase = 'initialization' | 'triage' | 'specialized-handling' | 'quality-review' | 'resolution' | 'complete';

interface Agent {
  id: AgentId;
  name: string;
  role: string;
  specialization: string;
  status: AgentStatus;
  confidence: number;
  currentTask?: string;
  icon: React.ReactNode;
  color: string;
  utilization: number;
}

interface Handoff {
  id: string;
  from: AgentId;
  to: AgentId;
  reason: string;
  context: string;
  timestamp: number;
  success: boolean;
  duration: number;
}

interface CoordinationEvent {
  id: string;
  timestamp: number;
  agent: AgentId;
  action: string;
  details: string;
  type: 'analysis' | 'decision' | 'handoff' | 'escalation' | 'resolution';
}

interface WorkflowTask {
  id: string;
  title: string;
  complexity: 'low' | 'medium' | 'high' | 'critical';
  requiredAgent: AgentId;
  status: 'pending' | 'in-progress' | 'complete' | 'escalated';
  resolution?: string;
  timeSpent: number;
}

export default function AgentCollaborationUxDemo() {
  const [phase, setPhase] = useState<WorkflowPhase>('initialization');
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'triage',
      name: 'Triage Agent',
      role: 'Initial Assessment',
      specialization: 'Issue classification and routing',
      status: 'idle',
      confidence: 95,
      icon: <Zap className="w-5 h-5" />,
      color: 'text-blue-400',
      utilization: 0
    },
    {
      id: 'technical',
      name: 'Technical Agent',
      role: 'Technical Support',
      specialization: 'System diagnostics and troubleshooting',
      status: 'idle',
      confidence: 88,
      icon: <Brain className="w-5 h-5" />,
      color: 'text-purple-400',
      utilization: 0
    },
    {
      id: 'billing',
      name: 'Billing Agent',
      role: 'Financial Support',
      specialization: 'Account and payment issues',
      status: 'idle',
      confidence: 92,
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-green-400',
      utilization: 0
    },
    {
      id: 'escalation',
      name: 'Escalation Agent',
      role: 'Complex Issues',
      specialization: 'High-priority and complex problem solving',
      status: 'idle',
      confidence: 85,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-orange-400',
      utilization: 0
    },
    {
      id: 'quality',
      name: 'Quality Agent',
      role: 'Quality Assurance',
      specialization: 'Solution validation and customer satisfaction',
      status: 'idle',
      confidence: 90,
      icon: <Shield className="w-5 h-5" />,
      color: 'text-cyan-400',
      utilization: 0
    },
    {
      id: 'human',
      name: 'Human Expert',
      role: 'Human Oversight',
      specialization: 'Complex decision validation and empathy',
      status: 'monitoring',
      confidence: 98,
      icon: <UserCheck className="w-5 h-5" />,
      color: 'text-pink-400',
      utilization: 15
    }
  ]);

  const [handoffs, setHandoffs] = useState<Handoff[]>([]);
  const [events, setEvents] = useState<CoordinationEvent[]>([]);
  const [currentTask, setCurrentTask] = useState<WorkflowTask>({
    id: 'task-1',
    title: 'Complex system integration failure with billing impact',
    complexity: 'high',
    requiredAgent: 'triage',
    status: 'pending',
    timeSpent: 0
  });

  const [metrics, setMetrics] = useState({
    handoffSuccess: 95,
    completionEfficiency: 87,
    transparencyScore: 92,
    utilizationBalance: 78,
    recoveryTime: 2.3,
    interventionRate: 8
  });

  // Simulate workflow progression
  useEffect(() => {
    if (phase === 'initialization') {
      const timer = setTimeout(() => {
        setPhase('triage');
        updateAgentStatus('triage', 'analyzing', 'Analyzing issue complexity and classification');
        addEvent('triage', 'analysis', 'Initial assessment of complex system integration issue', 'analysis');
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (phase === 'triage') {
      const timer = setTimeout(() => {
        setPhase('specialized-handling');

        // Complex handoff to multiple agents
        performHandoff('triage', 'technical', 'Technical component identified - system integration failure');
        performHandoff('triage', 'billing', 'Billing impact detected - customer overcharged');

        updateAgentStatus('technical', 'processing', 'Diagnosing integration failure');
        updateAgentStatus('billing', 'processing', 'Calculating billing adjustment');

        addEvent('technical', 'analysis', 'Identified API timeout in payment gateway', 'analysis');
        addEvent('billing', 'decision', 'Approved $47.50 credit for service disruption', 'decision');
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (phase === 'specialized-handling') {
      const timer = setTimeout(() => {
        // Escalation needed
        performHandoff('technical', 'escalation', 'Complex integration requires senior expertise');
        updateAgentStatus('escalation', 'processing', 'Applying advanced troubleshooting');

        addEvent('escalation', 'escalation', 'Escalated to senior technical team', 'escalation');

        // Human intervention
        updateAgentStatus('human', 'analyzing', 'Reviewing escalation decision');
        addEvent('human', 'decision', 'Approved escalation path and customer compensation', 'decision');

        setTimeout(() => {
          setPhase('quality-review');
          performHandoff('escalation', 'quality', 'Solution implemented - needs quality validation');
          updateAgentStatus('quality', 'analyzing', 'Validating solution completeness');
        }, 2000);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (phase === 'quality-review') {
      const timer = setTimeout(() => {
        setPhase('resolution');
        updateAgentStatus('quality', 'complete', 'Solution validated successfully');

        addEvent('quality', 'resolution', 'All issues resolved, customer satisfied', 'resolution');

        setCurrentTask(prev => ({
          ...prev,
          status: 'complete',
          resolution: 'System integration fixed, billing adjusted, customer compensated',
          timeSpent: 47
        }));

        // Update metrics
        setMetrics(prev => ({
          ...prev,
          handoffSuccess: 96,
          completionEfficiency: 89,
          transparencyScore: 94
        }));

        setTimeout(() => {
          setPhase('complete');
          updateAllAgentsIdle();
        }, 2000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const updateAgentStatus = (agentId: AgentId, status: AgentStatus, task?: string) => {
    setAgents(prev => prev.map(agent =>
      agent.id === agentId
        ? {
            ...agent,
            status,
            currentTask: task,
            utilization: status === 'idle' ? 0 :
                       status === 'monitoring' ? 15 :
                       status === 'analyzing' ? 60 :
                       status === 'processing' ? 85 :
                       status === 'handing-off' ? 40 : 100
          }
        : agent
    ));
  };

  const updateAllAgentsIdle = () => {
    setAgents(prev => prev.map(agent => ({
      ...agent,
      status: agent.id === 'human' ? 'monitoring' : 'idle',
      currentTask: undefined,
      utilization: agent.id === 'human' ? 15 : 0
    })));
  };

  const performHandoff = (from: AgentId, to: AgentId, reason: string) => {
    const handoff: Handoff = {
      id: `handoff-${Date.now()}`,
      from,
      to,
      reason,
      context: 'Full conversation history and diagnostic data preserved',
      timestamp: Date.now(),
      success: true,
      duration: 1.2
    };

    setHandoffs(prev => [...prev, handoff]);
    updateAgentStatus(from, 'handing-off');

    setTimeout(() => {
      updateAgentStatus(from, 'idle');
    }, 1200);
  };

  const addEvent = (agent: AgentId, action: string, details: string, type: CoordinationEvent['type']) => {
    const event: CoordinationEvent = {
      id: `event-${Date.now()}`,
      timestamp: Date.now(),
      agent,
      action,
      details,
      type
    };

    setEvents(prev => [...prev, event]);
  };

  const getStatusIcon = (status: AgentStatus) => {
    switch (status) {
      case 'analyzing': return <Brain className="w-4 h-4 animate-pulse" />;
      case 'processing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'handing-off': return <ArrowRight className="w-4 h-4 animate-bounce" />;
      case 'complete': return <CheckCircle className="w-4 h-4" />;
      case 'monitoring': return <Eye className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getEventIcon = (type: CoordinationEvent['type']) => {
    switch (type) {
      case 'analysis': return <Brain className="w-4 h-4 text-blue-400" />;
      case 'decision': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'handoff': return <ArrowRight className="w-4 h-4 text-purple-400" />;
      case 'escalation': return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      case 'resolution': return <TrendingUp className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg text-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-400" />
          Agent Collaboration UX Demo
        </h3>
        <p className="text-gray-400">
          Multi-agent coordination with transparent handoffs and human oversight
        </p>
      </div>

      {/* Current Task */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="font-medium mb-1">Current Task</h4>
            <p className="text-sm text-gray-400">{currentTask.title}</p>
          </div>
          <span className={`px-2 py-1 text-xs rounded ${
            currentTask.complexity === 'critical' ? 'bg-red-500/20 text-red-400' :
            currentTask.complexity === 'high' ? 'bg-orange-500/20 text-orange-400' :
            currentTask.complexity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-green-500/20 text-green-400'
          }`}>
            {currentTask.complexity.toUpperCase()}
          </span>
        </div>
        {currentTask.status === 'complete' && (
          <div className="mt-3 p-3 bg-green-500/10 rounded border border-green-500/20">
            <p className="text-sm text-green-400">✓ {currentTask.resolution}</p>
            <p className="text-xs text-gray-500 mt-1">Completed in {currentTask.timeSpent}s</p>
          </div>
        )}
      </div>

      {/* Agent Network Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {agents.map(agent => (
          <div key={agent.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-start justify-between mb-2">
              <div className={`${agent.color}`}>{agent.icon}</div>
              {getStatusIcon(agent.status)}
            </div>
            <h5 className="font-medium text-sm mb-1">{agent.name}</h5>
            <p className="text-xs text-gray-500 mb-2">{agent.specialization}</p>

            {/* Status and Activity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Status</span>
                <span className={`${
                  agent.status === 'idle' ? 'text-gray-500' :
                  agent.status === 'monitoring' ? 'text-cyan-400' :
                  agent.status === 'analyzing' ? 'text-blue-400' :
                  agent.status === 'processing' ? 'text-purple-400' :
                  agent.status === 'handing-off' ? 'text-orange-400' :
                  'text-green-400'
                }`}>
                  {agent.status}
                </span>
              </div>

              {/* Utilization Bar */}
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    agent.utilization > 80 ? 'bg-red-400' :
                    agent.utilization > 60 ? 'bg-orange-400' :
                    agent.utilization > 30 ? 'bg-yellow-400' :
                    agent.utilization > 0 ? 'bg-green-400' :
                    'bg-gray-600'
                  }`}
                  style={{ width: `${agent.utilization}%` }}
                />
              </div>

              {agent.currentTask && (
                <p className="text-xs text-gray-400 italic truncate">
                  {agent.currentTask}
                </p>
              )}

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Confidence</span>
                <span className="text-gray-300">{agent.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Handoff Visualization */}
      {handoffs.length > 0 && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-purple-400" />
            Recent Handoffs
          </h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {handoffs.slice(-3).reverse().map(handoff => (
              <div key={handoff.id} className="flex items-center gap-3 text-sm">
                <span className="text-gray-400">
                  {agents.find(a => a.id === handoff.from)?.name}
                </span>
                <ArrowRight className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">
                  {agents.find(a => a.id === handoff.to)?.name}
                </span>
                <span className="text-xs text-gray-500 flex-1">
                  {handoff.reason}
                </span>
                <span className="text-xs text-green-400">
                  {handoff.duration}s
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coordination Events */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          Coordination Timeline
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {events.slice(-5).reverse().map(event => (
            <div key={event.id} className="flex items-start gap-3 text-sm">
              {getEventIcon(event.type)}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-300">
                    {agents.find(a => a.id === event.agent)?.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {event.action}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {event.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Handoff Success</span>
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-xl font-bold text-green-400">{metrics.handoffSuccess}%</div>
          <div className="text-xs text-gray-500">Context preserved</div>
        </div>

        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Efficiency</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-blue-400">{metrics.completionEfficiency}%</div>
          <div className="text-xs text-gray-500">vs single-agent</div>
        </div>

        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Transparency</span>
            <Eye className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-purple-400">{metrics.transparencyScore}%</div>
          <div className="text-xs text-gray-500">User understanding</div>
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="mt-6 flex items-center justify-center">
        <div className="flex items-center gap-2">
          {['initialization', 'triage', 'specialized-handling', 'quality-review', 'resolution', 'complete'].map((p, i) => (
            <div key={p} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                phase === p ? 'bg-blue-500 text-white' :
                i < ['initialization', 'triage', 'specialized-handling', 'quality-review', 'resolution', 'complete'].indexOf(phase)
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gray-700 text-gray-500'
              }`}>
                {i + 1}
              </div>
              {i < 5 && (
                <div className={`w-8 h-0.5 ${
                  i < ['initialization', 'triage', 'specialized-handling', 'quality-review', 'resolution', 'complete'].indexOf(phase)
                    ? 'bg-green-500/40'
                    : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}