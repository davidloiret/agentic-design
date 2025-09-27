'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Network, AlertCircle, CheckCircle, RefreshCw, Wifi, WifiOff, Send, Shield, Zap, Activity } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  status: 'active' | 'degraded' | 'failed' | 'recovering';
  messagesSent: number;
  messagesReceived: number;
  failureRate: number;
  latency: number;
}

interface Message {
  id: string;
  from: string;
  to: string;
  payload: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'retrying';
  retryCount: number;
  timestamp: number;
  protocol: 'http' | 'websocket' | 'grpc' | 'mqtt';
}

interface CommunicationLink {
  from: string;
  to: string;
  status: 'healthy' | 'degraded' | 'failed';
  latency: number;
  packetLoss: number;
  bandwidth: number;
}

interface FaultToleranceStrategy {
  type: 'retry' | 'circuit_breaker' | 'fallback' | 'redundancy' | 'timeout';
  description: string;
  enabled: boolean;
  triggerCount: number;
}

export default function ACFDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'normal' | 'detecting' | 'failing' | 'recovering' | 'restored'>('idle');
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'agent-1', name: 'Agent Alpha', status: 'active', messagesSent: 0, messagesReceived: 0, failureRate: 0, latency: 25 },
    { id: 'agent-2', name: 'Agent Beta', status: 'active', messagesSent: 0, messagesReceived: 0, failureRate: 0, latency: 30 },
    { id: 'agent-3', name: 'Agent Gamma', status: 'active', messagesSent: 0, messagesReceived: 0, failureRate: 0, latency: 28 },
    { id: 'agent-4', name: 'Agent Delta', status: 'active', messagesSent: 0, messagesReceived: 0, failureRate: 0, latency: 32 }
  ]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [links, setLinks] = useState<CommunicationLink[]>([]);
  const [strategies, setStrategies] = useState<FaultToleranceStrategy[]>([
    { type: 'retry', description: 'Exponential backoff retry', enabled: true, triggerCount: 0 },
    { type: 'circuit_breaker', description: 'Circuit breaker pattern', enabled: true, triggerCount: 0 },
    { type: 'fallback', description: 'Fallback to alternative route', enabled: true, triggerCount: 0 },
    { type: 'redundancy', description: 'Message redundancy', enabled: true, triggerCount: 0 },
    { type: 'timeout', description: 'Adaptive timeout', enabled: true, triggerCount: 0 }
  ]);

  const [metrics, setMetrics] = useState({
    totalMessages: 0,
    successfulMessages: 0,
    failedMessages: 0,
    recoveredMessages: 0,
    averageLatency: 0,
    networkHealth: 100
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageCounterRef = useRef(0);

  // Initialize communication links
  useEffect(() => {
    const initialLinks: CommunicationLink[] = [
      { from: 'agent-1', to: 'agent-2', status: 'healthy', latency: 20, packetLoss: 0, bandwidth: 100 },
      { from: 'agent-2', to: 'agent-3', status: 'healthy', latency: 25, packetLoss: 0, bandwidth: 100 },
      { from: 'agent-3', to: 'agent-4', status: 'healthy', latency: 22, packetLoss: 0, bandwidth: 100 },
      { from: 'agent-1', to: 'agent-4', status: 'healthy', latency: 30, packetLoss: 0, bandwidth: 100 },
      { from: 'agent-2', to: 'agent-4', status: 'healthy', latency: 28, packetLoss: 0, bandwidth: 100 }
    ];
    setLinks(initialLinks);
  }, []);

  const simulateNormalCommunication = () => {
    const protocols: Message['protocol'][] = ['http', 'websocket', 'grpc', 'mqtt'];
    const agentIds = agents.map(a => a.id);

    // Create a new message
    const fromAgent = agentIds[Math.floor(Math.random() * agentIds.length)];
    let toAgent = agentIds[Math.floor(Math.random() * agentIds.length)];
    while (toAgent === fromAgent) {
      toAgent = agentIds[Math.floor(Math.random() * agentIds.length)];
    }

    const newMessage: Message = {
      id: `msg-${messageCounterRef.current++}`,
      from: fromAgent,
      to: toAgent,
      payload: `Data packet ${messageCounterRef.current}`,
      status: 'sent',
      retryCount: 0,
      timestamp: Date.now(),
      protocol: protocols[Math.floor(Math.random() * protocols.length)]
    };

    setMessages(prev => [...prev.slice(-9), newMessage]);

    // Update agent metrics
    setAgents(prev => prev.map(agent => {
      if (agent.id === fromAgent) {
        return { ...agent, messagesSent: agent.messagesSent + 1 };
      }
      if (agent.id === toAgent) {
        return { ...agent, messagesReceived: agent.messagesReceived + 1 };
      }
      return agent;
    }));

    // Update overall metrics
    setMetrics(prev => ({
      ...prev,
      totalMessages: prev.totalMessages + 1,
      successfulMessages: prev.successfulMessages + 1,
      averageLatency: Math.round((prev.averageLatency * prev.totalMessages + 25) / (prev.totalMessages + 1))
    }));

    // Mark message as delivered after a delay
    setTimeout(() => {
      setMessages(prev => prev.map(msg =>
        msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 500);
  };

  const simulateCommunicationFailure = () => {
    // Fail some links
    setLinks(prev => prev.map((link, index) => {
      if (index === 0 || index === 2) {
        return { ...link, status: 'failed', packetLoss: 85, bandwidth: 10 };
      } else if (index === 1) {
        return { ...link, status: 'degraded', packetLoss: 45, bandwidth: 50 };
      }
      return link;
    }));

    // Fail some agents
    setAgents(prev => prev.map(agent => {
      if (agent.id === 'agent-2') {
        return { ...agent, status: 'failed', failureRate: 95 };
      } else if (agent.id === 'agent-3') {
        return { ...agent, status: 'degraded', failureRate: 45, latency: 150 };
      }
      return agent;
    }));

    // Create failing messages
    const failingMessage: Message = {
      id: `msg-fail-${messageCounterRef.current++}`,
      from: 'agent-1',
      to: 'agent-2',
      payload: `Critical data ${messageCounterRef.current}`,
      status: 'failed',
      retryCount: 1,
      timestamp: Date.now(),
      protocol: 'http'
    };

    setMessages(prev => [...prev.slice(-9), failingMessage]);
    setMetrics(prev => ({
      ...prev,
      failedMessages: prev.failedMessages + 1,
      networkHealth: 35
    }));
  };

  const applyFaultTolerance = () => {
    // Trigger fault tolerance strategies
    setStrategies(prev => prev.map(strategy => {
      if (strategy.type === 'retry') {
        return { ...strategy, triggerCount: strategy.triggerCount + 3 };
      } else if (strategy.type === 'circuit_breaker') {
        return { ...strategy, triggerCount: strategy.triggerCount + 1 };
      } else if (strategy.type === 'fallback') {
        return { ...strategy, triggerCount: strategy.triggerCount + 2 };
      }
      return strategy;
    }));

    // Retry failed messages
    setMessages(prev => prev.map(msg => {
      if (msg.status === 'failed') {
        return { ...msg, status: 'retrying', retryCount: msg.retryCount + 1 };
      }
      return msg;
    }));

    // Start recovery
    setTimeout(() => {
      // Recover links gradually
      setLinks(prev => prev.map(link => {
        if (link.status === 'failed') {
          return { ...link, status: 'degraded', packetLoss: 30, bandwidth: 60 };
        } else if (link.status === 'degraded') {
          return { ...link, status: 'healthy', packetLoss: 5, bandwidth: 90 };
        }
        return link;
      }));

      // Recover agents
      setAgents(prev => prev.map(agent => {
        if (agent.status === 'failed') {
          return { ...agent, status: 'recovering', failureRate: 20 };
        } else if (agent.status === 'degraded') {
          return { ...agent, status: 'active', failureRate: 5, latency: 40 };
        }
        return agent;
      }));

      // Mark retrying messages as recovered
      setMessages(prev => prev.map(msg => {
        if (msg.status === 'retrying') {
          setMetrics(p => ({
            ...p,
            recoveredMessages: p.recoveredMessages + 1,
            networkHealth: Math.min(100, p.networkHealth + 15)
          }));
          return { ...msg, status: 'delivered' };
        }
        return msg;
      }));
    }, 2000);

    // Full recovery
    setTimeout(() => {
      setLinks(prev => prev.map(link => ({
        ...link,
        status: 'healthy',
        packetLoss: 0,
        bandwidth: 100
      })));

      setAgents(prev => prev.map(agent => ({
        ...agent,
        status: 'active',
        failureRate: 0,
        latency: 30
      })));

      setMetrics(prev => ({
        ...prev,
        networkHealth: 100
      }));
    }, 4000);
  };

  const runDemo = () => {
    setCurrentPhase('normal');
    messageCounterRef.current = 0;

    // Normal communication phase
    intervalRef.current = setInterval(simulateNormalCommunication, 1000);

    // Trigger failure after 4 seconds
    phaseTimeoutRef.current = setTimeout(() => {
      setCurrentPhase('detecting');

      setTimeout(() => {
        setCurrentPhase('failing');
        if (intervalRef.current) clearInterval(intervalRef.current);
        simulateCommunicationFailure();

        // Apply fault tolerance after 2 seconds
        setTimeout(() => {
          setCurrentPhase('recovering');
          applyFaultTolerance();

          // Restore after recovery
          setTimeout(() => {
            setCurrentPhase('restored');
            intervalRef.current = setInterval(simulateNormalCommunication, 1000);

            // Stop after demonstration
            setTimeout(() => {
              setCurrentPhase('idle');
              setIsRunning(false);
              if (intervalRef.current) clearInterval(intervalRef.current);
            }, 3000);
          }, 4000);
        }, 2000);
      }, 1000);
    }, 4000);
  };

  const handleStart = () => {
    if (isRunning) {
      // Stop the demo
      setIsRunning(false);
      setCurrentPhase('idle');
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
    } else {
      // Start the demo
      setIsRunning(true);
      runDemo();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
    };
  }, []);

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'normal': return 'text-green-400';
      case 'detecting': return 'text-yellow-400';
      case 'failing': return 'text-red-400';
      case 'recovering': return 'text-blue-400';
      case 'restored': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'normal': return 'Normal Communication';
      case 'detecting': return 'Detecting Issues';
      case 'failing': return 'Communication Failing';
      case 'recovering': return 'Applying Recovery';
      case 'restored': return 'Communication Restored';
      default: return 'Ready';
    }
  };

  const getStrategyIcon = (type: FaultToleranceStrategy['type']) => {
    switch (type) {
      case 'retry': return <RefreshCw className="w-4 h-4" />;
      case 'circuit_breaker': return <Zap className="w-4 h-4" />;
      case 'fallback': return <Shield className="w-4 h-4" />;
      case 'redundancy': return <Network className="w-4 h-4" />;
      case 'timeout': return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Agent Communication Fault Tolerance Demo</h2>

      {/* System Status */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
        <div className={`text-2xl font-bold ${getPhaseColor()} uppercase tracking-wide`}>
          {getPhaseText()}
        </div>
      </div>

      {/* Agent Network */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Network className="w-5 h-5 mr-2" />
            Agent Network
          </h3>
          <div className="space-y-3">
            {agents.map(agent => (
              <div key={agent.id} className="bg-gray-700 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">{agent.name}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    agent.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    agent.status === 'degraded' ? 'bg-yellow-500/20 text-yellow-400' :
                    agent.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {agent.status === 'active' ? <Wifi className="w-3 h-3 inline mr-1" /> : <WifiOff className="w-3 h-3 inline mr-1" />}
                    {agent.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">
                    Sent: <span className="text-white">{agent.messagesSent}</span>
                  </div>
                  <div className="text-gray-400">
                    Received: <span className="text-white">{agent.messagesReceived}</span>
                  </div>
                  <div className="text-gray-400">
                    Failure: <span className={agent.failureRate > 50 ? 'text-red-400' : agent.failureRate > 20 ? 'text-yellow-400' : 'text-white'}>
                      {agent.failureRate}%
                    </span>
                  </div>
                  <div className="text-gray-400">
                    Latency: <span className={agent.latency > 100 ? 'text-red-400' : agent.latency > 50 ? 'text-yellow-400' : 'text-white'}>
                      {agent.latency}ms
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Communication Metrics */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Communication Metrics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Network Health</span>
              <span className={`font-medium ${
                metrics.networkHealth > 80 ? 'text-green-400' :
                metrics.networkHealth > 50 ? 'text-yellow-400' :
                'text-red-400'
              }`}>{metrics.networkHealth}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  metrics.networkHealth > 80 ? 'bg-green-500' :
                  metrics.networkHealth > 50 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${metrics.networkHealth}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-700 rounded p-3">
                <div className="text-xs text-gray-400">Total Messages</div>
                <div className="text-xl font-bold text-white">{metrics.totalMessages}</div>
              </div>
              <div className="bg-gray-700 rounded p-3">
                <div className="text-xs text-gray-400">Successful</div>
                <div className="text-xl font-bold text-green-400">{metrics.successfulMessages}</div>
              </div>
              <div className="bg-gray-700 rounded p-3">
                <div className="text-xs text-gray-400">Failed</div>
                <div className="text-xl font-bold text-red-400">{metrics.failedMessages}</div>
              </div>
              <div className="bg-gray-700 rounded p-3">
                <div className="text-xs text-gray-400">Recovered</div>
                <div className="text-xl font-bold text-blue-400">{metrics.recoveredMessages}</div>
              </div>
            </div>

            <div className="bg-gray-700 rounded p-3">
              <div className="text-xs text-gray-400">Average Latency</div>
              <div className="text-xl font-bold text-white">{metrics.averageLatency}ms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fault Tolerance Strategies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Active Fault Tolerance Strategies
          </h3>
          <div className="space-y-2">
            {strategies.map(strategy => (
              <div key={strategy.type} className="bg-gray-700 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  {getStrategyIcon(strategy.type)}
                  <div className="ml-3">
                    <div className="text-sm font-medium text-white">{strategy.description}</div>
                    <div className="text-xs text-gray-400">
                      Triggered: {strategy.triggerCount} times
                    </div>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${strategy.enabled ? 'bg-green-400' : 'bg-gray-500'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Message Log */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Send className="w-5 h-5 mr-2" />
            Recent Messages
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-gray-400 text-center py-4">No messages yet</div>
            ) : (
              messages.map(message => (
                <div key={message.id} className="bg-gray-700 rounded p-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">
                      {agents.find(a => a.id === message.from)?.name} → {agents.find(a => a.id === message.to)?.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded ${
                      message.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                      message.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                      message.status === 'retrying' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {message.status}
                    </span>
                  </div>
                  <div className="mt-1 text-gray-500">
                    {message.protocol.toUpperCase()} • {message.payload}
                    {message.retryCount > 0 && <span className="ml-2">• Retries: {message.retryCount}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          How Agent Communication Fault Tolerance Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { phase: '1', title: 'Normal Operation', description: 'Agents communicate using various protocols' },
            { phase: '2', title: 'Failure Detection', description: 'Monitor for communication failures and degradation' },
            { phase: '3', title: 'Strategy Activation', description: 'Apply retry, circuit breaker, and fallback strategies' },
            { phase: '4', title: 'Route Recovery', description: 'Find alternative paths and recover failed links' },
            { phase: '5', title: 'System Restoration', description: 'Restore full communication capabilities' }
          ].map(step => (
            <div key={step.phase} className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">
                {step.phase}
              </div>
              <div className="text-sm font-medium text-white mb-1">{step.title}</div>
              <div className="text-xs text-gray-400">{step.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Button */}
      <button
        onClick={handleStart}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
          isRunning
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isRunning ? 'Stop Demo' : 'Start Communication Demo'}
      </button>
    </div>
  );
}