'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Play, Pause, RotateCcw, Brain, Search, Lightbulb, Network, ArrowRight, Clock, Zap, Sparkles, Link } from 'lucide-react';

interface FlowStep {
  id: string;
  title: string;
  description: string;
  activeNodes: string[];
  activeEdges: string[];
  duration: number;
  retrievalData?: {
    queryType: string;
    abstractPattern: string;
    latentConcepts: string[];
    synthesisInsight: string;
    noveltyScore: number;
  };
}

const stepColors = {
  active: '#8b5cf6',
  completed: '#10b981',
  pending: '#6b7280',
  query: '#f59e0b',
  pattern: '#ec4899',
  agent: '#3b82f6',
  synthesis: '#06b6d4',
  insight: '#84cc16'
};

const initialNodes: Node[] = [
  // Query Input
  {
    id: 'query-input',
    position: { x: 100, y: 300 },
    data: { 
      label: (
        <div className="text-center">
          <Search className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Query Input</div>
          <div className="text-xs opacity-75">Initial challenge</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '12px',
      padding: '12px',
      fontSize: '12px',
      color: 'white',
      width: '140px'
    }
  },

  // Pattern Abstraction Engine
  {
    id: 'pattern-engine',
    position: { x: 350, y: 200 },
    data: { 
      label: (
        <div className="text-center">
          <Network className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Pattern Engine</div>
          <div className="text-xs opacity-75">Abstract reasoning</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '12px',
      padding: '12px',
      fontSize: '12px',
      color: 'white',
      width: '150px'
    }
  },

  // Specialist Agents
  {
    id: 'research-agent',
    position: { x: 600, y: 100 },
    data: { 
      label: (
        <div className="text-center">
          <Brain className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-sm">Research Agent</div>
          <div className="text-xs opacity-75">Biomimetic patterns</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '10px',
      padding: '10px',
      fontSize: '10px',
      color: 'white',
      width: '130px'
    }
  },

  {
    id: 'analysis-agent',
    position: { x: 600, y: 200 },
    data: { 
      label: (
        <div className="text-center">
          <Zap className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-sm">Analysis Agent</div>
          <div className="text-xs opacity-75">System patterns</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '10px',
      padding: '10px',
      fontSize: '10px',
      color: 'white',
      width: '130px'
    }
  },

  {
    id: 'innovation-agent',
    position: { x: 600, y: 300 },
    data: { 
      label: (
        <div className="text-center">
          <Lightbulb className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-sm">Innovation Agent</div>
          <div className="text-xs opacity-75">Phase change dynamics</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '10px',
      padding: '10px',
      fontSize: '10px',
      color: 'white',
      width: '130px'
    }
  },

  {
    id: 'systems-agent',
    position: { x: 600, y: 400 },
    data: { 
      label: (
        <div className="text-center">
          <Network className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-sm">Systems Agent</div>
          <div className="text-xs opacity-75">Adaptive systems</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '10px',
      padding: '10px',
      fontSize: '10px',
      color: 'white',
      width: '130px'
    }
  },

  // Latent Concept Clusters
  {
    id: 'biomimetic-cluster',
    position: { x: 850, y: 80 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Biomimetic Cooling</div>
          <div className="opacity-75">Elephant ears, termites</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pattern,
      border: `2px solid ${stepColors.pattern}`,
      borderRadius: '8px',
      padding: '6px',
      fontSize: '10px',
      color: 'white',
      width: '120px',
      opacity: 0
    }
  },

  {
    id: 'network-cluster',
    position: { x: 850, y: 180 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Network Systems</div>
          <div className="opacity-75">Swarm, mycelial</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pattern,
      border: `2px solid ${stepColors.pattern}`,
      borderRadius: '8px',
      padding: '6px',
      fontSize: '10px',
      color: 'white',
      width: '120px',
      opacity: 0
    }
  },

  {
    id: 'thermal-cluster',
    position: { x: 850, y: 280 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Thermal Dynamics</div>
          <div className="opacity-75">Phase change, layers</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pattern,
      border: `2px solid ${stepColors.pattern}`,
      borderRadius: '8px',
      padding: '6px',
      fontSize: '10px',
      color: 'white',
      width: '120px',
      opacity: 0
    }
  },

  {
    id: 'adaptive-cluster',
    position: { x: 850, y: 380 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Adaptive Systems</div>
          <div className="opacity-75">Immune, resilience</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pattern,
      border: `2px solid ${stepColors.pattern}`,
      borderRadius: '8px',
      padding: '6px',
      fontSize: '10px',
      color: 'white',
      width: '120px',
      opacity: 0
    }
  },

  // Cross-Pattern Connector
  {
    id: 'pattern-synthesizer',
    position: { x: 1100, y: 230 },
    data: { 
      label: (
        <div className="text-center">
          <Link className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Pattern Synthesizer</div>
          <div className="text-xs opacity-75">Cross-domain fusion</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '12px',
      padding: '12px',
      fontSize: '12px',
      color: 'white',
      width: '150px'
    }
  },

  // Emergent Insight Generator
  {
    id: 'insight-generator',
    position: { x: 1350, y: 230 },
    data: { 
      label: (
        <div className="text-center">
          <Sparkles className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Insight Generator</div>
          <div className="text-xs opacity-75">Novel solutions</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '12px',
      padding: '12px',
      fontSize: '12px',
      color: 'white',
      width: '150px'
    }
  },

  // Latent Space Navigator
  {
    id: 'latent-navigator',
    position: { x: 350, y: 400 },
    data: { 
      label: (
        <div className="text-center">
          <Network className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Latent Navigator</div>
          <div className="text-xs opacity-75">Implicit reasoning</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '12px',
      padding: '12px',
      fontSize: '12px',
      color: 'white',
      width: '150px'
    }
  },

  // Abstract Pattern Nodes
  {
    id: 'thermal-regulation-pattern',
    position: { x: 350, y: 50 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Thermal Regulation</div>
          <div className="opacity-75">Complex systems</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pattern,
      border: `2px solid ${stepColors.pattern}`,
      borderRadius: '8px',
      padding: '6px',
      fontSize: '10px',
      color: 'white',
      width: '110px',
      opacity: 0
    }
  },

  {
    id: 'distributed-solutions-pattern',
    position: { x: 500, y: 50 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Distributed Solutions</div>
          <div className="opacity-75">vs centralized</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pattern,
      border: `2px solid ${stepColors.pattern}`,
      borderRadius: '8px',
      padding: '6px',
      fontSize: '10px',
      color: 'white',
      width: '110px',
      opacity: 0
    }
  }
];

const initialEdges: Edge[] = [
  // Query to pattern engine
  {
    id: 'query-to-pattern',
    source: 'query-input',
    target: 'pattern-engine',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },

  // Pattern engine to agents
  {
    id: 'pattern-to-research',
    source: 'pattern-engine',
    target: 'research-agent',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },
  {
    id: 'pattern-to-analysis',
    source: 'pattern-engine',
    target: 'analysis-agent',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },
  {
    id: 'pattern-to-innovation',
    source: 'pattern-engine',
    target: 'innovation-agent',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },
  {
    id: 'pattern-to-systems',
    source: 'pattern-engine',
    target: 'systems-agent',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },

  // Query to latent navigator
  {
    id: 'query-to-navigator',
    source: 'query-input',
    target: 'latent-navigator',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },

  // Agents to clusters
  {
    id: 'research-to-biomimetic',
    source: 'research-agent',
    target: 'biomimetic-cluster',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '3,3' },
    animated: false
  },
  {
    id: 'analysis-to-network',
    source: 'analysis-agent',
    target: 'network-cluster',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '3,3' },
    animated: false
  },
  {
    id: 'innovation-to-thermal',
    source: 'innovation-agent',
    target: 'thermal-cluster',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '3,3' },
    animated: false
  },
  {
    id: 'systems-to-adaptive',
    source: 'systems-agent',
    target: 'adaptive-cluster',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '3,3' },
    animated: false
  },

  // Clusters to synthesizer
  {
    id: 'biomimetic-to-synthesizer',
    source: 'biomimetic-cluster',
    target: 'pattern-synthesizer',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },
  {
    id: 'network-to-synthesizer',
    source: 'network-cluster',
    target: 'pattern-synthesizer',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },
  {
    id: 'thermal-to-synthesizer',
    source: 'thermal-cluster',
    target: 'pattern-synthesizer',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },
  {
    id: 'adaptive-to-synthesizer',
    source: 'adaptive-cluster',
    target: 'pattern-synthesizer',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },

  // Synthesizer to insight generator
  {
    id: 'synthesizer-to-insight',
    source: 'pattern-synthesizer',
    target: 'insight-generator',
    style: { stroke: stepColors.pending, strokeWidth: 3 },
    animated: false
  },

  // Abstract patterns
  {
    id: 'pattern-to-thermal-regulation',
    source: 'pattern-engine',
    target: 'thermal-regulation-pattern',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '5,5' },
    animated: false
  },
  {
    id: 'pattern-to-distributed',
    source: 'pattern-engine',
    target: 'distributed-solutions-pattern',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '5,5' },
    animated: false
  }
];

const flowSteps: FlowStep[] = [
  {
    id: 'abstract-query-analysis',
    title: 'Abstract Query Analysis',
    description: 'System analyzes query for underlying abstract patterns rather than keywords',
    activeNodes: ['query-input', 'pattern-engine', 'thermal-regulation-pattern'],
    activeEdges: ['query-to-pattern', 'pattern-to-thermal-regulation'],
    duration: 2500,
    retrievalData: {
      queryType: 'Complex Challenge',
      abstractPattern: 'thermal regulation in complex systems',
      latentConcepts: ['Heat dissipation', 'System adaptation', 'Environmental response'],
      synthesisInsight: 'Identifying core thermal management principles',
      noveltyScore: 0.2
    }
  },
  {
    id: 'multi-agent-pattern-exploration',
    title: 'Multi-Agent Pattern Exploration',
    description: 'Each specialist agent explores different latent dimensions of the abstract pattern',
    activeNodes: ['pattern-engine', 'research-agent', 'analysis-agent', 'innovation-agent', 'systems-agent'],
    activeEdges: ['pattern-to-research', 'pattern-to-analysis', 'pattern-to-innovation', 'pattern-to-systems'],
    duration: 3000,
    retrievalData: {
      queryType: 'Parallel Exploration',
      abstractPattern: 'distributed vs centralized solutions',
      latentConcepts: ['Biomimetic cooling', 'Network intelligence', 'Phase dynamics', 'Adaptive systems'],
      synthesisInsight: 'Multi-dimensional pattern space exploration',
      noveltyScore: 0.4
    }
  },
  {
    id: 'latent-concept-discovery',
    title: 'Latent Concept Discovery',
    description: 'Agents discover unexpected connections in latent knowledge space',
    activeNodes: ['research-agent', 'analysis-agent', 'innovation-agent', 'systems-agent', 'biomimetic-cluster', 'network-cluster', 'thermal-cluster', 'adaptive-cluster'],
    activeEdges: ['research-to-biomimetic', 'analysis-to-network', 'innovation-to-thermal', 'systems-to-adaptive'],
    duration: 3500,
    retrievalData: {
      queryType: 'Implicit Discovery',
      abstractPattern: 'phase change + distribution + feedback',
      latentConcepts: ['Elephant ear cooling', 'Termite mound ventilation', 'Mycelial networks', 'Ocean thermal layers'],
      synthesisInsight: 'Cross-domain biomimetic insights emerging',
      noveltyScore: 0.7
    }
  },
  {
    id: 'implicit-reasoning-navigation',
    title: 'Implicit Reasoning Navigation',
    description: 'Latent navigator finds non-obvious connections through reasoning patterns',
    activeNodes: ['latent-navigator', 'biomimetic-cluster', 'network-cluster', 'thermal-cluster', 'adaptive-cluster'],
    activeEdges: ['query-to-navigator'],
    duration: 2500,
    retrievalData: {
      queryType: 'Analogical Reasoning',
      abstractPattern: 'adaptive systems responding to environmental stress',
      latentConcepts: ['Immune system responses', 'Ecosystem resilience', 'Forest canopy dynamics', 'Swarm intelligence'],
      synthesisInsight: 'Deep analogical patterns connecting biology to infrastructure',
      noveltyScore: 0.8
    }
  },
  {
    id: 'cross-pattern-synthesis',
    title: 'Cross-Pattern Synthesis',
    description: 'Pattern synthesizer combines multiple latent concepts into novel frameworks',
    activeNodes: ['pattern-synthesizer', 'biomimetic-cluster', 'network-cluster', 'thermal-cluster', 'adaptive-cluster'],
    activeEdges: ['biomimetic-to-synthesizer', 'network-to-synthesizer', 'thermal-to-synthesizer', 'adaptive-to-synthesizer'],
    duration: 3000,
    retrievalData: {
      queryType: 'Pattern Fusion',
      abstractPattern: 'multi-layer adaptive thermal networks',
      latentConcepts: ['Bio-inspired pipe networks', 'Self-regulating materials', 'Distributed cooling swarms', 'Ecosystem feedback loops'],
      synthesisInsight: 'Novel "Mycelial Urban Cooling Network" concept emerging',
      noveltyScore: 0.92
    }
  },
  {
    id: 'emergent-insight-generation',
    title: 'Emergent Insight Generation',
    description: 'System generates breakthrough innovations that transcend original query scope',
    activeNodes: ['pattern-synthesizer', 'insight-generator'],
    activeEdges: ['synthesizer-to-insight'],
    duration: 2500,
    retrievalData: {
      queryType: 'Breakthrough Innovation',
      abstractPattern: 'self-healing biomimetic infrastructure',
      latentConcepts: ['Underground fungal networks', 'Adaptive phase-change materials', 'Swarm-based sensors', 'Self-regulating systems'],
      synthesisInsight: 'Revolutionary urban cooling system combining multiple biological principles',
      noveltyScore: 0.95
    }
  }
];

interface LatentKnowledgeRetrievalFlowProps {
  height?: number;
  autoPlay?: boolean;
}

export const LatentKnowledgeRetrievalFlow: React.FC<LatentKnowledgeRetrievalFlowProps> = ({
  height = 650,
  autoPlay = false
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRetrieval, setCurrentRetrieval] = useState<FlowStep['retrievalData'] | null>(null);

  const resetFlow = useCallback(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setCurrentRetrieval(null);
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [setNodes, setEdges]);

  const updateNodesForStep = useCallback((step: FlowStep, stepIndex: number) => {
    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        const isActive = step.activeNodes.includes(node.id);
        const isCompleted = stepIndex < currentStep;
        
        // Special handling for cluster nodes
        if (node.id.includes('cluster') || node.id.includes('pattern')) {
          return {
            ...node,
            style: {
              ...node.style,
              opacity: isActive ? 1 : (isCompleted ? 0.7 : 0.3),
              backgroundColor: isActive ? stepColors.pattern : stepColors.pattern,
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
            }
          };
        }
        
        // Main nodes
        let backgroundColor = stepColors.pending;
        if (isActive) {
          if (node.id === 'pattern-engine') backgroundColor = stepColors.query;
          else if (node.id.includes('agent')) backgroundColor = stepColors.agent;
          else if (node.id === 'pattern-synthesizer') backgroundColor = stepColors.synthesis;
          else if (node.id === 'insight-generator') backgroundColor = stepColors.insight;
          else backgroundColor = stepColors.active;
        } else if (isCompleted) {
          backgroundColor = stepColors.completed;
        }
        
        return {
          ...node,
          style: {
            ...node.style,
            backgroundColor,
            border: isActive ? `2px solid ${backgroundColor}` : `1px solid ${backgroundColor}`,
            opacity: isActive ? 1 : isCompleted ? 0.9 : 0.7,
          }
        };
      });
    });

    setEdges((prevEdges) => {
      return prevEdges.map((edge) => {
        const isActive = step.activeEdges.includes(edge.id);
        const isCompleted = stepIndex < currentStep;
        
        return {
          ...edge,
          animated: isActive,
          style: {
            ...edge.style,
            stroke: isActive ? stepColors.active : 
                   isCompleted ? stepColors.completed : 
                   stepColors.pending,
            strokeWidth: isActive ? 3 : 2,
          }
        };
      });
    });

    if (step.retrievalData) {
      setCurrentRetrieval(step.retrievalData);
    }
  }, [currentStep, setNodes, setEdges]);

  const playStep = useCallback(async (stepIndex: number) => {
    if (stepIndex >= flowSteps.length) {
      setIsPlaying(false);
      return;
    }

    const step = flowSteps[stepIndex];
    setCurrentStep(stepIndex);
    updateNodesForStep(step, stepIndex);

    await new Promise(resolve => setTimeout(resolve, step.duration));

    if (isPlaying) {
      playStep(stepIndex + 1);
    }
  }, [isPlaying, updateNodesForStep]);

  const startFlow = useCallback(() => {
    setIsPlaying(true);
    playStep(0);
  }, [playStep]);

  const pauseFlow = useCallback(() => {
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (autoPlay && currentStep === -1) {
      startFlow();
    }
  }, [autoPlay, currentStep, startFlow]);

  const currentStepData = currentStep >= 0 ? flowSteps[currentStep] : null;

  return (
    <div className="w-full bg-gray-900 rounded-lg border border-gray-700" style={{ height }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        fitView
        className="bg-gray-900"
      >
        <Background color="#374151" gap={20} />
        <Controls className="bg-gray-800 border-gray-600" />
        
        <Panel position="top-left" className="bg-gray-800 rounded-lg border border-gray-600 p-4 m-4">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={isPlaying ? pauseFlow : startFlow}
              disabled={currentStep >= flowSteps.length - 1 && !isPlaying}
              className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                isPlaying
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <button
              onClick={resetFlow}
              disabled={isPlaying}
              className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {currentStepData && (
            <div className="text-white">
              <div className="text-sm font-medium mb-1">{currentStepData.title}</div>
              <div className="text-xs text-gray-300 mb-2">{currentStepData.description}</div>
              <div className="text-xs text-gray-400">
                Step {currentStep + 1} of {flowSteps.length}
              </div>
            </div>
          )}
        </Panel>

        {currentRetrieval && (
          <Panel position="top-right" className="bg-gray-800 rounded-lg border border-gray-600 p-4 m-4">
            <div className="text-white text-sm font-medium mb-3 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Latent Retrieval
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Type:</span>
                <span className="text-purple-400">{currentRetrieval.queryType}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-gray-400">Pattern:</span>
                <span className="text-blue-400 text-right max-w-[150px]">{currentRetrieval.abstractPattern}</span>
              </div>
              <div className="mt-2">
                <span className="text-gray-400">Concepts:</span>
                <div className="mt-1 space-y-1">
                  {currentRetrieval.latentConcepts.map((concept, index) => (
                    <div key={index} className="text-green-400 text-xs">• {concept}</div>
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <span className="text-gray-400">Insight:</span>
                <div className="text-yellow-400 text-xs mt-1">{currentRetrieval.synthesisInsight}</div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-400">Novelty:</span>
                <span className="text-pink-400">{(currentRetrieval.noveltyScore * 100).toFixed(0)}%</span>
              </div>
            </div>
          </Panel>
        )}

        <Panel position="bottom-left" className="bg-gray-800/90 rounded-lg border border-gray-600 p-3 m-4">
          <div className="text-white text-sm font-medium mb-2">Legend</div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Network className="w-3 h-3 text-yellow-400" />
              <span className="text-gray-300">Pattern Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-3 h-3 text-blue-400" />
              <span className="text-gray-300">Specialist Agent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded"></div>
              <span className="text-gray-300">Latent Concept</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-green-400" />
              <span className="text-gray-300">Novel Insight</span>
            </div>
          </div>
        </Panel>

        <Panel position="bottom-center" className="bg-gray-800/90 rounded-lg border border-gray-600 p-3 m-4">
          <div className="flex items-center gap-4">
            {flowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  index === currentStep ? 'bg-purple-500' :
                  index < currentStep ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
                <span className={`text-xs ${
                  index === currentStep ? 'text-purple-400' :
                  index < currentStep ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < flowSteps.length - 1 && <ArrowRight className="w-3 h-3 text-gray-600" />}
              </div>
            ))}
          </div>
        </Panel>

        {isPlaying && (
          <Panel position="top-center" className="bg-purple-900/30 rounded-lg border border-purple-500/50 p-2 m-4">
            <div className="flex items-center gap-2 text-purple-300 text-sm">
              <Clock className="w-4 h-4 animate-pulse" />
              Exploring latent knowledge space...
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export default LatentKnowledgeRetrievalFlow;