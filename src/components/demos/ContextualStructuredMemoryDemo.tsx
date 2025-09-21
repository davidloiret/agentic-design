'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Database, Search, Filter, GitBranch, Layers, FileJson, Code, Activity, CheckCircle, AlertCircle, Zap, Box, Network, Hash, Link2, ArrowRight, Brain } from 'lucide-react';

interface Entity {
  id: string;
  type: 'person' | 'organization' | 'product' | 'location' | 'event' | 'concept';
  name: string;
  attributes: Record<string, any>;
  relations: Relation[];
  metadata: {
    created: number;
    updated: number;
    accessCount: number;
    confidence: number;
  };
}

interface Relation {
  id: string;
  type: 'works_for' | 'owns' | 'located_in' | 'part_of' | 'related_to' | 'depends_on' | 'leads_to';
  from: string;
  to: string;
  properties: Record<string, any>;
  strength: number;
}

interface Schema {
  name: string;
  fields: SchemaField[];
  constraints: string[];
  indexes: string[];
}

interface SchemaField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object' | 'reference';
  required: boolean;
  indexed: boolean;
  validation?: string;
}

interface Query {
  id: string;
  type: 'sparql' | 'cypher' | 'sql' | 'graphql';
  query: string;
  timestamp: number;
  executionTime: number;
  resultCount: number;
  status: 'pending' | 'executing' | 'completed' | 'failed';
}

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  color: string;
  currentOperation?: string;
  queriesExecuted: number;
  entitiesCreated: number;
  relationsFound: number;
}

interface MemoryMetrics {
  totalEntities: number;
  totalRelations: number;
  schemaCompliance: number;
  queryPerformance: number;
  reasoningAccuracy: number;
  indexEfficiency: number;
}

const INITIAL_ENTITIES: Entity[] = [
  {
    id: 'entity-1',
    type: 'person',
    name: 'Alice Johnson',
    attributes: {
      role: 'Product Manager',
      department: 'Engineering',
      skills: ['Project Management', 'Agile', 'Data Analysis'],
      experience: 5
    },
    relations: [],
    metadata: {
      created: Date.now() - 86400000,
      updated: Date.now() - 3600000,
      accessCount: 12,
      confidence: 0.95
    }
  },
  {
    id: 'entity-2',
    type: 'organization',
    name: 'TechCorp Inc',
    attributes: {
      industry: 'Technology',
      size: 'Enterprise',
      founded: 2015,
      revenue: 500000000
    },
    relations: [],
    metadata: {
      created: Date.now() - 172800000,
      updated: Date.now() - 7200000,
      accessCount: 25,
      confidence: 1.0
    }
  },
  {
    id: 'entity-3',
    type: 'product',
    name: 'DataFlow Platform',
    attributes: {
      version: '3.0',
      category: 'Analytics',
      features: ['Real-time processing', 'ML integration', 'Cloud-native'],
      pricing: 'Enterprise'
    },
    relations: [],
    metadata: {
      created: Date.now() - 259200000,
      updated: Date.now() - 14400000,
      accessCount: 18,
      confidence: 0.92
    }
  },
  {
    id: 'entity-4',
    type: 'location',
    name: 'San Francisco HQ',
    attributes: {
      address: '100 Market St',
      city: 'San Francisco',
      country: 'USA',
      capacity: 500,
      type: 'Headquarters'
    },
    relations: [],
    metadata: {
      created: Date.now() - 345600000,
      updated: Date.now() - 86400000,
      accessCount: 8,
      confidence: 1.0
    }
  },
  {
    id: 'entity-5',
    type: 'event',
    name: 'Q4 Product Launch',
    attributes: {
      date: '2024-10-15',
      type: 'Product Launch',
      attendees: 250,
      status: 'Scheduled',
      venue: 'Virtual + SF HQ'
    },
    relations: [],
    metadata: {
      created: Date.now() - 432000000,
      updated: Date.now() - 172800000,
      accessCount: 15,
      confidence: 0.88
    }
  }
];

const INITIAL_RELATIONS: Relation[] = [
  {
    id: 'rel-1',
    type: 'works_for',
    from: 'entity-1',
    to: 'entity-2',
    properties: { since: '2019', position: 'Senior PM' },
    strength: 0.95
  },
  {
    id: 'rel-2',
    type: 'owns',
    from: 'entity-2',
    to: 'entity-3',
    properties: { acquired: '2020', investment: '50M' },
    strength: 1.0
  },
  {
    id: 'rel-3',
    type: 'located_in',
    from: 'entity-2',
    to: 'entity-4',
    properties: { primary: true },
    strength: 0.9
  },
  {
    id: 'rel-4',
    type: 'related_to',
    from: 'entity-5',
    to: 'entity-3',
    properties: { role: 'launching' },
    strength: 0.85
  },
  {
    id: 'rel-5',
    type: 'part_of',
    from: 'entity-1',
    to: 'entity-5',
    properties: { role: 'organizer' },
    strength: 0.8
  }
];

const SCHEMAS: Schema[] = [
  {
    name: 'Person',
    fields: [
      { name: 'name', type: 'string', required: true, indexed: true },
      { name: 'role', type: 'string', required: true, indexed: true },
      { name: 'department', type: 'string', required: false, indexed: true },
      { name: 'skills', type: 'array', required: false, indexed: false },
      { name: 'experience', type: 'number', required: false, indexed: false }
    ],
    constraints: ['name must be unique', 'experience >= 0'],
    indexes: ['name', 'role', 'department']
  },
  {
    name: 'Organization',
    fields: [
      { name: 'name', type: 'string', required: true, indexed: true },
      { name: 'industry', type: 'string', required: true, indexed: true },
      { name: 'size', type: 'string', required: false, indexed: false },
      { name: 'founded', type: 'number', required: false, indexed: true },
      { name: 'revenue', type: 'number', required: false, indexed: false }
    ],
    constraints: ['name must be unique', 'founded > 1900'],
    indexes: ['name', 'industry', 'founded']
  }
];

const AGENTS: Agent[] = [
  {
    id: 'agent-kb',
    name: 'Knowledge Builder',
    role: 'Entity & Relation Creation',
    icon: '🏗️',
    color: 'text-blue-400',
    queriesExecuted: 0,
    entitiesCreated: 0,
    relationsFound: 0
  },
  {
    id: 'agent-query',
    name: 'Query Processor',
    role: 'Structured Query Execution',
    icon: '🔍',
    color: 'text-green-400',
    queriesExecuted: 0,
    entitiesCreated: 0,
    relationsFound: 0
  },
  {
    id: 'agent-reason',
    name: 'Reasoning Engine',
    role: 'Symbolic Reasoning & Inference',
    icon: '🧠',
    color: 'text-purple-400',
    queriesExecuted: 0,
    entitiesCreated: 0,
    relationsFound: 0
  },
  {
    id: 'agent-validator',
    name: 'Schema Validator',
    role: 'Data Integrity & Compliance',
    icon: '✅',
    color: 'text-yellow-400',
    queriesExecuted: 0,
    entitiesCreated: 0,
    relationsFound: 0
  }
];

const SAMPLE_QUERIES = [
  {
    type: 'cypher',
    query: 'MATCH (p:Person)-[:WORKS_FOR]->(o:Organization) WHERE o.industry = "Technology" RETURN p.name, o.name',
    description: 'Find all people working for tech companies'
  },
  {
    type: 'sparql',
    query: 'SELECT ?person ?skill WHERE { ?person :hasSkill ?skill . ?person :worksFor ?org . ?org :industry "Technology" }',
    description: 'Get skills of people in tech industry'
  },
  {
    type: 'graphql',
    query: '{ organizations(industry: "Technology") { name employees { name role skills } products { name version } } }',
    description: 'Fetch tech organizations with employees and products'
  },
  {
    type: 'sql',
    query: 'SELECT e.name, r.type, o.name FROM entities e JOIN relations r ON e.id = r.from JOIN entities o ON r.to = o.id',
    description: 'List all entity relationships'
  }
];

export default function ContextualStructuredMemoryDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [entities, setEntities] = useState<Entity[]>(INITIAL_ENTITIES);
  const [relations, setRelations] = useState<Relation[]>(INITIAL_RELATIONS);
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [queries, setQueries] = useState<Query[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [selectedSchema, setSelectedSchema] = useState<Schema>(SCHEMAS[0]);
  const [metrics, setMetrics] = useState<MemoryMetrics>({
    totalEntities: INITIAL_ENTITIES.length,
    totalRelations: INITIAL_RELATIONS.length,
    schemaCompliance: 0.95,
    queryPerformance: 0.88,
    reasoningAccuracy: 0.92,
    indexEfficiency: 0.85
  });
  const [logs, setLogs] = useState<Array<{ timestamp: string; type: string; message: string }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const addLog = useCallback((type: string, message: string) => {
    setLogs(prev => [...prev.slice(-9), {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    }]);
  }, []);

  const drawKnowledgeGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, rect.width, rect.height);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.35;

    // Draw relations as edges
    relations.forEach(relation => {
      const fromEntity = entities.find(e => e.id === relation.from);
      const toEntity = entities.find(e => e.id === relation.to);

      if (fromEntity && toEntity) {
        const fromIndex = entities.indexOf(fromEntity);
        const toIndex = entities.indexOf(toEntity);

        const fromAngle = (fromIndex / entities.length) * Math.PI * 2;
        const toAngle = (toIndex / entities.length) * Math.PI * 2;

        const fromX = centerX + Math.cos(fromAngle) * radius;
        const fromY = centerY + Math.sin(fromAngle) * radius;
        const toX = centerX + Math.cos(toAngle) * radius;
        const toY = centerY + Math.sin(toAngle) * radius;

        // Draw edge
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = `rgba(139, 92, 246, ${relation.strength * 0.5})`;
        ctx.lineWidth = relation.strength * 3;
        ctx.stroke();

        // Draw relation type label
        const midX = (fromX + toX) / 2;
        const midY = (fromY + toY) / 2;

        ctx.fillStyle = 'rgba(17, 24, 39, 0.9)';
        ctx.fillRect(midX - 30, midY - 8, 60, 16);

        ctx.fillStyle = '#9ca3af';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(relation.type.replace('_', ' '), midX, midY);
      }
    });

    // Draw entities as nodes
    entities.forEach((entity, index) => {
      const angle = (index / entities.length) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // Node size based on access count
      const nodeRadius = 15 + Math.log(entity.metadata.accessCount + 1) * 3;

      // Draw node
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);

      // Color based on entity type
      const colors = {
        person: '#60a5fa',
        organization: '#34d399',
        product: '#f59e0b',
        location: '#a78bfa',
        event: '#f87171',
        concept: '#fbbf24'
      };

      ctx.fillStyle = colors[entity.type] || '#9ca3af';
      ctx.fill();

      // Draw confidence ring
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius + 3, 0, Math.PI * 2 * entity.metadata.confidence);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw entity name
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(entity.name, x, y - nodeRadius - 5);

      // Draw entity type
      ctx.fillStyle = '#9ca3af';
      ctx.font = '10px sans-serif';
      ctx.textBaseline = 'top';
      ctx.fillText(entity.type, x, y + nodeRadius + 5);
    });

    // Draw metrics
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Entities: ${entities.length}`, 10, 20);
    ctx.fillText(`Relations: ${relations.length}`, 10, 35);
    ctx.fillText(`Compliance: ${(metrics.schemaCompliance * 100).toFixed(0)}%`, 10, 50);
  }, [entities, relations, metrics]);

  useEffect(() => {
    const animate = () => {
      drawKnowledgeGraph();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drawKnowledgeGraph]);

  const executeQuery = useCallback(async (queryTemplate: any) => {
    const query: Query = {
      id: `query-${Date.now()}`,
      type: queryTemplate.type,
      query: queryTemplate.query,
      timestamp: Date.now(),
      executionTime: 0,
      resultCount: 0,
      status: 'pending'
    };

    setQueries(prev => [...prev, query]);
    addLog('query', `Executing ${query.type.toUpperCase()} query`);

    // Update agent
    const queryAgent = agents.find(a => a.id === 'agent-query');
    if (queryAgent) {
      setAgents(prev => prev.map(a =>
        a.id === 'agent-query'
          ? { ...a, currentOperation: 'Executing query...', queriesExecuted: a.queriesExecuted + 1 }
          : a
      ));
    }

    // Simulate query execution
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    setQueries(prev => prev.map(q =>
      q.id === query.id
        ? { ...q, status: 'executing' }
        : q
    ));

    await new Promise(resolve => setTimeout(resolve, 2000 / speed));

    // Simulate results
    const resultCount = Math.floor(Math.random() * 10) + 1;
    const executionTime = Math.random() * 100 + 20;

    setQueries(prev => prev.map(q =>
      q.id === query.id
        ? { ...q, status: 'completed', resultCount, executionTime }
        : q
    ));

    addLog('result', `Query completed: ${resultCount} results in ${executionTime.toFixed(0)}ms`);

    // Clear agent operation
    setAgents(prev => prev.map(a =>
      a.id === 'agent-query'
        ? { ...a, currentOperation: undefined }
        : a
    ));

    // Update metrics
    setMetrics(prev => ({
      ...prev,
      queryPerformance: Math.min(1, prev.queryPerformance + (Math.random() * 0.02 - 0.01))
    }));
  }, [agents, speed, addLog]);

  const createNewEntity = useCallback(async () => {
    const types = ['person', 'product', 'event', 'concept'];
    const names = ['Bob Smith', 'Analytics Tool', 'Team Meeting', 'Innovation Strategy'];
    const randomIndex = Math.floor(Math.random() * types.length);

    const newEntity: Entity = {
      id: `entity-${Date.now()}`,
      type: types[randomIndex] as any,
      name: names[randomIndex],
      attributes: {
        created: 'Auto-generated',
        category: types[randomIndex]
      },
      relations: [],
      metadata: {
        created: Date.now(),
        updated: Date.now(),
        accessCount: 0,
        confidence: Math.random() * 0.3 + 0.7
      }
    };

    addLog('create', `Creating new ${newEntity.type}: ${newEntity.name}`);

    // Update agent
    setAgents(prev => prev.map(a =>
      a.id === 'agent-kb'
        ? { ...a, currentOperation: 'Creating entity...', entitiesCreated: a.entitiesCreated + 1 }
        : a
    ));

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    setEntities(prev => [...prev, newEntity]);

    // Create random relation
    if (entities.length > 0) {
      const randomEntity = entities[Math.floor(Math.random() * entities.length)];
      const relationTypes = ['related_to', 'depends_on', 'part_of'];
      const randomRelationType = relationTypes[Math.floor(Math.random() * relationTypes.length)];

      const newRelation: Relation = {
        id: `rel-${Date.now()}`,
        type: randomRelationType as any,
        from: newEntity.id,
        to: randomEntity.id,
        properties: { automated: true },
        strength: Math.random() * 0.5 + 0.5
      };

      setRelations(prev => [...prev, newRelation]);

      setAgents(prev => prev.map(a =>
        a.id === 'agent-kb'
          ? { ...a, relationsFound: a.relationsFound + 1 }
          : a
      ));

      addLog('relation', `Created relation: ${newEntity.name} ${randomRelationType} ${randomEntity.name}`);
    }

    // Clear agent operation
    setAgents(prev => prev.map(a =>
      a.id === 'agent-kb'
        ? { ...a, currentOperation: undefined }
        : a
    ));

    // Update metrics
    setMetrics(prev => ({
      ...prev,
      totalEntities: prev.totalEntities + 1,
      totalRelations: prev.totalRelations + (entities.length > 0 ? 1 : 0)
    }));
  }, [entities, speed, addLog]);

  const performReasoning = useCallback(async () => {
    addLog('reason', 'Performing symbolic reasoning...');

    setAgents(prev => prev.map(a =>
      a.id === 'agent-reason'
        ? { ...a, currentOperation: 'Reasoning...' }
        : a
    ));

    await new Promise(resolve => setTimeout(resolve, 2000 / speed));

    // Find inference patterns
    const inferences = [];

    // Transitive relations
    relations.forEach(r1 => {
      relations.forEach(r2 => {
        if (r1.to === r2.from && r1.from !== r2.to) {
          const existingRelation = relations.find(r =>
            r.from === r1.from && r.to === r2.to
          );

          if (!existingRelation) {
            inferences.push(`Inferred: ${r1.from} -> ${r2.to} (transitive)`);
          }
        }
      });
    });

    if (inferences.length > 0) {
      addLog('inference', inferences[0]);
    } else {
      addLog('inference', 'No new inferences found');
    }

    setAgents(prev => prev.map(a =>
      a.id === 'agent-reason'
        ? { ...a, currentOperation: undefined }
        : a
    ));

    setMetrics(prev => ({
      ...prev,
      reasoningAccuracy: Math.min(1, prev.reasoningAccuracy + (Math.random() * 0.02 - 0.01))
    }));
  }, [relations, speed, addLog]);

  const validateSchema = useCallback(async () => {
    addLog('validate', 'Validating schema compliance...');

    setAgents(prev => prev.map(a =>
      a.id === 'agent-validator'
        ? { ...a, currentOperation: 'Validating...' }
        : a
    ));

    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    let violations = 0;
    entities.forEach(entity => {
      const schema = SCHEMAS.find(s =>
        s.name.toLowerCase() === entity.type
      );

      if (schema) {
        schema.fields.forEach(field => {
          if (field.required && !entity.attributes[field.name]) {
            violations++;
          }
        });
      }
    });

    const compliance = Math.max(0, 1 - (violations / (entities.length * 3)));

    addLog('compliance', `Schema compliance: ${(compliance * 100).toFixed(0)}% (${violations} violations)`);

    setAgents(prev => prev.map(a =>
      a.id === 'agent-validator'
        ? { ...a, currentOperation: undefined }
        : a
    ));

    setMetrics(prev => ({
      ...prev,
      schemaCompliance: compliance
    }));
  }, [entities, speed, addLog]);

  const runSimulation = useCallback(async () => {
    const operations = [
      () => executeQuery(SAMPLE_QUERIES[Math.floor(Math.random() * SAMPLE_QUERIES.length)]),
      () => createNewEntity(),
      () => performReasoning(),
      () => validateSchema()
    ];

    const operation = operations[Math.floor(Math.random() * operations.length)];
    await operation();
  }, [executeQuery, createNewEntity, performReasoning, validateSchema]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        runSimulation();
      }, 4000 / speed);

      return () => clearInterval(interval);
    }
  }, [isRunning, speed, runSimulation]);

  const getEntityIcon = (type: string) => {
    const icons = {
      person: '👤',
      organization: '🏢',
      product: '📦',
      location: '📍',
      event: '📅',
      concept: '💡'
    };
    return icons[type as keyof typeof icons] || '📄';
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Contextual Structured Memory (CSM) Demo</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Speed:</label>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={3}>3x</option>
              </select>
            </div>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>

            <button
              onClick={() => {
                setEntities(INITIAL_ENTITIES);
                setRelations(INITIAL_RELATIONS);
                setQueries([]);
                setLogs([]);
                setIsRunning(false);
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Knowledge Graph Visualization */}
          <div className="col-span-7">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  Knowledge Graph
                </h4>
                <div className="flex items-center gap-4 text-xs">
                  {Object.entries({ person: '👤', organization: '🏢', product: '📦', location: '📍', event: '📅' }).map(([type, icon]) => (
                    <div key={type} className="flex items-center gap-1">
                      <span>{icon}</span>
                      <span className="text-gray-400 capitalize">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
              <canvas
                ref={canvasRef}
                className="w-full h-64 bg-gray-900 rounded"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>

            {/* Entity Browser */}
            <div className="mt-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-white">Entity Browser</h4>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    className="bg-gray-700 text-white px-2 py-1 rounded text-xs"
                    onChange={(e) => {
                      if (e.target.value) {
                        setSelectedEntity(entities.find(entity => entity.id === e.target.value) || null);
                      } else {
                        setSelectedEntity(null);
                      }
                    }}
                  >
                    <option value="">Select entity...</option>
                    {entities.map(entity => (
                      <option key={entity.id} value={entity.id}>
                        {getEntityIcon(entity.type)} {entity.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedEntity ? (
                <div className="space-y-3">
                  <div className="bg-gray-900 rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getEntityIcon(selectedEntity.type)}</span>
                      <div>
                        <div className="text-sm font-semibold text-white">{selectedEntity.name}</div>
                        <div className="text-xs text-gray-400 capitalize">{selectedEntity.type}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Attributes</div>
                        <div className="text-xs space-y-1">
                          {Object.entries(selectedEntity.attributes).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-400">{key}:</span>
                              <span className="text-white">
                                {Array.isArray(value) ? value.join(', ') : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 mb-1">Metadata</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-400">Access Count:</span>
                            <span className="text-white ml-1">{selectedEntity.metadata.accessCount}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Confidence:</span>
                            <span className="text-green-400 ml-1">
                              {(selectedEntity.metadata.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 mb-1">Relations</div>
                        <div className="space-y-1">
                          {relations
                            .filter(r => r.from === selectedEntity.id || r.to === selectedEntity.id)
                            .map(relation => {
                              const otherEntityId = relation.from === selectedEntity.id ? relation.to : relation.from;
                              const otherEntity = entities.find(e => e.id === otherEntityId);
                              const direction = relation.from === selectedEntity.id ? '→' : '←';

                              return (
                                <div key={relation.id} className="text-xs flex items-center gap-2">
                                  <span className="text-purple-400">{direction}</span>
                                  <span className="text-gray-400">{relation.type.replace('_', ' ')}</span>
                                  <span className="text-white">{otherEntity?.name || 'Unknown'}</span>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Box className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">Select an entity to view details</div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-5 space-y-4">
            {/* Agents */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-3">Memory Agents</h4>
              <div className="grid grid-cols-2 gap-3">
                {agents.map(agent => (
                  <div key={agent.id} className="bg-gray-900 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{agent.icon}</span>
                        <div>
                          <div className={`text-xs font-semibold ${agent.color}`}>
                            {agent.name}
                          </div>
                          <div className="text-xs text-gray-500">{agent.role}</div>
                        </div>
                      </div>
                      {agent.currentOperation && (
                        <Activity className="w-3 h-3 text-yellow-400 animate-pulse" />
                      )}
                    </div>
                    {agent.currentOperation && (
                      <div className="text-xs text-yellow-400 mb-2">{agent.currentOperation}</div>
                    )}
                    <div className="grid grid-cols-3 gap-1 text-xs">
                      <div className="text-center">
                        <div className="text-gray-500">Queries</div>
                        <div className="text-white">{agent.queriesExecuted}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-500">Entities</div>
                        <div className="text-white">{agent.entitiesCreated}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-500">Relations</div>
                        <div className="text-white">{agent.relationsFound}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schema Info */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <FileJson className="w-4 h-4" />
                Schema Definition
              </h4>
              <select
                value={selectedSchema.name}
                onChange={(e) => setSelectedSchema(SCHEMAS.find(s => s.name === e.target.value) || SCHEMAS[0])}
                className="w-full bg-gray-700 text-white px-2 py-1 rounded text-xs mb-3"
              >
                {SCHEMAS.map(schema => (
                  <option key={schema.name} value={schema.name}>{schema.name}</option>
                ))}
              </select>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Fields</div>
                  <div className="space-y-1">
                    {selectedSchema.fields.map(field => (
                      <div key={field.name} className="text-xs flex items-center justify-between">
                        <span className="text-gray-300">
                          {field.name}
                          {field.required && <span className="text-red-400 ml-1">*</span>}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">{field.type}</span>
                          {field.indexed && <Hash className="w-3 h-3 text-yellow-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Constraints</div>
                  <div className="space-y-1">
                    {selectedSchema.constraints.map((constraint, idx) => (
                      <div key={idx} className="text-xs text-gray-400">• {constraint}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                System Metrics
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500">Total Entities</div>
                  <div className="text-lg font-semibold text-white">{metrics.totalEntities}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Total Relations</div>
                  <div className="text-lg font-semibold text-white">{metrics.totalRelations}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Schema Compliance</div>
                  <div className="text-lg font-semibold text-green-400">
                    {(metrics.schemaCompliance * 100).toFixed(0)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Query Performance</div>
                  <div className="text-lg font-semibold text-blue-400">
                    {(metrics.queryPerformance * 100).toFixed(0)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Reasoning Accuracy</div>
                  <div className="text-lg font-semibold text-purple-400">
                    {(metrics.reasoningAccuracy * 100).toFixed(0)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Index Efficiency</div>
                  <div className="text-lg font-semibold text-yellow-400">
                    {(metrics.indexEfficiency * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Query Log */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Recent Queries
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {queries.slice(-3).reverse().map(query => (
                  <div key={query.id} className="text-xs bg-gray-900 rounded p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-purple-400 font-mono">{query.type.toUpperCase()}</span>
                      <span className={`${
                        query.status === 'completed' ? 'text-green-400' :
                        query.status === 'executing' ? 'text-yellow-400' :
                        query.status === 'failed' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {query.status === 'completed' && <CheckCircle className="w-3 h-3 inline" />}
                        {query.status}
                      </span>
                    </div>
                    {query.status === 'completed' && (
                      <div className="text-gray-400">
                        {query.resultCount} results in {query.executionTime.toFixed(0)}ms
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Operation Log */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 max-h-48 overflow-y-auto">
              <h4 className="text-sm font-semibold text-white mb-3">Operation Log</h4>
              <div className="space-y-1 font-mono text-xs">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-600">{log.timestamp}</span>
                    <span className={`font-semibold ${
                      log.type === 'create' ? 'text-green-400' :
                      log.type === 'query' ? 'text-blue-400' :
                      log.type === 'relation' ? 'text-purple-400' :
                      log.type === 'reason' ? 'text-yellow-400' :
                      log.type === 'validate' ? 'text-cyan-400' :
                      'text-gray-400'
                    }`}>
                      [{log.type.toUpperCase()}]
                    </span>
                    <span className="text-gray-300">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}