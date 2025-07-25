import { Technique } from './types';

export const workflowOrchestrationTechniques: Technique[] = [
  {
    id: 'event-driven-orchestrator-worker',
    name: 'Event-Driven Orchestrator-Worker',
    abbr: 'EDOW',
    icon: '📋',
    color: 'from-cyan-500 to-blue-600',
    category: 'workflow-orchestration',
    description: 'Central orchestrator assigns tasks to worker agents through event streaming',
    features: [
      'Asynchronous task distribution via events',
      'Consumer group-based load balancing',
      'Automatic worker scaling and rebalancing',
      'Fault tolerance through event replay',
      'Stateless worker agents',
      'Decoupled orchestration architecture'
    ],
    useCases: ['distributed-processing', 'microservices-orchestration', 'batch-processing', 'real-time-workflows'],
    complexity: 'medium',
    example: 'Document Processing Pipeline:\n\nEvent Flow:\n1. Orchestrator publishes tasks to "work-queue" topic\n2. Worker agents form consumer group\n3. Each worker processes assigned partition\n4. Results published to "results" topic\n5. Orchestrator aggregates final output\n\nKey Benefits:\n• Workers auto-rebalance on failure/scale\n• Event replay enables recovery\n• No direct orchestrator-worker connections\n• Horizontal scaling without coordination\n\nImplementation:\n- Orchestrator: Keyed task distribution\n- Workers: Consumer group members\n- Topics: work-queue, results, errors\n- Rebalancing: Automatic via Kafka protocol'
  },
  {
    id: 'event-driven-hierarchical',
    name: 'Event-Driven Hierarchical Agents',
    abbr: 'EDHA',
    icon: '🏗️',
    color: 'from-blue-600 to-purple-600',
    category: 'workflow-orchestration',
    description: 'Multi-level agent hierarchy with event-based coordination',
    features: [
      'Recursive orchestrator-worker patterns',
      'Hierarchical event topic structure',
      'Cascading task decomposition',
      'Level-specific consumer groups',
      'Fault isolation by hierarchy level',
      'Dynamic hierarchy reconfiguration'
    ],
    useCases: ['enterprise-workflows', 'multi-level-planning', 'organizational-structures', 'complex-orchestration'],
    complexity: 'high',
    example: 'Enterprise Project Management:\n\nHierarchy Levels:\n• Executive Level: Strategic planning\n• Manager Level: Resource allocation\n• Team Level: Task execution\n\nEvent Topics:\n- executive-directives\n- manager-assignments\n- team-tasks\n- status-reports\n\nFlow Example:\n1. Executive publishes to executive-directives\n2. Managers consume and decompose to manager-assignments\n3. Team leads consume and create team-tasks\n4. Teams execute and publish status-reports\n5. Reports bubble up through hierarchy\n\nBenefits:\n• Clear separation of concerns\n• Scalable to large organizations\n• Fault isolation at each level\n• Flexible hierarchy restructuring'
  },
  {
    id: 'event-driven-blackboard',
    name: 'Event-Driven Blackboard',
    abbr: 'EDB',
    icon: '📝',
    color: 'from-purple-600 to-pink-600',
    category: 'workflow-orchestration',
    description: 'Shared knowledge base through event streaming for asynchronous collaboration',
    features: [
      'Event-sourced shared knowledge',
      'Asynchronous agent collaboration',
      'Knowledge evolution tracking',
      'Multi-agent contributions',
      'Event-based triggers and reactions',
      'Persistent collaboration history'
    ],
    useCases: ['collaborative-problem-solving', 'knowledge-building', 'research-coordination', 'consensus-formation'],
    complexity: 'medium',
    example: 'Scientific Research Collaboration:\n\nBlackboard Events:\n• hypothesis-posted\n• evidence-added\n• analysis-completed\n• peer-review-submitted\n• consensus-reached\n\nAgent Interactions:\n1. Research Agent posts hypothesis\n2. Data Agent adds supporting evidence\n3. Analysis Agent computes statistics\n4. Review Agent validates methodology\n5. Synthesis Agent builds consensus\n\nEvent-Driven Benefits:\n• Agents work independently\n• Knowledge builds incrementally\n• Full audit trail maintained\n• Asynchronous collaboration\n• No central coordination needed\n\nTopic Structure:\n- research-hypotheses\n- experimental-data\n- analysis-results\n- peer-reviews\n- final-conclusions'
  },
  {
    id: 'event-driven-market-based',
    name: 'Event-Driven Market-Based',
    abbr: 'EDMB',
    icon: '💱',
    color: 'from-pink-600 to-red-600',
    category: 'workflow-orchestration',
    description: 'Decentralized task allocation through bid/ask event marketplace',
    features: [
      'Auction-based task allocation',
      'Bid/ask event streams',
      'Market maker coordination',
      'Dynamic pricing mechanisms',
      'Reputation-based selection',
      'Decentralized negotiation'
    ],
    useCases: ['resource-allocation', 'dynamic-pricing', 'competitive-bidding', 'load-balancing'],
    complexity: 'high',
    example: 'AI Service Marketplace:\n\nMarket Events:\n• task-posted (with requirements)\n• bid-submitted (agent capabilities + price)\n• ask-matched (market maker decision)\n• service-delivered (completion proof)\n• payment-processed (reputation update)\n\nMarket Flow:\n1. Client posts task to task-marketplace topic\n2. Agent publish bids to bid-stream topic\n3. Market maker matches optimal bid/ask\n4. Winner executes and publishes results\n5. Payment and reputation updates\n\nAdvantages:\n• Self-organizing resource allocation\n• Market-driven pricing\n• No central planning needed\n• Scalable to many participants\n• Built-in quality incentives\n\nTopics:\n- task-requests\n- agent-bids\n- market-matches\n- service-delivery\n- reputation-updates'
  },
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
  },
  {
    id: 'edge-ai-optimization',
    name: 'Edge AI Optimization',
    abbr: 'EAO',
    icon: '📱',
    color: 'from-green-500 to-emerald-600',
    category: 'workflow-orchestration',
    description: 'Optimizes AI workflows for resource-constrained edge devices and mobile environments',
    features: [
      'Model compression and quantization',
      'Inference batching optimization',
      'Memory-efficient processing',
      'Power consumption management',
      'Network-aware computation',
      'Adaptive quality degradation'
    ],
    useCases: ['mobile-ai', 'iot-devices', 'autonomous-vehicles', 'smart-cameras', 'wearable-tech'],
    complexity: 'high',
    example: 'Smart Camera Security System:\n\nOptimization Strategy:\n1. Model Compression:\n   • Original model: 50MB, 95% accuracy\n   • Quantized model: 12MB, 93% accuracy\n   • Pruned model: 8MB, 91% accuracy\n   • Final edge model: 8MB with 91% accuracy\n\n2. Adaptive Processing:\n   • High motion: Full resolution analysis\n   • Normal activity: 50% resolution analysis\n   • No motion: Keyframe analysis only\n   • Battery < 20%: Essential detection only\n\n3. Intelligent Batching:\n   • Group similar frames for batch processing\n   • Process 4 frames simultaneously for 3x speedup\n   • Skip redundant analysis for static scenes\n\n4. Network Optimization:\n   • WiFi available: Upload all detections\n   • Cellular only: Upload high-confidence events\n   • Offline mode: Store critical events locally\n\nResults:\n• 80% reduction in processing time\n• 60% reduction in power consumption\n• 90% maintenance of detection accuracy\n• Real-time performance on mobile hardware'
  },
  {
    id: 'federated-orchestration',
    name: 'Federated Orchestration',
    abbr: 'FO',
    icon: '🌐',
    color: 'from-emerald-500 to-teal-600',
    category: 'workflow-orchestration',
    description: 'Coordinates AI processing across distributed edge devices while preserving data privacy',
    features: [
      'Decentralized model training',
      'Privacy-preserving aggregation',
      'Heterogeneous device coordination',
      'Bandwidth-efficient communication',
      'Differential privacy integration',
      'Fault-tolerant federation'
    ],
    useCases: ['healthcare-networks', 'financial-institutions', 'smart-cities', 'autonomous-fleets', 'industrial-iot'],
    complexity: 'high',
    example: 'Healthcare Network AI:\n\nScenario: 10 hospitals collaboratively train diagnostic AI while keeping patient data private\n\nFederated Process:\n1. Local Training:\n   • Each hospital trains on local patient data\n   • Model updates computed locally\n   • Raw data never leaves hospital premises\n   • Training time: 2 hours per hospital\n\n2. Secure Aggregation:\n   • Hospitals share only model weight updates\n   • Differential privacy applied to prevent data leakage\n   • Central coordinator aggregates updates\n   • Privacy budget: ε = 1.0 (strong privacy)\n\n3. Global Model Distribution:\n   • Improved model distributed to all hospitals\n   • Performance gains from collaborative learning\n   • Personalization for local patient populations\n\n4. Continuous Improvement:\n   • Monthly federated training cycles\n   • New hospitals can join network seamlessly\n   • Model performance monitored across network\n\nBenefits:\n• 40% improvement in diagnostic accuracy\n• Full patient privacy preservation\n• Reduced training time vs central approach\n• Scalable to hundreds of institutions\n• Regulatory compliance maintained'
  },
  {
    id: 'resource-aware-scheduling',
    name: 'Resource-Aware Scheduling',
    abbr: 'RAS',
    icon: '⚡',
    color: 'from-teal-500 to-cyan-600',
    category: 'workflow-orchestration',
    description: 'Dynamically schedules AI tasks based on available computational resources and constraints',
    features: [
      'Real-time resource monitoring',
      'Dynamic priority adjustment',
      'Multi-resource optimization',
      'Deadline-aware scheduling',
      'Energy consumption balancing',
      'Thermal management integration'
    ],
    useCases: ['cloud-computing', 'mobile-devices', 'iot-networks', 'datacenter-optimization', 'autonomous-systems'],
    complexity: 'high',
    example: 'Autonomous Vehicle Processing:\n\nReal-time Resource Management:\n\n1. Resource Monitoring:\n   • CPU usage: 75% (4 cores)\n   • GPU usage: 60% (dedicated AI chip)\n   • Memory: 6.2GB / 8GB available\n   • Temperature: 68°C (threshold: 85°C)\n   • Battery: 45% remaining\n\n2. Task Prioritization:\n   • Critical (Real-time):\n     - Obstacle detection: 16ms deadline\n     - Lane tracking: 33ms deadline\n     - Emergency braking: 8ms deadline\n   \n   • Important (Near real-time):\n     - Traffic sign recognition: 100ms deadline\n     - Route optimization: 500ms deadline\n   \n   • Optional (Background):\n     - Map updates: 30s deadline\n     - Passenger entertainment: No deadline\n\n3. Dynamic Scheduling:\n   • High CPU load detected → Defer map updates\n   • Emergency braking triggered → Preempt all non-critical tasks\n   • Temperature rising → Reduce inference frequency by 20%\n   • Low battery → Switch to power-saving AI models\n\n4. Adaptive Quality:\n   • Normal conditions: Full resolution, high accuracy\n   • Resource constraints: Reduced resolution, maintained safety\n   • Emergency mode: Safety-critical processing only\n\nResult: 99.9% safety deadline compliance with optimal resource utilization'
  },
  {
    id: 'progressive-enhancement',
    name: 'Progressive Enhancement',
    abbr: 'PE',
    icon: '📈',
    color: 'from-cyan-500 to-blue-600',
    category: 'workflow-orchestration',
    description: 'Incrementally improves AI output quality based on available resources and time',
    features: [
      'Layered quality improvement',
      'Anytime algorithm implementation',
      'Resource-based enhancement',
      'Graceful degradation support',
      'Quality-time trade-offs',
      'User preference adaptation'
    ],
    useCases: ['interactive-systems', 'real-time-applications', 'variable-latency-environments', 'user-experience-optimization'],
    complexity: 'medium',
    example: 'Image Enhancement Application:\n\nProgressive Processing Pipeline:\n\n1. Baseline Quality (50ms):\n   • Basic noise reduction\n   • Simple contrast adjustment\n   • Quality score: 6/10\n   • Acceptable for preview\n\n2. Standard Quality (200ms):\n   • + Advanced denoising\n   • + Color correction\n   • + Sharpness enhancement\n   • Quality score: 7.5/10\n   • Good for social media\n\n3. High Quality (800ms):\n   • + AI upscaling\n   • + Detail reconstruction\n   • + Professional color grading\n   • Quality score: 9/10\n   • Print-ready quality\n\n4. Premium Quality (3000ms):\n   • + Deep learning enhancement\n   • + Artifact removal\n   • + Perfect edge reconstruction\n   • Quality score: 9.5/10\n   • Professional photography\n\nAdaptive Behavior:\n• Mobile device + low battery → Stop at Standard Quality\n• Desktop + high priority → Continue to Premium Quality\n• User impatient (cancels) → Return current best quality\n• Network slow → Process locally at available quality level\n\nUser Experience:\n• Immediate preview (50ms)\n• Continuous quality improvements\n• User can stop at any satisfactory level\n• No "all or nothing" waiting periods'
  }
];