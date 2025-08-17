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

interface WebArenaSuiteDetailsProps {
  selectedTechnique: any;
}

export const WebArenaSuiteDetails: React.FC<WebArenaSuiteDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Setup', detail: 'Deploy sandboxed web environments: WebArena (4 sites), VisualWebArena (3 sites), WorkArena (ServiceNow)' },
      { num: '2', action: 'Configure', detail: 'Select evaluation mode: WebArena (812 tasks), VisualWebArena (910 tasks), WorkArena (33-682 tasks)' },
      { num: '3', action: 'Enable', detail: 'Set up multimodal capabilities for visual tasks and BrowserGym for enterprise workflows' },
      { num: '4', action: 'Evaluate', detail: 'Run agents on realistic web interactions with execution-based assessment' },
      { num: '5', action: 'Analyze', detail: 'Compare against human baselines: WebArena (78.2%), VisualWebArena (88.7%), WorkArena (enterprise KPIs)' }
    ],
    example: 'web_eval = WebArenaSuite(suites=["webarena", "visualwebarena", "workarena"], agent=web_agent, multimodal=True)'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Test across all three suites for comprehensive web automation assessment', icon: '✅' },
    { type: 'do', text: 'Use sandboxed environments for safe and reproducible evaluation', icon: '✅' },
    { type: 'do', text: 'Enable multimodal processing for VisualWebArena\'s 910 visual tasks', icon: '✅' },
    { type: 'do', text: 'Leverage Set-of-Marks (SoM) prompting for visual web navigation', icon: '✅' },
    { type: 'do', text: 'Include enterprise workflows with WorkArena ServiceNow platform testing', icon: '✅' },
    { type: 'dont', text: 'Expect high performance - best agents achieve 14.4% (WebArena), 16.4% (VisualWebArena)', icon: '❌' },
    { type: 'dont', text: 'Skip visual understanding requirements - 25.2% of tasks need visual-text integration', icon: '❌' },
    { type: 'dont', text: 'Ignore enterprise context - WorkArena requires knowledge work task understanding', icon: '❌' },
    { type: 'dont', text: 'Use without proper sandboxing - environments simulate real websites with data', icon: '❌' },
    { type: 'dont', text: 'Overlook execution-based evaluation - functional correctness is key metric', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Evaluating autonomous web agents on realistic website interactions',
      'Testing multimodal agents requiring visual and textual web understanding',
      'Assessing enterprise automation capabilities on knowledge work tasks',
      'Benchmarking web navigation and form completion abilities',
      'Research on human-computer interaction automation'
    ],
    avoidWhen: [
      'Simple API-based automation (use specialized API benchmarks)',
      'Single-page application testing without multi-site workflows',
      'Text-only evaluation without visual web components',
      'Real-time production testing (use sandboxed environments only)',
      'Non-interactive task evaluation (use static benchmarks)'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Task Success Rate', measure: 'Primary metric: percentage of successfully completed web tasks' },
    { metric: 'Human vs Agent Gap', measure: 'WebArena: 78.2% vs 14.4%, VisualWebArena: 88.7% vs 16.4%' },
    { metric: 'Multimodal Understanding', measure: 'Success on 25.2% of tasks requiring visual-text integration' },
    { metric: 'Enterprise Task Completion', measure: 'WorkArena: 55% success rate on knowledge work tasks' },
    { metric: 'Site Coverage', measure: 'Performance across e-commerce, forums, development, content management' },
    { metric: 'Functional Correctness', measure: 'Execution-based evaluation of actual task completion' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Academic Research: CMU\'s comprehensive framework for web agent evaluation across realistic environments',
    'Enterprise Automation: ServiceNow WorkArena testing for knowledge worker task automation (55% success rate)',
    'Multimodal Web Agents: VisualWebArena\'s 910 tasks requiring visual understanding and Set-of-Marks prompting',
    'Industry Benchmarking: Standard evaluation across e-commerce, social forums, and collaborative development platforms',
    'Agent Development: BrowserGym environment for designing and evaluating autonomous web agents'
  ];

  const references = [
    {
      title: 'Original WebArena Research (2023)',
      items: [
        { title: 'WebArena: A Realistic Web Environment for Building Autonomous Agents (arXiv:2307.13854)', url: 'https://arxiv.org/abs/2307.13854' },
        { title: 'WebArena Official Website', url: 'https://webarena.dev/' },
        { title: 'WebArena GitHub Repository', url: 'https://github.com/web-arena-x/webarena' },
        { title: 'CMU Foundation and Language Model Center', url: 'https://www.cmu.edu/flame/research/2024/webarena.html' }
      ]
    },
    {
      title: 'VisualWebArena (2024)',
      items: [
        { title: 'VisualWebArena: Evaluating Multimodal Agents on Realistic Visual Web Tasks (arXiv:2401.13649)', url: 'https://arxiv.org/abs/2401.13649' },
        { title: 'VisualWebArena Official Project Page', url: 'https://jykoh.com/vwa' },
        { title: 'VisualWebArena GitHub Repository', url: 'https://github.com/web-arena-x/visualwebarena' },
        { title: 'ACL 2024 Conference Paper', url: 'https://aclanthology.org/2024.acl-long.50/' }
      ]
    },
    {
      title: 'WorkArena & Enterprise Evaluation (2024)',
      items: [
        { title: 'WorkArena: How Capable are Web Agents at Solving Common Knowledge Work Tasks? (arXiv:2403.07718)', url: 'https://arxiv.org/abs/2403.07718' },
        { title: 'ServiceNow WorkArena Official Page', url: 'https://servicenow.github.io/WorkArena/' },
        { title: 'ServiceNow Blog: Introducing WorkArena Benchmark', url: 'https://www.servicenow.com/blogs/2024/introducing-workarena-benchmark' },
        { title: 'WorkArena GitHub Repository', url: 'https://github.com/ServiceNow/WorkArena' }
      ]
    },
    {
      title: 'Analysis & Industry Coverage',
      items: [
        { title: 'MarkTechPost: CMU Introduces WebArena', url: 'https://www.marktechpost.com/2023/07/27/cmu-researchers-introduce-webarena-a-realistic-and-reproducible-web-environment-with-4-real-world-web-apps-for-benchmarking-useful-agents/' },
        { title: 'MarkTechPost: VisualWebArena Multimodal Benchmark', url: 'https://www.marktechpost.com/2024/02/09/cmu-researchers-introduce-visualwebarena-an-ai-benchmark-designed-to-evaluate-the-performance-of-multimodal-web-agents-on-realistic-and-visually-stimulating-challenges/' },
        { title: 'ServiceNow Research: WorkArena Publication', url: 'https://www.servicenow.com/research/publication/alexandre-drouin-work-icml2024.html' },
        { title: 'Linnk.ai: WorkArena Insight Analysis', url: 'https://linnk.ai/insight/web-agents/workarena-evaluating-web-agents-for-knowledge-work-tasks-on-servicenow-platform-wHbky7sM/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Comprehensive web agent evaluation including WebArena, VisualWebArena, and WorkArena for realistic web interaction testing in sandboxed environments"
        why="Tests autonomous agents on realistic website tasks: e-commerce, forums, development platforms, and enterprise workflows"
        keyInsight="Massive human-AI gap: WebArena 78.2% vs 14.4%, VisualWebArena 88.7% vs 16.4% - web automation remains challenging"
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

export default WebArenaSuiteDetails;