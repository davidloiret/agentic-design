import { QuizQuestion } from '../learning-content';

// ===========================================
// BASIC PROMPTING QUIZ
// ===========================================

export const basicPromptingQuiz: QuizQuestion[] = [
  {
    id: 'basic-1',
    question: 'What is the primary purpose of prompt engineering?',
    options: [
      'To make AI responses longer',
      'To design and optimize inputs that elicit desired outputs from AI models',
      'To reduce the cost of using AI',
      'To eliminate the need for programming'
    ],
    correctAnswer: 1,
    explanation: 'Prompt engineering is the practice of designing, crafting, and optimizing inputs to AI language models to achieve specific, desired outputs. It\'s about effective communication with AI systems.',
    difficulty: 'easy',
    topic: 'Prompt Fundamentals'
  },
  {
    id: 'basic-2',
    question: 'Which component is NOT typically part of a well-structured prompt?',
    options: [
      'Role definition (persona)',
      'Task description',
      'Model training data',
      'Output format specification'
    ],
    correctAnswer: 2,
    explanation: 'Model training data is not part of a prompt - it\'s part of the model\'s pre-training. Prompts include role definition, task description, constraints, format specifications, and success criteria.',
    difficulty: 'easy',
    topic: 'Prompt Components'
  },
  {
    id: 'basic-3',
    question: 'What does adding "Let\'s think step by step" to a prompt trigger?',
    options: [
      'Faster response generation',
      'Chain of Thought reasoning',
      'Reduced token usage',
      'Example-based learning'
    ],
    correctAnswer: 1,
    explanation: 'The phrase "Let\'s think step by step" triggers Chain of Thought (CoT) reasoning, causing the model to break down problems systematically and show its reasoning process.',
    difficulty: 'medium',
    topic: 'Prompt Techniques'
  },
  {
    id: 'basic-4',
    question: 'When should you use zero-shot prompting instead of few-shot?',
    options: [
      'When you need specific formatting',
      'For style matching tasks',
      'For well-defined standard tasks with clear instructions',
      'When pattern recognition is critical'
    ],
    correctAnswer: 2,
    explanation: 'Zero-shot prompting works best for well-defined, standard tasks where clear instructions suffice. Few-shot is better for specific formatting, style matching, or pattern recognition.',
    difficulty: 'medium',
    topic: 'Prompting Strategies'
  },
  {
    id: 'basic-5',
    question: 'What is the Token Efficiency Ratio (TER)?',
    options: [
      'Total tokens divided by response time',
      'Quality score divided by token count',
      'Input tokens divided by output tokens',
      'Cost per token multiplied by quality'
    ],
    correctAnswer: 1,
    explanation: 'TER = Quality Score / Token Count. It measures the quality of output per token consumed, helping evaluate prompt efficiency.',
    difficulty: 'medium',
    topic: 'Prompt Metrics'
  },
  {
    id: 'basic-6',
    question: 'Which factor most influences where important instructions should be placed in a prompt?',
    options: [
      'Alphabetical order',
      'Positional bias in attention mechanisms',
      'Token cost considerations',
      'Random placement for variety'
    ],
    correctAnswer: 1,
    explanation: 'Due to positional bias in attention mechanisms, models pay more attention to information at the beginning and end of prompts. Critical instructions should be placed in these positions.',
    difficulty: 'hard',
    topic: 'Prompt Psychology'
  }
];

// ===========================================
// PROMPT PATTERNS QUIZ
// ===========================================

export const promptPatternsQuiz: QuizQuestion[] = [
  {
    id: 'patterns-1',
    question: 'How many examples are typically optimal for few-shot prompting?',
    options: [
      '1 example',
      '2-5 examples',
      '10-15 examples',
      'As many as possible'
    ],
    correctAnswer: 1,
    explanation: 'Few-shot prompting typically works best with 2-5 examples. This provides enough pattern demonstration without excessive token usage. Beyond 5-7 examples rarely improves performance.',
    difficulty: 'easy',
    topic: 'Few-Shot Prompting'
  },
  {
    id: 'patterns-2',
    question: 'What is the main advantage of Chain of Thought prompting?',
    options: [
      'Reduces token usage',
      'Eliminates errors completely',
      'Improves reasoning accuracy by 10-40% on complex tasks',
      'Makes responses shorter'
    ],
    correctAnswer: 2,
    explanation: 'Chain of Thought prompting improves accuracy on reasoning tasks by 10-40% by making the thinking process explicit and systematic, though it does increase token usage.',
    difficulty: 'medium',
    topic: 'Chain of Thought'
  },
  {
    id: 'patterns-3',
    question: 'In prompt chaining, what is "context accumulation"?',
    options: [
      'Randomly selecting previous outputs',
      'Appending outputs from each step to build context',
      'Deleting previous context',
      'Compressing all outputs into keywords'
    ],
    correctAnswer: 1,
    explanation: 'Context accumulation means appending outputs from each step to build comprehensive context for subsequent prompts in the chain, maintaining information flow.',
    difficulty: 'medium',
    topic: 'Prompt Chaining'
  },
  {
    id: 'patterns-4',
    question: 'What is self-consistency in Chain of Thought prompting?',
    options: [
      'Using the same prompt repeatedly',
      'Sampling multiple reasoning paths and taking majority vote',
      'Checking grammar consistency',
      'Using consistent formatting'
    ],
    correctAnswer: 1,
    explanation: 'Self-consistency samples multiple reasoning paths for the same problem and takes the majority vote, reducing errors from single reasoning chains by 5-15%.',
    difficulty: 'hard',
    topic: 'Advanced CoT'
  },
  {
    id: 'patterns-5',
    question: 'Which prompt pattern is best for tasks requiring multiple independent analyses?',
    options: [
      'Sequential chaining',
      'Parallel prompting',
      'Single zero-shot prompt',
      'Recursive prompting'
    ],
    correctAnswer: 1,
    explanation: 'Parallel prompting is ideal for multiple independent analyses that can be processed simultaneously, improving efficiency and enabling diverse perspectives.',
    difficulty: 'medium',
    topic: 'Prompt Patterns'
  },
  {
    id: 'patterns-6',
    question: 'What distinguishes Tree of Thought from Chain of Thought?',
    options: [
      'ToT is faster than CoT',
      'ToT uses fewer tokens',
      'ToT explores multiple reasoning paths with backtracking',
      'ToT requires examples while CoT doesn\'t'
    ],
    correctAnswer: 2,
    explanation: 'Tree of Thought explores multiple reasoning paths and can backtrack when paths fail, unlike Chain of Thought which follows a single linear reasoning path.',
    difficulty: 'hard',
    topic: 'Advanced Reasoning'
  }
];

// ===========================================
// ADVANCED PROMPTING QUIZ
// ===========================================

export const advancedPromptingQuiz: QuizQuestion[] = [
  {
    id: 'advanced-1',
    question: 'What is meta-prompting?',
    options: [
      'Using metadata in prompts',
      'Asking the model to reason about its approach before executing',
      'Combining multiple prompts',
      'Prompting about prompting'
    ],
    correctAnswer: 1,
    explanation: 'Meta-prompting asks the model to reflect on and reason about its approach before executing the task, improving quality by encouraging thoughtful planning.',
    difficulty: 'hard',
    topic: 'Advanced Techniques'
  },
  {
    id: 'advanced-2',
    question: 'How does role priming improve zero-shot performance?',
    options: [
      'By reducing token count',
      'By eliminating the need for instructions',
      'By activating domain-specific knowledge and setting appropriate tone',
      'By making responses shorter'
    ],
    correctAnswer: 2,
    explanation: 'Role priming (e.g., "As a senior data scientist...") activates relevant domain knowledge and establishes appropriate expertise level and tone for responses.',
    difficulty: 'medium',
    topic: 'Role-Based Prompting'
  },
  {
    id: 'advanced-3',
    question: 'What is prompt ensembling?',
    options: [
      'Using one prompt multiple times',
      'Combining prompts with code',
      'Using multiple prompt variations and aggregating results',
      'Creating music with prompts'
    ],
    correctAnswer: 2,
    explanation: 'Prompt ensembling uses multiple prompt variations and aggregates their results through voting, averaging, or selection, improving reliability by 15-25%.',
    difficulty: 'hard',
    topic: 'Advanced Techniques'
  },
  {
    id: 'advanced-4',
    question: 'Which technique best handles prompts that might produce hallucinations?',
    options: [
      'Using more exclamation points',
      'Making prompts longer',
      'Allowing uncertainty and requesting sources',
      'Using all capital letters'
    ],
    correctAnswer: 2,
    explanation: 'Allowing the model to express uncertainty ("I don\'t know" is acceptable) and requesting sources or verification reduces hallucination rates significantly.',
    difficulty: 'medium',
    topic: 'Reliability Techniques'
  },
  {
    id: 'advanced-5',
    question: 'What is constitutional prompting?',
    options: [
      'Prompting about government structures',
      'Embedding principles and rules the AI must follow',
      'Using legal language in prompts',
      'Prompting in multiple languages'
    ],
    correctAnswer: 1,
    explanation: 'Constitutional prompting embeds principles, values, and rules that guide the AI\'s behavior, ensuring responses align with specified constraints and values.',
    difficulty: 'hard',
    topic: 'Advanced Techniques'
  },
  {
    id: 'advanced-6',
    question: 'In Retrieval-Augmented Generation (RAG), what is the main benefit?',
    options: [
      'Faster response times',
      'Lower token costs',
      'Access to current information and reduced hallucination',
      'Simpler prompt structure'
    ],
    correctAnswer: 2,
    explanation: 'RAG provides access to current, domain-specific information from external knowledge bases, significantly reducing hallucination and improving factual accuracy.',
    difficulty: 'medium',
    topic: 'RAG Systems'
  }
];

// ===========================================
// OPTIMIZATION AND TESTING QUIZ
// ===========================================

export const optimizationTestingQuiz: QuizQuestion[] = [
  {
    id: 'opt-1',
    question: 'What is Cohen\'s d in prompt evaluation?',
    options: [
      'A programming language',
      'A cost metric',
      'A standardized measure of effect size between two groups',
      'A token counting method'
    ],
    correctAnswer: 2,
    explanation: 'Cohen\'s d measures the standardized difference between two means (effect size). Values: 0.2=small, 0.5=medium, 0.8=large. It helps determine if statistically significant results are practically meaningful.',
    difficulty: 'hard',
    topic: 'Statistical Analysis'
  },
  {
    id: 'opt-2',
    question: 'When A/B testing prompts, what\'s the minimum recommended statistical power?',
    options: [
      '50%',
      '65%',
      '80%',
      '95%'
    ],
    correctAnswer: 2,
    explanation: 'Statistical power of 80% is the standard minimum, meaning there\'s an 80% chance of detecting a true effect if it exists. This balances sample size requirements with reliability.',
    difficulty: 'medium',
    topic: 'A/B Testing'
  },
  {
    id: 'opt-3',
    question: 'What is the purpose of regression testing in prompt engineering?',
    options: [
      'To make prompts shorter',
      'To ensure changes don\'t break existing functionality',
      'To reduce token costs',
      'To increase response speed'
    ],
    correctAnswer: 1,
    explanation: 'Regression testing ensures that prompt modifications don\'t degrade performance on established benchmarks or break existing functionality that was working correctly.',
    difficulty: 'easy',
    topic: 'Testing Methodologies'
  },
  {
    id: 'opt-4',
    question: 'Which metric best evaluates prompt efficiency?',
    options: [
      'Total tokens used',
      'Response time only',
      'Token Efficiency Ratio (Quality/Tokens)',
      'Number of words generated'
    ],
    correctAnswer: 2,
    explanation: 'Token Efficiency Ratio (TER = Quality Score / Token Count) best evaluates efficiency by measuring output quality per token consumed, balancing both quality and resource usage.',
    difficulty: 'medium',
    topic: 'Metrics'
  },
  {
    id: 'opt-5',
    question: 'What is the Bonferroni correction used for?',
    options: [
      'Fixing grammar errors',
      'Adjusting significance levels for multiple comparisons',
      'Calculating token costs',
      'Measuring response speed'
    ],
    correctAnswer: 1,
    explanation: 'Bonferroni correction adjusts significance levels when testing multiple prompts simultaneously (α_adjusted = α/m) to control for false positive rates.',
    difficulty: 'hard',
    topic: 'Statistical Analysis'
  },
  {
    id: 'opt-6',
    question: 'What characterizes a good prompt evaluation benchmark?',
    options: [
      'Only easy test cases',
      'Maximum 10 test examples',
      'Diverse difficulty levels, edge cases, and real-world examples',
      'Focus only on speed metrics'
    ],
    correctAnswer: 2,
    explanation: 'Good benchmarks include diverse difficulty levels, representative real-world examples, edge cases, adversarial inputs, and clear success criteria that correlate with business metrics.',
    difficulty: 'medium',
    topic: 'Benchmarking'
  }
];

// ===========================================
// PRACTICAL APPLICATION QUIZ
// ===========================================

export const practicalApplicationQuiz: QuizQuestion[] = [
  {
    id: 'practical-1',
    question: 'A prompt consistently produces outputs in the wrong format. What\'s the most likely fix?',
    options: [
      'Add more examples of the desired format',
      'Make the prompt shorter',
      'Increase the temperature setting',
      'Remove all constraints'
    ],
    correctAnswer: 0,
    explanation: 'Format inconsistency is best addressed by providing clear examples of the desired format (few-shot approach) or more explicit format specifications.',
    difficulty: 'easy',
    topic: 'Troubleshooting'
  },
  {
    id: 'practical-2',
    question: 'Your prompt works well but uses too many tokens. Which approach reduces token usage while maintaining quality?',
    options: [
      'Remove all instructions',
      'Use prompt compression and summarization techniques',
      'Always use zero-shot instead of few-shot',
      'Double the prompt length'
    ],
    correctAnswer: 1,
    explanation: 'Prompt compression techniques, summarization of context, and efficient example selection can reduce token usage while maintaining quality.',
    difficulty: 'medium',
    topic: 'Optimization'
  },
  {
    id: 'practical-3',
    question: 'For a customer service chatbot, which prompt component is MOST critical?',
    options: [
      'Complex technical instructions',
      'Mathematical formulas',
      'Tone and empathy guidelines',
      'Code examples'
    ],
    correctAnswer: 2,
    explanation: 'For customer service, tone and empathy guidelines are critical to ensure appropriate, helpful, and professional responses that maintain customer satisfaction.',
    difficulty: 'easy',
    topic: 'Domain Application'
  },
  {
    id: 'practical-4',
    question: 'You need to extract specific data from unstructured text. Which prompting approach is best?',
    options: [
      'Single vague instruction',
      'Few-shot with examples showing exact extraction format',
      'Very long philosophical prompt',
      'No instructions, just the text'
    ],
    correctAnswer: 1,
    explanation: 'Data extraction tasks benefit most from few-shot prompting with clear examples showing the exact format and types of data to extract.',
    difficulty: 'medium',
    topic: 'Task Selection'
  },
  {
    id: 'practical-5',
    question: 'A prompt produces different outputs each run despite needing consistency. What\'s the best solution?',
    options: [
      'Increase temperature to 1.0',
      'Remove all structure',
      'Lower temperature and add explicit consistency requirements',
      'Make the prompt more ambiguous'
    ],
    correctAnswer: 2,
    explanation: 'Lowering temperature (0.0-0.3) and adding explicit consistency requirements, format templates, and validation steps improves output consistency.',
    difficulty: 'medium',
    topic: 'Consistency'
  },
  {
    id: 'practical-6',
    question: 'For a complex multi-step analysis task, which approach is most effective?',
    options: [
      'One long, complex prompt',
      'Prompt chaining with validation gates',
      'Shortest possible prompt',
      'Random prompt selection'
    ],
    correctAnswer: 1,
    explanation: 'Complex multi-step tasks benefit from prompt chaining with validation gates between steps, ensuring each stage completes successfully before proceeding.',
    difficulty: 'medium',
    topic: 'Complex Tasks'
  }
];

// Export all quiz sets
export const allPromptingQuizzes = [
  ...basicPromptingQuiz,
  ...promptPatternsQuiz,
  ...advancedPromptingQuiz,
  ...optimizationTestingQuiz,
  ...practicalApplicationQuiz
];