import { Technique } from './types';

export const evaluationMonitoringTechniques: Technique[] = [
  {
    id: 'metrics-dashboards',
    name: 'AI Metrics Dashboards',
    abbr: 'AMD',
    icon: '📊',
    color: 'from-blue-500 to-indigo-600',
    category: 'evaluation-monitoring',
    description: 'Comprehensive real-time monitoring dashboards for AI system performance, quality, and operational metrics',
    features: [
      'Real-time performance tracking',
      'Multi-dimensional metrics',
      'Custom alerting rules',
      'Trend analysis',
      'Comparative benchmarking',
      'Drill-down capabilities'
    ],
    useCases: ['production-monitoring', 'performance-optimization', 'sla-tracking', 'quality-assurance'],
    complexity: 'medium',
    example: 'Production AI Service Dashboard:\n\nCore Performance Metrics:\n• Latency: P50: 120ms, P95: 450ms, P99: 890ms\n• Throughput: 2,450 requests/minute\n• Success Rate: 99.7% (SLA: 99.5%)\n• Error Rate: 0.3% (mostly timeout errors)\n\nQuality Metrics:\n• Accuracy Score: 94.2% (trending up 2.1%)\n• User Satisfaction: 4.6/5.0 (based on feedback)\n• Content Safety: 99.9% (automated filtering)\n• Hallucination Rate: 0.8% (manual evaluation)\n\nResource Utilization:\n• CPU Usage: 76% average, 89% peak\n• Memory: 12.4GB/16GB (77% utilization)\n• GPU Usage: 82% (3x NVIDIA A100)\n• Cost: $1,247/day ($0.034/request)\n\nBusiness Metrics:\n• Active Users: 45,230 (24hr)\n• Conversion Rate: 12.4% (+0.8% vs last week)\n• Revenue Impact: +$23,450/day from AI features\n• Customer Retention: 96.2% (AI-assisted users)\n\nAlert Conditions:\n🟡 Warning: P95 latency > 400ms for 5 minutes\n🔴 Critical: Success rate < 99% for 10 minutes\n🟢 All systems normal\n\nTrending Insights:\n• Performance improved 15% after model optimization\n• Quality scores correlate with user engagement\n• Peak usage: 2-4pm ET, scale accordingly\n• Cost per request down 23% vs last month'
  },
  {
    id: 'automated-testing',
    name: 'Automated AI Testing',
    abbr: 'AAT',
    icon: '🧪',
    color: 'from-indigo-500 to-purple-600',
    category: 'evaluation-monitoring',
    description: 'Comprehensive automated testing frameworks for AI model behavior, safety, and performance validation',
    features: [
      'Regression testing',
      'Performance benchmarking',
      'Safety evaluation',
      'Edge case detection',
      'A/B testing automation',
      'Continuous validation'
    ],
    useCases: ['model-validation', 'deployment-safety', 'regression-detection', 'quality-gates'],
    complexity: 'high',
    example: 'Automated LLM Testing Pipeline:\n\nTest Suite Categories:\n\n1. Functional Tests (2,450 test cases):\n   • Input-output validation\n   • Task completion accuracy\n   • Response format compliance\n   • Multi-language support\n   • Results: 98.4% pass rate\n\n2. Safety Tests (1,200 test cases):\n   • Harmful content detection\n   • Bias evaluation across demographics\n   • Privacy leak prevention\n   • Prompt injection resistance\n   • Results: 99.8% pass rate\n\n3. Performance Tests (800 test cases):\n   • Latency benchmarks\n   • Memory usage patterns\n   • Concurrent load handling\n   • Resource scaling behavior\n   • Results: All within SLA requirements\n\n4. Edge Case Tests (950 test cases):\n   • Unusual input formats\n   • Boundary conditions\n   • Error handling scenarios\n   • Recovery mechanisms\n   • Results: 94.2% handled gracefully\n\nAutomated Execution:\n• Trigger: Every code commit + daily schedule\n• Duration: 45 minutes full suite\n• Environment: Isolated test infrastructure\n• Reporting: Slack alerts + detailed reports\n\nRegression Detection:\n• Baseline: Previous production model\n• Comparison: Statistical significance testing\n• Threshold: <2% accuracy degradation\n• Action: Block deployment if regression detected\n\nContinuous Learning:\n• Failed test analysis\n• New test case generation\n• Performance trend tracking\n• Predictive failure detection\n\nResults Impact:\n• 87% reduction in production bugs\n• 95% faster deployment cycles\n• Improved team confidence in releases\n• $340K saved in prevented incidents'
  },
  {
    id: 'statistical-monitoring',
    name: 'Statistical Performance Monitoring',
    abbr: 'SPM',
    icon: '📈',
    color: 'from-purple-500 to-pink-600',
    category: 'evaluation-monitoring',
    description: 'Advanced statistical analysis of AI system performance with drift detection and anomaly identification',
    features: [
      'Distribution monitoring',
      'Drift detection algorithms',
      'Anomaly identification',
      'Confidence intervals',
      'Hypothesis testing',
      'Predictive analytics'
    ],
    useCases: ['drift-detection', 'anomaly-detection', 'performance-analysis', 'quality-control'],
    complexity: 'high',
    example: 'Model Performance Drift Detection:\n\nStatistical Monitoring Framework:\n\n1. Baseline Establishment (30 days):\n   • Accuracy: μ=94.2%, σ=1.8%\n   • Latency: μ=145ms, σ=23ms\n   • User satisfaction: μ=4.4/5, σ=0.6\n   • Error patterns: Documented distribution\n\n2. Real-time Monitoring:\n   • Sample size: 1000 predictions/hour\n   • Statistical tests: Kolmogorov-Smirnov, Mann-Whitney\n   • Confidence level: 99% (α=0.01)\n   • Window: Sliding 24-hour periods\n\n3. Drift Detection Results:\n   Week 1: No significant drift detected\n   Week 2: ⚠️ Accuracy drift detected\n   • Current: 91.8% (vs baseline 94.2%)\n   • P-value: 0.003 (significant)\n   • Effect size: -2.4% (moderate drift)\n   • Root cause: New data domain\n\n4. Anomaly Detection:\n   • Method: Isolation Forest + Statistical control charts\n   • Anomalies detected: 12 in last 7 days\n   • Pattern: Latency spikes during peak hours\n   • Action: Infrastructure scaling triggered\n\n5. Predictive Analysis:\n   • Trend: Gradual accuracy decline (-0.1%/week)\n   • Forecast: Will breach threshold in 8 weeks\n   • Recommendation: Schedule model retraining\n   • Confidence: 89% prediction accuracy\n\nAutomated Response:\n• Minor drift: Enhanced monitoring\n• Moderate drift: Alert ML team\n• Severe drift: Automatic rollback\n• Anomalies: Real-time notifications\n\nBusiness Impact:\n• Early detection: 3 weeks before user impact\n• Prevented outages: 5 incidents\n• Cost savings: $125K in avoided downtime\n• Improved reliability: 99.97% uptime'
  },
  {
    id: 'user-feedback-loops',
    name: 'User Feedback Integration',
    abbr: 'UFI',
    icon: '🔄',
    color: 'from-pink-500 to-red-600',
    category: 'evaluation-monitoring',
    description: 'Systematic collection and integration of user feedback for continuous AI system improvement',
    features: [
      'Multi-channel feedback collection',
      'Sentiment analysis',
      'Feedback prioritization',
      'Automated response routing',
      'Improvement tracking',
      'User engagement metrics'
    ],
    useCases: ['user-experience', 'product-improvement', 'quality-enhancement', 'customer-satisfaction'],
    complexity: 'medium',
    example: 'AI Assistant Feedback Loop System:\n\nFeedback Collection Channels:\n\n1. Direct Rating System:\n   • Thumbs up/down on responses\n   • 5-star quality ratings\n   • Collection rate: 34% of interactions\n   • Average rating: 4.2/5.0\n\n2. Implicit Feedback:\n   • Response acceptance (copy/use): 78%\n   • Follow-up questions: 23%\n   • Session abandonment: 5.2%\n   • Retry requests: 8.7%\n\n3. Explicit Comments (2,450/month):\n   • Text feedback analysis\n   • Sentiment: 72% positive, 18% neutral, 10% negative\n   • Common themes: Speed (+), accuracy (+), understanding (-)\n\n4. Support Tickets (145/month):\n   • AI-related issues: 23%\n   • Response quality: 45%\n   • Feature requests: 32%\n\nFeedback Processing Pipeline:\n\n1. Real-time Collection:\n   • Capture all feedback types\n   • Metadata: user context, session info\n   • Privacy compliance: GDPR/CCPA\n\n2. Automated Analysis:\n   • Sentiment classification (96% accuracy)\n   • Topic modeling: 12 main categories\n   • Priority scoring: urgency × impact\n   • Trend detection: weekly/monthly patterns\n\n3. Actionable Insights:\n   • Critical issues: Immediate escalation\n   • Feature gaps: Product backlog\n   • Quality patterns: Model improvement\n   • User education: Documentation updates\n\n4. Improvement Tracking:\n   • Response quality: +0.3 stars/month\n   • User satisfaction: 89% → 94% (6 months)\n   • Feature adoption: +45% after feedback-driven changes\n   • Support tickets: -38% after improvements\n\nClosed-Loop Validation:\n• A/B test improvements\n• Measure feedback sentiment changes\n• Track user behavior modifications\n• Calculate ROI of feedback-driven changes\n\nResults:\n• User satisfaction up 15%\n• Product development 40% more targeted\n• Support load reduced 30%\n• Revenue impact: +$2.3M from improvements'
  }
];