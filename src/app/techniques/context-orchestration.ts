import { Technique } from './types';

export const contextOrchestrationTechniques: Technique[] = [
  {
    id: 'multi-source-context-fusion',
    name: 'Multi-Source Context Fusion',
    abbr: 'MSCF',
    icon: '🔀',
    color: 'from-purple-500 to-pink-600',
    category: 'context-orchestration',
    description: 'Intelligently combines contextual information from multiple sources with quality weighting and conflict resolution',
    features: [
      'Source priority weighting',
      'Conflict resolution algorithms',
      'Quality assessment metrics',
      'Temporal context handling',
      'Cross-source validation',
      'Unified context representation'
    ],
    useCases: ['enterprise-integration', 'multi-agent-systems', 'data-federation', 'knowledge-synthesis'],
    complexity: 'high',
    example: 'Enterprise Customer Context Fusion:\n\nMultiple Data Sources:\n• CRM System: Customer profile, purchase history\n• Support System: Ticket history, satisfaction scores\n• Web Analytics: Browsing behavior, preferences\n• Social Media: Sentiment, engagement\n• Email Platform: Communication history\n\nFusion Process:\n\n1. Source Quality Assessment:\n   • CRM: High reliability (95%), Real-time\n   • Support: Medium reliability (85%), Updated daily\n   • Analytics: High volume (90%), 1-hour delay\n   • Social: Variable reliability (60%), Real-time\n   • Email: High accuracy (92%), Real-time\n\n2. Context Weighting:\n   • Recency: More recent data weighted higher\n   • Reliability: Source credibility scores\n   • Relevance: Task-specific importance\n   • Completeness: Coverage of required attributes\n\n3. Conflict Resolution:\n   • Contact info differs between CRM and Support\n   • Resolution rule: Use most recently updated\n   • Cross-validate with email communication\n   • Flag inconsistencies for review\n\n4. Unified Customer Context:\n   • Demographics: Age 34, Location NYC\n   • Engagement: High-value customer, active\n   • Preferences: Mobile-first, technical content\n   • Current state: Considering upgrade\n   • Sentiment: Positive but price-sensitive\n\nResult: 360° customer view with 94% accuracy, enabling personalized interactions across all touchpoints.'
  },
  {
    id: 'context-routing',
    name: 'Intelligent Context Routing',
    abbr: 'ICR',
    icon: '🎯',
    color: 'from-pink-500 to-red-600',
    category: 'context-orchestration',
    description: 'Dynamic routing of contextual information to the most appropriate processing components based on capability matching',
    features: [
      'Capability-based routing',
      'Load balancing',
      'Context decomposition',
      'Priority handling',
      'Fallback mechanisms',
      'Performance optimization'
    ],
    useCases: ['distributed-ai', 'microservices', 'specialist-agents', 'resource-optimization'],
    complexity: 'medium',
    example: 'Multi-Modal Content Analysis Router:\n\nIncoming Context:\n• Mixed content: Text + Images + Video\n• Priority: High (customer complaint)\n• Language: Spanish\n• Domain: Technical support\n• Deadline: 2 hours\n\nAvailable Processing Agents:\n• Text Specialist: Spanish native, tech expertise\n• Image Analyzer: Computer vision, OCR capable\n• Video Processor: Audio transcription, visual analysis\n• Sentiment Analyzer: Multi-language support\n• Technical Support: Domain expert, English only\n\nRouting Decisions:\n\n1. Context Decomposition:\n   • Text content → Text Specialist (Spanish native)\n   • Images → Image Analyzer\n   • Video → Video Processor\n   • Overall sentiment → Sentiment Analyzer\n   • Technical resolution → Technical Support\n\n2. Dependency Management:\n   • Video must be processed before sentiment analysis\n   • All content analyzed before technical routing\n   • Translation needed for technical support\n\n3. Load Balancing:\n   • Image Analyzer: Currently 80% capacity\n   • Route to secondary image processor\n   • Queue position: Priority lane (high urgency)\n\n4. Quality Assurance:\n   • Cross-validate Spanish sentiment analysis\n   • Technical accuracy review required\n   • Customer satisfaction prediction\n\nRouting Result:\n• Processing time reduced by 60%\n• Specialist utilization optimized\n• Quality maintained at 96% accuracy\n• Customer response within deadline'
  },
  {
    id: 'adaptive-context-sizing',
    name: 'Adaptive Context Sizing',
    abbr: 'ACS',
    icon: '📏',
    color: 'from-red-500 to-orange-600',
    category: 'context-orchestration',
    description: 'Dynamically adjusts context window size and content selection based on task requirements and resource constraints',
    features: [
      'Dynamic window sizing',
      'Relevance-based selection',
      'Compression algorithms',
      'Resource-aware scaling',
      'Quality preservation',
      'Performance monitoring'
    ],
    useCases: ['token-optimization', 'performance-tuning', 'cost-management', 'mobile-deployment'],
    complexity: 'medium',
    example: 'Adaptive Document Q&A System:\n\nScenario: Legal document analysis with varying complexity\n\nContext Requirements Analysis:\n• Simple question: "What is the contract date?"\n  - Required context: 200 tokens\n  - Processing time: 50ms\n  - Cost: $0.001\n\n• Complex question: "Analyze all liability clauses and their implications"\n  - Required context: 8000 tokens\n  - Processing time: 2000ms\n  - Cost: $0.04\n\nAdaptive Sizing Process:\n\n1. Question Complexity Assessment:\n   • Keywords: "analyze", "all", "implications"\n   • Complexity score: 8.5/10\n   • Estimated context need: High\n\n2. Resource Constraint Check:\n   • Available tokens: 12000\n   • Time budget: 3000ms\n   • Cost budget: $0.05\n   • Status: Within limits\n\n3. Context Selection Strategy:\n   • Primary: All liability-related sections (4000 tokens)\n   • Secondary: Related definitions (2000 tokens)\n   • Supporting: Cross-references (1500 tokens)\n   • Total: 7500 tokens (94% of budget)\n\n4. Quality Optimization:\n   • Compress repetitive legal language\n   • Preserve key legal terminology\n   • Maintain sentence boundaries\n   • Result: 6800 tokens, 98% information retention\n\n5. Performance Monitoring:\n   • Response quality: 96% (meets threshold)\n   • Processing time: 1800ms (under budget)\n   • Cost: $0.034 (within budget)\n   • User satisfaction: 9.2/10\n\nAdaptive Benefits:\n• 45% reduction in token usage\n• 30% faster processing\n• Maintained high accuracy\n• Optimal resource utilization'
  }
];