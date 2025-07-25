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
import { Play, Pause, RotateCcw, Brain, Database, Network, Zap, ArrowRight, Clock, Share2 } from 'lucide-react';

interface FlowStep {
  id: string;
  title: string;
  description: string;
  activeNodes: string[];
  activeEdges: string[];
  duration: number;
  memoryData?: {
    operation: string;
    pattern: string;
    encoding: string;
    similarity: number;
  };
}

const stepColors = {
  active: '#a855f7',
  completed: '#10b981',
  pending: '#6b7280',
  encoding: '#f59e0b',
  memory: '#8b5cf6',
  agent: '#3b82f6',
  pattern: '#ec4899'
};

const initialNodes: Node[] = [
  // Research Agents
  {
    id: 'research-agent',
    position: { x: 100, y: 100 },
    data: { 
      label: (
        <div className="text-center">
          <Brain className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Research Agent</div>
          <div className="text-xs opacity-75">Learning algorithms</div>
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

  {
    id: 'analysis-agent',
    position: { x: 100, y: 300 },
    data: { 
      label: (
        <div className="text-center">
          <Zap className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Analysis Agent</div>
          <div className="text-xs opacity-75">Pattern recognition</div>
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

  {
    id: 'synthesis-agent',
    position: { x: 100, y: 500 },
    data: { 
      label: (
        <div className="text-center">
          <Share2 className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Synthesis Agent</div>
          <div className="text-xs opacity-75">Knowledge fusion</div>
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

  // Encoding Layer
  {
    id: 'encoder',
    position: { x: 400, y: 300 },
    data: { 
      label: (
        <div className="text-center">
          <Network className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Neural Encoder</div>
          <div className="text-xs opacity-75">512-dim vectors</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '10px',
      padding: '10px',
      fontSize: '12px',
      color: 'white',
      width: '130px'
    }
  },

  // Latent Memory Space
  {
    id: 'latent-space',
    position: { x: 650, y: 200 },
    data: { 
      label: (
        <div className="text-center">
          <Database className="w-7 h-7 mx-auto mb-1" />
          <div className="font-medium">Latent Memory</div>
          <div className="text-xs opacity-75">Shared knowledge space</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '16px',
      padding: '16px',
      fontSize: '12px',
      color: 'white',
      width: '170px',
      height: '120px'
    }
  },

  // Pattern Clusters (initially hidden)
  {
    id: 'pattern-learning',
    position: { x: 600, y: 100 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Learning Patterns</div>
          <div className="opacity-75">Optimization methods</div>
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
      width: '100px',
      opacity: 0
    }
  },

  {
    id: 'pattern-attention',
    position: { x: 720, y: 120 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Attention Patterns</div>
          <div className="opacity-75">Sequence modeling</div>
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
      width: '100px',
      opacity: 0
    }
  },

  {
    id: 'pattern-adversarial',
    position: { x: 660, y: 360 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Game Theory</div>
          <div className="opacity-75">Adversarial patterns</div>
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
      width: '100px',
      opacity: 0
    }
  },

  // Query Interface
  {
    id: 'query-agent',
    position: { x: 950, y: 300 },
    data: { 
      label: (
        <div className="text-center">
          <Brain className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Query Agent</div>
          <div className="text-xs opacity-75">Knowledge retrieval</div>
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
  }
];

const initialEdges: Edge[] = [
  // Agent to encoder connections
  {
    id: 'research-encoder',
    source: 'research-agent',
    target: 'encoder',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },
  {
    id: 'analysis-encoder',
    source: 'analysis-agent',
    target: 'encoder',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },
  {
    id: 'synthesis-encoder',
    source: 'synthesis-agent',
    target: 'encoder',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },

  // Encoder to latent space
  {
    id: 'encoder-latent',
    source: 'encoder',
    target: 'latent-space',
    style: { stroke: stepColors.pending, strokeWidth: 3 },
    animated: false
  },

  // Latent space to query
  {
    id: 'latent-query',
    source: 'latent-space',
    target: 'query-agent',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },

  // Pattern connections (initially hidden)
  {
    id: 'pattern-learning-edge',
    source: 'latent-space',
    target: 'pattern-learning',
    style: { stroke: stepColors.pattern, strokeWidth: 1, strokeDasharray: '3,3' },
    animated: false
  },
  {
    id: 'pattern-attention-edge',
    source: 'latent-space',
    target: 'pattern-attention',
    style: { stroke: stepColors.pattern, strokeWidth: 1, strokeDasharray: '3,3' },
    animated: false
  },
  {
    id: 'pattern-adversarial-edge',
    source: 'latent-space',
    target: 'pattern-adversarial',
    style: { stroke: stepColors.pattern, strokeWidth: 1, strokeDasharray: '3,3' },
    animated: false
  }
];

const flowSteps: FlowStep[] = [
  {
    id: 'knowledge-encoding',
    title: 'Knowledge Encoding',
    description: 'Research agent encodes new learning algorithm knowledge into latent vectors',
    activeNodes: ['research-agent', 'encoder'],
    activeEdges: ['research-encoder'],
    duration: 2500,
    memoryData: {
      operation: 'ENCODE',
      pattern: 'Learning Algorithm → Backpropagation',
      encoding: '[0.23, -0.15, 0.78, 0.41, ...]',
      similarity: 0.0
    }
  },
  {
    id: 'memory-storage',
    title: 'Memory Formation',
    description: 'Encoded patterns are stored in the shared latent memory space',
    activeNodes: ['encoder', 'latent-space'],
    activeEdges: ['encoder-latent'],
    duration: 2000,
    memoryData: {
      operation: 'STORE',
      pattern: 'optimization_method',
      encoding: '512-dimensional vector',
      similarity: 0.0
    }
  },
  {
    id: 'pattern-clustering',
    title: 'Pattern Organization',
    description: 'Similar patterns automatically cluster together in latent space',
    activeNodes: ['latent-space', 'pattern-learning'],
    activeEdges: ['pattern-learning-edge'],
    duration: 2000,
    memoryData: {
      operation: 'CLUSTER',
      pattern: 'Learning patterns grouped',
      encoding: 'Semantic clustering active',
      similarity: 0.85
    }
  },
  {
    id: 'cross-agent-sharing',
    title: 'Cross-Agent Knowledge',
    description: 'Analysis agent adds attention mechanism patterns to shared memory',
    activeNodes: ['analysis-agent', 'encoder', 'latent-space', 'pattern-attention'],
    activeEdges: ['analysis-encoder', 'encoder-latent', 'pattern-attention-edge'],
    duration: 3000,
    memoryData: {
      operation: 'SHARE',
      pattern: 'Attention Mechanism → Sequence Modeling',
      encoding: '[0.12, 0.67, -0.33, 0.89, ...]',
      similarity: 0.73
    }
  },
  {
    id: 'knowledge-synthesis',
    title: 'Knowledge Synthesis',
    description: 'Synthesis agent contributes game theory patterns from adversarial training',
    activeNodes: ['synthesis-agent', 'encoder', 'latent-space', 'pattern-adversarial'],
    activeEdges: ['synthesis-encoder', 'encoder-latent', 'pattern-adversarial-edge'],
    duration: 2500,
    memoryData: {
      operation: 'SYNTHESIZE',
      pattern: 'Game Theory ↔ Adversarial Training',
      encoding: '[-0.45, 0.91, 0.12, -0.67, ...]',
      similarity: 0.62
    }
  },
  {
    id: 'pattern-retrieval',
    title: 'Intelligent Retrieval',
    description: 'Query agent retrieves relevant patterns using semantic similarity',
    activeNodes: ['query-agent', 'latent-space', 'pattern-learning', 'pattern-attention'],
    activeEdges: ['latent-query'],
    duration: 2000,
    memoryData: {
      operation: 'RETRIEVE',
      pattern: 'Query: "How to improve sequence modeling?"',
      encoding: 'Finding similar patterns...',
      similarity: 0.91
    }
  },
  {
    id: 'cross-domain-transfer',
    title: 'Cross-Domain Innovation',
    description: 'System discovers novel connections between different domains',
    activeNodes: ['latent-space', 'pattern-learning', 'pattern-attention', 'pattern-adversarial', 'query-agent'],
    activeEdges: ['pattern-learning-edge', 'pattern-attention-edge', 'pattern-adversarial-edge', 'latent-query'],
    duration: 3000,
    memoryData: {
      operation: 'TRANSFER',
      pattern: 'Cross-domain insight: Attention + Game Theory',
      encoding: 'Novel pattern discovered',
      similarity: 0.94
    }
  }
];

interface LatentMemoryNetworksFlowProps {
  height?: number;
  autoPlay?: boolean;
}

export const LatentMemoryNetworksFlow: React.FC<LatentMemoryNetworksFlowProps> = ({
  height = 650,
  autoPlay = false
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMemory, setCurrentMemory] = useState<FlowStep['memoryData'] | null>(null);

  const resetFlow = useCallback(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setCurrentMemory(null);
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [setNodes, setEdges]);

  const updateNodesForStep = useCallback((step: FlowStep, stepIndex: number) => {
    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        const isActive = step.activeNodes.includes(node.id);
        const isCompleted = stepIndex < currentStep;
        
        // Special handling for pattern nodes
        if (node.id.startsWith('pattern-')) {
          return {
            ...node,
            style: {
              ...node.style,
              opacity: isActive ? 1 : (isCompleted ? 0.7 : 0),
              backgroundColor: isActive ? stepColors.pattern : stepColors.pattern,
            }
          };
        }
        
        // Main nodes
        let backgroundColor = stepColors.pending;
        if (isActive) backgroundColor = stepColors.active;
        else if (isCompleted) backgroundColor = stepColors.completed;
        
        // Special color coding
        if (node.id === 'encoder' && isActive) {
          backgroundColor = stepColors.encoding;
        } else if (node.id === 'latent-space' && isActive) {
          backgroundColor = stepColors.memory;
        } else if (node.id.includes('agent') && isActive) {
          backgroundColor = stepColors.agent;
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

    if (step.memoryData) {
      setCurrentMemory(step.memoryData);
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

        {currentMemory && (
          <Panel position="top-right" className="bg-gray-800 rounded-lg border border-gray-600 p-4 m-4">
            <div className="text-white text-sm font-medium mb-3 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Memory Operation
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Operation:</span>
                <span className="text-purple-400">{currentMemory.operation}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-gray-400">Pattern:</span>
                <span className="text-blue-400 text-right max-w-[150px]">{currentMemory.pattern}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Encoding:</span>
                <span className="text-green-400">{currentMemory.encoding}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Similarity:</span>
                <span className="text-yellow-400">{(currentMemory.similarity * 100).toFixed(0)}%</span>
              </div>
            </div>
          </Panel>
        )}

        <Panel position="bottom-left" className="bg-gray-800/90 rounded-lg border border-gray-600 p-3 m-4">
          <div className="text-white text-sm font-medium mb-2">Legend</div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Brain className="w-3 h-3 text-blue-400" />
              <span className="text-gray-300">AI Agent</span>
            </div>
            <div className="flex items-center gap-2">
              <Network className="w-3 h-3 text-yellow-400" />
              <span className="text-gray-300">Neural Encoder</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-3 h-3 text-purple-400" />
              <span className="text-gray-300">Latent Memory</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded"></div>
              <span className="text-gray-300">Pattern Cluster</span>
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
              Processing memory operations...
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export default LatentMemoryNetworksFlow;