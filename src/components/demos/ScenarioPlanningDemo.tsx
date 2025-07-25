import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, TrendingUp, AlertTriangle, Target, Eye, Zap, Shield, DollarSign, Users } from 'lucide-react';

interface ScenarioFactor {
  id: string;
  name: string;
  type: 'driver' | 'uncertainty' | 'trend';
  impact: 'high' | 'medium' | 'low';
  description: string;
}

interface Scenario {
  id: string;
  name: string;
  probability: number;
  description: string;
  keyCharacteristics: string[];
  timeline: string;
  strategy: {
    name: string;
    approach: string;
    investment: string;
    focus: string[];
    timeline: string;
  };
  risks: string[];
  opportunities: string[];
  indicators: string[];
}

interface PlanningContext {
  id: string;
  title: string;
  description: string;
  challenge: string;
  timeHorizon: string;
  stakeholders: string[];
  factors: ScenarioFactor[];
  scenarios: Scenario[];
  monitoringMetrics: {
    regulatory: number;
    technology: number;
    market: number;
    competition: number;
  };
}

const ScenarioPlanningDemo: React.FC = () => {
  const [currentContextIndex, setCurrentContextIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [planningProgress, setPlanningProgress] = useState(0);

  const planningContexts: PlanningContext[] = [
    {
      id: 'autonomous-vehicles',
      title: 'Autonomous Vehicle AI System',
      description: 'Strategic planning for next-generation self-driving technology',
      challenge: 'Design and deploy autonomous vehicle AI system with regulatory uncertainty and rapidly evolving technology landscape',
      timeHorizon: '5 years (2024-2029)',
      stakeholders: ['Regulators', 'Consumers', 'Insurance Companies', 'Tech Partners', 'Automotive OEMs'],
      factors: [
        { id: 'regulatory', name: 'Regulatory Environment', type: 'driver', impact: 'high', description: 'Government policies on AV deployment' },
        { id: 'safety', name: 'Safety Standards', type: 'driver', impact: 'high', description: 'Evolving safety requirements and validation' },
        { id: 'technology', name: 'AI Breakthroughs', type: 'uncertainty', impact: 'high', description: 'Potential breakthrough in AI capabilities' },
        { id: 'adoption', name: 'Consumer Adoption', type: 'uncertainty', impact: 'medium', description: 'Public acceptance and trust levels' },
        { id: 'sensors', name: 'Sensor Technology', type: 'trend', impact: 'medium', description: 'LiDAR and camera cost reduction' },
        { id: 'connectivity', name: '5G/6G Deployment', type: 'trend', impact: 'medium', description: 'Vehicle-to-everything communication' }
      ],
      scenarios: [
        {
          id: 'rapid-adoption',
          name: 'Rapid Adoption',
          probability: 30,
          description: 'Favorable regulatory environment drives fast AV deployment',
          keyCharacteristics: ['Permissive regulations', 'High public trust', 'Fast technology progress', 'Strong partnerships'],
          timeline: '2-3 years to L4/L5 deployment',
          strategy: {
            name: 'Aggressive Expansion',
            approach: 'Full autonomy focus with global deployment',
            investment: 'High ($5B+ over 5 years)',
            focus: ['L5 autonomy', 'Global partnerships', 'Manufacturing scale', 'Regulatory engagement'],
            timeline: '18-24 months to market'
          },
          risks: ['Over-investment', 'Technical challenges', 'Safety incidents', 'Regulatory backlash'],
          opportunities: ['Market leadership', 'Ecosystem control', 'Data advantage', 'Platform scaling'],
          indicators: ['Regulatory approvals', 'Safety test results', 'Partnership agreements', 'Public sentiment']
        },
        {
          id: 'gradual-integration',
          name: 'Gradual Integration',
          probability: 45,
          description: 'Steady progress with moderate regulatory support and cautious adoption',
          keyCharacteristics: ['Balanced regulations', 'Gradual trust building', 'Incremental progress', 'Regional differences'],
          timeline: '3-5 years to widespread L4',
          strategy: {
            name: 'Conservative Growth',
            approach: 'L3/L4 focus with regional rollout',
            investment: 'Moderate ($2-3B over 5 years)',
            focus: ['L3/L4 systems', 'Safety validation', 'Regional partnerships', 'Incremental features'],
            timeline: '24-36 months to market'
          },
          risks: ['Competitive pressure', 'Slow market growth', 'Technology lag', 'Regional fragmentation'],
          opportunities: ['Sustainable growth', 'Safety leadership', 'Regulatory trust', 'Market stability'],
          indicators: ['Deployment milestones', 'Safety metrics', 'Consumer surveys', 'Regulatory feedback']
        },
        {
          id: 'regulatory-restrictions',
          name: 'Regulatory Restrictions',
          probability: 20,
          description: 'Strict regulations limit deployment due to safety concerns',
          keyCharacteristics: ['Restrictive regulations', 'Safety first approach', 'Limited testing zones', 'High liability requirements'],
          timeline: '5+ years to limited L4',
          strategy: {
            name: 'Compliance Focus',
            approach: 'L2+ assistance with regulatory alignment',
            investment: 'Conservative ($1-2B over 5 years)',
            focus: ['ADAS enhancement', 'Safety validation', 'Regulatory compliance', 'Simulation testing'],
            timeline: '36+ months to limited deployment'
          },
          risks: ['Market stagnation', 'Investment inefficiency', 'Technology obsolescence', 'Competitive disadvantage'],
          opportunities: ['Safety differentiation', 'Regulatory partnership', 'Technology transfer', 'Patient capital advantage'],
          indicators: ['Regulatory changes', 'Safety incidents', 'Legal precedents', 'Industry lobbying']
        },
        {
          id: 'tech-breakthrough',
          name: 'Technology Breakthrough',
          probability: 5,
          description: 'Breakthrough in AI or quantum computing revolutionizes capabilities',
          keyCharacteristics: ['AGI breakthrough', 'Quantum advantage', 'Revolutionary sensors', 'New architectures'],
          timeline: 'Paradigm shift within 2 years',
          strategy: {
            name: 'Innovation Pivot',
            approach: 'Research focus with platform strategy',
            investment: 'Flexible ($1-4B based on breakthrough)',
            focus: ['R&D leadership', 'Platform licensing', 'Technology partnerships', 'Ecosystem building'],
            timeline: 'Rapid pivot within 12 months'
          },
          risks: ['Technology uncertainty', 'Investment timing', 'Competitive disruption', 'Regulatory lag'],
          opportunities: ['Technology leadership', 'Licensing revenue', 'Ecosystem dominance', 'Market transformation'],
          indicators: ['Research breakthroughs', 'Patent filings', 'Academic progress', 'Venture investments']
        }
      ],
      monitoringMetrics: {
        regulatory: 65,
        technology: 78,
        market: 52,
        competition: 71
      }
    },
    {
      id: 'healthcare-ai',
      title: 'Healthcare AI Diagnostic System',
      description: 'AI-powered medical diagnosis platform for global deployment',
      challenge: 'Navigate complex healthcare regulations, privacy concerns, and varying international standards while ensuring patient safety',
      timeHorizon: '7 years (2024-2031)',
      stakeholders: ['Healthcare Providers', 'Regulators (FDA/EMA)', 'Patients', 'Insurance Companies', 'Medical Device Companies'],
      factors: [
        { id: 'fda-approval', name: 'FDA/EMA Approval Process', type: 'driver', impact: 'high', description: 'Medical device approval timelines and requirements' },
        { id: 'data-privacy', name: 'Data Privacy Regulations', type: 'driver', impact: 'high', description: 'HIPAA, GDPR, and emerging privacy laws' },
        { id: 'ai-transparency', name: 'AI Explainability Requirements', type: 'uncertainty', impact: 'high', description: 'Regulatory demands for AI interpretability' },
        { id: 'physician-adoption', name: 'Physician Acceptance', type: 'uncertainty', impact: 'medium', description: 'Medical professional trust and workflow integration' },
        { id: 'ai-models', name: 'Foundation Model Progress', type: 'trend', impact: 'high', description: 'Large language models for medical applications' },
        { id: 'edge-computing', name: 'Edge AI Deployment', type: 'trend', impact: 'medium', description: 'On-device processing for privacy and latency' }
      ],
      scenarios: [
        {
          id: 'regulatory-fast-track',
          name: 'Regulatory Fast-Track',
          probability: 25,
          description: 'Streamlined approval processes accelerate AI medical device deployment',
          keyCharacteristics: ['Fast-track approvals', 'AI-friendly regulations', 'Pilot programs', 'International harmonization'],
          timeline: '2-3 years to major deployments',
          strategy: {
            name: 'Rapid Clinical Integration',
            approach: 'Comprehensive diagnostic platform with fast deployment',
            investment: 'High ($3B+ over 7 years)',
            focus: ['Multi-modal AI', 'Clinical trials', 'Regulatory engagement', 'Provider partnerships'],
            timeline: '18-30 months to first approvals'
          },
          risks: ['Quality concerns', 'Liability issues', 'Technical debt', 'Regulatory backlash'],
          opportunities: ['Market leadership', 'Clinical relationships', 'Data network effects', 'Global expansion'],
          indicators: ['FDA guidance updates', 'Approval timelines', 'Pilot program results', 'Industry partnerships']
        },
        {
          id: 'gradual-clinical-adoption',
          name: 'Gradual Clinical Adoption',
          probability: 50,
          description: 'Steady integration with established validation processes and physician buy-in',
          keyCharacteristics: ['Traditional approval paths', 'Gradual physician adoption', 'Evidence-based deployment', 'Specialty focus'],
          timeline: '4-6 years to widespread adoption',
          strategy: {
            name: 'Evidence-Based Deployment',
            approach: 'Specialty-focused with strong clinical evidence',
            investment: 'Moderate ($1.5-2.5B over 7 years)',
            focus: ['Specialty areas', 'Clinical validation', 'Physician training', 'Quality metrics'],
            timeline: '36-48 months to specialty deployments'
          },
          risks: ['Slow adoption', 'Competitive pressure', 'Clinical resistance', 'ROI challenges'],
          opportunities: ['Clinical trust', 'Quality differentiation', 'Specialty dominance', 'Sustainable growth'],
          indicators: ['Clinical study results', 'Physician surveys', 'Adoption metrics', 'Quality outcomes']
        },
        {
          id: 'privacy-first-approach',
          name: 'Privacy-First Constraints',
          probability: 20,
          description: 'Strict privacy and explainability requirements limit AI deployment',
          keyCharacteristics: ['Strict privacy rules', 'Explainability mandates', 'Limited data sharing', 'On-premise requirements'],
          timeline: '5+ years to limited deployment',
          strategy: {
            name: 'Privacy-Compliant Architecture',
            approach: 'Edge AI with explainable models and strict privacy',
            investment: 'Conservative ($800M-1.5B over 7 years)',
            focus: ['Edge deployment', 'Explainable AI', 'Privacy tech', 'Federated learning'],
            timeline: '48+ months to compliant systems'
          },
          risks: ['Performance limitations', 'High costs', 'Technical complexity', 'Market fragmentation'],
          opportunities: ['Privacy leadership', 'Trust differentiation', 'Technology licensing', 'Regulatory partnership'],
          indicators: ['Privacy regulations', 'Explainability requirements', 'Data breach incidents', 'Patient advocacy']
        },
        {
          id: 'ai-medical-revolution',
          name: 'AI Medical Revolution',
          probability: 5,
          description: 'Breakthrough AI capabilities transform medical diagnosis paradigm',
          keyCharacteristics: ['AGI in medicine', 'Multi-modal fusion', 'Predictive diagnostics', 'Personalized medicine'],
          timeline: 'Transformational within 3 years',
          strategy: {
            name: 'Platform Transformation',
            approach: 'AI-native medical platform with ecosystem integration',
            investment: 'Flexible ($500M-4B based on breakthrough)',
            focus: ['Platform development', 'Ecosystem integration', 'Research partnerships', 'Global scaling'],
            timeline: 'Rapid transformation within 24 months'
          },
          risks: ['Technology uncertainty', 'Regulatory complexity', 'Ethical concerns', 'Competitive disruption'],
          opportunities: ['Medical transformation', 'Platform dominance', 'Global health impact', 'New business models'],
          indicators: ['AI breakthroughs', 'Medical publications', 'Regulatory innovation', 'Industry investment']
        }
      ],
      monitoringMetrics: {
        regulatory: 72,
        technology: 85,
        market: 58,
        competition: 69
      }
    },
    {
      id: 'smart-city-ai',
      title: 'Smart City AI Orchestration',
      description: 'Integrated AI system for urban infrastructure management',
      challenge: 'Deploy city-wide AI coordination system balancing efficiency, privacy, sustainability, and citizen services across diverse municipal needs',
      timeHorizon: '10 years (2024-2034)',
      stakeholders: ['City Government', 'Citizens', 'Infrastructure Providers', 'Technology Vendors', 'Environmental Groups'],
      factors: [
        { id: 'municipal-budgets', name: 'Municipal Budget Constraints', type: 'driver', impact: 'high', description: 'City funding availability for smart infrastructure' },
        { id: 'citizen-privacy', name: 'Citizen Privacy Concerns', type: 'driver', impact: 'high', description: 'Public acceptance of surveillance and data collection' },
        { id: 'climate-targets', name: 'Climate Commitments', type: 'uncertainty', impact: 'high', description: 'Aggressive carbon neutrality and sustainability goals' },
        { id: 'political-changes', name: 'Political Leadership', type: 'uncertainty', impact: 'medium', description: 'Changes in municipal administration and priorities' },
        { id: 'iot-sensors', name: 'IoT Sensor Networks', type: 'trend', impact: 'high', description: 'Ubiquitous sensing and real-time data availability' },
        { id: 'edge-ai', name: 'Distributed AI Computing', type: 'trend', impact: 'medium', description: 'Edge computing for real-time city operations' }
      ],
      scenarios: [
        {
          id: 'smart-city-acceleration',
          name: 'Smart City Acceleration',
          probability: 35,
          description: 'Strong political and citizen support drives comprehensive smart city deployment',
          keyCharacteristics: ['High public investment', 'Citizen engagement', 'Comprehensive deployment', 'Sustainability focus'],
          timeline: '5-7 years to full integration',
          strategy: {
            name: 'Comprehensive Integration',
            approach: 'Full-scale smart city platform with integrated services',
            investment: 'High ($2-4B over 10 years)',
            focus: ['Integrated platform', 'Citizen services', 'Sustainability', 'Data analytics'],
            timeline: '36-60 months to major deployments'
          },
          risks: ['Technical complexity', 'Privacy backlash', 'Budget overruns', 'Integration challenges'],
          opportunities: ['Urban efficiency', 'Citizen satisfaction', 'Environmental impact', 'Economic development'],
          indicators: ['Municipal budgets', 'Citizen surveys', 'Pilot project results', 'Political support']
        },
        {
          id: 'selective-deployment',
          name: 'Selective Deployment',
          probability: 40,
          description: 'Focused implementation in specific domains with measured expansion',
          keyCharacteristics: ['Domain-specific focus', 'Gradual expansion', 'Budget consciousness', 'Proven ROI emphasis'],
          timeline: '7-10 years to broad coverage',
          strategy: {
            name: 'Domain-Focused Growth',
            approach: 'Traffic and utilities focus with expansion to other domains',
            investment: 'Moderate ($800M-1.5B over 10 years)',
            focus: ['Traffic optimization', 'Utility management', 'Emergency services', 'Gradual expansion'],
            timeline: '48-72 months to domain leadership'
          },
          risks: ['Limited impact', 'Fragmented systems', 'Competitive disadvantage', 'Slow ROI'],
          opportunities: ['Proven value', 'Risk mitigation', 'Stakeholder trust', 'Scalable platform'],
          indicators: ['Domain success metrics', 'Budget allocations', 'Stakeholder feedback', 'Technical performance']
        },
        {
          id: 'privacy-constrained',
          name: 'Privacy-Constrained Implementation',
          probability: 20,
          description: 'Strong privacy concerns limit data collection and AI deployment scope',
          keyCharacteristics: ['Strict privacy controls', 'Limited surveillance', 'Citizen data rights', 'Decentralized systems'],
          timeline: '8+ years to privacy-compliant systems',
          strategy: {
            name: 'Privacy-First Architecture',
            approach: 'Privacy-preserving AI with minimal data collection',
            investment: 'Conservative ($400-800M over 10 years)',
            focus: ['Privacy technology', 'Federated systems', 'Citizen control', 'Transparency'],
            timeline: '60+ months to compliant deployment'
          },
          risks: ['Limited effectiveness', 'High costs', 'Technical constraints', 'Performance trade-offs'],
          opportunities: ['Privacy leadership', 'Citizen trust', 'Technology innovation', 'Regulatory model'],
          indicators: ['Privacy legislation', 'Citizen activism', 'Data breach incidents', 'Technology advances']
        },
        {
          id: 'climate-emergency',
          name: 'Climate Emergency Response',
          probability: 5,
          description: 'Climate crisis accelerates AI deployment for emergency urban resilience',
          keyCharacteristics: ['Climate urgency', 'Emergency funding', 'Resilience focus', 'Rapid deployment'],
          timeline: 'Emergency deployment within 3 years',
          strategy: {
            name: 'Climate Resilience Platform',
            approach: 'Emergency-focused AI for climate adaptation and response',
            investment: 'Emergency funding ($1-3B emergency allocation)',
            focus: ['Climate monitoring', 'Emergency response', 'Resilience systems', 'Rapid deployment'],
            timeline: '18-36 months emergency deployment'
          },
          risks: ['Technical shortcuts', 'Sustainability concerns', 'Public resistance', 'System reliability'],
          opportunities: ['Climate leadership', 'Emergency preparedness', 'Technology acceleration', 'Global model'],
          indicators: ['Climate events', 'Emergency declarations', 'Funding availability', 'Public pressure']
        }
      ],
      monitoringMetrics: {
        regulatory: 68,
        technology: 75,
        market: 61,
        competition: 54
      }
    }
  ];

  const steps = [
    'Strategic Context Analysis & Environmental Scanning',
    'Key Drivers and Uncertainty Identification', 
    'Scenario Generation and Probability Assessment',
    'Strategy Development for Each Scenario',
    'Risk Assessment and Contingency Planning',
    'Resource Allocation and Core Capabilities',
    'Early Warning Systems and Decision Triggers',
    'Adaptive Implementation and Monitoring'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % steps.length;
          if (next === 0) {
            setIsRunning(false);
            setPlanningProgress(100);
          } else {
            setPlanningProgress((next / steps.length) * 100);
          }
          return next;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isRunning, steps.length]);

  const currentContext = planningContexts[currentContextIndex];
  const activeScenario = selectedScenario ? currentContext.scenarios.find(s => s.id === selectedScenario) : null;

  const handlePlay = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setPlanningProgress(0);
    setSelectedScenario(null);
  };

  const handleStepForward = () => {
    setCurrentStep((prev) => {
      const next = (prev + 1) % steps.length;
      setPlanningProgress((next / steps.length) * 100);
      return next;
    });
  };

  const handleStepBackward = () => {
    setCurrentStep((prev) => {
      const next = (prev - 1 + steps.length) % steps.length;
      setPlanningProgress((next / steps.length) * 100);
      return next;
    });
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 40) return 'text-green-400';
    if (probability >= 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getFactorColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 70) return 'text-green-400';
    if (value >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="p-6 bg-gray-900/40 rounded-lg">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={handleStepBackward}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
          >
            ←
          </button>
          <button
            onClick={handleStepForward}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
          >
            →
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex gap-2">
          {planningContexts.map((context, index) => (
            <button
              key={context.id}
              onClick={() => setCurrentContextIndex(index)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                index === currentContextIndex
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {context.title}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </span>
          <span className="text-sm text-gray-400">
            Planning Progress: {planningProgress.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${planningProgress}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Context & Factors */}
        <div className="space-y-4">
          {/* Strategic Context */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-purple-400" />
              <h4 className="font-semibold text-white">Strategic Context</h4>
            </div>
            <h5 className="font-medium text-white mb-2">{currentContext.title}</h5>
            <p className="text-gray-300 text-sm mb-3">{currentContext.description}</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-400">Challenge:</span>
                <p className="text-gray-300">{currentContext.challenge}</p>
              </div>
              <div>
                <span className="text-gray-400">Time Horizon:</span>
                <p className="text-gray-300">{currentContext.timeHorizon}</p>
              </div>
            </div>
          </div>

          {/* Key Factors */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-5 h-5 text-blue-400" />
              <h4 className="font-semibold text-white">Key Factors</h4>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {currentContext.factors.map((factor) => (
                <div key={factor.id} className={`p-2 rounded border ${getFactorColor(factor.impact)}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{factor.type.toUpperCase()}</span>
                    <span className="text-xs">{factor.impact} impact</span>
                  </div>
                  <h6 className="font-medium text-sm mt-1">{factor.name}</h6>
                  <p className="text-xs mt-1 opacity-90">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Monitoring Metrics */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h4 className="font-semibold text-white">Monitoring Metrics</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(currentContext.monitoringMetrics).map(([key, value]) => (
                <div key={key} className="bg-gray-700/30 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300 capitalize">{key}</span>
                    <span className={`text-sm font-medium ${getMetricColor(value)}`}>
                      {value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
                    <div 
                      className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stakeholders */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-orange-400" />
              <h4 className="font-semibold text-white">Key Stakeholders</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentContext.stakeholders.map((stakeholder, index) => (
                <span key={index} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">
                  {stakeholder}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Scenarios & Strategies */}
        <div className="space-y-4">
          {/* Current Step Details */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <h4 className="font-semibold text-white mb-3">Current Step: {steps[currentStep]}</h4>
            <div className="text-sm text-gray-300 space-y-2">
              {currentStep === 0 && (
                <div>
                  <p><strong>Context Analysis:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Define strategic challenge: {currentContext.title}</li>
                    <li>Set planning horizon: {currentContext.timeHorizon}</li>
                    <li>Identify key stakeholders: {currentContext.stakeholders.length} groups</li>
                    <li>Establish success criteria and constraints</li>
                  </ul>
                </div>
              )}
              {currentStep === 1 && (
                <div>
                  <p><strong>Factor Identification:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Key drivers: {currentContext.factors.filter(f => f.type === 'driver').length} identified</li>
                    <li>Major uncertainties: {currentContext.factors.filter(f => f.type === 'uncertainty').length} factors</li>
                    <li>Important trends: {currentContext.factors.filter(f => f.type === 'trend').length} analyzed</li>
                    <li>Impact assessment and prioritization complete</li>
                  </ul>
                </div>
              )}
              {currentStep === 2 && (
                <div>
                  <p><strong>Scenario Development:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Generated {currentContext.scenarios.length} distinct scenarios</li>
                    <li>Probability assessment: Most likely {Math.max(...currentContext.scenarios.map(s => s.probability))}%</li>
                    <li>Time horizons: {currentContext.scenarios.map(s => s.timeline).join(', ')}</li>
                    <li>Scenario validation and consistency checks</li>
                  </ul>
                </div>
              )}
              {currentStep === 3 && (
                <div>
                  <p><strong>Strategy Design:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Scenario-specific strategies developed for each scenario</li>
                    <li>Investment levels: Conservative to High based on scenario</li>
                    <li>Timeline alignment: 18 months to 5+ years</li>
                    <li>Strategic focus areas defined per scenario</li>
                  </ul>
                </div>
              )}
              {currentStep === 4 && (
                <div>
                  <p><strong>Risk & Contingency:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Risk assessment across all scenarios</li>
                    <li>Contingency plans for high-impact risks</li>
                    <li>Cross-scenario risk identification</li>
                    <li>Mitigation strategies and response protocols</li>
                  </ul>
                </div>
              )}
              {currentStep === 5 && (
                <div>
                  <p><strong>Resource Allocation:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Core capabilities that work across scenarios</li>
                    <li>Flexible architecture for quick adaptation</li>
                    <li>Strategic options and partnership frameworks</li>
                    <li>Investment portfolio optimization</li>
                  </ul>
                </div>
              )}
              {currentStep === 6 && (
                <div>
                  <p><strong>Monitoring Systems:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Early warning indicators defined</li>
                    <li>Decision triggers and thresholds set</li>
                    <li>Monitoring dashboard with key metrics</li>
                    <li>Scenario transition protocols established</li>
                  </ul>
                </div>
              )}
              {currentStep === 7 && (
                <div>
                  <p><strong>Adaptive Implementation:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li>Roadmap with built-in adaptation points</li>
                    <li>Scenario transition mechanisms</li>
                    <li>Continuous monitoring and adjustment</li>
                    <li>Stakeholder communication and alignment</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Scenarios Overview */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <h4 className="font-semibold text-white mb-3">Future Scenarios</h4>
            <div className="space-y-3">
              {currentContext.scenarios.map((scenario) => (
                <div key={scenario.id} 
                     className={`p-3 rounded-lg border cursor-pointer transition-all ${
                       selectedScenario === scenario.id 
                         ? 'border-blue-500 bg-blue-500/10' 
                         : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                     }`}
                     onClick={() => setSelectedScenario(scenario.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-white">{scenario.name}</h5>
                    <span className={`text-sm font-medium ${getProbabilityColor(scenario.probability)}`}>
                      {scenario.probability}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{scenario.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Timeline: {scenario.timeline}</span>
                    <span>•</span>
                    <span>Strategy: {scenario.strategy.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Scenario Details */}
          {activeScenario && (
            <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-white mb-3">
                <Zap className="w-4 h-4 inline mr-2" />
                {activeScenario.name} Details
              </h4>
              <div className="space-y-3">
                <div>
                  <h6 className="text-sm font-medium text-gray-300 mb-1">Strategy: {activeScenario.strategy.name}</h6>
                  <p className="text-xs text-gray-400 mb-2">{activeScenario.strategy.approach}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-400">Investment:</span>
                      <p className="text-gray-300">{activeScenario.strategy.investment}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Timeline:</span>
                      <p className="text-gray-300">{activeScenario.strategy.timeline}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h6 className="text-sm font-medium text-red-400 mb-1">Key Risks</h6>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {activeScenario.risks.slice(0, 3).map((risk, index) => (
                        <li key={index}>• {risk}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-green-400 mb-1">Opportunities</h6>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {activeScenario.opportunities.slice(0, 3).map((opportunity, index) => (
                        <li key={index}>• {opportunity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Summary */}
      <div className="mt-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <span className="text-white font-medium">Scenario Planning Status</span>
          </div>
          <div className="text-sm text-gray-300">
            Context: {currentContext.title} • Progress: {planningProgress.toFixed(0)}%
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-300">
          <strong>Strategic Insight:</strong> 
          {planningProgress < 25 && " Analyzing strategic context and identifying key uncertainty factors."}
          {planningProgress >= 25 && planningProgress < 75 && " Developing scenario-specific strategies and assessing cross-scenario risks."}
          {planningProgress >= 75 && " Implementing adaptive roadmap with continuous monitoring and adjustment capabilities."}
        </div>
      </div>
    </div>
  );
};

export default ScenarioPlanningDemo;