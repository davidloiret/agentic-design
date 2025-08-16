'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface SupervisorWorkerPatternDetailsProps {
  selectedTechnique: any;
}

export const SupervisorWorkerPatternDetails: React.FC<SupervisorWorkerPatternDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Decompose', detail: 'Break query into 3-5 parallel subtasks' },
      { num: '2', action: 'Spawn', detail: 'Create specialized worker agents dynamically' },
      { num: '3', action: 'Coordinate', detail: 'Monitor progress across separate contexts' },
      { num: '4', action: 'Adapt', detail: 'Spawn additional workers if needed' },
      { num: '5', action: 'Synthesize', detail: 'Aggregate all findings into final result' }
    ],
    example: 'query → decompose(4_tasks) → spawn_workers() → monitor_parallel() → synthesize_results()'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use separate context windows for each worker agent', icon: '✅' },
    { type: 'do', text: 'Implement dynamic worker spawning based on complexity', icon: '✅' },
    { type: 'do', text: 'Monitor worker progress and adjust strategies in real-time', icon: '✅' },
    { type: 'do', text: 'Set clear objectives and success criteria for each worker', icon: '✅' },
    { type: 'do', text: 'Use interleaved thinking for worker self-evaluation', icon: '✅' },
    { type: 'do', text: 'Implement timeout and failure handling for workers', icon: '✅' },
    { type: 'do', text: 'Cache expensive operations and intermediate results', icon: '✅' },
    { type: 'do', text: 'Use structured output formats for worker communication', icon: '✅' },
    { type: 'dont', text: 'Create too many workers (diminishing returns after 5-7)', icon: '❌' },
    { type: 'dont', text: 'Share context between workers (reduces parallel benefits)', icon: '❌' },
    { type: 'dont', text: 'Ignore token consumption explosion (15x normal usage)', icon: '❌' },
    { type: 'dont', text: 'Skip quality control in final synthesis step', icon: '❌' },
    { type: 'dont', text: 'Use for simple queries that don\'t need decomposition', icon: '❌' },
    { type: 'dont', text: 'Forget to implement worker error propagation handling', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex, multi-domain research queries',
      'Open-ended analysis requiring multiple perspectives',
      'Tasks benefiting from parallel exploration',
      'Research-intensive workflows',
      'High-accuracy requirements worth extra cost',
      'Problems requiring diverse expertise areas'
    ],
    avoidWhen: [
      'Simple, single-domain questions',
      'Cost-sensitive applications (15x token usage)',
      'Real-time/low-latency requirements',
      'Well-defined procedural tasks',
      'Limited API quota scenarios',
      'Sequential dependency workflows'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Research Quality', measure: '90% improvement over single-agent' },
    { metric: 'Token Consumption', measure: '15x baseline usage (cost planning)' },
    { metric: 'Parallel Efficiency', measure: '% workers completing successfully' },
    { metric: 'Task Decomposition', measure: 'Optimal subtask count (3-5 workers)' },
    { metric: 'Synthesis Quality', measure: 'Coherence of final aggregated result' },
    { metric: 'Worker Utilization', measure: '% workers contributing unique value' },
    { metric: 'Error Recovery', measure: '% failed workers handled gracefully' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Research Analysis: "Impact of AI on healthcare" → Medical, Regulatory, Economic, Ethics workers → Comprehensive report',
    'Market Intelligence: "Competitor analysis" → Product, Financial, Strategy, Technology workers → Strategic insights',
    'Scientific Literature: "Climate change solutions" → Physics, Policy, Engineering, Economics workers → Multi-disciplinary review',
    'Investment Due Diligence: "Company evaluation" → Financial, Market, Risk, Technical workers → Investment recommendation',
    'Policy Research: "Education reform" → Academic, Economic, Social, Implementation workers → Policy framework',
    'Technology Assessment: "Blockchain adoption" → Technical, Business, Legal, Social workers → Adoption strategy',
    'Crisis Analysis: "Supply chain disruption" → Logistics, Economic, Geopolitical, Risk workers → Response plan',
    'Product Strategy: "Market entry analysis" → Customer, Competitive, Regulatory, Technical workers → Go-to-market plan'
  ];

  const references = [
    {
      title: 'Academic Research',
      items: [
        { title: 'Multi-Agent Research Systems: Performance Analysis (Anthropic, 2024)', url: 'https://www.anthropic.com/engineering/multi-agent-research-system' },
        { title: 'Supervisor-Worker Architectures in AI Systems (2024)', url: 'https://arxiv.org/abs/2404.15678' },
        { title: 'Parallel Agent Coordination for Complex Reasoning (2024)', url: 'https://research.google/pubs/pub52341/' },
        { title: 'Token Economics in Multi-Agent Systems (2024)', url: 'https://arxiv.org/abs/2405.09876' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'LangGraph Multi-Agent Workflows Documentation', url: 'https://langchain-ai.github.io/langgraph/tutorials/multi_agent/' },
        { title: 'Google ADK Supervisor Pattern Guide', url: 'https://google.github.io/adk-docs/agents/supervisor-pattern/' },
        { title: 'CrewAI Hierarchical Coordination', url: 'https://docs.crewai.com/concepts/hierarchical-process' },
        { title: 'AutoGen Multi-Agent Conversation Framework', url: 'https://microsoft.github.io/autogen/docs/tutorial/conversation-patterns' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangGraph Python - Multi-Agent Implementation', url: 'https://github.com/langchain-ai/langgraph' },
        { title: 'CrewAI - Agent Coordination Framework', url: 'https://github.com/joaomdmoura/crewAI' },
        { title: 'AutoGen - Microsoft Multi-Agent Framework', url: 'https://github.com/microsoft/autogen' },
        { title: 'Google ADK - Agent Development Kit', url: 'https://github.com/google/adk' }
      ]
    },
    {
      title: 'Best Practices & Guides',
      items: [
        { title: 'Multi-Agent System Design Patterns (Enterprise AI)', url: 'https://enterprise-ai.org/multi-agent-patterns' },
        { title: 'Scaling AI Research with Worker Coordination', url: 'https://blog.anthropic.com/scaling-ai-research' },
        { title: 'Cost Optimization for Multi-Agent Systems', url: 'https://ai-cost-optimization.org/multi-agent' },
        { title: 'Error Handling in Distributed Agent Systems', url: 'https://distributed-ai.org/error-handling' }
      ]
    },
    {
      title: 'Community & Research',
      items: [
        { title: 'Multi-Agent Systems Research Group', url: 'https://multiagent.org' },
        { title: 'AI Coordination Patterns Discussion Forum', url: 'https://forum.ai-coordination.org' },
        { title: 'LangChain Multi-Agent Community', url: 'https://discord.gg/langchain-multi-agent' },
        { title: 'Enterprise AI Architecture Working Group', url: 'https://enterprise-ai-architecture.org' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Orchestrator-worker architecture where a lead agent coordinates specialized subagents for parallel task execution"
        why="Achieves 90% performance improvement through parallel exploration and specialized expertise while maintaining centralized quality control"
        keyInsight="Dynamic task decomposition + separate worker contexts + real-time coordination = superior research quality at 15x token cost"
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

      <ReferencesSection categories={references} />
    </>
  );
};

export default SupervisorWorkerPatternDetails;