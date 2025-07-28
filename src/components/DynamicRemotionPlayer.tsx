import React, { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { ChainOfThoughtVideo } from '../remotion/compositions/ChainOfThoughtVideo';
import { ChainOfThoughtVideoWithAudio } from '../remotion/compositions/ChainOfThoughtVideoWithAudio';
import { ChainOfDebatesVideoWithAudio } from '../remotion/compositions/ChainOfDebatesVideoWithAudio';
import { SequentialChainingVideoWithAudio } from '../remotion/compositions/SequentialChainingVideoWithAudio';
import { ProfessionalSequentialChainingVideo } from '../remotion/compositions/ProfessionalSequentialChainingVideo';
import DynamicTimingService from '../remotion/services/DynamicTimingService';
import { loadTimingConfig } from '../remotion/services/TimingConfigService';
import { Brain, Zap, Code, Users } from 'lucide-react';

// Add CSS animation for spinner
const spinAnimation = {
  animation: 'spin 1s linear infinite',
};

// Add the keyframes as a style element (client-side only)
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const existingStyle = document.getElementById('remotion-player-spin');
  if (!existingStyle) {
    const style = document.createElement('style');
    style.id = 'remotion-player-spin';
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

interface DynamicRemotionPlayerProps {
  compositionId: string;
  audioPath?: string;
}

const ErrorFallback = () => (
  <div className="p-6">
    <div className="text-center">
      <div className="text-orange-400 mb-2">📹</div>
      <h3 className="text-lg font-medium text-gray-300 mb-2">Video Player Unavailable</h3>
      <p className="text-gray-400 text-sm">
        The interactive video explanation is currently unavailable.
        Please refer to the text explanation below.
      </p>
    </div>
  </div>
);

// Static poster component that matches our opening frame exactly
const VideoPoster = ({ isLoading, compositionId }: { isLoading: boolean; compositionId: string }) => {
  const isChainOfDebates = compositionId === 'ChainOfDebatesWithAudio';
  const isSequentialChaining = compositionId === 'SequentialChainingWithAudio';

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 100%)',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '80px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      aspectRatio: '16/9',
    }}>
      {/* Background pattern */}
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

      {/* Title section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '60px',
        zIndex: 1,
      }}>
        <Brain
          size={72}
          color="rgba(59, 130, 246, 0.9)"
          style={{
            marginRight: '24px',
            filter: 'drop-shadow(0 12px 20px rgba(59, 130, 246, 0.4)) brightness(1.1)',
            transform: 'scale(1.02)',
          }}
        />
        <div>
          <h1 style={{
            fontSize: '56px',
            margin: '0 0 8px 0',
            fontWeight: '800',
            backgroundImage: isChainOfDebates
              ? 'linear-gradient(135deg, #f59e0b, #ef4444, #7c3aed)'
              : isSequentialChaining
              ? 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)'
              : 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.025em',
          }}>
            {isChainOfDebates ? 'Chain of Debates' : isSequentialChaining ? 'Sequential Chaining' : 'Chain of Thought'}
          </h1>
          <p style={{
            fontSize: '24px',
            color: '#94a3b8',
            margin: 0,
            fontWeight: '500',
            letterSpacing: '0.025em'
          }}>
            {isChainOfDebates ? 'Collaborative AI Decision Making' : isSequentialChaining ? 'Building Reliable AI Pipelines' : 'Transparent AI Reasoning for Engineers'}
          </p>
        </div>
      </div>

      {/* Opening teaser content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px',
        background: 'rgba(15, 23, 42, 0.9)',
        borderRadius: '24px',
        border: '2px solid rgba(59, 130, 246, 0.3)',
        backdropFilter: 'blur(12px)',
        maxWidth: '900px',
        margin: '0 auto',
        zIndex: 1,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
        }}>
          {isChainOfDebates ? (
            <Users size={32} color="#f59e0b" style={{ marginRight: '12px' }} />
          ) : isSequentialChaining ? (
            <div style={{ marginRight: '12px', fontSize: '32px' }}>🔗</div>
          ) : (
            <Zap size={32} color="#f59e0b" style={{ marginRight: '12px' }} />
          )}
          <span style={{
            fontSize: '20px',
            color: '#f59e0b',
            fontWeight: '600',
            letterSpacing: '0.05em',
          }}>
            {isChainOfDebates ? 'COLLABORATIVE AI REASONING' : isSequentialChaining ? 'PROMPT CHAINING PATTERN' : 'ENGINEERING BREAKTHROUGH'}
          </span>
        </div>

        <h2 style={{
          fontSize: '32px',
          color: 'white',
          margin: '0 0 20px 0',
          fontWeight: '700',
          lineHeight: '1.2',
        }}>
          {isChainOfDebates
            ? 'Multiple Perspectives, Better Decisions'
            : isSequentialChaining
            ? 'Break Complex Tasks Into Manageable Steps'
            : 'Transform AI Reasoning with One Simple Line'}
        </h2>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '24px',
          padding: '16px 24px',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
        }}>
          <Code size={24} color="#3b82f6" />
          <code style={{
            fontSize: '16px',
            color: '#3b82f6',
            fontFamily: 'Monaco, monospace',
            fontWeight: '600',
          }}>
            {isChainOfDebates
              ? 'chainOfDebates(problem, ["advocate", "skeptic", "analyst"])'
              : isSequentialChaining
              ? 'output1 → input2 → output2 → input3 → final'
              : '"Let\'s think step by step."'}
          </code>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          flexWrap: 'wrap',
        }}>
          {isChainOfDebates ? (
            <>
              <div style={{ textAlign: 'center', color: '#10b981' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>50%</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Better Decisions</div>
              </div>
              <div style={{ textAlign: 'center', color: '#f59e0b' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>3</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Perspectives</div>
              </div>
              <div style={{ textAlign: 'center', color: '#8b5cf6' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>100%</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Bias Reduction</div>
              </div>
            </>
          ) : isSequentialChaining ? (
            <>
              <div style={{ textAlign: 'center', color: '#10b981' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>∞</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Scalable Steps</div>
              </div>
              <div style={{ textAlign: 'center', color: '#3b82f6' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>100%</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Transparency</div>
              </div>
              <div style={{ textAlign: 'center', color: '#8b5cf6' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>0</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Extra Complexity</div>
              </div>
            </>
          ) : (
            <>
              <div style={{ textAlign: 'center', color: '#10b981' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>70%</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Better Accuracy</div>
              </div>
              <div style={{ textAlign: 'center', color: '#3b82f6' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>0</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Extra Code</div>
              </div>
              <div style={{ textAlign: 'center', color: '#8b5cf6' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>100%</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Transparency</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Watermark */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '30px',
        zIndex: 50,
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
          <Brain size={16} color="rgba(59, 130, 246, 0.8)" />
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

      {/* Loading indicator overlay */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          background: 'rgba(15, 23, 42, 0.9)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: '#94a3b8',
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              border: '3px solid rgba(59, 130, 246, 0.3)',
              borderTop: '3px solid #3b82f6',
              borderRadius: '50%',
              ...spinAnimation,
            }} />
            <span>Loading video...</span>
          </div>
        </div>
      )}

      {/* Play button overlay when loaded */}
      {!isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          width: '80px',
          height: '80px',
          background: 'rgba(59, 130, 246, 0.9)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '3px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
          transition: 'transform 0.2s ease',
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
          }}>
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '20px solid white',
            borderTop: '12px solid transparent',
            borderBottom: '12px solid transparent',
            marginLeft: '4px',
          }} />
        </div>
      )}
    </div>
  );
};

const DynamicRemotionPlayer: React.FC<DynamicRemotionPlayerProps> = ({
  compositionId,
  audioPath = '/audio/cot/'
}) => {
  const [hasError, setHasError] = useState(false);
  const [duration, setDuration] = useState(900); // Default fallback, will be loaded dynamically
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const loadDynamicTiming = async () => {
      try {
        // For ProfessionalSequentialChaining, use the new TimingConfigService
        if (compositionId === 'ProfessionalSequentialChaining') {
          const patternName = audioPath.split('/').filter(Boolean)[1] || 'sequential-chaining';
          const timingConfig = await loadTimingConfig(patternName);
          const totalFrames = timingConfig.totalFrames;
          
          setDuration(totalFrames);
          setIsLoading(false);
          console.log(`📐 Sequential Chaining video duration: ${totalFrames} frames (${(totalFrames / 30).toFixed(2)}s) - AUTO-LOADED`);
          return;
        }

        // For other compositions, use DynamicTimingService
        const timingService = DynamicTimingService.getInstance();
        await timingService.loadTimingConfig(audioPath);
        const totalFrames = timingService.getTotalFrames();

        setDuration(totalFrames);
        setIsLoading(false);

        console.log(`📐 Dynamic video duration: ${totalFrames} frames (${(totalFrames / 30).toFixed(2)}s)`);
      } catch (error) {
        console.warn('Could not load dynamic timing, using fallback duration:', error);
        setDuration(900); // Fallback
        setIsLoading(false);
      }
    };

    loadDynamicTiming();
  }, [audioPath, compositionId]);

  const handlePlayClick = () => {
    setShowPlayer(true);
  };

  if (hasError) {
    return <ErrorFallback />;
  }

  // Show static poster with loading or play button
  if (!showPlayer) {
    return (
      <div
        style={{
          aspectRatio: '16/9',
          cursor: !isLoading ? 'pointer' : 'default',
        }}
        onClick={!isLoading ? handlePlayClick : undefined}
      >
        <VideoPoster isLoading={isLoading} compositionId={compositionId} />
      </div>
    );
  }

  const getComponent = () => {
    switch (compositionId) {
      case 'ChainOfThought':
        return ChainOfThoughtVideo;
      case 'ChainOfThoughtWithAudio':
        return ChainOfThoughtVideoWithAudio;
      case 'ChainOfDebatesWithAudio':
        return ChainOfDebatesVideoWithAudio;
      case 'SequentialChainingWithAudio':
        return SequentialChainingVideoWithAudio;
      case 'ProfessionalSequentialChaining':
        return ProfessionalSequentialChainingVideo;
      default:
        return ChainOfThoughtVideoWithAudio; // Default to audio version
    }
  };

  try {
    return (
      <div style={{ aspectRatio: '16/9' }}>
        <Player
          component={getComponent()}
          durationInFrames={duration}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          style={{
            width: '100%',
            height: '100%',
          }}
          controls
          autoPlay={true}
          loop={false}
          initialFrame={0}
          showPosterWhenPaused={true}
          clickToPlay={true}
        />
      </div>
    );
  } catch (error) {
    console.error('Remotion Player Error:', error);
    setHasError(true);
    return <ErrorFallback />;
  }
};

export default DynamicRemotionPlayer; 