'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Server, Cpu, Database, Zap, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react';

interface CapabilityMatch {
  nodeType: string;
  matchScore: number;
  reasoning: string[];
  utilization: number;
  availableCapacity: number;
}

interface ResourceRequirements {
  compute: 'low' | 'medium' | 'high' | 'extreme';
  memory: 'low' | 'medium' | 'high' | 'extreme';
  parallelization: 'none' | 'low' | 'medium' | 'high';
  latency: 'flexible' | 'standard' | 'low' | 'real-time';
  specialization: 'general' | 'ml' | 'data' | 'media';
}

interface WorkloadScenario {
  id: string;
  title: string;
  description: string;
  workload: string;
  requirements: ResourceRequirements;
  expectedHandler: string;
  complexity: 'Low' | 'Medium' | 'High' | 'Extreme';
}

interface CapabilityNode {
  id: string;
  name: string;
  type: 'cpu' | 'memory' | 'gpu' | 'specialized';
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
  specs: {
    cores?: number;
    memory?: string;
    gpu?: string;
    specialization?: string;
  };
  currentUtilization: number;
  capabilities: string[];
  strengths: string[];
}

const CAPABILITY_NODES: CapabilityNode[] = [
  {
    id: 'cpu-intensive',
    name: 'CPU-Intensive Cluster',
    type: 'cpu',
    icon: <Cpu className="w-5 h-5" />,
    color: 'text-green-400',
    backgroundColor: 'bg-green-900/20 border-green-500/30',
    specs: {
      cores: 128,
      memory: '512GB',
      specialization: 'High-frequency computing'
    },
    currentUtilization: 65,
    capabilities: ['Heavy computation', 'Mathematical processing', 'Batch processing', 'CPU-bound tasks'],
    strengths: ['High core count', 'Fast single-thread performance', 'Optimized for CPU workloads']
  },
  {
    id: 'memory-optimized',
    name: 'Memory-Optimized Cluster',
    type: 'memory',
    icon: <Database className="w-5 h-5" />,
    color: 'text-blue-400',
    backgroundColor: 'bg-blue-900/20 border-blue-500/30',
    specs: {
      cores: 64,
      memory: '2TB',
      specialization: 'Large dataset processing'
    },
    currentUtilization: 40,
    capabilities: ['Large dataset handling', 'In-memory processing', 'Data caching', 'Memory-intensive tasks'],
    strengths: ['Massive RAM capacity', 'Fast memory access', 'Optimized for data-heavy workloads']
  },
  {
    id: 'gpu-accelerated',
    name: 'GPU-Accelerated Cluster',
    type: 'gpu',
    icon: <Zap className="w-5 h-5" />,
    color: 'text-purple-400',
    backgroundColor: 'bg-purple-900/20 border-purple-500/30',
    specs: {
      cores: 32,
      memory: '256GB',
      gpu: '8x NVIDIA V100',
      specialization: 'Parallel processing'
    },
    currentUtilization: 75,
    capabilities: ['ML training', 'Parallel processing', 'Matrix operations', 'Deep learning inference'],
    strengths: ['Massive parallel compute', 'Optimized for ML/AI', 'High memory bandwidth']
  },
  {
    id: 'specialized-node',
    name: 'Specialized Processing',
    type: 'specialized',
    icon: <Server className="w-5 h-5" />,
    color: 'text-pink-400',
    backgroundColor: 'bg-pink-900/20 border-pink-500/30',
    specs: {
      cores: 16,
      memory: '128GB',
      specialization: 'FPGA/ASIC processing'
    },
    currentUtilization: 30,
    capabilities: ['Custom hardware acceleration', 'Low-latency processing', 'Specialized algorithms', 'Edge computing'],
    strengths: ['Ultra-low latency', 'Custom optimization', 'Power efficient']
  }
];

const WORKLOAD_SCENARIOS: WorkloadScenario[] = [
  {
    id: 'ml-training',
    title: 'Deep Learning Model Training',
    description: 'Train a large transformer model on 50GB dataset',
    workload: 'Training GPT-style model with 1.5B parameters on text corpus. Requires distributed training with gradient synchronization.',
    requirements: {
      compute: 'extreme',
      memory: 'high',
      parallelization: 'high',
      latency: 'flexible',
      specialization: 'ml'
    },
    expectedHandler: 'gpu-accelerated',
    complexity: 'Extreme'
  },
  {
    id: 'data-analytics',
    title: 'Large-Scale Data Analytics',
    description: 'Process and analyze 10TB customer data for insights',
    workload: 'Aggregate customer transaction data across multiple years. Complex JOIN operations and statistical analysis.',
    requirements: {
      compute: 'medium',
      memory: 'extreme',
      parallelization: 'medium',
      latency: 'standard',
      specialization: 'data'
    },
    expectedHandler: 'memory-optimized',
    complexity: 'High'
  },
  {
    id: 'scientific-computing',
    title: 'Monte Carlo Simulation',
    description: 'Run 1 million iterations of financial risk simulation',
    workload: 'Monte Carlo simulation for portfolio risk analysis. CPU-intensive mathematical computations with minimal memory requirements.',
    requirements: {
      compute: 'extreme',
      memory: 'low',
      parallelization: 'medium',
      latency: 'standard',
      specialization: 'general'
    },
    expectedHandler: 'cpu-intensive',
    complexity: 'High'
  },
  {
    id: 'real-time-inference',
    title: 'Real-Time AI Inference',
    description: 'Serve ML model predictions with <10ms latency',
    workload: 'Real-time inference for fraud detection API. Requires ultra-low latency with consistent performance.',
    requirements: {
      compute: 'medium',
      memory: 'medium',
      parallelization: 'low',
      latency: 'real-time',
      specialization: 'ml'
    },
    expectedHandler: 'specialized-node',
    complexity: 'Medium'
  },
  {
    id: 'batch-processing',
    title: 'Batch Data Processing',
    description: 'Process daily ETL pipeline for data warehouse',
    workload: 'Transform and load 500GB of daily transaction data. Compute-intensive data cleaning and aggregation.',
    requirements: {
      compute: 'high',
      memory: 'medium',
      parallelization: 'medium',
      latency: 'flexible',
      specialization: 'data'
    },
    expectedHandler: 'cpu-intensive',
    complexity: 'Medium'
  }
];

export const CapabilityRoutingDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(WORKLOAD_SCENARIOS[0]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [capabilityMatches, setCapabilityMatches] = useState<CapabilityMatch[]>([]);
  const [selectedNode, setSelectedNode] = useState<CapabilityNode | null>(null);
  const [routingDecision, setRoutingDecision] = useState<string>('');
  const [finalResult, setFinalResult] = useState<string>('');
  const [speed, setSpeed] = useState(2);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const resetDemo = useCallback(() => {
    setCurrentPhase('');
    setIsRunning(false);
    setCapabilityMatches([]);
    setSelectedNode(null);
    setRoutingDecision('');
    setFinalResult('');
    setExecutionLog([]);
  }, []);

  useEffect(() => {
    resetDemo();
  }, [selectedScenario, resetDemo]);

  const calculateCapabilityMatch = (scenario: WorkloadScenario, node: CapabilityNode): CapabilityMatch => {
    let score = 0;
    const reasoning: string[] = [];

    // Compute requirements scoring
    const computeMap = { 'low': 1, 'medium': 2, 'high': 3, 'extreme': 4 };
    const requiredCompute = computeMap[scenario.requirements.compute];
    
    if (node.type === 'cpu' && requiredCompute >= 3) {
      score += 30;
      reasoning.push('High compute requirements match CPU cluster strengths');
    } else if (node.type === 'gpu' && scenario.requirements.specialization === 'ml') {
      score += 35;
      reasoning.push('ML workload perfectly suited for GPU acceleration');
    } else if (node.type === 'memory' && scenario.requirements.memory === 'extreme') {
      score += 40;
      reasoning.push('Extreme memory requirements match memory-optimized cluster');
    } else if (node.type === 'specialized' && scenario.requirements.latency === 'real-time') {
      score += 35;
      reasoning.push('Real-time latency requirements match specialized hardware');
    }

    // Parallelization scoring
    if (scenario.requirements.parallelization === 'high' && node.type === 'gpu') {
      score += 25;
      reasoning.push('High parallelization requirements suit GPU architecture');
    }

    // Current utilization penalty
    const utilizationPenalty = Math.floor(node.currentUtilization / 20) * 5;
    score -= utilizationPenalty;
    if (utilizationPenalty > 0) {
      reasoning.push(`Current utilization (${node.currentUtilization}%) reduces availability`);
    }

    // Specialization bonus
    if (scenario.requirements.specialization === 'ml' && node.type === 'gpu') {
      score += 20;
      reasoning.push('ML specialization aligns with GPU capabilities');
    } else if (scenario.requirements.specialization === 'data' && node.type === 'memory') {
      score += 20;
      reasoning.push('Data processing specialization suits memory-optimized cluster');
    }

    return {
      nodeType: node.id,
      matchScore: Math.max(0, Math.min(100, score)),
      reasoning,
      utilization: node.currentUtilization,
      availableCapacity: 100 - node.currentUtilization
    };
  };

  const generateResult = (scenario: WorkloadScenario, selectedNode: CapabilityNode): string => {
    const results: { [key: string]: { [key: string]: string } } = {
      'ml-training': {
        'gpu-accelerated': '**ML Training Deployment Results:**\n\n• **Cluster Allocation**: 6x NVIDIA V100 GPUs (2 reserved for failover)\n• **Training Configuration**: Distributed training with data parallelism\n• **Memory Allocation**: 192GB VRAM total, 256GB system RAM\n• **Expected Performance**:\n  - Training time: 18-24 hours for full dataset\n  - Throughput: 1,200 samples/second\n  - GPU utilization: 95%+ sustained\n• **Optimization Applied**:\n  - Mixed precision training enabled\n  - Gradient accumulation: 4 steps\n  - Dynamic batch sizing based on memory\n• **Monitoring**: Real-time loss tracking, gradient norm monitoring\n• **Cost Efficiency**: $2.50/GPU-hour (15% better than baseline)\n\n*Optimal routing achieved: 94% capability match*',
      },
      'data-analytics': {
        'memory-optimized': '**Data Analytics Deployment Results:**\n\n• **Memory Allocation**: 1.5TB RAM allocated (75% of available)\n• **Processing Strategy**: In-memory columnar processing\n• **Query Optimization**: Vectorized operations, predicate pushdown\n• **Expected Performance**:\n  - Processing time: 45 minutes for full 10TB dataset\n  - Memory efficiency: 92%\n  - Query response: <2 seconds for aggregations\n• **Data Pipeline**:\n  - Parallel data loading: 8 streams\n  - Compression ratio: 4:1 with columnar format\n  - Index optimization: Bitmap and bloom filters\n• **Scaling**: Auto-scaling based on memory pressure\n• **Cost**: $0.08/GB processed (industry leading)\n\n*Memory-optimized routing: 89% efficiency gain*',
      },
      'scientific-computing': {
        'cpu-intensive': '**Scientific Computing Deployment:**\n\n• **CPU Allocation**: 96 cores allocated (75% of cluster)\n• **Simulation Configuration**: 1M Monte Carlo iterations\n• **Parallelization**: OpenMP with 96 threads\n• **Expected Performance**:\n  - Completion time: 2.5 hours\n  - CPU utilization: 98% sustained\n  - Iterations/second: 111,111\n• **Numerical Optimization**:\n  - AVX-512 vectorization enabled\n  - Memory prefetching optimized\n  - Cache-friendly data structures\n• **Results Quality**: 99.99% confidence intervals\n• **Resource Efficiency**: 96% compute utilization\n\n*CPU-intensive routing delivers maximum computational throughput*',
      },
      'real-time-inference': {
        'specialized-node': '**Real-Time Inference Deployment:**\n\n• **Hardware**: FPGA-accelerated inference engine\n• **Latency Achievement**: 6.8ms average (target: <10ms)\n• **Throughput**: 50,000 requests/second sustained\n• **Model Optimization**:\n  - INT8 quantization applied\n  - Custom FPGA overlay for neural network\n  - Pipeline depth: 4 stages\n• **Performance Metrics**:\n  - 99.9th percentile: 8.2ms\n  - Jitter: <0.5ms\n  - Availability: 99.99%\n• **Power Efficiency**: 45W total (90% better than GPU)\n• **Auto-scaling**: Dynamic batching based on load\n\n*Specialized hardware delivers ultra-low latency requirements*',
      }
    };

    const nodeResults = results[scenario.id];
    return nodeResults?.[selectedNode.id] || `**${scenario.title} Processing Complete**\n\nDeployed on ${selectedNode.name} with optimized configuration for the workload requirements. Performance metrics and resource utilization optimized for this specific use case.`;
  };

  const runCapabilityRouting = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🚀 Starting capability-based routing analysis...']);

    // Phase 1: Task Analysis
    setCurrentPhase('analysis');
    setExecutionLog(prev => [...prev, '📋 Analyzing workload requirements...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));
    
    setExecutionLog(prev => [...prev, `✅ Workload: ${selectedScenario.title}`]);
    setExecutionLog(prev => [...prev, `✅ Compute: ${selectedScenario.requirements.compute}, Memory: ${selectedScenario.requirements.memory}`]);
    setExecutionLog(prev => [...prev, `✅ Latency: ${selectedScenario.requirements.latency}, Specialization: ${selectedScenario.requirements.specialization}`]);

    // Phase 2: Capability Discovery
    setCurrentPhase('discovery');
    setExecutionLog(prev => [...prev, '🔍 Scanning available capability nodes...']);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Calculate matches for all nodes
    const matches = CAPABILITY_NODES.map(node => calculateCapabilityMatch(selectedScenario, node));
    setCapabilityMatches(matches);
    setExecutionLog(prev => [...prev, `✅ Found ${CAPABILITY_NODES.length} available capability nodes`]);

    // Phase 3: Capability Matching
    setCurrentPhase('matching');
    setExecutionLog(prev => [...prev, '🎯 Evaluating capability matches...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    const bestMatch = matches.reduce((best, current) => 
      current.matchScore > best.matchScore ? current : best
    );
    const bestNode = CAPABILITY_NODES.find(n => n.id === bestMatch.nodeType)!;
    setSelectedNode(bestNode);
    
    setExecutionLog(prev => [...prev, `✅ Best match: ${bestNode.name} (${bestMatch.matchScore}% compatibility)`]);

    // Phase 4: Load Balancing
    setCurrentPhase('balancing');
    setExecutionLog(prev => [...prev, '⚖️ Optimizing resource allocation...']);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    const decision = `Routing to ${bestNode.name}: ${bestMatch.matchScore}% match with ${bestMatch.availableCapacity}% available capacity`;
    setRoutingDecision(decision);
    setExecutionLog(prev => [...prev, `✅ ${decision}`]);

    // Phase 5: Deployment
    setCurrentPhase('deployment');
    setExecutionLog(prev => [...prev, `🚀 Deploying workload to ${bestNode.name}...`]);
    await new Promise(resolve => setTimeout(resolve, 2000 / speed));

    const result = generateResult(selectedScenario, bestNode);
    setFinalResult(result);
    setExecutionLog(prev => [...prev, `✅ Deployment complete on ${bestNode.name}`]);

    setCurrentPhase('complete');
    setIsRunning(false);
    setExecutionLog(prev => [...prev, '🎯 Capability routing completed successfully!']);
  }, [selectedScenario, speed]);

  const getPhaseStatus = (phase: string) => {
    if (currentPhase === phase) return 'border-blue-500 bg-blue-900/20';
    if (capabilityMatches.length > 0 && (phase === 'analysis' || phase === 'discovery' || (selectedNode && (phase === 'matching' || (routingDecision && phase === 'balancing'))))) {
      return 'border-green-500 bg-green-900/20';
    }
    return 'border-gray-600 bg-gray-800/20';
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">⚡</span>
          Capability Routing Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how workloads are analyzed and routed to optimal capability nodes based on resource requirements and system capacity.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Workload Scenario
            </label>
            <select
              value={selectedScenario.id}
              onChange={(e) => {
                const scenario = WORKLOAD_SCENARIOS.find(s => s.id === e.target.value);
                if (scenario) setSelectedScenario(scenario);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {WORKLOAD_SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Routing Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <button
                onClick={runCapabilityRouting}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Routing...' : 'Start Routing'}
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

        {/* Scenario Details */}
        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
          <h4 className="font-medium text-white mb-2">Workload: {selectedScenario.title}</h4>
          <p className="text-gray-300 text-sm mb-3">{selectedScenario.workload}</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Compute</div>
              <div className="text-white font-medium capitalize">{selectedScenario.requirements.compute}</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Memory</div>
              <div className="text-white font-medium capitalize">{selectedScenario.requirements.memory}</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Parallelization</div>
              <div className="text-white font-medium capitalize">{selectedScenario.requirements.parallelization}</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Latency</div>
              <div className="text-white font-medium capitalize">{selectedScenario.requirements.latency}</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Specialization</div>
              <div className="text-white font-medium capitalize">{selectedScenario.requirements.specialization}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Routing Pipeline */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Capability Routing Pipeline</h3>
          
          {/* Routing Phases */}
          <div className="space-y-4 mb-6">
            {/* Workload Analysis */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('analysis')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Workload Requirement Analysis
                </h4>
                {currentPhase === 'analysis' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {capabilityMatches.length > 0 && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {currentPhase !== '' && (
                <div className="text-sm text-gray-300">
                  <div><span className="text-gray-400">Complexity:</span> <span className="text-orange-400">{selectedScenario.complexity}</span></div>
                  <div><span className="text-gray-400">Expected Handler:</span> <span className="text-blue-400">{selectedScenario.expectedHandler}</span></div>
                </div>
              )}
            </div>

            {/* Capability Discovery */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('discovery')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Capability Node Discovery
                </h4>
                {currentPhase === 'discovery' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {capabilityMatches.length > 0 && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {capabilityMatches.length > 0 && (
                <div className="text-sm text-gray-300">
                  <div className="mb-2">Available nodes discovered with current utilization:</div>
                  <div className="flex flex-wrap gap-2">
                    {CAPABILITY_NODES.map(node => (
                      <span key={node.id} className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {node.name}: {node.currentUtilization}%
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Capability Matching */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('matching')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Capability Match Scoring
                </h4>
                {currentPhase === 'matching' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {selectedNode && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {capabilityMatches.length > 0 && (
                <div className="space-y-2">
                  {capabilityMatches
                    .sort((a, b) => b.matchScore - a.matchScore)
                    .map((match, idx) => {
                      const node = CAPABILITY_NODES.find(n => n.id === match.nodeType)!;
                      const isSelected = selectedNode?.id === match.nodeType;
                      return (
                        <div key={match.nodeType} className={`p-2 rounded text-sm ${isSelected ? 'bg-blue-900/30 border border-blue-500/50' : 'bg-gray-800/30'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <div className={`p-1 rounded ${node.color === 'text-green-400' ? 'bg-green-600' : node.color === 'text-blue-400' ? 'bg-blue-600' : node.color === 'text-purple-400' ? 'bg-purple-600' : 'bg-pink-600'}`}>
                                {node.icon}
                              </div>
                              <span className="text-white font-medium">{node.name}</span>
                              {isSelected && <span className="text-xs bg-blue-600 px-1 py-0.5 rounded">SELECTED</span>}
                            </div>
                            <span className={`font-medium ${match.matchScore >= 80 ? 'text-green-400' : match.matchScore >= 60 ? 'text-yellow-400' : 'text-gray-400'}`}>
                              {match.matchScore}%
                            </span>
                          </div>
                          {isSelected && match.reasoning.length > 0 && (
                            <div className="text-xs text-gray-300">
                              {match.reasoning.slice(0, 2).map((reason, i) => (
                                <div key={i}>• {reason}</div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Load Balancing */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('balancing')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Load Balancing & Optimization
                </h4>
                {currentPhase === 'balancing' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {routingDecision && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {routingDecision && (
                <div className="text-sm text-gray-300">
                  {routingDecision}
                </div>
              )}
            </div>
          </div>

          {/* Available Capability Nodes */}
          <div>
            <h4 className="font-medium text-white mb-3">Available Capability Nodes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CAPABILITY_NODES.map((node) => {
                const match = capabilityMatches.find(m => m.nodeType === node.id);
                const isSelected = selectedNode?.id === node.id;
                
                return (
                  <div
                    key={node.id}
                    className={`p-3 rounded-lg border transition-all ${
                      isSelected 
                        ? node.backgroundColor + ' border-opacity-100' 
                        : 'border-gray-600 bg-gray-800/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${node.color === 'text-green-400' ? 'bg-green-600' : node.color === 'text-blue-400' ? 'bg-blue-600' : node.color === 'text-purple-400' ? 'bg-purple-600' : 'bg-pink-600'}`}>
                          {node.icon}
                        </div>
                        <div className="font-medium text-white text-sm">{node.name}</div>
                      </div>
                      {match && (
                        <div className={`text-xs font-medium px-2 py-1 rounded ${match.matchScore >= 80 ? 'bg-green-600' : match.matchScore >= 60 ? 'bg-yellow-600' : 'bg-gray-600'}`}>
                          {match.matchScore}%
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-300 mb-2">
                      <div className="mb-1">Specs: {Object.entries(node.specs).map(([k, v]) => `${k}: ${v}`).join(', ')}</div>
                      <div className="flex items-center gap-2">
                        <span>Utilization: {node.currentUtilization}%</span>
                        <div className="w-16 h-1.5 bg-gray-700 rounded-full">
                          <div 
                            className={`h-full rounded-full ${node.currentUtilization > 80 ? 'bg-red-500' : node.currentUtilization > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${node.currentUtilization}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Strengths: {node.strengths.slice(0, 2).join(', ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Process Log & Results */}
        <div className="space-y-6">
          {/* Process Log */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Process Log</h3>
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-64 overflow-y-auto">
              {executionLog.length === 0 ? (
                <div className="text-gray-400 text-center text-sm mt-8">
                  Process log will appear here...
                </div>
              ) : (
                <div className="space-y-1">
                  {executionLog.map((log, index) => (
                    <div key={index} className="text-sm text-gray-300 font-mono">
                      <span className="text-gray-500 mr-2">{String(index + 1).padStart(2, '0')}.</span>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Deployment Results */}
          {finalResult && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Deployment Results</h3>
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  {selectedNode?.icon}
                  <span className="font-medium text-white">Deployed on {selectedNode?.name}</span>
                  <span className="text-xs bg-green-600 px-2 py-1 rounded">OPTIMIZED</span>
                </div>
                <div className="text-sm text-gray-200 whitespace-pre-line">
                  {finalResult}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CapabilityRoutingDemo;