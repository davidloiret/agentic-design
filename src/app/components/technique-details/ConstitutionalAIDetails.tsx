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

interface ConstitutionalAIDetailsProps {
  selectedTechnique: any;
}

export const ConstitutionalAIDetails: React.FC<ConstitutionalAIDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Constitution', detail: 'Define principles and behavioral constraints' },
      { num: '2', action: 'SFT', detail: 'Supervised fine-tuning on helpful behaviors' },
      { num: '3', action: 'AI Feedback', detail: 'Generate critiques based on constitution' },
      { num: '4', action: 'RL Training', detail: 'Train preference model on AI feedback' },
      { num: '5', action: 'Validate', detail: 'Test constitutional adherence and safety' }
    ],
    example: 'constitution + sft_model → ai_feedback → preference_model → constitutional_model'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Create clear, specific, and actionable constitutional principles', icon: '✅' },
    { type: 'do', text: 'Use diverse constitutional principles covering multiple values', icon: '✅' },
    { type: 'do', text: 'Implement iterative constitutional refinement processes', icon: '✅' },
    { type: 'do', text: 'Monitor for constitutional principle conflicts and trade-offs', icon: '✅' },
    { type: 'do', text: 'Validate AI feedback quality against human judgment', icon: '✅' },
    { type: 'do', text: 'Test edge cases and adversarial scenarios thoroughly', icon: '✅' },
    { type: 'dont', text: 'Use vague or contradictory constitutional principles', icon: '❌' },
    { type: 'dont', text: 'Skip human validation of AI-generated feedback', icon: '❌' },
    { type: 'dont', text: 'Apply single constitutional framework to all domains', icon: '❌' },
    { type: 'dont', text: 'Ignore cultural and contextual variations in values', icon: '❌' },
    { type: 'dont', text: 'Deploy without extensive red team testing', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Building systems requiring strong ethical alignment',
      'Reducing human annotation costs for safety training',
      'Scaling oversight to complex AI behaviors',
      'Implementing transparent value-based AI systems',
      'Creating self-regulating AI with explicit principles'
    ],
    avoidWhen: [
      'Simple tasks with clear objective metrics',
      'Domains requiring strict regulatory compliance',
      'Systems needing real-time human oversight',
      'Applications with zero tolerance for errors',
      'Contexts with highly contested moral principles'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Constitutional Adherence', measure: '% responses following defined principles' },
    { metric: 'Harmlessness Rate', measure: '% outputs avoiding harmful content' },
    { metric: 'Helpfulness Score', measure: 'Quality of assistance provided' },
    { metric: 'Value Alignment', measure: 'Agreement with intended ethical framework' },
    { metric: 'AI Feedback Quality', measure: 'Correlation with human feedback' },
    { metric: 'Robustness Score', measure: 'Performance under adversarial testing' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Conversational AI: Align chatbots with ethical principles and reduce harmful outputs',
    'Content Moderation: Automatically enforce community guidelines and platform values',
    'Legal AI Assistants: Ensure compliance with professional ethics and legal standards',
    'Educational AI: Implement age-appropriate and pedagogically sound interactions',
    'Healthcare AI: Maintain patient privacy and medical ethics in AI-assisted care',
    'Financial AI: Ensure fair lending practices and regulatory compliance in AI decisions'
  ];

  const references = [
    {
      title: 'Foundational Papers',
      items: [
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' },
        { title: 'Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2204.05862' },
        { title: 'AI Alignment via Debate (Irving et al., 2018)', url: 'https://arxiv.org/abs/1805.00899' },
        { title: 'Scalable agent alignment via reward modeling (Leike et al., 2018)', url: 'https://arxiv.org/abs/1811.07871' }
      ]
    },
    {
      title: 'Constitutional AI Methodology',
      items: [
        { title: 'Constitutional AI: Harmlessness from AI Feedback - Full Paper (Anthropic, 2022)', url: 'https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback' },
        { title: 'Claude\'s Constitution - Anthropic Documentation', url: 'https://www.anthropic.com/news/claudes-constitution' },
        { title: 'The Constitutional AI Approach to AI Safety (Anthropic, 2023)', url: 'https://www.anthropic.com/research/constitutional-ai' },
        { title: 'Measuring Progress on Scalable Oversight for Large Language Models (OpenAI, 2022)', url: 'https://openai.com/research/measuring-progress-on-scalable-oversight' }
      ]
    },
    {
      title: 'AI Safety & Alignment',
      items: [
        { title: 'Concrete Problems in AI Safety (Amodei et al., 2016)', url: 'https://arxiv.org/abs/1606.06565' },
        { title: 'AI Alignment: A Comprehensive Survey (Ji et al., 2023)', url: 'https://arxiv.org/abs/2310.19852' },
        { title: 'Red Teaming Language Models to Reduce Harms (Ganguli et al., 2022)', url: 'https://arxiv.org/abs/2209.07858' },
        { title: 'The Alignment Problem: Machine Learning and Human Values (Russell, 2019)', url: 'https://www.basicbooks.com/titles/stuart-russell/the-alignment-problem/9781541699250/' }
      ]
    },
    {
      title: 'Constitutional Frameworks & Principles',
      items: [
        { title: 'Universal Declaration of Human Rights - Constitutional AI Basis', url: 'https://www.un.org/en/about-us/universal-declaration-of-human-rights' },
        { title: 'Asilomar AI Principles (Future of Life Institute, 2017)', url: 'https://futureoflife.org/ai-principles/' },
        { title: 'Partnership on AI Tenets (Partnership on AI, 2016)', url: 'https://www.partnershiponai.org/tenets/' },
        { title: 'IEEE Standards for Ethical Design of Autonomous Systems', url: 'https://standards.ieee.org/industry-connections/ec/autonomous-systems.html' }
      ]
    },
    {
      title: 'Implementation & Scaling',
      items: [
        { title: 'Scaling Laws for Reward Model Overoptimization (Gao et al., 2022)', url: 'https://arxiv.org/abs/2210.10760' },
        { title: 'Training language models to follow instructions with human feedback (Ouyang et al., 2022)', url: 'https://arxiv.org/abs/2203.02155' },
        { title: 'Teaching language models to support answers with verified quotes (Menick et al., 2022)', url: 'https://arxiv.org/abs/2203.11147' },
        { title: 'Constitutional AI at Scale: Implementation Lessons (Anthropic, 2023)', url: 'https://www.anthropic.com/research/scaling-constitutional-ai' }
      ]
    },
    {
      title: 'Evaluation & Measurement',
      items: [
        { title: 'Measuring Harmful Content in Large Language Models (Gehman et al., 2020)', url: 'https://arxiv.org/abs/2009.11462' },
        { title: 'TruthfulQA: Measuring How Models Mimic Human Falsehoods (Lin et al., 2021)', url: 'https://arxiv.org/abs/2109.07958' },
        { title: 'HHH: Training a Helpful, Harmless, and Honest Assistant (Askell et al., 2021)', url: 'https://arxiv.org/abs/2112.00861' },
        { title: 'Anthropic\'s Model Card for Claude (Anthropic, 2023)', url: 'https://www.anthropic.com/model-card-claude-2' }
      ]
    },
    {
      title: 'RLHF & Preference Learning',
      items: [
        { title: 'Learning to summarize from human feedback (Stiennon et al., 2020)', url: 'https://arxiv.org/abs/2009.01325' },
        { title: 'Preferences Implicit in the State of the World (Christiano et al., 2017)', url: 'https://arxiv.org/abs/1705.10310' },
        { title: 'Deep reinforcement learning from human preferences (Christiano et al., 2017)', url: 'https://arxiv.org/abs/1706.03741' },
        { title: 'Scalable agent alignment via reward modeling (Leike et al., 2018)', url: 'https://arxiv.org/abs/1811.07871' }
      ]
    },
    {
      title: 'Moral & Ethical AI Research',
      items: [
        { title: 'Moral Machine Experiment: Global Preferences in AI Ethics (Awad et al., 2018)', url: 'https://www.nature.com/articles/s41586-018-0637-6' },
        { title: 'The Moral Status of AI (Floridi et al., 2018)', url: 'https://link.springer.com/article/10.1007/s11023-018-9482-5' },
        { title: 'Artificial Moral Agents: An Introduction (Wallach & Allen, 2008)', url: 'https://oxford.universitypressscholarship.com/view/10.1093/acprof:oso/9780195374049.001.0001/acprof-9780195374049' },
        { title: 'Machine Ethics: The Robot\'s Dilemma (Lin et al., 2011)', url: 'https://link.springer.com/chapter/10.1007/978-1-84996-220-9_2' }
      ]
    },
    {
      title: 'Industry Applications',
      items: [
        { title: 'Claude 2 Constitutional AI Implementation (Anthropic, 2023)', url: 'https://www.anthropic.com/news/claude-2' },
        { title: 'OpenAI GPT-4 System Card - Safety Considerations', url: 'https://openai.com/research/gpt-4-system-card' },
        { title: 'Google Bard Responsible AI Practices', url: 'https://ai.google/responsibility/responsible-ai-practices/' },
        { title: 'Microsoft Responsible AI Framework', url: 'https://www.microsoft.com/en-us/ai/responsible-ai' }
      ]
    },
    {
      title: 'Tools & Implementation',
      items: [
        { title: 'Anthropic Constitutional AI Codebase', url: 'https://github.com/anthropics/ConstitutionalAI' },
        { title: 'OpenAI Moderation API for Content Policy', url: 'https://platform.openai.com/docs/guides/moderation' },
        { title: 'Hugging Face Transformers RLHF Implementation', url: 'https://github.com/huggingface/trl' },
        { title: 'Constitutional AI Training Scripts (Community)', url: 'https://github.com/CarperAI/trlx' }
      ]
    },
    {
      title: 'Research Communities',
      items: [
        { title: 'Anthropic Research Team', url: 'https://www.anthropic.com/research' },
        { title: 'AI Alignment Forum', url: 'https://www.alignmentforum.org/' },
        { title: 'Center for AI Safety (CAIS)', url: 'https://www.safe.ai/' },
        { title: 'Future of Humanity Institute (FHI)', url: 'https://www.fhi.ox.ac.uk/' }
      ]
    },
    {
      title: 'Policy & Governance',
      items: [
        { title: 'AI Governance: A Research Agenda (Dafoe, 2018)', url: 'https://arxiv.org/abs/1802.07228' },
        { title: 'The Malicious Use of Artificial Intelligence (Brundage et al., 2018)', url: 'https://maliciousaireport.com/' },
        { title: 'National AI Initiative (US Government)', url: 'https://www.ai.gov/' },
        { title: 'EU AI Act: Constitutional AI Implications', url: 'https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Train AI systems using explicitly defined principles and AI-generated feedback to achieve harmless, helpful behavior"
        why="Scales oversight beyond human capacity, reduces harmful outputs, and creates transparent value-aligned AI systems"
        keyInsight="Constitutional principles guide AI feedback generation, creating self-supervising systems aligned with explicit values"
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

export default ConstitutionalAIDetails;