import React, { useState, useEffect } from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
  Audio, 
  Easing,
  Sequence,
  staticFile
} from 'remotion';
import { Brain, CheckCircle, Lightbulb, Volume2, Calculator, TrendingUp, AlertTriangle, Target, Code, Zap, ArrowRight } from 'lucide-react';
import DynamicTimingService from '../services/DynamicTimingService';

// Custom Progress Brain Component with fill effect
const ProgressBrain: React.FC<{ 
  size: number; 
  progress: number; 
  glow: number; 
  scale: number; 
  className?: string;
  style?: React.CSSProperties;
}> = ({ size, progress, glow, scale, className, style }) => {
  const fillPercentage = progress * 100;
  
  return (
    <div 
      className={className}
      style={{
        position: 'relative',
        width: size,
        height: size,
        transform: `scale(${scale})`,
        filter: `drop-shadow(0 ${glow}px ${glow * 1.5}px rgba(59, 130, 246, ${0.3 + progress * 0.4})) 
                 drop-shadow(0 0 ${glow * 0.5}px rgba(59, 130, 246, ${0.2 + progress * 0.3}))`,
        transition: 'all 0.3s ease',
        ...style,
      }}
    >
      {/* Background (empty/unfilled) brain */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}>
        <Brain 
          size={size} 
          color="rgba(100, 116, 139, 0.3)"
          strokeWidth={2}
        />
      </div>
      
      {/* Filled brain with gradient mask */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        maskImage: `linear-gradient(to top, 
          black 0%, 
          black ${fillPercentage}%, 
          transparent ${fillPercentage}%, 
          transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to top, 
          black 0%, 
          black ${fillPercentage}%, 
          transparent ${fillPercentage}%, 
          transparent 100%)`,
      }}>
        <Brain 
          size={size} 
          color="#3b82f6"
          strokeWidth={2}
        />
      </div>
      
      {/* Additional glow overlay for filled portion */}
      {progress > 0.1 && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
          maskImage: `linear-gradient(to top, 
            black 0%, 
            black ${Math.max(0, fillPercentage - 10)}%, 
            transparent ${fillPercentage}%, 
            transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to top, 
            black 0%, 
            black ${Math.max(0, fillPercentage - 10)}%, 
            transparent ${fillPercentage}%, 
            transparent 100%)`,
          opacity: progress * 0.6,
        }}>
          <Brain 
            size={size} 
            color="#60a5fa"
            strokeWidth={2.5}
          />
        </div>
      )}
    </div>
  );
};

interface StepProps {
  step: number;
  title: string;
  content: string;
  formula?: string;
  calculation?: string;
  result?: string;
  code?: string;
  delay: number;
  duration: number;
  icon?: React.ReactNode;
  color?: string;
}

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

const AnimatedStep: React.FC<StepProps> = ({ 
  step, 
  title, 
  content, 
  formula, 
  calculation, 
  result, 
  code,
  delay, 
  duration, 
  icon,
  color = '#3b82f6'
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const opacity = interpolate(
    frame,
    [delay, delay + 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const translateY = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      stiffness: 200,
      mass: 0.5,
    },
  });
  
  const y = interpolate(translateY, [0, 1], [50, 0]);
  
  const scale = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 15,
      stiffness: 300,
    },
  });
  
  if (frame < delay || frame > delay + duration) return null;
  
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '24px',
        marginBottom: '32px',
        padding: '24px',
        background: `linear-gradient(135deg, ${color}15, ${color}08)`,
        borderRadius: '16px',
        border: `2px solid ${color}40`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${color}, ${color}CC)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px',
          flexShrink: 0,
          boxShadow: `0 8px 24px ${color}40`,
        }}
      >
        {icon || step}
      </div>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ 
          color: '#e5e7eb', 
          fontSize: '26px', 
          margin: '0 0 12px 0',
          fontWeight: '700',
          letterSpacing: '-0.025em'
        }}>
          {title}
        </h3>
        
        <p style={{ 
          color: '#9ca3af', 
          fontSize: '18px', 
          margin: '0 0 16px 0',
          lineHeight: '1.7',
          fontWeight: '400'
        }}>
          {content}
        </p>
        
        {code && (
          <div style={{
            marginBottom: '12px',
            padding: '20px',
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '12px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
          }}>
            <div style={{ 
              color: '#a78bfa', 
              fontSize: '14px', 
              fontWeight: '600', 
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Code Implementation
            </div>
            <pre style={{ 
              color: '#e5e7eb', 
              fontSize: '16px', 
              fontWeight: '400',
              fontFamily: 'JetBrains Mono, monospace',
              margin: 0,
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}>
              {code}
            </pre>
          </div>
        )}
        
        {formula && (
          <div style={{
            marginBottom: '12px',
            padding: '16px',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          }}>
            <div style={{ 
              color: '#60a5fa', 
              fontSize: '14px', 
              fontWeight: '600', 
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Formula
            </div>
            <code style={{ 
              color: '#3b82f6', 
              fontSize: '20px', 
              fontWeight: '600',
              fontFamily: 'JetBrains Mono, monospace'
            }}>
              {formula}
            </code>
          </div>
        )}
        
        {calculation && (
          <div style={{
            marginBottom: '12px',
            padding: '16px',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}>
            <div style={{ 
              color: '#34d399', 
              fontSize: '14px', 
              fontWeight: '600', 
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Calculation
            </div>
            <code style={{ 
              color: '#10b981', 
              fontSize: '18px', 
              fontWeight: '500',
              fontFamily: 'JetBrains Mono, monospace'
            }}>
              {calculation}
            </code>
          </div>
        )}
        
        {result && (
          <div style={{
            padding: '16px',
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
          }}>
            <div style={{ 
              color: '#a78bfa', 
              fontSize: '14px', 
              fontWeight: '600', 
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Result
            </div>
            <div style={{ 
              color: '#8b5cf6', 
              fontSize: '22px', 
              fontWeight: '700'
            }}>
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Audio narration sequence component with improved loading
const AudioNarrationSequence: React.FC<{ segment: NarrationSegment }> = ({ segment }) => {
  const frame = useCurrentFrame();
  
  if (frame < segment.startFrame || frame > segment.endFrame) return null;
  
  // Use staticFile with proper path resolution
  const audioSrc = staticFile(`audio/cot/${segment.filename}`);
  
  return (
    <Sequence from={segment.startFrame} durationInFrames={segment.endFrame - segment.startFrame}>
      <Audio 
        src={audioSrc}
        volume={0.7}
        // Add these props to help with loading issues
        startFrom={0}
        endAt={segment.endFrame - segment.startFrame}
      />
    </Sequence>
  );
};

// Enhanced comparison component for before/after prompts
const PromptComparison: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const opacity = interpolate(
    frame,
    [delay, delay + 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  if (frame < delay || frame > delay + duration) return null;
  
  return (
    <div style={{
      opacity,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '40px',
    }}>
      {/* Regular Prompt */}
      <div style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1))',
        borderRadius: '16px',
        border: '2px solid rgba(239, 68, 68, 0.3)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '16px' 
        }}>
          <AlertTriangle size={24} color="#ef4444" style={{ marginRight: '12px' }} />
          <h3 style={{ 
            color: '#ef4444', 
            fontSize: '20px', 
            margin: 0,
            fontWeight: '700'
          }}>
            Regular Prompt
          </h3>
        </div>
        <pre style={{
          color: '#fca5a5',
          fontSize: '14px',
          margin: '0 0 16px 0',
          fontFamily: 'JetBrains Mono, monospace',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap'
        }}>
{`const prompt = "Calculate compound interest on $5,000 at 6% for 3 years, then monthly payments for a 5-year loan at 4%";

const response = await llm.generate(prompt);`}
        </pre>
        <div style={{
          padding: '12px',
          background: 'rgba(239, 68, 68, 0.2)',
          borderRadius: '8px',
          color: '#f87171',
          fontSize: '14px'
        }}>
          ❌ Direct answer: "$109.57/month" (no reasoning shown)
        </div>
      </div>

      {/* Chain of Thought Prompt */}
      <div style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))',
        borderRadius: '16px',
        border: '2px solid rgba(16, 185, 129, 0.3)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '16px' 
        }}>
          <CheckCircle size={24} color="#10b981" style={{ marginRight: '12px' }} />
          <h3 style={{ 
            color: '#10b981', 
            fontSize: '20px', 
            margin: 0,
            fontWeight: '700'
          }}>
            Chain of Thought Prompt
          </h3>
        </div>
        <pre style={{
          color: '#34d399',
          fontSize: '14px',
          margin: '0 0 16px 0',
          fontFamily: 'JetBrains Mono, monospace',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap'
        }}>
{`const prompt = "Calculate compound interest on $5,000 at 6% for 3 years, then monthly payments for a 5-year loan at 4%. Let's think step by step.";

const response = await llm.generate(prompt);`}
        </pre>
        <div style={{
          padding: '12px',
          background: 'rgba(16, 185, 129, 0.2)',
          borderRadius: '8px',
          color: '#10b981',
          fontSize: '14px'
        }}>
          ✅ Step-by-step reasoning + final answer (transparent & verifiable)
        </div>
      </div>
    </div>
  );
};

// Enhanced narration text overlay component (fallback when audio has issues)
const NarrationOverlay: React.FC<{ segment: NarrationSegment }> = ({ segment }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  if (frame < segment.startFrame || frame > segment.endFrame) return null;
  
  const opacity = interpolate(
    frame,
    [segment.startFrame, segment.startFrame + 20, segment.endFrame - 20, segment.endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const scale = spring({
    frame: frame - segment.startFrame,
    fps,
    config: { damping: 100, stiffness: 200 }
  });
  
  return (
    <div style={{
      position: 'absolute',
      bottom: '100px',
      left: '80px',
      right: '80px',
      padding: '24px',
      background: 'rgba(0, 0, 0, 0.85)',
      borderRadius: '16px',
      border: '1px solid rgba(59, 130, 246, 0.4)',
      opacity,
      transform: `scale(${scale})`,
      zIndex: 10,
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        marginBottom: '12px'
      }}>
        <Volume2 size={24} color="#3b82f6" />
        <span style={{ 
          color: '#3b82f6', 
          fontSize: '16px', 
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Narration
        </span>
      </div>
      <p style={{
        color: 'white',
        fontSize: '20px',
        margin: 0,
        lineHeight: '1.6',
        fontWeight: segment.highlight ? '600' : '400'
      }}>
        "{segment.text}"
      </p>
    </div>
  );
};

export const ChainOfThoughtVideoWithAudio: React.FC = () => {
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
        await timingService.loadTimingConfig('/audio/cot/');
        
        const segments = timingService.getNarrationSegments();
        const visualElements = timingService.getVisualElementTiming('promptComparison');
        
        if (segments) {
          setNarrationSegments(segments.map(seg => ({
            ...seg,
            highlight: seg.id === 'intro' || seg.id === 'conclusion'
          })));
        }
        
        setVisualTiming({
          promptComparison: visualElements || { startFrame: 400, duration: 300 },
          steps: [
            { startFrame: 450, duration: 300 },
            { startFrame: 750, duration: 300 },
            { startFrame: 1050, duration: 300 }
          ]
        });
      } catch (error) {
        console.warn('Using fallback timing:', error);
        // Fallback timing if dynamic loading fails
        setNarrationSegments([
          { 
            id: 'intro', 
            text: 'Chain of Thought reasoning transforms how AI solves complex problems - and it\'s surprisingly simple to implement.', 
            startFrame: 60, 
            endFrame: 300, 
            filename: 'cot-intro.wav', 
            duration: 8, 
            durationFrames: 240,
            highlight: true
          },
        ]);
        setVisualTiming({
          promptComparison: { startFrame: 400, duration: 300 },
          steps: [
            { startFrame: 450, duration: 300 },
            { startFrame: 750, duration: 300 },
            { startFrame: 1050, duration: 300 }
          ]
        });
      } finally {
        setIsTimingLoaded(true);
      }
    };
    
    loadTiming();
  }, []);
  
  // Brain progress animation - shows video progress with color fill
  const videoProgress = isTimingLoaded && narrationSegments.length > 0 
    ? interpolate(frame, [0, (narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2200) + 100], [0, 1], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
      })
    : interpolate(frame, [0, 900], [0, 1], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
      });
  
  // Ensure minimum brain fill for visibility (20% minimum, scaling to 100%)
  const brainProgress = Math.max(0.2, videoProgress * 0.8 + 0.2);
  
  // Brain visual effects based on progress
  const brainGlow = interpolate(brainProgress, [0.2, 1], [6, 16]);
  const brainScale = 1 + (Math.sin(frame * 0.08) * 0.03 * brainProgress);
  
  // Title always visible from frame 0
  const titleOpacity = 1;
  const titleScale = interpolate(frame, [0, 30], [0.95, 1], {
    extrapolateRight: 'clamp',
  });
  
  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 100%)',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '80px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* TTS Audio Narration - Load all audio tracks */}
      {narrationSegments.map((segment, index) => (
        <AudioNarrationSequence key={`audio-${index}`} segment={segment} />
      ))}
      
      {/* Visual Narration Overlays as backup */}
      {narrationSegments.map((segment, index) => (
        <NarrationOverlay key={`text-${index}`} segment={segment} />
      ))}
      
      {/* Sophisticated background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
        `,
        zIndex: 0,
      }} />
      
      {/* Watermark */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '30px',
        zIndex: 1000,
        opacity: 0.7,
        background: 'rgba(15, 23, 42, 0.8)',
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Brain size={16} color={`rgba(59, 130, 246, ${Math.max(0.7, brainProgress)})`} />
          <span style={{
            fontSize: '14px',
            color: '#94a3b8',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '500',
          }}>
            Agentic Design
          </span>
          <span style={{
            fontSize: '12px',
            color: '#64748b',
            fontFamily: 'Monaco, monospace',
          }}>
            https://agentic-design.ai
          </span>
        </div>
      </div>
      
      {/* Enhanced title section - Always visible from frame 0 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '60px',
        opacity: titleOpacity,
        transform: `scale(${titleScale})`,
        zIndex: 1,
      }}>
        <ProgressBrain
          size={72}
          progress={brainProgress}
          glow={brainGlow}
          scale={brainScale}
          style={{ marginRight: '24px' }}
        />
        <div>
          <h1 style={{
            fontSize: '56px',
            color: 'white',
            margin: '0 0 8px 0',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.025em',
          }}>
            Chain of Thought
          </h1>
          <p style={{
            fontSize: '24px',
            color: '#94a3b8',
            margin: 0,
            fontWeight: '500',
            letterSpacing: '0.025em'
          }}>
            Transparent AI Reasoning for Engineers
          </p>
        </div>
      </div>
      
      {/* Loading indicator while timing loads */}
      {!isTimingLoaded && frame > 60 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          zIndex: 1,
        }}>
          <div style={{
            padding: '24px',
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '16px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            textAlign: 'center',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(59, 130, 246, 0.3)',
              borderTop: '3px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }} />
            <p style={{
              color: '#94a3b8',
              fontSize: '16px',
              margin: 0,
            }}>
              Loading dynamic timing...
            </p>
          </div>
        </div>
      )}
      
      {/* Main content container */}
      <div style={{ 
        flex: 1,
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        
        {/* Immediate intro content - always visible on early frames */}
        {frame < 60 && (
          <div style={{
            opacity: interpolate(frame, [0, 30], [1, 0.7], { extrapolateRight: 'clamp' }),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px',
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '20px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            backdropFilter: 'blur(8px)',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '20px',
            }}>
              <Zap size={28} color="#f59e0b" />
              <span style={{
                fontSize: '18px',
                color: '#f59e0b',
                fontWeight: '600',
                letterSpacing: '0.05em',
              }}>
                AI REASONING TECHNIQUE
              </span>
            </div>
            
            <h2 style={{
              fontSize: '28px',
              color: 'white',
              margin: '0 0 16px 0',
              fontWeight: '700',
              lineHeight: '1.2',
            }}>
              Unlock Transparent AI Decision Making
            </h2>
            
            <p style={{
              fontSize: '16px',
              color: '#94a3b8',
              margin: 0,
              maxWidth: '600px',
              lineHeight: '1.5',
            }}>
              Discover how a simple prompt addition transforms opaque AI responses into clear, step-by-step reasoning
            </p>
          </div>
        )}
        
        {/* Content during 'intro' segment - Key benefits overview */}
        {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'intro')?.startFrame || 60) && 
         frame <= (narrationSegments.find(s => s.id === 'intro')?.endFrame || 300) && (
          <div style={{
            opacity: interpolate(frame, [(narrationSegments.find(s => s.id === 'intro')?.startFrame || 60), (narrationSegments.find(s => s.id === 'intro')?.startFrame || 60) + 40], [0, 1], { extrapolateRight: 'clamp' }),
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '40px',
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '20px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ textAlign: 'center', color: '#10b981', maxWidth: '250px' }}>
              <Brain size={48} style={{ marginBottom: '16px' }} />
              <p style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Transparent Reasoning</p>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>See every step of AI thinking</p>
            </div>
            <div style={{ textAlign: 'center', color: '#3b82f6', maxWidth: '250px' }}>
              <Zap size={48} style={{ marginBottom: '16px' }} />
              <p style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>40-70% Better Accuracy</p>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>Proven performance improvement</p>
            </div>
            <div style={{ textAlign: 'center', color: '#8b5cf6', maxWidth: '250px' }}>
              <Code size={48} style={{ marginBottom: '16px' }} />
              <p style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Simple Implementation</p>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>Just add to your prompts</p>
            </div>
          </div>
        )}
        
        {/* Content during 'implementation' segment - Simple setup */}
        {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'implementation')?.startFrame || 400) && 
         frame <= (narrationSegments.find(s => s.id === 'implementation')?.endFrame || 700) && (
          <AnimatedStep
            step={1}
            title="Simple Implementation"
            content="Add Chain of Thought triggers to your prompts. The model does all the reasoning automatically - no additional coding required."
            code={`// Regular prompt - direct answer
const basicPrompt = "What's 15% of 240 plus 30?";

// Chain of Thought prompt - step by step reasoning  
const cotPrompt = "What's 15% of 240 plus 30? Let's think step by step.";

// The model now shows its work automatically!
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: cotPrompt }]
});`}
            delay={narrationSegments.find(s => s.id === 'implementation')?.startFrame || 400}
            duration={narrationSegments.find(s => s.id === 'implementation')?.durationFrames || 300}
            icon={<Code size={24} />}
            color="#3b82f6"
          />
        )}
        
        {/* Content during 'comparison' segment - Prompt comparison setup */}
        {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'comparison')?.startFrame || 800) && 
         frame <= (narrationSegments.find(s => s.id === 'comparison')?.endFrame || 900) && (
          <div style={{
            opacity: interpolate(frame, [(narrationSegments.find(s => s.id === 'comparison')?.startFrame || 800), (narrationSegments.find(s => s.id === 'comparison')?.startFrame || 800) + 30], [0, 1], { extrapolateRight: 'clamp' }),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px 40px',
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '20px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            backdropFilter: 'blur(8px)',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            <ArrowRight size={56} color="#3b82f6" style={{ 
              marginBottom: '24px',
              filter: 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3))'
            }} />
            <h2 style={{
              fontSize: '36px',
              color: 'white',
              margin: '0 0 20px 0',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.025em',
            }}>
              Regular vs Chain of Thought
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#94a3b8',
              margin: 0,
              maxWidth: '600px',
              lineHeight: '1.6',
              fontWeight: '400',
            }}>
              Watch how adding one simple phrase transforms AI reasoning from opaque to transparent
            </p>
          </div>
        )}
        
        {/* Content during 'regular' and 'magic' segments - Side-by-side comparison */}
        {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'regular')?.startFrame || 1000) && 
         frame <= (narrationSegments.find(s => s.id === 'magic')?.endFrame || 1400) && (
          <PromptComparison 
            delay={narrationSegments.find(s => s.id === 'regular')?.startFrame || 1000} 
            duration={((narrationSegments.find(s => s.id === 'magic')?.endFrame || 1400) - (narrationSegments.find(s => s.id === 'regular')?.startFrame || 1000))} 
          />
        )}
        
        {/* Content during 'automatic' segment - Automatic reasoning */}
        {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'automatic')?.startFrame || 1500) && 
         frame <= (narrationSegments.find(s => s.id === 'automatic')?.endFrame || 1800) && (
          <AnimatedStep
            step={2}
            title="Automatic Reasoning"
            content="The model automatically breaks down complex problems into logical steps. You get transparent reasoning without any extra programming effort."
            result={`Step 1: Calculate 15% of 240
15% = 0.15
0.15 × 240 = 36

Step 2: Add 30 to the result  
36 + 30 = 66

Therefore: 15% of 240 plus 30 = 66`}
            delay={narrationSegments.find(s => s.id === 'automatic')?.startFrame || 1500}
            duration={narrationSegments.find(s => s.id === 'automatic')?.durationFrames || 300}
            icon={<Zap size={24} />}
            color="#10b981"
          />
        )}
        
        {/* Content during 'conclusion' segment - Final benefits and patterns */}
        {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'conclusion')?.startFrame || 1900) && 
         frame <= (narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2200) && (
          <AnimatedStep
            step={3}
            title="Production-Ready Patterns"
            content="Use different CoT triggers for various scenarios. This simple technique delivers 40-70% accuracy improvements and complete transparency."
            code={`// For mathematical problems
"Let's solve this step by step."

// For analysis tasks  
"Let's break this down systematically."

// For complex reasoning
"Let's think through this carefully."

// For debugging
"Let's trace through this logic."

// Zero-shot CoT (most common)
"Let's think step by step."`}
            delay={narrationSegments.find(s => s.id === 'conclusion')?.startFrame || 1900}
            duration={narrationSegments.find(s => s.id === 'conclusion')?.durationFrames || 300}
            icon={<Target size={24} />}
            color="#8b5cf6"
          />
        )}
        
      </div>
      
      {/* Enhanced benefits section - appears after conclusion narration */}
      {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2200) + 30 && (
        <div style={{
          opacity: interpolate(frame, [(narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2200) + 30, (narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2200) + 70], [0, 1], { extrapolateRight: 'clamp' }),
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: '40px',
          padding: '40px',
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '20px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          zIndex: 1,
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ textAlign: 'center', color: '#10b981', maxWidth: '200px' }}>
            <CheckCircle size={40} style={{ marginBottom: '12px' }} />
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>40-70% Better Accuracy</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>Proven improvement</p>
          </div>
          <div style={{ textAlign: 'center', color: '#f59e0b', maxWidth: '200px' }}>
            <Code size={40} style={{ marginBottom: '12px' }} />
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Zero Extra Code</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>Just add to prompts</p>
          </div>
          <div style={{ textAlign: 'center', color: '#8b5cf6', maxWidth: '200px' }}>
            <Lightbulb size={40} style={{ marginBottom: '12px' }} />
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Full Transparency</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>See the reasoning</p>
          </div>
          <div style={{ textAlign: 'center', color: '#06b6d4', maxWidth: '200px' }}>
            <Zap size={40} style={{ marginBottom: '12px' }} />
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Instant Implementation</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>Works immediately</p>
          </div>
        </div>
      )}

      {/* Final call-to-action that holds at the end */}
      {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2200) + 100 && (
        <div style={{
          opacity: interpolate(frame, [(narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2200) + 100, (narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2200) + 140], [0, 1], { extrapolateRight: 'clamp' }),
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 10,
        }}>
          <div style={{
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
          }}>
            <p style={{
              color: 'white',
              fontSize: '18px',
              margin: 0,
              fontWeight: '600',
              letterSpacing: '0.025em'
            }}>
              Start using Chain of Thought in your prompts today!
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
}; 