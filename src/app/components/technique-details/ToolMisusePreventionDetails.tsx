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

interface ToolMisusePreventionDetailsProps {
  selectedTechnique: any;
}

export const ToolMisusePreventionDetails: React.FC<ToolMisusePreventionDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define Boundaries', detail: 'Whitelist allowed tools & operations' },
      { num: '2', action: 'Validate Requests', detail: 'Parse & check against permissions' },
      { num: '3', action: 'Sandbox Execution', detail: 'Isolate tool runs in secure environment' },
      { num: '4', action: 'Monitor Resources', detail: 'Track usage, timeouts, output size' },
      { num: '5', action: 'Audit Everything', detail: 'Log all tool calls with full context' }
    ],
    example: 'permission_check → parameter_validation → sandboxed_execution → resource_monitoring → audit_log'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use capability-based access control for tools', icon: '✅' },
    { type: 'do', text: 'Implement strict parameter validation and sanitization', icon: '✅' },
    { type: 'do', text: 'Run tools in sandboxed environments with resource limits', icon: '✅' },
    { type: 'do', text: 'Maintain comprehensive audit logs with context', icon: '✅' },
    { type: 'do', text: 'Use rate limiting per tool type and user', icon: '✅' },
    { type: 'dont', text: 'Allow unrestricted command execution', icon: '❌' },
    { type: 'dont', text: 'Trust tool parameters without validation', icon: '❌' },
    { type: 'dont', text: 'Skip sandboxing for "safe" tools', icon: '❌' },
    { type: 'dont', text: 'Ignore resource consumption patterns', icon: '❌' },
    { type: 'dont', text: 'Grant blanket permissions to trusted agents', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Tool-enabled autonomous agents',
      'External API integrations',
      'File system operations',
      'Database access scenarios'
    ],
    avoidWhen: [
      'Pure text generation only',
      'No external tool access',
      'Fully isolated systems',
      'Read-only operations'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Blocked Attempts', measure: 'Malicious tool calls prevented/day' },
    { metric: 'Validation Success', measure: '% parameters passing checks' },
    { metric: 'Sandbox Escapes', measure: 'Breach attempts detected' },
    { metric: 'Resource Violations', measure: 'Timeout/memory limit hits' },
    { metric: 'Audit Coverage', measure: '% tool calls fully logged' },
    { metric: 'Response Latency', measure: 'ms added by security checks' }
  ];

  // Top Use Cases
  const topUseCases = [
    'DevOps Assistant: Prevent rm -rf, sudo, chmod on critical systems',
    'Data Analysis: Block unauthorized database queries & data exfiltration',
    'File Management: Restrict access to sensitive directories & file types',
    'API Integration: Prevent calls to unauthorized endpoints or services',
    'Automation Agents: Control robot/IoT device commands within safety bounds'
  ];

  const references = [
    {
      title: 'Security Research & Threat Models',
      items: [
        { title: 'OWASP ASI - Tool Misuse Prevention Strategies (2025)', url: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/' },
        { title: 'Prompt Injection Attacks via Tool Use (2024)', url: 'https://arxiv.org/abs/2403.04812' },
        { title: 'Security Risks in LLM Tool Use (Berkeley, 2024)', url: 'https://arxiv.org/abs/2309.08810' },
        { title: 'Jailbreaking LLMs via Function Calling (2024)', url: 'https://arxiv.org/abs/2401.06749' }
      ]
    },
    {
      title: 'Sandboxing & Isolation Technologies',
      items: [
        { title: 'gVisor - Application Kernel for Containers', url: 'https://gvisor.dev/docs/' },
        { title: 'Firecracker - Secure and Fast microVMs', url: 'https://firecracker-microvm.github.io/' },
        { title: 'Docker Security Best Practices', url: 'https://docs.docker.com/engine/security/' },
        { title: 'WebAssembly System Interface (WASI)', url: 'https://wasi.dev/' }
      ]
    },
    {
      title: 'Access Control Frameworks',
      items: [
        { title: 'NIST SP 800-162 - Attribute Based Access Control', url: 'https://csrc.nist.gov/publications/detail/sp/800-162/final' },
        { title: 'OAuth 2.0 Security Best Practices (RFC 8252)', url: 'https://datatracker.ietf.org/doc/html/rfc8252' },
        { title: 'Capability-Based Security (ACM Computing Surveys)', url: 'https://dl.acm.org/doi/10.1145/3609330' },
        { title: 'Zero Trust Architecture (NIST SP 800-207)', url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final' }
      ]
    },
    {
      title: 'Implementation Tools & Libraries',
      items: [
        { title: 'OpenAI Function Calling Security Guide', url: 'https://platform.openai.com/docs/guides/function-calling/security' },
        { title: 'LangChain Tools Security Module', url: 'https://python.langchain.com/docs/modules/agents/tools/security' },
        { title: 'AutoGen Tool Execution Safety', url: 'https://microsoft.github.io/autogen/docs/Use-Cases/tool_safety' },
        { title: 'Toolformer Security Considerations', url: 'https://github.com/lucidrains/toolformer-pytorch' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Prevents agents from executing malicious actions through strict tool access control & sandboxing"
        why="Unrestricted tool access enables system compromise; boundaries ensure safe automation"
        keyInsight="Whitelist + validation + sandbox + monitoring = secure tool execution"
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

export default ToolMisusePreventionDetails;