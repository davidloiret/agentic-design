'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Network, Search, Database, GitBranch, Layers, Activity, Zap } from 'lucide-react';

interface Concept {
  id: string;
  name: string;
  category: string;
  embedding: number[];
  properties: Record<string, any>;
  connections: string[];
  activationLevel: number;
}

interface Relationship {
  source: string;
  target: string;
  type: 'is-a' | 'has-a' | 'part-of' | 'related-to' | 'causes' | 'used-for';
  strength: number;
  bidirectional: boolean;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  activeQuery?: string;
  queryCount: number;
  knowledgeAccess: string[];
}

interface KnowledgeQuery {
  id: string;
  agent: string;
  query: string;
  path: string[];
  hops: number;
  confidence: number;
  timestamp: Date;
}

export default function SemanticMemoryNetworksDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [queries, setQueries] = useState<KnowledgeQuery[]>([]);
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'research-agent', name: 'Research Agent', role: 'Scientific Knowledge', queryCount: 0, knowledgeAccess: [] },
    { id: 'medical-agent', name: 'Medical Agent', role: 'Healthcare Knowledge', queryCount: 0, knowledgeAccess: [] },
    { id: 'legal-agent', name: 'Legal Agent', role: 'Legal Knowledge', queryCount: 0, knowledgeAccess: [] },
    { id: 'technical-agent', name: 'Technical Agent', role: 'Technology Knowledge', queryCount: 0, knowledgeAccess: [] },
    { id: 'reasoning-agent', name: 'Reasoning Agent', role: 'Multi-hop Inference', queryCount: 0, knowledgeAccess: [] }
  ]);
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const [conceptCoverage, setConceptCoverage] = useState(0);
  const [relationshipAccuracy, setRelationshipAccuracy] = useState(98);
  const [queryResolution, setQueryResolution] = useState(0);
  const [crossAgentConsistency, setCrossAgentConsistency] = useState(95);
  const [avgPathLength, setAvgPathLength] = useState(0);
  const [graphDensity, setGraphDensity] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize knowledge graph
  useEffect(() => {
    initializeKnowledgeGraph();
  }, []);

  const initializeKnowledgeGraph = () => {
    const initialConcepts: Concept[] = [
      // Science concepts
      { id: 'physics', name: 'Physics', category: 'Science', embedding: [0.8, 0.2, 0.1], properties: { field: 'Natural Science' }, connections: ['quantum-mechanics', 'relativity', 'thermodynamics'], activationLevel: 0 },
      { id: 'quantum-mechanics', name: 'Quantum Mechanics', category: 'Science', embedding: [0.7, 0.3, 0.2], properties: { subfield: 'Physics' }, connections: ['physics', 'particle-physics'], activationLevel: 0 },
      { id: 'relativity', name: 'Relativity', category: 'Science', embedding: [0.6, 0.4, 0.1], properties: { theory: 'Einstein' }, connections: ['physics', 'spacetime'], activationLevel: 0 },
      { id: 'chemistry', name: 'Chemistry', category: 'Science', embedding: [0.5, 0.7, 0.2], properties: { field: 'Natural Science' }, connections: ['organic-chemistry', 'biochemistry'], activationLevel: 0 },
      { id: 'biology', name: 'Biology', category: 'Science', embedding: [0.4, 0.6, 0.8], properties: { field: 'Life Science' }, connections: ['genetics', 'ecology', 'biochemistry'], activationLevel: 0 },

      // Medical concepts
      { id: 'medicine', name: 'Medicine', category: 'Medical', embedding: [0.3, 0.8, 0.5], properties: { field: 'Healthcare' }, connections: ['disease', 'treatment', 'diagnosis'], activationLevel: 0 },
      { id: 'disease', name: 'Disease', category: 'Medical', embedding: [0.2, 0.9, 0.4], properties: { type: 'Pathology' }, connections: ['medicine', 'symptoms', 'treatment'], activationLevel: 0 },
      { id: 'treatment', name: 'Treatment', category: 'Medical', embedding: [0.4, 0.7, 0.6], properties: { type: 'Therapy' }, connections: ['medicine', 'disease', 'drugs'], activationLevel: 0 },
      { id: 'genetics', name: 'Genetics', category: 'Medical', embedding: [0.6, 0.5, 0.7], properties: { field: 'Molecular Biology' }, connections: ['biology', 'dna', 'heredity'], activationLevel: 0 },

      // Technology concepts
      { id: 'computer-science', name: 'Computer Science', category: 'Technology', embedding: [0.9, 0.1, 0.3], properties: { field: 'Technology' }, connections: ['algorithms', 'ai', 'programming'], activationLevel: 0 },
      { id: 'ai', name: 'Artificial Intelligence', category: 'Technology', embedding: [0.95, 0.2, 0.4], properties: { subfield: 'CS' }, connections: ['computer-science', 'machine-learning', 'neural-networks'], activationLevel: 0 },
      { id: 'machine-learning', name: 'Machine Learning', category: 'Technology', embedding: [0.9, 0.3, 0.5], properties: { type: 'AI' }, connections: ['ai', 'deep-learning', 'algorithms'], activationLevel: 0 },
      { id: 'neural-networks', name: 'Neural Networks', category: 'Technology', embedding: [0.85, 0.4, 0.6], properties: { architecture: 'Connectionist' }, connections: ['ai', 'deep-learning'], activationLevel: 0 },

      // Legal concepts
      { id: 'law', name: 'Law', category: 'Legal', embedding: [0.1, 0.5, 0.9], properties: { field: 'Legal System' }, connections: ['contract-law', 'criminal-law', 'constitutional-law'], activationLevel: 0 },
      { id: 'contract-law', name: 'Contract Law', category: 'Legal', embedding: [0.15, 0.6, 0.85], properties: { type: 'Civil Law' }, connections: ['law', 'agreements'], activationLevel: 0 },
      { id: 'criminal-law', name: 'Criminal Law', category: 'Legal', embedding: [0.2, 0.55, 0.9], properties: { type: 'Public Law' }, connections: ['law', 'justice'], activationLevel: 0 }
    ];

    const initialRelationships: Relationship[] = [
      { source: 'quantum-mechanics', target: 'physics', type: 'is-a', strength: 0.9, bidirectional: false },
      { source: 'relativity', target: 'physics', type: 'is-a', strength: 0.9, bidirectional: false },
      { source: 'genetics', target: 'biology', type: 'part-of', strength: 0.8, bidirectional: false },
      { source: 'biochemistry', target: 'chemistry', type: 'related-to', strength: 0.7, bidirectional: true },
      { source: 'biochemistry', target: 'biology', type: 'related-to', strength: 0.7, bidirectional: true },
      { source: 'disease', target: 'treatment', type: 'causes', strength: 0.6, bidirectional: false },
      { source: 'machine-learning', target: 'ai', type: 'is-a', strength: 0.95, bidirectional: false },
      { source: 'neural-networks', target: 'deep-learning', type: 'used-for', strength: 0.85, bidirectional: false },
      { source: 'contract-law', target: 'law', type: 'is-a', strength: 0.9, bidirectional: false },
      { source: 'criminal-law', target: 'law', type: 'is-a', strength: 0.9, bidirectional: false }
    ];

    setConcepts(initialConcepts);
    setRelationships(initialRelationships);
    setConceptCoverage(initialConcepts.length);
    setGraphDensity(Math.round((initialRelationships.length / (initialConcepts.length * (initialConcepts.length - 1))) * 100));
  };

  const queryScenarios = [
    {
      agent: 'research-agent',
      query: 'What is the relationship between quantum mechanics and thermodynamics?',
      startConcept: 'quantum-mechanics',
      targetConcept: 'thermodynamics',
      expectedHops: 2
    },
    {
      agent: 'medical-agent',
      query: 'How does genetics influence disease treatment?',
      startConcept: 'genetics',
      targetConcept: 'treatment',
      expectedHops: 3
    },
    {
      agent: 'technical-agent',
      query: 'What connects neural networks to algorithms?',
      startConcept: 'neural-networks',
      targetConcept: 'algorithms',
      expectedHops: 3
    },
    {
      agent: 'legal-agent',
      query: 'What is the hierarchy of contract law?',
      startConcept: 'contract-law',
      targetConcept: 'law',
      expectedHops: 1
    },
    {
      agent: 'reasoning-agent',
      query: 'How does biochemistry bridge biology and medicine?',
      startConcept: 'biochemistry',
      targetConcept: 'medicine',
      expectedHops: 4
    }
  ];

  const processQuery = () => {
    if (!isRunning) return;

    const scenario = queryScenarios[Math.floor(Math.random() * queryScenarios.length)];
    const agent = agents.find(a => a.id === scenario.agent);
    if (!agent) return;

    // Simulate path finding
    const path = findPath(scenario.startConcept, scenario.targetConcept);

    // Activate nodes in path
    const newActiveNodes = new Set<string>();
    path.forEach(nodeId => {
      newActiveNodes.add(nodeId);
      const concept = concepts.find(c => c.id === nodeId);
      if (concept) {
        concept.activationLevel = 1;
      }
    });
    setActiveNodes(newActiveNodes);

    // Update concepts with activation
    setConcepts(prev => prev.map(c => ({
      ...c,
      activationLevel: newActiveNodes.has(c.id) ? 1 : Math.max(0, c.activationLevel * 0.9)
    })));

    // Create query record
    const newQuery: KnowledgeQuery = {
      id: `query-${Date.now()}`,
      agent: agent.id,
      query: scenario.query,
      path,
      hops: path.length - 1,
      confidence: 0.85 + Math.random() * 0.15,
      timestamp: new Date()
    };

    setQueries(prev => [newQuery, ...prev].slice(0, 10));

    // Update agent stats
    setAgents(prev => prev.map(a => {
      if (a.id === agent.id) {
        return {
          ...a,
          queryCount: a.queryCount + 1,
          knowledgeAccess: [...new Set([...a.knowledgeAccess, ...path])].slice(0, 5),
          activeQuery: scenario.query
        };
      }
      return { ...a, activeQuery: undefined };
    }));

    // Update metrics
    setQueryResolution(prev => Math.min(100, prev + 10));
    setAvgPathLength(prev => {
      const newAvg = (prev * (queries.length) + (path.length - 1)) / (queries.length + 1);
      return Math.round(newAvg * 10) / 10;
    });

    // Decay activation after delay
    setTimeout(() => {
      setConcepts(prev => prev.map(c => ({
        ...c,
        activationLevel: c.activationLevel * 0.5
      })));
    }, 1000 / speed);
  };

  const findPath = (start: string, end: string): string[] => {
    // Simple BFS for demo
    const queue: string[][] = [[start]];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const path = queue.shift()!;
      const current = path[path.length - 1];

      if (current === end) {
        return path;
      }

      if (!visited.has(current)) {
        visited.add(current);
        const concept = concepts.find(c => c.id === current);
        if (concept) {
          concept.connections.forEach(conn => {
            if (!visited.has(conn)) {
              queue.push([...path, conn]);
            }
          });
        }
      }
    }

    // Fallback path
    return [start, 'physics', 'chemistry', end].filter((v, i, a) => a.indexOf(v) === i);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        processQuery();
      }, 3000 / speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed, concepts, queries]);

  // Visualize knowledge graph
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get device pixel ratio for high DPI screens
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set actual canvas size accounting for device pixel ratio
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale the drawing context to match device pixel ratio
    ctx.scale(dpr, dpr);

    // Set canvas CSS size
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    // Set high quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Use logical canvas dimensions for drawing
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    // Draw relationships
    relationships.forEach(rel => {
      const sourceConcept = concepts.find(c => c.id === rel.source);
      const targetConcept = concepts.find(c => c.id === rel.target);

      if (sourceConcept && targetConcept) {
        const sourceX = (sourceConcept.embedding[0] * canvasWidth * 0.8) + canvasWidth * 0.1;
        const sourceY = (sourceConcept.embedding[1] * canvasHeight * 0.8) + canvasHeight * 0.1;
        const targetX = (targetConcept.embedding[0] * canvasWidth * 0.8) + canvasWidth * 0.1;
        const targetY = (targetConcept.embedding[1] * canvasHeight * 0.8) + canvasHeight * 0.1;

        ctx.beginPath();
        ctx.moveTo(sourceX, sourceY);
        ctx.lineTo(targetX, targetY);
        ctx.strokeStyle = `rgba(100, 200, 255, ${rel.strength * 0.5})`;
        ctx.lineWidth = rel.strength * 2;
        ctx.stroke();
      }
    });

    // Draw concepts
    concepts.forEach(concept => {
      const x = (concept.embedding[0] * canvasWidth * 0.8) + canvasWidth * 0.1;
      const y = (concept.embedding[1] * canvasHeight * 0.8) + canvasHeight * 0.1;
      const radius = 5 + (concept.activationLevel * 10);

      // Draw node
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);

      if (activeNodes.has(concept.id)) {
        ctx.fillStyle = getCategoryColor(concept.category);
        ctx.globalAlpha = 0.9;
      } else {
        ctx.fillStyle = '#444';
        ctx.globalAlpha = 0.3 + concept.activationLevel * 0.6;
      }
      ctx.fill();
      ctx.globalAlpha = 1;

      // Draw label for active nodes
      if (concept.activationLevel > 0.5) {
        // Set font first for proper text measurement
        ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Add text background for better readability
        const textMetrics = ctx.measureText(concept.name);
        const textHeight = 18;
        const padding = 4;

        // Calculate positions for background and text
        const bgY = y - radius - textHeight - 10;
        const textY = bgY + textHeight / 2; // Center text vertically in background

        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(
          x - textMetrics.width / 2 - padding,
          bgY - padding,
          textMetrics.width + padding * 2,
          textHeight + padding * 2
        );

        // Draw text centered in the background
        ctx.fillStyle = '#ffffff';
        ctx.fillText(concept.name, x, textY);
      }
    });
  }, [concepts, relationships, activeNodes]);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Science': return '#3B82F6'; // blue
      case 'Medical': return '#10B981'; // green
      case 'Technology': return '#8B5CF6'; // purple
      case 'Legal': return '#F59E0B'; // yellow
      default: return '#6B7280'; // gray
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    initializeKnowledgeGraph();
    setQueries([]);
    setActiveNodes(new Set());
    setAgents(agents.map(a => ({ ...a, queryCount: 0, knowledgeAccess: [], activeQuery: undefined })));
    setQueryResolution(0);
    setAvgPathLength(0);
  };

  const getFilteredConcepts = () => {
    let filtered = concepts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => b.activationLevel - a.activationLevel);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Controls */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
            <Network className="w-5 h-5 text-purple-400" />
            Semantic Memory Network
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  isRunning
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Speed:</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-gray-300 w-8">{speed}x</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-700 text-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="all">All Categories</option>
            <option value="Science">Science</option>
            <option value="Medical">Medical</option>
            <option value="Technology">Technology</option>
            <option value="Legal">Legal</option>
          </select>
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts..."
              className="bg-gray-700 text-gray-300 rounded px-3 py-1 text-sm flex-1"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Knowledge Graph Visualization */}
        <div className="col-span-2 space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-blue-400" />
              Knowledge Graph Network
            </h4>
            <canvas
              ref={canvasRef}
              className="w-full h-[400px] bg-gray-900/50 rounded-lg"
            />
            <div className="grid grid-cols-4 gap-2 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-400">Science</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-400">Medical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-xs text-gray-400">Technology</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-gray-400">Legal</span>
              </div>
            </div>
          </div>

          {/* Active Concepts */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-green-400" />
              Active Concepts ({getFilteredConcepts().length})
            </h4>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {getFilteredConcepts().slice(0, 20).map(concept => (
                <div
                  key={concept.id}
                  className={`bg-gray-900/50 rounded-lg p-2 border transition-all ${
                    activeNodes.has(concept.id)
                      ? 'border-blue-500/50 bg-blue-900/20'
                      : 'border-gray-700/50'
                  }`}
                  style={{
                    opacity: 0.3 + concept.activationLevel * 0.7
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">{concept.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      concept.category === 'Science' ? 'bg-blue-900/50 text-blue-300' :
                      concept.category === 'Medical' ? 'bg-green-900/50 text-green-300' :
                      concept.category === 'Technology' ? 'bg-purple-900/50 text-purple-300' :
                      'bg-yellow-900/50 text-yellow-300'
                    }`}>
                      {concept.category}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {concept.connections.length} connections
                  </div>
                  {concept.activationLevel > 0 && (
                    <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all"
                        style={{ width: `${concept.activationLevel * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Multi-Agent Access */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              Multi-Agent Access
            </h4>
            <div className="space-y-3">
              {agents.map(agent => (
                <div key={agent.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{agent.name}</span>
                    <span className="text-xs text-gray-500">{agent.queryCount} queries</span>
                  </div>
                  {agent.activeQuery && (
                    <p className="text-xs text-blue-400 animate-pulse truncate">{agent.activeQuery}</p>
                  )}
                  {agent.knowledgeAccess.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {agent.knowledgeAccess.slice(0, 3).map(conceptId => {
                        const concept = concepts.find(c => c.id === conceptId);
                        return concept ? (
                          <span key={conceptId} className="text-xs bg-gray-700/50 px-2 py-1 rounded">
                            {concept.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* System Metrics */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-400" />
              System Metrics
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Concept Coverage</span>
                  <span className="text-xs text-blue-400">{conceptCoverage} concepts</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(conceptCoverage / 20) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Relationship Accuracy</span>
                  <span className="text-xs text-green-400">{relationshipAccuracy}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${relationshipAccuracy}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Query Resolution</span>
                  <span className="text-xs text-purple-400">{queryResolution.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${queryResolution}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Cross-Agent Consistency</span>
                  <span className="text-xs text-cyan-400">{crossAgentConsistency}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${crossAgentConsistency}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Query History */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              Recent Queries
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {queries.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-4">No queries yet</p>
              ) : (
                queries.slice(0, 5).map(query => (
                  <div key={query.id} className="bg-gray-900/50 rounded p-2">
                    <p className="text-xs text-gray-300 mb-1">{query.query}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{query.hops} hops</span>
                      <span className="text-xs text-green-400">{Math.round(query.confidence * 100)}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            {avgPathLength > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Avg Path Length</span>
                  <span className="text-xs text-yellow-400">{avgPathLength} hops</span>
                </div>
              </div>
            )}
          </div>

          {/* Graph Stats */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Graph Statistics</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Nodes:</span>
                <span className="text-gray-300 ml-1">{concepts.length}</span>
              </div>
              <div>
                <span className="text-gray-500">Edges:</span>
                <span className="text-gray-300 ml-1">{relationships.length}</span>
              </div>
              <div>
                <span className="text-gray-500">Density:</span>
                <span className="text-gray-300 ml-1">{graphDensity}%</span>
              </div>
              <div>
                <span className="text-gray-500">Active:</span>
                <span className="text-gray-300 ml-1">{activeNodes.size}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}