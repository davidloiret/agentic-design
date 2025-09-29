// Theory Lessons
export { introductionToAgentsLesson } from './theory-lessons/introduction-to-agents';
export { reasoningPatternsLesson } from './theory-lessons/reasoning-patterns';
export { chainingPatternsLesson } from './theory-lessons/chaining-patterns';
export { ragPatternsLesson } from './theory-lessons/rag-patterns';
export { multiAgentCollaborationLesson } from './theory-lessons/multi-agent-collaboration';

// Flashcards
export {
  coreAgentConceptsFlashcards,
  reasoningPatternsFlashcards,
  chainingPatternsFlashcards,
  ragPatternsFlashcards,
  multiAgentFlashcards,
  productionPatternsFlashcards,
  allAgenticPatternsFlashcards
} from './flashcards';

// Quizzes
export {
  agentFundamentalsQuiz,
  reasoningPatternsQuiz,
  chainingPatternsQuiz,
  ragPatternsQuiz,
  multiAgentQuiz,
  productionAdvancedQuiz,
  allAgenticPatternsQuizzes
} from './quizzes';

// Code Challenges
export {
  buildSimpleAgentChallenge,
  implementReActAgentChallenge,
  buildRAGSystemChallenge,
  multiAgentSystemChallenge,
  allAgenticPatternsCodeChallenges
} from './code-challenges';

// All Theory Lessons Collection
export const agenticPatternsTheoryLessons = [
  { id: 'introduction-to-agents', module: () => import('./theory-lessons/introduction-to-agents') },
  { id: 'reasoning-patterns', module: () => import('./theory-lessons/reasoning-patterns') },
  { id: 'chaining-patterns', module: () => import('./theory-lessons/chaining-patterns') },
  { id: 'rag-patterns', module: () => import('./theory-lessons/rag-patterns') },
  { id: 'multi-agent-collaboration', module: () => import('./theory-lessons/multi-agent-collaboration') }
];