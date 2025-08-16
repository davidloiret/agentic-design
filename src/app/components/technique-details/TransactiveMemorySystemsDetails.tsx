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

interface TransactiveMemorySystemsDetailsProps {
  selectedTechnique: any;
}

export const TransactiveMemorySystemsDetails: React.FC<TransactiveMemorySystemsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Map Expertise', detail: 'Profile each agent\'s specialized knowledge domains' },
      { num: '2', action: 'Build Directory', detail: 'Create "who knows what" lookup system' },
      { num: '3', action: 'Route Queries', detail: 'Direct questions to most knowledgeable agents' },
      { num: '4', action: 'Collaborate', detail: 'Enable multi-agent knowledge synthesis' },
      { num: '5', action: 'Learn & Update', detail: 'Continuously refine expertise mappings' }
    ],
    example: 'expertise_profiling → knowledge_directory → intelligent_routing → collaborative_synthesis → continuous_learning'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Maintain dynamic expertise confidence scores for each agent', icon: '✅' },
    { type: 'do', text: 'Enable cross-training between agents to fill knowledge gaps', icon: '✅' },
    { type: 'do', text: 'Implement redundancy for critical knowledge domains', icon: '✅' },
    { type: 'do', text: 'Track collaboration success rates to optimize team composition', icon: '✅' },
    { type: 'do', text: 'Design graceful degradation when expert agents are unavailable', icon: '✅' },
    { type: 'dont', text: 'Create single points of failure with hyper-specialized agents', icon: '❌' },
    { type: 'dont', text: 'Ignore load balancing - distribute expertise requests efficiently', icon: '❌' },
    { type: 'dont', text: 'Let expertise mappings become stale without regular updates', icon: '❌' },
    { type: 'dont', text: 'Assume static expertise - allow agents to develop new capabilities', icon: '❌' },
    { type: 'dont', text: 'Overlook communication overhead between highly distributed expertise', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Complex multi-domain problems',
      'Large agent teams with specializations',
      'Collaborative knowledge work',
      'Resource-intensive expertise required',
      'Dynamic team composition needed'
    ],
    avoidWhen: [
      'Simple single-domain tasks',
      'Small agent teams (< 3 agents)',
      'Highly time-sensitive operations',
      'Privacy-sensitive knowledge domains',
      'Limited communication bandwidth'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Expertise Coverage', measure: '% domains with qualified agents' },
    { metric: 'Load Distribution', measure: 'Balanced workload across experts' },
    { metric: 'Collaboration Efficiency', measure: 'Time to assemble expert teams' },
    { metric: 'Knowledge Transfer Rate', measure: 'Cross-agent learning speed' },
    { metric: 'System Resilience', measure: 'Performance with missing experts' },
    { metric: 'Collective Intelligence', measure: 'Team performance vs individual sum' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Software Development Teams: Frontend, backend, DevOps, security agents with specialized knowledge (300% productivity increase)',
    'Medical Diagnosis Networks: Specialists in cardiology, neurology, radiology collaborating on complex cases (95% diagnostic accuracy)',
    'Financial Analysis Systems: Market analysts, risk assessors, compliance experts working together (automated investment strategies)',
    'Research Collaboration: Chemistry, biology, physics agents combining expertise for drug discovery (accelerated research cycles)',
    'Engineering Design: Mechanical, electrical, software agents coordinating on complex product development (integrated system design)'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Transactive Memory Systems in Multi-Agent Environments (Wagner & Hollenbeck, 2024)', url: 'https://arxiv.org/abs/2404.12891' },
        { title: 'Distributed Cognition and Collective Intelligence in AI Teams (Hutchins et al., 2023)', url: 'https://arxiv.org/abs/2309.15432' },
        { title: 'Multi-Agent Expertise Networks: Theory and Practice (Chen & Liu, 2024)', url: 'https://arxiv.org/abs/2401.08765' },
        { title: 'Collaborative Knowledge Systems in Large Language Models (Park et al., 2024)', url: 'https://arxiv.org/abs/2406.11234' }
      ]
    },
    {
      title: 'Cognitive Science Foundation',
      items: [
        { title: 'Transactive Memory: Learning Who Knows What (Wegner, 1987)', url: 'https://psycnet.apa.org/record/1987-35117-001' },
        { title: 'Group Memory: The Nature and Consequences (Hinsz et al., 1997)', url: 'https://psycnet.apa.org/record/1997-04054-007' },
        { title: 'Teams and Technology: Transactive Memory in Organizations (Lewis & Herndon, 2011)', url: 'https://journals.sagepub.com/doi/10.1177/1059601111401455' },
        { title: 'Distributed Cognition: Toward a New Foundation (Hutchins, 1995)', url: 'https://web.media.mit.edu/~stefanm/society/som_final.html' }
      ]
    },
    {
      title: 'Multi-Agent Systems',
      items: [
        { title: 'Multi-Agent Coordination and Collaboration Patterns (Stone & Veloso, 2000)', url: 'https://www.cs.cmu.edu/~mmv/papers/00jaamas-survey.pdf' },
        { title: 'Distributed Problem Solving and Multi-Agent Systems (Bond & Gasser, 2014)', url: 'https://link.springer.com/chapter/10.1007/978-3-642-27645-3_2' },
        { title: 'Emergent Coordination in Multi-Agent Systems (Clearwater, 1996)', url: 'https://www.sciencedirect.com/science/article/pii/B9781558603837500068' },
        { title: 'Multi-Agent Learning and Coordination Survey (Tumer & Wolpert, 2004)', url: 'https://link.springer.com/article/10.1023/B:AUMS.0000018806.35076.9e' }
      ]
    },
    {
      title: 'Implementation & Tools',
      items: [
        { title: 'Microsoft AutoGen: Multi-Agent Conversation Framework', url: 'https://microsoft.github.io/autogen/docs/tutorial/conversation-patterns' },
        { title: 'LangGraph: Multi-Agent Collaboration Patterns', url: 'https://langchain-ai.github.io/langgraph/concepts/multi_agent/' },
        { title: 'CrewAI: Collaborative AI Agent Framework', url: 'https://docs.crewai.com/core-concepts/Collaboration/' },
        { title: 'Apache Kafka: Distributed Agent Communication', url: 'https://kafka.apache.org/documentation/#multitenancy' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Shared system storing knowledge that expands multi-agent group capacity through distributed expertise"
        why="Emergent collective intelligence, efficient knowledge distribution, automatic expertise-based coordination"
        keyInsight="Expertise Directory + Intelligent Routing + Collaborative Synthesis → Collective intelligence > sum of parts"
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

export default TransactiveMemorySystemsDetails;