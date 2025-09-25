'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GitBranch, Brain, Zap, RefreshCw, TrendingUp, Eye, Target, BarChart3, Lightbulb, PlayCircle, RotateCcw, Sparkles, Activity, ChevronRight, Pause, FastForward } from 'lucide-react';

interface TreeNode {
  id: string;
  value: number;
  visits: number;
  wins: number;
  ucb: number;
  depth: number;
  reflection: {
    score: number;
    insight: string;
    contrastive: boolean;
    improvement: number;
  } | null;
  children: TreeNode[];
  parent: string | null;
  position: { x: number; y: number };
  targetPosition: { x: number; y: number };
  isExpanded: boolean;
  isReflected: boolean;
  move: string;
  animationProgress: number;
}

interface GameScenario {
  id: string;
  name: string;
  description: string;
  optimalPath: string[];
  complexity: 'low' | 'medium' | 'high';
}

const scenarios: GameScenario[] = [
  {
    id: 'pathfinding',
    name: 'Path Finding',
    description: 'Find the optimal path through a maze',
    optimalPath: ['L', 'L', 'U', 'R', 'R'],
    complexity: 'low'
  },
  {
    id: 'puzzle',
    name: '8-Puzzle Solver',
    description: 'Solve sliding puzzle optimization',
    optimalPath: ['U', 'L', 'D', 'R', 'U'],
    complexity: 'medium'
  },
  {
    id: 'game',
    name: 'Game Strategy',
    description: 'Find winning strategy in adversarial game',
    optimalPath: ['A', 'B', 'A', 'C', 'B'],
    complexity: 'high'
  }
];

export default function RMCTSDemo() {
  // Initialize with demo children for visibility
  const createInitialTree = (): TreeNode => ({
    id: 'root',
    value: 0.5,
    visits: 10,
    wins: 5,
    ucb: 0,
    depth: 0,
    reflection: null,
    children: [
      {
        id: 'root-L',
        value: 0.6,
        visits: 3,
        wins: 2,
        ucb: 1.2,
        depth: 1,
        reflection: null,
        children: [],
        parent: 'root',
        position: { x: 100, y: 100 },
        targetPosition: { x: 100, y: 100 },
        isExpanded: false,
        isReflected: false,
        move: 'L',
        animationProgress: 1
      },
      {
        id: 'root-R',
        value: 0.4,
        visits: 4,
        wins: 1,
        ucb: 0.8,
        depth: 1,
        reflection: null,
        children: [],
        parent: 'root',
        position: { x: 280, y: 100 },
        targetPosition: { x: 280, y: 100 },
        isExpanded: false,
        isReflected: false,
        move: 'R',
        animationProgress: 1
      }
    ],
    parent: null,
    position: { x: 190, y: 30 },
    targetPosition: { x: 190, y: 30 },
    isExpanded: true,
    isReflected: false,
    move: 'Start',
    animationProgress: 1
  });

  const [standardTree, setStandardTree] = useState<TreeNode>(createInitialTree());
  const [reflectiveTree, setReflectiveTree] = useState<TreeNode>(() => {
    const tree = createInitialTree();
    // Add reflection to one node for demo visibility
    if (tree.children[0]) {
      tree.children[0].isReflected = true;
      tree.children[0].reflection = {
        score: 0.8,
        insight: 'High potential path detected',
        contrastive: true,
        improvement: 0.2
      };
    }
    return tree;
  });

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [autoRun, setAutoRun] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'selection' | 'expansion' | 'simulation' | 'backpropagation' | 'reflection'>('idle');
  const [selectedPath, setSelectedPath] = useState<{ standard: string[], reflective: string[] }>({ standard: [], reflective: [] });
  const [reflectionInsights, setReflectionInsights] = useState<string[]>([]);
  const [explorationBonus, setExplorationBonus] = useState(1.4);
  const [speed, setSpeed] = useState(1);

  const [metrics, setMetrics] = useState({
    standard: {
      totalNodes: 1,
      averageDepth: 0,
      bestValue: 0,
      explorationEfficiency: 0,
      convergenceRate: 0
    },
    reflective: {
      totalNodes: 1,
      reflectedNodes: 0,
      averageDepth: 0,
      bestValue: 0,
      explorationEfficiency: 0,
      convergenceRate: 0
    }
  });

  const standardCanvasRef = useRef<HTMLCanvasElement>(null);
  const reflectiveCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const possibleMoves = ['U', 'D', 'L', 'R']; // Up, Down, Left, Right

  const calculateUCB = (node: TreeNode, parentVisits: number, withReflection: boolean): number => {
    if (node.visits === 0) return Infinity;

    const exploitation = node.wins / node.visits;
    const exploration = explorationBonus * Math.sqrt(Math.log(parentVisits) / node.visits);

    let reflectionBonus = 0;
    if (withReflection && node.reflection) {
      // Stronger bonus for contrastive reflections
      reflectionBonus = node.reflection.contrastive
        ? 0.3 * node.reflection.score
        : 0.15 * node.reflection.score;

      // Additional bonus based on improvement potential
      reflectionBonus += node.reflection.improvement * 0.1;
    }

    return exploitation + exploration + reflectionBonus;
  };

  const generateReflection = (node: TreeNode, siblings: TreeNode[]): void => {
    // Compare with siblings for contrastive insights
    const avgSiblingValue = siblings.length > 0
      ? siblings.reduce((sum, s) => sum + (s.visits > 0 ? s.wins / s.visits : 0), 0) / siblings.length
      : 0;

    const nodeValue = node.visits > 0 ? node.wins / node.visits : 0;
    const isContrastive = Math.abs(nodeValue - avgSiblingValue) > 0.2;

    const insights = [
      'High potential detected - prioritize exploration',
      'Contrasts with siblings suggest alternative strategy',
      'Pattern: diminishing returns, consider alternatives',
      'Variance indicates uncertainty - needs more samples',
      'Stable trajectory confirms hypothesis',
      'Unexpected success - investigate further',
      'Suboptimal path detected - reduce priority'
    ];

    const score = 0.5 + Math.random() * 0.5;
    const improvement = isContrastive ? 0.3 + Math.random() * 0.4 : Math.random() * 0.3;

    node.reflection = {
      score,
      insight: insights[Math.floor(Math.random() * insights.length)],
      contrastive: isContrastive,
      improvement
    };
    node.isReflected = true;
  };

  const layoutTree = (node: TreeNode, x: number, y: number, spread: number): void => {
    node.targetPosition = { x, y };
    node.position = node.position || { x, y };

    if (node.children.length === 0) return;

    const childSpread = spread / 1.5;
    const totalWidth = spread * (node.children.length - 1);
    const startX = x - totalWidth / 2;

    node.children.forEach((child, index) => {
      layoutTree(
        child,
        startX + index * spread,
        y + 80,
        childSpread
      );
    });
  };

  const animateNodePositions = (node: TreeNode): void => {
    const speed = 0.1;
    node.position.x += (node.targetPosition.x - node.position.x) * speed;
    node.position.y += (node.targetPosition.y - node.position.y) * speed;
    node.animationProgress = Math.min(1, node.animationProgress + 0.05);

    node.children.forEach(animateNodePositions);
  };

  const drawTree = (canvas: HTMLCanvasElement, tree: TreeNode, path: string[], isReflective: boolean) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 380;
    const height = 400;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    // Animate positions
    animateNodePositions(tree);

    // Draw connections
    const drawConnections = (node: TreeNode) => {
      node.children.forEach(child => {
        const gradient = ctx.createLinearGradient(
          node.position.x, node.position.y,
          child.position.x, child.position.y
        );

        if (path.includes(node.id) && path.includes(child.id)) {
          gradient.addColorStop(0, '#3b82f6');
          gradient.addColorStop(1, '#60a5fa');
          ctx.lineWidth = 3;
        } else if (child.isReflected && isReflective) {
          gradient.addColorStop(0, '#8b5cf6');
          gradient.addColorStop(1, '#a78bfa');
          ctx.lineWidth = 2;
        } else {
          gradient.addColorStop(0, '#475569');
          gradient.addColorStop(1, '#64748b');
          ctx.lineWidth = 1;
        }

        ctx.beginPath();
        ctx.moveTo(node.position.x, node.position.y);
        ctx.lineTo(child.position.x, child.position.y);
        ctx.strokeStyle = gradient;
        ctx.stroke();

        drawConnections(child);
      });
    };

    // Draw nodes
    const drawNode = (node: TreeNode) => {
      const radius = Math.max(15, 25 - node.depth * 2);

      // Draw node shadow
      ctx.beginPath();
      ctx.arc(node.position.x + 2, node.position.y + 2, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fill();

      // Node fill
      if (node.isReflected && isReflective) {
        const gradient = ctx.createRadialGradient(
          node.position.x, node.position.y, 0,
          node.position.x, node.position.y, radius
        );
        if (node.reflection?.contrastive) {
          gradient.addColorStop(0, '#f59e0b');
          gradient.addColorStop(1, '#f97316');
        } else {
          gradient.addColorStop(0, '#8b5cf6');
          gradient.addColorStop(1, '#7c3aed');
        }
        ctx.fillStyle = gradient;
      } else if (path.includes(node.id)) {
        ctx.fillStyle = '#3b82f6';
      } else if (node.visits > 0) {
        const intensity = Math.min(node.visits / 20, 1);
        const green = Math.floor(197 * intensity);
        ctx.fillStyle = `rgb(34, ${green}, 94)`;
      } else {
        ctx.fillStyle = '#334155';
      }

      ctx.beginPath();
      ctx.arc(node.position.x, node.position.y, radius * node.animationProgress, 0, 2 * Math.PI);
      ctx.fill();

      // Border
      ctx.strokeStyle = path.includes(node.id) ? '#60a5fa' : '#64748b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Reflection star indicator
      if (node.reflection && node.reflection.contrastive && isReflective) {
        ctx.save();
        ctx.translate(node.position.x + radius * 0.7, node.position.y - radius * 0.7);
        ctx.fillStyle = '#fbbf24';
        ctx.font = '12px sans-serif';
        ctx.fillText('✨', -6, 4);
        ctx.restore();
      }

      // Node label
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${10 - Math.min(node.depth, 3)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (node.visits > 0) {
        const winRate = ((node.wins / node.visits) * 100).toFixed(0);
        ctx.fillText(`${winRate}%`, node.position.x, node.position.y);
      } else if (node.id === 'root') {
        ctx.fillText('Start', node.position.x, node.position.y);
      } else {
        ctx.fillText(node.move, node.position.x, node.position.y);
      }

      // Visits badge
      if (node.visits > 0) {
        ctx.font = '9px sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`${node.visits}v`, node.position.x, node.position.y + radius + 12);
      }

      // Draw children
      node.children.forEach(child => drawNode(child));
    };

    drawConnections(tree);
    drawNode(tree);
  };

  const expandNode = (parent: TreeNode, useReflection: boolean): TreeNode => {
    if (parent.depth >= 5) return parent; // Limit depth

    const numChildren = Math.min(4, Math.max(2, 4 - parent.depth));
    const newChildren: TreeNode[] = [];

    const availableMoves = possibleMoves.filter(move =>
      !parent.children.some(child => child.move === move)
    );

    for (let i = 0; i < Math.min(numChildren, availableMoves.length); i++) {
      const childId = `${parent.id}-${availableMoves[i]}`;

      newChildren.push({
        id: childId,
        value: Math.random(),
        visits: 0,
        wins: 0,
        ucb: Infinity,
        depth: parent.depth + 1,
        reflection: null,
        children: [],
        parent: parent.id,
        position: { ...parent.position },
        targetPosition: { ...parent.position },
        isExpanded: false,
        isReflected: false,
        move: availableMoves[i],
        animationProgress: 0
      });
    }

    parent.children = [...parent.children, ...newChildren];
    parent.isExpanded = true;
    return parent;
  };

  const selectNode = (node: TreeNode, useReflection: boolean): TreeNode => {
    if (!node.isExpanded && node.visits > 0) {
      return node;
    }

    if (node.children.length === 0) {
      return node;
    }

    // Calculate UCB for all children
    node.children.forEach(child => {
      child.ucb = calculateUCB(child, node.visits, useReflection);
    });

    // Select child with highest UCB
    const selected = node.children.reduce((best, child) =>
      child.ucb > best.ucb ? child : best
    );

    return selectNode(selected, useReflection);
  };

  const simulateGame = (node: TreeNode, scenario: GameScenario): number => {
    // Simulate based on how close the path is to optimal
    const path = getNodePath(node);
    const moves = path.map(n => n.move).filter(m => m !== 'Start');

    let score = Math.random() * 0.5; // Base random score

    // Bonus for matching optimal path
    scenario.optimalPath.forEach((optimalMove, index) => {
      if (moves[index] === optimalMove) {
        score += 0.1;
      }
    });

    return Math.min(1, score);
  };

  const getNodePath = (node: TreeNode): TreeNode[] => {
    const path: TreeNode[] = [node];
    let current = node;

    while (current.parent) {
      // This is simplified - in real implementation we'd search the tree
      current = { ...current, parent: null } as TreeNode;
      break;
    }

    return path;
  };

  const backpropagate = (tree: TreeNode, nodeId: string, value: number): TreeNode => {
    const updateNode = (node: TreeNode): TreeNode => {
      if (node.id === nodeId || node.children.some(child => containsNode(child, nodeId))) {
        if (node.id === nodeId) {
          node.visits++;
          node.wins += value;
        }
        node.children = node.children.map(child => updateNode(child));

        // Update parent stats
        if (containsNode(node, nodeId)) {
          node.visits++;
          node.wins += value;
        }
      }
      return node;
    };

    return updateNode(tree);
  };

  const containsNode = (tree: TreeNode, nodeId: string): boolean => {
    if (tree.id === nodeId) return true;
    return tree.children.some(child => containsNode(child, nodeId));
  };

  const findNode = (root: TreeNode, nodeId: string): TreeNode | null => {
    if (root.id === nodeId) return root;
    for (const child of root.children) {
      const found = findNode(child, nodeId);
      if (found) return found;
    }
    return null;
  };

  const getPath = (root: TreeNode, nodeId: string): string[] => {
    const path: string[] = [];

    const buildPath = (node: TreeNode): boolean => {
      path.push(node.id);
      if (node.id === nodeId) return true;

      for (const child of node.children) {
        if (buildPath(child)) return true;
      }

      path.pop();
      return false;
    };

    buildPath(root);
    return path;
  };

  const runIteration = async (isReflective: boolean) => {
    const tree = isReflective ? reflectiveTree : standardTree;
    const setTreeFunc = isReflective ? setReflectiveTree : setStandardTree;

    // Selection
    setCurrentPhase('selection');
    const selected = selectNode(tree, isReflective);
    const path = getPath(tree, selected.id);
    setSelectedPath(prev => ({ ...prev, [isReflective ? 'reflective' : 'standard']: path }));
    await new Promise(resolve => setTimeout(resolve, 800 / speed));

    // Expansion
    if (!selected.isExpanded && selected.visits > 0) {
      setCurrentPhase('expansion');
      let updatedTree = { ...tree };
      const nodeToExpand = findNode(updatedTree, selected.id);
      if (nodeToExpand) {
        expandNode(nodeToExpand, isReflective);
        layoutTree(updatedTree, updatedTree.position.x, updatedTree.position.y, 120);
        setTreeFunc(updatedTree);
        await new Promise(resolve => setTimeout(resolve, 800 / speed));
      }
    }

    // Simulation
    setCurrentPhase('simulation');
    const value = simulateGame(selected, selectedScenario);
    await new Promise(resolve => setTimeout(resolve, 600 / speed));

    // Backpropagation
    setCurrentPhase('backpropagation');
    let updatedTree = backpropagate({ ...tree }, selected.id, value);
    setTreeFunc(updatedTree);
    await new Promise(resolve => setTimeout(resolve, 600 / speed));

    // Reflection (only for reflective tree)
    if (isReflective && Math.random() > 0.4) {
      setCurrentPhase('reflection');

      const reflectOnNodes = (node: TreeNode) => {
        if (node.visits > 2 && !node.isReflected && Math.random() > 0.5) {
          generateReflection(node, node.children);

          if (node.reflection?.contrastive) {
            setReflectionInsights(prev => [
              `${node.move}: ${node.reflection.insight}`,
              ...prev
            ].slice(0, 5));
          }
        }
        node.children.forEach(reflectOnNodes);
      };

      reflectOnNodes(updatedTree);
      setTreeFunc({ ...updatedTree });
      await new Promise(resolve => setTimeout(resolve, 800 / speed));
    }

    setCurrentPhase('idle');
    setSelectedPath({ standard: [], reflective: [] });

    // Update metrics
    updateMetrics();
  };

  const updateMetrics = () => {
    const calculateStats = (tree: TreeNode, isReflective: boolean) => {
      let totalNodes = 0;
      let reflectedNodes = 0;
      let totalDepth = 0;
      let maxDepth = 0;
      let bestValue = 0;

      const traverse = (node: TreeNode) => {
        totalNodes++;
        if (node.isReflected) reflectedNodes++;
        totalDepth += node.depth;
        maxDepth = Math.max(maxDepth, node.depth);
        if (node.visits > 0) {
          bestValue = Math.max(bestValue, node.wins / node.visits);
        }
        node.children.forEach(traverse);
      };

      traverse(tree);

      const avgDepth = totalNodes > 0 ? totalDepth / totalNodes : 0;
      const explorationEff = totalNodes > 0 ? (maxDepth / Math.log(totalNodes + 1)) * 20 : 0;
      const convergence = bestValue * 100;

      return {
        totalNodes,
        reflectedNodes,
        averageDepth: avgDepth,
        bestValue,
        explorationEfficiency: explorationEff,
        convergenceRate: convergence
      };
    };

    setMetrics({
      standard: calculateStats(standardTree, false),
      reflective: calculateStats(reflectiveTree, true)
    });
  };

  const runComparison = async () => {
    setIsRunning(true);
    setIsPaused(false);

    // Run both trees in parallel
    await Promise.all([
      runIteration(false),
      runIteration(true)
    ]);

    setIsRunning(false);

    if (autoRun && !isPaused) {
      setTimeout(() => runComparison(), 100);
    }
  };

  const reset = () => {
    const newTree = createInitialTree();

    setStandardTree(newTree);
    setReflectiveTree(createInitialTree());
    setSelectedPath({ standard: [], reflective: [] });
    setReflectionInsights([]);
    setMetrics({
      standard: { totalNodes: 1, averageDepth: 0, bestValue: 0, explorationEfficiency: 0, convergenceRate: 0 },
      reflective: { totalNodes: 1, reflectedNodes: 0, averageDepth: 0, bestValue: 0, explorationEfficiency: 0, convergenceRate: 0 }
    });
    setCurrentPhase('idle');
    setIsRunning(false);
    setAutoRun(false);
  };

  useEffect(() => {
    const animate = () => {
      if (standardCanvasRef.current && reflectiveCanvasRef.current) {
        drawTree(standardCanvasRef.current, standardTree, selectedPath.standard, false);
        drawTree(reflectiveCanvasRef.current, reflectiveTree, selectedPath.reflective, true);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [standardTree, reflectiveTree, selectedPath]);

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'selection': return <Target className="w-4 h-4" />;
      case 'expansion': return <GitBranch className="w-4 h-4" />;
      case 'simulation': return <PlayCircle className="w-4 h-4" />;
      case 'backpropagation': return <TrendingUp className="w-4 h-4" />;
      case 'reflection': return <Eye className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Reflective Monte Carlo Tree Search (R-MCTS)</h2>
        <p className="text-slate-400 max-w-3xl mx-auto">
          Compare standard MCTS with R-MCTS enhanced by contrastive reflection.
          Watch how reflection improves exploration efficiency and convergence.
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Select Scenario</h3>
        <div className="grid grid-cols-3 gap-3">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => !isRunning && setSelectedScenario(scenario)}
              disabled={isRunning}
              className={`p-3 rounded-lg border transition-all ${
                selectedScenario.id === scenario.id
                  ? 'bg-blue-900/30 border-blue-600'
                  : 'bg-slate-800/50 border-slate-600 hover:bg-slate-700/50'
              } ${isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="text-sm font-medium text-white">{scenario.name}</div>
              <div className="text-xs text-slate-400 mt-1">{scenario.description}</div>
              <div className={`text-xs mt-2 inline-block px-2 py-1 rounded ${
                scenario.complexity === 'low' ? 'bg-green-900/30 text-green-400' :
                scenario.complexity === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                'bg-red-900/30 text-red-400'
              }`}>
                {scenario.complexity}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={runComparison}
              disabled={isRunning || autoRun}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              Run Step
            </button>

            <button
              onClick={() => {
                setAutoRun(!autoRun);
                if (!autoRun && !isRunning) {
                  runComparison();
                }
              }}
              className={`px-4 py-2 ${autoRun ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg flex items-center gap-2 transition-colors`}
            >
              {autoRun ? <Pause className="w-4 h-4" /> : <FastForward className="w-4 h-4" />}
              {autoRun ? 'Stop' : 'Auto Run'}
            </button>

            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-400">Speed:</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-slate-300 w-8">{speed}x</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-400">Exploration:</label>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={explorationBonus}
                onChange={(e) => setExplorationBonus(parseFloat(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-slate-300 w-10">{explorationBonus.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-side Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Standard MCTS */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <GitBranch className="w-5 h-5 text-blue-400" />
            Standard MCTS
          </h3>
          <div className="bg-slate-800/50 rounded-lg p-2 mb-4" style={{ minHeight: '400px' }}>
            <canvas ref={standardCanvasRef} style={{ display: 'block', width: '380px', height: '400px' }} />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Nodes Explored</span>
              <span className="text-white font-mono">{metrics.standard.totalNodes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Average Depth</span>
              <span className="text-white font-mono">{metrics.standard.averageDepth.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Best Value</span>
              <span className="text-green-400 font-mono">{(metrics.standard.bestValue * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Exploration Efficiency</span>
              <span className="text-blue-400 font-mono">{metrics.standard.explorationEfficiency.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* R-MCTS with Reflection */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-purple-400" />
            R-MCTS with Reflection
          </h3>
          <div className="bg-slate-800/50 rounded-lg p-2 mb-4" style={{ minHeight: '400px' }}>
            <canvas ref={reflectiveCanvasRef} style={{ display: 'block', width: '380px', height: '400px' }} />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Nodes Explored</span>
              <span className="text-white font-mono">{metrics.reflective.totalNodes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Reflected Nodes</span>
              <span className="text-purple-400 font-mono">{metrics.reflective.reflectedNodes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Best Value</span>
              <span className="text-green-400 font-mono">{(metrics.reflective.bestValue * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Improvement</span>
              <span className={`font-mono ${
                metrics.reflective.bestValue > metrics.standard.bestValue ? 'text-green-400' : 'text-yellow-400'
              }`}>
                +{Math.max(0, (metrics.reflective.bestValue - metrics.standard.bestValue) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
        <div className="flex items-center justify-between">
          {['selection', 'expansion', 'simulation', 'backpropagation', 'reflection'].map((phase, index) => (
            <React.Fragment key={phase}>
              <div className={`flex flex-col items-center ${
                currentPhase === phase ? 'text-blue-400' : 'text-slate-600'
              }`}>
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-1 transition-all ${
                  currentPhase === phase ? 'border-blue-400 bg-blue-900/30' : 'border-slate-600'
                }`}>
                  {getPhaseIcon(phase)}
                </div>
                <span className="text-xs capitalize">{phase}</span>
              </div>
              {index < 4 && (
                <ChevronRight className={`w-4 h-4 ${
                  currentPhase === phase ? 'text-blue-400' : 'text-slate-600'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Reflection Insights */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Lightbulb className="w-5 h-5 text-purple-400" />
          Latest Reflection Insights
        </h3>
        <div className="space-y-2">
          {reflectionInsights.length > 0 ? (
            reflectionInsights.map((insight, index) => (
              <div
                key={index}
                className="p-3 bg-purple-900/20 border border-purple-800/30 rounded-lg flex items-start gap-2"
              >
                <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-purple-200">{insight}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">
              No reflections generated yet. Run iterations to see contrastive insights.
            </p>
          )}
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <BarChart3 className="w-5 h-5 text-green-400" />
          Performance Comparison
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {((metrics.reflective.explorationEfficiency / Math.max(1, metrics.standard.explorationEfficiency) - 1) * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-slate-400">Better Exploration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {metrics.reflective.reflectedNodes}
            </div>
            <div className="text-xs text-slate-400">Reflections Generated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {((metrics.reflective.convergenceRate / Math.max(1, metrics.standard.convergenceRate) - 1) * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-slate-400">Faster Convergence</div>
          </div>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-6">
        <h4 className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
          <Brain className="w-4 h-4" />
          How R-MCTS Enhances Standard MCTS
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-xs text-blue-200">
          <div>
            <h5 className="font-semibold text-blue-300 mb-2">Standard MCTS</h5>
            <ul className="space-y-1">
              <li>• Uses UCB for exploration/exploitation balance</li>
              <li>• Random simulations for value estimation</li>
              <li>• Gradual convergence through iterations</li>
              <li>• No learning between branches</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-purple-300 mb-2">R-MCTS Enhancements</h5>
            <ul className="space-y-1">
              <li>• <strong>Contrastive Reflection:</strong> Compares siblings for insights</li>
              <li>• <strong>Reflection Bonus:</strong> Guides exploration to promising areas</li>
              <li>• <strong>Pattern Detection:</strong> Identifies trends and anomalies</li>
              <li>• <strong>Accelerated Learning:</strong> Transfers knowledge across branches</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}