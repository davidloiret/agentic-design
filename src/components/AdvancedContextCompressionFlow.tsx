'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, FileText, Zap, Database, CheckCircle, ArrowRight, Clock, TrendingDown, Activity } from 'lucide-react';

interface CompressionAgent {
  id: string;
  name: string;
  specialty: string;
  status: 'idle' | 'analyzing' | 'compressing' | 'validating' | 'completed';
  inputTokens: number;
  outputTokens: number;
  compressionRatio: number;
  qualityScore: number;
  icon: React.ComponentType<any>;
}

interface CompressionStep {
  id: string;
  name: string;
  description: string;
  activeAgents: string[];
  metrics: {
    totalInput: number;
    totalOutput: number;
    avgQuality: number;
    processingTime: number;
  };
}

interface AdvancedContextCompressionFlowProps {
  className?: string;
}

const initialAgents: CompressionAgent[] = [
  {
    id: 'literature-agent',
    name: 'Literature Review Agent',
    specialty: 'Academic papers and citations',
    status: 'idle',
    inputTokens: 25000,
    outputTokens: 0,
    compressionRatio: 0,
    qualityScore: 0,
    icon: FileText
  },
  {
    id: 'data-analysis-agent',
    name: 'Data Analysis Agent',
    specialty: 'Datasets and statistical content',
    status: 'idle',
    inputTokens: 30000,
    outputTokens: 0,
    compressionRatio: 0,
    qualityScore: 0,
    icon: TrendingDown
  },
  {
    id: 'methodology-agent',
    name: 'Methodology Agent',
    specialty: 'Procedures and protocols',
    status: 'idle',
    inputTokens: 20000,
    outputTokens: 0,
    compressionRatio: 0,
    qualityScore: 0,
    icon: CheckCircle
  },
  {
    id: 'synthesis-agent',
    name: 'Synthesis Agent',
    specialty: 'Conclusions and insights',
    status: 'idle',
    inputTokens: 15000,
    outputTokens: 0,
    compressionRatio: 0,
    qualityScore: 0,
    icon: Zap
  },
  {
    id: 'validation-agent',
    name: 'Validation Agent',
    specialty: 'Quality checks and references',
    status: 'idle',
    inputTokens: 10000,
    outputTokens: 0,
    compressionRatio: 0,
    qualityScore: 0,
    icon: Database
  }
];

const compressionSteps: CompressionStep[] = [
  {
    id: 'step-1',
    name: 'Input Analysis & Distribution',
    description: 'System receives 100,000-token research corpus and distributes content to specialized agents',
    activeAgents: ['literature-agent', 'data-analysis-agent', 'methodology-agent', 'synthesis-agent', 'validation-agent'],
    metrics: { totalInput: 100000, totalOutput: 0, avgQuality: 0, processingTime: 0 }
  },
  {
    id: 'step-2',
    name: 'Agent-Specific Compression Profiling',
    description: 'Each agent applies specialized compression techniques based on content type and domain expertise',
    activeAgents: ['literature-agent', 'data-analysis-agent', 'methodology-agent'],
    metrics: { totalInput: 75000, totalOutput: 0, avgQuality: 0, processingTime: 1.2 }
  },
  {
    id: 'step-3',
    name: 'Semantic Preservation Analysis',
    description: 'Cross-agent validation ensures semantic fidelity while optimizing compression ratios',
    activeAgents: ['synthesis-agent', 'validation-agent'],
    metrics: { totalInput: 25000, totalOutput: 0, avgQuality: 0, processingTime: 2.1 }
  },
  {
    id: 'step-4',
    name: 'Dynamic Ratio Optimization',
    description: 'System adjusts compression ratios based on real-time quality metrics and task requirements',
    activeAgents: ['literature-agent', 'data-analysis-agent', 'methodology-agent', 'synthesis-agent'],
    metrics: { totalInput: 100000, totalOutput: 18000, avgQuality: 92, processingTime: 3.4 }
  },
  {
    id: 'step-5',
    name: 'Cross-Agent Context Sharing',
    description: 'Agents share essential context while eliminating redundancy across the compression network',
    activeAgents: ['literature-agent', 'data-analysis-agent', 'methodology-agent', 'synthesis-agent', 'validation-agent'],
    metrics: { totalInput: 100000, totalOutput: 25000, avgQuality: 94, processingTime: 4.8 }
  },
  {
    id: 'step-6',
    name: 'Quality-Aware Compression Output',
    description: 'Final compressed context delivered with 73% reduction and 94% semantic fidelity preservation',
    activeAgents: ['validation-agent'],
    metrics: { totalInput: 100000, totalOutput: 27000, avgQuality: 94, processingTime: 5.6 }
  }
];

export const AdvancedContextCompressionFlow: React.FC<AdvancedContextCompressionFlowProps> = ({ className = '' }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [agents, setAgents] = useState<CompressionAgent[]>(initialAgents);
  const [systemMetrics, setSystemMetrics] = useState({
    totalInputTokens: 100000,
    totalOutputTokens: 0,
    overallCompressionRatio: 0,
    averageQuality: 0,
    processingTime: 0,
    costReduction: 0
  });

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setCurrentStep(0);
    setAgents(initialAgents);
    setSystemMetrics({
      totalInputTokens: 100000,
      totalOutputTokens: 0,
      overallCompressionRatio: 0,
      averageQuality: 0,
      processingTime: 0,
      costReduction: 0
    });
  }, []);

  const updateAgentProgress = (agentId: string, status: CompressionAgent['status'], compressionRatio: number, qualityScore: number, outputTokens: number) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status, compressionRatio, qualityScore, outputTokens }
        : agent
    ));
  };

  const runSimulation = useCallback(async () => {
    if (!isRunning) return;

    // Step 0: Input Analysis & Distribution
    setCurrentStep(0);
    const step1 = compressionSteps[0];
    step1.activeAgents.forEach(agentId => {
      updateAgentProgress(agentId, 'analyzing', 0, 0, 0);
    });
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 1: Agent-Specific Compression Profiling
    setCurrentStep(1);
    const step2 = compressionSteps[1];
    
    // Literature Agent compression
    updateAgentProgress('literature-agent', 'compressing', 24, 96, 6000);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Data Analysis Agent compression
    updateAgentProgress('data-analysis-agent', 'compressing', 24, 95, 7200);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Methodology Agent compression
    updateAgentProgress('methodology-agent', 'compressing', 27.5, 94, 5500);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Step 2: Semantic Preservation Analysis
    setCurrentStep(2);
    updateAgentProgress('synthesis-agent', 'validating', 32, 93, 4800);
    updateAgentProgress('validation-agent', 'validating', 35, 92, 3500);
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Step 3: Dynamic Ratio Optimization
    setCurrentStep(3);
    ['literature-agent', 'data-analysis-agent', 'methodology-agent', 'synthesis-agent'].forEach(agentId => {
      updateAgentProgress(agentId, 'compressing', 28, 94, 0);
    });
    
    setSystemMetrics(prev => ({
      ...prev,
      totalOutputTokens: 18000,
      overallCompressionRatio: 82,
      averageQuality: 92,
      processingTime: 3.4,
      costReduction: 82
    }));
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 4: Cross-Agent Context Sharing
    setCurrentStep(4);
    compressionSteps[4].activeAgents.forEach(agentId => {
      updateAgentProgress(agentId, 'compressing', 25, 94, 0);
    });
    
    setSystemMetrics(prev => ({
      ...prev,
      totalOutputTokens: 25000,
      overallCompressionRatio: 75,
      averageQuality: 94,
      processingTime: 4.8,
      costReduction: 75
    }));
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 5: Quality-Aware Compression Output
    setCurrentStep(5);
    updateAgentProgress('validation-agent', 'completed', 73, 94, 27000);
    
    // Final agent states
    updateAgentProgress('literature-agent', 'completed', 76, 96, 6000);
    updateAgentProgress('data-analysis-agent', 'completed', 76, 95, 7200);
    updateAgentProgress('methodology-agent', 'completed', 72.5, 94, 5500);
    updateAgentProgress('synthesis-agent', 'completed', 68, 93, 4800);
    
    setSystemMetrics({
      totalInputTokens: 100000,
      totalOutputTokens: 27000,
      overallCompressionRatio: 73,
      averageQuality: 94,
      processingTime: 5.6,
      costReduction: 73
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRunning(false);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      runSimulation();
    }
  }, [isRunning, runSimulation]);

  const startSimulation = () => {
    setIsRunning(true);
    setCurrentStep(0);
  };

  const pauseSimulation = () => {
    setIsRunning(false);
  };

  return (
    <div className={`bg-gray-900 text-white p-6 rounded-lg ${className}`}>
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Advanced Context Compression Flow</h2>
          <p className="text-gray-400">Multi-agent compression coordination with semantic preservation</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseSimulation : startSimulation}
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
            onClick={resetSimulation}
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
          <span className="text-sm font-medium text-gray-300">Compression Progress</span>
          <span className="text-sm text-gray-400">{currentStep + 1} / {compressionSteps.length}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / compressionSteps.length) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-blue-400">
          {compressionSteps[currentStep]?.name}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compression Agents */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Multi-Agent Compression Network
          </h3>
          
          <div className="grid gap-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`p-4 rounded-lg border transition-all ${
                  agent.status === 'idle'
                    ? 'border-gray-600 bg-gray-700/30'
                    : agent.status === 'analyzing'
                    ? 'border-blue-500 bg-blue-500/10'
                    : agent.status === 'compressing'
                    ? 'border-yellow-500 bg-yellow-500/10'
                    : agent.status === 'validating'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-green-500 bg-green-500/10'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <agent.icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-sm text-gray-400">{agent.specialty}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    agent.status === 'idle'
                      ? 'bg-gray-600 text-gray-300'
                      : agent.status === 'analyzing'
                      ? 'bg-blue-600 text-blue-100'
                      : agent.status === 'compressing'
                      ? 'bg-yellow-600 text-yellow-100'
                      : agent.status === 'validating'
                      ? 'bg-purple-600 text-purple-100'
                      : 'bg-green-600 text-green-100'
                  }`}>
                    {agent.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="text-center p-2 bg-gray-800/30 rounded">
                    <div className="font-semibold text-blue-400">{agent.inputTokens.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Input Tokens</div>
                  </div>
                  <div className="text-center p-2 bg-gray-800/30 rounded">
                    <div className="font-semibold text-green-400">
                      {agent.outputTokens > 0 ? agent.outputTokens.toLocaleString() : '-'}
                    </div>
                    <div className="text-xs text-gray-400">Output Tokens</div>
                  </div>
                  <div className="text-center p-2 bg-gray-800/30 rounded">
                    <div className="font-semibold text-yellow-400">
                      {agent.compressionRatio > 0 ? `${agent.compressionRatio}%` : '-'}
                    </div>
                    <div className="text-xs text-gray-400">Compression</div>
                  </div>
                  <div className="text-center p-2 bg-gray-800/30 rounded">
                    <div className="font-semibold text-purple-400">
                      {agent.qualityScore > 0 ? `${agent.qualityScore}%` : '-'}
                    </div>
                    <div className="text-xs text-gray-400">Quality</div>
                  </div>
                </div>

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

        {/* System Metrics & Current Step */}
        <div className="space-y-6">
          {/* Overall Metrics */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-green-400" />
              System Metrics
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Input:</span>
                <span className="font-medium">{systemMetrics.totalInputTokens.toLocaleString()} tokens</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Output:</span>
                <span className="font-medium text-green-400">{systemMetrics.totalOutputTokens.toLocaleString()} tokens</span>
              </div>
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
                <span className="font-medium text-blue-400">{systemMetrics.processingTime}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cost Reduction:</span>
                <span className="font-medium text-green-400">{systemMetrics.costReduction}%</span>
              </div>
            </div>
          </div>

          {/* Current Step Info */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-orange-400" />
              Current Step
            </h3>
            
            <div className="space-y-3">
              <div className="font-medium text-orange-400">{compressionSteps[currentStep]?.name}</div>
              <div className="text-sm text-gray-300">{compressionSteps[currentStep]?.description}</div>
              
              <div className="pt-2 border-t border-gray-700">
                <div className="text-xs text-gray-400 mb-2">Active Agents:</div>
                <div className="flex flex-wrap gap-1">
                  {compressionSteps[currentStep]?.activeAgents.map(agentId => {
                    const agent = agents.find(a => a.id === agentId);
                    return (
                      <span key={agentId} className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">
                        {agent?.name.split(' ')[0]}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">Key Benefits</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-gray-300">73% reduction in context size</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-gray-300">94% semantic fidelity preserved</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-gray-300">5.6x faster processing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-gray-300">82% cost reduction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedContextCompressionFlow;