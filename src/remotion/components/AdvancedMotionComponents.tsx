import React from 'react';
import { 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring,
  Easing
} from 'remotion';
import { Brain, CheckCircle, Code, ArrowRight, Zap, Link2 } from 'lucide-react';

// Advanced easing functions based on research
const easings = {
  // Smooth, natural motion for UI elements
  smooth: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  // Quick, snappy motion for attention-grabbing elements
  snappy: Easing.bezier(0.68, -0.55, 0.265, 1.55),
  // Gentle, organic motion for large content blocks
  organic: Easing.bezier(0.23, 1, 0.32, 1),
  // Precise, mechanical motion for technical elements
  mechanical: Easing.bezier(0.7, 0, 0.84, 0),
};

// Advanced spring configurations
const springs = {
  gentle: { damping: 100, stiffness: 400, mass: 3 },
  bouncy: { damping: 40, stiffness: 400, mass: 1 },
  precise: { damping: 200, stiffness: 600, mass: 0.8 },
  elastic: { damping: 30, stiffness: 300, mass: 2 },
};

// Enhanced Progress Brain with sophisticated animations
export const AdvancedProgressBrain: React.FC<{ 
  size: number; 
  progress: number; 
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ size, progress, delay = 0, className, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Multi-layered entrance animation
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: springs.bouncy,
  });
  
  // Breathing animation for organic feel
  const breathe = Math.sin((frame - delay) * 0.04) * 0.02 + 1;
  
  // Neural network pulse effect
  const pulse = Math.sin((frame - delay) * 0.08) * 0.1 + 0.9;
  
  // Dynamic glow based on progress
  const glowIntensity = interpolate(progress, [0, 1], [6, 20]);
  
  // Calculate glow color based on progress
  const glowColor = progress < 0.5 
    ? `rgba(59, 130, 246, ${0.3 + progress * 0.2})`
    : progress < 0.8
    ? `rgba(139, 92, 246, ${0.4 + (progress - 0.5) * 0.3})`
    : `rgba(16, 185, 129, ${0.5 + (progress - 0.8) * 0.5})`;
  
  // Fill animation with multiple segments
  const fillSegments = 8;
  const segmentProgress = (progress * fillSegments) % 1;
  const completedSegments = Math.floor(progress * fillSegments);
  
  if (frame < delay) return null;
  
  return (
    <div 
      className={className}
      style={{
        position: 'relative',
        width: size,
        height: size,
        transform: `scale(${entrance * breathe})`,
        filter: `drop-shadow(0 ${glowIntensity}px ${glowIntensity * 2}px ${glowColor})`,
        ...style,
      }}
    >
      {/* Background brain */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.2,
      }}>
        <Brain size={size} color="rgba(156, 163, 175, 0.3)" strokeWidth={1.5} />
      </div>
      
      {/* Segmented fill effect */}
      {Array.from({ length: fillSegments }).map((_, i) => {
        const segmentOpacity = i < completedSegments ? 1 : 
          i === completedSegments ? segmentProgress : 0;
        
        const segmentRatio = i / fillSegments;
        const segmentColor = segmentRatio < 0.5 
          ? '#3b82f6'
          : segmentRatio < 0.8 
          ? '#8b5cf6' 
          : '#10b981';
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: segmentOpacity * pulse,
              maskImage: `linear-gradient(to top, 
                transparent ${(fillSegments - i - 1) * (100 / fillSegments)}%, 
                black ${(fillSegments - i - 1) * (100 / fillSegments)}%, 
                black ${(fillSegments - i) * (100 / fillSegments)}%, 
                transparent ${(fillSegments - i) * (100 / fillSegments)}%)`,
              WebkitMaskImage: `linear-gradient(to top, 
                transparent ${(fillSegments - i - 1) * (100 / fillSegments)}%, 
                black ${(fillSegments - i - 1) * (100 / fillSegments)}%, 
                black ${(fillSegments - i) * (100 / fillSegments)}%, 
                transparent ${(fillSegments - i) * (100 / fillSegments)}%)`,
            }}
          >
            <Brain size={size} color={segmentColor} strokeWidth={2} />
          </div>
        );
      })}
      
      {/* Neural connection particles */}
      {progress > 0.1 && Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            top: `${20 + i * 20}%`,
            left: `${30 + i * 15}%`,
            width: '4px',
            height: '4px',
            background: '#60a5fa',
            borderRadius: '50%',
            opacity: Math.sin((frame - delay + i * 20) * 0.1) * 0.6 + 0.4,
            transform: `translate(${Math.sin((frame - delay + i * 30) * 0.05) * 3}px, ${Math.cos((frame - delay + i * 40) * 0.04) * 2}px)`,
          }}
        />
      ))}
    </div>
  );
};

// Kinetic Typography Component
export const KineticText: React.FC<{
  text: string;
  delay: number;
  duration: number;
  style?: React.CSSProperties;
  animationType?: 'typewriter' | 'wave' | 'reveal' | 'morph';
}> = ({ text, delay, duration, style, animationType = 'reveal' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  if (frame < delay || frame > delay + duration) return null;
  
  const progress = (frame - delay) / duration;
  
  const renderTypewriter = () => {
    const visibleChars = Math.floor(progress * text.length);
    return (
      <span style={style}>
        {text.slice(0, visibleChars)}
        <span style={{ 
          opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
          borderRight: '2px solid currentColor',
          marginLeft: '2px'
        }}>‌</span>
      </span>
    );
  };
  
  const renderWave = () => {
    return (
      <span style={style}>
        {text.split('').map((char, i) => {
          const charDelay = i * 2;
          const charProgress = Math.max(0, Math.min(1, (frame - delay - charDelay) / 20));
          const waveOffset = Math.sin((frame - delay) * 0.2 + i * 0.3) * 3;
          
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                transform: `translateY(${interpolate(charProgress, [0, 1], [20, waveOffset], {
                  easing: easings.smooth
                })}px)`,
                opacity: interpolate(charProgress, [0, 0.5, 1], [0, 1, 1]),
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </span>
    );
  };
  
  const renderReveal = () => {
    const slideProgress = interpolate(progress, [0, 1], [0, 1], { easing: easings.organic });
    
    return (
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <span 
          style={{
            ...style,
            transform: `translateY(${interpolate(slideProgress, [0, 1], [30, 0])}px)`,
            opacity: slideProgress,
          }}
        >
          {text}
        </span>
      </div>
    );
  };
  
  switch (animationType) {
    case 'typewriter': return renderTypewriter();
    case 'wave': return renderWave();
    case 'reveal': return renderReveal();
    default: return renderReveal();
  }
};

// Data Flow Visualization
export const DataFlowChain: React.FC<{
  steps: Array<{ label: string; color: string; icon?: React.ReactNode }>;
  delay: number;
  duration: number;
}> = ({ steps, delay, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  if (frame < delay || frame > delay + duration) return null;
  
  const totalProgress = (frame - delay) / duration;
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      perspective: '1000px',
    }}>
      {steps.map((step, index) => {
        const stepDelay = index * 30;
        const stepProgress = Math.max(0, Math.min(1, (frame - delay - stepDelay) / 60));
        
        const entrance = spring({
          frame: frame - delay - stepDelay,
          fps,
          config: springs.bouncy,
        });
        
        const pulse = 1 + Math.sin((frame - delay) * 0.1 + index) * 0.05;
        
        return (
          <React.Fragment key={index}>
            {/* Step Node */}
            <div
              style={{
                position: 'relative',
                transform: `scale(${entrance * pulse}) rotateY(${interpolate(entrance, [0, 1], [90, 0])}deg)`,
                opacity: stepProgress,
              }}
            >
              {/* Glow Effect */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120px',
                  height: '120px',
                  background: `radial-gradient(circle, ${step.color}30 0%, transparent 70%)`,
                  borderRadius: '50%',
                  filter: 'blur(10px)',
                  animation: `pulse 2s ease-in-out infinite`,
                }}
              />
              
              {/* Main Node */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${step.color}, ${step.color}CC)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 10px 30px ${step.color}50`,
                  border: `3px solid ${step.color}80`,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {step.icon || (
                  <span style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '700'
                  }}>
                    {index + 1}
                  </span>
                )}
              </div>
              
              {/* Label */}
              <KineticText
                text={step.label}
                delay={delay + stepDelay + 30}
                duration={60}
                style={{
                  position: 'absolute',
                  top: '100px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              />
            </div>
            
            {/* Flow Arrow */}
            {index < steps.length - 1 && (
              <div
                style={{
                  position: 'relative',
                  width: '60px',
                  height: '4px',
                  overflow: 'hidden',
                }}
              >
                {/* Arrow Base */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, #64748b, transparent)',
                    opacity: interpolate(frame, [delay + stepDelay + 45, delay + stepDelay + 75], [0, 1]),
                  }}
                />
                
                {/* Flowing Data Particles */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: `${((frame - delay - stepDelay - i * 10) * 2) % 120 - 10}%`,
                      transform: 'translateY(-50%)',
                      width: '4px',
                      height: '4px',
                      background: steps[index].color,
                      borderRadius: '50%',
                      opacity: interpolate(frame, [delay + stepDelay + 60, delay + stepDelay + 90], [0, 0.8]),
                      boxShadow: `0 0 6px ${steps[index].color}`,
                    }}
                  />
                ))}
                
                {/* Arrow Head */}
                <ArrowRight
                  size={16}
                  color="#64748b"
                  style={{
                    position: 'absolute',
                    right: '-6px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: interpolate(frame, [delay + stepDelay + 45, delay + stepDelay + 75], [0, 1]),
                  }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Enhanced Code Block with Syntax Highlighting Animation
export const AnimatedCodeBlock: React.FC<{
  code: string;
  delay: number;
  duration: number;
  language?: string;
}> = ({ code, delay, duration, language = 'javascript' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  if (frame < delay || frame > delay + duration) return null;
  
  const lines = code.split('\n');
  const totalProgress = (frame - delay) / duration;
  
  // Syntax highlighting patterns (simplified)
  const highlightPatterns = {
    keyword: /(const|let|var|function|async|await|if|else|for|while|return|import|export)/g,
    string: /(["'`].*?["'`])/g,
    comment: /(\/\/.*|\/\*[\s\S]*?\*\/)/g,
    function: /(\w+)(?=\()/g,
  };
  
  const applyHighlighting = (text: string) => {
    let highlighted = text;
    
    // Apply highlighting (simplified for demo)
    highlighted = highlighted.replace(highlightPatterns.keyword, '<span style="color: #8b5cf6;">$1</span>');
    highlighted = highlighted.replace(highlightPatterns.string, '<span style="color: #10b981;">$1</span>');
    highlighted = highlighted.replace(highlightPatterns.comment, '<span style="color: #6b7280;">$1</span>');
    
    return highlighted;
  };
  
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))',
        borderRadius: '16px',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        padding: '24px',
        fontFamily: 'JetBrains Mono, Monaco, monospace',
        fontSize: '14px',
        lineHeight: '1.6',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${20 + i * 15}%`,
            right: `${-10 + Math.sin((frame + i * 50) * 0.02) * 5}%`,
            width: '2px',
            height: '2px',
            background: '#3b82f6',
            borderRadius: '50%',
            opacity: 0.3,
          }}
        />
      ))}
      
      {/* Code Lines */}
      {lines.map((line, i) => {
        const lineDelay = i * 10;
        const lineProgress = Math.max(0, Math.min(1, (frame - delay - lineDelay) / 60));
        
        return (
          <div
            key={i}
            style={{
              transform: `translateX(${interpolate(lineProgress, [0, 1], [-20, 0])}px)`,
              opacity: interpolate(lineProgress, [0, 0.5, 1], [0, 0.7, 1]),
              marginBottom: '4px',
            }}
          >
            <span style={{ color: '#6b7280', marginRight: '16px', userSelect: 'none' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              style={{ color: '#e5e7eb' }}
              dangerouslySetInnerHTML={{ __html: applyHighlighting(line) }}
            />
          </div>
        );
      })}
      
      {/* Terminal Cursor */}
      <span
        style={{
          display: 'inline-block',
          width: '8px',
          height: '18px',
          background: '#3b82f6',
          marginLeft: '4px',
          opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0,
        }}
      />
    </div>
  );
};