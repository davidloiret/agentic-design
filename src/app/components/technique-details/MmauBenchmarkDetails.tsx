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

interface MmauBenchmarkDetailsProps {
  selectedTechnique: any;
}

export const MmauBenchmarkDetails: React.FC<MmauBenchmarkDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Setup', detail: 'Install MMAU benchmark framework from Apple\'s axlearn repository' },
      { num: '2', action: 'Configure', detail: 'Select from 5 domains: Tool-use, DAG QA, Data Science, Programming, Mathematics' },
      { num: '3', action: 'Enable', detail: 'Set up offline evaluation environment (no complex setup required)' },
      { num: '4', action: 'Evaluate', detail: 'Run agent on 20 tasks across 3,220 distinct prompts spanning 64 subjects' },
      { num: '5', action: 'Analyze', detail: 'Assess 5 capabilities: Understanding, Reasoning, Planning, Problem-solving, Self-correction' }
    ],
    example: 'mmau_eval = MMAU(agent=llm_agent, domains=["tool_use", "dag_qa", "data_science", "programming", "math"], offline=True)'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Evaluate across all 5 domains for comprehensive capability assessment', icon: '✅' },
    { type: 'do', text: 'Use offline evaluation for stable and reproducible results', icon: '✅' },
    { type: 'do', text: 'Analyze both domain-centric and capability-centric performance breakdowns', icon: '✅' },
    { type: 'do', text: 'Compare against 18 representative models (API-based and open-source)', icon: '✅' },
    { type: 'do', text: 'Leverage heterogeneous data sources: Kaggle, CodeContest, in-house tools', icon: '✅' },
    { type: 'dont', text: 'Expect open-source models to match API-based commercial performance', icon: '❌' },
    { type: 'dont', text: 'Skip tool-use evaluation - many open-source models lack this capability', icon: '❌' },
    { type: 'dont', text: 'Ignore capability decomposition - understanding individual strengths is key', icon: '❌' },
    { type: 'dont', text: 'Rely solely on aggregate scores without domain-specific analysis', icon: '❌' },
    { type: 'dont', text: 'Use as replacement for interactive evaluations - designed to complement them', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Comprehensive agent capability assessment across multiple domains',
      'Offline evaluation requiring stable and reproducible results',
      'Academic research on LLM agent capabilities and limitations',
      'Comparative analysis between commercial and open-source models',
      'Capability-centric evaluation beyond simple task completion'
    ],
    avoidWhen: [
      'Interactive environment testing (use specialized benchmarks)',
      'Single-domain evaluation needs (use domain-specific benchmarks)',
      'Real-time agent interaction assessment',
      'Simple task completion evaluation without capability analysis',
      'Environments requiring complex interactive setups'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Domain Performance', measure: 'Breakdown across Tool-use, DAG QA, Data Science, Programming, Mathematics' },
    { metric: 'Capability Assessment', measure: 'Understanding, Reasoning, Planning, Problem-solving, Self-correction scores' },
    { metric: 'Commercial vs Open-Source Gap', measure: 'Clear performance gap with GPT-4 family leading commercial models' },
    { metric: 'Task Completion Rate', measure: 'Success rate across 20 meticulously designed tasks' },
    { metric: 'Tool-Use Proficiency', measure: 'Specialized evaluation of tool interaction capabilities' },
    { metric: 'Subject Coverage', measure: 'Performance across 64 subjects within the 5 core domains' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Academic Research: Apple\'s comprehensive framework for LLM agent capability analysis and limitations study',
    'Model Comparison: Standardized evaluation of 18 representative models including GPT-4, Claude, and open-source alternatives',
    'Capability Decomposition: Detailed analysis of Understanding, Reasoning, Planning, Problem-solving, and Self-correction abilities',
    'Domain-Specific Assessment: Targeted evaluation across Tool-use, Data Science, Programming, Mathematics, and DAG QA',
    'Offline Evaluation: Stable and reproducible assessment without complex environment setup requirements'
  ];

  const references = [
    {
      title: 'Original MMAU Research & Publication',
      items: [
        { title: 'MMAU: A Holistic Benchmark of Agent Capabilities Across Diverse Domains (arXiv:2407.18961)', url: 'https://arxiv.org/abs/2407.18961' },
        { title: 'Apple Machine Learning Research - MMAU Benchmark', url: 'https://machinelearning.apple.com/research/mmau' },
        { title: 'MMAU Research Paper HTML Version', url: 'https://arxiv.org/html/2407.18961v3' },
        { title: 'MMAU on Hugging Face Papers', url: 'https://huggingface.co/papers/2407.18961' }
      ]
    },
    {
      title: 'Implementation & Code Resources',
      items: [
        { title: 'Apple axlearn GitHub - MMAU Implementation', url: 'https://github.com/apple/axlearn/tree/main/docs/research/mmau' },
        { title: 'MMAU ResearchGate Publication', url: 'https://www.researchgate.net/publication/382654207_MMAU_A_Holistic_Benchmark_of_Agent_Capabilities_Across_Diverse_Domains' },
        { title: 'EmergentMind: MMAU Analysis', url: 'https://www.emergentmind.com/papers/2407.18961' },
        { title: 'TheMoonlight.io: MMAU Literature Review', url: 'https://www.themoonlight.io/en/review/mmau-a-holistic-benchmark-of-agent-capabilities-across-diverse-domains' }
      ]
    },
    {
      title: 'Industry Analysis & Coverage',
      items: [
        { title: 'Analytics India Magazine: Apple Unveils MMAU Benchmark', url: 'https://analyticsindiamag.com/ai-news-updates/apple-unveils-mmau-a-new-benchmark-for-evaluating-language-model-agents-across-diverse-domains/' },
        { title: 'AppleInsider: Apple Researchers Target AI Hallucinations', url: 'https://appleinsider.com/articles/25/07/25/apple-researchers-take-aim-at-ai-hallucinations-and-true-conversations' },
        { title: 'Medium: MMAU - New Standard for Language Model Assessment', url: 'https://medium.com/@agarapuramesh/mmau-a-new-standard-for-language-model-agent-assessment-e7e0aa4cf31a' },
        { title: 'LinkedIn: MMAU Benchmark Analysis', url: 'https://www.linkedin.com/pulse/massive-multitask-agent-understanding-mmau-benchmark-chris-clark-ktyme' }
      ]
    },
    {
      title: 'Related Benchmarks & Comparisons',
      items: [
        { title: 'MMMU Benchmark (Related Multimodal Benchmark)', url: 'https://mmmu-benchmark.github.io/' },
        { title: 'Artificial Analysis: AI Model Comparisons', url: 'https://artificialanalysis.ai/models' },
        { title: 'Wielded: GPT-4o vs Claude & Gemini Benchmark Comparison', url: 'https://wielded.com/blog/gpt-4o-benchmark-detailed-comparison-with-claude-and-gemini' },
        { title: 'ArXiv: Large Language Models in Control Engineering Benchmark', url: 'https://arxiv.org/abs/2404.03647' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Holistic benchmark evaluating LLM agents across five domains with 20 tasks and 3K+ prompts, covering understanding, reasoning, planning, problem-solving, and self-correction"
        why="Addresses limitations in existing evaluation methods with offline tasks eliminating complex environment setup while providing capability-centric analysis"
        keyInsight="Clear performance gap between commercial (GPT-4 family leads) and open-source models - many open-source lack tool-use capabilities"
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

export default MmauBenchmarkDetails;