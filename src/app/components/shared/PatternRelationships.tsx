'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw, 
  Zap, 
  AlertTriangle, 
  BookOpen, 
  Link, 
  TrendingUp,
  GitBranch,
  Target,
  Shield,
  Lightbulb,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export interface PatternRelationship {
  id: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
  complexity?: 'low' | 'medium' | 'high' | 'very-high';
  reason?: string;
}

export interface RelationshipData {
  // Learning & Progression
  prerequisites?: PatternRelationship[];
  nextSteps?: PatternRelationship[];
  alternatives?: PatternRelationship[];
  
  // Combination & Synergy
  combinesWith?: PatternRelationship[];
  enhancedBy?: PatternRelationship[];
  enhances?: PatternRelationship[];
  
  // Evolution & Variants
  evolvesTo?: PatternRelationship[];
  evolvesFrom?: PatternRelationship[];
  variants?: PatternRelationship[];
  
  // Conflicts & Considerations
  conflictsWith?: PatternRelationship[];
  replacedBy?: PatternRelationship[];
  replaces?: PatternRelationship[];
  
  // Use Case Patterns
  usedIn?: PatternRelationship[];
  usedWith?: PatternRelationship[];
  
  // Industry/Domain Applications
  industryApplications?: {
    domain: string;
    patterns: PatternRelationship[];
    description: string;
  }[];
}

interface PatternRelationshipsProps {
  currentPatternId: string;
  currentPatternName: string;
  relationships: RelationshipData;
  className?: string;
  onPatternClick?: (patternId: string, category: string) => void;
}

interface RelationshipSectionProps {
  title: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  patterns: PatternRelationship[];
  emptyMessage: string;
  onPatternClick?: (patternId: string, category: string) => void;
  showComplexity?: boolean;
  showReason?: boolean;
}

const RelationshipSection = ({
  title,
  icon: Icon,
  iconColor,
  patterns,
  emptyMessage,
  onPatternClick,
  showComplexity = true,
  showReason = true
}: RelationshipSectionProps) => {
  if (!patterns || patterns.length === 0) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
        <div className="flex items-center gap-2 mb-2">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          <h4 className="font-semibold text-gray-300">{title}</h4>
        </div>
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <h4 className="font-semibold text-gray-200">{title}</h4>
        <span className="text-xs text-gray-500">({patterns.length})</span>
      </div>
      <div className="space-y-2">
        {patterns.map((pattern, idx) => (
          <div
            key={pattern.id || idx}
            className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors group cursor-pointer"
            onClick={() => onPatternClick?.(pattern.id, pattern.category)}
          >
            <div className="flex-shrink-0">
              {pattern.icon ? (
                <span className="text-2xl">{pattern.icon}</span>
              ) : (
                <div className="w-6 h-6 bg-blue-500/20 rounded flex items-center justify-center">
                  <Link className="w-3 h-3 text-blue-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h5 className="font-medium text-gray-200 group-hover:text-white transition-colors">
                  {pattern.name}
                </h5>
                {showComplexity && pattern.complexity && (
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    pattern.complexity === 'low' ? 'bg-green-500/20 text-green-300' :
                    pattern.complexity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    pattern.complexity === 'high' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {pattern.complexity}
                  </span>
                )}
                <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded">
                  {pattern.category.replace(/-/g, ' ')}
                </span>
                <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-gray-300 ml-auto" />
              </div>
              <p className="text-sm text-gray-400 mb-1">{pattern.description}</p>
              {showReason && pattern.reason && (
                <p className="text-xs text-gray-500 italic">💡 {pattern.reason}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PatternRelationships = ({
  currentPatternId,
  currentPatternName,
  relationships,
  className = "",
  onPatternClick
}: PatternRelationshipsProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('learning');

  const handlePatternClick = (patternId: string, category: string) => {
    if (onPatternClick) {
      onPatternClick(patternId, category);
    } else {
      router.push(`/patterns/${category}/${patternId}`);
    }
  };

  const tabs = [
    { 
      id: 'learning', 
      label: 'Learning Path', 
      icon: TrendingUp,
      description: 'Prerequisites, next steps, and learning progression'
    },
    { 
      id: 'combinations', 
      label: 'Combinations', 
      icon: GitBranch,
      description: 'Patterns that work well together'
    },
    { 
      id: 'evolution', 
      label: 'Evolution', 
      icon: RotateCcw,
      description: 'Pattern variants and evolution paths'
    },
    { 
      id: 'considerations', 
      label: 'Considerations', 
      icon: AlertTriangle,
      description: 'Conflicts, replacements, and trade-offs'
    }
  ];

  const renderLearningTab = () => (
    <div className="space-y-4">
      <RelationshipSection
        title="Prerequisites"
        icon={ArrowUp}
        iconColor="text-orange-400"
        patterns={relationships.prerequisites || []}
        emptyMessage="No prerequisites needed - great for beginners!"
        onPatternClick={handlePatternClick}
      />
      
      <RelationshipSection
        title="Next Steps"
        icon={ArrowRight}
        iconColor="text-green-400"
        patterns={relationships.nextSteps || []}
        emptyMessage="This pattern can be used independently"
        onPatternClick={handlePatternClick}
      />
      
      <RelationshipSection
        title="Alternatives"
        icon={RotateCcw}
        iconColor="text-blue-400"
        patterns={relationships.alternatives || []}
        emptyMessage="This pattern has a unique approach"
        onPatternClick={handlePatternClick}
      />
    </div>
  );

  const renderCombinationsTab = () => (
    <div className="space-y-4">
      <RelationshipSection
        title="Combines Well With"
        icon={Zap}
        iconColor="text-purple-400"
        patterns={relationships.combinesWith || []}
        emptyMessage="Works best as a standalone pattern"
        onPatternClick={handlePatternClick}
      />
      
      <RelationshipSection
        title="Enhanced By"
        icon={ArrowUp}
        iconColor="text-green-400"
        patterns={relationships.enhancedBy || []}
        emptyMessage="Doesn't require enhancement patterns"
        onPatternClick={handlePatternClick}
      />
      
      <RelationshipSection
        title="Enhances"
        icon={ArrowDown}
        iconColor="text-blue-400"
        patterns={relationships.enhances || []}
        emptyMessage="Doesn't specifically enhance other patterns"
        onPatternClick={handlePatternClick}
      />
    </div>
  );

  const renderEvolutionTab = () => (
    <div className="space-y-4">
      <RelationshipSection
        title="Evolved From"
        icon={ArrowUp}
        iconColor="text-gray-400"
        patterns={relationships.evolvesFrom || []}
        emptyMessage="This is a foundational pattern"
        onPatternClick={handlePatternClick}
      />
      
      <RelationshipSection
        title="Evolves To"
        icon={ArrowDown}
        iconColor="text-cyan-400"
        patterns={relationships.evolvesTo || []}
        emptyMessage="This pattern is well-established"
        onPatternClick={handlePatternClick}
      />
      
      <RelationshipSection
        title="Variants"
        icon={GitBranch}
        iconColor="text-yellow-400"
        patterns={relationships.variants || []}
        emptyMessage="This is the standard implementation"
        onPatternClick={handlePatternClick}
      />
    </div>
  );

  const renderConsiderationsTab = () => (
    <div className="space-y-4">
      <RelationshipSection
        title="Conflicts With"
        icon={AlertTriangle}
        iconColor="text-red-400"
        patterns={relationships.conflictsWith || []}
        emptyMessage="No known conflicts - plays well with others"
        onPatternClick={handlePatternClick}
      />
      
      <RelationshipSection
        title="Replaced By"
        icon={ArrowRight}
        iconColor="text-orange-400"
        patterns={relationships.replacedBy || []}
        emptyMessage="Still a current and relevant pattern"
        onPatternClick={handlePatternClick}
      />
      
      <RelationshipSection
        title="Replaces"
        icon={ArrowRight}
        iconColor="text-green-400"
        patterns={relationships.replaces || []}
        emptyMessage="This pattern doesn't replace others"
        onPatternClick={handlePatternClick}
      />
    </div>
  );

  // Industry Applications Section
  const renderIndustryApplications = () => {
    if (!relationships.industryApplications || relationships.industryApplications.length === 0) {
      return null;
    }

    return (
      <div className="mt-6 pt-6 border-t border-gray-700/50">
        <h3 className="text-lg font-semibold mb-4 text-gray-200 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          Industry Applications
        </h3>
        <div className="grid gap-4">
          {relationships.industryApplications.map((app, idx) => (
            <div key={idx} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
              <h4 className="font-medium text-gray-200 mb-2">{app.domain}</h4>
              <p className="text-sm text-gray-400 mb-3">{app.description}</p>
              <div className="grid gap-2">
                {app.patterns.map((pattern, patternIdx) => (
                  <div
                    key={patternIdx}
                    className="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/30 rounded px-3 py-2 hover:bg-gray-700/50 cursor-pointer transition-colors"
                    onClick={() => handlePatternClick(pattern.id, pattern.category)}
                  >
                    <span className="text-lg">{pattern.icon || '🔗'}</span>
                    <span className="flex-1">{pattern.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-gray-100 flex items-center gap-2">
          <Link className="w-5 h-5 text-blue-400" />
          Pattern Relationships
        </h3>
        <p className="text-gray-400 text-sm">
          Discover how <span className="text-blue-400 font-medium">{currentPatternName}</span> relates to other patterns
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-700/50">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-800 text-white border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Description */}
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            {tabs.find(tab => tab.id === activeTab)?.description}
          </p>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'learning' && renderLearningTab()}
        {activeTab === 'combinations' && renderCombinationsTab()}
        {activeTab === 'evolution' && renderEvolutionTab()}
        {activeTab === 'considerations' && renderConsiderationsTab()}
      </div>

      {/* Industry Applications */}
      {renderIndustryApplications()}
    </div>
  );
};