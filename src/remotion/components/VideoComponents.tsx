import React from 'react';
import { 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
  Audio, 
  Sequence,
  staticFile
} from 'remotion';
import { Brain, Volume2 } from 'lucide-react';

// Custom Progress Brain Component with fill effect
export const ProgressBrain: React.FC<{ 
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

export const AnimatedStep: React.FC<StepProps> = ({ 
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

// Audio narration sequence component with improved loading
export const AudioNarrationSequence: React.FC<{ 
  segment: NarrationSegment; 
  audioPath?: string; 
}> = ({ segment, audioPath = '/audio/cot/' }) => {
  const frame = useCurrentFrame();
  
  if (frame < segment.startFrame || frame > segment.endFrame) return null;
  
  // Construct proper audio path - convert wav to mp3 for better browser support
  const audioFilename = segment.filename.replace('.wav', '.mp3');
  // Clean the audioPath to get just the technique (cod, cot, etc.)
  const technique = audioPath.replace(/^\/+audio\/+|\/+$/g, '');
  const audioSrc = staticFile(`audio/${technique}/${audioFilename}`);
  
  console.log(`🎵 Loading audio: ${audioSrc} for segment ${segment.id}`);
  
  return (
    <Sequence from={segment.startFrame} durationInFrames={segment.endFrame - segment.startFrame}>
      <Audio 
        src={audioSrc}
        volume={0.7}
        startFrom={0}
        endAt={segment.endFrame - segment.startFrame}
      />
    </Sequence>
  );
};

// Enhanced narration text overlay component (fallback when audio has issues)
export const NarrationOverlay: React.FC<{ segment: NarrationSegment }> = ({ segment }) => {
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

// Video Background Component
export const VideoBackground: React.FC = () => (
  <>
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
  </>
);

// Watermark Component
export const Watermark: React.FC<{ brainProgress: number }> = ({ brainProgress }) => (
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
); 