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
import { Play, Pause, RotateCcw, MessageSquare, Server, Users, Brain, Database, Zap, ArrowRight, Clock } from 'lucide-react';

interface FlowStep {
  id: string;
  title: string;
  description: string;
  activeNodes: string[];
  activeEdges: string[];
  duration: number;
  messageData?: {
    from: string;
    to: string;
    content: string;
    type: string;
  };
}

const stepColors = {
  active: '#ec4899',
  completed: '#10b981',
  pending: '#6b7280',
  message: '#f59e0b',
  queue: '#8b5cf6',
  agent: '#3b82f6'
};

const initialNodes: Node[] = [
  // Coordinator Agent
  {
    id: 'coordinator',
    position: { x: 100, y: 100 },
    data: { 
      label: (
        <div className="text-center">
          <Brain className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Research Coordinator</div>
          <div className="text-xs opacity-75">Orchestrates workflow</div>
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

  // Message Queues
  {
    id: 'research-queue',
    position: { x: 350, y: 50 },
    data: { 
      label: (
        <div className="text-center">
          <Server className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-xs">Research Tasks</div>
          <div className="text-xs opacity-75">Priority Queue</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      color: 'white',
      width: '120px'
    }
  },

  {
    id: 'arxiv-queue',
    position: { x: 350, y: 200 },
    data: { 
      label: (
        <div className="text-center">
          <Server className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-xs">ArXiv Tasks</div>
          <div className="text-xs opacity-75">Processing Queue</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      color: 'white',
      width: '120px'
    }
  },

  {
    id: 'analysis-queue',
    position: { x: 350, y: 350 },
    data: { 
      label: (
        <div className="text-center">
          <Server className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-xs">Analysis Tasks</div>
          <div className="text-xs opacity-75">High Priority</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      color: 'white',
      width: '120px'
    }
  },

  {
    id: 'results-queue',
    position: { x: 350, y: 500 },
    data: { 
      label: (
        <div className="text-center">
          <Server className="w-5 h-5 mx-auto mb-1" />
          <div className="font-medium text-xs">Results Queue</div>
          <div className="text-xs opacity-75">Final Output</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.pending,
      border: `1px solid ${stepColors.pending}`,
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      color: 'white',
      width: '120px'
    }
  },

  // Worker Agents
  {
    id: 'arxiv-agent',
    position: { x: 600, y: 200 },
    data: { 
      label: (
        <div className="text-center">
          <Database className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">ArXiv Agent</div>
          <div className="text-xs opacity-75">Paper extraction</div>
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

  {
    id: 'analysis-agent',
    position: { x: 600, y: 350 },
    data: { 
      label: (
        <div className="text-center">
          <Zap className="w-6 h-6 mx-auto mb-1" />
          <div className="font-medium">Analysis Agent</div>
          <div className="text-xs opacity-75">Content analysis</div>
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

  // Message Indicators (initially hidden)
  {
    id: 'message-1',
    position: { x: 225, y: 75 },
    data: { 
      label: (
        <div className="text-center">
          <MessageSquare className="w-4 h-4 mx-auto mb-1" />
          <div className="text-xs">Research Task</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.message,
      border: `2px solid ${stepColors.message}`,
      borderRadius: '8px',
      padding: '6px',
      fontSize: '10px',
      color: 'white',
      width: '80px',
      opacity: 0
    }
  },

  {
    id: 'message-2',
    position: { x: 475, y: 225 },
    data: { 
      label: (
        <div className="text-center">
          <MessageSquare className="w-4 h-4 mx-auto mb-1" />
          <div className="text-xs">Search Task</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.message,
      border: `2px solid ${stepColors.message}`,
      borderRadius: '8px',
      padding: '6px',
      fontSize: '10px',
      color: 'white',
      width: '80px',
      opacity: 0
    }
  },

  {
    id: 'message-3',
    position: { x: 475, y: 375 },
    data: { 
      label: (
        <div className="text-center">
          <MessageSquare className="w-4 h-4 mx-auto mb-1" />
          <div className="text-xs">Analysis Task</div>
        </div>
      )
    },
    style: {
      backgroundColor: stepColors.message,
      border: `2px solid ${stepColors.message}`,
      borderRadius: '8px',
      padding: '6px',
      fontSize: '10px',
      color: 'white',
      width: '80px',
      opacity: 0
    }
  }
];

const initialEdges: Edge[] = [
  // Coordinator to queues
  {
    id: 'coord-research',
    source: 'coordinator',
    target: 'research-queue',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },

  // Queue to agent connections
  {
    id: 'arxiv-queue-agent',
    source: 'arxiv-queue',
    target: 'arxiv-agent',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },
  {
    id: 'analysis-queue-agent',
    source: 'analysis-queue',
    target: 'analysis-agent',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  },

  // Inter-queue connections (workflow)
  {
    id: 'research-arxiv',
    source: 'research-queue',
    target: 'arxiv-queue',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '5,5' },
    animated: false
  },
  {
    id: 'arxiv-analysis',
    source: 'arxiv-queue',
    target: 'analysis-queue',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '5,5' },
    animated: false
  },
  {
    id: 'analysis-results',
    source: 'analysis-queue',
    target: 'results-queue',
    style: { stroke: stepColors.pending, strokeWidth: 1, strokeDasharray: '5,5' },
    animated: false
  },

  // Results back to coordinator
  {
    id: 'results-coord',
    source: 'results-queue',
    target: 'coordinator',
    style: { stroke: stepColors.pending, strokeWidth: 2 },
    animated: false
  }
];

const flowSteps: FlowStep[] = [
  {
    id: 'publish-research',
    title: 'Publish Research Task',
    description: 'Coordinator publishes a research task to the priority queue',
    activeNodes: ['coordinator', 'research-queue', 'message-1'],
    activeEdges: ['coord-research'],
    duration: 2000,
    messageData: {
      from: 'Coordinator',
      to: 'Research Queue',
      content: 'Analyze quantum computing papers',
      type: 'research_task'
    }
  },
  {
    id: 'route-to-arxiv',
    title: 'Route to ArXiv Queue',
    description: 'Message broker routes task to appropriate specialist queue',
    activeNodes: ['research-queue', 'arxiv-queue', 'message-2'],
    activeEdges: ['research-arxiv'],
    duration: 1500,
    messageData: {
      from: 'Research Queue',
      to: 'ArXiv Queue',
      content: 'Search arxiv for quantum papers',
      type: 'search_task'
    }
  },
  {
    id: 'arxiv-processing',
    title: 'ArXiv Agent Processing',
    description: 'ArXiv agent consumes message and processes the search task',
    activeNodes: ['arxiv-queue', 'arxiv-agent'],
    activeEdges: ['arxiv-queue-agent'],
    duration: 3000,
    messageData: {
      from: 'ArXiv Queue',
      to: 'ArXiv Agent',
      content: 'Processing search request...',
      type: 'processing'
    }
  },
  {
    id: 'publish-analysis',
    title: 'Publish Analysis Task',
    description: 'ArXiv agent publishes results for analysis',
    activeNodes: ['arxiv-agent', 'analysis-queue', 'message-3'],
    activeEdges: ['arxiv-analysis'],
    duration: 1500,
    messageData: {
      from: 'ArXiv Agent',
      to: 'Analysis Queue',
      content: 'Found 25 papers for analysis',
      type: 'analysis_task'
    }
  },
  {
    id: 'analysis-processing',
    title: 'Analysis Processing',
    description: 'Analysis agent processes the papers and generates insights',
    activeNodes: ['analysis-queue', 'analysis-agent'],
    activeEdges: ['analysis-queue-agent'],
    duration: 4000,
    messageData: {
      from: 'Analysis Queue',
      to: 'Analysis Agent',
      content: 'Analyzing paper content...',
      type: 'processing'
    }
  },
  {
    id: 'publish-results',
    title: 'Publish Final Results',
    description: 'Analysis agent publishes final research results',
    activeNodes: ['analysis-agent', 'results-queue'],
    activeEdges: ['analysis-results'],
    duration: 1000,
    messageData: {
      from: 'Analysis Agent',
      to: 'Results Queue',
      content: 'Research summary completed',
      type: 'result'
    }
  },
  {
    id: 'deliver-results',
    title: 'Deliver to Coordinator',
    description: 'Final results delivered back to the requesting coordinator',
    activeNodes: ['results-queue', 'coordinator'],
    activeEdges: ['results-coord'],
    duration: 1000,
    messageData: {
      from: 'Results Queue',
      to: 'Coordinator',
      content: 'Mission accomplished! 🎉',
      type: 'completion'
    }
  }
];

interface MessageQueuingFlowProps {
  height?: number;
  autoPlay?: boolean;
}

export const MessageQueuingFlow: React.FC<MessageQueuingFlowProps> = ({
  height = 650,
  autoPlay = false
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<FlowStep['messageData'] | null>(null);

  const resetFlow = useCallback(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setCurrentMessage(null);
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [setNodes, setEdges]);

  const updateNodesForStep = useCallback((step: FlowStep, stepIndex: number) => {
    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        const isActive = step.activeNodes.includes(node.id);
        const isCompleted = stepIndex < currentStep;
        
        // Special handling for message nodes
        if (node.id.startsWith('message-')) {
          return {
            ...node,
            style: {
              ...node.style,
              opacity: isActive ? 1 : 0,
              backgroundColor: isActive ? stepColors.message : stepColors.pending,
            }
          };
        }
        
        // Agent and queue nodes
        let backgroundColor = stepColors.pending;
        if (isActive) backgroundColor = stepColors.active;
        else if (isCompleted) backgroundColor = stepColors.completed;
        
        // Color coding by type
        if (node.id.includes('queue')) {
          backgroundColor = isActive ? stepColors.queue : (isCompleted ? stepColors.completed : stepColors.pending);
        } else if (node.id.includes('agent')) {
          backgroundColor = isActive ? stepColors.agent : (isCompleted ? stepColors.completed : stepColors.pending);
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

    if (step.messageData) {
      setCurrentMessage(step.messageData);
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
                  : 'bg-pink-600 hover:bg-pink-700 text-white'
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

        {currentMessage && (
          <Panel position="top-right" className="bg-gray-800 rounded-lg border border-gray-600 p-4 m-4">
            <div className="text-white text-sm font-medium mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Message in Transit
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">From:</span>
                <span className="text-blue-400">{currentMessage.from}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">To:</span>
                <span className="text-green-400">{currentMessage.to}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Type:</span>
                <span className="text-purple-400">{currentMessage.type}</span>
              </div>
              <div className="mt-2 p-2 bg-gray-700/50 rounded text-gray-300">
                &quot;{currentMessage.content}&quot;
              </div>
            </div>
          </Panel>
        )}

        <Panel position="bottom-left" className="bg-gray-800/90 rounded-lg border border-gray-600 p-3 m-4">
          <div className="text-white text-sm font-medium mb-2">Legend</div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Brain className="w-3 h-3 text-blue-400" />
              <span className="text-gray-300">Coordinator</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="w-3 h-3 text-purple-400" />
              <span className="text-gray-300">Message Queue</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-3 h-3 text-green-400" />
              <span className="text-gray-300">Specialist Agent</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3 h-3 text-yellow-400" />
              <span className="text-gray-300">Message</span>
            </div>
          </div>
        </Panel>

        <Panel position="bottom-center" className="bg-gray-800/90 rounded-lg border border-gray-600 p-3 m-4">
          <div className="flex items-center gap-4">
            {flowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  index === currentStep ? 'bg-pink-500' :
                  index < currentStep ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
                <span className={`text-xs ${
                  index === currentStep ? 'text-pink-400' :
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
          <Panel position="top-center" className="bg-pink-900/30 rounded-lg border border-pink-500/50 p-2 m-4">
            <div className="flex items-center gap-2 text-pink-300 text-sm">
              <Clock className="w-4 h-4 animate-pulse" />
              Processing...
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export default MessageQueuingFlow;