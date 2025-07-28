import React, { useState, useEffect } from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring,
  Easing
} from 'remotion';
import { CheckCircle, Lightbulb, AlertTriangle, Target, Code, Zap, ArrowRight, Brain, Link, Loader, XCircle, ChevronRight, Sparkles } from 'lucide-react';
import DynamicTimingService from '../services/DynamicTimingService';
import { 
  AudioNarrationSequence, 
  NarrationOverlay,
  VideoBackground,
  Watermark
} from '../components/VideoComponents';
import {
  AdvancedProgressBrain,
  KineticText,
  DataFlowChain,
  AnimatedCodeBlock
} from '../components/AdvancedMotionComponents';
import {
  SceneTransition,
  MorphingBackground,
  CinematicContainer,
  AttentionHighlight
} from '../components/SceneTransitions';

interface NarrationSegment {
  id: string;
  text: string;
  startFrame: number;
  endFrame: number;
  filename: string;
  audioPath?: string;
  highlight?: boolean;
  duration: number;
  durationFrames: number;
}

// The PROBLEM visualization - showing why we need sequential chaining
const ProblemVisualization: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  if (frame < delay || frame > delay + duration) return null;
  
  const progress = (frame - delay) / duration;
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      padding: '40px',
    }}>
      <KineticText
        text="The Problem: One Giant Prompt"
        delay={delay}
        duration={60}
        animationType="reveal"
        style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#ef4444',
          textAlign: 'center',
          marginBottom: '20px'
        }}
      />
      
      {/* Show a massive, overwhelming prompt */}
      <div style={{
        padding: '30px',
        background: 'rgba(239, 68, 68, 0.1)',
        border: '2px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '16px',
        transform: `scale(${interpolate(progress, [0, 0.3], [0.9, 1], { 
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.quad)
        })})`,
        opacity: interpolate(progress, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' })
      }}>
        <pre style={{
          color: '#fca5a5',
          fontSize: '16px',
          fontFamily: 'JetBrains Mono, monospace',
          lineHeight: '1.8',
          margin: 0,
          whiteSpace: 'pre-wrap'
        }}>
{`"Write a comprehensive product review for the Sony WH-1000XM5 headphones. 
Research all technical specifications, features, and capabilities. 
Compare with Bose QuietComfort 45, Apple AirPods Max, and Sennheiser Momentum 4. 
Analyze sound quality, noise cancellation, comfort, battery life, and value. 
Include pros and cons, detailed testing scenarios, and final recommendations. 
Make it engaging, professional, and at least 2000 words."`}
        </pre>
      </div>
      
      {/* Problems appearing one by one */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginTop: '20px'
      }}>
        {[
          { text: "Too many instructions", icon: <AlertTriangle size={20} />, delay: 60 },
          { text: "Hard to debug failures", icon: <XCircle size={20} />, delay: 90 },
          { text: "Inconsistent quality", icon: <Loader size={20} />, delay: 120 },
          { text: "All or nothing output", icon: <AlertTriangle size={20} />, delay: 150 }
        ].map((problem, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              opacity: interpolate(
                frame, 
                [delay + problem.delay, delay + problem.delay + 30], 
                [0, 1], 
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
              transform: `translateY(${interpolate(
                frame,
                [delay + problem.delay, delay + problem.delay + 30],
                [20, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              )}px)`
            }}
          >
            <div style={{ color: '#ef4444' }}>{problem.icon}</div>
            <span style={{ color: '#f87171', fontSize: '16px', fontWeight: '500' }}>
              {problem.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// The SOLUTION visualization - showing sequential chaining in action
const SolutionVisualization: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  if (frame < delay || frame > delay + duration) return null;
  
  const progress = (frame - delay) / duration;
  
  // Define the chain steps with actual data flow
  const steps = [
    {
      title: "Step 1: Research",
      prompt: "Research Sony WH-1000XM5 specs",
      output: "40mm drivers, LDAC, 30hr battery...",
      color: '#3b82f6',
      icon: <Target size={20} color="white" />
    },
    {
      title: "Step 2: Compare",
      prompt: "Compare with competitors using:",
      output: "Better NC than Bose, lighter than Apple...",
      color: '#8b5cf6',
      icon: <Brain size={20} color="white" />
    },
    {
      title: "Step 3: Draft",
      prompt: "Write review based on:",
      output: "The Sony WH-1000XM5 represents...",
      color: '#10b981',
      icon: <Code size={20} color="white" />
    },
    {
      title: "Step 4: Polish",
      prompt: "Edit and improve:",
      output: "★★★★★ Professional Review",
      color: '#f59e0b',
      icon: <Sparkles size={20} color="white" />
    }
  ];
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
      padding: '40px',
    }}>
      <KineticText
        text="The Solution: Sequential Chaining"
        delay={delay}
        duration={60}
        animationType="reveal"
        style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#10b981',
          textAlign: 'center',
          marginBottom: '20px'
        }}
      />
      
      {/* Animated chain showing data flow */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        position: 'relative',
      }}>
        {steps.map((step, index) => {
          const stepDelay = index * 80;
          const stepProgress = Math.max(0, Math.min(1, (frame - delay - stepDelay) / 120));
          const isActive = frame > delay + stepDelay;
          
          return (
            <div key={index} style={{ position: 'relative' }}>
              {/* Connection line to next step */}
              {index < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: '40px',
                  top: '100%',
                  width: '2px',
                  height: '24px',
                  background: isActive ? step.color : 'rgba(100, 116, 139, 0.3)',
                  opacity: interpolate(
                    frame,
                    [delay + stepDelay + 60, delay + stepDelay + 90],
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  )
                }} />
              )}
              
              <div style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
                opacity: stepProgress,
                transform: `translateX(${interpolate(stepProgress, [0, 1], [-50, 0])}px)`,
              }}>
                {/* Step number with icon */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: isActive 
                    ? `linear-gradient(135deg, ${step.color}, ${step.color}CC)`
                    : 'rgba(100, 116, 139, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: isActive ? `0 8px 24px ${step.color}40` : 'none',
                  transform: `scale(${spring({
                    frame: frame - delay - stepDelay,
                    fps,
                    config: { damping: 10, stiffness: 100 }
                  })})`,
                }}>
                  {step.icon}
                </div>
                
                {/* Step content */}
                <div style={{ 
                  flex: 1,
                  padding: '20px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  borderRadius: '16px',
                  border: `2px solid ${isActive ? step.color + '40' : 'rgba(100, 116, 139, 0.2)'}`,
                }}>
                  <h3 style={{
                    color: isActive ? step.color : '#64748b',
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '12px'
                  }}>
                    {step.title}
                  </h3>
                  
                  {/* Input prompt */}
                  <div style={{
                    padding: '12px',
                    background: 'rgba(30, 41, 59, 0.5)',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    opacity: interpolate(
                      frame,
                      [delay + stepDelay + 30, delay + stepDelay + 60],
                      [0, 1],
                      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    )
                  }}>
                    <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>PROMPT:</span>
                    <pre style={{
                      color: '#e2e8f0',
                      fontSize: '14px',
                      margin: '4px 0 0 0',
                      fontFamily: 'JetBrains Mono, monospace',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {step.prompt} {index > 0 && <span style={{ color: step.color }}>← previous output</span>}
                    </pre>
                  </div>
                  
                  {/* Animated output */}
                  <div style={{
                    padding: '12px',
                    background: `linear-gradient(135deg, ${step.color}15, ${step.color}08)`,
                    borderRadius: '8px',
                    border: `1px solid ${step.color}30`,
                    opacity: interpolate(
                      frame,
                      [delay + stepDelay + 60, delay + stepDelay + 90],
                      [0, 1],
                      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    ),
                    transform: `translateY(${interpolate(
                      frame,
                      [delay + stepDelay + 60, delay + stepDelay + 90],
                      [10, 0],
                      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    )}px)`
                  }}>
                    <span style={{ color: step.color, fontSize: '14px', fontWeight: '500' }}>OUTPUT:</span>
                    <p style={{
                      color: '#e2e8f0',
                      fontSize: '14px',
                      margin: '4px 0 0 0',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}>
                      {step.output}
                    </p>
                  </div>
                </div>
                
                {/* Data flow arrow */}
                {index < steps.length - 1 && (
                  <ChevronRight 
                    size={24} 
                    color={step.color}
                    style={{
                      position: 'absolute',
                      right: '-40px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      opacity: interpolate(
                        frame,
                        [delay + stepDelay + 90, delay + stepDelay + 120],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                      )
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Real-world example with actual code
const RealWorldExample: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
  const frame = useCurrentFrame();
  
  if (frame < delay || frame > delay + duration) return null;
  
  return (
    <div style={{
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
      <KineticText
        text="Real Implementation"
        delay={delay}
        duration={60}
        animationType="wave"
        style={{
          fontSize: '32px',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}
      />
      
      <AnimatedCodeBlock
        code={`// Sequential Chaining in Action
const generateProductReview = async (product: string) => {
  // Step 1: Research - Get the facts
  const research = await llm.generate({
    prompt: \`Research technical specifications for \${product}\`,
    maxTokens: 500,
    temperature: 0.3 // Low temp for factual accuracy
  });
  
  // Step 2: Compare - Use research output as context
  const comparison = await llm.generate({
    prompt: \`Given these specs: \${research}
    Compare with main competitors, focusing on key differences\`,
    maxTokens: 600,
    temperature: 0.5
  });
  
  // Step 3: Draft - Build on previous outputs
  const draft = await llm.generate({
    prompt: \`Write a product review for \${product}
    Technical details: \${research}
    Competitive analysis: \${comparison}
    Make it engaging and comprehensive\`,
    maxTokens: 1000,
    temperature: 0.7 // Higher temp for creativity
  });
  
  // Step 4: Polish - Refine the final output
  const finalReview = await llm.generate({
    prompt: \`Edit and improve this review: \${draft}
    - Fix any errors
    - Improve flow and readability
    - Add a compelling conclusion\`,
    maxTokens: 1200,
    temperature: 0.4
  });
  
  return {
    review: finalReview,
    metadata: { research, comparison, draft } // Full transparency!
  };
};`}
        delay={delay + 80}
        duration={duration - 80}
        language="typescript"
      />
    </div>
  );
};

// Benefits comparison - Before vs After
const BenefitsComparison: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
  const frame = useCurrentFrame();
  
  if (frame < delay || frame > delay + duration) return null;
  
  const benefits = [
    {
      problem: "One massive, complex prompt",
      solution: "Focused, specialized prompts",
      icon: <Target size={24} />
    },
    {
      problem: "Black box - no visibility",
      solution: "Transparent - see every step",
      icon: <Brain size={24} />
    },
    {
      problem: "All-or-nothing results",
      solution: "Incremental, debuggable output",
      icon: <CheckCircle size={24} />
    },
    {
      problem: "Hard to iterate and improve",
      solution: "Easy to optimize each step",
      icon: <Zap size={24} />
    }
  ];
  
  return (
    <div style={{ padding: '40px' }}>
      <KineticText
        text="Why Sequential Chaining Wins"
        delay={delay}
        duration={60}
        animationType="reveal"
        style={{
          fontSize: '32px',
          fontWeight: '700',
          color: 'white',
          textAlign: 'center',
          marginBottom: '40px'
        }}
      />
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '32px'
      }}>
        {benefits.map((benefit, index) => {
          const itemDelay = delay + 80 + index * 60;
          const itemProgress = interpolate(
            frame,
            [itemDelay, itemDelay + 40],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          
          return (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '20px',
                alignItems: 'center',
                opacity: itemProgress,
                transform: `translateY(${interpolate(itemProgress, [0, 1], [30, 0])}px)`
              }}
            >
              {/* Problem side */}
              <div style={{
                padding: '20px',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '12px',
                border: '2px solid rgba(239, 68, 68, 0.3)',
                textAlign: 'center'
              }}>
                <XCircle size={32} color="#ef4444" style={{ marginBottom: '8px' }} />
                <p style={{
                  color: '#fca5a5',
                  fontSize: '16px',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  {benefit.problem}
                </p>
              </div>
              
              {/* Arrow */}
              <ArrowRight size={32} color="#64748b" />
              
              {/* Solution side */}
              <div style={{
                padding: '20px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '12px',
                border: '2px solid rgba(16, 185, 129, 0.3)',
                textAlign: 'center',
                transform: `scale(${spring({
                  frame: frame - itemDelay - 20,
                  fps: 30,
                  config: { damping: 10, stiffness: 100 }
                })})`
              }}>
                <div style={{ color: '#10b981', marginBottom: '8px' }}>{benefit.icon}</div>
                <p style={{
                  color: '#86efac',
                  fontSize: '16px',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  {benefit.solution}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SequentialChainingVideoWithAudio: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // State for dynamic timing
  const [narrationSegments, setNarrationSegments] = useState<NarrationSegment[]>([]);
  const [visualTiming, setVisualTiming] = useState<any>(null);
  const [isTimingLoaded, setIsTimingLoaded] = useState(false);
  
  // Load dynamic timing configuration
  useEffect(() => {
    const loadTiming = async () => {
      try {
        const timingService = DynamicTimingService.getInstance();
        await timingService.loadTimingConfig('/audio/sequential-chaining/');
        
        const segments = timingService.getNarrationSegments();
        
        if (segments) {
          setNarrationSegments(segments.map(seg => ({
            ...seg,
            highlight: seg.id === 'intro' || seg.id === 'conclusion'
          })));
        }
      } catch (error) {
        console.warn('Using fallback timing for sequential chaining:', error);
        // Fallback timing if dynamic loading fails
        setNarrationSegments([
          { 
            id: 'intro', 
            text: 'Sequential chaining breaks complex tasks into manageable steps - each building on the previous output for superior results.', 
            startFrame: 60, 
            endFrame: 300, 
            filename: 'seq-intro.wav', 
            duration: 8, 
            durationFrames: 240,
            highlight: true
          },
          { 
            id: 'concept', 
            text: 'Instead of one massive prompt, sequential chains create a pipeline where each AI call specializes in one specific task.', 
            startFrame: 400, 
            endFrame: 640, 
            filename: 'seq-concept.wav', 
            duration: 8, 
            durationFrames: 240,
            highlight: false
          },
          { 
            id: 'implementation', 
            text: 'Implementation is straightforward - pass the output of each chain as input to the next, creating a data pipeline.', 
            startFrame: 700, 
            endFrame: 940, 
            filename: 'seq-implementation.wav', 
            duration: 8, 
            durationFrames: 240,
            highlight: false
          },
          { 
            id: 'comparison', 
            text: 'Compare this to traditional single prompts - sequential chaining gives you control, transparency, and higher quality.', 
            startFrame: 1000, 
            endFrame: 1240, 
            filename: 'seq-comparison.wav', 
            duration: 8, 
            durationFrames: 240,
            highlight: false
          },
          { 
            id: 'benefits', 
            text: 'Each chain can be optimized independently, debugged easily, and replaced without affecting the entire pipeline.', 
            startFrame: 1300, 
            endFrame: 1540, 
            filename: 'seq-benefits.wav', 
            duration: 8, 
            durationFrames: 240,
            highlight: false
          },
          { 
            id: 'conclusion', 
            text: 'Sequential chaining transforms complex AI tasks into manageable, transparent, and highly reliable workflows.', 
            startFrame: 1600, 
            endFrame: 1840, 
            filename: 'seq-conclusion.wav', 
            duration: 8, 
            durationFrames: 240,
            highlight: true
          }
        ]);
      } finally {
        setIsTimingLoaded(true);
      }
    };
    
    loadTiming();
  }, []);
  
  // Brain progress animation
  const videoProgress = isTimingLoaded && narrationSegments.length > 0 
    ? interpolate(frame, [0, 1900], [0, 1], { extrapolateRight: 'clamp' })
    : interpolate(frame, [0, 900], [0, 1], { extrapolateRight: 'clamp' });
  
  const brainProgress = Math.max(0.2, videoProgress * 0.8 + 0.2);
  
  return (
    <AbsoluteFill style={{ 
      fontFamily: 'Inter, system-ui, sans-serif',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    }}>
      {/* TTS Audio Narration */}
      {narrationSegments.map((segment, index) => (
        <AudioNarrationSequence key={`audio-${index}`} segment={segment} audioPath="/audio/sequential-chaining/" />
      ))}
      
      {/* Visual Narration Overlays as backup */}
      {narrationSegments.map((segment, index) => (
        <NarrationOverlay key={`text-${index}`} segment={segment} />
      ))}
      
      <VideoBackground />
      <Watermark brainProgress={brainProgress} />
      
      {/* Title header - always visible */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '80px',
        right: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}>
        <AdvancedProgressBrain
          size={56}
          progress={brainProgress}
          delay={0}
          style={{ marginRight: '20px' }}
        />
        <div>
          <KineticText
            text="Sequential Chaining"
            delay={15}
            duration={90}
            animationType="wave"
            style={{
              fontSize: '42px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.025em',
            }}
          />
          <KineticText
            text="Transform Complex Prompts into Reliable Pipelines"
            delay={45}
            duration={90}
            animationType="reveal"
            style={{
              fontSize: '18px',
              color: '#94a3b8',
              fontWeight: '500',
              letterSpacing: '0.025em'
            }}
          />
        </div>
      </div>
      
      {/* Main content area */}
      <div style={{
        position: 'absolute',
        top: '140px',
        left: '80px',
        right: '80px',
        bottom: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {/* SCENE 1: The Problem (frames 60-400) */}
        {frame >= 60 && frame <= 400 && (
          <SceneTransition
            startFrame={60}
            endFrame={400}
            transitionType="slide"
            direction="up"
            easing="smooth"
          >
            <ProblemVisualization delay={60} duration={340} />
          </SceneTransition>
        )}
        
        {/* SCENE 2: The Solution Concept (frames 400-700) */}
        {frame >= 400 && frame <= 700 && (
          <SceneTransition
            startFrame={400}
            endFrame={700}
            transitionType="morph"
            easing="organic"
          >
            <SolutionVisualization delay={400} duration={300} />
          </SceneTransition>
        )}
        
        {/* SCENE 3: Real Implementation (frames 700-1000) */}
        {frame >= 700 && frame <= 1000 && (
          <SceneTransition
            startFrame={700}
            endFrame={1000}
            transitionType="zoom"
            easing="snappy"
          >
            <RealWorldExample delay={700} duration={300} />
          </SceneTransition>
        )}
        
        {/* SCENE 4: Benefits Comparison (frames 1000-1300) */}
        {frame >= 1000 && frame <= 1300 && (
          <SceneTransition
            startFrame={1000}
            endFrame={1300}
            transitionType="flip"
            easing="mechanical"
          >
            <BenefitsComparison delay={1000} duration={300} />
          </SceneTransition>
        )}
        
        {/* SCENE 5: Best Practices (frames 1300-1600) */}
        {frame >= 1300 && frame <= 1600 && (
          <CinematicContainer
            cameraMovements={[{
              startFrame: 1300,
              endFrame: 1600,
              from: { x: 0, y: 20, scale: 0.95, rotation: 0 },
              to: { x: 0, y: 0, scale: 1, rotation: 0 }
            }]}
          >
            <div style={{ padding: '40px' }}>
              <KineticText
                text="Production-Ready Patterns"
                delay={1300}
                duration={60}
                animationType="reveal"
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#8b5cf6',
                  textAlign: 'center',
                  marginBottom: '32px'
                }}
              />
              
              <AnimatedCodeBlock
                code={`// Production Sequential Chain with Error Handling
class SequentialChain {
  private steps: ChainStep[] = [];
  private cache: Map<string, any> = new Map();
  
  addStep(name: string, processor: StepProcessor) {
    this.steps.push({ name, processor });
    return this;
  }
  
  async execute(input: any, options?: ChainOptions) {
    let result = input;
    const outputs: ChainOutput[] = [];
    
    for (const [index, step] of this.steps.entries()) {
      try {
        // Check cache first
        const cacheKey = \`\${step.name}-\${JSON.stringify(result)}\`;
        if (this.cache.has(cacheKey)) {
          result = this.cache.get(cacheKey);
          outputs.push({ step: step.name, output: result, cached: true });
          continue;
        }
        
        // Execute step with timeout
        result = await Promise.race([
          step.processor(result, { previousOutputs: outputs }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Step timeout')), 30000)
          )
        ]);
        
        // Validate output
        if (!result || result === '') {
          throw new Error('Empty output');
        }
        
        // Cache successful results
        this.cache.set(cacheKey, result);
        outputs.push({ step: step.name, output: result });
        
      } catch (error) {
        if (options?.continueOnError) {
          outputs.push({ step: step.name, error: error.message });
          continue;
        }
        throw new ChainError(\`Step '\${step.name}' failed\`, index, outputs);
      }
    }
    
    return { result, chainOutputs: outputs };
  }
}`}
                delay={1320}
                duration={280}
                language="typescript"
              />
            </div>
          </CinematicContainer>
        )}
        
        {/* SCENE 6: Final Call to Action (frames 1600+) */}
        {frame >= 1600 && (
          <SceneTransition
            startFrame={1600}
            endFrame={1900}
            transitionType="particle"
            easing="snappy"
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
              padding: '40px',
              textAlign: 'center'
            }}>
              <KineticText
                text="Start Building Better AI Workflows"
                delay={1620}
                duration={80}
                animationType="wave"
                style={{
                  fontSize: '36px',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #10b981)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              />
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
                maxWidth: '800px',
                opacity: interpolate(frame, [1700, 1760], [0, 1], { extrapolateRight: 'clamp' })
              }}>
                {[
                  { label: "Better Quality", value: "87% improvement", color: '#10b981' },
                  { label: "Faster Debug", value: "5x faster", color: '#3b82f6' },
                  { label: "Cost Savings", value: "40% reduction", color: '#8b5cf6' },
                  { label: "Happy Users", value: "100% 😊", color: '#f59e0b' }
                ].map((stat, index) => (
                  <AttentionHighlight
                    key={index}
                    active={frame > 1720 + index * 20}
                    type="glow"
                    intensity={0.8}
                  >
                    <div style={{
                      padding: '20px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      borderRadius: '12px',
                      border: `2px solid ${stat.color}40`,
                    }}>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: '800',
                        color: stat.color,
                        marginBottom: '4px'
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#94a3b8',
                        fontWeight: '500'
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  </AttentionHighlight>
                ))}
              </div>
              
              <AttentionHighlight
                active={frame > 1820}
                type="pulse"
                intensity={1.2}
              >
                <div style={{
                  padding: '20px 40px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  borderRadius: '16px',
                  boxShadow: '0 12px 32px rgba(59, 130, 246, 0.4)',
                  cursor: 'pointer',
                  transform: `scale(${spring({
                    frame: frame - 1820,
                    fps,
                    config: { damping: 10, stiffness: 100 }
                  })})`
                }}>
                  <span style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '700',
                    letterSpacing: '0.025em'
                  }}>
                    Try Sequential Chaining Today →
                  </span>
                </div>
              </AttentionHighlight>
            </div>
          </SceneTransition>
        )}
      </div>
    </AbsoluteFill>
  );
};