import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const modularRagPattern: PatternScenario = {
  id: 'modular-rag',
  title: 'Modular RAG (Flexible Retrieval-Augmented Generation)',
  description: 'Flexible retrieval-augmented generation system with modular components for routing, retrieval, generation, and validation that can be dynamically configured based on query complexity.',
  initialNodes: [
    {
      id: 'user-query',
      position: { x: 400, y: 50 },
      data: { label: '❓ Complex Query\n"Compare treatment efficacy\nof diabetes medications\nfor elderly patients"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },
    {
      id: 'query-router',
      position: { x: 400, y: 150 },
      data: { label: '🔀 Query Router\nAnalyze complexity\nDetermine strategy' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'retrieval-module-1',
      position: { x: 150, y: 250 },
      data: { label: '📚 Drug Database\nRetrieve medication\nbasic info' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'retrieval-module-2',
      position: { x: 400, y: 250 },
      data: { label: '🧪 Clinical Trials\nRetrieve efficacy\nstudies' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'retrieval-module-3',
      position: { x: 650, y: 250 },
      data: { label: '👴 Elderly Studies\nRetrieve age-specific\nresearch' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'fusion-module',
      position: { x: 400, y: 350 },
      data: { label: '🔗 Information Fusion\nCombine & cross-reference\nmultiple sources' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'reasoning-module',
      position: { x: 400, y: 450 },
      data: { label: '🧠 Reasoning Module\nIdentify gaps\nNeed more elderly data?' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    {
      id: 'adaptive-retrieval',
      position: { x: 650, y: 450 },
      data: { label: '🔄 Adaptive Retrieval\nFetch additional\nelderly-specific data' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'synthesis-module',
      position: { x: 400, y: 550 },
      data: { label: '📊 Synthesis Module\nCompare medications\nStructure findings' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'generation-module',
      position: { x: 400, y: 650 },
      data: { label: '🤖 Generation Module\nCreate comparative\nanalysis report' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'final-answer',
      position: { x: 400, y: 750 },
      data: { label: '✅ Comprehensive Answer\n"Metformin shows better\ntolerance in elderly (78%)\nvs Sulfonylureas (65%)"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 280 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'user-query',
      target: 'query-router',
      ...edgeStyle,
      label: 'analyze'
    },
    {
      id: 'e2a',
      source: 'query-router',
      target: 'retrieval-module-1',
      ...edgeStyle,
      label: 'drugs'
    },
    {
      id: 'e2b',
      source: 'query-router',
      target: 'retrieval-module-2',
      ...edgeStyle,
      label: 'trials'
    },
    {
      id: 'e2c',
      source: 'query-router',
      target: 'retrieval-module-3',
      ...edgeStyle,
      label: 'elderly'
    },
    {
      id: 'e3a',
      source: 'retrieval-module-1',
      target: 'fusion-module',
      ...edgeStyle,
      label: 'basic info'
    },
    {
      id: 'e3b',
      source: 'retrieval-module-2',
      target: 'fusion-module',
      ...edgeStyle,
      label: 'efficacy data'
    },
    {
      id: 'e3c',
      source: 'retrieval-module-3',
      target: 'fusion-module',
      ...edgeStyle,
      label: 'age data'
    },
    {
      id: 'e4',
      source: 'fusion-module',
      target: 'reasoning-module',
      ...edgeStyle,
      label: 'analyze gaps'
    },
    {
      id: 'e5',
      source: 'reasoning-module',
      target: 'adaptive-retrieval',
      ...edgeStyle,
      label: 'need more data'
    },
    {
      id: 'e6',
      source: 'adaptive-retrieval',
      target: 'synthesis-module',
      ...edgeStyle,
      label: 'additional context'
    },
    {
      id: 'e7',
      source: 'reasoning-module',
      target: 'synthesis-module',
      ...edgeStyle,
      label: 'sufficient data'
    },
    {
      id: 'e8',
      source: 'synthesis-module',
      target: 'generation-module',
      ...edgeStyle,
      label: 'structured info'
    },
    {
      id: 'e9',
      source: 'generation-module',
      target: 'final-answer',
      ...edgeStyle,
      label: 'generate'
    },
  ],
  steps: [
    {
      title: "Query Analysis & Routing",
      description: "Complex query about diabetes medication comparison is analyzed. Router determines need for multi-source retrieval strategy.",
      activeNodes: ['user-query', 'query-router'],
      activeEdges: ['e1']
    },
    {
      title: "Parallel Module Retrieval",
      description: "Three specialized modules retrieve simultaneously: drug database for basic info, clinical trials for efficacy, elderly studies for age-specific data.",
      activeNodes: ['retrieval-module-1', 'retrieval-module-2', 'retrieval-module-3'],
      activeEdges: ['e2a', 'e2b', 'e2c']
    },
    {
      title: "Information Fusion",
      description: "Fusion module combines and cross-references information from all retrieval modules, identifying connections and potential gaps.",
      activeNodes: ['fusion-module'],
      activeEdges: ['e3a', 'e3b', 'e3c']
    },
    {
      title: "Adaptive Reasoning",
      description: "Reasoning module identifies insufficient elderly-specific data and triggers adaptive retrieval for additional targeted information.",
      activeNodes: ['reasoning-module', 'adaptive-retrieval'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Synthesis & Generation",
      description: "All retrieved information is synthesized into structured comparison, then generation module creates comprehensive answer with specific statistics.",
      activeNodes: ['synthesis-module', 'generation-module', 'final-answer'],
      activeEdges: ['e6', 'e7', 'e8', 'e9']
    }
  ]
};