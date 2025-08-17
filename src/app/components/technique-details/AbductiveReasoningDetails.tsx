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

interface AbductiveReasoningDetailsProps {
  selectedTechnique: any;
}

export const AbductiveReasoningDetails: React.FC<AbductiveReasoningDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Observation', detail: 'Identify surprising facts or phenomena to explain' },
      { num: '2', action: 'Hypothesis Generation', detail: 'Create plausible explanations for observations' },
      { num: '3', action: 'Plausibility Ranking', detail: 'Evaluate explanations by simplicity & likelihood' },
      { num: '4', action: 'Best Explanation', detail: 'Select most credible hypothesis' },
      { num: '5', action: 'Prediction Testing', detail: 'Generate testable predictions from hypothesis' }
    ],
    example: 'Surprising fact → Multiple explanations → Rank by plausibility → Best explanation → Test predictions'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Generate multiple competing hypotheses', icon: '✅' },
    { type: 'do', text: 'Apply Occam\'s razor (prefer simpler explanations)', icon: '✅' },
    { type: 'do', text: 'Consider prior knowledge and domain constraints', icon: '✅' },
    { type: 'do', text: 'Evaluate explanatory power and coherence', icon: '✅' },
    { type: 'do', text: 'Generate testable predictions from hypotheses', icon: '✅' },
    { type: 'dont', text: 'Stop at the first plausible explanation', icon: '❌' },
    { type: 'dont', text: 'Ignore contradictory evidence or anomalies', icon: '❌' },
    { type: 'dont', text: 'Confuse abduction with deduction or induction', icon: '❌' },
    { type: 'dont', text: 'Accept explanations without considering alternatives', icon: '❌' },
    { type: 'dont', text: 'Overly complex explanations when simple ones suffice', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Diagnosing problems from symptoms',
      'Explaining unexpected observations',
      'Hypothesis formation in research',
      'Troubleshooting and root cause analysis',
      'Creative problem-solving and discovery'
    ],
    avoidWhen: [
      'When deductive proof is required',
      'Statistical inference problems',
      'Well-understood routine procedures',
      'When complete information is available',
      'Time-critical decisions requiring speed'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Explanation Quality', measure: 'Coherence and completeness of generated hypotheses' },
    { metric: 'Hypothesis Diversity', measure: 'Range of alternative explanations considered' },
    { metric: 'Plausibility Ranking', measure: 'Accuracy of explanation preference ordering' },
    { metric: 'Predictive Power', measure: 'Quality of testable predictions from hypotheses' },
    { metric: 'Parsimony Balance', measure: 'Optimal trade-off between simplicity and completeness' },
    { metric: 'Evidence Integration', measure: 'Effective use of available information' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Medical Diagnosis: Patient symptoms → Multiple disease hypotheses → Most likely diagnosis → Treatment plan',
    'Software Debugging: Error behavior → Potential bug causes → Most probable root cause → Fix strategy',
    'Scientific Discovery: Anomalous data → Theoretical explanations → Best theory → New experiments',
    'Business Analytics: Performance decline → Possible causes → Primary factor → Action plan',
    'Detective Work: Crime evidence → Suspect theories → Most likely scenario → Investigation direction'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Abduction, Reason and Science: Processes of Discovery and Explanation (Josephson & Josephson, 1994)', url: 'https://books.google.com/books/about/Abduction_Reason_and_Science.html' },
        { title: 'Abductive Reasoning in Large Language Models (Zhou et al., 2023)', url: 'https://arxiv.org/abs/2308.05689' },
        { title: 'The Logic of Scientific Discovery and Abductive Inference (Peirce, 1903)', url: 'https://www.jstor.org/stable/2014532' },
        { title: 'Computational Models of Scientific Discovery and Theory Formation (Langley et al., 1987)', url: 'https://dl.acm.org/doi/10.5555/28342' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'OpenAI Hypothesis Generation and Testing', url: 'https://platform.openai.com/docs/guides/reasoning' },
        { title: 'Anthropic Constitutional AI: Explanation Generation', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/explain-like-im-5' },
        { title: 'MIT AI Lab: Abductive Reasoning Systems', url: 'https://groups.csail.mit.edu/medg/research/abduction/' },
        { title: 'Stanford AI: Diagnostic Reasoning Frameworks', url: 'https://ai.stanford.edu/~nilsson/OnlinePubs-Nils/General%20Essays/AIMag09-04-002.pdf' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'PyKE: Python Knowledge Engine for Abductive Reasoning', url: 'https://github.com/hblanks/pyke' },
        { title: 'SWI-Prolog: Logic Programming for Hypothesis Generation', url: 'https://www.swi-prolog.org/' },
        { title: 'Clingo: Answer Set Programming for Abduction', url: 'https://potassco.org/clingo/' },
        { title: 'FLORA-2: Knowledge Representation for Abductive Inference', url: 'http://flora.sourceforge.net/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Philosophy of Science: Abductive Reasoning', url: 'https://plato.stanford.edu/entries/abduction/' },
        { title: 'r/PhilosophyOfScience - Abduction Discussions', url: 'https://www.reddit.com/r/PhilosophyofScience/' },
        { title: 'OpenAI Developer Forum - Diagnostic Reasoning', url: 'https://community.openai.com/c/prompting/8' },
        { title: 'Logic Programming Community', url: 'https://www.cs.nmsu.edu/ALP/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Inference to the best explanation by generating and evaluating hypotheses that explain observed phenomena"
        why="Enables discovery and explanation by finding the most plausible account of surprising or puzzling observations"
        keyInsight="Observe surprising facts → Generate explanations → Rank by plausibility → Select best → Test predictions"
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

export default AbductiveReasoningDetails;