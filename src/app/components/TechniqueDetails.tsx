import { BookOpen, Code, Check, Brain } from 'lucide-react';
import CodeSandbox from '../../components/CodeSandbox';
import { patternExamples, type PatternId, type LanguageType } from '../pattern-examples';

interface TechniqueDetailsProps {
  selectedTechnique: any;
  categories: any[];
  useCases: any[];
  detailsTab: 'overview' | 'code';
  setDetailsTab: (tab: 'overview' | 'code') => void;
  selectedLanguage: LanguageType;
  setSelectedLanguage: (lang: LanguageType) => void;
}

export const TechniqueDetails = ({
  selectedTechnique,
  categories,
  useCases,
  detailsTab,
  setDetailsTab,
  selectedLanguage,
  setSelectedLanguage,
}: TechniqueDetailsProps) => {
  if (!selectedTechnique) {
    return (
      <div className="lg:col-span-2">
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 flex items-center justify-center h-96">
          <div className="text-center">
            <Brain className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">Select a technique to view details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 border-b border-gray-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
                {selectedTechnique.icon}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {selectedTechnique.name}
                    {selectedTechnique.abbr && (
                      <span className="text-lg ml-2 text-gray-400 font-normal">({selectedTechnique.abbr})</span>
                    )}
                  </h1>
                  <p className="text-gray-300 text-base leading-relaxed mb-3">{selectedTechnique.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${selectedTechnique.color} text-white`}>
                      Complexity: {selectedTechnique.complexity}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-200">
                      {categories.find(c => c.id === selectedTechnique.category)?.name || 'Pattern'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Tabs */}
        <div className="border-b border-gray-600">
          <div className="flex gap-6 px-6">
            <button
              onClick={() => setDetailsTab('overview')}
              className={`py-4 px-2 font-medium transition-all border-b-2 ${
                detailsTab === 'overview'
                  ? 'text-blue-400 border-blue-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setDetailsTab('code')}
              className={`py-4 px-2 font-medium transition-all border-b-2 ${
                detailsTab === 'code'
                  ? 'text-green-400 border-green-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Interactive Code
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-6">
          {detailsTab === 'overview' ? (
            <div className="space-y-8">
              {/* Key Features */}
              <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                  Key Features
                </h2>
                <div className="grid gap-3">
                  {selectedTechnique.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Best Use Cases */}
              <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  Best Use Cases
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {selectedTechnique.useCases.map((useCaseId: string) => {
                    const useCase = useCases.find(uc => uc.id === useCaseId);
                    return (
                      <div
                        key={useCaseId}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 rounded-lg text-sm"
                      >
                        <span className="text-base">{useCase?.icon}</span>
                        <span className="text-gray-300 font-medium">{useCase?.name}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Example */}
              <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                  Example
                </h2>
                <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                    <span className="text-xs font-medium text-gray-400">Implementation Example</span>
                  </div>
                  <div className="p-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-mono">{selectedTechnique.example}</pre>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Language Selection */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                  Interactive Code Examples
                </h2>
                <div className="flex gap-2">
                  {(['typescript', 'python', 'rust'] as LanguageType[]).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedLanguage === lang
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Code Sandbox */}
              {patternExamples[selectedTechnique.id as PatternId] ? (
                <CodeSandbox
                  patternId={selectedTechnique.id}
                  initialCode={patternExamples[selectedTechnique.id as PatternId][selectedLanguage]}
                  language={selectedLanguage}
                  onCodeChange={(code) => {
                    console.log('Code changed:', code);
                  }}
                />
              ) : (
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
                  <Code className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                  <p className="text-gray-400">Code examples coming soon for this pattern</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};