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
import { ChatBot } from './components/ChatBot';
import { techniques } from './techniques';
import { useCases } from './use-cases';
import { categories } from './categories';
import { constraints } from './constraints';
import { type LanguageType } from './pattern-examples';

export const AIReasoningExplorer = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [selectedUseCase, setSelectedUseCase] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [userComplexity, setUserComplexity] = useState('');
  const [userConstraints, setUserConstraints] = useState<string[]>([]);
  const [selectedCategoryState, setSelectedCategoryState] = useState('all');
  
  // Updated to allow parent category selection for details view
  const setSelectedCategory = (categoryId: string) => {
    setSelectedCategoryState(categoryId);
    // Clear selected technique when switching categories
    setSelectedTechnique(null);
  };
  
  const selectedCategory = selectedCategoryState;
  
  // Code sandbox state
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('typescript');
  const [detailsTab, setDetailsTab] = useState<'overview' | 'code' | 'interactive'>('overview');
  
  // Evaluation state
  const [selectedPatterns, setSelectedPatterns] = useState<any[]>([]);
  const [evaluationCriteria, setEvaluationCriteria] = useState<any[]>([]);
  const [testScenario, setTestScenario] = useState('');
  const [selectedModels, setSelectedModels] = useState<any[]>([]);
  const [evaluationResults, setEvaluationResults] = useState<any>(null);
  const [apiTokens, setApiTokens] = useState<any>({});
  const [showTokenModal, setShowTokenModal] = useState(false);

  const getRecommendations = () => {
    if (!selectedUseCase && !userComplexity) return [];

    let recommendations = techniques.map(technique => {
      let score = 0;
      let reasons = [];

      // Use case matching
      if (selectedUseCase && technique.useCases.includes(selectedUseCase)) {
        score += 3;
        const useCase = useCases.find(uc => uc.id === selectedUseCase);
        reasons.push(`Excellent for ${useCase?.name}`);
      }

      // Complexity matching
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

      // Constraint matching
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

  const filteredTechniques = techniques.filter(technique => {
    const matchesSearch = technique.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      technique.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesCategory = false;
    if (selectedCategory === 'all') {
      matchesCategory = true;
    } else {
      // Direct category match
      if (technique.category === selectedCategory) {
        matchesCategory = true;
      } else {
        // Check if selected category is a parent of the technique's category
        const selectedCat = categories.find(cat => cat.id === selectedCategory);
        if (selectedCat?.children?.includes(technique.category)) {
          matchesCategory = true;
        }
      }
    }
    
    return matchesSearch && matchesCategory;
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

      <div className="mx-auto px-6 py-8 h-[calc(100vh-8rem)]">
        {activeTab === 'explore' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
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
            />
            {(() => {
              const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
              
              // Prioritize showing technique details if a technique is selected
              if (selectedTechnique) {
                return (
                  <TechniqueDetails
                    selectedTechnique={selectedTechnique}
                    categories={categories}
                    useCases={useCases}
                    detailsTab={detailsTab}
                    setDetailsTab={setDetailsTab}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                  />
                );
              }
              
              // Show CategoryDetails if the category has detailed description and no technique is selected
              if (selectedCategoryData?.detailedDescription) {
                return (
                  <div className="lg:col-span-3">
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
                <TechniqueDetails
                  selectedTechnique={selectedTechnique}
                  categories={categories}
                  useCases={useCases}
                  detailsTab={detailsTab}
                  setDetailsTab={setDetailsTab}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                />
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
          /* Graph Tab */
          <div className="h-[calc(100vh-16rem)]">
            <NetworkGraph 
              techniques={techniques} 
              categories={categories} 
              useCases={useCases}
              onTechniqueSelect={setSelectedTechnique}
              selectedTechnique={selectedTechnique}
            />
          </div>
        ) : activeTab === 'mindmap' ? (
          /* Mind Map Tab */
          <div className="h-[calc(100vh-12rem)] min-h-[600px]">
            <MindMap 
              techniques={techniques} 
              categories={categories} 
              useCases={useCases}
              onTechniqueSelect={setSelectedTechnique}
              selectedTechnique={selectedTechnique}
            />
          </div>
        ) : activeTab === 'builder' ? (
          /* System Builder Tab */
          <div className="h-[calc(100vh-16rem)]">
            <SystemBuilder 
              techniques={techniques} 
              categories={categories} 
              useCases={useCases}
            />
          </div>
        ) : activeTab === 'projects' ? (
          /* Project Hub Tab */
          <div className="h-[calc(100vh-16rem)]">
            <ProjectHub />
          </div>
        ) : activeTab === 'news' ? (
          /* News Tab */
          <div className="h-[calc(100vh-16rem)]">
            <NewsTab />
          </div>
        ) : (
          /* Evaluation Tab */
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
