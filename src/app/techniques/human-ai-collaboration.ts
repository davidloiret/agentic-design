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
    id: 'human-ai-team-formation',
    name: 'Human-AI Team Formation',
    abbr: 'HATF',
    icon: '🤝',
    color: 'from-indigo-500 to-purple-600',
    category: 'human-ai-collaboration',
    description: 'Dynamic formation of mixed human-AI teams based on task requirements and expertise',
    features: [
      'Dynamic team composition',
      'Expertise-based matching',
      'Role specialization',
      'Complementary skill pairing',
      'Adaptive team restructuring',
      'Performance-based optimization'
    ],
    useCases: ['research-projects', 'creative-work', 'complex-analysis', 'innovation-labs', 'consulting-teams'],
    complexity: 'high',
    example: 'Market Research Project:\n\nTask: "Analyze emerging trends in sustainable packaging"\n\nTeam Formation Algorithm:\n1. Skill Requirements Analysis:\n   • Data analysis: High\n   • Domain expertise: Medium\n   • Creative synthesis: High\n   • Technical writing: Medium\n\n2. Optimal Team Composition:\n   • AI Agent: Data Mining Specialist\n     - Processes 10K+ industry reports\n     - Identifies statistical patterns\n     - Generates quantitative insights\n   \n   • Human Expert: Sustainability Consultant\n     - 15 years packaging industry experience\n     - Validates AI findings\n     - Provides strategic context\n   \n   • AI Agent: Creative Synthesis AI\n     - Combines insights from multiple sources\n     - Generates innovative concepts\n     - Creates presentation materials\n\n3. Collaboration Workflow:\n   • Phase 1: AI data collection + Human validation\n   • Phase 2: Joint analysis and interpretation\n   • Phase 3: AI synthesis + Human strategic review\n\nResult: 40% faster project completion with higher quality insights'
  },
  {
    id: 'augmented-decision-making',
    name: 'Augmented Decision Making',
    abbr: 'ADM',
    icon: '🎯',
    color: 'from-purple-500 to-pink-600',
    category: 'human-ai-collaboration',
    description: 'AI enhances human decision-making by providing data-driven insights and scenario analysis',
    features: [
      'Real-time insight provision',
      'Scenario simulation',
      'Risk assessment integration',
      'Decision support visualization',
      'Bias detection and mitigation',
      'Outcome prediction modeling'
    ],
    useCases: ['strategic-planning', 'investment-decisions', 'policy-making', 'clinical-decisions', 'business-strategy'],
    complexity: 'high',
    example: 'Investment Portfolio Decision:\n\nHuman Goal: "Rebalance portfolio for 2024 market conditions"\n\nAI Augmentation:\n1. Market Analysis:\n   • Processes 50K+ financial data points\n   • Identifies: Tech sector volatility ↑15%, Energy sector stability ↑8%\n   • Predicts: Interest rate impact on REITs\n\n2. Scenario Modeling:\n   • Scenario A (40% probability): Continued inflation\n     → Recommend: Gold +5%, Tech -10%\n   • Scenario B (35% probability): Economic stability  \n     → Recommend: Maintain current allocation\n   • Scenario C (25% probability): Market correction\n     → Recommend: Cash +15%, Defensive stocks +8%\n\n3. Risk Assessment:\n   • Current portfolio risk: 7.2/10\n   • Proposed adjustments reduce risk to 5.8/10\n   • Maintains expected return within 2% of target\n\n4. Human Decision Process:\n   • Reviews AI analysis and scenarios\n   • Adds personal risk tolerance (moderate)\n   • Considers life circumstances (approaching retirement)\n   • Final decision: Blend of Scenario A & C recommendations\n\nOutcome: Data-informed decision with human judgment and personal context'
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
    id: 'explainable-ai-interaction',
    name: 'Explainable AI Interaction',
    abbr: 'XAI',
    icon: '💡',
    color: 'from-red-500 to-orange-600',
    category: 'human-ai-collaboration',
    description: 'AI systems that can explain their reasoning and decisions to human collaborators',
    features: [
      'Natural language explanations',
      'Visual reasoning displays',
      'Interactive exploration tools',
      'Confidence level communication',
      'Alternative pathway showing',
      'Uncertainty transparency'
    ],
    useCases: ['scientific-research', 'medical-diagnosis', 'judicial-decisions', 'financial-analysis', 'educational-tools'],
    complexity: 'high',
    example: 'Drug Discovery Research:\n\nAI Recommendation: "Compound X-47 shows 78% probability of success for treating Type 2 diabetes"\n\nExplainable Interaction:\n\n1. High-Level Explanation:\n   "I recommend X-47 because it has structural similarity to successful diabetes drugs and shows favorable molecular interactions with insulin receptors."\n\n2. Detailed Reasoning (on request):\n   • Molecular Structure Analysis:\n     - 87% similarity to Metformin (known effective drug)\n     - Contains glucose-binding motif found in 6/8 successful compounds\n   \n   • Biological Pathway Analysis:\n     - Targets AMPK pathway (validated for diabetes)\n     - Low off-target effects predicted (toxicity risk: 12%)\n   \n   • Historical Data Correlation:\n     - Similar compounds: 71% Phase II success rate\n     - Better safety profile than current alternatives\n\n3. Interactive Exploration:\n   Human: "What if we modify the benzene ring?"\n   AI: "Modifying position 4 increases potency 15% but raises toxicity to 18%. Position 6 modification maintains safety with 8% potency gain."\n\n4. Uncertainty Communication:\n   • Confidence breakdown:\n     - Efficacy prediction: 78% ± 12%\n     - Safety prediction: 85% ± 8%\n     - Market viability: 65% ± 20%\n   • Key uncertainties: Long-term effects, drug interactions\n\n5. Alternative Options:\n   "Second choice: Compound Y-23 (72% success probability, higher safety margin)"\n\nBenefits:\n• Builds scientist trust through transparency\n• Enables informed human decision-making\n• Accelerates research through guided exploration\n• Maintains human oversight in critical decisions'
  },
  {
    id: 'approval-workflows',
    name: 'Approval Workflows',
    abbr: 'AW',
    icon: '✅',
    color: 'from-green-500 to-emerald-600',
    category: 'human-ai-collaboration',
    description: 'Structured approval processes where human reviewers validate and approve AI-generated outputs or decisions',
    features: [
      'Multi-stage approval processes',
      'Role-based review assignments',
      'Automated routing and escalation',
      'Audit trails and documentation',
      'Conditional approval workflows',
      'Batch processing capabilities'
    ],
    useCases: ['content-publishing', 'financial-transactions', 'medical-decisions', 'legal-documents', 'policy-changes'],
    complexity: 'medium',
    example: 'Content Publishing Workflow:\n\nAI Content Generation:\n• AI creates blog post draft: "10 Tips for Remote Work Productivity"\n• Content quality score: 8.2/10\n• SEO optimization: 85% complete\n• Brand alignment: 92% match\n\nApproval Workflow:\n1. Tier 1 Review (Content Editor):\n   • Reviews for grammar, style, accuracy\n   • Checks brand voice consistency\n   • Decision: Approved with minor edits\n   • Time: 15 minutes\n\n2. Tier 2 Review (Subject Matter Expert):\n   • Validates technical accuracy of productivity tips\n   • Confirms practical applicability\n   • Decision: Approved\n   • Time: 10 minutes\n\n3. Final Review (Marketing Manager):\n   • Strategic alignment check\n   • Publication timing approval\n   • Decision: Approved for immediate publication\n   • Time: 5 minutes\n\nWorkflow Features:\n• Parallel reviews where possible\n• Automatic escalation for rejections\n• Version control and change tracking\n• Performance metrics for review times\n\nResult: High-quality, brand-aligned content published with full human oversight in 30 minutes'
  },
  {
    id: 'collaborative-filtering',
    name: 'Collaborative Filtering',
    abbr: 'CF',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-600',
    category: 'human-ai-collaboration',
    description: 'Human-AI collaborative approach to filtering, ranking, and curating content or decisions based on combined judgments',
    features: [
      'Human-AI preference alignment',
      'Collaborative ranking systems',
      'Learning from human feedback',
      'Quality score combination',
      'Bias detection and correction',
      'Iterative improvement cycles'
    ],
    useCases: ['content-curation', 'recommendation-systems', 'talent-screening', 'research-prioritization', 'risk-assessment'],
    complexity: 'high',
    example: 'Research Paper Curation:\n\nTask: Curate top 20 papers on "sustainable energy storage" from 500 candidates\n\nCollaborative Filtering Process:\n\n1. AI Initial Filtering:\n   • Semantic relevance scoring (0-1.0)\n   • Citation impact analysis\n   • Recency weighting (2020-2024)\n   • Technical quality indicators\n   • Reduces 500 papers to 100 candidates\n\n2. Human Expert Review:\n   • Domain expert reviews AI shortlist\n   • Adds domain-specific criteria:\n     - Commercial viability potential\n     - Environmental impact significance\n     - Technical feasibility assessment\n   • Flags 3 highly relevant papers AI missed\n   • Removes 15 papers with technical issues AI couldn\'t detect\n\n3. Collaborative Scoring:\n   • AI technical metrics: 40% weight\n   • Human domain expertise: 35% weight\n   • Combined impact prediction: 25% weight\n   • Final ranking incorporates both perspectives\n\n4. Iterative Refinement:\n   • Human feedback trains AI on domain preferences\n   • AI learns to weight technical vs. practical factors\n   • System improves with each curation cycle\n\nFinal Curation:\n• 20 high-quality papers selected\n• Balanced technical rigor and practical relevance\n• 90% expert satisfaction rate\n• 30% time reduction vs. manual curation\n\nBenefits:\n• Combines AI scale with human domain expertise\n• Learns and improves from collaboration\n• Reduces expert workload while maintaining quality\n• Provides explainable curation decisions'
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