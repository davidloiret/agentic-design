'use client';

import React, { useState, useEffect } from 'react';
import { Users, Brain, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

type DecisionStatus = 'pending' | 'ai-processing' | 'escalated' | 'human-review' | 'decided' | 'learning';
type ConfidenceLevel = 'high' | 'medium' | 'low' | 'critical';
type PhaseType = 'idle' | 'ai-processing' | 'confidence-evaluation' | 'human-escalation' | 'expert-decision' | 'feedback-learning' | 'complete';

interface Decision {
  id: string;
  case: string;
  category: string;
  aiConfidence: number;
  status: DecisionStatus;
  aiRecommendation: string;
  humanDecision?: string;
  humanReasoning?: string;
  expertName?: string;
  responseTime?: number;
  outcome: 'pending' | 'ai-handled' | 'human-override' | 'human-confirmed';
}

interface Expert {
  id: string;
  name: string;
  domain: string;
  availability: 'available' | 'busy' | 'reviewing';
  decisionsHandled: number;
  accuracy: number;
}

interface FeedbackLoop {
  id: string;
  decisionId: string;
  humanCorrection: string;
  modelUpdate: string;
  confidenceImprovement: number;
  applied: boolean;
}

interface HITLMetrics {
  escalationRate: number;
  humanDecisionQuality: number;
  avgResponseTime: number;
  learningEfficiency: number;
  aiImprovement: number;
  userSatisfaction: number;
}

const HumanInTheLoopDemo: React.FC = () => {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [feedbackLoops, setFeedbackLoops] = useState<FeedbackLoop[]>([]);
  const [metrics, setMetrics] = useState<HITLMetrics>({
    escalationRate: 0,
    humanDecisionQuality: 0,
    avgResponseTime: 0,
    learningEfficiency: 0,
    aiImprovement: 0,
    userSatisfaction: 0,
  });
  const [totalDecisions, setTotalDecisions] = useState(0);
  const [escalatedDecisions, setEscalatedDecisions] = useState(0);

  const initialExperts: Expert[] = [
    { id: 'expert-1', name: 'Dr. Sarah Chen', domain: 'Medical Diagnosis', availability: 'available', decisionsHandled: 0, accuracy: 98 },
    { id: 'expert-2', name: 'James Rodriguez', domain: 'Legal Review', availability: 'available', decisionsHandled: 0, accuracy: 96 },
    { id: 'expert-3', name: 'Maya Patel', domain: 'Fraud Detection', availability: 'available', decisionsHandled: 0, accuracy: 97 },
  ];

  const initialDecisions: Decision[] = [
    {
      id: 'dec-1',
      case: 'Routine medical screening - normal results',
      category: 'Medical',
      aiConfidence: 95,
      status: 'pending',
      aiRecommendation: 'No intervention needed',
      outcome: 'pending',
    },
    {
      id: 'dec-2',
      case: 'Complex cardiac symptoms with ambiguous markers',
      category: 'Medical',
      aiConfidence: 62,
      status: 'pending',
      aiRecommendation: 'Further testing recommended',
      outcome: 'pending',
    },
    {
      id: 'dec-3',
      case: 'Standard employment contract review',
      category: 'Legal',
      aiConfidence: 91,
      status: 'pending',
      aiRecommendation: 'Approve with standard terms',
      outcome: 'pending',
    },
    {
      id: 'dec-4',
      case: 'Complex M&A agreement with novel clauses',
      category: 'Legal',
      aiConfidence: 58,
      status: 'pending',
      aiRecommendation: 'Requires expert review',
      outcome: 'pending',
    },
    {
      id: 'dec-5',
      case: 'Suspicious transaction pattern detected',
      category: 'Fraud',
      aiConfidence: 48,
      status: 'pending',
      aiRecommendation: 'Potential fraud - escalate',
      outcome: 'pending',
    },
    {
      id: 'dec-6',
      case: 'Known fraud pattern with clear indicators',
      category: 'Fraud',
      aiConfidence: 97,
      status: 'pending',
      aiRecommendation: 'Block transaction immediately',
      outcome: 'pending',
    },
  ];

  useEffect(() => {
    if (phase === 'idle') {
      const timer = setTimeout(() => {
        setPhase('ai-processing');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'ai-processing') {
      setDecisions(initialDecisions);
      setExperts(initialExperts);
      setTotalDecisions(initialDecisions.length);

      let processIndex = 0;
      const processingInterval = setInterval(() => {
        if (processIndex < initialDecisions.length) {
          const decision = initialDecisions[processIndex];
          setDecisions(prev => prev.map(d =>
            d.id === decision.id ? { ...d, status: 'ai-processing' } : d
          ));
          processIndex++;
        } else {
          clearInterval(processingInterval);
          setTimeout(() => setPhase('confidence-evaluation'), 400);
        }
      }, 300);

      return () => clearInterval(processingInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'confidence-evaluation') {
      const confidenceThreshold = 75;

      decisions.forEach((decision, index) => {
        setTimeout(() => {
          if (decision.aiConfidence >= confidenceThreshold) {
            setDecisions(prev => prev.map(d =>
              d.id === decision.id
                ? { ...d, status: 'decided', outcome: 'ai-handled' }
                : d
            ));
          } else {
            setDecisions(prev => prev.map(d =>
              d.id === decision.id
                ? { ...d, status: 'escalated' }
                : d
            ));
            setEscalatedDecisions(prev => prev + 1);
          }
        }, index * 300);
      });

      setTimeout(() => setPhase('human-escalation'), decisions.length * 300 + 400);
    }
  }, [phase, decisions]);

  useEffect(() => {
    if (phase === 'human-escalation') {
      const escalatedCases = decisions.filter(d => d.status === 'escalated');

      escalatedCases.forEach((decision, index) => {
        setTimeout(() => {
          let expertId: string;
          if (decision.category === 'Medical') {
            expertId = 'expert-1';
          } else if (decision.category === 'Legal') {
            expertId = 'expert-2';
          } else {
            expertId = 'expert-3';
          }

          const expert = experts.find(e => e.id === expertId);

          setExperts(prev => prev.map(e =>
            e.id === expertId ? { ...e, availability: 'reviewing' } : e
          ));

          setDecisions(prev => prev.map(d =>
            d.id === decision.id
              ? { ...d, status: 'human-review', expertName: expert?.name }
              : d
          ));
        }, index * 400);
      });

      setTimeout(() => setPhase('expert-decision'), escalatedCases.length * 400 + 400);
    }
  }, [phase, decisions, experts]);

  useEffect(() => {
    if (phase === 'expert-decision') {
      const reviewingCases = decisions.filter(d => d.status === 'human-review');

      reviewingCases.forEach((decision, index) => {
        setTimeout(() => {
          let humanDecision: string;
          let humanReasoning: string;
          let outcome: 'human-override' | 'human-confirmed';
          let responseTime: number;

          if (decision.id === 'dec-2') {
            humanDecision = 'Order immediate cardiac catheterization';
            humanReasoning = 'Subtle ST-segment changes indicate high-risk NSTEMI';
            outcome = 'human-override';
            responseTime = 8;
          } else if (decision.id === 'dec-4') {
            humanDecision = 'Request revision of indemnification clauses';
            humanReasoning = 'Novel liability exposure in cross-border provisions';
            outcome = 'human-override';
            responseTime = 15;
          } else {
            humanDecision = 'Confirm fraud and block all related accounts';
            humanReasoning = 'Pattern matches sophisticated synthetic identity fraud ring';
            outcome = 'human-confirmed';
            responseTime = 5;
          }

          setDecisions(prev => prev.map(d =>
            d.id === decision.id
              ? {
                  ...d,
                  status: 'decided',
                  outcome,
                  humanDecision,
                  humanReasoning,
                  responseTime,
                }
              : d
          ));

          const expertId = decision.category === 'Medical' ? 'expert-1' :
                          decision.category === 'Legal' ? 'expert-2' : 'expert-3';

          setExperts(prev => prev.map(e =>
            e.id === expertId
              ? { ...e, availability: 'available', decisionsHandled: e.decisionsHandled + 1 }
              : e
          ));
        }, index * 500);
      });

      setTimeout(() => setPhase('feedback-learning'), reviewingCases.length * 500 + 400);
    }
  }, [phase, decisions]);

  useEffect(() => {
    if (phase === 'feedback-learning') {
      const humanOverrides = decisions.filter(d => d.outcome === 'human-override');

      const feedbacks: FeedbackLoop[] = humanOverrides.map((decision, index) => ({
        id: `feedback-${index + 1}`,
        decisionId: decision.id,
        humanCorrection: decision.humanReasoning || '',
        modelUpdate: `Updated ${decision.category.toLowerCase()} pattern recognition`,
        confidenceImprovement: 15 + Math.floor(Math.random() * 10),
        applied: false,
      }));

      setFeedbackLoops(feedbacks);

      feedbacks.forEach((feedback, index) => {
        setTimeout(() => {
          setFeedbackLoops(prev => prev.map(f =>
            f.id === feedback.id ? { ...f, applied: true } : f
          ));

          setDecisions(prev => prev.map(d =>
            d.id === feedback.decisionId ? { ...d, status: 'learning' } : d
          ));
        }, index * 400);
      });

      setTimeout(() => {
        const escalationRate = Math.round((escalatedDecisions / totalDecisions) * 100);
        const avgResponseTime = Math.round(
          decisions
            .filter(d => d.responseTime)
            .reduce((sum, d) => sum + (d.responseTime || 0), 0) /
          decisions.filter(d => d.responseTime).length
        );
        const avgConfidenceImprovement = feedbacks.length > 0
          ? Math.round(
              feedbacks.reduce((sum, f) => sum + f.confidenceImprovement, 0) / feedbacks.length
            )
          : 0;

        setMetrics({
          escalationRate,
          humanDecisionQuality: 97,
          avgResponseTime,
          learningEfficiency: 88,
          aiImprovement: avgConfidenceImprovement,
          userSatisfaction: 94,
        });

        setPhase('complete');
      }, feedbacks.length * 400 + 800);
    }
  }, [phase, decisions, escalatedDecisions, totalDecisions]);

  const getStatusColor = (status: DecisionStatus): string => {
    switch (status) {
      case 'pending': return 'bg-slate-700';
      case 'ai-processing': return 'bg-blue-600';
      case 'escalated': return 'bg-orange-600';
      case 'human-review': return 'bg-purple-600';
      case 'decided': return 'bg-green-600';
      case 'learning': return 'bg-yellow-600';
      default: return 'bg-slate-700';
    }
  };

  const getConfidenceLevel = (confidence: number): { level: ConfidenceLevel; color: string } => {
    if (confidence >= 85) return { level: 'high', color: 'text-green-400' };
    if (confidence >= 70) return { level: 'medium', color: 'text-yellow-400' };
    if (confidence >= 50) return { level: 'low', color: 'text-orange-400' };
    return { level: 'critical', color: 'text-red-400' };
  };

  const getOutcomeIcon = (outcome: string): string => {
    switch (outcome) {
      case 'ai-handled': return '🤖';
      case 'human-override': return '👨‍⚕️';
      case 'human-confirmed': return '✅';
      default: return '⏳';
    }
  };

  const getPhaseDescription = (): string => {
    switch (phase) {
      case 'idle': return 'Initializing Human-in-the-Loop system...';
      case 'ai-processing': return 'AI processing decisions and calculating confidence scores...';
      case 'confidence-evaluation': return 'Evaluating confidence levels and triggering escalations...';
      case 'human-escalation': return 'Routing low-confidence cases to domain experts...';
      case 'expert-decision': return 'Human experts reviewing and making critical decisions...';
      case 'feedback-learning': return 'Capturing feedback and updating AI models...';
      case 'complete': return 'HITL cycle complete with 50% escalation and 97% decision quality';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${phase === 'complete' ? 'bg-green-600' : 'bg-purple-600'}`}>
            <Users className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Human-in-the-Loop Pipeline</h3>
            <p className="text-sm text-gray-400 mt-1">{getPhaseDescription()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {(['ai-processing', 'confidence-evaluation', 'human-escalation', 'expert-decision', 'feedback-learning'] as PhaseType[]).map((p, idx) => (
            <React.Fragment key={p}>
              <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                phase === p ? 'bg-purple-500' :
                ['confidence-evaluation', 'human-escalation', 'expert-decision', 'feedback-learning', 'complete'].includes(phase) && idx === 0 ? 'bg-green-600' :
                ['human-escalation', 'expert-decision', 'feedback-learning', 'complete'].includes(phase) && idx === 1 ? 'bg-green-600' :
                ['expert-decision', 'feedback-learning', 'complete'].includes(phase) && idx === 2 ? 'bg-green-600' :
                ['feedback-learning', 'complete'].includes(phase) && idx === 3 ? 'bg-green-600' :
                phase === 'complete' && idx === 4 ? 'bg-green-600' :
                'bg-slate-700'
              }`} />
              {idx < 4 && <div className="w-2 h-2 rounded-full bg-slate-600" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-blue-400" />
            <h4 className="font-semibold text-white">Decisions ({decisions.length})</h4>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {decisions.map((decision) => {
              const { level, color } = getConfidenceLevel(decision.aiConfidence);
              return (
                <div
                  key={decision.id}
                  className={`p-3 rounded-lg border transition-all duration-300 ${getStatusColor(decision.status)} border-slate-600`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{getOutcomeIcon(decision.outcome)}</span>
                      <span className="text-xs font-semibold text-white">{decision.category}</span>
                    </div>
                    <span className={`text-xs font-bold ${color}`}>
                      {decision.aiConfidence}% {level}
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 mb-1">{decision.case}</div>
                  <div className="text-xs text-gray-400 mb-1">
                    AI: {decision.aiRecommendation}
                  </div>
                  {decision.humanDecision && (
                    <div className="mt-2 pt-2 border-t border-slate-600">
                      <div className="text-xs text-purple-300 font-semibold mb-1">
                        {decision.expertName} ({decision.responseTime}min):
                      </div>
                      <div className="text-xs text-green-300">{decision.humanDecision}</div>
                      <div className="text-xs text-gray-400 mt-1">{decision.humanReasoning}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-purple-400" />
              <h4 className="font-semibold text-white">Domain Experts</h4>
            </div>
            <div className="space-y-3">
              {experts.map((expert) => (
                <div
                  key={expert.id}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    expert.availability === 'reviewing' ? 'bg-purple-600 border-purple-500' :
                    expert.availability === 'busy' ? 'bg-orange-600 border-orange-500' :
                    'bg-slate-700 border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{expert.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      expert.availability === 'available' ? 'bg-green-600 text-white' :
                      expert.availability === 'reviewing' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {expert.availability}
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 mb-1">{expert.domain}</div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Decisions: {expert.decisionsHandled}</span>
                    <span>Accuracy: {expert.accuracy}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {feedbackLoops.length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <h4 className="font-semibold text-white">Feedback Learning</h4>
              </div>
              <div className="space-y-2">
                {feedbackLoops.map((feedback) => (
                  <div
                    key={feedback.id}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      feedback.applied ? 'bg-green-600/20 border-green-600/50' : 'bg-slate-700 border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-white">{feedback.modelUpdate}</span>
                      {feedback.applied && <CheckCircle className="w-3 h-3 text-green-400" />}
                    </div>
                    <div className="text-xs text-gray-400 mb-1">{feedback.humanCorrection}</div>
                    <div className="text-xs text-green-400">
                      +{feedback.confidenceImprovement}% confidence improvement
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {phase === 'complete' && (
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-white">HITL Metrics</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Escalation Rate</div>
              <div className="text-2xl font-bold text-orange-400">{metrics.escalationRate}%</div>
              <div className="text-xs text-gray-500 mt-1">{escalatedDecisions} of {totalDecisions} escalated</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Human Decision Quality</div>
              <div className="text-2xl font-bold text-green-400">{metrics.humanDecisionQuality}%</div>
              <div className="text-xs text-gray-500 mt-1">Expert accuracy</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Avg Response Time</div>
              <div className="text-2xl font-bold text-blue-400">{metrics.avgResponseTime}min</div>
              <div className="text-xs text-gray-500 mt-1">Human decision time</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Learning Efficiency</div>
              <div className="text-2xl font-bold text-purple-400">{metrics.learningEfficiency}%</div>
              <div className="text-xs text-gray-500 mt-1">Feedback incorporation</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">AI Improvement</div>
              <div className="text-2xl font-bold text-yellow-400">+{metrics.aiImprovement}%</div>
              <div className="text-xs text-gray-500 mt-1">Confidence boost</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">User Satisfaction</div>
              <div className="text-2xl font-bold text-pink-400">{metrics.userSatisfaction}%</div>
              <div className="text-xs text-gray-500 mt-1">System effectiveness</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-purple-900/20 border border-purple-700/30 rounded-lg">
            <div className="text-sm text-purple-300">
              <strong>HITL Summary:</strong> Processed {totalDecisions} decisions with {metrics.escalationRate}% escalation rate.
              High-confidence cases ({100 - metrics.escalationRate}%) handled autonomously by AI. Complex cases escalated
              to {experts.length} domain experts achieving {metrics.humanDecisionQuality}% decision quality with {metrics.avgResponseTime}min
              average response time. Human feedback incorporated with {metrics.learningEfficiency}% efficiency,
              improving AI confidence by {metrics.aiImprovement}% and achieving {metrics.userSatisfaction}% user satisfaction.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HumanInTheLoopDemo;