import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const latentMemoryNetworksPattern: PatternScenario = {
  id: 'latent-memory-networks',
  title: 'Latent Memory Networks in Multi-Agent Systems',
  description: 'Cross-agent knowledge sharing through continuous latent space representations and semantic similarity retrieval',
  steps: [
    {
      id: 'step-1',
      title: 'Knowledge Encoding',
      description: 'Research agent encodes new learning algorithm knowledge into dense vector representations',
      input: 'New Concept: "Reinforcement Learning with Policy Gradients"',
      activeNodes: ['research-agent', 'neural-encoder', 'encoding-process'],
      activeEdges: ['agent-to-encoder'],
      nodeUpdates: {
        'research-agent': {
          data: { label: 'Research Agent\\nEncoding new knowledge...' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'neural-encoder': {
          data: { label: 'Neural Encoder\\nGenerating 512-dim vector\\nProgress: 60%' },
          style: { ...nodeStyle, background: '#f59e0b' }
        }
      }
    },
    {
      id: 'step-2',
      title: 'Memory Formation',
      description: 'Encoded patterns are stored in the shared latent memory space with automatic indexing',
      activeNodes: ['neural-encoder', 'latent-memory-space', 'memory-index'],
      activeEdges: ['encoder-to-memory'],
      nodeUpdates: {
        'neural-encoder': {
          data: { label: 'Neural Encoder\\nVector: [0.23, -0.15, 0.78, ...]\\nCompleted ✓' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'latent-memory-space': {
          data: { label: 'Latent Memory Space\\nStoring new pattern\\nTotal patterns: 47' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'memory-index': {
          data: { label: 'Memory Index\\nUpdating similarity graph\\nBuilding connections...' },
          style: { ...nodeStyle, background: '#3b82f6' }
        }
      }
    },
    {
      id: 'step-3',
      title: 'Pattern Clustering',
      description: 'Similar patterns automatically cluster together based on semantic relationships in latent space',
      activeNodes: ['latent-memory-space', 'cluster-learning', 'cluster-attention', 'cluster-optimization'],
      activeEdges: ['memory-to-clusters'],
      nodeUpdates: {
        'latent-memory-space': {
          data: { label: 'Latent Memory Space\\nOrganizing patterns...\\nClustering active' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'cluster-learning': {
          data: { label: 'Learning Methods\\n12 patterns\\nDensity: 0.89' },
          style: { ...nodeStyle, background: '#ec4899' }
        },
        'cluster-attention': {
          data: { label: 'Attention Patterns\\n8 patterns\\nDensity: 0.92' },
          style: { ...nodeStyle, background: '#ec4899' }
        },
        'cluster-optimization': {
          data: { label: 'Optimization\\n15 patterns\\nDensity: 0.85' },
          style: { ...nodeStyle, background: '#ec4899' }
        }
      }
    },
    {
      id: 'step-4',
      title: 'Cross-Agent Knowledge Sharing',
      description: 'Analysis and Synthesis agents contribute their domain expertise to the shared memory network',
      activeNodes: ['analysis-agent', 'synthesis-agent', 'neural-encoder', 'latent-memory-space'],
      activeEdges: ['analysis-to-encoder', 'synthesis-to-encoder'],
      nodeUpdates: {
        'analysis-agent': {
          data: { label: 'Analysis Agent\\nContributing: Transformer\\narchitecture patterns' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'synthesis-agent': {
          data: { label: 'Synthesis Agent\\nAdding: Game theory\\nprinciples for multi-agent' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'latent-memory-space': {
          data: { label: 'Latent Memory Space\\nIntegrating multi-agent\\nknowledge: 52 patterns' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        }
      }
    },
    {
      id: 'step-5',
      title: 'Semantic Query Processing',
      description: 'Query agent performs semantic similarity search to retrieve relevant knowledge patterns',
      activeNodes: ['query-agent', 'similarity-search', 'latent-memory-space', 'retrieval-results'],
      activeEdges: ['query-to-search', 'search-to-memory', 'memory-to-results'],
      nodeUpdates: {
        'query-agent': {
          data: { label: 'Query Agent\\nQuery: "How to improve\\nsequence modeling?"' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'similarity-search': {
          data: { label: 'Similarity Search\\nComparing vectors...\\nFinding nearest neighbors' },
          style: { ...nodeStyle, background: '#f59e0b' }
        },
        'retrieval-results': {
          data: { label: 'Retrieval Results\\n1. Attention Mechanisms (94%)\\n2. Transformer Arch (89%)\\n3. LSTM Patterns (78%)' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    },
    {
      id: 'step-6',
      title: 'Cross-Domain Pattern Discovery',
      description: 'System discovers novel connections between different domains through latent space proximity',
      activeNodes: ['cross-domain-detector', 'cluster-attention', 'cluster-optimization', 'cluster-learning', 'insight-generator'],
      activeEdges: ['detector-to-clusters', 'clusters-to-insights'],
      nodeUpdates: {
        'cross-domain-detector': {
          data: { label: 'Cross-Domain Detector\\nAnalyzing cluster proximity\\nFinding hidden connections' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'insight-generator': {
          data: { label: 'Insight Generator\\nDiscovered: Attention + Game Theory\\nfor multi-agent coordination' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    },
    {
      id: 'step-7',
      title: 'Knowledge Synthesis & Innovation',
      description: 'Multiple insights are synthesized to generate novel cross-domain knowledge and innovations',
      activeNodes: ['synthesis-agent', 'insight-generator', 'knowledge-synthesizer', 'innovation-output'],
      activeEdges: ['synthesis-coordination', 'insights-to-synthesizer', 'synthesizer-to-output'],
      output: 'Novel Innovation: "Attention-based Nash Equilibrium for Multi-Agent Coordination"\\n\\n• Combines attention mechanisms with game theory\\n• Enables agents to focus on relevant opponent strategies\\n• Achieves 34% improvement in multi-agent coordination tasks\\n• Memory efficiency: 91% reduction vs traditional approaches\\n• Cross-domain insight from 3 specialist agents',
      nodeUpdates: {
        'synthesis-agent': {
          data: { label: 'Synthesis Agent\\nOrchestrating final\\nknowledge fusion' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'knowledge-synthesizer': {
          data: { label: 'Knowledge Synthesizer\\nCombining 15 patterns\\nGenerating innovation...' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'innovation-output': {
          data: { label: 'Innovation Output\\nNovel framework created!\\nCross-domain breakthrough ✨' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    }
  ],
  initialNodes: [
    // AI Agents
    {
      id: 'research-agent',
      position: { x: 100, y: 200 },
      data: { label: 'Research Agent\\nLearning algorithms specialist' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'analysis-agent',
      position: { x: 100, y: 350 },
      data: { label: 'Analysis Agent\\nNeural architecture expert' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'synthesis-agent',
      position: { x: 100, y: 500 },
      data: { label: 'Synthesis Agent\\nCross-domain integration' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'query-agent',
      position: { x: 100, y: 650 },
      data: { label: 'Query Agent\\nKnowledge retrieval specialist' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Encoding Infrastructure
    {
      id: 'neural-encoder',
      position: { x: 350, y: 350 },
      data: { label: 'Neural Encoder\\n512-dimensional vectors' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },

    // Memory Components
    {
      id: 'latent-memory-space',
      position: { x: 600, y: 300 },
      data: { label: 'Latent Memory Space\\nShared knowledge repository' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180, minHeight: 120 }
    },
    {
      id: 'memory-index',
      position: { x: 600, y: 150 },
      data: { label: 'Memory Index\\nSimilarity graph maintenance' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },

    // Pattern Clusters
    {
      id: 'cluster-learning',
      position: { x: 450, y: 100 },
      data: { label: 'Learning Methods Cluster\\nOptimization algorithms' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 140 }
    },
    {
      id: 'cluster-attention',
      position: { x: 750, y: 100 },
      data: { label: 'Attention Patterns Cluster\\nSequence modeling techniques' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 140 }
    },
    {
      id: 'cluster-optimization',
      position: { x: 600, y: 50 },
      data: { label: 'Optimization Cluster\\nGradient-based methods' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 140 }
    },

    // Query & Retrieval System
    {
      id: 'similarity-search',
      position: { x: 350, y: 600 },
      data: { label: 'Similarity Search\\nVector nearest neighbors' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'retrieval-results',
      position: { x: 600, y: 600 },
      data: { label: 'Retrieval Results\\nRanked by semantic similarity' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },

    // Cross-Domain Intelligence
    {
      id: 'cross-domain-detector',
      position: { x: 900, y: 250 },
      data: { label: 'Cross-Domain Detector\\nIdentifies hidden connections' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'insight-generator',
      position: { x: 900, y: 400 },
      data: { label: 'Insight Generator\\nNovel pattern discovery' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },

    // Knowledge Synthesis
    {
      id: 'knowledge-synthesizer',
      position: { x: 350, y: 750 },
      data: { label: 'Knowledge Synthesizer\\nMulti-pattern fusion engine' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },
    {
      id: 'innovation-output',
      position: { x: 600, y: 750 },
      data: { label: 'Innovation Output\\nNovel cross-domain frameworks' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 }
    }
  ],
  initialEdges: [
    // Agent to encoder connections
    {
      id: 'agent-to-encoder',
      source: 'research-agent',
      target: 'neural-encoder',
      style: edgeStyle
    },
    {
      id: 'analysis-to-encoder',
      source: 'analysis-agent',
      target: 'neural-encoder',
      style: edgeStyle
    },
    {
      id: 'synthesis-to-encoder',
      source: 'synthesis-agent',
      target: 'neural-encoder',
      style: edgeStyle
    },

    // Encoder to memory
    {
      id: 'encoder-to-memory',
      source: 'neural-encoder',
      target: 'latent-memory-space',
      style: { ...edgeStyle, strokeWidth: 3 }
    },

    // Memory indexing
    {
      id: 'memory-to-index',
      source: 'latent-memory-space',
      target: 'memory-index',
      style: edgeStyle
    },

    // Clustering connections
    {
      id: 'memory-to-clusters',
      source: 'latent-memory-space',
      target: 'cluster-learning',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'memory-to-attention-cluster',
      source: 'latent-memory-space',
      target: 'cluster-attention',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'memory-to-opt-cluster',
      source: 'latent-memory-space',
      target: 'cluster-optimization',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Query flow
    {
      id: 'query-to-search',
      source: 'query-agent',
      target: 'similarity-search',
      style: edgeStyle
    },
    {
      id: 'search-to-memory',
      source: 'similarity-search',
      target: 'latent-memory-space',
      style: edgeStyle
    },
    {
      id: 'memory-to-results',
      source: 'latent-memory-space',
      target: 'retrieval-results',
      style: { ...edgeStyle, strokeWidth: 2 }
    },

    // Cross-domain discovery
    {
      id: 'detector-to-clusters',
      source: 'cross-domain-detector',
      target: 'cluster-attention',
      style: edgeStyle
    },
    {
      id: 'clusters-to-insights',
      source: 'cluster-learning',
      target: 'insight-generator',
      style: edgeStyle
    },
    {
      id: 'opt-cluster-to-insights',
      source: 'cluster-optimization',
      target: 'insight-generator',
      style: edgeStyle
    },

    // Synthesis coordination
    {
      id: 'synthesis-coordination',
      source: 'synthesis-agent',
      target: 'knowledge-synthesizer',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'insights-to-synthesizer',
      source: 'insight-generator',
      target: 'knowledge-synthesizer',
      style: edgeStyle
    },
    {
      id: 'synthesizer-to-output',
      source: 'knowledge-synthesizer',
      target: 'innovation-output',
      style: { ...edgeStyle, strokeWidth: 3 }
    }
  ]
};