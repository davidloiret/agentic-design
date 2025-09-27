'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Brain, AlertCircle, CheckCircle, Info, TrendingUp, Activity, Eye, Gauge, AlertTriangle, Shield } from 'lucide-react';

interface ReasoningStep {
  id: string;
  content: string;
  confidence: number;
  uncertainty: 'low' | 'medium' | 'high';
  selfAssessment: string;
  correction?: string;
}

interface MetacognitiveState {
  overallConfidence: number;
  knowledgeGaps: string[];
  reasoningQuality: number;
  calibration: 'underconfident' | 'wellcalibrated' | 'overconfident';
}

export default function MCMDemo() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [reasoningSteps, setReasoningSteps] = useState<ReasoningStep[]>([]);
  const [metacognitiveState, setMetacognitiveState] = useState<MetacognitiveState>({
    overallConfidence: 0.5,
    knowledgeGaps: [],
    reasoningQuality: 0.5,
    calibration: 'wellcalibrated'
  });
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const questions = [
    {
      id: 'physics',
      question: 'Why does the moon appear larger near the horizon?',
      difficulty: 'medium',
      requiresSpecialized: false
    },
    {
      id: 'medical',
      question: 'What are the effects of CRISPR-Cas9 on off-target mutations?',
      difficulty: 'hard',
      requiresSpecialized: true
    },
    {
      id: 'math',
      question: 'What is the sum of all prime numbers less than 10?',
      difficulty: 'easy',
      requiresSpecialized: false
    }
  ];

  const generateReasoningWithMetacognition = (questionId: string): ReasoningStep[] => {
    switch (questionId) {
      case 'physics':
        return [
          {
            id: '1',
            content: 'The moon appears larger near the horizon - this is called the moon illusion.',
            confidence: 0.85,
            uncertainty: 'low',
            selfAssessment: 'I\'m confident about this phenomenon name.'
          },
          {
            id: '2',
            content: 'It\'s not actually physically larger - the angular size remains constant.',
            confidence: 0.95,
            uncertainty: 'low',
            selfAssessment: 'This is a well-established fact I\'m certain about.'
          },
          {
            id: '3',
            content: 'The effect might be due to relative size comparison with earthly objects.',
            confidence: 0.6,
            uncertainty: 'medium',
            selfAssessment: 'I\'m less certain about the exact mechanism - multiple theories exist.',
            correction: 'Actually, the Ponzo illusion and perceived distance theories are both debated.'
          },
          {
            id: '4',
            content: 'Atmospheric refraction could play a minor role but isn\'t the main cause.',
            confidence: 0.7,
            uncertainty: 'medium',
            selfAssessment: 'I should verify this - my understanding might be incomplete.'
          }
        ];

      case 'medical':
        return [
          {
            id: '1',
            content: 'CRISPR-Cas9 can cause off-target mutations when guide RNA binds to similar sequences.',
            confidence: 0.75,
            uncertainty: 'medium',
            selfAssessment: 'I have general knowledge but lack recent research updates.'
          },
          {
            id: '2',
            content: 'Off-target effects depend on guide RNA design and specificity.',
            confidence: 0.65,
            uncertainty: 'high',
            selfAssessment: 'This is specialized knowledge - I\'m not fully confident without recent papers.'
          },
          {
            id: '3',
            content: 'Detection methods include whole-genome sequencing and GUIDE-seq.',
            confidence: 0.4,
            uncertainty: 'high',
            selfAssessment: 'I recognize I\'m reaching the limits of my reliable knowledge here.',
            correction: 'I should not speculate on specific detection methods without verification.'
          },
          {
            id: '4',
            content: 'Recent improvements like prime editing reduce off-target effects.',
            confidence: 0.3,
            uncertainty: 'high',
            selfAssessment: 'This requires up-to-date research I may not have. High uncertainty.'
          }
        ];

      case 'math':
        return [
          {
            id: '1',
            content: 'Prime numbers less than 10 are: 2, 3, 5, 7.',
            confidence: 1.0,
            uncertainty: 'low',
            selfAssessment: 'This is basic mathematics I\'m completely certain about.'
          },
          {
            id: '2',
            content: '2 + 3 + 5 + 7 = 17',
            confidence: 1.0,
            uncertainty: 'low',
            selfAssessment: 'Simple arithmetic - no uncertainty here.'
          }
        ];

      default:
        return [];
    }
  };

  const calculateMetacognitiveState = (steps: ReasoningStep[]): MetacognitiveState => {
    const avgConfidence = steps.reduce((sum, s) => sum + s.confidence, 0) / steps.length;
    const gaps: string[] = [];

    steps.forEach(step => {
      if (step.uncertainty === 'high') {
        gaps.push(`Step ${step.id}: ${step.selfAssessment}`);
      }
    });

    const quality = steps.filter(s => s.confidence > 0.7).length / steps.length;

    let calibration: 'underconfident' | 'wellcalibrated' | 'overconfident' = 'wellcalibrated';
    if (avgConfidence < 0.4) calibration = 'underconfident';
    else if (avgConfidence > 0.85 && gaps.length > 0) calibration = 'overconfident';

    return {
      overallConfidence: avgConfidence,
      knowledgeGaps: gaps,
      reasoningQuality: quality,
      calibration
    };
  };

  const drawConfidenceGauge = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 300;
    const height = 220;  // Increased height to fit calibration text

    // Set canvas size with DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw gauge arc
    const centerX = width / 2;
    const centerY = height - 50;  // Adjusted to center better in larger canvas
    const radius = 80;

    // Background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 20;
    ctx.stroke();

    // Confidence arc
    const confidence = metacognitiveState.overallConfidence;
    const angle = Math.PI + (confidence * Math.PI);

    const gradient = ctx.createLinearGradient(centerX - radius, 0, centerX + radius, 0);
    gradient.addColorStop(0, '#ef4444');
    gradient.addColorStop(0.5, '#f59e0b');
    gradient.addColorStop(1, '#10b981');

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, angle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 20;
    ctx.stroke();

    // Draw needle using direct calculation (no rotation transform)
    const needleLength = radius - 25;

    // Calculate needle end point using trigonometry
    // angle goes from PI (left) to 2*PI (right)
    // We need to point TO that position on the arc
    const needleEndX = centerX + Math.cos(angle) * needleLength;
    const needleEndY = centerY + Math.sin(angle) * needleLength;

    // Needle shadow
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(needleEndX, needleEndY);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Main needle
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(needleEndX, needleEndY);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Arrow tip at the end of needle
    const arrowSize = 8;
    const arrowAngle = angle + Math.PI; // Point back toward center

    ctx.save();
    ctx.translate(needleEndX, needleEndY);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(5, -3);
    ctx.lineTo(5, 3);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.restore();

    // Center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e293b';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Labels
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.fillText('0%', centerX - radius - 15, centerY + 5);
    ctx.fillText('50%', centerX, centerY - radius - 25);
    ctx.fillText('100%', centerX + radius + 15, centerY + 5);

    // Confidence percentage
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(confidence * 100)}%`, centerX, centerY - 15);

    // Calibration label - positioned at bottom of canvas
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle =
      metacognitiveState.calibration === 'overconfident' ? '#ef4444' :
      metacognitiveState.calibration === 'underconfident' ? '#f59e0b' : '#10b981';

    // Format the calibration text properly
    const calibrationText = metacognitiveState.calibration === 'wellcalibrated'
      ? 'Well Calibrated'
      : metacognitiveState.calibration.charAt(0).toUpperCase() + metacognitiveState.calibration.slice(1);

    // Position text at bottom of canvas with proper spacing
    ctx.fillText(calibrationText, centerX, height - 10);
  };

  useEffect(() => {
    drawConfidenceGauge();
  }, [metacognitiveState]);

  // Draw gauge on mount
  useEffect(() => {
    // Small delay to ensure canvas is mounted
    const timer = setTimeout(() => {
      drawConfidenceGauge();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const runMetacognitiveMonitoring = async () => {
    setIsMonitoring(true);
    setShowAnalysis(false);
    setReasoningSteps([]);

    // Reset metacognitive state to initial values
    setMetacognitiveState({
      overallConfidence: 0.5,
      knowledgeGaps: [],
      reasoningQuality: 0.5,
      calibration: 'wellcalibrated'
    });

    const q = questions[currentQuestion];
    const steps = generateReasoningWithMetacognition(q.id);

    // Simulate step-by-step reasoning with monitoring
    for (let i = 0; i < steps.length; i++) {
      setReasoningSteps(prev => [...prev, steps[i]]);

      // Update metacognitive state progressively
      const currentSteps = steps.slice(0, i + 1);
      setMetacognitiveState(calculateMetacognitiveState(currentSteps));

      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    setShowAnalysis(true);
    setIsMonitoring(false);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400';
    if (confidence >= 0.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getUncertaintyIcon = (uncertainty: string) => {
    switch (uncertainty) {
      case 'low':
        return <Shield className="w-4 h-4 text-green-400" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">Metacognitive Monitoring (MCM)</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Self-awareness and monitoring of reasoning quality and confidence.
          The AI evaluates its own knowledge limitations and uncertainty.
        </p>
      </div>

      {/* Question Selector */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Select Question</h3>
        <div className="space-y-3">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                setCurrentQuestion(idx);
                setReasoningSteps([]);
                setShowAnalysis(false);
              }}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                currentQuestion === idx
                  ? 'bg-blue-900/30 border border-blue-700'
                  : 'bg-slate-800/50 border border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-white">{q.question}</p>
                <span className={`text-xs px-2 py-1 rounded ${
                  q.difficulty === 'easy' ? 'bg-green-900/30 text-green-300' :
                  q.difficulty === 'medium' ? 'bg-yellow-900/30 text-yellow-300' :
                  'bg-red-900/30 text-red-300'
                }`}>
                  {q.difficulty}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Metacognitive Dashboard */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Confidence Gauge */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <Gauge className="w-5 h-5 text-purple-400" />
            Confidence Monitor
          </h3>
          <div className="flex justify-center">
            <canvas ref={canvasRef} />
          </div>
        </div>

        {/* Metacognitive Metrics */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <Activity className="w-5 h-5 text-blue-400" />
            Metacognitive Metrics
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-400">Reasoning Quality</span>
                <span className="text-sm text-white">
                  {Math.round(metacognitiveState.reasoningQuality * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${metacognitiveState.reasoningQuality * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-400">Knowledge Gaps Identified</span>
                <span className="text-sm text-white">
                  {metacognitiveState.knowledgeGaps.length}
                </span>
              </div>
              {metacognitiveState.knowledgeGaps.length > 0 && (
                <div className="mt-2 space-y-1">
                  {metacognitiveState.knowledgeGaps.slice(0, 2).map((gap, idx) => (
                    <div key={idx} className="text-xs text-red-300 bg-red-900/20 rounded px-2 py-1">
                      {gap.substring(0, 50)}...
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Calibration Status</span>
                <span className={`text-sm font-medium ${
                  metacognitiveState.calibration === 'wellcalibrated' ? 'text-green-400' :
                  metacognitiveState.calibration === 'overconfident' ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {metacognitiveState.calibration === 'wellcalibrated' ? 'Well Calibrated' :
                   metacognitiveState.calibration === 'overconfident' ? 'Overconfident' :
                   'Underconfident'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reasoning Steps with Self-Assessment */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Eye className="w-5 h-5 text-green-400" />
          Reasoning with Metacognitive Monitoring
        </h3>
        <div className="space-y-3">
          {reasoningSteps.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              Click "Run Metacognitive Monitoring" to see self-aware reasoning
            </div>
          ) : (
            reasoningSteps.map((step, idx) => (
              <div
                key={step.id}
                className={`border rounded-lg p-4 transition-all ${
                  step.uncertainty === 'high' ? 'bg-red-900/10 border-red-800/30' :
                  step.uncertainty === 'medium' ? 'bg-yellow-900/10 border-yellow-800/30' :
                  'bg-green-900/10 border-green-800/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-slate-500">#{idx + 1}</span>
                    {getUncertaintyIcon(step.uncertainty)}
                  </div>
                  <div className="flex-1">
                    <p className="text-white mb-2">{step.content}</p>

                    <div className="flex items-center gap-4 mb-2">
                      <span className={`text-sm font-medium ${getConfidenceColor(step.confidence)}`}>
                        Confidence: {Math.round(step.confidence * 100)}%
                      </span>
                      <span className="text-xs text-slate-500">
                        Uncertainty: {step.uncertainty}
                      </span>
                    </div>

                    <div className="bg-slate-800/50 rounded p-2">
                      <p className="text-xs text-blue-300 italic">
                        💭 Self-Assessment: "{step.selfAssessment}"
                      </p>
                    </div>

                    {step.correction && (
                      <div className="mt-2 bg-yellow-900/20 border border-yellow-800/30 rounded p-2">
                        <p className="text-xs text-yellow-300">
                          ⚠️ Self-Correction: {step.correction}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Control Button */}
      <div className="flex justify-center">
        <button
          onClick={runMetacognitiveMonitoring}
          disabled={isMonitoring}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-2">
            {isMonitoring ? (
              <>
                <Brain className="w-5 h-5 animate-pulse" />
                Monitoring Reasoning...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                Run Metacognitive Monitoring
              </>
            )}
          </span>
        </button>
      </div>

      {/* Analysis Results */}
      {showAnalysis && (
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Metacognitive Analysis
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">Strengths Identified</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Accurate self-assessment of knowledge boundaries
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Appropriate confidence calibration for familiar topics
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Recognition of uncertainty in specialized domains
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {metacognitiveState.knowledgeGaps.length > 0 ? (
                  <>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      Knowledge gaps in specialized domains detected
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      Could benefit from external verification for high-uncertainty areas
                    </li>
                  </>
                ) : (
                  <li className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    No significant knowledge gaps detected for this query
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Key Concepts */}
      <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-300">
          <Brain className="w-5 h-5" />
          Key Metacognitive Capabilities
        </h3>
        <ul className="text-sm text-blue-200 space-y-2">
          <li>• <strong>Self-Assessment:</strong> Evaluating own reasoning quality and identifying weaknesses</li>
          <li>• <strong>Uncertainty Quantification:</strong> Expressing confidence levels and knowledge boundaries</li>
          <li>• <strong>Calibration:</strong> Aligning confidence with actual accuracy</li>
          <li>• <strong>Knowledge Gap Detection:</strong> Recognizing when information is incomplete or outdated</li>
          <li>• <strong>Self-Correction:</strong> Adjusting reasoning when detecting potential errors</li>
        </ul>
      </div>
    </div>
  );
}