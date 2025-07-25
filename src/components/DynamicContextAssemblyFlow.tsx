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
import { Play, Pause, RotateCcw, Brain, Database, Filter, Zap, BarChart3, Target, ArrowRight } from 'lucide-react';

interface ContextSource {
  id: string;
  name: string;
  type: 'document' | 'database' | 'api' | 'knowledge-base' | 'real-time';
  relevanceScore: number;
  quality: number;
  freshness: number;
  isActive: boolean;
}

interface FlowStep {
  id: string;
  title: string;
  description: string;
  activeNodes: string[];
  activeEdges: string[];
  duration: number;
  contextSources?: ContextSource[];
}

const stepColors = {
  active: '#3b82f6',
  completed: '#10b981',
  pending: '#6b7280',
  source_active: '#8b5cf6',
  source_inactive: '#374151',
  assembly: '#f59e0b'
};

const initialNodes: Node[] = [
  // Query Input
  {
    id: 'query',
    type: 'input',
    position: { x: 50, y: 100 },
    data: { 
      label: (
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4" />
          <span>Query Input</span>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '12px',
      color: 'white'
    }
  },

  // Analysis Phase
  {
    id: 'analysis',
    position: { x: 250, y: 50 },
    data: { 
      label: (
        <div className="text-center">
          <Brain className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Query Analysis</div>
          <div className="text-xs opacity-75">Domain extraction & intent analysis</div>
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
      width: '160px'
    }
  },

  // Context Sources
  {
    id: 'source-quantum',
    position: { x: 50, y: 250 },
    data: { 
      label: (
        <div className="text-center">
          <Database className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-xs">Quantum Research</div>
          <div className="text-xs opacity-75">Papers & Studies</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.source_inactive,
      border: `1px solid ${stepColors.source_inactive}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      color: 'white',
      width: '120px'
    }
  },

  {
    id: 'source-crypto',
    position: { x: 200, y: 280 },
    data: { 
      label: (
        <div className="text-center">
          <Target className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-xs">Crypto Security</div>
          <div className="text-xs opacity-75">Security Database</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.source_inactive,
      border: `1px solid ${stepColors.source_inactive}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      color: 'white',
      width: '120px'
    }
  },

  {
    id: 'source-blockchain',
    position: { x: 350, y: 250 },
    data: { 
      label: (
        <div className="text-center">
          <Database className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-xs">Blockchain KB</div>
          <div className="text-xs opacity-75">Knowledge Base</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.source_inactive,
      border: `1px solid ${stepColors.source_inactive}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      color: 'white',
      width: '120px'
    }
  },

  {
    id: 'source-news',
    position: { x: 500, y: 280 },
    data: { 
      label: (
        <div className="text-center">
          <Zap className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-xs">Real-time News</div>
          <div className="text-xs opacity-75">Live Feed</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.source_inactive,
      border: `1px solid ${stepColors.source_inactive}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      color: 'white',
      width: '120px'
    }
  },

  // Scoring Phase
  {
    id: 'scoring',
    position: { x: 300, y: 400 },
    data: { 
      label: (
        <div className="text-center">
          <BarChart3 className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Relevance Scoring</div>
          <div className="text-xs opacity-75">Quality, relevance & freshness analysis</div>
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
      width: '180px'
    }
  },

  // Assembly Phase
  {
    id: 'assembly',
    position: { x: 550, y: 400 },
    data: { 
      label: (
        <div className="text-center">
          <Filter className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Context Assembly</div>
          <div className="text-xs opacity-75">Optimal context window creation</div>
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
      width: '180px'
    }
  },

  // Final Output
  {
    id: 'output',
    type: 'output',
    position: { x: 750, y: 100 },
    data: { 
      label: (
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          <span>Optimized Context</span>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '12px',
      color: 'white'
    }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'query-analysis',
    source: 'query',
    target: 'analysis',
    animated: false,
    style: { stroke: stepColors.pending, strokeWidth: 2 }
  },
  {
    id: 'analysis-quantum',
    source: 'analysis',
    target: 'source-quantum',
    animated: false,
    style: { stroke: stepColors.pending, strokeWidth: 1 }
  },
  {
    id: 'analysis-crypto',
    source: 'analysis',
    target: 'source-crypto',
    animated: false,
    style: { stroke: stepColors.pending, strokeWidth: 1 }
  },
  {
    id: 'analysis-blockchain',
    source: 'analysis',
    target: 'source-blockchain',
    animated: false,
    style: { stroke: stepColors.pending, strokeWidth: 1 }
  },
  {
    id: 'analysis-news',
    source: 'analysis',
    target: 'source-news',
    animated: false,
    style: { stroke: stepColors.pending, strokeWidth: 1 }
  },
  {
    id: 'quantum-scoring',
    source: 'source-quantum',
    target: 'scoring',
    animated: false,
    style: { stroke: stepColors.pending, strokeWidth: 1 }
  },
  {
    id: 'crypto-scoring',
    source: 'source-crypto',
    target: 'scoring',
    animated: false,
    style: { stroke: stepColors.pending, strokeWidth: 1 }
  },
  {
    id: 'blockchain-scoring',
    source: 'source-blockchain',
    target: 'scoring',
    animated: false,
    style: { stroke: stepColors.pending, strokeWidth: 1 }
  },
  {
    id: 'news-scoring',
    source: 'source-news',
    target: 'scoring',
    animated: false,
    style: { stroke: stepColors.pending, strokeWidth: 1 }
  },
  {
    id: 'scoring-assembly',
    source: 'scoring',
    target: 'assembly',
    animated: false,
    style: { stroke: stepColors.pending, strokeWidth: 2 }
  },
  {
    id: 'assembly-output',
    source: 'assembly',
    target: 'output',
    animated: false,
    style: { stroke: stepColors.pending, strokeWidth: 2 }
  }
];

const flowSteps: FlowStep[] = [
  {
    id: 'query-input',
    title: 'Query Analysis',
    description: 'Analyzing query for domains, complexity, and intent',
    activeNodes: ['query', 'analysis'],
    activeEdges: ['query-analysis'],
    duration: 2000,
  },
  {
    id: 'source-identification',
    title: 'Source Identification',
    description: 'Identifying relevant context sources',
    activeNodes: ['analysis', 'source-quantum', 'source-crypto', 'source-blockchain', 'source-news'],
    activeEdges: ['analysis-quantum', 'analysis-crypto', 'analysis-blockchain', 'analysis-news'],
    duration: 1500,
  },
  {
    id: 'relevance-scoring',
    title: 'Relevance Scoring',
    description: 'Scoring sources based on relevance, quality, and freshness',
    activeNodes: ['source-quantum', 'source-crypto', 'source-blockchain', 'scoring'],
    activeEdges: ['quantum-scoring', 'crypto-scoring', 'blockchain-scoring'],
    duration: 2500,
    contextSources: [
      { id: 'quantum', name: 'Quantum Research', type: 'document', relevanceScore: 95, quality: 95, freshness: 92, isActive: true },
      { id: 'crypto', name: 'Crypto Security', type: 'database', relevanceScore: 92, quality: 88, freshness: 85, isActive: true },
      { id: 'blockchain', name: 'Blockchain KB', type: 'knowledge-base', relevanceScore: 88, quality: 82, freshness: 78, isActive: true },
      { id: 'news', name: 'Real-time News', type: 'real-time', relevanceScore: 65, quality: 65, freshness: 99, isActive: false }
    ]
  },
  {
    id: 'context-assembly',
    title: 'Context Assembly',
    description: 'Assembling optimal context window with strategic allocation',
    activeNodes: ['scoring', 'assembly'],
    activeEdges: ['scoring-assembly'],
    duration: 2000,
  },
  {
    id: 'output-generation',
    title: 'Optimized Context Ready',
    description: 'Context optimally assembled and ready for generation',
    activeNodes: ['assembly', 'output'],
    activeEdges: ['assembly-output'],
    duration: 1000,
  }
];

interface DynamicContextAssemblyFlowProps {
  height?: number;
  autoPlay?: boolean;
}

export const DynamicContextAssemblyFlow: React.FC<DynamicContextAssemblyFlowProps> = ({
  height = 550,
  autoPlay = false
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSources, setCurrentSources] = useState<ContextSource[]>([]);

  const resetFlow = useCallback(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setCurrentSources([]);
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [setNodes, setEdges]);

  const updateNodesForStep = useCallback((step: FlowStep, stepIndex: number) => {
    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        const isActive = step.activeNodes.includes(node.id);
        const isCompleted = stepIndex < currentStep;
        
        // Special handling for source nodes
        if (node.id.startsWith('source-')) {
          const sourceInfo = step.contextSources?.find(s => node.id.includes(s.id));
          const backgroundColor = sourceInfo?.isActive ? stepColors.source_active : stepColors.source_inactive;
          
          return {
            ...node,
            style: {
              ...node.style,
              backgroundColor: isActive ? stepColors.active : backgroundColor,
              border: isActive ? `2px solid ${stepColors.active}` : `1px solid ${backgroundColor}`,
              opacity: isActive ? 1 : sourceInfo?.isActive ? 0.9 : 0.6,
            }
          };
        }
        
        return {
          ...node,
          style: {
            ...node.style,
            backgroundColor: isActive ? stepColors.active : 
                           isCompleted ? stepColors.completed : 
                           stepColors.pending,
            border: isActive ? `2px solid ${stepColors.active}` : 
                   isCompleted ? `2px solid ${stepColors.completed}` : 
                   `1px solid ${stepColors.pending}`,
            opacity: isActive ? 1 : isCompleted ? 0.8 : 0.6,
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

    if (step.contextSources) {
      setCurrentSources(step.contextSources);
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
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
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
              <div className="text-xs text-gray-300">{currentStepData.description}</div>
              <div className="text-xs text-gray-400 mt-2">
                Step {currentStep + 1} of {flowSteps.length}
              </div>
            </div>
          )}
        </Panel>

        {currentSources.length > 0 && (
          <Panel position="top-right" className="bg-gray-800 rounded-lg border border-gray-600 p-4 m-4">
            <div className="text-white text-sm font-medium mb-3">Source Scores</div>
            <div className="space-y-2">
              {currentSources.map((source) => (
                <div key={source.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${source.isActive ? 'bg-purple-400' : 'bg-gray-500'}`}></div>
                    <span className="text-gray-300">{source.name}</span>
                  </div>
                  <div className="text-white font-medium">{source.relevanceScore}%</div>
                </div>
              ))}
            </div>
          </Panel>
        )}

        <Panel position="bottom-center" className="bg-gray-800/90 rounded-lg border border-gray-600 p-3 m-4">
          <div className="flex items-center gap-4">
            {flowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  index === currentStep ? 'bg-blue-500' :
                  index < currentStep ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
                <span className={`text-xs ${
                  index === currentStep ? 'text-blue-400' :
                  index < currentStep ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < flowSteps.length - 1 && <ArrowRight className="w-3 h-3 text-gray-600" />}
              </div>
            ))}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default DynamicContextAssemblyFlow;