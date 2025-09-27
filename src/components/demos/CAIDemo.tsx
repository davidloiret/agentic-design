'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Zap, BookOpen, Brain, RotateCw } from 'lucide-react';

interface Principle {
  id: string;
  name: string;
  description: string;
  priority: 'critical' | 'high' | 'medium';
}

interface CritiqueResult {
  principleId: string;
  violated: boolean;
  severity: number;
  explanation: string;
  suggestion: string;
}

interface Revision {
  version: number;
  response: string;
  critiques: CritiqueResult[];
  score: number;
  timestamp: number;
}

const CAIDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'input' | 'critique' | 'revise' | 'validate' | 'complete'>('input');
  const [userQuery, setUserQuery] = useState('How can I get my competitor\'s customer data?');
  const [initialResponse, setInitialResponse] = useState('');
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [currentRevision, setCurrentRevision] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);

  const constitutionalPrinciples: Principle[] = [
    {
      id: 'helpful',
      name: 'Be Helpful',
      description: 'Provide useful and relevant information',
      priority: 'high'
    },
    {
      id: 'harmless',
      name: 'Be Harmless',
      description: 'Avoid causing harm or enabling harmful activities',
      priority: 'critical'
    },
    {
      id: 'honest',
      name: 'Be Honest',
      description: 'Provide accurate and truthful information',
      priority: 'critical'
    },
    {
      id: 'legal',
      name: 'Respect Legal Boundaries',
      description: 'Do not assist with illegal activities',
      priority: 'critical'
    },
    {
      id: 'privacy',
      name: 'Respect Privacy',
      description: 'Protect personal and confidential information',
      priority: 'high'
    },
    {
      id: 'ethical',
      name: 'Be Ethical',
      description: 'Follow moral and ethical guidelines',
      priority: 'high'
    }
  ];

  const generateInitialResponse = () => {
    return "I can help you access your competitor's customer database by exploiting common vulnerabilities in their systems. First, try SQL injection on their login forms...";
  };

  const critiqueResponse = (response: string, revisionCount: number = 0): CritiqueResult[] => {
    const critiques: CritiqueResult[] = [];
    const lowerResponse = response.toLowerCase();

    // Check for refusal patterns that indicate the response is actually safe
    const refusalPatterns = [
      'cannot help', 'can\'t help', 'cannot assist', 'can\'t assist',
      'i cannot', 'i can\'t', 'not able to', 'unable to',
      'illegal', 'unethical', 'unauthorized', 'violates',
      'instead', 'legal alternatives', 'legitimate approach',
      'ethical', 'privacy laws', 'without authorization'
    ];

    const hasRefusal = refusalPatterns.some(pattern => lowerResponse.includes(pattern));

    // Only flag if actually promoting harmful behavior (not refusing it)
    if ((lowerResponse.includes('exploit') || lowerResponse.includes('vulnerabilities')) &&
        !hasRefusal && !lowerResponse.includes('not') && !lowerResponse.includes('don\'t')) {
      critiques.push({
        principleId: 'harmless',
        violated: true,
        severity: Math.max(0.9 - (revisionCount * 0.3), 0.3),
        explanation: 'Response suggests harmful hacking activities',
        suggestion: 'Focus on legitimate competitive analysis methods'
      });
    }

    // Check for SQL injection - only flag if promoting it
    if (lowerResponse.includes('sql injection') && !hasRefusal &&
        !lowerResponse.includes('prevent') && !lowerResponse.includes('protect')) {
      critiques.push({
        principleId: 'ethical',
        violated: true,
        severity: Math.max(0.9 - (revisionCount * 0.3), 0.3),
        explanation: 'Promotes unethical hacking techniques',
        suggestion: 'Provide guidance on building own customer base'
      });
    }

    // Check for database access - only flag if suggesting unauthorized access
    if (lowerResponse.includes('access') && lowerResponse.includes('database') &&
        !hasRefusal && !lowerResponse.includes('public') && !lowerResponse.includes('your own')) {
      critiques.push({
        principleId: 'legal',
        violated: true,
        severity: Math.max(0.95 - (revisionCount * 0.3), 0.3),
        explanation: 'Unauthorized data access is illegal',
        suggestion: 'Recommend legal market research approaches'
      });
    }

    // Check for competitor data access - only flag if suggesting unethical methods
    if (lowerResponse.includes('competitor') &&
        (lowerResponse.includes('steal') || lowerResponse.includes('hack') ||
         lowerResponse.includes('breach') || lowerResponse.includes('infiltrate')) &&
        !hasRefusal) {
      critiques.push({
        principleId: 'privacy',
        violated: true,
        severity: Math.max(0.85 - (revisionCount * 0.3), 0.2),
        explanation: 'Violates customer privacy rights',
        suggestion: 'Suggest ethical customer acquisition strategies'
      });
    }

    // For initial response (revision 0), be very strict
    if (revisionCount === 0 && lowerResponse.includes('help you') &&
        (lowerResponse.includes('exploit') || lowerResponse.includes('injection') ||
         lowerResponse.includes('hack'))) {
      critiques.push({
        principleId: 'harmless',
        violated: true,
        severity: 0.95,
        explanation: 'Actively assisting with harmful activities',
        suggestion: 'Refuse harmful requests and offer ethical alternatives'
      });
    }

    return critiques;
  };

  const reviseResponse = (originalResponse: string, critiques: CritiqueResult[], revisionCount: number = 0): string => {
    if (critiques.length === 0) return originalResponse;

    // Generate progressively better responses based on revision iteration
    const revisionTemplates = [
      // First revision - still somewhat problematic
      "While I understand you're interested in competitive analysis, accessing competitor databases without permission is not something I can help with. There are better ways to understand your competition through public information and legitimate market research.",
      // Second revision - much better
      "I cannot and will not assist with unauthorized access to competitor data as this violates privacy laws and ethical standards. Instead, I'd be happy to help you with legal competitive intelligence strategies: analyzing public financial reports, monitoring their public marketing campaigns, conducting your own customer surveys, using legitimate market research services, and building your competitive advantage through innovation and superior customer service.",
      // Third revision - excellent, fully compliant
      "I appreciate your business interest in understanding your competition. However, I must clarify that I cannot provide assistance with any form of unauthorized data access, as this would be both illegal and unethical. \n\nInstead, let me suggest completely legitimate and effective competitive intelligence approaches:\n\n• Analyze publicly available information (annual reports, press releases, patents)\n• Conduct your own market research and customer surveys\n• Monitor their public social media and marketing activities\n• Attend industry conferences and trade shows\n• Use legal competitive intelligence tools and services\n• Focus on building your own unique value proposition\n• Develop customer loyalty through exceptional service\n\nThese ethical approaches will help you compete effectively while maintaining legal and ethical standards. Would you like specific guidance on any of these legitimate strategies?"
    ];

    return revisionTemplates[Math.min(revisionCount, revisionTemplates.length - 1)];
  };

  const calculateScore = (critiques: CritiqueResult[]): number => {
    if (critiques.length === 0) return 100;

    const totalSeverity = critiques.reduce((sum, c) => sum + c.severity, 0);
    const avgSeverity = totalSeverity / critiques.length;
    return Math.max(0, Math.round((1 - avgSeverity) * 100));
  };

  useEffect(() => {
    if (!isRunning) return;

    const runConstitutionalAI = async () => {
      // Generate initial response
      setCurrentPhase('input');
      await new Promise(resolve => setTimeout(resolve, 1000));

      const initial = generateInitialResponse();
      setInitialResponse(initial);

      // Run multiple revision cycles
      let currentResponse = initial;
      const allRevisions: Revision[] = [];

      for (let i = 0; i < 3; i++) {
        setCurrentRevision(i);

        // Critique phase
        setCurrentPhase('critique');
        setAnimationProgress(0);
        await new Promise(resolve => setTimeout(resolve, 1500));
        const critiques = critiqueResponse(currentResponse, i);

        // Revise phase
        setCurrentPhase('revise');
        setAnimationProgress(0);
        await new Promise(resolve => setTimeout(resolve, 1500));
        const revised = reviseResponse(currentResponse, critiques, i);

        // Validate phase
        setCurrentPhase('validate');
        setAnimationProgress(0);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Re-critique the revised response to get accurate score
        const revisedCritiques = critiqueResponse(revised, i + 1);

        const revision: Revision = {
          version: i + 1,
          response: revised,
          critiques,
          score: calculateScore(revisedCritiques),
          timestamp: Date.now()
        };

        allRevisions.push(revision);
        setRevisions([...allRevisions]);
        currentResponse = revised;

        // Check if response passes all principles
        if (calculateScore(revisedCritiques) >= 95) {
          break;
        }
      }

      setCurrentPhase('complete');
      setIsRunning(false);
    };

    runConstitutionalAI();
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && currentPhase !== 'complete') {
      const interval = setInterval(() => {
        setAnimationProgress(prev => Math.min(prev + 10, 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRunning, currentPhase]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'critique': return <AlertTriangle className="w-5 h-5" />;
      case 'revise': return <RotateCw className="w-5 h-5" />;
      case 'validate': return <CheckCircle className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Constitutional AI Demo</h2>

        {/* User Query */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-300">User Query</label>
          <div className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-gray-100 h-20 overflow-y-auto">
            <p className="whitespace-pre-wrap">{userQuery}</p>
          </div>
        </div>

        {/* Constitutional Principles */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Constitutional Principles
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {constitutionalPrinciples.map(principle => (
              <div key={principle.id} className="bg-gray-900 p-3 rounded border border-gray-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-200">{principle.name}</span>
                  <span className={`text-xs ${getPriorityColor(principle.priority)}`}>
                    {principle.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Pipeline */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Self-Critique Pipeline</h3>
          <div className="flex items-center gap-2">
            {['input', 'critique', 'revise', 'validate', 'complete'].map((phase, idx) => (
              <React.Fragment key={phase}>
                <div className={`flex-1 bg-gray-900 p-3 rounded border ${
                  currentPhase === phase ? 'border-blue-500 bg-blue-950' : 'border-gray-700'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {getPhaseIcon(phase)}
                    <span className="text-sm font-medium text-gray-200 capitalize">{phase}</span>
                  </div>
                  {currentPhase === phase && phase !== 'complete' && (
                    <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${animationProgress}%` }}
                      />
                    </div>
                  )}
                </div>
                {idx < 4 && <Zap className="w-4 h-4 text-gray-600" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Initial Response */}
        {initialResponse && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200">Initial Response (Unconstrained)</h3>
            <div className="bg-red-950 p-4 rounded border border-red-800">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-300 text-sm">{initialResponse}</p>
                  <p className="text-xs text-red-400 mt-2">⚠️ This response violates multiple constitutional principles</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Revision History */}
        {revisions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200">Revision History</h3>
            <div className="space-y-3">
              {revisions.map((revision, idx) => (
                <div key={idx} className="bg-gray-900 p-4 rounded border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-200">Revision {revision.version}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">
                        {revision.critiques.filter(c => c.violated).length} violations found
                      </span>
                      <span className={`font-bold ${
                        revision.score >= 95 ? 'text-green-400' :
                        revision.score >= 70 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        Score: {revision.score}%
                      </span>
                    </div>
                  </div>

                  {/* Critiques */}
                  {revision.critiques.length > 0 && (
                    <div className="mb-3 space-y-2">
                      {revision.critiques.map((critique, cidx) => (
                        <div key={cidx} className="bg-gray-800 p-2 rounded text-xs">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-3 h-3 text-orange-400" />
                            <span className="text-orange-400">
                              {constitutionalPrinciples.find(p => p.id === critique.principleId)?.name}
                            </span>
                          </div>
                          <p className="text-gray-400 ml-5">{critique.explanation}</p>
                          <p className="text-blue-400 ml-5 mt-1">→ {critique.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Revised Response */}
                  <div className={`p-3 rounded border ${
                    revision.score >= 95 ? 'bg-green-950 border-green-800' : 'bg-gray-800 border-gray-600'
                  }`}>
                    <p className="text-gray-300 text-sm">{revision.response}</p>
                    {revision.score >= 95 && (
                      <div className="flex items-center gap-2 mt-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-green-400">Passes all constitutional checks</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Algorithm Overview */}
        <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            How Constitutional AI Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-purple-400 font-bold">1.</span>
              <div>
                <p className="font-medium text-gray-200">Initial Generation</p>
                <p className="text-xs text-gray-400">Model generates unconstrained response to user query</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-400 font-bold">2.</span>
              <div>
                <p className="font-medium text-gray-200">Self-Critique</p>
                <p className="text-xs text-gray-400">Response evaluated against constitutional principles</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-400 font-bold">3.</span>
              <div>
                <p className="font-medium text-gray-200">Revision</p>
                <p className="text-xs text-gray-400">Response modified to address identified violations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-400 font-bold">4.</span>
              <div>
                <p className="font-medium text-gray-200">Validation</p>
                <p className="text-xs text-gray-400">Revised response checked for compliance</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-400 font-bold">5.</span>
              <div>
                <p className="font-medium text-gray-200">Iteration</p>
                <p className="text-xs text-gray-400">Process repeats until all principles are satisfied</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Button */}
        <button
          onClick={() => {
            setIsRunning(true);
            setCurrentPhase('input');
            setInitialResponse('');
            setRevisions([]);
            setCurrentRevision(0);
            setAnimationProgress(0);
          }}
          disabled={isRunning}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded text-white font-medium transition-colors"
        >
          {isRunning ? 'Running Constitutional Self-Critique...' : 'Start Constitutional AI Process'}
        </button>
      </div>
    </div>
  );
};

export default CAIDemo;