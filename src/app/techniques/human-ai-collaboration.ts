import { Technique } from './types';

export const humanAiCollaborationTechniques: Technique[] = [
  {
    id: 'human-in-the-loop',
    name: 'Human-in-the-Loop',
    abbr: 'HITL',
    icon: '👤',
    color: 'from-blue-500 to-indigo-600',
    category: 'human-ai-collaboration',
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
    category: 'human-ai-collaboration',
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
  {
    id: 'collaborative-learning',
    name: 'Collaborative Learning',
    abbr: 'CL',
    icon: '📚',
    color: 'from-pink-500 to-red-600',
    category: 'human-ai-collaboration',
    description: 'Continuous mutual learning between humans and AI systems to improve performance over time',
    features: [
      'Bidirectional knowledge transfer',
      'Incremental skill development',
      'Feedback-driven improvement',
      'Adaptive learning rates',
      'Knowledge gap identification',
      'Performance co-evolution'
    ],
    useCases: ['personalized-education', 'skill-development', 'research-collaboration', 'creative-projects', 'professional-training'],
    complexity: 'high',
    example: 'Legal Research Collaboration:\n\nWeek 1 - Initial State:\n• AI: Strong at case law search, weak at legal strategy\n• Lawyer: Expert in strategy, slower at document review\n\nCollaborative Learning Process:\n\n1. AI Learning from Human:\n   • Lawyer explains why certain precedents are more relevant\n   • AI learns strategic thinking patterns: "Constitutional cases trump statutory when fundamental rights involved"\n   • Updates weighting algorithms based on lawyer feedback\n\n2. Human Learning from AI:\n   • AI identifies overlooked case: "Smith v. Jones (2019) - similar fact pattern"\n   • Lawyer discovers new legal research strategies\n   • Adopts AI\'s systematic approach to citation analysis\n\n3. Mutual Improvement:\n   • AI develops better legal reasoning (strategy accuracy: 65% → 78%)\n   • Lawyer increases research efficiency (time per case: 4h → 2.5h)\n   • Together they discover novel legal arguments\n\nWeek 12 Results:\n• Case success rate improved 23%\n• Research time reduced 40%\n• Both human and AI capabilities enhanced\n• New hybrid legal strategies developed\n\nKey Success Factors:\n• Regular feedback exchange\n• Shared performance metrics\n• Complementary strength recognition\n• Trust building over time'
  },
  {
    id: 'escalation-procedures',
    name: 'Escalation Procedures',
    abbr: 'EP',
    icon: '🚨',
    color: 'from-orange-500 to-red-600',
    category: 'human-ai-collaboration',
    description: 'Systematic protocols for escalating AI decisions to appropriate human experts when confidence is low or stakes are high',
    features: [
      'Confidence-based escalation triggers',
      'Role-based expert routing',
      'Priority level assignment',
      'Escalation path optimization',
      'Response time guarantees',
      'Fallback mechanisms'
    ],
    useCases: ['customer-support', 'medical-triage', 'fraud-detection', 'content-moderation', 'crisis-management'],
    complexity: 'medium',
    example: 'Customer Support Escalation:\n\nCustomer Query: "My payment was charged twice and I need a refund immediately for rent money"\n\nEscalation Analysis:\n• Query complexity: High (financial dispute)\n• Emotional urgency: High (rent payment)\n• AI confidence: Low (65% - ambiguous transaction details)\n• Customer tier: Premium (5+ year customer)\n\nEscalation Decision Tree:\n\n1. Trigger Assessment:\n   • Low AI confidence (< 70%): ✓ Escalate\n   • High emotional distress: ✓ Escalate\n   • Financial impact > $200: ✓ Escalate\n   • Premium customer: ✓ Priority escalation\n\n2. Expert Routing:\n   • Issue type: Financial dispute → Billing specialist\n   • Customer tier: Premium → Senior agent\n   • Urgency: High → Within 15 minutes\n   • Complexity: High → Team lead backup\n\n3. Escalation Execution:\n   • Route to: Sarah (Senior Billing Specialist)\n   • Priority: High (15-minute SLA)\n   • Context package: Customer history, transaction logs, AI analysis\n   • Backup: Team Lead Mike (if Sarah unavailable)\n\n4. Resolution:\n   • Human expert resolves in 12 minutes\n   • Duplicate charge confirmed and refunded\n   • Customer satisfaction: 9/10\n   • AI learns from expert\'s decision process\n\nEscalation Metrics:\n• 94% on-time expert engagement\n• 87% first-contact resolution after escalation\n• 4.2/5 average customer satisfaction\n• AI confidence improves by learning from escalations\n\nBenefits:\n• Ensures complex issues get expert attention\n• Maintains high customer satisfaction\n• Protects company from high-risk decisions\n• Continuously improves AI through expert feedback'
  },
  {
    id: 'feedback-loops',
    name: 'Feedback Loops',
    abbr: 'FL',
    icon: '🔄',
    color: 'from-purple-500 to-indigo-600',
    category: 'human-ai-collaboration',
    description: 'Systematic mechanisms for collecting, processing, and incorporating human feedback to continuously improve AI performance',
    features: [
      'Multi-channel feedback collection',
      'Real-time learning integration',
      'Feedback quality assessment',
      'Automated model updates',
      'Performance impact tracking',
      'Bias detection through feedback'
    ],
    useCases: ['personalization-systems', 'content-recommendation', 'search-optimization', 'predictive-models', 'user-interfaces'],
    complexity: 'high',
    example: 'E-commerce Recommendation System:\n\nContinuous Improvement Through Human Feedback:\n\n1. Feedback Collection:\n   • Explicit feedback: Star ratings, thumbs up/down\n   • Implicit feedback: Click-through rates, purchase behavior\n   • Contextual feedback: "Not interested in this category"\n   • Temporal feedback: Seasonal preference changes\n\n2. Feedback Processing:\n   • Week 1: 10,000 user interactions collected\n   • Positive signals: 6,200 (62%)\n   • Negative signals: 2,300 (23%)\n   • Neutral/ignored: 1,500 (15%)\n   • Quality score: High (low spam/fake feedback)\n\n3. Learning Integration:\n   • Real-time updates: Immediate personalization adjustments\n   • Batch learning: Weekly model retraining\n   • A/B testing: 10% traffic for new model validation\n   • Bias monitoring: Demographic fairness checks\n\n4. Performance Impact:\n   • Baseline metrics (Month 1):\n     - Click-through rate: 3.2%\n     - Conversion rate: 1.8%\n     - User satisfaction: 6.7/10\n   \n   • After feedback integration (Month 3):\n     - Click-through rate: 4.1% (+28%)\n     - Conversion rate: 2.4% (+33%)\n     - User satisfaction: 7.9/10 (+18%)\n\n5. Continuous Monitoring:\n   • Daily feedback volume tracking\n   • Weekly performance metric reviews\n   • Monthly bias and fairness audits\n   • Quarterly user satisfaction surveys\n\nFeedback Loop Features:\n• Multi-granular: Product, category, and system-level feedback\n• Adaptive: Learning rates adjust based on feedback confidence\n• Transparent: Users see how their feedback improves recommendations\n• Ethical: Privacy-preserving feedback processing\n\nResult: Self-improving recommendation system that gets better with use, achieving 33% higher conversion rates through systematic human-AI collaboration'
  }
]; 