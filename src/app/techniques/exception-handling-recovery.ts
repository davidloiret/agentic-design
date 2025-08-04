import { Technique } from './types';

export const exceptionHandlingRecoveryTechniques: Technique[] = [
  {
    id: 'circuit-breaker',
    name: 'Circuit Breaker Pattern',
    abbr: 'CBP',
    icon: '⚡',
    color: 'from-red-500 to-orange-600',
    category: 'exception-handling-recovery',
    description: 'Prevents cascade failures by temporarily stopping calls to failing services and allowing recovery',
    features: [
      'Failure threshold detection',
      'Automatic recovery testing',
      'State management (Open/Closed/Half-Open)',
      'Fallback mechanisms',
      'Performance monitoring',
      'Adaptive timeout handling'
    ],
    useCases: ['microservices', 'api-integration', 'distributed-systems', 'fault-tolerance'],
    complexity: 'medium',
    example: 'AI Model Service Circuit Breaker:\n\nCircuit States:\n\n1. Closed (Normal Operation):\n   • All requests pass through\n   • Success rate: 98.5%\n   • Latency: 120ms average\n   • Monitoring: Continuous failure tracking\n\n2. Open (Failure State):\n   • Trigger: 5 failures in 30 seconds\n   • Action: Block all requests for 60 seconds\n   • Fallback: Use cached responses or simpler model\n   • Status: "Service temporarily unavailable"\n\n3. Half-Open (Recovery Testing):\n   • Duration: After 60-second timeout\n   • Test requests: Allow 3 trial requests\n   • Success threshold: 2/3 must succeed\n   • Decision: Return to Closed or back to Open\n\nImplementation:\n\n```python\nclass AIModelCircuitBreaker:\n    def __init__(self):\n        self.failure_threshold = 5\n        self.recovery_timeout = 60\n        self.failure_count = 0\n        self.last_failure_time = None\n        self.state = "CLOSED"\n    \n    def call_ai_model(self, request):\n        if self.state == "OPEN":\n            if self._should_attempt_reset():\n                self.state = "HALF_OPEN"\n            else:\n                return self._fallback_response()\n        \n        try:\n            result = ai_model.predict(request)\n            self._on_success()\n            return result\n        except Exception as e:\n            self._on_failure()\n            return self._fallback_response()\n```\n\nBenefits:\n• Prevented 12 cascade failures last month\n• 99.7% uptime vs 94.2% without circuit breaker\n• Automatic recovery in 95% of cases\n• User experience: Graceful degradation instead of errors'
  },
  {
    id: 'retry-backoff',
    name: 'Intelligent Retry with Backoff',
    abbr: 'IRB',
    icon: '🔄',
    color: 'from-orange-500 to-yellow-600',
    category: 'exception-handling-recovery',
    description: 'Smart retry mechanisms with exponential backoff and jitter to handle transient failures gracefully',
    features: [
      'Exponential backoff strategy',
      'Jitter randomization',
      'Retry limit configuration',
      'Error classification',
      'Idempotency handling',
      'Success rate optimization'
    ],
    useCases: ['api-calls', 'database-operations', 'network-requests', 'distributed-processing'],
    complexity: 'medium',
    example: 'LLM API Retry Strategy:\n\nError Classification:\n\n1. Retryable Errors:\n   • Network timeouts (503, 504)\n   • Rate limiting (429)\n   • Temporary service unavailable (503)\n   • Internal server errors (500)\n\n2. Non-Retryable Errors:\n   • Authentication failures (401, 403)\n   • Invalid requests (400)\n   • Not found (404)\n   • Quota exceeded (permanent)\n\nRetry Configuration:\n• Max attempts: 5\n• Base delay: 1 second\n• Max delay: 30 seconds\n• Backoff multiplier: 2\n• Jitter: ±25% randomization\n\nExecution Example:\n\nAttempt 1: Immediate request\n• Result: 429 Rate Limit\n• Next delay: 1s + jitter (0.8-1.2s)\n\nAttempt 2: After 1.1s delay\n• Result: 503 Service Unavailable\n• Next delay: 2s + jitter (1.5-2.5s)\n\nAttempt 3: After 2.2s delay\n• Result: Timeout\n• Next delay: 4s + jitter (3-5s)\n\nAttempt 4: After 4.7s delay\n• Result: 200 Success\n• Total time: 8.0s (vs immediate failure)\n\nSmart Optimizations:\n\n1. Context-Aware Delays:\n   • Rate limits: Respect Retry-After header\n   • Server errors: Longer delays\n   • Network issues: Shorter delays\n\n2. Adaptive Backoff:\n   • Success rate < 50%: Increase base delay\n   • Success rate > 90%: Decrease base delay\n   • Peak hours: Add traffic-aware delays\n\n3. Request Classification:\n   • Critical requests: More retries\n   • Batch operations: Fewer retries\n   • User-facing: Fast timeout\n\nResults:\n• Success rate: 94.2% → 98.7%\n• User-perceived errors: -78%\n• Average latency: +2.3s (acceptable trade-off)\n• Cost efficiency: Reduced duplicate processing'
  },
  {
    id: 'graceful-degradation',
    name: 'Graceful Degradation',
    abbr: 'GD',
    icon: '📉',
    color: 'from-yellow-500 to-green-600',
    category: 'exception-handling-recovery',
    description: 'Progressive reduction of functionality while maintaining core services during system stress or failures',
    features: [
      'Priority-based feature disabling',
      'Resource allocation optimization',
      'Quality level adjustment',
      'User experience preservation',
      'Automatic scaling decisions',
      'Recovery monitoring'
    ],
    useCases: ['high-availability', 'resource-management', 'peak-load-handling', 'disaster-recovery'],
    complexity: 'high',
    example: 'AI-Powered E-commerce Degradation:\n\nService Priority Levels:\n\n1. Critical (Always Available):\n   • User authentication\n   • Order placement\n   • Payment processing\n   • Basic product search\n\n2. Important (Degrade Quality):\n   • Personalized recommendations\n   • Advanced search filters\n   • Product image analysis\n   • Customer support chat\n\n3. Nice-to-Have (Disable First):\n   • AI styling suggestions\n   • Voice search\n   • AR try-on features\n   • Social sharing\n\nDegradation Scenario:\n\nNormal Load (100% capacity):\n• All features enabled\n• High-quality AI recommendations\n• Real-time personalization\n• Full search capabilities\n\nModerate Stress (80% capacity):\n• Reduce recommendation quality\n• Cache more responses\n• Simplify search ranking\n• Batch non-critical operations\n\nHigh Stress (60% capacity):\n• Disable AR features\n• Use pre-computed recommendations\n• Basic search only\n• Queue customer support\n\nCritical Stress (40% capacity):\n• Disable AI styling\n• Show popular items only\n• Essential checkout flow\n• Static content where possible\n\nImplementation Strategy:\n\n1. Real-time Monitoring:\n   • CPU/Memory utilization\n   • Request queue length\n   • Response time percentiles\n   • Error rates by service\n\n2. Automatic Triggers:\n   • P95 latency > 2s: Level 1 degradation\n   • Error rate > 5%: Level 2 degradation\n   • Queue > 1000: Level 3 degradation\n   • Infrastructure alerts: Level 4 degradation\n\n3. User Communication:\n   • Subtle feature disabling (no error messages)\n   • Status page for major degradations\n   • Estimated recovery times\n   • Alternative workflow suggestions\n\nRecovery Process:\n• Gradual re-enabling of features\n• Performance validation at each level\n• Rollback if issues reoccur\n• Post-incident analysis\n\nResults:\n• 99.95% uptime vs 97.2% without degradation\n• Revenue protection: $2.3M saved during incidents\n• User satisfaction: 94% vs 76% during outages\n• Recovery time: 67% faster than full restoration'
  },
  {
    id: 'health-monitoring',
    name: 'Comprehensive Health Monitoring',
    abbr: 'CHM',
    icon: '💓',
    color: 'from-green-500 to-blue-600',
    category: 'exception-handling-recovery',
    description: 'Multi-layered health monitoring system with predictive failure detection and automated recovery',
    features: [
      'Multi-metric health scoring',
      'Predictive failure analysis',
      'Automated alerting',
      'Dependency tracking',
      'Performance trend analysis',
      'Self-healing mechanisms'
    ],
    useCases: ['production-monitoring', 'predictive-maintenance', 'sla-management', 'automated-recovery'],
    complexity: 'high',
    example: 'AI Model Serving Health Monitor:\n\nHealth Dimensions:\n\n1. Performance Health (Weight: 30%):\n   • Latency: P95 < 500ms (Current: 340ms) ✅\n   • Throughput: >1000 req/min (Current: 1,450) ✅\n   • Success rate: >99% (Current: 99.7%) ✅\n   • Score: 95/100\n\n2. Resource Health (Weight: 25%):\n   • CPU utilization: <80% (Current: 72%) ✅\n   • Memory usage: <85% (Current: 78%) ✅\n   • GPU memory: <90% (Current: 84%) ✅\n   • Disk I/O: Normal (Current: 45 IOPS) ✅\n   • Score: 88/100\n\n3. Quality Health (Weight: 25%):\n   • Model accuracy: >95% (Current: 96.2%) ✅\n   • Output coherence: >90% (Current: 94%) ✅\n   • Safety violations: <0.1% (Current: 0.03%) ✅\n   • User satisfaction: >4.0 (Current: 4.3) ✅\n   • Score: 96/100\n\n4. Infrastructure Health (Weight: 20%):\n   • Network connectivity: Stable ✅\n   • Database response: <100ms (Current: 67ms) ✅\n   • Cache hit rate: >80% (Current: 87%) ✅\n   • Load balancer: Healthy ✅\n   • Score: 92/100\n\nOverall Health Score: 93/100 (Healthy)\n\nPredictive Analysis:\n\n1. Trend Detection:\n   • Memory usage: +2% per day (concerning)\n   • Prediction: Will exceed threshold in 6 days\n   • Action: Schedule memory optimization\n\n2. Anomaly Detection:\n   • Latency spike detected at 2:15 PM\n   • Correlation: Database connection pool exhaustion\n   • Auto-remedy: Pool size increased\n   • Resolution time: 45 seconds\n\n3. Dependency Health:\n   • External API: 94% availability (below SLA)\n   • Impact: Fallback mechanisms activated\n   • Mitigation: Secondary provider routing\n\nAutomated Recovery Actions:\n\n1. Self-Healing Triggers:\n   • Memory leak detected → Container restart\n   • High latency → Load balancer adjustment\n   • Model drift → Automatic retraining trigger\n   • Cache miss spike → Preload popular queries\n\n2. Escalation Procedures:\n   • Health score < 80: Alert on-call engineer\n   • Health score < 60: Page entire team\n   • Critical failure: Activate incident response\n\n3. Recovery Validation:\n   • Health score improvement verification\n   • Performance metric stabilization\n   • User impact assessment\n   • Documentation of recovery actions\n\nBusiness Impact:\n• Incident prevention: 23 issues auto-resolved\n• MTTR reduction: 78% faster recovery\n• Uptime improvement: 99.92% vs 98.7%\n• Cost savings: $450K in prevented downtime'
  }
];