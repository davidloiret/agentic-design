'use client';

import { RecommendationTab } from '../../components/RecommendationTab';
import { intelligentRecommendationService } from '../../services/intelligentRecommendationService';
import { useState } from 'react';

export default function RecommendationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedUseCase, setSelectedUseCase] = useState('');
  const [userComplexity, setUserComplexity] = useState('');
  const [userConstraints, setUserConstraints] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('recommendations');

  // Get dynamic data from the intelligent recommendation service
  const useCases = intelligentRecommendationService.getAvailableUseCases();
  const constraints = intelligentRecommendationService.getAvailableConstraints();

  const toggleConstraint = (constraintId: string) => {
    setUserConstraints(prev => 
      prev.includes(constraintId) 
        ? prev.filter(id => id !== constraintId)
        : [...prev, constraintId]
    );
  };

  const getRecommendations = () => {
    return intelligentRecommendationService.getRecommendations({
      selectedUseCase,
      userComplexity: userComplexity as 'simple' | 'moderate' | 'complex',
      userConstraints
    });
  };

  const techniqueStats = intelligentRecommendationService.getTechniqueStats();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header with stats */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Intelligent AI Pattern Recommendations
          </h1>
          <p className="text-gray-400 mb-2">
            Get intelligent, context-aware recommendations from our collection of {techniqueStats.total} AI patterns
          </p>
          <p className="text-sm text-gray-500 mb-4">
            ✨ Now with semantic matching, confidence scoring, and synergy detection
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">{Object.keys(techniqueStats.categories).length} Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">{useCases.length} Use Cases</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-gray-300">{constraints.length} Constraints</span>
            </div>
          </div>
        </div>

        <RecommendationTab
          selectedUseCase={selectedUseCase}
          setSelectedUseCase={setSelectedUseCase}
          userComplexity={userComplexity}
          setUserComplexity={setUserComplexity}
          userConstraints={userConstraints}
          toggleConstraint={toggleConstraint}
          showRecommendations={showRecommendations}
          setShowRecommendations={setShowRecommendations}
          getRecommendations={getRecommendations}
          setSelectedTechnique={setSelectedTechnique}
          setActiveTab={setActiveTab}
          useCases={useCases}
          constraints={constraints}
        />
        {children}
      </div>
    </div>
  );
}