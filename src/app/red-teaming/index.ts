import { RedTeamingTechnique } from './types';
import { promptInjectionTechniques } from './prompt-injection';
import { jailbreakingTechniques } from './jailbreaking';
import { adversarialTechniques } from './adversarial';
import { vulnerabilityAssessmentTechniques } from './vulnerability-assessment';
import { supplyChainTechniques } from './supply-chain';
import { modelTheftTechniques } from './model-theft';
import { advancedPromptInjectionTechniques } from './advanced-prompt-injection';
import { advancedJailbreakingTechniques } from './advanced-jailbreaking';
import { aiSafetyEvaluationTechniques } from './ai-safety-evaluation';
import { agenticAITechniques } from './agentic-ai';
import { advancedAgenticTechniques } from './advanced-agentic';
import { memoryAttackTechniques } from './memory-attacks';
import { multimodalTechniques } from './multimodal';
import { checkerOutOfLoopTechniques } from './checker-out-of-loop';
import { resourceExhaustionTechniques } from './resource-exhaustion';
import { impactChainTechniques } from './impact-chain';
import { untraceabilityTechniques } from './untraceability';
import { criticalSystemInteractionTechniques } from './critical-system-interaction';

export const allRedTeamingTechniques: RedTeamingTechnique[] = [
  ...promptInjectionTechniques,
  ...advancedPromptInjectionTechniques,
  ...jailbreakingTechniques,
  ...advancedJailbreakingTechniques,
  ...adversarialTechniques,
  ...vulnerabilityAssessmentTechniques,
  ...supplyChainTechniques,
  ...modelTheftTechniques,
  ...aiSafetyEvaluationTechniques,
  ...agenticAITechniques,
  ...advancedAgenticTechniques,
  ...memoryAttackTechniques,
  ...multimodalTechniques,
  ...checkerOutOfLoopTechniques,
  ...resourceExhaustionTechniques,
  ...impactChainTechniques,
  ...untraceabilityTechniques,
  ...criticalSystemInteractionTechniques,
];

export const redTeamingCategories = {
  'prompt-injection': {
    name: 'Prompt Injection',
    description: 'Techniques to manipulate AI responses through malicious prompts',
    icon: '🎯',
    color: 'from-red-500 to-orange-500',
    techniques: [...promptInjectionTechniques, ...advancedPromptInjectionTechniques]
  },
  'jailbreaking': {
    name: 'Jailbreaking',
    description: 'Methods to bypass AI safety mechanisms and content policies',
    icon: '🔓',
    color: 'from-purple-500 to-red-500',
    techniques: [...jailbreakingTechniques, ...advancedJailbreakingTechniques]
  },
  'adversarial': {
    name: 'Adversarial Attacks',
    description: 'Creating inputs designed to fool AI models',
    icon: '⚡',
    color: 'from-yellow-500 to-red-500',
    techniques: adversarialTechniques
  },
  'vulnerability-assessment': {
    name: 'Vulnerability Assessment',
    description: 'CVE analysis and security testing of AI systems and frameworks',
    icon: '🛡️',
    color: 'from-blue-500 to-red-500',
    techniques: vulnerabilityAssessmentTechniques
  },
  'supply-chain': {
    name: 'Supply Chain Attacks',
    description: 'Testing AI model and data supply chain security vulnerabilities',
    icon: '🔗',
    color: 'from-green-500 to-red-500',
    techniques: supplyChainTechniques
  },
  'model-theft': {
    name: 'Model Theft & IP Protection',
    description: 'Model extraction techniques and intellectual property protection testing',
    icon: '🕵️',
    color: 'from-cyan-500 to-red-500',
    techniques: modelTheftTechniques
  },
  'agentic-ai': {
    name: 'Agentic AI Attacks',
    description: 'Multi-agent security testing and autonomous system exploitation techniques',
    icon: '🤖',
    color: 'from-purple-500 to-pink-500',
    techniques: [
      ...agenticAITechniques,
      ...advancedAgenticTechniques,
      ...checkerOutOfLoopTechniques,
      ...resourceExhaustionTechniques,
      ...impactChainTechniques,
      ...untraceabilityTechniques,
      ...criticalSystemInteractionTechniques
    ]
  },
  'memory-attacks': {
    name: 'Memory & Context Attacks',
    description: 'Memory poisoning, RAG exploitation, and context manipulation techniques',
    icon: '🧠',
    color: 'from-pink-500 to-purple-500',
    techniques: memoryAttackTechniques
  },
  'multimodal': {
    name: 'Multimodal Attacks',
    description: 'Cross-modal exploitation and modality-specific attack techniques',
    icon: '🎬',
    color: 'from-indigo-500 to-cyan-500',
    techniques: multimodalTechniques
  },
};

export * from './types';
export * from './prompt-injection';
export * from './jailbreaking';
export * from './adversarial';
export * from './vulnerability-assessment';
export * from './supply-chain';
export * from './model-theft';
export * from './advanced-prompt-injection';
export * from './advanced-jailbreaking';
export * from './ai-safety-evaluation';
export * from './agentic-ai';
export * from './advanced-agentic';
export * from './memory-attacks';
export * from './multimodal';
export * from './checker-out-of-loop';
export * from './resource-exhaustion';
export * from './impact-chain';
export * from './untraceability';
export * from './critical-system-interaction';