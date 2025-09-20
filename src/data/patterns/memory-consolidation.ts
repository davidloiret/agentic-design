import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const memoryConsolidationPattern: PatternScenario = {
  id: 'memory-consolidation',
  title: 'Memory Consolidation',
  description: 'Engine for processing raw memories through pattern analysis, compression, abstraction, and integration into structured knowledge schemas with quality control and storage optimization.',
  initialNodes: [
    {
      id: 'raw-memories',
      position: { x: 400, y: 50 },
      data: { label: '🧠 Raw Memories\nStream of experiences and interactions' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 350 },
    },
    // Consolidation Core
    {
      id: 'consolidation-engine',
      position: { x: 375, y: 150 },
      data: { label: '⚙️ Consolidation Engine\nMemory processing & optimization' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // Pattern Extraction
    {
      id: 'pattern-analyzer',
      position: { x: 100, y: 250 },
      data: { label: '🔍 Pattern Analyzer\nRecurring patterns\nThematic clusters' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'similarity-detector',
      position: { x: 300, y: 250 },
      data: { label: '🎯 Similarity Detector\nSemantic matching\nStructural similarity' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'redundancy-filter',
      position: { x: 500, y: 250 },
      data: { label: '🔄 Redundancy Filter\nDuplicate detection\nMemory merging' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'importance-scorer',
      position: { x: 700, y: 250 },
      data: { label: '⭐ Importance Scorer\nRelevance weighting\nUtility assessment' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    // Memory Components
    {
      id: 'episodic-fragments',
      position: { x: 50, y: 380 },
      data: { label: '📅 Episodic Fragments\nSpecific events\nTime-stamped' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'semantic-concepts',
      position: { x: 220, y: 380 },
      data: { label: '💡 Semantic Concepts\nAbstract knowledge\nGeneral principles' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'procedural-patterns',
      position: { x: 390, y: 380 },
      data: { label: '⚡ Procedural Patterns\nAction sequences\nSkilled behaviors' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'emotional-tags',
      position: { x: 560, y: 380 },
      data: { label: '❤️ Emotional Tags\nAffective markers\nSalience indicators' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'contextual-links',
      position: { x: 730, y: 380 },
      data: { label: '🔗 Contextual Links\nAssociations\nRelationships' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Consolidation Process
    {
      id: 'compression-stage',
      position: { x: 100, y: 520 },
      data: { label: '🗜️ Compression\nReduce redundancy\nMerge similar' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'abstraction-stage',
      position: { x: 280, y: 520 },
      data: { label: '📐 Abstraction\nExtract principles\nGeneralize patterns' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'integration-stage',
      position: { x: 460, y: 520 },
      data: { label: '🧩 Integration\nConnect knowledge\nBuild schemas' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'prioritization-stage',
      position: { x: 640, y: 520 },
      data: { label: '📊 Prioritization\nRank by importance\nAllocate resources' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    // Schema Formation
    {
      id: 'conceptual-schemas',
      position: { x: 50, y: 640 },
      data: { label: '🏗️ Conceptual Schemas\nOrganized frameworks\nMental models' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'narrative-structures',
      position: { x: 250, y: 640 },
      data: { label: '📖 Narrative Structures\nCoherent stories\nCausal chains' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'knowledge-graphs',
      position: { x: 450, y: 640 },
      data: { label: '🕸️ Knowledge Graphs\nInterconnected facts\nRelational networks' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'skill-hierarchies',
      position: { x: 650, y: 640 },
      data: { label: '🎯 Skill Hierarchies\nLayered abilities\nCompetency trees' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Storage Optimization
    {
      id: 'fast-retrieval',
      position: { x: 100, y: 760 },
      data: { label: '⚡ Fast Retrieval\nIndexed access\nCached patterns' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'sparse-encoding',
      position: { x: 280, y: 760 },
      data: { label: '💾 Sparse Encoding\nEfficient storage\nCompressed format' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'associative-links',
      position: { x: 460, y: 760 },
      data: { label: '🔀 Associative Links\nCross-references\nRetrieval cues' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'decay-management',
      position: { x: 640, y: 760 },
      data: { label: '📉 Decay Management\nForgetting curve\nRefresh cycles' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    // Quality Control
    {
      id: 'coherence-check',
      position: { x: 150, y: 880 },
      data: { label: '✅ Coherence Check\nConsistency validation' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'completeness-verify',
      position: { x: 320, y: 880 },
      data: { label: '📋 Completeness\nGap detection' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'accuracy-assessment',
      position: { x: 490, y: 880 },
      data: { label: '🎯 Accuracy\nError correction' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'utility-evaluation',
      position: { x: 660, y: 880 },
      data: { label: '💡 Utility\nUsefulness scoring' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'consolidated-memory',
      position: { x: 400, y: 1000 },
      data: { label: '✨ Consolidated Memory\nOptimized, structured, and accessible knowledge base' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Input to engine
    {
      id: 'raw-engine',
      source: 'raw-memories',
      target: 'consolidation-engine',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // Engine to analyzers
    {
      id: 'engine-pattern',
      source: 'consolidation-engine',
      target: 'pattern-analyzer',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Analyze',
    },
    {
      id: 'engine-similarity',
      source: 'consolidation-engine',
      target: 'similarity-detector',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Detect',
    },
    {
      id: 'engine-redundancy',
      source: 'consolidation-engine',
      target: 'redundancy-filter',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Filter',
    },
    {
      id: 'engine-importance',
      source: 'consolidation-engine',
      target: 'importance-scorer',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Score',
    },
    // Pattern extraction to components
    {
      id: 'pattern-episodic',
      source: 'pattern-analyzer',
      target: 'episodic-fragments',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'pattern-semantic',
      source: 'pattern-analyzer',
      target: 'semantic-concepts',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'similarity-procedural',
      source: 'similarity-detector',
      target: 'procedural-patterns',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'importance-emotional',
      source: 'importance-scorer',
      target: 'emotional-tags',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'redundancy-contextual',
      source: 'redundancy-filter',
      target: 'contextual-links',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // Components to consolidation stages
    {
      id: 'episodic-compression',
      source: 'episodic-fragments',
      target: 'compression-stage',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'semantic-abstraction',
      source: 'semantic-concepts',
      target: 'abstraction-stage',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'procedural-integration',
      source: 'procedural-patterns',
      target: 'integration-stage',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'emotional-prioritization',
      source: 'emotional-tags',
      target: 'prioritization-stage',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'contextual-integration',
      source: 'contextual-links',
      target: 'integration-stage',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Stages to schemas
    {
      id: 'compression-conceptual',
      source: 'compression-stage',
      target: 'conceptual-schemas',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'abstraction-narrative',
      source: 'abstraction-stage',
      target: 'narrative-structures',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'integration-knowledge',
      source: 'integration-stage',
      target: 'knowledge-graphs',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'prioritization-skill',
      source: 'prioritization-stage',
      target: 'skill-hierarchies',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    // Schemas to storage
    {
      id: 'conceptual-fast',
      source: 'conceptual-schemas',
      target: 'fast-retrieval',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'narrative-sparse',
      source: 'narrative-structures',
      target: 'sparse-encoding',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'knowledge-associative',
      source: 'knowledge-graphs',
      target: 'associative-links',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'skill-decay',
      source: 'skill-hierarchies',
      target: 'decay-management',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // Storage to quality
    {
      id: 'fast-coherence',
      source: 'fast-retrieval',
      target: 'coherence-check',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'sparse-completeness',
      source: 'sparse-encoding',
      target: 'completeness-verify',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'associative-accuracy',
      source: 'associative-links',
      target: 'accuracy-assessment',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'decay-utility',
      source: 'decay-management',
      target: 'utility-evaluation',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Quality to output
    {
      id: 'coherence-output',
      source: 'coherence-check',
      target: 'consolidated-memory',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'completeness-output',
      source: 'completeness-verify',
      target: 'consolidated-memory',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'accuracy-output',
      source: 'accuracy-assessment',
      target: 'consolidated-memory',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'utility-output',
      source: 'utility-evaluation',
      target: 'consolidated-memory',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
    // Feedback loop
    {
      id: 'consolidated-feedback',
      source: 'consolidated-memory',
      target: 'consolidation-engine',
      style: { ...edgeStyle, stroke: '#10b981', strokeDasharray: '5 5' },
      label: 'Feedback',
    },
  ],
  steps: [
    {
      title: 'Raw Memory Input',
      description: 'Stream of experiences and interactions arrives',
      activeNodes: ['raw-memories', 'consolidation-engine'],
      activeEdges: ['raw-engine'],
    },
    {
      title: 'Memory Analysis',
      description: 'Analyzing patterns, similarity, redundancy, and importance',
      activeNodes: ['consolidation-engine', 'pattern-analyzer', 'similarity-detector', 'redundancy-filter', 'importance-scorer'],
      activeEdges: ['engine-pattern', 'engine-similarity', 'engine-redundancy', 'engine-importance'],
    },
    {
      title: 'Component Extraction',
      description: 'Breaking down into episodic, semantic, procedural, and emotional components',
      activeNodes: ['episodic-fragments', 'semantic-concepts', 'procedural-patterns', 'emotional-tags', 'contextual-links'],
      activeEdges: ['pattern-episodic', 'pattern-semantic', 'similarity-procedural', 'importance-emotional', 'redundancy-contextual'],
    },
    {
      title: 'Consolidation Processing',
      description: 'Compression, abstraction, integration, and prioritization',
      activeNodes: ['compression-stage', 'abstraction-stage', 'integration-stage', 'prioritization-stage'],
      activeEdges: ['episodic-compression', 'semantic-abstraction', 'procedural-integration', 'emotional-prioritization', 'contextual-integration'],
    },
    {
      title: 'Schema Formation',
      description: 'Building conceptual schemas, narratives, knowledge graphs, and skill hierarchies',
      activeNodes: ['conceptual-schemas', 'narrative-structures', 'knowledge-graphs', 'skill-hierarchies'],
      activeEdges: ['compression-conceptual', 'abstraction-narrative', 'integration-knowledge', 'prioritization-skill'],
    },
    {
      title: 'Storage Optimization',
      description: 'Optimizing for fast retrieval, sparse encoding, and associative access',
      activeNodes: ['fast-retrieval', 'sparse-encoding', 'associative-links', 'decay-management'],
      activeEdges: ['conceptual-fast', 'narrative-sparse', 'knowledge-associative', 'skill-decay'],
    },
    {
      title: 'Quality Control',
      description: 'Checking coherence, completeness, accuracy, and utility',
      activeNodes: ['coherence-check', 'completeness-verify', 'accuracy-assessment', 'utility-evaluation'],
      activeEdges: ['fast-coherence', 'sparse-completeness', 'associative-accuracy', 'decay-utility'],
    },
    {
      title: 'Consolidated Output',
      description: 'Final consolidated memory ready for long-term storage',
      activeNodes: ['coherence-check', 'completeness-verify', 'accuracy-assessment', 'utility-evaluation', 'consolidated-memory'],
      activeEdges: ['coherence-output', 'completeness-output', 'accuracy-output', 'utility-output'],
    },
    {
      title: 'Feedback Loop',
      description: 'Learning from consolidation effectiveness',
      activeNodes: ['consolidated-memory', 'consolidation-engine'],
      activeEdges: ['consolidated-feedback'],
    },
  ],
};