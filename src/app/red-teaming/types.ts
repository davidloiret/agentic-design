export interface RedTeamingTechnique {
  id: string;
  name: string;
  abbr: string;
  icon: string;
  color: string;
  category: string;
  description: string;
  features: string[];
  useCases: string[];
  complexity: 'low' | 'medium' | 'high';
  example: string;
  objectives: string[];
  defenses: string[];
  tools?: string[];
  risks: string[];
  ethicalGuidelines: string[];
}

export type RedTeamingCategory =
  | 'prompt-injection'
  | 'jailbreaking'
  | 'data-extraction'
  | 'adversarial'
  | 'social-engineering'
  | 'model-inversion'
  | 'vulnerability-assessment'
  | 'supply-chain'
  | 'model-theft'
  | 'privacy-attacks'
  | 'robustness-testing'
  | 'bias-evaluation'
  | 'safety-testing'
  | 'agentic-ai'
  | 'memory-attacks'
  | 'multimodal';