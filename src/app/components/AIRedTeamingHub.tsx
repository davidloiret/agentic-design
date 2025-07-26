"use client"

import React, { useState } from 'react';
import { Shield, AlertTriangle, Target, Search, BookOpen, Users, Code, Eye, Lock, Brain, Bug, Zap, ChevronRight, ExternalLink, Play } from 'lucide-react';

interface RedTeamingTechnique {
  id: string;
  name: string;
  category: 'prompt-injection' | 'jailbreaking' | 'data-extraction' | 'adversarial' | 'social-engineering' | 'model-inversion';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  objectives: string[];
  defenses: string[];
  example?: string;
  tools?: string[];
}

interface RedTeamingResource {
  id: string;
  title: string;
  type: 'paper' | 'tool' | 'dataset' | 'framework' | 'guide';
  description: string;
  url?: string;
  category: string;
}

const redTeamingTechniques: RedTeamingTechnique[] = [
  {
    id: 'prompt-injection',
    name: 'Prompt Injection',
    category: 'prompt-injection',
    difficulty: 'beginner',
    description: 'Techniques to manipulate AI model responses by injecting malicious instructions into prompts.',
    objectives: [
      'Bypass safety guardrails',
      'Extract sensitive information',
      'Force unintended behavior',
      'Test input validation'
    ],
    defenses: [
      'Input sanitization',
      'Prompt templates',
      'Output filtering',
      'Context isolation'
    ],
    example: 'Testing if a model can be tricked into ignoring its safety instructions through carefully crafted prompts.',
    tools: ['PromptInject', 'Red Team Toolkit', 'Custom scripts']
  },
  {
    id: 'jailbreaking',
    name: 'AI Jailbreaking',
    category: 'jailbreaking',
    difficulty: 'intermediate',
    description: 'Advanced techniques to bypass AI safety mechanisms and content policies.',
    objectives: [
      'Test safety boundaries',
      'Evaluate robustness',
      'Identify policy gaps',
      'Assess alignment'
    ],
    defenses: [
      'Multi-layer filtering',
      'Constitutional AI',
      'Adversarial training',
      'Human oversight'
    ],
    tools: ['Jailbreak prompts', 'Automated testing frameworks']
  },
  {
    id: 'data-extraction',
    name: 'Training Data Extraction',
    category: 'data-extraction',
    difficulty: 'advanced',
    description: 'Techniques to extract or infer training data from AI models.',
    objectives: [
      'Test data privacy',
      'Identify memorization',
      'Assess information leakage',
      'Evaluate PII protection'
    ],
    defenses: [
      'Differential privacy',
      'Data deduplication',
      'Privacy-preserving training',
      'Output monitoring'
    ],
    tools: ['Membership inference attacks', 'Model inversion tools']
  },
  {
    id: 'adversarial-examples',
    name: 'Adversarial Examples',
    category: 'adversarial',
    difficulty: 'intermediate',
    description: 'Creating inputs designed to fool AI models into making incorrect predictions.',
    objectives: [
      'Test model robustness',
      'Evaluate attack surfaces',
      'Assess defense mechanisms',
      'Understand failure modes'
    ],
    defenses: [
      'Adversarial training',
      'Input preprocessing',
      'Ensemble methods',
      'Certified defenses'
    ],
    tools: ['FGSM', 'PGD', 'C&W attacks', 'AutoAttack']
  },
  {
    id: 'social-engineering',
    name: 'AI-Assisted Social Engineering',
    category: 'social-engineering',
    difficulty: 'intermediate',
    description: 'Using AI to enhance social engineering attacks and test human vulnerabilities.',
    objectives: [
      'Test human factors',
      'Evaluate phishing detection',
      'Assess awareness training',
      'Identify weak points'
    ],
    defenses: [
      'Security awareness training',
      'AI detection tools',
      'Multi-factor authentication',
      'Behavioral analysis'
    ],
    tools: ['Deepfake detection', 'Voice synthesis tools', 'Text generation']
  },
  {
    id: 'model-inversion',
    name: 'Model Inversion Attacks',
    category: 'model-inversion',
    difficulty: 'advanced',
    description: 'Techniques to reconstruct private training data from model outputs.',
    objectives: [
      'Test privacy protection',
      'Evaluate data leakage',
      'Assess model transparency',
      'Identify vulnerabilities'
    ],
    defenses: [
      'Output perturbation',
      'Access controls',
      'Privacy budgets',
      'Secure aggregation'
    ],
    tools: ['Model inversion frameworks', 'Gradient analysis tools']
  }
];

const redTeamingResources: RedTeamingResource[] = [
  {
    id: 'nist-ai-risk',
    title: 'NIST AI Risk Management Framework',
    type: 'framework',
    description: 'Comprehensive framework for managing AI risks including security considerations.',
    category: 'Framework',
    url: 'https://www.nist.gov/itl/ai-risk-management-framework'
  },
  {
    id: 'owasp-top10-llm',
    title: 'OWASP Top 10 for LLMs',
    type: 'guide',
    description: 'Top 10 security risks for Large Language Model applications.',
    category: 'Security Guide'
  },
  {
    id: 'adversarial-ml',
    title: 'Adversarial ML Threat Matrix',
    type: 'framework',
    description: 'Framework for understanding adversarial machine learning threats.',
    category: 'Threat Intelligence'
  },
  {
    id: 'ai-security-papers',
    title: 'AI Security Research Papers',
    type: 'paper',
    description: 'Curated collection of academic papers on AI security and robustness.',
    category: 'Research'
  }
];

const categoryIcons = {
  'prompt-injection': Target,
  'jailbreaking': Lock,
  'data-extraction': Search,
  'adversarial': Zap,
  'social-engineering': Users,
  'model-inversion': Eye
};

const difficultyColors = {
  'beginner': 'text-green-400 bg-green-400/10',
  'intermediate': 'text-yellow-400 bg-yellow-400/10',
  'advanced': 'text-red-400 bg-red-400/10'
};

export const AIRedTeamingHub = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTechnique, setSelectedTechnique] = useState<RedTeamingTechnique | null>(null);

  const categories = Array.from(new Set(redTeamingTechniques.map(t => t.category)));
  const filteredTechniques = selectedCategory 
    ? redTeamingTechniques.filter(t => t.category === selectedCategory)
    : redTeamingTechniques;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-900/20 via-gray-900 to-orange-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-2xl">
                <Shield className="w-12 h-12 text-red-400" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              AI Red Teaming Hub
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Learn defensive security techniques, red teaming methodologies, and vulnerability assessment for AI systems. 
              Build robust defenses against adversarial attacks.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                <span className="text-red-400 font-medium">🛡️ Defensive Focus</span>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2">
                <span className="text-blue-400 font-medium">🔍 Vulnerability Assessment</span>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
                <span className="text-green-400 font-medium">📚 Educational Resources</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Technique Categories</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === null 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Categories
            </button>
            {categories.map(category => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="capitalize">{category.replace('-', ' ')}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Techniques List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Red Teaming Techniques</h2>
            <div className="space-y-4">
              {filteredTechniques.map(technique => {
                const Icon = categoryIcons[technique.category];
                return (
                  <div
                    key={technique.id}
                    className={`bg-gray-900 border rounded-xl p-6 cursor-pointer transition-all hover:border-blue-500/50 hover:shadow-lg ${
                      selectedTechnique?.id === technique.id ? 'border-blue-500 shadow-lg' : 'border-gray-700'
                    }`}
                    onClick={() => setSelectedTechnique(technique)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{technique.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[technique.difficulty]}`}>
                              {technique.difficulty}
                            </span>
                            <span className="text-gray-500 text-sm capitalize">
                              {technique.category.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    </div>
                    <p className="text-gray-300 text-sm">{technique.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technique Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedTechnique ? (
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 sticky top-6">
                <div className="flex items-center space-x-3 mb-4">
                  {React.createElement(categoryIcons[selectedTechnique.category], { 
                    className: "w-6 h-6 text-blue-400" 
                  })}
                  <h3 className="text-xl font-bold text-white">{selectedTechnique.name}</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Objectives
                    </h4>
                    <ul className="space-y-1">
                      {selectedTechnique.objectives.map((objective, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Defenses
                    </h4>
                    <ul className="space-y-1">
                      {selectedTechnique.defenses.map((defense, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          {defense}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedTechnique.example && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Example Scenario
                      </h4>
                      <p className="text-gray-300 text-sm bg-gray-800 rounded-lg p-3">
                        {selectedTechnique.example}
                      </p>
                    </div>
                  )}

                  {selectedTechnique.tools && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Tools & Frameworks
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTechnique.tools.map((tool, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center">
                <Target className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">
                  Select a Technique
                </h3>
                <p className="text-gray-500 text-sm">
                  Click on any red teaming technique to view detailed information, objectives, and defensive strategies.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Security Resources & Frameworks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {redTeamingResources.map(resource => (
              <div
                key={resource.id}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-md font-medium">
                    {resource.type}
                  </span>
                  {resource.url && (
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{resource.description}</p>
                <span className="text-gray-500 text-xs">{resource.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Notice */}
        <div className="mt-16 bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                Ethical Use Guidelines
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                This content is for educational and defensive security purposes only. All techniques should be used responsibly:
              </p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Only test systems you own or have explicit permission to test</li>
                <li>• Focus on building better defenses, not conducting attacks</li>
                <li>• Follow responsible disclosure practices for any vulnerabilities found</li>
                <li>• Ensure compliance with local laws and regulations</li>
                <li>• Consider the potential impact on users and society</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};