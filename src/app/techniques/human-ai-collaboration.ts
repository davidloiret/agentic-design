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
  // {
  //   id: 'escalation-procedures',
  //   name: 'Escalation Procedures',
  //   abbr: 'EP',
  //   icon: '🚨',
  //   color: 'from-orange-500 to-red-600',
  //   category: 'human-ai-collaboration',
  //   description: 'Systematic protocols for escalating AI decisions to appropriate human experts when confidence is low or stakes are high',
  //   features: [
  //     'Confidence-based escalation triggers',
  //     'Role-based expert routing',
  //     'Priority level assignment',
  //     'Escalation path optimization',
  //     'Response time guarantees',
  //     'Fallback mechanisms'
  //   ],
  //   useCases: ['customer-support', 'medical-triage', 'fraud-detection', 'content-moderation', 'crisis-management'],
  //   complexity: 'medium',
  //   example: 'Customer Support Escalation:\n\nCustomer Query: "My payment was charged twice and I need a refund immediately for rent money"\n\nEscalation Analysis:\n• Query complexity: High (financial dispute)\n• Emotional urgency: High (rent payment)\n• AI confidence: Low (65% - ambiguous transaction details)\n• Customer tier: Premium (5+ year customer)\n\nEscalation Decision Tree:\n\n1. Trigger Assessment:\n   • Low AI confidence (< 70%): ✓ Escalate\n   • High emotional distress: ✓ Escalate\n   • Financial impact > $200: ✓ Escalate\n   • Premium customer: ✓ Priority escalation\n\n2. Expert Routing:\n   • Issue type: Financial dispute → Billing specialist\n   • Customer tier: Premium → Senior agent\n   • Urgency: High → Within 15 minutes\n   • Complexity: High → Team lead backup\n\n3. Escalation Execution:\n   • Route to: Sarah (Senior Billing Specialist)\n   • Priority: High (15-minute SLA)\n   • Context package: Customer history, transaction logs, AI analysis\n   • Backup: Team Lead Mike (if Sarah unavailable)\n\n4. Resolution:\n   • Human expert resolves in 12 minutes\n   • Duplicate charge confirmed and refunded\n   • Customer satisfaction: 9/10\n   • AI learns from expert\'s decision process\n\nEscalation Metrics:\n• 94% on-time expert engagement\n• 87% first-contact resolution after escalation\n• 4.2/5 average customer satisfaction\n• AI confidence improves by learning from escalations\n\nBenefits:\n• Ensures complex issues get expert attention\n• Maintains high customer satisfaction\n• Protects company from high-risk decisions\n• Continuously improves AI through expert feedback'
  // },
]; 