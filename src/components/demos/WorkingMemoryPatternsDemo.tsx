'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Brain, Zap, TrendingUp, Filter, Target, Activity, BarChart3, Clock, CheckCircle, AlertTriangle, Plus, Minus } from 'lucide-react';

interface WorkingMemoryItem {
  id: string;
  content: string;
  type: 'goal' | 'sub-goal' | 'data' | 'action' | 'context';
  priority: number;
  activationLevel: number;
  decayRate: number;
  createdAt: number;
  lastAccessed: number;
  chunked: boolean;
  interference: number;
}

interface CognitiveMetrics {
  currentLoad: number;
  maxCapacity: number;
  interferenceLevel: number;
  focusScore: number;
  maintenanceEfficiency: number;
  chunkingEffectiveness: number;
}

interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  active: boolean;
}

const initialWorkingMemoryItems: WorkingMemoryItem[] = [
  {
    id: 'goal-1',
    content: 'Calculate quarterly revenue growth',
    type: 'goal',
    priority: 0.95,
    activationLevel: 0.9,
    decayRate: 0.05,
    createdAt: Date.now() - 30000,
    lastAccessed: Date.now() - 1000,
    chunked: false,
    interference: 0.1
  },
  {
    id: 'data-1',
    content: 'Q3 Revenue: $2.4M',
    type: 'data',
    priority: 0.8,
    activationLevel: 0.75,
    decayRate: 0.1,
    createdAt: Date.now() - 25000,
    lastAccessed: Date.now() - 5000,
    chunked: true,
    interference: 0.05
  },
  {
    id: 'data-2',
    content: 'Q4 Revenue: $2.8M',
    type: 'data',
    priority: 0.8,
    activationLevel: 0.75,
    decayRate: 0.1,
    createdAt: Date.now() - 20000,
    lastAccessed: Date.now() - 3000,
    chunked: true,
    interference: 0.05
  },
  {
    id: 'sub-goal-1',
    content: 'Calculate percentage change',
    type: 'sub-goal',
    priority: 0.7,
    activationLevel: 0.65,
    decayRate: 0.15,
    createdAt: Date.now() - 15000,
    lastAccessed: Date.now() - 8000,
    chunked: false,
    interference: 0.2
  },
  {
    id: 'action-1',
    content: 'Apply formula: (New-Old)/Old * 100',
    type: 'action',
    priority: 0.6,
    activationLevel: 0.55,
    decayRate: 0.2,
    createdAt: Date.now() - 10000,
    lastAccessed: Date.now() - 12000,
    chunked: false,
    interference: 0.3
  }
];

const processingSteps: ProcessingStep[] = [
  {
    id: 'attention',
    name: 'Attention Control',
    description: 'Filter and prioritize incoming information',
    icon: Filter,
    color: 'blue',
    active: false
  },
  {
    id: 'capacity',
    name: 'Capacity Management',
    description: 'Monitor 7±2 item limit and manage overflow',
    icon: BarChart3,
    color: 'green',
    active: false
  },
  {
    id: 'maintenance',
    name: 'Active Maintenance',
    description: 'Rehearse and refresh information to prevent decay',
    icon: Zap,
    color: 'purple',
    active: false
  },
  {
    id: 'update',
    name: 'Context Updates',
    description: 'Dynamically update memory based on task changes',
    icon: TrendingUp,
    color: 'orange',
    active: false
  },
  {
    id: 'interference',
    name: 'Interference Control',
    description: 'Suppress irrelevant information and distractions',
    icon: Target,
    color: 'red',
    active: false
  },
  {
    id: 'integration',
    name: 'Memory Integration',
    description: 'Coordinate across different memory subsystems',
    icon: Brain,
    color: 'cyan',
    active: false
  }
];

const newIncomingItems = [
  { content: 'Meeting reminder: 3 PM team sync', type: 'context' as const, priority: 0.4, interference: 0.8 },
  { content: 'Email notification: Budget approval needed', type: 'context' as const, priority: 0.6, interference: 0.5 },
  { content: 'Previous year growth was 12%', type: 'data' as const, priority: 0.7, interference: 0.2 },
  { content: 'Compare with industry average', type: 'sub-goal' as const, priority: 0.5, interference: 0.4 },
  { content: 'Slack message: Lunch plans?', type: 'context' as const, priority: 0.2, interference: 0.9 },
  { content: 'Result: 16.67% growth rate', type: 'data' as const, priority: 0.9, interference: 0.1 }
];

export const WorkingMemoryPatternsDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [workingMemoryItems, setWorkingMemoryItems] = useState<WorkingMemoryItem[]>(initialWorkingMemoryItems);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [metrics, setMetrics] = useState<CognitiveMetrics>({
    currentLoad: 5,
    maxCapacity: 7,
    interferenceLevel: 0.25,
    focusScore: 0.75,
    maintenanceEfficiency: 0.8,
    chunkingEffectiveness: 0.6
  });
  const [operationLog, setOperationLog] = useState<string[]>([]);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [steps, setSteps] = useState<ProcessingStep[]>(processingSteps);

  const addLogEntry = useCallback((message: string) => {
    setOperationLog(prev => [...prev.slice(-8), `[${new Date().toLocaleTimeString()}] ${message}`]);
  }, []);

  const resetDemo = useCallback(() => {
    setIsRunning(false);
    setWorkingMemoryItems(initialWorkingMemoryItems);
    setCurrentItemIndex(0);
    setCurrentStep(0);
    setMetrics({
      currentLoad: 5,
      maxCapacity: 7,
      interferenceLevel: 0.25,
      focusScore: 0.75,
      maintenanceEfficiency: 0.8,
      chunkingEffectiveness: 0.6
    });
    setOperationLog([]);
    setCurrentOperation('');
    setSteps(processingSteps.map(s => ({ ...s, active: false })));
  }, []);

  const calculateDecay = useCallback((item: WorkingMemoryItem): number => {
    const timeSinceAccess = Date.now() - item.lastAccessed;
    const decayAmount = item.decayRate * (timeSinceAccess / 30000); // Decay over 30 seconds
    return Math.max(0.1, item.activationLevel - decayAmount);
  }, []);

  const processStep = useCallback(async (stepIndex: number) => {
    const step = steps[stepIndex];
    setCurrentOperation(step.description);
    
    // Activate current step
    setSteps(prev => prev.map((s, i) => ({ ...s, active: i === stepIndex })));
    addLogEntry(`${step.name}: ${step.description}`);

    await new Promise(resolve => setTimeout(resolve, 1000));

    switch (step.id) {
      case 'attention':
        if (currentItemIndex < newIncomingItems.length) {
          const newItem = newIncomingItems[currentItemIndex];
          const filteredIn = newItem.interference < 0.6;
          
          if (filteredIn) {
            const item: WorkingMemoryItem = {
              id: `item-${Date.now()}`,
              content: newItem.content,
              type: newItem.type,
              priority: newItem.priority,
              activationLevel: newItem.priority,
              decayRate: 0.1,
              createdAt: Date.now(),
              lastAccessed: Date.now(),
              chunked: false,
              interference: newItem.interference
            };
            
            setWorkingMemoryItems(prev => [...prev, item]);
            addLogEntry(`Attention filter: Accepted "${newItem.content.substring(0, 30)}..."`);
          } else {
            addLogEntry(`Attention filter: Rejected high-interference item`);
          }
          setCurrentItemIndex(prev => prev + 1);
        }
        break;

      case 'capacity':
        setWorkingMemoryItems(prev => {
          const updated = [...prev];
          if (updated.length > metrics.maxCapacity) {
            // Remove lowest priority items
            updated.sort((a, b) => b.priority - a.priority);
            const removed = updated.splice(metrics.maxCapacity);
            addLogEntry(`Capacity management: Removed ${removed.length} low-priority items`);
            return updated.slice(0, metrics.maxCapacity);
          }
          return updated;
        });
        
        setMetrics(prev => ({ 
          ...prev, 
          currentLoad: Math.min(workingMemoryItems.length, prev.maxCapacity)
        }));
        break;

      case 'maintenance':
        setWorkingMemoryItems(prev => prev.map(item => {
          const newActivation = item.priority > 0.6 ? 
            Math.min(1.0, item.activationLevel + 0.1) : // Boost high priority
            calculateDecay(item); // Decay low priority
          
          return {
            ...item,
            activationLevel: newActivation,
            lastAccessed: item.priority > 0.6 ? Date.now() : item.lastAccessed
          };
        }));
        
        setMetrics(prev => ({ 
          ...prev, 
          maintenanceEfficiency: Math.min(0.95, prev.maintenanceEfficiency + 0.05)
        }));
        addLogEntry('Maintenance: Refreshed high-priority items, allowed decay of low-priority');
        break;

      case 'update':
        setWorkingMemoryItems(prev => prev.map(item => {
          // Simulate context-based priority updates
          let newPriority = item.priority;
          if (item.type === 'goal' || item.type === 'sub-goal') {
            newPriority = Math.min(1.0, item.priority + 0.05); // Goals become more important
          } else if (item.type === 'context' && item.interference > 0.7) {
            newPriority = Math.max(0.1, item.priority - 0.1); // Reduce distracting context
          }
          
          return { ...item, priority: newPriority };
        }));
        addLogEntry('Context update: Adjusted priorities based on task relevance');
        break;

      case 'interference':
        setWorkingMemoryItems(prev => prev.filter(item => {
          if (item.interference > 0.7 && item.priority < 0.5) {
            addLogEntry(`Interference control: Suppressed "${item.content.substring(0, 30)}..."`);
            return false;
          }
          return true;
        }));
        
        setMetrics(prev => ({ 
          ...prev, 
          interferenceLevel: Math.max(0.1, prev.interferenceLevel - 0.1),
          focusScore: Math.min(0.95, prev.focusScore + 0.05)
        }));
        break;

      case 'integration':
        // Chunk related items together
        setWorkingMemoryItems(prev => {
          const updated = [...prev];
          let chunkCount = 0;
          
          // Find related data items and chunk them
          for (let i = 0; i < updated.length; i++) {
            for (let j = i + 1; j < updated.length; j++) {
              if (updated[i].type === 'data' && updated[j].type === 'data' && 
                  !updated[i].chunked && !updated[j].chunked) {
                updated[i].chunked = true;
                updated[j].chunked = true;
                chunkCount++;
                break;
              }
            }
          }
          
          return updated;
        });
        
        setMetrics(prev => ({ 
          ...prev, 
          chunkingEffectiveness: Math.min(0.9, prev.chunkingEffectiveness + 0.1)
        }));
        addLogEntry('Integration: Chunked related information to reduce cognitive load');
        break;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentOperation('');
  }, [steps, currentItemIndex, workingMemoryItems, metrics.maxCapacity, addLogEntry, calculateDecay]);

  const runDemo = useCallback(async () => {
    setIsRunning(true);
    addLogEntry('Working memory processing cycle started');
    
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await processStep(i);
      
      if (!isRunning) break;
    }
    
    setCurrentStep(-1);
    setSteps(prev => prev.map(s => ({ ...s, active: false })));
    setIsRunning(false);
    addLogEntry('Processing cycle completed');
  }, [steps.length, processStep, isRunning]);

  const startDemo = () => {
    runDemo();
  };

  const pauseDemo = () => {
    setIsRunning(false);
    addLogEntry('Processing paused');
  };

  // Continuous decay simulation
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setWorkingMemoryItems(prev => prev.map(item => ({
        ...item,
        activationLevel: calculateDecay(item)
      })));
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isRunning, calculateDecay]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'goal': return '🎯';
      case 'sub-goal': return '📋';
      case 'data': return '📊';
      case 'action': return '⚡';
      case 'context': return '💭';
      default: return '📄';
    }
  };

  const getActivationColor = (level: number) => {
    if (level >= 0.8) return 'text-green-400';
    if (level >= 0.6) return 'text-yellow-400';
    if (level >= 0.4) return 'text-orange-400';
    return 'text-red-400';
  };

  const getLoadColor = (load: number, max: number) => {
    const ratio = load / max;
    if (ratio <= 0.7) return 'text-green-400';
    if (ratio <= 0.9) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Working Memory Patterns</h2>
          <p className="text-gray-400">Limited capacity cognitive processing with active maintenance and interference control</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            disabled={!isRunning && currentItemIndex >= newIncomingItems.length}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            } disabled:opacity-50`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetDemo}
            disabled={isRunning}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Current Operation */}
      {currentOperation && (
        <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-amber-300">{currentOperation}</span>
          </div>
        </div>
      )}

      {/* Processing Steps */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Processing Steps</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            
            return (
              <div
                key={step.id}
                className={`p-3 rounded-lg border transition-all ${
                  step.active ? 'border-amber-500/50 bg-amber-500/10 animate-pulse' :
                  index < currentStep ? 'border-green-500/50 bg-green-500/10' :
                  'border-gray-600/50 bg-gray-700/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <StepIcon className={`w-5 h-5 ${
                    step.active ? 'text-amber-400' :
                    index < currentStep ? 'text-green-400' :
                    'text-gray-400'
                  }`} />
                  <span className="text-xs font-medium">{index + 1}</span>
                </div>
                <div className="text-sm font-medium mb-1">{step.name}</div>
                <div className="text-xs text-gray-400">{step.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Working Memory Contents */}
        <div className="lg:col-span-2 bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-amber-400" />
            Working Memory Contents ({workingMemoryItems.length}/{metrics.maxCapacity})
          </h3>
          
          {/* Capacity Indicator */}
          <div className="mb-4 p-3 bg-gray-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Memory Load</span>
              <span className={`text-sm font-medium ${getLoadColor(workingMemoryItems.length, metrics.maxCapacity)}`}>
                {workingMemoryItems.length}/{metrics.maxCapacity}
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  workingMemoryItems.length / metrics.maxCapacity <= 0.7 ? 'bg-green-500' :
                  workingMemoryItems.length / metrics.maxCapacity <= 0.9 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${Math.min(100, (workingMemoryItems.length / metrics.maxCapacity) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {workingMemoryItems.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Working memory is empty</p>
              </div>
            ) : (
              workingMemoryItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border transition-all ${
                    item.activationLevel >= 0.8 ? 'border-green-500/30 bg-green-500/10' :
                    item.activationLevel >= 0.6 ? 'border-yellow-500/30 bg-yellow-500/10' :
                    item.activationLevel >= 0.4 ? 'border-orange-500/30 bg-orange-500/10' :
                    'border-red-500/30 bg-red-500/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getTypeIcon(item.type)}</span>
                      <div>
                        <span className="text-xs text-gray-400 capitalize">{item.type}</span>
                        {item.chunked && <span className="ml-2 text-xs text-blue-400">🔗 Chunked</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Activation</div>
                      <div className={`text-sm font-medium ${getActivationColor(item.activationLevel)}`}>
                        {(item.activationLevel * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-300 mb-2">{item.content}</div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="text-blue-400">{item.priority.toFixed(2)}</div>
                      <div className="text-gray-500">Priority</div>
                    </div>
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="text-purple-400">{item.decayRate.toFixed(2)}</div>
                      <div className="text-gray-500">Decay Rate</div>
                    </div>
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="text-red-400">{(item.interference * 100).toFixed(0)}%</div>
                      <div className="text-gray-500">Interference</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Metrics and Controls */}
        <div className="space-y-6">
          {/* Cognitive Metrics */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              Cognitive Metrics
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Current Load:</span>
                <span className={`font-medium ${getLoadColor(metrics.currentLoad, metrics.maxCapacity)}`}>
                  {metrics.currentLoad}/{metrics.maxCapacity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Interference Level:</span>
                <span className="font-medium text-red-400">{(metrics.interferenceLevel * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Focus Score:</span>
                <span className="font-medium text-green-400">{(metrics.focusScore * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Maintenance Efficiency:</span>
                <span className="font-medium text-blue-400">{(metrics.maintenanceEfficiency * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Chunking Effectiveness:</span>
                <span className="font-medium text-purple-400">{(metrics.chunkingEffectiveness * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Operation Log */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              Operation Log
            </h3>
            
            <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
              {operationLog.map((entry, index) => (
                <div key={index} className="text-gray-300 py-1 border-b border-gray-700/30 last:border-b-0">
                  {entry}
                </div>
              ))}
              {operationLog.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  <Clock className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p>Waiting for operations to start...</p>
                </div>
              )}
            </div>
          </div>

          {/* Capacity Management */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Capacity Rules
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <div>
                  <div className="font-medium text-green-400">7±2 Item Limit</div>
                  <div className="text-gray-400">Miller's magical number for working memory capacity</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-400">Priority-Based Eviction</div>
                  <div className="text-gray-400">Remove lowest priority items when at capacity</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-purple-400 mt-0.5" />
                <div>
                  <div className="font-medium text-purple-400">Active Maintenance</div>
                  <div className="text-gray-400">Rehearsal prevents decay of important items</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Brain className="w-5 h-5 text-yellow-400" />
          Working Memory Algorithm
        </h4>
        <div className="text-sm text-gray-300 space-y-2">
          <p><strong>Core Principle:</strong> Limited capacity (7±2 items) active memory system with priority-based retention, rehearsal maintenance, and interference control.</p>
          <p><strong>Key Mechanisms:</strong> Attention filtering, capacity monitoring, active maintenance through rehearsal, real-time context updates, interference suppression, and cross-modal integration.</p>
          <p><strong>Benefits:</strong> Efficient cognitive processing, focused attention, reduced interference, optimal information organization, and seamless task coordination.</p>
          <p><strong>Applications:</strong> Multi-step problem solving, cognitive load management, attention control systems, and human-computer interaction design.</p>
        </div>
      </div>
    </div>
  );
};

export default WorkingMemoryPatternsDemo;