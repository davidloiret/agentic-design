'use client';

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { hierarchicalMemoryPattern } from '../data/patterns/hierarchical-memory';

const nodeTypes = {
  // Custom node types can be added here if needed
};

const HierarchicalMemoryFlow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(hierarchicalMemoryPattern.initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(hierarchicalMemoryPattern.initialEdges);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const resetFlow = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setNodes(hierarchicalMemoryPattern.initialNodes);
    setEdges(hierarchicalMemoryPattern.initialEdges);
  };

  const playStep = () => {
    if (currentStep < hierarchicalMemoryPattern.steps.length) {
      const step = hierarchicalMemoryPattern.steps[currentStep];
      
      // Update node styles based on active nodes
      setNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            active: step.activeNodes.includes(node.id),
          },
          style: {
            ...node.style,
            backgroundColor: step.activeNodes.includes(node.id) ? '#3B82F6' : '#374151',
            borderColor: step.activeNodes.includes(node.id) ? '#60A5FA' : '#6B7280',
            color: step.activeNodes.includes(node.id) ? '#FFFFFF' : '#D1D5DB',
            transform: step.activeNodes.includes(node.id) ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s ease-in-out',
          },
        }))
      );

      // Update edge styles based on active edges
      setEdges((edges) =>
        edges.map((edge) => ({
          ...edge,
          style: {
            ...edge.style,
            stroke: step.activeEdges.includes(edge.id) ? '#3B82F6' : '#6B7280',
            strokeWidth: step.activeEdges.includes(edge.id) ? 2 : 1,
          },
          animated: step.activeEdges.includes(edge.id),
        }))
      );

      setCurrentStep(currentStep + 1);
    }
  };

  const playAll = () => {
    setIsPlaying(true);
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      if (stepIndex < hierarchicalMemoryPattern.steps.length) {
        const step = hierarchicalMemoryPattern.steps[stepIndex];
        
        setNodes((nodes) =>
          nodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              active: step.activeNodes.includes(node.id),
            },
            style: {
              ...node.style,
              backgroundColor: step.activeNodes.includes(node.id) ? '#3B82F6' : '#374151',
              borderColor: step.activeNodes.includes(node.id) ? '#60A5FA' : '#6B7280',
              color: step.activeNodes.includes(node.id) ? '#FFFFFF' : '#D1D5DB',
              transform: step.activeNodes.includes(node.id) ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease-in-out',
            },
          }))
        );

        setEdges((edges) =>
          edges.map((edge) => ({
            ...edge,
            style: {
              ...edge.style,
              stroke: step.activeEdges.includes(edge.id) ? '#3B82F6' : '#6B7280',
              strokeWidth: step.activeEdges.includes(edge.id) ? 2 : 1,
            },
            animated: step.activeEdges.includes(edge.id),
          }))
        );

        setCurrentStep(stepIndex + 1);
        stepIndex++;
      } else {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 2500);
  };

  const currentStepData = currentStep > 0 ? hierarchicalMemoryPattern.steps[currentStep - 1] : null;

  return (
    <div className="w-full h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{hierarchicalMemoryPattern.title}</h1>
            <p className="text-gray-400 text-sm mt-1">{hierarchicalMemoryPattern.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={playStep}
              disabled={isPlaying || currentStep >= hierarchicalMemoryPattern.steps.length}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
            <button
              onClick={playAll}
              disabled={isPlaying || currentStep >= hierarchicalMemoryPattern.steps.length}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Play All
            </button>
            <button
              onClick={resetFlow}
              disabled={isPlaying}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </div>
        
        {/* Step Information */}
        {currentStepData && (
          <div className="mt-4 p-3 bg-gray-700 rounded">
            <h3 className="text-white font-semibold">{currentStepData.title}</h3>
            <p className="text-gray-300 text-sm mt-1">{currentStepData.description}</p>
            {currentStepData.input && (
              <div className="mt-2 text-xs">
                <span className="text-gray-400">Input: </span>
                <span className="text-blue-300">{currentStepData.input}</span>
              </div>
            )}
            {currentStepData.output && (
              <div className="text-xs">
                <span className="text-gray-400">Output: </span>
                <span className="text-green-300">{currentStepData.output}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Flow Chart */}
      <div className="h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls className="bg-gray-800 border-gray-600 text-white" />
          <MiniMap 
            className="bg-gray-800 border-gray-600"
            nodeColor="#374151"
            maskColor="#111827"
          />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="#374151" />
        </ReactFlow>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-4 left-4 right-4 bg-gray-800 border border-gray-700 rounded p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-sm font-medium">Progress</span>
          <span className="text-gray-400 text-sm">
            {currentStep} / {hierarchicalMemoryPattern.steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(currentStep / hierarchicalMemoryPattern.steps.length) * 100}%`,
            }}
          />
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-7 gap-1 text-xs">
          {hierarchicalMemoryPattern.steps.map((step, index) => (
            <div
              key={step.id}
              className={`p-2 rounded text-center ${
                index < currentStep
                  ? 'bg-blue-600 text-white'
                  : index === currentStep - 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              <div className="font-medium">{step.title.split(' ')[0]}</div>
              <div className="truncate">{step.title.split(' ').slice(1).join(' ')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HierarchicalMemoryFlow;