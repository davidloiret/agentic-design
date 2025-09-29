// Common types for learning content

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'easy' | 'medium' | 'hard';
  category?: string;
  topic?: string;
  xpReward?: number;
  tags?: string[];
  relatedConcepts?: string[];
  lastReviewed?: Date;
  reviewCount?: number;
  correctCount?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'beginner' | 'intermediate' | 'advanced';
  topic?: string;
  category?: string;
  tags?: string[];
  conceptsCovered?: string[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  difficulty?: string;
  xpReward?: number;
}

export interface TheoryLesson {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  xpReward: number;
  content: {
    introduction: string;
    sections: Array<{
      title: string;
      content: string;
      examples?: Array<{
        code: string;
        language?: string;
        explanation?: string;
      }>;
      codeExamples?: Array<{
        code: string;
        language?: string;
        explanation?: string;
      }>;
      visualizations?: Array<{
        type: string;
        data?: any;
        config?: any;
      }>;
    }>;
    keyTakeaways?: string[];
    practiceQuestions?: Array<{
      question: string;
      hint: string;
      answer: string;
      difficulty?: 'easy' | 'medium' | 'hard' | 'intermediate' | 'advanced';
    }>;
    practicalExample?: {
      title: string;
      scenario: string;
      challenge: string;
      approach?: string;
      implementation?: string;
      metrics?: any;
    };
    quiz?: Array<{
      question: string;
      options: string[];
      correct?: number;
      correctAnswer?: number;
      explanation?: string;
    }>;
    exercises?: Array<{
      title: string;
      difficulty?: string;
      description: string;
      hints?: string[];
    }>;
    resources?: Array<{
      type: string;
      title: string;
      url?: string;
      description?: string;
    }>;
    references?: string[];
  };
}

export interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'beginner' | 'intermediate' | 'advanced';
  topic?: string;
  category?: string;
  template?: string;
  starterCode?: string;
  solution: string;
  tests: {
    input: any;
    expectedOutput: any;
    description: string;
  }[];
  hints: string[];
  xpReward?: number;
  estimatedTime?: number;
  tags?: string[];
  objectives?: string[];
  validationCriteria?: string[];
}

export interface PatternSelectionChallenge {
  id: string;
  scenario: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'beginner' | 'intermediate' | 'advanced';
  options: {
    pattern: string;
    explanation: string;
  }[];
  correctAnswer: number;
  explanation: string;
}