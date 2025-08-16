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

interface LLMAsJudgeDetailsProps {
  selectedTechnique: any;
}

export const LLMAsJudgeDetails: React.FC<LLMAsJudgeDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define Criteria', detail: 'Specify evaluation metrics & rubrics' },
      { num: '2', action: 'Design Prompt', detail: 'Create structured judge prompt' },
      { num: '3', action: 'Feed Outputs', detail: 'Pass generated content to judge' },
      { num: '4', action: 'Get Scores', detail: 'Receive ratings/rankings/decisions' },
      { num: '5', action: 'Act on Results', detail: 'Filter, rank, or select outputs' }
    ],
    example: 'outputs[n] → LLM_Judge(criteria) → scores[n] → select_best(scores)'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use clear, objective evaluation criteria', icon: '✅' },
    { type: 'do', text: 'Implement panel of judges for controversial decisions', icon: '✅' },
    { type: 'do', text: 'Provide rubrics and examples in judge prompts', icon: '✅' },
    { type: 'do', text: 'Use structured output formats (JSON) for scores', icon: '✅' },
    { type: 'do', text: 'Validate judge consistency with known test cases', icon: '✅' },
    { type: 'dont', text: 'Use vague criteria like "good" or "better"', icon: '❌' },
    { type: 'dont', text: 'Rely on single judge for critical decisions', icon: '❌' },
    { type: 'dont', text: 'Skip calibration of judge against human evaluations', icon: '❌' },
    { type: 'dont', text: 'Use same model for generation and judging (bias)', icon: '❌' },
    { type: 'dont', text: 'Ignore judge uncertainty or confidence scores', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Evaluating multiple outputs',
      'Quality assurance at scale',
      'A/B testing LLM responses',
      'Automated content moderation'
    ],
    avoidWhen: [
      'Subjective creative tasks',
      'Single output generation',
      'Real-time critical decisions',
      'Legal/medical assessments'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Judge Agreement', measure: 'Correlation with human raters' },
    { metric: 'Consistency', measure: 'Same judgment on same input' },
    { metric: 'Discrimination', measure: 'Ability to rank quality differences' },
    { metric: 'False Positive Rate', measure: 'Good content marked as bad' },
    { metric: 'Coverage', measure: '% of edge cases handled correctly' },
    { metric: 'Speed', measure: 'Evaluations per second' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Output Selection: Generate 5 responses → Judge ranks → Return best to user',
    'Quality Gates: Check if generated code/content meets standards before deployment',
    'A/B Testing: Compare model versions by judging outputs on same prompts',
    'Safety Filtering: Evaluate outputs for harmful/biased content before serving',
    'RAG Evaluation: Judge relevance of retrieved documents to query'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (Zheng et al., 2023)', url: 'https://arxiv.org/abs/2306.05685' },
        { title: 'G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment (Liu et al., 2023)', url: 'https://arxiv.org/abs/2303.16634' },
        { title: 'Large Language Models are not Fair Evaluators (Wang et al., 2023)', url: 'https://arxiv.org/abs/2305.17926' },
        { title: 'Prometheus: Inducing Fine-grained Evaluation Capability in LLMs (Kim et al., 2024)', url: 'https://arxiv.org/abs/2310.08491' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'OpenAI Evals Framework Documentation', url: 'https://github.com/openai/evals' },
        { title: 'Anthropic Model Evaluation Guide', url: 'https://docs.anthropic.com/en/docs/test-and-evaluate/eval-approaches' },
        { title: 'LangChain LLM Evaluation Documentation', url: 'https://python.langchain.com/docs/guides/evaluation/' },
        { title: 'MLflow LLM Judge Implementation', url: 'https://mlflow.org/docs/latest/llms/llm-evaluate/index.html' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Evidently AI - LLM Evaluation Framework', url: 'https://github.com/evidentlyai/evidently' },
        { title: 'DeepEval - LLM Evaluation Framework', url: 'https://github.com/confident-ai/deepeval' },
        { title: 'RAGAS - RAG Evaluation Framework', url: 'https://github.com/explodinggradients/ragas' },
        { title: 'Arthur Bench - LLM Evaluation Suite', url: 'https://github.com/arthur-ai/bench' }
      ]
    },
    {
      title: 'Related Patterns',
      items: [
        { title: 'Producer-Critic Pattern (Parent Architecture)', url: '#producer-critic' },
        { title: 'Constitutional AI (Uses LLM Judges)', url: 'https://www.anthropic.com/constitutional-ai' },
        { title: 'RLAIF - RL from AI Feedback', url: 'https://arxiv.org/abs/2309.00267' },
        { title: 'Best-of-N Sampling with LLM Ranking', url: 'https://arxiv.org/abs/2309.01188' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Use LLMs to evaluate and score other LLM outputs at scale"
        why="Automates quality assessment, enables best-of-N selection, scales evaluation"
        keyInsight="Specific implementation of Producer-Critic where the critic is an LLM with evaluation prompts"
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

export default LLMAsJudgeDetails;