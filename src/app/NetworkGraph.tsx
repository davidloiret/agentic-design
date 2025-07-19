import { useEffect, useRef, useState } from 'react';

// Network Graph Component with Cytoscape.js
export const NetworkGraph = ({ techniques, categories, useCases, onTechniqueSelect, selectedTechnique }: {
  techniques: any[];
  categories: any[];
  useCases: any[];
  onTechniqueSelect: (technique: any) => void;
  selectedTechnique: any;
}) => {
  const cyRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showConnections, setShowConnections] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [layoutName, setLayoutName] = useState('cose');
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before mounting Cytoscape
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Build graph data
  const buildGraphData = () => {
    const elements = [];
    
    // Add category nodes
    categories.slice(1).forEach(category => {
      elements.push({
        data: {
          id: `category-${category.id}`,
          label: category.name,
          type: 'category',
          icon: category.icon,
          description: category.description,
          nodeData: category
        },
        classes: ['category', `category-${category.id}`]
      });
    });

    // Add technique nodes
    techniques.forEach(technique => {
      if (selectedCategory === 'all' || technique.category === selectedCategory) {
        elements.push({
          data: {
            id: `technique-${technique.id}`,
            label: technique.abbr || technique.name.split(' ')[0],
            fullName: technique.name,
            type: 'technique',
            icon: technique.icon,
            category: technique.category,
            complexity: technique.complexity,
            description: technique.description,
            useCases: technique.useCases,
            nodeData: technique
          },
          classes: ['technique', `complexity-${technique.complexity}`, `category-${technique.category}`]
        });
      }
    });

    // Add category connections
    if (showConnections) {
      techniques.forEach(technique => {
        if (selectedCategory === 'all' || technique.category === selectedCategory) {
          elements.push({
            data: {
              id: `edge-${technique.id}-${technique.category}`,
              source: `technique-${technique.id}`,
              target: `category-${technique.category}`,
              type: 'category-connection'
            },
            classes: ['category-edge']
          });
        }
      });

      // Add technique-to-technique connections based on shared use cases
      const techniquesToShow = selectedCategory === 'all' 
        ? techniques 
        : techniques.filter(t => t.category === selectedCategory);
        
      techniquesToShow.forEach(technique => {
        techniquesToShow.forEach(otherTechnique => {
          if (technique.id !== otherTechnique.id) {
            const sharedUseCases = technique.useCases.filter(uc => otherTechnique.useCases.includes(uc));
            if (sharedUseCases.length >= 2) { // Only connect if they share 2+ use cases
              const edgeId = `technique-edge-${[technique.id, otherTechnique.id].sort().join('-')}`;
              if (!elements.find(el => el.data.id === edgeId)) {
                elements.push({
                  data: {
                    id: edgeId,
                    source: `technique-${technique.id}`,
                    target: `technique-${otherTechnique.id}`,
                    type: 'technique-connection',
                    strength: sharedUseCases.length,
                    sharedUseCases: sharedUseCases
                  },
                  classes: ['technique-edge']
                });
              }
            }
          }
        });
      });
    }

    return elements;
  };

  // Initialize Cytoscape
  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    let cy;
    const initCytoscape = async () => {
      try {
        const cytoscape = (await import('cytoscape')).default;
        cy = cytoscape({
      container: containerRef.current,
      elements: buildGraphData(),
      style: [
        // Category nodes
        {
          selector: '.category',
          style: {
            'width': 80,
            'height': 80,
            'background-color': '#3B82F6',
            'border-width': 3,
            'border-color': '#1E40AF',
            'label': 'data(label)',
            'text-valign': 'bottom',
            'text-margin-y': 10,
            'color': '#F3F4F6',
            'font-size': '12px',
            'font-weight': 'bold',
            'text-wrap': 'wrap',
            'text-max-width': '80px'
          }
        },
        {
          selector: '.category-reasoning',
          style: {
            'background-color': '#3B82F6',
            'border-color': '#1E40AF'
          }
        },
        {
          selector: '.category-safety',
          style: {
            'background-color': '#DC2626',
            'border-color': '#991B1B'
          }
        },
        {
          selector: '.category-chaining',
          style: {
            'background-color': '#059669',
            'border-color': '#047857'
          }
        },
        // Technique nodes
        {
          selector: '.technique',
          style: {
            'width': 50,
            'height': 50,
            'background-color': '#4B5563',
            'border-width': 2,
            'border-color': '#6B7280',
            'label': 'data(label)',
            'text-valign': 'bottom',
            'text-margin-y': 8,
            'color': '#D1D5DB',
            'font-size': '10px',
            'font-weight': 'normal',
            'text-wrap': 'wrap',
            'text-max-width': '60px'
          }
        },
        {
          selector: '.complexity-low',
          style: {
            'background-color': '#10B981',
            'border-color': '#059669'
          }
        },
        {
          selector: '.complexity-medium',
          style: {
            'background-color': '#F59E0B',
            'border-color': '#D97706'
          }
        },
        {
          selector: '.complexity-high',
          style: {
            'background-color': '#EF4444',
            'border-color': '#DC2626'
          }
        },
        {
          selector: '.complexity-very-high',
          style: {
            'background-color': '#7C3AED',
            'border-color': '#5B21B6'
          }
        },
        // Edges
        {
          selector: '.category-edge',
          style: {
            'width': 3,
            'line-color': '#374151',
            'target-arrow-color': '#374151',
            'target-arrow-shape': 'triangle',
            'curve-style': 'straight',
            'opacity': 0.6
          }
        },
        {
          selector: '.technique-edge',
          style: {
            'width': 'mapData(strength, 1, 5, 1, 4)',
            'line-color': '#6B7280',
            'curve-style': 'unbundled-bezier',
            'opacity': 0.4,
            'line-style': 'dashed'
          }
        },
        // Hover and selection states
        {
          selector: 'node:hover',
          style: {
            'border-width': 4,
            'border-color': '#FBBF24'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 5,
            'border-color': '#F59E0B',
            'box-shadow': '0 0 20px #F59E0B'
          }
        },
        {
          selector: 'edge:hover',
          style: {
            'width': 5,
            'opacity': 0.8
          }
        }
      ],
      layout: {
        name: layoutName,
        animate: true,
        animationDuration: 1000,
        fit: true,
        padding: 50,
        // For cose layout
        nodeRepulsion: function(node) {
          return node.data('type') === 'category' ? 100000 : 50000;
        },
        idealEdgeLength: function(edge) {
          return edge.data('type') === 'category-connection' ? 100 : 150;
        },
        edgeElasticity: function(edge) {
          return edge.data('type') === 'category-connection' ? 100 : 10;
        }
      },
      wheelSensitivity: 0.2,
      minZoom: 0.3,
      maxZoom: 3
    });

    // Event handlers
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const nodeData = node.data('nodeData');
      setSelectedNode(nodeData);
      
      if (node.data('type') === 'technique') {
        onTechniqueSelect(nodeData);
      }
    });

    cy.on('mouseover', 'node', (evt) => {
      const node = evt.target;
      node.style('cursor', 'pointer');
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        cy.elements().unselect();
        setSelectedNode(null);
      }
    });

        cyRef.current = cy;
      } catch (error) {
        console.error('Failed to initialize Cytoscape:', error);
      }
    };

    initCytoscape();

    return () => {
      try {
        if (cyRef.current) {
          cyRef.current.destroy();
          cyRef.current = null;
        }
      } catch (error) {
        console.error('Failed to destroy Cytoscape:', error);
      }
    };
  }, [isClient, selectedCategory, showConnections, layoutName]);

  // Update selection highlight when selectedTechnique changes
  useEffect(() => {
    if (cyRef.current && selectedTechnique) {
      cyRef.current.elements().unselect();
      const node = cyRef.current.$(`#technique-${selectedTechnique.id}`);
      if (node.length > 0) {
        node.select();
      }
    }
  }, [selectedTechnique]);

  const handleLayoutChange = (newLayout) => {
    setLayoutName(newLayout);
    try {
      if (cyRef.current) {
        cyRef.current.layout({ name: newLayout, animate: true, fit: true }).run();
      }
    } catch (error) {
      console.error('Failed to change layout:', error);
    }
  };

  const handleCenterGraph = () => {
    try {
      if (cyRef.current) {
        cyRef.current.fit(null, 50);
        cyRef.current.center();
      }
    } catch (error) {
      console.error('Failed to center graph:', error);
    }
  };

  return (
    <div className="flex h-full">
      {/* Controls Panel */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 p-6 overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-6">Network Controls</h3>
        
        {/* Layout Controls */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">Layout Algorithm</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'cose', name: 'Force' },
              { id: 'circle', name: 'Circle' },
              { id: 'grid', name: 'Grid' },
              { id: 'concentric', name: 'Concentric' }
            ].map(layout => (
              <button
                key={layout.id}
                onClick={() => handleLayoutChange(layout.id)}
                className={`p-2 rounded text-xs transition-all ${
                  layoutName === layout.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {layout.name}
              </button>
            ))}
          </div>
          <button
            onClick={handleCenterGraph}
            className="w-full mt-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-colors"
          >
            Center & Fit
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">Filter by Category</label>
          <div className="space-y-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 border-blue-400 text-white'
                    : 'bg-gray-700 border-gray-600 hover:border-gray-500 text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Connections */}
        <div className="mb-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={showConnections}
              onChange={(e) => setShowConnections(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-300">Show Connections</span>
          </label>
        </div>

        {/* Node Info */}
        {selectedNode && (
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <h4 className="font-semibold text-white mb-2">{selectedNode.name}</h4>
            <p className="text-sm text-gray-300 mb-3">{selectedNode.description}</p>
            {selectedNode.complexity && (
              <div className="space-y-2">
                <div className="text-xs text-gray-400">
                  Complexity: <span className="text-white capitalize">{selectedNode.complexity}</span>
                </div>
                <div className="text-xs text-gray-400">
                  Use Cases: <span className="text-white">{selectedNode.useCases?.length || 0}</span>
                </div>
                <button
                  onClick={() => {
                    onTechniqueSelect(selectedNode);
                    // Switch to explore tab to see details
                    document.querySelector('[data-tab="explore"]')?.click();
                  }}
                  className="w-full mt-3 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white transition-colors"
                >
                  View Details
                </button>
              </div>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 bg-gray-700 rounded-lg p-4 border border-gray-600">
          <h4 className="text-sm font-semibold text-white mb-3">Legend</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300">Reasoning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span className="text-gray-300">Safety</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <span className="text-gray-300">Chaining</span>
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
          </div>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="flex-1 relative">
        {!isClient ? (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading network graph...</p>
            </div>
          </div>
        ) : (
          <div ref={containerRef} className="w-full h-full bg-gray-900" />
        )}
      </div>
    </div>
  );
};