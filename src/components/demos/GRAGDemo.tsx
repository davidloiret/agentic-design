'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, GitBranch, Network, Users, Sparkles, Database, Layers, TrendingUp, Circle, Square, Triangle } from 'lucide-react';

interface Entity {
  id: string;
  name: string;
  type: 'person' | 'organization' | 'technology' | 'concept' | 'location';
  properties: Record<string, any>;
  community?: number;
}

interface Relationship {
  source: string;
  target: string;
  type: string;
  strength: number;
  properties?: Record<string, any>;
}

interface Community {
  id: number;
  name: string;
  entities: Entity[];
  summary: string;
  centralEntity?: Entity;
  density: number;
}

interface GraphNode {
  id: string;
  x: number;
  y: number;
  entity: Entity;
}

interface GraphRAGResponse {
  localAnswer: string;
  globalAnswer: string;
  relevantCommunities: Community[];
  traversalPath: string[];
  confidence: number;
}

export default function GRAGDemo() {
  const [query] = useState('How are AI companies collaborating on safety research?');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState<'idle' | 'building' | 'detecting' | 'traversing' | 'aggregating' | 'generating' | 'complete'>('idle');

  const [entities, setEntities] = useState<Entity[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(null);
  const [graphNodes, setGraphNodes] = useState<GraphNode[]>([]);
  const [response, setResponse] = useState<GraphRAGResponse | null>(null);
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sample knowledge graph data
  const knowledgeGraphData = {
    entities: [
      // AI Companies
      { id: 'openai', name: 'OpenAI', type: 'organization' as const, properties: { founded: 2015, focus: 'AGI' } },
      { id: 'anthropic', name: 'Anthropic', type: 'organization' as const, properties: { founded: 2021, focus: 'AI Safety' } },
      { id: 'deepmind', name: 'DeepMind', type: 'organization' as const, properties: { founded: 2010, focus: 'AGI' } },
      { id: 'google', name: 'Google', type: 'organization' as const, properties: { founded: 1998, division: 'Google AI' } },
      { id: 'microsoft', name: 'Microsoft', type: 'organization' as const, properties: { partner: 'OpenAI' } },

      // Research Organizations
      { id: 'mila', name: 'Mila', type: 'organization' as const, properties: { type: 'Research Institute' } },
      { id: 'fair', name: 'FAIR', type: 'organization' as const, properties: { parent: 'Meta', focus: 'Open Research' } },
      { id: 'alignmentforum', name: 'Alignment Forum', type: 'organization' as const, properties: { type: 'Community' } },

      // People
      { id: 'sama', name: 'Sam Altman', type: 'person' as const, properties: { role: 'CEO', company: 'OpenAI' } },
      { id: 'dario', name: 'Dario Amodei', type: 'person' as const, properties: { role: 'CEO', company: 'Anthropic' } },
      { id: 'demis', name: 'Demis Hassabis', type: 'person' as const, properties: { role: 'CEO', company: 'DeepMind' } },
      { id: 'yoshua', name: 'Yoshua Bengio', type: 'person' as const, properties: { role: 'Director', company: 'Mila' } },

      // Technologies/Concepts
      { id: 'gpt4', name: 'GPT-4', type: 'technology' as const, properties: { type: 'LLM', creator: 'OpenAI' } },
      { id: 'claude', name: 'Claude', type: 'technology' as const, properties: { type: 'LLM', creator: 'Anthropic' } },
      { id: 'gemini', name: 'Gemini', type: 'technology' as const, properties: { type: 'LLM', creator: 'Google' } },
      { id: 'rlhf', name: 'RLHF', type: 'concept' as const, properties: { category: 'Training Method' } },
      { id: 'constitutional-ai', name: 'Constitutional AI', type: 'concept' as const, properties: { creator: 'Anthropic' } },
      { id: 'ai-safety', name: 'AI Safety', type: 'concept' as const, properties: { importance: 'Critical' } },
      { id: 'alignment', name: 'AI Alignment', type: 'concept' as const, properties: { field: 'Research' } },

      // Locations
      { id: 'sf', name: 'San Francisco', type: 'location' as const, properties: { country: 'USA' } },
      { id: 'london', name: 'London', type: 'location' as const, properties: { country: 'UK' } },
      { id: 'montreal', name: 'Montreal', type: 'location' as const, properties: { country: 'Canada' } }
    ],
    relationships: [
      // Company relationships
      { source: 'openai', target: 'microsoft', type: 'PARTNERS_WITH', strength: 0.9 },
      { source: 'anthropic', target: 'openai', type: 'FOUNDED_BY_EX_MEMBERS', strength: 0.8 },
      { source: 'google', target: 'deepmind', type: 'ACQUIRED', strength: 1.0 },

      // Person-Company relationships
      { source: 'sama', target: 'openai', type: 'LEADS', strength: 1.0 },
      { source: 'dario', target: 'anthropic', type: 'LEADS', strength: 1.0 },
      { source: 'demis', target: 'deepmind', type: 'LEADS', strength: 1.0 },
      { source: 'yoshua', target: 'mila', type: 'LEADS', strength: 1.0 },
      { source: 'dario', target: 'openai', type: 'WORKED_AT', strength: 0.7 },

      // Technology relationships
      { source: 'gpt4', target: 'openai', type: 'CREATED_BY', strength: 1.0 },
      { source: 'claude', target: 'anthropic', type: 'CREATED_BY', strength: 1.0 },
      { source: 'gemini', target: 'google', type: 'CREATED_BY', strength: 1.0 },
      { source: 'gpt4', target: 'rlhf', type: 'USES', strength: 0.9 },
      { source: 'claude', target: 'rlhf', type: 'USES', strength: 0.9 },
      { source: 'claude', target: 'constitutional-ai', type: 'IMPLEMENTS', strength: 1.0 },

      // Research collaboration
      { source: 'openai', target: 'ai-safety', type: 'RESEARCHES', strength: 0.8 },
      { source: 'anthropic', target: 'ai-safety', type: 'RESEARCHES', strength: 0.95 },
      { source: 'deepmind', target: 'ai-safety', type: 'RESEARCHES', strength: 0.85 },
      { source: 'mila', target: 'ai-safety', type: 'RESEARCHES', strength: 0.7 },
      { source: 'fair', target: 'openai', type: 'COLLABORATES_WITH', strength: 0.6 },
      { source: 'anthropic', target: 'alignmentforum', type: 'CONTRIBUTES_TO', strength: 0.8 },
      { source: 'deepmind', target: 'alignmentforum', type: 'CONTRIBUTES_TO', strength: 0.7 },

      // Location relationships
      { source: 'openai', target: 'sf', type: 'LOCATED_IN', strength: 1.0 },
      { source: 'anthropic', target: 'sf', type: 'LOCATED_IN', strength: 1.0 },
      { source: 'deepmind', target: 'london', type: 'LOCATED_IN', strength: 1.0 },
      { source: 'mila', target: 'montreal', type: 'LOCATED_IN', strength: 1.0 },

      // Concept relationships
      { source: 'ai-safety', target: 'alignment', type: 'INCLUDES', strength: 0.9 },
      { source: 'constitutional-ai', target: 'ai-safety', type: 'ADVANCES', strength: 0.8 },
      { source: 'rlhf', target: 'alignment', type: 'TECHNIQUE_FOR', strength: 0.85 }
    ]
  };

  const detectCommunities = (entities: Entity[], relationships: Relationship[]): Community[] => {
    // Simple community detection based on connection density
    const communities: Community[] = [
      {
        id: 0,
        name: 'Core AI Safety Research',
        entities: entities.filter(e =>
          ['openai', 'anthropic', 'deepmind', 'ai-safety', 'alignment', 'rlhf', 'constitutional-ai'].includes(e.id)
        ),
        summary: 'Leading AI companies collaborating on safety research and alignment techniques',
        centralEntity: entities.find(e => e.id === 'ai-safety'),
        density: 0.85
      },
      {
        id: 1,
        name: 'Leadership Network',
        entities: entities.filter(e =>
          ['sama', 'dario', 'demis', 'yoshua', 'openai', 'anthropic', 'deepmind', 'mila'].includes(e.id)
        ),
        summary: 'Key leaders and their organizations in the AI ecosystem',
        centralEntity: entities.find(e => e.id === 'sama'),
        density: 0.72
      },
      {
        id: 2,
        name: 'LLM Technology Stack',
        entities: entities.filter(e =>
          ['gpt4', 'claude', 'gemini', 'rlhf', 'constitutional-ai', 'openai', 'anthropic', 'google'].includes(e.id)
        ),
        summary: 'Large language models and their training methodologies',
        centralEntity: entities.find(e => e.id === 'gpt4'),
        density: 0.78
      },
      {
        id: 3,
        name: 'Research Collaboration Network',
        entities: entities.filter(e =>
          ['mila', 'fair', 'alignmentforum', 'anthropic', 'deepmind', 'ai-safety'].includes(e.id)
        ),
        summary: 'Research institutions and forums for AI safety collaboration',
        centralEntity: entities.find(e => e.id === 'alignmentforum'),
        density: 0.65
      },
      {
        id: 4,
        name: 'Geographic Clusters',
        entities: entities.filter(e =>
          ['sf', 'london', 'montreal', 'openai', 'anthropic', 'deepmind', 'mila'].includes(e.id)
        ),
        summary: 'Geographic distribution of major AI organizations',
        centralEntity: entities.find(e => e.id === 'sf'),
        density: 0.55
      }
    ];

    return communities;
  };

  const traverseGraph = (query: string, entities: Entity[], relationships: Relationship[]): string[] => {
    // Simulate graph traversal based on query
    const queryLower = query.toLowerCase();
    const path: string[] = [];

    // Start with most relevant entities
    if (queryLower.includes('safety')) {
      path.push('ai-safety', 'anthropic', 'openai', 'deepmind');
    }
    if (queryLower.includes('collaborat')) {
      path.push('alignmentforum', 'fair', 'mila');
    }
    if (queryLower.includes('companies')) {
      path.push('openai', 'anthropic', 'google', 'microsoft');
    }

    // Add connected entities
    relationships.forEach(rel => {
      if (path.includes(rel.source) && !path.includes(rel.target)) {
        if (rel.type.includes('COLLABORATES') || rel.type.includes('RESEARCHES')) {
          path.push(rel.target);
        }
      }
    });

    return path;
  };

  const generateGraphRAGResponse = (
    query: string,
    communities: Community[],
    traversalPath: string[]
  ): GraphRAGResponse => {
    // Find relevant communities
    const relevantCommunities = communities.filter(c =>
      c.name.includes('Safety') || c.name.includes('Research') || c.name.includes('Collaboration')
    );

    const localAnswer = `Based on entity-level analysis:

**Direct Collaborations:**
- OpenAI and Anthropic both conduct AI safety research, with Anthropic founded by former OpenAI members
- DeepMind collaborates through the Alignment Forum
- Research institutes like Mila and FAIR contribute to shared safety initiatives

**Key Relationships:**
- Partnership: OpenAI ↔ Microsoft (funding and compute resources)
- Knowledge Transfer: OpenAI → Anthropic (through former employees)
- Research Sharing: Multiple companies → Alignment Forum`;

    const globalAnswer = `Based on community-level analysis:

**Collaboration Patterns Identified:**

1. **Core Safety Research Community** (85% density):
   - OpenAI, Anthropic, and DeepMind form a tightly connected cluster
   - Share common research goals in AI alignment
   - Exchange techniques like RLHF and Constitutional AI
   - Combined investment: >$10B in safety research

2. **Research Network Community** (65% density):
   - Academic institutions (Mila, FAIR) bridge industry research
   - Alignment Forum serves as central collaboration hub
   - Cross-pollination of ideas through shared forums
   - 20+ joint publications in 2024 alone

3. **Technology Stack Convergence** (78% density):
   - Shared methodologies: RLHF, Constitutional AI, safety filters
   - Common evaluation benchmarks
   - Open-source tool sharing

4. **Geographic Clustering Effect**:
   - San Francisco hub (OpenAI, Anthropic) shows highest collaboration (90% connection density)
   - London (DeepMind) and Montreal (Mila) form secondary hubs
   - Physical proximity accelerates knowledge transfer

**Global Insights:**
- Safety research has become a unifying factor across competing companies
- Former employee networks create strong knowledge transfer channels (Anthropic ← OpenAI)
- Open research forums facilitate broader ecosystem collaboration
- Competitive dynamics balanced with shared safety concerns
- Multi-modal collaboration: research papers, code, personnel exchange`;

    return {
      localAnswer,
      globalAnswer,
      relevantCommunities,
      traversalPath,
      confidence: 0.92
    };
  };

  const layoutGraph = (entities: Entity[], relationships: Relationship[]): GraphNode[] => {
    const centerX = 300;
    const centerY = 200;

    // Group entities by type
    const organizations = entities.filter(e => e.type === 'organization');
    const people = entities.filter(e => e.type === 'person');
    const concepts = entities.filter(e => e.type === 'concept');
    const technologies = entities.filter(e => e.type === 'technology');
    const locations = entities.filter(e => e.type === 'location');

    const nodes: GraphNode[] = [];

    // Create a grid-based layout for better organization

    // Organizations - center area in a well-spaced pattern
    const orgPositions = [
      { x: centerX, y: centerY - 60 },        // OpenAI (top center)
      { x: centerX - 100, y: centerY },       // Anthropic (left)
      { x: centerX + 100, y: centerY },       // DeepMind (right)
      { x: centerX - 50, y: centerY + 80 },   // Google (bottom left)
      { x: centerX + 50, y: centerY + 80 },   // Microsoft (bottom right)
      { x: centerX - 150, y: centerY - 80 },  // Mila (top left)
      { x: centerX + 150, y: centerY - 80 },  // FAIR (top right)
      { x: centerX, y: centerY }              // Alignment Forum (center)
    ];

    organizations.forEach((entity, idx) => {
      const pos = orgPositions[idx] || {
        x: centerX + (idx - 4) * 80,
        y: centerY + 140
      };
      nodes.push({
        id: entity.id,
        x: pos.x,
        y: pos.y,
        entity
      });
    });

    // People - positioned around their organizations
    const peopleMap: Record<string, { x: number, y: number }> = {
      'sama': { x: centerX + 35, y: centerY - 90 },      // Near OpenAI
      'dario': { x: centerX - 140, y: centerY - 30 },    // Near Anthropic
      'demis': { x: centerX + 140, y: centerY - 30 },    // Near DeepMind
      'yoshua': { x: centerX - 190, y: centerY - 50 }    // Near Mila
    };

    people.forEach((entity) => {
      const pos = peopleMap[entity.id] || {
        x: centerX + (Math.random() - 0.5) * 250,
        y: centerY + 120
      };
      nodes.push({
        id: entity.id,
        x: pos.x,
        y: pos.y,
        entity
      });
    });

    // Technologies - left side in vertical layout
    technologies.forEach((entity, idx) => {
      nodes.push({
        id: entity.id,
        x: 60 + (idx % 2) * 40,
        y: 80 + idx * 50,
        entity
      });
    });

    // Concepts - right side in vertical layout
    concepts.forEach((entity, idx) => {
      nodes.push({
        id: entity.id,
        x: 500 + (idx % 2) * 40,
        y: 60 + idx * 55,
        entity
      });
    });

    // Locations - bottom in horizontal layout
    locations.forEach((entity, idx) => {
      nodes.push({
        id: entity.id,
        x: 150 + idx * 150,
        y: 340,
        entity
      });
    });

    // Gentler collision detection to maintain intended positions
    for (let iter = 0; iter < 3; iter++) {
      nodes.forEach((node1, i) => {
        nodes.forEach((node2, j) => {
          if (i !== j) {
            const dx = node2.x - node1.x;
            const dy = node2.y - node1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = 50; // Increased minimum distance

            if (dist < minDist && dist > 0) {
              const force = (minDist - dist) / dist * 0.2; // Gentler force
              node1.x -= dx * force;
              node1.y -= dy * force;
              node2.x += dx * force;
              node2.y += dy * force;
            }
          }
        });

        // Keep within bounds with padding
        node1.x = Math.max(40, Math.min(560, node1.x));
        node1.y = Math.max(40, Math.min(360, node1.y));
      });
    }

    return nodes;
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save current context state
    ctx.save();

    // Clear with logical coordinates (not physical pixels)
    ctx.clearRect(0, 0, 600, 400);

    // Fill background
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, 600, 400);

    // Draw subtle grid for visual organization
    ctx.strokeStyle = 'rgba(75, 85, 99, 0.15)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < 600; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 400);
      ctx.stroke();
    }
    for (let y = 0; y < 400; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(600, y);
      ctx.stroke();
    }

    // Draw community backgrounds
    if (communities.length > 0 && selectedCommunity !== null) {
      const selectedComm = communities.find(c => c.id === selectedCommunity);
      if (selectedComm) {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.05)';
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);

        // Draw a convex hull around community nodes
        const commNodes = graphNodes.filter(n =>
          selectedComm.entities.some(e => e.id === n.id)
        );

        if (commNodes.length > 0) {
          ctx.beginPath();
          const padding = 20;
          const minX = Math.min(...commNodes.map(n => n.x)) - padding;
          const maxX = Math.max(...commNodes.map(n => n.x)) + padding;
          const minY = Math.min(...commNodes.map(n => n.y)) - padding;
          const maxY = Math.max(...commNodes.map(n => n.y)) + padding;

          // Use rect instead of roundRect for compatibility
          ctx.rect(minX, minY, maxX - minX, maxY - minY);
          ctx.fill();
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }
    }

    // Draw relationships - only show important ones
    relationships.forEach(rel => {
      const sourceNode = graphNodes.find(n => n.id === rel.source);
      const targetNode = graphNodes.find(n => n.id === rel.target);
      if (sourceNode && targetNode) {
        const isInPath = response?.traversalPath.includes(rel.source) &&
                        response?.traversalPath.includes(rel.target);

        // Skip weak relationships unless they're in the path
        if (!isInPath && rel.strength < 0.6) return;

        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);

        if (isInPath) {
          // Highlighted path
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2.5;
        } else {
          // Regular important edges - very subtle
          ctx.strokeStyle = `rgba(100, 116, 139, 0.2)`;
          ctx.lineWidth = 1;
        }
        ctx.stroke();
      }
    });

    // Draw nodes with better antialiasing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    graphNodes.forEach(node => {
      const isInPath = response?.traversalPath.includes(node.id);
      const isHovered = hoveredEntity === node.id;
      const isOrg = node.entity.type === 'organization';

      // Consistent node sizes
      const radius = isHovered ? 10 : isInPath ? 9 : isOrg ? 7 : 5;

      // Shadow for depth
      if (isInPath || isHovered || isOrg) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.restore();
      }

      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);

      // Color based on type and state
      if (isInPath) {
        ctx.fillStyle = '#10b981';
      } else if (node.entity.type === 'organization') {
        ctx.fillStyle = '#3b82f6';
      } else if (node.entity.type === 'person') {
        ctx.fillStyle = '#f59e0b';
      } else if (node.entity.type === 'concept') {
        ctx.fillStyle = '#a855f7';
      } else if (node.entity.type === 'technology') {
        ctx.fillStyle = '#ef4444';
      } else {
        ctx.fillStyle = '#6b7280';
      }

      ctx.fill();

      // Draw border
      ctx.strokeStyle = isInPath ? '#ffffff' : 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = isInPath ? 1.5 : 0.5;
      ctx.stroke();

      // Selective labeling to avoid clutter
      // Only show labels for: nodes in path, hovered nodes, and key organizations
      const isKeyOrg = isOrg && ['openai', 'anthropic', 'deepmind', 'google'].includes(node.entity.id);
      const showLabel = isInPath || isHovered || (isKeyOrg && !response);

      if (showLabel) {
        ctx.save();
        const text = node.entity.name;
        const fontSize = isInPath ? 11 : isHovered ? 10 : 9;
        ctx.font = `${isOrg && isInPath ? 'bold' : ''} ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';

        // Position label below node
        const yOffset = radius + 12;

        // Only draw background for readability
        if (isInPath || isHovered) {
          const metrics = ctx.measureText(text);
          ctx.fillStyle = 'rgba(17, 24, 39, 0.85)';
          ctx.fillRect(
            node.x - metrics.width / 2 - 2,
            node.y + yOffset - 2,
            metrics.width + 4,
            fontSize + 4
          );
        }

        // Draw text
        ctx.fillStyle = isInPath ? '#10b981' : isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(text, node.x, node.y + yOffset + fontSize - 2);
        ctx.restore();
      }
    });

    // Restore context state
    ctx.restore();
  };

  useEffect(() => {
    if (graphNodes.length > 0) {
      // Handle high DPI displays for crisp rendering
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const dpr = window.devicePixelRatio || 1;
          const rect = canvas.getBoundingClientRect();

          // Set actual canvas size with device pixel ratio
          canvas.width = 600 * dpr;
          canvas.height = 400 * dpr;

          // Scale the drawing context to match device pixel ratio
          ctx.scale(dpr, dpr);

          // Set canvas CSS size
          canvas.style.width = '100%';
          canvas.style.height = '100%';
        }
      }
      drawGraph();
    }
  }, [graphNodes, relationships, hoveredEntity, response, selectedCommunity]);

  const runGraphRAGPipeline = async () => {
    setIsProcessing(true);
    setResponse(null);

    // Step 1: Build Knowledge Graph
    setCurrentStage('building');
    await new Promise(resolve => setTimeout(resolve, 800));

    const entitiesWithCommunity = knowledgeGraphData.entities.map(e => ({
      ...e,
      community: undefined
    }));
    setEntities(entitiesWithCommunity);
    setRelationships(knowledgeGraphData.relationships);

    // Step 2: Detect Communities
    setCurrentStage('detecting');
    await new Promise(resolve => setTimeout(resolve, 1000));

    const detectedCommunities = detectCommunities(entitiesWithCommunity, knowledgeGraphData.relationships);
    setCommunities(detectedCommunities);

    // Assign community IDs to entities
    const entitiesWithCommunities = entitiesWithCommunity.map(entity => {
      const community = detectedCommunities.find(c =>
        c.entities.some(e => e.id === entity.id)
      );
      return { ...entity, community: community?.id };
    });
    setEntities(entitiesWithCommunities);

    // Layout graph nodes
    const nodes = layoutGraph(entitiesWithCommunities, knowledgeGraphData.relationships);
    setGraphNodes(nodes);

    // Step 3: Traverse Graph
    setCurrentStage('traversing');
    await new Promise(resolve => setTimeout(resolve, 1200));

    const path = traverseGraph(query, entitiesWithCommunities, knowledgeGraphData.relationships);

    // Step 4: Aggregate Information
    setCurrentStage('aggregating');
    await new Promise(resolve => setTimeout(resolve, 800));

    // Step 5: Generate Response
    setCurrentStage('generating');
    await new Promise(resolve => setTimeout(resolve, 1000));

    const graphResponse = generateGraphRAGResponse(query, detectedCommunities, path);
    setResponse(graphResponse);

    setCurrentStage('complete');
    setIsProcessing(false);
  };

  const getEntityIcon = (type: Entity['type']) => {
    switch (type) {
      case 'organization': return <Square className="w-3 h-3" />;
      case 'person': return <Circle className="w-3 h-3" />;
      case 'concept': return <Triangle className="w-3 h-3" />;
      case 'technology': return <Database className="w-3 h-3" />;
      case 'location': return <Circle className="w-3 h-3" />;
    }
  };

  const getEntityColor = (type: Entity['type']) => {
    switch (type) {
      case 'organization': return 'text-blue-400';
      case 'person': return 'text-orange-400';
      case 'concept': return 'text-purple-400';
      case 'technology': return 'text-red-400';
      case 'location': return 'text-gray-400';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Graph RAG (GRAG) Demo</h2>

      {/* Query Input */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            readOnly
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
          />
          <button
            onClick={runGraphRAGPipeline}
            disabled={isProcessing}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:text-gray-500 transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Run Graph RAG'}
          </button>
        </div>
      </div>

      {/* Pipeline Status */}
      {currentStage !== 'idle' && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Graph RAG Pipeline</h3>
          <div className="grid grid-cols-5 gap-2">
            {['building', 'detecting', 'traversing', 'aggregating', 'generating'].map(stage => (
              <div
                key={stage}
                className={`p-2 rounded-lg text-center text-xs ${
                  currentStage === stage
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : currentStage === 'complete' ||
                      ['building', 'detecting', 'traversing', 'aggregating', 'generating'].indexOf(currentStage) >
                      ['building', 'detecting', 'traversing', 'aggregating', 'generating'].indexOf(stage)
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-700 text-gray-500'
                }`}
              >
                {stage === 'building' && 'Build Graph'}
                {stage === 'detecting' && 'Detect Communities'}
                {stage === 'traversing' && 'Traverse Graph'}
                {stage === 'aggregating' && 'Aggregate'}
                {stage === 'generating' && 'Generate'}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Knowledge Graph Visualization */}
      {graphNodes.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Network className="w-5 h-5 mr-2" />
            Knowledge Graph Visualization
          </h3>
          <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '3/2' }}>
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="w-full h-full block"
              onMouseMove={(e) => {
                const rect = canvasRef.current?.getBoundingClientRect();
                if (rect) {
                  const scaleX = 600 / rect.width;
                  const scaleY = 400 / rect.height;
                  const x = (e.clientX - rect.left) * scaleX;
                  const y = (e.clientY - rect.top) * scaleY;

                  const hoveredNode = graphNodes.find(node => {
                    const dx = node.x - x;
                    const dy = node.y - y;
                    return Math.sqrt(dx * dx + dy * dy) < 15;
                  });

                  setHoveredEntity(hoveredNode?.id || null);
                }
              }}
              onMouseLeave={() => setHoveredEntity(null)}
            />

            {/* Legend */}
            <div className="absolute top-2 right-2 bg-gray-800/95 rounded-lg p-3 text-xs border border-gray-700">
              <div className="font-semibold text-white mb-2">Entity Types:</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-gray-300">Organization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-gray-300">Person</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-gray-300">Concept</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-300">Technology</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-300">In Path</span>
                </div>
              </div>
            </div>

            {hoveredEntity && (
              <div className="absolute bottom-2 left-2 bg-gray-800/95 rounded-lg p-3 text-sm text-white border border-gray-700">
                <div className="font-semibold">{entities.find(e => e.id === hoveredEntity)?.name}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Type: {entities.find(e => e.id === hoveredEntity)?.type}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Communities */}
      {communities.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Detected Communities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {communities.map(community => (
              <div
                key={community.id}
                onClick={() => setSelectedCommunity(community.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedCommunity === community.id
                    ? 'bg-blue-900/30 border-blue-500/50'
                    : response?.relevantCommunities.some(c => c.id === community.id)
                    ? 'bg-green-900/20 border-green-500/30'
                    : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-white text-sm">{community.name}</div>
                  <div className="text-xs px-2 py-1 bg-gray-800 rounded">
                    {Math.round(community.density * 100)}% density
                  </div>
                </div>
                <div className="text-xs text-gray-300 mb-2">{community.summary}</div>
                <div className="flex flex-wrap gap-1">
                  {community.entities.slice(0, 4).map(entity => (
                    <span
                      key={entity.id}
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 bg-gray-800 rounded text-xs ${getEntityColor(entity.type)}`}
                    >
                      {getEntityIcon(entity.type)}
                      {entity.name}
                    </span>
                  ))}
                  {community.entities.length > 4 && (
                    <span className="text-xs text-gray-500">
                      +{community.entities.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Response */}
      {response && (
        <>
          {/* Local Answer */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <GitBranch className="w-5 h-5 mr-2" />
              Entity-Level Analysis (Local)
            </h3>
            <div className="text-white whitespace-pre-wrap text-sm">{response.localAnswer}</div>

            {/* Traversal Path */}
            <div className="mt-4 p-3 bg-gray-700/50 rounded">
              <div className="text-xs font-semibold text-blue-400 mb-2">Graph Traversal Path:</div>
              <div className="flex flex-wrap gap-2">
                {response.traversalPath.map((nodeId, idx) => {
                  const entity = entities.find(e => e.id === nodeId);
                  return entity ? (
                    <React.Fragment key={nodeId}>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 bg-gray-800 rounded text-xs ${getEntityColor(entity.type)}`}>
                        {getEntityIcon(entity.type)}
                        {entity.name}
                      </span>
                      {idx < response.traversalPath.length - 1 && (
                        <span className="text-gray-500">→</span>
                      )}
                    </React.Fragment>
                  ) : null;
                })}
              </div>
            </div>
          </div>

          {/* Global Answer */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-500/30 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Community-Level Analysis (Global)
            </h3>
            <div className="text-white whitespace-pre-wrap text-sm">{response.globalAnswer}</div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-300">
                Analyzed {response.relevantCommunities.length} communities
              </div>
              <div className="text-sm text-green-400">
                {Math.round(response.confidence * 100)}% confidence
              </div>
            </div>
          </div>
        </>
      )}

      {/* Key Features */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">🎯 Graph RAG Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-400 mb-2">Knowledge Graph Structure</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Entity extraction & typing</li>
              <li>• Relationship identification</li>
              <li>• Property enrichment</li>
              <li>• Hierarchical organization</li>
            </ul>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-purple-400 mb-2">Community Detection</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Automatic clustering</li>
              <li>• Density analysis</li>
              <li>• Central entity identification</li>
              <li>• Community summarization</li>
            </ul>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-green-400 mb-2">Dual-Level Analysis</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Local: Entity traversal</li>
              <li>• Global: Community insights</li>
              <li>• Pattern recognition</li>
              <li>• Holistic sensemaking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}