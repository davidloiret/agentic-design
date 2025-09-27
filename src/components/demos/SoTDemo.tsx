'use client';

import React, { useState, useEffect } from 'react';
import { PlayCircle, RotateCcw, Layout, Zap, GitBranch, Layers, FileText, BookOpen, MessageSquare } from 'lucide-react';

interface SkeletonPoint {
  id: string;
  title: string;
  order: number;
  status: 'pending' | 'expanding' | 'expanded' | 'integrated';
}

interface ExpandedContent {
  pointId: string;
  content: string[];
  completionTime: number;
}

interface Scenario {
  id: string;
  title: string;
  icon: React.ReactNode;
  problem: string;
  context: string;
  skeleton: SkeletonPoint[];
  expansions: ExpandedContent[];
  integratedOutput: string[];
  parallelBenefit: string;
  consistencyChecks: string[];
  reuseExample: {
    newProblem: string;
    sameSkeleton: string;
    differentContent: string;
  };
}

type Phase = 'idle' | 'skeleton' | 'parallel-expand' | 'integration' | 'consistency' | 'reuse' | 'complete';

export default function SoTDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>('essay');
  const [phase, setPhase] = useState<Phase>('idle');
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedPoints, setRevealedPoints] = useState<Set<string>>(new Set());
  const [expandedPoints, setExpandedPoints] = useState<Set<string>>(new Set());
  const [integratedSections, setIntegratedSections] = useState<Set<number>>(new Set());

  const scenarios: Scenario[] = [
    {
      id: 'essay',
      title: 'Essay Writing',
      icon: <FileText className="w-5 h-5" />,
      problem: 'Write an essay on the impact of AI on modern education',
      context: 'Multi-part analytical essay requiring structured argumentation',
      skeleton: [
        { id: 's1', title: 'Introduction: AI transformation context', order: 1, status: 'pending' },
        { id: 's2', title: 'Benefit 1: Personalized learning', order: 2, status: 'pending' },
        { id: 's3', title: 'Benefit 2: Accessibility improvements', order: 3, status: 'pending' },
        { id: 's4', title: 'Challenge 1: Equity and access gaps', order: 4, status: 'pending' },
        { id: 's5', title: 'Challenge 2: Teacher role evolution', order: 5, status: 'pending' },
        { id: 's6', title: 'Conclusion: Balanced integration path', order: 6, status: 'pending' }
      ],
      expansions: [
        {
          pointId: 's1',
          content: [
            'AI systems are fundamentally reshaping education',
            'From K-12 to higher education, transformation is underway',
            'This essay examines benefits and challenges',
            'Thesis: AI offers promise but requires careful implementation'
          ],
          completionTime: 800
        },
        {
          pointId: 's2',
          content: [
            'AI enables adaptive learning systems',
            'Content adjusts to individual student pace and style',
            'Example: Khan Academy uses ML for personalized paths',
            'Research shows 30% improvement in engagement'
          ],
          completionTime: 900
        },
        {
          pointId: 's3',
          content: [
            'AI tools break down traditional barriers',
            'Real-time translation for multilingual classrooms',
            'Text-to-speech and accessibility features',
            'Rural students access world-class content'
          ],
          completionTime: 850
        },
        {
          pointId: 's4',
          content: [
            'Digital divide creates new inequalities',
            'Not all students have device and internet access',
            'Premium AI tools favor wealthy districts',
            'Risk of two-tier education system'
          ],
          completionTime: 880
        },
        {
          pointId: 's5',
          content: [
            'Teacher roles shifting from content delivery',
            'Focus on mentorship and critical thinking',
            'Training needed for AI tool integration',
            'Some resistance due to job security concerns'
          ],
          completionTime: 920
        },
        {
          pointId: 's6',
          content: [
            'AI in education is inevitable and beneficial',
            'Must address equity and access challenges',
            'Teacher training and support essential',
            'Goal: Technology enhances, not replaces, human education'
          ],
          completionTime: 840
        }
      ],
      integratedOutput: [
        'AI systems are fundamentally reshaping education across all levels. This essay examines both the transformative benefits and critical challenges.',
        'First, AI enables personalized learning at scale. Adaptive systems adjust content to individual pace and style, improving engagement by up to 30%.',
        'Second, AI breaks down accessibility barriers through translation, text-to-speech, and remote access to quality content.',
        'However, the digital divide creates new inequalities. Premium AI tools and device access favor wealthy districts, risking a two-tier system.',
        'Additionally, teacher roles are evolving from content delivery to mentorship, requiring significant training and cultural adaptation.',
        'In conclusion, while AI offers tremendous promise for education, successful integration requires addressing equity gaps and supporting educators through this transition.'
      ],
      parallelBenefit: '6 sections developed simultaneously in ~900ms vs ~5400ms sequential (6x speedup)',
      consistencyChecks: [
        '✓ All sections reference AI in education context',
        '✓ Benefits (2-3) precede challenges (4-5)',
        '✓ Conclusion synthesizes both perspectives',
        '✓ Academic tone maintained throughout',
        '✓ Evidence and examples consistently formatted'
      ],
      reuseExample: {
        newProblem: 'Write an essay on renewable energy adoption',
        sameSkeleton: 'Same 6-part structure: Intro → Benefit 1 → Benefit 2 → Challenge 1 → Challenge 2 → Conclusion',
        differentContent: 'Climate context, cost reduction, grid reliability, infrastructure needs, political barriers, policy recommendations'
      }
    },
    {
      id: 'business',
      title: 'Business Analysis',
      icon: <MessageSquare className="w-5 h-5" />,
      problem: 'Analyze market entry strategy for fintech startup in Southeast Asia',
      context: 'Comprehensive strategic assessment across multiple dimensions',
      skeleton: [
        { id: 'b1', title: 'Market opportunity assessment', order: 1, status: 'pending' },
        { id: 'b2', title: 'Competitive landscape analysis', order: 2, status: 'pending' },
        { id: 'b3', title: 'Regulatory environment evaluation', order: 3, status: 'pending' },
        { id: 'b4', title: 'Customer segment identification', order: 4, status: 'pending' },
        { id: 'b5', title: 'Go-to-market strategy', order: 5, status: 'pending' },
        { id: 'b6', title: 'Risk mitigation plan', order: 6, status: 'pending' }
      ],
      expansions: [
        {
          pointId: 'b1',
          content: [
            'Southeast Asia: 680M population, 73% unbanked',
            'Digital payment volume CAGR: 28% (2023-2028)',
            'Total addressable market: $1.2T by 2027',
            'Key drivers: Mobile penetration, young demographics'
          ],
          completionTime: 920
        },
        {
          pointId: 'b2',
          content: [
            'Established players: Grab, GoTo, Sea Group',
            'International entrants: PayPal, Stripe expanding',
            'Local startups in niche segments',
            'Gap: SMB payment solutions underserved'
          ],
          completionTime: 880
        },
        {
          pointId: 'b3',
          content: [
            'Singapore: Pro-innovation, clear licensing',
            'Indonesia: Complex, evolving regulations',
            'Thailand/Vietnam: Moderate regulatory burden',
            'Strategy: Begin in Singapore, expand regionally'
          ],
          completionTime: 900
        },
        {
          pointId: 'b4',
          content: [
            'Primary: SMB merchants (50-500 employees)',
            'Secondary: Freelancers and gig workers',
            'Pain points: High fees, poor UX, limited integration',
            'Value prop: 40% lower fees, API-first platform'
          ],
          completionTime: 860
        },
        {
          pointId: 'b5',
          content: [
            'Phase 1: Singapore pilot (100 merchants, 6 months)',
            'Phase 2: Indonesia expansion (scale to 1000)',
            'Phase 3: Regional presence (Thailand, Vietnam)',
            'Channel: Direct sales + integration partnerships'
          ],
          completionTime: 940
        },
        {
          pointId: 'b6',
          content: [
            'Regulatory: Hire local compliance experts',
            'Competition: Focus on underserved SMB niche',
            'Technology: Multi-region infrastructure redundancy',
            'Financial: $15M runway, breakeven by month 18'
          ],
          completionTime: 870
        }
      ],
      integratedOutput: [
        'Southeast Asia presents compelling fintech opportunity with 680M population, 73% unbanked, and $1.2T addressable market by 2027.',
        'While established players dominate consumer payments, the SMB merchant segment (50-500 employees) remains underserved.',
        'Regulatory complexity varies by country. Strategy is to launch in business-friendly Singapore, then expand to Indonesia and beyond.',
        'Target customers are SMB merchants and gig workers facing high fees and poor integration. Our value proposition is 40% lower fees with API-first platform.',
        'Go-to-market approach: Singapore pilot with 100 merchants for 6 months, then scale to 1000 in Indonesia, followed by regional expansion.',
        'Risk mitigation includes local compliance expertise, niche focus to avoid direct competition, multi-region infrastructure, and $15M runway targeting month 18 breakeven.'
      ],
      parallelBenefit: '6 analyses completed in parallel ~920ms vs ~5420ms sequential (5.9x speedup)',
      consistencyChecks: [
        '✓ All sections reference Southeast Asia context',
        '✓ SMB merchant focus maintained across sections',
        '✓ Timeline progression (pilot → scale → regional)',
        '✓ Quantitative data consistently formatted',
        '✓ Strategic recommendations align with constraints'
      ],
      reuseExample: {
        newProblem: 'Analyze market entry for healthtech startup in Latin America',
        sameSkeleton: 'Same 6-part framework: Market → Competition → Regulation → Customers → GTM → Risks',
        differentContent: 'Healthcare market data, telemedicine competitors, HIPAA equivalents, patient segments, clinic partnerships, medical compliance'
      }
    },
    {
      id: 'technical',
      title: 'Technical Documentation',
      icon: <BookOpen className="w-5 h-5" />,
      problem: 'Document a new authentication API for developer portal',
      context: 'Comprehensive API documentation with multiple independent sections',
      skeleton: [
        { id: 't1', title: 'Overview and authentication flow', order: 1, status: 'pending' },
        { id: 't2', title: 'Endpoint reference and parameters', order: 2, status: 'pending' },
        { id: 't3', title: 'Code examples in multiple languages', order: 3, status: 'pending' },
        { id: 't4', title: 'Error handling and status codes', order: 4, status: 'pending' },
        { id: 't5', title: 'Security best practices', order: 5, status: 'pending' },
        { id: 't6', title: 'Migration guide from v1', order: 6, status: 'pending' }
      ],
      expansions: [
        {
          pointId: 't1',
          content: [
            'OAuth 2.0 based authentication system',
            'Flow: Client credentials → Access token → API calls',
            'Token lifetime: 1 hour, refresh token: 30 days',
            'Architecture diagram showing auth flow'
          ],
          completionTime: 840
        },
        {
          pointId: 't2',
          content: [
            'POST /auth/token - Exchange credentials for token',
            'GET /auth/verify - Validate token',
            'POST /auth/refresh - Refresh expired token',
            'Parameters: client_id, client_secret, grant_type, scope'
          ],
          completionTime: 890
        },
        {
          pointId: 't3',
          content: [
            'Python: requests library with OAuth2Session',
            'JavaScript: axios with interceptors',
            'cURL: Example with header authentication',
            'Each example includes error handling'
          ],
          completionTime: 1100
        },
        {
          pointId: 't4',
          content: [
            '401 Unauthorized - Invalid or expired token',
            '403 Forbidden - Insufficient scope',
            '429 Too Many Requests - Rate limit exceeded',
            'All errors return JSON with code and message'
          ],
          completionTime: 820
        },
        {
          pointId: 't5',
          content: [
            'Store credentials in environment variables',
            'Use HTTPS for all authentication requests',
            'Implement token rotation before expiration',
            'Never log tokens or credentials'
          ],
          completionTime: 850
        },
        {
          pointId: 't6',
          content: [
            'v1 used API keys, v2 uses OAuth 2.0',
            'Breaking change: Authorization header format',
            'Migration script provided for bulk token exchange',
            'v1 deprecated January 2025, sunset June 2025'
          ],
          completionTime: 880
        }
      ],
      integratedOutput: [
        'Our authentication API uses OAuth 2.0 with client credentials flow: exchange credentials for access token, then use token for API calls.',
        'Three primary endpoints: POST /auth/token for initial auth, GET /auth/verify for validation, POST /auth/refresh for token renewal.',
        'Code examples provided for Python (requests + OAuth2Session), JavaScript (axios + interceptors), and cURL for quick testing.',
        'Error responses follow standard HTTP codes: 401 for invalid tokens, 403 for insufficient permissions, 429 for rate limits. All return structured JSON.',
        'Security best practices: store credentials in environment variables, use HTTPS exclusively, rotate tokens proactively, never log sensitive data.',
        'Migrating from v1: OAuth 2.0 replaces API keys, authorization header format changes, migration script available, v1 sunset June 2025.'
      ],
      parallelBenefit: '6 doc sections written in parallel ~1100ms vs ~5480ms sequential (5x speedup)',
      consistencyChecks: [
        '✓ All sections reference OAuth 2.0 consistently',
        '✓ Code examples use same API endpoints',
        '✓ Error codes align across sections',
        '✓ Technical terminology consistent',
        '✓ Version numbering (v1/v2) used uniformly'
      ],
      reuseExample: {
        newProblem: 'Document a new webhook subscription API',
        sameSkeleton: 'Same 6-part structure: Overview → Endpoints → Examples → Errors → Security → Migration',
        differentContent: 'Webhook flow, subscription endpoints, payload examples, delivery failures, signature verification, event type changes'
      }
    }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  useEffect(() => {
    setPhase('idle');
    setRevealedPoints(new Set());
    setExpandedPoints(new Set());
    setIntegratedSections(new Set());
  }, [selectedScenario]);

  const runDemo = async () => {
    setIsAnimating(true);
    setPhase('idle');
    setRevealedPoints(new Set());
    setExpandedPoints(new Set());
    setIntegratedSections(new Set());

    await new Promise(resolve => setTimeout(resolve, 300));

    setPhase('skeleton');
    for (let i = 0; i < currentScenario.skeleton.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setRevealedPoints(prev => new Set([...prev, currentScenario.skeleton[i].id]));
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    setPhase('parallel-expand');

    const expandPromises = currentScenario.skeleton.map(async (point, index) => {
      await new Promise(resolve => setTimeout(resolve, index * 100));
      setExpandedPoints(prev => new Set([...prev, point.id]));
    });
    await Promise.all(expandPromises);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setPhase('integration');
    for (let i = 0; i < currentScenario.integratedOutput.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setIntegratedSections(prev => new Set([...prev, i]));
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    setPhase('consistency');

    await new Promise(resolve => setTimeout(resolve, 1200));
    setPhase('reuse');

    await new Promise(resolve => setTimeout(resolve, 800));
    setPhase('complete');
    setIsAnimating(false);
  };

  const reset = () => {
    setPhase('idle');
    setRevealedPoints(new Set());
    setExpandedPoints(new Set());
    setIntegratedSections(new Set());
  };

  const getPhaseStyle = (currentPhase: Phase, targetPhase: Phase) => {
    if (phase === targetPhase) return 'border-blue-500 bg-blue-500/10';
    if (phases.indexOf(phase) > phases.indexOf(targetPhase)) return 'border-green-500 bg-green-500/10';
    return 'border-slate-600 bg-slate-800/50';
  };

  const phases: Phase[] = ['idle', 'skeleton', 'parallel-expand', 'integration', 'consistency', 'reuse', 'complete'];

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Layout className="w-8 h-8 text-orange-400" />
          Skeleton of Thoughts (SoT)
        </h2>
        <div className="flex gap-2">
          <button
            onClick={runDemo}
            disabled={isAnimating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <PlayCircle className="w-4 h-4" />
            Run Demo
          </button>
          <button
            onClick={reset}
            disabled={isAnimating}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {scenarios.map(scenario => (
          <button
            key={scenario.id}
            onClick={() => setSelectedScenario(scenario.id)}
            disabled={isAnimating}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              selectedScenario === scenario.id
                ? 'bg-orange-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {scenario.icon}
            {scenario.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-2 mb-6">
        {[
          { phase: 'skeleton', label: 'Skeleton', icon: '🦴' },
          { phase: 'parallel-expand', label: 'Parallel', icon: '⚡' },
          { phase: 'integration', label: 'Integrate', icon: '🔗' },
          { phase: 'consistency', label: 'Check', icon: '✓' },
          { phase: 'reuse', label: 'Reuse', icon: '🔄' },
          { phase: 'complete', label: 'Done', icon: '✅' }
        ].map(({ phase: p, label, icon }) => (
          <div
            key={p}
            className={`p-3 rounded-lg border-2 text-center transition-all ${getPhaseStyle(phase, p as Phase)}`}
          >
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-xs text-slate-300 font-medium">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/50 border border-blue-500/30 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Problem</h3>
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="font-semibold text-white mb-2">{currentScenario.problem}</div>
          <div className="text-sm text-slate-300">{currentScenario.context}</div>
        </div>
      </div>

      {(phase === 'skeleton' || phases.indexOf(phase) > phases.indexOf('skeleton')) && (
        <div className="bg-slate-900/50 border border-orange-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Layout className="w-5 h-5 text-orange-400" />
            Step 1: Create Skeleton Structure
          </h3>
          <div className="space-y-2">
            {currentScenario.skeleton.map((point, index) => (
              <div
                key={point.id}
                className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                  revealedPoints.has(point.id)
                    ? 'border-orange-500 bg-orange-500/10 opacity-100'
                    : 'border-slate-700 bg-slate-800/50 opacity-30'
                }`}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
                  {point.order}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{point.title}</div>
                </div>
                {revealedPoints.has(point.id) && (
                  <div className="text-xs text-orange-400 font-semibold">READY</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {(phase === 'parallel-expand' || phases.indexOf(phase) > phases.indexOf('parallel-expand')) && (
        <div className="bg-slate-900/50 border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-400" />
            Step 2: Parallel Expansion (All Points Simultaneously)
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {currentScenario.skeleton.map(point => {
              const expansion = currentScenario.expansions.find(e => e.pointId === point.id);
              return (
                <div
                  key={point.id}
                  className={`rounded-lg border-2 p-4 transition-all ${
                    expandedPoints.has(point.id)
                      ? 'border-purple-500 bg-purple-500/10 opacity-100'
                      : 'border-slate-700 bg-slate-800/50 opacity-30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                      {point.order}
                    </div>
                    <div className="font-semibold text-white text-sm">{point.title}</div>
                  </div>
                  {expansion && expandedPoints.has(point.id) && (
                    <>
                      <div className="space-y-1 mb-3">
                        {expansion.content.map((line, idx) => (
                          <div key={idx} className="text-xs text-slate-300 flex items-start gap-1">
                            <span className="text-purple-400">•</span>
                            <span>{line}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-purple-400">
                        ⚡ Expanded in {expansion.completionTime}ms
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          {expandedPoints.size === currentScenario.skeleton.length && (
            <div className="mt-4 bg-green-900/20 border border-green-500/30 rounded-lg p-3 text-center">
              <div className="text-green-400 font-semibold text-sm">
                ⚡ {currentScenario.parallelBenefit}
              </div>
            </div>
          )}
        </div>
      )}

      {(phase === 'integration' || phases.indexOf(phase) > phases.indexOf('integration')) && (
        <div className="bg-slate-900/50 border border-cyan-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Step 3: Integration (Combine into Coherent Whole)
          </h3>
          <div className="space-y-3">
            {currentScenario.integratedOutput.map((section, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  integratedSections.has(index)
                    ? 'border-cyan-500 bg-cyan-500/10 opacity-100'
                    : 'border-slate-700 bg-slate-800/50 opacity-30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded bg-cyan-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <div className="flex-1 text-slate-200 text-sm leading-relaxed">{section}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(phase === 'consistency' || phases.indexOf(phase) > phases.indexOf('consistency')) && (
        <div className="bg-slate-900/50 border border-green-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">✓</span>
            Step 4: Consistency Validation
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {currentScenario.consistencyChecks.map((check, index) => (
              <div
                key={index}
                className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 text-sm text-green-300"
              >
                {check}
              </div>
            ))}
          </div>
        </div>
      )}

      {(phase === 'reuse' || phase === 'complete') && (
        <div className="bg-slate-900/50 border border-yellow-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🔄</span>
            Step 5: Skeleton Reuse (Same Structure, Different Content)
          </h3>
          <div className="space-y-4">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-1">New Problem:</div>
              <div className="text-white font-semibold">{currentScenario.reuseExample.newProblem}</div>
            </div>
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-1">Reuse Same Skeleton:</div>
              <div className="text-white">{currentScenario.reuseExample.sameSkeleton}</div>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-1">Fill with Different Content:</div>
              <div className="text-white">{currentScenario.reuseExample.differentContent}</div>
            </div>
            <div className="text-sm text-yellow-300 italic text-center mt-3">
              ⚡ Same logical structure accelerates reasoning across different problems
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-semibold text-orange-400">1. Skeleton Creation</div>
            <div className="text-slate-300">
              Identify key components and create high-level structure with logical ordering
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-purple-400">2. Parallel Expansion</div>
            <div className="text-slate-300">
              Develop each skeleton point independently and simultaneously for speed
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-cyan-400">3. Integration</div>
            <div className="text-slate-300">
              Combine expanded sections into coherent whole with smooth transitions
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-green-400">4. Consistency Check</div>
            <div className="text-slate-300">
              Validate logical flow, terminology, and coherence across all sections
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-yellow-400">5. Skeleton Reuse</div>
            <div className="text-slate-300">
              Apply same structure to different problems, maintaining consistency
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-blue-400">6. Iterative Refinement</div>
            <div className="text-slate-300">
              Improve skeleton structure based on usage patterns and feedback
            </div>
          </div>
        </div>
      </div>

      {phase === 'complete' && (
        <div className="bg-gradient-to-r from-orange-900/30 to-purple-900/30 border border-orange-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Key Insight
          </h3>
          <p className="text-slate-300">
            Skeleton of Thoughts provides <span className="text-orange-400 font-semibold">structure without rigidity</span>.
            By creating a logical framework first and expanding points in parallel, it achieves{' '}
            <span className="text-purple-400 font-semibold">5-6x speedup</span> while maintaining{' '}
            <span className="text-cyan-400 font-semibold">consistency and coherence</span>. The skeleton becomes a{' '}
            <span className="text-yellow-400 font-semibold">reusable template</span> that adapts to different content
            while ensuring thorough, structured reasoning.
          </p>
        </div>
      )}
    </div>
  );
}