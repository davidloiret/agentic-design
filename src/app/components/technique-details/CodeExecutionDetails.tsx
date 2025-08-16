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

interface CodeExecutionDetailsProps {
  selectedTechnique: any;
}

export const CodeExecutionDetails: React.FC<CodeExecutionDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Generate Code', detail: 'Create minimal, purpose-built scripts' },
      { num: '2', action: 'Security Scan', detail: 'Static analysis & import validation' },
      { num: '3', action: 'MicroVM Launch', detail: 'Start Firecracker microVM (<125ms)' },
      { num: '4', action: 'Execute', detail: 'Run in isolated kernel with limits' },
      { num: '5', action: 'Process Results', detail: 'Capture outputs & destroy microVM' }
    ],
    example: 'User: "Calculate fibonacci(20)" → Generate Python → Validate imports → Launch Firecracker → Return: 6765'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use Firecracker microVMs for hardware-enforced isolation', icon: '✅' },
    { type: 'do', text: 'Implement VM-level security with dedicated kernels per execution', icon: '✅' },
    { type: 'do', text: 'Leverage KVM hypervisor with <5 MiB memory overhead per microVM', icon: '✅' },
    { type: 'do', text: 'Use jailer process for additional cgroup/namespace isolation', icon: '✅' },
    { type: 'do', text: 'Destroy microVMs after each execution for perfect isolation', icon: '✅' },
    { type: 'do', text: 'Pool warm microVMs for <125ms startup performance', icon: '✅' },
    { type: 'dont', text: 'Rely solely on containers for untrusted code (shared kernel risk)', icon: '❌' },
    { type: 'dont', text: 'Use traditional VMs (minutes startup vs 125ms microVM)', icon: '❌' },
    { type: 'dont', text: 'Skip hardware virtualization for critical security boundaries', icon: '❌' },
    { type: 'dont', text: 'Reuse microVMs across different execution contexts', icon: '❌' },
    { type: 'dont', text: 'Enable unnecessary devices (keep minimal virtio interface)', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Untrusted/AI-generated code requiring maximum security isolation',
      'Multi-tenant environments where kernel-level isolation is critical',
      'Production serverless workloads needing <125ms cold start performance',
      'High-density compute requiring thousands of isolated execution contexts'
    ],
    avoidWhen: [
      'Simple calculations answerable through LLM reasoning alone',
      'Environments where container isolation is sufficient (trusted code)',
      'Resource-constrained edge devices without KVM virtualization support',
      'Legacy applications requiring full hardware emulation or BIOS support'
    ]
  };

  // Key Metrics (from AWS Lambda/Firecracker production data)
  const keyMetrics = [
    { metric: 'MicroVM Startup Time', measure: '<125ms boot to userspace (vs minutes for VMs)' },
    { metric: 'Security Isolation Rate', measure: 'Hardware VM barriers + process isolation (target: 100%)' },
    { metric: 'Resource Density', measure: 'Thousands of microVMs per host with <5 MiB overhead' },
    { metric: 'Performance Overhead', measure: '>95% bare-metal performance in microVM' },
    { metric: 'Creation Rate', measure: 'Up to 150 microVMs/second per host' },
    { metric: 'Memory Elasticity', measure: '2-3 orders magnitude improvement with Faascale' },
    { metric: 'Security Incident Rate', measure: 'VM escapes + kernel compromises (target: 0%)' },
    { metric: 'Cost Efficiency', measure: '35-40% reduction vs traditional VM infrastructure' }
  ];

  // Top Use Cases (AWS Lambda/Firecracker production patterns)
  const topUseCases = [
    'Serverless Functions: AWS Lambda-style execution with Firecracker microVMs',
    'Untrusted Code Execution: AI agent code in isolated kernels (CI/CD, notebooks)',
    'Multi-tenant Platforms: Separate microVMs per customer with hardware isolation',
    'Container Security Upgrade: Replace Docker with microVM for critical workloads',
    'Edge Computing: Lightweight VMs for edge deployment with minimal overhead',
    'Development Environments: Instant dev environments with VM-level isolation',
    'Batch Processing: High-density compute with thousands of microVMs per host',
    'Security Research: Malware analysis in disposable, hardware-isolated environments'
  ];

  const references = [
    {
      title: 'Academic Research & Security',
      items: [
        { title: 'SandboxEval: Comprehensive Test Suite for LLM Assessment Environments', url: 'https://arxiv.org/html/2504.00018' },
        { title: 'Security of AI Agents: System Security Perspective on Vulnerabilities', url: 'https://arxiv.org/abs/2406.08689' },
        { title: 'Vulnerability Handling of AI-Generated Code', url: 'https://arxiv.org/abs/2408.08549' },
        { title: 'Optimizing AI-Assisted Code Generation: Security & Quality', url: 'https://arxiv.org/html/2412.10953v1' }
      ]
    },
    {
      title: 'Industry Benchmarks & Evaluation',
      items: [
        { title: 'SWE-bench: Real-World Software Engineering Benchmark', url: 'https://www.swebench.com/' },
        { title: 'Understanding LLM Code Benchmarks: HumanEval to SWE-bench', url: 'https://www.runloop.ai/blog/understanding-llm-code-benchmarks-from-humaneval-to-swe-bench' },
        { title: 'Google ADK BuiltInCodeExecutor Documentation', url: 'https://google.github.io/adk-docs/tools/built-in-tools/' },
        { title: 'Microsoft Azure OpenAI Code Interpreter Guide', url: 'https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/code-interpreter' }
      ]
    },
    {
      title: 'MicroVM Technologies & Sandboxing',
      items: [
        { title: 'AWS Firecracker - Lightweight Virtualization for Serverless', url: 'https://firecracker-microvm.github.io/' },
        { title: 'Firecracker GitHub Repository & Documentation', url: 'https://github.com/firecracker-microvm/firecracker' },
        { title: 'Kata Containers - Secure Container Runtime with VM Isolation', url: 'https://katacontainers.io/' },
        { title: 'gVisor - User-space Kernel for Container Sandboxing', url: 'https://gvisor.dev/' }
      ]
    },
    {
      title: 'Production MicroVM Implementations',
      items: [
        { title: 'AWS Lambda Firecracker Architecture (Trillions of Executions)', url: 'https://aws.amazon.com/lambda/' },
        { title: 'Northflank - 2M+ MicroVMs Monthly Production Case Study', url: 'https://northflank.com/' },
        { title: 'Microsoft Hyperlight - Ultra-Fast MicroVM Technology', url: 'https://github.com/microsoft/hyperlight' },
        { title: 'Cloud Hypervisor - Next-Gen Virtualization', url: 'https://www.cloudhypervisor.org/' }
      ]
    },
    {
      title: 'Security Research & Guidelines',
      items: [
        { title: 'USENIX NSDI 2020: Firecracker Lightweight Virtualization Paper', url: 'https://www.usenix.org/conference/nsdi20/presentation/agache' },
        { title: 'Springer: Runtime Performance Analysis of MicroVMs', url: 'https://link.springer.com/article/10.1007/s10586-021-03411-8' },
        { title: 'AWS Security: Hardware-enforced Isolation Benefits', url: 'https://aws.amazon.com/security/' },
        { title: 'Linux KVM Security Model & Virtualization Benefits', url: 'https://www.kernel.org/doc/Documentation/virtual/kvm/security.txt' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Execute LLM-generated code safely in isolated microVM environments"
        why="LLMs can generate code for calculations, data analysis, and algorithms but require secure execution due to potential malicious or buggy output"
        keyInsight="Treat LLM code as untrusted - use Firecracker microVMs for hardware isolation with <125ms startup"
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

export default CodeExecutionDetails;