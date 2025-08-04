import { Technique } from './types';

export const explorationDiscoveryTechniques: Technique[] = [
  {
    id: 'reinforcement-learning',
    name: 'Reinforcement Learning Exploration',
    abbr: 'RLE',
    icon: '🎮',
    color: 'from-blue-500 to-indigo-600',
    category: 'exploration-discovery',
    description: 'Learning optimal behavior through reward-based exploration and exploitation balance',
    features: [
      'Reward function optimization',
      'Exploration-exploitation balance',
      'Policy gradient methods',
      'Q-learning variants',
      'Multi-armed bandit solutions',
      'Continuous learning adaptation'
    ],
    useCases: ['recommendation-systems', 'automated-trading', 'game-playing', 'resource-optimization'],
    complexity: 'high',
    example: 'AI Content Recommendation System:\n\nEnvironment Setup:\n• State: User profile, content library, engagement history\n• Actions: Recommend content from 10,000+ items\n• Reward: User engagement (clicks, time spent, ratings)\n• Goal: Maximize long-term user satisfaction\n\nExploration Strategy:\n\n1. Epsilon-Greedy Approach:\n   • 80% Exploitation: Recommend known good content\n   • 20% Exploration: Try new/different content\n   • Adaptive epsilon: Reduce exploration over time\n   • User-specific: New users get more exploration\n\n2. Upper Confidence Bound (UCB):\n   • Balance mean reward with uncertainty\n   • Formula: μ + c√(ln(t)/n)\n   • Higher confidence → More exploration\n   • Proven content → Stable recommendations\n\n3. Thompson Sampling:\n   • Bayesian approach to exploration\n   • Sample from posterior distributions\n   • Natural exploration without hyperparameters\n   • Better for sparse reward scenarios\n\nLearning Process:\n\nWeek 1 (Cold Start):\n• High exploration (ε=0.4)\n• Random content sampling\n• Building user preference model\n• Engagement rate: 12%\n\nWeek 4 (Learning Phase):\n• Moderate exploration (ε=0.2)\n• Pattern recognition emerging\n• Personalization improving\n• Engagement rate: 28%\n\nWeek 12 (Optimization Phase):\n• Low exploration (ε=0.1)\n• Fine-tuned recommendations\n• Occasional novelty injection\n• Engagement rate: 45%\n\nAdvanced Techniques:\n\n1. Contextual Bandits:\n   • Context: Time, device, location, mood\n   • Action: Content recommendation\n   • Reward: Contextual engagement\n   • Learning: Context-aware policies\n\n2. Multi-Objective Optimization:\n   • Primary: User engagement\n   • Secondary: Content diversity\n   • Tertiary: Business objectives\n   • Balance: Pareto-optimal solutions\n\nResults:\n• User engagement: +340% vs random\n• Content discovery: +78% of catalog explored\n• User retention: +56% long-term\n• Revenue impact: +$2.8M annually'
  },
  {
    id: 'curiosity-driven-search',
    name: 'Curiosity-Driven Exploration',
    abbr: 'CDE',
    icon: '🔍',
    color: 'from-indigo-500 to-purple-600',
    category: 'exploration-discovery',
    description: 'Intrinsic motivation-based exploration that drives discovery of novel and surprising information',
    features: [
      'Intrinsic motivation modeling',
      'Novelty detection',
      'Surprise quantification',
      'Information gain maximization',
      'Uncertainty-based exploration',
      'Meta-learning capabilities'
    ],
    useCases: ['research-discovery', 'creative-exploration', 'scientific-discovery', 'knowledge-expansion'],
    complexity: 'high',
    example: 'Scientific Research Discovery Agent:\n\nCuriosity Framework:\n\n1. Information-Theoretic Curiosity:\n   • Measure: Mutual information between observations\n   • Drive: Seek observations that reduce uncertainty\n   • Example: "Why do these proteins fold differently?"\n   • Action: Design experiments to test hypotheses\n\n2. Prediction Error Curiosity:\n   • Measure: Difference between predicted and actual\n   • Drive: Investigate unexpected results\n   • Example: "Model predicted 80% accuracy, got 45%"\n   • Action: Analyze failure cases for insights\n\n3. Novelty-Based Curiosity:\n   • Measure: Distance from previously seen patterns\n   • Drive: Explore uncharted territories\n   • Example: "This molecular structure is unique"\n   • Action: Investigate properties and applications\n\nExploration Process:\n\nPhase 1: Hypothesis Generation\n• Current knowledge: Protein folding patterns\n• Curiosity trigger: Unusual folding in extreme temperatures\n• Questions generated: 15 testable hypotheses\n• Priority ranking: Information gain potential\n\nPhase 2: Experiment Design\n• Most curious question: "Heat shock protein behavior"\n• Experiment design: Temperature gradient analysis\n• Expected information gain: 2.3 bits\n• Resource cost: $12,000, 3 weeks\n\nPhase 3: Discovery Process\n• Unexpected result: Protein maintains stability\n• Surprise score: 8.7/10 (very unexpected)\n• New hypothesis: Novel stabilization mechanism\n• Follow-up curiosity: "What enables this stability?"\n\nPhase 4: Knowledge Integration\n• Discovery: New class of thermophilic proteins\n• Applications: Heat-resistant enzymes\n• Publication: 3 papers, 47 citations\n• Knowledge expansion: 23% increase in protein database\n\nCuriosity Metrics:\n\n1. Exploration Coverage:\n   • Research space explored: 34% increase\n   • Novel combinations tested: 156\n   • Unexpected discoveries: 12\n   • Knowledge gaps identified: 28\n\n2. Discovery Impact:\n   • Citation impact: +145% vs traditional research\n   • Novel insights: 8 breakthrough discoveries\n   • Patent applications: 5 filed\n   • Commercial applications: 3 developed\n\nAdaptive Curiosity:\n• Learning: Successful curiosity patterns\n• Adaptation: Focus on high-impact areas\n• Meta-learning: Better question generation\n• Collaboration: Share curiosity with other agents\n\nResults:\n• Research efficiency: 3x faster discovery\n• Innovation rate: +280% novel findings\n• Interdisciplinary connections: +150%\n• Scientific impact: Top 5% cited papers'
  },
  {
    id: 'multi-armed-bandits',
    name: 'Multi-Armed Bandit Optimization',
    abbr: 'MAB',
    icon: '🎰',
    color: 'from-purple-500 to-pink-600',
    category: 'exploration-discovery',
    description: 'Sequential decision-making under uncertainty with optimal exploration-exploitation trade-offs',
    features: [
      'Regret minimization',
      'Confidence bounds',
      'Bayesian optimization',
      'Contextual awareness',
      'Non-stationary adaptation',
      'Multi-objective handling'
    ],
    useCases: ['a-b-testing', 'ad-optimization', 'clinical-trials', 'resource-allocation'],
    complexity: 'medium',
    example: 'Dynamic Pricing Optimization:\n\nBandit Setup:\n• Arms: 8 different pricing strategies\n• Context: Customer segment, time, demand\n• Reward: Revenue per sale\n• Goal: Maximize total revenue\n• Constraint: Maintain customer satisfaction\n\nPricing Arms:\n1. Premium (+20%): $120\n2. Standard (baseline): $100\n3. Value (-10%): $90\n4. Discount (-20%): $80\n5. Dynamic (demand-based): $85-115\n6. Psychological ($99, $89): Variable\n7. Bundle offers: $180 for 2\n8. Subscription: $8/month\n\nBandit Algorithm: Contextual Thompson Sampling\n\nWeek 1 Results:\n• Exploration phase: Equal arm selection\n• Premium: 15% conversion, $18/customer\n• Standard: 25% conversion, $25/customer\n• Value: 35% conversion, $31.50/customer\n• Early leader: Value pricing\n\nWeek 4 Results:\n• Exploitation increasing\n• Context awareness: Segments respond differently\n• Enterprise customers: Premium performs best\n• Price-sensitive: Value pricing optimal\n• Impulse buyers: Psychological pricing wins\n\nContextual Insights:\n\n1. Customer Segments:\n   • Enterprise (20%): Premium strategy (+35% revenue)\n   • SMB (40%): Standard strategy (baseline)\n   • Individual (30%): Value strategy (+18% revenue)\n   • Students (10%): Discount strategy (+12% volume)\n\n2. Temporal Patterns:\n   • Monday-Wednesday: Higher price tolerance\n   • Thursday-Friday: Standard pricing optimal\n   • Weekends: Promotional pricing effective\n   • Month-end: Bundle offers convert better\n\n3. Demand-Based Adaptation:\n   • High demand: Premium pricing (+25% revenue)\n   • Normal demand: Standard pricing\n   • Low demand: Value pricing maintains volume\n   • Inventory clearing: Discount pricing\n\nAdvanced Features:\n\n1. Non-Stationary Environment:\n   • Market conditions change\n   • Competitor pricing adjustments\n   • Seasonal demand variations\n   • Algorithm adapts arm probabilities\n\n2. Multi-Objective Optimization:\n   • Primary: Revenue maximization\n   • Secondary: Customer satisfaction >4.0\n   • Tertiary: Market share growth\n   • Constraint: Legal pricing bounds\n\n3. Risk-Aware Exploration:\n   • Conservative exploration for key customers\n   • Aggressive exploration for new segments\n   • Gradual price changes to avoid shock\n   • Rollback mechanisms for poor performance\n\nResults (6 months):\n• Revenue increase: +23% vs fixed pricing\n• Customer satisfaction: 4.2/5.0 (maintained)\n• Market share: +8% growth\n• Pricing efficiency: 94% optimal decisions'
  },
  {
    id: 'evolutionary-algorithms',
    name: 'Evolutionary Discovery Algorithms',
    abbr: 'EDA',
    icon: '🧬',
    color: 'from-pink-500 to-red-600',
    category: 'exploration-discovery',
    description: 'Bio-inspired optimization that evolves solutions through selection, mutation, and crossover',
    features: [
      'Population-based search',
      'Genetic operators',
      'Fitness evaluation',
      'Diversity maintenance',
      'Multi-objective evolution',
      'Adaptive parameter control'
    ],
    useCases: ['neural-architecture-search', 'hyperparameter-optimization', 'creative-design', 'scheduling-optimization'],
    complexity: 'high',
    example: 'AI Model Architecture Evolution:\n\nEvolution Setup:\n• Objective: Find optimal neural network architecture\n• Population: 50 different architectures\n• Generations: 100 iterations\n• Fitness: Accuracy - 0.1×(Parameters/1M)\n• Constraints: <10M parameters, <100ms inference\n\nGenetic Representation:\n• Chromosome: [layers, neurons, activation, dropout]\n• Layer types: Dense, Conv2D, LSTM, Attention\n• Neuron counts: 16, 32, 64, 128, 256, 512\n• Activations: ReLU, Tanh, Swish, GELU\n• Dropout rates: 0.0, 0.1, 0.2, 0.3, 0.5\n\nGeneration 1 (Random Population):\n• Best fitness: 0.73 (78% accuracy, 5.2M params)\n• Average fitness: 0.45\n• Diversity: High (all random architectures)\n• Worst: 0.12 (overly complex, poor performance)\n\nGenetic Operations:\n\n1. Selection (Tournament, k=3):\n   • Select top 30% for reproduction\n   • Elite preservation: Keep top 5 unchanged\n   • Diversity bonus: Reward unique architectures\n\n2. Crossover (Uniform, p=0.8):\n   • Parent A: [4 layers, 128 neurons, ReLU, 0.2]\n   • Parent B: [6 layers, 64 neurons, Swish, 0.1]\n   • Child: [4 layers, 64 neurons, Swish, 0.2]\n\n3. Mutation (Gaussian, p=0.1):\n   • Layer count: ±1 with 10% probability\n   • Neuron count: Adjacent size with 15% probability\n   • Activation: Random change with 5% probability\n   • Dropout: ±0.1 with 10% probability\n\nGeneration 25 Results:\n• Best fitness: 0.89 (92% accuracy, 3.1M params)\n• Architecture: [5 layers, Conv2D+Attention+Dense]\n• Innovation: Attention mechanism emerged\n• Population convergence: 70% similar structures\n\nGeneration 50 Results:\n• Best fitness: 0.94 (96% accuracy, 2.8M params)\n• Architecture: Hybrid CNN-Transformer\n• Breakthrough: Skip connections discovered\n• Diversity maintenance: Introduced new mutations\n\nGeneration 100 (Final):\n• Best fitness: 0.97 (98.2% accuracy, 2.3M params)\n• Architecture: Optimized CNN-Transformer hybrid\n• Performance: 94ms inference time\n• Validation: Beats hand-designed architectures\n\nEvolutionary Insights:\n\n1. Emergent Patterns:\n   • Skip connections: Appeared in 85% of top solutions\n   • Attention mechanisms: Critical for performance\n   • Batch normalization: Universal adoption\n   • Optimal depth: 5-7 layers for this problem\n\n2. Trade-off Discovery:\n   • Accuracy vs Speed: Pareto frontier identified\n   • Complexity vs Generalization: Sweet spot found\n   • Memory vs Performance: Optimal configurations\n\n3. Unexpected Solutions:\n   • Asymmetric architectures outperformed symmetric\n   • Mixed precision training reduced parameters\n   • Ensemble emergence: Population diversity benefits\n\nResults:\n• Architecture search time: 3 days vs 6 months manual\n• Performance improvement: +15% vs best human design\n• Parameter efficiency: 60% fewer parameters\n• Novel architectural patterns: 3 publishable innovations'
  }
];