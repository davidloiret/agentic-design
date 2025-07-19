import { ArrowRight, ChevronRight } from 'lucide-react';

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
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
        <h2 className="text-2xl font-bold mb-6">Find Your Perfect Agentic Pattern</h2>
        
        {/* Use Case Selection */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-4">What's your primary use case?</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {useCases.slice(0, 12).map(useCase => (
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
          <h3 className="text-2xl font-bold mb-4">Recommended Patterns</h3>
          {getRecommendations().map((technique, idx) => (
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
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-yellow-400">
                          {'★'.repeat(Math.min(technique.score, 5))}
                        </span>
                        <span className="text-sm text-gray-400">
                          Match score: {technique.score}/5
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3">{technique.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {technique.reasons.map((reason: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                        ✓ {reason}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedTechnique(technique);
                    setActiveTab('explore');
                  }}
                  className="ml-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  View Details
                  <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};