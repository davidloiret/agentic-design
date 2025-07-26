"use client"

import React, { useState } from 'react';
import { NetworkGraph } from './NetworkGraph';
import { MindMap } from './MindMap';
import { EvaluationInterface } from './EvaluationInterface';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { TechniquesList } from './components/TechniquesList';
import { TechniqueDetails } from './components/TechniqueDetails';
import { CategoryDetails } from './components/CategoryDetails';
import { RecommendationTab } from './components/RecommendationTab';
import { SystemBuilder } from './components/SystemBuilder';
import { NewsTab } from './components/NewsTab';
import { ProjectHub } from './components/ProjectHub';
import { InferenceTab } from './components/InferenceTab';
import { FineTuningTab } from './components/FineTuningTab';
import { LearningHub } from './components/LearningHub';
import { ChatBot } from './components/ChatBot';
import { techniques } from './techniques';
import { useCases } from './use-cases';
import { categories } from './categories';
import { constraints } from './constraints';
import { type LanguageType } from './pattern-examples';
import { Technique, TechniqueCategory } from './techniques/types';
import Fuse from 'fuse.js';

const options = {
  keys: ['name', 'abbr', 'description', 'category', 'useCases'],
  threshold: 0.3
};

interface EvaluationCriteria {
  id: string;
  name: string;
  weight: number;
}

interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  enabled: boolean;
}

interface EvaluationResult {
  modelId: string;
  patternId: string;
  score: number;
  metrics: { [key: string]: number };
  feedback: string;
}

interface ApiTokens {
  [provider: string]: string;
}

export const AIReasoningExplorer = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [selectedUseCase, setSelectedUseCase] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [userComplexity, setUserComplexity] = useState('');
  const [userConstraints, setUserConstraints] = useState<string[]>([]);
  const [selectedCategoryState, setSelectedCategoryState] = useState('all');
  
  const setSelectedCategory = (categoryId: string) => {
    setSelectedCategoryState(categoryId);
    setSelectedTechnique(null);
  };
  
  const selectedCategory = selectedCategoryState;
  
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('typescript');
  const [detailsTab, setDetailsTab] = useState<'overview' | 'flow' | 'interactive' | 'code'>('overview');
  
  const [selectedPatterns, setSelectedPatterns] = useState<Technique[]>([]);
  const [evaluationCriteria, setEvaluationCriteria] = useState<EvaluationCriteria[]>([]);
  const [testScenario, setTestScenario] = useState('');
  const [selectedModels, setSelectedModels] = useState<ModelConfig[]>([]);
  const [evaluationResults, setEvaluationResults] = useState<EvaluationResult[] | null>(null);
  const [apiTokens, setApiTokens] = useState<ApiTokens>({});
  const [showTokenModal, setShowTokenModal] = useState(false);

  const getRecommendations = () => {
    if (!selectedUseCase && !userComplexity) return [];

    const recommendations = techniques.map(technique => {
      let score = 0;
      const reasons: string[] = [];

      if (selectedUseCase && technique.useCases.includes(selectedUseCase)) {
        score += 3;
        const useCase = useCases.find(uc => uc.id === selectedUseCase);
        reasons.push(`Excellent for ${useCase?.name}`);
      }

      if (userComplexity === 'simple' && technique.complexity === 'low') {
        score += 2;
        reasons.push('Simple to implement');
      } else if (userComplexity === 'moderate' && technique.complexity === 'medium') {
        score += 2;
        reasons.push('Balanced complexity');
      } else if (userComplexity === 'complex' && ['high', 'very-high'].includes(technique.complexity)) {
        score += 2;
        reasons.push('Handles complex scenarios');
      }

      if (userConstraints.includes('speed') && ['cot', 'self-correction'].includes(technique.id)) {
        score += 1;
        reasons.push('Relatively fast execution');
      }
      if (userConstraints.includes('accuracy') && ['palm', 'rlvr', 'tot'].includes(technique.id)) {
        score += 1;
        reasons.push('High accuracy potential');
      }
      if (userConstraints.includes('transparency') && ['cot', 'react'].includes(technique.id)) {
        score += 1;
        reasons.push('Transparent reasoning process');
      }
      if (userConstraints.includes('resources') && technique.complexity === 'low') {
        score += 1;
        reasons.push('Resource efficient');
      }

      return {
        ...technique,
        score,
        reasons,
        recommended: score > 0
      };
    });

    return recommendations
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  };

  const fuse = new Fuse(techniques, options);

  // Perform search
  const searchFilteredTechniques = searchQuery
    ? fuse.search(searchQuery).map(result => result.item)
    : techniques;

  const filteredTechniques = searchFilteredTechniques.filter(technique => {
    return true;
  });

  const toggleConstraint = (constraintId: string) => {
    setUserConstraints(prev =>
      prev.includes(constraintId)
        ? prev.filter(c => c !== constraintId)
        : [...prev, constraintId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mx-auto px-6 py-8 h-[calc(100vh-5rem)]">
        {activeTab === 'explore' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full overflow-hidden">
            <TechniquesList
              techniques={techniques}
              categories={categories}
              selectedTechnique={selectedTechnique}
              setSelectedTechnique={setSelectedTechnique}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              filteredTechniques={filteredTechniques}
              searchFilteredTechniques={searchFilteredTechniques}
            />
            {(() => {
              const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
              
              if (selectedTechnique) {
                return (
                  <div className="lg:col-span-3 overflow-y-auto">
                    <TechniqueDetails
                      selectedTechnique={selectedTechnique}
                      categories={categories}
                      useCases={useCases}
                      detailsTab={detailsTab}
                      setDetailsTab={setDetailsTab}
                      selectedLanguage={selectedLanguage}
                      setSelectedLanguage={setSelectedLanguage}
                    />
                  </div>
                );
              }
              
              if (selectedCategoryData?.detailedDescription) {
                return (
                  <div className="lg:col-span-3 overflow-y-auto">
                    <CategoryDetails
                      category={selectedCategoryData}
                      onBack={() => setSelectedCategory('all')}
                      techniques={techniques}
                      onTechniqueSelect={setSelectedTechnique}
                    />
                  </div>
                );
              }
              
              return (
                <div className="lg:col-span-3 overflow-y-auto">
                  <TechniqueDetails
                    selectedTechnique={selectedTechnique}
                    categories={categories}
                    useCases={useCases}
                    detailsTab={detailsTab}
                    setDetailsTab={setDetailsTab}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                  />
                </div>
              );
            })()}
          </div>
        ) : activeTab === 'recommend' ? (
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
        ) : activeTab === 'graph' ? (
          <div className="h-[calc(100vh-15rem)]">
            <NetworkGraph 
              techniques={techniques} 
              categories={categories} 
              useCases={useCases}
              onTechniqueSelect={setSelectedTechnique}
              selectedTechnique={selectedTechnique}
            />
          </div>
        ) : activeTab === 'inference' ? (
          <div className="h-[calc(100vh-11rem)]">
            <InferenceTab />
          </div>
        ) : activeTab === 'finetuning' ? (
          <div className="h-[calc(100vh-11rem)]">
            <FineTuningTab />
          </div>
        ) : activeTab === 'mindmap' ? (
          <div className="h-[calc(100vh-11rem)] min-h-[600px]">
            <MindMap 
              techniques={techniques} 
              categories={categories} 
              useCases={useCases}
              onTechniqueSelect={setSelectedTechnique}
              selectedTechnique={selectedTechnique}
            />
          </div>
        ) : activeTab === 'builder' ? (
          <div className="h-[calc(100vh-15rem)]">
            <SystemBuilder 
              techniques={techniques} 
              categories={categories} 
              useCases={useCases}
            />
          </div>
        ) : activeTab === 'projects' ? (
          <div className="h-[calc(100vh-15rem)]">
            <ProjectHub />
          </div>
        ) : activeTab === 'news' ? (
          <div className="h-[calc(100vh-15rem)]">
            <NewsTab />
          </div>
        ) : activeTab === 'learning' ? (
          <div className="h-[calc(100vh-11rem)]">
            <LearningHub 
              techniques={techniques}
              categories={categories}
            />
          </div>
        ) : (
          <EvaluationInterface 
            techniques={techniques}
            categories={categories}
            useCases={useCases}
            selectedPatterns={selectedPatterns}
            setSelectedPatterns={setSelectedPatterns}
            evaluationCriteria={evaluationCriteria}
            setEvaluationCriteria={setEvaluationCriteria}
            testScenario={testScenario}
            setTestScenario={setTestScenario}
            selectedModels={selectedModels}
            setSelectedModels={setSelectedModels}
            evaluationResults={evaluationResults}
            setEvaluationResults={setEvaluationResults}
            apiTokens={apiTokens}
            setApiTokens={setApiTokens}
            showTokenModal={showTokenModal}
            setShowTokenModal={setShowTokenModal}
          />
        )}
      </div>
      
      <ChatBot 
        onRecommendationSelect={(useCase, complexity) => {
          setSelectedUseCase(useCase);
          setUserComplexity(complexity);
          setShowRecommendations(true);
          setActiveTab('recommend');
        }}
        getRecommendations={getRecommendations}
        techniques={techniques}
      />
    </div>
  );
};
