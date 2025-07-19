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
  Handle,
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
const HubNode = ({ data }: { data: { label: string; categorySides?: number[] } }) => (
  <>
    {/* Dynamic handles with explicit IDs based on which sides have categories */}
    {data.categorySides?.includes(0) && <Handle id="right" type="source" position={Position.Right} style={{ background: '#3B82F6' }} />}
    {data.categorySides?.includes(1) && <Handle id="bottom" type="source" position={Position.Bottom} style={{ background: '#3B82F6' }} />}
    {data.categorySides?.includes(2) && <Handle id="left" type="source" position={Position.Left} style={{ background: '#3B82F6' }} />}
    {data.categorySides?.includes(3) && <Handle id="top" type="source" position={Position.Top} style={{ background: '#3B82F6' }} />}
    <div className="px-6 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-4 border-blue-300 shadow-lg">
      <div className="text-white font-bold text-center text-sm whitespace-nowrap">
        {data.label}
      </div>
    </div>
  </>
);

const CategoryNode = ({ data }: { data: { label: string; icon: string; expanded: boolean; onClick: () => void; side?: number } }) => {
  // Determine target handle position based on side (where hub connects from)
  const getTargetPosition = () => {
    switch (data.side) {
      case 0: return Position.Left;   // Right side - target on left (hub is to the left)
      case 1: return Position.Top;    // Bottom side - target on top (hub is above)
      case 2: return Position.Right;  // Left side - target on right (hub is to the right)
      case 3: return Position.Bottom; // Top side - target on bottom (hub is below)
      default: return Position.Left;
    }
  };

  // Determine source handle position based on side (where techniques connect to)
  const getSourcePosition = () => {
    switch (data.side) {
      case 0: return Position.Right;  // Right side - source on right
      case 1: return Position.Bottom; // Bottom side - source on bottom
      case 2: return Position.Left;   // Left side - source on left
      case 3: return Position.Top;    // Top side - source on top
      default: return Position.Right;
    }
  };

  return (
    <>
      <Handle type="target" position={getTargetPosition()} style={{ background: '#6B7280' }} />
      <Handle type="source" position={getSourcePosition()} style={{ background: '#6B7280' }} />
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
    </>
  );
};

const TechniqueNode = ({ data }: { data: { label: string; icon: string; complexity: string; onClick: () => void; side?: number } }) => {
  const complexityColors = {
    'low': 'bg-green-500 border-green-400',
    'medium': 'bg-yellow-500 border-yellow-400', 
    'high': 'bg-red-500 border-red-400',
    'very-high': 'bg-purple-500 border-purple-400'
  };

  // Determine target handle position based on side
  const getTargetPosition = () => {
    switch (data.side) {
      case 0: return Position.Left;   // Right side - target on left
      case 1: return Position.Top;    // Bottom side - target on top
      case 2: return Position.Right;  // Left side - target on right
      case 3: return Position.Bottom; // Top side - target on bottom
      default: return Position.Left;
    }
  };

  return (
    <>
      <Handle type="target" position={getTargetPosition()} style={{ background: '#9CA3AF' }} />
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
    </>
  );
};

const UseCaseNode = ({ data }: { data: { label: string } }) => (
  <>
    <Handle type="target" position={Position.Left} style={{ background: '#BE185D' }} />
    <Handle type="target" position={Position.Right} style={{ background: '#BE185D' }} />
    <Handle type="target" position={Position.Top} style={{ background: '#BE185D' }} />
    <Handle type="target" position={Position.Bottom} style={{ background: '#BE185D' }} />
    <div className="px-2 py-1 rounded-md bg-pink-600 border border-pink-400 text-white shadow-sm">
      <div className="text-xs font-medium text-center">{data.label}</div>
    </div>
  </>
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

    // Collision detection utilities for XMind layout
    const getNodeDimensions = (type: string) => {
      const dimensions = {
        hub: { width: 220, height: 80 },
        category: { width: 200, height: 60 },
        technique: { width: 140, height: 50 },
        usecase: { width: 120, height: 40 }
      };
      return dimensions[type as keyof typeof dimensions] || { width: 140, height: 50 };
    };

    const getNodeBounds = (x: number, y: number, type: string) => {
      const { width, height } = getNodeDimensions(type);
      return {
        left: x - width / 2 - 20, // Add 20px margin
        right: x + width / 2 + 20,
        top: y - height / 2 - 20,
        bottom: y + height / 2 + 20,
        width: width + 40,
        height: height + 40
      };
    };

    const checkCollision = (bounds1: any, bounds2: any) => {
      return !(bounds1.right < bounds2.left || 
               bounds1.left > bounds2.right || 
               bounds1.bottom < bounds2.top || 
               bounds1.top > bounds2.bottom);
    };

    const findNonCollidingPosition = (idealX: number, idealY: number, type: string, placedNodes: any[], side: number, categoryId?: string) => {
      let bestX = idealX;
      let bestY = idealY;
      let attempt = 0;
      const maxAttempts = 15;

      // Define stricter group boundaries to prevent cross-contamination
      const groupBoundaries = {
        0: { minX: hubX + 300, maxX: hubX + 1400, minY: hubY - 600, maxY: hubY + 600 }, // Right side - more restricted
        1: { minX: hubX - 600, maxX: hubX + 600, minY: hubY + 300, maxY: hubY + 1200 }, // Bottom side  
        2: { minX: hubX - 1400, maxX: hubX - 300, minY: hubY - 600, maxY: hubY + 600 }, // Left side - more restricted
        3: { minX: hubX - 600, maxX: hubX + 600, minY: hubY - 1200, maxY: hubY - 300 }  // Top side
      };

      while (attempt < maxAttempts) {
        const bounds = getNodeBounds(bestX, bestY, type);
        let hasCollision = false;

        // Check for collisions with all nodes to prevent overlaps
        for (const node of placedNodes) {
          const existingBounds = getNodeBounds(node.x, node.y, node.type);
          
          // For techniques from different categories, add extra spacing
          if (type === 'technique' && node.type === 'technique' && 
              node.categoryId !== categoryId && categoryId) {
            // Expand bounds for cross-category collision detection
            existingBounds.left -= 40;
            existingBounds.right += 40;
            existingBounds.top -= 40;
            existingBounds.bottom += 40;
          }
          
          if (checkCollision(bounds, existingBounds)) {
            hasCollision = true;
            break;
          }
        }

        // Check if position is within group boundaries
        const boundary = groupBoundaries[side as keyof typeof groupBoundaries];
        const withinBounds = bestX >= boundary.minX && bestX <= boundary.maxX && 
                           bestY >= boundary.minY && bestY <= boundary.maxY;

        if (!hasCollision && withinBounds) {
          return { x: bestX, y: bestY };
        }

        // Adjust position within group boundaries with strict separation
        attempt++;
        const offset = attempt * 40; // Larger increments to avoid cross-contamination
        
        switch (side) {
          case 0: // Right side - stay strictly within right zone
            if (attempt % 2 === 0) {
              bestX = Math.min(idealX + offset, boundary.maxX - 100);
              bestX = Math.max(bestX, boundary.minX + 50); // Ensure minimum distance from center
            } else {
              bestY = idealY + (attempt % 4 < 2 ? offset : -offset);
            }
            break;
          case 1: // Bottom side - stay strictly within bottom zone
            if (attempt % 2 === 0) {
              bestY = Math.min(idealY + offset, boundary.maxY - 100);
              bestY = Math.max(bestY, boundary.minY + 50);
            } else {
              bestX = idealX + (attempt % 4 < 2 ? offset : -offset);
            }
            break;
          case 2: // Left side - stay strictly within left zone
            if (attempt % 2 === 0) {
              bestX = Math.max(idealX - offset, boundary.minX + 100);
              bestX = Math.min(bestX, boundary.maxX - 50); // Ensure maximum distance from center
            } else {
              bestY = idealY + (attempt % 4 < 2 ? offset : -offset);
            }
            break;
          case 3: // Top side - stay strictly within top zone
            if (attempt % 2 === 0) {
              bestY = Math.max(idealY - offset, boundary.minY + 100);
              bestY = Math.min(bestY, boundary.maxY - 50);
            } else {
              bestX = idealX + (attempt % 4 < 2 ? offset : -offset);
            }
            break;
        }

        // Ensure we stay within boundaries
        bestX = Math.max(boundary.minX + 50, Math.min(bestX, boundary.maxX - 50));
        bestY = Math.max(boundary.minY + 50, Math.min(bestY, boundary.maxY - 50));
      }

      return { x: bestX, y: bestY };
    };

    // Track placed nodes for collision detection
    const placedNodes: Array<{x: number, y: number, type: string, categoryId?: string}> = [];

    // Central hub
    const hubX = 600;
    const hubY = 400;
    placedNodes.push({ x: hubX, y: hubY, type: 'hub' });
    
    // Calculate which sides have categories for dynamic hub handles
    const availableCategories = categories.slice(1);
    const branchCount = availableCategories.length;
    const categoriesPerSide = Math.ceil(branchCount / 4);
    const usedSides = new Set<number>();
    
    availableCategories.forEach((_, index) => {
      const side = Math.floor(index / categoriesPerSide);
      usedSides.add(side);
    });
    
    nodeList.push({
      id: 'hub',
      type: 'hub',
      position: { x: hubX, y: hubY },
      data: { 
        label: 'AI Reasoning Patterns',
        categorySides: Array.from(usedSides)
      },
    });

    // Perfect XMind cardinal layout with even distribution
    
    // Ultra-generous XMind spacing to prevent all overlaps
    const branchDistance = 550; // Distance from hub to categories (was 450)
    const categorySpacing = 300; // Spacing between categories on same side (was 200)
    
    availableCategories.forEach((category, index) => {
      const isExpanded = expandedCategories.has(category.id);
      
      // Determine which side this category belongs to
      const side = Math.floor(index / categoriesPerSide);
      const positionOnSide = index % categoriesPerSide;
      
      // Calculate offset from center for categories on the same side
      const offset = (positionOnSide - (categoriesPerSide - 1) / 2) * categorySpacing;
      
      let categoryX, categoryY;
      
      switch (side) {
        case 0: // Right side - all categories at same X, varying Y
          categoryX = hubX + branchDistance;
          categoryY = hubY + offset;
          break;
        case 1: // Bottom side - all categories at same Y, varying X  
          categoryX = hubX + offset;
          categoryY = hubY + branchDistance;
          break;
        case 2: // Left side - all categories at same X, varying Y
          categoryX = hubX - branchDistance;
          categoryY = hubY + offset;
          break;
        case 3: // Top side - all categories at same Y, varying X
        default:
          categoryX = hubX + offset;
          categoryY = hubY - branchDistance;
          break;
      }

      // Use collision detection for category placement
      const categoryPosition = findNonCollidingPosition(categoryX, categoryY, 'category', placedNodes, side, category.id);
      placedNodes.push({ x: categoryPosition.x, y: categoryPosition.y, type: 'category', categoryId: category.id });

      nodeList.push({
        id: `category-${category.id}`,
        type: 'category',
        position: { x: categoryPosition.x, y: categoryPosition.y },
        data: { 
          label: category.name,
          icon: category.icon,
          expanded: isExpanded,
          onClick: () => toggleCategoryExpansion(category.id),
          side: side // Pass side info for handle positioning
        },
      });

      // Connect to hub with clean straight lines using correct source handles
      const sourceHandleId = side === 0 ? 'right' : side === 1 ? 'bottom' : side === 2 ? 'left' : 'top';
      
      edgeList.push({
        id: `hub-${category.id}`,
        source: 'hub',
        sourceHandle: sourceHandleId,
        target: `category-${category.id}`,
        type: 'straight', // Clean straight lines for XMind appearance
        style: { 
          stroke: '#4A90E2', 
          strokeWidth: 3,
          opacity: 1
        },
        animated: false,
      });

      // Add techniques as clean rectangular sub-groups if category is expanded
      if (isExpanded) {
        const categoryTechniques = techniques.filter(t => t.category === category.id);
        
        // Ultra-generous XMind sub-branch spacing to eliminate overlaps
        const subBranchDistance = 450; // Distance from category to techniques (was 350)
        const techniqueSpacing = 150; // Spacing between techniques (was 100)
        
        categoryTechniques.forEach((technique, techIndex) => {
          const techniqueCount = categoryTechniques.length;
          let techniqueX, techniqueY;
          
          // Use side-based logic for XMind-style alignment
          switch (side) {
            case 0: // Right side - align left edge, techniques extend right
              techniqueX = categoryPosition.x + subBranchDistance;
              techniqueY = categoryPosition.y + (techIndex - (techniqueCount - 1) / 2) * techniqueSpacing;
              break;
              
            case 1: // Bottom side - align top edge, techniques extend down
              techniqueX = categoryPosition.x + (techIndex - (techniqueCount - 1) / 2) * techniqueSpacing;
              techniqueY = categoryPosition.y + subBranchDistance;
              break;
              
            case 2: // Left side - align right edge, techniques extend left
              techniqueX = categoryPosition.x - subBranchDistance;
              techniqueY = categoryPosition.y + (techIndex - (techniqueCount - 1) / 2) * techniqueSpacing;
              break;
              
            case 3: // Top side - align bottom edge, techniques extend up
            default:
              techniqueX = categoryPosition.x + (techIndex - (techniqueCount - 1) / 2) * techniqueSpacing;
              techniqueY = categoryPosition.y - subBranchDistance;
              break;
          }

          // Use collision detection for technique placement
          const techniquePosition = findNonCollidingPosition(techniqueX, techniqueY, 'technique', placedNodes, side, category.id);
          placedNodes.push({ x: techniquePosition.x, y: techniquePosition.y, type: 'technique', categoryId: category.id });

          nodeList.push({
            id: `technique-${technique.id}`,
            type: 'technique',
            position: { x: techniquePosition.x, y: techniquePosition.y },
            data: { 
              label: technique.abbr || technique.name.split(' ').slice(0, 2).join(' '),
              icon: technique.icon,
              complexity: technique.complexity,
              onClick: () => onTechniqueSelect(technique),
              side: side // Pass side info for handle positioning
            },
          });

          // Connect to category with clean straight lines
          edgeList.push({
            id: `category-${category.id}-technique-${technique.id}`,
            source: `category-${category.id}`,
            target: `technique-${technique.id}`,
            type: 'straight', // Clean straight lines for sub-branches
            style: { 
              stroke: '#7B8794', 
              strokeWidth: 2,
              opacity: 0.8
            },
            animated: false,
          });
        });
      }
    });

    // Disable relationship connections to keep clean XMind appearance
    // (Can be re-enabled by setting showRelationships, but disabled by default for cleaner layout)

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
          fitViewOptions={{ padding: 0.4, minZoom: 0.2, maxZoom: 1.0 }}
          defaultEdgeOptions={{
            style: { strokeWidth: 2, stroke: '#6B7280' },
            type: 'straight',
          }}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          selectNodesOnDrag={false}
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