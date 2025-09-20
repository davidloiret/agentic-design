import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextualStructuredMemoryPattern: PatternScenario = {
  id: 'contextual-structured-memory',
  title: 'Contextual Structured Memory',
  description: 'Schema-based memory organization system that stores information in predefined structures with relationships, indexes, and metadata for efficient querying and contextual retrieval.',
  initialNodes: [
    {
      id: 'multi-agent-query',
      position: { x: 400, y: 50 },
      data: { label: '🤖 Multi-Agent Query\n"Find all customer interactions with pricing concerns in Q3"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 420 },
    },
    // Memory System Core
    {
      id: 'structured-memory-core',
      position: { x: 375, y: 150 },
      data: { label: '🧠 Structured Memory Core\nSchema-based organization' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // Memory Schemas
    {
      id: 'entity-schema',
      position: { x: 100, y: 250 },
      data: { label: '👤 Entity Schema\nCustomers, Agents\nProducts, Services' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'event-schema',
      position: { x: 300, y: 250 },
      data: { label: '📅 Event Schema\nInteractions, Transactions\nTimestamped activities' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'relation-schema',
      position: { x: 500, y: 250 },
      data: { label: '🔗 Relation Schema\nEntity relationships\nCausal connections' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'context-schema',
      position: { x: 700, y: 250 },
      data: { label: '🌐 Context Schema\nEnvironment state\nBusiness rules' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    // Structured Storage
    {
      id: 'graph-database',
      position: { x: 50, y: 380 },
      data: { label: '🕸️ Graph Database\nNodes & edges\nNeo4j/Neptune' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'document-store',
      position: { x: 220, y: 380 },
      data: { label: '📄 Document Store\nJSON/BSON docs\nMongoDB/Cosmos' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'time-series-db',
      position: { x: 390, y: 380 },
      data: { label: '📈 Time-Series DB\nTemporal data\nInfluxDB/Timescale' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'vector-store',
      position: { x: 560, y: 380 },
      data: { label: '🎯 Vector Store\nEmbeddings\nPinecone/Weaviate' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'knowledge-graph',
      position: { x: 730, y: 380 },
      data: { label: '🧬 Knowledge Graph\nOntologies\nRDF/OWL' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Query Processing
    {
      id: 'query-parser',
      position: { x: 100, y: 520 },
      data: { label: '🔍 Query Parser\nNL to structured query' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'schema-mapper',
      position: { x: 280, y: 520 },
      data: { label: '🗺️ Schema Mapper\nQuery to schema mapping' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'context-resolver',
      position: { x: 460, y: 520 },
      data: { label: '🎯 Context Resolver\nResolve ambiguities' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'query-optimizer',
      position: { x: 640, y: 520 },
      data: { label: '⚡ Query Optimizer\nExecution planning' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    // Symbolic Reasoning
    {
      id: 'rule-engine',
      position: { x: 50, y: 640 },
      data: { label: '📐 Rule Engine\nBusiness logic\nInference rules' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'constraint-solver',
      position: { x: 250, y: 640 },
      data: { label: '🔒 Constraint Solver\nValidation rules\nConsistency checks' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'inference-engine',
      position: { x: 450, y: 640 },
      data: { label: '💡 Inference Engine\nDeductive reasoning\nPattern matching' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'semantic-reasoner',
      position: { x: 650, y: 640 },
      data: { label: '🧩 Semantic Reasoner\nOntology-based\nConcept relations' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Query Execution
    {
      id: 'distributed-query',
      position: { x: 100, y: 760 },
      data: { label: '🌍 Distributed Query\nCross-store execution' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'join-processor',
      position: { x: 280, y: 760 },
      data: { label: '🔀 Join Processor\nMulti-source joins' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'aggregation-engine',
      position: { x: 460, y: 760 },
      data: { label: '📊 Aggregation\nSummarization\nGrouping' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'result-formatter',
      position: { x: 640, y: 760 },
      data: { label: '📝 Result Formatter\nStructured output' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    // Memory Management
    {
      id: 'schema-evolution',
      position: { x: 150, y: 880 },
      data: { label: '🔄 Schema Evolution\nVersion management' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'index-optimization',
      position: { x: 350, y: 880 },
      data: { label: '📇 Index Optimization\nQuery performance' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'cache-management',
      position: { x: 550, y: 880 },
      data: { label: '💨 Cache Management\nFrequent queries' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'structured-results',
      position: { x: 400, y: 1000 },
      data: { label: '✨ Structured Results\n15 customer interactions found\nPricing concerns: $2.3M impact\nQ3 2024 | Sorted by severity' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Query to core
    {
      id: 'query-core',
      source: 'multi-agent-query',
      target: 'structured-memory-core',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // Core to schemas
    {
      id: 'core-entity',
      source: 'structured-memory-core',
      target: 'entity-schema',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Define',
    },
    {
      id: 'core-event',
      source: 'structured-memory-core',
      target: 'event-schema',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Define',
    },
    {
      id: 'core-relation',
      source: 'structured-memory-core',
      target: 'relation-schema',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Define',
    },
    {
      id: 'core-context',
      source: 'structured-memory-core',
      target: 'context-schema',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Define',
    },
    // Schemas to storage
    {
      id: 'entity-graph',
      source: 'entity-schema',
      target: 'graph-database',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'event-document',
      source: 'event-schema',
      target: 'document-store',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'event-timeseries',
      source: 'event-schema',
      target: 'time-series-db',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'context-vector',
      source: 'context-schema',
      target: 'vector-store',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'relation-knowledge',
      source: 'relation-schema',
      target: 'knowledge-graph',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // Query processing
    {
      id: 'core-parser',
      source: 'structured-memory-core',
      target: 'query-parser',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'parser-mapper',
      source: 'query-parser',
      target: 'schema-mapper',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'mapper-resolver',
      source: 'schema-mapper',
      target: 'context-resolver',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'resolver-optimizer',
      source: 'context-resolver',
      target: 'query-optimizer',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    // Storage to reasoning
    {
      id: 'graph-rule',
      source: 'graph-database',
      target: 'rule-engine',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'document-constraint',
      source: 'document-store',
      target: 'constraint-solver',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'timeseries-inference',
      source: 'time-series-db',
      target: 'inference-engine',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'knowledge-semantic',
      source: 'knowledge-graph',
      target: 'semantic-reasoner',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Query optimizer to execution
    {
      id: 'optimizer-distributed',
      source: 'query-optimizer',
      target: 'distributed-query',
      style: { ...edgeStyle, stroke: '#ef4444' },
      animated: true,
    },
    {
      id: 'distributed-join',
      source: 'distributed-query',
      target: 'join-processor',
      style: { ...edgeStyle, stroke: '#ef4444' },
      animated: true,
    },
    {
      id: 'join-aggregation',
      source: 'join-processor',
      target: 'aggregation-engine',
      style: { ...edgeStyle, stroke: '#ef4444' },
      animated: true,
    },
    {
      id: 'aggregation-formatter',
      source: 'aggregation-engine',
      target: 'result-formatter',
      style: { ...edgeStyle, stroke: '#ef4444' },
      animated: true,
    },
    // Reasoning to execution
    {
      id: 'rule-distributed',
      source: 'rule-engine',
      target: 'distributed-query',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '3 3' },
    },
    {
      id: 'constraint-join',
      source: 'constraint-solver',
      target: 'join-processor',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '3 3' },
    },
    {
      id: 'inference-aggregation',
      source: 'inference-engine',
      target: 'aggregation-engine',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '3 3' },
    },
    {
      id: 'semantic-formatter',
      source: 'semantic-reasoner',
      target: 'result-formatter',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '3 3' },
    },
    // Management connections
    {
      id: 'entity-evolution',
      source: 'entity-schema',
      target: 'schema-evolution',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
    },
    {
      id: 'graph-index',
      source: 'graph-database',
      target: 'index-optimization',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
    },
    {
      id: 'distributed-cache',
      source: 'distributed-query',
      target: 'cache-management',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
    },
    // Management to results
    {
      id: 'evolution-results',
      source: 'schema-evolution',
      target: 'structured-results',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'index-results',
      source: 'index-optimization',
      target: 'structured-results',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'cache-results',
      source: 'cache-management',
      target: 'structured-results',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    // Formatter to results
    {
      id: 'formatter-results',
      source: 'result-formatter',
      target: 'structured-results',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'Multi-Agent Query',
      description: 'Complex structured query from multiple agents',
      activeNodes: ['multi-agent-query', 'structured-memory-core'],
      activeEdges: ['query-core'],
    },
    {
      title: 'Schema Definition',
      description: 'Organizing memory into structured schemas',
      activeNodes: ['structured-memory-core', 'entity-schema', 'event-schema', 'relation-schema', 'context-schema'],
      activeEdges: ['core-entity', 'core-event', 'core-relation', 'core-context'],
    },
    {
      title: 'Structured Storage',
      description: 'Mapping schemas to specialized storage systems',
      activeNodes: ['entity-schema', 'event-schema', 'relation-schema', 'context-schema', 'graph-database', 'document-store', 'time-series-db', 'vector-store', 'knowledge-graph'],
      activeEdges: ['entity-graph', 'event-document', 'event-timeseries', 'context-vector', 'relation-knowledge'],
    },
    {
      title: 'Query Processing',
      description: 'Parsing and optimizing the structured query',
      activeNodes: ['query-parser', 'schema-mapper', 'context-resolver', 'query-optimizer'],
      activeEdges: ['core-parser', 'parser-mapper', 'mapper-resolver', 'resolver-optimizer'],
    },
    {
      title: 'Symbolic Reasoning',
      description: 'Applying rules and inference on structured data',
      activeNodes: ['rule-engine', 'constraint-solver', 'inference-engine', 'semantic-reasoner'],
      activeEdges: ['graph-rule', 'document-constraint', 'timeseries-inference', 'knowledge-semantic'],
    },
    {
      title: 'Distributed Execution',
      description: 'Executing query across multiple storage systems',
      activeNodes: ['distributed-query', 'graph-database', 'document-store', 'time-series-db', 'knowledge-graph'],
      activeEdges: ['optimizer-distributed'],
    },
    {
      title: 'Join Processing',
      description: 'Joining results from different sources',
      activeNodes: ['distributed-query', 'join-processor', 'constraint-solver'],
      activeEdges: ['distributed-join', 'constraint-join'],
    },
    {
      title: 'Aggregation',
      description: 'Aggregating and summarizing results',
      activeNodes: ['join-processor', 'aggregation-engine', 'inference-engine'],
      activeEdges: ['join-aggregation', 'inference-aggregation'],
    },
    {
      title: 'Result Formatting',
      description: 'Formatting results into structured output',
      activeNodes: ['aggregation-engine', 'result-formatter', 'semantic-reasoner'],
      activeEdges: ['aggregation-formatter', 'semantic-formatter'],
    },
    {
      title: 'Memory Management',
      description: 'Optimizing schemas, indices, and caches',
      activeNodes: ['schema-evolution', 'index-optimization', 'cache-management'],
      activeEdges: ['entity-evolution', 'graph-index', 'distributed-cache'],
    },
    {
      title: 'Structured Results',
      description: 'Delivering precise, interpretable query results',
      activeNodes: ['result-formatter', 'schema-evolution', 'index-optimization', 'cache-management', 'structured-results'],
      activeEdges: ['formatter-results', 'evolution-results', 'index-results', 'cache-results'],
    },
  ],
};