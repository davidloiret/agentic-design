'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Brain, GitBranch, CheckCircle, XCircle, AlertCircle, ArrowRight, RotateCcw, Target, TreePine, Sparkles } from 'lucide-react';

interface ThoughtNode {
  id: string;
  content: string;
  evaluation: 'promising' | 'maybe' | 'dead-end';
  score: number;
  children: string[];
  depth: number;
}

interface GameExample {
  id: string;
  title: string;
  problem: string;
  target: number;
  numbers: number[];
  solution: string[];
}

export default function ToTDemo() {
  const [selectedExample, setSelectedExample] = useState<string>('game24');
  const [currentStep, setCurrentStep] = useState(0);
  const [thoughtTree, setThoughtTree] = useState<Map<string, ThoughtNode>>(new Map());
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [isExploring, setIsExploring] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const examples: GameExample[] = [
    {
      id: 'game24',
      title: 'Game of 24',
      problem: 'Use 4, 7, 8, 8 to make 24',
      target: 24,
      numbers: [4, 7, 8, 8],
      solution: ['8 / (8 - 7) * 4 = 24', '(8 - 7) = 1', '8 / 1 = 8', '8 * 4 = 32... wait, wrong', 'Try: 4 * (8 - 8/7) ≈ 24']
    },
    {
      id: 'creative',
      title: 'Creative Writing',
      problem: 'Write a 4-sentence story with each sentence having exactly 5 words, ending with "cat"',
      target: 4,
      numbers: [],
      solution: ['The old house stood silent.', 'Shadows danced on broken walls.', 'Something moved in the attic.', 'There lived a black cat.']
    },
    {
      id: 'puzzle',
      title: 'Logic Puzzle',
      problem: 'Arrange digits 1-4 so each row and column sums to 10',
      target: 10,
      numbers: [1, 2, 3, 4],
      solution: ['Row 1: [4, 1, 3, 2]', 'Row 2: [2, 3, 1, 4]', 'Check: 4+1+3+2=10 ✓', 'Column 1: 4+2=6... need to adjust']
    }
  ];

  const initializeThoughtTree = () => {
    const tree = new Map<string, ThoughtNode>();

    // Root thought
    tree.set('root', {
      id: 'root',
      content: 'Start: Use 4, 7, 8, 8 to make 24',
      evaluation: 'promising',
      score: 1.0,
      children: ['t1', 't2', 't3'],
      depth: 0
    });

    // First level thoughts (different starting operations)
    tree.set('t1', {
      id: 't1',
      content: 'Try: 8 * ? = 24, so need 3',
      evaluation: 'promising',
      score: 0.8,
      children: ['t1a', 't1b'],
      depth: 1
    });

    tree.set('t2', {
      id: 't2',
      content: 'Try: 4 * ? = 24, so need 6',
      evaluation: 'maybe',
      score: 0.6,
      children: ['t2a', 't2b'],
      depth: 1
    });

    tree.set('t3', {
      id: 't3',
      content: 'Try: 7 + 8 + 8 + ? = 24',
      evaluation: 'dead-end',
      score: 0.2,
      children: [],
      depth: 1
    });

    // Second level thoughts
    tree.set('t1a', {
      id: 't1a',
      content: '8 * 3... can we make 3 from 4,7,8?',
      evaluation: 'promising',
      score: 0.75,
      children: ['t1a1'],
      depth: 2
    });

    tree.set('t1b', {
      id: 't1b',
      content: '8 * (8-7+4) = 8 * 5 = 40 ✗',
      evaluation: 'dead-end',
      score: 0.0,
      children: [],
      depth: 2
    });

    tree.set('t2a', {
      id: 't2a',
      content: '4 * 6... make 6 from 7,8,8?',
      evaluation: 'maybe',
      score: 0.5,
      children: ['t2a1'],
      depth: 2
    });

    tree.set('t2b', {
      id: 't2b',
      content: '4 * (8-8/7) = complex...',
      evaluation: 'maybe',
      score: 0.4,
      children: [],
      depth: 2
    });

    // Third level - solution path
    tree.set('t1a1', {
      id: 't1a1',
      content: '✓ (8-7)*8*4 = 1*8*4 = 32... wait',
      evaluation: 'dead-end',
      score: 0.0,
      children: [],
      depth: 3
    });

    tree.set('t2a1', {
      id: 't2a1',
      content: '✓ 4 * (7 - 8/8) = 4 * 6 = 24!',
      evaluation: 'promising',
      score: 1.0,
      children: [],
      depth: 3
    });

    return tree;
  };

  const drawTreeVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 800;
    const height = 400;

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

    // Draw tree structure
    const nodePositions = new Map<string, {x: number, y: number}>();

    // Calculate positions
    nodePositions.set('root', {x: width/2, y: 60});
    nodePositions.set('t1', {x: width/2 - 200, y: 150});
    nodePositions.set('t2', {x: width/2, y: 150});
    nodePositions.set('t3', {x: width/2 + 200, y: 150});
    nodePositions.set('t1a', {x: width/2 - 250, y: 240});
    nodePositions.set('t1b', {x: width/2 - 150, y: 240});
    nodePositions.set('t2a', {x: width/2 - 50, y: 240});
    nodePositions.set('t2b', {x: width/2 + 50, y: 240});
    nodePositions.set('t1a1', {x: width/2 - 250, y: 330});
    nodePositions.set('t2a1', {x: width/2 - 50, y: 330});

    // Draw edges
    thoughtTree.forEach((node, id) => {
      const pos = nodePositions.get(id);
      if (!pos) return;

      node.children.forEach(childId => {
        const childPos = nodePositions.get(childId);
        if (!childPos) return;

        const childNode = thoughtTree.get(childId);
        if (!childNode) return;

        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y + 25);
        ctx.lineTo(childPos.x, childPos.y - 25);

        // Color based on evaluation
        if (selectedPath.includes(id) && selectedPath.includes(childId)) {
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 3;
        } else if (childNode.evaluation === 'dead-end') {
          ctx.strokeStyle = '#ef444450';
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
        } else if (childNode.evaluation === 'maybe') {
          ctx.strokeStyle = '#f59e0b50';
          ctx.lineWidth = 1;
        } else {
          ctx.strokeStyle = '#10b98150';
          ctx.lineWidth = 2;
        }

        ctx.stroke();
        ctx.setLineDash([]);
      });
    });

    // Draw nodes
    thoughtTree.forEach((node, id) => {
      const pos = nodePositions.get(id);
      if (!pos) return;

      // Node background
      const nodeWidth = 120;
      const nodeHeight = 50;

      if (node.evaluation === 'dead-end') {
        ctx.fillStyle = '#7f1d1d';
      } else if (node.evaluation === 'maybe') {
        ctx.fillStyle = '#78350f';
      } else {
        ctx.fillStyle = '#14532d';
      }

      if (selectedPath.includes(id)) {
        ctx.fillStyle = '#059669';
      }

      ctx.fillRect(pos.x - nodeWidth/2, pos.y - nodeHeight/2, nodeWidth, nodeHeight);

      // Border
      ctx.strokeStyle = selectedPath.includes(id) ? '#10b981' : '#475569';
      ctx.lineWidth = selectedPath.includes(id) ? 2 : 1;
      ctx.strokeRect(pos.x - nodeWidth/2, pos.y - nodeHeight/2, nodeWidth, nodeHeight);

      // Node text
      ctx.fillStyle = '#ffffff';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Split long text
      const maxChars = 15;
      const text = node.content;
      if (text.length > maxChars) {
        const words = text.split(' ');
        let line1 = '';
        let line2 = '';
        for (const word of words) {
          if ((line1 + ' ' + word).length <= maxChars) {
            line1 += (line1 ? ' ' : '') + word;
          } else {
            line2 += (line2 ? ' ' : '') + word;
          }
        }
        ctx.fillText(line1, pos.x, pos.y - 8);
        ctx.fillText(line2.substring(0, maxChars) + (line2.length > maxChars ? '...' : ''), pos.x, pos.y + 8);
      } else {
        ctx.fillText(text, pos.x, pos.y);
      }

      // Score indicator
      if (node.score > 0) {
        ctx.font = '9px sans-serif';
        ctx.fillStyle = node.evaluation === 'promising' ? '#10b981' :
                       node.evaluation === 'maybe' ? '#f59e0b' : '#ef4444';
        ctx.fillText(`${(node.score * 100).toFixed(0)}%`, pos.x, pos.y - nodeHeight/2 - 10);
      }
    });

    // Legend
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';

    ctx.fillStyle = '#10b981';
    ctx.fillRect(20, height - 30, 10, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Promising', 35, height - 21);

    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(100, height - 30, 10, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Maybe', 115, height - 21);

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(170, height - 30, 10, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Dead-end', 185, height - 21);
  };

  useEffect(() => {
    const tree = initializeThoughtTree();
    setThoughtTree(tree);
  }, []);

  useEffect(() => {
    drawTreeVisualization();
  }, [thoughtTree, selectedPath]);

  const exploreTree = async () => {
    setIsExploring(true);
    setSelectedPath([]);
    setCurrentStep(0);

    // Simulate exploration
    const paths = [
      ['root'],
      ['root', 't1'],
      ['root', 't1', 't1a'],
      ['root', 't1', 't1a', 't1a1'], // Dead end
      ['root', 't2'],
      ['root', 't2', 't2a'],
      ['root', 't2', 't2a', 't2a1'], // Solution!
    ];

    for (let i = 0; i < paths.length; i++) {
      setSelectedPath(paths[i]);
      setCurrentStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsExploring(false);
    setShowComparison(true);
  };

  const resetExploration = () => {
    setSelectedPath([]);
    setCurrentStep(0);
    setShowComparison(false);
  };

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">Tree-of-Thought (ToT)</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Explores multiple reasoning paths simultaneously, evaluating and backtracking to find optimal solutions.
          Unlike Chain-of-Thought's linear approach, ToT maintains a search tree of possibilities.
        </p>
      </div>

      {/* Key Difference from CoT */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <GitBranch className="w-5 h-5 text-purple-400" />
          ToT vs Chain-of-Thought
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-medium text-red-400 mb-2">Chain-of-Thought (Linear)</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Single reasoning path</li>
              <li>• No backtracking</li>
              <li>• Can't recover from wrong steps</li>
              <li>• Game of 24: 4% success</li>
            </ul>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-medium text-green-400 mb-2">Tree-of-Thought (Branching)</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Multiple parallel paths</li>
              <li>• Evaluation & backtracking</li>
              <li>• Explores alternatives</li>
              <li>• Game of 24: 74% success!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Example Problem */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Target className="w-5 h-5 text-blue-400" />
          Game of 24 Example
        </h3>
        <div className="bg-slate-800 rounded-lg p-4 mb-4">
          <p className="text-white font-medium mb-2">Problem: Use 4, 7, 8, 8 to make 24</p>
          <p className="text-sm text-slate-400">
            Using +, -, *, / and parentheses, combine these numbers to get exactly 24
          </p>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <TreePine className="w-5 h-5 text-green-400" />
          Thought Tree Exploration
        </h3>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full rounded-lg"
            style={{ minHeight: '400px' }}
          />
          {currentStep > 0 && (
            <div className="absolute top-4 right-4 bg-slate-800/90 rounded-lg px-3 py-2">
              <span className="text-sm text-slate-300">Step {currentStep}/7</span>
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={exploreTree}
          disabled={isExploring}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExploring ? (
            <span className="flex items-center gap-2">
              <Brain className="w-5 h-5 animate-pulse" />
              Exploring Tree...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Explore Thought Tree
            </span>
          )}
        </button>

        <button
          onClick={resetExploration}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all duration-200"
        >
          <span className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Reset
          </span>
        </button>
      </div>

      {/* Results Comparison */}
      {showComparison && (
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Solution Found!
          </h3>
          <div className="space-y-4">
            <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4">
              <p className="text-green-300 font-medium mb-2">✓ Successful Path:</p>
              <p className="text-white font-mono">4 * (7 - 8/8) = 4 * (7 - 1) = 4 * 6 = 24</p>
            </div>
            <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4">
              <p className="text-red-300 font-medium mb-2">✗ Dead-end Paths Explored:</p>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• 8 * 3 approach: Couldn't make 3 from remaining numbers</li>
                <li>• 7 + 8 + 8 approach: Sum is 23, can't add 1 from just 4</li>
                <li>• (8-7)*8*4: Gives 32, not 24</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* How ToT Works */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">How Tree-of-Thought Works</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">1</span>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Generate Thoughts</h4>
              <p className="text-slate-400 text-xs">Create multiple candidate next steps</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">2</span>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Evaluate & Score</h4>
              <p className="text-slate-400 text-xs">Rate each thought as promising/maybe/dead-end</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">3</span>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Search & Backtrack</h4>
              <p className="text-slate-400 text-xs">Explore best paths, abandon dead-ends</p>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Note */}
      <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-300">
          <Sparkles className="w-5 h-5" />
          Implementation in Practice
        </h3>
        <p className="text-sm text-blue-200 mb-3">
          ToT can be implemented using multiple LLM calls:
        </p>
        <ol className="text-sm text-slate-300 space-y-2">
          <li>1. <strong>Generation prompt:</strong> "Generate 3 different approaches to solve..."</li>
          <li>2. <strong>Evaluation prompt:</strong> "Rate this approach as sure/maybe/impossible..."</li>
          <li>3. <strong>Search:</strong> Use BFS/DFS to explore the most promising branches</li>
          <li>4. <strong>Backtrack:</strong> When stuck, return to unexplored promising nodes</li>
        </ol>
      </div>
    </div>
  );
}