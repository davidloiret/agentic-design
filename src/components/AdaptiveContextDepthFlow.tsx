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
import { Play, Pause, RotateCcw, Brain, Database, Settings, Zap, ArrowRight, Clock, Activity, BarChart3, Cpu } from 'lucide-react';

interface FlowStep {
  id: string;
  title: string;
  description: string;
  activeNodes: string[];
  activeEdges: string[];
  duration: number;
  contextData?: {
    taskType: string;
    complexity: number;
    depth: number;
    memoryUsage: number;
    agentCount: number;
    processingTime: number;
  };
}

const stepColors = {
  active: '#06b6d4',
  completed: '#10b981',
  pending: '#6b7280',
  assessment: '#f59e0b',
  allocation: '#8b5cf6',
  agent: '#3b82f6',
  context: '#ec4899'
};

const initialNodes: Node[] = [
  // Task Input
  {
    id: 'task-input',
    position: { x: 100, y: 300 },
    data: { 
      label: (
        <div className="text-center">
          <Settings className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Task Input</div>
          <div className="text-xs opacity-75">Query processing</div>
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

  // Complexity Assessment
  {
    id: 'complexity-analyzer',
    position: { x: 350, y: 150 },
    data: { 
      label: (
        <div className="text-center">
          <BarChart3 className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Complexity Analyzer</div>
          <div className="text-xs opacity-75">Task difficulty assessment</div>
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

  // Context Depth Controller
  {
    id: 'depth-controller',
    position: { x: 600, y: 100 },
    data: { 
      label: (
        <div className="text-center">
          <Activity className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Depth Controller</div>
          <div className="text-xs opacity-75">Dynamic depth adjustment</div>
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

  // Resource Allocator
  {
    id: 'resource-allocator',
    position: { x: 350, y: 450 },
    data: { 
      label: (
        <div className="text-center">
          <Cpu className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Resource Allocator</div>
          <div className="text-xs opacity-75">Memory & compute management</div>
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

  // Context Levels (Depth Visualization)
  {
    id: 'context-level-1',
    position: { x: 800, y: 50 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Level 1</div>
          <div className="opacity-75">Basic facts</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.context,
      border: `2px solid ${stepColors.context}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      color: 'white',
      width: '90px',
      opacity: 0.3
    }
  },

  {
    id: 'context-level-2',
    position: { x: 800, y: 130 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Level 2</div>
          <div className="opacity-75">Simple reasoning</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.context,
      border: `2px solid ${stepColors.context}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      color: 'white',
      width: '90px',
      opacity: 0.3
    }
  },

  {
    id: 'context-level-3',
    position: { x: 800, y: 210 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Level 3</div>
          <div className="opacity-75">Multi-step analysis</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.context,
      border: `2px solid ${stepColors.context}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      color: 'white',
      width: '90px',
      opacity: 0.3
    }
  },

  {
    id: 'context-level-4',
    position: { x: 800, y: 290 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Level 4</div>
          <div className="opacity-75">Complex synthesis</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.context,
      border: `2px solid ${stepColors.context}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      color: 'white',
      width: '90px',
      opacity: 0.3
    }
  },

  {
    id: 'context-level-5',
    position: { x: 800, y: 370 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-medium">Level 5</div>
          <div className="opacity-75">System design</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.context,
      border: `2px solid ${stepColors.context}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      color: 'white',
      width: '90px',
      opacity: 0.3
    }
  },

  // Specialist Agents
  {
    id: 'knowledge-agent',
    position: { x: 950, y: 150 },
    data: { 
      label: (
        <div className="text-center">
          <Brain className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-xs">Knowledge Agent</div>
          <div className="text-xs opacity-75">Factual retrieval</div>
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
      width: '120px'
    }
  },

  {
    id: 'analysis-agent',
    position: { x: 950, y: 250 },
    data: { 
      label: (
        <div className="text-center">
          <Zap className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-xs">Analysis Agent</div>
          <div className="text-xs opacity-75">Deep reasoning</div>
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
      width: '120px'
    }
  },

  {
    id: 'synthesis-agent',
    position: { x: 950, y: 350 },
    data: { 
      label: (
        <div className="text-center">
          <Database className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-xs">Synthesis Agent</div>
          <div className="text-xs opacity-75">System design</div>
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
      width: '120px'
    }
  },

  // Performance Monitor
  {
    id: 'performance-monitor',
    position: { x: 600, y: 450 },
    data: { 
      label: (
        <div className="text-center">
          <Activity className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Performance Monitor</div>
          <div className="text-xs opacity-75">Real-time optimization</div>
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
  // Task input to complexity analyzer
  {
    id: 'input-to-analyzer',
    source: 'task-input',
    target: 'complexity-analyzer',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },

  // Complexity analyzer to depth controller
  {
    id: 'analyzer-to-depth',
    source: 'complexity-analyzer',
    target: 'depth-controller',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },

  // Task input to resource allocator
  {
    id: 'input-to-allocator',
    source: 'task-input',
    target: 'resource-allocator',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },

  // Depth controller to context levels
  {
    id: 'depth-to-level1',
    source: 'depth-controller',
    target: 'context-level-1',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '3,3' },
    animated: false
  },
  {
    id: 'depth-to-level2',
    source: 'depth-controller',
    target: 'context-level-2',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '3,3' },
    animated: false
  },
  {
    id: 'depth-to-level3',
    source: 'depth-controller',
    target: 'context-level-3',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '3,3' },
    animated: false
  },
  {
    id: 'depth-to-level4',
    source: 'depth-controller',
    target: 'context-level-4',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '3,3' },
    animated: false
  },
  {
    id: 'depth-to-level5',
    source: 'depth-controller',
    target: 'context-level-5',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '3,3' },
    animated: false
  },

  // Context levels to agents
  {
    id: 'level1-to-knowledge',
    source: 'context-level-1',
    target: 'knowledge-agent',
    style: { stroke: stepColors.pending, strokeWidth: 1 },
    animated: false
  },
  {
    id: 'level3-to-analysis',
    source: 'context-level-3',
    target: 'analysis-agent',
    style: { stroke: stepColors.pending, strokeWidth: 1 },
    animated: false
  },
  {
    id: 'level5-to-synthesis',
    source: 'context-level-5',
    target: 'synthesis-agent',
    style: { stroke: stepColors.pending, strokeWidth: 1 },
    animated: false
  },

  // Resource allocator to performance monitor
  {
    id: 'allocator-to-monitor',
    source: 'resource-allocator',
    target: 'performance-monitor',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },

  // Performance monitor feedback to depth controller
  {
    id: 'monitor-to-depth',
    source: 'performance-monitor',
    target: 'depth-controller',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '5,5' },
    animated: false
  }
];

const flowSteps: FlowStep[] = [
  {
    id: 'simple-task',
    title: 'Simple Task Processing',
    description: 'Basic factual query requires minimal context depth and single agent',
    activeNodes: ['task-input', 'complexity-analyzer', 'context-level-1', 'knowledge-agent'],
    activeEdges: ['input-to-analyzer', 'depth-to-level1', 'level1-to-knowledge'],
    duration: 2000,
    contextData: {
      taskType: 'Basic ML algorithms query',
      complexity: 1,
      depth: 1,
      memoryUsage: 200,
      agentCount: 1,
      processingTime: 15
    }
  },
  {
    id: 'moderate-task',
    title: 'Moderate Complexity Task',
    description: 'Comparative analysis requires deeper context and multiple agents',
    activeNodes: ['task-input', 'complexity-analyzer', 'depth-controller', 'context-level-3', 'knowledge-agent', 'analysis-agent'],
    activeEdges: ['input-to-analyzer', 'analyzer-to-depth', 'depth-to-level3', 'level1-to-knowledge', 'level3-to-analysis'],
    duration: 2500,
    contextData: {
      taskType: 'Framework comparison',
      complexity: 3,
      depth: 3,
      memoryUsage: 800,
      agentCount: 2,
      processingTime: 150
    }
  },
  {
    id: 'resource-allocation',
    title: 'Dynamic Resource Allocation',
    description: 'System allocates memory and compute resources based on task complexity',
    activeNodes: ['resource-allocator', 'performance-monitor', 'depth-controller'],
    activeEdges: ['input-to-allocator', 'allocator-to-monitor', 'monitor-to-depth'],
    duration: 2000,
    contextData: {
      taskType: 'Resource optimization',
      complexity: 3,
      depth: 3,
      memoryUsage: 1200,
      agentCount: 2,
      processingTime: 180
    }
  },
  {
    id: 'complex-task',
    title: 'Complex Multi-Domain Task',
    description: 'System design task requires maximum context depth and all available agents',
    activeNodes: ['task-input', 'complexity-analyzer', 'depth-controller', 'context-level-5', 'knowledge-agent', 'analysis-agent', 'synthesis-agent'],
    activeEdges: ['input-to-analyzer', 'analyzer-to-depth', 'depth-to-level5', 'level1-to-knowledge', 'level3-to-analysis', 'level5-to-synthesis'],
    duration: 3000,
    contextData: {
      taskType: 'Autonomous vehicle AI system',
      complexity: 5,
      depth: 5,
      memoryUsage: 2500,
      agentCount: 3,
      processingTime: 1200
    }
  },
  {
    id: 'adaptive-scaling',
    title: 'Real-time Adaptive Scaling',
    description: 'Performance monitor triggers dynamic context adjustment based on system load',
    activeNodes: ['performance-monitor', 'depth-controller', 'resource-allocator', 'context-level-3'],
    activeEdges: ['monitor-to-depth', 'allocator-to-monitor', 'depth-to-level3'],
    duration: 2000,
    contextData: {
      taskType: 'Load balancing adjustment',
      complexity: 3,
      depth: 3,
      memoryUsage: 1800,
      agentCount: 2,
      processingTime: 250
    }
  },
  {
    id: 'multi-level-coordination',
    title: 'Multi-Level Context Coordination',
    description: 'Multiple context levels active simultaneously for parallel task processing',
    activeNodes: ['depth-controller', 'context-level-1', 'context-level-3', 'context-level-5', 'knowledge-agent', 'analysis-agent', 'synthesis-agent'],
    activeEdges: ['depth-to-level1', 'depth-to-level3', 'depth-to-level5', 'level1-to-knowledge', 'level3-to-analysis', 'level5-to-synthesis'],
    duration: 2500,
    contextData: {
      taskType: 'Parallel multi-complexity processing',
      complexity: 4,
      depth: 5,
      memoryUsage: 3200,
      agentCount: 3,
      processingTime: 800
    }
  }
];

interface AdaptiveContextDepthFlowProps {
  height?: number;
  autoPlay?: boolean;
}

export const AdaptiveContextDepthFlow: React.FC<AdaptiveContextDepthFlowProps> = ({
  height = 650,
  autoPlay = false
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentContext, setCurrentContext] = useState<FlowStep['contextData'] | null>(null);

  const resetFlow = useCallback(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setCurrentContext(null);
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [setNodes, setEdges]);

  const updateNodesForStep = useCallback((step: FlowStep, stepIndex: number) => {
    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        const isActive = step.activeNodes.includes(node.id);
        const isCompleted = stepIndex < currentStep;
        
        // Special handling for context level nodes
        if (node.id.startsWith('context-level-')) {
          const level = parseInt(node.id.split('-')[2]);
          const activeDepth = step.contextData?.depth || 1;
          const shouldBeVisible = level <= activeDepth;
          
          return {
            ...node,
            style: {
              ...node.style,
              opacity: shouldBeVisible ? (isActive ? 1 : 0.7) : 0.2,
              backgroundColor: isActive ? stepColors.context : stepColors.context,
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
            }
          };
        }
        
        // Main nodes
        let backgroundColor = stepColors.pending;
        if (isActive) {
          if (node.id === 'complexity-analyzer') backgroundColor = stepColors.assessment;
          else if (node.id === 'resource-allocator') backgroundColor = stepColors.allocation;
          else if (node.id.includes('agent')) backgroundColor = stepColors.agent;
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

    if (step.contextData) {
      setCurrentContext(step.contextData);
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
                  : 'bg-cyan-600 hover:bg-cyan-700 text-white'
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

        {currentContext && (
          <Panel position="top-right" className="bg-gray-800 rounded-lg border border-gray-600 p-4 m-4">
            <div className="text-white text-sm font-medium mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Context Metrics
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Task:</span>
                <span className="text-cyan-400">{currentContext.taskType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Complexity:</span>
                <span className="text-yellow-400">Level {currentContext.complexity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Context Depth:</span>
                <span className="text-purple-400">{currentContext.depth}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Memory:</span>
                <span className="text-green-400">{currentContext.memoryUsage} tokens</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Agents:</span>
                <span className="text-blue-400">{currentContext.agentCount} active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Time:</span>
                <span className="text-red-400">{currentContext.processingTime}ms</span>
              </div>
            </div>
          </Panel>
        )}

        <Panel position="bottom-left" className="bg-gray-800/90 rounded-lg border border-gray-600 p-3 m-4">
          <div className="text-white text-sm font-medium mb-2">Legend</div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-3 h-3 text-yellow-400" />
              <span className="text-gray-300">Complexity Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span className="text-gray-300">Depth Control</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3 text-purple-400" />
              <span className="text-gray-300">Resource Allocation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded"></div>
              <span className="text-gray-300">Context Level</span>
            </div>
          </div>
        </Panel>

        <Panel position="bottom-center" className="bg-gray-800/90 rounded-lg border border-gray-600 p-3 m-4">
          <div className="flex items-center gap-4">
            {flowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  index === currentStep ? 'bg-cyan-500' :
                  index < currentStep ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
                <span className={`text-xs ${
                  index === currentStep ? 'text-cyan-400' :
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
          <Panel position="top-center" className="bg-cyan-900/30 rounded-lg border border-cyan-500/50 p-2 m-4">
            <div className="flex items-center gap-2 text-cyan-300 text-sm">
              <Clock className="w-4 h-4 animate-pulse" />
              Adapting context depth...
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export default AdaptiveContextDepthFlow;