import { Technique } from './types';

export const reasoningTechniques: Technique[] = [
  {
    id: 'cot',
    name: 'Chain-of-Thought',
    abbr: 'CoT',
    icon: '🔗',
    color: 'from-blue-500 to-blue-600',
    category: 'reasoning-techniques',
    description: 'Breaks down complex problems into step-by-step intermediate reasoning steps',
    features: [
      'Decomposes complex problems into manageable sub-problems',
      'Provides transparent reasoning process',
      'Uses "think step by step" approach',
      'Foundation for advanced agent actions'
    ],
    useCases: ['complex-qa', 'math', 'planning', 'analysis'],
    complexity: 'low',
    example: 'Problem: "If a train travels 120 miles in 2 hours, and then 180 miles in 3 hours, what is its average speed?"\n\nCoT Response:\n1. First segment: 120 miles in 2 hours\n2. Second segment: 180 miles in 3 hours\n3. Total distance: 120 + 180 = 300 miles\n4. Total time: 2 + 3 = 5 hours\n5. Average speed: 300 ÷ 5 = 60 mph'
  },
  {
    id: 'tot',
    name: 'Tree-of-Thought',
    abbr: 'ToT',
    icon: '🌳',
    color: 'from-green-500 to-green-600',
    category: 'reasoning-techniques',
    description: 'Explores multiple reasoning paths through branching and backtracking',
    features: [
      'Tree structure for exploring alternatives',
      'Supports backtracking and revision',
      'Evaluates multiple solution paths',
      'Ideal for strategic planning and complex decisions'
    ],
    useCases: ['planning', 'complex-qa', 'creative', 'optimization'],
    complexity: 'high',
    example: 'Problem: "Plan a 3-day trip to Paris with a $1000 budget"\n\nToT Branches:\n├─ Budget-focused path\n│  ├─ Hostels + street food\n│  └─ Airbnb + cooking\n├─ Experience-focused path\n│  ├─ Mid-range hotel + restaurants\n│  └─ Budget hotel + select dining\n└─ Balanced path (selected)\n   ├─ Budget hotel\n   ├─ Mix of dining options\n   └─ Free/low-cost attractions'
  },
  {
    id: 'lrt',
    name: 'Latent Recurrent Thinking',
    abbr: 'LRT',
    icon: '🧠',
    color: 'from-violet-500 to-violet-600',
    category: 'reasoning-techniques',
    description: 'Iterative reasoning within continuous latent space without explicit token generation',
    features: [
      '60% reduction in computational overhead vs CoT',
      'Dynamic reasoning depth adjustment',
      'Parallel pathway exploration in latent space',
      'No intermediate token generation required',
      'Scales efficiently to trillion-parameter models',
      'Mimics human intuitive thinking processes'
    ],
    useCases: ['complex-math', 'scientific-reasoning', 'real-time-decisions', 'multimodal-analysis', 'autonomous-systems'],
    complexity: 'high',
    example: 'Problem: "Optimize supply chain for global logistics"\n\nLRT Process:\n• Encodes problem into latent representation\n• Iteratively refines solution space internally:\n  - Cycle 1: Initial constraint mapping\n  - Cycle 2: Resource optimization refinement\n  - Cycle 3: Risk factor integration\n  - Cycle 4: Cost-benefit convergence\n• Decodes optimized solution:\n  "Hub-spoke model with 3 regional centers,\n   predictive inventory management,\n   and 23% cost reduction through AI routing"\n\nAdvantages: No verbose intermediate steps,\nfaster inference, adaptive complexity'
  },
  {
    id: 'got',
    name: 'Graph-of-Thought',
    abbr: 'GoT',
    icon: '🕸️',
    color: 'from-emerald-500 to-teal-600',
    category: 'reasoning-techniques',
    description: 'Non-linear reasoning with thoughts as nodes and dependencies as edges',
    features: [
      'Non-linear thought exploration',
      'Thoughts as vertices, dependencies as edges',
      'Synergistic idea combination',
      'Feedback loops and backtracking',
      'Complex network distillation',
      'Superior to linear CoT for complex problems'
    ],
    useCases: ['creative-problem-solving', 'research-synthesis', 'strategic-planning', 'complex-analysis', 'innovation'],
    complexity: 'high',
    example: 'Problem: "Design sustainable city planning strategy"\n\nGoT Network:\n[Energy Systems] ←→ [Transportation]\n       ↓ influences     ↑ affects\n[Housing Policy] ←→ [Economic Zones]\n       ↓ connects       ↑ enables\n[Green Spaces] ←→ [Water Management]\n\nSynergistic Connections:\n• Solar + Electric Transit = Carbon neutral transport\n• Green Roofs + Water Collection = Urban farming\n• Mixed-use + Public Transit = Reduced commuting\n\nDistilled Solution: Integrated eco-districts with\nenergy-positive buildings, autonomous transit,\nand circular resource management'
  },
  {
    id: 'self-correction',
    name: 'Self-Correction',
    abbr: '',
    icon: '🔄',
    color: 'from-purple-500 to-purple-600',
    category: 'reasoning-techniques',
    description: 'Iteratively evaluates and refines generated content',
    features: [
      'Built-in quality control',
      'Identifies ambiguities and errors',
      'Iterative refinement process',
      'Enhances reliability and accuracy'
    ],
    useCases: ['content', 'code', 'analysis', 'creative'],
    complexity: 'medium',
    example: 'Initial Draft: "AI is good for business"\n\nSelf-Correction Process:\n1. Review: Too vague, lacks specifics\n2. Identify gaps: No examples, no metrics\n3. Revise: "AI enhances business operations through:\n   • 40% reduction in data processing time\n   • Automated customer service (24/7)\n   • Predictive analytics for inventory\n   • Personalized marketing campaigns"'
  },
  {
    id: 'palm',
    name: 'Program-Aided LMs',
    abbr: 'PALMs',
    icon: '💻',
    color: 'from-indigo-500 to-indigo-600',
    category: 'reasoning-techniques',
    description: 'Integrates code generation and execution for precise calculations',
    features: [
      'Generates executable code',
      'Deterministic computation',
      'Handles complex calculations',
      'Combines language and programming'
    ],
    useCases: ['math', 'data-analysis', 'scientific', 'financial'],
    complexity: 'medium',
    example: 'Question: "Calculate compound interest for $10,000 at 5% annually for 10 years"\n\nPALM generates:\n```python\nprincipal = 10000\nrate = 0.05\ntime = 10\namount = principal * (1 + rate) ** time\ninterest = amount - principal\nprint(f"Final amount: ${amount:.2f}")\nprint(f"Interest earned: ${interest:.2f}")\n```\nOutput: Final amount: $16,288.95\n        Interest earned: $6,288.95'
  },
  {
    id: 'react',
    name: 'ReAct',
    abbr: '',
    icon: '🎯',
    color: 'from-red-500 to-red-600',
    category: 'reasoning-techniques',
    description: 'Combines reasoning with acting through external tool use',
    features: [
      'Thought → Action → Observation loop',
      'Integrates external tools',
      'Dynamic strategy adaptation',
      'Real-time environmental feedback'
    ],
    useCases: ['research', 'complex-qa', 'automation', 'investigation'],
    complexity: 'high',
    example: 'Task: "Find the current CEO of OpenAI"\n\nReAct Process:\nThought: Need to search for current OpenAI leadership\nAction: search("OpenAI CEO 2024")\nObservation: Results show Sam Altman returned as CEO\nThought: Should verify with official source\nAction: fetch("openai.com/about")\nObservation: Confirmed Sam Altman as CEO\nThought: Have reliable answer\nAction: finish("Sam Altman is the current CEO of OpenAI")'
  },
  {
    id: 'cod',
    name: 'Chain of Debates',
    abbr: 'CoD',
    icon: '💬',
    color: 'from-yellow-500 to-yellow-600',
    category: 'reasoning-techniques',
    description: 'Multiple AI models collaborate and debate to reach conclusions',
    features: [
      'Multi-model collaboration',
      'Peer review mechanism',
      'Reduces individual bias',
      'Leverages collective intelligence'
    ],
    useCases: ['analysis', 'decision-making', 'review', 'validation'],
    complexity: 'high',
    example: 'Question: "Should a startup use microservices architecture?"\n\nModel A: "Yes, microservices provide scalability and independence"\nModel B: "No, too complex for startups with limited resources"\nModel C: "Depends on team size and growth projections"\n\nDebate Resolution:\n• For startups <10 developers: Monolithic recommended\n• For rapid scaling needs: Microservices beneficial\n• Hybrid approach: Start monolithic, plan for migration'
  },
  {
    id: 'god',
    name: 'Graph of Debates',
    abbr: 'GoD',
    icon: '🕸️',
    color: 'from-pink-500 to-pink-600',
    category: 'reasoning-techniques',
    description: 'Non-linear network of arguments with dynamic branching',
    features: [
      'Network structure of arguments',
      'Dynamic idea branching',
      'Relationship mapping',
      'Consensus through clustering'
    ],
    useCases: ['complex-analysis', 'research', 'policy', 'innovation'],
    complexity: 'high',
    example: 'Topic: "AI Regulation Strategy"\n\nGraph Structure:\n[Innovation] ←conflicts→ [Safety]\n     ↓ supports           ↑ supports\n[Economic Growth]    [Public Trust]\n     ↓ requires           ↑ requires\n[Investment] ←→ [Transparency]\n\nConsensus Cluster: Adaptive regulation framework'
  },
  {
    id: 'rlvr',
    name: 'RLVR',
    abbr: '',
    icon: '🧬',
    color: 'from-teal-500 to-teal-600',
    category: 'reasoning-techniques',
    description: 'Reinforcement Learning with Verifiable Rewards for extended reasoning',
    features: [
      'Variable thinking time allocation',
      'Extended reasoning chains',
      'Self-correction capabilities',
      'Trial-and-error learning'
    ],
    useCases: ['math', 'complex-qa', 'optimization', 'scientific'],
    complexity: 'high',
    example: 'Problem: "Find the 47th Fibonacci number"\n\nRLVR Process:\n• Allocates extended thinking time\n• Generates multiple solution attempts\n• Verifies against known Fibonacci properties\n• Self-corrects calculation errors\n• Optimizes approach through iterations\n• Final answer: 2,971,215,073'
  },
  {
    id: 'long-cot',
    name: 'Long Chain of Thought',
    abbr: 'Long CoT',
    icon: '🔗',
    color: 'from-blue-600 to-purple-600',
    category: 'reasoning-techniques',
    description: 'Extended reasoning chains with reinforcement learning optimization for complex problem solving',
    features: [
      'Extended reasoning sequences',
      'Reinforcement learning optimization',
      'Dynamic thinking time allocation',
      'Self-correction during reasoning',
      'Complex problem decomposition',
      'Multi-step verification'
    ],
    useCases: ['complex-math', 'research', 'strategic-analysis', 'scientific-reasoning', 'multi-step-planning'],
    complexity: 'high',
    example: 'Problem: "Design a sustainable urban transportation system"\n\nLong CoT Process:\n1. Extended Analysis Phase (30+ reasoning steps):\n   • Population density considerations\n   • Environmental impact assessment\n   • Economic feasibility analysis\n   • Technology integration options\n   • Social equity implications\n\n2. Self-Correction Cycles:\n   • Reviews initial assumptions\n   • Identifies logical gaps\n   • Refines solution approach\n   • Validates against constraints\n\n3. Multi-Modal Integration:\n   • Electric buses for main routes\n   • Bike-sharing networks\n   • Pedestrian-friendly zones\n   • Smart traffic management\n\nResult: Comprehensive 50-step reasoning chain leading to optimized transportation blueprint'
  },
  {
    id: 'neuro-symbolic-reasoning',
    name: 'Neuro-Symbolic Reasoning',
    abbr: 'NSR',
    icon: '🧬',
    color: 'from-cyan-500 to-blue-600',
    category: 'reasoning-techniques',
    description: 'Combines neural network learning with symbolic logic for hybrid reasoning capabilities',
    features: [
      'Neural-symbolic integration',
      'Logical constraint satisfaction',
      'Interpretable rule learning',
      'Symbolic knowledge injection',
      'Differentiable programming',
      'Compositional generalization'
    ],
    useCases: ['legal-reasoning', 'scientific-discovery', 'knowledge-graphs', 'formal-verification', 'expert-systems'],
    complexity: 'high',
    example: 'Legal Contract Analysis:\n\nNeural Component:\n• Learns patterns from 10,000+ contracts\n• Identifies clause types and relationships\n• Extracts key terms and obligations\n\nSymbolic Component:\n• Applies formal legal rules:\n  - "If consideration < $500 AND no written agreement THEN contract invalid"\n  - "If party A breaches THEN party B may terminate"\n• Ensures logical consistency\n• Provides formal proofs\n\nHybrid Reasoning:\n1. Neural: Extract "Payment due in 30 days"\n2. Symbolic: Apply rule "Payment > 30 days = breach"\n3. Conclusion: "Late payment constitutes breach with 95% confidence"\n\nAdvantages:\n• Combines learning flexibility with logical rigor\n• Interpretable reasoning chains\n• Guaranteed constraint satisfaction\n• Generalizes beyond training data'
  },
  {
    id: 'symbolic-program-synthesis',
    name: 'Symbolic Program Synthesis',
    abbr: 'SPS',
    icon: '⚙️',
    color: 'from-purple-500 to-indigo-600',
    category: 'reasoning-techniques',
    description: 'Automatically generates symbolic programs from examples and specifications',
    features: [
      'Program synthesis from examples',
      'Specification-driven generation',
      'Inductive programming',
      'Verification-guided synthesis',
      'Domain-specific languages',
      'Compositional program building'
    ],
    useCases: ['code-generation', 'automation-scripts', 'data-transformation', 'api-integration', 'workflow-automation'],
    complexity: 'high',
    example: 'Data Processing Task:\n\nInput Examples:\n• [1, 2, 3] → [2, 4, 6]\n• [5, 10, 15] → [10, 20, 30]\n• [0, 7, 14] → [0, 14, 28]\n\nSynthesis Process:\n1. Pattern Recognition: Each output = input × 2\n2. Program Generation:\n   ```python\n   def transform(lst):\n       return [x * 2 for x in lst]\n   ```\n3. Verification: Test against all examples ✓\n4. Generalization: Works for any numeric list\n\nComplex Example - Excel Formula:\nUser Intent: "Sum values where category = \'Sales\' and date > \'2024-01-01\'"\n\nSynthesized Formula:\n=SUMIFS(C:C, A:A, "Sales", B:B, ">2024-01-01")\n\nAdvantages:\n• Reduces programming effort by 80%\n• Generates bug-free code\n• Handles complex specifications\n• Enables non-programmers to automate tasks'
  },
  {
    id: 'hybrid-reasoning-fusion',
    name: 'Hybrid Reasoning Fusion',
    abbr: 'HRF',
    icon: '🔀',
    color: 'from-indigo-500 to-purple-600',
    category: 'reasoning-techniques',
    description: 'Seamlessly integrates multiple reasoning paradigms for optimal problem-solving',
    features: [
      'Multi-paradigm integration',
      'Dynamic reasoning selection',
      'Cross-paradigm knowledge transfer',
      'Confidence-weighted fusion',
      'Reasoning quality assessment',
      'Adaptive paradigm switching'
    ],
    useCases: ['complex-problem-solving', 'multi-domain-analysis', 'robust-decision-making', 'adaptive-systems'],
    complexity: 'high',
    example: 'Medical Diagnosis Challenge:\n\nProblem: "65-year-old patient with chest pain, elevated troponin, family history of heart disease"\n\nHybrid Reasoning Approach:\n\n1. Statistical Reasoning (40% weight):\n   • Age + symptoms = 78% cardiac event probability\n   • Troponin level = 85% myocardial infarction likelihood\n\n2. Symbolic Logic (30% weight):\n   • IF troponin > 0.04 AND chest_pain THEN probable_MI\n   • IF age > 60 AND family_history THEN increased_risk\n   • Logical conclusion: HIGH cardiac risk\n\n3. Case-Based Reasoning (20% weight):\n   • Similar case #1847: Outcome = MI, Treatment = immediate catheterization\n   • Similar case #2103: Outcome = stable angina, Treatment = medication\n   • Pattern match: 72% similarity to emergency cases\n\n4. Causal Reasoning (10% weight):\n   • Atherosclerosis → plaque rupture → vessel occlusion → tissue damage\n   • Troponin elevation indicates cellular damage\n\nFusion Result:\n• Confidence: 89% acute coronary syndrome\n• Recommendation: Immediate emergency intervention\n• Reasoning: Multi-paradigm consensus with high statistical and logical support\n\nAdvantages:\n• Robust conclusions from multiple perspectives\n• Handles uncertainty better than single approaches\n• Provides comprehensive reasoning justification\n• Adapts to available information types'
  },
];