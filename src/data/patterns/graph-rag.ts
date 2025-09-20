import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const graphRagPattern: PatternScenario = {
  id: 'graph-rag',
  title: 'Graph RAG (Knowledge Graph-Enhanced RAG)',
  initialNodes: [
    {
      id: 'indexing-phase',
      position: { x: 150, y: 50 },
      data: { label: '📚 INDEXING PHASE\n(One-time setup)' },
      style: { ...nodeStyle, background: '#374151', color: '#ffffff', minWidth: 200 },
    },
    {
      id: 'document-processing',
      position: { x: 150, y: 150 },
      data: { label: '📄 Document Processing\nCorporate documents\n+ Entity extraction' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'knowledge-graph',
      position: { x: 150, y: 250 },
      data: { label: '🕸️ Knowledge Graph\nEntities: John, Sarah, AI_Team\nRelations: manages, leads, develops' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },
    {
      id: 'community-detection',
      position: { x: 150, y: 350 },
      data: { label: '🏘️ Community Detection\nCluster 1: Leadership\nCluster 2: AI Development\nCluster 3: Marketing' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },
    {
      id: 'community-summaries',
      position: { x: 150, y: 450 },
      data: { label: '📋 Community Summaries\n"Leadership team focuses\non strategic AI initiatives"\n+ hierarchical summaries' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    {
      id: 'global-query',
      position: { x: 650, y: 50 },
      data: { label: '❓ Global Query\n"What are the main\nstrategic themes across\nour AI initiatives?"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
    {
      id: 'query-analysis',
      position: { x: 650, y: 150 },
      data: { label: '🔍 Query Analysis\nDetect: Global scope\nRequires: Cross-community\nsensemaking' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'community-matching',
      position: { x: 650, y: 250 },
      data: { label: '🎯 Community Matching\nRelevant communities:\n✓ Leadership\n✓ AI Development' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    {
      id: 'hierarchical-retrieval',
      position: { x: 650, y: 350 },
      data: { label: '📊 Hierarchical Retrieval\nLevel 1: Community summaries\nLevel 2: Entity relationships\nLevel 3: Raw documents' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },
    {
      id: 'cross-community-synthesis',
      position: { x: 650, y: 450 },
      data: { label: '🔗 Cross-Community Synthesis\nConnect themes across\nLeadership + AI Dev\ncommunities' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'global-context',
      position: { x: 650, y: 550 },
      data: { label: '🌐 Global Context Assembly\nStructured multi-level\ncontext with entity\nrelationships' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'final-generation',
      position: { x: 650, y: 650 },
      data: { label: '🤖 Global Answer Generation\n"Main AI themes: Innovation\nleadership, ethical AI,\ncross-team collaboration"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 250 },
    },
    {
      id: 'final-answer',
      position: { x: 400, y: 750 },
      data: { label: '✅ Comprehensive Answer\nGlobal insights across\norganizational structure\nwith entity context' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
  ],
  initialEdges: [
    {
      id: 'indexing-e1',
      source: 'indexing-phase',
      target: 'document-processing',
      ...edgeStyle,
      label: 'start'
    },
    {
      id: 'indexing-e2',
      source: 'document-processing',
      target: 'knowledge-graph',
      ...edgeStyle,
      label: 'extract entities'
    },
    {
      id: 'indexing-e3',
      source: 'knowledge-graph',
      target: 'community-detection',
      ...edgeStyle,
      label: 'cluster'
    },
    {
      id: 'indexing-e4',
      source: 'community-detection',
      target: 'community-summaries',
      ...edgeStyle,
      label: 'summarize'
    },
    {
      id: 'query-e1',
      source: 'global-query',
      target: 'query-analysis',
      ...edgeStyle,
      label: 'analyze'
    },
    {
      id: 'query-e2',
      source: 'query-analysis',
      target: 'community-matching',
      ...edgeStyle,
      label: 'match scope'
    },
    {
      id: 'query-e3',
      source: 'community-matching',
      target: 'hierarchical-retrieval',
      ...edgeStyle,
      label: 'retrieve'
    },
    {
      id: 'query-e4',
      source: 'hierarchical-retrieval',
      target: 'cross-community-synthesis',
      ...edgeStyle,
      label: 'synthesize'
    },
    {
      id: 'query-e5',
      source: 'cross-community-synthesis',
      target: 'global-context',
      ...edgeStyle,
      label: 'structure'
    },
    {
      id: 'query-e6',
      source: 'global-context',
      target: 'final-generation',
      ...edgeStyle,
      label: 'generate'
    },
    {
      id: 'query-e7',
      source: 'final-generation',
      target: 'final-answer',
      ...edgeStyle,
      label: 'output'
    },
    {
      id: 'cross-phase-1',
      source: 'community-summaries',
      target: 'hierarchical-retrieval',
      ...edgeStyle,
      label: 'use summaries',
      style: { ...edgeStyle.style, strokeDasharray: '5,5', stroke: '#9ca3af' }
    },
    {
      id: 'cross-phase-2',
      source: 'knowledge-graph',
      target: 'cross-community-synthesis',
      ...edgeStyle,
      label: 'entity relations',
      style: { ...edgeStyle.style, strokeDasharray: '5,5', stroke: '#9ca3af' }
    },
  ],
  steps: [
    {
      title: "Knowledge Graph Construction",
      description: "Documents are processed to extract entities and relationships, building a knowledge graph with community detection to identify organizational clusters.",
      activeNodes: ['indexing-phase', 'document-processing', 'knowledge-graph', 'community-detection', 'community-summaries'],
      activeEdges: ['indexing-e1', 'indexing-e2', 'indexing-e3', 'indexing-e4']
    },
    {
      title: "Global Query Processing",
      description: "Query about 'strategic AI themes' is analyzed as requiring global sensemaking across multiple organizational communities.",
      activeNodes: ['global-query', 'query-analysis', 'community-matching'],
      activeEdges: ['query-e1', 'query-e2']
    },
    {
      title: "Hierarchical Multi-Level Retrieval",
      description: "System retrieves at multiple levels: community summaries for broad themes, entity relationships for connections, raw documents for details.",
      activeNodes: ['hierarchical-retrieval'],
      activeEdges: ['query-e3', 'cross-phase-1']
    },
    {
      title: "Cross-Community Synthesis",
      description: "Information from Leadership and AI Development communities is synthesized using entity relationships to identify connecting themes.",
      activeNodes: ['cross-community-synthesis', 'global-context'],
      activeEdges: ['query-e4', 'query-e5', 'cross-phase-2']
    },
    {
      title: "Global Answer Generation",
      description: "Comprehensive response generated from multi-level context, providing organizational insights impossible with traditional document retrieval.",
      activeNodes: ['final-generation', 'final-answer'],
      activeEdges: ['query-e6', 'query-e7']
    }
  ]
};