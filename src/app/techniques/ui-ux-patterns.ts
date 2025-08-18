import { Technique } from './types';

export const uiUxPatterns: Technique[] = [
  // === Human-AI Collaboration Patterns ===
  {
    id: 'human-in-the-loop',
    name: 'Human-in-the-Loop',
    abbr: 'HITL',
    icon: '👤',
    color: 'from-blue-500 to-indigo-600',
    category: 'ui-ux-patterns',
    description: 'Strategic integration of human judgment at critical decision points in AI workflows',
    features: [
      'Strategic human intervention points',
      'Confidence-based escalation',
      'Human expertise integration',
      'Quality assurance checkpoints',
      'Feedback loop optimization',
      'Domain expert validation'
    ],
    useCases: ['medical-diagnosis', 'legal-analysis', 'financial-decisions', 'content-moderation', 'safety-critical-systems'],
    complexity: 'medium',
    example: 'Medical Imaging Analysis:\n\n1. AI Analysis:\n   • Scans chest X-ray\n   • Detects potential abnormality (78% confidence)\n   • Flags for human review (threshold: 80%)\n\n2. Human Intervention:\n   • Radiologist reviews flagged case\n   • Confirms suspicious mass in upper left lobe\n   • Adds contextual notes: "Consider CT follow-up"\n\n3. Collaborative Decision:\n   • AI + Human consensus: "Abnormal finding requiring further investigation"\n   • Confidence increased to 95%\n   • Automatic scheduling of follow-up CT\n\nBenefits:\n• AI handles routine cases (85% of volume)\n• Human expertise for complex/uncertain cases\n• Continuous learning from human feedback\n• Maintains final human accountability'
  },
  {
    id: 'human-on-the-loop',
    name: 'Human On the Loop',
    abbr: 'HOTL',
    icon: '👁️',
    color: 'from-cyan-500 to-blue-600',
    category: 'ui-ux-patterns',
    description: 'Human supervisory oversight of autonomous AI systems with ability to monitor, intervene, or take control when necessary',
    features: [
      'Continuous monitoring and observation',
      'Exception-based intervention',
      'Override and takeover capabilities',
      'Performance monitoring dashboards',
      'Automated alert systems',
      'Supervisory control interfaces'
    ],
    useCases: ['autonomous-vehicles', 'trading-systems', 'manufacturing-automation', 'air-traffic-control', 'process-monitoring'],
    complexity: 'high',
    example: 'Autonomous Trading System:\n\nNormal Operation (Human On the Loop):\n\n1. AI Trading Activity:\n   • Executes 1,200 trades per hour automatically\n   • Follows programmed strategies and risk parameters\n   • Maintains portfolio within defined risk limits\n   • Performance: +2.3% daily return\n\n2. Human Monitoring:\n   • Trader monitors via real-time dashboard\n   • Watches key metrics: P&L, volume, risk exposure\n   • Reviews automated alerts and warnings\n   • No intervention needed - system operating normally\n\n3. Exception Scenario:\n   • Market volatility spikes unexpectedly\n   • AI system detects unusual market conditions\n   • Automated alert: "High volatility detected - review recommended"\n   • Risk exposure approaching upper limit\n\n4. Human Intervention:\n   • Trader reviews situation in 30 seconds\n   • Decides market conditions are too volatile\n   • Takes manual control: "Override - reduce position size by 50%"\n   • AI continues with new human-set parameters\n\n5. Return to Autonomy:\n   • Market conditions stabilize after 2 hours\n   • Trader approves return to full autonomous operation\n   • AI resumes normal trading with lessons learned\n\nMonitoring Features:\n• Real-time performance dashboard\n• Configurable alert thresholds\n• One-click intervention capabilities\n• Audit trail of all human interventions\n• Automated reporting and analysis\n\nBenefits:\n• Enables high-speed autonomous operation\n• Human expertise available when needed\n• Reduces human workload (95% autonomous time)\n• Maintains ultimate human control and accountability\n• Allows humans to focus on strategic decisions'
  },

  // === UI/UX Interface Patterns ===
  // Foundational Human-Agent Interaction Patterns (8 techniques)
  {
    id: 'progressive-disclosure-patterns',
    name: 'Progressive Disclosure UI Patterns',
    abbr: 'PDP',
    icon: '📋',
    color: 'from-slate-500 to-gray-600',
    category: 'ui-ux-patterns',
    description: 'Interface patterns for gradually revealing agent capabilities, reasoning, and complex information to prevent cognitive overload',
    features: [
      'Expandable reasoning trees with step-by-step disclosure',
      'Collapsible explanation panels with detail levels',
      'Staged capability introduction during onboarding',
      'Context-sensitive information revelation'
    ],
    useCases: ['complex-reasoning', 'user-education', 'capability-introduction', 'cognitive-load-management'],
    complexity: 'high',
    example: 'Agent Reasoning Progressive Disclosure:\n\n1. Expandable Decision Trees:\n   • Initial summary with key decision factors\n   • Click-to-expand reasoning branches\n   • Progressive detail levels (summary → detailed → technical)\n   • Visual hierarchy with indentation and icons\n\n2. Collapsible Panels:\n   • "Show reasoning" toggle for explanations\n   • Accordion-style information sections\n   • Nested disclosure for complex processes\n   • Breadcrumb navigation for deep dives\n\n3. Staged Capability Introduction:\n   • Basic features first, advanced later\n   • Contextual feature discovery prompts\n   • Just-in-time capability reveals\n   • User-paced exploration controls\n\nResult: 67% reduction in cognitive overload, 45% better comprehension'
  },
  {
    id: 'confidence-visualization-patterns',
    name: 'Confidence Visualization UI Patterns',
    abbr: 'CVP',
    icon: '📊',
    color: 'from-amber-500 to-orange-600',
    category: 'ui-ux-patterns',
    description: 'Visual interface elements for displaying AI confidence levels, uncertainty, and prediction reliability in user-friendly formats',
    features: [
      'Confidence meters with color-coded reliability indicators',
      'Uncertainty ranges and probabilistic displays',
      'N-best classification with alternative suggestions',
      'Visual risk assessment and reliability scores'
    ],
    useCases: ['decision-support', 'risk-assessment', 'prediction-reliability', 'uncertainty-communication'],
    complexity: 'high',
    example: 'AI Confidence Display System:\n\n1. Visual Confidence Indicators:\n   • Progress bars: 0-100% confidence with color coding\n   • Gauge charts: speedometer-style confidence meters\n   • Star ratings: simplified 1-5 reliability scales\n   • Badge system: "High/Medium/Low Confidence" labels\n\n2. Uncertainty Communication:\n   • Range displays: "75-85% likely" with error bars\n   • Probability distributions: bell curves for outcomes\n   • Multiple scenarios: "Most likely" vs "Alternative" options\n   • Risk indicators: warning icons for low confidence\n\n3. Contextual Implementation:\n   • Inline confidence for individual recommendations\n   • Modal overlays for detailed uncertainty analysis\n   • Tooltip explanations for confidence factors\n   • Dashboard summaries for overall system reliability\n\nTrust Calibration: 82% improvement in appropriate reliance on AI'
  },
  {
    id: 'mixed-initiative-interface-patterns',
    name: 'Mixed-Initiative Interface Patterns',
    abbr: 'MIP',
    icon: '🔄',
    color: 'from-emerald-500 to-teal-600',
    category: 'ui-ux-patterns',
    description: 'UI patterns for seamless control switching between human and AI agents, enabling collaborative initiative-taking',
    features: [
      'Control handoff buttons with clear state indicators',
      'Initiative indicators showing who is currently leading',
      'Seamless transition interfaces for control switching',
      'Collaborative suggestion and override mechanisms'
    ],
    useCases: ['collaborative-work', 'human-ai-partnership', 'control-sharing', 'initiative-management'],
    complexity: 'high',
    example: 'Human-AI Initiative Management:\n\n1. Control State Indicators:\n   • "Human Leading" vs "AI Leading" status badges\n   • Color-coded borders around active control areas\n   • Initiative history timeline showing handoffs\n   • Clear ownership indicators for current actions\n\n2. Handoff Mechanisms:\n   • "Take Control" button for human override\n   • "Let AI Handle" delegation options\n   • Temporary control with automatic return timers\n   • Collaborative mode with shared initiative\n\n3. Transition UX:\n   • Smooth animations for control transfers\n   • Context preservation during handoffs\n   • Confirmation dialogs for critical transitions\n   • Undo/redo for initiative decisions\n\nCollaboration Efficiency: 73% faster task completion in mixed-initiative mode'
  },
  {
    id: 'agent-status-activity-patterns',
    name: 'Agent Status & Activity UI Patterns',
    abbr: 'ASP',
    icon: '⚡',
    color: 'from-violet-500 to-purple-600',
    category: 'ui-ux-patterns',
    description: 'Interface elements showing real-time agent activities, thinking states, and operational status for user awareness',
    features: [
      'Real-time activity indicators and progress visualizations',
      'Thinking state animations and processing displays',
      'Agent status badges with operational health metrics',
      'Background task indicators and queue management'
    ],
    useCases: ['status-awareness', 'activity-monitoring', 'progress-tracking', 'system-transparency'],
    complexity: 'medium',
    example: 'Agent Activity Visualization:\n\n1. Thinking State Indicators:\n   • Animated dots for "agent is thinking"\n   • Pulsing icons during processing states\n   • Progress spinners with time estimates\n   • Typing indicators adapted for AI responses\n\n2. Activity Status Display:\n   • "Analyzing document..." with progress percentage\n   • "Searching databases..." with source indicators\n   • "Generating response..." with completion estimates\n   • "Waiting for user input..." idle state clarity\n\n3. Background Process Management:\n   • Minimized activity panels for ongoing tasks\n   • Queue indicators showing pending operations\n   • Priority badges for urgent vs routine tasks\n   • Completion notifications with summary results\n\nUser Awareness: 91% improvement in understanding agent operations'
  },
  {
    id: 'conversational-interface-patterns',
    name: 'Conversational Interface Patterns',
    abbr: 'CIP',
    icon: '💬',
    color: 'from-blue-500 to-indigo-600',
    category: 'ui-ux-patterns',
    description: 'Advanced conversational UI/UX patterns that move beyond traditional chatbots to agent-driven, multimodal experiences',
    features: [
      'Agent-driven proactive interactions beyond reactive chat',
      'Multimodal conversation integration (voice, text, visual)',
      'Context-aware communication modality selection',
      'Natural conversation flow with seamless interruptions'
    ],
    useCases: ['intelligent-assistants', 'customer-service-agents', 'educational-tutors', 'collaborative-ai'],
    complexity: 'high',
    example: 'Advanced Agent Conversation Design:\n\n1. Agent-Driven Interaction:\n   • Proactive need anticipation based on context\n   • Dynamic response adaptation to user situation\n   • Real-time data integration for relevance\n   • Initiative-taking for helpful actions\n\n2. Multimodal Integration:\n   • Automatic modality selection (text/voice/visual)\n   • Seamless transitions between communication modes\n   • Context-appropriate interaction patterns\n   • Natural conversation flow preservation\n\n3. UX Implementation:\n   • Progressive disclosure for complex information\n   • Visual indicators for agent reasoning process\n   • User control over conversation style and depth\n\nResult: 300% improvement in user satisfaction vs traditional chatbots'
  },
  {
    id: 'agent-collaboration-ux',
    name: 'Agent Collaboration UX',
    abbr: 'ACX',
    icon: '🤝',
    color: 'from-indigo-500 to-purple-600',
    category: 'ui-ux-patterns',
    description: 'User experience patterns for multi-agent coordination, handoffs, and collaborative workflows with transparent orchestration',
    features: [
      'Seamless agent handoff interfaces with context preservation',
      'Multi-agent coordination dashboards and status visualization',
      'Specialization indicators showing agent expertise areas',
      'Collaborative workflow progress tracking and transparency'
    ],
    useCases: ['enterprise-automation', 'complex-problem-solving', 'multi-step-workflows', 'specialized-teams'],
    complexity: 'high',
    example: 'Enterprise Multi-Agent Collaboration UX:\n\n1. Agent Handoff Design:\n   • Visual handoff indicators with smooth transitions\n   • Context summary generation for continuity\n   • User consent options for agent changes\n   • Reason communication for handoff decisions\n\n2. Coordination Dashboard:\n   • Real-time agent status visualization\n   • Task distribution and progress tracking\n   • Specialization badges and capability indicators\n   • Network graph of inter-agent communication\n\n3. User Control:\n   • Intervention points for human oversight\n   • Agent preference settings and customization\n   • Quality feedback mechanisms for improvements\n\nResult: 60% QA time savings, weeks-to-days project timelines'
  },
  {
    id: 'trust-transparency-patterns',
    name: 'Trust and Transparency Patterns',
    abbr: 'TTP',
    icon: '🔍',
    color: 'from-purple-500 to-pink-600',
    category: 'ui-ux-patterns',
    description: 'Design patterns for building user trust through explainable AI interfaces, decision transparency, and source attribution',
    features: [
      'Explainable AI interfaces with progressive disclosure',
      'Decision visualization and reasoning transparency',
      'Source attribution and citation systems',
      'Confidence indicators and uncertainty communication'
    ],
    useCases: ['high-stakes-decisions', 'enterprise-ai', 'regulated-industries', 'professional-tools'],
    complexity: 'high',
    example: 'Salesforce AI Trust Framework Implementation:\n\n1. Mindful Friction:\n   • Intentional pauses for high-stakes decisions\n   • Confirmation dialogs with clear consequences\n   • User control over automation levels\n\n2. Transparency Indicators:\n   • Einstein "sparkles" icon for AI-generated content\n   • Clear input data and algorithm disclosure\n   • Expandable explanation panels on demand\n   • Three-level interpretability (how, why, trust)\n\n3. Source Attribution:\n   • Clear citation systems with clickable sources\n   • Information provenance tracking\n   • Confidence metrics with uncertainty ranges\n   • Bias detection alerts and safeguards\n\nTrust Score: 95% user confidence in AI recommendations'
  },
  {
    id: 'adaptive-interface-patterns',
    name: 'Adaptive Interface Patterns',
    abbr: 'AIP',
    icon: '🎯',
    color: 'from-pink-500 to-red-600',
    category: 'ui-ux-patterns',
    description: 'Dynamic UI/UX adaptation and creation patterns that personalize agent interfaces based on user context, behavior, and preferences',
    features: [
      'Real-time interface adaptation based on user context',
      'Personalization engines with behavioral learning',
      'Context-aware UI element adjustment and customization',
      'Adaptive communication style and interaction patterns'
    ],
    useCases: ['personal-assistants', 'adaptive-learning', 'accessibility', 'user-personalization'],
    complexity: 'high',
    example: 'SELF-RAG Adaptive Interface System:\n\n1. Adaptation Engine:\n   • Context state vector generation from user behavior\n   • Real-time analysis of interaction patterns\n   • Preference learning from implicit feedback\n\n2. Interface Generator:\n   • Dynamic layout adjustments for optimal usability\n   • Content presentation style adaptation\n   • Communication tone and complexity adjustment\n   • Modality selection based on context\n\n3. User Control:\n   • Adaptation preference settings and transparency\n   • Override options for automatic adjustments\n   • Privacy controls for behavioral data collection\n\nAdaptation Accuracy: 87% correct interface adjustments'
  },

  // Real-Time Control and Monitoring Patterns (4 techniques)
  {
    id: 'context-window-management-patterns',
    name: 'Context Window Management UI',
    abbr: 'CWM',
    icon: '🪟',
    color: 'from-rose-500 to-pink-600',
    category: 'ui-ux-patterns',
    description: 'Visual patterns for managing LLM context limits, token usage, and context window optimization in agent interfaces',
    features: [
      'Context usage meters with visual token consumption tracking',
      'Priority indicators for context retention decisions',
      'Context compression controls with user preferences',
      'Memory summarization interfaces and context pruning'
    ],
    useCases: ['llm-optimization', 'token-management', 'context-efficiency', 'memory-management'],
    complexity: 'medium',
    example: 'LLM Context Window Management:\n\n1. Context Usage Visualization:\n   • Progress bar showing token usage (7,500/8,000 tokens)\n   • Color coding: green → yellow → red as limit approaches\n   • Real-time updates as conversation progresses\n   • Estimated remaining conversation turns\n\n2. Context Priority Controls:\n   • "Pin important messages" for context retention\n   • Automatic summarization of older conversations\n   • Manual context pruning with user selection\n   • Smart compression with key information preservation\n\n3. Memory Management Interface:\n   • Collapsible conversation history sections\n   • Summary previews of compressed content\n   • "Restore full context" options for detailed recall\n   • Context overlap indicators for continuity\n\nEfficiency: 65% better context utilization, 40% longer conversations'
  },
  {
    id: 'monitoring-control-patterns',
    name: 'Monitoring and Control Patterns',
    abbr: 'MCP',
    icon: '🎛️',
    color: 'from-red-500 to-orange-600',
    category: 'ui-ux-patterns',
    description: 'Mission-control style interfaces for real-time agent oversight, intervention capabilities, and system monitoring',
    features: [
      'Real-time agent status monitoring with exception handling',
      'Mission-control dashboards for complex agent networks',
      'Intervention mechanisms with start/stop/pause controls',
      'Anomaly detection with proactive alert systems'
    ],
    useCases: ['enterprise-monitoring', 'critical-systems', 'agent-orchestration', 'operational-oversight'],
    complexity: 'high',
    example: 'Enterprise Agent Mission Control:\n\n1. Control Systems:\n   • Start/stop/pause controls for agent workflows\n   • Emergency halt capabilities for all operations\n   • Real-time status visibility across agent network\n   • Cross-platform control consistency\n\n2. Monitoring Dashboard:\n   • Multi-level information hierarchy (summary to detail)\n   • Exception-based alerts for anomalies\n   • Performance metrics and efficiency tracking\n   • Agent coordination visualization\n\n3. Intervention Points:\n   • Clear escalation mechanisms for human involvement\n   • Automated vs manual decision indicators\n   • Quality feedback loops for system improvement\n\nSystem Reliability: 99.8% uptime with proactive monitoring'
  },
  {
    id: 'error-recovery-patterns',
    name: 'Error Handling and Recovery Patterns',
    abbr: 'ERP',
    icon: '🔧',
    color: 'from-orange-500 to-yellow-600',
    category: 'ui-ux-patterns',
    description: 'Comprehensive error communication and recovery interface patterns for graceful failure handling in agent systems',
    features: [
      'Progressive error disclosure with actionable solutions',
      'Multiple error display modalities (inline, modal, banner)',
      'Automated recovery suggestion and implementation',
      'Context preservation during error recovery processes'
    ],
    useCases: ['production-systems', 'user-support', 'error-prevention', 'system-resilience'],
    complexity: 'medium',
    example: 'Agent Error Handling Framework:\n\n1. Three-Element Error Communication:\n   • Problem statement: Clear description of what happened\n   • Cause explanation: Understanding of why error occurred\n   • Solution suggestion: Actionable steps for resolution\n\n2. Display Method Selection:\n   • Inline validation for real-time input errors\n   • Tooltips for minor issues with contextual help\n   • Modals for critical or irreversible errors\n   • Banners for persistent important communications\n\n3. Recovery Systems:\n   • Automatic context restoration capabilities\n   • Progressive disclosure of technical details\n   • User-friendly language avoiding jargon\n   • Accessibility compliance with visual indicators\n\nRecovery Success: 95% automatic error resolution'
  },
  {
    id: 'onboarding-education-patterns',
    name: 'Onboarding and Education Patterns',
    abbr: 'OEP',
    icon: '🎓',
    color: 'from-yellow-500 to-green-600',
    category: 'ui-ux-patterns',
    description: 'User education and onboarding patterns for introducing agent capabilities, building appropriate mental models, and fostering trust',
    features: [
      'Progressive disclosure of agent capabilities and limitations',
      'Interactive tutorials for agent interaction patterns',
      'Mental model building through clear capability communication',
      'Trust building through transparency and expectation setting'
    ],
    useCases: ['user-education', 'agent-introduction', 'capability-demonstration', 'trust-building'],
    complexity: 'medium',
    example: 'AI-Powered Agent Onboarding:\n\n1. Progressive Disclosure:\n   • Information chunking in manageable steps\n   • Guided progression through agent features\n   • Contextual assistance based on user progress\n   • Cognitive overload prevention strategies\n\n2. Capability Education:\n   • Clear communication of agent abilities and limits\n   • Example scenarios and practical demonstrations\n   • Interaction pattern education and best practices\n   • Feedback mechanism training for improvement\n\n3. Trust Building:\n   • Transparency about agent decision-making processes\n   • Control demonstration and override capabilities\n   • Safety mechanism explanation and reassurance\n   • Honest limitation communication to prevent disappointment\n\nOnboarding Impact: 50% retention increase, 77% three-day return rate'
  },

  // Security and Privacy UX Patterns (2 techniques)
  {
    id: 'privacy-security-ux',
    name: 'Privacy and Security UX',
    abbr: 'PSX',
    icon: '🔒',
    color: 'from-green-500 to-teal-600',
    category: 'ui-ux-patterns',
    description: 'Privacy-first design patterns for agent systems with transparent data handling, granular controls, and user empowerment',
    features: [
      'Granular privacy controls with clear data usage explanation',
      'Transparent data collection practices and user rights',
      'Security UX toolkit with usability and protection balance',
      'GDPR/CCPA compliance patterns with user-friendly interfaces'
    ],
    useCases: ['enterprise-compliance', 'personal-data-protection', 'regulated-industries', 'user-empowerment'],
    complexity: 'high',
    example: 'Microsoft Security UX Framework:\n\n1. Privacy Experience (PX) Framework:\n   • User-first design with control priority\n   • Granular data type selection and purpose permissions\n   • Easy data access, correction, and deletion rights\n   • Plain language communication avoiding jargon\n\n2. Security Toolkit Components:\n   • Usability: familiar language and intuitive interfaces\n   • Security: cyber threat protection with risk communication\n   • Accessibility: inclusive design for security features\n   • Privacy: simple settings with immediate effect\n\n3. Agent-Specific Patterns:\n   • HTTPS encryption with strict access controls\n   • Essential data collection only policies\n   • User control over conversation history\n   • Compliance automation with audit trails\n\nCompliance Score: 100% GDPR/CCPA adherence'
  },
  {
    id: 'accessibility-agent-design',
    name: 'Accessibility in Agent Design',
    abbr: 'AAD',
    icon: '♿',
    color: 'from-teal-500 to-blue-600',
    category: 'ui-ux-patterns',
    description: 'Universal design patterns for accessible agent interfaces supporting diverse abilities and assistive technologies',
    features: [
      'Universal agent interface design for diverse abilities',
      'Assistive technology integration and optimization',
      'Multiple communication modalities for accessibility',
      'Cognitive accessibility with simplified interaction patterns'
    ],
    useCases: ['inclusive-design', 'assistive-technology', 'universal-access', 'cognitive-support'],
    complexity: 'high',
    example: 'AI-Mediated Accessibility Framework:\n\n1. Dynamic Accommodation:\n   • Real-time adjustment to user needs and preferences\n   • Content transformation to user-specific formats\n   • AI-powered accessibility enablement layer\n   • Personalized adaptation through assistant assistance\n\n2. Communication Accessibility:\n   • Multiple modalities: text, voice, and visual options\n   • Speed control for agent response adjustment\n   • Complexity adjustment with simplified language\n   • Predictable behavior patterns for cognitive support\n\n3. Technical Implementation:\n   • WCAG compliance with proper heading structure\n   • Keyboard interaction management and focus indicators\n   • Screen reader optimization with descriptive labels\n   • Color-independent information design\n\nAccessibility Impact: 350M+ people with improved AI access'
  },

  // Ambient and Contextual Patterns (2 techniques)
  {
    id: 'ambient-agent-patterns',
    name: 'Ambient Agent Patterns',
    abbr: 'AAP',
    icon: '🌊',
    color: 'from-emerald-500 to-cyan-600',
    category: 'ui-ux-patterns',
    description: 'Always-present, contextually-aware agent interfaces that operate seamlessly in the background while remaining accessible when needed',
    features: [
      'Contextual awareness with environmental and user state sensing',
      'Proactive assistance without intrusive interruptions',
      'Seamless background operation with selective foreground presence',
      'Anticipatory actions based on learned patterns and preferences'
    ],
    useCases: ['smart-environments', 'personal-assistants', 'iot-integration', 'continuous-monitoring'],
    complexity: 'high',
    example: 'Smart Environment Ambient Agent System:\n\n1. Environmental Integration:\n   • IoT sensor data fusion for context awareness\n   • Automatic lighting, temperature, and security adjustments\n   • Occupancy detection with privacy-preserving inference\n   • Energy optimization through behavioral pattern learning\n\n2. Proactive Assistance Patterns:\n   • Calendar-aware preparation (meeting room setup, document preparation)\n   • Health monitoring with gentle wellness nudges\n   • Security alerts with context-appropriate responses\n   • Predictive maintenance notifications\n\n3. Interaction Design:\n   • Minimal interface footprint with available-when-needed access\n   • Voice activation with natural language understanding\n   • Gesture recognition for hands-free control\n   • Visual ambient displays for status communication\n\nResult: 40% improvement in daily productivity, 60% reduction in manual environment control'
  },
  {
    id: 'chat-interface-patterns',
    name: 'Chat Interface Patterns',
    abbr: 'CIP',
    icon: '💭',
    color: 'from-cyan-500 to-blue-600',
    category: 'ui-ux-patterns',
    description: 'Specialized chat interface patterns optimized for agent interactions, including message threading, context management, and rich content display',
    features: [
      'Threaded conversations with context branching and merging',
      'Rich media integration with documents, images, and interactive elements',
      'Real-time collaboration indicators and typing awareness',
      'Message reactions, annotations, and collaborative editing capabilities'
    ],
    useCases: ['team-collaboration', 'customer-support', 'educational-platforms', 'content-creation'],
    complexity: 'high',
    example: 'Advanced Agent Chat Interface:\n\n1. Message Threading Architecture:\n   • Conversation branching for exploring multiple topics\n   • Context preservation across thread switches\n   • Visual thread indicators and navigation aids\n   • Automatic thread summarization and merging\n\n2. Rich Content Integration:\n   • Document preview and collaborative editing\n   • Code syntax highlighting with execution capabilities\n   • Image analysis and annotation tools\n   • Interactive forms and data collection widgets\n\n3. Collaboration Features:\n   • Real-time presence indicators for human and AI participants\n   • Message reactions and emoji responses\n   • Voice message integration with transcription\n   • Screen sharing and whiteboard collaboration\n\n4. Agent-Specific Enhancements:\n   • Thinking indicators showing agent reasoning process\n   • Source citation with expandable reference details\n   • Confidence metrics and uncertainty communication\n   • Suggested follow-up questions and action items\n\nResult: 85% user satisfaction, 50% faster problem resolution'
  },

  // Cross-Platform and Multimodal Patterns (3 techniques)
  {
    id: 'cross-platform-agent-ux',
    name: 'Cross-Platform Agent UX',
    abbr: 'CPX',
    icon: '📱',
    color: 'from-blue-500 to-cyan-600',
    category: 'ui-ux-patterns',
    description: 'Consistent agent experience patterns across devices and platforms with seamless synchronization and adaptation',
    features: [
      'Unified agent experience across desktop, mobile, and web',
      'Seamless cross-device synchronization and state management',
      'Platform-optimized adaptation while maintaining consistency',
      'Context-aware feature activation based on device capabilities'
    ],
    useCases: ['multi-device-workflows', 'mobile-optimization', 'platform-consistency', 'device-adaptation'],
    complexity: 'high',
    example: 'Cross-Platform Agent Consistency:\n\n1. Consistency Framework:\n   • UI design uniformity: colors, typography, layout\n   • Functional consistency: same capabilities across devices\n   • Interaction standardization: appropriate gestures per platform\n   • Brand coherence: unified expression and voice\n\n2. Multi-Device Integration:\n   • Context switching: seamless movement between devices\n   • Real-time synchronization: instant cross-device updates\n   • State preservation: maintaining progress across platforms\n   • Cross-device notifications: appropriate alert distribution\n\n3. AI-Powered Features:\n   • Real-time personalization: instant preference adaptation\n   • Voice UX sophistication: advanced interaction patterns\n   • Gestural interfaces: natural recognition and response\n   • Micro-interaction enhancement: AI-powered refinements\n\nUser Satisfaction: 89% consistent experience rating'
  },
  {
    id: 'visual-reasoning-patterns',
    name: 'Visual Reasoning Patterns',
    abbr: 'VRP',
    icon: '👁️',
    color: 'from-cyan-500 to-indigo-600',
    category: 'ui-ux-patterns',
    description: 'Visual representation patterns for agent reasoning, decision-making processes, and cognitive transparency',
    features: [
      'Agent reasoning process visualization and decision trees',
      'Step-by-step progress indicators for complex workflows',
      'Confidence metrics and uncertainty visualization',
      'Source highlighting and information provenance display'
    ],
    useCases: ['decision-support', 'transparency', 'education', 'debugging'],
    complexity: 'high',
    example: 'Agent Reasoning Visualization:\n\n1. Decision Transparency Patterns:\n   • Step-by-step progress indicators for workflow clarity\n   • Expandable explanation panels with progressive disclosure\n   • Confidence metrics showing prediction reliability\n   • Source highlighting for key data influences\n\n2. Visual Methods:\n   • Decision tree visualization for reasoning paths\n   • Network graphs for information relationships\n   • Timeline representations for process flows\n   • Heat maps for attention and importance\n\n3. User Interaction:\n   • Drill-down capabilities for detailed explanations\n   • Interactive exploration of reasoning paths\n   • Comparison views for alternative decisions\n   • Export options for documentation and sharing\n\nTrust Building: 78% increase in user confidence with visualizations'
  },
  {
    id: 'multimodal-interaction-patterns',
    name: 'Multimodal Interaction Patterns',
    abbr: 'MMIP',
    icon: '🎤',
    color: 'from-indigo-500 to-purple-600',
    category: 'ui-ux-patterns',
    description: 'Advanced multimodal agent interaction patterns integrating voice, visual, gesture, and text communication seamlessly',
    features: [
      'Context-aware modality selection and automatic switching',
      'Voice-visual-text integration with natural transitions',
      'Gesture recognition and multimodal input processing',
      'Emotional adaptation and real-time user state assessment'
    ],
    useCases: ['natural-interaction', 'hands-free-operation', 'accessibility', 'contextual-adaptation'],
    complexity: 'high',
    example: 'Advanced Multimodal Agent Interface:\n\n1. Adaptive Modality Selection:\n   • Context-aware communication mode selection\n   • Environmental factor consideration (noise, privacy)\n   • User preference learning and adaptation\n   • Seamless transitions between modalities\n\n2. Integration Patterns:\n   • Voice + visual: spoken commands with visual feedback\n   • Gesture + voice: natural hand movement with speech\n   • Text + visual: written input with graphical output\n   • Emotional + adaptive: mood-aware interface adjustment\n\n3. Technical Implementation:\n   • End-to-end multimodal learning with transformers\n   • Real-time context understanding and processing\n   • Conversational prosody beyond text-to-speech\n   • Cross-modal semantic alignment and consistency\n\nUser Experience: 95% natural interaction satisfaction'
  }
];