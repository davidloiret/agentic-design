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
  confidence: number;
  synergies: string[];
  warnings: string[];
  matchDetails: {
    useCaseMatch: boolean;
    complexityMatch: boolean;
    constraintMatches: string[];
    categoryRelevance: number;
    semanticRelevance: number;
  };
}

export interface PatternRelationship {
  id: string;
  synergisticWith: string[];
  alternatives: string[];
  prerequisites: string[];
  antiPatterns: string[];
}

class IntelligentRecommendationService {
  private readonly techniques = techniques;
  private readonly useCases = useCases;
  private readonly constraints = constraints;

  // Enhanced complexity mapping with progressive levels
  private readonly complexityMapping = {
    'simple': { preferred: ['low'], acceptable: ['medium'], avoid: ['high', 'very-high'] },
    'moderate': { preferred: ['medium'], acceptable: ['low', 'high'], avoid: ['very-high'] },
    'complex': { preferred: ['high', 'very-high'], acceptable: ['medium'], avoid: ['low'] }
  };

  // Semantic keyword mapping for better matching
  private readonly semanticKeywords = {
    // Content & Creative
    'content': ['writing', 'creation', 'generation', 'creative', 'text', 'document', 'article'],
    'creative': ['innovation', 'ideation', 'brainstorm', 'design', 'artistic', 'imagination'],
    'writing': ['content', 'text', 'document', 'article', 'copy', 'editorial'],
    
    // Analysis & Research  
    'analysis': ['examine', 'study', 'research', 'investigate', 'analyze', 'evaluate', 'assessment'],
    'research': ['investigation', 'study', 'analysis', 'exploration', 'discovery', 'inquiry'],
    'data': ['information', 'dataset', 'metrics', 'statistics', 'analytics', 'insights'],
    
    // Technical & Development
    'code': ['programming', 'development', 'software', 'technical', 'implementation', 'debugging'],
    'automation': ['workflow', 'process', 'systematic', 'streamline', 'optimize', 'efficiency'],
    'system': ['architecture', 'infrastructure', 'platform', 'framework', 'structure'],
    
    // Decision & Strategy
    'planning': ['strategy', 'roadmap', 'blueprint', 'design', 'organization', 'structure'],
    'decision': ['choice', 'selection', 'evaluation', 'judgment', 'assessment', 'comparison'],
    'optimization': ['improve', 'enhance', 'efficient', 'performance', 'streamline', 'maximize'],
    
    // Quality & Validation
    'quality': ['accuracy', 'precision', 'reliability', 'validation', 'verification', 'standards'],
    'validation': ['verification', 'testing', 'checking', 'confirmation', 'approval', 'audit'],
    'review': ['evaluation', 'assessment', 'analysis', 'feedback', 'critique', 'examination']
  };

  // Pattern relationships and synergies
  private readonly patternRelationships: Record<string, PatternRelationship> = {
    'cot': {
      id: 'cot',
      synergisticWith: ['self-correction', 'reflection-pattern', 'step-back-prompting'],
      alternatives: ['tot', 'got', 'forest-of-thoughts'],
      prerequisites: [],
      antiPatterns: ['parallel-synthesis']
    },
    'tot': {
      id: 'tot', 
      synergisticWith: ['graph-of-thought', 'reflection-pattern', 'meta-reasoning'],
      alternatives: ['cot', 'got'],
      prerequisites: ['cot'],
      antiPatterns: ['sequential-chaining']
    },
    'rag': {
      id: 'naive-rag',
      synergisticWith: ['adaptive-rag', 'hierarchical-rag', 'self-rag'],
      alternatives: ['corrective-rag', 'modular-rag'],
      prerequisites: [],
      antiPatterns: ['memorization-based']
    },
    'supervisor-worker-pattern': {
      id: 'supervisor-worker-pattern',
      synergisticWith: ['message-passing', 'role-based-teamwork', 'handoff-orchestration'],
      alternatives: ['peer-collaboration', 'consensus-algorithms'],
      prerequisites: ['agent-orchestration'],
      antiPatterns: ['sequential-chaining']
    }
  };

  // Enhanced constraint-category mapping with weights
  private readonly constraintOptimization = {
    'speed': {
      excellent: ['parallelization', 'routing', 'resource-aware-optimization'],
      good: ['prompt-chaining', 'tool-use'],
      poor: ['multi-agent', 'reflection'],
      weight: 0.8
    },
    'accuracy': {
      excellent: ['reasoning-techniques', 'reflection', 'evaluation-monitoring'],
      good: ['knowledge-retrieval', 'multi-agent'],
      poor: ['parallelization', 'routing'],
      weight: 0.9
    },
    'transparency': {
      excellent: ['reasoning-techniques', 'evaluation-monitoring'],
      good: ['reflection', 'prompt-chaining'],
      poor: ['multi-agent', 'resource-aware-optimization'],
      weight: 0.7
    },
    'resources': {
      excellent: ['resource-aware-optimization', 'routing'],
      good: ['prompt-chaining', 'reasoning-techniques'],
      poor: ['multi-agent', 'parallelization'],
      weight: 0.6
    },
    'scale': {
      excellent: ['parallelization', 'multi-agent', 'workflow-orchestration'],
      good: ['routing', 'resource-aware-optimization'],
      poor: ['reasoning-techniques', 'reflection'],
      weight: 0.8
    }
  };

  // Advanced use case to category mapping with confidence levels
  private readonly enhancedUseCaseMappings = {
    // Content & Creative (High confidence mappings)
    'content-creation': {
      primary: ['prompt-chaining', 'reasoning-techniques'],
      secondary: ['reflection', 'workflow-orchestration'],
      tertiary: ['evaluation-monitoring'],
      confidence: 0.9
    },
    'creative': {
      primary: ['reasoning-techniques', 'exploration-discovery'],
      secondary: ['reflection', 'parallelization'],
      tertiary: ['multi-agent'],
      confidence: 0.8
    },
    
    // Analysis & Research
    'analysis': {
      primary: ['reasoning-techniques', 'evaluation-monitoring'],
      secondary: ['knowledge-retrieval', 'reflection'],
      tertiary: ['tool-use'],
      confidence: 0.95
    },
    'research': {
      primary: ['knowledge-retrieval', 'reasoning-techniques'],
      secondary: ['workflow-orchestration', 'multi-agent'],
      tertiary: ['evaluation-monitoring'],
      confidence: 0.9
    },
    'data-analysis': {
      primary: ['reasoning-techniques', 'tool-use'],
      secondary: ['evaluation-monitoring', 'workflow-orchestration'],
      tertiary: ['knowledge-retrieval'],
      confidence: 0.95
    },
    
    // Technical & Development
    'code': {
      primary: ['reasoning-techniques', 'tool-use'],
      secondary: ['reflection', 'evaluation-monitoring'],
      tertiary: ['prompt-chaining'],
      confidence: 0.85
    },
    'automation': {
      primary: ['workflow-orchestration', 'tool-use'],
      secondary: ['routing', 'parallelization'],
      tertiary: ['resource-aware-optimization'],
      confidence: 0.9
    },
    
    // Complex Multi-step
    'planning': {
      primary: ['reasoning-techniques', 'workflow-orchestration'],
      secondary: ['goal-setting-monitoring', 'evaluation-monitoring'],
      tertiary: ['reflection'],
      confidence: 0.88
    },
    'multi-step-analysis': {
      primary: ['prompt-chaining', 'reasoning-techniques'],
      secondary: ['workflow-orchestration', 'evaluation-monitoring'],
      tertiary: ['reflection'],
      confidence: 0.92
    },
    
    // Collaborative & Social
    'consensus-building': {
      primary: ['multi-agent', 'reasoning-techniques'],
      secondary: ['evaluation-monitoring', 'reflection'],
      tertiary: ['workflow-orchestration'],
      confidence: 0.85
    },
    'review': {
      primary: ['reflection', 'evaluation-monitoring'],
      secondary: ['reasoning-techniques', 'multi-agent'],
      tertiary: ['knowledge-retrieval'],
      confidence: 0.9
    },
    
    // Performance & Optimization
    'optimization': {
      primary: ['resource-aware-optimization', 'reasoning-techniques'],
      secondary: ['evaluation-monitoring', 'parallelization'],
      tertiary: ['routing'],
      confidence: 0.87
    },
    'rapid-ideation': {
      primary: ['parallelization', 'reasoning-techniques'],
      secondary: ['exploration-discovery', 'multi-agent'],
      tertiary: ['reflection'],
      confidence: 0.8
    }
  };

  getRecommendations(criteria: RecommendationCriteria): RecommendedTechnique[] {
    const { selectedUseCase, userComplexity, userConstraints } = criteria;

    if (!selectedUseCase && !userComplexity && userConstraints.length === 0) {
      return [];
    }

    // Score all techniques with enhanced algorithm
    const scoredTechniques = this.techniques.map(technique => 
      this.intelligentScoreTechnique(technique, criteria)
    );

    // Apply advanced filtering and ranking
    let filtered = scoredTechniques
      .filter(technique => technique.score > 2) // Higher threshold
      .sort((a, b) => {
        // Primary sort by confidence-weighted score
        const scoreA = a.score * a.confidence;
        const scoreB = b.score * b.confidence;
        if (Math.abs(scoreA - scoreB) > 0.5) {
          return scoreB - scoreA;
        }
        // Secondary sort by pure score
        return b.score - a.score;
      });

    // Add synergy recommendations
    filtered = this.addSynergyRecommendations(filtered, criteria);
    
    // Apply diversity filtering to avoid too many similar patterns
    filtered = this.applyDiversityFiltering(filtered);

    return filtered.slice(0, 8); // Return top 8 diverse recommendations
  }

  private intelligentScoreTechnique(technique: Technique, criteria: RecommendationCriteria): RecommendedTechnique {
    let score = 0;
    let confidence = 0.5; // Base confidence
    const reasons: string[] = [];
    const synergies: string[] = [];
    const warnings: string[] = [];
    
    const matchDetails = {
      useCaseMatch: false,
      complexityMatch: false,
      constraintMatches: [] as string[],
      categoryRelevance: 0,
      semanticRelevance: 0
    };

    // 1. Enhanced Use Case Matching (35% weight)
    if (criteria.selectedUseCase) {
      const useCaseScore = this.calculateUseCaseScore(technique, criteria.selectedUseCase);
      score += useCaseScore.score;
      confidence += useCaseScore.confidence * 0.3;
      reasons.push(...useCaseScore.reasons);
      matchDetails.useCaseMatch = useCaseScore.directMatch;
      matchDetails.categoryRelevance = useCaseScore.categoryRelevance;
      matchDetails.semanticRelevance = useCaseScore.semanticRelevance;
    }

    // 2. Intelligent Complexity Matching (25% weight)
    if (criteria.userComplexity) {
      const complexityScore = this.calculateComplexityScore(technique, criteria.userComplexity);
      score += complexityScore.score;
      confidence += complexityScore.confidence * 0.25;
      reasons.push(...complexityScore.reasons);
      warnings.push(...complexityScore.warnings);
      matchDetails.complexityMatch = complexityScore.isGoodMatch;
    }

    // 3. Advanced Constraint Optimization (30% weight)
    if (criteria.userConstraints.length > 0) {
      const constraintScore = this.calculateConstraintScore(technique, criteria.userConstraints);
      score += constraintScore.score;
      confidence += constraintScore.confidence * 0.3;
      reasons.push(...constraintScore.reasons);
      warnings.push(...constraintScore.warnings);
      matchDetails.constraintMatches = constraintScore.matchedConstraints;
    }

    // 4. Pattern Quality & Feature Richness (10% weight)
    const qualityScore = this.calculateQualityScore(technique);
    score += qualityScore;

    // 5. Add synergy detection
    const patternSynergies = this.detectSynergies(technique, criteria);
    synergies.push(...patternSynergies);

    // Normalize confidence
    confidence = Math.min(confidence, 1.0);

    return {
      ...technique,
      score: Math.round(score * 10) / 10,
      confidence: Math.round(confidence * 100) / 100,
      reasons,
      synergies,
      warnings,
      matchDetails
    };
  }

  private calculateUseCaseScore(technique: Technique, useCase: string) {
    let score = 0;
    let confidence = 0.5;
    const reasons: string[] = [];
    let directMatch = false;
    let categoryRelevance = 0;
    let semanticRelevance = 0;

    // Direct use case match (highest confidence)
    if (technique.useCases.includes(useCase)) {
      score += 4;
      confidence += 0.4;
      reasons.push('Direct use case match');
      directMatch = true;
    }

    // Enhanced category mapping with confidence
    const mapping = this.enhancedUseCaseMappings[useCase];
    if (mapping) {
      if (mapping.primary.includes(technique.category)) {
        score += 3.5;
        categoryRelevance = 3;
        confidence += mapping.confidence * 0.35;
        reasons.push('Primary category match');
      } else if (mapping.secondary.includes(technique.category)) {
        score += 2.5;
        categoryRelevance = 2;
        confidence += mapping.confidence * 0.25;
        reasons.push('Secondary category match');
      } else if (mapping.tertiary.includes(technique.category)) {
        score += 1.5;
        categoryRelevance = 1;
        confidence += mapping.confidence * 0.15;
        reasons.push('Tertiary category match');
      }
    }

    // Semantic keyword matching
    const semanticScore = this.calculateSemanticRelevance(technique, useCase);
    if (semanticScore > 0) {
      score += semanticScore;
      semanticRelevance = semanticScore;
      confidence += 0.1;
      reasons.push('Semantic keyword match');
    }

    return { score, confidence, reasons, directMatch, categoryRelevance, semanticRelevance };
  }

  private calculateSemanticRelevance(technique: Technique, useCase: string): number {
    const useCaseKeywords = this.semanticKeywords[useCase] || [useCase];
    const techniqueText = `${technique.name} ${technique.description} ${technique.features.join(' ')}`.toLowerCase();
    
    let matches = 0;
    useCaseKeywords.forEach(keyword => {
      if (techniqueText.includes(keyword.toLowerCase())) {
        matches++;
      }
    });

    return Math.min(matches * 0.3, 1.0); // Max 1 point from semantic matching
  }

  private calculateComplexityScore(technique: Technique, userComplexity: string) {
    const mapping = this.complexityMapping[userComplexity];
    let score = 0;
    let confidence = 0.8;
    const reasons: string[] = [];
    const warnings: string[] = [];
    let isGoodMatch = false;

    if (mapping.preferred.includes(technique.complexity)) {
      score += 3;
      isGoodMatch = true;
      reasons.push(`Perfect complexity match (${technique.complexity})`);
    } else if (mapping.acceptable.includes(technique.complexity)) {
      score += 2;
      isGoodMatch = true;
      reasons.push(`Acceptable complexity (${technique.complexity})`);
    } else if (mapping.avoid.includes(technique.complexity)) {
      score += 0.5;
      confidence -= 0.3;
      warnings.push(`May be too ${technique.complexity === 'low' ? 'simple' : 'complex'} for your needs`);
    }

    return { score, confidence, reasons, warnings, isGoodMatch };
  }

  private calculateConstraintScore(technique: Technique, userConstraints: string[]) {
    let score = 0;
    let confidence = 0.7;
    const reasons: string[] = [];
    const warnings: string[] = [];
    const matchedConstraints: string[] = [];

    userConstraints.forEach(constraint => {
      const optimization = this.constraintOptimization[constraint];
      if (!optimization) return;

      if (optimization.excellent.includes(technique.category)) {
        score += 1.2 * optimization.weight;
        matchedConstraints.push(constraint);
        reasons.push(`Excellent for ${this.constraints.find(c => c.id === constraint)?.name?.toLowerCase()}`);
      } else if (optimization.good.includes(technique.category)) {
        score += 0.8 * optimization.weight;
        matchedConstraints.push(constraint);
        reasons.push(`Good for ${this.constraints.find(c => c.id === constraint)?.name?.toLowerCase()}`);
      } else if (optimization.poor.includes(technique.category)) {
        score -= 0.3;
        confidence -= 0.1;
        warnings.push(`Not optimized for ${this.constraints.find(c => c.id === constraint)?.name?.toLowerCase()}`);
      }
    });

    return { score, confidence, reasons, warnings, matchedConstraints };
  }

  private calculateQualityScore(technique: Technique): number {
    // Quality indicators: feature count, example quality, etc.
    return Math.min(technique.features.length * 0.05, 0.5);
  }

  private detectSynergies(technique: Technique, criteria: RecommendationCriteria): string[] {
    const relationship = this.patternRelationships[technique.id];
    const synergies: string[] = [];

    if (relationship) {
      relationship.synergisticWith.forEach(synergyId => {
        const synergyTechnique = this.techniques.find(t => t.id === synergyId);
        if (synergyTechnique) {
          synergies.push(`Combines well with ${synergyTechnique.name}`);
        }
      });

      if (relationship.prerequisites.length > 0) {
        synergies.push(`Consider learning ${relationship.prerequisites.join(', ')} first`);
      }
    }

    return synergies;
  }

  private addSynergyRecommendations(recommendations: RecommendedTechnique[], criteria: RecommendationCriteria): RecommendedTechnique[] {
    const synergisticTechniques: RecommendedTechnique[] = [];
    
    recommendations.slice(0, 3).forEach(rec => { // Check top 3 for synergies
      const relationship = this.patternRelationships[rec.id];
      if (relationship) {
        relationship.synergisticWith.forEach(synergyId => {
          const synergyTechnique = this.techniques.find(t => t.id === synergyId);
          if (synergyTechnique && !recommendations.find(r => r.id === synergyId)) {
            const scored = this.intelligentScoreTechnique(synergyTechnique, criteria);
            if (scored.score > 1.5) {
              scored.reasons.unshift(`Synergy with ${rec.name}`);
              scored.score += 0.8; // Synergy bonus
              synergisticTechniques.push(scored);
            }
          }
        });
      }
    });

    return [...recommendations, ...synergisticTechniques.slice(0, 2)]; // Add up to 2 synergy recommendations
  }

  private applyDiversityFiltering(recommendations: RecommendedTechnique[]): RecommendedTechnique[] {
    const diverse: RecommendedTechnique[] = [];
    const seenCategories: Set<string> = new Set();

    recommendations.forEach(rec => {
      // Ensure we don't have too many from the same category
      const categoryCount = diverse.filter(d => d.category === rec.category).length;
      if (categoryCount < 2) { // Max 2 per category
        diverse.push(rec);
        seenCategories.add(rec.category);
      } else if (rec.score > diverse[diverse.length - 1]?.score + 1) {
        // Only add if significantly better
        diverse.push(rec);
      }
    });

    return diverse;
  }

  // Helper methods remain the same
  getAvailableUseCases() {
    return this.useCases;
  }

  getAvailableConstraints() {
    return this.constraints;
  }

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

export const intelligentRecommendationService = new IntelligentRecommendationService();