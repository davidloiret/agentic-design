import { Technique } from './types';

export const routingTechniques: Technique[] = [  
  {
    id: 'llm-based-routing',
    name: 'LLM-based Routing',
    abbr: 'LBR',
    icon: '🧭',
    color: 'from-purple-500 to-pink-600',
    category: 'routing',
    description: 'An intelligent query distribution system that uses a specialized LLM router to analyze incoming requests and dynamically route them to the most appropriate model, API endpoint, or processing pipeline based on query characteristics, ensuring optimal resource utilization and response quality through intent classification and capability matching',
    features: [
      'Intent classification and query understanding',
      'Multi-model orchestration with capability awareness',
      'Cost-performance optimization through smart routing',
      'Latency-aware routing for real-time applications',
      'Fallback mechanisms and graceful degradation',
      'A/B testing and performance monitoring',
      'Custom routing rules and domain-specific logic',
      'Load balancing across model instances'
    ],
    useCases: ['multi-model-systems', 'cost-optimization', 'specialized-domains', 'hybrid-architectures', 'enterprise-ai', 'api-gateways', 'chatbot-platforms'],
    complexity: 'medium',
    example: 'Task: Build intelligent customer service system with multiple specialized models\n\nLLM-based Routing Implementation:\n\n1. Router Model Analysis: "Customer: I need to reset my password but also have questions about my recent bill"\n   → Classification: [Technical Support: 0.7, Billing: 0.3]\n   → Complexity: Medium\n   → Urgency: High (password reset)\n   → Language: English\n\n2. Capability Mapping:\n   • GPT-4: General inquiries, complex reasoning (Cost: $$$)\n   • Claude-3: Technical support, detailed explanations (Cost: $$)\n   • Gemini-Pro: Billing, numerical analysis (Cost: $$)\n   • Llama-3: Simple FAQs, quick responses (Cost: $)\n   • Custom Fine-tuned: Password reset procedures (Cost: $)\n\n3. Routing Decision Process:\n   • Primary Route: Custom model for password reset (exact match)\n   • Secondary Route: Gemini-Pro for billing questions\n   • Fallback: Claude-3 for comprehensive support\n   • Load Check: All models within capacity limits\n\n4. Execution Strategy:\n   Router: "ROUTE: password_reset → custom_model, billing → gemini_pro"\n   \n   Step 1: Custom Model handles password reset\n   → Output: "I\'ll help you reset your password. Check your email for reset link..."\n   \n   Step 2: Gemini-Pro analyzes billing question\n   → Output: "Regarding your bill, I see a charge of $47.99 from..."\n   \n   Step 3: Response Synthesis\n   → Combined, coherent response with both answers\n\n5. Performance Metrics:\n   • Response time: 1.2s (vs 3.5s with GPT-4 alone)\n   • Cost: $0.003 (vs $0.015 with GPT-4)\n   • Accuracy: 94% (vs 91% with single model)\n   • Customer satisfaction: 4.8/5.0\n\nAdvanced Features:\n• Dynamic model selection based on real-time performance\n• Automatic rerouting on model failure or timeout\n• Context-aware routing preserving conversation history\n• Continuous learning from routing outcomes\n\nStudies show 67% cost reduction and 23% faster response times compared to single-model approaches (2024 benchmarks)'
  },
  {
    id: 'embedding-based-routing',
    name: 'Embedding-based Routing',
    abbr: 'EBR',
    icon: '🎯',
    color: 'from-indigo-500 to-blue-600',
    category: 'routing',
    description: 'A semantic routing system that converts queries and route definitions into high-dimensional vector embeddings, using cosine similarity or other distance metrics to match incoming requests to the most semantically similar handler, enabling fuzzy matching, multi-lingual support, and context-aware routing beyond simple keyword matching',
    features: [
      'Semantic similarity matching using vector embeddings',
      'Language-agnostic routing through meaning preservation',
      'Fuzzy boundary handling for ambiguous queries',
      'Pre-computed route embeddings for fast matching',
      'Configurable similarity thresholds and metrics',
      'Embedding caching for performance optimization',
      'Support for multiple embedding models',
      'Drift monitoring and embedding updates'
    ],
    useCases: ['semantic-search', 'multi-lingual-apps', 'intent-classification', 'knowledge-navigation', 'fuzzy-matching', 'contextual-routing', 'dynamic-tool-selection'],
    complexity: 'medium',
    example: 'Task: Build semantic FAQ routing system for multi-lingual support\n\nEmbedding-based Routing Implementation:\n\n1. Setup Phase:\n   • Load embedding model: all-MiniLM-L6-v2 (384-dim, trained on cosine similarity)\n   • Pre-compute route embeddings:\n     - "billing_issues" → [0.23, -0.15, 0.82, ...]\n     - "technical_support" → [0.45, 0.31, -0.22, ...]\n     - "account_management" → [-0.12, 0.67, 0.34, ...]\n   • Store in vector database (FAISS/Pinecone/ChromaDB)\n\n2. Query Processing: "Comment réinitialiser mon mot de passe?" (French)\n   • Generate query embedding: encode(query) → [0.41, 0.29, -0.18, ...]\n   • Normalize vectors for cosine similarity\n   • Time: 12ms on CPU, 3ms on GPU\n\n3. Similarity Calculation:\n   • cosine_sim(query, "billing_issues") = 0.42\n   • cosine_sim(query, "technical_support") = 0.89 ✓\n   • cosine_sim(query, "account_management") = 0.73\n   • Threshold check: 0.89 > 0.85 (minimum threshold)\n\n4. Route Selection:\n   • Primary match: technical_support (0.89)\n   • Confidence: HIGH (well above threshold)\n   • Fallback ready: account_management (0.73)\n   • Route to: password_reset_handler()\n\n5. Performance Analysis:\n   • Embedding generation: 12ms\n   • Similarity search: 2ms (with 1000 routes)\n   • Total routing time: 14ms\n   • Cache hit rate: 73% (common queries)\n   • Cross-lingual accuracy: 91%\n\nAdvanced Features:\n• Hierarchical routing with category embeddings\n• Dynamic threshold adjustment based on feedback\n• A/B testing different embedding models\n• Semantic drift detection and retraining triggers\n\nKey Insight: Same embedding model throughout + proper normalization + validated thresholds = reliable semantic routing'
  },
  {
    id: 'rule-based-routing',
    name: 'Rule-based Routing',
    abbr: 'RBR',
    icon: '📋',
    color: 'from-green-500 to-teal-600',
    category: 'routing',
    description: 'A deterministic routing system that uses predefined rules, conditions, and decision trees to direct queries to appropriate handlers, providing fast, predictable, and auditable routing decisions through if-else statements, switch cases, and pattern matching ideal for compliance-critical and latency-sensitive agentic AI systems',
    features: [
      'Deterministic if-else and switch case logic',
      'Pattern matching with regex and keywords',
      'Rule precedence and conflict resolution',
      'Configuration-driven rule management',
      'Ultra-low latency routing decisions (<5ms)',
      'Complete audit trail and traceability',
      'Version control for rule definitions',
      'Hybrid integration with AI fallbacks'
    ],
    useCases: ['compliance-workflows', 'priority-escalation', 'department-routing', 'load-distribution', 'regulated-industries', 'hybrid-orchestration', 'deterministic-paths'],
    complexity: 'low',
    example: 'Task: Build deterministic customer service routing with compliance requirements\n\nRule-based Routing Implementation:\n\n1. Rule Definition (YAML/JSON config):\n   rules:\n     - name: "security_escalation"\n       conditions:\n         - field: "category"\n           operator: "equals"\n           value: "security"\n         - field: "priority"\n           operator: "in"\n           value: ["critical", "high"]\n       action: route("security_team")\n       \n     - name: "billing_routing"\n       conditions:\n         - field: "keywords"\n           operator: "contains_any"\n           value: ["refund", "payment", "invoice", "charge"]\n       action: route("billing_department")\n       \n     - name: "vip_customer"\n       conditions:\n         - field: "customer_tier"\n           operator: "equals"\n           value: "platinum"\n       action: route("senior_support")\n\n2. Query Processing: "Critical security issue with payment system"\n   • Extract metadata: {category: "security", priority: "critical", keywords: ["security", "payment"]}\n   • Rule evaluation order: security_escalation → vip_customer → billing_routing\n\n3. Rule Matching:\n   ✓ Rule 1 (security_escalation): category="security" AND priority="critical" → TRUE\n   ○ Rule 2 (vip_customer): customer_tier check → FALSE (not platinum)\n   ○ Rule 3 (billing_routing): keywords contain "payment" → TRUE (but lower precedence)\n\n4. Routing Decision:\n   • Selected: security_escalation (highest priority match)\n   • Action: route("security_team")\n   • Audit log: {timestamp, rule_id, conditions_met, decision}\n   • Execution time: 2ms\n\n5. Performance Metrics:\n   • Decision latency: 2ms (P99: 4ms)\n   • Rule coverage: 94% (6% to AI fallback)\n   • Conflict rate: 0.2% (resolved by precedence)\n   • Maintenance: 3.5 rule changes/month\n   • Compliance: 100% traceable decisions\n\nHybrid Enhancement:\n• Known patterns: Rule-based (94% of queries)\n• Complex/ambiguous: AI fallback (6% of queries)\n• Best of both: Speed + flexibility\n\nKey Insight: Deterministic rules for predictable patterns + AI for edge cases = optimal balance'
  },
  {
    id: 'machine-learning-model-based-routing',
    name: 'Machine Learning Model-Based Routing',
    abbr: 'MLMR',
    icon: '🤖',
    color: 'from-orange-500 to-red-600',
    category: 'routing',
    description: 'A specialized routing approach that employs discriminative models (classifiers) fine-tuned on labeled data to make routing decisions, encoding routing logic directly in model weights rather than prompts, enabling sub-10ms inference for high-volume agentic AI systems requiring deterministic and explainable routing decisions',
    features: [
      'Supervised fine-tuning on domain-specific routing data',
      'Ultra-low latency inference (<10ms) without generation',
      'Routing logic encoded in model parameters',
      'Confidence scores and calibrated probabilities',
      'Synthetic data augmentation via LLMs',
      'Model drift detection and retraining triggers',
      'Explainable routing decisions via attention weights',
      'Integration with MLOps pipelines for continuous improvement'
    ],
    useCases: ['high-volume-routing', 'intent-classification', 'ticket-triage', 'language-detection', 'priority-scoring', 'department-assignment', 'real-time-systems'],
    complexity: 'high',
    example: 'Task: Build ML-powered customer support routing for 1M+ daily queries\n\nMachine Learning Model-Based Routing Implementation:\n\n1. Data Preparation:\n   • Collect 50K labeled support tickets with routing outcomes\n   • Generate 20K synthetic examples using GPT-4:\n     Prompt: "Generate customer support query for {category}"\n   • Balance classes: oversample minority, undersample majority\n   • Split: 70% train, 15% validation, 15% test\n   • Features: text, metadata, customer tier, history\n\n2. Model Architecture:\n   • Base: DistilBERT (66M params, 6 layers)\n   • Classification head: 768 → 256 → 5 classes\n   • Classes: [technical_L1, technical_L2, billing, sales, escalate]\n   • Training: AdamW, lr=2e-5, batch=32, epochs=3\n   • Hardware: 1x V100 GPU, training time: 45 minutes\n\n3. Query Processing: "My internet keeps disconnecting every hour"\n   • Tokenization: 8ms\n   • Inference: 6ms (ONNX optimized)\n   • Output logits: [3.2, 0.8, -1.5, -2.1, 0.3]\n   • Softmax probabilities: [0.89, 0.07, 0.01, 0.01, 0.02]\n   • Decision: technical_L1 (confidence: 0.89)\n\n4. Production Deployment:\n   • Model serving: TorchServe with ONNX Runtime\n   • Batch inference: 64 queries/batch\n   • Caching: 10-minute TTL for repeated queries\n   • Monitoring: Prometheus metrics + Grafana dashboards\n   • A/B test: 15% improvement over rule-based baseline\n\n5. Performance Metrics:\n   • Accuracy: 94.2% (test set)\n   • F1 Score: 0.93 (macro average)\n   • Latency: P50=8ms, P95=15ms, P99=22ms\n   • Throughput: 12,000 queries/second/GPU\n   • Cost: $0.0001 per 1000 queries\n   • Drift detection: KL divergence < 0.1\n\nContinuous Improvement:\n• Weekly retraining on new labeled data\n• Monthly synthetic data generation for edge cases\n• Quarterly architecture review (consider BERT variants)\n• Real-time monitoring of confidence distribution\n\nKey Insight: Pre-computed routing logic in model weights + optimized inference = millisecond decisions at scale'
  }
];