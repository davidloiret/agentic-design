'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Send, CheckCircle, Clock, AlertTriangle, Users, Zap, ArrowRight, MessageSquare, Database, Server, Brain, Target, BarChart3 } from 'lucide-react';

interface Message {
  id: string;
  type: 'task' | 'result' | 'status' | 'error';
  from: string;
  to: string;
  queue: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  payload: any;
  timestamp: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'retry';
  retryCount?: number;
}

interface Agent {
  id: string;
  name: string;
  type: 'coordinator' | 'specialist' | 'worker' | 'aggregator';
  status: 'idle' | 'processing' | 'busy' | 'error';
  capabilities: string[];
  currentTask?: string;
  queueSubscriptions: string[];
  icon: React.ReactNode;
  color: string;
  processedCount: number;
  errorCount: number;
}

interface Queue {
  id: string;
  name: string;
  messages: Message[];
  maxSize: number;
  priority: boolean;
  dlq: boolean; // Dead Letter Queue
  consumers: number;
  avgProcessingTime: number;
}

const SAMPLE_SCENARIOS = [
  {
    id: 'research-coordination',
    name: 'Multi-Agent Research System',
    description: 'Coordinated literature review with specialist agents',
    agents: 4,
    queues: 5,
    complexity: 'high'
  },
  {
    id: 'content-pipeline',
    name: 'Content Creation Pipeline',
    description: 'Automated content generation and review workflow',
    agents: 3,
    queues: 4,
    complexity: 'medium'
  },
  {
    id: 'data-processing',
    name: 'Distributed Data Analysis',
    description: 'Large-scale data processing with parallel agents',
    agents: 5,
    queues: 6,
    complexity: 'high'
  }
];

const INITIAL_AGENTS: Agent[] = [
  {
    id: 'coordinator',
    name: 'Research Coordinator',
    type: 'coordinator',
    status: 'idle',
    capabilities: ['task-distribution', 'result-aggregation', 'workflow-management'],
    queueSubscriptions: ['research_results', 'status_updates'],
    icon: <Brain className="w-4 h-4" />,
    color: 'from-blue-500 to-cyan-500',
    processedCount: 0,
    errorCount: 0
  },
  {
    id: 'arxiv-agent',
    name: 'ArXiv Specialist',
    type: 'specialist',
    status: 'idle',
    capabilities: ['arxiv-search', 'paper-extraction', 'metadata-parsing'],
    queueSubscriptions: ['arxiv_tasks'],
    icon: <Database className="w-4 h-4" />,
    color: 'from-green-500 to-emerald-500',
    processedCount: 0,
    errorCount: 0
  },
  {
    id: 'analysis-agent',
    name: 'Analysis Agent',
    type: 'worker',
    status: 'idle',
    capabilities: ['text-analysis', 'summarization', 'keyword-extraction'],
    queueSubscriptions: ['analysis_tasks'],
    icon: <Target className="w-4 h-4" />,
    color: 'from-purple-500 to-pink-500',
    processedCount: 0,
    errorCount: 0
  },
  {
    id: 'synthesis-agent',
    name: 'Synthesis Agent',
    type: 'aggregator',
    status: 'idle',
    capabilities: ['content-synthesis', 'report-generation', 'insight-extraction'],
    queueSubscriptions: ['synthesis_tasks'],
    icon: <Zap className="w-4 h-4" />,
    color: 'from-orange-500 to-red-500',
    processedCount: 0,
    errorCount: 0
  }
];

const INITIAL_QUEUES: Queue[] = [
  { id: 'research_tasks', name: 'Research Tasks', messages: [], maxSize: 100, priority: true, dlq: false, consumers: 1, avgProcessingTime: 3000 },
  { id: 'arxiv_tasks', name: 'ArXiv Tasks', messages: [], maxSize: 50, priority: false, dlq: true, consumers: 1, avgProcessingTime: 2000 },
  { id: 'analysis_tasks', name: 'Analysis Tasks', messages: [], maxSize: 75, priority: true, dlq: true, consumers: 1, avgProcessingTime: 4000 },
  { id: 'synthesis_tasks', name: 'Synthesis Tasks', messages: [], maxSize: 25, priority: false, dlq: false, consumers: 1, avgProcessingTime: 5000 },
  { id: 'research_results', name: 'Research Results', messages: [], maxSize: 50, priority: false, dlq: false, consumers: 1, avgProcessingTime: 1000 }
];

export const MessageQueuingDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(SAMPLE_SCENARIOS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [queues, setQueues] = useState<Queue[]>(INITIAL_QUEUES);
  const [messages, setMessages] = useState<Message[]>([]);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [speed, setSpeed] = useState(2);
  const [currentTime, setCurrentTime] = useState(0);
  const [systemStats, setSystemStats] = useState({
    totalMessages: 0,
    processedMessages: 0,
    failedMessages: 0,
    averageLatency: 0,
    throughput: 0
  });

  const generateMessage = useCallback((from: string, to: string, queue: string, type: Message['type'], payload: any): Message => {
    return {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      from,
      to,
      queue,
      priority: payload.priority || 'medium',
      payload,
      timestamp: Date.now(),
      status: 'pending',
      retryCount: 0
    };
  }, []);

  const publishMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
    setQueues(prev => prev.map(q => 
      q.id === message.queue 
        ? { ...q, messages: [...q.messages, message] }
        : q
    ));
    setExecutionLog(prev => [...prev, `📨 ${message.from} → ${message.queue}: ${message.type} message (${message.priority} priority)`]);
    setSystemStats(prev => ({ ...prev, totalMessages: prev.totalMessages + 1 }));
  }, []);

  const processMessage = useCallback(async (agentId: string, message: Message) => {
    // Update agent status
    setAgents(prev => prev.map(a => 
      a.id === agentId 
        ? { ...a, status: 'processing', currentTask: message.type }
        : a
    ));

    // Update message status
    setMessages(prev => prev.map(m => 
      m.id === message.id 
        ? { ...m, status: 'processing' }
        : m
    ));

    setExecutionLog(prev => [...prev, `⚡ ${agentId} started processing: ${message.type}`]);

    // Simulate processing time
    const agent = agents.find(a => a.id === agentId);
    const queue = queues.find(q => q.id === message.queue);
    const processingTime = (queue?.avgProcessingTime || 3000) / speed;

    await new Promise(resolve => setTimeout(resolve, processingTime));

    // Simulate success/failure (90% success rate)
    const success = Math.random() > 0.1;

    if (success) {
      // Mark message as completed
      setMessages(prev => prev.map(m => 
        m.id === message.id 
          ? { ...m, status: 'completed' }
          : m
      ));

      // Update agent
      setAgents(prev => prev.map(a => 
        a.id === agentId 
          ? { 
              ...a, 
              status: 'idle', 
              currentTask: undefined, 
              processedCount: a.processedCount + 1 
            }
          : a
      ));

      setExecutionLog(prev => [...prev, `✅ ${agentId} completed: ${message.type}`]);
      setSystemStats(prev => ({ 
        ...prev, 
        processedMessages: prev.processedMessages + 1,
        throughput: prev.processedMessages / Math.max(1, currentTime / 1000)
      }));

      // Generate follow-up messages based on message type
      if (message.type === 'task' && message.payload.workflow) {
        const workflow = message.payload.workflow;
        if (workflow === 'research') {
          // Coordinator publishes to ArXiv agent
          const arxivMessage = generateMessage(
            agentId,
            'arxiv-agent',
            'arxiv_tasks',
            'task',
            { 
              taskId: `arxiv_${message.id}`,
              query: message.payload.topic,
              sources: ['arxiv'],
              priority: 'high'
            }
          );
          setTimeout(() => publishMessage(arxivMessage), 500);
        } else if (workflow === 'analysis') {
          // ArXiv agent publishes to Analysis agent
          const analysisMessage = generateMessage(
            agentId,
            'analysis-agent',
            'analysis_tasks',
            'task',
            {
              taskId: `analysis_${message.id}`,
              papers: message.payload.results || [],
              analysisType: 'summary',
              priority: 'medium'
            }
          );
          setTimeout(() => publishMessage(analysisMessage), 300);
        } else if (workflow === 'synthesis') {
          // Analysis agent publishes to Synthesis agent
          const synthesisMessage = generateMessage(
            agentId,
            'synthesis-agent',
            'synthesis_tasks',
            'task',
            {
              taskId: `synthesis_${message.id}`,
              analyses: message.payload.summaries || [],
              outputFormat: 'report',
              priority: 'medium'
            }
          );
          setTimeout(() => publishMessage(synthesisMessage), 200);
        } else if (workflow === 'complete') {
          // Synthesis agent publishes final result
          const resultMessage = generateMessage(
            agentId,
            'coordinator',
            'research_results',
            'result',
            {
              taskId: message.payload.originalTaskId,
              finalReport: 'Research completed successfully',
              timestamp: Date.now(),
              priority: 'high'
            }
          );
          setTimeout(() => publishMessage(resultMessage), 100);
        }
      }
    } else {
      // Handle failure
      const canRetry = (message.retryCount || 0) < 3;
      
      if (canRetry) {
        setMessages(prev => prev.map(m => 
          m.id === message.id 
            ? { ...m, status: 'retry', retryCount: (m.retryCount || 0) + 1 }
            : m
        ));
        setExecutionLog(prev => [...prev, `🔄 ${agentId} retrying: ${message.type} (attempt ${(message.retryCount || 0) + 2})`]);
        
        // Retry after delay
        setTimeout(() => processMessage(agentId, { ...message, retryCount: (message.retryCount || 0) + 1 }), 1000);
      } else {
        setMessages(prev => prev.map(m => 
          m.id === message.id 
            ? { ...m, status: 'failed' }
            : m
        ));
        setAgents(prev => prev.map(a => 
          a.id === agentId 
            ? { 
                ...a, 
                status: 'idle', 
                currentTask: undefined, 
                errorCount: a.errorCount + 1 
              }
            : a
        ));
        setExecutionLog(prev => [...prev, `❌ ${agentId} failed: ${message.type} (max retries exceeded)`]);
        setSystemStats(prev => ({ ...prev, failedMessages: prev.failedMessages + 1 }));
      }
    }

    // Remove from queue
    setQueues(prev => prev.map(q => 
      q.id === message.queue 
        ? { ...q, messages: q.messages.filter(m => m.id !== message.id) }
        : q
    ));
  }, [agents, queues, speed, currentTime, generateMessage, publishMessage]);

  const startScenario = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🚀 Starting multi-agent research coordination scenario...']);

    // Initial research task from coordinator
    const initialTask = generateMessage(
      'coordinator',
      'research-system',
      'research_tasks',
      'task',
      {
        taskId: 'research_001',
        topic: 'quantum computing applications',
        requirements: {
          sources: ['arxiv', 'ieee'],
          dateRange: '2023-2024',
          maxPapers: 10
        },
        workflow: 'research',
        priority: 'high'
      }
    );

    publishMessage(initialTask);
    
    // Simulate agent processing
    const processQueues = () => {
      if (!isRunning) return;

      queues.forEach(queue => {
        if (queue.messages.length > 0) {
          const message = queue.messages[0];
          const availableAgent = agents.find(agent => 
            agent.queueSubscriptions.includes(queue.id) && 
            agent.status === 'idle'
          );

          if (availableAgent) {
            processMessage(availableAgent.id, message);
          }
        }
      });

      setTimeout(processQueues, 1000 / speed);
    };

    processQueues();
  }, [isRunning, agents, queues, speed, generateMessage, publishMessage, processMessage]);

  const resetDemo = useCallback(() => {
    setIsRunning(false);
    setAgents(INITIAL_AGENTS.map(a => ({ ...a, status: 'idle', processedCount: 0, errorCount: 0, currentTask: undefined })));
    setQueues(INITIAL_QUEUES.map(q => ({ ...q, messages: [] })));
    setMessages([]);
    setExecutionLog([]);
    setCurrentTime(0);
    setSystemStats({
      totalMessages: 0,
      processedMessages: 0,
      failedMessages: 0,
      averageLatency: 0,
      throughput: 0
    });
  }, []);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setCurrentTime(prev => prev + 100);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isRunning]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idle': return 'text-gray-400';
      case 'processing': return 'text-blue-400';
      case 'busy': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getMessageStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-600';
      case 'processing': return 'bg-blue-600';
      case 'completed': return 'bg-green-600';
      case 'failed': return 'bg-red-600';
      case 'retry': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'border-l-gray-500';
      case 'medium': return 'border-l-yellow-500';
      case 'high': return 'border-l-orange-500';
      case 'critical': return 'border-l-red-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">📬</span>
          Message Queuing Demo - Agentic AI Systems
        </h2>
        <p className="text-gray-300 mb-6">
          Explore asynchronous message passing patterns in multi-agent AI systems with fault tolerance, priority handling, and distributed coordination.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Scenario
            </label>
            <select
              value={selectedScenario.id}
              onChange={(e) => {
                const scenario = SAMPLE_SCENARIOS.find(s => s.id === e.target.value);
                if (scenario) setSelectedScenario(scenario);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {SAMPLE_SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name} - {scenario.agents} agents
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Processing Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-pink-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <button
                onClick={startScenario}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-pink-600 hover:bg-pink-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Running...' : 'Start Demo'}
              </button>
              
              <button
                onClick={resetDemo}
                disabled={isRunning}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Scenario Info */}
        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
          <h4 className="font-medium text-white mb-2">{selectedScenario.name}</h4>
          <p className="text-gray-300 text-sm mb-2">{selectedScenario.description}</p>
          <div className="flex gap-4 text-xs text-gray-400">
            <span>Agents: {selectedScenario.agents}</span>
            <span>Queues: {selectedScenario.queues}</span>
            <span>Complexity: <span className="capitalize">{selectedScenario.complexity}</span></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Agents and Queues */}
        <div className="xl:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Agents */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                AI Agents
              </h3>
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`p-4 rounded-lg border transition-all bg-gradient-to-r ${agent.color} bg-opacity-10 border-opacity-50`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded bg-gradient-to-r ${agent.color}`}>
                          {agent.icon}
                        </div>
                        <div>
                          <h5 className="font-medium text-white text-sm">{agent.name}</h5>
                          <div className={`text-xs capitalize ${getStatusColor(agent.status)}`}>
                            {agent.status}
                            {agent.currentTask && ` - ${agent.currentTask}`}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        <div className="text-green-400">✓ {agent.processedCount}</div>
                        {agent.errorCount > 0 && <div className="text-red-400">✗ {agent.errorCount}</div>}
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-300">
                      <div className="mb-1">Capabilities: {agent.capabilities.slice(0, 2).join(', ')}</div>
                      <div>Subscribed: {agent.queueSubscriptions.join(', ')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Queues */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Server className="w-5 h-5 mr-2" />
                Message Queues
              </h3>
              <div className="space-y-3">
                {queues.map((queue) => (
                  <div
                    key={queue.id}
                    className="p-4 rounded-lg border border-gray-600 bg-gray-800/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-white text-sm">{queue.name}</h5>
                        <div className="text-xs text-gray-400">
                          {queue.messages.length}/{queue.maxSize} messages
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {queue.priority && <span className="text-xs bg-yellow-600 px-1 rounded">PRIORITY</span>}
                        {queue.dlq && <span className="text-xs bg-red-600 px-1 rounded">DLQ</span>}
                      </div>
                    </div>
                    
                    {queue.messages.length > 0 && (
                      <div className="space-y-1">
                        {queue.messages.slice(0, 3).map((message) => (
                          <div
                            key={message.id}
                            className={`text-xs p-2 rounded border-l-2 ${getPriorityColor(message.priority)} bg-gray-700/50`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono">{message.type}</span>
                              <span className={`px-1 rounded text-xs ${getMessageStatusColor(message.status)}`}>
                                {message.status}
                              </span>
                            </div>
                            <div className="text-gray-400 mt-1">{message.from} → {message.to}</div>
                          </div>
                        ))}
                        {queue.messages.length > 3 && (
                          <div className="text-xs text-gray-400 text-center">
                            +{queue.messages.length - 3} more messages
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-red-500 h-1 rounded-full transition-all duration-500" 
                        style={{ width: `${(queue.messages.length / queue.maxSize) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Monitor */}
        <div className="space-y-6">
          {/* System Stats */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              System Statistics
            </h3>
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Total Messages</div>
                  <div className="text-lg font-medium text-white">{systemStats.totalMessages}</div>
                </div>
                <div>
                  <div className="text-gray-400">Processed</div>
                  <div className="text-lg font-medium text-green-400">{systemStats.processedMessages}</div>
                </div>
                <div>
                  <div className="text-gray-400">Failed</div>
                  <div className="text-lg font-medium text-red-400">{systemStats.failedMessages}</div>
                </div>
                <div>
                  <div className="text-gray-400">Throughput</div>
                  <div className="text-lg font-medium text-blue-400">{systemStats.throughput.toFixed(1)}/s</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-gray-400 text-sm mb-2">Processing Success Rate</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" 
                    style={{ 
                      width: `${systemStats.totalMessages > 0 
                        ? (systemStats.processedMessages / systemStats.totalMessages) * 100 
                        : 0}%` 
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {systemStats.totalMessages > 0 
                    ? ((systemStats.processedMessages / systemStats.totalMessages) * 100).toFixed(1)
                    : 0}% success rate
                </div>
              </div>
            </div>
          </div>

          {/* Execution Log */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Execution Log</h3>
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-64 overflow-y-auto">
              {executionLog.length === 0 ? (
                <div className="text-gray-400 text-center text-sm mt-8">
                  Execution log will appear here...
                </div>
              ) : (
                <div className="space-y-1">
                  {executionLog.slice(-20).map((log, index) => (
                    <div key={index} className="text-sm text-gray-300 font-mono">
                      <span className="text-gray-500 mr-2">{String(index + 1).padStart(2, '0')}.</span>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Runtime Info */}
          <div className="bg-gradient-to-r from-pink-900/20 to-red-900/20 rounded-lg border border-pink-500/30 p-4">
            <h4 className="font-medium text-white mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Runtime: {(currentTime / 1000).toFixed(1)}s
            </h4>
            <div className="text-sm text-gray-300">
              <div className="mb-1">Active Agents: {agents.filter(a => a.status !== 'idle').length}</div>
              <div className="mb-1">Queue Load: {queues.reduce((sum, q) => sum + q.messages.length, 0)} messages</div>
              <div>System Status: {isRunning ? 'Processing' : 'Idle'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageQueuingDemo;