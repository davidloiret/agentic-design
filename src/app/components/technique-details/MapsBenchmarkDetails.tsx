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

interface MapsBenchmarkDetailsProps {
  selectedTechnique: any;
}

export const MapsBenchmarkDetails: React.FC<MapsBenchmarkDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Language Select', detail: 'Choose from 11 supported languages' },
      { num: '2', action: 'Task Setup', detail: 'Configure GAIA, SWE-bench, MATH, ASB tasks' },
      { num: '3', action: 'Performance Test', detail: 'Evaluate task completion & reasoning' },
      { num: '4', action: 'Security Test', detail: 'ASB adversarial & jailbreak resistance' },
      { num: '5', action: 'Compare', detail: 'Analyze performance gap vs English baseline' }
    ],
    example: 'english_baseline → translate_tasks → multi_lang_eval → security_test → gap_analysis'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Test across all 11 supported languages for comprehensive coverage', icon: '✅' },
    { type: 'do', text: 'Use Agent Security Benchmark (ASB) for robustness testing', icon: '✅' },
    { type: 'do', text: 'Measure both performance and security degradation', icon: '✅' },
    { type: 'do', text: 'Correlate results with amount of translated input', icon: '✅' },
    { type: 'do', text: 'Include typologically diverse language families', icon: '✅' },
    { type: 'dont', text: 'Rely solely on English evaluation for global deployment', icon: '❌' },
    { type: 'dont', text: 'Ignore cultural and linguistic bias detection', icon: '❌' },
    { type: 'dont', text: 'Skip adversarial testing in non-English languages', icon: '❌' },
    { type: 'dont', text: 'Assume uniform performance across all languages', icon: '❌' },
    { type: 'dont', text: 'Overlook prompt injection in multilingual contexts', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Global AI agent deployment',
      'Multilingual system evaluation',
      'Cultural bias assessment',
      'International compliance testing'
    ],
    avoidWhen: [
      'English-only applications',
      'Single-language deployments',
      'Non-agentic AI systems',
      'Simple translation tasks'
    ]
  };

  const keyMetrics = [
    { metric: 'Language Parity', measure: 'Performance ratio vs English baseline (0-1)' },
    { metric: 'Task Completion Rate', measure: 'Success rate across multilingual tasks' },
    { metric: 'Security Degradation', measure: 'ASB safety violation increase vs English' },
    { metric: 'Cultural Bias Score', measure: 'Bias detection across language groups' },
    { metric: 'Translation Correlation', measure: 'Performance vs translated input ratio' },
    { metric: 'Cross-lingual Robustness', measure: 'Adversarial resistance across languages' }
  ];

  const topUseCases = [
    'Global Enterprise Deployment: Multi-language customer service agents with consistent performance',
    'Cultural Bias Detection: Identifying and mitigating biases in AI responses across cultures',
    'International Compliance: Meeting regulatory requirements across different linguistic regions',
    'Multilingual Security Testing: Evaluating jailbreak resistance in non-English languages',
    'Educational AI Systems: Ensuring equitable performance across diverse student populations'
  ];

  const references = [
    {
      title: 'Core Research Papers',
      items: [
        { title: 'MAPS: A Multilingual Benchmark for Global Agent Performance and Security (arXiv:2505.15935)', url: 'https://arxiv.org/abs/2505.15935' },
        { title: 'MAPS: A Multilingual Benchmark for Agent Performance and Security - Full Paper', url: 'https://arxiv.org/html/2505.15935' },
        { title: 'MAPS Research on ResearchGate', url: 'https://www.researchgate.net/publication/391992273_MAPS_A_Multilingual_Benchmark_for_Global_Agent_Performance_and_Security' },
        { title: 'Paper Reading Club - MAPS Analysis', url: 'https://paperreading.club/page?id=308453' }
      ]
    },
    {
      title: 'Datasets & Implementation',
      items: [
        { title: 'MAPS Dataset - Hugging Face (Fujitsu-FRE)', url: 'https://huggingface.co/datasets/Fujitsu-FRE/MAPS' },
        { title: 'GAIA: General AI Assistants Benchmark - Base Framework', url: 'https://huggingface.co/spaces/gaia-benchmark/leaderboard' },
        { title: 'SWE-bench: Software Engineering Benchmark', url: 'https://www.swebench.com/' },
        { title: 'Agent Security Benchmark (ASB) - Security Framework', url: 'https://github.com/agiresearch/ASB' }
      ]
    },
    {
      title: 'Related Multilingual Research',
      items: [
        { title: 'A Multi-Agent Framework for Mitigating Dialect Biases (arXiv:2506.02998)', url: 'https://arxiv.org/html/2506.02998' },
        { title: 'DefenderBench: Cybersecurity Evaluation Toolkit', url: 'https://www.researchgate.net/publication/392336903_DefenderBench_A_Toolkit_for_Evaluating_Language_Agents_in_Cybersecurity_Environments' },
        { title: 'Multi-Agent LLM Systems - Cybersecurity Applications (arXiv:2506.10467)', url: 'https://arxiv.org/html/2506.10467v2' },
        { title: 'AI Agent Performance Analysis - ROI in 2025', url: 'https://research.aimultiple.com/ai-agent-performance/' }
      ]
    },
    {
      title: 'Industry Applications',
      items: [
        { title: 'Fujitsu Research & Engineering - MAPS Implementation', url: 'https://www.fujitsu.com/global/about/research/' },
        { title: 'AI Market Maps - Global Deployment Strategies (2025)', url: 'https://github.com/joylarkin/Awesome-AI-Market-Maps' },
        { title: 'Multilingual AI Safety Guidelines - Best Practices', url: 'https://www.partnershiponai.org/' },
        { title: 'Cross-Cultural AI Development Framework', url: 'https://www.unesco.org/en/artificial-intelligence' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="First standardized evaluation framework for multilingual agentic AI across 11 languages with 805 unique tasks"
        why="Identifies critical performance and security gaps in non-English deployments, enables equitable global AI systems"
        keyInsight="Performance degrades 15-40% in non-English languages with security vulnerabilities increasing significantly"
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

export default MapsBenchmarkDetails;