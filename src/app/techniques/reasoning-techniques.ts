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
    id: 'fot',
    name: 'Forest-of-Thoughts',
    abbr: 'FoT',
    icon: '🌲',
    color: 'from-emerald-500 to-green-600',
    category: 'reasoning-techniques',
    description: 'Generates multiple reasoning trees to enhance diversity and robustness',
    features: [
      'Multiple independent reasoning trees',
      'Enhanced solution diversity',
      'Robust error tolerance',
      'Parallel reasoning exploration',
      'Cross-tree validation',
      'Best path selection'
    ],
    useCases: ['complex-problem-solving', 'robust-decision-making', 'creative-reasoning', 'strategic-planning'],
    complexity: 'high',
    example: 'Problem: "Optimize supply chain resilience"\n\nForest Generation:\n\nTree 1 (Cost Focus):\n├─ Minimize transportation costs\n├─ Consolidate suppliers\n└─ Bulk ordering strategies\n\nTree 2 (Risk Focus):\n├─ Geographic diversification\n├─ Backup supplier networks\n└─ Real-time monitoring\n\nTree 3 (Speed Focus):\n├─ Regional distribution centers\n├─ Predictive inventory\n└─ Express logistics\n\nCross-Tree Synthesis:\nOptimal solution combines elements:\n• Multi-supplier strategy (Tree 2)\n• Regional hubs (Tree 3)\n• Smart inventory (Tree 1 + Tree 3)\n\nResult: 25% cost reduction with 40% improved resilience'
  },
  {
    id: 'metacognitive-monitoring',
    name: 'Metacognitive Monitoring',
    abbr: 'MCM',
    icon: '🧠',
    color: 'from-purple-500 to-indigo-600',
    category: 'reasoning-techniques',
    description: 'Self-awareness and monitoring of reasoning quality and confidence',
    features: [
      'Reasoning quality assessment',
      'Confidence estimation',
      'Knowledge gap detection',
      'Strategy effectiveness monitoring',
      'Adaptive reasoning adjustment',
      'Error anticipation'
    ],
    useCases: ['high-stakes-decisions', 'adaptive-reasoning', 'quality-control', 'educational-systems'],
    complexity: 'high',
    example: 'Medical Diagnosis Task:\n\nPatient: "Chest pain, shortness of breath"\n\nMetacognitive Process:\n\n1. Initial Assessment:\n   • Confidence: 60% (limited symptoms)\n   • Knowledge gaps: Medical history, vitals\n   • Strategy: Gather more information\n\n2. Information Gathering:\n   • Added: Age 45, smoker, family history\n   • Confidence: 85% (cardiac risk factors)\n   • Quality check: Consistent with protocols\n\n3. Differential Analysis:\n   • Primary: Acute coronary syndrome\n   • Secondary: Pulmonary embolism\n   • Confidence: 90% (strong evidence)\n\n4. Final Monitoring:\n   • Reasoning quality: High (evidence-based)\n   • Recommendation reliability: 95%\n   • Escalation needed: Yes (emergency care)\n\nMetacognitive Output:\n"High confidence diagnosis with strong evidence support. Recommend immediate medical attention."'
  },
  {
    id: 'test-time-compute',
    name: 'Test-Time Compute Scaling',
    abbr: 'TTC',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-600',
    category: 'reasoning-techniques',
    description: 'Dynamically allocates computational resources based on problem complexity',
    features: [
      'Dynamic compute allocation',
      'Complexity-aware scaling',
      'Adaptive thinking time',
      'Resource optimization',
      'Quality-compute trade-offs',
      'Real-time adjustment'
    ],
    useCases: ['complex-mathematics', 'research-analysis', 'optimization-problems', 'real-time-systems'],
    complexity: 'high',
    example: 'Mathematical Proof Challenge:\n\nProblem: "Prove Fermat\'s Last Theorem for n=3"\n\nCompute Scaling Process:\n\n1. Complexity Assessment:\n   • Problem type: Mathematical proof\n   • Difficulty: Very high\n   • Allocated compute: 10x standard\n\n2. Iterative Reasoning (Extended):\n   • Phase 1: Historical approach analysis (2x compute)\n   • Phase 2: Elliptic curve exploration (4x compute)\n   • Phase 3: Modular forms investigation (6x compute)\n   • Phase 4: Proof verification (10x compute)\n\n3. Quality Monitoring:\n   • Step validation at each phase\n   • Logical consistency checks\n   • Mathematical rigor assessment\n\n4. Adaptive Adjustment:\n   • Detected complexity increase\n   • Scaled to 15x compute\n   • Extended reasoning depth\n\nResult: Complete proof with 99.8% confidence\nCompute efficiency: 3x better than fixed allocation'
  },
  {
    id: 'reflective-mcts',
    name: 'Reflective Monte Carlo Tree Search',
    abbr: 'R-MCTS',
    icon: '🎯',
    color: 'from-red-500 to-pink-600',
    category: 'reasoning-techniques',
    description: 'Enhanced MCTS with contrastive reflection for improved exploration',
    features: [
      'Contrastive reflection mechanism',
      'Enhanced exploration strategies',
      'Self-improving search',
      'Quality-guided tree expansion',
      'Adaptive selection policies',
      '6-30% performance improvement'
    ],
    useCases: ['strategic-planning', 'game-playing', 'optimization', 'decision-making'],
    complexity: 'high',
    example: 'Strategic Business Planning:\n\nObjective: "Enter new market segment"\n\nR-MCTS Process:\n\n1. Tree Construction:\n   ├─ Market Research\n   │  ├─ Competitor analysis\n   │  └─ Customer surveys\n   ├─ Product Development\n   │  ├─ MVP strategy\n   │  └─ Full product launch\n   └─ Partnership Strategy\n      ├─ Strategic alliances\n      └─ Acquisition targets\n\n2. Reflective Analysis:\n   • Contrast successful vs. failed strategies\n   • Identify key success factors\n   • Update exploration priorities\n\n3. Enhanced Selection:\n   • Weighted by reflection insights\n   • Focus on high-potential paths\n   • Avoid previously failed approaches\n\n4. Iterative Improvement:\n   • 15 exploration cycles\n   • Continuous strategy refinement\n   • Quality-guided expansion\n\nResult: Optimal market entry strategy\nConfidence: 92% (validated against 50+ scenarios)\nImprovement: 30% better than standard MCTS'
  },
  {
    id: 'least-to-most',
    name: 'Least-to-Most Prompting',
    abbr: 'LtM',
    icon: '🔢',
    color: 'from-green-500 to-emerald-600',
    category: 'reasoning-techniques',
    description: 'Progressive problem decomposition from simple to complex components',
    features: [
      'Hierarchical problem breakdown',
      'Bottom-up solution building',
      'Progressive complexity handling',
      'Builds on simpler solutions',
      'Reduces cognitive load',
      'Systematic approach to complex problems'
    ],
    useCases: ['mathematical-problems', 'programming-tasks', 'complex-analysis', 'educational-content'],
    complexity: 'medium',
    example: 'Problem: "Calculate the total cost of carpeting a house with 5 rooms of different sizes"\n\nLeast-to-Most Decomposition:\n\n1. Simplest Component:\n   • Calculate area of one rectangular room\n   • Room 1: 12ft × 10ft = 120 sq ft\n\n2. Add Complexity:\n   • Calculate multiple rectangular rooms\n   • Room 2: 15ft × 12ft = 180 sq ft\n   • Room 3: 10ft × 10ft = 100 sq ft\n\n3. Handle Irregular Shapes:\n   • Room 4 (L-shaped): Break into rectangles\n   • Section A: 8ft × 6ft = 48 sq ft\n   • Section B: 4ft × 5ft = 20 sq ft\n   • Total: 68 sq ft\n\n4. Most Complex:\n   • Room 5 (curved wall): Use approximation\n   • Treat as rectangle with adjustment: 14ft × 11ft × 0.9 = 138 sq ft\n\n5. Final Integration:\n   • Total area: 120 + 180 + 100 + 68 + 138 = 606 sq ft\n   • Cost: 606 × $4.50/sq ft = $2,727\n\nAdvantage: Each step builds on previous, making complex calculation manageable'
  },
  {
    id: 'analogical-reasoning',
    name: 'Analogical Reasoning',
    abbr: 'AR',
    icon: '🔄',
    color: 'from-orange-500 to-red-600',
    category: 'reasoning-techniques',
    description: 'Solves problems by finding and applying similar patterns from known domains',
    features: [
      'Pattern recognition across domains',
      'Knowledge transfer from familiar contexts',
      'Structural similarity mapping',
      'Creative problem-solving',
      'Learning from examples',
      'Cross-domain insight generation'
    ],
    useCases: ['creative-problem-solving', 'innovation', 'learning', 'design-thinking'],
    complexity: 'medium',
    example: 'Problem: "Design an efficient customer service system for a growing startup"\n\nAnalogical Reasoning Process:\n\n1. Identify Source Domain:\n   • Restaurant service system (familiar domain)\n   • Host greets → Server takes order → Kitchen prepares → Server delivers\n\n2. Map Structural Elements:\n   • Host = Initial contact/chatbot\n   • Server = Customer service representative\n   • Kitchen = Technical support/solutions team\n   • Delivery = Problem resolution\n\n3. Apply Analogical Insights:\n   • Queue management (like restaurant waiting)\n   • Triage system (different servers for different needs)\n   • Kitchen ticket system → Support ticket system\n   • Quality checks before delivery → Solution validation\n\n4. Adapt to Target Domain:\n   • Chatbot handles initial screening\n   • Tier 1 support for common issues\n   • Specialized teams for complex problems\n   • Follow-up system for satisfaction\n\n5. Novel Insights from Analogy:\n   • Peak hour staffing patterns\n   • Cross-training for flexibility\n   • Customer feedback loop (like restaurant reviews)\n\nResult: Efficient multi-tier support system inspired by restaurant operations'
  },
  {
    id: 'causal-reasoning',
    name: 'Causal Reasoning',
    abbr: 'CR',
    icon: '⚡',
    color: 'from-blue-500 to-purple-600',
    category: 'reasoning-techniques',
    description: 'Establishes and follows explicit cause-and-effect relationships',
    features: [
      'Cause-and-effect chain construction',
      'Root cause identification',
      'Intervention planning',
      'Counterfactual thinking',
      'Temporal relationship modeling',
      'Mechanism understanding'
    ],
    useCases: ['problem-diagnosis', 'strategic-planning', 'risk-assessment', 'decision-making'],
    complexity: 'high',
    example: 'Problem: "Company sales dropped 30% last quarter - identify causes and solutions"\n\nCausal Reasoning Chain:\n\n1. Direct Observation:\n   • Effect: 30% sales decrease\n   • Timeline: Last quarter (specific period)\n\n2. Immediate Causes (Level 1):\n   • Fewer customer inquiries (-40%)\n   • Lower conversion rate (25% → 18%)\n   • Reduced average order value ($500 → $420)\n\n3. Root Causes (Level 2):\n   • Marketing budget cut by 50% → Fewer inquiries\n   • New competitor launched → Price pressure\n   • Key salesperson left → Lower conversion\n   • Economic uncertainty → Smaller orders\n\n4. Underlying Mechanisms (Level 3):\n   • Budget cuts due to investor pressure\n   • Competitor offering 20% lower prices\n   • No knowledge transfer when salesperson left\n   • Inflation affecting customer budgets\n\n5. Causal Intervention Strategy:\n   • Immediate: Targeted marketing to high-value segments\n   • Short-term: Sales training for remaining team\n   • Medium-term: Value proposition differentiation\n   • Long-term: Operational efficiency to compete on price\n\nResult: Systematic intervention plan addressing root causes, not just symptoms'
  },
  {
    id: 'abductive-reasoning',
    name: 'Abductive Reasoning',
    abbr: 'ABR',
    icon: '🔍',
    color: 'from-indigo-500 to-blue-600',
    category: 'reasoning-techniques',
    description: 'Infers the most likely explanation from incomplete observations',
    features: [
      'Best explanation inference',
      'Hypothesis generation',
      'Evidence-based reasoning',
      'Uncertainty handling',
      'Pattern completion',
      'Diagnostic reasoning'
    ],
    useCases: ['diagnosis', 'investigation', 'research', 'troubleshooting'],
    complexity: 'high',
    example: 'Problem: "Website traffic dropped 60% overnight - what happened?"\n\nAbductive Reasoning Process:\n\n1. Observations:\n   • Traffic drop: 60% decrease overnight\n   • Time: Started at 2:15 AM EST\n   • Geographic: All regions affected equally\n   • Device types: Mobile and desktop both affected\n\n2. Generate Hypotheses:\n   • H1: Server crash/technical failure\n   • H2: Search engine penalty\n   • H3: Major competitor launched\n   • H4: External link/referral source removed\n   • H5: DNS/hosting provider issue\n\n3. Evaluate Against Evidence:\n   • H1: Server logs show 99.9% uptime ❌\n   • H2: Search rankings unchanged ❌\n   • H3: Competitor analysis shows no major launches ❌\n   • H4: Referral traffic from major source disappeared ✓\n   • H5: DNS resolution working normally ❌\n\n4. Most Likely Explanation:\n   • Primary hypothesis: Major referral source removed links\n   • Supporting evidence: 65% of traffic historically from one news site\n   • Verification: Check if article with backlinks was removed\n\n5. Validation:\n   • Contacted news site: Confirmed article deletion due to policy change\n   • Timeline matches: Article removed at 2:10 AM EST\n\nResult: Identified root cause (external link removal) enabling targeted recovery strategy'
  },
  {
    id: 'step-back-prompting',
    name: 'Step-Back Prompting',
    abbr: 'SBP',
    icon: '↩️',
    color: 'from-emerald-500 to-teal-600',
    category: 'reasoning-techniques',
    description: 'Abstracts to higher-level principles before tackling specific problems',
    features: [
      'High-level abstraction first',
      'Principle-based reasoning',
      'Conceptual framework establishment',
      'Reduces getting lost in details',
      'Improved reasoning accuracy',
      'Strategic thinking approach'
    ],
    useCases: ['complex-problem-solving', 'strategic-analysis', 'research', 'education'],
    complexity: 'medium',
    example: 'Problem: "Should our startup pivot from B2B to B2C?"\n\nStep-Back Prompting Process:\n\n1. Step Back to High-Level Question:\n   Original: "Should we pivot from B2B to B2C?"\n   Step-back: "What fundamental factors determine successful business model selection?"\n\n2. Establish General Principles:\n   • Market size and growth potential\n   • Team competencies and experience\n   • Resource requirements and availability\n   • Customer acquisition costs and lifetime value\n   • Competitive landscape dynamics\n   • Revenue model sustainability\n\n3. Apply Principles to Current Situation:\n   Market Analysis:\n   • B2B: $2B market, 15% growth, 200 competitors\n   • B2C: $15B market, 8% growth, 2000+ competitors\n   \n   Team Fit:\n   • Strong enterprise sales experience\n   • Limited consumer marketing expertise\n   • Technical product suited for business needs\n   \n   Economics:\n   • B2B: $50K LTV, $5K CAC (10:1 ratio)\n   • B2C: $200 LTV, $40 CAC (5:1 ratio)\n\n4. Synthesize Decision:\n   • Principles favor B2B: better team fit, superior unit economics\n   • B2C has larger market but higher competition and worse fit\n   • Recommendation: Stay B2B, optimize current model\n\nResult: Principled decision based on fundamental business factors, not surface-level trends'
  },
  {
    id: 'buffer-of-thoughts',
    name: 'Buffer of Thoughts',
    abbr: 'BoT',
    icon: '📊',
    color: 'from-violet-500 to-purple-600',
    category: 'reasoning-techniques',
    description: 'Maintains a dynamic buffer of reusable thought patterns for analogical reasoning',
    features: [
      'Meta-buffer of problem-solving strategies',
      'Analogical pattern matching',
      'Reusable thought templates',
      'Cross-problem knowledge transfer',
      'Continuous buffer updating',
      '15-30% accuracy improvement'
    ],
    useCases: ['complex-problem-solving', 'strategic-planning', 'innovation', 'knowledge-work'],
    complexity: 'high',
    example: 'Problem: "Optimize remote team productivity"\n\nBuffer of Thoughts Process:\n\n1. Query Buffer for Similar Patterns:\n   • Manufacturing efficiency optimization\n   • Sports team coordination\n   • Orchestra performance management\n   • Military unit coordination\n\n2. Extract Relevant Thought Patterns:\n   \n   From Manufacturing:\n   • Standardized processes reduce variation\n   • Clear metrics enable optimization\n   • Regular check-ins prevent quality drift\n   \n   From Sports Teams:\n   • Role clarity prevents overlap/gaps\n   • Practice sessions build coordination\n   • Game film review improves performance\n   \n   From Orchestra:\n   • Shared timing reference (conductor/metronome)\n   • Individual excellence + collective harmony\n   • Regular ensemble practice essential\n\n3. Adapt Patterns to Current Problem:\n   • Standardized processes → Daily standups, templates\n   • Clear metrics → Productivity dashboards, KPIs\n   • Regular check-ins → Weekly retrospectives\n   • Role clarity → RACI matrices, job descriptions\n   • Practice sessions → Team collaboration exercises\n   • Shared timing → Synchronized meeting schedules\n\n4. Synthesize Novel Solution:\n   • Implement "Remote Team Operating System"\n   • Daily coordination (like conductor)\n   • Weekly skill building (like practice)\n   • Monthly performance review (like game film)\n   • Standardized tools and processes\n\n5. Update Buffer with New Insights:\n   • Add "Remote team coordination" pattern\n   • Link to manufacturing, sports, orchestra patterns\n   • Store for future similar problems\n\nResult: 25% productivity improvement using analogical insights from diverse domains'
  },
  {
    id: 'skeleton-of-thoughts',
    name: 'Skeleton of Thoughts',
    abbr: 'SoT',
    icon: '🦴',
    color: 'from-gray-500 to-slate-600',
    category: 'reasoning-techniques',
    description: 'Creates structured yet adaptable reasoning frameworks that can be filled with specific details',
    features: [
      'Flexible reasoning scaffolds',
      'Structured yet adaptable outlines',
      'Reusable problem-solving templates',
      'Supports creative reasoning',
      'Efficient knowledge organization',
      'Guided but not rigid thinking'
    ],
    useCases: ['creative-problem-solving', 'content-creation', 'strategic-planning', 'research'],
    complexity: 'medium',
    example: 'Problem: "Launch a new product in competitive market"\n\nSkeleton of Thoughts Framework:\n\n1. Create Reasoning Skeleton:\n   ```\n   Product Launch Framework:\n   ├─ Market Analysis\n   │  ├─ [Competitive landscape]\n   │  ├─ [Customer needs]\n   │  └─ [Market timing]\n   ├─ Product Positioning\n   │  ├─ [Unique value proposition]\n   │  ├─ [Target segments]\n   │  └─ [Differentiation strategy]\n   ├─ Go-to-Market Strategy\n   │  ├─ [Marketing channels]\n   │  ├─ [Pricing strategy]\n   │  └─ [Sales approach]\n   └─ Success Metrics\n      ├─ [Leading indicators]\n      ├─ [Lagging indicators]\n      └─ [Contingency plans]\n   ```\n\n2. Fill Skeleton with Specific Details:\n   Market Analysis:\n   • Competitive landscape: 5 major players, fragmented market\n   • Customer needs: 67% want mobile-first solution\n   • Market timing: COVID accelerated digital adoption\n   \n   Product Positioning:\n   • UVP: "Only mobile-native solution with offline capability"\n   • Target: Remote workers in developing markets\n   • Differentiation: Superior offline functionality\n   \n   Go-to-Market:\n   • Channels: Content marketing, partnership program\n   • Pricing: Freemium with $29/month premium tier\n   • Sales: Product-led growth with inside sales support\n\n3. Adaptive Framework Benefits:\n   • Structure prevents missing key considerations\n   • Flexibility allows creative solutions within framework\n   • Reusable for future product launches\n   • Guides thinking without constraining innovation\n\nResult: Comprehensive launch strategy with 40% faster planning through structured approach'
  },
];