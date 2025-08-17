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

interface ReactDetailsProps {
  selectedTechnique: any;
}

export const ReactDetails: React.FC<ReactDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Think', detail: 'Analyze problem & plan approach' },
      { num: '2', action: 'Act', detail: 'Execute tool/function call' },
      { num: '3', action: 'Observe', detail: 'Process action results' },
      { num: '4', action: 'Reason', detail: 'Evaluate & plan next step' },
      { num: '5', action: 'Loop', detail: 'Repeat until goal achieved' }
    ],
    example: 'Thought → search("weather NYC") → Observation: "72°F sunny" → Thought → Done'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Clearly separate Thought and Action phases', icon: '✅' },
    { type: 'do', text: 'Use structured action formats (function calls)', icon: '✅' },
    { type: 'do', text: 'Process all observations before next reasoning', icon: '✅' },
    { type: 'do', text: 'Implement proper tool error handling', icon: '✅' },
    { type: 'do', text: 'Set maximum iteration limits to prevent loops', icon: '✅' },
    { type: 'dont', text: 'Skip observation phase after actions', icon: '❌' },
    { type: 'dont', text: 'Use ambiguous or unstructured action formats', icon: '❌' },
    { type: 'dont', text: 'Allow infinite reasoning loops without convergence', icon: '❌' },
    { type: 'dont', text: 'Ignore tool failures or partial results', icon: '❌' },
    { type: 'dont', text: 'Mix reasoning and action in single step', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Tasks requiring external data/tools',
      'Multi-step research & investigation',
      'Dynamic problem-solving workflows',
      'Real-time information needs',
      'When environment interaction is key'
    ],
    avoidWhen: [
      'Simple knowledge-based questions',
      'Tasks solvable with pure reasoning',
      'High-latency sensitive applications',
      'When tools are unreliable/unavailable',
      'Static content generation'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Task Success Rate', measure: 'Goals achieved vs attempted' },
    { metric: 'Tool Utilization', measure: 'Effective vs unnecessary tool calls' },
    { metric: 'Reasoning Efficiency', measure: 'Steps to solution convergence' },
    { metric: 'Error Recovery', measure: 'Success after tool failures' },
    { metric: 'Information Quality', measure: 'Relevance of gathered data' },
    { metric: 'Iteration Count', measure: 'Thought-Action cycles per task' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Web Research: Thought → search("AI trends 2024") → Observe results → search("specific trend") → Synthesize',
    'Data Analysis: Thought → query_database() → Observe data → calculate_stats() → Interpret results',
    'Code Debugging: Thought → run_tests() → Observe failures → examine_code() → Fix & retest',
    'Travel Planning: Thought → check_flights() → Observe options → check_hotels() → Book best combo',
    'Customer Support: Thought → lookup_account() → Observe history → check_policy() → Provide solution'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al., 2022)', url: 'https://arxiv.org/abs/2210.03629' },
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Toolformer: Language Models Can Teach Themselves to Use Tools (Schick et al., 2023)', url: 'https://arxiv.org/abs/2302.04761' },
        { title: 'WebGPT: Browser-assisted question-answering with human feedback (Nakano et al., 2021)', url: 'https://arxiv.org/abs/2112.09332' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain ReAct Agent Documentation', url: 'https://python.langchain.com/docs/modules/agents/agent_types/react' },
        { title: 'OpenAI Function Calling Guide', url: 'https://platform.openai.com/docs/guides/function-calling' },
        { title: 'Anthropic Tool Use Documentation', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' },
        { title: 'Prompt Engineering Guide: ReAct Prompting', url: 'https://www.promptingguide.ai/techniques/react' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain Agent Framework', url: 'https://python.langchain.com/docs/modules/agents/' },
        { title: 'AutoGPT: Autonomous AI Agent Platform', url: 'https://github.com/Significant-Gravitas/AutoGPT' },
        { title: 'LlamaIndex ReAct Query Engine', url: 'https://docs.llamaindex.ai/en/stable/examples/agent/react_agent/' },
        { title: 'OpenAI Assistants API with Tools', url: 'https://platform.openai.com/docs/assistants/tools' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Discord - Agent Development', url: 'https://discord.gg/langchain' },
        { title: 'OpenAI Developer Forum - Function Calling', url: 'https://community.openai.com/c/api/20' },
        { title: 'AutoGPT Community Forum', url: 'https://github.com/Significant-Gravitas/AutoGPT/discussions' },
        { title: 'r/MachineLearning - ReAct Discussions', url: 'https://www.reddit.com/r/MachineLearning/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Interleaved Reasoning and Acting through iterative Thought → Action → Observation cycles"
        why="Enables dynamic problem-solving with real-time information and tool integration"
        keyInsight="Think before acting → Execute tools → Observe results → Reason about next step"
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

export default ReactDetails;