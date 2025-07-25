import React, { useState, useEffect } from 'react';

interface ThoughtNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  active: boolean;
  type: 'initial' | 'synergy' | 'feedback' | 'solution';
}

interface ThoughtEdge {
  from: string;
  to: string;
  label: string;
  active: boolean;
}

export const GraphOfThoughtDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [nodes, setNodes] = useState<ThoughtNode[]>([]);
  const [edges, setEdges] = useState<ThoughtEdge[]>([]);

  const initialNodes: ThoughtNode[] = [
    { id: 'energy', label: 'Energy Systems', x: 150, y: 100, color: '#F59E0B', active: false, type: 'initial' },
    { id: 'transport', label: 'Transportation', x: 150, y: 200, color: '#3B82F6', active: false, type: 'initial' },
    { id: 'housing', label: 'Housing Policy', x: 300, y: 100, color: '#10B981', active: false, type: 'initial' },
    { id: 'economic', label: 'Economic Zones', x: 300, y: 200, color: '#8B5CF6', active: false, type: 'initial' },
  ];

  const synergyNodes: ThoughtNode[] = [
    { id: 'synergy1', label: 'Solar + Transit', x: 225, y: 50, color: '#F59E0B', active: false, type: 'synergy' },
    { id: 'synergy2', label: 'Green + Water', x: 375, y: 50, color: '#10B981', active: false, type: 'synergy' },
    { id: 'synergy3', label: 'Mixed-Use Dev', x: 300, y: 250, color: '#8B5CF6', active: false, type: 'synergy' },
  ];

  const feedbackNode: ThoughtNode = {
    id: 'feedback', label: 'Feedback Loop', x: 225, y: 150, color: '#DC2626', active: false, type: 'feedback'
  };

  const solutionNode: ThoughtNode = {
    id: 'solution', label: 'Eco-Districts Solution', x: 450, y: 150, color: '#059669', active: false, type: 'solution'
  };

  const allEdges: ThoughtEdge[] = [
    { from: 'energy', to: 'transport', label: 'influences', active: false },
    { from: 'energy', to: 'housing', label: 'affects', active: false },
    { from: 'transport', to: 'housing', label: 'connects', active: false },
    { from: 'housing', to: 'economic', label: 'enables', active: false },
    { from: 'economic', to: 'energy', label: 'funds', active: false },
    { from: 'energy', to: 'synergy1', label: 'combines', active: false },
    { from: 'transport', to: 'synergy1', label: 'with', active: false },
    { from: 'housing', to: 'synergy2', label: 'integrates', active: false },
    { from: 'synergy2', to: 'synergy3', label: 'enables', active: false },
    { from: 'feedback', to: 'synergy1', label: 'refines', active: false },
    { from: 'feedback', to: 'synergy2', label: 'optimizes', active: false },
    { from: 'feedback', to: 'synergy3', label: 'validates', active: false },
    { from: 'synergy1', to: 'solution', label: 'contributes', active: false },
    { from: 'synergy2', to: 'solution', label: 'to', active: false },
    { from: 'synergy3', to: 'solution', label: 'final', active: false },
  ];

  const steps = [
    {
      title: "Initial Thought Generation",
      description: "Generate core thought nodes for sustainable city planning",
      activeNodes: ['energy', 'transport', 'housing', 'economic'],
      activeEdges: []
    },
    {
      title: "Dependency Mapping", 
      description: "Establish connections between initial thoughts",
      activeNodes: ['energy', 'transport', 'housing', 'economic'],
      activeEdges: ['energy-transport', 'energy-housing', 'transport-housing', 'housing-economic', 'economic-energy']
    },
    {
      title: "Synergistic Expansion",
      description: "Generate new thoughts from combinations",
      activeNodes: ['energy', 'transport', 'housing', 'synergy1', 'synergy2', 'synergy3'],
      activeEdges: ['energy-synergy1', 'transport-synergy1', 'housing-synergy2', 'synergy2-synergy3']
    },
    {
      title: "Feedback Integration",
      description: "Refine through feedback loops",
      activeNodes: ['synergy1', 'synergy2', 'synergy3', 'feedback'],
      activeEdges: ['feedback-synergy1', 'feedback-synergy2', 'feedback-synergy3']
    },
    {
      title: "Solution Distillation",
      description: "Extract coherent solution from thought graph",
      activeNodes: ['synergy1', 'synergy2', 'synergy3', 'solution'],
      activeEdges: ['synergy1-solution', 'synergy2-solution', 'synergy3-solution']
    }
  ];

  useEffect(() => {
    if (isRunning && currentStep < steps.length) {
      const timer = setTimeout(() => {
        const step = steps[currentStep];
        
        // Update nodes
        setNodes(prevNodes => {
          let allNodes = [...initialNodes];
          
          if (currentStep >= 2) allNodes = [...allNodes, ...synergyNodes];
          if (currentStep >= 3) allNodes = [...allNodes, feedbackNode];
          if (currentStep >= 4) allNodes = [...allNodes, solutionNode];
          
          return allNodes.map(node => ({
            ...node,
            active: step.activeNodes.includes(node.id)
          }));
        });

        // Update edges
        setEdges(prevEdges => {
          return allEdges.map(edge => ({
            ...edge,
            active: step.activeEdges.includes(`${edge.from}-${edge.to}`)
          }));
        });

        setCurrentStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length) {
      setIsRunning(false);
    }
  }, [isRunning, currentStep]);

  const handleStart = () => {
    setCurrentStep(0);
    setNodes(initialNodes);
    setEdges([]);
    setIsRunning(true);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setNodes([]);
    setEdges([]);
    setIsRunning(false);
  };

  const currentStepInfo = currentStep > 0 ? steps[currentStep - 1] : null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Graph-of-Thought Demo
      </h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Problem:</h3>
        <p className="text-gray-700 bg-gray-100 p-3 rounded">
          Design a sustainable smart city planning strategy
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
        >
          {isRunning ? 'Running...' : 'Start GoT Process'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Reset
        </button>
      </div>

      {currentStepInfo && (
        <div className="mb-6 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
          <h4 className="font-semibold text-emerald-800 mb-1">
            Step {currentStep}: {currentStepInfo.title}
          </h4>
          <p className="text-emerald-700">{currentStepInfo.description}</p>
        </div>
      )}

      <div className="mb-6 border-2 border-gray-200 rounded-lg p-4 bg-gray-50 relative" style={{ height: '320px' }}>
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Render edges */}
          {edges.map((edge, index) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            return (
              <g key={index}>
                <line
                  x1={fromNode.x + 40}
                  y1={fromNode.y + 15}
                  x2={toNode.x + 40}
                  y2={toNode.y + 15}
                  stroke={edge.active ? '#374151' : '#D1D5DB'}
                  strokeWidth={edge.active ? 2 : 1}
                  strokeDasharray={edge.active ? '' : '3,3'}
                  className="transition-all duration-500"
                />
                {edge.active && (
                  <text
                    x={(fromNode.x + toNode.x) / 2 + 40}
                    y={(fromNode.y + toNode.y) / 2 + 10}
                    fontSize="10"
                    fill="#6B7280"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* Render nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute transition-all duration-500 ${
              node.active ? 'opacity-100 scale-110' : 'opacity-60 scale-100'
            }`}
            style={{
              left: node.x,
              top: node.y,
              backgroundColor: node.color,
              color: 'white',
              padding: '8px 12px',
              borderRadius: node.type === 'synergy' ? '20px' : node.type === 'solution' ? '25px' : '8px',
              fontSize: '12px',
              fontWeight: 'bold',
              textAlign: 'center',
              minWidth: '80px',
              boxShadow: node.active ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
              border: node.active ? '2px solid #1F2937' : '1px solid rgba(255,255,255,0.2)'
            }}
          >
            {node.label}
          </div>
        ))}
      </div>

      {currentStep === steps.length && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-green-800 mb-2">Final Solution:</h4>
          <p className="text-green-700">
            Integrated eco-districts with energy-positive buildings, autonomous transit networks, 
            and circular resource management systems.
          </p>
        </div>
      )}

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">GoT Advantages:</h4>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• Non-linear reasoning with interconnected thoughts</li>
          <li>• Synergistic idea combination and feedback loops</li>
          <li>• Superior to linear CoT for complex problems</li>
          <li>• Dynamic graph exploration and backtracking</li>
        </ul>
      </div>
    </div>
  );
}; 