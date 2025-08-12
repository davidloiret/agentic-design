'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface ChainOfThoughtDetailsProps {
  selectedTechnique: any;
}

export const ChainOfThoughtDetails: React.FC<ChainOfThoughtDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Craft prompts with few-shot examples showing step-by-step reasoning patterns.',
    'Include phrases like "Let\'s think step by step" to encourage systematic reasoning.',
    'Break complex problems into smaller, manageable sub-problems.',
    'Generate intermediate reasoning steps before producing the final answer.',
    'Verify logical consistency across reasoning steps and validate the final output.',
    'Consider self-consistency by sampling multiple reasoning chains and selecting the most frequent answer.'
  ];

  const bestPractices = [
    'Use clear, consistent formatting for reasoning steps to improve readability and parsing.',
    'Provide diverse few-shot examples that cover different reasoning patterns and edge cases.',
    'Balance reasoning depth with token efficiency - avoid unnecessarily verbose explanations.',
    'Include verification steps to check intermediate calculations and logical consistency.',
    'Consider self-consistency sampling for critical decisions or high-stakes reasoning tasks.',
    'Structure prompts to encourage explicit state tracking for multi-step problems.',
    'Test reasoning chains manually to ensure they follow logical progression.'
  ];

  const whenNotToUse = [
    'Simple, direct questions that don\'t require multi-step reasoning.',
    'Time-sensitive applications where low latency is more important than reasoning accuracy.',
    'Token-constrained environments where the additional reasoning overhead is prohibitive.',
    'Tasks where implicit reasoning already produces satisfactory results.',
    'Creative or subjective tasks where structured reasoning may constrain output quality.'
  ];

  const commonPitfalls = [
    'Over-engineering prompts with excessive reasoning steps that don\'t improve accuracy.',
    'Inconsistent formatting between few-shot examples and target reasoning patterns.',
    'Failing to validate intermediate steps, leading to error propagation through the chain.',
    'Using CoT for tasks where the model already has strong implicit reasoning capabilities.',
    'Not accounting for increased token costs and latency in production systems.'
  ];

  const keyFeatures = [
    'Step-by-step reasoning transparency and interpretability',
    'Improved accuracy on complex mathematical and logical problems',
    'Self-consistency sampling for robust answer selection',
    'Emergent reasoning capabilities on large language models',
    'Flexible prompt structure adaptable to various domains',
    'Error detection through explicit intermediate verification'
  ];

  const kpiMetrics = [
    'Reasoning accuracy compared to direct prompting baseline on benchmark tasks.',
    'Intermediate step correctness rate and logical consistency across reasoning chains.',
    'Self-consistency agreement rate when sampling multiple reasoning paths.',
    'Token efficiency: reasoning quality improvement per additional token consumed.',
    'Human interpretability scores for reasoning step clarity and logical flow.',
    'Error attribution rate: ability to identify which reasoning steps contain errors.'
  ];

  const tokenUsage = [
    '2-5x token overhead compared to direct prompting due to reasoning step generation.',
    'Self-consistency sampling multiplies token usage by number of sampled chains (typically 3-10x).',
    'Latency increase proportional to reasoning depth and complexity.',
    'Consider token budgets when designing reasoning templates and few-shot examples.',
    'Monitor reasoning length distribution to identify optimization opportunities.'
  ];

  const bestUseCases = [
    'Mathematical word problems requiring multi-step arithmetic calculations.',
    'Logical reasoning tasks with complex conditional statements and inference.',
    'Commonsense reasoning problems that benefit from explicit consideration of alternatives.',
    'Educational applications where showing reasoning steps aids learning.',
    'Decision-making scenarios requiring systematic evaluation of options.',
    'Complex question-answering where intermediate steps improve accuracy.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Self-Consistency Improves Chain of Thought Reasoning in Language Models (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' },
        { title: 'Least-to-Most Prompting Enables Complex Reasoning in Large Language Models (Zhou et al., 2022)', url: 'https://arxiv.org/abs/2205.10625' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'OpenAI Cookbook: Chain-of-Thought Prompting', url: 'https://github.com/openai/openai-cookbook/blob/main/techniques_to_improve_reliability.md' },
        { title: 'LangChain: Chain of Thought Implementation', url: 'https://python.langchain.com/docs/modules/chains/' },
        { title: 'Anthropic: Chain of Thought Best Practices', url: 'https://docs.anthropic.com/claude/docs/chain-of-thought' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'OpenAI GPT-4, Anthropic Claude, Google PaLM for CoT reasoning', url: '#' },
        { title: 'LangChain, LlamaIndex for chain management and prompt templating', url: '#' },
        { title: 'Guidance, DSPy for programmatic prompt optimization', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'r/MachineLearning - Chain of Thought discussions', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'LangChain Community', url: 'https://discord.gg/langchain' },
        { title: 'Awesome ChatGPT Prompts', url: 'https://github.com/f/awesome-chatgpt-prompts' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism (short conceptual overview)"
        colorClass="bg-blue-500"
        gradient="from-blue-500/10 to-purple-500/10"
        borderClass="border-blue-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed">
          Chain of Thought (CoT) prompting enables large language models to perform multi-step reasoning by 
          explicitly generating intermediate reasoning steps before arriving at a final answer. This approach 
          improves performance on complex reasoning tasks by making the model's reasoning process transparent 
          and verifiable, allowing for better accuracy on arithmetic, logical, and commonsense reasoning problems.
        </p>
      </TechniqueSection>

      {/* Workflow / Steps */}
      <ListSection
        title="Workflow / Steps"
        items={workflowSteps}
        colorClass="bg-purple-500"
        ordered={true}
      />

      {/* Best Practices */}
      <BestPracticesSection practices={bestPractices} />

      {/* When NOT to Use */}
      <ListSection
        title="When NOT to Use"
        items={whenNotToUse}
        colorClass="bg-red-500"
      />

      {/* Common Pitfalls */}
      <ListSection
        title="Common Pitfalls"
        items={commonPitfalls}
        colorClass="bg-amber-500"
      />

      {/* Key Features */}
      <KeyFeaturesSection features={keyFeatures} />

      {/* KPIs / Success Metrics */}
      <ListSection
        title="KPIs / Success Metrics"
        items={kpiMetrics}
        colorClass="bg-emerald-500"
      />

      {/* Token / Resource Usage */}
      <ListSection
        title="Token / Resource Usage"
        items={tokenUsage}
        colorClass="bg-indigo-500"
      />

      {/* Best Use Cases */}
      <ListSection
        title="Best Use Cases"
        items={bestUseCases}
        colorClass="bg-fuchsia-500"
      />

      {/* References & Further Reading */}
      <ReferencesSection categories={references} />
    </>
  );
};

export default ChainOfThoughtDetails;