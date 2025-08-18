import { ArrowRight, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RecommendationTabProps {
  selectedUseCase: string;
  setSelectedUseCase: (useCase: string) => void;
  userComplexity: string;
  setUserComplexity: (complexity: string) => void;
  userConstraints: string[];
  toggleConstraint: (constraintId: string) => void;
  showRecommendations: boolean;
  setShowRecommendations: (show: boolean) => void;
  getRecommendations: () => any[];
  setSelectedTechnique: (technique: any) => void;
  setActiveTab: (tab: string) => void;
  useCases: any[];
  constraints: any[];
}

export const RecommendationTab = ({
  selectedUseCase,
  setSelectedUseCase,
  userComplexity,
  setUserComplexity,
  userConstraints,
  toggleConstraint,
  showRecommendations,
  setShowRecommendations,
  getRecommendations,
  setSelectedTechnique,
  setActiveTab,
  useCases,
  constraints,
}: RecommendationTabProps) => {
  const router = useRouter();
  return (
    <div className="mx-auto">
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
        <h2 className="text-2xl font-bold mb-6">Find Your Perfect Agentic Pattern</h2>
        
        {/* Use Case Selection */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-4">What's your primary use case?</label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {useCases.map(useCase => (
              <button
                key={useCase.id}
                onClick={() => setSelectedUseCase(useCase.id)}
                className={`p-3 rounded-lg border transition-all ${
                  selectedUseCase === useCase.id
                    ? 'bg-blue-500 border-blue-400'
                    : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="text-2xl mb-1">{useCase.icon}</div>
                <div className="text-sm">{useCase.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Complexity Selection */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-4">How complex is your problem?</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'simple', name: 'Simple', description: 'Straightforward tasks' },
              { id: 'moderate', name: 'Moderate', description: 'Multi-step problems' },
              { id: 'complex', name: 'Complex', description: 'Highly intricate challenges' }
            ].map(level => (
              <button
                key={level.id}
                onClick={() => setUserComplexity(level.id)}
                className={`p-4 rounded-lg border transition-all ${
                  userComplexity === level.id
                    ? 'bg-purple-500 border-purple-400'
                    : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="font-medium">{level.name}</div>
                <div className="text-sm opacity-75 mt-1">{level.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Constraints */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-4">Any specific requirements?</label>
          <div className="flex flex-wrap gap-3">
            {constraints.map(constraint => (
              <button
                key={constraint.id}
                onClick={() => toggleConstraint(constraint.id)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  userConstraints.includes(constraint.id)
                    ? 'bg-green-500 border-green-400'
                    : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                }`}
              >
                <span className="mr-2">{constraint.icon}</span>
                {constraint.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowRecommendations(true)}
          disabled={!selectedUseCase && !userComplexity}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium transition-all hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Get Recommendations
          <ArrowRight className="w-5 h-5 inline ml-2" />
        </button>
      </div>

      {/* Recommendations */}
      {showRecommendations && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Recommended Patterns</h3>
            <div className="text-sm text-gray-400">
              {getRecommendations().length} patterns found
            </div>
          </div>
          
          {getRecommendations().length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
              <div className="text-gray-400 mb-4">
                <div className="text-4xl mb-2">🤖</div>
                <p>No patterns match your criteria yet.</p>
                <p className="text-sm mt-2">Try adjusting your use case, complexity, or constraints.</p>
              </div>
            </div>
          ) : (
            getRecommendations().map((technique, idx) => (
              <div
                key={technique.id}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{technique.icon}</span>
                      <div>
                        <h4 className="text-xl font-semibold">
                          {idx + 1}. {technique.name}
                          {technique.abbr && <span className="text-gray-400 ml-2">({technique.abbr})</span>}
                        </h4>
                        <div className="flex items-center gap-4 mt-1 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-yellow-400">
                              {'★'.repeat(Math.min(Math.ceil(technique.score), 5))}
                              {'☆'.repeat(Math.max(0, 5 - Math.ceil(technique.score)))}
                            </span>
                            <span className="text-sm text-gray-400">
                              Score: {technique.score}/10
                            </span>
                            {technique.confidence && (
                              <span className={`text-xs px-2 py-1 rounded ${
                                technique.confidence > 0.8 ? 'bg-green-500/20 text-green-300' :
                                technique.confidence > 0.6 ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-orange-500/20 text-orange-300'
                              }`}>
                                {Math.round(technique.confidence * 100)}% confidence
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              technique.complexity === 'low' ? 'bg-green-500/20 text-green-300' :
                              technique.complexity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                              technique.complexity === 'high' ? 'bg-orange-500/20 text-orange-300' :
                              'bg-red-500/20 text-red-300'
                            }`}>
                              {technique.complexity}
                            </span>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-medium">
                              {technique.category.replace(/-/g, ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3">{technique.description}</p>
                    <div className="space-y-3">
                      {/* Match Reasons */}
                      <div className="flex flex-wrap gap-2">
                        {technique.reasons.map((reason: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-sm">
                            ✓ {reason}
                          </span>
                        ))}
                      </div>

                      {/* Warnings */}
                      {technique.warnings && technique.warnings.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {technique.warnings.map((warning: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-yellow-600/20 text-yellow-300 rounded-full text-sm">
                              ⚠ {warning}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Synergies */}
                      {technique.synergies && technique.synergies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {technique.synergies.map((synergy: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">
                              🔗 {synergy}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Expandable Features */}
                      {technique.features.length > 0 && (
                        <details className="text-sm">
                          <summary className="cursor-pointer text-gray-400 hover:text-gray-300">
                            Key Features ({technique.features.length})
                          </summary>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-1 ml-4">
                            {technique.features.slice(0, 6).map((feature: string, i: number) => (
                              <div key={i} className="text-gray-400">
                                • {feature}
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      router.push(`/patterns/${technique.category}/${technique.id}`);
                    }}
                    className="ml-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-1"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};