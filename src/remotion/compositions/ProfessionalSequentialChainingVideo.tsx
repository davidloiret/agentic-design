import React, { useState, useEffect } from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring,
  Easing
} from 'remotion';
import { CheckCircle, AlertTriangle, Target, Code, Zap, ArrowRight, Brain, TrendingUp, DollarSign, Timer, BarChart3 } from 'lucide-react';
import { 
  ProgressBrain, 
  VideoBackground,
  Watermark,
  AudioNarrationSequence,
  NarrationOverlay
} from '../components/VideoComponents';
import { loadTimingConfig, getSceneTiming, type TimingConfig, type NarrationSegment } from '../services/TimingConfigService';

// Text overlay component for accessibility (muted viewing) - Mobile optimized
const TextOverlay: React.FC<{ text: string; frame: number; startFrame: number; endFrame: number; style?: any }> = ({ 
  text, frame, startFrame, endFrame, style = {} 
}) => {
  if (frame < startFrame || frame > endFrame) return null;
  
  const opacity = interpolate(frame, [startFrame, startFrame + 10, endFrame - 10, endFrame], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  return (
    <div style={{
      position: 'absolute',
      top: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0,0,0,0.9)',
      padding: '16px 32px',
      borderRadius: '30px',
      zIndex: 1000,
      opacity,
      maxWidth: '90%',
      ...style
    }}>
      <p style={{
        color: 'white',
        fontSize: '72px', // Dramatically increased for mobile
        fontWeight: '800',
        margin: 0,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        lineHeight: '1.1'
      }}>
        {text}
      </p>
    </div>
  );
};

// Educational introduction - Mobile optimized
const EducationalIntro: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
  const frame = useCurrentFrame();
  
  if (frame < delay || frame > delay + duration) return null;
  
  const progress = (frame - delay) / duration;
  const bounce = spring({
    frame: frame - delay,
    fps: 30,
    config: { damping: 8, stiffness: 200 }
  });
  
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,0.85) 100%)',
      padding: '40px 20px'
    }}>,
      <div style={{
        textAlign: 'center',
        transform: `scale(${bounce})`,
        opacity: interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
        maxWidth: '90%'
      }}>
        <div style={{
          fontSize: '200px', // Clean, educational size
          marginBottom: '40px'
        }}>🧠</div>
        <h1 style={{
          fontSize: '120px',
          fontWeight: '900',
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 30px 0',
          textAlign: 'center',
          letterSpacing: '2px',
          lineHeight: '1.0'
        }}>
          Sequential Chaining
        </h1>
        <p style={{
          fontSize: '64px',
          color: '#94a3b8',
          fontWeight: '600',
          textAlign: 'center',
          margin: 0,
          lineHeight: '1.2'
        }}>
          Break Complex Tasks into Manageable Steps
        </p>
      </div>
    </div>
  );
};

// Concept explanation with clear examples - Mobile optimized
const ConceptExplanation: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
  const frame = useCurrentFrame();
  
  if (frame < delay || frame > delay + duration) return null;
  
  const progress = (frame - delay) / duration;
  
  return (
    <div style={{
      padding: '40px 25px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '40px',
      zIndex: 5,
      height: '100%',
      justifyContent: 'center'
    }}>,
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '100px',
          fontWeight: '700',
          background: 'linear-gradient(45deg, #10b981, #3b82f6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          textAlign: 'center',
          letterSpacing: '2px',
          lineHeight: '1.0'
        }}>
          Pipeline Concept
        </h2>
      </div>
      
      <div style={{
        width: '100%',
        background: 'rgba(16, 185, 129, 0.15)',
        border: '4px solid #10b981',
        borderRadius: '20px',
        padding: '30px 20px',
        opacity: interpolate(frame, [delay + 20, delay + 40], [0, 1], { extrapolateRight: 'clamp' })
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px',
          justifyContent: 'center'
        }}>
          <ArrowRight size={80} color="#10b981" />
          <span style={{
            color: '#3b82f6',
            fontSize: '48px',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            AI Pipeline Specialization
          </span>
        </div>
        
        <div style={{
          background: 'rgba(0,0,0,0.9)',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '25px'
        }}>
          <div style={{
            color: '#cbd5e1',
            fontSize: '32px',
            fontFamily: 'monospace',
            lineHeight: '1.4',
            textAlign: 'center',
            fontWeight: '500',
            background: 'rgba(0,0,0,0.6)',
            padding: '20px',
            borderRadius: '12px'
          }}>
            "Each AI call specializes in one specific task"
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '25px',
          justifyContent: 'space-around'
        }}>
          <div style={{ textAlign: 'center' }}>
            <Target size={100} color="#10b981" />
            <div style={{ color: '#3b82f6', fontSize: '56px', fontWeight: '700' }}>Focused</div>
            <div style={{ color: 'white', fontSize: '28px', fontWeight: '600' }}>PURPOSE</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <CheckCircle size={100} color="#10b981" />
            <div style={{ color: '#3b82f6', fontSize: '56px', fontWeight: '700' }}>Clear</div>
            <div style={{ color: 'white', fontSize: '28px', fontWeight: '600' }}>OUTPUT</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Zap size={100} color="#10b981" />
            <div style={{ color: '#3b82f6', fontSize: '56px', fontWeight: '700' }}>Efficient</div>
            <div style={{ color: 'white', fontSize: '28px', fontWeight: '600' }}>PROCESS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sequential chaining solution with code examples - Mobile optimized
const SequentialSolution: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
  const frame = useCurrentFrame();
  
  if (frame < delay || frame > delay + duration) return null;
  
  const steps = [
    { 
      title: 'Step 1: Research', 
      prompt: 'List 3 main productivity app competitors and their key features',
      color: '#3b82f6',
      icon: '🔍'
    },
    { 
      title: 'Step 2: Analyze', 
      prompt: 'Based on the research above, identify 2 market gaps',
      color: '#8b5cf6',
      icon: '📊'
    },
    { 
      title: 'Step 3: Design', 
      prompt: 'Using the gaps identified, create 3 user personas',
      color: '#10b981',
      icon: '👥'
    },
    { 
      title: 'Step 4: Plan', 
      prompt: 'From the personas, outline a feature roadmap',
      color: '#f59e0b',
      icon: '📋'
    }
  ];
  
  return (
    <div style={{
      padding: '40px 25px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '30px',
      height: '100%',
      justifyContent: 'center'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '25px'
      }}>
        <h2 style={{
          fontSize: '120px', // Dramatically increased for mobile visibility
          fontWeight: '900',
          background: 'linear-gradient(45deg, #10b981, #3b82f6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          lineHeight: '1.0'
        }}>
          The Solution 🔗
        </h2>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column', // Stack vertically for mobile
        gap: '15px',
        width: '100%',
        padding: '0 15px' // Add horizontal padding to prevent clipping
      }}>
        {steps.map((step, index) => {
          const stepDelay = delay + 30 + index * 25;
          const stepProgress = Math.max(0, Math.min(1, (frame - stepDelay) / 30));
          
          return (
            <div
              key={index}
              style={{
                background: `linear-gradient(135deg, ${step.color}25, ${step.color}15)`,
                border: `3px solid ${step.color}`,
                borderRadius: '16px',
                padding: '15px',
                transform: `scale(${stepProgress})`,
                opacity: stepProgress
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '80px' }}>{step.icon}</span>
                <span style={{
                  color: step.color,
                  fontSize: '48px', // Dramatically increased for mobile
                  fontWeight: '900',
                  textTransform: 'uppercase'
                }}>
                  {step.title}
                </span>
              </div>
              <p style={{
                color: 'white',
                fontSize: '36px', // Dramatically increased for mobile
                margin: 0,
                lineHeight: '1.3',
                fontWeight: '600'
              }}>
                "{step.prompt}"
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Benefits explanation - Mobile optimized  
const BenefitsExplanation: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
  const frame = useCurrentFrame();
  
  if (frame < delay || frame > delay + duration) return null;
  
  const benefits = [
    { label: 'Clearer Outputs', description: 'Each step builds logically', icon: '🎯', color: '#10b981' },
    { label: 'Easy Debugging', description: 'Identify issues per step', icon: '🔍', color: '#3b82f6' },
    { label: 'Better Quality', description: 'Focused, specific results', icon: '⭐', color: '#8b5cf6' },
    { label: 'Reusable Steps', description: 'Modular prompt design', icon: '🔧', color: '#f59e0b' }
  ];
  
  return (
    <div style={{
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      height: '100%',
      justifyContent: 'center'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '10px'
      }}>
        <h2 style={{
          fontSize: '72px', // Slightly smaller to save space
          fontWeight: '900',
          background: 'linear-gradient(45deg, #ffd93d, #10b981)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          lineHeight: '0.9'
        }}>
          Key Benefits 📈
        </h2>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column', // Stack vertically for mobile
        gap: '8px',
        width: '100%',
        padding: '0 20px', // Reduced padding to fit content
        maxWidth: '100%',
        overflow: 'hidden'
      }}>
        {benefits.map((benefit, index) => {
          const itemDelay = delay + 20 + index * 15;
          const itemProgress = Math.max(0, Math.min(1, (frame - itemDelay) / 25));
          
          return (
            <div
              key={index}
              style={{
                textAlign: 'center',
                padding: '15px 12px',
                background: `linear-gradient(135deg, ${benefit.color}25, ${benefit.color}15)`,
                borderRadius: '20px',
                border: `2px solid ${benefit.color}`,
                transform: `scale(${itemProgress})`,
                opacity: itemProgress
              }}
            >
              <div style={{
                fontSize: '60px', // Balanced icon size
                marginBottom: '10px'
              }}>
                {benefit.icon}
              </div>
              <div style={{
                fontSize: '36px', // Readable but fits
                fontWeight: '800',
                color: benefit.color,
                marginBottom: '8px'
              }}>
                {benefit.label}
              </div>
              <div style={{
                fontSize: '24px', // Clear and fits screen
                color: '#cbd5e1',
                fontWeight: '500',
                lineHeight: '1.15'
              }}>
                {benefit.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Comparison with traditional approaches - Mobile optimized
const ComparisonExplanation: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
  const frame = useCurrentFrame();
  
  if (frame < delay || frame > delay + duration) return null;
  
  const bounce = 1 + Math.sin(frame * 0.1) * 0.02;
  
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0,0,0,0.9) 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        textAlign: 'center',
        transform: `scale(${bounce})`,
        maxWidth: '95%'
      }}>
        <div style={{ fontSize: '140px', marginBottom: '30px' }}>⚖️</div>
        <h1 style={{
          fontSize: '100px',
          fontWeight: '700',
          background: 'linear-gradient(45deg, #8b5cf6, #ef4444)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 25px 0',
          letterSpacing: '2px',
          lineHeight: '1.0'
        }}>
          Compare Traditional
        </h1>
        <p style={{
          fontSize: '48px',
          color: '#cbd5e1',
          fontWeight: '600',
          margin: '0 0 40px 0',
          lineHeight: '1.2'
        }}>
          Sequential chaining gives you control, transparency, and higher quality
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '25px',
          flexWrap: 'wrap'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#8b5cf6', fontSize: '48px', fontWeight: '700' }}>Control</div>
            <div style={{ color: 'white', fontSize: '28px', fontWeight: '600' }}>PRECISION</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#10b981', fontSize: '48px', fontWeight: '700' }}>Transparency</div>
            <div style={{ color: 'white', fontSize: '28px', fontWeight: '600' }}>CLARITY</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#3b82f6', fontSize: '48px', fontWeight: '700' }}>Quality</div>
            <div style={{ color: 'white', fontSize: '28px', fontWeight: '600' }}>SUPERIOR</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Educational conclusion - Mobile optimized
const EducationalConclusion: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
  const frame = useCurrentFrame();
  
  if (frame < delay || frame > delay + duration) return null;
  
  const bounce = 1 + Math.sin(frame * 0.2) * 0.03; // Much more subtle bounce
  const glow = Math.sin(frame * 0.15) * 0.3 + 0.7; // Smoother glow variation
  
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(0,0,0,0.9) 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        textAlign: 'center',
        transform: `scale(${bounce})`,
        maxWidth: '95%'
      }}>
        <div style={{ fontSize: '160px', marginBottom: '40px' }}>⚡</div>
        <h1 style={{
          fontSize: '120px',
          fontWeight: '700',
          background: 'linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6)',
          backgroundSize: '200% 200%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 30px 0',
          textAlign: 'center',
          letterSpacing: '2px',
          lineHeight: '1.0'
        }}>
          Transform Your AI
        </h1>
        <p style={{
          fontSize: '56px',
          color: '#94a3b8',
          fontWeight: '600',
          marginBottom: '40px',
          textAlign: 'center',
          lineHeight: '1.2'
        }}>
          Manageable, Transparent & Reliable Workflows
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '25px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#10b981', fontSize: '48px', fontWeight: '700' }}>Manageable</div>
            <div style={{ color: 'white', fontSize: '28px', fontWeight: '600' }}>TASKS</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#3b82f6', fontSize: '48px', fontWeight: '700' }}>Transparent</div>
            <div style={{ color: 'white', fontSize: '28px', fontWeight: '600' }}>PROCESS</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#8b5cf6', fontSize: '48px', fontWeight: '700' }}>Reliable</div>
            <div style={{ color: 'white', fontSize: '28px', fontWeight: '600' }}>WORKFLOWS</div>
          </div>
        </div>
        <div style={{
          padding: '30px 50px',
          background: `linear-gradient(45deg, #10b981, #3b82f6)`,
          borderRadius: '40px',
          fontSize: '44px',
          fontWeight: '700',
          color: 'white',
          border: '4px solid white',
          boxShadow: `0 0 ${30 + glow * 20}px rgba(16, 185, 129, 0.6)`,
          letterSpacing: '1px',
          textAlign: 'center'
        }}>
          🧠 Learn More Patterns
        </div>
      </div>
    </div>
  );
};

// Educational recap - holds until end
const EducationalRecap: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
  const frame = useCurrentFrame();
  
  if (frame < delay) return null;
  
  const pulse = 1 + Math.sin(frame * 0.15) * 0.02; // Reduced frequency and amplitude
  
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,0.95) 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        textAlign: 'center',
        transform: `scale(${pulse})`,
        maxWidth: '95%'
      }}>
        <div style={{ fontSize: '140px', marginBottom: '30px' }}>🎓</div>
        <h1 style={{
          fontSize: '100px',
          fontWeight: '700',
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 25px 0',
          letterSpacing: '2px',
          lineHeight: '1.0'
        }}>
          Key Takeaway
        </h1>
        <p style={{
          fontSize: '48px',
          color: '#cbd5e1',
          fontWeight: '600',
          margin: 0,
          lineHeight: '1.2'
        }}>
          Break complex tasks into logical, sequential steps for better AI results
        </p>
      </div>
    </div>
  );
};

// Floating particles for visual interest
const FloatingParticles: React.FC = () => {
  const frame = useCurrentFrame();
  
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 150 + Math.sin(frame * 0.02 + i) * 80;
        const x = 960 + Math.cos(angle + frame * 0.01) * radius;
        const y = 540 + Math.sin(angle + frame * 0.01) * radius;
        const scale = 0.3 + Math.sin(frame * 0.03 + i * 2) * 0.2;
        const opacity = 0.1 + Math.sin(frame * 0.05 + i) * 0.1;
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: '6px',
              height: '6px',
              background: `hsl(${200 + i * 20}, 70%, 60%)`,
              borderRadius: '50%',
              transform: `scale(${scale})`,
              opacity,
              boxShadow: '0 0 8px currentColor',
            }}
          />
        );
      })}
    </div>
  );
};

// Dynamic background with subtle animation
const DynamicBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.08) * 0.5 + 0.5;
  const colorShift = Math.sin(frame * 0.03) * 20;
  
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: `
        radial-gradient(circle at 20% 20%, hsla(${200 + colorShift}, 70%, 50%, ${0.12 + pulse * 0.08}) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, hsla(${280 + colorShift}, 70%, 50%, ${0.12 + pulse * 0.08}) 0%, transparent 50%),
        linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 100%)
      `,
      zIndex: -2
    }} />
  );
};

// Constant brain animation with progress - Positioned on left to avoid title overlap
const BrainLeft: React.FC<{ totalFrames: number }> = ({ totalFrames }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.1) * 0.03; // Much more subtle brain pulse
  const glow = Math.sin(frame * 0.08) * 4 + 10; // Reduced glow variation
  const progress = Math.min(1, frame / totalFrames); // Progress synced with actual video duration
  
  return (
    <div style={{
      position: 'absolute',
      top: '30px', // Moved higher up
      left: '60px', // Positioned on the left side
      transform: `scale(${pulse})`,
      zIndex: 5
    }}>
      <ProgressBrain
        size={70} // Slightly larger since it's not centered
        progress={Math.max(0.1, progress)} // Start with small progress
        glow={glow}
        scale={1}
      />
    </div>
  );
};

export const ProfessionalSequentialChainingVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Dynamic timing configuration
  const [timingConfig, setTimingConfig] = useState<TimingConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load timing configuration on component mount
  useEffect(() => {
    loadTimingConfig('sequential-chaining')
      .then((config) => {
        setTimingConfig(config);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load timing config:', error);
        setIsLoading(false);
      });
  }, []);
  
  // Show loading state while config loads
  if (isLoading || !timingConfig) {
    return (
      <AbsoluteFill style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '48px',
        fontWeight: '600'
      }}>
        Loading timing configuration...
      </AbsoluteFill>
    );
  }
  
  // Extract data from loaded config
  const narrationSegments = timingConfig.narrationSegments;
  const scenes = getSceneTiming(narrationSegments);
  const totalFrames = timingConfig.totalFrames;
  
  // Debug: Log scenes timing on first frame
  if (frame === 1) {
    console.log('🎬 Scene timing:', scenes);
    console.log('📊 Total frames:', totalFrames);
  }
  
  const brainProgress = Math.min(1, frame / (totalFrames * 0.8));
  
  return (
    <>
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
      
      <AbsoluteFill style={{ 
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 100%)'
      }}>
        <DynamicBackground />
        <VideoBackground />
        <FloatingParticles />
        <BrainLeft totalFrames={totalFrames} />
        
        {/* Text overlays removed - they hide important visual content */}
        
        {/* Scene 1: Introduction - "Sequential chaining breaks complex tasks..." (2-10s) */}
        {scenes.intro && frame >= scenes.intro.start && frame <= scenes.intro.start + scenes.intro.duration && (
          <EducationalIntro 
            delay={scenes.intro.start} 
            duration={scenes.intro.duration} 
          />
        )}
        
        {/* Scene 2: Concept - "Instead of one massive prompt..." (13.3-21.3s) */}
        {scenes.concept && frame >= scenes.concept.start && frame <= scenes.concept.start + scenes.concept.duration && (
          <ConceptExplanation 
            delay={scenes.concept.start} 
            duration={scenes.concept.duration} 
          />
        )}
        
        {/* Scene 3: Implementation - "Implementation is straightforward..." (23.3-31.3s) */}
        {scenes.implementation && frame >= scenes.implementation.start && frame <= scenes.implementation.start + scenes.implementation.duration && (
          <SequentialSolution 
            delay={scenes.implementation.start} 
            duration={scenes.implementation.duration} 
          />
        )}
        
        {/* Scene 4: Comparison - "Compare this to traditional single prompts..." (29-37s) */}
        {scenes.comparison && frame >= scenes.comparison.start && frame <= scenes.comparison.start + scenes.comparison.duration && (
          <ComparisonExplanation 
            delay={scenes.comparison.start} 
            duration={scenes.comparison.duration} 
          />
        )}
        
        {/* Scene 5: Benefits - "Each chain can be optimized independently..." (38-46s) */}
        {scenes.benefits && frame >= scenes.benefits.start && frame <= scenes.benefits.start + scenes.benefits.duration && (
          <BenefitsExplanation 
            delay={scenes.benefits.start} 
            duration={scenes.benefits.duration} 
          />
        )}
        
        {/* Scene 6: Conclusion - "Sequential chaining transforms complex AI tasks..." (47-55s) */}
        {scenes.conclusion && frame >= scenes.conclusion.start && frame <= scenes.conclusion.start + scenes.conclusion.duration && (
          <EducationalConclusion 
            delay={scenes.conclusion.start} 
            duration={scenes.conclusion.duration} 
          />
        )}
        
        {/* Audio narration sequences */}
        {narrationSegments.map((segment) => (
          <AudioNarrationSequence 
            key={segment.id}
            segment={segment}
            audioPath="/audio/sequential-chaining/"
          />
        ))}
        
        {/* Narration text overlays removed to avoid covering visual elements */}
        
        {/* Enhanced Watermark */}
        <Watermark brainProgress={brainProgress} />
      </AbsoluteFill>
    </>
  );
};