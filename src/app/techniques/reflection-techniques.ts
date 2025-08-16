import { Technique } from './types';

export const reflectionTechniques: Technique[] = [
  {
    id: 'self-critique',
    name: 'Self-Critique',
    abbr: 'SC',
    icon: '🔍',
    color: 'from-purple-500 to-indigo-500',
    category: 'reflection',
    description: 'Agent evaluates its own outputs through systematic analysis and generates targeted improvements',
    features: [
      'Systematic quality assessment',
      'Error identification and correction',
      'Iterative refinement cycles',
      'Confidence scoring'
    ],
    useCases: ['content-generation', 'code-review', 'quality-assurance', 'decision-validation'],
    complexity: 'medium',
    example: 'Code Self-Critique:\n\nOriginal: def calc(x,y): return x/y\n\nCritique:\n• No error handling for division by zero\n• Poor naming conventions\n• Missing type hints and docstring\n\nImproved:\ndef divide(numerator: float, denominator: float) -> float:\n    """Safely divide two numbers."""\n    if denominator == 0:\n        raise ValueError("Cannot divide by zero")\n    return numerator / denominator'
  },
  {
    id: 'producer-critic',
    name: 'Producer-Critic Pattern',
    abbr: 'PC',
    icon: '👥',
    color: 'from-blue-500 to-purple-500',
    category: 'reflection',
    description: 'Architectural pattern where separate producer and critic agents collaborate for quality improvement',
    features: [
      'Separation of concerns',
      'Unbiased evaluation',
      'Flexible critic implementation',
      'Structured feedback loops'
    ],
    useCases: ['code-generation', 'content-creation', 'design-documents', 'quality-assurance'],
    complexity: 'medium',
    example: 'Architecture Overview:\n\nProducer → Output → Critic → Feedback → Producer\n\nCritic Implementations:\n• LLM-as-Judge: Use another LLM to score/rank\n• Rule-based: Apply deterministic checks\n• Human-in-loop: Expert review\n• Hybrid: Combine multiple approaches\n\nExample Flow:\nDeveloper Agent writes code → Senior Engineer Critic reviews → Developer refines based on feedback'
  },
  {
    id: 'llm-as-judge',
    name: 'LLM as Judge',
    abbr: 'LJ',
    icon: '⚖️',
    color: 'from-amber-500 to-orange-500',
    category: 'reflection',
    description: 'Specific Producer-Critic implementation where an LLM acts as the critic to evaluate outputs',
    features: [
      'Automated quality assessment',
      'Natural language evaluation',
      'Scalable ranking/scoring',
      'Configurable rubrics'
    ],
    useCases: ['output-ranking', 'quality-gates', 'content-moderation', 'best-of-n-selection'],
    complexity: 'low',
    example: 'Implementation of Producer-Critic:\n\nProducer: Generate N responses\nCritic (LLM Judge): Evaluate each with rubric\n\nExample - Customer Support:\nOutputs → LLM Judge(helpfulness_rubric) → Scores\n1. "Thanks!" → 6/10 (too brief)\n2. "I understand your frustration..." → 9/10 (empathetic)\n3. "What?" → 3/10 (dismissive)\n\nAction: Route response #2 to customer\n\nNote: This is one way to implement the Critic in Producer-Critic pattern'
  },
  {
    id: 'reflexion-pattern',
    name: 'Reflexion',
    abbr: 'RX',
    icon: '🔄',
    color: 'from-green-500 to-teal-500',
    category: 'reflection',
    description: 'Agents learn from experience through verbal self-reflection and episodic memory',
    features: [
      'Verbal reinforcement learning',
      'Episodic memory integration',
      'Learning from failures',
      'No fine-tuning required'
    ],
    useCases: ['programming-tasks', 'game-playing', 'sequential-decisions', 'problem-solving'],
    complexity: 'high',
    example: 'Debugging Task:\n\nTrial 1: Run test → Fails with TypeError\nReflection: "I passed a string to a function expecting an integer. Need type conversion."\n\nTrial 2: Add int() conversion → Fails with ValueError\nReflection: "Input might be empty. Must check for valid input before conversion."\n\nTrial 3: Add validation → All tests pass\nFinal reflection: "Always validate and convert user input before processing."'
  }
];