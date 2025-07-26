import React, { useState, useEffect } from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
  Easing
} from 'remotion';
import { 
  Users, 
  MessageCircle, 
  Scale, 
  CheckCircle, 
  Lightbulb, 
  Target, 
  Code, 
  Zap, 
  ArrowRight,
  User,
  UserX,
  TrendingUp
} from 'lucide-react';
import DynamicTimingService from '../services/DynamicTimingService';
import { 
  ProgressBrain, 
  AnimatedStep, 
  AudioNarrationSequence, 
  NarrationOverlay,
  VideoBackground,
  Watermark
} from '../components/VideoComponents';

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

// Enhanced perspective comparison component for debate viewpoints
const PerspectiveComparison: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
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
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '20px',
      marginBottom: '40px',
    }}>
      {/* Advocate Perspective */}
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
          <User size={24} color="#10b981" style={{ marginRight: '12px' }} />
          <h3 style={{ 
            color: '#10b981', 
            fontSize: '18px', 
            margin: 0,
            fontWeight: '700'
          }}>
            Advocate
          </h3>
        </div>
        <div style={{
          color: '#34d399',
          fontSize: '14px',
          margin: '0 0 16px 0',
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: '1.6',
        }}>
          <strong>"Microservices enable scaling and independence."</strong>
          <br/><br/>
          • Independent deployment
          <br/>
          • Technology diversity  
          <br/>
          • Fault isolation
          <br/>
          • Team autonomy
        </div>
        <div style={{
          padding: '12px',
          background: 'rgba(16, 185, 129, 0.2)',
          borderRadius: '8px',
          color: '#10b981',
          fontSize: '12px'
        }}>
          ✅ Strong scalability argument
        </div>
      </div>

      {/* Skeptic Perspective */}
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
          <UserX size={24} color="#ef4444" style={{ marginRight: '12px' }} />
          <h3 style={{ 
            color: '#ef4444', 
            fontSize: '18px', 
            margin: 0,
            fontWeight: '700'
          }}>
            Skeptic
          </h3>
        </div>
        <div style={{
          color: '#fca5a5',
          fontSize: '14px',
          margin: '0 0 16px 0',
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: '1.6',
        }}>
          <strong>"Complex for startups with overhead."</strong>
          <br/><br/>
          • Operational complexity
          <br/>
          • Network latency issues
          <br/>
          • Distributed debugging
          <br/>
          • Resource overhead
        </div>
        <div style={{
          padding: '12px',
          background: 'rgba(239, 68, 68, 0.2)',
          borderRadius: '8px',
          color: '#f87171',
          fontSize: '12px'
        }}>
          ⚠️ Valid complexity concerns
        </div>
      </div>

      {/* Analyst Perspective */}
      <div style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(109, 40, 217, 0.1))',
        borderRadius: '16px',
        border: '2px solid rgba(124, 58, 237, 0.3)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '16px' 
        }}>
          <TrendingUp size={24} color="#7c3aed" style={{ marginRight: '12px' }} />
          <h3 style={{ 
            color: '#7c3aed', 
            fontSize: '18px', 
            margin: 0,
            fontWeight: '700'
          }}>
            Analyst
          </h3>
        </div>
        <div style={{
          color: '#c4b5fd',
          fontSize: '14px',
          margin: '0 0 16px 0',
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: '1.6',
        }}>
          <strong>"Depends on context and team size."</strong>
          <br/><br/>
          • Team size matters
          <br/>
          • Growth projections
          <br/>
          • Migration strategy
          <br/>
          • Hybrid approaches
        </div>
        <div style={{
          padding: '12px',
          background: 'rgba(124, 58, 237, 0.2)',
          borderRadius: '8px',
          color: '#a78bfa',
          fontSize: '12px'
        }}>
          🎯 Balanced perspective
        </div>
      </div>
    </div>
  );
};

// Debate flow visualization component
const DebateFlow: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
      marginBottom: '32px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
      }}>
        {/* Round indicators */}
        {[1, 2, 3].map((round, index) => (
          <div key={round} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${
                round === 1 ? '#10b981' : round === 2 ? '#f59e0b' : '#8b5cf6'
              }, ${
                round === 1 ? '#059669' : round === 2 ? '#d97706' : '#7c3aed'
              })`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '24px',
              boxShadow: `0 8px 24px ${
                round === 1 ? '#10b98140' : round === 2 ? '#f59e0b40' : '#8b5cf640'
              }`,
            }}>
              {round}
            </div>
            <div style={{
              color: '#e5e7eb',
              fontSize: '16px',
              fontWeight: '600',
              textAlign: 'center',
            }}>
              {round === 1 ? 'Initial\nArguments' : round === 2 ? 'Counter\nArguments' : 'Synthesis\n& Decision'}
            </div>
            {index < 2 && (
              <div style={{
                position: 'absolute',
                left: `${(index + 1) * 120 + 40}px`,
                top: '40px',
                width: '40px',
                height: '2px',
                background: '#6b7280',
                transform: 'translateX(-50%)',
              }}>
                <ArrowRight 
                  size={20} 
                  color="#6b7280" 
                  style={{
                    position: 'absolute',
                    right: '-10px',
                    top: '-9px',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ChainOfDebatesVideoWithAudio: React.FC = () => {
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
        await timingService.loadTimingConfig('/audio/cod/');
        
        const segments = timingService.getNarrationSegments();
        const visualElements = timingService.getVisualElementTiming('perspectiveComparison');
        
        if (segments) {
          setNarrationSegments(segments.map(seg => ({
            ...seg,
            highlight: seg.id === 'intro' || seg.id === 'conclusion'
          })));
        }
        
        setVisualTiming({
          perspectiveComparison: visualElements || { startFrame: 450, duration: 400 },
          steps: [
            { startFrame: 380, duration: 320 },
            { startFrame: 750, duration: 350 },
            { startFrame: 1150, duration: 350 },
            { startFrame: 1550, duration: 350 }
          ]
        });
      } catch (error) {
        console.warn('Using fallback timing:', error);
        // Fallback timing if dynamic loading fails
        setNarrationSegments([
          { 
            id: 'intro', 
            text: 'Chain of Debates revolutionizes AI decision-making by bringing multiple perspectives together to collaborate, argue, and reach better conclusions.', 
            startFrame: 60, 
            endFrame: 360, 
            filename: 'cod-intro.wav', 
            duration: 10, 
            durationFrames: 300,
            highlight: true
          },
        ]);
        setVisualTiming({
          perspectiveComparison: { startFrame: 450, duration: 400 },
          steps: [
            { startFrame: 380, duration: 320 },
            { startFrame: 750, duration: 350 },
            { startFrame: 1150, duration: 350 },
            { startFrame: 1550, duration: 350 }
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
    ? interpolate(frame, [0, (narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2300) + 100], [0, 1], {
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
        <AudioNarrationSequence key={`audio-${index}`} segment={segment} audioPath="/audio/cod/" />
      ))}
      
      {/* Visual Narration Overlays as backup */}
      {narrationSegments.map((segment, index) => (
        <NarrationOverlay key={`text-${index}`} segment={segment} />
      ))}
      
      <VideoBackground />
      
      <Watermark brainProgress={brainProgress} />
      
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
            background: 'linear-gradient(135deg, #f59e0b, #ef4444, #7c3aed)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.025em',
          }}>
            Chain of Debates
          </h1>
          <p style={{
            fontSize: '24px',
            color: '#94a3b8',
            margin: 0,
            fontWeight: '500',
            letterSpacing: '0.025em'
          }}>
            Collaborative AI Decision Making
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
              <Users size={28} color="#f59e0b" />
              <span style={{
                fontSize: '18px',
                color: '#f59e0b',
                fontWeight: '600',
                letterSpacing: '0.05em',
              }}>
                COLLABORATIVE AI REASONING
              </span>
            </div>
            
            <h2 style={{
              fontSize: '28px',
              color: 'white',
              margin: '0 0 16px 0',
              fontWeight: '700',
              lineHeight: '1.2',
            }}>
              Multiple Perspectives, Better Decisions
            </h2>
            
            <p style={{
              fontSize: '16px',
              color: '#94a3b8',
              margin: 0,
              maxWidth: '600px',
              lineHeight: '1.5',
            }}>
              Watch how multiple AI agents debate, challenge assumptions, and reach superior conclusions through structured dialogue
            </p>
          </div>
        )}
        
        {/* Content during 'intro' segment - Key benefits overview */}
        {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'intro')?.startFrame || 60) && 
         frame <= (narrationSegments.find(s => s.id === 'intro')?.endFrame || 360) && (
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
              <Users size={48} style={{ marginBottom: '16px' }} />
              <p style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Multi-Perspective Analysis</p>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>Diverse viewpoints and arguments</p>
            </div>
            <div style={{ textAlign: 'center', color: '#f59e0b', maxWidth: '250px' }}>
              <Scale size={48} style={{ marginBottom: '16px' }} />
              <p style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>30-50% Better Decisions</p>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>Proven through collaborative reasoning</p>
            </div>
            <div style={{ textAlign: 'center', color: '#8b5cf6', maxWidth: '250px' }}>
              <MessageCircle size={48} style={{ marginBottom: '16px' }} />
              <p style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Structured Debate</p>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>Peer review and refinement</p>
            </div>
          </div>
        )}
        
        {/* Content during 'perspectives' segment - Multi-agent setup */}
        {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'perspectives')?.startFrame || 400) && 
         frame <= (narrationSegments.find(s => s.id === 'perspectives')?.endFrame || 700) && (
          <AnimatedStep
            step={1}
            title="Multi-Agent Perspectives"
            content="Assign different AI agents specific viewpoints to argue from. Each brings unique expertise and challenges the others' assumptions."
            code={`// Initialize debate participants
const debateAgents = [
  {
    role: "advocate",
    perspective: "Pro-microservices",
    expertise: ["scalability", "independence", "modularity"]
  },
  {
    role: "skeptic", 
    perspective: "Anti-microservices",
    expertise: ["complexity", "operations", "cost"]
  },
  {
    role: "analyst",
    perspective: "Context-dependent", 
    expertise: ["analysis", "trade-offs", "strategy"]
  }
];

// Present the problem to all agents
const problem = "Should our startup adopt microservices?";
const initialArguments = await Promise.all(
  debateAgents.map(agent => agent.presentArgument(problem))
);`}
            delay={narrationSegments.find(s => s.id === 'perspectives')?.startFrame || 400}
            duration={narrationSegments.find(s => s.id === 'perspectives')?.durationFrames || 300}
            icon={<Users size={24} />}
            color="#10b981"
          />
        )}
        
        {/* Content during 'debate' segment - Perspective comparison */}
        {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'debate')?.startFrame || 800) && 
         frame <= (narrationSegments.find(s => s.id === 'debate')?.endFrame || 1100) && (
          <PerspectiveComparison 
            delay={narrationSegments.find(s => s.id === 'debate')?.startFrame || 800} 
            duration={narrationSegments.find(s => s.id === 'debate')?.durationFrames || 300} 
          />
        )}
        
        {/* Content during 'collaboration' segment - Debate flow */}
        {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'collaboration')?.startFrame || 1200) && 
         frame <= (narrationSegments.find(s => s.id === 'collaboration')?.endFrame || 1500) && (
          <AnimatedStep
            step={2}
            title="Collaborative Reasoning"
            content="Watch perspectives challenge each other through structured rounds. Biases are exposed, assumptions questioned, and reasoning refined through peer review."
            result={`Round 1: Initial positions presented
• Advocate: "Microservices enable independent scaling"
• Skeptic: "Operational complexity outweighs benefits"  
• Analyst: "Context matters - team size, growth rate"

Round 2: Cross-examination and challenges
• Each perspective counters others' arguments
• Hidden assumptions are revealed
• Edge cases are identified

Round 3: Synthesis and refinement
• Positions evolve based on valid counterpoints
• Common ground is identified
• Nuanced conclusions emerge`}
            delay={narrationSegments.find(s => s.id === 'collaboration')?.startFrame || 1200}
            duration={narrationSegments.find(s => s.id === 'collaboration')?.durationFrames || 300}
            icon={<MessageCircle size={24} />}
            color="#f59e0b"
          />
        )}
        
        {/* Content during 'synthesis' segment - Moderation and decision */}
        {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'synthesis')?.startFrame || 1600) && 
         frame <= (narrationSegments.find(s => s.id === 'synthesis')?.endFrame || 1900) && (
          <AnimatedStep
            step={3}
            title="Synthesis & Moderation"
            content="A moderator analyzes all perspectives, identifies key decision factors, and synthesizes the debate into a comprehensive, well-reasoned conclusion."
            code={`// Moderator synthesis process
const moderator = new DebateModerator();

// Analyze all perspectives and arguments
const synthesis = await moderator.synthesize({
  arguments: debateHistory,
  criteria: ["feasibility", "scalability", "complexity", "cost"],
  context: { teamSize: 8, timeline: "6 months", budget: "medium" }
});

// Generate final recommendation
const decision = synthesis.generateDecision();

// Final recommendation with conditions:
// "For teams <10: Start with monolith, plan migration"
// "For rapid scaling: Microservices with DevOps investment" 
// "For uncertain growth: Hybrid approach with service boundaries"`}
            delay={narrationSegments.find(s => s.id === 'synthesis')?.startFrame || 1600}
            duration={narrationSegments.find(s => s.id === 'synthesis')?.durationFrames || 300}
            icon={<Scale size={24} />}
            color="#8b5cf6"
          />
        )}
        
        {/* Content during 'conclusion' segment - Final benefits */}
        {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'conclusion')?.startFrame || 2000) && 
         frame <= (narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2300) && (
          <AnimatedStep
            step={4}
            title="Superior Decision Quality"
            content="Chain of Debates delivers 30-50% better decision quality by leveraging collective intelligence, reducing biases, and ensuring comprehensive analysis through structured collaboration."
            result={`Key Benefits:
✓ Reduces individual model bias through peer review
✓ Exposes hidden assumptions and edge cases  
✓ Provides comprehensive multi-angle analysis
✓ Increases confidence through structured validation
✓ Mirrors effective human collaborative processes

Best Use Cases:
• Strategic business decisions
• Complex ethical dilemmas  
• Technical architecture choices
• Policy analysis and planning
• Research and validation tasks`}
            delay={narrationSegments.find(s => s.id === 'conclusion')?.startFrame || 2000}
            duration={narrationSegments.find(s => s.id === 'conclusion')?.durationFrames || 300}
            icon={<Target size={24} />}
            color="#7c3aed"
          />
        )}
        
      </div>
      
      {/* Enhanced benefits section - appears after conclusion narration */}
      {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2300) + 30 && (
        <div style={{
          opacity: interpolate(frame, [(narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2300) + 30, (narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2300) + 70], [0, 1], { extrapolateRight: 'clamp' }),
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
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>30-50% Better Quality</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>Collaborative decisions</p>
          </div>
          <div style={{ textAlign: 'center', color: '#f59e0b', maxWidth: '200px' }}>
            <Scale size={40} style={{ marginBottom: '12px' }} />
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Reduces Bias</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>Multiple perspectives</p>
          </div>
          <div style={{ textAlign: 'center', color: '#8b5cf6', maxWidth: '200px' }}>
            <Lightbulb size={40} style={{ marginBottom: '12px' }} />
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Reveals Edge Cases</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>Comprehensive analysis</p>
          </div>
          <div style={{ textAlign: 'center', color: '#06b6d4', maxWidth: '200px' }}>
            <Users size={40} style={{ marginBottom: '12px' }} />
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Structured Process</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>Proven methodology</p>
          </div>
        </div>
      )}

      {/* Final call-to-action that holds at the end */}
      {isTimingLoaded && narrationSegments.length > 0 && frame >= (narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2300) + 100 && (
        <div style={{
          opacity: interpolate(frame, [(narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2300) + 100, (narrationSegments.find(s => s.id === 'conclusion')?.endFrame || 2300) + 140], [0, 1], { extrapolateRight: 'clamp' }),
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 10,
        }}>
          <div style={{
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444, #7c3aed)',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)',
          }}>
            <p style={{
              color: 'white',
              fontSize: '18px',
              margin: 0,
              fontWeight: '600',
              letterSpacing: '0.025em'
            }}>
              Start using Chain of Debates for better AI decisions!
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
}; 