'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Search, CheckCircle, AlertCircle, Target, Eye, TrendingUp, Brain, FileText, MessageCircle, BarChart3, Award, Lightbulb, RefreshCw } from 'lucide-react';

interface CriteriaScore {
  name: string;
  score: number;
  maxScore: number;
  issues: string[];
  improvements: string[];
  status: 'evaluating' | 'complete' | 'pending';
}

interface CritiqueSession {
  id: string;
  content: string;
  criteria: CriteriaScore[];
  overallScore: number;
  confidence: number;
  iteration: number;
  status: 'analyzing' | 'critiquing' | 'improving' | 'complete';
  startTime?: number;
  endTime?: number;
}

interface ScenarioConfig {
  name: string;
  description: string;
  initialContent: string;
  contentType: 'report' | 'essay' | 'proposal' | 'code';
  criteria: {
    name: string;
    weight: number;
    description: string;
  }[];
  targetScore: number;
  maxIterations: number;
}

const scenarios: ScenarioConfig[] = [
  {
    name: 'Market Analysis Report',
    description: 'Self-critique a business market analysis report',
    contentType: 'report',
    initialContent: 'Q4 Technology Sector Analysis: The technology sector shows promising growth with AI leading innovation. Cloud computing continues expansion. Mobile technology remains important. Market conditions are favorable for investment.',
    criteria: [
      { name: 'Accuracy', weight: 25, description: 'Factual correctness and data verification' },
      { name: 'Completeness', weight: 20, description: 'Coverage of essential topics and depth' },
      { name: 'Clarity', weight: 20, description: 'Readability and coherent structure' },
      { name: 'Relevance', weight: 20, description: 'Alignment with stated objectives' },
      { name: 'Objectivity', weight: 15, description: 'Bias detection and neutral tone' }
    ],
    targetScore: 85,
    maxIterations: 3
  },
  {
    name: 'Academic Essay',
    description: 'Self-critique an academic research essay',
    contentType: 'essay',
    initialContent: 'The Impact of Social Media on Society: Social media has changed how people communicate. It has both positive and negative effects. People connect more but may feel isolated. Privacy concerns exist. More research is needed.',
    criteria: [
      { name: 'Argument Strength', weight: 30, description: 'Logical reasoning and evidence support' },
      { name: 'Research Quality', weight: 25, description: 'Source credibility and citation accuracy' },
      { name: 'Structure', weight: 20, description: 'Organization and flow of ideas' },
      { name: 'Writing Style', weight: 15, description: 'Academic tone and language precision' },
      { name: 'Originality', weight: 10, description: 'Novel insights and perspectives' }
    ],
    targetScore: 80,
    maxIterations: 4
  },
  {
    name: 'Project Proposal',
    description: 'Self-critique a business project proposal',
    contentType: 'proposal',
    initialContent: 'New Customer Portal Project: We propose building a new customer portal to improve user experience. The project will cost $500K and take 6 months. Benefits include better customer satisfaction and reduced support costs.',
    criteria: [
      { name: 'Feasibility', weight: 25, description: 'Realistic timeline and resource estimates' },
      { name: 'Business Value', weight: 25, description: 'Clear ROI and benefit articulation' },
      { name: 'Risk Assessment', weight: 20, description: 'Identification and mitigation strategies' },
      { name: 'Technical Detail', weight: 20, description: 'Implementation specifics and requirements' },
      { name: 'Stakeholder Impact', weight: 10, description: 'Consideration of affected parties' }
    ],
    targetScore: 88,
    maxIterations: 3
  },
  {
    name: 'Code Documentation',
    description: 'Self-critique technical code documentation',
    contentType: 'code',
    initialContent: 'API Documentation: This function processes user data. It takes a user object and returns processed data. Parameters: user (object). Returns: processed user data. Example: processUser({name: "John", age: 30})',
    criteria: [
      { name: 'Completeness', weight: 30, description: 'All parameters and returns documented' },
      { name: 'Clarity', weight: 25, description: 'Clear explanations and examples' },
      { name: 'Accuracy', weight: 20, description: 'Correct technical information' },
      { name: 'Usability', weight: 15, description: 'Helpful for developers' },
      { name: 'Standards', weight: 10, description: 'Follows documentation conventions' }
    ],
    targetScore: 90,
    maxIterations: 2
  }
];

const SelfCritiqueDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<CritiqueSession | null>(null);
  const [critiqueHistory, setCritiqueHistory] = useState<CritiqueSession[]>([]);
  const [currentPhase, setCurrentPhase] = useState<'analyzing' | 'critiquing' | 'improving' | 'complete'>('analyzing');
  const [logs, setLogs] = useState<string[]>([]);

  const scenario = scenarios[selectedScenario];

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentSession(null);
    setCritiqueHistory([]);
    setCurrentPhase('analyzing');
    setLogs([]);
  };

  const generateCritiqueScores = (content: string, iteration: number): CriteriaScore[] => {
    return scenario.criteria.map(criterion => {
      // Simulate realistic scoring with improvement over iterations
      const baseScore = Math.random() * 40 + 40; // 40-80 base
      const iterationBonus = Math.min(iteration * 8, 20); // Up to 20 points improvement
      const randomVariation = (Math.random() - 0.5) * 10; // ±5 points variation
      
      const finalScore = Math.max(0, Math.min(100, baseScore + iterationBonus + randomVariation));
      
      // Generate realistic issues and improvements
      const commonIssues: { [key: string]: string[] } = {
        'Accuracy': ['Unverified claims detected', 'Outdated statistics', 'Missing source citations'],
        'Completeness': ['Missing competitor analysis', 'Insufficient risk assessment', 'Limited scope coverage'],
        'Clarity': ['Complex sentence structure', 'Unclear terminology', 'Poor paragraph transitions'],
        'Relevance': ['Off-topic sections', 'Weak objective alignment', 'Redundant information'],
        'Objectivity': ['Subjective language detected', 'Potential bias indicators', 'Emotional tone'],
        'Argument Strength': ['Weak evidence support', 'Logical gaps', 'Insufficient examples'],
        'Research Quality': ['Low-quality sources', 'Missing citations', 'Outdated references'],
        'Structure': ['Poor organization', 'Missing sections', 'Weak conclusions'],
        'Writing Style': ['Informal tone', 'Grammar issues', 'Inconsistent style'],
        'Originality': ['Common perspectives', 'Limited novel insights', 'Derivative content'],
        'Feasibility': ['Unrealistic timeline', 'Resource overestimation', 'Technical challenges'],
        'Business Value': ['Unclear ROI', 'Weak benefit articulation', 'Missing metrics'],
        'Risk Assessment': ['Unidentified risks', 'Poor mitigation strategies', 'Impact underestimation'],
        'Technical Detail': ['Vague requirements', 'Missing specifications', 'Implementation gaps'],
        'Stakeholder Impact': ['Overlooked stakeholders', 'Impact not considered', 'Communication gaps'],
        'Usability': ['Poor examples', 'Confusing explanations', 'Missing context'],
        'Standards': ['Non-standard format', 'Missing conventions', 'Inconsistent style']
      };

      const improvementSuggestions: { [key: string]: string[] } = {
        'Accuracy': ['Add fact-checking references', 'Update with current data', 'Include source verification'],
        'Completeness': ['Add missing sections', 'Expand coverage depth', 'Include comprehensive analysis'],
        'Clarity': ['Simplify complex sentences', 'Define technical terms', 'Improve transitions'],
        'Relevance': ['Remove off-topic content', 'Strengthen objective focus', 'Eliminate redundancy'],
        'Objectivity': ['Use neutral language', 'Remove subjective statements', 'Balance perspectives']
      };

      const criterionIssues = commonIssues[criterion.name] || ['Generic issue identified'];
      const criterionImprovements = improvementSuggestions[criterion.name] || ['Apply general improvements'];

      const numIssues = finalScore < 70 ? 2 : finalScore < 85 ? 1 : 0;
      const issues = criterionIssues.slice(0, numIssues);
      const suggestionCount = Math.max(1, Math.ceil((100 - finalScore) / 30));
      const improvements = criterionImprovements.slice(0, suggestionCount);

      return {
        name: criterion.name,
        score: Math.round(finalScore),
        maxScore: 100,
        issues,
        improvements,
        status: 'complete' as const
      };
    });
  };

  const calculateOverallScore = (criteria: CriteriaScore[]): number => {
    const totalWeightedScore = criteria.reduce((sum, criterion, index) => {
      const weight = scenario.criteria[index].weight / 100;
      return sum + (criterion.score * weight);
    }, 0);
    return Math.round(totalWeightedScore);
  };

  const runCritique = async () => {
    setIsRunning(true);
    setCurrentPhase('analyzing');
    
    const startTime = Date.now();
    addLog(`Starting self-critique for ${scenario.name}`);
    addLog(`Target quality score: ${scenario.targetScore}/100`);

    let currentContent = scenario.initialContent;
    let iteration = 1;

    while (iteration <= scenario.maxIterations) {
      addLog(`Beginning iteration ${iteration}/${scenario.maxIterations}`);
      
      // Analysis phase
      setCurrentPhase('analyzing');
      await new Promise(resolve => setTimeout(resolve, 800));
      addLog(`Analyzing content structure and preparing criteria...`);
      
      // Critique phase
      setCurrentPhase('critiquing');
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const criteria = generateCritiqueScores(currentContent, iteration);
      const overallScore = calculateOverallScore(criteria);
      const confidence = Math.min(95, 70 + iteration * 8 + Math.random() * 10);
      
      // Mark criteria as evaluating one by one
      for (let i = 0; i < criteria.length; i++) {
        criteria[i].status = 'evaluating';
        const session: CritiqueSession = {
          id: `session-${iteration}`,
          content: currentContent,
          criteria: [...criteria],
          overallScore,
          confidence: Math.round(confidence),
          iteration,
          status: 'critiquing',
          startTime
        };
        setCurrentSession(session);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        addLog(`Evaluating ${criteria[i].name}: ${criteria[i].score}/100`);
        
        criteria[i].status = 'complete';
      }

      const session: CritiqueSession = {
        id: `session-${iteration}`,
        content: currentContent,
        criteria,
        overallScore,
        confidence: Math.round(confidence),
        iteration,
        status: 'complete',
        startTime,
        endTime: Date.now()
      };

      setCurrentSession(session);
      setCritiqueHistory(prev => [...prev, session]);

      addLog(`Iteration ${iteration} complete: Overall score ${overallScore}/100`);
      addLog(`Confidence level: ${Math.round(confidence)}%`);

      // Check if target reached or max iterations
      if (overallScore >= scenario.targetScore || iteration >= scenario.maxIterations) {
        setCurrentPhase('complete');
        addLog(`Self-critique complete! Final score: ${overallScore}/100`);
        break;
      }

      // Improvement phase
      setCurrentPhase('improving');
      await new Promise(resolve => setTimeout(resolve, 1000));
      addLog(`Applying improvements based on critique feedback...`);
      
      // Simulate content improvement
      const improvementAreas = criteria
        .filter(c => c.score < 85)
        .map(c => c.name.toLowerCase())
        .join(', ');
      
      if (improvementAreas) {
        addLog(`Improving: ${improvementAreas}`);
      }
      
      currentContent = `[Iteration ${iteration + 1}] ${currentContent} [Enhanced with improvements in ${improvementAreas}]`;
      iteration++;
    }

    setIsRunning(false);
  };

  const getCriteriaColor = (score: number) => {
    if (score >= 90) return 'text-green-400 border-green-500';
    if (score >= 80) return 'text-blue-400 border-blue-500';
    if (score >= 70) return 'text-yellow-400 border-yellow-500';
    if (score >= 60) return 'text-orange-400 border-orange-500';
    return 'text-red-400 border-red-500';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Eye className="w-4 h-4 text-gray-400" />;
      case 'evaluating': return <Search className="w-4 h-4 text-blue-400 animate-pulse" />;
      case 'complete': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'report': return <BarChart3 className="w-4 h-4" />;
      case 'essay': return <FileText className="w-4 h-4" />;
      case 'proposal': return <Target className="w-4 h-4" />;
      case 'code': return <MessageCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 bg-gray-900/40 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Self-Critique Pattern Demo</h3>
          <p className="text-gray-300 text-sm">
            Simulate systematic evaluation and iterative improvement through self-reflection
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={runCritique}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Running...' : 'Start Critique'}
          </button>
          <button
            onClick={resetDemo}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Content Type:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scenarios.map((scenario, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedScenario(index);
                resetDemo();
              }}
              className={`p-3 rounded-lg text-left transition-colors border ${
                selectedScenario === index
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                  : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {getContentTypeIcon(scenario.contentType)}
                <span className="font-medium">{scenario.name}</span>
              </div>
              <div className="text-xs text-gray-400 mb-2">{scenario.description}</div>
              <div className="text-xs text-gray-500">
                Target: {scenario.targetScore}/100 • Max iterations: {scenario.maxIterations}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Scenario Info */}
      <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-400">Content Type</div>
            <div className="text-white font-medium capitalize">{scenario.contentType}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Criteria</div>
            <div className="text-white">{scenario.criteria.length} dimensions</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Target Score</div>
            <div className="text-white">{scenario.targetScore}/100</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Phase</div>
            <div className="text-white capitalize">{currentPhase}</div>
          </div>
        </div>
        
        <div>
          <div className="text-sm text-gray-400 mb-2">Sample Content:</div>
          <div className="text-gray-300 text-sm bg-gray-900/50 p-3 rounded-lg">
            "{scenario.initialContent}"
          </div>
        </div>
      </div>

      {/* Current Session Display */}
      {currentSession && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Iteration {currentSession.iteration} - Critique Results
          </h4>
          
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{currentSession.overallScore}</div>
                  <div className="text-sm text-gray-400">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{currentSession.confidence}%</div>
                  <div className="text-sm text-gray-400">Confidence</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className={`w-5 h-5 ${currentSession.overallScore >= scenario.targetScore ? 'text-green-400' : 'text-gray-400'}`} />
                <span className="text-sm text-gray-300">
                  {currentSession.overallScore >= scenario.targetScore ? 'Target Achieved!' : `${scenario.targetScore - currentSession.overallScore} points to target`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSession.criteria.map((criterion, index) => (
                <div
                  key={criterion.name}
                  className={`p-3 rounded-lg border-2 transition-all ${getCriteriaColor(criterion.score)} bg-gray-900/30`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(criterion.status)}
                      <span className="font-medium text-white">{criterion.name}</span>
                    </div>
                    <div className="text-sm font-bold">
                      {criterion.score}/{criterion.maxScore}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-2">
                    Weight: {scenario.criteria[index].weight}%
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        criterion.score >= 90 ? 'bg-green-500' :
                        criterion.score >= 80 ? 'bg-blue-500' :
                        criterion.score >= 70 ? 'bg-yellow-500' :
                        criterion.score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${criterion.score}%` }}
                    ></div>
                  </div>
                  
                  {criterion.issues.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-red-400 mb-1">Issues:</div>
                      {criterion.issues.map((issue, idx) => (
                        <div key={idx} className="text-xs text-gray-300 mb-1">
                          • {issue}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {criterion.improvements.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-green-400 mb-1">Improvements:</div>
                      {criterion.improvements.map((improvement, idx) => (
                        <div key={idx} className="text-xs text-gray-300 mb-1">
                          + {improvement}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Critique History */}
      {critiqueHistory.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Progress History
          </h4>
          
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-400">Quality Score Progress</div>
              <div className="text-sm text-gray-400">
                Iterations: {critiqueHistory.length}/{scenario.maxIterations}
              </div>
            </div>
            
            <div className="flex items-end gap-2 mb-4">
              {critiqueHistory.map((session, index) => (
                <div key={session.id} className="flex-1 text-center">
                  <div
                    className={`bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500`}
                    style={{ 
                      height: `${Math.max(20, (session.overallScore / 100) * 120)}px`,
                      opacity: session.overallScore >= scenario.targetScore ? 1 : 0.7
                    }}
                  ></div>
                  <div className="text-xs text-white font-bold mt-1">{session.overallScore}</div>
                  <div className="text-xs text-gray-400">Iter {session.iteration}</div>
                </div>
              ))}
              
              {/* Target line indicator */}
              <div className="absolute right-4 flex items-center gap-2">
                <div className="w-8 h-0.5 bg-green-400"></div>
                <span className="text-xs text-green-400">Target: {scenario.targetScore}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Best Score:</div>
                <div className="text-white font-bold">
                  {Math.max(...critiqueHistory.map(s => s.overallScore))}/100
                </div>
              </div>
              <div>
                <div className="text-gray-400">Improvement:</div>
                <div className="text-green-400 font-bold">
                  +{critiqueHistory.length > 1 ? 
                    critiqueHistory[critiqueHistory.length - 1].overallScore - critiqueHistory[0].overallScore 
                    : 0} points
                </div>
              </div>
              <div>
                <div className="text-gray-400">Avg Confidence:</div>
                <div className="text-blue-400 font-bold">
                  {Math.round(critiqueHistory.reduce((sum, s) => sum + s.confidence, 0) / critiqueHistory.length)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Execution Logs */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <RefreshCw className="w-5 h-5" />
          Critique Process Log
        </h4>
        <div className="bg-gray-900/60 rounded-lg border border-gray-700 p-4 h-48 overflow-y-auto">
          {logs.length > 0 ? (
            <div className="space-y-1 text-sm font-mono">
              {logs.map((log, index) => (
                <div key={index} className="text-gray-300">
                  {log}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Lightbulb className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                <p className="text-gray-400">Click "Start Critique" to begin self-evaluation</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Final Results */}
      {currentPhase === 'complete' && currentSession && (
        <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-green-400" />
            Self-Critique Complete
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-400 mb-2">Final Results</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Final Quality Score:</span>
                  <span className="text-green-400 font-bold">{currentSession.overallScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Iterations Completed:</span>
                  <span className="text-blue-400">{currentSession.iteration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Achievement:</span>
                  <span className={currentSession.overallScore >= scenario.targetScore ? 'text-green-400' : 'text-orange-400'}>
                    {currentSession.overallScore >= scenario.targetScore ? '✓ Achieved' : 'Partially achieved'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Confidence Level:</span>
                  <span className="text-purple-400">{currentSession.confidence}%</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-400 mb-2">Improvement Summary</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Initial Score:</span>
                  <span className="text-gray-300">{critiqueHistory[0]?.overallScore || 0}/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Quality Gain:</span>
                  <span className="text-green-400">
                    +{critiqueHistory.length > 0 ? 
                      currentSession.overallScore - critiqueHistory[0].overallScore 
                      : 0} points
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Best Criteria:</span>
                  <span className="text-blue-400">
                    {currentSession.criteria.reduce((best, current) => 
                      current.score > best.score ? current : best
                    ).name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Needs Work:</span>
                  <span className="text-orange-400">
                    {currentSession.criteria.reduce((worst, current) => 
                      current.score < worst.score ? current : worst
                    ).name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-300">
            <strong>Summary:</strong> Self-critique process completed {scenario.name.toLowerCase()} evaluation 
            achieving {currentSession.overallScore}/100 quality score through {currentSession.iteration} iteration{currentSession.iteration > 1 ? 's' : ''} 
            of systematic reflection and improvement.
          </div>
        </div>
      )}
    </div>
  );
};

export default SelfCritiqueDemo;