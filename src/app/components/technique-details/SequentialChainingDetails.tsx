'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import { PatternRelationships, RelationshipData } from '../shared/PatternRelationships';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface SequentialChainingDetailsProps {
  selectedTechnique: any;
}

export const SequentialChainingDetails: React.FC<SequentialChainingDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Decompose', detail: 'Break task into focused stages' },
      { num: '2', action: 'Define I/O', detail: 'JSON schemas for each stage' },
      { num: '3', action: 'Chain', detail: 'Output[N] → Input[N+1]' },
      { num: '4', action: 'Validate', detail: 'Assert & retry at each step' },
      { num: '5', action: 'Monitor', detail: 'Log latency, cost, errors' }
    ],
    example: 'analyze_doc → extract_data → validate → transform → summarize'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use JSON/structured outputs between stages', icon: '✅' },
    { type: 'do', text: 'Cache deterministic stage outputs (huge cost savings)', icon: '✅' },
    { type: 'do', text: 'Use cache keys based on input hash + prompt version', icon: '✅' },
    { type: 'do', text: 'Implement circuit breakers & retries', icon: '✅' },
    { type: 'do', text: 'Set TTL for cached steps based on data freshness needs', icon: '✅' },
    { type: 'dont', text: 'Pass verbose prose between stages', icon: '❌' },
    { type: 'dont', text: 'Cache non-deterministic or time-sensitive steps', icon: '❌' },
    { type: 'dont', text: 'Skip cache invalidation on prompt changes', icon: '❌' },
    { type: 'dont', text: 'Ignore partial outputs/refusals', icon: '❌' },
    { type: 'dont', text: 'Let errors cascade unchecked', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Multi-step workflows (3+ stages)',
      'Complex reasoning tasks',
      'Need error isolation',
      'Different models per stage'
    ],
    avoidWhen: [
      'Simple single-step tasks',
      'Real-time/low-latency needs',
      'Tightly coupled logic',
      'Limited API budget'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Success Rate', measure: 'Per-stage & E2E completion' },
    { metric: 'Latency', measure: 'P50/P95 per stage' },
    { metric: 'Cost', measure: 'Σ(tokens × model_rate)' },
    { metric: 'Error Recovery', measure: '% failures handled' },
    { metric: 'Cache Hit Rate', measure: '% reused computations' },
    { metric: 'Cost Savings', measure: '$ saved via caching' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Document Analysis: parse → extract → analyze → summarize (cache parsing)',
    'Content Creation: research → outline → draft → edit (cache research)',
    'Data Pipeline: validate → transform → enrich → aggregate (cache transforms)',
    'Decision Flow: gather → evaluate → score → recommend (cache gathering)',
    'Report Generation: fetch → process → format → deliver (cache all but delivery)'
  ];

  // Comprehensive Relationship Data
  const relationshipData: RelationshipData = {
    // Learning & Progression
    prerequisites: [],
    nextSteps: [
      {
        id: 'parallel-chaining',
        name: 'Parallel Chaining',
        category: 'prompt-chaining',
        description: 'Execute multiple chains concurrently for speed and multi-perspective analysis',
        icon: '⚡',
        complexity: 'medium',
        reason: 'Natural next step to add concurrency to your linear chains'
      },
      {
        id: 'map-reduce',
        name: 'Map-Reduce',
        category: 'parallelization',
        description: 'Parallel processing followed by aggregation - perfect evolution of sequential chains',
        icon: '🗺️',
        complexity: 'medium',
        reason: 'Scale your sequential logic to handle parallel data streams'
      },
      {
        id: 'scatter-gather',
        name: 'Scatter-Gather',
        category: 'parallelization',
        description: 'Distribute sequential steps across multiple agents and gather results',
        icon: '📡',
        complexity: 'medium',
        reason: 'Transform linear chains into parallel distribution patterns'
      },
      {
        id: 'fork-join',
        name: 'Fork-Join',
        category: 'parallelization',
        description: 'Fork sequential tasks into parallel subtasks and join when complete',
        icon: '🍴',
        complexity: 'medium',
        reason: 'Add sophisticated parallel execution with synchronization points'
      },
      {
        id: 'stateful-graph-workflows',
        name: 'Stateful Graph Workflows',
        category: 'workflow-orchestration',
        description: 'DAG-based workflows with complex branching logic',
        icon: '🕸️',
        complexity: 'very-high',
        reason: 'Advanced evolution for complex non-linear workflows'
      }
    ],
    alternatives: [
      {
        id: 'cot',
        name: 'Chain-of-Thought',
        category: 'reasoning-techniques',
        description: 'Single-prompt step-by-step reasoning without explicit chaining',
        icon: '🔗',
        complexity: 'low',
        reason: 'Simpler approach when you don\'t need separate API calls for each step'
      },
      {
        id: 'react',
        name: 'ReAct (Reasoning + Acting)',
        category: 'tool-use',
        description: 'Interleaves reasoning and action steps with tool use',
        icon: '🎭',
        complexity: 'medium',
        reason: 'Better when you need dynamic tool usage throughout the workflow'
      }
    ],

    // Combination & Synergy
    combinesWith: [
      {
        id: 'self-critique',
        name: 'Self-Critique',
        category: 'reflection-techniques',
        description: 'Add validation and error correction to each chain step',
        icon: '🔄',
        complexity: 'medium',
        reason: 'Perfect combination - validate and fix outputs at each stage'
      },
      {
        id: 'advanced-rag',
        name: 'Advanced RAG',
        category: 'knowledge-retrieval',
        description: 'Dynamically retrieve relevant information for each step',
        icon: '📚',
        complexity: 'high',
        reason: 'Each chain step can retrieve different types of information as needed'
      },
      {
        id: 'function-calling',
        name: 'Function Calling',
        category: 'tool-use',
        description: 'Integrate structured tool calls within chain steps',
        icon: '🔧',
        complexity: 'medium',
        reason: 'Each step can call specialized tools and APIs for data processing'
      }
    ],
    enhancedBy: [
      {
        id: 'semantic-validation',
        name: 'Semantic Validation',
        category: 'evaluation-monitoring',
        description: 'Enforce structured outputs between chain steps',
        icon: '📋',
        complexity: 'low',
        reason: 'Critical for reliable data flow between steps'
      },
      {
        id: 'error-recovery-patterns',
        name: 'Error Recovery Patterns',
        category: 'fault-tolerance-infrastructure',
        description: 'Handle failures gracefully in chain execution',
        icon: '🔁',
        complexity: 'low',
        reason: 'Essential for production chain reliability'
      },
      {
        id: 'predictive-agent-fault-tolerance',
        name: 'Predictive Agent Fault Tolerance',
        category: 'fault-tolerance-infrastructure',
        description: 'Prevent cascade failures in chain execution',
        icon: '⚡',
        complexity: 'medium',
        reason: 'Protects downstream steps when upstream steps consistently fail'
      }
    ],
    enhances: [
      {
        id: 'cot',
        name: 'Chain-of-Thought',
        category: 'reasoning-techniques',
        description: 'Turn single-prompt CoT into multi-step executable workflow',
        icon: '🔗',
        complexity: 'low',
        reason: 'Makes CoT reasoning actionable with real intermediate outputs'
      },
      {
        id: 'function-calling',
        name: 'Function Calling',
        category: 'tool-use',
        description: 'Organize tool usage into structured workflows',
        icon: '🛠️',
        complexity: 'medium',
        reason: 'Transforms ad-hoc tool usage into systematic workflows'
      }
    ],

    // Evolution & Variants
    evolvesTo: [
      {
        id: 'conversational-orchestration',
        name: 'Conversational Orchestration',
        category: 'workflow-orchestration',
        description: 'Full-featured workflow engine with state management',
        icon: '🎼',
        complexity: 'high',
        reason: 'Natural evolution when you need complex state management and routing'
      },
      {
        id: 'stateful-graph-workflows',
        name: 'Stateful Graph Workflows',
        category: 'workflow-orchestration',
        description: 'DAG-based workflows with complex branching logic',
        icon: '🕸️',
        complexity: 'very-high',
        reason: 'Advanced evolution for complex non-linear workflows'
      }
    ],
    variants: [
      {
        id: 'parallel-chaining',
        name: 'Parallel Chaining',
        category: 'prompt-chaining',
        description: 'Chains with concurrent execution and aggregation',
        icon: '⚡',
        complexity: 'medium',
        reason: 'Parallel variant for speed and multi-perspective analysis'
      },
      {
        id: 'map-reduce',
        name: 'Map-Reduce Pattern',
        category: 'parallelization',
        description: 'Parallel processing followed by aggregation step',
        icon: '🗺️',
        complexity: 'medium',
        reason: 'Parallel variant for processing large datasets'
      },
      {
        id: 'scatter-gather',
        name: 'Scatter-Gather',
        category: 'parallelization',
        description: 'Distribute requests and collect responses in parallel',
        icon: '📡',
        complexity: 'medium',
        reason: 'Parallel variant that distributes chain steps across multiple services'
      },
      {
        id: 'async-await',
        name: 'Async-Await',
        category: 'parallelization',
        description: 'Non-blocking asynchronous execution with promise coordination',
        icon: '⏳',
        complexity: 'low',
        reason: 'Asynchronous variant for non-blocking sequential operations'
      }
    ],

    // Conflicts & Considerations
    conflictsWith: [],

    // Industry Applications - Real world use cases without fake pattern IDs
    industryApplications: [
      {
        domain: 'Financial Services',
        description: 'Multi-stage analysis and decision-making workflows using sequential chains',
        patterns: [
          {
            id: 'multi-criteria-decision',
            name: 'Multi-Criteria Decision Making',
            category: 'planning-execution',
            description: 'Data gathering → Analysis → Scoring → Recommendation workflow',
            icon: '📊'
          },
          {
            id: 'llm-as-judge',
            name: 'LLM-as-Judge',
            category: 'evaluation-monitoring',
            description: 'Sequential evaluation and scoring in risk assessment pipelines',
            icon: '⚖️'
          }
        ]
      },
      {
        domain: 'Content & Knowledge',
        description: 'Sequential processing for document analysis and knowledge extraction',
        patterns: [
          {
            id: 'advanced-rag',
            name: 'Advanced RAG',
            category: 'knowledge-retrieval',
            description: 'Multi-step retrieval and generation in document processing chains',
            icon: '📚'
          },
          {
            id: 'hierarchical-planning',
            name: 'Hierarchical Planning',
            category: 'planning-execution',
            description: 'Break down complex content tasks into sequential sub-goals',
            icon: '🗂️'
          }
        ]
      },
      {
        domain: 'Software Development',
        description: 'Code analysis and generation workflows',
        patterns: [
          {
            id: 'code-execution',
            name: 'Code Execution',
            category: 'tool-use',
            description: 'Sequential code generation, testing, and refinement workflows',
            icon: '💻'
          },
          {
            id: 'swe-bench-suite',
            name: 'SWE-Bench Suite',
            category: 'evaluation-monitoring',
            description: 'Sequential evaluation patterns for software engineering tasks',
            icon: '🔧'
          }
        ]
      }
    ]
  };

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Self-Consistency Improves Chain of Thought Reasoning (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' },
        { title: 'Least-to-Most Prompting Enables Complex Reasoning (Zhou et al., 2022)', url: 'https://arxiv.org/abs/2205.10625' },
        { title: 'Prompt Chaining - Survey of Prompt Engineering Methods (2024)', url: 'https://arxiv.org/abs/2402.07927' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Sequential Chains Documentation', url: 'https://python.langchain.com/api_reference/langchain/chains/langchain.chains.sequential.SequentialChain.html' },
        { title: 'OpenAI Structured Outputs and Prompt Engineering', url: 'https://platform.openai.com/docs/guides/structured-outputs' },
        { title: 'Anthropic Claude Chain Complex Prompts Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-prompts' },
        { title: 'LangChain Expression Language (LCEL) - Modern Chaining', url: 'https://python.langchain.com/docs/how_to/sequence/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain Python - SequentialChain Implementation', url: 'https://github.com/langchain-ai/langchain/tree/master/libs/langchain/langchain/chains' },
        { title: 'LlamaIndex Sequential Query Pipelines', url: 'https://docs.llamaindex.ai/en/stable/module_guides/querying/pipeline/' },
        { title: 'Haystack Pipeline Components', url: 'https://docs.haystack.deepset.ai/docs/pipelines' },
        { title: 'LangGraph - Stateful Multi-Actor Applications', url: 'https://langchain-ai.github.io/langgraph/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Discord Community', url: 'https://discord.gg/langchain' },
        { title: 'OpenAI Developer Forum - Prompt Engineering', url: 'https://community.openai.com/c/prompting/8' },
        { title: 'Anthropic Discord - Claude Developers', url: 'https://discord.gg/anthropic' },
        { title: 'Prompt Engineering Guide - Chaining Techniques', url: 'https://www.promptingguide.ai/techniques/prompt_chaining' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Break complex tasks into linear pipeline of focused steps"
        why="Reduces model cognitive load, isolates errors, enables tool integration & step caching"
        keyInsight="Output[N] → Input[N+1] with structured data (JSON) - each step cacheable"
      />

      <QuickImplementationSection
        steps={quickImplementation.steps}
        example={quickImplementation.example}
      />

      <DosAndDontsSection items={dosAndDonts} />

      <UsageGuideSection
        useWhen={usageGuide.useWhen}
        avoidWhen={usageGuide.avoidWhen}
      />

      <KeyMetricsSection metrics={keyMetrics} />

      <TopUseCasesSection useCases={topUseCases} />

      <PatternRelationships
        currentPatternId="sequential-chaining"
        currentPatternName="Sequential Chaining"
        relationships={relationshipData}
        className="mt-8"
      />

      <ReferencesSection categories={references} />
    </>
  );
};

export default SequentialChainingDetails;