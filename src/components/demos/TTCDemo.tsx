'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Zap, Brain, Activity, Gauge, Timer, TrendingUp, AlertCircle, CheckCircle, BarChart } from 'lucide-react';

interface Problem {
  id: string;
  query: string;
  complexity: 'low' | 'medium' | 'high' | 'extreme';
  category: string;
  expectedCompute: number; // in FLOPS units
  baselineTime: number; // in ms
  minTokens: number;
  maxTokens: number;
}

interface ComputeAllocation {
  flops: number;
  memory: number;
  iterations: number;
  beamWidth: number;
  temperature: number;
  topK: number;
}

interface ComputeMetrics {
  tokensGenerated: number;
  computeUsed: number;
  timeElapsed: number;
  efficiency: number;
  accuracy: number;
  costEstimate: number;
}

const problems: Problem[] = [
  {
    id: 'simple',
    query: 'What is 2 + 2?',
    complexity: 'low',
    category: 'arithmetic',
    expectedCompute: 100,
    baselineTime: 50,
    minTokens: 1,
    maxTokens: 10
  },
  {
    id: 'moderate',
    query: 'Explain the water cycle in simple terms',
    complexity: 'medium',
    category: 'explanation',
    expectedCompute: 1000,
    baselineTime: 300,
    minTokens: 50,
    maxTokens: 150
  },
  {
    id: 'complex',
    query: 'Design a distributed system for real-time collaborative editing with conflict resolution',
    complexity: 'high',
    category: 'system-design',
    expectedCompute: 10000,
    baselineTime: 2000,
    minTokens: 200,
    maxTokens: 500
  },
  {
    id: 'extreme',
    query: 'Prove or disprove the Riemann Hypothesis with detailed mathematical reasoning',
    complexity: 'extreme',
    category: 'mathematics',
    expectedCompute: 100000,
    baselineTime: 10000,
    minTokens: 500,
    maxTokens: 2000
  }
];

export default function TTCDemo() {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(problems[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'analyzing' | 'allocating' | 'computing' | 'complete'>('idle');
  const [computeAllocation, setComputeAllocation] = useState<ComputeAllocation>({
    flops: 0,
    memory: 0,
    iterations: 1,
    beamWidth: 1,
    temperature: 0.7,
    topK: 40
  });
  const [metrics, setMetrics] = useState<ComputeMetrics>({
    tokensGenerated: 0,
    computeUsed: 0,
    timeElapsed: 0,
    efficiency: 0,
    accuracy: 0,
    costEstimate: 0
  });
  const [showComparison, setShowComparison] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const analyzeComplexity = (problem: Problem): ComputeAllocation => {
    // Dynamically allocate resources based on problem complexity
    let allocation: ComputeAllocation;

    switch (problem.complexity) {
      case 'low':
        allocation = {
          flops: 100,
          memory: 512,
          iterations: 1,
          beamWidth: 1,
          temperature: 0.3,
          topK: 10
        };
        break;
      case 'medium':
        allocation = {
          flops: 1000,
          memory: 2048,
          iterations: 3,
          beamWidth: 3,
          temperature: 0.5,
          topK: 20
        };
        break;
      case 'high':
        allocation = {
          flops: 10000,
          memory: 8192,
          iterations: 10,
          beamWidth: 8,
          temperature: 0.7,
          topK: 40
        };
        break;
      case 'extreme':
        allocation = {
          flops: 100000,
          memory: 32768,
          iterations: 50,
          beamWidth: 16,
          temperature: 0.9,
          topK: 100
        };
        break;
    }

    return allocation;
  };

  const drawComputeVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 800;
    const height = 350; // Increased height for better spacing

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    // Draw compute allocation bars
    const barWidth = 100;
    const barSpacing = 130;
    const startX = 40;
    const baseY = height - 60; // More space for labels
    const maxBarHeight = 200;

    const allocations = [
      { label: 'FLOPS', value: computeAllocation.flops / 1000, max: 100, color: '#3b82f6' },
      { label: 'Memory (GB)', value: computeAllocation.memory / 1024, max: 32, color: '#10b981' },
      { label: 'Iterations', value: computeAllocation.iterations, max: 50, color: '#f59e0b' },
      { label: 'Beam Width', value: computeAllocation.beamWidth, max: 16, color: '#8b5cf6' },
      { label: 'Temperature', value: computeAllocation.temperature, max: 1, color: '#ef4444' }
    ];

    allocations.forEach((alloc, index) => {
      const x = startX + index * barSpacing;
      const barHeight = Math.max(5, (alloc.value / alloc.max) * maxBarHeight);

      // Draw background bar
      ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
      ctx.fillRect(x, baseY - maxBarHeight, barWidth, maxBarHeight);

      // Draw bar with gradient
      const gradient = ctx.createLinearGradient(0, baseY - barHeight, 0, baseY);
      gradient.addColorStop(0, alloc.color);
      gradient.addColorStop(1, alloc.color + '60');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, baseY - barHeight, barWidth, barHeight);

      // Draw border for better visibility
      ctx.strokeStyle = alloc.color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, baseY - barHeight, barWidth, barHeight);

      // Draw value above bar
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      const displayValue = alloc.label === 'Temperature' ? alloc.value.toFixed(1) : Math.round(alloc.value);
      ctx.fillText(displayValue.toString(), x + barWidth / 2, baseY - barHeight - 15);

      // Draw label below bar
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(alloc.label, x + barWidth / 2, baseY + 20);
    });

    // Draw efficiency indicator - positioned to the right of the bars
    if (currentPhase === 'complete' && metrics.efficiency > 0) {
      // Position it after the last bar
      const lastBarX = startX + 4 * barSpacing; // After 5 bars
      const effX = lastBarX + barWidth + 60; // Add spacing after last bar
      const effY = baseY - maxBarHeight / 2; // Center vertically with bars
      const effRadius = 35;

      // Draw background circle
      ctx.beginPath();
      ctx.arc(effX, effY, effRadius, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
      ctx.lineWidth = 8;
      ctx.stroke();

      // Efficiency arc
      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + (metrics.efficiency / 100) * 2 * Math.PI;

      ctx.beginPath();
      ctx.arc(effX, effY, effRadius, startAngle, endAngle);
      ctx.strokeStyle = metrics.efficiency > 80 ? '#10b981' : metrics.efficiency > 50 ? '#f59e0b' : '#ef4444';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Efficiency percentage
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.round(metrics.efficiency)}%`, effX, effY);

      // Efficiency label
      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('Efficiency', effX, effY + effRadius + 15);
    }
  };

  useEffect(() => {
    drawComputeVisualization();
  }, [computeAllocation, metrics, currentPhase]);

  const runTestTimeCompute = async () => {
    setIsProcessing(true);
    setCurrentPhase('analyzing');
    setShowComparison(false);
    setMetrics({
      tokensGenerated: 0,
      computeUsed: 0,
      timeElapsed: 0,
      efficiency: 0,
      accuracy: 0,
      costEstimate: 0
    });

    // Phase 1: Analyze problem complexity
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 2: Allocate compute resources
    setCurrentPhase('allocating');
    const allocation = analyzeComplexity(selectedProblem);

    // Animate allocation changes
    const startAllocation = { ...computeAllocation };
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      setComputeAllocation({
        flops: startAllocation.flops + (allocation.flops - startAllocation.flops) * t,
        memory: startAllocation.memory + (allocation.memory - startAllocation.memory) * t,
        iterations: Math.round(startAllocation.iterations + (allocation.iterations - startAllocation.iterations) * t),
        beamWidth: Math.round(startAllocation.beamWidth + (allocation.beamWidth - startAllocation.beamWidth) * t),
        temperature: startAllocation.temperature + (allocation.temperature - startAllocation.temperature) * t,
        topK: Math.round(startAllocation.topK + (allocation.topK - startAllocation.topK) * t)
      });
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Phase 3: Computing
    setCurrentPhase('computing');
    const startTime = Date.now();
    const targetTokens = selectedProblem.minTokens + Math.random() * (selectedProblem.maxTokens - selectedProblem.minTokens);

    // Simulate token generation with dynamic speed based on compute
    const tokensPerStep = Math.max(1, Math.floor(allocation.flops / 1000));
    const stepDelay = Math.max(10, 100 - allocation.flops / 100);

    let tokens = 0;
    while (tokens < targetTokens) {
      tokens = Math.min(targetTokens, tokens + tokensPerStep);
      setMetrics(prev => ({
        ...prev,
        tokensGenerated: Math.floor(tokens),
        computeUsed: prev.computeUsed + allocation.flops / 10,
        timeElapsed: Date.now() - startTime
      }));
      await new Promise(resolve => setTimeout(resolve, stepDelay));
    }

    // Phase 4: Complete
    setCurrentPhase('complete');
    const finalTime = Date.now() - startTime;
    const efficiency = Math.min(100, (selectedProblem.baselineTime / finalTime) * 100);
    const accuracy = Math.min(100, 70 + allocation.iterations * 0.5 + allocation.beamWidth * 0.3);
    const cost = (allocation.flops * finalTime) / 1000000;

    setMetrics({
      tokensGenerated: Math.floor(targetTokens),
      computeUsed: allocation.flops * allocation.iterations,
      timeElapsed: finalTime,
      efficiency,
      accuracy,
      costEstimate: cost
    });

    setShowComparison(true);
    setIsProcessing(false);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'text-green-400 bg-green-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'high': return 'text-orange-400 bg-orange-900/20';
      case 'extreme': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Test-Time Compute Scaling (TTC)</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Dynamically allocates computational resources based on problem complexity,
          optimizing the trade-off between performance and efficiency.
        </p>
      </div>

      {/* Problem Selector */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Brain className="w-5 h-5 text-purple-400" />
          Select Problem Complexity
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {problems.map((problem) => (
            <button
              key={problem.id}
              onClick={() => !isProcessing && setSelectedProblem(problem)}
              disabled={isProcessing}
              className={`p-4 rounded-lg border transition-all ${
                selectedProblem.id === problem.id
                  ? 'bg-blue-900/30 border-blue-600'
                  : 'bg-slate-800/50 border-slate-600 hover:bg-slate-700/50'
              } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`text-xs px-2 py-1 rounded inline-block mb-2 ${getComplexityColor(problem.complexity)}`}>
                {problem.complexity.toUpperCase()}
              </div>
              <div className="text-sm font-medium text-white">{problem.category}</div>
              <div className="text-xs text-slate-400 mt-1">
                {problem.expectedCompute.toLocaleString()} FLOPS
              </div>
            </button>
          ))}
        </div>

        {selectedProblem && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
            <div className="text-sm text-slate-300 font-medium mb-2">Query:</div>
            <div className="text-sm text-slate-400 italic">{selectedProblem.query}</div>
          </div>
        )}
      </div>

      {/* Compute Allocation Visualization */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Cpu className="w-5 h-5 text-blue-400" />
          Dynamic Resource Allocation
        </h3>
        <div className="flex justify-center">
          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* Status & Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Processing Status */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <Activity className="w-5 h-5 text-green-400" />
            Processing Status
          </h3>

          <div className="space-y-3">
            {['analyzing', 'allocating', 'computing', 'complete'].map((phase) => (
              <div
                key={phase}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  currentPhase === phase
                    ? 'bg-blue-900/30 border border-blue-600'
                    : currentPhase === 'complete' && ['analyzing', 'allocating', 'computing'].includes(phase)
                    ? 'bg-green-900/20 border border-green-800/30'
                    : 'bg-slate-800/30 border border-slate-700/30'
                }`}
              >
                {currentPhase === phase ? (
                  <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                ) : currentPhase === 'complete' && ['analyzing', 'allocating', 'computing'].includes(phase) ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-slate-600" />
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium text-white capitalize">{phase}</div>
                  <div className="text-xs text-slate-400">
                    {phase === 'analyzing' && 'Analyzing problem complexity'}
                    {phase === 'allocating' && 'Allocating compute resources'}
                    {phase === 'computing' && `Generating ${metrics.tokensGenerated} tokens...`}
                    {phase === 'complete' && 'Computation complete'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <BarChart className="w-5 h-5 text-purple-400" />
            Performance Metrics
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Tokens Generated</span>
              <span className="text-sm font-mono text-white">{metrics.tokensGenerated}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Compute Used</span>
              <span className="text-sm font-mono text-white">{metrics.computeUsed.toLocaleString()} FLOPS</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Time Elapsed</span>
              <span className="text-sm font-mono text-white">{metrics.timeElapsed} ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Efficiency</span>
              <span className={`text-sm font-mono ${
                metrics.efficiency > 80 ? 'text-green-400' :
                metrics.efficiency > 50 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {metrics.efficiency.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Accuracy Score</span>
              <span className="text-sm font-mono text-blue-400">{metrics.accuracy.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Est. Cost</span>
              <span className="text-sm font-mono text-purple-400">${metrics.costEstimate.toFixed(4)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Mode */}
      {showComparison && (
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">TTC vs Fixed Compute Comparison</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">Fixed Low Compute</div>
              <div className="space-y-2 text-xs">
                <div>Time: {selectedProblem.baselineTime * 2}ms</div>
                <div>Accuracy: ~60%</div>
                <div className="text-red-400">Under-resourced for this problem</div>
              </div>
            </div>
            <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
              <div className="text-sm text-blue-300 mb-2">Dynamic TTC (Used)</div>
              <div className="space-y-2 text-xs">
                <div>Time: {metrics.timeElapsed}ms</div>
                <div>Accuracy: {metrics.accuracy.toFixed(1)}%</div>
                <div className="text-green-400">Optimally resourced</div>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">Fixed High Compute</div>
              <div className="space-y-2 text-xs">
                <div>Time: {selectedProblem.baselineTime / 2}ms</div>
                <div>Accuracy: ~95%</div>
                <div className="text-yellow-400">Over-resourced, wasteful</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Run Button */}
      <div className="flex justify-center">
        <button
          onClick={runTestTimeCompute}
          disabled={isProcessing}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <Activity className="w-5 h-5 animate-pulse" />
              Computing...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Run Test-Time Compute Scaling
            </>
          )}
        </button>
      </div>

      {/* Algorithm Explanation */}
      <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-6">
        <h4 className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
          <Brain className="w-4 h-4" />
          How TTC Works
        </h4>
        <ul className="space-y-2 text-xs text-blue-200">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">1.</span>
            <span><strong>Complexity Analysis:</strong> Analyzes input to determine computational requirements</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">2.</span>
            <span><strong>Dynamic Allocation:</strong> Scales compute, memory, iterations, and beam width based on complexity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">3.</span>
            <span><strong>Adaptive Processing:</strong> Adjusts temperature and sampling parameters for optimal results</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">4.</span>
            <span><strong>Efficiency Optimization:</strong> Balances performance with resource consumption</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">5.</span>
            <span><strong>Cost-Aware Scaling:</strong> Considers economic factors in resource allocation decisions</span>
          </li>
        </ul>
      </div>
    </div>
  );
}