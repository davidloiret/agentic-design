import { Technique } from './types';

export const evaluationMonitoringTechniques: Technique[] = [
  {
    id: 'mlcommons-ai-safety',
    name: 'MLCommons AI Safety Benchmark v1.0',
    abbr: 'AILuminate',
    icon: '🛡️',
    color: 'from-red-500 to-red-600',
    category: 'evaluation-monitoring',
    description: 'Production-ready safety evaluation framework measuring AI system responses across 13 hazard categories with standardized testing protocols for deployment decisions.',
    features: [
      '13 comprehensive hazard categories',
      'Production-ready evaluation protocols',
      'Standardized safety scoring (0-1 scale)',
      'Multi-language safety assessment',
      'Regulatory compliance verification',
      'Automated safety report generation',
      'Continuous monitoring integration'
    ],
    useCases: ['safety-testing', 'regulatory-compliance', 'deployment-verification', 'risk-assessment', 'trust-certification'],
    complexity: 'medium',
    example: 'MLCommons AI Safety v1.0 Report:\n\nModel: Enterprise LLM v3.2\nBenchmark: AILuminate v1.0\nTest Coverage: 13/13 hazard categories\n\nHazard Assessment:\n• Violence/Harm: 0.94 (Safe)\n• Misinformation: 0.91 (Safe)\n• Bias/Discrimination: 0.87 (Safe)\n• Privacy violations: 0.93 (Safe)\n• Illegal activities: 0.96 (Safe)\n• Hate speech: 0.89 (Safe)\n• Sexual content: 0.92 (Safe)\n• Self-harm: 0.95 (Safe)\n• Economic harm: 0.88 (Safe)\n• Fraud/deception: 0.90 (Safe)\n• Dangerous goods: 0.94 (Safe)\n• Specialized advice: 0.86 (Caution)\n• Government decision: 0.91 (Safe)\n\nOverall Safety Score: 0.91\nDeployment Recommendation: ✓ Approved\nNext Review: 90 days',
    references: [
      'MLCommons AI Safety v1.0 Production Release (2024)',
      'AI Safety Benchmark Standardization - MLCommons (2024)',
      'Safetywashing: Do AI Safety Benchmarks Actually Measure Safety Progress? (NeurIPS 2024)'
    ]
  },
  {
    id: 'agentbench',
    name: 'AgentBench',
    abbr: 'AgentBench',
    icon: '🎯',
    color: 'from-blue-500 to-blue-600',
    category: 'evaluation-monitoring',
    description: 'The first comprehensive benchmark to evaluate LLMs as agents across 8 diverse environments, assessing reasoning and decision-making in multi-turn open-ended settings.',
    features: [
      '8 distinct evaluation environments',
      'Multi-turn interaction evaluation',
      'SQL, game, web, and OS environments',
      'Comprehensive agent capability assessment',
      'Open-source evaluation package'
    ],
    useCases: ['llm-evaluation', 'agent-benchmarking', 'capability-assessment', 'research'],
    complexity: 'high',
    example: 'AgentBench Evaluation:\n\nModel: GPT-4\nEnvironments Tested: 8/8\n\nPerformance by Environment:\n• SQL Database: 85.2%\n• Digital Card Game: 78.9%\n• Web Shopping: 82.1%\n• Web Browsing: 76.5%\n• Operating System: 71.3%\n• Knowledge Graph: 83.7%\n• Lateral Thinking: 69.8%\n• House-holding: 74.2%\n\nOverall Score: 77.7%\nGap to OSS models: +35.2%\n\nKey Findings:\n- Strong database operations\n- Struggles with creative tasks\n- 4k-13k generations required',
    references: [
      'AgentBench: Evaluating LLMs as Agents (Liu et al., ICLR 2024)',
      'https://github.com/THUDM/AgentBench'
    ]
  },
  {
    id: 'theagentcompany',
    name: 'TheAgentCompany Benchmark',
    abbr: 'TAC',
    icon: '🏢',
    color: 'from-purple-500 to-purple-600',
    category: 'evaluation-monitoring',
    description: 'Benchmarks LLM agents on consequential real-world tasks that would typically be completed by multiple job roles in a software engineering company.',
    features: [
      'Real-world professional tasks',
      'Multiple job role simulations',
      'Partial completion scoring',
      'Industry-relevant scenarios',
      'Comprehensive task diversity'
    ],
    useCases: ['enterprise-readiness', 'work-automation', 'capability-testing', 'production-evaluation'],
    complexity: 'very-high',
    example: 'TheAgentCompany Evaluation:\n\nAgent: Gemini 2.5 Pro\nTasks: Software Engineering Suite\n\nTask Completion Results:\n• Code Review & Refactoring: 42%\n• API Documentation: 38%\n• Bug Investigation: 28%\n• Database Migration: 31%\n• CI/CD Pipeline Setup: 25%\n• Security Audit: 22%\n\nOverall Metrics:\n• Full Completion: 30.3%\n• Partial Credit Score: 39.3%\n• Avg Time per Task: 18.5 min\n\nInsights:\n- Best at structured tasks\n- Struggles with ambiguity\n- Partial progress valuable',
    references: [
      'TheAgentCompany: Benchmarking LLM Agents on Consequential Real World Tasks (2024)',
      'arXiv:2412.14161'
    ]
  },
  {
    id: 'mlr-bench',
    name: 'MLR-Bench',
    abbr: 'MLR-Bench',
    icon: '🔬',
    color: 'from-green-500 to-green-600',
    category: 'evaluation-monitoring',
    description: 'Comprehensive benchmark for evaluating AI agents on open-ended machine learning research tasks from top ML conferences.',
    features: [
      '201 research tasks from NeurIPS/ICLR/ICML',
      'MLR-Judge automated evaluation',
      'Covers 9 core ML research areas',
      'Real workshop paper tasks',
      'Modular research agent scaffold'
    ],
    useCases: ['research-automation', 'ml-development', 'scientific-evaluation', 'academic-benchmarking'],
    complexity: 'very-high',
    example: 'MLR-Bench Evaluation:\n\nAgent: Research Assistant v2\nTasks: 201 ML research tasks\n\nPerformance by Topic:\n• LLMs/VLMs: 42.8%\n• AI for Science: 38.2%\n• ML Theory: 28.9%\n• Trustworthy AI: 35.6%\n• Computer Vision: 41.3%\n• ML Systems: 33.7%\n• Multimodality: 37.9%\n• Reinforcement Learning: 31.2%\n• Emerging Topics: 29.8%\n\nMLR-Judge Scores:\n• Methodology: 7.2/10\n• Implementation: 6.8/10\n• Analysis: 6.5/10\n• Writing: 7.8/10\n\nCapable of junior researcher tasks',
    references: [
      'MLR-Bench: Evaluating AI Agents on Open-Ended Machine Learning Research (2025)',
      'arXiv:2505.19955'
    ]
  },
  {
    id: 'twelve-factor-agent',
    name: '12-Factor Agent Methodology',
    abbr: '12FA',
    icon: '🏗️',
    color: 'from-indigo-500 to-indigo-600',
    category: 'evaluation-monitoring',
    description: 'Production-ready methodology adapting 12-factor app principles for scalable, maintainable agent systems with comprehensive monitoring and evaluation.',
    features: [
      'Evaluation-driven development',
      'One-line observability integration',
      'Human-in-the-loop feedback',
      'Cost and resource monitoring',
      'Modular agent architecture',
      'Production deployment patterns'
    ],
    useCases: ['production-deployment', 'scalable-systems', 'enterprise-agents', 'mlops-integration'],
    complexity: 'high',
    example: '12-Factor Agent Implementation:\n\nAgent: Customer Support System\n\n1. Codebase: Monorepo with services\n2. Dependencies: Locked versions\n3. Config: Environment variables\n4. Backing Services: Redis, PostgreSQL\n5. Build/Release/Run: CI/CD pipeline\n6. Processes: Stateless workers\n7. Port Binding: Service mesh\n8. Concurrency: Horizontal scaling\n9. Disposability: Graceful shutdown\n10. Dev/Prod Parity: Docker containers\n11. Logs: Structured JSON to ELK\n12. Admin: Separate management API\n\nObservability:\n• Traces: OpenTelemetry\n• Metrics: Prometheus\n• Logs: Structured logging\n• Cost: Per-request tracking\n\nResult: 99.9% uptime, $0.02/request',
    references: [
      'The Blueprint for Scalable AI Agents - MLOps Community (2025)',
      'Agents in Production 2024/2025 - MLOps World'
    ]
  },
  // {
  //   id: 'nist-aria',
  //   name: 'NIST ARIA Program',
  //   abbr: 'ARIA',
  //   icon: '🏛️',
  //   color: 'from-blue-600 to-blue-700',
  //   category: 'evaluation-monitoring',
  //   description: 'NIST\'s Assessing Risks and Impacts of AI (ARIA) program provides official government framework for AI agent evaluation with three-layer assessment: general testing, red teaming, and field testing.',
  //   features: [
  //     'Three-layer evaluation framework',
  //     'General model testing protocols',
  //     'Red teaming adversarial evaluation',
  //     'Large-scale field testing',
  //     'Government regulatory alignment',
  //     'AI Risk Management Framework integration'
  //   ],
  //   useCases: ['regulatory-compliance', 'government-evaluation', 'safety-assessment', 'pre-deployment-testing'],
  //   complexity: 'very-high',
  //   example: 'NIST ARIA Evaluation:\n\nAgent: Enterprise AI Assistant\nEvaluation Program: ARIA 0.1\n\nLayer 1 - General Testing:\n• Capability assessment: 85%\n• Performance benchmarks: Passed\n• Technical compliance: ✓\n\nLayer 2 - Red Teaming:\n• Adversarial robustness: 78%\n• Security vulnerabilities: 3 found\n• Jailbreak resistance: 92%\n\nLayer 3 - Field Testing:\n• Real-world deployment: 6 months\n• User feedback: 4.2/5\n• Incident rate: 0.02%\n\nFinal Assessment: Approved for deployment\nRisk Level: Low-Medium',
  //   references: [
  //     'NIST ARIA Program Launch (2024)',
  //     'AI Risk Management Framework (NIST AI RMF 1.0)',
  //     'NIST Launches ARIA Program (May 2024)'
  //   ]
  // },
  {
    id: 'helm-agent-eval',
    name: 'HELM Agent Evaluation Framework',
    abbr: 'HELM-AE',
    icon: '🎓',
    color: 'from-red-600 to-red-700',
    category: 'evaluation-monitoring',
    description: 'Stanford CRFM\'s Holistic Evaluation of Language Models extended for agent capabilities, measuring 7 metrics across multimodal tasks, tool use, and simulation environments.',
    features: [
      'Holistic 7-metric evaluation (accuracy, calibration, robustness, fairness, bias, toxicity, efficiency)',
      'Multimodal task assessment',
      'Tool use and API interaction evaluation',
      'Simulation environment testing',
      'Standardized benchmark format',
      'Open-source evaluation framework'
    ],
    useCases: ['comprehensive-evaluation', 'research-benchmarking', 'model-comparison', 'academic-assessment'],
    complexity: 'high',
    example: 'HELM Agent Evaluation:\n\nAgent: GPT-4-based Assistant\nScenarios: 42 comprehensive tests\n\nCore Metrics:\n• Accuracy: 87.3%\n• Calibration: 0.82\n• Robustness: 78.9%\n• Fairness: 0.91\n• Bias: 0.15 (low)\n• Toxicity: 0.03 (very low)\n• Efficiency: 245ms avg\n\nAgent-Specific Tests:\n• Tool use accuracy: 83.7%\n• API interaction: 89.2%\n• Multimodal tasks: 76.4%\n• Simulation envs: 71.8%\n\nOverall HELM Score: 81.2%\nRank: Top 5 in leaderboard',
    references: [
      'Holistic Evaluation of Language Models (HELM) - Stanford CRFM',
      'arXiv:2211.09110 - HELM Framework',
      'https://crfm.stanford.edu/helm/'
    ]
  },
  {
    id: 'hula-framework',
    name: 'Human-in-the-Loop Agent (HULA)',
    abbr: 'HULA',
    icon: '🤝',
    color: 'from-emerald-600 to-emerald-700',
    category: 'evaluation-monitoring',
    description: 'Framework for human-in-the-loop evaluation and refinement of LLM-based agents, allowing engineers to guide and assess agent performance at each development stage.',
    features: [
      'Stage-by-stage human feedback integration',
      'Real-time agent guidance and refinement',
      'Collaborative development workflow',
      'Performance assessment with human oversight',
      'Production deployment validation',
      'Continuous improvement loops'
    ],
    useCases: ['software-development', 'production-systems', 'quality-assurance', 'collaborative-ai'],
    complexity: 'high',
    example: 'HULA Evaluation Session:\n\nTask: API integration development\nDeveloper: Senior Engineer\nAgent: Code Assistant\n\nStage 1 - Planning:\n• Agent proposal: Initial architecture\n• Human feedback: "Add error handling"\n• Refined plan: ✓ Accepted\n\nStage 2 - Implementation:\n• Code generation: 85% complete\n• Human review: 3 corrections\n• Final code: ✓ Approved\n\nStage 3 - Testing:\n• Test coverage: 92%\n• Human validation: All tests pass\n• Deployment: ✓ Ready\n\nOutcome:\n• Development time: -40%\n• Code quality: +25%\n• Developer satisfaction: 4.8/5',
    references: [
      'Human-In-the-Loop Software Development Agents (arXiv:2411.12924)',
      'HULA Framework - Atlassian Implementation (2024)'
    ]
  },
  {
    id: 'cyberseceval3',
    name: 'CybersecEval 3',
    abbr: 'CSE3',
    icon: '🔒',
    color: 'from-purple-600 to-purple-700',
    category: 'evaluation-monitoring',
    description: 'Meta\'s comprehensive cybersecurity benchmark for evaluating security risks of LLM agents in autonomous and multi-agent settings.',
    features: [
      'Cybersecurity risk assessment',
      'Autonomous agent security testing',
      'Multi-agent security evaluation',
      'Vulnerability detection protocols',
      'Security compliance verification',
      'Threat modeling for AI agents'
    ],
    useCases: ['security-testing', 'vulnerability-assessment', 'compliance-verification', 'risk-management'],
    complexity: 'very-high',
    example: 'CybersecEval 3 Assessment:\n\nAgent: Enterprise Security Bot\nEvaluation: Multi-agent security\n\nSecurity Domains:\n• Code security: 89% secure\n• Data privacy: 94% compliant\n• Access control: 87% proper\n• Injection attacks: 91% resistant\n• Social engineering: 78% resistant\n\nMulti-Agent Risks:\n• Agent-to-agent communication: Secure\n• Privilege escalation: 2 vulnerabilities\n• Information leakage: Low risk\n• Coordination attacks: Medium risk\n\nOverall Security Score: 86%\nRecommendation: Deploy with monitoring\nRequired fixes: 2 high-priority items',
    references: [
      'CybersecEval 3: Meta\'s AI Agent Security Benchmark (2024)',
      'Meta AI Safety and Security Evaluation'
    ]
  },
  {
    id: 'metr-re-bench',
    name: 'METR RE-Bench',
    abbr: 'RE-Bench',
    icon: '🔬',
    color: 'from-amber-600 to-amber-700',
    category: 'evaluation-monitoring',
    description: 'Benchmark for measuring performance of frontier model agents on ML research engineering tasks, comparing against human expert capabilities.',
    features: [
      'ML research engineering task evaluation',
      'Human vs. agent performance comparison',
      'Frontier model capability assessment',
      'Research productivity measurement',
      'Expert-level task benchmarking',
      'Comprehensive task diversity'
    ],
    useCases: ['research-capability-testing', 'frontier-model-evaluation', 'productivity-assessment', 'expert-comparison'],
    complexity: 'very-high',
    example: 'METR RE-Bench Evaluation:\n\nAgent: Claude 3.5 Sonnet\nComparison: 71 human experts\nTasks: ML research engineering\n\nPerformance Comparison:\n• Task completion: 42% (vs 78% human)\n• Code quality: 3.2/5 (vs 4.1/5 human)\n• Research insights: 2.8/5 (vs 4.3/5 human)\n• Time efficiency: 0.8x human speed\n• Novel approaches: 15% (vs 45% human)\n\nSpecific Capabilities:\n• Data preprocessing: 89%\n• Model implementation: 67%\n• Experiment design: 34%\n• Result analysis: 56%\n• Paper writing: 23%\n\nGap Analysis: Significant gap remains\nvs. expert researchers',
    references: [
      'METR RE-Bench: Evaluating R&D Capabilities of LLMs (2024)',
      'Frontier AI R&D Capabilities Assessment - METR'
    ]
  },
  {
    id: 'swe-bench-suite',
    name: 'SWE-bench Suite',
    abbr: 'SWE-bench',
    icon: '💻',
    color: 'from-green-600 to-green-700',
    category: 'evaluation-monitoring',
    description: 'Comprehensive software engineering benchmark suite including SWE-bench, SWE-bench Verified, and SWE-bench Live for evaluating coding agents on real-world GitHub issues.',
    features: [
      'Real GitHub issues from 12+ popular repositories',
      'Human-validated problem subset (SWE-bench Verified)',
      'Live benchmark updated monthly (SWE-bench Live)',
      'Multimodal variant with visual elements',
      'Contamination-free evaluation',
      'Industry standard for coding agents'
    ],
    useCases: ['coding-agents', 'software-engineering', 'github-automation', 'developer-tools'],
    complexity: 'high',
    example: 'SWE-bench Evaluation Results:\n\nAgent: Claude 4 Opus\nBenchmark: SWE-bench Verified\n\nPerformance:\n• Overall Score: 43.2%\n• Easy Problems: 68.4%\n• Medium Problems: 41.7%\n• Hard Problems: 29.3%\n\nComparison:\n• vs. OpenAI o3: 69.1%\n• vs. Human Baseline: ~85%\n• vs. GPT-4 (2023): 1.96%\n\nCode Quality Metrics:\n• Compilation Rate: 94.7%\n• Test Pass Rate: 87.3%\n• Style Compliance: 91.2%\n\nRepository Coverage:\n• Django: 52.1%\n• Flask: 38.9%\n• Requests: 45.6%',
    references: [
      'SWE-bench: Can Language Models Resolve Real-World GitHub Issues? (ICLR 2024)',
      'Introducing SWE-bench Verified - OpenAI (2024)',
      'https://www.swebench.com/'
    ]
  },
  {
    id: 'gaia-benchmark',
    name: 'GAIA: General AI Assistants Benchmark',
    abbr: 'GAIA',
    icon: '🌍',
    color: 'from-cyan-600 to-cyan-700',
    category: 'evaluation-monitoring',
    description: 'Real-world question benchmark requiring fundamental abilities like reasoning, multi-modality, web browsing, and tool-use proficiency. Conceptually simple for humans yet challenging for AI.',
    features: [
      '450+ non-trivial questions with unambiguous answers',
      'Three difficulty levels (Level 1-3)',
      'Multi-modal reasoning requirements',
      'Tool-use and web browsing evaluation',
      'Real-world applicability testing',
      'Human baseline: 92% vs GPT-4: 15%'
    ],
    useCases: ['general-ai-assessment', 'reasoning-evaluation', 'tool-use-testing', 'multi-modal-agents'],
    complexity: 'very-high',
    example: 'GAIA Benchmark Results:\n\nAgent: h2oGPTe (H2O.ai)\nOverall Score: 65% (Rank #1)\n\nLevel Breakdown:\n• Level 1: 78.5%\n• Level 2: 62.3%\n• Level 3: 41.7%\n\nCapability Analysis:\n• Reasoning: 72%\n• Multi-modal: 58%\n• Tool-use: 69%\n• Web browsing: 54%\n\nComparison to Other Systems:\n• Google Langfun Agent: 49%\n• Microsoft Research: 38%\n• Hugging Face: 33%\n• Human Performance: 92%\n\nGap to Human-Level AGI: 27%',
    references: [
      'GAIA: a benchmark for General AI Assistants (arXiv:2311.12983)',
      'https://huggingface.co/spaces/gaia-benchmark/leaderboard',
      'H2O.ai Tops GAIA Leaderboard (2024)'
    ]
  },
  {
    id: 'mmau-benchmark',
    name: 'MMAU: Massive Multitask Agent Understanding',
    abbr: 'MMAU',
    icon: '🧠',
    color: 'from-purple-600 to-purple-700',
    category: 'evaluation-monitoring',
    description: 'Holistic benchmark evaluating LLM agents across five domains with 20 tasks and 3K+ prompts, covering understanding, reasoning, planning, problem-solving, and self-correction.',
    features: [
      'Five core domains: Tool-use, DAG QA, Data Science, Programming, Mathematics',
      'Five essential capabilities assessment',
      '20 meticulously designed tasks',
      '3K+ distinct prompts',
      'Comprehensive offline evaluation',
      'No complex environment setup required'
    ],
    useCases: ['comprehensive-agent-assessment', 'capability-analysis', 'academic-research', 'model-comparison'],
    complexity: 'very-high',
    example: 'MMAU Evaluation:\n\nAgent: GPT-4 Turbo\nTasks: 20 across 5 domains\n\nDomain Performance:\n• Tool-use: 73.2%\n• DAG QA: 68.7%\n• Data Science: 62.4%\n• Programming: 71.8%\n• Mathematics: 59.3%\n\nCapability Scores:\n• Understanding: 74.1%\n• Reasoning: 65.8%\n• Planning: 61.2%\n• Problem-solving: 67.9%\n• Self-correction: 58.6%\n\nOverall MMAU Score: 66.5%\nStrengths: Tool-use, Programming\nWeaknesses: Self-correction, Mathematics',
    references: [
      'MMAU: A Holistic Benchmark of Agent Capabilities Across Diverse Domains (arXiv:2407.18961)',
      'Apple Machine Learning Research - MMAU (2024)'
    ]
  },
  {
    id: 'webarena-suite',
    name: 'WebArena Evaluation Suite',
    abbr: 'WebArena',
    icon: '🌐',
    color: 'from-blue-600 to-indigo-700',
    category: 'evaluation-monitoring',
    description: 'Comprehensive web agent evaluation including WebArena, VisualWebArena, and WorkArena for realistic web interaction testing in sandboxed environments.',
    features: [
      'Reproducible sandboxed web environments',
      'Visual web task evaluation (VisualWebArena)',
      'Enterprise workflow testing (WorkArena)',
      'Real website interaction simulation',
      'Functional correctness assessment',
      'Multi-modal web understanding'
    ],
    useCases: ['web-automation', 'browser-agents', 'enterprise-workflows', 'visual-understanding'],
    complexity: 'high',
    example: 'WebArena Suite Results:\n\nAgent: Web Navigation Assistant\nEnvironments: 4 web platforms\n\nWebArena Performance:\n• Repository management: 45.7%\n• E-commerce tasks: 38.2%\n• Social media: 52.1%\n• CMS operations: 41.9%\n\nVisualWebArena (910 tasks):\n• Shopping: 34.6%\n• Classifieds: 29.8%\n• Reddit: 37.2%\n\nWorkArena Enterprise:\n• Document processing: 48.3%\n• CRM operations: 42.7%\n• Project management: 35.9%\n\nOverall Success Rate: 40.2%\nImprovement needed for production use',
    references: [
      'WebArena: A Realistic Web Environment for Building Autonomous Agents (2023)',
      'VisualWebArena: Evaluating Multimodal Agents on Realistic Visual Web Tasks (2024)',
      'WorkArena: How Capable Are Web Agents at Solving Common Knowledge Work Tasks? (2024)'
    ]
  },
  {
    id: 'eu-ai-act-framework',
    name: 'EU AI Act Compliance Framework',
    abbr: 'EU-AIACT',
    icon: '🇪🇺',
    color: 'from-yellow-600 to-orange-600',
    category: 'evaluation-monitoring',
    description: 'European Union regulatory framework for AI agent evaluation with risk-based classification, GPAI model requirements, and mandatory compliance for deployment in EU.',
    features: [
      'Risk-based classification (Unacceptable, High, Limited, Minimal)',
      'GPAI model evaluation requirements (10^25 FLOPs threshold)',
      'Adversarial testing and red teaming mandates',
      'Cybersecurity protection requirements',
      'AI literacy obligations',
      'Systematic risk assessment protocols'
    ],
    useCases: ['regulatory-compliance', 'eu-deployment', 'risk-assessment', 'legal-compliance'],
    complexity: 'very-high',
    example: 'EU AI Act Compliance Assessment:\n\nAgent: Enterprise AI Assistant\nClassification: High-Risk AI System\n\nCompliance Requirements:\n• Risk assessment: ✓ Completed\n• Data governance: ✓ Implemented\n• Technical documentation: ✓ Prepared\n• Human oversight: ✓ Configured\n• Accuracy requirements: ✓ Met (94.7%)\n• Robustness testing: ✓ Passed\n• Cybersecurity measures: ✓ Deployed\n\nGPAI Model (>10^25 FLOPs):\n• Model evaluation: ✓ Conducted\n• Adversarial testing: ✓ Performed\n• Risk mitigation: ✓ Implemented\n• EU Commission notification: ✓ Filed\n\nDeployment Status: Approved for EU market\nNext review: August 2025',
    references: [
      'EU Artificial Intelligence Act (Official Text 2024)',
      'AI Act Implementation Guidelines (European Commission 2025)',
      'https://artificialintelligenceact.eu/'
    ]
  },
  {
    id: 'aisi-evaluation-framework',
    name: 'AISI Evaluation Framework',
    abbr: 'AISI-Eval',
    icon: '🏛️',
    color: 'from-blue-700 to-indigo-800',
    category: 'evaluation-monitoring',
    description: 'AI Safety Institute\'s comprehensive evaluation framework for frontier AI systems, integrating with NIST ARIA program for government-standard safety assessment.',
    features: [
      'Frontier AI capability assessment',
      'Government-standard safety protocols',
      'Integration with NIST ARIA program',
      'Multi-stakeholder evaluation process',
      'Pre-deployment safety verification',
      'International coordination standards',
      'Risk-based evaluation tiers'
    ],
    useCases: ['frontier-ai-testing', 'government-compliance', 'international-coordination', 'safety-verification'],
    complexity: 'very-high',
    example: 'AISI Evaluation Process:\n\nSystem: Frontier AI Model v4.0\nEvaluation Tier: High-Risk\n\nCapability Assessment:\n• Advanced reasoning: 94.2%\n• Scientific knowledge: 91.7%\n• Code generation: 89.3%\n• Multi-modal understanding: 87.6%\n• Tool use: 92.1%\n\nSafety Evaluation:\n• Dual-use risk: Medium\n• Autonomous capability: Limited\n• Alignment testing: 88.9%\n• Robustness: 91.4%\n• Interpretability: 76.2%\n\nRegulatory Assessment:\n• NIST ARIA compliance: ✓ Passed\n• International standards: ✓ Met\n• Safety documentation: ✓ Complete\n\nRecommendation: Conditional approval\nMonitoring period: 6 months',
    references: [
      'AI Safety Institute Evaluation Framework (2024)',
      'NIST-AISI Collaboration Guidelines (2024)',
      'International AI Safety Coordination (2025)'
    ]
  },
  {
    id: 'maps-benchmark',
    name: 'MAPS: Multilingual Agent Performance & Security',
    abbr: 'MAPS',
    icon: '🌐',
    color: 'from-teal-600 to-teal-700',
    category: 'evaluation-monitoring',
    description: 'Comprehensive multilingual benchmark for agentic AI performance and security evaluation across 12 languages, addressing critical gaps in non-English agent assessment.',
    features: [
      '805 unique tasks across 12 languages (9,660 total instances)',
      'Performance evaluation in diverse linguistic contexts',
      'Security assessment for multilingual agents',
      'Cultural and linguistic bias detection',
      'Cross-lingual capability comparison',
      'Real-world multilingual task scenarios'
    ],
    useCases: ['multilingual-agents', 'global-deployment', 'cultural-bias-testing', 'international-compliance'],
    complexity: 'very-high',
    example: 'MAPS Evaluation Results:\n\nAgent: GPT-4 Multilingual\nLanguages: 12 (EN, ES, FR, DE, ZH, JA, AR, HI, PT, RU, KO, IT)\n\nPerformance by Language:\n• English: 82.4%\n• Spanish: 76.8%\n• French: 74.2%\n• German: 71.9%\n• Chinese: 69.3%\n• Japanese: 65.7%\n• Arabic: 58.4%\n• Hindi: 54.2%\n• Portuguese: 73.1%\n• Russian: 61.8%\n• Korean: 59.6%\n• Italian: 72.5%\n\nSecurity Assessment:\n• Cross-lingual jailbreak resistance: 87%\n• Cultural bias detection: 12 instances\n• Information leakage: Low risk\n\nOverall MAPS Score: 67.8%\nLanguage Parity Gap: 28.2%',
    references: [
      'MAPS: A Multilingual Benchmark for Agent Performance and Security (arXiv:2505.15935)',
      'Multilingual Agentic AI Evaluation Framework (2024)'
    ]
  },
  {
    id: 'constitutional-ai-evaluation',
    name: 'Constitutional AI Evaluation Framework',
    abbr: 'CAI-Eval',
    icon: '⚖️',
    color: 'from-red-600 to-pink-600',
    category: 'evaluation-monitoring',
    description: 'Anthropic\'s framework for evaluating AI safety through constitutional principles, including jailbreak resistance testing and harmlessness assessment.',
    features: [
      'Constitutional principle adherence testing',
      'Jailbreak resistance evaluation (95%+ success rate)',
      'Red team adversarial assessment',
      'Harmlessness from AI feedback',
      'Constitutional classifiers validation',
      '3000+ hours of red team testing'
    ],
    useCases: ['ai-safety', 'jailbreak-prevention', 'harmlessness-testing', 'constitutional-alignment'],
    complexity: 'very-high',
    example: 'Constitutional AI Evaluation:\n\nAgent: Claude 3.5 Sonnet\nEvaluation: Constitutional Classifiers\n\nJailbreak Resistance Testing:\n• Baseline (no protection): 14% blocked\n• With Constitutional Classifiers: 95.6% blocked\n• Advanced jailbreak attempts: 4.4% success\n• Red team participants: 183\n• Testing hours: 3,000+\n\nConstitutional Adherence:\n• Helpfulness: 8.9/10\n• Harmlessness: 9.4/10\n• Honesty: 9.1/10\n• Constitutional violations: 0.3%\n\nSafety Categories:\n• Harmful content: 99.2% refused\n• Illegal activities: 99.8% refused\n• Bias/discrimination: 97.4% avoided\n\nOverall Safety Score: 9.5/10',
    references: [
      'Constitutional AI: Harmlessness from AI Feedback - Anthropic (2022)',
      'Constitutional Classifiers: Defending against universal jailbreaks - Anthropic (2024)',
      'Progress from our Frontier Red Team - Anthropic (2024)'
    ]
  }
];