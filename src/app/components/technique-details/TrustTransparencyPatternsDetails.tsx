'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import { PatternRelationships, RelationshipData } from '../shared/PatternRelationships';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface TrustTransparencyPatternsDetailsProps {
  selectedTechnique: any;
}

export const TrustTransparencyPatternsDetails: React.FC<TrustTransparencyPatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Design Transparency Framework', detail: 'Implement three-level transparency: what/how/why with algorithmic, interaction, and social layers' },
      { num: '2', action: 'Build Explainability Components', detail: 'Create progressive disclosure interfaces with feature importance and counterfactual explanations' },
      { num: '3', action: 'Add Trust Indicators', detail: 'Implement confidence visualization, source attribution, and AI-generated content markers' },
      { num: '4', action: 'Create Decision Visualization', detail: 'Design decision trees, reasoning paths, and interactive exploration interfaces' },
      { num: '5', action: 'Implement Model Cards', detail: 'Build structured documentation with multi-stakeholder information architecture' }
    ],
    example: 'transparency_levels → explainability_ui → trust_signals → decision_viz → model_documentation'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use clear visual indicators (like Einstein sparkles) to show AI-generated content', icon: '✅' },
    { type: 'do', text: 'Implement three levels of transparency: what happened, how decisions were made, why they matter', icon: '✅' },
    { type: 'do', text: 'Provide progressive disclosure with expandable explanation panels', icon: '✅' },
    { type: 'do', text: 'Include source attribution and citations for all AI recommendations', icon: '✅' },
    { type: 'do', text: 'Design for different stakeholder needs: technical, legal, and user-friendly explanations', icon: '✅' },
    { type: 'do', text: 'Implement mindful friction for high-stakes decisions with confirmation dialogs', icon: '✅' },
    { type: 'do', text: 'Use counterfactual explanations to show "what if" scenarios', icon: '✅' },
    { type: 'do', text: 'Create interactive model cards with layered information architecture', icon: '✅' },
    { type: 'dont', text: 'Hide uncertainty or present AI decisions as infallible', icon: '❌' },
    { type: 'dont', text: 'Use technical jargon without providing accessible explanations', icon: '❌' },
    { type: 'dont', text: 'Overwhelm users with too much technical detail upfront', icon: '❌' },
    { type: 'dont', text: 'Implement transparency without considering user cognitive load', icon: '❌' },
    { type: 'dont', text: 'Skip bias detection warnings and toxicity safeguards', icon: '❌' },
    { type: 'dont', text: 'Provide explanations without actionable information for users', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'High-stakes decision-making applications (healthcare, finance, legal)',
      'Regulated industries requiring audit trails and accountability',
      'Enterprise systems needing explainable business intelligence',
      'Customer-facing AI where trust is critical for adoption',
      'Multi-stakeholder environments with diverse transparency needs',
      'AI systems making consequential automated decisions',
      'Applications where users need to understand and verify AI reasoning'
    ],
    avoidWhen: [
      'Simple, low-risk applications where transparency adds unnecessary complexity',
      'Performance-critical systems where explanation overhead is prohibitive',
      'Internal tools where users have high AI literacy and trust',
      'Applications with clear, deterministic rule-based logic',
      'Systems where IP protection conflicts with transparency requirements'
    ]
  };

  const keyMetrics = [
    { metric: 'Trust Calibration Score', measure: 'Alignment between user trust levels and actual AI reliability' },
    { metric: 'Explanation Comprehension Rate', measure: '% of users who correctly understand AI reasoning explanations' },
    { metric: 'Decision Confidence Improvement', measure: 'Increase in user confidence when making AI-assisted decisions' },
    { metric: 'Transparency Engagement Rate', measure: '% of users who actively explore explanation features' },
    { metric: 'Error Detection Accuracy', measure: 'User ability to identify when AI makes mistakes' },
    { metric: 'Stakeholder Satisfaction Index', measure: 'Multi-stakeholder rating of transparency adequacy' },
    { metric: 'Audit Compliance Score', measure: 'Percentage of regulatory transparency requirements met' },
    { metric: 'Cognitive Load Assessment', measure: 'Mental effort required to understand AI explanations' }
  ];

  const topUseCases = [
    'Healthcare AI: Diagnostic reasoning → clinical evidence display → physician review integration → patient explanation',
    'Financial Services: Risk assessment visualization → regulatory compliance display → decision audit trails → customer transparency',
    'Legal Tech: Case analysis reasoning → precedent citation → confidence intervals → attorney decision support',
    'Enterprise BI: Data analysis explanation → source attribution → decision factors → stakeholder reporting',
    'Content Moderation: Policy violation detection → reasoning display → appeal process → transparency reports',
    'Hiring AI: Candidate evaluation factors → bias detection alerts → decision justification → compliance documentation',
    'Autonomous Systems: Decision tree visualization → sensor data display → confidence metrics → human oversight integration'
  ];

  const relationshipData: RelationshipData = {
    prerequisites: [
      {
        id: 'confidence-visualization-patterns',
        name: 'Confidence Visualization Patterns',
        category: 'ui-ux-patterns',
        description: 'Foundation for displaying AI certainty and uncertainty levels',
        icon: '📊',
        complexity: 'high',
        reason: 'Essential building block for transparent confidence communication'
      },
      {
        id: 'progressive-disclosure-patterns',
        name: 'Progressive Disclosure UI Patterns',
        category: 'ui-ux-patterns',
        description: 'Gradual information revelation for complex explanations',
        icon: '📋',
        complexity: 'high',
        reason: 'Required for managing cognitive load in explainable interfaces'
      }
    ],
    nextSteps: [
      {
        id: 'human-in-the-loop',
        name: 'Human-in-the-Loop',
        category: 'ui-ux-patterns',
        description: 'Human oversight integration with transparent decision points',
        icon: '👤',
        complexity: 'medium',
        reason: 'Natural evolution to human-AI collaborative decision-making'
      },
      {
        id: 'monitoring-control-patterns',
        name: 'Monitoring and Control Patterns',
        category: 'ui-ux-patterns',
        description: 'Advanced monitoring with transparent operational oversight',
        icon: '🎛️',
        complexity: 'high',
        reason: 'Scale transparency to enterprise monitoring and control systems'
      }
    ],
    alternatives: [
      {
        id: 'privacy-security-ux',
        name: 'Privacy and Security UX',
        category: 'ui-ux-patterns',
        description: 'Privacy-focused patterns that may limit transparency',
        icon: '🔒',
        complexity: 'high',
        reason: 'Alternative approach when privacy concerns outweigh transparency needs'
      },
      {
        id: 'adaptive-interface-patterns',
        name: 'Adaptive Interface Patterns',
        category: 'ui-ux-patterns',
        description: 'Personalized interfaces with implicit rather than explicit explanations',
        icon: '🎯',
        complexity: 'high',
        reason: 'Different approach focusing on adaptation rather than explanation'
      }
    ],
    combinesWith: [
      {
        id: 'agent-collaboration-ux',
        name: 'Agent Collaboration UX',
        category: 'ui-ux-patterns',
        description: 'Transparent multi-agent coordination and decision-making',
        icon: '🤝',
        complexity: 'high',
        reason: 'Essential for explainable multi-agent system operations'
      },
      {
        id: 'conversational-interface-patterns',
        name: 'Conversational Interface Patterns',
        category: 'ui-ux-patterns',
        description: 'Transparent reasoning in conversational AI interactions',
        icon: '💬',
        complexity: 'high',
        reason: 'Build trust through explainable conversational AI'
      },
      {
        id: 'visual-reasoning-patterns',
        name: 'Visual Reasoning Patterns',
        category: 'ui-ux-patterns',
        description: 'Visual representation of AI reasoning and decision processes',
        icon: '👁️',
        complexity: 'high',
        reason: 'Enhance explanation clarity through visual reasoning displays'
      }
    ],
    enhancedBy: [
      {
        id: 'error-recovery-patterns',
        name: 'Error Handling and Recovery Patterns',
        category: 'ui-ux-patterns',
        description: 'Transparent error communication and recovery processes',
        icon: '🔧',
        complexity: 'medium',
        reason: 'Transparent error handling builds user trust and understanding'
      },
      {
        id: 'onboarding-education-patterns',
        name: 'Onboarding and Education Patterns',
        category: 'ui-ux-patterns',
        description: 'User education about AI capabilities and limitations',
        icon: '🎓',
        complexity: 'medium',
        reason: 'Help users develop appropriate mental models for AI trust'
      }
    ],
    enhances: [
      {
        id: 'naive-rag',
        name: 'Naive RAG',
        category: 'knowledge-retrieval',
        description: 'Add source attribution and citation transparency to RAG systems',
        icon: '📚',
        complexity: 'medium',
        reason: 'Make knowledge retrieval transparent and verifiable'
      },
      {
        id: 'function-calling',
        name: 'Function Calling',
        category: 'tool-use',
        description: 'Transparent function execution with reasoning display',
        icon: '🔧',
        complexity: 'medium',
        reason: 'Show users what functions are called and why'
      }
    ],
    evolvesTo: [
      {
        id: 'accessibility-agent-design',
        name: 'Accessibility in Agent Design',
        category: 'ui-ux-patterns',
        description: 'Inclusive transparency patterns for diverse user abilities',
        icon: '♿',
        complexity: 'high',
        reason: 'Evolution toward universally accessible explanations'
      }
    ],
    variants: [
      {
        id: 'technical-explainability',
        name: 'Technical Explainability Patterns',
        category: 'ui-ux-patterns',
        description: 'Deep technical explanations for expert users',
        icon: '🔬',
        complexity: 'high',
        reason: 'Variant optimized for data scientists and ML engineers'
      },
      {
        id: 'regulatory-compliance-transparency',
        name: 'Regulatory Compliance Transparency',
        category: 'ui-ux-patterns',
        description: 'Transparency patterns meeting specific regulatory requirements',
        icon: '⚖️',
        complexity: 'high',
        reason: 'Variant focused on legal and regulatory compliance needs'
      }
    ],
    conflictsWith: [
      {
        id: 'black-box-optimization',
        name: 'Black Box Optimization',
        category: 'performance-patterns',
        description: 'Performance optimization that sacrifices explainability',
        icon: '📦',
        complexity: 'medium',
        reason: 'Fundamental tradeoff between performance and explainability'
      }
    ],
    industryApplications: [
      {
        domain: 'Healthcare',
        description: 'Explainable diagnostic AI with clinical decision support and patient transparency',
        patterns: [
          {
            id: 'human-in-the-loop',
            name: 'Human-in-the-Loop',
            category: 'ui-ux-patterns',
            description: 'Required physician oversight with transparent clinical reasoning',
            icon: '👤'
          },
          {
            id: 'privacy-security-ux',
            name: 'Privacy and Security UX',
            category: 'ui-ux-patterns',
            description: 'HIPAA-compliant transparency with patient data protection',
            icon: '🔒'
          }
        ]
      },
      {
        domain: 'Financial Services',
        description: 'Regulatory-compliant AI with transparent risk assessment and decision audit trails',
        patterns: [
          {
            id: 'monitoring-control-patterns',
            name: 'Monitoring and Control Patterns',
            category: 'ui-ux-patterns',
            description: 'Real-time risk monitoring with transparent decision tracking',
            icon: '🎛️'
          },
          {
            id: 'error-recovery-patterns',
            name: 'Error Handling and Recovery Patterns',
            category: 'ui-ux-patterns',
            description: 'Transparent error handling for financial decision systems',
            icon: '🔧'
          }
        ]
      },
      {
        domain: 'Legal Technology',
        description: 'Explainable legal AI with case reasoning, precedent analysis, and attorney decision support',
        patterns: [
          {
            id: 'visual-reasoning-patterns',
            name: 'Visual Reasoning Patterns',
            category: 'ui-ux-patterns',
            description: 'Visual case analysis and legal reasoning representation',
            icon: '👁️'
          },
          {
            id: 'agent-collaboration-ux',
            name: 'Agent Collaboration UX',
            category: 'ui-ux-patterns',
            description: 'Transparent coordination between legal research agents',
            icon: '🤝'
          }
        ]
      }
    ]
  };

  const references = [
    {
      title: 'NIST AI Risk Management Framework',
      items: [
        { title: 'NIST AI Risk Management Framework (AI RMF 1.0)', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
        { title: 'Four Principles of Explainable Artificial Intelligence (NISTIR 8312)', url: 'https://nvlpubs.nist.gov/nistpubs/ir/2021/NIST.IR.8312.pdf' },
        { title: 'Psychological Foundations of Explainability and Interpretability (NISTIR 8367)', url: 'https://www.nist.gov/artificial-intelligence/ai-research-explainability' },
        { title: 'AI Risks and Trustworthiness - NIST AIRC', url: 'https://airc.nist.gov/AI_RMF_Knowledge_Base/AI_RMF/Foundational_Information/3-sec-characteristics' }
      ]
    },
    {
      title: 'Industry Trust Frameworks',
      items: [
        { title: 'Salesforce AI Trust Patterns and Principles', url: 'https://www.salesforce.com/news/stories/ai-trust-patterns/' },
        { title: 'Salesforce Einstein Trust Layer', url: 'https://www.salesforce.com/artificial-intelligence/trusted-ai/' },
        { title: 'Salesforce Model Cards for AI Transparency', url: 'https://www.salesforce.com/blog/model-cards-for-ai-model-transparency/' },
        { title: 'IBM Carbon Design System - Carbon for AI', url: 'https://carbondesignsystem.com/guidelines/ai/' },
        { title: 'Google Model Cards Framework', url: 'https://modelcards.withgoogle.com/' }
      ]
    },
    {
      title: 'Academic Research (CHI/ACM 2024)',
      items: [
        { title: 'Design Principles for Generative AI Applications (CHI 2024)', url: 'https://dl.acm.org/doi/10.1145/3613904.3642466' },
        { title: 'Questioning the AI: Explainable AI User Experiences (CHI 2020)', url: 'https://dl.acm.org/doi/10.1145/3313831.3376590' },
        { title: 'Explainable AI (XAI): Core Ideas, Techniques, and Solutions (ACM Survey)', url: 'https://dl.acm.org/doi/10.1145/3561048' },
        { title: 'AI Transparency in the Age of LLMs: A Human-Centered Research Roadmap', url: 'https://hdsr.mitpress.mit.edu/pub/aelql9qy' }
      ]
    },
    {
      title: 'Visualization & Interface Design',
      items: [
        { title: 'Calculating and Visualizing Counterfactual Feature Importance Values (ArXiv)', url: 'https://arxiv.org/abs/2306.06506' },
        { title: 'AI Transparency in UX: Designing Clear AI Interactions', url: 'https://uxdesign.cc/ai-transparency-in-ux-designing-clear-ai-interactions-ba9b6ba4761b' },
        { title: 'Designerly Understanding: Model Transparency for AI-Powered UX (CHI 2023)', url: 'https://dl.acm.org/doi/10.1145/3544548.3580652' },
        { title: 'AI Transparency: 5 Design Lessons to Build Trust', url: 'https://www.eleken.co/blog-posts/ai-transparency' }
      ]
    },
    {
      title: 'Technical Implementation',
      items: [
        { title: 'NVIDIA Model Card++: Enhanced AI Transparency', url: 'https://developer.nvidia.com/blog/enhancing-ai-transparency-and-ethical-considerations-with-model-card/' },
        { title: 'AWS AI Service Cards for Responsible AI', url: 'https://aws.amazon.com/blogs/machine-learning/introducing-aws-ai-service-cards-a-new-resource-to-enhance-transparency-and-advance-responsible-ai/' },
        { title: 'Microsoft Azure OpenAI Transparency Note', url: 'https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/openai/transparency-note' },
        { title: 'The CLeAR Documentation Framework for AI Transparency', url: 'https://shorensteincenter.org/clear-documentation-framework-ai-transparency-recommendations-practitioners-context-policymakers/' }
      ]
    },
    {
      title: 'Regulatory & Compliance',
      items: [
        { title: 'Transparency and Accountability in AI Systems (Frontiers)', url: 'https://www.frontiersin.org/journals/human-dynamics/articles/10.3389/fhumd.2024.1421273/full' },
        { title: 'Building Trust in AI: The Role of Explainability (McKinsey)', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/building-ai-trust-the-key-role-of-explainability' },
        { title: 'What Is AI Transparency? Comprehensive Guide (Zendesk)', url: 'https://www.zendesk.com/blog/ai-transparency/' },
        { title: 'Could Transparent Model Cards Drive Trust in Health AI? (Nature)', url: 'https://www.nature.com/articles/s41746-025-01482-9' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Explainable AI interfaces with decision transparency, source attribution, and trust-building patterns for responsible AI deployment"
        why="Builds user trust, meets regulatory requirements, enables informed decision-making, and ensures accountability in AI systems"
        keyInsight="Three-level transparency framework (what/how/why) with progressive disclosure - trust through understanding rather than blind faith"
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

      <PatternRelationships
        currentPatternId="trust-transparency-patterns"
        currentPatternName="Trust and Transparency Patterns"
        relationships={relationshipData}
        className="mt-8"
      />

      <ReferencesSection categories={references} />
    </>
  );
};

export default TrustTransparencyPatternsDetails;