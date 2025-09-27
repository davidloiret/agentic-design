'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Brain, TreePine, Vote, UserCheck, RefreshCw, Zap, AlertCircle, CheckCircle, XCircle, Users } from 'lucide-react';

interface TreeNode {
  id: string;
  content: string;
  answer: string;
  confidence: number;
  children: string[];
}

interface Tree {
  id: string;
  name: string;
  color: string;
  approach: string;
  nodes: Map<string, TreeNode>;
  finalAnswer: string;
  confidence: number;
}

export default function FoTDemo() {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [selectedTreeIndex, setSelectedTreeIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [votingPhase, setVotingPhase] = useState(false);
  const [expertPhase, setExpertPhase] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const problem = "If 3 cats catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?";

  const initializeTrees = (): Tree[] => {
    // Tree 1: Rate-based approach
    const tree1Nodes = new Map<string, TreeNode>();
    tree1Nodes.set('root', {
      id: 'root',
      content: 'Start: Rate approach',
      answer: '',
      confidence: 1.0,
      children: ['n1']
    });
    tree1Nodes.set('n1', {
      id: 'n1',
      content: 'Calculate rate per cat',
      answer: '1 mouse/3 min',
      confidence: 0.9,
      children: ['n2']
    });
    tree1Nodes.set('n2', {
      id: 'n2',
      content: '100 min = 33.33 cycles',
      answer: '33 mice per cat',
      confidence: 0.85,
      children: ['n3']
    });
    tree1Nodes.set('n3', {
      id: 'n3',
      content: 'Final: 100/33 ≈ 3',
      answer: '3 cats',
      confidence: 0.95,
      children: []
    });

    // Tree 2: Proportional thinking
    const tree2Nodes = new Map<string, TreeNode>();
    tree2Nodes.set('root', {
      id: 'root',
      content: 'Start: Proportion',
      answer: '',
      confidence: 1.0,
      children: ['n1']
    });
    tree2Nodes.set('n1', {
      id: 'n1',
      content: '3 cats : 3 mice : 3 min',
      answer: 'Unit ratio',
      confidence: 0.8,
      children: ['n2']
    });
    tree2Nodes.set('n2', {
      id: 'n2',
      content: 'Scale to 100 mice',
      answer: '100 cats?',
      confidence: 0.5,
      children: ['n3', 'n4']
    });
    tree2Nodes.set('n3', {
      id: 'n3',
      content: 'Wait, time matters!',
      answer: 'Reconsider',
      confidence: 0.7,
      children: ['n5']
    });
    tree2Nodes.set('n4', {
      id: 'n4',
      content: 'Linear scaling',
      answer: '100 cats',
      confidence: 0.3,
      children: []
    });
    tree2Nodes.set('n5', {
      id: 'n5',
      content: 'Time gives more catches',
      answer: '3 cats',
      confidence: 0.9,
      children: []
    });

    // Tree 3: Time-focused approach
    const tree3Nodes = new Map<string, TreeNode>();
    tree3Nodes.set('root', {
      id: 'root',
      content: 'Start: Time analysis',
      answer: '',
      confidence: 1.0,
      children: ['n1']
    });
    tree3Nodes.set('n1', {
      id: 'n1',
      content: 'Each cat in 100 min',
      answer: '33.33 mice',
      confidence: 0.95,
      children: ['n2']
    });
    tree3Nodes.set('n2', {
      id: 'n2',
      content: '3 cats total capacity',
      answer: '100 mice',
      confidence: 0.9,
      children: ['n3']
    });
    tree3Nodes.set('n3', {
      id: 'n3',
      content: 'Perfect match!',
      answer: '3 cats',
      confidence: 0.98,
      children: []
    });

    // Tree 4: Incorrect linear approach
    const tree4Nodes = new Map<string, TreeNode>();
    tree4Nodes.set('root', {
      id: 'root',
      content: 'Start: Direct scaling',
      answer: '',
      confidence: 1.0,
      children: ['n1']
    });
    tree4Nodes.set('n1', {
      id: 'n1',
      content: '3→3, so 100→100',
      answer: 'Linear relation',
      confidence: 0.6,
      children: ['n2']
    });
    tree4Nodes.set('n2', {
      id: 'n2',
      content: 'Simple proportion',
      answer: '100 cats',
      confidence: 0.4,
      children: []
    });

    return [
      {
        id: 't1',
        name: 'Tree 1: Rate Analysis',
        color: '#10b981',
        approach: 'Calculate catch rate per cat',
        nodes: tree1Nodes,
        finalAnswer: '3 cats',
        confidence: 0.95
      },
      {
        id: 't2',
        name: 'Tree 2: Proportion',
        color: '#f59e0b',
        approach: 'Use proportional reasoning',
        nodes: tree2Nodes,
        finalAnswer: '3 cats',
        confidence: 0.9
      },
      {
        id: 't3',
        name: 'Tree 3: Time Focus',
        color: '#8b5cf6',
        approach: 'Analyze time efficiency',
        nodes: tree3Nodes,
        finalAnswer: '3 cats',
        confidence: 0.98
      },
      {
        id: 't4',
        name: 'Tree 4: Direct Scale',
        color: '#ef4444',
        approach: 'Linear scaling (incorrect)',
        nodes: tree4Nodes,
        finalAnswer: '100 cats',
        confidence: 0.4
      }
    ];
  };

  const drawTree = (tree: Tree, offsetX: number, width: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nodePositions = new Map<string, {x: number, y: number}>();

    // Calculate positions for this tree
    const centerX = offsetX + width / 2;
    nodePositions.set('root', {x: centerX, y: 60});

    // Position other nodes based on tree structure
    tree.nodes.forEach((node, id) => {
      if (id === 'root') return;

      const depth = id.startsWith('n') ? parseInt(id.substring(1)) : 0;
      const levelNodes = Array.from(tree.nodes.keys()).filter(k =>
        k.startsWith('n') && parseInt(k.substring(1)) === depth
      );
      const indexInLevel = levelNodes.indexOf(id);
      const levelWidth = levelNodes.length * 80;

      nodePositions.set(id, {
        x: centerX - levelWidth/2 + indexInLevel * 80 + 40,
        y: 60 + depth * 80
      });
    });

    // Draw edges
    tree.nodes.forEach((node, id) => {
      const pos = nodePositions.get(id);
      if (!pos) return;

      node.children.forEach(childId => {
        const childPos = nodePositions.get(childId);
        if (!childPos) return;

        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y + 20);
        ctx.lineTo(childPos.x, childPos.y - 20);
        ctx.strokeStyle = tree.color + '50';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });

    // Draw nodes
    tree.nodes.forEach((node, id) => {
      const pos = nodePositions.get(id);
      if (!pos) return;

      // Node circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = tree.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Node label
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(id === 'root' ? 'R' : id.toUpperCase(), pos.x, pos.y);

      // Confidence indicator
      if (node.confidence > 0 && id !== 'root') {
        ctx.fillStyle = node.confidence >= 0.8 ? '#10b981' :
                       node.confidence >= 0.5 ? '#f59e0b' : '#ef4444';
        ctx.font = '9px sans-serif';
        ctx.fillText(`${(node.confidence * 100).toFixed(0)}%`, pos.x, pos.y + 30);
      }

      // Answer preview
      if (node.answer) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px sans-serif';
        const maxWidth = 60;
        const answer = node.answer.length > 10 ? node.answer.substring(0, 10) + '...' : node.answer;
        ctx.fillText(answer, pos.x, pos.y + 40);
      }
    });

    // Tree label
    ctx.fillStyle = tree.color;
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(tree.name, centerX, 25);
  };

  const drawForest = () => {
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

    // Draw each tree
    if (trees.length > 0) {
      const treeWidth = width / trees.length;
      trees.forEach((tree, index) => {
        drawTree(tree, index * treeWidth, treeWidth);
      });

      // Highlight selected tree
      if (selectedTreeIndex >= 0 && selectedTreeIndex < trees.length) {
        const selectedX = selectedTreeIndex * treeWidth;
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.strokeRect(selectedX + 5, 5, treeWidth - 10, height - 10);
      }
    }
  };

  useEffect(() => {
    const initialTrees = initializeTrees();
    setTrees(initialTrees);
  }, []);

  useEffect(() => {
    drawForest();
  }, [trees, selectedTreeIndex]);

  const runForestOfThoughts = async () => {
    setIsGenerating(true);
    setVotingPhase(false);
    setExpertPhase(false);
    setShowResult(false);
    setFinalAnswer('');

    // Simulate tree generation
    for (let i = 0; i < trees.length; i++) {
      setSelectedTreeIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Voting phase
    setVotingPhase(true);
    setSelectedTreeIndex(-1);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Expert evaluation (needed because of disagreement)
    setExpertPhase(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Final result
    setFinalAnswer('3 cats');
    setShowResult(true);
    setIsGenerating(false);
  };

  const resetDemo = () => {
    setSelectedTreeIndex(0);
    setVotingPhase(false);
    setExpertPhase(false);
    setShowResult(false);
    setFinalAnswer('');
  };

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">Forest-of-Thoughts (FoT)</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Generates multiple reasoning trees in parallel to enhance diversity and robustness.
          Uses voting and expert evaluation to select the best solution.
        </p>
      </div>

      {/* Problem Statement */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
          <Brain className="w-5 h-5 text-blue-400" />
          Problem
        </h3>
        <p className="text-white bg-slate-800 rounded-lg p-4">
          {problem}
        </p>
      </div>

      {/* Forest Visualization */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <TreePine className="w-5 h-5 text-green-400" />
          Reasoning Forest - Multiple Trees in Parallel
        </h3>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full rounded-lg"
            style={{ minHeight: '400px' }}
          />
          {votingPhase && (
            <div className="absolute top-4 right-4 bg-blue-800/90 rounded-lg px-3 py-2">
              <span className="text-sm text-blue-200 flex items-center gap-2">
                <Vote className="w-4 h-4 animate-pulse" />
                Voting Phase
              </span>
            </div>
          )}
          {expertPhase && (
            <div className="absolute top-4 right-4 bg-purple-800/90 rounded-lg px-3 py-2">
              <span className="text-sm text-purple-200 flex items-center gap-2">
                <UserCheck className="w-4 h-4 animate-pulse" />
                Expert Evaluation
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tree Details */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Users className="w-5 h-5 text-purple-400" />
          Tree Approaches & Results
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {trees.map((tree, index) => (
            <div
              key={tree.id}
              className={`bg-slate-800/50 rounded-lg p-4 border-2 transition-all ${
                selectedTreeIndex === index ? 'border-yellow-400' : 'border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium flex items-center gap-2" style={{ color: tree.color }}>
                  <TreePine className="w-4 h-4" />
                  {tree.name}
                </h4>
                <span className={`text-xs px-2 py-1 rounded ${
                  tree.confidence >= 0.9 ? 'bg-green-900/30 text-green-300' :
                  tree.confidence >= 0.6 ? 'bg-yellow-900/30 text-yellow-300' :
                  'bg-red-900/30 text-red-300'
                }`}>
                  {(tree.confidence * 100).toFixed(0)}% conf
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-2">{tree.approach}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Answer: <strong className="text-white">{tree.finalAnswer}</strong></span>
                {votingPhase && (
                  tree.finalAnswer === '3 cats' ?
                    <CheckCircle className="w-4 h-4 text-green-400" /> :
                    <XCircle className="w-4 h-4 text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={runForestOfThoughts}
          disabled={isGenerating}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-2">
            {isGenerating ? (
              <>
                <TreePine className="w-5 h-5 animate-pulse" />
                Growing Forest...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Run Forest of Thoughts
              </>
            )}
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

      {/* Voting & Consensus */}
      {votingPhase && (
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <Vote className="w-5 h-5 text-blue-400" />
            Voting Results
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
              <span className="text-slate-300">3 cats</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs">3</div>
                </div>
                <span className="text-green-400 text-sm">75% majority</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
              <span className="text-slate-300">100 cats</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs">1</div>
                <span className="text-red-400 text-sm">25% minority</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expert Evaluation */}
      {expertPhase && (
        <div className="bg-purple-900/20 border border-purple-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-300">
            <UserCheck className="w-5 h-5" />
            Expert Evaluation
          </h3>
          <p className="text-purple-200 text-sm mb-3">
            Majority consensus achieved (75%). Expert confirms reasoning:
          </p>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Trees 1, 2, 3: Correctly account for time dimension</li>
            <li>• Tree 4: Failed to consider time factor (linear scaling error)</li>
            <li>• <strong className="text-purple-300">Verdict:</strong> 3 cats is correct based on rate calculation</li>
          </ul>
        </div>
      )}

      {/* Final Result */}
      {showResult && (
        <div className="bg-green-900/20 border border-green-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-green-300">
            <CheckCircle className="w-5 h-5" />
            Forest Consensus
          </h3>
          <p className="text-2xl text-white font-bold mb-2">Final Answer: {finalAnswer}</p>
          <p className="text-sm text-green-200">
            3 out of 4 trees agreed. The rate-based reasoning is confirmed by expert evaluation.
          </p>
        </div>
      )}

      {/* FoT vs ToT Comparison */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Forest vs Tree of Thoughts</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-medium text-orange-400 mb-2">Tree-of-Thought (Single)</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• One reasoning tree</li>
              <li>• Single approach bias</li>
              <li>• May miss alternatives</li>
              <li>• Vulnerable to errors</li>
            </ul>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-medium text-green-400 mb-2">Forest-of-Thought (Multiple)</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Multiple parallel trees</li>
              <li>• Diverse approaches</li>
              <li>• Consensus validation</li>
              <li>• Error correction via voting</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-300">
          <Zap className="w-5 h-5" />
          Key Features of FoT
        </h3>
        <ul className="text-sm text-blue-200 space-y-2">
          <li>• <strong>Diverse Reasoning:</strong> Each tree explores different solution strategies</li>
          <li>• <strong>Sparse Activation:</strong> Only most relevant paths are computed</li>
          <li>• <strong>Consensus Mechanism:</strong> Majority voting identifies best answer</li>
          <li>• <strong>Expert Arbitration:</strong> Resolves conflicts when no consensus</li>
          <li>• <strong>Self-Correction:</strong> Identifies and fixes reasoning errors</li>
        </ul>
      </div>
    </div>
  );
}