import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const correctiveRagPattern: PatternScenario = {
  id: 'corrective-rag',
  title: 'Corrective RAG (CRAG)',
  description: 'Self-correcting retrieval-augmented generation that evaluates retrieved documents for relevance, triggers web search for additional information, and validates answers for accuracy.',
  initialNodes: [
    {
      id: 'user-query',
      position: { x: 400, y: 50 },
      data: { label: '❓ User Query\n"Latest breakthrough in\nAlzheimer\'s treatment\nfrom 2024"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
    {
      id: 'initial-retrieval',
      position: { x: 400, y: 150 },
      data: { label: '📚 Initial Retrieval\nFetch documents about\nAlzheimer treatments' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'quality-evaluator',
      position: { x: 400, y: 250 },
      data: { label: '🔍 Quality Evaluator\n"Retrieved docs quality?"\nScore: 0.3/1.0 (Poor)' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    {
      id: 'high-quality-path',
      position: { x: 150, y: 350 },
      data: { label: '✅ High Quality\nScore > 0.8\nProceed to generation' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    {
      id: 'medium-quality-path',
      position: { x: 400, y: 350 },
      data: { label: '⚠️ Medium Quality\n0.4 < Score < 0.8\nRefine documents' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'poor-quality-path',
      position: { x: 650, y: 350 },
      data: { label: '❌ Poor Quality\nScore < 0.4\nTrigger correction' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'document-refinement',
      position: { x: 400, y: 450 },
      data: { label: '✂️ Document Refinement\nFilter irrelevant parts\nKeep key sections' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'web-search',
      position: { x: 650, y: 450 },
      data: { label: '🌐 Web Search\n"2024 Alzheimer\nbreakthrough treatment"\nFind recent sources' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'knowledge-base-expansion',
      position: { x: 650, y: 550 },
      data: { label: '📊 Knowledge Expansion\nSearch broader databases\nMedical journals, trials' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'corrected-retrieval',
      position: { x: 650, y: 650 },
      data: { label: '🔄 Corrected Retrieval\n"Lecanemab FDA approval\nJan 2024, 27% slowdown\nin cognitive decline"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
    {
      id: 'quality-recheck',
      position: { x: 400, y: 750 },
      data: { label: '✓ Quality Re-check\nNew score: 0.9/1.0\n(Excellent)' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    {
      id: 'final-generation',
      position: { x: 400, y: 850 },
      data: { label: '🤖 Final Generation\n"Latest 2024 breakthrough:\nLecanemab approved by FDA,\nshows 27% reduction..."' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 250 },
    },
    {
      id: 'final-answer',
      position: { x: 400, y: 950 },
      data: { label: '✅ High-Quality Answer\nAccurate, current,\nwell-supported response' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'user-query',
      target: 'initial-retrieval',
      ...edgeStyle,
      label: 'retrieve'
    },
    {
      id: 'e2',
      source: 'initial-retrieval',
      target: 'quality-evaluator',
      ...edgeStyle,
      label: 'evaluate'
    },
    {
      id: 'e3a',
      source: 'quality-evaluator',
      target: 'high-quality-path',
      ...edgeStyle,
      label: 'Score > 0.8'
    },
    {
      id: 'e3b',
      source: 'quality-evaluator',
      target: 'medium-quality-path',
      ...edgeStyle,
      label: '0.4 < Score < 0.8'
    },
    {
      id: 'e3c',
      source: 'quality-evaluator',
      target: 'poor-quality-path',
      ...edgeStyle,
      label: 'Score < 0.4'
    },
    {
      id: 'e4',
      source: 'medium-quality-path',
      target: 'document-refinement',
      ...edgeStyle,
      label: 'refine'
    },
    {
      id: 'e5',
      source: 'poor-quality-path',
      target: 'web-search',
      ...edgeStyle,
      label: 'search web'
    },
    {
      id: 'e6',
      source: 'web-search',
      target: 'knowledge-base-expansion',
      ...edgeStyle,
      label: 'expand sources'
    },
    {
      id: 'e7',
      source: 'knowledge-base-expansion',
      target: 'corrected-retrieval',
      ...edgeStyle,
      label: 'retrieve'
    },
    {
      id: 'e8',
      source: 'corrected-retrieval',
      target: 'quality-recheck',
      ...edgeStyle,
      label: 're-evaluate'
    },
    {
      id: 'e9',
      source: 'document-refinement',
      target: 'quality-recheck',
      ...edgeStyle,
      label: 'refined docs'
    },
    {
      id: 'e10',
      source: 'high-quality-path',
      target: 'quality-recheck',
      ...edgeStyle,
      label: 'good docs'
    },
    {
      id: 'e11',
      source: 'quality-recheck',
      target: 'final-generation',
      ...edgeStyle,
      label: 'generate'
    },
    {
      id: 'e12',
      source: 'final-generation',
      target: 'final-answer',
      ...edgeStyle,
      label: 'output'
    },
  ],
  steps: [
    {
      title: "Initial Retrieval & Quality Assessment",
      description: "Query about 2024 Alzheimer breakthrough triggers retrieval. Quality evaluator scores documents at 0.3/1.0 - detecting poor relevance and outdated information.",
      activeNodes: ['user-query', 'initial-retrieval', 'quality-evaluator'],
      activeEdges: ['e1', 'e2']
    },
    {
      title: "Quality-Based Path Decision",
      description: "Based on quality scores, system routes to different correction strategies: direct generation (>0.8), refinement (0.4-0.8), or full correction (<0.4).",
      activeNodes: ['high-quality-path', 'medium-quality-path', 'poor-quality-path'],
      activeEdges: ['e3a', 'e3b', 'e3c']
    },
    {
      title: "Corrective Action Triggered",
      description: "Poor quality score triggers web search for recent 2024 sources, then expands to medical databases for comprehensive coverage of latest treatments.",
      activeNodes: ['web-search', 'knowledge-base-expansion'],
      activeEdges: ['e5', 'e6']
    },
    {
      title: "Enhanced Re-Retrieval",
      description: "Corrected retrieval finds current information about Lecanemab FDA approval and clinical trial results from 2024 sources.",
      activeNodes: ['corrected-retrieval', 'quality-recheck'],
      activeEdges: ['e7', 'e8']
    },
    {
      title: "High-Quality Response Generation",
      description: "With quality score improved to 0.9/1.0, system generates accurate, current response about latest Alzheimer breakthrough with specific clinical data.",
      activeNodes: ['final-generation', 'final-answer'],
      activeEdges: ['e11', 'e12']
    }
  ]
};