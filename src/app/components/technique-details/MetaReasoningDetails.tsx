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

interface MetaReasoningDetailsProps {
  selectedTechnique: any;
}

export const MetaReasoningDetails: React.FC<MetaReasoningDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Monitor Layer', detail: 'Track performance, resources, decision quality' },
      { num: '2', action: 'Evaluate Strategy', detail: 'Assess current reasoning approach effectiveness' },
      { num: '3', action: 'Select Method', detail: 'Choose optimal reasoning strategy for task' },
      { num: '4', action: 'Execute & Monitor', detail: 'Apply strategy while tracking progress' },
      { num: '5', action: 'Adapt & Learn', detail: 'Switch strategies if needed, update preferences' }
    ],
    example: 'detect_problem → assess_confidence → select_strategy → execute → monitor → adapt'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Implement three-layer architecture: Object → Monitor → Meta', icon: '✅' },
    { type: 'do', text: 'Track confidence scores and decision quality metrics', icon: '✅' },
    { type: 'do', text: 'Use strategy selection based on task characteristics', icon: '✅' },
    { type: 'do', text: 'Monitor resource usage and computational efficiency', icon: '✅' },
    { type: 'do', text: 'Build strategy performance history for learning', icon: '✅' },
    { type: 'do', text: 'Implement graceful failure handling and recovery', icon: '✅' },
    { type: 'dont', text: 'Add meta-reasoning to every simple task (overhead)', icon: '❌' },
    { type: 'dont', text: 'Ignore computational cost of meta-reasoning layer', icon: '❌' },
    { type: 'dont', text: 'Use generic confidence without domain calibration', icon: '❌' },
    { type: 'dont', text: 'Skip strategy switching when clearly underperforming', icon: '❌' },
    { type: 'dont', text: 'Implement without clear meta-cognitive questions', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex multi-domain problems',
      'Uncertain or dynamic environments',
      'Multiple reasoning strategies available',
      'Need for adaptive intelligence',
      'Mission-critical decisions',
      'Resource-constrained scenarios'
    ],
    avoidWhen: [
      'Simple, well-defined tasks',
      'Real-time low-latency requirements',
      'Single optimal strategy exists',
      'Limited computational resources',
      'Deterministic environments',
      'Basic query-response systems'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Strategy Selection Accuracy', measure: '% optimal strategy chosen' },
    { metric: 'Task Completion Rate', measure: '% tasks completed successfully' },
    { metric: 'Decision Quality Score', measure: 'Weighted outcome quality (0-1)' },
    { metric: 'Adaptation Speed', measure: 'Time to switch strategies' },
    { metric: 'Resource Efficiency', measure: 'Performance/computational_cost' },
    { metric: 'Confidence Calibration', measure: 'Predicted vs actual success rate' },
    { metric: 'Learning Rate', measure: 'Strategy improvement over time' },
    { metric: 'Meta-Reasoning Overhead', measure: '% additional computation vs direct' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Autonomous Systems: Self-driving cars adapting to weather/traffic conditions',
    'Medical Diagnosis: Switching between diagnostic approaches based on symptoms',
    'Financial Trading: Adapting strategies based on market volatility',
    'Multi-Modal AI: Choosing between vision, text, audio processing strategies',
    'Research Assistance: Selecting search/analysis methods based on query type',
    'Game Playing: Dynamic strategy selection based on opponent behavior',
    'Robotics: Adapting manipulation strategies based on object properties',
    'Customer Support: Routing strategies based on issue complexity'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Establishing Meta-Decision-Making for AI: An Ontology of Relevance, Representation and Reasoning (ArXiv 2022)', url: 'https://arxiv.org/abs/2210.00608' },
        { title: 'A meta-cognitive architecture for planning in uncertain environments (ScienceDirect 2013)', url: 'https://www.sciencedirect.com/science/article/pii/S2212683X13000480' },
        { title: 'Meta Reasoning for Large Language Models (ArXiv 2024)', url: 'https://arxiv.org/abs/2406.11698' },
        { title: 'Doing more with less: meta-reasoning and meta-learning in humans and machines (ScienceDirect 2019)', url: 'https://www.sciencedirect.com/science/article/abs/pii/S2352154618302122' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Meta-Reasoning in Agents - Evidence-Based Advances (IEEE Computer Society)', url: 'https://www.computer.org/publications/tech-news/trends/meta-reasoning' },
        { title: 'Improve AI Thinking with Meta-Reasoning Techniques', url: 'https://relevanceai.com/prompt-engineering/improve-ai-thinking-with-meta-reasoning-techniques' },
        { title: 'AI Agent Evaluation: Metrics, Strategies, and Best Practices', url: 'https://wandb.ai/onlineinference/genai-research/reports/AI-agent-evaluation-Metrics-strategies-and-best-practices--VmlldzoxMjM0NjQzMQ' },
        { title: 'What is meta-reasoning in AI? - Milvus Guide', url: 'https://milvus.io/ai-quick-reference/what-is-metareasoning-in-ai' }
      ]
    },
    {
      title: 'Tools & Frameworks',
      items: [
        { title: 'LangChain Agent Memory and Reflection', url: 'https://python.langchain.com/docs/how_to/agent_memory/' },
        { title: 'AutoGen Multi-Agent Conversation Framework', url: 'https://github.com/microsoft/autogen' },
        { title: 'CrewAI - Orchestrating Role-Playing Autonomous AI Agents', url: 'https://github.com/joaomdmoura/crewAI' },
        { title: 'OpenAI Function Calling for Meta-Reasoning', url: 'https://platform.openai.com/docs/guides/function-calling' }
      ]
    },
    {
      title: 'Research Groups & Communities',
      items: [
        { title: 'Stanford HAI - Human-Centered AI Research', url: 'https://hai.stanford.edu/' },
        { title: 'MIT CSAIL - Computer Science and Artificial Intelligence Laboratory', url: 'https://www.csail.mit.edu/' },
        { title: 'Berkeley AI Research (BAIR)', url: 'https://bair.berkeley.edu/' },
        { title: 'DeepMind Research Publications', url: 'https://deepmind.google/research/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="AI system that monitors and optimizes its own reasoning processes"
        why="Enables adaptive intelligence, strategy selection, and self-improvement in complex domains"
        keyInsight="Three-layer architecture: Object-level execution → Monitor layer → Meta-reasoning layer for optimal strategy selection"
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

export default MetaReasoningDetails;