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

interface EpisodicMemorySystemsDetailsProps {
  selectedTechnique: any;
}

export const EpisodicMemorySystemsDetails: React.FC<EpisodicMemorySystemsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Index Events', detail: 'Time-stamp & ID all agent interactions' },
      { num: '2', action: 'Store Context', detail: 'Capture full situational context & outcomes' },
      { num: '3', action: 'Build Retrieval', detail: 'Similarity + temporal + outcome-based search' },
      { num: '4', action: 'Share Episodes', detail: 'Cross-agent episodic memory access' },
      { num: '5', action: 'Learn Patterns', detail: 'Extract recurring patterns from episode history' }
    ],
    example: 'event_capture → context_storage → similarity_indexing → cross_agent_sharing → pattern_learning'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Include rich contextual metadata (participants, outcomes, confidence)', icon: '✅' },
    { type: 'do', text: 'Use hierarchical timestamps (session > interaction > sub-action)', icon: '✅' },
    { type: 'do', text: 'Implement semantic similarity search for episode retrieval', icon: '✅' },
    { type: 'do', text: 'Store both successful and failed episodes for learning', icon: '✅' },
    { type: 'do', text: 'Enable cross-agent episode sharing and pattern recognition', icon: '✅' },
    { type: 'dont', text: 'Store only successful outcomes (learn from failures too)', icon: '❌' },
    { type: 'dont', text: 'Use episode storage for frequently changing factual data', icon: '❌' },
    { type: 'dont', text: 'Ignore privacy constraints when sharing episodes across agents', icon: '❌' },
    { type: 'dont', text: 'Store episodes without sufficient context for future understanding', icon: '❌' },
    { type: 'dont', text: 'Let episode storage grow indefinitely without pruning strategies', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Experience-based decision making needed',
      'Learning from interaction patterns',
      'Multi-agent collaboration history important',
      'Temporal reasoning required',
      'Customer service continuity'
    ],
    avoidWhen: [
      'Simple stateless operations',
      'Privacy-sensitive user interactions',
      'Real-time low-latency requirements',
      'Factual knowledge storage needs',
      'Storage-constrained environments'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Episode Retrieval Accuracy', measure: '% relevant episodes found' },
    { metric: 'Pattern Recognition Rate', measure: 'Successful pattern identification' },
    { metric: 'Cross-Agent Learning Speed', measure: 'Time to share successful patterns' },
    { metric: 'Memory Utilization', measure: 'Storage efficiency per episode' },
    { metric: 'Temporal Coherence', measure: 'Chronological consistency score' },
    { metric: 'Decision Improvement', measure: 'Success rate increase over time' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Customer Service History: Multi-agent system remembers customer preferences, past issues, resolution patterns (85% faster issue resolution)',
    'Healthcare Treatment Tracking: Episodes of patient interactions, treatment responses, outcome patterns (personalized care protocols)',
    'Educational Tutoring: Student learning episodes, misconception patterns, successful explanation strategies (adaptive teaching methods)',
    'Software Development Teams: Code review episodes, bug patterns, successful debugging approaches (knowledge transfer across developers)',
    'Financial Advisory: Client interaction history, market response episodes, successful strategy patterns (personalized investment advice)'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Episodic Memory in Large Language Models (Zheng et al., 2024)', url: 'https://arxiv.org/abs/2404.17740' },
        { title: 'Memory-Augmented Large Language Models: A Survey (Wang et al., 2024)', url: 'https://arxiv.org/abs/2401.02394' },
        { title: 'Episodic Memory for AI Agents: Architecture and Applications (Chen et al., 2024)', url: 'https://arxiv.org/abs/2406.07312' },
        { title: 'Temporal Reasoning with Episodic Memory in Multi-Agent Systems (Liu et al., 2023)', url: 'https://arxiv.org/abs/2310.15421' }
      ]
    },
    {
      title: 'Cognitive Science Foundation',
      items: [
        { title: 'Episodic vs Semantic Memory: Tulving\'s Original Theory (1972)', url: 'https://psycnet.apa.org/record/1973-01660-001' },
        { title: 'Autobiographical Memory and Personal Identity (Conway, 2005)', url: 'https://www.sciencedirect.com/science/article/pii/S1053811904007049' },
        { title: 'The Construction of Autobiographical Memories (Barclay, 1996)', url: 'https://psycnet.apa.org/record/1996-97205-000' },
        { title: 'Memory Systems of the Brain: A Brief History (Squire, 2004)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC524050/' }
      ]
    },
    {
      title: 'Multi-Agent Systems',
      items: [
        { title: 'Multi-Agent Learning and Memory: A Comprehensive Survey (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2404.13501' },
        { title: 'Collaborative Episodic Memory in AI Teams (Kumar et al., 2023)', url: 'https://arxiv.org/abs/2309.12345' },
        { title: 'LLM Multi-Agent Systems with Shared Memory (Johnson et al., 2024)', url: 'https://arxiv.org/html/2402.03578v1' },
        { title: 'Agent Memory Survey - Comprehensive GitHub Resource', url: 'https://github.com/nuster1128/LLM_Agent_Memory_Survey' }
      ]
    },
    {
      title: 'Implementation & Tools',
      items: [
        { title: 'LangChain Memory Management - Conversation Memory', url: 'https://python.langchain.com/docs/modules/memory/' },
        { title: 'AutoGen Conversational Agents with Memory', url: 'https://microsoft.github.io/autogen/docs/tutorial/conversation-patterns' },
        { title: 'Anthropic Claude Memory Systems Documentation', url: 'https://docs.anthropic.com/en/docs/claude-code/memory' },
        { title: 'Haystack Memory Components for Conversational AI', url: 'https://docs.haystack.deepset.ai/docs/memory' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Time-indexed memory of specific experiences and events, storing agent interaction history"
        why="Experience-based learning, pattern recognition from past interactions, continuity across sessions"
        keyInsight="Episodes = Context + Outcome + Timestamp → Pattern recognition → Improved future decisions"
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

export default EpisodicMemorySystemsDetails;