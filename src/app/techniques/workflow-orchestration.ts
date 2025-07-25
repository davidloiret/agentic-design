import { Technique } from './types';

export const workflowOrchestrationTechniques: Technique[] = [
  {
    id: 'enterprise-orchestration',
    name: 'Enterprise Orchestration',
    abbr: '',
    icon: '🏢',
    color: 'from-blue-600 to-purple-600',
    category: 'workflow-orchestration',
    description: 'Enterprise-grade coordination with governance, compliance, and audit capabilities',
    features: [
      'Governance frameworks',
      'Compliance monitoring',
      'Audit trail management',
      'Enterprise security integration',
      'SLA management',
      'Business process integration'
    ],
    useCases: ['enterprise-ai', 'regulated-industries', 'compliance-automation', 'business-processes'],
    complexity: 'high',
    example: 'Enterprise Document Processing:\n\nGovernance Layer:\n• Role-based access control\n• Document classification policies\n• Data retention requirements\n• Privacy compliance (GDPR, CCPA)\n• Regulatory approval workflows\n\nOrchestration Flow:\n1. Document Ingestion\n   • Security scanning\n   • Classification validation\n   • Compliance checks\n   • Audit logging\n\n2. Processing Pipeline\n   • Agent assignments based on clearance\n   • Multi-stage approvals for sensitive data\n   • Quality gates at each stage\n   • Performance SLA monitoring\n\n3. Output Management\n   • Format compliance validation\n   • Digital signatures\n   • Distribution controls\n   • Retention policy application\n\nEnterprise Features:\n• Integration with IAM systems\n• Compliance dashboard and reporting\n• Business process management\n• Exception escalation procedures\n• Performance analytics and optimization'
  },
  {
    id: 'stateful-graph-workflows',
    name: 'Stateful Graph Workflows',
    abbr: '',
    icon: '🗂️',
    color: 'from-blue-500 to-purple-500',
    category: 'workflow-orchestration',
    description: 'Graph-based workflow management with persistent state across nodes',
    features: [
      'Node-based workflow design',
      'Persistent state management',
      'Conditional flow control',
      'Parallel execution paths',
      'State checkpointing',
      'Dynamic graph modification'
    ],
    useCases: ['complex-workflows', 'multi-step-processes', 'conditional-logic', 'state-dependent-tasks'],
    complexity: 'high',
    example: 'Document Processing Workflow:\n\nNodes:\n├─ Extract: PDF → Text\n├─ Analyze: Text → Entities\n├─ Classify: Entities → Categories\n└─ Route: Categories → Specialists\n\nState Management:\n• Document metadata persisted\n• Progress tracking at each node\n• Conditional routing based on classification\n• Parallel processing for multiple documents\n\nState Transitions:\nExtract(success) → Analyze\nAnalyze(confidence>0.8) → Classify\nAnalyze(confidence<0.8) → Human Review\nClassify(type=legal) → Legal Specialist\nClassify(type=technical) → Tech Specialist'
  },
  {
    id: 'conversational-orchestration',
    name: 'Conversational Orchestration',
    abbr: '',
    icon: '💬',
    color: 'from-purple-500 to-pink-500',
    category: 'workflow-orchestration',
    description: 'Multi-agent coordination through structured conversation patterns',
    features: [
      'Flexible conversation flows',
      'Dynamic agent participation',
      'Context-aware messaging',
      'Asynchronous communication',
      'Conversation memory management',
      'Multi-turn coordination'
    ],
    useCases: ['collaborative-problem-solving', 'peer-review-processes', 'dynamic-teams', 'consensus-building'],
    complexity: 'high',
    example: 'Research Paper Review Process:\n\nConversation Flow:\n1. Editor Agent: "Review this paper on AI safety"\n2. Method Expert: "The methodology is sound, but..."\n3. Stats Expert: "The statistical analysis needs..."\n4. Domain Expert: "The related work section..."\n5. Editor Agent: "Based on feedback, recommend revisions"\n\nOrchestration Features:\n• Any agent can initiate discussion\n• Context preserved across turns\n• Parallel expert consultations\n• Dynamic conversation routing\n• Consensus detection algorithms\n• Automatic summary generation'
  },
  {
    id: 'role-based-teamwork',
    name: 'Role-Based Teamwork',
    abbr: '',
    icon: '👥',
    color: 'from-pink-500 to-red-500',
    category: 'workflow-orchestration',
    description: 'Structured agent teams with defined roles and responsibilities',
    features: [
      'Clear role definitions',
      'Hierarchical team structures',
      'Task delegation patterns',
      'Role-specific capabilities',
      'Team coordination protocols',
      'Performance accountability'
    ],
    useCases: ['project-management', 'software-development', 'content-creation', 'business-processes'],
    complexity: 'medium',
    example: 'Software Development Team:\n\nRoles & Responsibilities:\n• Product Manager: Define requirements, prioritize features\n• Architect: Design system structure, technical decisions\n• Developer: Implement features, write code\n• QA Engineer: Test functionality, find bugs\n• DevOps: Deploy and monitor systems\n\nTeam Workflow:\n1. PM creates user stories\n2. Architect designs technical approach\n3. Developer implements features\n4. QA tests and validates\n5. DevOps deploys to production\n\nCoordination:\n• Clear handoff points between roles\n• Role-specific communication channels\n• Shared project dashboard\n• Automated progress tracking'
  },
  {
    id: 'graph-state-machines',
    name: 'Graph State Machines',
    abbr: '',
    icon: '🔄',
    color: 'from-red-500 to-orange-500',
    category: 'workflow-orchestration',
    description: 'Finite state machines implemented as graphs for workflow control',
    features: [
      'State transition management',
      'Event-driven execution',
      'Deterministic flow control',
      'State validation and guards',
      'Rollback capabilities',
      'Visual workflow representation'
    ],
    useCases: ['process-automation', 'approval-workflows', 'order-processing', 'compliance-flows'],
    complexity: 'medium',
    example: 'Order Processing State Machine:\n\nStates:\n• Pending → (validate) → Validated\n• Validated → (process_payment) → Paid\n• Paid → (fulfill) → Shipped\n• Any → (cancel) → Cancelled\n\nTransitions:\nvalidate(success) → Validated\nvalidate(failure) → Rejected\nprocess_payment(success) → Paid\nprocess_payment(failure) → Payment Failed\nfulfill(success) → Shipped\nfulfill(inventory_empty) → Backordered\n\nGuards:\n• validate: Check inventory and customer data\n• process_payment: Verify payment method\n• fulfill: Confirm warehouse availability\n\nError Handling:\n• Invalid transitions are blocked\n• Failed states trigger retry logic\n• Rollback to previous stable state'
  },
  {
    id: 'actor-model-coordination',
    name: 'Actor Model Coordination',
    abbr: '',
    icon: '🎭',
    color: 'from-orange-500 to-yellow-500',
    category: 'workflow-orchestration',
    description: 'Asynchronous message-passing coordination between independent actors',
    features: [
      'Asynchronous message passing',
      'Actor lifecycle management',
      'Fault isolation and recovery',
      'Location transparency',
      'Dynamic actor creation',
      'Supervision hierarchies'
    ],
    useCases: ['distributed-systems', 'real-time-processing', 'fault-tolerant-systems', 'scalable-architectures'],
    complexity: 'high',
    example: 'Distributed Content Processing:\n\nActor Hierarchy:\n• Supervisor Actor\n  ├─ Content Ingestion Actor\n  ├─ Processing Coordinator\n  │  ├─ Text Processor Actor (3 instances)\n  │  ├─ Image Processor Actor (2 instances)\n  │  └─ Video Processor Actor (1 instance)\n  └─ Output Manager Actor\n\nMessage Flow:\n1. Ingestion → Coordinator: "New content batch"\n2. Coordinator → Processors: "Process item X"\n3. Processors → Coordinator: "Processing complete"\n4. Coordinator → Output Manager: "Batch ready"\n\nFault Tolerance:\n• Actor crashes are isolated\n• Supervisor restarts failed actors\n• Messages are persisted for replay\n• Load balancing across processor instances'
  }
];