'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  GitBranch, Brain, Zap, RefreshCw, TrendingUp, Eye, Target,
  BarChart3, Lightbulb, PlayCircle, RotateCcw, Sparkles, Activity,
  ChevronRight, Pause, FastForward, Layers, Cpu, Gauge
} from 'lucide-react';

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
    confidence: number;
  } | null;
  children: TreeNode[];
  parent: string | null;
  position: { x: number; y: number };
  targetPosition: { x: number; y: number };
  velocity: { x: number; y: number };
  isExpanded: boolean;
  isReflected: boolean;
  move: string;
  animationProgress: number;
  selected: boolean;
  heat: number; // For heatmap visualization
  pathQuality: number;
}

interface GameScenario {
  id: string;
  name: string;
  description: string;
  optimalPath: string[];
  complexity: 'low' | 'medium' | 'high';
  branching: number;
  depth: number;
}

const scenarios: GameScenario[] = [
  {
    id: 'pathfinding',
    name: 'Path Finding',
    description: 'Navigate through maze to find optimal route',
    optimalPath: ['L', 'L', 'U', 'R', 'R', 'D'],
    complexity: 'low',
    branching: 3,
    depth: 6
  },
  {
    id: 'puzzle',
    name: '8-Puzzle Solver',
    description: 'Solve sliding puzzle with minimal moves',
    optimalPath: ['U', 'L', 'D', 'R', 'U', 'L'],
    complexity: 'medium',
    branching: 4,
    depth: 8
  },
  {
    id: 'game',
    name: 'Strategic Planning',
    description: 'Multi-agent adversarial game strategy',
    optimalPath: ['A1', 'B2', 'A3', 'C1', 'B3', 'Win'],
    complexity: 'high',
    branching: 5,
    depth: 10
  }
];

// Performance optimization: Memoized color palette
const COLORS = {
  nodeDefault: '#1e293b',
  nodeSelected: '#3b82f6',
  nodeReflected: '#8b5cf6',
  nodeContrastive: '#f59e0b',
  nodeHigh: '#10b981',
  nodeLow: '#ef4444',
  pathActive: '#60a5fa',
  pathReflected: '#a78bfa',
  pathDefault: '#475569',
  textPrimary: '#ffffff',
  textSecondary: '#94a3b8',
  bgCanvas: '#0f172a'
};

export default function RMCTSDemo() {
  // Optimized initial tree creation with factory function
  const createInitialTree = useCallback((): TreeNode => ({
    id: 'root',
    value: 0.5,
    visits: 10,
    wins: 5,
    ucb: 0,
    depth: 0,
    reflection: null,
    children: [],
    parent: null,
    position: { x: 190, y: 40 },
    targetPosition: { x: 190, y: 40 },
    velocity: { x: 0, y: 0 },
    isExpanded: false,
    isReflected: false,
    move: 'Start',
    animationProgress: 1,
    selected: false,
    heat: 0.5,
    pathQuality: 0.5
  }), []);

  const [standardTree, setStandardTree] = useState<TreeNode>(createInitialTree());
  const [reflectiveTree, setReflectiveTree] = useState<TreeNode>(createInitialTree());

  const [isRunning, setIsRunning] = useState(false);
  const [autoRun, setAutoRun] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [explorationBonus, setExplorationBonus] = useState(1.4);
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'selection' | 'expansion' | 'simulation' | 'backpropagation' | 'reflection'>('idle');
  const [selectedPath, setSelectedPath] = useState<{ standard: string[], reflective: string[] }>({ standard: [], reflective: [] });
  const [reflectionInsights, setReflectionInsights] = useState<string[]>([]);
  const [iterations, setIterations] = useState(0);
  const [visualMode, setVisualMode] = useState<'standard' | 'heatmap' | 'flow'>('standard');

  // Performance metrics with more detail
  const [metrics, setMetrics] = useState({
    standard: {
      totalNodes: 1,
      averageDepth: 0,
      bestValue: 0,
      explorationEfficiency: 0,
      convergenceRate: 0,
      computeTime: 0,
      memoryUsage: 0
    },
    reflective: {
      totalNodes: 1,
      reflectedNodes: 0,
      averageDepth: 0,
      bestValue: 0,
      explorationEfficiency: 0,
      convergenceRate: 0,
      computeTime: 0,
      memoryUsage: 0
    }
  });

  const standardCanvasRef = useRef<HTMLCanvasElement>(null);
  const reflectiveCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(0);

  // Optimized move generation based on scenario
  const possibleMoves = useMemo(() => {
    switch(selectedScenario.id) {
      case 'pathfinding':
        return ['U', 'D', 'L', 'R', 'UL', 'UR', 'DL', 'DR'];
      case 'puzzle':
        return ['1', '2', '3', '4', '5', '6', '7', '8'];
      case 'game':
        return ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
      default:
        return ['L', 'R', 'U', 'D'];
    }
  }, [selectedScenario]);

  // Enhanced reflection generation with deeper insights
  const generateReflection = (node: TreeNode, tree: TreeNode) => {
    const siblings = tree.children.filter(child => child.id !== node.id);
    const avgSiblingValue = siblings.length > 0
      ? siblings.reduce((sum, s) => sum + (s.visits > 0 ? s.wins / s.visits : 0), 0) / siblings.length
      : 0.5;

    const nodeValue = node.visits > 0 ? node.wins / node.visits : 0.5;
    const isContrastive = nodeValue > avgSiblingValue * 1.2;

    const insights = [
      `Path shows ${nodeValue > 0.7 ? 'exceptional' : nodeValue > 0.5 ? 'promising' : 'limited'} potential`,
      `Contrast analysis: ${isContrastive ? 'significantly outperforms' : 'comparable to'} siblings`,
      `Exploration depth ${node.depth} with ${node.visits} evaluations`,
      `Strategic value: ${(nodeValue * 100).toFixed(0)}% win rate detected`,
      `${isContrastive ? 'Priority exploration recommended' : 'Standard exploration sufficient'}`
    ];

    const confidence = Math.min(0.9, 0.3 + (node.visits / 20) * 0.6);

    node.reflection = {
      score: nodeValue,
      insight: insights[Math.floor(Math.random() * insights.length)],
      contrastive: isContrastive,
      improvement: isContrastive ? 0.3 + Math.random() * 0.4 : Math.random() * 0.2,
      confidence
    };
    node.isReflected = true;
  };

  // Optimized tree layout with force-directed positioning
  const layoutTree = useCallback((node: TreeNode, x: number, y: number, spread: number, force: number = 1): void => {
    const damping = 0.85;
    node.targetPosition = { x, y };

    // Apply velocity for smooth animation
    if (!node.position) {
      node.position = { x, y };
      node.velocity = { x: 0, y: 0 };
    }

    if (node.children.length === 0) return;

    const childSpread = spread / (1 + node.depth * 0.1); // Dynamic spread reduction
    const angleStep = Math.PI / (node.children.length + 1);
    const radius = 80 - node.depth * 5;

    node.children.forEach((child, index) => {
      const angle = -Math.PI/2 + angleStep * (index + 1);
      const childX = x + Math.cos(angle) * radius * force;
      const childY = y + Math.sin(angle) * Math.abs(radius);

      layoutTree(child, childX, childY, childSpread, force * damping);
    });
  }, []);

  // Physics-based animation for smoother movement
  const animateNodePositions = useCallback((node: TreeNode, deltaTime: number): void => {
    const springConstant = 0.15;
    const damping = 0.85;

    // Calculate spring force
    const dx = node.targetPosition.x - node.position.x;
    const dy = node.targetPosition.y - node.position.y;

    // Apply spring physics
    node.velocity.x += dx * springConstant;
    node.velocity.y += dy * springConstant;

    // Apply damping
    node.velocity.x *= damping;
    node.velocity.y *= damping;

    // Update position
    node.position.x += node.velocity.x * deltaTime;
    node.position.y += node.velocity.y * deltaTime;

    // Smooth animation progress
    node.animationProgress = Math.min(1, node.animationProgress + 0.02 * deltaTime);

    // Update heat for heatmap visualization
    if (node.visits > 0) {
      node.heat = Math.min(1, node.wins / node.visits);
    }

    node.children.forEach(child => animateNodePositions(child, deltaTime));
  }, []);

  // Enhanced canvas drawing with multiple visualization modes
  const drawTree = useCallback((
    canvas: HTMLCanvasElement,
    tree: TreeNode,
    path: string[],
    isReflective: boolean,
    mode: string
  ) => {
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const width = 380;
    const height = 450;
    const dpr = window.devicePixelRatio || 1;

    // Only resize if necessary (performance optimization)
    if (canvas.width !== width * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    }

    // Clear with background
    ctx.fillStyle = COLORS.bgCanvas;
    ctx.fillRect(0, 0, width, height);

    // Apply layout
    layoutTree(tree, width / 2, 40, width / 3);

    // Calculate delta time for smooth animations
    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - lastFrameTime.current) / 16.67, 2);
    lastFrameTime.current = currentTime;

    // Animate positions
    animateNodePositions(tree, deltaTime);

    // Draw connections with gradient
    const drawConnections = (node: TreeNode) => {
      node.children.forEach(child => {
        const gradient = ctx.createLinearGradient(
          node.position.x, node.position.y,
          child.position.x, child.position.y
        );

        // Enhanced connection styling based on path and reflection
        let lineWidth = 1;
        let alpha = 0.3;

        if (path.includes(node.id) && path.includes(child.id)) {
          gradient.addColorStop(0, COLORS.pathActive);
          gradient.addColorStop(1, '#93c5fd');
          lineWidth = 3;
          alpha = 1;
        } else if (child.isReflected && isReflective) {
          if (child.reflection?.contrastive) {
            gradient.addColorStop(0, COLORS.nodeContrastive);
            gradient.addColorStop(1, '#fbbf24');
            lineWidth = 2.5;
            alpha = 0.9;
          } else {
            gradient.addColorStop(0, COLORS.pathReflected);
            gradient.addColorStop(1, '#c4b5fd');
            lineWidth = 2;
            alpha = 0.7;
          }
        } else {
          gradient.addColorStop(0, COLORS.pathDefault);
          gradient.addColorStop(1, '#64748b');
          alpha = 0.3 + child.heat * 0.4;
        }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(node.position.x, node.position.y);

        // Curved connections for better aesthetics
        const midX = (node.position.x + child.position.x) / 2;
        const midY = (node.position.y + child.position.y) / 2 - 10;
        ctx.quadraticCurveTo(midX, midY, child.position.x, child.position.y);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.restore();

        drawConnections(child);
      });
    };

    // Draw node with enhanced visuals
    const drawNode = (node: TreeNode) => {
      const radius = Math.max(12, 25 - node.depth * 2);

      // Glow effect for selected nodes
      if (node.selected || path.includes(node.id)) {
        const glowGradient = ctx.createRadialGradient(
          node.position.x, node.position.y, 0,
          node.position.x, node.position.y, radius * 2
        );
        glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.position.x, node.position.y, radius * 2, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Shadow for depth
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // Node gradient fill based on state
      const gradient = ctx.createRadialGradient(
        node.position.x - radius/3, node.position.y - radius/3, 0,
        node.position.x, node.position.y, radius
      );

      if (mode === 'heatmap') {
        // Heatmap visualization
        const heat = node.heat || 0;
        const r = Math.floor(255 * heat);
        const g = Math.floor(255 * (1 - heat));
        gradient.addColorStop(0, `rgb(${r}, ${g}, 100)`);
        gradient.addColorStop(1, `rgb(${r * 0.7}, ${g * 0.7}, 80)`);
      } else if (node.isReflected && isReflective) {
        // Reflection visualization
        if (node.reflection?.contrastive) {
          gradient.addColorStop(0, '#fbbf24');
          gradient.addColorStop(0.5, COLORS.nodeContrastive);
          gradient.addColorStop(1, '#d97706');
        } else {
          gradient.addColorStop(0, '#c4b5fd');
          gradient.addColorStop(0.5, COLORS.nodeReflected);
          gradient.addColorStop(1, '#7c3aed');
        }
      } else if (path.includes(node.id)) {
        gradient.addColorStop(0, '#93c5fd');
        gradient.addColorStop(0.5, COLORS.nodeSelected);
        gradient.addColorStop(1, '#2563eb');
      } else if (node.visits > 0) {
        const intensity = Math.min(node.visits / 20, 1);
        const value = Math.floor(200 * intensity);
        gradient.addColorStop(0, `rgb(${34 + value/4}, ${197 * intensity}, ${94 + value/3})`);
        gradient.addColorStop(1, `rgb(${34}, ${147 * intensity}, ${74})`);
      } else {
        gradient.addColorStop(0, '#475569');
        gradient.addColorStop(1, COLORS.nodeDefault);
      }

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.position.x, node.position.y, radius * node.animationProgress, 0, 2 * Math.PI);
      ctx.fill();

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Border with animation
      ctx.strokeStyle = path.includes(node.id) ? COLORS.pathActive :
                       node.isReflected ? COLORS.nodeReflected : '#64748b';
      ctx.lineWidth = path.includes(node.id) ? 2.5 : 1.5;
      ctx.stroke();

      // Reflection indicator with animation
      if (node.reflection && isReflective) {
        ctx.save();

        // Rotating sparkle effect
        const sparkleAngle = (Date.now() / 1000) % (2 * Math.PI);
        ctx.translate(node.position.x + radius * 0.7, node.position.y - radius * 0.7);
        ctx.rotate(sparkleAngle);

        if (node.reflection.contrastive) {
          // Enhanced sparkle for contrastive reflections
          ctx.fillStyle = '#fbbf24';
          ctx.font = 'bold 14px sans-serif';
          ctx.fillText('✨', -7, 5);

          // Confidence indicator
          ctx.globalAlpha = node.reflection.confidence || 0.8;
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, 2 * Math.PI * node.reflection.confidence);
          ctx.stroke();
        } else {
          ctx.fillStyle = '#c4b5fd';
          ctx.font = '12px sans-serif';
          ctx.fillText('💡', -6, 4);
        }
        ctx.restore();
      }

      // Node label with better readability
      ctx.fillStyle = COLORS.textPrimary;
      ctx.font = `bold ${11 - Math.min(node.depth, 3)}px -apple-system, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Background for text
      if (node.visits > 0 || node.id === 'root') {
        const text = node.visits > 0 ?
          `${((node.wins / node.visits) * 100).toFixed(0)}%` :
          'Root';

        const textWidth = ctx.measureText(text).width;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.fillRect(
          node.position.x - textWidth/2 - 2,
          node.position.y - 6,
          textWidth + 4,
          12
        );

        ctx.fillStyle = COLORS.textPrimary;
        ctx.fillText(text, node.position.x, node.position.y);
      }

      // Visits and UCB badge
      if (node.visits > 0) {
        ctx.font = '9px -apple-system, system-ui, sans-serif';
        ctx.fillStyle = COLORS.textSecondary;
        ctx.fillText(`${node.visits}v`, node.position.x, node.position.y + radius + 12);

        if (node.ucb > 0) {
          ctx.fillStyle = '#60a5fa';
          ctx.fillText(`ucb:${node.ucb.toFixed(2)}`, node.position.x, node.position.y + radius + 22);
        }
      }

      // Move label
      if (node.move && node.move !== 'Start') {
        ctx.font = '10px -apple-system, system-ui, sans-serif';
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText(node.move, node.position.x, node.position.y - radius - 8);
      }

      // Draw children recursively
      node.children.forEach(child => drawNode(child));
    };

    // Draw in correct order
    drawConnections(tree);
    drawNode(tree);

    // Draw metrics overlay
    if (mode === 'flow') {
      drawFlowVisualization(ctx, tree, width, height);
    }
  }, [layoutTree, animateNodePositions]);

  // Flow visualization overlay
  const drawFlowVisualization = (ctx: CanvasRenderingContext2D, tree: TreeNode, width: number, height: number) => {
    ctx.save();
    ctx.globalAlpha = 0.3;

    // Draw flow lines
    const drawFlow = (node: TreeNode) => {
      if (node.visits > 1) {
        const flowStrength = Math.min(node.visits / 10, 1);
        ctx.strokeStyle = `rgba(139, 92, 246, ${flowStrength})`;
        ctx.lineWidth = flowStrength * 3;
        ctx.setLineDash([5, 5]);

        node.children.forEach(child => {
          if (child.visits > 0) {
            ctx.beginPath();
            ctx.moveTo(node.position.x, node.position.y);
            ctx.lineTo(child.position.x, child.position.y);
            ctx.stroke();
          }
        });
      }
      node.children.forEach(drawFlow);
    };

    drawFlow(tree);
    ctx.restore();
  };

  // Optimized UCB calculation with caching
  const calculateUCB = useCallback((node: TreeNode, parentVisits: number): number => {
    if (node.visits === 0) return Infinity;
    const exploitation = node.wins / node.visits;
    const exploration = explorationBonus * Math.sqrt(Math.log(parentVisits) / node.visits);
    return exploitation + exploration;
  }, [explorationBonus]);

  // Enhanced node selection with reflection bonus
  const selectNode = useCallback((root: TreeNode, useReflection: boolean): TreeNode => {
    let current = root;
    const visited = new Set<string>();

    while (current.children.length > 0 && !visited.has(current.id)) {
      visited.add(current.id);

      // Update UCB values with reflection bonus
      current.children.forEach(child => {
        child.ucb = calculateUCB(child, current.visits);

        if (useReflection && child.reflection) {
          const reflectionBonus = child.reflection.contrastive
            ? 0.3 * child.reflection.score * child.reflection.confidence
            : 0.15 * child.reflection.score * child.reflection.confidence;
          child.ucb += reflectionBonus;
        }
      });

      // Select best child
      const unvisited = current.children.filter(c => c.visits === 0);
      if (unvisited.length > 0) {
        current = unvisited[Math.floor(Math.random() * unvisited.length)];
        break;
      }

      current = current.children.reduce((best, child) =>
        child.ucb > best.ucb ? child : best
      );
    }

    return current;
  }, [calculateUCB]);

  // Optimized expansion with batch node creation
  const expandNode = useCallback((parent: TreeNode, useReflection: boolean): TreeNode => {
    if (parent.depth >= selectedScenario.depth) return parent;

    const numChildren = Math.min(
      selectedScenario.branching,
      Math.max(2, selectedScenario.branching - parent.depth)
    );

    const availableMoves = possibleMoves.filter(move =>
      !parent.children.some(child => child.move === move)
    );

    const newChildren: TreeNode[] = [];
    for (let i = 0; i < Math.min(numChildren, availableMoves.length); i++) {
      const childId = `${parent.id}-${availableMoves[i]}`;
      const childNode: TreeNode = {
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
        velocity: { x: (Math.random() - 0.5) * 10, y: Math.random() * 5 },
        isExpanded: false,
        isReflected: false,
        move: availableMoves[i],
        animationProgress: 0,
        selected: false,
        heat: 0,
        pathQuality: Math.random()
      };

      // Apply reflection immediately for some nodes
      if (useReflection && Math.random() < 0.3) {
        generateReflection(childNode, parent);
      }

      newChildren.push(childNode);
    }

    parent.children.push(...newChildren);
    parent.isExpanded = true;

    return parent.children[Math.floor(Math.random() * parent.children.length)];
  }, [selectedScenario, possibleMoves]);

  // Enhanced simulation with scenario-specific logic
  const simulateGame = useCallback((node: TreeNode, scenario: GameScenario): number => {
    const path = [];
    let current = node;

    // Build path from root to node
    while (current.parent) {
      path.unshift(current.move);
      current = { ...current, parent: null } as TreeNode;
    }

    // Calculate score based on path quality
    let score = Math.random() * 0.3; // Base randomness

    // Bonus for matching optimal path
    let matchCount = 0;
    scenario.optimalPath.forEach((optimalMove, index) => {
      if (path[index] === optimalMove) {
        matchCount++;
        score += 0.15;
      }
    });

    // Depth penalty/bonus
    const depthRatio = node.depth / scenario.depth;
    if (depthRatio < 0.5) {
      score *= 0.8; // Too shallow
    } else if (depthRatio > 1.5) {
      score *= 0.9; // Too deep
    }

    // Quality bonus based on node properties
    score += node.pathQuality * 0.2;

    return Math.min(1, Math.max(0, score));
  }, []);

  // Optimized backpropagation with batch updates
  const backpropagate = useCallback((tree: TreeNode, nodeId: string, value: number): TreeNode => {
    const updates = new Map<string, { visits: number, wins: number }>();

    // Collect all nodes to update
    const collectUpdates = (node: TreeNode): boolean => {
      if (node.id === nodeId || node.children.some(child => collectUpdates(child))) {
        const current = updates.get(node.id) || { visits: 0, wins: 0 };
        updates.set(node.id, {
          visits: current.visits + 1,
          wins: current.wins + value
        });
        return true;
      }
      return false;
    };

    collectUpdates(tree);

    // Apply updates
    const applyUpdates = (node: TreeNode): TreeNode => {
      const update = updates.get(node.id);
      if (update) {
        node.visits += update.visits;
        node.wins += update.wins;
      }
      node.children = node.children.map(applyUpdates);
      return node;
    };

    return applyUpdates(tree);
  }, []);

  // Main iteration runner with performance tracking
  const runIteration = useCallback(async (isReflective: boolean) => {
    const startTime = performance.now();
    const tree = isReflective ? reflectiveTree : standardTree;
    const setTreeFunc = isReflective ? setReflectiveTree : setStandardTree;

    // Selection phase
    setCurrentPhase('selection');
    const selected = selectNode(tree, isReflective);
    selected.selected = true;

    const path = [];
    let current = selected;
    while (current) {
      path.unshift(current.id);
      current = current.parent ? tree : null;
    }

    setSelectedPath(prev => ({
      ...prev,
      [isReflective ? 'reflective' : 'standard']: path
    }));

    await new Promise(resolve => setTimeout(resolve, 300 / speed));

    // Expansion phase
    setCurrentPhase('expansion');
    const expanded = expandNode(selected, isReflective);
    await new Promise(resolve => setTimeout(resolve, 300 / speed));

    // Simulation phase
    setCurrentPhase('simulation');
    const simulationValue = simulateGame(expanded, selectedScenario);
    await new Promise(resolve => setTimeout(resolve, 300 / speed));

    // Backpropagation phase
    setCurrentPhase('backpropagation');
    const updatedTree = backpropagate(tree, expanded.id, simulationValue);

    // Reflection phase (reflective tree only)
    if (isReflective) {
      setCurrentPhase('reflection');

      // Generate reflections for promising nodes
      const reflectOnNodes = (node: TreeNode) => {
        if (node.visits > 3 && !node.isReflected && Math.random() < 0.4) {
          generateReflection(node, updatedTree);

          if (node.reflection?.contrastive) {
            setReflectionInsights(prev => [
              `${node.reflection.insight} (${(node.reflection.confidence * 100).toFixed(0)}% confidence)`,
              ...prev.slice(0, 4)
            ]);
          }
        }
        node.children.forEach(reflectOnNodes);
      };

      reflectOnNodes(updatedTree);
      await new Promise(resolve => setTimeout(resolve, 300 / speed));
    }

    // Clear selection
    selected.selected = false;

    // Update tree
    setTreeFunc(updatedTree);

    // Track compute time
    const computeTime = performance.now() - startTime;

    // Update metrics with performance data
    updateMetrics(computeTime, isReflective);

    setCurrentPhase('idle');
  }, [
    reflectiveTree, standardTree, selectNode, expandNode, simulateGame,
    backpropagate, selectedScenario, speed
  ]);

  // Enhanced metrics calculation
  const updateMetrics = useCallback((computeTime: number, isReflective: boolean) => {
    const calculateStats = (tree: TreeNode) => {
      let totalNodes = 0;
      let reflectedNodes = 0;
      let totalDepth = 0;
      let maxDepth = 0;
      let bestValue = 0;
      let totalMemory = 0;

      const traverse = (node: TreeNode) => {
        totalNodes++;
        totalMemory += 200; // Approximate bytes per node
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
        convergenceRate: convergence,
        computeTime,
        memoryUsage: totalMemory / 1024 // Convert to KB
      };
    };

    setMetrics(prev => ({
      ...prev,
      [isReflective ? 'reflective' : 'standard']: calculateStats(
        isReflective ? reflectiveTree : standardTree
      )
    }));
  }, [reflectiveTree, standardTree]);

  // Auto-run controller
  useEffect(() => {
    if (autoRun && !isRunning) {
      const runBoth = async () => {
        setIsRunning(true);
        setIterations(prev => prev + 1);

        await Promise.all([
          runIteration(false),
          runIteration(true)
        ]);

        setIsRunning(false);
      };

      const timeout = setTimeout(runBoth, 100);
      return () => clearTimeout(timeout);
    }
  }, [autoRun, isRunning, runIteration]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (standardCanvasRef.current && reflectiveCanvasRef.current) {
        drawTree(standardCanvasRef.current, standardTree, selectedPath.standard, false, visualMode);
        drawTree(reflectiveCanvasRef.current, reflectiveTree, selectedPath.reflective, true, visualMode);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [standardTree, reflectiveTree, selectedPath, visualMode, drawTree]);

  // Reset function
  const reset = () => {
    const newTree = createInitialTree();
    setStandardTree(newTree);
    setReflectiveTree(createInitialTree());
    setSelectedPath({ standard: [], reflective: [] });
    setReflectionInsights([]);
    setMetrics({
      standard: {
        totalNodes: 1, averageDepth: 0, bestValue: 0,
        explorationEfficiency: 0, convergenceRate: 0, computeTime: 0, memoryUsage: 0
      },
      reflective: {
        totalNodes: 1, reflectedNodes: 0, averageDepth: 0,
        bestValue: 0, explorationEfficiency: 0, convergenceRate: 0, computeTime: 0, memoryUsage: 0
      }
    });
    setCurrentPhase('idle');
    setIsRunning(false);
    setAutoRun(false);
    setIterations(0);
  };

  const runStep = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setIterations(prev => prev + 1);

    await Promise.all([
      runIteration(false),
      runIteration(true)
    ]);

    setIsRunning(false);
  };

  // Phase icon helper
  const getPhaseIcon = (phase: string) => {
    switch(phase) {
      case 'selection': return <Eye className="w-4 h-4" />;
      case 'expansion': return <GitBranch className="w-4 h-4" />;
      case 'simulation': return <Cpu className="w-4 h-4" />;
      case 'backpropagation': return <TrendingUp className="w-4 h-4" />;
      case 'reflection': return <Brain className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Reflective Monte Carlo Tree Search (R-MCTS)
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Enhanced exploration through contrastive reflection and adaptive learning
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Iterations: {iterations}</span>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Select Scenario</h3>
        <div className="grid grid-cols-3 gap-3">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => {
                setSelectedScenario(scenario);
                reset();
              }}
              className={`p-3 rounded-lg border transition-all ${
                selectedScenario.id === scenario.id
                  ? 'bg-blue-900/30 border-blue-600 text-blue-300'
                  : 'bg-slate-800/50 border-slate-600 text-gray-300 hover:bg-slate-700/50'
              }`}
            >
              <div className="font-medium text-sm">{scenario.name}</div>
              <div className="text-xs text-slate-400 mt-1">{scenario.description}</div>
              <div className={`text-xs mt-2 inline-block px-2 py-1 rounded ${
                scenario.complexity === 'low' ? 'bg-green-900/30 text-green-400' :
                scenario.complexity === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                'bg-red-900/30 text-red-400'
              }`}>
                {scenario.complexity} • depth {scenario.depth}
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
              onClick={runStep}
              disabled={isRunning || autoRun}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              Run Step
            </button>

            <button
              onClick={() => setAutoRun(!autoRun)}
              className={`px-4 py-2 ${
                autoRun ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'
              } text-white rounded-lg flex items-center gap-2 transition-colors`}
            >
              {autoRun ? <Pause className="w-4 h-4" /> : <FastForward className="w-4 h-4" />}
              {autoRun ? 'Stop' : 'Auto'}
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

        {/* Visual Mode Selector */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-slate-400">Visual:</span>
          <div className="flex gap-2">
            {['standard', 'heatmap', 'flow'].map(mode => (
              <button
                key={mode}
                onClick={() => setVisualMode(mode as any)}
                className={`px-3 py-1 text-xs rounded ${
                  visualMode === mode
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tree Visualizations */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Standard MCTS */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <GitBranch className="w-5 h-5 text-blue-400" />
            Standard MCTS
          </h3>
          <div className="bg-slate-800/50 rounded-lg p-2 mb-4" style={{ minHeight: '450px' }}>
            <canvas
              ref={standardCanvasRef}
              style={{ display: 'block', width: '380px', height: '450px' }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Nodes</span>
              <span className="text-white font-mono">{metrics.standard.totalNodes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Depth</span>
              <span className="text-white font-mono">{metrics.standard.averageDepth.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Best</span>
              <span className="text-green-400 font-mono">
                {(metrics.standard.bestValue * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Efficiency</span>
              <span className="text-blue-400 font-mono">
                {metrics.standard.explorationEfficiency.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Time</span>
              <span className="text-yellow-400 font-mono">
                {metrics.standard.computeTime.toFixed(0)}ms
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Memory</span>
              <span className="text-purple-400 font-mono">
                {metrics.standard.memoryUsage.toFixed(1)}KB
              </span>
            </div>
          </div>
        </div>

        {/* R-MCTS with Reflection */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-purple-400" />
            R-MCTS with Reflection
          </h3>
          <div className="bg-slate-800/50 rounded-lg p-2 mb-4" style={{ minHeight: '450px' }}>
            <canvas
              ref={reflectiveCanvasRef}
              style={{ display: 'block', width: '380px', height: '450px' }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Nodes</span>
              <span className="text-white font-mono">{metrics.reflective.totalNodes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Reflected</span>
              <span className="text-purple-400 font-mono">{metrics.reflective.reflectedNodes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Best</span>
              <span className="text-green-400 font-mono">
                {(metrics.reflective.bestValue * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Improvement</span>
              <span className={`font-mono ${
                metrics.reflective.bestValue > metrics.standard.bestValue
                  ? 'text-green-400' : 'text-yellow-400'
              }`}>
                +{Math.max(0, (metrics.reflective.bestValue - metrics.standard.bestValue) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Time</span>
              <span className="text-yellow-400 font-mono">
                {metrics.reflective.computeTime.toFixed(0)}ms
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Memory</span>
              <span className="text-purple-400 font-mono">
                {metrics.reflective.memoryUsage.toFixed(1)}KB
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
                  currentPhase === phase
                    ? 'border-blue-400 bg-blue-900/30 scale-110'
                    : 'border-slate-600'
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
          Reflection Insights
        </h3>
        <div className="space-y-2">
          {reflectionInsights.length > 0 ? (
            reflectionInsights.map((insight, index) => (
              <div
                key={index}
                className="p-3 bg-purple-900/20 border border-purple-800/30 rounded-lg flex items-start gap-2 animate-fadeIn"
              >
                <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-purple-200">{insight}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">
              No reflections yet. Run iterations to generate contrastive insights.
            </p>
          )}
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Gauge className="w-5 h-5 text-green-400" />
          Performance Analysis
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {((metrics.reflective.explorationEfficiency /
                 Math.max(1, metrics.standard.explorationEfficiency)) * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">Exploration Gain</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {((metrics.reflective.convergenceRate /
                 Math.max(1, metrics.standard.convergenceRate)) * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">Convergence Speed</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {metrics.reflective.reflectedNodes}
            </div>
            <div className="text-xs text-gray-400 mt-1">Reflected Nodes</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {(((metrics.reflective.computeTime + 1) /
                 (metrics.standard.computeTime + 1)) * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">Time Overhead</div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
          <p className="text-xs text-gray-400">
            <strong className="text-gray-300">Analysis:</strong> R-MCTS shows
            {metrics.reflective.bestValue > metrics.standard.bestValue
              ? ' superior performance with '
              : ' comparable performance with '}
            {((Math.abs(metrics.reflective.bestValue - metrics.standard.bestValue)) * 100).toFixed(1)}%
            {metrics.reflective.bestValue > metrics.standard.bestValue ? ' improvement' : ' difference'}
            {' '}in solution quality through reflective learning and contrastive analysis.
          </p>
        </div>
      </div>
    </div>
  );
}