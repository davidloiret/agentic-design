"use client"

import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  NodeTypes,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Download, Save, Code, Play, Settings } from 'lucide-react';

interface SystemBuilderProps {
  techniques: any[];
  categories: any[];
  useCases: any[];
}

// Custom node components
const PatternNode = ({ data, selected }: any) => {
  return (
    <div className={`px-4 py-2 shadow-lg rounded-lg border-2 min-w-[150px] ${
      selected 
        ? 'border-blue-400 bg-blue-900/50' 
        : 'border-gray-600 bg-gray-800'
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex items-center gap-2">
        <span className="text-lg">{data.icon}</span>
        <div>
          <div className="font-semibold text-white text-sm">{data.label}</div>
          <div className="text-xs text-gray-400">{data.type}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

const DataNode = ({ data, selected }: any) => {
  return (
    <div className={`px-3 py-2 shadow-lg rounded border-2 min-w-[120px] ${
      selected 
        ? 'border-green-400 bg-green-900/50' 
        : 'border-gray-600 bg-gray-700'
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="text-center">
        <div className="font-medium text-white text-sm">{data.label}</div>
        <div className="text-xs text-gray-400">{data.dataType}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

const EvaluationNode = ({ data, selected }: any) => {
  return (
    <div className={`px-3 py-2 shadow-lg rounded border-2 min-w-[140px] ${
      selected 
        ? 'border-orange-400 bg-orange-900/50' 
        : 'border-gray-600 bg-gray-700'
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="text-center">
        <div className="font-medium text-white text-sm">{data.label}</div>
        <div className="text-xs text-gray-400">Evaluation</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

const nodeTypes: NodeTypes = {
  pattern: PatternNode,
  data: DataNode,
  evaluation: EvaluationNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'data',
    position: { x: 100, y: 100 },
    data: { label: 'Input Data', dataType: 'JSON' },
  },
];

const initialEdges: Edge[] = [];

export const SystemBuilder = ({ techniques, categories, useCases }: SystemBuilderProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedPattern, setSelectedPattern] = useState('');
  const [showBAMLOutput, setShowBAMLOutput] = useState(false);
  const [systemName, setSystemName] = useState('MySystem');

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Add pattern node to the flow
  const addPatternNode = useCallback((patternId: string) => {
    const pattern = techniques.find(t => t.id === patternId);
    if (!pattern) return;

    const newNode: Node = {
      id: `pattern-${Date.now()}`,
      type: 'pattern',
      position: { x: Math.random() * 400 + 200, y: Math.random() * 300 + 200 },
      data: { 
        label: pattern.name,
        icon: pattern.icon,
        type: 'Pattern',
        patternId: pattern.id,
        description: pattern.description
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [techniques, setNodes]);

  // Add evaluation node
  const addEvaluationNode = useCallback(() => {
    const newNode: Node = {
      id: `eval-${Date.now()}`,
      type: 'evaluation',
      position: { x: Math.random() * 400 + 200, y: Math.random() * 300 + 400 },
      data: { 
        label: 'Quality Check',
        type: 'Evaluation'
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  // Generate BAML schema
  const generateBAMLSchema = useMemo(() => {
    const patternNodes = nodes.filter(n => n.type === 'pattern');
    const dataNodes = nodes.filter(n => n.type === 'data');
    const evalNodes = nodes.filter(n => n.type === 'evaluation');

    let schema = `// BAML Schema for ${systemName}\n\n`;

    // Define classes for each pattern
    patternNodes.forEach(node => {
      const pattern = techniques.find(t => t.id === node.data.patternId);
      schema += `class ${node.data.label.replace(/[^a-zA-Z0-9]/g, '')} {\n`;
      schema += `  name "${node.data.label}"\n`;
      schema += `  description "${node.data.description || ''}"\n`;
      if (pattern) {
        schema += `  complexity "${pattern.complexity}"\n`;
        schema += `  category "${pattern.category}"\n`;
        schema += `  features ${JSON.stringify(pattern.features || [])}\n`;
      }
      schema += `}\n\n`;
    });

    // Define data inputs
    dataNodes.forEach(node => {
      schema += `input ${node.data.label.replace(/[^a-zA-Z0-9]/g, '')} {\n`;
      schema += `  type "${node.data.dataType || 'string'}"\n`;
      schema += `  required true\n`;
      schema += `}\n\n`;
    });

    // Define evaluation criteria
    evalNodes.forEach(node => {
      schema += `evaluation ${node.data.label.replace(/[^a-zA-Z0-9]/g, '')} {\n`;
      schema += `  metrics ["accuracy", "latency", "cost"]\n`;
      schema += `  threshold 0.8\n`;
      schema += `}\n\n`;
    });

    // Define the system flow
    schema += `system ${systemName.replace(/[^a-zA-Z0-9]/g, '')} {\n`;
    schema += `  patterns [\n`;
    patternNodes.forEach(node => {
      schema += `    ${node.data.label.replace(/[^a-zA-Z0-9]/g, '')},\n`;
    });
    schema += `  ]\n`;
    schema += `  
  workflow {
    // Define the execution flow based on node connections
    ${edges.map(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      return `    ${sourceNode?.data.label.replace(/[^a-zA-Z0-9]/g, '')} -> ${targetNode?.data.label.replace(/[^a-zA-Z0-9]/g, '')}`;
    }).join('\n    ')}
  }
}\n`;

    return schema;
  }, [nodes, edges, techniques, systemName]);

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-900 border-r border-gray-700 p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4">System Builder</h2>
          <input
            type="text"
            value={systemName}
            onChange={(e) => setSystemName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
            placeholder="System Name"
          />
        </div>

        {/* Pattern Library */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">AI Patterns</h3>
          <div className="space-y-2">
            {techniques.slice(0, 8).map((technique) => (
              <button
                key={technique.id}
                onClick={() => addPatternNode(technique.id)}
                className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>{technique.icon}</span>
                  <div>
                    <div className="text-white text-sm font-medium">{technique.name}</div>
                    <div className="text-gray-400 text-xs">{technique.complexity} complexity</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Components</h3>
          <div className="space-y-2">
            <button
              onClick={addEvaluationNode}
              className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>📊</span>
                <div>
                  <div className="text-white text-sm font-medium">Add Evaluation</div>
                  <div className="text-gray-400 text-xs">Quality metrics</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={() => setShowBAMLOutput(!showBAMLOutput)}
            className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
          >
            <Code className="w-4 h-4" />
            {showBAMLOutput ? 'Hide' : 'Show'} BAML Schema
          </button>
        </div>
      </div>

      {/* Main Flow Area */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          className="bg-gray-950"
        >
          <Controls className="bg-gray-800 border-gray-600" />
          <MiniMap 
            className="bg-gray-800 border border-gray-600" 
            nodeColor="#374151"
            maskColor="rgba(0, 0, 0, 0.2)"
          />
          <Background color="#374151" gap={16} />
        </ReactFlow>

        {/* BAML Schema Output */}
        {showBAMLOutput && (
          <div className="absolute top-4 right-4 w-96 h-96 bg-gray-900 border border-gray-600 rounded-lg overflow-hidden">
            <div className="p-3 border-b border-gray-600 flex items-center justify-between">
              <h3 className="text-white font-medium">BAML Schema</h3>
              <button
                onClick={() => setShowBAMLOutput(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <pre className="p-3 text-xs text-gray-300 overflow-auto h-full bg-gray-950">
              {generateBAMLSchema}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};