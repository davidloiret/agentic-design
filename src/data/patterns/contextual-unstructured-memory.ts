import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextualUnstructuredMemoryPattern: PatternScenario = {
  id: 'contextual-unstructured-memory',
  title: 'Contextual Unstructured Memory',
  description: 'Flexible memory system for storing and retrieving varied data formats including conversations, documents, and multimedia through semantic embeddings and similarity-based search.',
  initialNodes: [
    {
      id: 'raw-input',
      position: { x: 400, y: 50 },
      data: { label: '🌊 Raw Unstructured Input\n"Conversations, documents, logs, multimedia content"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 420 },
    },
    // Memory Core
    {
      id: 'unstructured-memory-core',
      position: { x: 375, y: 150 },
      data: { label: '🧠 Unstructured Memory Core\nFlexible storage & retrieval' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // Content Processing
    {
      id: 'content-chunker',
      position: { x: 100, y: 250 },
      data: { label: '✂️ Content Chunker\nDynamic segmentation\nOverlapping windows' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'embedding-generator',
      position: { x: 300, y: 250 },
      data: { label: '🎯 Embedding Generator\nVector representations\nSemantic encoding' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'context-extractor',
      position: { x: 500, y: 250 },
      data: { label: '🔍 Context Extractor\nMetadata extraction\nTemporal/spatial info' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'format-detector',
      position: { x: 700, y: 250 },
      data: { label: '📄 Format Detector\nContent type detection\nMultimodal processing' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    // Storage Mechanisms
    {
      id: 'raw-content-store',
      position: { x: 50, y: 380 },
      data: { label: '💾 Raw Content Store\nOriginal format\nLossless storage' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'vector-database',
      position: { x: 220, y: 380 },
      data: { label: '🗄️ Vector Database\nEmbedding storage\nSimilarity search' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'context-index',
      position: { x: 390, y: 380 },
      data: { label: '📇 Context Index\nMetadata catalog\nRelationship maps' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'temporal-store',
      position: { x: 560, y: 380 },
      data: { label: '⏰ Temporal Store\nTime-based ordering\nEvent sequences' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'association-graph',
      position: { x: 730, y: 380 },
      data: { label: '🕸️ Association Graph\nConnection network\nRelated memories' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Retrieval Methods
    {
      id: 'semantic-search',
      position: { x: 100, y: 520 },
      data: { label: '🔎 Semantic Search\nMeaning-based\nConcept matching' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'keyword-search',
      position: { x: 280, y: 520 },
      data: { label: '🔤 Keyword Search\nExact matching\nFull-text search' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'contextual-retrieval',
      position: { x: 460, y: 520 },
      data: { label: '🎯 Contextual Retrieval\nSituation-aware\nRelevance scoring' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'associative-recall',
      position: { x: 640, y: 520 },
      data: { label: '🔗 Associative Recall\nChain activation\nSpread retrieval' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    // Processing Pipeline
    {
      id: 'relevance-ranker',
      position: { x: 50, y: 640 },
      data: { label: '📊 Relevance Ranker\nScore & sort results\nContext weighting' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'result-aggregator',
      position: { x: 250, y: 640 },
      data: { label: '🔀 Result Aggregator\nCombine sources\nDeduplicate' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'context-enricher',
      position: { x: 450, y: 640 },
      data: { label: '✨ Context Enricher\nAdd metadata\nExpand context' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'format-converter',
      position: { x: 650, y: 640 },
      data: { label: '🔄 Format Converter\nAdapt output\nConsumer-specific' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Memory Management
    {
      id: 'memory-compressor',
      position: { x: 100, y: 760 },
      data: { label: '🗜️ Memory Compressor\nReduce redundancy\nSummarization' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'relevance-decay',
      position: { x: 280, y: 760 },
      data: { label: '📉 Relevance Decay\nTime-based fading\nImportance adjustment' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'memory-merger',
      position: { x: 460, y: 760 },
      data: { label: '🔀 Memory Merger\nCombine similar\nConsolidate fragments' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'garbage-collector',
      position: { x: 640, y: 760 },
      data: { label: '🗑️ Garbage Collector\nRemove stale\nCleanup orphans' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    // Quality Control
    {
      id: 'consistency-checker',
      position: { x: 150, y: 880 },
      data: { label: '✅ Consistency Check\nConflict detection\nResolution' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'coverage-analyzer',
      position: { x: 350, y: 880 },
      data: { label: '📊 Coverage Analyzer\nGap identification\nCompleteness' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'quality-scorer',
      position: { x: 550, y: 880 },
      data: { label: '⭐ Quality Scorer\nReliability rating\nConfidence levels' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'flexible-output',
      position: { x: 400, y: 1000 },
      data: { label: '✨ Flexible Output\nContext-aware unstructured memory retrieval' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Input to core
    {
      id: 'input-core',
      source: 'raw-input',
      target: 'unstructured-memory-core',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // Core to processors
    {
      id: 'core-chunker',
      source: 'unstructured-memory-core',
      target: 'content-chunker',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Chunk',
    },
    {
      id: 'core-embedding',
      source: 'unstructured-memory-core',
      target: 'embedding-generator',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Embed',
    },
    {
      id: 'core-context',
      source: 'unstructured-memory-core',
      target: 'context-extractor',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Extract',
    },
    {
      id: 'core-format',
      source: 'unstructured-memory-core',
      target: 'format-detector',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Detect',
    },
    // Processors to storage
    {
      id: 'chunker-raw',
      source: 'content-chunker',
      target: 'raw-content-store',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'embedding-vector',
      source: 'embedding-generator',
      target: 'vector-database',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'context-index',
      source: 'context-extractor',
      target: 'context-index',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'context-temporal',
      source: 'context-extractor',
      target: 'temporal-store',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'format-association',
      source: 'format-detector',
      target: 'association-graph',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // Storage to retrieval
    {
      id: 'vector-semantic',
      source: 'vector-database',
      target: 'semantic-search',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'raw-keyword',
      source: 'raw-content-store',
      target: 'keyword-search',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'index-contextual',
      source: 'context-index',
      target: 'contextual-retrieval',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'association-recall',
      source: 'association-graph',
      target: 'associative-recall',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    // Temporal to contextual
    {
      id: 'temporal-contextual',
      source: 'temporal-store',
      target: 'contextual-retrieval',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '5 5' },
    },
    // Retrieval to processing
    {
      id: 'semantic-ranker',
      source: 'semantic-search',
      target: 'relevance-ranker',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'keyword-aggregator',
      source: 'keyword-search',
      target: 'result-aggregator',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'contextual-enricher',
      source: 'contextual-retrieval',
      target: 'context-enricher',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'recall-converter',
      source: 'associative-recall',
      target: 'format-converter',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Processing pipeline
    {
      id: 'ranker-aggregator',
      source: 'relevance-ranker',
      target: 'result-aggregator',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'aggregator-enricher',
      source: 'result-aggregator',
      target: 'context-enricher',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'enricher-converter',
      source: 'context-enricher',
      target: 'format-converter',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    // Memory management
    {
      id: 'raw-compressor',
      source: 'raw-content-store',
      target: 'memory-compressor',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '3 3' },
    },
    {
      id: 'temporal-decay',
      source: 'temporal-store',
      target: 'relevance-decay',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '3 3' },
    },
    {
      id: 'vector-merger',
      source: 'vector-database',
      target: 'memory-merger',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '3 3' },
    },
    {
      id: 'association-garbage',
      source: 'association-graph',
      target: 'garbage-collector',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '3 3' },
    },
    // Management feedback
    {
      id: 'compressor-raw',
      source: 'memory-compressor',
      target: 'raw-content-store',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5 5' },
      label: 'Update',
    },
    {
      id: 'decay-temporal',
      source: 'relevance-decay',
      target: 'temporal-store',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5 5' },
      label: 'Update',
    },
    {
      id: 'merger-vector',
      source: 'memory-merger',
      target: 'vector-database',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5 5' },
      label: 'Update',
    },
    {
      id: 'garbage-association',
      source: 'garbage-collector',
      target: 'association-graph',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5 5' },
      label: 'Clean',
    },
    // Quality control
    {
      id: 'converter-consistency',
      source: 'format-converter',
      target: 'consistency-checker',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'aggregator-coverage',
      source: 'result-aggregator',
      target: 'coverage-analyzer',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'enricher-quality',
      source: 'context-enricher',
      target: 'quality-scorer',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Quality to output
    {
      id: 'consistency-output',
      source: 'consistency-checker',
      target: 'flexible-output',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'coverage-output',
      source: 'coverage-analyzer',
      target: 'flexible-output',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'quality-output',
      source: 'quality-scorer',
      target: 'flexible-output',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'Raw Input',
      description: 'Unstructured content arrives from various sources',
      activeNodes: ['raw-input', 'unstructured-memory-core'],
      activeEdges: ['input-core'],
    },
    {
      title: 'Content Processing',
      description: 'Chunking, embedding, context extraction, and format detection',
      activeNodes: ['unstructured-memory-core', 'content-chunker', 'embedding-generator', 'context-extractor', 'format-detector'],
      activeEdges: ['core-chunker', 'core-embedding', 'core-context', 'core-format'],
    },
    {
      title: 'Storage Distribution',
      description: 'Storing in appropriate memory systems',
      activeNodes: ['raw-content-store', 'vector-database', 'context-index', 'temporal-store', 'association-graph'],
      activeEdges: ['chunker-raw', 'embedding-vector', 'context-index', 'context-temporal', 'format-association'],
    },
    {
      title: 'Retrieval Methods',
      description: 'Multiple retrieval strategies activate',
      activeNodes: ['semantic-search', 'keyword-search', 'contextual-retrieval', 'associative-recall'],
      activeEdges: ['vector-semantic', 'raw-keyword', 'index-contextual', 'association-recall', 'temporal-contextual'],
    },
    {
      title: 'Result Processing',
      description: 'Ranking, aggregating, enriching, and converting results',
      activeNodes: ['relevance-ranker', 'result-aggregator', 'context-enricher', 'format-converter'],
      activeEdges: ['semantic-ranker', 'keyword-aggregator', 'contextual-enricher', 'recall-converter'],
    },
    {
      title: 'Pipeline Flow',
      description: 'Processing pipeline for results',
      activeNodes: ['relevance-ranker', 'result-aggregator', 'context-enricher', 'format-converter'],
      activeEdges: ['ranker-aggregator', 'aggregator-enricher', 'enricher-converter'],
    },
    {
      title: 'Memory Management',
      description: 'Compression, decay, merging, and cleanup',
      activeNodes: ['memory-compressor', 'relevance-decay', 'memory-merger', 'garbage-collector'],
      activeEdges: ['raw-compressor', 'temporal-decay', 'vector-merger', 'association-garbage'],
    },
    {
      title: 'Management Feedback',
      description: 'Updating storage based on management operations',
      activeNodes: ['raw-content-store', 'temporal-store', 'vector-database', 'association-graph'],
      activeEdges: ['compressor-raw', 'decay-temporal', 'merger-vector', 'garbage-association'],
    },
    {
      title: 'Quality Control',
      description: 'Checking consistency, coverage, and quality',
      activeNodes: ['consistency-checker', 'coverage-analyzer', 'quality-scorer'],
      activeEdges: ['converter-consistency', 'aggregator-coverage', 'enricher-quality'],
    },
    {
      title: 'Flexible Output',
      description: 'Delivering context-aware unstructured memory',
      activeNodes: ['consistency-checker', 'coverage-analyzer', 'quality-scorer', 'flexible-output'],
      activeEdges: ['consistency-output', 'coverage-output', 'quality-output'],
    },
  ],
};