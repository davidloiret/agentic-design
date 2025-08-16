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

interface ConcurrentOrchestrationDetailsProps {
  selectedTechnique: any;
}

export const ConcurrentOrchestrationDetails: React.FC<ConcurrentOrchestrationDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Design Agents', detail: 'Create diverse agents with complementary expertise' },
      { num: '2', action: 'Setup Parallel Exec', detail: 'Configure concurrent processing with shared inputs' },
      { num: '3', action: 'Implement Consensus', detail: 'Add voting/aggregation mechanisms for result synthesis' },
      { num: '4', action: 'Add Coordination', detail: 'Implement orchestrator for resource management' },
      { num: '5', action: 'Monitor & Optimize', detail: 'Track performance metrics and optimize throughput' }
    ],
    example: 'FinancialAgent ∥ MarketAgent ∥ RiskAgent ∥ TechAgent → Consensus → Decision'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Design agents with truly diverse perspectives and expertise', icon: '✅' },
    { type: 'do', text: 'Use confidence-weighted voting for better consensus quality', icon: '✅' },
    { type: 'do', text: 'Implement timeout mechanisms to prevent blocking operations', icon: '✅' },
    { type: 'do', text: 'Cache results to avoid redundant processing across agents', icon: '✅' },
    { type: 'do', text: 'Monitor consensus quality and agent contribution metrics', icon: '✅' },
    { type: 'do', text: 'Use structured output formats for consistent aggregation', icon: '✅' },
    { type: 'dont', text: 'Create agents with overlapping roles and identical perspectives', icon: '❌' },
    { type: 'dont', text: 'Use simple majority voting without considering expertise levels', icon: '❌' },
    { type: 'dont', text: 'Allow infinite processing time without deadlock protection', icon: '❌' },
    { type: 'dont', text: 'Ignore resource contention and memory pressure issues', icon: '❌' },
    { type: 'dont', text: 'Accept first consensus without quality validation', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Need diverse perspectives on complex decisions',
      'Brainstorming and creative idea generation',
      'Risk assessment requiring multiple viewpoints',
      'Ensemble reasoning for higher accuracy',
      'Parallel processing can reduce overall latency',
      'Consensus building in high-stakes scenarios'
    ],
    avoidWhen: [
      'Simple tasks with clear optimal solutions',
      'Real-time systems requiring immediate responses',
      'Limited computational resources available',
      'Tasks requiring strict sequential dependencies',
      'When agent coordination overhead exceeds benefits'
    ]
  };

  const keyMetrics = [
    { metric: 'Consensus Quality', measure: 'Agreement level and confidence scores' },
    { metric: 'Response Diversity', measure: 'Variance in agent perspectives and solutions' },
    { metric: 'Processing Efficiency', measure: 'Parallel speedup vs sequential execution' },
    { metric: 'Decision Accuracy', measure: 'Ensemble performance vs individual agents' },
    { metric: 'Resource Utilization', measure: 'CPU/memory usage during concurrent execution' },
    { metric: 'Coordination Overhead', measure: 'Time spent in synchronization and aggregation' }
  ];

  const topUseCases = [
    'Investment Decision Analysis: Financial + Market + Risk + Technology agents parallel analysis with weighted consensus',
    'Medical Diagnosis: Clinical + Radiological + Laboratory + Specialist agents concurrent evaluation with confidence voting',
    'Creative Content Generation: Writer + Editor + Designer + Strategist agents simultaneous brainstorming with diverse outputs',
    'Cybersecurity Assessment: Network + Application + Compliance + Threat agents parallel security analysis with risk aggregation',
    'Strategic Planning: Operations + Finance + Legal + Technology agents concurrent SWOT analysis with consensus building'
  ];

  const references = [
    {
      title: 'Academic Papers (2022-2025)',
      items: [
        { title: 'Multi-Agent Collaboration Mechanisms: A Survey of LLMs (Tran et al., 2025)', url: 'https://arxiv.org/html/2501.06322v1' },
        { title: 'Multi-Agent Collaboration via Evolving Orchestration (Dang et al., 2025)', url: 'https://arxiv.org/abs/2505.19591' },
        { title: 'An Electoral Approach to Diversify LLM-based Multi-Agent Collective Decision-Making (2024)', url: 'https://arxiv.org/html/2410.15168v1' },
        { title: 'Navigating Complexity: Orchestrated Problem Solving with Multi-Agent LLMs (Rasal & Hauer, 2024)', url: 'https://arxiv.org/html/2402.16713' }
      ]
    },
    {
      title: 'Consensus and Voting Research',
      items: [
        { title: 'ReConcile: Round-Table Conference Improves Reasoning via Consensus (2024)', url: 'https://aclanthology.org/2024.acl-long.381/' },
        { title: 'LLM Voting: Human Choices and AI Collective Decision Making (2024)', url: 'https://arxiv.org/html/2402.01766v1' },
        { title: 'A Survey on LLM-based Multi-Agent Systems: Workflow, Infrastructure, and Challenges (2024)', url: 'https://link.springer.com/article/10.1007/s44336-024-00009-2' },
        { title: 'LLM Multi-Agent Systems: Challenges and Open Problems (2024)', url: 'https://arxiv.org/html/2402.03578' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'Microsoft Semantic Kernel - Concurrent Agent Orchestration', url: 'https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-orchestration/concurrent' },
        { title: 'AutoGen - Multi-Agent Conversation Framework', url: 'https://microsoft.github.io/autogen/' },
        { title: 'LangGraph - Multi-Agent State Machine Orchestration', url: 'https://langchain-ai.github.io/langgraph/' },
        { title: 'CrewAI - Role-Based Multi-Agent Collaboration', url: 'https://docs.crewai.com/' }
      ]
    },
    {
      title: 'Parallel Processing & Architecture',
      items: [
        { title: 'Parallelized Planning-Acting for Efficient LLM-based Multi-Agent Systems (2025)', url: 'https://arxiv.org/html/2503.03505' },
        { title: 'Apache Kafka - Distributed Event Processing', url: 'https://kafka.apache.org/documentation/' },
        { title: 'Ray Framework - Distributed Python Applications', url: 'https://docs.ray.io/en/latest/' },
        { title: 'Celery - Distributed Task Queue', url: 'https://docs.celeryq.dev/en/stable/' }
      ]
    },
    {
      title: 'Industry Case Studies',
      items: [
        { title: 'Anthropic Multi-Agent Research System Engineering Blog (2024)', url: 'https://www.anthropic.com/engineering/multi-agent-research-system' },
        { title: 'AWS Multi-Agent Orchestration with Amazon Bedrock (2024)', url: 'https://aws.amazon.com/blogs/machine-learning/design-multi-agent-orchestration-with-reasoning-using-amazon-bedrock-and-open-source-frameworks/' },
        { title: 'Google DeepMind Multi-Agent Systems Research (2024)', url: 'https://deepmind.google/research/?q=multi-agent' },
        { title: 'OpenAI Multi-Agent Coordination Research (2024)', url: 'https://openai.com/research/multiagent-emergence-environments' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Multiple agents execute the same task concurrently to provide diverse perspectives and ensemble reasoning"
        why="Harnesses collective intelligence, reduces bias through diversity, increases accuracy via consensus, and accelerates decision-making"
        keyInsight="Parallel execution + diverse expertise + consensus mechanisms = superior decision quality and speed"
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

export default ConcurrentOrchestrationDetails;