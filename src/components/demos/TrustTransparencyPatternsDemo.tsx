'use client';

import React, { useState, useEffect } from 'react';
import {
  Eye,
  Brain,
  Shield,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Sparkles,
  FileText,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  BookOpen,
  Users,
  Zap,
  Info,
  ExternalLink
} from 'lucide-react';

// Types for transparency patterns
type TransparencyLevel = 'what' | 'how' | 'why';
type StakeholderView = 'user' | 'technical' | 'regulatory';
type ExplanationPhase = 'decision' | 'reasoning' | 'evidence' | 'alternatives' | 'confidence' | 'complete';

interface Decision {
  id: string;
  title: string;
  aiGenerated: boolean;
  confidence: number;
  recommendation: string;
  reasoning: string[];
  evidence: Source[];
  alternatives: Alternative[];
  impactFactors: ImpactFactor[];
  counterfactual?: string;
}

interface Source {
  id: string;
  title: string;
  type: 'research' | 'data' | 'policy' | 'historical';
  relevance: number;
  url?: string;
}

interface Alternative {
  id: string;
  option: string;
  confidence: number;
  pros: string[];
  cons: string[];
  whyNotChosen: string;
}

interface ImpactFactor {
  id: string;
  name: string;
  importance: number;
  direction: 'positive' | 'negative' | 'neutral';
  explanation: string;
}

interface TrustMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

interface ModelCard {
  name: string;
  version: string;
  purpose: string;
  limitations: string[];
  biasRisks: string[];
  performance: { metric: string; value: string }[];
  lastUpdated: string;
}

export default function TrustTransparencyPatternsDemo() {
  const [phase, setPhase] = useState<ExplanationPhase>('decision');
  const [transparencyLevel, setTransparencyLevel] = useState<TransparencyLevel>('what');
  const [stakeholderView, setStakeholderView] = useState<StakeholderView>('user');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const [currentDecision] = useState<Decision>({
    id: 'loan-approval',
    title: 'Loan Application Assessment',
    aiGenerated: true,
    confidence: 87,
    recommendation: 'Approve with conditions',
    reasoning: [
      'Strong credit history (750+ score)',
      'Stable employment (5+ years)',
      'Debt-to-income ratio within acceptable range (28%)',
      'Property value supports loan amount'
    ],
    evidence: [
      {
        id: 'credit-report',
        title: 'TransUnion Credit Report',
        type: 'data',
        relevance: 95,
        url: 'https://example.com/credit'
      },
      {
        id: 'employment-verification',
        title: 'Employment Verification Records',
        type: 'data',
        relevance: 88
      },
      {
        id: 'lending-policy',
        title: 'Internal Lending Policy v2.3',
        type: 'policy',
        relevance: 92
      },
      {
        id: 'market-analysis',
        title: 'Regional Property Market Analysis',
        type: 'research',
        relevance: 76
      }
    ],
    alternatives: [
      {
        id: 'full-approval',
        option: 'Full Approval',
        confidence: 72,
        pros: ['Faster processing', 'Better customer experience'],
        cons: ['Higher risk exposure', 'Outside standard parameters'],
        whyNotChosen: 'Recent market volatility increases risk beyond acceptable threshold'
      },
      {
        id: 'rejection',
        option: 'Reject Application',
        confidence: 45,
        pros: ['Minimal risk', 'Conservative approach'],
        cons: ['Lost business opportunity', 'Strong candidate profile'],
        whyNotChosen: 'Applicant meets core criteria with manageable risk profile'
      }
    ],
    impactFactors: [
      {
        id: 'credit-score',
        name: 'Credit Score',
        importance: 35,
        direction: 'positive',
        explanation: 'Excellent payment history indicates low default risk'
      },
      {
        id: 'employment',
        name: 'Employment Stability',
        importance: 25,
        direction: 'positive',
        explanation: 'Long tenure suggests reliable income stream'
      },
      {
        id: 'debt-ratio',
        name: 'Debt-to-Income',
        importance: 20,
        direction: 'neutral',
        explanation: 'Acceptable but approaching upper limit'
      },
      {
        id: 'market-conditions',
        name: 'Market Conditions',
        importance: 15,
        direction: 'negative',
        explanation: 'Recent volatility requires additional safeguards'
      },
      {
        id: 'collateral',
        name: 'Collateral Value',
        importance: 5,
        direction: 'positive',
        explanation: 'Property appraisal exceeds loan amount'
      }
    ],
    counterfactual: 'If debt-to-income was 5% lower, full approval would be recommended with 92% confidence'
  });

  const [trustMetrics] = useState<TrustMetric[]>([
    {
      name: 'Trust Calibration',
      value: 89,
      trend: 'up',
      description: 'User trust aligns with AI reliability'
    },
    {
      name: 'Explanation Clarity',
      value: 92,
      trend: 'stable',
      description: 'Users understand reasoning'
    },
    {
      name: 'Decision Confidence',
      value: 85,
      trend: 'up',
      description: 'User confidence in decisions'
    },
    {
      name: 'Transparency Usage',
      value: 78,
      trend: 'up',
      description: 'Active exploration of explanations'
    }
  ]);

  const [modelCard] = useState<ModelCard>({
    name: 'CreditAssist AI',
    version: '3.2.1',
    purpose: 'Automated loan application assessment and risk evaluation',
    limitations: [
      'Limited to residential mortgage applications',
      'Requires minimum 2 years credit history',
      'May not capture recent life events'
    ],
    biasRisks: [
      'Potential geographic bias in property valuation',
      'Historical data may reflect past discriminatory practices',
      'Income verification methods may disadvantage gig workers'
    ],
    performance: [
      { metric: 'Accuracy', value: '94.2%' },
      { metric: 'False Positive Rate', value: '3.1%' },
      { metric: 'Processing Time', value: '<2 min' },
      { metric: 'Audit Compliance', value: '100%' }
    ],
    lastUpdated: '2024-01-15'
  });

  // Simulate explanation progression
  useEffect(() => {
    const phases: ExplanationPhase[] = ['decision', 'reasoning', 'evidence', 'alternatives', 'confidence', 'complete'];
    const currentIndex = phases.indexOf(phase);

    if (currentIndex < phases.length - 1) {
      const timer = setTimeout(() => {
        setPhase(phases[currentIndex + 1]);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const getStakeholderContent = () => {
    switch (stakeholderView) {
      case 'technical':
        return {
          label: 'Technical View',
          icon: <Brain className="w-4 h-4" />,
          content: 'Model: XGBoost v1.7, Features: 47, Training: 1.2M samples, AUC: 0.92'
        };
      case 'regulatory':
        return {
          label: 'Compliance View',
          icon: <Shield className="w-4 h-4" />,
          content: 'FCRA compliant, Equal lending standards met, Audit trail complete'
        };
      default:
        return {
          label: 'User View',
          icon: <Users className="w-4 h-4" />,
          content: 'Clear explanation focused on key factors affecting your application'
        };
    }
  };

  const getTransparencyContent = () => {
    switch (transparencyLevel) {
      case 'why':
        return 'These factors align with responsible lending practices and regulatory requirements';
      case 'how':
        return 'Decision based on weighted analysis of credit, income, and market factors';
      default:
        return 'Loan approved with standard conditions based on your profile';
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg text-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Eye className="w-6 h-6 text-purple-400" />
          Trust and Transparency Patterns Demo
        </h3>
        <p className="text-gray-400">
          Explainable AI with decision transparency and source attribution
        </p>
      </div>

      {/* AI-Generated Indicator */}
      <div className="mb-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-400 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">AI-Generated Decision</span>
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded">
                {currentDecision.confidence}% confidence
              </span>
            </div>
            <h4 className="text-lg font-semibold mb-1">{currentDecision.title}</h4>
            <p className="text-green-400 font-medium">
              Recommendation: {currentDecision.recommendation}
            </p>
          </div>
        </div>
      </div>

      {/* Transparency Level Selector */}
      <div className="mb-4 flex items-center gap-4">
        <span className="text-sm text-gray-400">Transparency Level:</span>
        <div className="flex gap-2">
          {(['what', 'how', 'why'] as TransparencyLevel[]).map(level => (
            <button
              key={level}
              onClick={() => setTransparencyLevel(level)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                transparencyLevel === level
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {level.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Transparency Content */}
      <div className="mb-6 p-3 bg-gray-800 rounded border border-gray-700">
        <p className="text-sm">{getTransparencyContent()}</p>
      </div>

      {/* Progressive Disclosure Sections */}
      <div className="space-y-3 mb-6">
        {/* Decision Reasoning */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <button
            onClick={() => toggleSection('reasoning')}
            className="w-full p-3 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              Decision Reasoning
            </span>
            {expandedSections.has('reasoning') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {expandedSections.has('reasoning') && (
            <div className="p-3 border-t border-gray-700">
              <ul className="space-y-2">
                {currentDecision.reasoning.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span className="text-gray-300">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Evidence & Sources */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <button
            onClick={() => toggleSection('evidence')}
            className="w-full p-3 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Evidence & Sources
            </span>
            {expandedSections.has('evidence') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {expandedSections.has('evidence') && (
            <div className="p-3 border-t border-gray-700 space-y-2">
              {currentDecision.evidence.map(source => (
                <div key={source.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{source.title}</span>
                    {source.url && <ExternalLink className="w-3 h-3 text-blue-400" />}
                  </div>
                  <span className="text-xs text-gray-500">{source.relevance}% relevant</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Impact Factors */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <button
            onClick={() => toggleSection('factors')}
            className="w-full p-3 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Impact Factors
            </span>
            {expandedSections.has('factors') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {expandedSections.has('factors') && (
            <div className="p-3 border-t border-gray-700 space-y-2">
              {currentDecision.impactFactors.map(factor => (
                <div key={factor.id} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{factor.name}</span>
                    <span className={`text-xs ${
                      factor.direction === 'positive' ? 'text-green-400' :
                      factor.direction === 'negative' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {factor.importance}% weight
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        factor.direction === 'positive' ? 'bg-green-400' :
                        factor.direction === 'negative' ? 'bg-red-400' :
                        'bg-yellow-400'
                      }`}
                      style={{ width: `${factor.importance}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{factor.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alternatives Considered */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <button
            onClick={() => toggleSection('alternatives')}
            className="w-full p-3 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-orange-400" />
              Alternatives Considered
            </span>
            {expandedSections.has('alternatives') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {expandedSections.has('alternatives') && (
            <div className="p-3 border-t border-gray-700 space-y-3">
              {currentDecision.alternatives.map(alt => (
                <div key={alt.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">{alt.option}</span>
                    <span className="text-xs text-gray-500">{alt.confidence}% confidence</span>
                  </div>
                  <p className="text-xs text-orange-400">Why not chosen: {alt.whyNotChosen}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Counterfactual Explanation */}
      {currentDecision.counterfactual && (
        <div className="mb-6 p-3 bg-blue-500/10 rounded border border-blue-500/30">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-400 mb-1">What If Analysis</p>
              <p className="text-xs text-gray-300">{currentDecision.counterfactual}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stakeholder View Selector */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-400">View for:</span>
          <div className="flex gap-2">
            {(['user', 'technical', 'regulatory'] as StakeholderView[]).map(view => (
              <button
                key={view}
                onClick={() => setStakeholderView(view)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  stakeholderView === view
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            {getStakeholderContent().icon}
            <span className="text-sm font-medium">{getStakeholderContent().label}</span>
          </div>
          <p className="text-xs text-gray-400">{getStakeholderContent().content}</p>
        </div>
      </div>

      {/* Model Card Summary */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            Model Card
          </h4>
          <span className="text-xs text-gray-500">v{modelCard.version}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 text-xs mb-1">Purpose</p>
            <p className="text-gray-300 text-xs">{modelCard.purpose}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Performance</p>
            <div className="space-y-1">
              {modelCard.performance.slice(0, 2).map(perf => (
                <div key={perf.metric} className="flex justify-between text-xs">
                  <span className="text-gray-500">{perf.metric}:</span>
                  <span className="text-gray-300">{perf.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Metrics Dashboard */}
      <div className="grid grid-cols-2 gap-3">
        {trustMetrics.map(metric => (
          <div key={metric.name} className="p-3 bg-gray-800 rounded border border-gray-700">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">{metric.name}</span>
              {metric.trend === 'up' ? (
                <TrendingUp className="w-3 h-3 text-green-400" />
              ) : metric.trend === 'down' ? (
                <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />
              ) : (
                <Zap className="w-3 h-3 text-yellow-400" />
              )}
            </div>
            <div className="text-lg font-bold text-purple-400">{metric.value}%</div>
            <p className="text-xs text-gray-500">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Explanation Phase Indicator */}
      <div className="mt-6 flex items-center justify-center">
        <div className="flex items-center gap-2">
          {['decision', 'reasoning', 'evidence', 'alternatives', 'confidence', 'complete'].map((p, i) => (
            <div key={p} className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${
                phase === p ? 'bg-purple-400' :
                i < ['decision', 'reasoning', 'evidence', 'alternatives', 'confidence', 'complete'].indexOf(phase)
                  ? 'bg-purple-400/40'
                  : 'bg-gray-700'
              }`} />
              {i < 5 && (
                <div className={`w-6 h-0.5 ${
                  i < ['decision', 'reasoning', 'evidence', 'alternatives', 'confidence', 'complete'].indexOf(phase)
                    ? 'bg-purple-400/40'
                    : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}