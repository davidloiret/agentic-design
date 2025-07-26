import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  interpolate, 
  Easing,
  spring,
  useVideoConfig,
  Audio,
  Sequence
} from 'remotion';
import { Brain, ArrowDown, CheckCircle, Lightbulb, Volume2, Calculator, TrendingUp, AlertTriangle, Target, Code, Zap, ArrowRight } from 'lucide-react';

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
  text: string;
  startFrame: number;
  endFrame: number;
  highlight?: boolean;
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

// Enhanced narration overlay component
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

export const ChainOfThoughtVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Enhanced narration script focusing on practical implementation
  const narrationSegments: NarrationSegment[] = [
    {
      text: "Chain of Thought reasoning transforms how AI solves complex problems - and it's surprisingly simple to implement.",
      startFrame: 60,
      endFrame: 331,
      highlight: true
    },
    {
      text: "For engineers, implementing CoT is as easy as adding 'Let's think step by step' to your prompts.",
      startFrame: 391,
      endFrame: 621
    },
    {
      text: "Let's see the dramatic difference between regular prompts and Chain of Thought prompts in action.",
      startFrame: 681,
      endFrame: 914
    },
    {
      text: "Regular prompts give you direct answers with no reasoning - you can't verify or understand the process.",
      startFrame: 974,
      endFrame: 1221
    },
    {
      text: "Chain of Thought prompts unlock the model's reasoning ability - just add the magic phrase and watch it think.",
      startFrame: 1281,
      endFrame: 1543
    },
    {
      text: "The model automatically breaks down complex problems into clear, verifiable steps - no additional coding required.",
      startFrame: 1603,
      endFrame: 1877
    },
    {
      text: "This simple technique delivers 40-70% accuracy improvements and complete transparency in AI decision-making.",
      startFrame: 1937,
      endFrame: 2196,
      highlight: true
    }
  ];
  
  // Enhanced title animation
  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 200,
    },
  });
  
  const titleOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  // Brain icon rotation with easing
  const brainRotation = interpolate(frame, [0, 900], [0, 720], {
    easing: Easing.out(Easing.cubic),
  });
  
  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 100%)',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '80px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Background ambient sound placeholder */}
      <Audio 
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEeCD2R1/LNe" 
        volume={0.05}
      />
      
      {/* Enhanced narration overlays */}
      {narrationSegments.map((segment, index) => (
        <NarrationOverlay key={index} segment={segment} />
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
      
      {/* Enhanced title section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '60px',
        opacity: titleOpacity,
        transform: `scale(${titleScale})`,
        zIndex: 1,
      }}>
        <Brain 
          size={72} 
          color="#3b82f6" 
          style={{ 
            marginRight: '24px',
            transform: `rotate(${brainRotation}deg)`,
            filter: 'drop-shadow(0 8px 16px rgba(59, 130, 246, 0.3))',
          }} 
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
      
      {/* Prompt Comparison */}
      {frame >= 650 && (
        <PromptComparison delay={650} duration={300} />
      )}
      
      {/* Implementation steps container */}
      <div style={{ 
        flex: 1,
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        
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
          delay={1250}
          duration={300}
          icon={<Code size={24} />}
          color="#3b82f6"
        />
        
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
          delay={1570}
          duration={300}
          icon={<Zap size={24} />}
          color="#10b981"
        />
        
        <AnimatedStep
          step={3}
          title="Production-Ready Patterns"
          content="Use different CoT triggers for various scenarios. The model adapts its reasoning style to your specific needs."
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
          delay={1900}
          duration={300}
          icon={<Target size={24} />}
          color="#8b5cf6"
        />
      </div>
      
      {/* Enhanced benefits section */}
      {frame >= 2000 && (
        <div style={{
          opacity: interpolate(frame, [2000, 2040], [0, 1], { extrapolateRight: 'clamp' }),
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: '60px',
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
      {frame >= 2220 && (
        <div style={{
          opacity: interpolate(frame, [2220, 2260], [0, 1], { extrapolateRight: 'clamp' }),
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