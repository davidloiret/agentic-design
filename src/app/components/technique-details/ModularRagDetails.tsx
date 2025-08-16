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

interface ModularRagDetailsProps {
  selectedTechnique: any;
}

export const ModularRagDetails: React.FC<ModularRagDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Module Design', detail: 'Create independent retrieval, generation, and augmentation modules' },
      { num: '2', action: 'Interface Definition', detail: 'Define standardized APIs between modules' },
      { num: '3', action: 'Pipeline Assembly', detail: 'Compose modules into flexible processing pipelines' },
      { num: '4', action: 'Dynamic Routing', detail: 'Route queries to appropriate module combinations' },
      { num: '5', action: 'Module Orchestration', detail: 'Coordinate execution and data flow between modules' }
    ],
    example: 'query → module_router → [retrieval_module, rerank_module, fusion_module] → generation_module → response'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Design modules with clear input/output interfaces and standardized APIs', icon: '✅' },
    { type: 'do', text: 'Implement hot-swappable modules for A/B testing and gradual rollouts', icon: '✅' },
    { type: 'do', text: 'Use dependency injection for flexible module composition', icon: '✅' },
    { type: 'do', text: 'Cache module outputs at appropriate granularity levels', icon: '✅' },
    { type: 'do', text: 'Implement module health checks and fallback mechanisms', icon: '✅' },
    { type: 'dont', text: 'Create tight coupling between modules or shared mutable state', icon: '❌' },
    { type: 'dont', text: 'Skip module versioning and backward compatibility considerations', icon: '❌' },
    { type: 'dont', text: 'Ignore module-level monitoring and observability', icon: '❌' },
    { type: 'dont', text: 'Over-engineer module boundaries for simple use cases', icon: '❌' },
    { type: 'dont', text: 'Neglect module performance isolation and resource limits', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Large-scale RAG systems requiring flexibility and maintainability',
      'Multi-team development with different domain expertise',
      'Need for rapid experimentation with different approaches',
      'Systems requiring different behavior for different query types',
      'Production environments needing gradual rollouts and A/B testing'
    ],
    avoidWhen: [
      'Simple single-purpose RAG applications',
      'Resource-constrained environments with tight latency budgets',
      'Small teams without modular architecture experience',
      'Prototypes and proof-of-concept implementations',
      'Systems with stable, unchanging requirements'
    ]
  };

  const keyMetrics = [
    { metric: 'Module Isolation', measure: 'Independence and replaceability of individual modules' },
    { metric: 'Pipeline Flexibility', measure: 'Number of supported module combinations and configurations' },
    { metric: 'Development Velocity', measure: 'Time to implement new modules or modify existing ones' },
    { metric: 'System Reliability', measure: 'Fault isolation and graceful degradation capabilities' },
    { metric: 'Performance Scalability', measure: 'Independent scaling of bottleneck modules' },
    { metric: 'Configuration Complexity', measure: 'Ease of pipeline composition and module orchestration' }
  ];

  const topUseCases = [
    'Enterprise RAG Platforms: Modular architecture supporting multiple business units with different requirements',
    'Research Infrastructure: Academic platforms allowing researchers to experiment with different RAG components',
    'Multi-Domain Systems: E-commerce platforms with specialized modules for products, reviews, and support content',
    'SaaS RAG Services: Cloud platforms offering configurable RAG pipelines to customers',
    'Hybrid AI Systems: Complex architectures combining RAG with other AI capabilities like code generation and analysis'
  ];

  const references = [
    {
      title: 'Modular RAG Frameworks & Architecture',
      items: [
        { title: 'Modular RAG: Transforming RAG Systems into LEGO-like Reconfigurable Frameworks (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2407.21059' },
        { title: 'RAG and RAU: A Survey on Retrieval-Augmented Language Model in Natural Language Processing (Zhao et al., 2024)', url: 'https://arxiv.org/abs/2404.19543' },
        { title: 'Comprehensive Survey of RAG: Evolution, Current Landscape and Future Directions (Chen et al., 2024)', url: 'https://arxiv.org/abs/2401.05856' },
        { title: 'Retrieval-Augmented Generation for Large Language Models: A Survey (Gao et al., 2023)', url: 'https://arxiv.org/abs/2312.10997' }
      ]
    },
    {
      title: 'Module Design Patterns & APIs',
      items: [
        { title: 'LlamaIndex Modular Architecture: Building Blocks and Interfaces', url: 'https://docs.llamaindex.ai/en/stable/module_guides/' },
        { title: 'LangChain Modular Components: Retrievers, Chains, and Tools', url: 'https://python.langchain.com/docs/modules/' },
        { title: 'Haystack Pipeline Architecture: Modular NLP Framework', url: 'https://docs.haystack.deepset.ai/docs/pipelines' },
        { title: 'DSPy: Programming Foundation Models with Composable Modules', url: 'https://github.com/stanfordnlp/dspy' }
      ]
    },
    {
      title: 'Microservices & Distributed Architecture',
      items: [
        { title: 'Building Microservices: Designing Fine-Grained Systems (Newman, 2021)', url: 'https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/' },
        { title: 'Microservices Patterns: With Examples in Java (Richardson, 2018)', url: 'https://www.manning.com/books/microservices-patterns' },
        { title: 'The Twelve-Factor App: Methodology for Building SaaS Applications', url: 'https://12factor.net/' },
        { title: 'Domain-Driven Design: Tackling Complexity in Software (Evans, 2003)', url: 'https://www.domainlanguage.com/ddd/' }
      ]
    },
    {
      title: 'Pipeline Orchestration & Workflow Management',
      items: [
        { title: 'Apache Airflow: Platform for Workflow Management and Scheduling', url: 'https://airflow.apache.org/docs/' },
        { title: 'Kubeflow Pipelines: Machine Learning Workflows on Kubernetes', url: 'https://www.kubeflow.org/docs/components/pipelines/' },
        { title: 'Prefect: Modern Workflow Orchestration Framework', url: 'https://docs.prefect.io/' },
        { title: 'LangGraph: Graph-Based Multi-Actor Applications with LangChain', url: 'https://langchain-ai.github.io/langgraph/' }
      ]
    },
    {
      title: 'Implementation Frameworks & Tools',
      items: [
        { title: 'Ray Serve: Scalable Model Serving with Python', url: 'https://docs.ray.io/en/latest/serve/index.html' },
        { title: 'FastAPI: Modern Web Framework for Building APIs', url: 'https://fastapi.tiangolo.com/' },
        { title: 'Pydantic: Data Validation Using Python Type Hints', url: 'https://docs.pydantic.dev/' },
        { title: 'Docker Compose: Multi-Container Application Definition', url: 'https://docs.docker.com/compose/' }
      ]
    },
    {
      title: 'Monitoring & Observability',
      items: [
        { title: 'OpenTelemetry: Observability Framework for Cloud-Native Software', url: 'https://opentelemetry.io/docs/' },
        { title: 'Jaeger: End-to-End Distributed Tracing', url: 'https://www.jaegertracing.io/docs/' },
        { title: 'Prometheus: Monitoring System and Time Series Database', url: 'https://prometheus.io/docs/' },
        { title: 'LangSmith: LLM Application Development Platform', url: 'https://docs.smith.langchain.com/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Decomposed RAG architecture with independent, interchangeable modules connected through standardized interfaces"
        why="Enables flexibility, maintainability, and team scalability by separating concerns into distinct, testable components"
        keyInsight="Module boundaries defined by function (retrieval, ranking, fusion, generation) with standardized APIs enabling hot-swapping"
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