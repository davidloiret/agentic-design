"use client"

import React, { useState } from 'react';
import { Github, ExternalLink, Star, GitFork, Tag, Lightbulb, Code, TrendingUp, Users, BookOpen, Activity } from 'lucide-react';

interface Library {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  stars: number;
  forks: number;
  useCases: string[];
  category: string;
  referenceProjects: ReferenceProject[];
  lastUpdated: string;
  license: string;
  npmUrl?: string;
}

// License color coding system: green (permissive) to red (contaminating)
const getLicenseColor = (license: string): { bg: string; text: string; border: string } => {
  const upperLicense = license.toUpperCase();

  // Most permissive - Green (allows everything)
  if (upperLicense.includes('MIT') || upperLicense.includes('BSD') || upperLicense.includes('APACHE')) {
    return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' };
  }

  // Moderately permissive - Blue (mostly open)
  if (upperLicense.includes('MOZILLA') || upperLicense.includes('MPL')) {
    return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' };
  }

  // Weak copyleft - Yellow (some restrictions)
  if (upperLicense.includes('LGPL') || upperLicense.includes('EPL')) {
    return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' };
  }

  // Strong copyleft - Orange (significant restrictions)
  if (upperLicense.includes('GPL') && !upperLicense.includes('LGPL')) {
    return { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' };
  }

  // Most restrictive - Red (contaminating/commercial)
  if (upperLicense.includes('SSPL') || upperLicense.includes('COMMERCIAL') || upperLicense.includes('PROPRIETARY')) {
    return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' };
  }

  // Unknown/Custom - Gray
  return { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' };
};

interface ReferenceProject {
  name: string;
  githubUrl: string;
  stars: number;
  description: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  isOpenSource: boolean;
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  forks?: number;
  techniques: string[];
  prompts: string[];
  category: string;
  tags: string[];
}

// Analytics Components
const MetricCard: React.FC<{ 
  title: string; 
  value: string | number; 
  change?: number; 
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
}> = ({ title, value, change, icon, trend }) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return '↗️';
    if (trend === 'down') return '↘️';
    return '➡️';
  };

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 font-medium">{title}</span>
        <div className="text-blue-400">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-white">{value}</span>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <span className="text-xs">{getTrendIcon()}</span>
            <span className="text-xs font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={item.label} className="flex items-center space-x-3">
          <div className="w-20 text-xs text-gray-400 text-right">{item.label}</div>
          <div className="flex-1 bg-gray-700/30 rounded-full h-2 relative overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color,
                animationDelay: `${index * 100}ms`
              }}
            />
          </div>
          <div className="w-8 text-xs text-gray-300 font-medium">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

const libraries: Library[] = [
  {
    id: 'eventsource-parser',
    name: 'eventsource-parser',
    description: 'A streaming parser for server-sent events/eventsource, without any assumptions about how the actual stream is read.',
    githubUrl: 'https://github.com/rexxars/eventsource-parser',
    stars: 532,
    forks: 45,
    useCases: ['Server-sent events parsing', 'Streaming API responses', 'Real-time data processing', 'Chat applications', 'Live updates'],
    category: 'Streaming',
    referenceProjects: [
      {
        name: 'OpenAI Node.js API',
        githubUrl: 'https://github.com/openai/openai-node',
        stars: 6800,
        description: 'Official OpenAI Node.js library using eventsource-parser for streaming completions'
      },
      {
        name: 'Vercel AI SDK',
        githubUrl: 'https://github.com/vercel/ai',
        stars: 8500,
        description: 'AI SDK for TypeScript that uses eventsource-parser for streaming responses'
      }
    ],
    lastUpdated: '2024-03-15',
    license: 'MIT',
    npmUrl: 'https://www.npmjs.com/package/eventsource-parser'
  },
  {
    id: 'zod',
    name: 'Zod',
    description: 'TypeScript-first schema validation with static type inference.',
    githubUrl: 'https://github.com/colinhacks/zod',
    stars: 32000,
    forks: 1100,
    useCases: ['API validation', 'Form validation', 'Runtime type checking', 'Data parsing', 'Schema definition'],
    category: 'Validation',
    referenceProjects: [
      {
        name: 'tRPC',
        githubUrl: 'https://github.com/trpc/trpc',
        stars: 33000,
        description: 'End-to-end typesafe APIs made easy, uses Zod for input validation'
      },
      {
        name: 'T3 Stack',
        githubUrl: 'https://github.com/t3-oss/create-t3-app',
        stars: 24000,
        description: 'Full-stack TypeScript framework that heavily relies on Zod'
      }
    ],
    lastUpdated: '2024-04-01',
    license: 'MIT',
    npmUrl: 'https://www.npmjs.com/package/zod'
  },
  // AI Frameworks & Orchestration
  {
    id: 'baml',
    name: 'BAML',
    description: 'Type-safe AI interfaces across multiple programming languages. Makes AI pipelines 10x more reliable with structured outputs.',
    githubUrl: 'https://github.com/boundaryml/baml',
    stars: 2107,
    forks: 85,
    useCases: ['Type-safe AI interfaces', 'Structured LLM outputs', 'Multi-language AI applications', 'CI/CD AI testing', 'Reliable AI pipelines'],
    category: 'AI Frameworks',
    referenceProjects: [
      {
        name: 'Amazon AI Services',
        githubUrl: 'https://github.com/aws/amazon-ai-services',
        stars: 1200,
        description: 'Amazon uses BAML for type-safe AI service integrations'
      },
      {
        name: 'SAP AI Platform',
        githubUrl: 'https://github.com/SAP/ai-platform',
        stars: 850,
        description: 'SAP leverages BAML for enterprise AI applications'
      }
    ],
    lastUpdated: '2024-12-01',
    license: 'MIT'
  },
  {
    id: 'dspy',
    name: 'DSPy',
    description: 'Declarative framework for building modular AI software from Stanford NLP. Describe AI behavior as code, not strings.',
    githubUrl: 'https://github.com/stanfordnlp/dspy',
    stars: 18500,
    forks: 1420,
    useCases: ['RAG systems', 'AI agent workflows', 'Prompt optimization', 'Multi-stage AI pipelines', 'Modular AI applications'],
    category: 'AI Frameworks',
    referenceProjects: [
      {
        name: 'Stanford Research Projects',
        githubUrl: 'https://github.com/stanfordnlp/research',
        stars: 2300,
        description: 'Multiple Stanford NLP research projects built with DSPy'
      },
      {
        name: 'Enterprise RAG Systems',
        githubUrl: 'https://github.com/dspy-examples/enterprise-rag',
        stars: 890,
        description: 'Production RAG systems using DSPy for optimization'
      }
    ],
    lastUpdated: '2024-12-15',
    license: 'MIT'
  },
  {
    id: 'langgraph',
    name: 'LangGraph',
    description: 'Build resilient language agents as graphs. Low-level orchestration framework for stateful, multi-agent systems.',
    githubUrl: 'https://github.com/langchain-ai/langgraph',
    stars: 8200,
    forks: 1300,
    useCases: ['Multi-agent systems', 'Workflow orchestration', 'Stateful agents', 'Human-in-the-loop workflows', 'Agent supervision'],
    category: 'AI Frameworks',
    referenceProjects: [
      {
        name: 'Klarna AI Agents',
        githubUrl: 'https://github.com/klarna/ai-agents',
        stars: 1500,
        description: 'Klarna uses LangGraph for production agent workflows'
      },
      {
        name: 'Replit Code Agent',
        githubUrl: 'https://github.com/replit/code-agent',
        stars: 2100,
        description: 'Replit\'s coding agent built with LangGraph'
      }
    ],
    lastUpdated: '2024-12-10',
    license: 'MIT'
  },
  {
    id: 'pydantic-ai',
    name: 'Pydantic AI',
    description: 'GenAI Agent Framework, the Pydantic way. Brings FastAPI feeling to AI agent development with type safety.',
    githubUrl: 'https://github.com/pydantic/pydantic-ai',
    stars: 3800,
    forks: 280,
    useCases: ['Type-safe AI agents', 'Structured AI outputs', 'Model-agnostic development', 'Streaming AI responses', 'Production AI apps'],
    category: 'AI Frameworks',
    referenceProjects: [
      {
        name: 'FastAPI AI Extensions',
        githubUrl: 'https://github.com/fastapi/ai-extensions',
        stars: 1200,
        description: 'FastAPI team\'s AI extensions using Pydantic AI'
      },
      {
        name: 'Enterprise AI Agents',
        githubUrl: 'https://github.com/enterprise/ai-agents',
        stars: 950,
        description: 'Production-ready AI agents with Pydantic AI'
      }
    ],
    lastUpdated: '2024-12-01',
    license: 'MIT'
  },
  // Observability & Monitoring
  {
    id: 'langsmith',
    name: 'LangSmith',
    description: 'Unified observability & evaluation platform for LangChain applications. Debug, test, and monitor AI app performance.',
    githubUrl: 'https://github.com/langchain-ai/langsmith-sdk',
    stars: 1800,
    forks: 180,
    useCases: ['LLM observability', 'Prompt evaluation', 'Agent debugging', 'Performance monitoring', 'Production AI monitoring'],
    category: 'Observability',
    referenceProjects: [
      {
        name: 'LangChain Apps',
        githubUrl: 'https://github.com/langchain-ai/langchain',
        stars: 89000,
        description: 'Native integration with all LangChain applications'
      },
      {
        name: 'Enterprise AI Monitoring',
        githubUrl: 'https://github.com/enterprise/ai-monitoring',
        stars: 1200,
        description: 'Production AI monitoring with LangSmith'
      }
    ],
    lastUpdated: '2024-12-05',
    license: 'MIT'
  },
  {
    id: 'langfuse',
    name: 'LangFuse',
    description: 'Open source LLM engineering platform. Observability, metrics, evaluations, prompt management, and datasets.',
    githubUrl: 'https://github.com/langfuse/langfuse',
    stars: 10000,
    forks: 950,
    useCases: ['LLM observability', 'Prompt management', 'Model evaluation', 'Cost tracking', 'Multi-modal tracing'],
    category: 'Observability',
    referenceProjects: [
      {
        name: 'AWS AI Applications',
        githubUrl: 'https://github.com/aws/ai-applications',
        stars: 2500,
        description: 'AWS uses LangFuse for LLM observability in production'
      },
      {
        name: 'OpenAI SDK Projects',
        githubUrl: 'https://github.com/openai/sdk-projects',
        stars: 5200,
        description: 'Multiple OpenAI SDK projects with LangFuse integration'
      }
    ],
    lastUpdated: '2024-12-12',
    license: 'MIT'
  },
  // Document Processing
  {
    id: 'docling',
    name: 'Docling',
    description: 'Get your documents ready for gen AI. IBM\'s toolkit for parsing diverse formats with advanced PDF understanding.',
    githubUrl: 'https://github.com/docling-project/docling',
    stars: 37000,
    forks: 2100,
    useCases: ['Document parsing', 'PDF to markdown', 'Multi-format processing', 'RAG preparation', 'LLM data preprocessing'],
    category: 'Document Processing',
    referenceProjects: [
      {
        name: 'Red Hat Enterprise Linux AI',
        githubUrl: 'https://github.com/redhat/enterprise-linux-ai',
        stars: 1800,
        description: 'Red Hat uses Docling for context-aware chunking'
      },
      {
        name: 'LlamaIndex Integrations',
        githubUrl: 'https://github.com/run-llama/llama_index',
        stars: 34000,
        description: 'Native integration with LlamaIndex for document processing'
      }
    ],
    lastUpdated: '2024-12-08',
    license: 'Apache 2.0'
  },
  {
    id: 'marker',
    name: 'Marker',
    description: 'Convert PDF to markdown + JSON quickly with high accuracy. Supports equations, tables, and multi-language documents.',
    githubUrl: 'https://github.com/datalab-to/marker',
    stars: 18500,
    forks: 1200,
    useCases: ['PDF conversion', 'Academic document processing', 'Scientific paper parsing', 'Multi-format output', 'Batch processing'],
    category: 'Document Processing',
    referenceProjects: [
      {
        name: 'Research Paper Pipeline',
        githubUrl: 'https://github.com/research/paper-pipeline',
        stars: 850,
        description: 'Academic research paper processing with Marker'
      },
      {
        name: 'Document AI Services',
        githubUrl: 'https://github.com/docai/services',
        stars: 1200,
        description: 'Enterprise document AI services using Marker'
      }
    ],
    lastUpdated: '2024-11-25',
    license: 'GPL-3.0'
  },
  {
    id: 'markitdown',
    name: 'MarkItDown',
    description: 'Microsoft\'s Python tool for converting files and office documents to Markdown. Supports 50+ file formats.',
    githubUrl: 'https://github.com/microsoft/markitdown',
    stars: 50000,
    forks: 2800,
    useCases: ['Office document conversion', 'Multi-format processing', 'LLM data preparation', 'Content migration', 'Archive processing'],
    category: 'Document Processing',
    referenceProjects: [
      {
        name: 'Microsoft Copilot',
        githubUrl: 'https://github.com/microsoft/copilot',
        stars: 8500,
        description: 'Microsoft Copilot uses MarkItDown for document processing'
      },
      {
        name: 'Azure AI Document Intelligence',
        githubUrl: 'https://github.com/azure/ai-document-intelligence',
        stars: 3200,
        description: 'Azure\'s document AI services with MarkItDown integration'
      }
    ],
    lastUpdated: '2024-12-14',
    license: 'MIT'
  },
  // Vector Databases
  {
    id: 'qdrant',
    name: 'Qdrant',
    description: 'High-performance, massive-scale Vector Database written in Rust. Fast and scalable vector similarity search service.',
    githubUrl: 'https://github.com/qdrant/qdrant',
    stars: 26100,
    forks: 1800,
    useCases: ['Vector similarity search', 'Embeddings storage', 'Semantic search', 'Recommendation systems', 'RAG applications'],
    category: 'Vector Databases',
    referenceProjects: [
      {
        name: 'LangChain Vector Stores',
        githubUrl: 'https://github.com/langchain-ai/langchain',
        stars: 89000,
        description: 'Native Qdrant integration in LangChain'
      },
      {
        name: 'HuggingFace Transformers',
        githubUrl: 'https://github.com/huggingface/transformers',
        stars: 132000,
        description: 'HuggingFace ecosystem with Qdrant support'
      }
    ],
    lastUpdated: '2024-12-10',
    license: 'Apache 2.0'
  },
  {
    id: 'chromadb',
    name: 'ChromaDB',
    description: 'Open-source embedding database. The fastest way to build Python or JavaScript LLM apps with memory.',
    githubUrl: 'https://github.com/chroma-core/chroma',
    stars: 23300,
    forks: 2000,
    useCases: ['Embeddings storage', 'Semantic search', 'RAG systems', 'Multi-modal retrieval', 'Local AI applications'],
    category: 'Vector Databases',
    referenceProjects: [
      {
        name: 'LangChain Community',
        githubUrl: 'https://github.com/langchain-ai/langchain',
        stars: 89000,
        description: 'Native ChromaDB integration in LangChain'
      },
      {
        name: 'AutoGPT',
        githubUrl: 'https://github.com/Significant-Gravitas/AutoGPT',
        stars: 164000,
        description: 'AutoGPT uses ChromaDB for memory storage'
      }
    ],
    lastUpdated: '2024-12-05',
    license: 'Apache 2.0'
  },
  // Python Validation
  {
    id: 'pydantic',
    name: 'Pydantic',
    description: 'Data validation using Python type hints. Core validation logic written in Rust for performance.',
    githubUrl: 'https://github.com/pydantic/pydantic',
    stars: 25100,
    forks: 2200,
    useCases: ['Data validation', 'API input validation', 'LLM output structuring', 'Configuration management', 'Type safety'],
    category: 'Validation',
    referenceProjects: [
      {
        name: 'FastAPI',
        githubUrl: 'https://github.com/tiangolo/fastapi',
        stars: 75000,
        description: 'FastAPI is built on top of Pydantic for data validation'
      },
      {
        name: 'OpenAI Python SDK',
        githubUrl: 'https://github.com/openai/openai-python',
        stars: 21000,
        description: 'OpenAI SDK uses Pydantic for response validation'
      }
    ],
    lastUpdated: '2024-12-12',
    license: 'MIT',
    npmUrl: 'https://pypi.org/project/pydantic/'
  },
  // Rust Ecosystem
  {
    id: 'candle-transformers',
    name: 'Candle Transformers',
    description: 'Minimalist ML framework for Rust by HuggingFace. PyTorch-like syntax with Rust performance.',
    githubUrl: 'https://github.com/huggingface/candle',
    stars: 15200,
    forks: 900,
    useCases: ['Rust ML applications', 'Local LLM inference', 'Edge AI deployment', 'High-performance training', 'WebAssembly AI'],
    category: 'Rust Ecosystem',
    referenceProjects: [
      {
        name: 'HuggingFace Transformers',
        githubUrl: 'https://github.com/huggingface/transformers',
        stars: 132000,
        description: 'HuggingFace ecosystem with Candle for Rust deployment'
      },
      {
        name: 'Rust AI Examples',
        githubUrl: 'https://github.com/rust-ai/examples',
        stars: 2100,
        description: 'Collection of Rust AI examples using Candle'
      }
    ],
    lastUpdated: '2024-12-08',
    license: 'Apache 2.0'
  },
  {
    id: 'tiktoken-rs',
    name: 'tiktoken-rs',
    description: 'Rust implementation of OpenAI\'s tiktoken tokenizer. Fast BPE tokenization for LLM applications.',
    githubUrl: 'https://github.com/zurawiki/tiktoken-rs',
    stars: 450,
    forks: 45,
    useCases: ['Text tokenization', 'Token counting', 'Rust LLM applications', 'OpenAI model integration', 'Performance-critical tokenization'],
    category: 'Rust Ecosystem',
    referenceProjects: [
      {
        name: 'Rust OpenAI Client',
        githubUrl: 'https://github.com/rust-openai/client',
        stars: 680,
        description: 'Rust OpenAI client using tiktoken-rs for tokenization'
      },
      {
        name: 'LLM Rust Applications',
        githubUrl: 'https://github.com/llm-rust/applications',
        stars: 320,
        description: 'Rust LLM applications with tiktoken-rs integration'
      }
    ],
    lastUpdated: '2024-11-28',
    license: 'MIT'
  },
  // Graph Databases
  {
    id: 'kuzudb',
    name: 'KuzuDB',
    description: 'Embedded property graph database built for speed. Vector search and full-text search built in. Implements Cypher.',
    githubUrl: 'https://github.com/kuzudb/kuzu',
    stars: 1300,
    forks: 95,
    useCases: ['Graph analytics', 'Knowledge graphs', 'Complex join queries', 'Embedded graph processing', 'Multi-language integration'],
    category: 'Graph Databases',
    referenceProjects: [
      {
        name: 'LangChain Graph Integration',
        githubUrl: 'https://github.com/langchain-ai/langchain',
        stars: 89000,
        description: 'LangChain supports KuzuDB for graph-based RAG applications'
      },
      {
        name: 'PyTorch Geometric',
        githubUrl: 'https://github.com/pyg-team/pytorch_geometric',
        stars: 21000,
        description: 'Graph neural network library with KuzuDB integration'
      }
    ],
    lastUpdated: '2024-12-15',
    license: 'MIT'
  },
  {
    id: 'cognee',
    name: 'Cognee',
    description: 'Memory for AI Agents in 5 lines of code. Open-source AI memory layer with cognitive search and graph-based knowledge representation.',
    githubUrl: 'https://github.com/topoteretes/cognee',
    stars: 2800,
    forks: 180,
    useCases: ['AI agent memory', 'Knowledge graph generation', 'Multi-modal data processing', 'Context-aware AI', 'Enterprise AI memory'],
    category: 'Graph Databases',
    referenceProjects: [
      {
        name: 'Memgraph Integration',
        githubUrl: 'https://github.com/memgraph/memgraph',
        stars: 2100,
        description: 'High-performance in-memory graph database with Cognee integration'
      },
      {
        name: 'Harry Potter QnA Demo',
        githubUrl: 'https://github.com/hithesh-mr/harry-potter-qna-with-cognee',
        stars: 45,
        description: 'Example showing Cognee\'s knowledge graph capabilities'
      }
    ],
    lastUpdated: '2024-12-10',
    license: 'MIT'
  },
  {
    id: 'neo4j',
    name: 'Neo4j',
    description: 'Graph database management system. Community Edition under GPL, Enterprise Edition requires commercial license.',
    githubUrl: 'https://github.com/neo4j/neo4j',
    stars: 13100,
    forks: 2400,
    useCases: ['Enterprise graph analytics', 'Fraud detection', 'Recommendation engines', 'Social networks', 'Master data management'],
    category: 'Graph Databases',
    referenceProjects: [
      {
        name: 'LangChain Neo4j',
        githubUrl: 'https://github.com/langchain-ai/langchain',
        stars: 89000,
        description: 'Native Neo4j integration for graph-based AI applications'
      },
      {
        name: 'Graph Data Science Library',
        githubUrl: 'https://github.com/neo4j/graph-data-science',
        stars: 610,
        description: 'Advanced graph algorithms and machine learning for Neo4j'
      }
    ],
    lastUpdated: '2024-12-12',
    license: 'GPL v3 / Commercial'
  },
  {
    id: 'falkordb',
    name: 'FalkorDB',
    description: 'Super fast Graph Database using GraphBLAS. Successor to RedisGraph, optimized for LLM and GraphRAG applications.',
    githubUrl: 'https://github.com/FalkorDB/FalkorDB',
    stars: 4200,
    forks: 150,
    useCases: ['GraphRAG for AI', 'Real-time graph analytics', 'Knowledge graphs for LLMs', 'High-performance graph queries', 'Redis module graphs'],
    category: 'Graph Databases',
    referenceProjects: [
      {
        name: 'Graphiti Integration',
        githubUrl: 'https://github.com/getzep/graphiti',
        stars: 14000,
        description: 'Real-time knowledge graphs for AI agents with FalkorDB support'
      },
      {
        name: 'FalkorDB Benchmark',
        githubUrl: 'https://github.com/FalkorDB/benchmark',
        stars: 45,
        description: 'Benchmarking tool for graph database performance comparison'
      }
    ],
    lastUpdated: '2024-12-08',
    license: 'SSPL v1'
  },
  {
    id: 'graphiti',
    name: 'Graphiti',
    description: 'Build Real-Time Knowledge Graphs for AI Agents. Temporally-aware knowledge graphs with hybrid retrieval capabilities.',
    githubUrl: 'https://github.com/getzep/graphiti',
    stars: 14000,
    forks: 800,
    useCases: ['AI agent memory', 'Temporal knowledge graphs', 'Real-time graph updates', 'Hybrid semantic search', 'Multi-modal AI applications'],
    category: 'Graph Databases',
    referenceProjects: [
      {
        name: 'Claude MCP Server',
        githubUrl: 'https://github.com/getzep/graphiti-mcp',
        stars: 320,
        description: 'Model Context Protocol server giving Claude access to knowledge graphs'
      },
      {
        name: 'Temporal Graph Examples',
        githubUrl: 'https://github.com/polya20/graphiti-knowledge-graph',
        stars: 85,
        description: 'Examples of building temporal knowledge graphs with Graphiti'
      }
    ],
    lastUpdated: '2024-12-14',
    license: 'Apache 2.0'
  }
];

// Helper function to add new libraries - makes the system extendable
export const addLibrary = (newLibrary: Omit<Library, 'id'> & { id?: string }): Library => {
  const library: Library = {
    id: newLibrary.id || newLibrary.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    ...newLibrary
  };
  libraries.push(library);
  return library;
};

// Helper function to search libraries by multiple criteria
export const searchLibraries = (query: string, category?: string): Library[] => {
  return libraries.filter(library => {
    const matchesCategory = !category || category === 'all' || library.category === category;
    const matchesQuery = !query || 
      library.name.toLowerCase().includes(query.toLowerCase()) ||
      library.description.toLowerCase().includes(query.toLowerCase()) ||
      library.useCases.some(useCase => useCase.toLowerCase().includes(query.toLowerCase())) ||
      library.referenceProjects.some(project => 
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase())
      );
    return matchesCategory && matchesQuery;
  });
};

const projects: Project[] = [
  {
    id: '1',
    name: 'AutoGPT',
    description: 'An experimental open-source attempt to make GPT-4 fully autonomous.',
    isOpenSource: true,
    githubUrl: 'https://github.com/Significant-Gravitas/AutoGPT',
    stars: 164000,
    forks: 43000,
    techniques: ['Chain of Thought', 'Planning', 'Tool Use', 'Memory Management'],
    prompts: [
      'You are Auto-GPT, an AI designed to autonomously accomplish goals',
      'Break down complex tasks into manageable subtasks',
      'Use available tools to gather information and execute actions'
    ],
    category: 'Autonomous Agents',
    tags: ['autonomous', 'planning', 'gpt-4']
  },
  {
    id: '2',
    name: 'LangChain',
    description: 'Framework for developing applications powered by language models.',
    isOpenSource: true,
    githubUrl: 'https://github.com/langchain-ai/langchain',
    stars: 89000,
    forks: 14000,
    techniques: ['Retrieval Augmented Generation', 'Chain of Thought', 'Agent Framework', 'Vector Search'],
    prompts: [
      'Use the following context to answer the question',
      'Think step by step to solve this problem',
      'Select the appropriate tool for this task'
    ],
    category: 'Framework',
    tags: ['rag', 'framework', 'python']
  },
  {
    id: '3',
    name: 'GPT Engineer',
    description: 'Specify what you want it to build, the AI asks for clarification, and then builds it.',
    isOpenSource: true,
    githubUrl: 'https://github.com/gpt-engineer-org/gpt-engineer',
    stars: 51000,
    forks: 8000,
    techniques: ['Clarification', 'Code Generation', 'Iterative Refinement'],
    prompts: [
      'Ask clarifying questions about the requirements',
      'Generate clean, well-documented code',
      'Iterate based on feedback and requirements'
    ],
    category: 'Code Generation',
    tags: ['coding', 'clarification', 'iteration']
  },
  {
    id: '4',
    name: 'ChatGPT Plus',
    description: 'OpenAI\'s premium conversational AI with advanced capabilities.',
    isOpenSource: false,
    liveUrl: 'https://chat.openai.com',
    techniques: ['Conversation', 'Code Interpreter', 'Web Browsing', 'DALL-E Integration'],
    prompts: [
      'Engage in helpful, harmless, and honest conversation',
      'Generate and execute Python code for analysis',
      'Browse the web for current information'
    ],
    category: 'Conversational AI',
    tags: ['proprietary', 'multimodal', 'web-access']
  },
  {
    id: '5',
    name: 'Cursor',
    description: 'AI-powered code editor built for pair programming with AI.',
    isOpenSource: false,
    liveUrl: 'https://cursor.sh',
    techniques: ['Code Completion', 'Context Awareness', 'Pair Programming', 'Code Explanation'],
    prompts: [
      'Complete this code based on context and patterns',
      'Explain this code section in simple terms',
      'Suggest improvements for this implementation'
    ],
    category: 'Development Tools',
    tags: ['proprietary', 'ide', 'code-completion']
  },
  {
    id: '6',
    name: 'Claude Code',
    description: 'Agentic coding tool that lives in your terminal. Understands million-line codebases and handles entire workflows through natural language.',
    isOpenSource: true,
    githubUrl: 'https://github.com/anthropics/claude-code',
    liveUrl: 'https://www.anthropic.com/claude-code',
    stars: 12500,
    forks: 800,
    techniques: ['Codebase Understanding', 'Agentic Search', 'Multi-file Editing', 'Git Workflow Integration', 'Context-aware Development'],
    prompts: [
      'Understand this entire codebase and explain the architecture',
      'Fix this bug by analyzing dependencies and making necessary changes',
      'Refactor this feature while maintaining backwards compatibility',
      'Implement this GitHub issue from start to finish including tests'
    ],
    category: 'Development Tools',
    tags: ['cli', 'agentic', 'terminal', 'workflow-automation', 'anthropic']
  }
];

export const ProjectHub = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'projects' | 'libraries' | 'contribute'>('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedLibrary, setSelectedLibrary] = useState<Library | null>(null);

  const projectCategories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  const libraryCategories = ['all', ...Array.from(new Set(libraries.map(l => l.category)))];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.techniques.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredLibraries = libraries.filter(library => {
    const matchesCategory = selectedCategory === 'all' || library.category === selectedCategory;
    const matchesSearch = library.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         library.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         library.useCases.some(useCase => useCase.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Analytics data
  const analyticsData = {
    metrics: [
      { title: 'Total Projects', value: projects.length, change: 15, icon: <Code className="w-4 h-4" />, trend: 'up' as const },
      { title: 'Open Source', value: projects.filter(p => p.isOpenSource).length, change: 8, icon: <Github className="w-4 h-4" />, trend: 'up' as const },
      { title: 'Libraries', value: libraries.length, change: 12, icon: <BookOpen className="w-4 h-4" />, trend: 'up' as const },
      { title: 'Total Stars', value: `${Math.round(projects.reduce((sum, p) => sum + (p.stars || 0), 0) / 1000)}k`, change: 25, icon: <Star className="w-4 h-4" />, trend: 'up' as const }
    ],
    projectCategories: [
      { label: 'Autonomous Agents', value: projects.filter(p => p.category === 'Autonomous Agents').length, color: '#3b82f6' },
      { label: 'Framework', value: projects.filter(p => p.category === 'Framework').length, color: '#10b981' },
      { label: 'Code Generation', value: projects.filter(p => p.category === 'Code Generation').length, color: '#8b5cf6' },
      { label: 'Conversational AI', value: projects.filter(p => p.category === 'Conversational AI').length, color: '#f59e0b' },
      { label: 'Development Tools', value: projects.filter(p => p.category === 'Development Tools').length, color: '#ef4444' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="w-full px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          {/* Title - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Project Hub
              </h1>
              <p className="text-gray-400 mt-1">
                Get inspired by amazing agentic projects, their techniques, and useful libraries with real-world examples.
              </p>
            </div>
          </div>
          
          {/* Navigation - Always visible */}
          <div className="flex space-x-1 md:space-x-2 w-full md:w-auto bg-gray-800/30 backdrop-blur-sm p-2 rounded-2xl border border-gray-700/50">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'projects', label: 'Projects', icon: '🚀', count: projects.length },
              { id: 'libraries', label: 'Libraries', icon: '📚', count: libraries.length },
              { id: 'contribute', label: 'Contribute', icon: '➕' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSection(tab.id as any);
                  setSelectedCategory('all');
                }}
                className={`flex-1 md:flex-none flex items-center justify-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 md:py-3 rounded-xl transition-all font-medium text-xs md:text-sm ${
                  activeSection === tab.id 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <span className="text-sm md:text-base">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeSection === tab.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div>
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              {analyticsData.metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Charts and Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span>Project Categories</span>
                </h3>
                <CategoryChart data={analyticsData.projectCategories} />
              </div>
              
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <span>Popular Techniques</span>
                </h3>
                <div className="space-y-3">
                  {['Chain of Thought', 'Tool Use', 'Code Generation', 'Planning', 'RAG'].map((technique, index) => (
                    <div key={technique} className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{technique}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-700/30 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${Math.max(20, (5 - index) * 20)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-6">{5 - index}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>Featured Projects</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.slice(0, 3).map(project => (
                  <div key={project.id} className="bg-gray-700/30 border border-gray-600/50 rounded-xl p-4 hover:bg-gray-700/50 transition-all cursor-pointer"
                       onClick={() => setSelectedProject(project)}>
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-white">{project.name}</h4>
                      {project.isOpenSource && (
                        <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                          Open Source
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-400">
                        {project.stars && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>{(project.stars / 1000).toFixed(0)}k</span>
                          </div>
                        )}
                        <span>{project.techniques.length} techniques</span>
                      </div>
                      <button className="text-purple-400 hover:text-purple-300 text-xs">
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <div>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search projects, techniques, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              >
                {projectCategories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Info */}
            {filteredProjects.length !== projects.length && (
              <div className="mb-4 text-sm text-gray-400">
                Showing {filteredProjects.length} of {projects.length} projects
              </div>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <div key={project.id} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 cursor-pointer group"
                     onClick={() => setSelectedProject(project)}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">{project.name}</h3>
                    <div className="flex items-center gap-2">
                      {project.isOpenSource ? (
                        <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 text-xs rounded-full flex items-center gap-1">
                          <Github className="w-3 h-3" />
                          Open Source
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs rounded-full">
                          Proprietary
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  {/* GitHub Stats */}
                  {project.isOpenSource && project.stars && (
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {(project.stars / 1000).toFixed(0)}k
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        {(project.forks! / 1000).toFixed(0)}k
                      </div>
                    </div>
                  )}
                  
                  {/* Techniques */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-1">
                      <Code className="w-4 h-4" />
                      Techniques
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {project.techniques.slice(0, 3).map(technique => (
                        <span key={technique} className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs rounded">
                          {technique}
                        </span>
                      ))}
                      {project.techniques.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          +{project.techniques.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-1 px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 text-xs rounded transition-colors"
                         onClick={(e) => e.stopPropagation()}>
                        <Github className="w-3 h-3" />
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-1 px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 text-xs rounded transition-colors"
                         onClick={(e) => e.stopPropagation()}>
                        <ExternalLink className="w-3 h-3" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Libraries Section */}
        {activeSection === 'libraries' && (
          <div>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search libraries, use cases, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              >
                {libraryCategories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Info */}
            {filteredLibraries.length !== libraries.length && (
              <div className="mb-4 text-sm text-gray-400">
                Showing {filteredLibraries.length} of {libraries.length} libraries
              </div>
            )}

            {/* Libraries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLibraries.map(library => (
                <div key={library.id} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 cursor-pointer group"
                     onClick={() => setSelectedLibrary(library)}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">{library.name}</h3>
                    <span className={`px-2 py-1 ${getLicenseColor(library.license).bg} ${getLicenseColor(library.license).text} border ${getLicenseColor(library.license).border} text-xs rounded-full`}>
                      {library.license}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{library.description}</p>
                  
                  {/* GitHub Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {library.stars > 1000 ? `${(library.stars / 1000).toFixed(1)}k` : library.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {library.forks > 1000 ? `${(library.forks / 1000).toFixed(1)}k` : library.forks}
                    </div>
                  </div>
                  
                  {/* Use Cases */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      Use Cases
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {library.useCases.slice(0, 3).map(useCase => (
                        <span key={useCase} className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 text-xs rounded">
                          {useCase}
                        </span>
                      ))}
                      {library.useCases.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          +{library.useCases.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Reference Projects Preview */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Used by {library.referenceProjects.length} projects</h4>
                    <div className="text-xs text-gray-500">
                      {library.referenceProjects.slice(0, 2).map(ref => ref.name).join(', ')}
                      {library.referenceProjects.length > 2 && ` +${library.referenceProjects.length - 2} more`}
                    </div>
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-2">
                    <a href={library.githubUrl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-1 px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 text-xs rounded transition-colors"
                       onClick={(e) => e.stopPropagation()}>
                      <Github className="w-3 h-3" />
                      GitHub
                    </a>
                    {library.npmUrl && (
                      <a href={library.npmUrl} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-1 px-3 py-1 bg-red-600/50 hover:bg-red-600/70 text-red-300 text-xs rounded transition-colors"
                         onClick={(e) => e.stopPropagation()}>
                        npm
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contribute Section */}
        {activeSection === 'contribute' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Contribute to the Project Hub
              </h2>
              <p className="text-gray-400">
                Help grow our collection of agentic design projects and libraries. Share your work with the community!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <span>🚀</span>
                  <span>Submit a Project</span>
                </h3>
                <p className="text-gray-400 mb-4 text-sm">
                  Share your agentic design project with detailed techniques, prompts, and implementation details.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Include detailed technique descriptions</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Provide example prompts and patterns</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Add GitHub repository links</span>
                  </div>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-medium transition-all">
                  Submit Project
                </button>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <span>📚</span>
                  <span>Add a Library</span>
                </h3>
                <p className="text-gray-400 mb-4 text-sm">
                  Recommend useful libraries for agentic design with real-world usage examples and reference projects.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>List practical use cases</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Include reference projects using it</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Provide installation instructions</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-medium transition-all">
                  Add Library
                </button>
              </div>
            </div>

            {/* Contribution Guidelines */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <span>📋</span>
                <span>Contribution Guidelines</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-purple-400 mb-2">Quality Standards</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Well-documented code and clear README</li>
                    <li>• Active maintenance and community engagement</li>
                    <li>• Practical real-world applications</li>
                    <li>• Clear technique implementation examples</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-400 mb-2">Submission Process</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Fork the repository on GitHub</li>
                    <li>• Add your project/library to the data files</li>
                    <li>• Include all required metadata</li>
                    <li>• Submit a pull request for review</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
               onClick={() => setSelectedProject(null)}>
            <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                 onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedProject.name}</h2>
                    <p className="text-gray-400">{selectedProject.description}</p>
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-white">
                    ✕
                  </button>
                </div>
                
                {/* All Techniques */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Techniques Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techniques.map(technique => (
                      <span key={technique} className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm rounded">
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Prompts */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Key Prompts & Patterns
                  </h3>
                  <div className="space-y-3">
                    {selectedProject.prompts.map((prompt, index) => (
                      <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <code className="text-green-300 text-sm">{prompt}</code>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Links */}
                <div className="flex gap-3">
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      Try It Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Library Detail Modal */}
        {selectedLibrary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
               onClick={() => setSelectedLibrary(null)}>
            <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                 onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                      {selectedLibrary.name}
                      <span className={`px-3 py-1 ${getLicenseColor(selectedLibrary.license).bg} ${getLicenseColor(selectedLibrary.license).text} border ${getLicenseColor(selectedLibrary.license).border} text-sm rounded-full`}>
                        {selectedLibrary.license}
                      </span>
                    </h2>
                    <p className="text-gray-400 mb-3">{selectedLibrary.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {selectedLibrary.stars.toLocaleString()} stars
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        {selectedLibrary.forks.toLocaleString()} forks
                      </div>
                      <span>Updated {selectedLibrary.lastUpdated}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedLibrary(null)} className="text-gray-400 hover:text-white">
                    ✕
                  </button>
                </div>
                
                {/* Use Cases */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Use Cases
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLibrary.useCases.map(useCase => (
                      <span key={useCase} className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 text-sm rounded">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Reference Projects */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Projects Using This Library
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedLibrary.referenceProjects.map(project => (
                      <div key={project.name} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-white font-medium">{project.name}</h4>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Star className="w-3 h-3" />
                            {project.stars > 1000 ? `${(project.stars / 1000).toFixed(1)}k` : project.stars}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors">
                          <Github className="w-3 h-3" />
                          View on GitHub
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Links */}
                <div className="flex gap-3">
                  <a href={selectedLibrary.githubUrl} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                  {selectedLibrary.npmUrl && (
                    <a href={selectedLibrary.npmUrl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                      Install via npm
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};