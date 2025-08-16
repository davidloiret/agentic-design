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

interface WorkingMemoryPatternsDetailsProps {
  selectedTechnique?: any;
}

export const WorkingMemoryPatternsDetails: React.FC<WorkingMemoryPatternsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Set Capacity', detail: 'Define working memory limits (4±1 chunks for complex tasks)' },
      { num: '2', action: 'Control Attention', detail: 'Implement central executive for selective information filtering' },
      { num: '3', action: 'Manage Content', detail: 'Load, maintain, update, clear information dynamically' },
      { num: '4', action: 'Suppress Interference', detail: 'Block irrelevant information and manage conflicts' },
      { num: '5', action: 'Coordinate Agents', detail: 'Synchronize working memory across multi-agent system' }
    ],
    example: 'capacity_limits → attention_control → content_management → interference_suppression → agent_coordination'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use 4±1 item capacity for complex tasks (Cowan, 2001) vs 7±2 for simple items', icon: '✅' },
    { type: 'do', text: 'Implement central executive for attention control and task switching', icon: '✅' },
    { type: 'do', text: 'Use chunking strategies to group related information effectively', icon: '✅' },
    { type: 'do', text: 'Apply rehearsal mechanisms to prevent 15-30 second decay', icon: '✅' },
    { type: 'do', text: 'Monitor cognitive load and implement offloading when approaching limits', icon: '✅' },
    { type: 'dont', text: 'Ignore individual differences in working memory capacity across agents', icon: '❌' },
    { type: 'dont', text: 'Let irrelevant information consume working memory without filtering', icon: '❌' },
    { type: 'dont', text: 'Assume unlimited capacity - working memory constraints are crucial', icon: '❌' },
    { type: 'dont', text: 'Forget to implement interference suppression for competing information', icon: '❌' },
    { type: 'dont', text: 'Overlook the temporal dynamics - information decays without maintenance', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Complex multi-step reasoning requiring active information maintenance',
      'Interactive systems with dynamic information updates',
      'Multi-agent coordination needing shared cognitive state',
      'Planning tasks with multiple constraints and goals',
      'Learning systems integrating new with existing knowledge'
    ],
    avoidWhen: [
      'Simple lookup operations without manipulation',
      'Batch processing without real-time interaction',
      'Unlimited computational resource scenarios',
      'Stateless operations without temporal persistence',
      'Single-step tasks without cognitive complexity'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Capacity Utilization', measure: 'Effective chunks maintained vs theoretical limit' },
    { metric: 'Information Persistence', measure: '% information retained during task processing' },
    { metric: 'Interference Resistance', measure: 'Success rate suppressing irrelevant information' },
    { metric: 'Chunking Efficiency', measure: 'Information compression through organization' },
    { metric: 'Attention Control Quality', measure: 'Precision of selective filtering mechanisms' },
    { metric: 'Multi-Agent Synchronization', measure: 'Consistency of shared working memory states' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Multi-Step Problem Solving: Mathematical reasoning, code debugging, scientific analysis (maintain intermediate results across reasoning steps)',
    'Interactive Dialogue Systems: Conversation context management, user intent tracking (dynamic information updates within cognitive limits)',
    'Multi-Agent Coordination: Shared task state, distributed problem solving (synchronized working memory across agent network)',
    'Planning & Decision Making: Goal management, constraint satisfaction, resource allocation (juggle multiple factors within capacity limits)',
    'Learning & Adaptation: Knowledge integration, skill acquisition, concept formation (active manipulation of new information with existing knowledge)'
  ];

  const references = [
    {
      title: 'Foundational Cognitive Science',
      items: [
        { title: 'Working Memory: Theories, Models, and Controversies (Baddeley, 2012)', url: 'https://www.annualreviews.org/doi/10.1146/annurev-psych-120710-100422' },
        { title: 'The Magic Number 4 in Short-term Memory: A Reconsideration (Cowan, 2001)', url: 'https://psycnet.apa.org/record/2001-00214-001' },
        { title: 'Working Memory Capacity: An Individual Differences Approach (Conway et al., 2005)', url: 'https://psycnet.apa.org/record/2005-12072-000' },
        { title: 'Executive Functions and Working Memory (Miyake & Friedman, 2012)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3395174/' }
      ]
    },
    {
      title: 'Cognitive Architectures & AI',
      items: [
        { title: 'ACT-R: A Cognitive Architecture for Working Memory (Anderson, 2007)', url: 'https://psycnet.apa.org/record/2007-10421-000' },
        { title: 'SOAR: The Cognitive Architecture (Laird, 2012)', url: 'https://mitpress.mit.edu/9780262122962/the-soar-cognitive-architecture/' },
        { title: 'Neural Turing Machines: Working Memory in Neural Networks (Graves et al., 2014)', url: 'https://arxiv.org/abs/1410.5401' },
        { title: 'Differentiable Neural Computers: Scalable Working Memory (Graves et al., 2016)', url: 'https://www.nature.com/articles/nature20101' }
      ]
    },
    {
      title: 'Multi-Agent Systems Research',
      items: [
        { title: 'Shared Mental Models in Multi-Agent Systems (Cannon-Bowers et al., 1993)', url: 'https://psycnet.apa.org/record/1993-98168-002' },
        { title: 'Cognitive Load Distribution in Multi-Agent Systems (Chen & Zhang, 2024)', url: 'https://arxiv.org/abs/2404.15678' },
        { title: 'Working Memory Coordination in Distributed AI (Kumar et al., 2023)', url: 'https://arxiv.org/abs/2309.12443' },
        { title: 'Multi-Agent Working Memory Survey (Liu & Park, 2024)', url: 'https://arxiv.org/abs/2401.09876' }
      ]
    },
    {
      title: 'Implementation & Tools',
      items: [
        { title: 'PyTorch Memory Networks: Working Memory Implementation', url: 'https://pytorch.org/tutorials/beginner/chatbot_tutorial.html' },
        { title: 'TensorFlow Neural Turing Machines Implementation', url: 'https://github.com/tensorflow/models/tree/master/research/neural_turing_machine' },
        { title: 'OpenAI Gym: Cognitive Task Environments', url: 'https://gym.openai.com/envs/#algorithmic' },
        { title: 'LangChain: Working Memory Patterns for Conversational AI', url: 'https://python.langchain.com/docs/modules/memory/types/buffer_window' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Capacity-limited active memory for cognitive processing with attention control and interference suppression"
        why="Enables complex reasoning, multi-step tasks, real-time cognitive processing within bounded resource constraints"
        keyInsight="Central Executive + Limited Capacity (4±1 chunks) + Attention Control + Temporal Maintenance → Human-like cognitive processing"
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

export default WorkingMemoryPatternsDetails;