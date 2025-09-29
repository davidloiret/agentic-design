export interface TheorySection {
  id: string;
  title: string;
  content: string;
  examples?: {
    title: string;
    description: string;
    code?: string;
  }[];
  keyPoints?: string[];
  interactiveElement?: {
    type: 'visualization' | 'exercise' | 'diagram';
    data: any;
  };
}

export interface TheoryLesson {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  prerequisites?: string[];
  sections: TheorySection[];
  summary: string[];
  nextSteps: string[];
  checkYourUnderstanding: {
    question: string;
    answer: string;
  }[];
}