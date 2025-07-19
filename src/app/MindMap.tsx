import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  Background,
  Controls,
  MiniMap,
  Position,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface Technique {
  id: string;
  name: string;
  abbr?: string;
  icon: string;
  category: string;
  complexity: string;
  description: string;
  useCases: string[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface UseCase {
  id: string;
  name: string;
  description: string;
}

// Custom Node Components
const HubNode = ({ data }: { data: { label: string } }) => (
  <div className="px-6 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-4 border-blue-300 shadow-lg">
    <div className="text-white font-bold text-center text-sm whitespace-nowrap">
      {data.label}
    </div>
  </div>
);

const CategoryNode = ({ data }: { data: { label: string; icon: string; expanded: boolean; onClick: () => void } }) => (
  <div 
    className={`px-4 py-3 rounded-lg border-2 cursor-pointer transition-all shadow-md ${
      data.expanded 
        ? 'bg-green-600 border-green-400 text-white' 
        : 'bg-gray-700 border-gray-500 text-gray-200 hover:border-gray-400'
    }`}
    onClick={data.onClick}
  >
    <div className="flex items-center gap-2">
      <span className="text-lg">{data.icon}</span>
      <span className="font-medium text-sm">{data.label}</span>
      <span className="text-xs ml-2">{data.expanded ? '−' : '+'}</span>
    </div>
  </div>
);

const TechniqueNode = ({ data }: { data: { label: string; icon: string; complexity: string; onClick: () => void } }) => {
  const complexityColors = {
    'low': 'bg-green-500 border-green-400',
    'medium': 'bg-yellow-500 border-yellow-400', 
    'high': 'bg-red-500 border-red-400',
    'very-high': 'bg-purple-500 border-purple-400'
  };

  return (
    <div 
      className={`px-3 py-2 rounded-full border-2 cursor-pointer transition-all shadow-sm ${
        complexityColors[data.complexity as keyof typeof complexityColors] || 'bg-gray-500 border-gray-400'
      } text-white hover:scale-105`}
      onClick={data.onClick}
    >
      <div className="flex items-center gap-1">
        <span className="text-sm">{data.icon}</span>
        <span className="font-medium text-xs">{data.label}</span>
      </div>
    </div>
  );
};

const UseCaseNode = ({ data }: { data: { label: string } }) => (
  <div className="px-2 py-1 rounded-md bg-pink-600 border border-pink-400 text-white shadow-sm">
    <div className="text-xs font-medium text-center">{data.label}</div>
  </div>
);

const nodeTypes = {
  hub: HubNode,
  category: CategoryNode,
  technique: TechniqueNode,
  usecase: UseCaseNode,
};

export const MindMap = ({ 
  techniques, 
  categories, 
  useCases, 
  onTechniqueSelect
}: {
  techniques: Technique[];
  categories: Category[];
  useCases: UseCase[];
  onTechniqueSelect: (technique: Technique) => void;
}) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set(['all']));
  const [showRelationships, setShowRelationships] = useState(true);

  const toggleCategoryExpansion = useCallback((categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  }, []);

  const { nodes, edges } = useMemo(() => {
    const nodeList: Node[] = [];
    const edgeList: Edge[] = [];

    // Central hub
    nodeList.push({
      id: 'hub',
      type: 'hub',
      position: { x: 400, y: 300 },
      data: { label: 'AI Reasoning Patterns' },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    });

    // Add a test edge to ensure edges work
    nodeList.push({
      id: 'test-node',
      type: 'category',
      position: { x: 600, y: 300 },
      data: { label: 'Test', icon: '🔧', expanded: false, onClick: () => {} },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    });

    edgeList.push({
      id: 'test-edge',
      source: 'hub',
      target: 'test-node',
      type: 'smoothstep',
      style: { stroke: '#FF0000', strokeWidth: 5, opacity: 1 },
      animated: false,
    });

    // Categories positioned in a circle around the hub
    const categoryAngleStep = (2 * Math.PI) / (categories.length - 1);
    const categoryRadius = 200;

    categories.slice(1).forEach((category, index) => {
      const angle = index * categoryAngleStep;
      const x = 400 + categoryRadius * Math.cos(angle);
      const y = 300 + categoryRadius * Math.sin(angle);
      const isExpanded = expandedCategories.has(category.id);

      nodeList.push({
        id: `category-${category.id}`,
        type: 'category',
        position: { x, y },
        data: { 
          label: category.name,
          icon: category.icon,
          expanded: isExpanded,
          onClick: () => toggleCategoryExpansion(category.id)
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });

      // Connect to hub
      edgeList.push({
        id: `hub-${category.id}`,
        source: 'hub',
        target: `category-${category.id}`,
        type: 'smoothstep',
        style: { 
          stroke: '#3B82F6', 
          strokeWidth: 4,
          opacity: 1
        },
        animated: false,
      });

      // Add techniques if category is expanded
      if (isExpanded) {
        const categoryTechniques = techniques.filter(t => t.category === category.id);
        const techniqueAngleStep = Math.PI / Math.max(categoryTechniques.length + 1, 2);
        const techniqueRadius = 120;

        categoryTechniques.forEach((technique, techIndex) => {
          const techAngle = angle + (techIndex - categoryTechniques.length / 2) * techniqueAngleStep * 0.5;
          const techX = x + techniqueRadius * Math.cos(techAngle);
          const techY = y + techniqueRadius * Math.sin(techAngle);

          nodeList.push({
            id: `technique-${technique.id}`,
            type: 'technique',
            position: { x: techX, y: techY },
            data: { 
              label: technique.abbr || technique.name.split(' ')[0],
              icon: technique.icon,
              complexity: technique.complexity,
              onClick: () => onTechniqueSelect(technique)
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
          });

          // Connect to category
          edgeList.push({
            id: `category-${category.id}-technique-${technique.id}`,
            source: `category-${category.id}`,
            target: `technique-${technique.id}`,
            type: 'smoothstep',
            style: { 
              stroke: '#6B7280', 
              strokeWidth: 3,
              opacity: 0.8
            },
            animated: false,
          });
        });
      }
    });

    // Add technique-to-technique connections based on shared use cases
    const visibleTechniques = techniques.filter(t => expandedCategories.has(t.category));
    
    if (showRelationships) {
      // Create technique-to-technique relationships
      visibleTechniques.forEach(technique1 => {
        visibleTechniques.forEach(technique2 => {
          if (technique1.id !== technique2.id && technique1.id < technique2.id) { // Avoid duplicates
            const sharedUseCases = technique1.useCases.filter(uc => technique2.useCases.includes(uc));
            
            if (sharedUseCases.length >= 2) { // Strong relationship
              edgeList.push({
                id: `technique-relation-${technique1.id}-${technique2.id}`,
                source: `technique-${technique1.id}`,
                target: `technique-${technique2.id}`,
                type: 'smoothstep',
                style: { 
                  stroke: '#10B981', 
                  strokeWidth: 3,
                  opacity: 0.8
                },
                animated: false,
                label: `${sharedUseCases.length} shared`,
              });
            } else if (sharedUseCases.length === 1) { // Weak relationship
              edgeList.push({
                id: `technique-weak-${technique1.id}-${technique2.id}`,
                source: `technique-${technique1.id}`,
                target: `technique-${technique2.id}`,
                type: 'straight',
                style: { 
                  stroke: '#9CA3AF', 
                  strokeWidth: 2,
                  strokeDasharray: '5,5',
                  opacity: 0.6
                },
                animated: false,
              });
            }
          }
        });
      });
    }

    // Add use case connections for visible techniques
    const commonUseCases = useCases.slice(0, 6); // Show more use cases

    commonUseCases.forEach((useCase, index) => {
      const relatedTechniques = visibleTechniques.filter(t => t.useCases.includes(useCase.id));
      
      if (relatedTechniques.length >= 2) {
        // Position use case nodes around the outer edge
        const useCaseAngle = (index / commonUseCases.length) * 2 * Math.PI;
        const useCaseRadius = 380;
        const useCaseX = 400 + useCaseRadius * Math.cos(useCaseAngle);
        const useCaseY = 300 + useCaseRadius * Math.sin(useCaseAngle);

        nodeList.push({
          id: `usecase-${useCase.id}`,
          type: 'usecase',
          position: { x: useCaseX, y: useCaseY },
          data: { label: useCase.name.split(' ').slice(0, 2).join(' ') }, // Show more text
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        });

        // Connect techniques to use case with curved edges
        relatedTechniques.forEach(technique => {
          edgeList.push({
            id: `technique-${technique.id}-usecase-${useCase.id}`,
            source: `technique-${technique.id}`,
            target: `usecase-${useCase.id}`,
            type: 'smoothstep',
            style: { 
              stroke: '#BE185D', 
              strokeWidth: 2, 
              strokeDasharray: '5,5',
              opacity: 0.7 
            },
            animated: false,
          });
        });
      }
    });

    // Add category relationships based on technique overlap
    const expandedCats = categories.slice(1).filter(cat => expandedCategories.has(cat.id));
    expandedCats.forEach(cat1 => {
      expandedCats.forEach(cat2 => {
        if (cat1.id !== cat2.id && cat1.id < cat2.id) {
          const cat1Techniques = techniques.filter(t => t.category === cat1.id);
          const cat2Techniques = techniques.filter(t => t.category === cat2.id);
          
          // Check for shared use cases between categories
          const cat1UseCases = new Set(cat1Techniques.flatMap(t => t.useCases));
          const cat2UseCases = new Set(cat2Techniques.flatMap(t => t.useCases));
          const sharedUseCases = [...cat1UseCases].filter(uc => cat2UseCases.has(uc));
          
          if (sharedUseCases.length >= 2) {
            edgeList.push({
              id: `category-relation-${cat1.id}-${cat2.id}`,
              source: `category-${cat1.id}`,
              target: `category-${cat2.id}`,
              type: 'smoothstep',
              style: { 
                stroke: '#8B5CF6', 
                strokeWidth: 3,
                opacity: 0.6,
                strokeDasharray: '8,4'
              },
              animated: false,
            });
          }
        }
      });
    });

    console.log('Mind Map Data:', { nodeCount: nodeList.length, edgeCount: edgeList.length, edges: edgeList });
    return { nodes: nodeList, edges: edgeList };
  }, [categories, techniques, useCases, expandedCategories, showRelationships, onTechniqueSelect, toggleCategoryExpansion]);

  const [rfNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  // Update nodes when dependencies change
  React.useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleExpandAll = useCallback(() => {
    const allCategoryIds = categories.slice(1).map(c => c.id);
    setExpandedCategories(new Set(allCategoryIds));
  }, [categories]);

  const handleCollapseAll = useCallback(() => {
    setExpandedCategories(new Set());
  }, []);

  return (
    <div className="flex h-full">
      {/* Controls Panel */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 p-6 overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-6">Mind Map Controls</h3>
        
        {/* Expansion Controls */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">Category Expansion</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleExpandAll}
              className="p-2 bg-green-600 hover:bg-green-700 rounded text-xs text-white transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={handleCollapseAll}
              className="p-2 bg-gray-600 hover:bg-gray-700 rounded text-xs text-white transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Relationship Controls */}
        <div className="mb-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={showRelationships}
              onChange={(e) => setShowRelationships(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-300 font-medium">Show Relationships</span>
          </label>
          <p className="text-xs text-gray-400 mt-1">Toggle technique and category connections</p>
          <div className="mt-2 text-xs text-blue-400">
            Nodes: {rfNodes.length} | Edges: {rfEdges.length}
          </div>
        </div>

        {/* Category Controls */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">Categories</label>
          <div className="space-y-2">
            {categories.slice(1).map(category => (
              <button
                key={category.id}
                onClick={() => toggleCategoryExpansion(category.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  expandedCategories.has(category.id)
                    ? 'bg-green-600 border-green-500 text-white'
                    : 'bg-gray-700 border-gray-600 hover:border-gray-500 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <span className="text-xs">
                    {expandedCategories.has(category.id) ? '−' : '+'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 mb-4">
          <h4 className="text-sm font-semibold text-white mb-2">How to Use</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Click categories to expand/collapse</li>
            <li>• Click techniques to view details</li>
            <li>• Pink nodes are use cases</li>
            <li>• Green lines show strong technique relationships</li>
            <li>• Gray dashed lines show weak relationships</li>
            <li>• Purple lines connect related categories</li>
            <li>• Use mouse wheel to zoom</li>
            <li>• Drag to pan around</li>
          </ul>
        </div>

        {/* Legend */}
        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
          <h4 className="text-sm font-semibold text-white mb-3">Legend</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              <span className="text-gray-300">Central Hub</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
              <span className="text-gray-300">Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Low complexity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-300">Med complexity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">High complexity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-600 rounded"></div>
              <span className="text-gray-300">Use Cases</span>
            </div>
            <hr className="border-gray-600 my-2" />
            <div className="text-gray-400 font-medium mb-1">Relationships:</div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-blue-500"></div>
              <span className="text-gray-300">Hub connections</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-green-500"></div>
              <span className="text-gray-300">Strong technique links</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-gray-500 border-dashed border-t"></div>
              <span className="text-gray-300">Weak technique links</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-purple-500 border-dashed border-t"></div>
              <span className="text-gray-300">Category relationships</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-pink-600 border-dashed border-t"></div>
              <span className="text-gray-300">Use case connections</span>
            </div>
          </div>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 bg-gray-900">
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          defaultEdgeOptions={{
            style: { strokeWidth: 2, stroke: '#ffffff' },
            type: 'smoothstep',
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#374151" />
          <Controls className="bg-gray-800 border border-gray-600" />
          <MiniMap 
            className="bg-gray-800 border border-gray-600"
            nodeColor="#4B5563"
            maskColor="rgba(0, 0, 0, 0.2)"
          />
        </ReactFlow>
      </div>
    </div>
  );
};