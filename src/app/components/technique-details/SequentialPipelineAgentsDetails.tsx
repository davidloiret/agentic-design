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

interface SequentialPipelineAgentsDetailsProps {
  selectedTechnique: any;
}

export const SequentialPipelineAgentsDetails: React.FC<SequentialPipelineAgentsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Design Stages', detail: 'Define specialized agent roles & capabilities' },
      { num: '2', action: 'Define Interfaces', detail: 'Standardize input/output schemas between agents' },
      { num: '3', action: 'Implement Pipeline', detail: 'Chain agents with validation & error handling' },
      { num: '4', action: 'Add Checkpoints', detail: 'Quality gates & fallback mechanisms' },
      { num: '5', action: 'Monitor Flow', detail: 'Track performance & bottlenecks per stage' }
    ],
    example: 'ResearchAgent → ContentAgent → EditorAgent → ReviewAgent → PublishAgent'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Design agents for single, specialized responsibilities', icon: '✅' },
    { type: 'do', text: 'Use structured data formats between agents (JSON/schemas)', icon: '✅' },
    { type: 'do', text: 'Implement quality checkpoints at each stage transition', icon: '✅' },
    { type: 'do', text: 'Add circuit breakers for failed stages', icon: '✅' },
    { type: 'do', text: 'Log detailed execution traces for debugging', icon: '✅' },
    { type: 'do', text: 'Cache intermediate results for expensive stages', icon: '✅' },
    { type: 'dont', text: 'Create monolithic agents handling multiple concerns', icon: '❌' },
    { type: 'dont', text: 'Allow unstructured data to flow between stages', icon: '❌' },
    { type: 'dont', text: 'Skip validation between pipeline stages', icon: '❌' },
    { type: 'dont', text: 'Let pipeline failures cascade without recovery', icon: '❌' },
    { type: 'dont', text: 'Ignore stage-specific performance bottlenecks', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Multi-step workflows with distinct phases',
      'Tasks requiring specialized expertise per stage',
      'Quality-critical processes needing validation gates',
      'Workflows where stages can be independently optimized',
      'Complex transformations with clear dependencies'
    ],
    avoidWhen: [
      'Simple single-step tasks',
      'Highly interactive or conversational flows',
      'Real-time systems requiring low latency',
      'Tasks requiring dynamic branching or loops',
      'When stage dependencies are unclear'
    ]
  };

  const keyMetrics = [
    { metric: 'Pipeline Success Rate', measure: 'End-to-end completion percentage' },
    { metric: 'Stage Performance', measure: 'Latency & throughput per agent' },
    { metric: 'Quality Gates', measure: 'Validation success rate at checkpoints' },
    { metric: 'Error Recovery', measure: 'Failed stage recovery percentage' },
    { metric: 'Resource Utilization', measure: 'Compute/API costs per stage' },
    { metric: 'Bottleneck Analysis', measure: 'Slowest stage identification' }
  ];

  const topUseCases = [
    'Content Production: Research → Draft → Edit → Review → Publish (journalism, marketing)',
    'Data Processing: Extract → Transform → Validate → Enrich → Load (ETL pipelines)',
    'Code Review: Parse → Analyze → Test → Review → Merge (software development)',
    'Document Analysis: OCR → Extract → Classify → Summarize → Archive (legal, finance)',
    'Scientific Analysis: Data Collection → Processing → Analysis → Validation → Reporting'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Multiagent Systems: A Survey from a Machine Learning Perspective (Stone & Veloso, 2000)', url: 'https://www.cs.cmu.edu/~mmv/papers/MASsurvey.pdf' },
        { title: 'Multiagent Cooperation and Competition with Deep Reinforcement Learning (Tampuu et al., 2017)', url: 'https://arxiv.org/abs/1511.08779' },
        { title: 'Sequential Decision Making in Multi-Agent Systems (Bernstein et al., 2002)', url: 'https://people.csail.mit.edu/lpk/papers/aij02-decpomdp.pdf' },
        { title: 'A Review of Cooperative Multi-Agent Deep Reinforcement Learning (OroojlooyJadid & Hajinezhad, 2019)', url: 'https://arxiv.org/abs/1908.03963' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'AutoGen - Multi-Agent Conversation Framework', url: 'https://microsoft.github.io/autogen/' },
        { title: 'LangGraph - Multi-Agent Workflows', url: 'https://langchain-ai.github.io/langgraph/' },
        { title: 'CrewAI - Sequential Agent Orchestration', url: 'https://docs.crewai.com/' },
        { title: 'AgentOps - Multi-Agent System Monitoring', url: 'https://docs.agentops.ai/' }
      ]
    },
    {
      title: 'Design Patterns & Architecture',
      items: [
        { title: 'Pipeline Pattern in Distributed Systems', url: 'https://martinfowler.com/articles/patterns-of-distributed-systems/pipeline.html' },
        { title: 'Microservices Pipeline Architecture', url: 'https://microservices.io/patterns/data/saga.html' },
        { title: 'Event-Driven Architecture for Agents', url: 'https://aws.amazon.com/event-driven-architecture/' },
        { title: 'Apache Airflow - Workflow Orchestration', url: 'https://airflow.apache.org/docs/' }
      ]
    },
    {
      title: 'Tools & Platforms',
      items: [
        { title: 'LangChain Sequential Chains', url: 'https://python.langchain.com/docs/how_to/sequence/' },
        { title: 'Haystack Pipeline Components', url: 'https://docs.haystack.deepset.ai/docs/pipelines' },
        { title: 'LlamaIndex Query Pipelines', url: 'https://docs.llamaindex.ai/en/stable/module_guides/querying/pipeline/' },
        { title: 'OpenAI Assistants API - Sequential Processing', url: 'https://platform.openai.com/docs/assistants/overview' }
      ]
    },
    {
      title: 'Industry Case Studies',
      items: [
        { title: 'Netflix Content Pipeline with ML Agents', url: 'https://netflixtechblog.com/machine-learning-for-a-better-developer-experience-1e600c69f36c' },
        { title: 'Uber Real-time Data Pipeline Architecture', url: 'https://eng.uber.com/real-time-data-infrastructure/' },
        { title: 'Airbnb ML Platform Pipeline Design', url: 'https://medium.com/airbnb-engineering/bighead-airbnbs-end-to-end-machine-learning-platform-f6ca0b0c9d7c' },
        { title: 'Meta AI Content Moderation Pipeline', url: 'https://ai.meta.com/blog/harmful-content-can-evolve-quickly-our-new-ai-system-adapts-to-tackle-it/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Specialized agents process tasks sequentially where each agent's output feeds the next agent's input"
        why="Enables expertise specialization, quality control gates, independent optimization, and clear error isolation per stage"
        keyInsight="Linear agent pipeline with validation checkpoints - each stage optimized for specific capabilities"
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

export default SequentialPipelineAgentsDetails;