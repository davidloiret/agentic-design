'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Eye, Code, BookOpen, Maximize2, Minimize2 } from 'lucide-react';

type DisclosureLevel = 'summary' | 'detailed' | 'technical' | 'full-trace';
type SectionStatus = 'collapsed' | 'expanded';
type PhaseType = 'idle' | 'summary' | 'detailed-reveal' | 'technical-reveal' | 'full-trace-reveal' | 'complete';

interface ContentSection {
  id: string;
  title: string;
  level: DisclosureLevel;
  content: string;
  status: SectionStatus;
  parent?: string;
  children?: string[];
  complexity: 'simple' | 'moderate' | 'complex' | 'expert';
}

interface DisclosureMetrics {
  cognitiveLoad: number;
  comprehension: number;
  engagement: number;
  userSatisfaction: number;
  errorRate: number;
  learningEfficiency: number;
}

const ProgressiveDisclosurePatternsDemo: React.FC = () => {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandAll, setExpandAll] = useState(false);
  const [metrics, setMetrics] = useState<DisclosureMetrics>({
    cognitiveLoad: 100,
    comprehension: 0,
    engagement: 0,
    userSatisfaction: 0,
    errorRate: 100,
    learningEfficiency: 0,
  });

  const initialSections: ContentSection[] = [
    {
      id: 'summary',
      title: 'Agent Response',
      level: 'summary',
      content: 'I\'ve analyzed your e-commerce architecture and recommend implementing a microservices pattern with event-driven communication for scalability.',
      status: 'expanded',
      complexity: 'simple',
    },
    {
      id: 'reasoning-overview',
      title: 'Show Reasoning',
      level: 'detailed',
      content: 'This recommendation is based on 3 key factors: current traffic patterns, team structure, and future growth projections.',
      status: 'collapsed',
      parent: 'summary',
      children: ['reasoning-1', 'reasoning-2', 'reasoning-3'],
      complexity: 'moderate',
    },
    {
      id: 'reasoning-1',
      title: 'Factor 1: Traffic Analysis',
      level: 'detailed',
      content: 'Your peak traffic of 50K requests/sec requires horizontal scaling. Microservices allow independent scaling of high-traffic services like checkout and inventory.',
      status: 'collapsed',
      parent: 'reasoning-overview',
      complexity: 'moderate',
    },
    {
      id: 'reasoning-2',
      title: 'Factor 2: Team Structure',
      level: 'detailed',
      content: 'Your 4 development teams can own independent services, enabling parallel development and reducing coordination overhead.',
      status: 'collapsed',
      parent: 'reasoning-overview',
      complexity: 'moderate',
    },
    {
      id: 'reasoning-3',
      title: 'Factor 3: Growth Projections',
      level: 'detailed',
      content: 'Expected 3x growth over 18 months requires architecture that supports adding new services without affecting existing ones.',
      status: 'collapsed',
      parent: 'reasoning-overview',
      complexity: 'moderate',
    },
    {
      id: 'technical-details',
      title: 'Technical Details',
      level: 'technical',
      content: 'Architecture components: API Gateway (Kong), Service Mesh (Istio), Event Bus (Kafka), Database per Service pattern.',
      status: 'collapsed',
      parent: 'summary',
      children: ['tech-1', 'tech-2', 'tech-3'],
      complexity: 'complex',
    },
    {
      id: 'tech-1',
      title: 'Communication Pattern',
      level: 'technical',
      content: 'Async event-driven: Services publish domain events to Kafka topics. Saga pattern for distributed transactions across order, payment, inventory services.',
      status: 'collapsed',
      parent: 'technical-details',
      complexity: 'complex',
    },
    {
      id: 'tech-2',
      title: 'Data Management',
      level: 'technical',
      content: 'Database per service: PostgreSQL for orders, MongoDB for catalog, Redis for caching. CQRS pattern for read-heavy operations.',
      status: 'collapsed',
      parent: 'technical-details',
      complexity: 'complex',
    },
    {
      id: 'tech-3',
      title: 'Deployment Strategy',
      level: 'technical',
      content: 'Kubernetes on AWS EKS, blue-green deployments, canary releases with gradual traffic shifting, circuit breakers for fault tolerance.',
      status: 'collapsed',
      parent: 'technical-details',
      complexity: 'complex',
    },
    {
      id: 'full-trace',
      title: 'Full Reasoning Trace',
      level: 'full-trace',
      content: 'Step-by-step analysis trace with confidence scores, alternatives considered, and decision matrices.',
      status: 'collapsed',
      parent: 'summary',
      children: ['trace-1', 'trace-2', 'trace-3'],
      complexity: 'expert',
    },
    {
      id: 'trace-1',
      title: 'Analysis Process',
      level: 'full-trace',
      content: 'Evaluated 3 architectures: Monolith (confidence: 0.35), Microservices (0.89), Serverless (0.52). Scoring based on: scalability, team fit, cost, complexity.',
      status: 'collapsed',
      parent: 'full-trace',
      complexity: 'expert',
    },
    {
      id: 'trace-2',
      title: 'Confidence Calculation',
      level: 'full-trace',
      content: 'Microservices score: Scalability (0.95), Team Fit (0.91), Cost (0.78), Complexity (0.85). Weighted average with industry benchmarks: 0.89 confidence.',
      status: 'collapsed',
      parent: 'full-trace',
      complexity: 'expert',
    },
    {
      id: 'trace-3',
      title: 'Risk Mitigation',
      level: 'full-trace',
      content: 'Identified risks: Service sprawl, distributed debugging, data consistency. Mitigations: Service registry, centralized logging, saga pattern.',
      status: 'collapsed',
      parent: 'full-trace',
      complexity: 'expert',
    },
  ];

  useEffect(() => {
    if (phase === 'idle') {
      const timer = setTimeout(() => {
        setPhase('summary');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'summary') {
      setSections(initialSections);
      setExpandedSections(new Set(['summary']));

      setMetrics({
        cognitiveLoad: 20,
        comprehension: 65,
        engagement: 40,
        userSatisfaction: 70,
        errorRate: 15,
        learningEfficiency: 60,
      });

      setTimeout(() => setPhase('detailed-reveal'), 1500);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'detailed-reveal') {
      setTimeout(() => {
        setExpandedSections(prev => new Set([...prev, 'reasoning-overview']));
        setSections(prev => prev.map(s =>
          s.id === 'reasoning-overview' ? { ...s, status: 'expanded' } : s
        ));

        setMetrics(prev => ({
          ...prev,
          cognitiveLoad: 45,
          comprehension: 78,
          engagement: 65,
          learningEfficiency: 75,
        }));
      }, 500);

      setTimeout(() => {
        setExpandedSections(prev => new Set([...prev, 'reasoning-1', 'reasoning-2', 'reasoning-3']));
        setSections(prev => prev.map(s =>
          ['reasoning-1', 'reasoning-2', 'reasoning-3'].includes(s.id)
            ? { ...s, status: 'expanded' }
            : s
        ));

        setMetrics(prev => ({
          ...prev,
          cognitiveLoad: 65,
          comprehension: 85,
          engagement: 80,
        }));

        setTimeout(() => setPhase('technical-reveal'), 1000);
      }, 1000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'technical-reveal') {
      setTimeout(() => {
        setExpandedSections(prev => new Set([...prev, 'technical-details']));
        setSections(prev => prev.map(s =>
          s.id === 'technical-details' ? { ...s, status: 'expanded' } : s
        ));

        setMetrics(prev => ({
          ...prev,
          cognitiveLoad: 80,
          comprehension: 90,
          engagement: 88,
        }));
      }, 500);

      setTimeout(() => {
        setExpandedSections(prev => new Set([...prev, 'tech-1', 'tech-2', 'tech-3']));
        setSections(prev => prev.map(s =>
          ['tech-1', 'tech-2', 'tech-3'].includes(s.id)
            ? { ...s, status: 'expanded' }
            : s
        ));

        setMetrics(prev => ({
          ...prev,
          cognitiveLoad: 90,
          comprehension: 92,
          errorRate: 8,
        }));

        setTimeout(() => setPhase('full-trace-reveal'), 1000);
      }, 1000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'full-trace-reveal') {
      setTimeout(() => {
        setExpandedSections(prev => new Set([...prev, 'full-trace']));
        setSections(prev => prev.map(s =>
          s.id === 'full-trace' ? { ...s, status: 'expanded' } : s
        ));

        setMetrics(prev => ({
          ...prev,
          cognitiveLoad: 95,
          comprehension: 95,
          engagement: 92,
        }));
      }, 500);

      setTimeout(() => {
        setExpandedSections(prev => new Set([...prev, 'trace-1', 'trace-2', 'trace-3']));
        setSections(prev => prev.map(s =>
          ['trace-1', 'trace-2', 'trace-3'].includes(s.id)
            ? { ...s, status: 'expanded' }
            : s
        ));

        setMetrics({
          cognitiveLoad: 100,
          comprehension: 98,
          engagement: 95,
          userSatisfaction: 94,
          errorRate: 3,
          learningEfficiency: 92,
        });

        setTimeout(() => setPhase('complete'), 1000);
      }, 1000);
    }
  }, [phase]);

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);

    setSections(prev => prev.map(s =>
      s.id === id
        ? { ...s, status: s.status === 'expanded' ? 'collapsed' : 'expanded' }
        : s
    ));
  };

  const toggleExpandAll = () => {
    if (expandAll) {
      setExpandedSections(new Set(['summary']));
      setSections(prev => prev.map(s => ({ ...s, status: s.id === 'summary' ? 'expanded' : 'collapsed' })));
    } else {
      const allIds = sections.map(s => s.id);
      setExpandedSections(new Set(allIds));
      setSections(prev => prev.map(s => ({ ...s, status: 'expanded' })));
    }
    setExpandAll(!expandAll);
  };

  const getComplexityColor = (complexity: string): string => {
    switch (complexity) {
      case 'simple': return 'text-green-400';
      case 'moderate': return 'text-blue-400';
      case 'complex': return 'text-orange-400';
      case 'expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getComplexityBg = (complexity: string): string => {
    switch (complexity) {
      case 'simple': return 'bg-green-600/10 border-green-600/30';
      case 'moderate': return 'bg-blue-600/10 border-blue-600/30';
      case 'complex': return 'bg-orange-600/10 border-orange-600/30';
      case 'expert': return 'bg-red-600/10 border-red-600/30';
      default: return 'bg-slate-700 border-slate-600';
    }
  };

  const getIndentLevel = (section: ContentSection): number => {
    let level = 0;
    let current = section;
    while (current.parent) {
      level++;
      current = sections.find(s => s.id === current.parent) || section;
      if (level > 10) break;
    }
    return level;
  };

  const getPhaseDescription = (): string => {
    switch (phase) {
      case 'idle': return 'Initializing progressive disclosure interface...';
      case 'summary': return 'Showing essential information - simple summary for quick understanding';
      case 'detailed-reveal': return 'Revealing detailed reasoning - moderate complexity for deeper insight';
      case 'technical-reveal': return 'Exposing technical details - complex information for implementation';
      case 'full-trace-reveal': return 'Displaying full reasoning trace - expert-level analysis';
      case 'complete': return 'All disclosure levels revealed - progressive cognitive load management';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${phase === 'complete' ? 'bg-green-600' : 'bg-blue-600'}`}>
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Progressive Disclosure Interface</h3>
            <p className="text-sm text-gray-400 mt-1">{getPhaseDescription()}</p>
          </div>
          <button
            onClick={toggleExpandAll}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 border border-slate-600 transition-colors flex items-center gap-2"
          >
            {expandAll ? (
              <>
                <Minimize2 className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Collapse All</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Expand All</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {(['summary', 'detailed-reveal', 'technical-reveal', 'full-trace-reveal'] as PhaseType[]).map((p, idx) => (
            <React.Fragment key={p}>
              <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                phase === p ? 'bg-blue-500' :
                ['detailed-reveal', 'technical-reveal', 'full-trace-reveal', 'complete'].includes(phase) && idx === 0 ? 'bg-green-600' :
                ['technical-reveal', 'full-trace-reveal', 'complete'].includes(phase) && idx === 1 ? 'bg-green-600' :
                ['full-trace-reveal', 'complete'].includes(phase) && idx === 2 ? 'bg-green-600' :
                phase === 'complete' && idx === 3 ? 'bg-green-600' :
                'bg-slate-700'
              }`} />
              {idx < 3 && <div className="w-2 h-2 rounded-full bg-slate-600" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-green-400" />
          <h4 className="font-semibold text-white">Agent Response - Layered Information</h4>
        </div>

        <div className="space-y-2">
          {sections.map((section) => {
            const indentLevel = getIndentLevel(section);
            const isExpanded = expandedSections.has(section.id);
            const hasChildren = section.children && section.children.length > 0;

            return (
              <div
                key={section.id}
                className="transition-all duration-300"
                style={{ marginLeft: `${indentLevel * 24}px` }}
              >
                <div
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                    getComplexityBg(section.complexity)
                  } hover:border-blue-500/50`}
                  onClick={() => hasChildren && toggleSection(section.id)}
                >
                  <div className="flex items-start gap-3">
                    {hasChildren && (
                      <div className="mt-0.5">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-semibold ${getComplexityColor(section.complexity)}`}>
                          {section.title}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-gray-300 capitalize">
                          {section.complexity}
                        </span>
                      </div>
                      {isExpanded && (
                        <div className="text-sm text-gray-300 leading-relaxed animate-fadeIn">
                          {section.content}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {phase === 'complete' && (
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-blue-400" />
            <h4 className="font-semibold text-white">Progressive Disclosure Metrics</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Cognitive Load</div>
              <div className="text-2xl font-bold text-orange-400">{metrics.cognitiveLoad}%</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metrics.cognitiveLoad}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">Managed through layers</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Comprehension</div>
              <div className="text-2xl font-bold text-green-400">{metrics.comprehension}%</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metrics.comprehension}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">User understanding</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Engagement</div>
              <div className="text-2xl font-bold text-blue-400">{metrics.engagement}%</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metrics.engagement}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">Interaction rate</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">User Satisfaction</div>
              <div className="text-2xl font-bold text-purple-400">{metrics.userSatisfaction}%</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metrics.userSatisfaction}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">Preference for progressive</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Error Rate</div>
              <div className="text-2xl font-bold text-red-400">{metrics.errorRate}%</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metrics.errorRate}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">Due to insufficient info</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Learning Efficiency</div>
              <div className="text-2xl font-bold text-yellow-400">{metrics.learningEfficiency}%</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metrics.learningEfficiency}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">Understanding new features</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <div className="text-sm text-blue-300">
              <strong>Disclosure Summary:</strong> Successfully revealed 4 information layers (summary → detailed → technical → full-trace)
              with 13 expandable sections. Cognitive load increased progressively from 20% to 100% while maintaining 98% comprehension.
              Users engaged with {metrics.engagement}% of disclosed content, achieving {metrics.userSatisfaction}% satisfaction rating.
              Error rate reduced from 100% to {metrics.errorRate}% through proper information layering, with {metrics.learningEfficiency}% learning efficiency.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressiveDisclosurePatternsDemo;