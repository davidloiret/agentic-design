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

interface MemoryConsolidationProcessesDetailsProps {
  selectedTechnique: any;
}

export const MemoryConsolidationProcessesDetails: React.FC<MemoryConsolidationProcessesDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Trigger Detection', detail: 'Monitor consolidation triggers: time, volume, performance thresholds' },
      { num: '2', action: 'Experience Replay', detail: 'Systematically replay experiences for pattern extraction' },
      { num: '3', action: 'Knowledge Distillation', detail: 'Transform episodic memories into generalizable knowledge' },
      { num: '4', action: 'Cross-Agent Sync', detail: 'Coordinate consolidation across multi-agent network' },
      { num: '5', action: 'Validation & Integration', detail: 'Test consolidated knowledge and integrate into long-term memory' }
    ],
    example: 'trigger_detection → experience_replay → knowledge_distillation → cross_agent_sync → validation_integration'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Implement progressive consolidation: synaptic (hours) → systems (days/weeks)', icon: '✅' },
    { type: 'do', text: 'Use experience replay with prioritized sampling (importance-weighted)', icon: '✅' },
    { type: 'do', text: 'Apply rehearsal mechanisms to prevent catastrophic forgetting', icon: '✅' },
    { type: 'do', text: 'Schedule consolidation during low-activity periods (sleep-like phases)', icon: '✅' },
    { type: 'do', text: 'Implement quality gates and rollback mechanisms for failed consolidation', icon: '✅' },
    { type: 'dont', text: 'Consolidate without maintaining retrieval paths to original experiences', icon: '❌' },
    { type: 'dont', text: 'Ignore temporal dependencies and causal relationships in experiences', icon: '❌' },
    { type: 'dont', text: 'Run consolidation without resource budgets (CPU, memory, time limits)', icon: '❌' },
    { type: 'dont', text: 'Forget to preserve individual agent variations in shared consolidation', icon: '❌' },
    { type: 'dont', text: 'Consolidate static knowledge that doesn\'t benefit from transformation', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Continuous learning systems with growing experience databases',
      'Multi-agent systems requiring shared knowledge evolution',
      'Applications needing to prevent catastrophic forgetting',
      'Long-running systems accumulating experiential data',
      'Scenarios requiring knowledge transfer across agent generations'
    ],
    avoidWhen: [
      'Static knowledge bases without experiential learning',
      'Real-time systems where consolidation latency is prohibitive',
      'Single-use or ephemeral agent deployments',
      'Applications with strict deterministic requirements',
      'Resource-constrained environments unable to support replay'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Consolidation Efficiency', measure: 'Knowledge compression ratio: original experiences → consolidated patterns' },
    { metric: 'Retention Quality', measure: '% critical information preserved through consolidation process' },
    { metric: 'Transfer Effectiveness', measure: 'Performance improvement on new tasks using consolidated knowledge' },
    { metric: 'Forgetting Resistance', measure: 'Stability of old knowledge when learning new information' },
    { metric: 'Cross-Agent Coherence', measure: 'Consistency of consolidated knowledge across agent network' },
    { metric: 'Processing Efficiency', measure: 'Consolidation computational cost vs knowledge value gained' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Continuous Learning Chatbots: Transform daily conversations into improved response patterns (prevent catastrophic forgetting across updates)',
    'Multi-Agent Robotics Teams: Consolidate navigation experiences into shared spatial knowledge (collective learning from individual exploration)',
    'Adaptive Trading Systems: Convert market experiences into risk management rules (systematic pattern extraction from trading history)',
    'Educational AI Tutors: Transform student interaction patterns into personalized teaching strategies (knowledge distillation for pedagogy)',
    'Autonomous Vehicle Fleets: Aggregate driving experiences into improved decision models (federated learning with experience consolidation)'
  ];

  const references = [
    {
      title: 'Neuroscience Foundations',
      items: [
        { title: 'Systems Consolidation: From Hippocampus to Neocortex (Squire & Alvarez, 1995)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC40519/' },
        { title: 'Memory Consolidation, Retrograde Amnesia and the Hippocampus (Dudai, 2001)', url: 'https://www.cell.com/current-biology/pdf/S0960-9822(01)00509-X.pdf' },
        { title: 'The Transformation of Memory in Sleep (Diekelmann & Born, 2010)', url: 'https://www.nature.com/articles/nrn2762' },
        { title: 'Memory Reconsolidation: Updating or Editing? (Lee, 2009)', url: 'https://www.sciencedirect.com/science/article/pii/S0166432809001272' }
      ]
    },
    {
      title: 'Continual Learning & Experience Replay',
      items: [
        { title: 'Experience Replay in Deep Reinforcement Learning (Mnih et al., 2015)', url: 'https://www.nature.com/articles/nature14236' },
        { title: 'Overcoming Catastrophic Forgetting with Elastic Weight Consolidation (Kirkpatrick et al., 2017)', url: 'https://www.pnas.org/doi/10.1073/pnas.1611835114' },
        { title: 'Progressive Neural Networks (Rusu et al., 2016)', url: 'https://arxiv.org/abs/1606.04671' },
        { title: 'Rehearsal-Free Continual Learning with Soft Parameter Sharing (Mallya & Lazebnik, 2018)', url: 'https://arxiv.org/abs/1711.10563' }
      ]
    },
    {
      title: 'Knowledge Distillation & Transfer',
      items: [
        { title: 'Distilling the Knowledge in a Neural Network (Hinton et al., 2015)', url: 'https://arxiv.org/abs/1503.02531' },
        { title: 'Model-Agnostic Meta-Learning for Fast Adaptation (Finn et al., 2017)', url: 'https://arxiv.org/abs/1703.03400' },
        { title: 'Learning to Remember: A Synaptic Plasticity Driven Framework (Kaplanis et al., 2018)', url: 'https://arxiv.org/abs/1811.11682' },
        { title: 'Meta-Learning Representations for Continual Learning (Javed & White, 2019)', url: 'https://arxiv.org/abs/1905.12588' }
      ]
    },
    {
      title: 'Multi-Agent & Federated Learning',
      items: [
        { title: 'Federated Learning: Challenges, Methods, and Future Directions (Li et al., 2019)', url: 'https://arxiv.org/abs/1908.07873' },
        { title: 'Communication-Efficient Learning of Deep Networks (McMahan et al., 2017)', url: 'https://arxiv.org/abs/1602.05629' },
        { title: 'Multi-Agent Deep Reinforcement Learning with Shared Experience Replay (Foerster et al., 2017)', url: 'https://arxiv.org/abs/1702.08887' },
        { title: 'Federated Multi-Task Learning (Smith et al., 2017)', url: 'https://arxiv.org/abs/1705.10467' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Systematic processes transforming short-term experiences into persistent long-term memory structures"
        why="Continuous learning, knowledge transfer, catastrophic forgetting prevention, multi-agent knowledge evolution"
        keyInsight="Experience Replay + Knowledge Distillation + Cross-Agent Synchronization → Persistent knowledge evolution"
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

export default MemoryConsolidationProcessesDetails;