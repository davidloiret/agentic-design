'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, FileText, Zap, Database, CheckCircle, TrendingDown, Activity, Gauge, Clock, ArrowRight, Layers, Share2, Settings } from 'lucide-react';

interface CompressionTask {
  id: string;
  title: string;
  description: string;
  inputSize: number;
  complexity: 'simple' | 'moderate' | 'complex' | 'expert';
  domains: string[];
  expectedOutput: number;
  qualityTarget: number;
}

interface CompressionAgent {
  id: string;
  name: string;
  specialty: string;
  status: 'idle' | 'analyzing' | 'compressing' | 'cross-validating' | 'optimizing' | 'completed';
  inputTokens: number;
  outputTokens: number;
  compressionRatio: number;
  qualityScore: number;
  processingTime: number;
  icon: React.ComponentType<any>;
  techniques: string[];
}

interface SystemMetrics {
  totalInputTokens: number;
  totalOutputTokens: number;
  overallCompressionRatio: number;
  averageQuality: number;
  totalProcessingTime: number;
  costSavings: number;
  memoryEfficiency: number;
  throughputImprovement: number;
}

const compressionTasks: CompressionTask[] = [
  {
    id: 'research-corpus',
    title: 'Multi-Domain Research Corpus',
    description: 'Academic papers, datasets, methodology, conclusions, and validation data',
    inputSize: 100000,
    complexity: 'expert',
    domains: ['Literature', 'Data Analysis', 'Methodology', 'Synthesis', 'Validation'],
    expectedOutput: 27000,
    qualityTarget: 94
  },
  {
    id: 'technical-docs',
    title: 'Technical Documentation Set',
    description: 'API documentation, code examples, integration guides, and troubleshooting',
    inputSize: 75000,
    complexity: 'complex',
    domains: ['API Docs', 'Code Examples', 'Integration', 'Support'],
    expectedOutput: 22500,
    qualityTarget: 92
  },
  {
    id: 'meeting-transcripts',
    title: 'Meeting Transcripts & Notes',
    description: 'Quarterly reviews, project meetings, action items, and follow-ups',
    inputSize: 45000,
    complexity: 'moderate',
    domains: ['Meetings', 'Action Items', 'Reviews'],
    expectedOutput: 15750,
    qualityTarget: 90
  }
];

const initialAgents: CompressionAgent[] = [
  {
    id: 'literature-agent',
    name: 'Literature Review Agent',
    specialty: 'Academic content and citations',
    status: 'idle',
    inputTokens: 0,
    outputTokens: 0,
    compressionRatio: 0,
    qualityScore: 0,
    processingTime: 0,
    icon: FileText,
    techniques: ['Citation compression', 'Concept graph preservation', 'Semantic clustering']
  },
  {
    id: 'data-agent',
    name: 'Data Analysis Agent',
    specialty: 'Statistical content and datasets',
    status: 'idle',
    inputTokens: 0,
    outputTokens: 0,
    compressionRatio: 0,
    qualityScore: 0,
    processingTime: 0,
    icon: TrendingDown,
    techniques: ['Statistical summarization', 'Numerical precision control', 'Pattern extraction']
  },
  {
    id: 'methodology-agent',
    name: 'Methodology Agent',
    specialty: 'Procedures and protocols',
    status: 'idle',
    inputTokens: 0,
    outputTokens: 0,
    compressionRatio: 0,
    qualityScore: 0,
    processingTime: 0,
    icon: CheckCircle,
    techniques: ['Process distillation', 'Step dependency mapping', 'Critical path preservation']
  },
  {
    id: 'synthesis-agent',
    name: 'Synthesis Agent',
    specialty: 'Insights and conclusions',
    status: 'idle',
    inputTokens: 0,
    outputTokens: 0,
    compressionRatio: 0,
    qualityScore: 0,
    processingTime: 0,
    icon: Zap,
    techniques: ['Insight abstraction', 'Logical flow compression', 'Key finding extraction']
  },
  {
    id: 'validation-agent',
    name: 'Validation Agent',
    specialty: 'Quality assurance and references',
    status: 'idle',
    inputTokens: 0,
    outputTokens: 0,
    compressionRatio: 0,
    qualityScore: 0,
    processingTime: 0,
    icon: Database,
    techniques: ['Reference validation', 'Fact checking', 'Quality scoring']
  }
];

export const AdvancedContextCompressionDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [agents, setAgents] = useState<CompressionAgent[]>(initialAgents);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalInputTokens: 0,
    totalOutputTokens: 0,
    overallCompressionRatio: 0,
    averageQuality: 0,
    totalProcessingTime: 0,
    costSavings: 0,
    memoryEfficiency: 0,
    throughputImprovement: 0
  });
  const [compressionLog, setCompressionLog] = useState<string[]>([]);
  const [sharedContext, setSharedContext] = useState({
    size: 0,
    quality: 0,
    deduplication: 0
  });

  const phases = [
    'Task Distribution & Analysis',
    'Agent-Specific Compression',
    'Cross-Agent Validation',
    'Dynamic Optimization',
    'Context Sharing & Deduplication',
    'Final Quality Assessment'
  ];

  const resetDemo = useCallback(() => {
    setIsRunning(false);
    setCurrentTaskIndex(0);
    setCurrentPhase(0);
    setAgents(initialAgents);
    setSystemMetrics({
      totalInputTokens: 0,
      totalOutputTokens: 0,
      overallCompressionRatio: 0,
      averageQuality: 0,
      totalProcessingTime: 0,
      costSavings: 0,
      memoryEfficiency: 0,
      throughputImprovement: 0
    });
    setCompressionLog([]);
    setSharedContext({ size: 0, quality: 0, deduplication: 0 });
  }, []);

  const updateAgent = (agentId: string, updates: Partial<CompressionAgent>) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, ...updates } : agent
    ));
  };

  const addLogEntry = (message: string) => {
    setCompressionLog(prev => [...prev.slice(-9), `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const runCompressionSimulation = useCallback(async () => {
    if (!isRunning) return;

    const currentTask = compressionTasks[currentTaskIndex];
    addLogEntry(`Starting compression of: ${currentTask.title}`);

    // Phase 0: Task Distribution & Analysis
    setCurrentPhase(0);
    addLogEntry('Distributing content to specialized agents...');
    
    const agentInputSizes = {
      'literature-agent': Math.floor(currentTask.inputSize * 0.25),
      'data-agent': Math.floor(currentTask.inputSize * 0.30),
      'methodology-agent': Math.floor(currentTask.inputSize * 0.20),
      'synthesis-agent': Math.floor(currentTask.inputSize * 0.15),
      'validation-agent': Math.floor(currentTask.inputSize * 0.10)
    };

    Object.entries(agentInputSizes).forEach(([agentId, size]) => {
      updateAgent(agentId, { 
        status: 'analyzing', 
        inputTokens: size,
        outputTokens: 0,
        compressionRatio: 0,
        qualityScore: 0
      });
    });

    await new Promise(resolve => setTimeout(resolve, 1500));

    // Phase 1: Agent-Specific Compression
    setCurrentPhase(1);
    addLogEntry('Agents applying specialized compression techniques...');
    
    const compressionResults = {
      'literature-agent': { ratio: 76, quality: 96, time: 1.2 },
      'data-agent': { ratio: 76, quality: 95, time: 1.5 },
      'methodology-agent': { ratio: 72.5, quality: 94, time: 1.1 },
      'synthesis-agent': { ratio: 68, quality: 93, time: 0.9 },
      'validation-agent': { ratio: 65, quality: 92, time: 0.8 }
    };

    for (const [agentId, result] of Object.entries(compressionResults)) {
      updateAgent(agentId, {
        status: 'compressing',
        compressionRatio: result.ratio,
        qualityScore: result.quality,
        processingTime: result.time,
        outputTokens: Math.floor(agentInputSizes[agentId as keyof typeof agentInputSizes] * (1 - result.ratio / 100))
      });
      addLogEntry(`${agentId}: ${result.ratio}% compression, ${result.quality}% quality`);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 2: Cross-Agent Validation
    setCurrentPhase(2);
    addLogEntry('Cross-validating compression quality...');
    
    agents.forEach(agent => {
      updateAgent(agent.id, { status: 'cross-validating' });
    });

    await new Promise(resolve => setTimeout(resolve, 1200));

    // Phase 3: Dynamic Optimization
    setCurrentPhase(3);
    addLogEntry('Optimizing compression ratios based on quality metrics...');
    
    Object.keys(compressionResults).forEach(agentId => {
      updateAgent(agentId, { 
        status: 'optimizing',
        compressionRatio: compressionResults[agentId as keyof typeof compressionResults].ratio + 2,
        qualityScore: Math.min(96, compressionResults[agentId as keyof typeof compressionResults].quality + 1)
      });
    });

    await new Promise(resolve => setTimeout(resolve, 1500));

    // Phase 4: Context Sharing & Deduplication
    setCurrentPhase(4);
    addLogEntry('Sharing context and eliminating redundancy...');
    
    setSharedContext({
      size: 2000,
      quality: 95,
      deduplication: 15
    });

    await new Promise(resolve => setTimeout(resolve, 1300));

    // Phase 5: Final Quality Assessment
    setCurrentPhase(5);
    addLogEntry('Performing final quality assessment...');
    
    const totalOutput = Object.values(agents).reduce((sum, agent) => sum + agent.outputTokens, 0);
    const finalCompressionRatio = Math.round((1 - totalOutput / currentTask.inputSize) * 100);
    const averageQuality = Object.values(compressionResults).reduce((sum, result) => sum + result.quality, 0) / Object.values(compressionResults).length;

    setSystemMetrics({
      totalInputTokens: currentTask.inputSize,
      totalOutputTokens: totalOutput,
      overallCompressionRatio: finalCompressionRatio,
      averageQuality: Math.round(averageQuality),
      totalProcessingTime: 5.6,
      costSavings: finalCompressionRatio,
      memoryEfficiency: finalCompressionRatio + 5,
      throughputImprovement: Math.round(100 / (100 - finalCompressionRatio) * 100)
    });

    agents.forEach(agent => {
      updateAgent(agent.id, { status: 'completed' });
    });

    addLogEntry(`Compression complete: ${finalCompressionRatio}% reduction, ${Math.round(averageQuality)}% quality`);

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Move to next task or finish
    if (currentTaskIndex < compressionTasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
      setCurrentPhase(0);
    } else {
      setIsRunning(false);
      addLogEntry('All compression tasks completed successfully');
    }
  }, [isRunning, currentTaskIndex, agents]);

  useEffect(() => {
    if (isRunning) {
      runCompressionSimulation();
    }
  }, [isRunning, runCompressionSimulation]);

  const startDemo = () => {
    setIsRunning(true);
    setCurrentTaskIndex(0);
    setCurrentPhase(0);
  };

  const pauseDemo = () => {
    setIsRunning(false);
  };

  const currentTask = compressionTasks[currentTaskIndex];

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Advanced Context Compression Simulation</h2>
          <p className="text-gray-400">Multi-agent compression coordination with real-time optimization</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            disabled={!isRunning && currentTaskIndex >= compressionTasks.length}
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
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">Compression Phase</span>
          <span className="text-sm text-gray-400">{currentPhase + 1} / {phases.length}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentPhase + 1) / phases.length) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-blue-400">
          {phases[currentPhase]}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Task & Agents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Task */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Current Task: {currentTask?.title}
            </h3>
            
            {currentTask && (
              <div className="space-y-3">
                <div className="text-sm text-gray-300">{currentTask.description}</div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="text-center p-2 bg-gray-700/50 rounded">
                    <div className="font-semibold text-blue-400">{currentTask.inputSize.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Input Tokens</div>
                  </div>
                  <div className="text-center p-2 bg-gray-700/50 rounded">
                    <div className="font-semibold text-green-400">{currentTask.expectedOutput.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Expected Output</div>
                  </div>
                  <div className="text-center p-2 bg-gray-700/50 rounded">
                    <div className="font-semibold text-yellow-400">{currentTask.qualityTarget}%</div>
                    <div className="text-xs text-gray-400">Quality Target</div>
                  </div>
                  <div className="text-center p-2 bg-gray-700/50 rounded">
                    <div className="font-semibold text-purple-400 capitalize">{currentTask.complexity}</div>
                    <div className="text-xs text-gray-400">Complexity</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-400 mb-2">Content Domains:</div>
                  <div className="flex flex-wrap gap-1">
                    {currentTask.domains.map(domain => (
                      <span key={domain} className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Compression Agents */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Multi-Agent Compression Network
            </h3>
            
            <div className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`p-3 rounded-lg border transition-all ${
                    agent.status === 'idle'
                      ? 'border-gray-600 bg-gray-700/30'
                      : agent.status === 'analyzing'
                      ? 'border-blue-500 bg-blue-500/10'
                      : agent.status === 'compressing'
                      ? 'border-yellow-500 bg-yellow-500/10'
                      : agent.status === 'cross-validating'
                      ? 'border-purple-500 bg-purple-500/10'
                      : agent.status === 'optimizing'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-green-500 bg-green-500/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <agent.icon className="w-4 h-4" />
                      <div>
                        <div className="font-medium text-sm">{agent.name}</div>
                        <div className="text-xs text-gray-400">{agent.specialty}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      agent.status === 'idle'
                        ? 'bg-gray-600 text-gray-300'
                        : agent.status === 'analyzing'
                        ? 'bg-blue-600 text-blue-100'
                        : agent.status === 'compressing'
                        ? 'bg-yellow-600 text-yellow-100'
                        : agent.status === 'cross-validating'
                        ? 'bg-purple-600 text-purple-100'
                        : agent.status === 'optimizing'
                        ? 'bg-cyan-600 text-cyan-100'
                        : 'bg-green-600 text-green-100'
                    }`}>
                      {agent.status.toUpperCase().replace('-', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="font-semibold text-blue-400">
                        {agent.inputTokens > 0 ? agent.inputTokens.toLocaleString() : '-'}
                      </div>
                      <div className="text-gray-400">Input</div>
                    </div>
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="font-semibold text-green-400">
                        {agent.outputTokens > 0 ? agent.outputTokens.toLocaleString() : '-'}
                      </div>
                      <div className="text-gray-400">Output</div>
                    </div>
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="font-semibold text-yellow-400">
                        {agent.compressionRatio > 0 ? `${agent.compressionRatio}%` : '-'}
                      </div>
                      <div className="text-gray-400">Ratio</div>
                    </div>
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="font-semibold text-purple-400">
                        {agent.qualityScore > 0 ? `${agent.qualityScore}%` : '-'}
                      </div>
                      <div className="text-gray-400">Quality</div>
                    </div>
                  </div>

                  {agent.techniques.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-400 mb-1">Techniques:</div>
                      <div className="flex flex-wrap gap-1">
                        {agent.techniques.slice(0, 2).map(technique => (
                          <span key={technique} className="text-xs px-1 py-0.5 bg-gray-700 rounded text-gray-300">
                            {technique}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {agent.status !== 'idle' && agent.status !== 'completed' && (
                    <div className="mt-2 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-gray-400 animate-pulse" />
                      <div className="text-xs text-gray-400">Processing...</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics & Logs */}
        <div className="space-y-6">
          {/* System Metrics */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-green-400" />
              System Metrics
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Compression Ratio:</span>
                <span className="font-medium text-yellow-400">{systemMetrics.overallCompressionRatio}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average Quality:</span>
                <span className="font-medium text-purple-400">{systemMetrics.averageQuality}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Processing Time:</span>
                <span className="font-medium text-blue-400">{systemMetrics.totalProcessingTime}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cost Savings:</span>
                <span className="font-medium text-green-400">{systemMetrics.costSavings}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Memory Efficiency:</span>
                <span className="font-medium text-cyan-400">{systemMetrics.memoryEfficiency}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Throughput Gain:</span>
                <span className="font-medium text-pink-400">{systemMetrics.throughputImprovement}%</span>
              </div>
            </div>
          </div>

          {/* Shared Context */}
          {sharedContext.size > 0 && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-cyan-400" />
                Shared Context
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Shared Size:</span>
                  <span className="font-medium text-cyan-400">{sharedContext.size} tokens</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Quality Score:</span>
                  <span className="font-medium text-purple-400">{sharedContext.quality}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Deduplication:</span>
                  <span className="font-medium text-yellow-400">{sharedContext.deduplication}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Compression Log */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-400" />
              Compression Log
            </h3>
            
            <div className="space-y-1 text-xs max-h-64 overflow-y-auto">
              {compressionLog.map((entry, index) => (
                <div key={index} className="text-gray-300 py-1 border-b border-gray-700/30 last:border-b-0">
                  {entry}
                </div>
              ))}
              {compressionLog.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  <Clock className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p>Waiting for compression to start...</p>
                </div>
              )}
            </div>
          </div>

          {/* Task Progress */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Task Progress
            </h3>
            
            <div className="space-y-2">
              {compressionTasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`p-2 rounded text-sm ${
                    index === currentTaskIndex
                      ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                      : index < currentTaskIndex
                      ? 'bg-green-500/10 border border-green-500/30 text-green-300'
                      : 'bg-gray-700/30 border border-gray-600/30 text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {index < currentTaskIndex ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : index === currentTaskIndex ? (
                      <Clock className="w-4 h-4 text-blue-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-500" />
                    )}
                    <span className="font-medium">{task.title}</span>
                  </div>
                  <div className="text-xs mt-1 ml-6">
                    {task.inputSize.toLocaleString()} tokens → {task.expectedOutput.toLocaleString()} tokens
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phase Information */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Current Phase: {phases[currentPhase]}</h4>
        <div className="text-sm text-gray-300">
          {currentPhase === 0 && "System analyzes and distributes content to specialized compression agents based on domain expertise."}
          {currentPhase === 1 && "Each agent applies specialized compression techniques optimized for their content type and domain."}
          {currentPhase === 2 && "Agents cross-validate compression quality and semantic preservation across the network."}
          {currentPhase === 3 && "System dynamically adjusts compression ratios based on real-time quality metrics and performance targets."}
          {currentPhase === 4 && "Agents share essential context while eliminating redundancy through intelligent deduplication."}
          {currentPhase === 5 && "Final quality assessment ensures semantic fidelity meets targets before compression completion."}
        </div>
      </div>
    </div>
  );
};

export default AdvancedContextCompressionDemo;