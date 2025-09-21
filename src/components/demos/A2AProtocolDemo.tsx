'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Network, Send, Shield, CheckCircle, AlertCircle, Zap, Globe, Key, FileJson, ArrowRight, ArrowLeft, Activity, Lock, Unlock } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  platform: string;
  capabilities: string[];
  status: 'idle' | 'authenticating' | 'handshaking' | 'ready' | 'busy' | 'error';
  protocol: {
    version: string;
    supportedFormats: string[];
    authMethod: 'oauth' | 'api-key' | 'jwt' | 'mutual-tls';
  };
  endpoint: string;
  color: string;
  icon: string;
}

interface Message {
  id: string;
  from: string;
  to: string;
  type: 'request' | 'response' | 'event' | 'error';
  protocol: 'discovery' | 'authentication' | 'negotiation' | 'execution' | 'result';
  content: {
    action?: string;
    data?: any;
    metadata?: any;
  };
  timestamp: number;
  status: 'pending' | 'sent' | 'received' | 'acknowledged' | 'processed';
  encrypted?: boolean;
}

interface ProtocolPhase {
  name: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  description: string;
  messages: Message[];
}

interface CollaborationTask {
  id: string;
  name: string;
  description: string;
  requiredCapabilities: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  phases: string[];
}

const AGENTS: Agent[] = [
  {
    id: 'agent-openai',
    name: 'GPT Agent',
    platform: 'OpenAI Platform',
    capabilities: ['text-generation', 'code-synthesis', 'analysis'],
    status: 'idle',
    protocol: {
      version: 'A2A/1.0',
      supportedFormats: ['json', 'protobuf'],
      authMethod: 'api-key'
    },
    endpoint: 'https://api.openai.com/v1/agents',
    color: 'text-green-400',
    icon: '🤖'
  },
  {
    id: 'agent-anthropic',
    name: 'Claude Agent',
    platform: 'Anthropic Cloud',
    capabilities: ['reasoning', 'research', 'writing'],
    status: 'idle',
    protocol: {
      version: 'A2A/1.0',
      supportedFormats: ['json', 'xml'],
      authMethod: 'oauth'
    },
    endpoint: 'https://api.anthropic.com/agents',
    color: 'text-blue-400',
    icon: '🧠'
  },
  {
    id: 'agent-google',
    name: 'Gemini Agent',
    platform: 'Google Vertex AI',
    capabilities: ['multimodal', 'translation', 'search'],
    status: 'idle',
    protocol: {
      version: 'A2A/1.0',
      supportedFormats: ['json', 'grpc'],
      authMethod: 'jwt'
    },
    endpoint: 'https://vertexai.googleapis.com/agents',
    color: 'text-yellow-400',
    icon: '✨'
  },
  {
    id: 'agent-meta',
    name: 'Llama Agent',
    platform: 'Meta AI Hub',
    capabilities: ['social-context', 'creativity', 'dialogue'],
    status: 'idle',
    protocol: {
      version: 'A2A/1.0',
      supportedFormats: ['json', 'msgpack'],
      authMethod: 'mutual-tls'
    },
    endpoint: 'https://ai.meta.com/agents',
    color: 'text-purple-400',
    icon: '🦙'
  }
];

const COLLABORATION_TASKS: CollaborationTask[] = [
  {
    id: 'research-report',
    name: 'Collaborative Research Report',
    description: 'Multiple agents work together to research, analyze, and write a comprehensive report',
    requiredCapabilities: ['research', 'analysis', 'writing'],
    complexity: 'complex',
    phases: ['discovery', 'authentication', 'task-distribution', 'execution', 'aggregation']
  },
  {
    id: 'code-review',
    name: 'Multi-Agent Code Review',
    description: 'Agents collaborate to review, test, and improve code quality',
    requiredCapabilities: ['code-synthesis', 'analysis', 'reasoning'],
    complexity: 'moderate',
    phases: ['discovery', 'authentication', 'code-analysis', 'feedback', 'synthesis']
  },
  {
    id: 'creative-project',
    name: 'Creative Content Generation',
    description: 'Agents combine skills to create multimedia content',
    requiredCapabilities: ['creativity', 'multimodal', 'writing'],
    complexity: 'moderate',
    phases: ['discovery', 'authentication', 'brainstorming', 'creation', 'refinement']
  },
  {
    id: 'data-pipeline',
    name: 'Data Processing Pipeline',
    description: 'Agents form a pipeline to process and transform data',
    requiredCapabilities: ['analysis', 'translation', 'search'],
    complexity: 'simple',
    phases: ['discovery', 'authentication', 'pipeline-setup', 'processing', 'validation']
  }
];

export default function A2AProtocolDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'discovery' | 'authentication' | 'negotiation' | 'execution' | 'complete'>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set());
  const [protocolPhases, setProtocolPhases] = useState<ProtocolPhase[]>([]);
  const [logs, setLogs] = useState<Array<{ timestamp: string; type: string; message: string }>>([]);

  const addLog = useCallback((type: string, message: string) => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    }]);
  }, []);

  const sendMessage = useCallback(async (from: string, to: string, type: Message['type'], protocol: Message['protocol'], content: any) => {
    const message: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      from,
      to,
      type,
      protocol,
      content,
      timestamp: Date.now(),
      status: 'pending',
      encrypted: ['authentication', 'execution'].includes(protocol)
    };

    setMessages(prev => [...prev, message]);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300 / speed));

    // Update message status
    setMessages(prev => prev.map(m =>
      m.id === message.id ? { ...m, status: 'sent' } : m
    ));

    await new Promise(resolve => setTimeout(resolve, 200 / speed));

    setMessages(prev => prev.map(m =>
      m.id === message.id ? { ...m, status: 'received' } : m
    ));

    await new Promise(resolve => setTimeout(resolve, 200 / speed));

    setMessages(prev => prev.map(m =>
      m.id === message.id ? { ...m, status: 'processed' } : m
    ));

    return message;
  }, [speed]);

  const performDiscovery = useCallback(async () => {
    addLog('discovery', '🔍 Starting agent discovery phase');
    setCurrentPhase('discovery');

    const discoveryPhase: ProtocolPhase = {
      name: 'Service Discovery',
      status: 'active',
      description: 'Agents broadcast capabilities and discover peers',
      messages: []
    };

    for (const agent of agents) {
      // Update agent status
      setAgents(prev => prev.map(a =>
        a.id === agent.id ? { ...a, status: 'handshaking' } : a
      ));

      // Broadcast capabilities
      const broadcastMsg = await sendMessage(
        agent.id,
        'broadcast',
        'request',
        'discovery',
        {
          action: 'announce',
          data: {
            capabilities: agent.capabilities,
            protocol: agent.protocol,
            endpoint: agent.endpoint
          }
        }
      );

      discoveryPhase.messages.push(broadcastMsg);
      addLog('broadcast', `${agent.name} announcing capabilities: ${agent.capabilities.join(', ')}`);

      await new Promise(resolve => setTimeout(resolve, 500 / speed));
    }

    // Agents acknowledge each other
    for (let i = 0; i < agents.length; i++) {
      for (let j = i + 1; j < agents.length; j++) {
        const ackMsg = await sendMessage(
          agents[i].id,
          agents[j].id,
          'response',
          'discovery',
          {
            action: 'acknowledge',
            data: { status: 'discovered' }
          }
        );
        discoveryPhase.messages.push(ackMsg);
        setActiveConnections(prev => new Set([...prev, `${agents[i].id}-${agents[j].id}`]));
      }
    }

    discoveryPhase.status = 'completed';
    setProtocolPhases(prev => [...prev, discoveryPhase]);
    addLog('discovery', '✅ Discovery phase completed - all agents discovered');
  }, [agents, speed, addLog, sendMessage]);

  const performAuthentication = useCallback(async () => {
    addLog('auth', '🔐 Starting authentication phase');
    setCurrentPhase('authentication');

    const authPhase: ProtocolPhase = {
      name: 'Authentication & Authorization',
      status: 'active',
      description: 'Agents authenticate and establish secure channels',
      messages: []
    };

    for (const agent of agents) {
      setAgents(prev => prev.map(a =>
        a.id === agent.id ? { ...a, status: 'authenticating' } : a
      ));

      // Send authentication request
      const authRequest = await sendMessage(
        agent.id,
        'auth-server',
        'request',
        'authentication',
        {
          action: 'authenticate',
          data: {
            method: agent.protocol.authMethod,
            credentials: `${agent.protocol.authMethod}-token-${agent.id}`
          }
        }
      );

      authPhase.messages.push(authRequest);
      addLog('auth', `${agent.name} authenticating with ${agent.protocol.authMethod}`);

      await new Promise(resolve => setTimeout(resolve, 600 / speed));

      // Receive auth token
      const authResponse = await sendMessage(
        'auth-server',
        agent.id,
        'response',
        'authentication',
        {
          action: 'token',
          data: {
            token: `jwt.${agent.id}.${Date.now()}`,
            expires: Date.now() + 3600000
          }
        }
      );

      authPhase.messages.push(authResponse);

      setAgents(prev => prev.map(a =>
        a.id === agent.id ? { ...a, status: 'ready' } : a
      ));

      addLog('auth', `✅ ${agent.name} authenticated successfully`);
    }

    authPhase.status = 'completed';
    setProtocolPhases(prev => [...prev, authPhase]);
    addLog('auth', '🔒 Secure channels established between all agents');
  }, [agents, speed, addLog, sendMessage]);

  const performNegotiation = useCallback(async (task: CollaborationTask) => {
    addLog('negotiate', '🤝 Starting capability negotiation');
    setCurrentPhase('negotiation');

    const negotiationPhase: ProtocolPhase = {
      name: 'Capability Negotiation',
      status: 'active',
      description: 'Agents negotiate roles and responsibilities',
      messages: []
    };

    // Leader election (first capable agent becomes coordinator)
    const coordinator = agents.find(a =>
      a.capabilities.some(c => task.requiredCapabilities.includes(c))
    );

    if (coordinator) {
      const leaderMsg = await sendMessage(
        coordinator.id,
        'broadcast',
        'event',
        'negotiation',
        {
          action: 'leader-election',
          data: { role: 'coordinator' }
        }
      );

      negotiationPhase.messages.push(leaderMsg);
      addLog('negotiate', `${coordinator.name} elected as coordinator`);

      // Task distribution
      for (const capability of task.requiredCapabilities) {
        const capableAgent = agents.find(a => a.capabilities.includes(capability));

        if (capableAgent) {
          const assignMsg = await sendMessage(
            coordinator.id,
            capableAgent.id,
            'request',
            'negotiation',
            {
              action: 'assign-task',
              data: {
                capability,
                taskPortion: `Handle ${capability} for ${task.name}`
              }
            }
          );

          negotiationPhase.messages.push(assignMsg);

          const acceptMsg = await sendMessage(
            capableAgent.id,
            coordinator.id,
            'response',
            'negotiation',
            {
              action: 'accept-task',
              data: { status: 'accepted' }
            }
          );

          negotiationPhase.messages.push(acceptMsg);

          setAgents(prev => prev.map(a =>
            a.id === capableAgent.id ? { ...a, status: 'busy' } : a
          ));

          addLog('negotiate', `${capableAgent.name} assigned: ${capability}`);
        }
      }
    }

    negotiationPhase.status = 'completed';
    setProtocolPhases(prev => [...prev, negotiationPhase]);
    addLog('negotiate', '✅ Task distribution completed');
  }, [agents, speed, addLog, sendMessage]);

  const performExecution = useCallback(async (task: CollaborationTask) => {
    addLog('execute', '⚡ Starting collaborative execution');
    setCurrentPhase('execution');

    const executionPhase: ProtocolPhase = {
      name: 'Task Execution',
      status: 'active',
      description: 'Agents execute their assigned tasks',
      messages: []
    };

    // Simulate parallel execution
    const executionPromises = task.requiredCapabilities.map(async (capability, index) => {
      const agent = agents.find(a => a.capabilities.includes(capability));

      if (agent) {
        // Start execution
        const startMsg = await sendMessage(
          agent.id,
          'broadcast',
          'event',
          'execution',
          {
            action: 'task-start',
            data: {
              task: capability,
              startTime: Date.now()
            }
          }
        );

        executionPhase.messages.push(startMsg);
        addLog('execute', `${agent.name} started ${capability}`);

        // Simulate work
        await new Promise(resolve => setTimeout(resolve, (2000 + Math.random() * 1000) / speed));

        // Progress update
        const progressMsg = await sendMessage(
          agent.id,
          'broadcast',
          'event',
          'execution',
          {
            action: 'progress',
            data: {
              task: capability,
              progress: 50,
              status: 'processing'
            }
          }
        );

        executionPhase.messages.push(progressMsg);

        await new Promise(resolve => setTimeout(resolve, (2000 + Math.random() * 1000) / speed));

        // Complete execution
        const completeMsg = await sendMessage(
          agent.id,
          'broadcast',
          'response',
          'execution',
          {
            action: 'task-complete',
            data: {
              task: capability,
              result: `Completed ${capability} successfully`,
              endTime: Date.now()
            }
          }
        );

        executionPhase.messages.push(completeMsg);
        addLog('execute', `✅ ${agent.name} completed ${capability}`);

        setAgents(prev => prev.map(a =>
          a.id === agent.id ? { ...a, status: 'ready' } : a
        ));
      }
    });

    await Promise.all(executionPromises);

    // Final aggregation
    const coordinator = agents[0];
    const aggregationMsg = await sendMessage(
      coordinator.id,
      'broadcast',
      'response',
      'execution',
      {
        action: 'aggregate-results',
        data: {
          task: task.name,
          status: 'completed',
          results: task.requiredCapabilities.map(c => `${c}: completed`)
        }
      }
    );

    executionPhase.messages.push(aggregationMsg);

    executionPhase.status = 'completed';
    setProtocolPhases(prev => [...prev, executionPhase]);
    addLog('execute', `🎉 ${task.name} completed successfully!`);
  }, [agents, speed, addLog, sendMessage]);

  const runProtocol = useCallback(async () => {
    const task = COLLABORATION_TASKS[selectedTaskIndex];

    setMessages([]);
    setActiveConnections(new Set());
    setProtocolPhases([]);
    setLogs([]);
    setAgents(AGENTS.map(a => ({ ...a, status: 'idle' })));

    addLog('start', `🚀 Initiating A2A Protocol for: ${task.name}`);
    addLog('info', task.description);
    addLog('info', `Required capabilities: ${task.requiredCapabilities.join(', ')}`);

    // Phase 1: Discovery
    await performDiscovery();
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Phase 2: Authentication
    await performAuthentication();
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Phase 3: Negotiation
    await performNegotiation(task);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Phase 4: Execution
    await performExecution(task);

    setCurrentPhase('complete');
    addLog('complete', '🏁 A2A Protocol collaboration completed successfully!');
  }, [selectedTaskIndex, speed, addLog, performDiscovery, performAuthentication, performNegotiation, performExecution]);

  useEffect(() => {
    if (isRunning && currentPhase === 'idle') {
      runProtocol();
    } else if (isRunning && currentPhase === 'complete') {
      setIsRunning(false);
    }
  }, [isRunning, currentPhase, runProtocol]);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentPhase('idle');
    setMessages([]);
    setActiveConnections(new Set());
    setProtocolPhases([]);
    setLogs([]);
    setAgents(AGENTS.map(a => ({ ...a, status: 'idle' })));
  };

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'ready': return 'text-green-400';
      case 'authenticating': return 'text-yellow-400';
      case 'handshaking': return 'text-blue-400';
      case 'busy': return 'text-orange-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Network className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">A2A Protocol (Agent2Agent) Demo</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Task:</label>
              <select
                value={selectedTaskIndex}
                onChange={(e) => setSelectedTaskIndex(Number(e.target.value))}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isRunning}
              >
                {COLLABORATION_TASKS.map((task, idx) => (
                  <option key={task.id} value={idx}>
                    {task.name}
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
            {/* Agent Network Visualization */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-blue-400" />
                <h4 className="text-sm font-semibold text-white">Agent Network</h4>
              </div>

              <div className="relative h-64">
                {/* Draw connections */}
                <svg className="absolute inset-0 w-full h-full">
                  {Array.from(activeConnections).map(connection => {
                    const [from, to] = connection.split('-');
                    const fromIndex = agents.findIndex(a => a.id === from);
                    const toIndex = agents.findIndex(a => a.id === to);
                    const x1 = 50 + (fromIndex * 150);
                    const y1 = 80;
                    const x2 = 50 + (toIndex * 150);
                    const y2 = 180;

                    return (
                      <line
                        key={connection}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="rgba(139, 92, 246, 0.3)"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    );
                  })}
                </svg>

                {/* Agent nodes */}
                {agents.map((agent, idx) => (
                  <div
                    key={agent.id}
                    className={`absolute bg-gray-900 rounded-lg p-3 border-2 transition-all duration-300 ${
                      agent.status === 'busy' ? 'border-orange-500 animate-pulse' :
                      agent.status === 'ready' ? 'border-green-500' :
                      agent.status === 'authenticating' ? 'border-yellow-500' :
                      'border-gray-600'
                    }`}
                    style={{
                      left: `${20 + (idx % 2) * 280}px`,
                      top: `${40 + Math.floor(idx / 2) * 120}px`,
                      width: '160px'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{agent.icon}</span>
                      <span className={`text-sm font-medium ${agent.color}`}>
                        {agent.name}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{agent.platform}</div>
                    <div className={`text-xs mt-1 ${getStatusColor(agent.status)}`}>
                      Status: {agent.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Protocol Phases */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-green-400" />
                <h4 className="text-sm font-semibold text-white">Protocol Phases</h4>
              </div>

              <div className="space-y-2">
                {protocolPhases.map((phase, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded border transition-all ${
                      phase.status === 'active' ? 'border-blue-500 bg-blue-900/20' :
                      phase.status === 'completed' ? 'border-green-500 bg-green-900/20' :
                      'border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{phase.name}</span>
                      <span className={`text-xs ${
                        phase.status === 'completed' ? 'text-green-400' :
                        phase.status === 'active' ? 'text-blue-400' :
                        'text-gray-400'
                      }`}>
                        {phase.status === 'completed' && <CheckCircle className="w-4 h-4 inline" />}
                        {phase.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{phase.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {phase.messages.length} messages exchanged
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Flow */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-yellow-400" />
                <h4 className="text-sm font-semibold text-white">Recent Messages</h4>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {messages.slice(-5).reverse().map(msg => (
                  <div key={msg.id} className="flex items-center gap-2 text-xs">
                    <span className={`${
                      agents.find(a => a.id === msg.from)?.color || 'text-gray-400'
                    }`}>
                      {agents.find(a => a.id === msg.from)?.name || msg.from}
                    </span>
                    <ArrowRight className="w-3 h-3 text-gray-500" />
                    <span className={`${
                      agents.find(a => a.id === msg.to)?.color || 'text-gray-400'
                    }`}>
                      {msg.to === 'broadcast' ? 'All Agents' :
                       agents.find(a => a.id === msg.to)?.name || msg.to}
                    </span>
                    <span className="text-gray-500">
                      [{msg.protocol}]
                    </span>
                    <span className="text-gray-400">
                      {msg.content.action}
                    </span>
                    {msg.encrypted && <Lock className="w-3 h-3 text-green-400" />}
                    <span className={`ml-auto ${
                      msg.status === 'processed' ? 'text-green-400' :
                      msg.status === 'received' ? 'text-blue-400' :
                      msg.status === 'sent' ? 'text-yellow-400' :
                      'text-gray-400'
                    }`}>
                      {msg.status === 'processed' && '✓'}
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
                <h4 className="text-sm font-semibold text-white">Protocol Log</h4>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-600">{log.timestamp}</span>
                    <span className={`font-semibold ${
                      log.type === 'start' ? 'text-blue-400' :
                      log.type === 'discovery' ? 'text-purple-400' :
                      log.type === 'auth' ? 'text-green-400' :
                      log.type === 'negotiate' ? 'text-yellow-400' :
                      log.type === 'execute' ? 'text-orange-400' :
                      log.type === 'broadcast' ? 'text-cyan-400' :
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

        {/* Phase Progress */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            {['discovery', 'authentication', 'negotiation', 'execution', 'complete'].map((phase) => (
              <div key={phase} className="flex-1 text-center">
                <div className={`text-xs mb-1 ${
                  currentPhase === phase ? 'text-white font-semibold' : 'text-gray-500'
                }`}>
                  {phase.charAt(0).toUpperCase() + phase.slice(1)}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`h-0.5 w-full ${
                      ['discovery', 'authentication', 'negotiation', 'execution', 'complete'].indexOf(phase) <=
                      ['discovery', 'authentication', 'negotiation', 'execution', 'complete'].indexOf(currentPhase)
                        ? 'bg-purple-500' : 'bg-gray-700'
                    }`} />
                  </div>
                  <div className={`relative w-3 h-3 mx-auto rounded-full border-2 ${
                    currentPhase === phase
                      ? 'bg-purple-500 border-purple-400 animate-pulse'
                      : ['discovery', 'authentication', 'negotiation', 'execution', 'complete'].indexOf(phase) <
                        ['discovery', 'authentication', 'negotiation', 'execution', 'complete'].indexOf(currentPhase)
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