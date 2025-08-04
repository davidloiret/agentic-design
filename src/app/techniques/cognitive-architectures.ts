import { Technique } from './types';

export const cognitiveArchitecturesTechniques: Technique[] = [
  {
    id: 'domain-reasoning',
    name: 'Domain-Specific Reasoning',
    abbr: 'DSR',
    icon: '🎓',
    color: 'from-purple-500 to-indigo-600',
    category: 'cognitive-architectures',
    description: 'Specialized reasoning frameworks tailored to specific domains with expert knowledge integration',
    features: [
      'Domain-specific knowledge modeling',
      'Expert rule integration',
      'Specialized inference engines',
      'Context-aware reasoning',
      'Domain vocabulary handling',
      'Professional expertise simulation'
    ],
    useCases: ['medical-diagnosis', 'legal-analysis', 'engineering-design', 'financial-modeling'],
    complexity: 'high',
    example: 'Medical Diagnosis System:\n\nDomain Knowledge:\n• Symptom-disease relationships\n• Drug interactions database\n• Treatment protocols\n• Diagnostic criteria\n\nReasoning Process:\n1. Symptom Analysis:\n   - Input: "chest pain, shortness of breath"\n   - Apply cardiology rules\n   - Consider patient history\n\n2. Differential Diagnosis:\n   - Rule out: Heart attack (70% probability)\n   - Consider: Angina (20%), Anxiety (10%)\n   - Apply age/gender factors\n\n3. Test Recommendations:\n   - ECG (immediate)\n   - Cardiac enzymes\n   - Chest X-ray\n\n4. Treatment Protocol:\n   - If confirmed MI: Emergency protocol\n   - Monitor vital signs\n   - Medication contraindications check\n\nResult: 95% diagnostic accuracy with explanation of reasoning chain and confidence levels for each step.'
  },
  {
    id: 'cognitive-pipelines',
    name: 'Cognitive Processing Pipelines',
    abbr: 'CPP',
    icon: '🧠',
    color: 'from-indigo-500 to-blue-600',
    category: 'cognitive-architectures',
    description: 'Sequential cognitive processing stages that mimic human thinking patterns and mental models',
    features: [
      'Multi-stage processing',
      'Working memory simulation',
      'Attention mechanisms',
      'Cognitive load management',
      'Mental model construction',
      'Metacognitive monitoring'
    ],
    useCases: ['problem-solving', 'learning-systems', 'decision-support', 'cognitive-simulation'],
    complexity: 'high',
    example: 'Complex Problem Solving Pipeline:\n\nStage 1: Problem Comprehension\n• Parse problem statement\n• Identify key variables and constraints\n• Activate relevant knowledge schemas\n• Working memory load: 3/7 items\n\nStage 2: Mental Model Construction\n• Build internal representation\n• Map relationships between elements\n• Generate initial hypotheses\n• Attention focus: Problem structure\n\nStage 3: Solution Generation\n• Apply relevant strategies\n• Generate multiple approaches\n• Evaluate feasibility of each\n• Working memory: Solutions + constraints\n\nStage 4: Solution Evaluation\n• Test solutions against constraints\n• Estimate success probability\n• Consider implementation complexity\n• Metacognitive assessment: "Am I on track?"\n\nStage 5: Solution Refinement\n• Optimize selected approach\n• Handle edge cases\n• Plan implementation steps\n• Final coherence check\n\nCognitive Monitoring:\n• Track mental effort expenditure\n• Manage attention allocation\n• Monitor working memory capacity\n• Adjust processing depth dynamically'
  },
  {
    id: 'hybrid-reasoning',
    name: 'Hybrid Reasoning Systems',
    abbr: 'HRS',
    icon: '⚖️',
    color: 'from-blue-500 to-cyan-600',
    category: 'cognitive-architectures',
    description: 'Integration of symbolic logic with neural processing for robust reasoning capabilities',
    features: [
      'Symbolic-neural integration',
      'Logic rule enforcement',
      'Pattern recognition fusion',
      'Uncertainty handling',
      'Explainable decisions',
      'Knowledge grounding'
    ],
    useCases: ['expert-systems', 'automated-reasoning', 'knowledge-integration', 'decision-support'],
    complexity: 'high',
    example: 'Legal Case Analysis System:\n\nSymbolic Component:\n• Legal precedent database\n• Statutory rules and regulations\n• Case law relationships\n• Logical inference engine\n\nNeural Component:\n• Document similarity analysis\n• Natural language understanding\n• Pattern recognition in cases\n• Outcome probability estimation\n\nHybrid Integration Process:\n\n1. Case Input Analysis:\n   • Neural: Extract key facts from documents\n   • Symbolic: Map facts to legal concepts\n   • Result: Structured case representation\n\n2. Precedent Matching:\n   • Neural: Semantic similarity to past cases\n   • Symbolic: Exact rule matching\n   • Fusion: Weighted relevance scores\n\n3. Legal Reasoning:\n   • Symbolic: Apply legal rules strictly\n   • Neural: Consider contextual factors\n   • Integration: Balanced judgment\n\n4. Outcome Prediction:\n   • Neural: Statistical likelihood based on patterns\n   • Symbolic: Rule-based deterministic outcomes\n   • Hybrid: Confidence-weighted predictions\n\nAdvantages:\n• Neural flexibility + Symbolic precision\n• Explainable reasoning chains\n• Robust handling of edge cases\n• 89% accuracy improvement over single approaches'
  },
  {
    id: 'multi-modal-cognition',
    name: 'Multi-Modal Cognitive Processing',
    abbr: 'MMCP',
    icon: '🎭',
    color: 'from-cyan-500 to-teal-600',
    category: 'cognitive-architectures',
    description: 'Integrated processing of multiple information modalities with cross-modal reasoning',
    features: [
      'Cross-modal integration',
      'Modality-specific processing',
      'Attention coordination',
      'Multi-sensory fusion',
      'Context switching',
      'Unified representation'
    ],
    useCases: ['multimedia-analysis', 'robotics', 'human-computer-interaction', 'content-understanding'],
    complexity: 'high',
    example: 'Autonomous Vehicle Perception:\n\nInput Modalities:\n• Visual: Camera feeds (RGB, depth)\n• Audio: Microphone array\n• Sensor: LiDAR, radar, GPS\n• Internal: Vehicle state, navigation\n\nModality-Specific Processing:\n\n1. Visual Processing:\n   • Object detection (cars, pedestrians)\n   • Lane line recognition\n   • Traffic sign identification\n   • Distance estimation\n\n2. Audio Processing:\n   • Emergency vehicle sirens\n   • Engine sounds (vehicle proximity)\n   • Construction noise\n   • Voice commands\n\n3. Sensor Processing:\n   • Precise distance measurements\n   • Weather conditions\n   • Road surface conditions\n   • Vehicle dynamics\n\nCross-Modal Integration:\n\n1. Attention Coordination:\n   • Siren detected → Focus visual search\n   • Poor visibility → Increase sensor reliance\n   • GPS uncertainty → Enhance visual landmarks\n\n2. Conflict Resolution:\n   • Visual: No obstacle detected\n   • LiDAR: Object at 50m ahead\n   • Resolution: Trust LiDAR, investigate visually\n\n3. Unified World Model:\n   • Combine all modalities into coherent scene\n   • Track objects across sensory channels\n   • Predict future states\n   • Make driving decisions\n\nResult: 40% improvement in object detection, 60% better performance in adverse conditions'
  },
  {
    id: 'adaptive-thinking',
    name: 'Adaptive Thinking Systems',
    abbr: 'ATS',
    icon: '🔄',
    color: 'from-teal-500 to-green-600',
    category: 'cognitive-architectures',
    description: 'Dynamic cognitive adaptation that adjusts thinking strategies based on problem characteristics',
    features: [
      'Strategy selection',
      'Cognitive flexibility',
      'Meta-reasoning',
      'Learning from experience',
      'Context sensitivity',
      'Performance optimization'
    ],
    useCases: ['adaptive-learning', 'problem-solving', 'decision-making', 'cognitive-assistance'],
    complexity: 'high',
    example: 'Adaptive Tutoring System:\n\nStudent Profile:\n• Learning style: Visual learner\n• Current level: Intermediate algebra\n• Struggle areas: Word problems\n• Strengths: Geometric reasoning\n\nProblem Analysis:\n• Type: Complex word problem\n• Required skills: Equation setup, solving\n• Difficulty: High for current level\n• Context: Real-world application\n\nAdaptive Strategy Selection:\n\n1. Initial Approach Assessment:\n   • Standard method: Abstract algebraic approach\n   • Student profile: Likely to struggle\n   • Adaptation needed: Visual/geometric approach\n\n2. Strategy Adaptation:\n   • Convert to visual representation\n   • Use diagram-based explanation\n   • Break into smaller visual steps\n   • Connect to geometric concepts\n\n3. Dynamic Adjustment:\n   • Monitor student responses\n   • If still struggling: Add manipulatives\n   • If progressing: Gradually abstract\n   • Track comprehension signals\n\n4. Learning Integration:\n   • Success pattern: Visual → Abstract works\n   • Update student profile\n   • Apply to future similar problems\n   • Personalize instruction path\n\nMeta-Cognitive Monitoring:\n• "Is this approach working?"\n• "Should I try a different strategy?"\n• "What has worked for this student before?"\n• "How can I build on their strengths?"\n\nResults:\n• 70% improvement in problem-solving success\n• 85% increase in student engagement\n• Reduced time to mastery by 40%'
  }
];