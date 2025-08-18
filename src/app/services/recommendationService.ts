import { techniques } from '../techniques';
import { useCases } from '../use-cases';
import { constraints } from '../constraints';
import { Technique } from '../techniques/types';

export interface RecommendationCriteria {
  selectedUseCase: string;
  userComplexity: 'simple' | 'moderate' | 'complex';
  userConstraints: string[];
}

export interface RecommendedTechnique extends Technique {
  score: number;
  reasons: string[];
  matchDetails: {
    useCaseMatch: boolean;
    complexityMatch: boolean;
    constraintMatches: string[];
    categoryRelevance: number;
  };
}

class RecommendationService {
  private readonly techniques = techniques;
  private readonly useCases = useCases;
  private readonly constraints = constraints;

  private readonly complexityMapping = {
    'simple': ['low'],
    'moderate': ['low', 'medium'],
    'complex': ['medium', 'high', 'very-high']
  };

  private readonly constraintWeights = {
    'speed': ['parallelization', 'routing', 'resource-aware-optimization'],
    'accuracy': ['reasoning-techniques', 'reflection', 'evaluation-monitoring'],
    'transparency': ['reasoning-techniques', 'evaluation-monitoring'],
    'resources': ['resource-aware-optimization', 'context-orchestration'],
    'scale': ['parallelization', 'multi-agent', 'workflow-orchestration']
  };

  private readonly useCaseCategoryMapping = {
    // Analysis & Research
    'complex-qa': ['reasoning-techniques', 'knowledge-retrieval', 'reflection'],
    'analysis': ['reasoning-techniques', 'evaluation-monitoring', 'knowledge-retrieval'],
    'data-analysis': ['reasoning-techniques', 'evaluation-monitoring', 'tool-use'],
    'research': ['knowledge-retrieval', 'reasoning-techniques', 'workflow-orchestration'],
    'investigation': ['reasoning-techniques', 'knowledge-retrieval', 'evaluation-monitoring'],
    'research-synthesis': ['knowledge-retrieval', 'reasoning-techniques', 'memory-management'],

    // Planning & Strategy  
    'planning': ['reasoning-techniques', 'goal-setting-monitoring', 'workflow-orchestration'],
    'project-planning': ['workflow-orchestration', 'goal-setting-monitoring', 'reasoning-techniques'],
    'decision-making': ['reasoning-techniques', 'evaluation-monitoring', 'reflection'],
    'system-design': ['reasoning-techniques', 'workflow-orchestration', 'goal-setting-monitoring'],
    'innovation': ['reasoning-techniques', 'exploration-discovery', 'reflection'],

    // Content & Creativity
    'content': ['prompt-chaining', 'reasoning-techniques', 'reflection'],
    'content-creation': ['prompt-chaining', 'workflow-orchestration', 'reasoning-techniques'],
    'creative': ['reasoning-techniques', 'exploration-discovery', 'reflection'],
    'content-refinement': ['reflection', 'reasoning-techniques', 'evaluation-monitoring'],
    'creative-iteration': ['reflection', 'reasoning-techniques', 'workflow-orchestration'],

    // Technical & Code
    'code': ['reasoning-techniques', 'tool-use', 'reflection'],
    'automation': ['workflow-orchestration', 'tool-use', 'routing'],
    'workflow-automation': ['workflow-orchestration', 'routing', 'tool-use'],
    'optimization': ['reasoning-techniques', 'resource-aware-optimization', 'evaluation-monitoring'],

    // Mathematical & Scientific
    'math': ['reasoning-techniques', 'tool-use', 'evaluation-monitoring'],
    'scientific': ['reasoning-techniques', 'tool-use', 'evaluation-monitoring'],
    'financial': ['reasoning-techniques', 'evaluation-monitoring', 'tool-use'],

    // Multi-step processes
    'multi-step-analysis': ['prompt-chaining', 'reasoning-techniques', 'workflow-orchestration'],
    'data-processing': ['workflow-orchestration', 'tool-use', 'parallelization'],
    'quality-improvement': ['reflection', 'evaluation-monitoring', 'reasoning-techniques'],

    // Collaborative & Social
    'consensus-building': ['multi-agent', 'reasoning-techniques', 'evaluation-monitoring'],
    'review': ['reflection', 'evaluation-monitoring', 'reasoning-techniques'],

    // Specialized domains
    'personalization': ['routing', 'memory-management', 'context-orchestration'],
    'adaptive-workflows': ['routing', 'context-orchestration', 'workflow-orchestration'],
    'user-interfaces': ['routing', 'context-orchestration', 'evaluation-monitoring'],
    'rapid-ideation': ['parallelization', 'reasoning-techniques', 'exploration-discovery'],

    // Safety & Security
    'security': ['safety', 'input-validation', 'evaluation-monitoring'],
    'validation': ['evaluation-monitoring', 'reflection', 'reasoning-techniques'],
    'quality-assurance': ['evaluation-monitoring', 'reflection', 'reasoning-techniques'],
    'content-moderation': ['safety', 'evaluation-monitoring', 'reasoning-techniques'],
    'compliance': ['safety', 'evaluation-monitoring', 'reasoning-techniques'],
  };

  getRecommendations(criteria: RecommendationCriteria): RecommendedTechnique[] {
    const { selectedUseCase, userComplexity, userConstraints } = criteria;

    if (!selectedUseCase && !userComplexity && userConstraints.length === 0) {
      return [];
    }

    const scoredTechniques = this.techniques.map(technique => 
      this.scoreTechnique(technique, criteria)
    );

    // Filter out techniques with very low scores and sort by score
    return scoredTechniques
      .filter(technique => technique.score > 1)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Return top 10 recommendations
  }

  private scoreTechnique(technique: Technique, criteria: RecommendationCriteria): RecommendedTechnique {
    let score = 0;
    const reasons: string[] = [];
    const matchDetails = {
      useCaseMatch: false,
      complexityMatch: false,
      constraintMatches: [] as string[],
      categoryRelevance: 0
    };

    // Use Case Matching (40% of score)
    if (criteria.selectedUseCase) {
      const useCaseMatch = technique.useCases.includes(criteria.selectedUseCase);
      const categoryRelevance = this.getCategoryRelevanceForUseCase(
        criteria.selectedUseCase, 
        technique.category
      );

      if (useCaseMatch) {
        score += 4;
        reasons.push('Direct use case match');
        matchDetails.useCaseMatch = true;
      } else if (categoryRelevance > 0) {
        score += categoryRelevance;
        reasons.push('Category matches use case requirements');
        matchDetails.categoryRelevance = categoryRelevance;
      }
    }

    // Complexity Matching (25% of score)  
    if (criteria.userComplexity) {
      const allowedComplexities = this.complexityMapping[criteria.userComplexity];
      if (allowedComplexities.includes(technique.complexity)) {
        const complexityScore = this.getComplexityScore(criteria.userComplexity, technique.complexity);
        score += complexityScore;
        reasons.push(`Appropriate complexity level (${technique.complexity})`);
        matchDetails.complexityMatch = true;
      }
    }

    // Constraint Matching (30% of score)
    if (criteria.userConstraints.length > 0) {
      const constraintScore = this.getConstraintScore(technique, criteria.userConstraints);
      score += constraintScore.score;
      reasons.push(...constraintScore.reasons);
      matchDetails.constraintMatches = constraintScore.matchedConstraints;
    }

    // Feature Quality Bonus (5% of score)
    const featureScore = Math.min(technique.features.length * 0.1, 0.5);
    score += featureScore;

    return {
      ...technique,
      score: Math.round(score * 10) / 10, // Round to 1 decimal
      reasons,
      matchDetails
    };
  }

  private getCategoryRelevanceForUseCase(useCase: string, category: string): number {
    const relevantCategories = this.useCaseCategoryMapping[useCase] || [];
    const index = relevantCategories.indexOf(category);
    
    if (index === 0) return 3;   // Primary match
    if (index === 1) return 2;   // Secondary match  
    if (index === 2) return 1;   // Tertiary match
    return 0;                    // No match
  }

  private getComplexityScore(userComplexity: string, techniqueComplexity: string): number {
    const complexityScores = {
      'simple': { 'low': 2.5, 'medium': 1, 'high': 0, 'very-high': 0 },
      'moderate': { 'low': 2, 'medium': 2.5, 'high': 1, 'very-high': 0 },
      'complex': { 'low': 1, 'medium': 2, 'high': 2.5, 'very-high': 2.5 }
    };

    return complexityScores[userComplexity]?.[techniqueComplexity] || 0;
  }

  private getConstraintScore(technique: Technique, userConstraints: string[]): {
    score: number;
    reasons: string[];
    matchedConstraints: string[];
  } {
    let score = 0;
    const reasons: string[] = [];
    const matchedConstraints: string[] = [];

    userConstraints.forEach(constraint => {
      const relevantCategories = this.constraintWeights[constraint] || [];
      
      if (relevantCategories.includes(technique.category)) {
        score += 1;
        matchedConstraints.push(constraint);
        
        const constraintName = this.constraints.find(c => c.id === constraint)?.name || constraint;
        reasons.push(`Optimized for ${constraintName.toLowerCase()}`);
      }
    });

    return { score, reasons, matchedConstraints };
  }

  // Helper method to get all available use cases for UI
  getAvailableUseCases() {
    return this.useCases;
  }

  // Helper method to get all available constraints for UI
  getAvailableConstraints() {
    return this.constraints;
  }

  // Helper method to get technique statistics
  getTechniqueStats() {
    const categoryCounts = this.techniques.reduce((acc, technique) => {
      acc[technique.category] = (acc[technique.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const complexityCounts = this.techniques.reduce((acc, technique) => {
      acc[technique.complexity] = (acc[technique.complexity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: this.techniques.length,
      categories: categoryCounts,
      complexities: complexityCounts
    };
  }
}

export const recommendationService = new RecommendationService();