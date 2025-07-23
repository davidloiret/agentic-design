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
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';

interface PatternScenario {
  id: string;
  title: string;
  description: string;
  steps: ScenarioStep[];
  initialNodes: Node[];
  initialEdges: Edge[];
}

interface ScenarioStep {
  id: string;
  title: string;
  description: string;
  input?: string;
  output?: string;
  activeNodes: string[];
  activeEdges: string[];
  newNodes?: Node[];
  newEdges?: Edge[];
  nodeUpdates?: { [nodeId: string]: Partial<Node> };
}

interface InteractivePatternFlowProps {
  scenario: PatternScenario;
  height?: number;
}

const stepColors = {
  active: '#3b82f6',
  completed: '#10b981',
  pending: '#6b7280',
  error: '#ef4444',
  processing: '#f59e0b'
};

export const InteractivePatternFlow: React.FC<InteractivePatternFlowProps> = ({
  scenario,
  height = 600
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(scenario.initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(scenario.initialEdges);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIOPanel, setShowIOPanel] = useState(true);

  const resetScenario = useCallback(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setNodes(scenario.initialNodes);
    setEdges(scenario.initialEdges);
  }, [scenario, setNodes, setEdges]);

  const updateNodesForStep = useCallback((step: ScenarioStep) => {
    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        const isActive = step.activeNodes.includes(node.id);
        const isCompleted = currentStep > scenario.steps.findIndex(s => s.activeNodes.includes(node.id));
        const updates = step.nodeUpdates?.[node.id] || {};
        
        return {
          ...node,
          ...updates,
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
        const isCompleted = currentStep > scenario.steps.findIndex(s => s.activeEdges.includes(edge.id));
        
        return {
          ...edge,
          style: {
            ...edge.style,
            stroke: isActive ? stepColors.active : 
                   isCompleted ? stepColors.completed : 
                   stepColors.pending,
            strokeWidth: isActive ? 3 : 2,
            opacity: isActive ? 1 : isCompleted ? 0.8 : 0.4,
          },
          animated: isActive
        };
      });
    });

    // Add new nodes/edges if specified
    if (step.newNodes) {
      setNodes(prev => [...prev, ...step.newNodes!]);
    }
    if (step.newEdges) {
      setEdges(prev => [...prev, ...step.newEdges!]);
    }
  }, [currentStep, scenario.steps, setNodes, setEdges]);

  const nextStep = useCallback(() => {
    if (currentStep < scenario.steps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      updateNodesForStep(scenario.steps[newStep]);
    } else {
      setIsPlaying(false);
    }
  }, [currentStep, scenario.steps, updateNodesForStep]);

  const prevStep = useCallback(() => {
    if (currentStep > -1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      if (newStep >= 0) {
        updateNodesForStep(scenario.steps[newStep]);
      } else {
        resetScenario();
      }
    }
  }, [currentStep, scenario.steps, updateNodesForStep, resetScenario]);

  const togglePlayback = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < scenario.steps.length - 1) {
      interval = setTimeout(nextStep, 2000);
    } else if (isPlaying) {
      setIsPlaying(false);
    }
    return () => clearTimeout(interval);
  }, [isPlaying, currentStep, nextStep, scenario.steps.length]);

  const currentStepData = currentStep >= 0 ? scenario.steps[currentStep] : null;

  return (
    <div className="">
      {/* Main Content */}
      <div className="flex">
        {/* Flow Diagram */}
        <div className="flex-1" style={{ height: `${height}px` }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            connectionMode={ConnectionMode.Loose}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
          >
            <Background color="#334155" />
            <Controls className="bg-slate-700 border-slate-600" />
            
            {/* Control Panel */}
            <Panel position="top-left" className="bg-slate-800/90 p-3 rounded-lg m-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlayback}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={prevStep}
                  disabled={currentStep <= -1}
                  className="p-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-md transition-colors"
                  title="Previous Step"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={nextStep}
                  disabled={currentStep >= scenario.steps.length - 1}
                  className="p-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-md transition-colors"
                  title="Next Step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={resetScenario}
                  className="p-2 bg-slate-600 hover:bg-slate-700 text-white rounded-md transition-colors"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
              
              {/* Step Progress */}
              <div className="mt-3">
                <div className="text-xs text-slate-300 mb-1">
                  Step {Math.max(0, currentStep + 1)} of {scenario.steps.length}
                </div>
                <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / scenario.steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </Panel>
          </ReactFlow>
        </div>

        {/* Info Panel */}
        {showIOPanel && (
          <div className="w-80 bg-slate-800 border-l border-slate-600 p-4 overflow-y-auto" style={{ height: `${height}px` }}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">Step Details</h4>
              <button
                onClick={() => setShowIOPanel(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            
            {currentStepData ? (
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-blue-400 mb-2">{currentStepData.title}</h5>
                  <p className="text-sm text-slate-300">{currentStepData.description}</p>
                </div>
                
                {currentStepData.input && (
                  <div>
                    <h6 className="text-sm font-medium text-green-400 mb-2">Input:</h6>
                    <div className="bg-slate-900 p-3 rounded-md text-sm text-slate-200">
                      {currentStepData.input}
                    </div>
                  </div>
                )}
                
                {currentStepData.output && (
                  <div>
                    <h6 className="text-sm font-medium text-purple-400 mb-2">Output:</h6>
                    <div className="bg-slate-900 p-3 rounded-md text-sm text-slate-200">
                      {currentStepData.output}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-slate-400 text-sm">
                Click play or use the step controls to begin the interactive demonstration.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Show panel button when hidden */}
      {!showIOPanel && (
        <button
          onClick={() => setShowIOPanel(true)}
          className="absolute top-20 right-4 bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-md text-sm z-10"
        >
          Show Details
        </button>
      )}
    </div>
  );
};