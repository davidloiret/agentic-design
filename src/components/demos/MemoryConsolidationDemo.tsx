'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Brain, FileText, Filter, TrendingUp, Database, CheckCircle, Clock, Zap, BarChart3, Target, Activity } from 'lucide-react';

interface RawMemory {
  id: string;
  content: string;
  type: 'interaction' | 'experience' | 'event' | 'observation';
  timestamp: number;
  importance: number;
  processed: boolean;
}

interface Pattern {
  id: string;
  description: string;
  frequency: number;
  confidence: number;
  memoryIds: string[];
}

interface ConsolidatedMemory {
  id: string;
  content: string;
  type: 'fact' | 'pattern' | 'skill' | 'preference';
  importanceScore: number;
  retentionProbability: number;
  sourceMemories: string[];
  schema: string;
  connections: string[];
}

interface ProcessingMetrics {
  rawMemoriesProcessed: number;
  patternsExtracted: number;
  duplicatesRemoved: number;
  memoriesConsolidated: number;
  compressionRatio: number;
  processingEfficiency: number;
}

const initialRawMemories: RawMemory[] = [
  {
    id: 'raw-1',
    content: 'User asked about machine learning algorithms for recommendation systems',
    type: 'interaction',
    timestamp: Date.now() - 300000,
    importance: 0.8,
    processed: false
  },
  {
    id: 'raw-2',
    content: 'User expressed interest in collaborative filtering approaches',
    type: 'experience',
    timestamp: Date.now() - 240000,
    importance: 0.7,
    processed: false
  },
  {
    id: 'raw-3',
    content: 'Previous discussion about recommendation systems last week',
    type: 'event',
    timestamp: Date.now() - 600000,
    importance: 0.6,
    processed: false
  },
  {
    id: 'raw-4',
    content: 'User prefers technical explanations with code examples',
    type: 'observation',
    timestamp: Date.now() - 180000,
    importance: 0.9,
    processed: false
  },
  {
    id: 'raw-5',
    content: 'Mentioned Netflix and Amazon as reference examples',
    type: 'interaction',
    timestamp: Date.now() - 120000,
    importance: 0.5,
    processed: false
  },
  {
    id: 'raw-6',
    content: 'User asked for Python implementation details',
    type: 'interaction',
    timestamp: Date.now() - 60000,
    importance: 0.8,
    processed: false
  }
];

const consolidationSteps = [
  {
    id: 'collection',
    title: 'Raw Memory Collection',
    description: 'Gathering and organizing raw memories by temporal sequence',
    icon: Database,
    color: 'blue'
  },
  {
    id: 'pattern-extraction',
    title: 'Pattern Extraction',
    description: 'Identifying recurring themes and structural similarities',
    icon: Brain,
    color: 'purple'
  },
  {
    id: 'redundancy-removal',
    title: 'Redundancy Removal',
    description: 'Detecting and removing duplicate or highly similar memories',
    icon: Filter,
    color: 'green'
  },
  {
    id: 'importance-weighting',
    title: 'Importance Weighting',
    description: 'Scoring memories by frequency, recency, and significance',
    icon: TrendingUp,
    color: 'yellow'
  },
  {
    id: 'schema-formation',
    title: 'Schema Formation',
    description: 'Organizing memories into coherent knowledge structures',
    icon: FileText,
    color: 'orange'
  },
  {
    id: 'integration',
    title: 'Memory Integration',
    description: 'Integrating consolidated schemas into long-term storage',
    icon: CheckCircle,
    color: 'emerald'
  }
];

export const MemoryConsolidationDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [rawMemories, setRawMemories] = useState<RawMemory[]>(initialRawMemories);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [consolidatedMemories, setConsolidatedMemories] = useState<ConsolidatedMemory[]>([]);
  const [metrics, setMetrics] = useState<ProcessingMetrics>({
    rawMemoriesProcessed: 0,
    patternsExtracted: 0,
    duplicatesRemoved: 0,
    memoriesConsolidated: 0,
    compressionRatio: 0,
    processingEfficiency: 0
  });
  const [operationLog, setOperationLog] = useState<string[]>([]);
  const [currentOperation, setCurrentOperation] = useState<string>('');

  const addLogEntry = useCallback((message: string) => {
    setOperationLog(prev => [...prev.slice(-7), `[${new Date().toLocaleTimeString()}] ${message}`]);
  }, []);

  const resetDemo = useCallback(() => {
    setIsRunning(false);
    isRunningRef.current = false;
    setCurrentStep(-1);
    setRawMemories(initialRawMemories.map(m => ({ ...m, processed: false })));
    setPatterns([]);
    setConsolidatedMemories([]);
    setMetrics({
      rawMemoriesProcessed: 0,
      patternsExtracted: 0,
      duplicatesRemoved: 0,
      memoriesConsolidated: 0,
      compressionRatio: 0,
      processingEfficiency: 0
    });
    setOperationLog([]);
    setCurrentOperation('');
  }, []);

  const processStep = useCallback(async (stepIndex: number) => {
    const step = consolidationSteps[stepIndex];
    setCurrentOperation(step.description);
    addLogEntry(`Starting ${step.title}`);

    await new Promise(resolve => setTimeout(resolve, 1000));

    switch (step.id) {
      case 'collection':
        setRawMemories(prev => prev.map(m => ({ ...m, processed: true })));
        setMetrics(prev => ({ ...prev, rawMemoriesProcessed: initialRawMemories.length }));
        addLogEntry(`Collected ${initialRawMemories.length} raw memories`);
        break;

      case 'pattern-extraction':
        const extractedPatterns: Pattern[] = [
          {
            id: 'pattern-1',
            description: 'User interest in recommendation systems',
            frequency: 3,
            confidence: 0.85,
            memoryIds: ['raw-1', 'raw-2', 'raw-3']
          },
          {
            id: 'pattern-2',
            description: 'Preference for technical implementations',
            frequency: 2,
            confidence: 0.90,
            memoryIds: ['raw-4', 'raw-6']
          },
          {
            id: 'pattern-3',
            description: 'Reference to industry examples',
            frequency: 1,
            confidence: 0.70,
            memoryIds: ['raw-5']
          }
        ];
        setPatterns(extractedPatterns);
        setMetrics(prev => ({ ...prev, patternsExtracted: extractedPatterns.length }));
        addLogEntry(`Extracted ${extractedPatterns.length} patterns`);
        break;

      case 'redundancy-removal':
        // Simulate redundancy removal
        setMetrics(prev => ({ ...prev, duplicatesRemoved: 1 }));
        addLogEntry('Removed 1 duplicate memory');
        break;

      case 'importance-weighting':
        // Update importance scores based on patterns
        setRawMemories(prev => prev.map(m => ({
          ...m,
          importance: m.importance + (patterns.some(p => p.memoryIds.includes(m.id)) ? 0.1 : 0)
        })));
        addLogEntry('Updated importance weights for all memories');
        break;

      case 'schema-formation':
        const schemas: ConsolidatedMemory[] = [
          {
            id: 'schema-1',
            content: 'User expertise and interests in machine learning recommendation systems',
            type: 'preference',
            importanceScore: 0.95,
            retentionProbability: 0.98,
            sourceMemories: ['raw-1', 'raw-2', 'raw-3'],
            schema: 'User Preferences',
            connections: ['schema-2']
          },
          {
            id: 'schema-2',
            content: 'Technical communication preference with practical implementation focus',
            type: 'pattern',
            importanceScore: 0.90,
            retentionProbability: 0.95,
            sourceMemories: ['raw-4', 'raw-6'],
            schema: 'Communication Style',
            connections: ['schema-1']
          },
          {
            id: 'schema-3',
            content: 'Knowledge of industry leaders in recommendation systems (Netflix, Amazon)',
            type: 'fact',
            importanceScore: 0.75,
            retentionProbability: 0.85,
            sourceMemories: ['raw-5'],
            schema: 'Domain Knowledge',
            connections: []
          }
        ];
        setConsolidatedMemories(schemas);
        setMetrics(prev => ({ 
          ...prev, 
          memoriesConsolidated: schemas.length,
          compressionRatio: Math.round((schemas.length / initialRawMemories.length) * 100)
        }));
        addLogEntry(`Formed ${schemas.length} knowledge schemas`);
        break;

      case 'integration':
        setMetrics(prev => ({ 
          ...prev, 
          processingEfficiency: Math.round(85 + Math.random() * 10)
        }));
        addLogEntry('Integrated schemas into long-term memory');
        break;
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
    setCurrentOperation('');
  }, [patterns, addLogEntry]);

  const runDemo = useCallback(async () => {
    setIsRunning(true);
    isRunningRef.current = true;
    addLogEntry('Memory consolidation process started');

    for (let i = 0; i < consolidationSteps.length; i++) {
      if (!isRunningRef.current) break; // Check if paused

      setCurrentStep(i);
      await processStep(i);
    }

    if (isRunningRef.current) {
      setCurrentStep(-1);
      addLogEntry('Memory consolidation process completed');
    }
    setIsRunning(false);
    isRunningRef.current = false;
  }, [processStep, addLogEntry]);

  const startDemo = () => {
    runDemo();
  };

  const pauseDemo = () => {
    setIsRunning(false);
    isRunningRef.current = false;
    addLogEntry('Process paused');
  };

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'interaction': return '💬';
      case 'experience': return '✨';
      case 'event': return '📅';
      case 'observation': return '👁️';
      case 'fact': return '📋';
      case 'pattern': return '🔗';
      case 'skill': return '🛠️';
      case 'preference': return '⭐';
      default: return '📄';
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Memory Consolidation Process</h2>
          <p className="text-gray-400">Transforming raw memories into structured knowledge through pattern extraction and schema formation</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            disabled={!isRunning && currentStep >= consolidationSteps.length}
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
        <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-blue-300">{currentOperation}</span>
          </div>
        </div>
      )}

      {/* Process Steps */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Process Steps</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {consolidationSteps.map((step, index) => {
            const status = getStepStatus(index);
            const StepIcon = step.icon;
            
            return (
              <div
                key={step.id}
                className={`p-3 rounded-lg border transition-all ${
                  status === 'completed' ? 'border-green-500/50 bg-green-500/10' :
                  status === 'active' ? 'border-blue-500/50 bg-blue-500/10 animate-pulse' :
                  'border-gray-600/50 bg-gray-700/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <StepIcon className={`w-5 h-5 ${
                    status === 'completed' ? 'text-green-400' :
                    status === 'active' ? 'text-blue-400' :
                    'text-gray-400'
                  }`} />
                  <span className="text-xs font-medium">{index + 1}</span>
                </div>
                <div className="text-sm font-medium mb-1">{step.title}</div>
                <div className="text-xs text-gray-400">{step.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Raw Memories */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            Raw Memories ({rawMemories.length})
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {rawMemories.map((memory) => (
              <div
                key={memory.id}
                className={`p-3 rounded-lg border transition-all ${
                  memory.processed 
                    ? 'border-green-500/30 bg-green-500/10' 
                    : 'border-gray-600/50 bg-gray-700/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(memory.type)}</span>
                    <span className="text-xs text-gray-400 capitalize">{memory.type}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {Math.floor((Date.now() - memory.timestamp) / 60000)}m ago
                  </div>
                </div>
                <div className="text-sm text-gray-300 mb-2">{memory.content}</div>
                <div className="flex justify-between text-xs">
                  <span className="text-blue-400">Importance: {memory.importance.toFixed(2)}</span>
                  {memory.processed && <span className="text-green-400">✓ Processed</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Extracted Patterns */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Extracted Patterns ({patterns.length})
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {patterns.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No patterns extracted yet</p>
              </div>
            ) : (
              patterns.map((pattern) => (
                <div key={pattern.id} className="p-3 rounded-lg border border-purple-500/30 bg-purple-500/10">
                  <div className="text-sm font-medium text-purple-300 mb-2">{pattern.description}</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="text-purple-400">{pattern.frequency}</div>
                      <div className="text-gray-500">Frequency</div>
                    </div>
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="text-purple-400">{(pattern.confidence * 100).toFixed(0)}%</div>
                      <div className="text-gray-500">Confidence</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    Sources: {pattern.memoryIds.length} memories
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Consolidated Memories */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Consolidated Knowledge ({consolidatedMemories.length})
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {consolidatedMemories.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No consolidated knowledge yet</p>
              </div>
            ) : (
              consolidatedMemories.map((memory) => (
                <div key={memory.id} className="p-3 rounded-lg border border-green-500/30 bg-green-500/10">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getTypeIcon(memory.type)}</span>
                      <span className="text-xs text-green-400 capitalize">{memory.type}</span>
                    </div>
                    <span className="text-xs text-gray-400">{memory.schema}</span>
                  </div>
                  <div className="text-sm text-gray-300 mb-2">{memory.content}</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="text-green-400">{(memory.importanceScore * 100).toFixed(0)}</div>
                      <div className="text-gray-500">Importance</div>
                    </div>
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="text-green-400">{(memory.retentionProbability * 100).toFixed(0)}%</div>
                      <div className="text-gray-500">Retention</div>
                    </div>
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="text-green-400">{memory.sourceMemories.length}</div>
                      <div className="text-gray-500">Sources</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Metrics and Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Processing Metrics */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Processing Metrics
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Memories Processed:</span>
              <span className="font-medium text-cyan-400">{metrics.rawMemoriesProcessed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Patterns Extracted:</span>
              <span className="font-medium text-purple-400">{metrics.patternsExtracted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Duplicates Removed:</span>
              <span className="font-medium text-green-400">{metrics.duplicatesRemoved}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Schemas Formed:</span>
              <span className="font-medium text-orange-400">{metrics.memoriesConsolidated}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Compression Ratio:</span>
              <span className="font-medium text-yellow-400">{metrics.compressionRatio}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Efficiency:</span>
              <span className="font-medium text-emerald-400">{metrics.processingEfficiency}%</span>
            </div>
          </div>
        </div>

        {/* Operation Log */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Operation Log
          </h3>
          <div className="space-y-1 text-xs max-h-40 overflow-y-auto">
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
      </div>

      {/* Algorithm Explanation */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Memory Consolidation Algorithm
        </h4>
        <div className="text-sm text-gray-300 space-y-2">
          <p><strong>Core Process:</strong> Transforms raw episodic memories into structured knowledge through pattern extraction, redundancy removal, importance weighting, and schema formation.</p>
          <p><strong>Key Features:</strong> Temporal organization, semantic clustering, importance scoring, knowledge schema construction, and long-term retention optimization.</p>
          <p><strong>Benefits:</strong> Efficient knowledge storage, improved retrieval, reduced redundancy, enhanced learning, and intelligent memory organization.</p>
          <p><strong>Applications:</strong> Personal AI assistants, learning systems, knowledge management, adaptive agents, and long-term memory architectures.</p>
        </div>
      </div>
    </div>
  );
};

export default MemoryConsolidationDemo;