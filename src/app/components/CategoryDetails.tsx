"use client"

import { ArrowLeft, CheckCircle2, Lightbulb, Target, AlertTriangle, Zap, BookOpen, Link, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Category } from '../categories';

interface CategoryDetailsProps {
  category: Category;
  onBack?: () => void;
  techniques?: any[];
  onTechniqueSelect?: (technique: any) => void;
}

export const CategoryDetails = ({ category, onBack, techniques = [], onTechniqueSelect }: CategoryDetailsProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/patterns');
    }
  };

  const handleTechniqueSelect = (technique: any) => {
    if (onTechniqueSelect) {
      onTechniqueSelect(technique);
    } else {
      router.push(`/patterns/${technique.category}/${technique.id}`);
    }
  };
  return (
    <div className="h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 shadow-2xl">
      <div className="p-8 h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {category.name}
              </h1>
              <p className="text-gray-400 text-lg">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        {category.detailedDescription && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-400" />
              Overview
            </h2>
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
              <p className="text-gray-300 leading-relaxed">
                {category.detailedDescription}
              </p>
            </div>
          </div>
        )}


        {/* Practical Applications */}
        {category.useCases && category.useCases.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              Practical Applications & Use Cases
            </h2>
            <div className="grid gap-4">
              {category.useCases.map((useCase, index) => (
                <div key={index} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold text-purple-400">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">
                        {useCase.split(':')[0]}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {useCase.split(':').slice(1).join(':').trim()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why Important */}
        {category.whyImportant && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Why This Matters
            </h2>
            <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/20">
              <p className="text-gray-300 leading-relaxed">
                {category.whyImportant}
              </p>
            </div>
          </div>
        )}

        {/* Implementation Guide */}
        {category.implementationGuide && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Implementation Guide
            </h2>
            
            <div className="grid gap-6">
              {/* When to Use */}
              {category.implementationGuide.whenToUse && category.implementationGuide.whenToUse.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <Clock className="w-3 h-3 text-indigo-400" />
                    </div>
                    When to Use
                  </h3>
                  <div className="grid gap-2">
                    {category.implementationGuide.whenToUse.map((scenario, index) => (
                      <div key={index} className="bg-indigo-500/10 rounded-lg p-3 border border-indigo-500/20">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {scenario}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Best Practices */}
              {category.implementationGuide.bestPractices && category.implementationGuide.bestPractices.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                    Best Practices
                  </h3>
                  <div className="grid gap-2">
                    {category.implementationGuide.bestPractices.map((practice, index) => (
                      <div key={index} className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {practice}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Pitfalls */}
              {category.implementationGuide.commonPitfalls && category.implementationGuide.commonPitfalls.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                    </div>
                    Common Pitfalls
                  </h3>
                  <div className="grid gap-2">
                    {category.implementationGuide.commonPitfalls.map((pitfall, index) => (
                      <div key={index} className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {pitfall}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Techniques */}
        {category.techniques && category.techniques.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              Available Techniques
            </h2>
            <div className="grid gap-3">
              {category.techniques.map((techniqueId, index) => {
                const technique = techniques.find(t => t.id === techniqueId);
                if (!technique) return null;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleTechniqueSelect(technique)}
                    className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-gradient-to-r ${technique.color} shadow-lg`}>
                        {technique.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {technique.name}
                            {technique.abbr && (
                              <span className="text-xs ml-1 text-gray-400">
                                ({technique.abbr})
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              technique.complexity === 'low' ? 'bg-green-500/20 text-green-400' :
                              technique.complexity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              technique.complexity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {technique.complexity}
                            </span>
                            <Link className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                          {technique.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};