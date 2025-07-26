'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { memoryConsolidationPattern } from '../data/patterns/memory-consolidation';

interface FlowState {
  activeStepIndex: number;
  isRunning: boolean;
  completedSteps: string[];
}

interface CustomNodeData {
  label: string;
  description: string;
  type: string;
  status: 'idle' | 'active' | 'completed';
}

const nodeColors = {
  input: 'bg-blue-500',
  output: 'bg-purple-500',
  organizer: 'bg-green-500',
  storage: 'bg-orange-500',
  analyzer: 'bg-cyan-500',
  detector: 'bg-yellow-500',
  engine: 'bg-red-500',
  extractor: 'bg-pink-500',
  comparator: 'bg-indigo-500',
  filter: 'bg-teal-500',
  scorer: 'bg-amber-500',
  evaluator: 'bg-emerald-500',
  assessor: 'bg-rose-500',
  builder: 'bg-violet-500',
  constructor: 'bg-sky-500',
  structurer: 'bg-lime-500',
  optimizer: 'bg-fuchsia-500',
  validator: 'bg-slate-500',
  monitor: 'bg-zinc-500',
  generator: 'bg-stone-500',
  default: 'bg-gray-500'
};

const CustomNode = ({ data }: { data: CustomNodeData }) => {
  const nodeColor = nodeColors[data.type as keyof typeof nodeColors] || nodeColors.default;
  
  return (
    <div className={`
      px-4 py-3 rounded-lg border-2 text-white text-center min-w-[160px] max-w-[200px]
      ${data.status === 'active' ? 'ring-2 ring-yellow-400 animate-pulse' : ''}
      ${data.status === 'completed' ? 'ring-2 ring-green-400' : ''}
      ${nodeColor}
    `}>
      <div className="font-semibold text-sm">{data.label}</div>
      <div className="text-xs mt-1 opacity-90">{data.description}</div>
      {data.status === 'active' && (
        <div className="mt-2">
          <div className="w-full bg-white/20 rounded-full h-1">
            <div className="bg-yellow-300 h-1 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const MemoryConsolidationFlow: React.FC = () => {
  const [flowState, setFlowState] = useState<FlowState>({
    activeStepIndex: -1,
    isRunning: false,
    completedSteps: []
  });

  // Initialize nodes and edges from the pattern
  const initialNodes: Node[] = memoryConsolidationPattern.initialNodes.map(node => ({
    ...node,
    type: 'custom',
    data: {
      ...node.data,
      status: 'idle' as const
    }
  }));

  const initialEdges: Edge[] = memoryConsolidationPattern.initialEdges.map(edge => ({
    ...edge,
    animated: false,
    style: { stroke: '#6b7280', strokeWidth: 2 }
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const resetFlow = useCallback(() => {
    setFlowState({
      activeStepIndex: -1,
      isRunning: false,
      completedSteps: []
    });
    
    setNodes(nodes.map(node => ({
      ...node,
      data: { ...node.data, status: 'idle' }
    })));
    
    setEdges(edges.map(edge => ({
      ...edge,
      animated: false,
      style: { stroke: '#6b7280', strokeWidth: 2 }
    })));
  }, [nodes, edges, setNodes, setEdges]);

  const runStep = useCallback((stepIndex: number) => {
    const step = memoryConsolidationPattern.steps[stepIndex];
    if (!step) return;

    // Mark active nodes
    setNodes(prevNodes => prevNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        status: step.activeNodes.includes(node.id) ? 'active' :
                flowState.completedSteps.includes(node.id) ? 'completed' : 'idle'
      }
    })));

    // Animate active edges
    setEdges(prevEdges => prevEdges.map(edge => ({
      ...edge,
      animated: step.activeEdges.includes(edge.id),
      style: {
        stroke: step.activeEdges.includes(edge.id) ? '#10b981' : '#6b7280',
        strokeWidth: step.activeEdges.includes(edge.id) ? 3 : 2
      }
    })));

    setFlowState(prev => ({
      ...prev,
      activeStepIndex: stepIndex
    }));
  }, [flowState.completedSteps, setNodes, setEdges]);

  const completeStep = useCallback(() => {
    const step = memoryConsolidationPattern.steps[flowState.activeStepIndex];
    if (!step) return;

    setFlowState(prev => ({
      ...prev,
      completedSteps: [...prev.completedSteps, ...step.activeNodes],
      activeStepIndex: prev.activeStepIndex + 1
    }));

    // Mark completed nodes
    setNodes(prevNodes => prevNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        status: step.activeNodes.includes(node.id) ? 'completed' : node.data.status
      }
    })));

    // Reset edge animations
    setEdges(prevEdges => prevEdges.map(edge => ({
      ...edge,
      animated: false,
      style: { stroke: '#6b7280', strokeWidth: 2 }
    })));
  }, [flowState.activeStepIndex, setNodes, setEdges]);

  const startDemo = useCallback(() => {
    setFlowState(prev => ({ ...prev, isRunning: true, activeStepIndex: 0 }));
    runStep(0);
  }, [runStep]);

  const pauseDemo = useCallback(() => {
    setFlowState(prev => ({ ...prev, isRunning: false }));
  }, []);

  useEffect(() => {
    if (flowState.isRunning && flowState.activeStepIndex >= 0) {
      const timer = setTimeout(() => {
        completeStep();
        
        if (flowState.activeStepIndex + 1 < memoryConsolidationPattern.steps.length) {
          runStep(flowState.activeStepIndex + 1);
        } else {
          setFlowState(prev => ({ ...prev, isRunning: false }));
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [flowState.isRunning, flowState.activeStepIndex, runStep, completeStep]);

  const currentStep = flowState.activeStepIndex >= 0 ? 
    memoryConsolidationPattern.steps[flowState.activeStepIndex] : null;

  return (
    <ReactFlowProvider>
      <div className="w-full h-full bg-gray-900 text-white">
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 z-10 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{memoryConsolidationPattern.title}</h2>
              <p className="text-gray-400 text-sm">{memoryConsolidationPattern.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={flowState.isRunning ? pauseDemo : startDemo}
                disabled={!flowState.isRunning && flowState.activeStepIndex >= memoryConsolidationPattern.steps.length}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  flowState.isRunning 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-blue-600 hover:bg-blue-700 disabled:opacity-50'
                }`}
              >
                {flowState.isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={resetFlow}
                disabled={flowState.isRunning}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 rounded-lg font-medium transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Current Step Info */}
        {currentStep && (
          <div className="absolute top-24 left-4 right-4 z-10 bg-blue-600/90 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">
                  Step {flowState.activeStepIndex + 1}: {currentStep.title}
                </h3>
                <p className="text-sm text-blue-100">{currentStep.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm">
                  <div>Input: <span className="text-blue-200">{currentStep.input}</span></div>
                  <div>Output: <span className="text-blue-200">{currentStep.output}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flow */}
        <div className="w-full h-full pt-32">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
            attributionPosition="bottom-left"
          >
            <Background color="#374151" variant="dots" />
            <Controls className="bg-gray-800 border-gray-600" />
            <MiniMap 
              className="bg-gray-800 border-gray-600"
              nodeColor={(node) => {
                const nodeData = node.data as CustomNodeData;
                return nodeData.status === 'active' ? '#fbbf24' : 
                       nodeData.status === 'completed' ? '#10b981' : '#6b7280';
              }}
            />
          </ReactFlow>
        </div>

        {/* Step Progress */}
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Progress:</span>
            <span className="text-sm text-gray-400">
              {flowState.completedSteps.length > 0 ? 
                `${Math.min(flowState.activeStepIndex + 1, memoryConsolidationPattern.steps.length)} / ${memoryConsolidationPattern.steps.length} steps` :
                'Ready to start'
              }
            </span>
          </div>
          <div className="flex gap-1">
            {memoryConsolidationPattern.steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index < flowState.activeStepIndex ? 'bg-green-500' :
                  index === flowState.activeStepIndex ? 'bg-yellow-500' :
                  'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default MemoryConsolidationFlow;