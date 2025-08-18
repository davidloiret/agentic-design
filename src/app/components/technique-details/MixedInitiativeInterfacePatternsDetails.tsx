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

interface MixedInitiativeInterfacePatternsDetailsProps {
  selectedTechnique?: any;
}

export const MixedInitiativeInterfacePatternsDetails: React.FC<MixedInitiativeInterfacePatternsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define Roles', detail: 'Clarify when AI leads vs when human leads interaction' },
      { num: '2', action: 'Control Handoffs', detail: 'Smooth transitions between AI and human initiative' },
      { num: '3', action: 'Override Mechanisms', detail: 'Easy ways for humans to take control anytime' },
      { num: '4', action: 'Status Indicators', detail: 'Show who is currently driving the interaction' },
      { num: '5', action: 'Collaboration Cues', detail: 'Visual hints for when to collaborate vs lead' }
    ],
    example: 'AI suggests → Human reviews → Human modifies → AI adapts → Joint execution'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Make it clear who has control at any moment', icon: '✅' },
    { type: 'do', text: 'Provide immediate override/takeover options', icon: '✅' },
    { type: 'do', text: 'Show AI suggestions as starting points, not final answers', icon: '✅' },
    { type: 'do', text: 'Enable seamless handoffs between AI and human control', icon: '✅' },
    { type: 'do', text: 'Design for varying levels of human engagement', icon: '✅' },
    { type: 'dont', text: 'Force users into rigid interaction patterns', icon: '❌' },
    { type: 'dont', text: 'Make AI takeover feel sudden or unexpected', icon: '❌' },
    { type: 'dont', text: 'Hide how to regain control from AI automation', icon: '❌' },
    { type: 'dont', text: 'Assume users want the same level of AI involvement', icon: '❌' },
    { type: 'dont', text: 'Make collaboration feel like competing for control', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex problem-solving tasks',
      'Creative and iterative workflows',
      'Expert users with domain knowledge',
      'Tasks requiring human judgment and AI efficiency'
    ],
    avoidWhen: [
      'Simple, single-step operations',
      'Fully automated background processes',
      'Emergency situations requiring immediate action',
      'Users preferring complete AI autonomy'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Initiative Balance', measure: '% time human vs AI leads interaction' },
    { metric: 'Handoff Quality', measure: 'Smooth transitions without friction' },
    { metric: 'User Satisfaction', measure: 'Preference for mixed vs single-initiative' },
    { metric: 'Task Completion', measure: 'Success rate of collaborative tasks' },
    { metric: 'Override Usage', measure: 'Frequency of human control takeovers' },
    { metric: 'Collaboration Efficiency', measure: 'Time saved vs full manual work' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Content Creation: AI drafts → Human edits → AI suggests improvements → Human finalizes',
    'Data Analysis: Human defines question → AI explores data → Human interprets → AI visualizes',
    'Code Development: AI suggests implementations → Human reviews → Human customizes → AI optimizes',
    'Research Tasks: AI gathers sources → Human evaluates → AI synthesizes → Human validates',
    'Design Process: Human sets direction → AI generates options → Human selects → AI refines'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Mixed-Initiative Human-Computer Symbiosis (Horvitz, 1999)', url: 'https://arxiv.org/abs/cs/9908005' },
        { title: 'CHI 2025: Principles of Mixed-Initiative User Interfaces', url: 'https://dl.acm.org/doi/proceedings/10.1145/3613904' },
        { title: 'Human-AI Collaboration in Creative Tasks (Kantosalo & Toivonen, 2016)', url: 'https://www.semanticscholar.org/paper/Human-AI-Collaboration-in-Creative-Tasks-Kantosalo-Toivonen' },
        { title: 'Mixed-Initiative Conversational AI (Allen et al., 2001)', url: 'https://www.semanticscholar.org/paper/Mixed-Initiative-Conversational-AI-Allen' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Microsoft Mixed Reality - Mixed Initiative Design', url: 'https://docs.microsoft.com/en-us/windows/mixed-reality/design/' },
        { title: 'Google AI Design Guidelines - Human-AI Interaction', url: 'https://pair.withgoogle.com/guidebook/patterns' },
        { title: 'IBM Watson Assistant - Mixed Initiative Conversations', url: 'https://cloud.ibm.com/docs/assistant' },
        { title: 'Apple Human Interface Guidelines - AI Interaction', url: 'https://developer.apple.com/design/human-interface-guidelines/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'React DnD for Drag-and-Drop Mixed Initiative', url: 'https://react-dnd.github.io/react-dnd/' },
        { title: 'Framer Motion for Smooth Handoff Animations', url: 'https://www.framer.com/motion/' },
        { title: 'LangChain Human-in-the-Loop Patterns', url: 'https://python.langchain.com/docs/modules/callbacks/human_approval' },
        { title: 'OpenAI Assistants API for Mixed Initiative', url: 'https://platform.openai.com/docs/assistants/overview' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'CHI Conference - Human-AI Interaction', url: 'https://chi.acm.org/' },
        { title: 'Mixed-Initiative AI Research Community', url: 'https://www.aaai.org/' },
        { title: 'HCI Stack Exchange - Mixed Initiative UX', url: 'https://ux.stackexchange.com/questions/tagged/artificial-intelligence' },
        { title: 'HAI Stanford - Human-Centered AI', url: 'https://hai.stanford.edu/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Dynamic control-sharing between humans and AI based on task context"
        why="Neither full automation nor manual control alone maximizes human-AI collaborative potential"
        keyInsight="Design flexible handoffs: AI proposes → Human decides → Either can take initiative as needed"
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

export default MixedInitiativeInterfacePatternsDetails;