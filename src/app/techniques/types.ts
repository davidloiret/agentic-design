export interface Technique {
  id: string;
  name: string;
  abbr: string;
  icon: string;
  color: string;
  category: string;
  description: string;
  features: string[];
  useCases: string[];
  complexity: 'low' | 'medium' | 'high' | 'very-high';
  example: string;
  references?: string[];
}

export type TechniqueCategory = 
  | 'reasoning-techniques'
  | 'output-filtering'
  | 'safety'
  | 'input-validation'
  | 'prompt-chaining'
  | 'routing'
  | 'tool-use'
  | 'parallelization'
  | 'reflection'
  | 'multi-agent'
  | 'memory-management'
  | 'learning-adaptation'
  | 'goal-setting-monitoring'
  | 'exception-handling-recovery'
  | 'workflow-orchestration'
  | 'knowledge-retrieval'
  | 'knowledge-representation'
  | 'resource-aware-optimization'
  | 'evaluation-monitoring'
  | 'prioritization'
  | 'exploration-discovery'
  | 'context-orchestration';