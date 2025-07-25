import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, AlertTriangle, CheckCircle, TrendingUp, Settings, Zap, Shield, DollarSign } from 'lucide-react';

interface Constraint {
  id: string;
  type: 'hard' | 'soft' | 'optimization';
  description: string;
  satisfied: boolean;
  score?: number;
  weight: number;
}

interface Variable {
  id: string;
  name: string;
  domain: string[];
  currentValue?: string;
  constraints: string[];
}

interface Solution {
  id: string;
  assignments: { [key: string]: string };
  hardConstraintsSatisfied: boolean;
  softConstraintScore: number;
  optimizationScore: number;
  totalScore: number;
  cost: number;
  performance: number;
  reliability: number;
}

interface CSPScenario {
  id: string;
  name: string;
  description: string;
  problem: string;
  variables: Variable[];
  constraints: Constraint[];
  solutions: Solution[];
  currentSolution?: Solution;
  searchProgress: number;
  algorithm: string;
}

const ConstraintSatisfactionDemo: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchProgress, setSearchProgress] = useState(0);
  const [activeAlgorithm, setActiveAlgorithm] = useState('backtracking');

  const scenarios: CSPScenario[] = [
    {
      id: 'ai-agent-deployment',
      name: 'AI Agent Deployment',
      description: 'Deploy 5 AI agents across 3 servers with resource and compliance constraints',
      problem: 'Optimize agent deployment while satisfying server capacity, dependencies, and regulatory requirements',
      variables: [
        { id: 'agent1', name: 'ML Agent A1', domain: ['ServerA', 'ServerB', 'ServerC'], constraints: ['memory', 'dependency'] },
        { id: 'agent2', name: 'NLP Agent A2', domain: ['ServerA', 'ServerB', 'ServerC'], constraints: ['memory', 'dependency'] },
        { id: 'agent3', name: 'CV Agent A3', domain: ['ServerA', 'ServerB', 'ServerC'], constraints: ['memory', 'compliance'] },
        { id: 'agent4', name: 'Analytics A4', domain: ['ServerA', 'ServerB', 'ServerC'], constraints: ['memory', 'performance'] },
        { id: 'agent5', name: 'API Gateway A5', domain: ['ServerA', 'ServerB', 'ServerC'], constraints: ['memory', 'redundancy'] }
      ],
      constraints: [
        { id: 'memory-a', type: 'hard', description: 'Server A: Max 8GB RAM', satisfied: true, weight: 1.0 },
        { id: 'memory-b', type: 'hard', description: 'Server B: Max 4GB RAM', satisfied: true, weight: 1.0 },
        { id: 'memory-c', type: 'hard', description: 'Server C: Max 12GB RAM', satisfied: true, weight: 1.0 },
        { id: 'dependency', type: 'hard', description: 'A1 and A2 must be on same server', satisfied: true, weight: 1.0 },
        { id: 'compliance', type: 'hard', description: 'A3 must be in EU region (Server A)', satisfied: true, weight: 1.0 },
        { id: 'latency', type: 'soft', description: 'Prefer latency < 100ms', satisfied: true, score: 0.8, weight: 0.7 },
        { id: 'load-balance', type: 'soft', description: 'Balance load across servers', satisfied: true, score: 0.6, weight: 0.5 },
        { id: 'cost', type: 'optimization', description: 'Minimize total cost', satisfied: true, score: 0.75, weight: 0.8 },
        { id: 'performance', type: 'optimization', description: 'Maximize performance', satisfied: true, score: 0.85, weight: 0.9 }
      ],
      solutions: [
        {
          id: 'solution1',
          assignments: { agent1: 'ServerA', agent2: 'ServerA', agent3: 'ServerA', agent4: 'ServerC', agent5: 'ServerC' },
          hardConstraintsSatisfied: true,
          softConstraintScore: 0.72,
          optimizationScore: 0.80,
          totalScore: 0.77,
          cost: 847,
          performance: 92,
          reliability: 88
        }
      ],
      searchProgress: 0,
      algorithm: 'backtracking'
    },
    {
      id: 'resource-scheduling',
      name: 'Multi-Agent Resource Scheduling',
      description: 'Schedule computational resources for multiple AI agents with temporal and capacity constraints',
      problem: 'Allocate GPU clusters to AI training jobs while respecting deadlines and resource limits',
      variables: [
        { id: 'job1', name: 'LLM Training Job 1', domain: ['GPU-Cluster-A', 'GPU-Cluster-B', 'GPU-Cluster-C'], constraints: ['memory', 'time'] },
        { id: 'job2', name: 'Image Processing Job 2', domain: ['GPU-Cluster-A', 'GPU-Cluster-B', 'GPU-Cluster-C'], constraints: ['memory', 'time'] },
        { id: 'job3', name: 'Inference Service Job 3', domain: ['GPU-Cluster-A', 'GPU-Cluster-B', 'GPU-Cluster-C'], constraints: ['latency', 'availability'] },
        { id: 'job4', name: 'Data Analysis Job 4', domain: ['GPU-Cluster-A', 'GPU-Cluster-B', 'GPU-Cluster-C'], constraints: ['memory', 'cost'] }
      ],
      constraints: [
        { id: 'gpu-capacity-a', type: 'hard', description: 'Cluster A: Max 8 GPUs', satisfied: true, weight: 1.0 },
        { id: 'gpu-capacity-b', type: 'hard', description: 'Cluster B: Max 4 GPUs', satisfied: true, weight: 1.0 },
        { id: 'gpu-capacity-c', type: 'hard', description: 'Cluster C: Max 12 GPUs', satisfied: true, weight: 1.0 },
        { id: 'deadline-j1', type: 'hard', description: 'Job 1: Complete by 6PM', satisfied: true, weight: 1.0 },
        { id: 'deadline-j2', type: 'hard', description: 'Job 2: Complete by 8PM', satisfied: true, weight: 1.0 },
        { id: 'power-limit', type: 'soft', description: 'Total power < 50kW', satisfied: true, score: 0.9, weight: 0.8 },
        { id: 'cooling', type: 'soft', description: 'Thermal management', satisfied: true, score: 0.7, weight: 0.6 },
        { id: 'efficiency', type: 'optimization', description: 'Maximize GPU utilization', satisfied: true, score: 0.82, weight: 0.9 },
        { id: 'cost-efficiency', type: 'optimization', description: 'Minimize energy cost', satisfied: true, score: 0.76, weight: 0.7 }
      ],
      solutions: [
        {
          id: 'solution1',
          assignments: { job1: 'GPU-Cluster-C', job2: 'GPU-Cluster-A', job3: 'GPU-Cluster-B', job4: 'GPU-Cluster-C' },
          hardConstraintsSatisfied: true,
          softConstraintScore: 0.80,
          optimizationScore: 0.79,
          totalScore: 0.80,
          cost: 1250,
          performance: 89,
          reliability: 91
        }
      ],
      searchProgress: 0,
      algorithm: 'forward-checking'
    },
    {
      id: 'workflow-orchestration',
      name: 'AI Workflow Orchestration',
      description: 'Orchestrate complex AI workflow with dependencies and service level agreements',
      problem: 'Schedule AI pipeline stages across distributed infrastructure while meeting SLA requirements',
      variables: [
        { id: 'data-prep', name: 'Data Preparation', domain: ['Node1', 'Node2', 'Node3', 'Node4'], constraints: ['io-bandwidth', 'storage'] },
        { id: 'feature-eng', name: 'Feature Engineering', domain: ['Node1', 'Node2', 'Node3', 'Node4'], constraints: ['cpu', 'memory'] },
        { id: 'model-train', name: 'Model Training', domain: ['Node1', 'Node2', 'Node3', 'Node4'], constraints: ['gpu', 'memory'] },
        { id: 'validation', name: 'Model Validation', domain: ['Node1', 'Node2', 'Node3', 'Node4'], constraints: ['cpu', 'dependencies'] },
        { id: 'deployment', name: 'Model Deployment', domain: ['Node1', 'Node2', 'Node3', 'Node4'], constraints: ['network', 'redundancy'] }
      ],
      constraints: [
        { id: 'pipeline-order', type: 'hard', description: 'Maintain pipeline dependencies', satisfied: true, weight: 1.0 },
        { id: 'sla-latency', type: 'hard', description: 'End-to-end latency < 4 hours', satisfied: true, weight: 1.0 },
        { id: 'fault-tolerance', type: 'hard', description: 'No single point of failure', satisfied: true, weight: 1.0 },
        { id: 'data-locality', type: 'soft', description: 'Minimize data movement', satisfied: true, score: 0.85, weight: 0.8 },
        { id: 'load-distribution', type: 'soft', description: 'Even load distribution', satisfied: true, score: 0.75, weight: 0.6 },
        { id: 'throughput', type: 'optimization', description: 'Maximize pipeline throughput', satisfied: true, score: 0.88, weight: 0.9 },
        { id: 'resource-efficiency', type: 'optimization', description: 'Optimize resource utilization', satisfied: true, score: 0.81, weight: 0.8 }
      ],
      solutions: [
        {
          id: 'solution1',
          assignments: { 'data-prep': 'Node1', 'feature-eng': 'Node2', 'model-train': 'Node3', 'validation': 'Node2', 'deployment': 'Node4' },
          hardConstraintsSatisfied: true,
          softConstraintScore: 0.80,
          optimizationScore: 0.845,
          totalScore: 0.82,
          cost: 1890,
          performance: 87,
          reliability: 93
        }
      ],
      searchProgress: 0,
      algorithm: 'arc-consistency'
    },
    {
      id: 'multi-tenant-allocation',
      name: 'Multi-Tenant Resource Allocation',
      description: 'Allocate shared AI infrastructure across multiple tenants with isolation and SLA requirements',
      problem: 'Distribute compute resources fairly while maintaining tenant isolation and meeting individual SLAs',
      variables: [
        { id: 'tenant-a', name: 'Enterprise Tenant A', domain: ['Partition1', 'Partition2', 'Partition3'], constraints: ['sla', 'isolation'] },
        { id: 'tenant-b', name: 'Startup Tenant B', domain: ['Partition1', 'Partition2', 'Partition3'], constraints: ['cost', 'burst'] },
        { id: 'tenant-c', name: 'Research Tenant C', domain: ['Partition1', 'Partition2', 'Partition3'], constraints: ['gpu-access', 'flexibility'] },
        { id: 'tenant-d', name: 'Government Tenant D', domain: ['Partition1', 'Partition2', 'Partition3'], constraints: ['security', 'compliance'] }
      ],
      constraints: [
        { id: 'isolation-guarantee', type: 'hard', description: 'Perfect tenant isolation', satisfied: true, weight: 1.0 },
        { id: 'sla-enterprise', type: 'hard', description: 'Enterprise SLA: 99.9% uptime', satisfied: true, weight: 1.0 },
        { id: 'security-gov', type: 'hard', description: 'Government security requirements', satisfied: true, weight: 1.0 },
        { id: 'cost-startup', type: 'soft', description: 'Startup cost optimization', satisfied: true, score: 0.9, weight: 0.8 },
        { id: 'research-flexibility', type: 'soft', description: 'Research workload flexibility', satisfied: true, score: 0.75, weight: 0.6 },
        { id: 'fairness', type: 'optimization', description: 'Fair resource distribution', satisfied: true, score: 0.83, weight: 0.9 },
        { id: 'utilization', type: 'optimization', description: 'Maximize overall utilization', satisfied: true, score: 0.78, weight: 0.8 }
      ],
      solutions: [
        {
          id: 'solution1',
          assignments: { 'tenant-a': 'Partition1', 'tenant-b': 'Partition2', 'tenant-c': 'Partition3', 'tenant-d': 'Partition1' },
          hardConstraintsSatisfied: true,
          softConstraintScore: 0.825,
          optimizationScore: 0.805,
          totalScore: 0.81,
          cost: 2340,
          performance: 85,
          reliability: 96
        }
      ],
      searchProgress: 0,
      algorithm: 'local-search'
    }
  ];

  const steps = [
    'Problem Analysis & Constraint Identification',
    'Domain Modeling & Variable Definition',
    'Constraint Network Construction',
    'Algorithm Selection & Search Strategy',
    'Solution Space Exploration',
    'Constraint Propagation & Pruning',
    'Solution Validation & Scoring',
    'Multi-objective Optimization & Trade-off Analysis'
  ];

  const algorithms = [
    { id: 'backtracking', name: 'Backtracking Search', description: 'Systematic depth-first search with pruning' },
    { id: 'forward-checking', name: 'Forward Checking', description: 'Early constraint propagation during search' },
    { id: 'arc-consistency', name: 'Arc Consistency', description: 'Preprocessing for constraint propagation' },
    { id: 'local-search', name: 'Local Search', description: 'Min-conflicts heuristic optimization' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % steps.length;
          if (next === 0) {
            setIsRunning(false);
            setSearchProgress(100);
          } else {
            setSearchProgress((next / steps.length) * 100);
          }
          return next;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isRunning, steps.length]);

  const currentScenario = scenarios[currentScenarioIndex];
  const currentSolution = currentScenario.solutions[0];

  const handlePlay = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setSearchProgress(0);
  };

  const handleStepForward = () => {
    setCurrentStep((prev) => {
      const next = (prev + 1) % steps.length;
      setSearchProgress((next / steps.length) * 100);
      return next;
    });
  };

  const handleStepBackward = () => {
    setCurrentStep((prev) => {
      const next = (prev - 1 + steps.length) % steps.length;
      setSearchProgress((next / steps.length) * 100);
      return next;
    });
  };

  const getConstraintColor = (constraint: Constraint) => {
    if (constraint.type === 'hard') {
      return constraint.satisfied ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30';
    } else if (constraint.type === 'soft') {
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    } else {
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-400';
    if (score >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="p-6 bg-gray-900/40 rounded-lg">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={handleStepBackward}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
          >
            ←
          </button>
          <button
            onClick={handleStepForward}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
          >
            →
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex gap-2">
          {scenarios.map((scenario, index) => (
            <button
              key={scenario.id}
              onClick={() => setCurrentScenarioIndex(index)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                index === currentScenarioIndex
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </span>
          <span className="text-sm text-gray-400">
            Search Progress: {searchProgress.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${searchProgress}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Problem & Constraints */}
        <div className="space-y-4">
          {/* Problem Description */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <h4 className="font-semibold text-white">Problem Definition</h4>
            </div>
            <h5 className="font-medium text-white mb-2">{currentScenario.name}</h5>
            <p className="text-gray-300 text-sm mb-2">{currentScenario.description}</p>
            <p className="text-gray-400 text-sm">{currentScenario.problem}</p>
          </div>

          {/* Algorithm Selection */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <div className="flex items-center gap-3 mb-3">
              <Settings className="w-5 h-5 text-blue-400" />
              <h4 className="font-semibold text-white">Active Algorithm</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {algorithms.map((algo) => (
                <button
                  key={algo.id}
                  onClick={() => setActiveAlgorithm(algo.id)}
                  className={`p-2 rounded text-sm transition-colors ${
                    activeAlgorithm === algo.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {algo.name}
                </button>
              ))}
            </div>
            <div className="mt-3 p-3 bg-gray-700/30 rounded">
              <p className="text-sm text-gray-300">
                {algorithms.find(a => a.id === activeAlgorithm)?.description}
              </p>
            </div>
          </div>

          {/* Variables */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <h4 className="font-semibold text-white mb-3">Decision Variables</h4>
            <div className="space-y-2">
              {currentScenario.variables.map((variable) => (
                <div key={variable.id} className="p-2 bg-gray-700/30 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{variable.name}</span>
                    <span className="text-xs text-gray-400">
                      {currentSolution?.assignments[variable.id] || 'Unassigned'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Domain: {variable.domain.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Constraints */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <h4 className="font-semibold text-white mb-3">Constraints</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {currentScenario.constraints.map((constraint) => (
                <div key={constraint.id} className={`p-2 rounded border ${getConstraintColor(constraint)}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{constraint.type.toUpperCase()}</span>
                    <div className="flex items-center gap-2">
                      {constraint.satisfied ? (
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-red-400" />
                      )}
                      {constraint.score && (
                        <span className={`text-xs ${getScoreColor(constraint.score)}`}>
                          {(constraint.score * 100).toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs mt-1">{constraint.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Solution & Analysis */}
        <div className="space-y-4">
          {/* Current Step Details */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <h4 className="font-semibold text-white mb-3">Current Step: {steps[currentStep]}</h4>
            <div className="text-sm text-gray-300 space-y-2">
              {currentStep === 0 && (
                <div>
                  <p><strong>Problem Analysis:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Identify {currentScenario.variables.length} decision variables</li>
                    <li>Catalog {currentScenario.constraints.filter(c => c.type === 'hard').length} hard constraints (mandatory)</li>
                    <li>Identify {currentScenario.constraints.filter(c => c.type === 'soft').length} soft constraints (preferences)</li>
                    <li>Define {currentScenario.constraints.filter(c => c.type === 'optimization').length} optimization objectives</li>
                  </ul>
                </div>
              )}
              {currentStep === 1 && (
                <div>
                  <p><strong>Domain Modeling:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Variables: Agent assignments, resource allocations</li>
                    <li>Domains: Available servers, capacity ranges, time slots</li>
                    <li>Constraint types: Capacity, dependency, compliance, performance</li>
                    <li>Objective functions: Cost, performance, reliability metrics</li>
                  </ul>
                </div>
              )}
              {currentStep === 2 && (
                <div>
                  <p><strong>Constraint Network:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Binary constraints: Variable relationships and dependencies</li>
                    <li>Unary constraints: Domain restrictions and capacity limits</li>
                    <li>Global constraints: Resource allocation and load balancing</li>
                    <li>Preference constraints: Soft constraints with weighted scoring</li>
                  </ul>
                </div>
              )}
              {currentStep === 3 && (
                <div>
                  <p><strong>Algorithm Strategy:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Search strategy: {algorithms.find(a => a.id === activeAlgorithm)?.name}</li>
                    <li>Variable ordering: Most constrained variable first</li>
                    <li>Value ordering: Least constraining value heuristic</li>
                    <li>Constraint propagation: Forward checking and arc consistency</li>
                  </ul>
                </div>
              )}
              {currentStep === 4 && (
                <div>
                  <p><strong>Solution Exploration:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Search tree traversal with intelligent pruning</li>
                    <li>Dead-end detection and backtracking</li>
                    <li>Solution space reduction through constraint propagation</li>
                    <li>Multiple solution candidates generation</li>
                  </ul>
                </div>
              )}
              {currentStep === 5 && (
                <div>
                  <p><strong>Constraint Propagation:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Arc consistency preprocessing</li>
                    <li>Forward checking during variable assignment</li>
                    <li>Domain reduction and constraint tightening</li>
                    <li>Inconsistency detection and resolution</li>
                  </ul>
                </div>
              )}
              {currentStep === 6 && (
                <div>
                  <p><strong>Solution Validation:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Hard constraint verification (must be 100% satisfied)</li>
                    <li>Soft constraint scoring and weighted evaluation</li>
                    <li>Optimization objective calculation</li>
                    <li>Overall solution quality assessment</li>
                  </ul>
                </div>
              )}
              {currentStep === 7 && (
                <div>
                  <p><strong>Multi-objective Optimization:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Trade-off analysis between competing objectives</li>
                    <li>Pareto frontier identification</li>
                    <li>Weighted scoring for final solution ranking</li>
                    <li>Sensitivity analysis for constraint changes</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Solution Quality Metrics */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <h4 className="font-semibold text-white mb-3">Solution Quality</h4>
            {currentSolution && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-gray-700/30 rounded">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-400">Hard</span>
                    </div>
                    <div className="text-sm font-medium text-white">
                      {currentSolution.hardConstraintsSatisfied ? '100%' : '0%'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-700/30 rounded">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-gray-400">Soft</span>
                    </div>
                    <div className={`text-sm font-medium ${getScoreColor(currentSolution.softConstraintScore)}`}>
                      {(currentSolution.softConstraintScore * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-700/30 rounded">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Zap className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-gray-400">Optimization</span>
                    </div>
                    <div className={`text-sm font-medium ${getScoreColor(currentSolution.optimizationScore)}`}>
                      {(currentSolution.optimizationScore * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded border border-green-500/20">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-400">Cost</span>
                    </div>
                    <div className="text-sm font-medium text-white">${currentSolution.cost}</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded border border-blue-500/20">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-gray-400">Performance</span>
                    </div>
                    <div className="text-sm font-medium text-white">{currentSolution.performance}%</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded border border-purple-500/20">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Shield className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-gray-400">Reliability</span>
                    </div>
                    <div className="text-sm font-medium text-white">{currentSolution.reliability}%</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Overall Score</span>
                    <span className={`text-sm font-medium ${getScoreColor(currentSolution.totalScore)}`}>
                      {(currentSolution.totalScore * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${currentSolution.totalScore * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Solution Assignments */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <h4 className="font-semibold text-white mb-3">Current Solution</h4>
            {currentSolution && (
              <div className="space-y-2">
                {Object.entries(currentSolution.assignments).map(([variableId, assignment]) => {
                  const variable = currentScenario.variables.find(v => v.id === variableId);
                  return (
                    <div key={variableId} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                      <span className="text-sm text-white">{variable?.name}</span>
                      <span className="text-sm font-medium text-blue-400">{assignment}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">Constraint Satisfaction Status</span>
          </div>
          <div className="text-sm text-gray-300">
            Algorithm: {algorithms.find(a => a.id === activeAlgorithm)?.name} • 
            Progress: {searchProgress.toFixed(0)}%
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-300">
          <strong>Key Insights:</strong> 
          {searchProgress < 25 && " Initializing constraint satisfaction problem and building search space."}
          {searchProgress >= 25 && searchProgress < 75 && " Actively exploring solution space with constraint propagation and intelligent backtracking."}
          {searchProgress >= 75 && " Solution optimization phase - refining quality through multi-objective analysis."}
        </div>
      </div>
    </div>
  );
};

export default ConstraintSatisfactionDemo;