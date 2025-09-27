'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Brain, GitMerge, RefreshCw, Sparkles, ArrowRight, Network, Zap, Layers } from 'lucide-react';

interface GraphNode {
  id: string;
  content: string;
  type: 'thought' | 'aggregate' | 'refined' | 'generated';
  score: number;
  x: number;
  y: number;
  connections: string[];
}

interface Example {
  id: string;
  title: string;
  problem: string;
  description: string;
}

export default function GoTDemo() {
  const [selectedExample, setSelectedExample] = useState<string>('sorting');
  const [currentOperation, setCurrentOperation] = useState<'idle' | 'generating' | 'aggregating' | 'refining'>('idle');
  const [graphNodes, setGraphNodes] = useState<Map<string, GraphNode>>(new Map());
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const examples: Example[] = [
    {
      id: 'sorting',
      title: 'List Sorting',
      problem: 'Sort [64, 32, 128, 8, 16]',
      description: 'Use graph-based reasoning to sort numbers efficiently'
    },
    {
      id: 'writing',
      title: 'Creative Writing',
      problem: 'Write a story with multiple plot threads',
      description: 'Develop parallel storylines and merge them'
    },
    {
      id: 'planning',
      title: 'Project Planning',
      problem: 'Plan a product launch with dependencies',
      description: 'Coordinate multiple workstreams'
    }
  ];

  const initializeSortingGraph = () => {
    const nodes = new Map<string, GraphNode>();

    // Initial thoughts - different sorting approaches
    nodes.set('t1', {
      id: 't1',
      content: 'Quick Sort:\nDivide & conquer',
      type: 'thought',
      score: 0.8,
      x: 100,
      y: 100,
      connections: ['t4', 'a1']
    });

    nodes.set('t2', {
      id: 't2',
      content: 'Merge Sort:\nSplit & merge',
      type: 'thought',
      score: 0.9,
      x: 300,
      y: 100,
      connections: ['t5', 'a1']
    });

    nodes.set('t3', {
      id: 't3',
      content: 'Bubble Sort:\nSimple swaps',
      type: 'thought',
      score: 0.5,
      x: 500,
      y: 100,
      connections: ['r1']
    });

    // Generated sub-thoughts
    nodes.set('t4', {
      id: 't4',
      content: 'Pivot: 64\n[32,8,16] | [128]',
      type: 'generated',
      score: 0.7,
      x: 50,
      y: 250,
      connections: ['a2']
    });

    nodes.set('t5', {
      id: 't5',
      content: 'Split: [64,32] [128,8,16]',
      type: 'generated',
      score: 0.85,
      x: 300,
      y: 250,
      connections: ['a2']
    });

    // Refined thought
    nodes.set('r1', {
      id: 'r1',
      content: 'Optimized Bubble:\nEarly termination',
      type: 'refined',
      score: 0.6,
      x: 550,
      y: 250,
      connections: ['a2']
    });

    // First aggregation
    nodes.set('a1', {
      id: 'a1',
      content: 'Hybrid: Quick+Merge\nBest of both',
      type: 'aggregate',
      score: 0.95,
      x: 200,
      y: 200,
      connections: ['a3']
    });

    // Second level aggregation
    nodes.set('a2', {
      id: 'a2',
      content: 'Compare approaches:\nEfficiency analysis',
      type: 'aggregate',
      score: 0.88,
      x: 300,
      y: 350,
      connections: ['a3']
    });

    // Final aggregation - solution
    nodes.set('a3', {
      id: 'a3',
      content: '✓ Sorted: [8,16,32,64,128]\nOptimal: O(n log n)',
      type: 'aggregate',
      score: 1.0,
      x: 300,
      y: 450,
      connections: []
    });

    return nodes;
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 800;
    const height = 550;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;

    ctx.clearRect(0, 0, width, height);

    // Background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(1, '#1e293b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw connections (edges)
    graphNodes.forEach(node => {
      node.connections.forEach(targetId => {
        const target = graphNodes.get(targetId);
        if (!target) return;

        ctx.beginPath();
        ctx.moveTo(node.x + 60, node.y + 30);
        ctx.lineTo(target.x + 60, target.y + 30);

        // Style based on operation type
        if (highlightedNodes.includes(node.id) && highlightedNodes.includes(targetId)) {
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 3;
        } else if (target.type === 'aggregate') {
          ctx.strokeStyle = '#8b5cf6';
          ctx.lineWidth = 2;
        } else if (target.type === 'refined') {
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2;
        } else if (target.type === 'generated') {
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2;
        } else {
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1;
        }

        ctx.stroke();

        // Draw arrow head
        const angle = Math.atan2(target.y - node.y, target.x - node.x);
        const arrowLength = 10;
        ctx.beginPath();
        ctx.moveTo(target.x + 60 - 30 * Math.cos(angle), target.y + 30 - 30 * Math.sin(angle));
        ctx.lineTo(
          target.x + 60 - 30 * Math.cos(angle) - arrowLength * Math.cos(angle - Math.PI/6),
          target.y + 30 - 30 * Math.sin(angle) - arrowLength * Math.sin(angle - Math.PI/6)
        );
        ctx.moveTo(target.x + 60 - 30 * Math.cos(angle), target.y + 30 - 30 * Math.sin(angle));
        ctx.lineTo(
          target.x + 60 - 30 * Math.cos(angle) - arrowLength * Math.cos(angle + Math.PI/6),
          target.y + 30 - 30 * Math.sin(angle) - arrowLength * Math.sin(angle + Math.PI/6)
        );
        ctx.stroke();
      });
    });

    // Draw nodes (vertices)
    graphNodes.forEach(node => {
      const nodeWidth = 120;
      const nodeHeight = 60;

      // Node background based on type
      if (node.type === 'aggregate') {
        ctx.fillStyle = '#581c87';
      } else if (node.type === 'refined') {
        ctx.fillStyle = '#0e7490';
      } else if (node.type === 'generated') {
        ctx.fillStyle = '#14532d';
      } else {
        ctx.fillStyle = '#1e293b';
      }

      if (highlightedNodes.includes(node.id)) {
        ctx.fillStyle = node.type === 'aggregate' ? '#7c3aed' :
                       node.type === 'refined' ? '#06b6d4' :
                       node.type === 'generated' ? '#10b981' : '#3b82f6';
      }

      ctx.fillRect(node.x, node.y, nodeWidth, nodeHeight);

      // Border
      ctx.strokeStyle = highlightedNodes.includes(node.id) ? '#fbbf24' : '#475569';
      ctx.lineWidth = highlightedNodes.includes(node.id) ? 2 : 1;
      ctx.strokeRect(node.x, node.y, nodeWidth, nodeHeight);

      // Node icon based on type
      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#ffffff';

      if (node.type === 'aggregate') {
        ctx.fillText('⚡', node.x + 5, node.y + 15);
      } else if (node.type === 'refined') {
        ctx.fillText('🔄', node.x + 5, node.y + 15);
      } else if (node.type === 'generated') {
        ctx.fillText('✨', node.x + 5, node.y + 15);
      } else {
        ctx.fillText('💭', node.x + 5, node.y + 15);
      }

      // Node text
      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const lines = node.content.split('\n');
      lines.forEach((line, i) => {
        ctx.fillText(line, node.x + nodeWidth/2, node.y + 25 + i * 15);
      });

      // Score indicator
      if (node.score > 0) {
        const scoreColor = node.score >= 0.9 ? '#10b981' :
                          node.score >= 0.7 ? '#fbbf24' : '#ef4444';
        ctx.fillStyle = scoreColor;
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${(node.score * 100).toFixed(0)}%`, node.x + nodeWidth - 5, node.y + nodeHeight - 5);
      }
    });

    // Legend
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const legendY = height - 30;

    // Thought types
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(20, legendY, 15, 15);
    ctx.strokeStyle = '#475569';
    ctx.strokeRect(20, legendY, 15, 15);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('💭 Initial', 40, legendY + 7);

    ctx.fillStyle = '#14532d';
    ctx.fillRect(100, legendY, 15, 15);
    ctx.strokeRect(100, legendY, 15, 15);
    ctx.fillText('✨ Generated', 120, legendY + 7);

    ctx.fillStyle = '#0e7490';
    ctx.fillRect(200, legendY, 15, 15);
    ctx.strokeRect(200, legendY, 15, 15);
    ctx.fillText('🔄 Refined', 220, legendY + 7);

    ctx.fillStyle = '#581c87';
    ctx.fillRect(280, legendY, 15, 15);
    ctx.strokeRect(280, legendY, 15, 15);
    ctx.fillText('⚡ Aggregated', 300, legendY + 7);
  };

  useEffect(() => {
    const nodes = initializeSortingGraph();
    setGraphNodes(nodes);
  }, []);

  useEffect(() => {
    drawGraph();
  }, [graphNodes, highlightedNodes]);

  const demonstrateOperations = async () => {
    setShowResult(false);
    setHighlightedNodes([]);

    // Step 1: Initial thoughts
    setCurrentOperation('generating');
    setHighlightedNodes(['t1', 't2', 't3']);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 2: Generation from initial thoughts
    setHighlightedNodes(['t1', 't4', 't2', 't5']);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 3: Refinement
    setCurrentOperation('refining');
    setHighlightedNodes(['t3', 'r1']);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 4: First aggregation
    setCurrentOperation('aggregating');
    setHighlightedNodes(['t1', 't2', 'a1']);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 5: Second aggregation
    setHighlightedNodes(['t4', 't5', 'r1', 'a2']);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 6: Final aggregation
    setHighlightedNodes(['a1', 'a2', 'a3']);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentOperation('idle');
    setShowResult(true);
  };

  const resetDemo = () => {
    setHighlightedNodes([]);
    setCurrentOperation('idle');
    setShowResult(false);
  };

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">Graph-of-Thought (GoT)</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Non-linear reasoning with thoughts as nodes and dependencies as edges.
          Enables aggregation, refinement, and generation operations on thought networks.
        </p>
      </div>

      {/* Key Difference from ToT */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Network className="w-5 h-5 text-purple-400" />
          GoT vs Tree-of-Thought
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-medium text-orange-400 mb-2">Tree-of-Thought (Hierarchical)</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Tree structure only</li>
              <li>• Parent-child relationships</li>
              <li>• No cross-branch merging</li>
              <li>• Limited to branching paths</li>
            </ul>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-medium text-purple-400 mb-2">Graph-of-Thought (Network)</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Arbitrary graph structure</li>
              <li>• Complex dependencies</li>
              <li>• Merge & combine thoughts</li>
              <li>• Feedback loops possible</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Three Key Operations */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Layers className="w-5 h-5 text-blue-400" />
          Three Core Operations
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-green-800/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-green-400" />
              <h4 className="font-medium text-green-400">Generation</h4>
            </div>
            <p className="text-sm text-slate-300">
              Create new thoughts from existing ones. Branch out to explore possibilities.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-800/30">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="w-5 h-5 text-cyan-400" />
              <h4 className="font-medium text-cyan-400">Refinement</h4>
            </div>
            <p className="text-sm text-slate-300">
              Improve thoughts through self-loops. Iteratively enhance quality.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-800/30">
            <div className="flex items-center gap-2 mb-2">
              <GitMerge className="w-5 h-5 text-purple-400" />
              <h4 className="font-medium text-purple-400">Aggregation</h4>
            </div>
            <p className="text-sm text-slate-300">
              Combine multiple thoughts into synergistic outcomes. Merge insights.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Graph Visualization */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Network className="w-5 h-5 text-green-400" />
          Thought Graph Network - Sorting Example
        </h3>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full rounded-lg"
            style={{ minHeight: '550px' }}
          />
          {currentOperation !== 'idle' && (
            <div className="absolute top-4 right-4 bg-slate-800/90 rounded-lg px-3 py-2">
              <span className="text-sm text-slate-300 flex items-center gap-2">
                {currentOperation === 'generating' && <><Sparkles className="w-4 h-4 text-green-400 animate-pulse" /> Generating</>}
                {currentOperation === 'refining' && <><RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" /> Refining</>}
                {currentOperation === 'aggregating' && <><GitMerge className="w-4 h-4 text-purple-400 animate-pulse" /> Aggregating</>}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={demonstrateOperations}
          disabled={currentOperation !== 'idle'}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Run Graph Operations
          </span>
        </button>

        <button
          onClick={resetDemo}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all duration-200"
        >
          <span className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Reset
          </span>
        </button>
      </div>

      {/* Result */}
      {showResult && (
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <Brain className="w-5 h-5 text-green-400" />
            Solution Through Graph Operations
          </h3>
          <div className="space-y-4">
            <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4">
              <p className="text-green-300 font-medium mb-2">✓ Final Solution:</p>
              <p className="text-white font-mono">Sorted: [8, 16, 32, 64, 128]</p>
              <p className="text-sm text-slate-400 mt-2">
                Achieved through combining Quick Sort and Merge Sort insights (95% confidence)
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-slate-300 font-medium mb-2">Operations Performed:</p>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• <span className="text-green-400">Generated:</span> 2 sub-thoughts from initial approaches</li>
                <li>• <span className="text-cyan-400">Refined:</span> 1 thought through iteration</li>
                <li>• <span className="text-purple-400">Aggregated:</span> 3 times to combine insights</li>
                <li>• <span className="text-yellow-400">Total nodes:</span> 9 thoughts in the network</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">How Graph-of-Thought Works</h3>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <div>
              <strong className="text-white">Model as Graph:</strong> Represent thoughts as vertices with edges showing dependencies
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <div>
              <strong className="text-white">Apply Operations:</strong> Generate new thoughts, refine existing ones, aggregate multiple thoughts
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <div>
              <strong className="text-white">Navigate Network:</strong> Follow edges, create feedback loops, distill network essence
            </div>
          </div>
        </div>
      </div>

      {/* Performance Note */}
      <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-300">
          <Zap className="w-5 h-5" />
          Performance Benefits
        </h3>
        <ul className="text-sm text-blue-200 space-y-2">
          <li>• <strong>62% better quality</strong> than Tree-of-Thought on sorting tasks</li>
          <li>• <strong>31% lower costs</strong> through efficient thought reuse</li>
          <li>• <strong>Mimics human thinking:</strong> Non-linear, network-based reasoning</li>
          <li>• <strong>Synergistic outcomes:</strong> Whole greater than sum of parts</li>
        </ul>
      </div>
    </div>
  );
}