'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Activity, Bell, MessageSquare, CheckCircle, Clock, Eye,
  Inbox, Send, AlertTriangle, TrendingUp, Calendar, Users,
  FileText, Zap, Pause, Play, Settings, Brain, History,
  RefreshCw, Filter, Archive, Flag, ChevronRight
} from 'lucide-react';

// Types
type SignalType = 'email' | 'calendar' | 'document' | 'message' | 'system' | 'user-activity';
type InteractionType = 'notify' | 'question' | 'review' | 'auto';
type TaskStatus = 'idle' | 'processing' | 'waiting-human' | 'completed' | 'failed';
type Priority = 'low' | 'medium' | 'high' | 'urgent';

interface AmbientSignal {
  id: string;
  type: SignalType;
  content: string;
  timestamp: number;
  priority: Priority;
  processed: boolean;
  source: string;
  metadata?: Record<string, any>;
}

interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  priority: Priority;
  signal?: AmbientSignal;
  progress: number;
  startTime: number;
  estimatedCompletion?: number;
  requiresHuman: boolean;
  humanInteractionType?: InteractionType;
}

interface HumanInteraction {
  id: string;
  type: InteractionType;
  title: string;
  description: string;
  options?: string[];
  timestamp: number;
  resolved: boolean;
  response?: string;
  taskId: string;
}

interface MemoryItem {
  id: string;
  category: string;
  content: string;
  timestamp: number;
  relevance: number;
  accessCount: number;
}

interface AgentState {
  activeSignals: number;
  processingTasks: number;
  completedTasks: number;
  humanInteractions: number;
  memoryItems: number;
  learning: boolean;
}

const AmbientAgentPatternsDemo = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [signals, setSignals] = useState<AmbientSignal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [interactions, setInteractions] = useState<HumanInteraction[]>([]);
  const [memory, setMemory] = useState<MemoryItem[]>([
    { id: '1', category: 'pattern', content: 'User prefers morning meetings', timestamp: Date.now() - 86400000, relevance: 0.9, accessCount: 5 },
    { id: '2', category: 'preference', content: 'Declines marketing emails', timestamp: Date.now() - 172800000, relevance: 0.8, accessCount: 3 },
    { id: '3', category: 'behavior', content: 'Reviews documents before 10am', timestamp: Date.now() - 259200000, relevance: 0.7, accessCount: 2 }
  ]);

  const [agentState, setAgentState] = useState<AgentState>({
    activeSignals: 0,
    processingTasks: 0,
    completedTasks: 0,
    humanInteractions: 0,
    memoryItems: 3,
    learning: true
  });

  const [selectedView, setSelectedView] = useState<'signals' | 'tasks' | 'interactions' | 'memory'>('signals');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const signalIdRef = useRef(0);
  const taskIdRef = useRef(0);
  const interactionIdRef = useRef(0);

  // Signal generation
  useEffect(() => {
    if (!isRunning) return;

    const signalTypes: { type: SignalType; content: string; source: string; priority: Priority }[] = [
      { type: 'email', content: 'New email from CEO about Q4 strategy', source: 'Email Server', priority: 'urgent' },
      { type: 'calendar', content: 'Meeting conflict detected for tomorrow 2pm', source: 'Calendar API', priority: 'high' },
      { type: 'document', content: 'Contract review deadline approaching', source: 'Document System', priority: 'high' },
      { type: 'message', content: 'Team member requesting urgent help', source: 'Slack', priority: 'urgent' },
      { type: 'system', content: 'Server health check - anomaly detected', source: 'Monitoring', priority: 'medium' },
      { type: 'user-activity', content: 'User inactive for 30 minutes', source: 'Activity Monitor', priority: 'low' },
      { type: 'email', content: 'Newsletter subscription confirmation', source: 'Email Server', priority: 'low' },
      { type: 'document', content: 'Quarterly report ready for review', source: 'SharePoint', priority: 'medium' }
    ];

    const timer = setInterval(() => {
      const newSignal = signalTypes[Math.floor(Math.random() * signalTypes.length)];
      const signal: AmbientSignal = {
        id: `signal-${signalIdRef.current++}`,
        ...newSignal,
        timestamp: Date.now(),
        processed: false
      };

      setSignals(prev => [signal, ...prev].slice(0, 50));
      setAgentState(prev => ({ ...prev, activeSignals: prev.activeSignals + 1 }));

      // Automatically process some signals
      if (Math.random() > 0.3) {
        processSignal(signal);
      }
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // Task processing
  useEffect(() => {
    const timer = setInterval(() => {
      setTasks(prev => prev.map(task => {
        if (task.status === 'processing' && !task.requiresHuman) {
          const newProgress = Math.min(task.progress + Math.random() * 20, 100);
          if (newProgress >= 100) {
            setAgentState(prev => ({
              ...prev,
              processingTasks: Math.max(0, prev.processingTasks - 1),
              completedTasks: prev.completedTasks + 1
            }));
            addMemoryItem(`Completed ${task.name}`, 'pattern');
            return { ...task, status: 'completed', progress: 100 };
          }
          return { ...task, progress: newProgress };
        }
        return task;
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const processSignal = (signal: AmbientSignal) => {
    // Mark signal as processed
    setSignals(prev => prev.map(s =>
      s.id === signal.id ? { ...s, processed: true } : s
    ));

    // Create a task
    const requiresHuman = signal.priority === 'urgent' || Math.random() > 0.6;
    const task: Task = {
      id: `task-${taskIdRef.current++}`,
      name: `Process ${signal.type}: ${signal.content.substring(0, 30)}...`,
      status: requiresHuman ? 'waiting-human' : 'processing',
      priority: signal.priority,
      signal,
      progress: 0,
      startTime: Date.now(),
      requiresHuman,
      humanInteractionType: requiresHuman ?
        (signal.priority === 'urgent' ? 'notify' :
         signal.priority === 'high' ? 'question' : 'review') : undefined
    };

    setTasks(prev => [task, ...prev].slice(0, 20));
    setAgentState(prev => ({
      ...prev,
      activeSignals: Math.max(0, prev.activeSignals - 1),
      processingTasks: requiresHuman ? prev.processingTasks : prev.processingTasks + 1
    }));

    // Create human interaction if needed
    if (requiresHuman && task.humanInteractionType) {
      createHumanInteraction(task);
    }
  };

  const createHumanInteraction = (task: Task) => {
    const interactionTypes = {
      notify: {
        title: '⚠️ Urgent Notification',
        description: task.signal?.content || '',
        options: ['Acknowledge', 'Dismiss']
      },
      question: {
        title: '❓ Decision Required',
        description: `Should I proceed with: ${task.signal?.content}?`,
        options: ['Approve', 'Reject', 'Modify']
      },
      review: {
        title: '👀 Review Requested',
        description: `Please review: ${task.signal?.content}`,
        options: ['Looks good', 'Needs changes', 'Skip']
      }
    };

    const config = interactionTypes[task.humanInteractionType!] || interactionTypes.review;

    const interaction: HumanInteraction = {
      id: `interaction-${interactionIdRef.current++}`,
      type: task.humanInteractionType!,
      title: config.title,
      description: config.description,
      options: config.options,
      timestamp: Date.now(),
      resolved: false,
      taskId: task.id
    };

    setInteractions(prev => [interaction, ...prev].slice(0, 10));
    setAgentState(prev => ({ ...prev, humanInteractions: prev.humanInteractions + 1 }));
  };

  const resolveInteraction = (interactionId: string, response: string) => {
    setInteractions(prev => prev.map(i =>
      i.id === interactionId ? { ...i, resolved: true, response } : i
    ));

    const interaction = interactions.find(i => i.id === interactionId);
    if (interaction) {
      // Continue task processing
      setTasks(prev => prev.map(task =>
        task.id === interaction.taskId
          ? { ...task, status: 'processing', requiresHuman: false }
          : task
      ));

      // Add to memory
      addMemoryItem(`User responded "${response}" to ${interaction.type}`, 'behavior');

      setAgentState(prev => ({
        ...prev,
        humanInteractions: Math.max(0, prev.humanInteractions - 1),
        processingTasks: prev.processingTasks + 1
      }));
    }
  };

  const addMemoryItem = (content: string, category: string) => {
    const item: MemoryItem = {
      id: `memory-${Date.now()}`,
      category,
      content,
      timestamp: Date.now(),
      relevance: 0.5 + Math.random() * 0.5,
      accessCount: 0
    };

    setMemory(prev => [item, ...prev].slice(0, 20));
    setAgentState(prev => ({ ...prev, memoryItems: prev.memoryItems + 1 }));
  };

  const getSignalIcon = (type: SignalType) => {
    const icons = {
      email: <Inbox className="w-4 h-4" />,
      calendar: <Calendar className="w-4 h-4" />,
      document: <FileText className="w-4 h-4" />,
      message: <MessageSquare className="w-4 h-4" />,
      system: <Activity className="w-4 h-4" />,
      'user-activity': <Users className="w-4 h-4" />
    };
    return icons[type];
  };

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      low: 'text-gray-400',
      medium: 'text-blue-400',
      high: 'text-orange-400',
      urgent: 'text-red-400'
    };
    return colors[priority];
  };

  const getStatusColor = (status: TaskStatus) => {
    const colors = {
      idle: 'text-gray-400',
      processing: 'text-blue-400',
      'waiting-human': 'text-yellow-400',
      completed: 'text-green-400',
      failed: 'text-red-400'
    };
    return colors[status];
  };

  const filteredSignals = filterPriority === 'all'
    ? signals
    : signals.filter(s => s.priority === filterPriority);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-900 rounded-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Ambient Agent Patterns Demo</h2>
        <p className="text-gray-400">Always-present, contextually-aware agent operating in the background</p>
      </div>

      {/* Control Bar */}
      <div className="flex items-center justify-between mb-6 bg-gray-800 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
              ${isRunning ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Resume'} Agent
          </button>
          <div className="flex items-center gap-2">
            <Activity className={`w-4 h-4 ${isRunning ? 'text-green-400 animate-pulse' : 'text-gray-500'}`} />
            <span className="text-gray-400 text-sm">
              {isRunning ? 'Listening to ambient signals...' : 'Agent paused'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as Priority | 'all')}
            className="bg-gray-700 text-gray-100 rounded px-3 py-1 text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* View Selector */}
      <div className="flex gap-2 mb-6">
        {(['signals', 'tasks', 'interactions', 'memory'] as const).map((view) => (
          <button
            key={view}
            onClick={() => setSelectedView(view)}
            className={`px-4 py-2 rounded-lg transition-all capitalize
              ${selectedView === view
                ? 'bg-blue-500/20 text-blue-400 border border-blue-400'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'}`}
          >
            {view}
            <span className="ml-2 text-xs">
              ({view === 'signals' ? filteredSignals.filter(s => !s.processed).length :
                view === 'tasks' ? tasks.filter(t => t.status !== 'completed').length :
                view === 'interactions' ? interactions.filter(i => !i.resolved).length :
                memory.length})
            </span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Signals View */}
          {selectedView === 'signals' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Ambient Signals Stream
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredSignals.slice(0, 20).map((signal) => (
                  <div
                    key={signal.id}
                    className={`bg-gray-700/50 rounded-lg p-3 transition-all
                      ${signal.processed ? 'opacity-50' : 'hover:bg-gray-700'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className={getPriorityColor(signal.priority)}>
                          {getSignalIcon(signal.type)}
                        </span>
                        <div className="flex-1">
                          <p className="text-gray-100 text-sm">{signal.content}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-500">{signal.source}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(signal.timestamp).toLocaleTimeString()}
                            </span>
                            <span className={`text-xs ${getPriorityColor(signal.priority)}`}>
                              {signal.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                      {!signal.processed && (
                        <button
                          onClick={() => processSignal(signal)}
                          className="ml-3 px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm hover:bg-blue-500/30 transition-all"
                        >
                          Process
                        </button>
                      )}
                      {signal.processed && (
                        <CheckCircle className="w-4 h-4 text-green-400 ml-3" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tasks View */}
          {selectedView === 'tasks' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 text-blue-400" />
                Concurrent Tasks
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-gray-100 font-medium text-sm">{task.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs ${getStatusColor(task.status)}`}>
                            {task.status.replace('-', ' ')}
                          </span>
                          <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority} priority
                          </span>
                        </div>
                      </div>
                      {task.requiresHuman && (
                        <Bell className="w-4 h-4 text-yellow-400 animate-pulse" />
                      )}
                    </div>
                    {task.status === 'processing' && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{Math.round(task.progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-1.5">
                          <div
                            className="bg-blue-400 h-1.5 rounded-full transition-all"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactions View */}
          {selectedView === 'interactions' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-purple-400" />
                Human Interactions
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {interactions.map((interaction) => (
                  <div
                    key={interaction.id}
                    className={`bg-gray-700/50 rounded-lg p-4
                      ${interaction.resolved ? 'opacity-50' : ''}`}
                  >
                    <h4 className="text-gray-100 font-medium mb-2">{interaction.title}</h4>
                    <p className="text-gray-300 text-sm mb-3">{interaction.description}</p>
                    {!interaction.resolved && interaction.options && (
                      <div className="flex gap-2">
                        {interaction.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => resolveInteraction(interaction.id, option)}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm hover:bg-blue-500/30 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {interaction.resolved && (
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Resolved: {interaction.response}</span>
                      </div>
                    )}
                  </div>
                ))}
                {interactions.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No human interactions required at the moment
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Memory View */}
          {selectedView === 'memory' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-green-400" />
                Long-term Memory
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {memory.map((item) => (
                  <div key={item.id} className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-gray-100 text-sm">{item.content}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">{item.category}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                          <span className="text-xs text-blue-400">
                            Relevance: {Math.round(item.relevance * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <History className="w-3 h-3" />
                        <span className="text-xs">{item.accessCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Agent Status Panel */}
        <div className="space-y-6">
          {/* Agent State */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-gray-400" />
              Agent State
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Active Signals</span>
                <span className="text-lg font-semibold text-yellow-400">{agentState.activeSignals}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Processing Tasks</span>
                <span className="text-lg font-semibold text-blue-400">{agentState.processingTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Completed Tasks</span>
                <span className="text-lg font-semibold text-green-400">{agentState.completedTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Human Interactions</span>
                <span className="text-lg font-semibold text-purple-400">{agentState.humanInteractions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Memory Items</span>
                <span className="text-lg font-semibold text-green-400">{agentState.memoryItems}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Learning Mode</span>
                <div className="flex items-center gap-2">
                  <Brain className={`w-4 h-4 ${agentState.learning ? 'text-green-400 animate-pulse' : 'text-gray-500'}`} />
                  <span className="text-sm text-gray-300">{agentState.learning ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interaction Patterns */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Interaction Patterns</h3>
            <div className="space-y-3">
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-100">Notify</span>
                </div>
                <p className="text-xs text-gray-400">Urgent alerts requiring acknowledgment</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-gray-100">Question</span>
                </div>
                <p className="text-xs text-gray-400">Decisions requiring human input</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-gray-100">Review</span>
                </div>
                <p className="text-xs text-gray-400">Content requiring validation</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-gray-100">Auto</span>
                </div>
                <p className="text-xs text-gray-400">Autonomous processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">
            {signals.filter(s => !s.processed).length}
          </div>
          <div className="text-sm text-gray-400">Pending Signals</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">
            {Math.round((tasks.filter(t => t.status === 'completed').length / Math.max(1, tasks.length)) * 100)}%
          </div>
          <div className="text-sm text-gray-400">Task Completion</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">
            {Math.round((interactions.filter(i => i.resolved).length / Math.max(1, interactions.length)) * 100)}%
          </div>
          <div className="text-sm text-gray-400">Interaction Resolution</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">
            {memory.length}
          </div>
          <div className="text-sm text-gray-400">Memory Items</div>
        </div>
      </div>
    </div>
  );
};

export default AmbientAgentPatternsDemo;