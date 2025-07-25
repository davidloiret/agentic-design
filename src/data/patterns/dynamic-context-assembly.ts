import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const dynamicContextAssemblyPattern: PatternScenario = {
  id: 'dynamic-context-assembly',
  title: 'Dynamic Context Assembly Flow',
  description: 'Intelligent real-time composition of context from multiple sources based on query analysis and relevance scoring',
  steps: [
    {
      id: 'step-1',
      title: 'Query Analysis',
      description: 'Analyze the incoming query to understand domains, complexity, intent, and required expertise',
      input: 'How do quantum computing advances affect cryptocurrency security?',
      activeNodes: ['query', 'analysis'],
      activeEdges: ['query-analysis'],
      nodeUpdates: {
        'analysis': {
          data: { label: 'Query Analysis\nAnalyzing: Quantum + Crypto domains' },
          style: { ...nodeStyle, background: '#3b82f6' }
        }
      }
    },
    {
      id: 'step-2',
      title: 'Source Identification',
      description: 'Identify all available context sources that could be relevant to the query',
      activeNodes: ['analysis', 'source-quantum', 'source-crypto', 'source-blockchain', 'source-news'],
      activeEdges: ['analysis-quantum', 'analysis-crypto', 'analysis-blockchain', 'analysis-news'],
      nodeUpdates: {
        'source-quantum': {
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'source-crypto': {
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'source-blockchain': {
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'source-news': {
          style: { ...nodeStyle, background: '#6b7280', opacity: 0.7 }
        }
      }
    },
    {
      id: 'step-3',
      title: 'Relevance Scoring',
      description: 'Score each source based on relevance, quality, freshness, and alignment with query requirements',
      activeNodes: ['source-quantum', 'source-crypto', 'source-blockchain', 'scoring'],
      activeEdges: ['quantum-scoring', 'crypto-scoring', 'blockchain-scoring'],
      nodeUpdates: {
        'scoring': {
          data: { label: 'Relevance Scoring\nQuantum:95% Crypto:92% Blockchain:88%' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'source-quantum': {
          data: { label: 'Quantum Research\nScore: 95% ✓' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'source-crypto': {
          data: { label: 'Crypto Security\nScore: 92% ✓' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'source-blockchain': {
          data: { label: 'Blockchain KB\nScore: 88% ✓' },
          style: { ...nodeStyle, background: '#f59e0b' }
        }
      }
    },
    {
      id: 'step-4',
      title: 'Context Assembly',
      description: 'Assemble the optimal context window by allocating space based on relevance scores and quality metrics',
      activeNodes: ['scoring', 'assembly'],
      activeEdges: ['scoring-assembly'],
      nodeUpdates: {
        'assembly': {
          data: { label: 'Context Assembly\nQuantum:40% Crypto:35% Blockchain:25%' },
          style: { ...nodeStyle, background: '#3b82f6' }
        }
      }
    },
    {
      id: 'step-5',
      title: 'Optimized Context Ready',
      description: 'Context is optimally assembled and ready for generation with 98% relevance coverage',
      activeNodes: ['assembly', 'output'],
      activeEdges: ['assembly-output'],
      output: 'Optimized context assembled with 3 high-relevance sources (98% coverage, 4000 tokens)',
      nodeUpdates: {
        'output': {
          data: { label: 'Optimized Context\n98% Relevance Coverage' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    }
  ],
  initialNodes: [
    {
      id: 'query',
      type: 'input',
      position: { x: 50, y: 100 },
      data: { label: 'Query Input\n"Quantum + Crypto Security"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 }
    },
    {
      id: 'analysis',
      position: { x: 300, y: 50 },
      data: { label: 'Query Analysis\nDomain extraction & intent analysis' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 }
    },
    {
      id: 'source-quantum',
      position: { x: 50, y: 250 },
      data: { label: 'Quantum Research\nPapers & Studies' },
      style: { ...nodeStyle, background: '#374151', minWidth: 150 }
    },
    {
      id: 'source-crypto',
      position: { x: 230, y: 280 },
      data: { label: 'Crypto Security\nSecurity Database' },
      style: { ...nodeStyle, background: '#374151', minWidth: 150 }
    },
    {
      id: 'source-blockchain',
      position: { x: 410, y: 250 },
      data: { label: 'Blockchain KB\nKnowledge Base' },
      style: { ...nodeStyle, background: '#374151', minWidth: 150 }
    },
    {
      id: 'source-news',
      position: { x: 590, y: 280 },
      data: { label: 'Real-time News\nLive Feed' },
      style: { ...nodeStyle, background: '#374151', minWidth: 150 }
    },
    {
      id: 'scoring',
      position: { x: 300, y: 400 },
      data: { label: 'Relevance Scoring\nQuality, relevance & freshness analysis' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 }
    },
    {
      id: 'assembly',
      position: { x: 600, y: 400 },
      data: { label: 'Context Assembly\nOptimal context window creation' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 }
    },
    {
      id: 'output',
      type: 'output',
      position: { x: 850, y: 100 },
      data: { label: 'Optimized Context\nReady for Generation' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 }
    }
  ],
  initialEdges: [
    {
      id: 'query-analysis',
      source: 'query',
      target: 'analysis',
      style: edgeStyle
    },
    {
      id: 'analysis-quantum',
      source: 'analysis',
      target: 'source-quantum',
      style: edgeStyle
    },
    {
      id: 'analysis-crypto',
      source: 'analysis',
      target: 'source-crypto',
      style: edgeStyle
    },
    {
      id: 'analysis-blockchain',
      source: 'analysis',
      target: 'source-blockchain',
      style: edgeStyle
    },
    {
      id: 'analysis-news',
      source: 'analysis',
      target: 'source-news',
      style: edgeStyle
    },
    {
      id: 'quantum-scoring',
      source: 'source-quantum',
      target: 'scoring',
      style: edgeStyle
    },
    {
      id: 'crypto-scoring',
      source: 'source-crypto',
      target: 'scoring',
      style: edgeStyle
    },
    {
      id: 'blockchain-scoring',
      source: 'source-blockchain',
      target: 'scoring',
      style: edgeStyle
    },
    {
      id: 'news-scoring',
      source: 'source-news',
      target: 'scoring',
      style: edgeStyle
    },
    {
      id: 'scoring-assembly',
      source: 'scoring',
      target: 'assembly',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'assembly-output',
      source: 'assembly',
      target: 'output',
      style: { ...edgeStyle, strokeWidth: 3 }
    }
  ]
};