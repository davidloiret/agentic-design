// Theory Lessons
export { introductionToRedTeamingLesson } from './theory-lessons/introduction-to-red-teaming';
export { promptInjectionJailbreakingLesson } from './theory-lessons/prompt-injection-jailbreaking';
export { adversarialTestingPatternsLesson } from './theory-lessons/adversarial-testing-patterns';
export { securityEvaluationFrameworksLesson } from './theory-lessons/security-evaluation-frameworks';
export { defenseMechanismsLesson } from './theory-lessons/defense-mechanisms';

// Flashcards
export {
  redTeamFundamentalsFlashcards,
  promptInjectionFlashcards,
  adversarialTestingFlashcards,
  securityFrameworksFlashcards,
  defenseMechanismsFlashcards,
  privacyComplianceFlashcards,
  redTeamOperationsFlashcards,
  allRedTeamingFlashcards
} from './flashcards';

// Quizzes
export {
  redTeamFundamentalsQuiz,
  promptInjectionQuiz,
  adversarialTestingQuiz,
  defenseMechanismsQuiz,
  securityFrameworksQuiz,
  advancedRedTeamingQuiz,
  allRedTeamingQuizzes
} from './quizzes';

// Code Challenges
export {
  promptInjectionChallenge,
  adversarialGeneratorChallenge,
  securityEvaluationChallenge,
  defensiveSystemChallenge,
  allRedTeamingCodeChallenges
} from './code-challenges';

// All Theory Lessons Collection
export const redTeamingTheoryLessons = [
  { id: 'introduction-to-red-teaming', module: () => import('./theory-lessons/introduction-to-red-teaming') },
  { id: 'prompt-injection-jailbreaking', module: () => import('./theory-lessons/prompt-injection-jailbreaking') },
  { id: 'adversarial-testing-patterns', module: () => import('./theory-lessons/adversarial-testing-patterns') },
  { id: 'security-evaluation-frameworks', module: () => import('./theory-lessons/security-evaluation-frameworks') },
  { id: 'defense-mechanisms', module: () => import('./theory-lessons/defense-mechanisms') }
];