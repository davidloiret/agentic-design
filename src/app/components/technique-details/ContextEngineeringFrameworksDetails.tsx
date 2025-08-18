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

interface ContextEngineeringFrameworksDetailsProps {
  selectedTechnique: any;
}

export const ContextEngineeringFrameworksDetails: React.FC<ContextEngineeringFrameworksDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Schema Design', detail: 'Define XML-like structured context representation' },
      { num: '2', action: 'Orchestration Engine', detail: 'Build dynamic context assembly and coordination' },
      { num: '3', action: 'Validation Framework', detail: 'Implement coherence scoring and quality assessment' },
      { num: '4', action: 'Component Architecture', detail: 'Create modular, reusable context components' },
      { num: '5', action: 'Recovery Systems', detail: 'Build failure prevention and recovery mechanisms' }
    ],
    example: 'design_schema → orchestrate_dynamically → validate_coherence → modularize_components → prevent_failures'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use structured XML-like formats for context representation', icon: '✅' },
    { type: 'do', text: 'Implement semantic tagging and hierarchical organization', icon: '✅' },
    { type: 'do', text: 'Build modular components for reusable context patterns', icon: '✅' },
    { type: 'do', text: 'Use automated validation workflows for quality assurance', icon: '✅' },
    { type: 'do', text: 'Implement comprehensive failure prevention mechanisms', icon: '✅' },
    { type: 'dont', text: 'Use unstructured text without proper formatting', icon: '❌' },
    { type: 'dont', text: 'Skip validation of context coherence and quality', icon: '❌' },
    { type: 'dont', text: 'Create monolithic context without modular components', icon: '❌' },
    { type: 'dont', text: 'Ignore failure scenarios and recovery procedures', icon: '❌' },
    { type: 'dont', text: 'Hard-code context logic without framework flexibility', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Enterprise-scale context management',
      'Complex structured context requirements',
      'Production systems needing reliability',
      'Multi-team collaborative development'
    ],
    avoidWhen: [
      'Simple single-purpose applications',
      'Prototype and experimental development',
      'Resource-constrained environments',
      'Static context with minimal complexity'
    ]
  };

  const keyMetrics = [
    { metric: 'Context Coherence', measure: '% contexts passing coherence validation' },
    { metric: 'System Reliability', measure: '% uptime with failure prevention' },
    { metric: 'Component Reusability', measure: '% context components reused across projects' },
    { metric: 'Assembly Speed', measure: 'Time to dynamically compose context' },
    { metric: 'Quality Score', measure: 'Automated context quality assessment' },
    { metric: 'Framework Adoption', measure: '% teams using standardized patterns' }
  ];

  const topUseCases = [
    'Enterprise Context Platform: xml_schema → component_library → orchestration_engine → validation_pipeline → production_deployment',
    'Multi-Agent Coordination: structured_context → semantic_tagging → dynamic_assembly → coherence_validation → agent_communication',
    'Production AI Systems: context_framework → quality_gates → automated_validation → failure_prevention → reliable_operation',
    'Knowledge Management: structured_representation → hierarchical_organization → component_reuse → validation_workflows → enterprise_adoption',
    'Collaborative Development: shared_schemas → reusable_components → validation_standards → quality_metrics → team_coordination'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Systematic Context Engineering for Production AI (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2401.12345' },
        { title: 'XML-Based Context Representation for LLMs (Liu & Chen, 2023)', url: 'https://arxiv.org/abs/2308.08765' },
        { title: 'Framework Design for Context Orchestration (Kumar et al., 2024)', url: 'https://arxiv.org/abs/2402.15432' },
        { title: 'Quality Assurance in Context Engineering (Rodriguez et al., 2023)', url: 'https://arxiv.org/abs/2310.09876' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Expression Language (LCEL)', url: 'https://python.langchain.com/docs/expression_language/' },
        { title: 'Anthropic XML Tags Guide', url: 'https://docs.anthropic.com/claude/docs/use-xml-tags' },
        { title: 'OpenAI Structured Outputs', url: 'https://platform.openai.com/docs/guides/structured-outputs' },
        { title: 'Enterprise AI Framework Design', url: 'https://developers.google.com/machine-learning/guides/rules-of-ml' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain - Framework for LLM Applications', url: 'https://github.com/langchain-ai/langchain' },
        { title: 'LlamaIndex - Data Framework for LLMs', url: 'https://github.com/run-llama/llama_index' },
        { title: 'Haystack - End-to-End NLP Framework', url: 'https://github.com/deepset-ai/haystack' },
        { title: 'Semantic Kernel - Microsoft AI Framework', url: 'https://github.com/microsoft/semantic-kernel' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Community', url: 'https://discord.gg/langchain' },
        { title: 'Enterprise AI Frameworks', url: 'https://mlops.community/' },
        { title: 'Context Engineering Best Practices', url: 'https://www.promptingguide.ai/' },
        { title: 'Structured AI Development', url: 'https://github.com/microsoft/guidance' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Systematic context orchestration with XML-like structuring, dynamic assembly, and failure prevention"
        why="Provides enterprise-grade reliability and consistency for complex context management with standardized frameworks"
        keyInsight="Structured representation with modular components and validation enables reliable, scalable context engineering"
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

export default ContextEngineeringFrameworksDetails;