'use client';

import React, { useState, useEffect } from 'react';

type PhaseType = 'idle' | 'define-boundaries' | 'agent-specialization' | 'sharing-protocols' | 'coordination-layer' | 'conflict-resolution' | 'complete';
type AgentStatus = 'idle' | 'initializing' | 'processing' | 'sharing' | 'coordinating' | 'completed';
type AccessLevel = 'private' | 'shared' | 'public';

interface ContextItem {
  id: string;
  content: string;
  tokens: number;
  accessLevel: AccessLevel;
  owner: string;
  sharedWith: string[];
}

interface Agent {
  id: string;
  name: string;
  specialization: string;
  status: AgentStatus;
  contextItems: string[];
  contextTokens: number;
  tasksCompleted: number;
  sharingRequests: number;
  conflicts: number;
}

interface HandoffEvent {
  id: string;
  from: string;
  to: string;
  contextItems: string[];
  success: boolean;
}

interface Metrics {
  isolationEffectiveness: number;
  sharingAccuracy: number;
  conflictRate: number;
  performanceOverheadMs: number;
  agentFocus: number;
  coordinationSuccess: number;
}

const initialAgents: Agent[] = [
  { id: 'agent-research', name: 'Research Agent', specialization: 'Data Collection & Analysis', status: 'idle', contextItems: [], contextTokens: 0, tasksCompleted: 0, sharingRequests: 0, conflicts: 0 },
  { id: 'agent-legal', name: 'Legal Agent', specialization: 'Compliance & Regulations', status: 'idle', contextItems: [], contextTokens: 0, tasksCompleted: 0, sharingRequests: 0, conflicts: 0 },
  { id: 'agent-technical', name: 'Technical Agent', specialization: 'Implementation & Architecture', status: 'idle', contextItems: [], contextTokens: 0, tasksCompleted: 0, sharingRequests: 0, conflicts: 0 },
  { id: 'agent-security', name: 'Security Agent', specialization: 'Security Assessment', status: 'idle', contextItems: [], contextTokens: 0, tasksCompleted: 0, sharingRequests: 0, conflicts: 0 },
  { id: 'agent-coordinator', name: 'Coordinator Agent', specialization: 'Task Orchestration', status: 'idle', contextItems: [], contextTokens: 0, tasksCompleted: 0, sharingRequests: 0, conflicts: 0 },
];

const initialContextItems: ContextItem[] = [
  { id: 'ctx-1', content: 'Project requirements and scope', tokens: 450, accessLevel: 'public', owner: 'agent-coordinator', sharedWith: [] },
  { id: 'ctx-2', content: 'Market research and competitor analysis', tokens: 520, accessLevel: 'private', owner: 'agent-research', sharedWith: [] },
  { id: 'ctx-3', content: 'GDPR and data privacy regulations', tokens: 380, accessLevel: 'private', owner: 'agent-legal', sharedWith: [] },
  { id: 'ctx-4', content: 'System architecture diagrams', tokens: 410, accessLevel: 'private', owner: 'agent-technical', sharedWith: [] },
  { id: 'ctx-5', content: 'Security vulnerabilities report', tokens: 340, accessLevel: 'private', owner: 'agent-security', sharedWith: [] },
  { id: 'ctx-6', content: 'API specifications and endpoints', tokens: 290, accessLevel: 'shared', owner: 'agent-technical', sharedWith: ['agent-security'] },
  { id: 'ctx-7', content: 'User authentication flows', tokens: 310, accessLevel: 'shared', owner: 'agent-technical', sharedWith: ['agent-security', 'agent-legal'] },
  { id: 'ctx-8', content: 'Data retention policies', tokens: 270, accessLevel: 'shared', owner: 'agent-legal', sharedWith: ['agent-technical', 'agent-security'] },
];

export default function ContextIsolatePatternsDemo() {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [contextItems, setContextItems] = useState<ContextItem[]>(initialContextItems);
  const [handoffEvents, setHandoffEvents] = useState<HandoffEvent[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    isolationEffectiveness: 0,
    sharingAccuracy: 0,
    conflictRate: 0,
    performanceOverheadMs: 0,
    agentFocus: 0,
    coordinationSuccess: 0,
  });

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];
    const startTime = Date.now();

    if (phase === 'idle') {
      timeouts.push(setTimeout(() => setPhase('define-boundaries'), 100));
    }

    else if (phase === 'define-boundaries') {
      let agentIndex = 0;

      const defineAgent = () => {
        if (agentIndex >= initialAgents.length) {
          timeouts.push(setTimeout(() => setPhase('agent-specialization'), 300));
          return;
        }

        const agent = initialAgents[agentIndex];

        setAgents(prev => prev.map(a =>
          a.id === agent.id
            ? { ...a, status: 'initializing' as AgentStatus }
            : a
        ));

        agentIndex++;
        timeouts.push(setTimeout(defineAgent, 180));
      };

      defineAgent();
    }

    else if (phase === 'agent-specialization') {
      const assignments = [
        { agentId: 'agent-coordinator', contextIds: ['ctx-1'] },
        { agentId: 'agent-research', contextIds: ['ctx-1', 'ctx-2'] },
        { agentId: 'agent-legal', contextIds: ['ctx-1', 'ctx-3', 'ctx-8'] },
        { agentId: 'agent-technical', contextIds: ['ctx-1', 'ctx-4', 'ctx-6', 'ctx-7'] },
        { agentId: 'agent-security', contextIds: ['ctx-1', 'ctx-5', 'ctx-6', 'ctx-7', 'ctx-8'] },
      ];

      let assignmentIndex = 0;

      const assignContext = () => {
        if (assignmentIndex >= assignments.length) {
          timeouts.push(setTimeout(() => setPhase('sharing-protocols'), 300));
          return;
        }

        const assignment = assignments[assignmentIndex];

        setAgents(prev => prev.map(a => {
          if (a.id !== assignment.agentId) return a;

          const tokens = assignment.contextIds.reduce((sum, ctxId) => {
            const ctx = initialContextItems.find(c => c.id === ctxId);
            return sum + (ctx?.tokens || 0);
          }, 0);

          return {
            ...a,
            status: 'processing' as AgentStatus,
            contextItems: assignment.contextIds,
            contextTokens: tokens,
          };
        }));

        assignmentIndex++;
        timeouts.push(setTimeout(assignContext, 200));
      };

      assignContext();
    }

    else if (phase === 'sharing-protocols') {
      const sharingEvents = [
        { from: 'agent-technical', to: 'agent-security', items: ['ctx-6', 'ctx-7'] },
        { from: 'agent-legal', to: 'agent-technical', items: ['ctx-8'] },
        { from: 'agent-legal', to: 'agent-security', items: ['ctx-7'] },
      ];

      let eventIndex = 0;

      const processSharing = () => {
        if (eventIndex >= sharingEvents.length) {
          setAgents(prev => prev.map(a => ({ ...a, status: 'coordinating' as AgentStatus })));
          timeouts.push(setTimeout(() => setPhase('coordination-layer'), 300));
          return;
        }

        const event = sharingEvents[eventIndex];

        setAgents(prev => prev.map(a => {
          if (a.id === event.from || a.id === event.to) {
            return { ...a, status: 'sharing' as AgentStatus, sharingRequests: a.sharingRequests + 1 };
          }
          return a;
        }));

        setContextItems(prev => prev.map(ctx => {
          if (event.items.includes(ctx.id)) {
            const sharedWith = [...new Set([...ctx.sharedWith, event.to])];
            return { ...ctx, sharedWith };
          }
          return ctx;
        }));

        eventIndex++;
        timeouts.push(setTimeout(processSharing, 250));
      };

      processSharing();
    }

    else if (phase === 'coordination-layer') {
      const handoffs: HandoffEvent[] = [
        { id: 'handoff-1', from: 'agent-research', to: 'agent-coordinator', contextItems: ['ctx-2'], success: true },
        { id: 'handoff-2', from: 'agent-legal', to: 'agent-coordinator', contextItems: ['ctx-3'], success: true },
        { id: 'handoff-3', from: 'agent-technical', to: 'agent-coordinator', contextItems: ['ctx-4'], success: true },
        { id: 'handoff-4', from: 'agent-security', to: 'agent-coordinator', contextItems: ['ctx-5'], success: true },
      ];

      let handoffIndex = 0;

      const processHandoff = () => {
        if (handoffIndex >= handoffs.length) {
          setAgents(prev => prev.map(a => ({ ...a, tasksCompleted: a.tasksCompleted + 1 })));
          timeouts.push(setTimeout(() => setPhase('conflict-resolution'), 300));
          return;
        }

        const handoff = handoffs[handoffIndex];

        setHandoffEvents(prev => [...prev, handoff]);

        setAgents(prev => prev.map(a => {
          if (a.id === handoff.from || a.id === handoff.to) {
            return { ...a, tasksCompleted: a.tasksCompleted + 1 };
          }
          return a;
        }));

        handoffIndex++;
        timeouts.push(setTimeout(processHandoff, 200));
      };

      processHandoff();
    }

    else if (phase === 'conflict-resolution') {
      const conflictAgents = ['agent-security', 'agent-legal'];

      conflictAgents.forEach(agentId => {
        setAgents(prev => prev.map(a =>
          a.id === agentId
            ? { ...a, conflicts: 1 }
            : a
        ));
      });

      timeouts.push(setTimeout(() => {
        setAgents(prev => prev.map(a =>
          conflictAgents.includes(a.id)
            ? { ...a, conflicts: 0, status: 'completed' as AgentStatus }
            : { ...a, status: 'completed' as AgentStatus }
        ));

        const totalContexts = agents.reduce((sum, a) => sum + a.contextItems.length, 0);
        const privateContexts = contextItems.filter(c => c.accessLevel === 'private').length;
        const isolationEffectiveness = (privateContexts / contextItems.length) * 100;

        const totalSharing = agents.reduce((sum, a) => sum + a.sharingRequests, 0);
        const relevantShares = contextItems.filter(c => c.accessLevel === 'shared' || c.sharedWith.length > 0).length;
        const sharingAccuracy = (relevantShares / totalSharing) * 100;

        const totalConflicts = agents.reduce((sum, a) => sum + a.conflicts, 0);
        const coordinationEvents = handoffEvents.length;
        const conflictRate = coordinationEvents > 0 ? (totalConflicts / coordinationEvents) : 0;

        const performanceOverheadMs = Date.now() - startTime;

        const totalTasks = agents.reduce((sum, a) => sum + a.tasksCompleted, 0);
        const agentFocus = (totalTasks / agents.length / 2) * 100;

        const successfulHandoffs = handoffEvents.filter(h => h.success).length;
        const coordinationSuccess = handoffEvents.length > 0 ? (successfulHandoffs / handoffEvents.length) * 100 : 0;

        setMetrics({
          isolationEffectiveness,
          sharingAccuracy,
          conflictRate,
          performanceOverheadMs,
          agentFocus,
          coordinationSuccess,
        });

        timeouts.push(setTimeout(() => setPhase('complete'), 400));
      }, 400));
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [phase, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setPhase('idle');
    setAgents(initialAgents);
    setContextItems(initialContextItems);
    setHandoffEvents([]);
    setMetrics({
      isolationEffectiveness: 0,
      sharingAccuracy: 0,
      conflictRate: 0,
      performanceOverheadMs: 0,
      agentFocus: 0,
      coordinationSuccess: 0,
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setAgents(initialAgents);
    setContextItems(initialContextItems);
    setHandoffEvents([]);
    setMetrics({
      isolationEffectiveness: 0,
      sharingAccuracy: 0,
      conflictRate: 0,
      performanceOverheadMs: 0,
      agentFocus: 0,
      coordinationSuccess: 0,
    });
  };

  const getPhaseStatus = (targetPhase: PhaseType): 'pending' | 'active' | 'completed' => {
    const phaseOrder: PhaseType[] = ['idle', 'define-boundaries', 'agent-specialization', 'sharing-protocols', 'coordination-layer', 'conflict-resolution', 'complete'];
    const currentIndex = phaseOrder.indexOf(phase);
    const targetIndex = phaseOrder.indexOf(targetPhase);

    if (currentIndex > targetIndex) return 'completed';
    if (currentIndex === targetIndex) return 'active';
    return 'pending';
  };

  const getStatusColor = (status: AgentStatus): string => {
    switch (status) {
      case 'initializing': return 'text-blue-400';
      case 'processing': return 'text-purple-400';
      case 'sharing': return 'text-yellow-400';
      case 'coordinating': return 'text-cyan-400';
      case 'completed': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getAccessLevelColor = (level: AccessLevel): string => {
    switch (level) {
      case 'private': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'shared': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'public': return 'bg-green-500/20 text-green-300 border-green-500/30';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Context Isolate Patterns</h3>
          <p className="text-gray-400 text-sm">
            Strategic context partitioning across sub-agents for complex task decomposition
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Start Isolation
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {(['define-boundaries', 'agent-specialization', 'sharing-protocols', 'coordination-layer', 'conflict-resolution'] as const).map((p) => {
            const status = getPhaseStatus(p);
            return (
              <div
                key={p}
                className={`p-3 rounded-lg border ${
                  status === 'completed'
                    ? 'bg-green-500/10 border-green-500/30'
                    : status === 'active'
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="text-xs font-medium text-gray-300 mb-1">
                  {p.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
                <div className={`text-xs ${
                  status === 'completed' ? 'text-green-400' : status === 'active' ? 'text-blue-400' : 'text-gray-500'
                }`}>
                  {status === 'completed' ? '✓ Done' : status === 'active' ? '⟳ Running' : 'Pending'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Specialized Agents</h4>
              <div className="space-y-2">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`p-3 rounded-lg border ${
                      agent.status === 'completed'
                        ? 'bg-green-500/10 border-green-500/30'
                        : agent.status === 'coordinating'
                        ? 'bg-cyan-500/10 border-cyan-500/30'
                        : agent.status === 'sharing'
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : agent.status === 'processing'
                        ? 'bg-purple-500/10 border-purple-500/30'
                        : agent.status === 'initializing'
                        ? 'bg-blue-500/10 border-blue-500/30'
                        : 'bg-slate-800 border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-medium text-white">{agent.name}</div>
                        <div className="text-xs text-gray-400">{agent.specialization}</div>
                      </div>
                      <span className={`text-xs ${getStatusColor(agent.status)}`}>
                        {agent.status === 'idle' ? 'Idle' :
                         agent.status === 'initializing' ? '⟳ Init' :
                         agent.status === 'processing' ? '⟳ Process' :
                         agent.status === 'sharing' ? '⟳ Share' :
                         agent.status === 'coordinating' ? '⟳ Coord' : '✓ Done'}
                      </span>
                    </div>

                    {agent.contextItems.length > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Context Items</span>
                          <span className="text-blue-400 font-mono">{agent.contextItems.length}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Context Tokens</span>
                          <span className="text-purple-400 font-mono">{agent.contextTokens}</span>
                        </div>
                        {agent.tasksCompleted > 0 && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Tasks Completed</span>
                            <span className="text-green-400 font-mono">{agent.tasksCompleted}</span>
                          </div>
                        )}
                        {agent.sharingRequests > 0 && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Sharing Requests</span>
                            <span className="text-yellow-400 font-mono">{agent.sharingRequests}</span>
                          </div>
                        )}
                        {agent.conflicts > 0 && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Conflicts</span>
                            <span className="text-red-400 font-mono">{agent.conflicts}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {handoffEvents.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Handoff Events</h4>
                <div className="space-y-2">
                  {handoffEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg border ${
                        event.success
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-red-500/10 border-red-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-white">
                          {agents.find(a => a.id === event.from)?.name} → {agents.find(a => a.id === event.to)?.name}
                        </div>
                        <span className={`text-xs ${event.success ? 'text-green-400' : 'text-red-400'}`}>
                          {event.success ? '✓ Success' : '✗ Failed'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {event.contextItems.length} context item(s) transferred
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Context Items</h4>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {contextItems.map((ctx) => (
                  <div
                    key={ctx.id}
                    className="p-3 bg-slate-800 rounded-lg border border-slate-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white mb-1">{ctx.content}</div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded border ${getAccessLevelColor(ctx.accessLevel)}`}>
                            {ctx.accessLevel}
                          </span>
                          <span className="text-xs text-gray-500">{ctx.tokens} tokens</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Owner</span>
                        <span className="text-blue-400">{agents.find(a => a.id === ctx.owner)?.name}</span>
                      </div>
                      {ctx.sharedWith.length > 0 && (
                        <div className="text-xs text-gray-400">
                          Shared with: {ctx.sharedWith.map(id => agents.find(a => a.id === id)?.name).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Isolation Metrics</h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Isolation Effectiveness</span>
                    <span className={`text-sm font-mono ${
                      metrics.isolationEffectiveness > 0
                        ? metrics.isolationEffectiveness >= 60 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {metrics.isolationEffectiveness > 0 ? `${metrics.isolationEffectiveness.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Sharing Accuracy</span>
                    <span className={`text-sm font-mono ${
                      metrics.sharingAccuracy > 0 ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {metrics.sharingAccuracy > 0 ? `${metrics.sharingAccuracy.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Conflict Rate</span>
                    <span className={`text-sm font-mono ${
                      metrics.conflictRate >= 0
                        ? metrics.conflictRate === 0 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {metrics.conflictRate >= 0 ? metrics.conflictRate.toFixed(2) : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Performance Overhead</span>
                    <span className={`text-sm font-mono ${
                      metrics.performanceOverheadMs > 0 ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {metrics.performanceOverheadMs > 0 ? `${metrics.performanceOverheadMs}ms` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Agent Focus</span>
                    <span className={`text-sm font-mono ${
                      metrics.agentFocus > 0
                        ? metrics.agentFocus >= 80 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {metrics.agentFocus > 0 ? `${metrics.agentFocus.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Coordination Success</span>
                    <span className={`text-sm font-mono ${
                      metrics.coordinationSuccess > 0 ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {metrics.coordinationSuccess > 0 ? `${metrics.coordinationSuccess.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {phase === 'complete' && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="text-sm font-medium text-green-400 mb-2">
              ✓ Context Isolation Complete
            </div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• Established isolated contexts for 5 specialized agents with {contextItems.length} context items</div>
              <div>• Isolation effectiveness: {metrics.isolationEffectiveness.toFixed(1)}% with {contextItems.filter(c => c.accessLevel === 'private').length} private contexts</div>
              <div>• Achieved {metrics.sharingAccuracy.toFixed(1)}% sharing accuracy across {agents.reduce((sum, a) => sum + a.sharingRequests, 0)} requests</div>
              <div>• Completed {handoffEvents.length} agent handoffs with {metrics.coordinationSuccess.toFixed(1)}% success rate</div>
              <div>• Conflict rate: {metrics.conflictRate.toFixed(2)} per coordination event with {agents.reduce((sum, a) => sum + a.conflicts, 0)} total conflicts</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}