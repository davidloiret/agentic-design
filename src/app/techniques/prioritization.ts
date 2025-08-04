import { Technique } from './types';

export const prioritizationTechniques: Technique[] = [
  {
    id: 'weighted-scoring',
    name: 'Multi-Criteria Weighted Scoring',
    abbr: 'MCWS',
    icon: '⚖️',
    color: 'from-blue-500 to-indigo-600',
    category: 'prioritization',
    description: 'Systematic prioritization using weighted scoring across multiple evaluation criteria',
    features: [
      'Multi-criteria evaluation',
      'Weight assignment optimization',
      'Stakeholder preference integration',
      'Sensitivity analysis',
      'Trade-off visualization',
      'Decision transparency'
    ],
    useCases: ['feature-prioritization', 'project-selection', 'resource-allocation', 'vendor-selection'],
    complexity: 'medium',
    example: 'Product Feature Prioritization:\n\nEvaluation Criteria:\n1. User Impact (Weight: 30%)\n   • Affects how many users?\n   • Improves user experience how much?\n   • Reduces user friction?\n\n2. Business Value (Weight: 25%)\n   • Revenue potential\n   • Cost savings\n   • Strategic alignment\n\n3. Technical Feasibility (Weight: 20%)\n   • Development complexity\n   • Technical risk\n   • Resource requirements\n\n4. Time to Market (Weight: 15%)\n   • Development time\n   • Testing requirements\n   • Deployment complexity\n\n5. Competitive Advantage (Weight: 10%)\n   • Differentiation potential\n   • Market positioning\n   • Patent opportunities\n\nFeature Evaluation:\n\nFeature A: "AI-Powered Search"\n• User Impact: 9/10 (affects all users, major UX improvement)\n• Business Value: 8/10 (20% conversion increase projected)\n• Technical Feasibility: 6/10 (requires ML expertise)\n• Time to Market: 4/10 (6-month development)\n• Competitive Advantage: 9/10 (unique in market)\n• Weighted Score: (9×0.3)+(8×0.25)+(6×0.2)+(4×0.15)+(9×0.1) = 7.4\n\nFeature B: "Mobile App Notifications"\n• User Impact: 7/10 (improves engagement)\n• Business Value: 6/10 (moderate retention impact)\n• Technical Feasibility: 9/10 (straightforward implementation)\n• Time to Market: 9/10 (2-week development)\n• Competitive Advantage: 4/10 (table stakes feature)\n• Weighted Score: (7×0.3)+(6×0.25)+(9×0.2)+(9×0.15)+(4×0.1) = 7.0\n\nFeature C: "Advanced Analytics Dashboard"\n• User Impact: 5/10 (power users only)\n• Business Value: 7/10 (enterprise sales enabler)\n• Technical Feasibility: 7/10 (moderate complexity)\n• Time to Market: 6/10 (3-month development)\n• Competitive Advantage: 6/10 (expected feature)\n• Weighted Score: (5×0.3)+(7×0.25)+(7×0.2)+(6×0.15)+(6×0.1) = 6.0\n\nPrioritization Results:\n1. AI-Powered Search (7.4) - High Priority\n2. Mobile App Notifications (7.0) - Medium-High Priority\n3. Advanced Analytics Dashboard (6.0) - Medium Priority\n\nSensitivity Analysis:\n• If Technical Feasibility weight increased to 30%:\n  - Feature B becomes #1 (higher feasibility)\n• If Time to Market weight increased to 25%:\n  - Feature B significantly ahead\n• Decision robustness: Feature A wins in 78% of weight scenarios\n\nStakeholder Alignment:\n• Engineering team prefers Feature B (feasibility)\n• Product team prefers Feature A (impact)\n• Business team values Feature A (revenue potential)\n• Final decision: Proceed with Feature A, quick-win Feature B next'
  },
  {
    id: 'multi-criteria-decision',
    name: 'Multi-Criteria Decision Analysis',
    abbr: 'MCDA',
    icon: '🎯',
    color: 'from-indigo-500 to-purple-600',
    category: 'prioritization',
    description: 'Advanced decision-making framework for complex choices with multiple competing objectives',
    features: [
      'Analytical Hierarchy Process',
      'TOPSIS methodology',
      'Fuzzy logic integration',
      'Pairwise comparisons',
      'Consistency checking',
      'Group decision support'
    ],
    useCases: ['strategic-planning', 'investment-decisions', 'technology-selection', 'policy-making'],
    complexity: 'high',
    example: 'Cloud Provider Selection:\n\nDecision Problem:\n• Need to select cloud provider for enterprise AI workloads\n• 3 alternatives: AWS, Azure, Google Cloud\n• Multiple stakeholders: IT, Finance, Data Science, Security\n• Budget: $2M annually, 5-year commitment\n\nCriteria Hierarchy:\n\nLevel 1: Main Criteria\n1. Technical Capabilities (40%)\n2. Cost Structure (25%)\n3. Security & Compliance (20%)\n4. Support & Reliability (15%)\n\nLevel 2: Sub-Criteria\nTechnical Capabilities:\n• AI/ML Services (50%)\n• Computing Power (30%)\n• Integration Capabilities (20%)\n\nCost Structure:\n• Base Pricing (60%)\n• Scaling Costs (40%)\n\nSecurity & Compliance:\n• Data Protection (70%)\n• Compliance Certifications (30%)\n\nSupport & Reliability:\n• SLA Guarantees (60%)\n• Technical Support (40%)\n\nPairwise Comparisons:\n\nTechnical Capabilities (AI/ML Services):\n• AWS vs Azure: AWS slightly better (3:1)\n• AWS vs GCP: AWS moderately better (5:1)\n• Azure vs GCP: Azure slightly better (3:1)\n• Consistency ratio: 0.08 (acceptable < 0.1)\n\nCost Structure Analysis:\n• AWS: Mature pricing, complex tiers\n• Azure: Competitive pricing, good enterprise deals\n• GCP: Aggressive pricing, simple structure\n• Ranking: GCP > Azure > AWS\n\nTOPSIS Analysis:\n\nIdeal Solution (Best values across criteria):\n• Technical: AWS score (9.2/10)\n• Cost: GCP score (8.8/10)\n• Security: Azure score (9.0/10)\n• Support: AWS score (9.1/10)\n\nNegative Ideal (Worst values):\n• Technical: 6.5/10\n• Cost: 6.2/10\n• Security: 7.1/10\n• Support: 7.3/10\n\nDistance Calculations:\nAWS:\n• Distance to ideal: 0.234\n• Distance to negative ideal: 0.756\n• Relative closeness: 0.763\n\nAzure:\n• Distance to ideal: 0.312\n• Distance to negative ideal: 0.642\n• Relative closeness: 0.673\n\nGoogle Cloud:\n• Distance to ideal: 0.445\n• Distance to negative ideal: 0.498\n• Relative closeness: 0.528\n\nFinal Rankings:\n1. AWS (0.763) - Best overall balance\n2. Azure (0.673) - Strong enterprise features\n3. Google Cloud (0.528) - Cost-effective but gaps\n\nSensitivity Analysis:\n• If cost weight increased to 40%, Azure becomes #1\n• If technical weight reduced to 25%, Azure competitive\n• AWS wins in 82% of reasonable weight scenarios\n\nGroup Decision Integration:\n• IT team: Prefers AWS (technical leadership)\n• Finance team: Prefers GCP (cost savings)\n• Security team: Prefers Azure (compliance features)\n• Data Science team: Prefers AWS (ML tools)\n\nConsensus Building:\n• Weighted stakeholder preferences\n• Address key concerns of each group\n• Negotiate hybrid or multi-cloud approach\n• Final decision: AWS primary, Azure for specific compliance needs\n\nDecision Validation:\n• ROI projection: 23% over 5 years with AWS\n• Risk assessment: Low technical risk, medium vendor lock-in\n• Implementation plan: 6-month migration timeline\n• Success metrics: Performance, cost, user satisfaction'
  },
  {
    id: 'priority-queues',
    name: 'Dynamic Priority Queue Systems',
    abbr: 'DPQS',
    icon: '📊',
    color: 'from-purple-500 to-pink-600',
    category: 'prioritization',
    description: 'Intelligent queue management with dynamic priority adjustment based on changing conditions',
    features: [
      'Dynamic priority calculation',
      'Aging mechanisms',
      'SLA-aware scheduling',
      'Load balancing',
      'Fairness algorithms',
      'Real-time optimization'
    ],
    useCases: ['task-scheduling', 'customer-support', 'job-processing', 'resource-allocation'],
    complexity: 'medium',
    example: 'AI Model Training Queue:\n\nQueue System Overview:\n• 500+ ML training jobs daily\n• 50 GPU clusters (A100, V100, RTX series)\n• Users: Research teams, product teams, students\n• SLAs: Research (24h), Product (4h), Critical (1h)\n\nPriority Calculation Formula:\nPriority = (Base_Priority × User_Tier × Urgency) + Aging_Bonus - Resource_Cost_Penalty\n\nPriority Components:\n\n1. Base Priority (1-10):\n   • Critical production bugs: 10\n   • Product feature development: 7-8\n   • Research experiments: 4-6\n   • Student projects: 1-3\n\n2. User Tier Multiplier:\n   • Enterprise customers: 1.5x\n   • Internal product teams: 1.3x\n   • Research teams: 1.0x\n   • Students/free tier: 0.7x\n\n3. Urgency Factor (0.5-2.0):\n   • Emergency hotfix: 2.0x\n   • Deadline this week: 1.5x\n   • Deadline this month: 1.0x\n   • No specific deadline: 0.8x\n\n4. Aging Bonus:\n   • +0.1 per hour in queue\n   • Prevents starvation\n   • Caps at +2.0 after 20 hours\n\n5. Resource Cost Penalty:\n   • Large jobs (>8 GPUs): -1.0\n   • Long jobs (>24h): -0.5\n   • Encourages efficient resource use\n\nExample Queue State:\n\nJob A: Research experiment\n• Base Priority: 5\n• User Tier: 1.0x (research)\n• Urgency: 1.0x (no urgent deadline)\n• Age: 3 hours (+0.3)\n• Resource Cost: 2 GPUs (-0.0)\n• Final Priority: 5.3\n\nJob B: Production model update\n• Base Priority: 8\n• User Tier: 1.3x (product team)\n• Urgency: 1.5x (deadline this week)\n• Age: 0.5 hours (+0.05)\n• Resource Cost: 16 GPUs (-1.0)\n• Final Priority: (8 × 1.3 × 1.5) + 0.05 - 1.0 = 14.65\n\nJob C: Student thesis experiment\n• Base Priority: 2\n• User Tier: 0.7x (student)\n• Urgency: 0.8x (no urgent deadline)\n• Age: 12 hours (+1.2)\n• Resource Cost: 1 GPU (-0.0)\n• Final Priority: (2 × 0.7 × 0.8) + 1.2 = 2.32\n\nQueue Order: Job B (14.65) → Job A (5.3) → Job C (2.32)\n\nDynamic Adjustments:\n\nReal-time Priority Updates:\n• Every 15 minutes: Recalculate all priorities\n• SLA monitoring: Boost jobs approaching deadline\n• Resource availability: Adjust for cluster status\n• Fair share: Prevent user monopolization\n\nSLA Management:\n• Research SLA: 24 hours\n• Job A at 20 hours: Priority boost +3.0\n• Ensures SLA compliance: 99.2% achievement rate\n\nLoad Balancing:\n• GPU utilization: 94% average\n• Queue wait time: 2.3 hours average\n• Fairness index: 0.87 (good distribution)\n• Resource fragmentation: 12% (acceptable)\n\nAdaptive Scheduling:\n\n1. Backfill Scheduling:\n   • Small jobs fill gaps left by large jobs\n   • Improves overall throughput by 34%\n   • No impact on high-priority job SLAs\n\n2. Gang Scheduling:\n   • Multi-GPU jobs scheduled atomically\n   • Reduces resource fragmentation\n   • Improves large job completion rates\n\n3. Preemption Handling:\n   • Critical jobs can preempt lower priority\n   • Checkpointing for interrupted jobs\n   • Automatic restart with priority boost\n\nPerformance Metrics:\n\n• Queue throughput: 523 jobs/day (+18% vs FIFO)\n• Average wait time: 2.3h vs 4.1h (FIFO)\n• SLA compliance: 99.2% vs 87% (FIFO)\n• Resource utilization: 94% vs 78% (FIFO)\n• User satisfaction: 8.7/10 vs 6.2/10 (FIFO)\n\nBusiness Impact:\n• Research productivity: +45% experiments completed\n• Product velocity: +67% faster model deployments\n• Infrastructure ROI: +89% better GPU utilization\n• Cost savings: $2.3M annually from efficiency gains'
  },
  {
    id: 'dynamic-ranking',
    name: 'Dynamic Content Ranking',
    abbr: 'DCR',
    icon: '🏆',
    color: 'from-pink-500 to-red-600',
    category: 'prioritization',
    description: 'Real-time content and recommendation ranking that adapts to user behavior and context',
    features: [
      'Real-time personalization',
      'Context-aware ranking',
      'Multi-objective optimization',
      'A/B testing integration',
      'Feedback loop learning',
      'Exploration-exploitation balance'
    ],
    useCases: ['content-recommendation', 'search-ranking', 'feed-optimization', 'product-recommendations'],
    complexity: 'high',
    example: 'News Feed Ranking System:\n\nRanking Architecture:\n• 10M+ articles processed daily\n• 500K+ active users\n• Real-time personalization\n• Multi-objective optimization: Engagement + Diversity + Freshness\n\nRanking Features:\n\n1. Content Features (30% weight):\n   • Topic relevance to user interests\n   • Content quality score (readability, credibility)\n   • Viral potential (social sharing signals)\n   • Freshness (recency bias with decay)\n\n2. User Features (40% weight):\n   • Historical engagement patterns\n   • Topic preferences (learned)\n   • Reading time patterns\n   • Device and context (mobile vs desktop)\n\n3. Context Features (20% weight):\n   • Time of day (morning news vs evening entertainment)\n   • Day of week (weekend vs weekday preferences)\n   • Location (local news boost)\n   • Trending topics (social momentum)\n\n4. Interaction Features (10% weight):\n   • Similar users\' engagement\n   • Social network activity\n   • Comment and share predictions\n   • Cross-platform signals\n\nDynamic Ranking Process:\n\nStep 1: Candidate Generation\n• Content pool: 50,000 articles\n• User interest filtering: Reduce to 5,000\n• Diversity sampling: Include 20% exploratory content\n• Fresh content injection: Include 500 recent articles\n\nStep 2: Feature Extraction\n• Content analysis: NLP processing, topic modeling\n• User profiling: Real-time preference updates\n• Context detection: Time, location, device signals\n• Interaction signals: Social and behavioral data\n\nStep 3: Multi-Objective Scoring\n• Engagement prediction: CTR, reading time, shares\n• Diversity scoring: Topic and source variety\n• Freshness weighting: Time-decay functions\n• Quality assessment: Credibility and readability\n\nStep 4: Ranking Optimization\n• Linear combination: Weighted sum of objectives\n• Constraint satisfaction: Diversity quotas\n• Exploration injection: 15% random exploration\n• Personalization: User-specific weight adjustments\n\nReal-time Adaptation:\n\nUser Behavior Learning:\n• Click-through: +0.1 to topic affinity\n• Reading time >2min: +0.2 to content type preference\n• Share/comment: +0.3 to topic and source preference\n• Skip/back: -0.1 to similar content\n\nContextual Adjustments:\n• Morning (6-10 AM): News and updates (+0.3)\n• Lunch (12-1 PM): Quick reads and entertainment (+0.2)\n• Evening (6-10 PM): Long-form and analysis (+0.4)\n• Weekend: Lifestyle and leisure content (+0.5)\n\nTrending Integration:\n• Viral content detection: Share velocity analysis\n• Topic momentum: Search and social media signals\n• Breaking news boost: Authority source amplification\n• Seasonal adjustment: Holiday and event-driven content\n\nA/B Testing Integration:\n\nExperiment Framework:\n• 5% traffic for ranking experiments\n• Statistical significance testing\n• Multi-arm bandit optimization\n• Gradual rollout of winning variants\n\nCurrent Experiments:\n• Freshness vs Relevance trade-off\n• Diversity quota optimization (15% vs 25%)\n• Personalization depth (individual vs cohort)\n• Exploration rate tuning (10% vs 20%)\n\nPerformance Metrics:\n\nEngagement Metrics:\n• Click-through rate: 8.7% (+23% vs baseline)\n• Average reading time: 2.4 minutes (+34%)\n• Shares per article: 0.31 (+67%)\n• Return visits: 3.2 daily (+28%)\n\nDiversity Metrics:\n• Topic coverage: 87% of user interests\n• Source diversity: 45 unique publishers per user\n• Viewpoint balance: 78% ideological diversity\n• Serendipity rate: 22% unexpected discoveries\n\nBusiness Impact:\n• User engagement: +45% time on platform\n• Content consumption: +67% articles read\n• User retention: +23% monthly active users\n• Revenue: +$12M annually from improved engagement\n• Publisher satisfaction: +34% content reach\n\nAdaptive Learning Results:\n• Cold start problem: 67% improvement for new users\n• Seasonal adaptation: 89% accuracy in preference shifts\n• Real-time responsiveness: <100ms ranking updates\n• Personalization effectiveness: 94% user satisfaction'
  }
];