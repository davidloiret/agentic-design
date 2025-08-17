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

interface GuardAgentPatternDetailsProps {
  selectedTechnique: any;
}

export const GuardAgentPatternDetails: React.FC<GuardAgentPatternDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Analyze Request', detail: 'Parse safety guard requirements & constraints' },
      { num: '2', action: 'Generate Plan', detail: 'Create task plan from safety requirements' },
      { num: '3', action: 'Map to Code', detail: 'Convert plan into executable guardrail code' },
      { num: '4', action: 'Execute & Monitor', detail: 'Run code to validate agent actions' },
      { num: '5', action: 'Block/Allow', detail: 'Deterministic decision based on validation' }
    ],
    example: 'safety_analysis → task_planning → code_generation → execution → enforcement'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use dedicated monitoring agents separate from target agents', icon: '✅' },
    { type: 'do', text: 'Generate deterministic code for consistent enforcement', icon: '✅' },
    { type: 'do', text: 'Implement comprehensive action logging and audit trails', icon: '✅' },
    { type: 'do', text: 'Define clear safety requirements in natural language', icon: '✅' },
    { type: 'do', text: 'Test guardrails independently before deployment', icon: '✅' },
    { type: 'dont', text: 'Let target agents self-monitor without external validation', icon: '❌' },
    { type: 'dont', text: 'Rely on probabilistic checks for critical safety', icon: '❌' },
    { type: 'dont', text: 'Skip validation of generated guardrail code', icon: '❌' },
    { type: 'dont', text: 'Allow guardrail bypass for "trusted" operations', icon: '❌' },
    { type: 'dont', text: 'Ignore performance impact on target agent latency', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Autonomous agent deployments',
      'High-risk operations',
      'Compliance-critical systems',
      'Multi-agent coordination'
    ],
    avoidWhen: [
      'Simple, low-risk tasks',
      'Extreme latency requirements',
      'Stateless operations only',
      'Resource-constrained environments'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Guardrail Accuracy', measure: '% correct safety decisions (98%+)' },
    { metric: 'False Positives', measure: 'Valid actions blocked incorrectly' },
    { metric: 'Response Time', measure: 'ms to validate each action' },
    { metric: 'Code Generation', measure: 'Time to create guardrail logic' },
    { metric: 'Coverage', measure: '% of agent actions monitored' },
    { metric: 'Violation Rate', measure: 'Safety violations per 1000 actions' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Financial Trading: Monitor trades for limits, restricted securities, risk thresholds',
    'Healthcare AI: Validate medical recommendations against safety protocols & regulations',
    'Autonomous Systems: Ensure robots/vehicles operate within physical & ethical bounds',
    'Content Generation: Block harmful, biased, or policy-violating outputs in real-time',
    'Data Processing: Prevent unauthorized access, ensure privacy compliance in pipelines'
  ];

  const references = [
    {
      title: 'Primary Research',
      items: [
        { title: 'GuardAgent: Safeguard LLM Agents by a Guard Agent via Knowledge-Enabled Reasoning (ArXiv:2406.09187, 2024)', url: 'https://arxiv.org/abs/2406.09187' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Anthropic, 2022)', url: 'https://arxiv.org/abs/2212.08073' },
        { title: 'Red Teaming Language Models with Language Models (Anthropic, 2022)', url: 'https://arxiv.org/abs/2202.03286' },
        { title: 'ReAct: Synergizing Reasoning and Acting in Language Models (2023)', url: 'https://arxiv.org/abs/2210.03629' }
      ]
    },
    {
      title: 'Safety Benchmarks & Evaluations',
      items: [
        { title: 'SafetyBench: Evaluating Safety of Large Language Models', url: 'https://safetybench.github.io/' },
        { title: 'TrustLLM: Trustworthiness in Large Language Models (2024)', url: 'https://arxiv.org/abs/2401.05561' },
        { title: 'HELM: Holistic Evaluation of Language Models - Safety Metrics', url: 'https://crfm.stanford.edu/helm/latest/' },
        { title: 'AI Safety Benchmark from MLCommons', url: 'https://mlcommons.org/benchmarks/ai-safety/' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'LangChain - Agent Supervision and Monitoring', url: 'https://python.langchain.com/docs/use_cases/agent_simulations/agent_supervision' },
        { title: 'AutoGen - Multi-Agent Conversation with Safety', url: 'https://microsoft.github.io/autogen/docs/Use-Cases/agent_safety' },
        { title: 'LlamaIndex - Agent Monitoring and Control', url: 'https://docs.llamaindex.ai/en/stable/module_guides/deploying/agents/agent_monitoring.html' },
        { title: 'Guidance - Constraint-based Generation', url: 'https://github.com/guidance-ai/guidance' }
      ]
    },
    {
      title: 'Industry Best Practices',
      items: [
        { title: 'OpenAI Safety Best Practices - Multi-layer Defense', url: 'https://platform.openai.com/docs/guides/safety-best-practices' },
        { title: 'Google DeepMind - Sparrow Agent Safety', url: 'https://www.deepmind.com/blog/building-safer-dialogue-agents' },
        { title: 'Meta AI - Responsible AI Practices for Agents', url: 'https://ai.meta.com/responsible-ai/' },
        { title: 'Microsoft Responsible AI - Agent Monitoring', url: 'https://www.microsoft.com/en-us/ai/responsible-ai' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Dedicated guard agent monitors target agents through dynamic safety check generation"
        why="Self-monitoring fails; external validation with deterministic code ensures 98%+ accuracy"
        keyInsight="Safety requirements → Task plan → Executable code → Real-time enforcement"
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

export default GuardAgentPatternDetails;