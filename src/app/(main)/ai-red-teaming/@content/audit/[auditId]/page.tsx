'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ArrowRight,
  ArrowLeft,
  Plus,
  Save,
  BarChart3,
  CheckCircle,
  Circle,
  Settings,
  Eye,
  Zap,
  Database,
  Lock,
  Brain,
  FileText,
  AlertTriangle,
  Target,
  Activity,
  CheckSquare,
  Construction,
  X
} from 'lucide-react';

// Step definitions for the audit wizard
const auditSteps = [
  {
    id: 'setup',
    title: 'Audit Setup',
    description: 'Basic audit information and configuration',
    icon: (size = "w-5 h-5") => <Settings className={size} />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'reconnaissance',
    title: 'Reconnaissance',
    description: 'System discovery and planning',
    icon: (size = "w-5 h-5") => <Eye className={size} />,
    color: 'from-purple-500 to-blue-500'
  },
  {
    id: 'technical',
    title: 'Technical Testing',
    description: 'Security vulnerability assessment',
    icon: (size = "w-5 h-5") => <Zap className={size} />,
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 'privacy',
    title: 'Data Privacy',
    description: 'Privacy and data protection review',
    icon: (size = "w-5 h-5") => <Database className={size} />,
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain',
    description: 'Third-party dependencies audit',
    icon: (size = "w-5 h-5") => <Lock className={size} />,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'governance',
    title: 'AI Governance',
    description: 'Ethics and compliance review',
    icon: (size = "w-5 h-5") => <Brain className={size} />,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'report',
    title: 'Report & Export',
    description: 'Generate final audit report',
    icon: (size = "w-5 h-5") => <FileText className={size} />,
    color: 'from-gray-500 to-gray-700'
  }
];

// Audit checklist items by phase
const auditChecklist = {
  reconnaissance: [
    {
      category: 'System Architecture Analysis',
      items: [
        'AI model architecture identification',
        'Training data sources and lineage',
        'Input/output interfaces mapping',
        'Integration points and dependencies',
        'Access controls and authentication mechanisms'
      ]
    },
    {
      category: 'Threat Modeling',
      items: [
        'Attack surface identification',
        'Threat actor profiling',
        'Risk scenario development',
        'Business impact assessment',
        'Regulatory compliance requirements'
      ]
    }
  ],
  technical: [
    {
      category: 'Prompt Security Assessment',
      items: [
        'Basic prompt injection vulnerabilities',
        'Advanced prompt injection techniques',
        'Context window manipulation',
        'System prompt extraction attempts',
        'Instruction hierarchy bypass testing'
      ]
    },
    {
      category: 'Model Robustness Testing',
      items: [
        'Adversarial input generation',
        'Edge case behavior analysis',
        'Model hallucination triggers',
        'Output consistency validation',
        'Bias detection and evaluation'
      ]
    }
  ],
  privacy: [
    {
      category: 'Training Data Extraction',
      items: [
        'Memorization attack vectors',
        'Personal information extraction',
        'Proprietary data leakage tests',
        'Model inversion techniques',
        'Membership inference attacks'
      ]
    },
    {
      category: 'Privacy Compliance',
      items: [
        'GDPR compliance verification',
        'Data retention policy validation',
        'Consent mechanism testing',
        'Right to erasure implementation',
        'Data minimization practices'
      ]
    }
  ],
  'supply-chain': [
    {
      category: 'Model Supply Chain',
      items: [
        'Pre-trained model provenance',
        'Training data integrity verification',
        'Model poisoning vulnerability assessment',
        'Third-party API security evaluation',
        'Dependency vulnerability scanning'
      ]
    }
  ],
  governance: [
    {
      category: 'Ethical AI Framework',
      items: [
        'Fairness and bias mitigation strategies',
        'Transparency and explainability measures',
        'Accountability mechanisms',
        'Human oversight implementation',
        'Ethical review process validation'
      ]
    }
  ]
};

interface AuditData {
  systemName: string;
  auditorName: string;
  startDate: string;
  scope: string;
  description: string;
  objectives: string;
  systemArchitecture: string;
  riskTolerance: string;
}

interface ChecklistState {
  [phase: string]: {
    [category: string]: {
      [item: string]: {
        completed: boolean;
        riskLevel: string;
        notes: string;
        evidence: string;
      }
    }
  }
}

export default function AuditWizardPage({ params }: { params: { auditId: string } }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [auditData, setAuditData] = useState<AuditData>({
    systemName: '',
    auditorName: '',
    startDate: new Date().toISOString().split('T')[0],
    scope: 'full',
    description: '',
    objectives: '',
    systemArchitecture: '',
    riskTolerance: ''
  });
  const [checklistState, setChecklistState] = useState<ChecklistState>({});
  const [auditId, setAuditId] = useState<string | null>(params.auditId === 'new' ? null : params.auditId);
  const [isLoading, setIsLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load existing audit data if not new
    if (params.auditId !== 'new') {
      // TODO: Load audit data from API
      setAuditData({
        systemName: 'TechCorp AI Assistant',
        auditorName: 'John Doe',
        startDate: '2025-01-15',
        scope: 'full',
        description: 'Comprehensive security assessment of the AI assistant system',
        objectives: 'Identify vulnerabilities and ensure compliance',
        systemArchitecture: 'Cloud-based LLM with API gateway',
        riskTolerance: 'medium'
      });
      setCurrentStep(2); // Resume at technical testing
    }
  }, [params.auditId]);

  const currentStepData = auditSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === auditSteps.length - 1;

  // Create audit when moving from setup step
  const createAudit = async () => {
    if (auditId) return; // Already created
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemName: auditData.systemName,
          auditorName: auditData.auditorName,
          startDate: auditData.startDate,
          scope: auditData.scope,
          description: auditData.description,
          objectives: auditData.objectives,
          systemArchitecture: auditData.systemArchitecture,
          riskTolerance: auditData.riskTolerance
        })
      });
      
      if (response.ok) {
        const audit = await response.json();
        setAuditId(audit.id);
      }
    } catch (error) {
      console.error('Failed to create audit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (currentStep === 0 && !auditId) {
      await createAudit();
    }
    if (currentStep < auditSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateChecklistItem = (phase: string, category: string, item: string, updates: Partial<ChecklistState[string][string][string]>) => {
    setChecklistState(prev => ({
      ...prev,
      [phase]: {
        ...prev[phase],
        [category]: {
          ...prev[phase]?.[category],
          [item]: {
            ...prev[phase]?.[category]?.[item],
            ...updates,
            completed: false,
            riskLevel: 'info',
            notes: '',
            evidence: '',
          }
        }
      }
    }));
  };

  const getChecklistItem = (phase: string, category: string, item: string) => {
    return checklistState[phase]?.[category]?.[item] || {
      completed: false,
      riskLevel: 'info',
      notes: '',
      evidence: ''
    };
  };

  const calculatePhaseProgress = (phase: string) => {
    const phaseChecklist = auditChecklist[phase as keyof typeof auditChecklist] || [];
    const totalItems = phaseChecklist.reduce((sum, cat) => sum + cat.items.length, 0);
    const completedItems = phaseChecklist.reduce((sum, cat) => {
      return sum + cat.items.filter(item => getChecklistItem(phase, cat.category, item).completed).length;
    }, 0);
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  const renderSetupStep = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">System Name *</label>
          <input
            type="text"
            value={auditData.systemName}
            onChange={(e) => setAuditData(prev => ({...prev, systemName: e.target.value}))}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter the AI system name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Auditor Name *</label>
          <input
            type="text"
            value={auditData.auditorName}
            onChange={(e) => setAuditData(prev => ({...prev, auditorName: e.target.value}))}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter auditor name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
          <input
            type="date"
            value={auditData.startDate}
            onChange={(e) => setAuditData(prev => ({...prev, startDate: e.target.value}))}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Audit Scope</label>
          <select
            value={auditData.scope}
            onChange={(e) => setAuditData(prev => ({...prev, scope: e.target.value}))}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="full">Full System Audit</option>
            <option value="focused">Focused Assessment</option>
            <option value="compliance">Compliance Review</option>
            <option value="penetration">Penetration Testing</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea
          value={auditData.description}
          onChange={(e) => setAuditData(prev => ({...prev, description: e.target.value}))}
          rows={3}
          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
          placeholder="Describe the purpose and goals of this audit..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">System Architecture Overview</label>
        <textarea
          value={auditData.systemArchitecture}
          onChange={(e) => setAuditData(prev => ({...prev, systemArchitecture: e.target.value}))}
          rows={4}
          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
          placeholder="Describe the AI system architecture, components, and data flow..."
        />
      </div>
    </div>
  );

  const renderChecklistStep = (phase: string) => {
    const phaseChecklist = auditChecklist[phase as keyof typeof auditChecklist] || [];
    const progress = calculatePhaseProgress(phase);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Security Assessment Checklist</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Progress: {progress}%</span>
            <div className="w-24 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        
        {phaseChecklist.map((category) => (
          <div key={category.category} className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-blue-400" />
              <span>{category.category}</span>
            </h4>
            
            <div className="space-y-4">
              {category.items.map((item) => {
                const itemState = getChecklistItem(phase, category.category, item);
                
                return (
                  <div key={item} className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => updateChecklistItem(phase, category.category, item, { 
                          completed: !itemState.completed 
                        })}
                        className="mt-1 flex-shrink-0"
                      >
                        {itemState.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`text-sm font-medium ${itemState.completed ? 'text-green-300 line-through' : 'text-gray-200'}`}>
                            {item}
                          </span>
                          <select
                            value={itemState.riskLevel}
                            onChange={(e) => updateChecklistItem(phase, category.category, item, { 
                              riskLevel: e.target.value 
                            })}
                            className="text-xs bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white"
                          >
                            <option value="info">Info</option>
                            <option value="low">Low Risk</option>
                            <option value="medium">Medium Risk</option>
                            <option value="high">High Risk</option>
                            <option value="critical">Critical Risk</option>
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Findings & Notes</label>
                            <textarea
                              value={itemState.notes}
                              onChange={(e) => updateChecklistItem(phase, category.category, item, { 
                                notes: e.target.value 
                              })}
                              placeholder="Document findings, issues, or observations..."
                              className="w-full text-xs bg-gray-600/50 border border-gray-500/50 rounded px-3 py-2 text-gray-200 resize-none"
                              rows={2}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Evidence & Screenshots</label>
                            <textarea
                              value={itemState.evidence}
                              onChange={(e) => updateChecklistItem(phase, category.category, item, { 
                                evidence: e.target.value 
                              })}
                              placeholder="Links to evidence, screenshots, or supporting materials..."
                              className="w-full text-xs bg-gray-600/50 border border-gray-500/50 rounded px-3 py-2 text-gray-200 resize-none"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderReportStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
        <h3 className="text-2xl font-bold text-white mb-2">Audit Complete!</h3>
        <p className="text-gray-400">Your AI security audit has been completed successfully.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 text-center">
          <Target className="w-8 h-8 mx-auto mb-2 text-blue-400" />
          <div className="text-2xl font-bold text-white">85%</div>
          <div className="text-sm text-gray-400">Coverage</div>
        </div>
        
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 text-center">
          <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-orange-400" />
          <div className="text-2xl font-bold text-white">2.3</div>
          <div className="text-sm text-gray-400">Risk Score</div>
        </div>
        
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 text-center">
          <Activity className="w-8 h-8 mx-auto mb-2 text-green-400" />
          <div className="text-2xl font-bold text-white">47</div>
          <div className="text-sm text-gray-400">Findings</div>
        </div>
      </div>
      
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Export Options</h4>
        <div className="grid grid-cols-1 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-all">
            <FileText className="w-5 h-5 text-blue-400" />
            <div className="text-left">
              <div className="text-sm font-medium text-white">Detailed Report</div>
              <div className="text-xs text-gray-400">Comprehensive PDF with findings</div>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-all">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <div className="text-left">
              <div className="text-sm font-medium text-white">Executive Summary</div>
              <div className="text-xs text-gray-400">High-level overview for leadership</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStepData.id) {
      case 'setup':
        return renderSetupStep();
      case 'report':
        return renderReportStep();
      default:
        return renderChecklistStep(currentStepData.id);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return auditData.systemName && auditData.auditorName;
    }
    return true;
  };

  return (
    <div className="w-full max-w-none space-y-4 sm:space-y-6">
      {/* Visual Stepper */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Progress Line - Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:block absolute top-8 left-8 right-8 h-0.5 bg-gray-700">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-red-500 transition-all duration-500"
                style={{ width: `${(currentStep / (auditSteps.length - 1)) * 100}%` }}
              />
            </div>
            
            {/* Steps - Mobile: Horizontal scroll, Desktop: Full layout */}
            <div className="relative">
              {/* Mobile Progress Bar */}
              <div className="sm:hidden mb-4">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Step {currentStep + 1} of {auditSteps.length}</span>
                  <span>{Math.round(((currentStep + 1) / auditSteps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-red-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / auditSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Mobile: Horizontal scrollable steps */}
              <div className="sm:hidden overflow-x-auto pb-4">
                <div className="flex space-x-4 min-w-max px-1">
                  {auditSteps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => index <= currentStep && setCurrentStep(index)}
                      disabled={index > currentStep}
                      className={`group flex flex-col items-center flex-shrink-0 transition-all ${
                        index <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'
                      }`}
                    >
                      {/* Mobile Step Circle - Smaller */}
                      <div className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? 'bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/30'
                          : index < currentStep
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                          : 'bg-gray-700 border-2 border-gray-600'
                      }`}>
                        {index < currentStep ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <div className={`${index === currentStep ? 'text-white' : 'text-gray-400'}`}>
                            {step.icon("w-6 h-6")}
                          </div>
                        )}
                        
                        {/* Mobile Step Number */}
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === currentStep
                            ? 'bg-red-600 text-white'
                            : index < currentStep
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-600 text-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Mobile Step Label - More compact */}
                      <div className="mt-2 text-center max-w-[80px]">
                        <h4 className={`text-xs font-semibold transition-colors ${
                          index === currentStep
                            ? 'text-red-300'
                            : index < currentStep
                            ? 'text-green-300'
                            : 'text-gray-400'
                        }`}>
                          {step.title}
                        </h4>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop: Full layout */}
              <div className="hidden sm:flex justify-between">
                {auditSteps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => index <= currentStep && setCurrentStep(index)}
                    disabled={index > currentStep}
                    className={`group flex flex-col items-center transition-all ${
                      index <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'
                    }`}
                  >
                    {/* Desktop Step Circle */}
                    <div className={`relative flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? 'bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/30 scale-110'
                        : index < currentStep
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                        : 'bg-gray-700 border-2 border-gray-600'
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                      ) : (
                        <div className={`${index === currentStep ? 'text-white' : 'text-gray-400'}`}>
                          {step.icon("w-8 h-8 lg:w-10 lg:h-10")}
                        </div>
                      )}
                      
                      {/* Desktop Step Number */}
                      <div className={`absolute -top-2 -right-2 w-6 h-6 lg:w-7 lg:h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === currentStep
                          ? 'bg-red-600 text-white'
                          : index < currentStep
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Desktop Step Label */}
                    <div className="mt-3 lg:mt-4 text-center max-w-[100px] lg:max-w-[120px]">
                      <h4 className={`text-sm font-semibold transition-colors ${
                        index === currentStep
                          ? 'text-red-300'
                          : index < currentStep
                          ? 'text-green-300'
                          : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 hidden lg:block">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Progress Percentage for Current Step */}
                    {index === currentStep && index > 0 && index < auditSteps.length - 1 && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-300">
                          {calculatePhaseProgress(step.id)}% Complete
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
        <div className="mb-6">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-gradient-to-r ${currentStepData.color} mb-4`}>
            {currentStepData.icon()}
            <span className="text-sm font-medium text-white">{currentStepData.title}</span>
          </div>
          <p className="text-gray-400 text-sm">{currentStepData.description}</p>
        </div>

        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
        <button
          onClick={handlePrevious}
          disabled={isFirstStep}
          className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 rounded-xl transition-all ${
            isFirstStep
              ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
              : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70 border border-gray-600/50'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-3">
          {!isLastStep && (
            <button
              onClick={() => {/* Save draft */}}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-300 hover:bg-gray-700/70 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Draft</span>
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!canProceed() || isLoading}
            className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 rounded-xl transition-all ${
              !canProceed() || isLoading
                ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
                : isLastStep
                ? 'bg-green-600/20 border border-green-500/30 text-green-300 hover:bg-green-600/30'
                : 'bg-red-600/20 border border-red-500/30 text-red-300 hover:bg-red-600/30'
            }`}
          >
            <span className="whitespace-nowrap">{isLoading ? 'Creating...' : isLastStep ? 'Generate Report' : 'Continue'}</span>
            {!isLastStep && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}