'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, FileText, Zap, TrendingDown, Search, Target, Activity, BarChart3, Clock, Settings, Layers, Database, AlertCircle } from 'lucide-react';

interface ContextItem {
  id: string;
  content: string;
  type: 'conversation' | 'document' | 'metadata' | 'reference';
  importance: number;
  redundancy: number;
  semanticValue: number;
  size: number; // in tokens
  compressed: boolean;
  compressionRatio?: number;
}

interface CompressionMetrics {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  semanticFidelity: number;
  processingTime: number;
  qualityScore: number;
}

interface CompressionStep {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  active: boolean;
}

const initialContextItems: ContextItem[] = [
  {
    id: 'conv-1',
    content: 'User: I need help planning my daughter\'s birthday party for next weekend.',
    type: 'conversation',
    importance: 0.9,
    redundancy: 0.1,
    semanticValue: 0.95,
    size: 180,
    compressed: false
  },
  {
    id: 'conv-2',
    content: 'Assistant: I\'d be happy to help! How old is your daughter turning?',
    type: 'conversation',
    importance: 0.6,
    redundancy: 0.2,
    semanticValue: 0.7,
    size: 120,
    compressed: false
  },
  {
    id: 'conv-3',
    content: 'User: She\'s turning 8. We want something fun but not too expensive.',
    type: 'conversation',
    importance: 0.85,
    redundancy: 0.15,
    semanticValue: 0.9,
    size: 150,
    compressed: false
  },
  {
    id: 'meta-1',
    content: 'Party planning preferences: outdoor activities, budget-conscious, age 8',
    type: 'metadata',
    importance: 0.95,
    redundancy: 0.05,
    semanticValue: 0.98,
    size: 80,
    compressed: false
  },
  {
    id: 'conv-4',
    content: 'Assistant: Great! Here are some budget-friendly ideas for 8-year-olds...',
    type: 'conversation',
    importance: 0.7,
    redundancy: 0.3,
    semanticValue: 0.75,
    size: 200,
    compressed: false
  },
  {
    id: 'ref-1',
    content: 'Previous conversation about outdoor activities preferences from last month',
    type: 'reference',
    importance: 0.4,
    redundancy: 0.6,
    semanticValue: 0.5,
    size: 160,
    compressed: false
  },
  {
    id: 'doc-1',
    content: 'Birthday party checklist: venue, decorations, food, activities, guest list',
    type: 'document',
    importance: 0.8,
    redundancy: 0.2,
    semanticValue: 0.85,
    size: 140,
    compressed: false
  },
  {
    id: 'conv-5',
    content: 'User: That sounds perfect! Can you help me make a shopping list?',
    type: 'conversation',
    importance: 0.75,
    redundancy: 0.25,
    semanticValue: 0.8,
    size: 110,
    compressed: false
  }
];

const compressionSteps: CompressionStep[] = [
  {
    id: 'analysis',
    name: 'Content Analysis',
    description: 'Analyze content structure and identify key elements',
    icon: Search,
    color: 'blue',
    active: false
  },
  {
    id: 'semantic',
    name: 'Semantic Extraction',
    description: 'Extract semantic meaning and relationships',
    icon: Target,
    color: 'green',
    active: false
  },
  {
    id: 'strategy',
    name: 'Strategy Selection',
    description: 'Choose optimal compression strategy',
    icon: Settings,
    color: 'purple',
    active: false
  },
  {
    id: 'distillation',
    name: 'Information Distillation',
    description: 'Remove redundancy and preserve essence',
    icon: Layers,
    color: 'orange',
    active: false
  },
  {
    id: 'encoding',
    name: 'Context Encoding',
    description: 'Encode into efficient storage format',
    icon: Database,
    color: 'cyan',
    active: false
  },
  {
    id: 'validation',
    name: 'Quality Validation',
    description: 'Validate compression quality and fidelity',
    icon: AlertCircle,
    color: 'red',
    active: false
  }
];

export const ContextCompressionDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [contextItems, setContextItems] = useState<ContextItem[]>(initialContextItems);
  const [currentStep, setCurrentStep] = useState(0);
  const [compressionType, setCompressionType] = useState<'lossy' | 'lossless' | 'hybrid'>('hybrid');
  const [metrics, setMetrics] = useState<CompressionMetrics>({
    originalSize: 1140,
    compressedSize: 1140,
    compressionRatio: 0,
    semanticFidelity: 100,
    processingTime: 0,
    qualityScore: 100
  });
  const [operationLog, setOperationLog] = useState<string[]>([]);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [steps, setSteps] = useState<CompressionStep[]>(compressionSteps);
  const [compressedOutput, setCompressedOutput] = useState<string>('');

  const addLogEntry = useCallback((message: string) => {
    setOperationLog(prev => [...prev.slice(-8), `[${new Date().toLocaleTimeString()}] ${message}`]);
  }, []);

  const resetDemo = useCallback(() => {
    setIsRunning(false);
    setContextItems(initialContextItems);
    setCurrentStep(0);
    setMetrics({
      originalSize: 1140,
      compressedSize: 1140,
      compressionRatio: 0,
      semanticFidelity: 100,
      processingTime: 0,
      qualityScore: 100
    });
    setOperationLog([]);
    setCurrentOperation('');
    setSteps(compressionSteps.map(s => ({ ...s, active: false })));
    setCompressedOutput('');
  }, []);

  const processStep = useCallback(async (stepIndex: number) => {
    const step = steps[stepIndex];
    setCurrentOperation(step.description);
    
    // Activate current step
    setSteps(prev => prev.map((s, i) => ({ ...s, active: i === stepIndex })));
    addLogEntry(`${step.name}: ${step.description}`);

    await new Promise(resolve => setTimeout(resolve, 1000));

    switch (step.id) {
      case 'analysis':
        // Analyze content and identify redundancy
        setContextItems(prev => prev.map(item => ({
          ...item,
          redundancy: item.type === 'reference' ? Math.min(0.8, item.redundancy + 0.2) : item.redundancy
        })));
        addLogEntry('Content analysis: Identified high redundancy in reference materials');
        break;

      case 'semantic':
        // Extract semantic values and relationships
        setContextItems(prev => prev.map(item => {
          let semanticValue = item.semanticValue;
          if (item.type === 'metadata') semanticValue = Math.min(1.0, semanticValue + 0.05);
          if (item.type === 'reference' && item.redundancy > 0.5) semanticValue = Math.max(0.3, semanticValue - 0.1);
          return { ...item, semanticValue };
        }));
        addLogEntry('Semantic extraction: Enhanced metadata semantic values, reduced redundant references');
        break;

      case 'strategy':
        // Apply compression strategy
        let compressionMultiplier = 1.0;
        switch (compressionType) {
          case 'lossy':
            compressionMultiplier = 0.3; // Aggressive compression
            break;
          case 'lossless':
            compressionMultiplier = 0.8; // Conservative compression
            break;
          case 'hybrid':
            compressionMultiplier = 0.5; // Balanced compression
            break;
        }
        
        setMetrics(prev => ({
          ...prev,
          compressionRatio: (1 - compressionMultiplier) * 100,
          semanticFidelity: compressionType === 'lossy' ? 85 : compressionType === 'lossless' ? 98 : 92
        }));
        addLogEntry(`Strategy selection: ${compressionType} compression selected`);
        break;

      case 'distillation':
        // Apply compression to items
        const compressionRatios = {
          lossy: { conversation: 0.4, document: 0.5, metadata: 0.9, reference: 0.2 },
          lossless: { conversation: 0.8, document: 0.85, metadata: 0.95, reference: 0.7 },
          hybrid: { conversation: 0.6, document: 0.7, metadata: 0.9, reference: 0.4 }
        };

        setContextItems(prev => prev.map(item => {
          const ratio = compressionRatios[compressionType][item.type];
          const compressedSize = Math.round(item.size * ratio);
          return {
            ...item,
            compressed: true,
            compressionRatio: Math.round((1 - ratio) * 100),
            size: compressedSize
          };
        }));

        const totalCompressed = contextItems.reduce((sum, item) => {
          const ratio = compressionRatios[compressionType][item.type];
          return sum + Math.round(item.size * ratio);
        }, 0);

        setMetrics(prev => ({
          ...prev,
          compressedSize: totalCompressed,
          compressionRatio: Math.round((1 - totalCompressed / prev.originalSize) * 100)
        }));

        addLogEntry(`Information distillation: Compressed ${contextItems.length} items`);
        break;

      case 'encoding':
        // Generate compressed output
        const output = `{
  "context_type": "birthday_party_planning",
  "key_facts": {
    "child_age": 8,
    "budget": "limited",
    "preferences": ["outdoor", "fun", "age_appropriate"]
  },
  "conversation_summary": "User seeks help planning daughter's 8th birthday party with budget constraints",
  "action_items": ["venue_selection", "activity_planning", "shopping_list"],
  "metadata": {
    "urgency": "high",
    "timeline": "next_weekend",
    "context_importance": 0.9
  }
}`;
        
        setCompressedOutput(output);
        setMetrics(prev => ({ ...prev, processingTime: 1.2 }));
        addLogEntry('Context encoding: Generated structured compressed format');
        break;

      case 'validation':
        // Validate quality
        const qualityScore = Math.round(
          (metrics.semanticFidelity * 0.4) + 
          ((100 - metrics.compressionRatio) * 0.3) + 
          ((100 - metrics.processingTime * 10) * 0.3)
        );
        
        setMetrics(prev => ({ ...prev, qualityScore }));
        addLogEntry(`Quality validation: Overall score ${qualityScore}% - compression successful`);
        break;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentOperation('');
  }, [steps, compressionType, contextItems, metrics]);

  const runDemo = useCallback(async () => {
    setIsRunning(true);
    addLogEntry('Context compression process started');
    
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await processStep(i);
      
      if (!isRunning) break;
    }
    
    setCurrentStep(-1);
    setSteps(prev => prev.map(s => ({ ...s, active: false })));
    setIsRunning(false);
    addLogEntry('Context compression completed');
  }, [steps.length, processStep, isRunning]);

  const startDemo = () => {
    runDemo();
  };

  const pauseDemo = () => {
    setIsRunning(false);
    addLogEntry('Process paused');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'conversation': return '💬';
      case 'document': return '📄';
      case 'metadata': return '🏷️';
      case 'reference': return '🔗';
      default: return '📋';
    }
  };

  const getCompressionColor = (ratio?: number) => {
    if (!ratio) return 'text-gray-400';
    if (ratio >= 70) return 'text-green-400';
    if (ratio >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Context Compression</h2>
          <p className="text-gray-400">Efficient storage and retrieval of contextual information through compression techniques</p>
        </div>
        <div className="flex gap-3">
          <select
            value={compressionType}
            onChange={(e) => setCompressionType(e.target.value as 'lossy' | 'lossless' | 'hybrid')}
            disabled={isRunning}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm disabled:opacity-50"
          >
            <option value="lossy">Lossy (High Compression)</option>
            <option value="lossless">Lossless (High Fidelity)</option>
            <option value="hybrid">Hybrid (Balanced)</option>
          </select>
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
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
        <div className="mb-6 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-purple-300">{currentOperation}</span>
          </div>
        </div>
      )}

      {/* Processing Steps */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Compression Pipeline</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            
            return (
              <div
                key={step.id}
                className={`p-3 rounded-lg border transition-all ${
                  step.active ? 'border-purple-500/50 bg-purple-500/10 animate-pulse' :
                  index < currentStep ? 'border-green-500/50 bg-green-500/10' :
                  'border-gray-600/50 bg-gray-700/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <StepIcon className={`w-5 h-5 ${
                    step.active ? 'text-purple-400' :
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
        {/* Context Items */}
        <div className="lg:col-span-2 bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            Context Items ({contextItems.length})
          </h3>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {contextItems.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg border transition-all ${
                  item.compressed ? 'border-green-500/30 bg-green-500/10' : 'border-gray-600/50 bg-gray-700/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(item.type)}</span>
                    <div>
                      <span className="text-xs text-gray-400 capitalize">{item.type}</span>
                      {item.compressed && (
                        <span className="ml-2 text-xs text-green-400">
                          🗜️ {item.compressionRatio}% reduced
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Size</div>
                    <div className="text-sm font-medium text-cyan-400">
                      {item.size} tokens
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-300 mb-2">{item.content}</div>
                
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center p-1 bg-gray-800/30 rounded">
                    <div className="text-blue-400">{(item.importance * 100).toFixed(0)}%</div>
                    <div className="text-gray-500">Importance</div>
                  </div>
                  <div className="text-center p-1 bg-gray-800/30 rounded">
                    <div className="text-red-400">{(item.redundancy * 100).toFixed(0)}%</div>
                    <div className="text-gray-500">Redundancy</div>
                  </div>
                  <div className="text-center p-1 bg-gray-800/30 rounded">
                    <div className="text-green-400">{(item.semanticValue * 100).toFixed(0)}%</div>
                    <div className="text-gray-500">Semantic</div>
                  </div>
                  <div className="text-center p-1 bg-gray-800/30 rounded">
                    <div className={getCompressionColor(item.compressionRatio)}>
                      {item.compressionRatio || 0}%
                    </div>
                    <div className="text-gray-500">Compressed</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics and Output */}
        <div className="space-y-6">
          {/* Compression Metrics */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              Compression Metrics
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Original Size:</span>
                <span className="font-medium text-cyan-400">{metrics.originalSize} tokens</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Compressed Size:</span>
                <span className="font-medium text-green-400">{metrics.compressedSize} tokens</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Compression Ratio:</span>
                <span className={`font-medium ${getCompressionColor(metrics.compressionRatio)}`}>
                  {metrics.compressionRatio.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Semantic Fidelity:</span>
                <span className="font-medium text-blue-400">{metrics.semanticFidelity.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Processing Time:</span>
                <span className="font-medium text-yellow-400">{metrics.processingTime.toFixed(1)}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Quality Score:</span>
                <span className={`font-medium ${getQualityColor(metrics.qualityScore)}`}>
                  {metrics.qualityScore.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          {/* Compressed Output */}
          {compressedOutput && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-400" />
                Compressed Output
              </h3>
              
              <div className="bg-gray-900/60 rounded-lg p-3 text-xs">
                <pre className="text-gray-300 whitespace-pre-wrap overflow-x-auto">
                  {compressedOutput}
                </pre>
              </div>
            </div>
          )}

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
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-yellow-400" />
          Context Compression Algorithm
        </h4>
        <div className="text-sm text-gray-300 space-y-2">
          <p><strong>Core Principle:</strong> Reduce storage requirements while preserving semantic meaning through intelligent information distillation and encoding.</p>
          <p><strong>Compression Strategies:</strong> Lossy (high compression, some semantic loss), Lossless (perfect preservation, lower compression), Hybrid (balanced approach).</p>
          <p><strong>Key Features:</strong> Redundancy removal, importance-based preservation, semantic value extraction, quality validation, and efficient reconstruction.</p>
          <p><strong>Applications:</strong> Long conversation management, document storage optimization, memory-efficient AI systems, and context handoffs between sessions.</p>
        </div>
      </div>
    </div>
  );
};

export default ContextCompressionDemo;