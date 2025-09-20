import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const selfRagPattern: PatternScenario = {
  id: 'self-rag',
  title: 'Self-RAG (Self-Reflective Retrieve-Augmented Generation)',
  description: 'Enhanced RAG system with self-reflection capabilities that evaluates when to retrieve information, assesses retrieval quality, and validates generated responses for accuracy.',
  initialNodes: [
    {
      id: 'user-query',
      position: { x: 400, y: 50 },
      data: { label: '❓ User Query\n"What is the capital\nof France?"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'self-reflection-1',
      position: { x: 400, y: 150 },
      data: { label: '🤔 Self-Reflection\n"Do I need retrieval\nfor this question?"\n[Retrieve] = No' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },
    {
      id: 'direct-generation',
      position: { x: 200, y: 250 },
      data: { label: '🤖 Direct Generation\n"Paris is the capital\nof France"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'complex-query',
      position: { x: 600, y: 150 },
      data: { label: '❓ Complex Query\n"Latest COVID-19\nvaccine efficacy\nrates in 2024"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'self-reflection-2',
      position: { x: 600, y: 250 },
      data: { label: '🤔 Self-Reflection\n"Do I need retrieval?"\n[Retrieve] = Yes\n(Current info needed)' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'retrieval',
      position: { x: 600, y: 350 },
      data: { label: '📚 Retrieval\nFetch recent studies\nand health data' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'relevance-check',
      position: { x: 600, y: 450 },
      data: { label: '✓ Relevance Check\n"Are docs relevant?"\n[IsRel] = Partially\n(Some outdated)' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'additional-retrieval',
      position: { x: 800, y: 450 },
      data: { label: '🔄 Additional Retrieval\nFetch more recent\n2024 studies' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'generation',
      position: { x: 600, y: 550 },
      data: { label: '🤖 Generation\n"2024 efficacy rates:\nPfizer 95%, Moderna 94%"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    {
      id: 'utility-check',
      position: { x: 600, y: 650 },
      data: { label: '🎯 Utility Check\n"Is answer supported?"\n[IsSupp] = Yes\n[IsUse] = Yes' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'final-answer',
      position: { x: 400, y: 750 },
      data: { label: '✅ Final Answer\nHigh-confidence response\nwith source attribution' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'user-query',
      target: 'self-reflection-1',
      ...edgeStyle,
      label: 'reflect'
    },
    {
      id: 'e2',
      source: 'self-reflection-1',
      target: 'direct-generation',
      ...edgeStyle,
      label: '[No Retrieve]'
    },
    {
      id: 'e3',
      source: 'complex-query',
      target: 'self-reflection-2',
      ...edgeStyle,
      label: 'reflect'
    },
    {
      id: 'e4',
      source: 'self-reflection-2',
      target: 'retrieval',
      ...edgeStyle,
      label: '[Retrieve]'
    },
    {
      id: 'e5',
      source: 'retrieval',
      target: 'relevance-check',
      ...edgeStyle,
      label: 'evaluate'
    },
    {
      id: 'e6',
      source: 'relevance-check',
      target: 'additional-retrieval',
      ...edgeStyle,
      label: '[IsRel] = Partial'
    },
    {
      id: 'e7',
      source: 'additional-retrieval',
      target: 'generation',
      ...edgeStyle,
      label: 'enhanced context'
    },
    {
      id: 'e8',
      source: 'relevance-check',
      target: 'generation',
      ...edgeStyle,
      label: '[IsRel] = Yes'
    },
    {
      id: 'e9',
      source: 'generation',
      target: 'utility-check',
      ...edgeStyle,
      label: 'validate'
    },
    {
      id: 'e10',
      source: 'utility-check',
      target: 'final-answer',
      ...edgeStyle,
      label: '[IsSupp] & [IsUse]'
    },
    {
      id: 'e11',
      source: 'direct-generation',
      target: 'final-answer',
      ...edgeStyle,
      label: 'simple answer'
    },
  ],
  steps: [
    {
      title: "Self-Reflection on Retrieval Need",
      description: "Model evaluates if external knowledge is needed. Simple factual questions (like 'capital of France') get [Retrieve] = No token.",
      activeNodes: ['user-query', 'self-reflection-1'],
      activeEdges: ['e1']
    },
    {
      title: "Direct vs Retrieval-Augmented Path",
      description: "For simple queries, generate directly from parametric knowledge. For complex/current topics, trigger retrieval with [Retrieve] = Yes token.",
      activeNodes: ['direct-generation', 'complex-query', 'self-reflection-2'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Retrieval Quality Assessment",
      description: "After retrieval, model reflects on document relevance using [IsRel] tokens. Partially relevant docs trigger additional targeted retrieval.",
      activeNodes: ['retrieval', 'relevance-check', 'additional-retrieval'],
      activeEdges: ['e4', 'e5', 'e6']
    },
    {
      title: "Response Generation with Self-Evaluation",
      description: "Generate response from retrieved context, then self-assess with [IsSupp] (supported by evidence) and [IsUse] (useful to user) tokens.",
      activeNodes: ['generation', 'utility-check'],
      activeEdges: ['e7', 'e8', 'e9']
    },
    {
      title: "Confident Final Answer",
      description: "Only outputs that pass all reflection checks ([IsSupp] = Yes, [IsUse] = Yes) become the final high-confidence response.",
      activeNodes: ['final-answer'],
      activeEdges: ['e10', 'e11']
    }
  ]
};