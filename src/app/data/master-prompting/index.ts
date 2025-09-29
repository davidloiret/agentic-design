// Master Prompting Learning Content
// Centralized exports for all prompting content

// Theory Lessons
export { whatIsPromptingLesson } from './theory-lessons/what-is-prompting';
export { zeroShotPromptingLesson } from './theory-lessons/zero-shot-prompting';
export { promptMetricsLesson } from './theory-lessons/prompt-metrics';
export { fewShotPromptingLesson } from './theory-lessons/few-shot-prompting';
export { chainOfThoughtLesson } from './theory-lessons/chain-of-thought';
export { rolePromptingLesson } from './theory-lessons/role-prompting';
export { promptChainingLesson } from './theory-lessons/prompt-chaining';
export { selfConsistencyLesson } from './theory-lessons/self-consistency';
export { abTestingLesson } from './theory-lessons/a-b-testing';
export { promptTemplatesLesson } from './theory-lessons/prompt-templates';
export { promptSecurityLesson } from './theory-lessons/prompt-security';

// Theory lessons mapping for easy lookup
import { whatIsPromptingLesson } from './theory-lessons/what-is-prompting';
import { zeroShotPromptingLesson } from './theory-lessons/zero-shot-prompting';
import { promptMetricsLesson } from './theory-lessons/prompt-metrics';
import { fewShotPromptingLesson } from './theory-lessons/few-shot-prompting';
import { chainOfThoughtLesson } from './theory-lessons/chain-of-thought';
import { rolePromptingLesson } from './theory-lessons/role-prompting';
import { promptChainingLesson } from './theory-lessons/prompt-chaining';
import { selfConsistencyLesson } from './theory-lessons/self-consistency';
import { abTestingLesson } from './theory-lessons/a-b-testing';
import { promptTemplatesLesson } from './theory-lessons/prompt-templates';
import { promptSecurityLesson } from './theory-lessons/prompt-security';

export const promptingTheoryLessons = {
  'what-is-prompting': whatIsPromptingLesson,
  'zero-shot-prompting': zeroShotPromptingLesson,
  'prompt-metrics': promptMetricsLesson,
  'few-shot-prompting': fewShotPromptingLesson,
  'chain-of-thought': chainOfThoughtLesson,
  'role-prompting': rolePromptingLesson,
  'prompt-chaining': promptChainingLesson,
  'self-consistency': selfConsistencyLesson,
  'a-b-testing': abTestingLesson,
  'prompt-templates': promptTemplatesLesson,
  'prompt-security': promptSecurityLesson
};

// Flashcards
export {
  promptComponentsFlashcards,
  zeroShotPromptingFlashcards,
  fewShotPromptingFlashcards,
  chainOfThoughtFlashcards,
  promptChainingFlashcards,
  promptMetricsFlashcards,
  advancedTechniquesFlashcards,
  commonPitfallsFlashcards,
  allPromptingFlashcards
} from './flashcards';

// Quizzes
export {
  basicPromptingQuiz,
  promptPatternsQuiz,
  advancedPromptingQuiz,
  optimizationTestingQuiz,
  practicalApplicationQuiz,
  allPromptingQuizzes
} from './quizzes';

// Code Challenges
export {
  implementFewShotChallenge,
  implementCoTPromptChallenge,
  buildPromptChainChallenge,
  implementSelfConsistencyChallenge,
  implementPromptTestingChallenge,
  buildPromptLibraryChallenge,
  allPromptingCodeChallenges
} from './code-challenges';