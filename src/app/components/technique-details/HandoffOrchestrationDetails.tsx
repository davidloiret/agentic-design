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

interface HandoffOrchestrationDetailsProps {
  selectedTechnique: any;
}

export const HandoffOrchestrationDetails: React.FC<HandoffOrchestrationDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Context Design', detail: 'Define handoff context schema and preservation rules' },
      { num: '2', action: 'Capability Mapping', detail: 'Map agent capabilities and routing logic' },
      { num: '3', action: 'Handoff Protocol', detail: 'Implement seamless context transfer mechanisms' },
      { num: '4', action: 'Escalation Rules', detail: 'Define triggering conditions and routing decisions' },
      { num: '5', action: 'Monitor Transfers', detail: 'Track handoff success and context continuity' }
    ],
    example: 'TierOneAgent → [context+decision] → DatabaseAgent → [escalation] → SeniorDBAAgent'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Preserve complete conversation context during transfers', icon: '✅' },
    { type: 'do', text: 'Use structured handoff messages with metadata', icon: '✅' },
    { type: 'do', text: 'Implement capability-based routing with confidence scores', icon: '✅' },
    { type: 'do', text: 'Add graceful fallback mechanisms for failed handoffs', icon: '✅' },
    { type: 'do', text: 'Log handoff decisions for audit and optimization', icon: '✅' },
    { type: 'do', text: 'Use standardized protocols like Model Context Protocol', icon: '✅' },
    { type: 'dont', text: 'Lose context information during agent transitions', icon: '❌' },
    { type: 'dont', text: 'Create circular handoff loops between agents', icon: '❌' },
    { type: 'dont', text: 'Hand off without checking recipient agent availability', icon: '❌' },
    { type: 'dont', text: 'Ignore handoff failures and continue processing', icon: '❌' },
    { type: 'dont', text: 'Use hardcoded routing without dynamic capability assessment', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Tasks require specialized expertise at different stages',
      'Customer support with escalation workflows',
      'Complex troubleshooting with domain experts',
      'Dynamic routing based on conversation analysis',
      'Situations requiring seamless context preservation',
      'Workloads with clear capability boundaries'
    ],
    avoidWhen: [
      'Simple tasks that single agents can handle',
      'Real-time systems where handoff latency is critical',
      'Workflows with unclear handoff trigger conditions',
      'Systems without proper context management infrastructure',
      'Scenarios where all agents have similar capabilities'
    ]
  };

  const keyMetrics = [
    { metric: 'Handoff Success Rate', measure: 'Percentage of successful context transfers' },
    { metric: 'Context Preservation', measure: 'Completeness of transferred information' },
    { metric: 'Routing Accuracy', measure: 'Correct agent selection based on capabilities' },
    { metric: 'Transfer Latency', measure: 'Time taken for handoff completion' },
    { metric: 'Resolution Quality', measure: 'Task success after handoff vs direct handling' },
    { metric: 'Escalation Efficiency', measure: 'Reduction in unnecessary agent hops' }
  ];

  const topUseCases = [
    'Customer Support: TierOne → Technical → Senior Engineer handoffs with full conversation history and customer context',
    'Technical Troubleshooting: Initial Diagnosis → Domain Expert → Escalation Specialist with diagnostic data transfer',
    'Medical Consultation: Primary Care → Specialist → Multi-disciplinary Team with complete patient history',
    'Legal Case Management: Paralegal → Associate → Partner with case context and document history transfer',
    'Financial Advisory: General Advisor → Tax Specialist → Investment Expert with client profile and transaction history'
  ];

  const references = [
    {
      title: 'Context-Aware Multi-Agent Systems (2024-2025)',
      items: [
        { title: 'A Survey on Context-Aware Multi-Agent Systems: Techniques, Challenges and Future Directions (Du et al., 2024)', url: 'https://arxiv.org/abs/2402.01968' },
        { title: 'Advancing Multi-Agent Systems Through Model Context Protocol (Krishnan, 2025)', url: 'https://arxiv.org/html/2504.21030v1' },
        { title: 'Multi-Agent Coordination across Diverse Applications: A Survey (2025)', url: 'https://arxiv.org/html/2502.14743v2' },
        { title: 'AI Agents: Evolution, Architecture, and Real-World Applications (2025)', url: 'https://arxiv.org/html/2503.12687v1' }
      ]
    },
    {
      title: 'Framework Implementation (2024-2025)',
      items: [
        { title: 'Microsoft AutoGen v0.4 - Asynchronous Event-Driven Architecture (2024)', url: 'https://www.microsoft.com/en-us/research/blog/autogen-v0-4-reimagining-the-foundation-of-agentic-ai-for-scale-extensibility-and-robustness/' },
        { title: 'OpenAI Swarm Framework - Agent Handoff Implementation (2024)', url: 'https://github.com/openai/swarm' },
        { title: 'LangGraph Multi-Agent Handoff Patterns (2024)', url: 'https://langchain-ai.github.io/langgraph/how-tos/multi_agent/' },
        { title: 'Microsoft Semantic Kernel - Handoff Agent Orchestration (2024)', url: 'https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-orchestration/handoff' }
      ]
    },
    {
      title: 'Technical Specifications',
      items: [
        { title: 'Model Context Protocol - Standardized Context Management', url: 'https://spec.modelcontextprotocol.io/' },
        { title: 'OpenAI Agents SDK - Handoff Implementation Guide', url: 'https://openai.github.io/openai-agents-python/handoffs/' },
        { title: 'Azure AI Agent Design Patterns - Handoff Orchestration', url: 'https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns' },
        { title: 'Google Cloud Agent Assist - Handoff to Human Agent', url: 'https://cloud.google.com/agent-assist/docs/handoff' }
      ]
    },
    {
      title: 'Industry Applications',
      items: [
        { title: 'Salesforce Agentforce - AI-to-Human Handoff Best Practices (2024)', url: 'https://www.salesforce.com/blog/agent-to-human-handoff/' },
        { title: 'Microsoft Copilot Studio - Conversation Handoff (2024)', url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-hand-off' },
        { title: 'AWS Bedrock - Multi-Agent Orchestration Handoff Patterns (2024)', url: 'https://aws.amazon.com/blogs/machine-learning/design-multi-agent-orchestration-with-reasoning-using-amazon-bedrock-and-open-source-frameworks/' },
        { title: 'Anthropic Multi-Agent Research System Architecture (2024)', url: 'https://www.anthropic.com/engineering/multi-agent-research-system' }
      ]
    },
    {
      title: 'Community & Development',
      items: [
        { title: 'AutoGen Community Contributors - 290+ GitHub Contributors (2024)', url: 'https://github.com/microsoft/autogen' },
        { title: 'LangChain Multi-Agent Systems Development Hub', url: 'https://www.langchain.com/langgraph' },
        { title: 'Google Agent Development Kit - Open Source Framework (2025)', url: 'https://developers.googleblog.com/en/agent-development-kit-easy-to-build-multi-agent-applications/' },
        { title: 'PAAMS 2024 - Practical Applications of Agents and Multi-Agent Systems', url: 'https://paams.net/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Dynamic delegation where agents intelligently transfer control based on context and specialized capabilities"
        why="Enables right expertise at right time, preserves conversation continuity, optimizes resource utilization, and improves outcome quality"
        keyInsight="Context-preserving handoffs + capability routing + intelligent escalation = seamless expert delegation"
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

export default HandoffOrchestrationDetails;