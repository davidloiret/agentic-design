'use client';

import React, { useEffect, useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type BrainExpression = 
  | 'happy' 
  | 'sad' 
  | 'excited' 
  | 'confused' 
  | 'thinking' 
  | 'surprised' 
  | 'angry' 
  | 'sleepy' 
  | 'winking' 
  | 'neutral'
  | 'focused'
  | 'worried'
  | 'love'
  | 'dizzy'
  | 'crying'
  | 'laughing'
  | 'skeptical'
  | 'proud'
  | 'shy'
  | 'mischievous'
  | 'fighter';

export type SpeechBubbleType = 'talk' | 'think' | 'shout' | 'whisper';

export interface BrainMascotProps {
  expression?: BrainExpression;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  animate?: boolean;
  color?: 'purple' | 'blue' | 'green' | 'amber' | 'red';
  className?: string;
  onExpressionChange?: (expression: BrainExpression) => void;
  skipInitialAnimation?: boolean;
  speechText?: string;
  speechBubblePosition?: 'top' | 'bottom' | 'left' | 'right';
  speechBubbleColor?: 'white' | 'purple' | 'blue' | 'green' | 'amber' | 'red';
  speechBubbleType?: SpeechBubbleType;
}

const sizeMap = {
  tiny: { width: 32, height: 32 },
  small: { width: 80, height: 80 },
  medium: { width: 120, height: 120 },
  large: { width: 160, height: 160 }
};

const colorMap = {
  purple: {
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    accent: '#C4B5FD'
  },
  blue: {
    primary: '#3B82F6',
    secondary: '#60A5FA',
    accent: '#93C5FD'
  },
  green: {
    primary: '#10B981',
    secondary: '#34D399',
    accent: '#6EE7B7'
  },
  amber: {
    primary: '#F59E0B',
    secondary: '#FBBF24',
    accent: '#FCD34D'
  },
  red: {
    primary: '#EF4444',
    secondary: '#F87171',
    accent: '#FCA5A5'
  }
};

const speechBubbleColorMap = {
  white: {
    background: '#FFFFFF',
    text: '#1F2937'
  },
  purple: {
    background: '#F3E8FF',
    text: '#6B21A8'
  },
  blue: {
    background: '#EFF6FF',
    text: '#1E40AF'
  },
  green: {
    background: '#F0FDF4',
    text: '#166534'
  },
  amber: {
    background: '#FEF3C7',
    text: '#92400E'
  },
  red: {
    background: '#FEE2E2',
    text: '#991B1B'
  }
};

const expressionData: Record<BrainExpression, {
  leftEye: { scaleY: number; translateY: number };
  rightEye: { scaleY: number; translateY: number };
  mouth: { 
    d: string;
    scaleY?: number;
    translateY?: number;
  };
  eyebrows?: {
    left: { rotate: number; translateY: number };
    right: { rotate: number; translateY: number };
  };
  blush?: boolean;
  sparkles?: boolean;
  sweat?: boolean;
  zzz?: boolean;
  hearts?: boolean;
  tears?: boolean;
  dizzyStars?: boolean;
}> = {
  happy: {
    leftEye: { scaleY: 0.6, translateY: 2 },
    rightEye: { scaleY: 0.6, translateY: 2 },
    mouth: { d: "M 35 60 Q 50 70 65 60", scaleY: 1, translateY: 0 },
    sparkles: true
  },
  sad: {
    leftEye: { scaleY: 0.8, translateY: 3 },
    rightEye: { scaleY: 0.8, translateY: 3 },
    mouth: { d: "M 35 65 Q 50 55 65 65", scaleY: 0.8, translateY: 2 },
    eyebrows: {
      left: { rotate: 15, translateY: -2 },
      right: { rotate: -15, translateY: -2 }
    }
  },
  excited: {
    leftEye: { scaleY: 1.3, translateY: 0 },
    rightEye: { scaleY: 1.3, translateY: 0 },
    mouth: { d: "M 30 60 Q 50 75 70 60", scaleY: 1.2, translateY: 0 },
    sparkles: true,
    blush: true
  },
  confused: {
    leftEye: { scaleY: 0.9, translateY: 1 },
    rightEye: { scaleY: 0.9, translateY: 1 },
    mouth: { d: "M 40 62 Q 50 60 60 62", scaleY: 0.8, translateY: 1 },
    eyebrows: {
      left: { rotate: -10, translateY: -1 },
      right: { rotate: 20, translateY: -3 }
    }
  },
  thinking: {
    leftEye: { scaleY: 0.7, translateY: 2 },
    rightEye: { scaleY: 0.7, translateY: 2 },
    mouth: { d: "M 42 62 Q 50 60 58 62", scaleY: 0.6, translateY: 1 },
    eyebrows: {
      left: { rotate: -5, translateY: -1 },
      right: { rotate: -5, translateY: -1 }
    }
  },
  surprised: {
    leftEye: { scaleY: 1.4, translateY: -1 },
    rightEye: { scaleY: 1.4, translateY: -1 },
    mouth: { d: "M 45 60 Q 50 68 55 60", scaleY: 1.5, translateY: 0 },
    eyebrows: {
      left: { rotate: 0, translateY: -4 },
      right: { rotate: 0, translateY: -4 }
    }
  },
  angry: {
    leftEye: { scaleY: 0.5, translateY: 3 },
    rightEye: { scaleY: 0.5, translateY: 3 },
    mouth: { d: "M 35 66 Q 50 58 65 66", scaleY: 0.8, translateY: 3 },
    eyebrows: {
      left: { rotate: 25, translateY: 0 },
      right: { rotate: -25, translateY: 0 }
    }
  },
  sleepy: {
    leftEye: { scaleY: 0.3, translateY: 4 },
    rightEye: { scaleY: 0.3, translateY: 4 },
    mouth: { d: "M 42 62 Q 50 64 58 62", scaleY: 0.6, translateY: 2 },
    zzz: true
  },
  winking: {
    leftEye: { scaleY: 0.2, translateY: 4 },
    rightEye: { scaleY: 0.8, translateY: 1 },
    mouth: { d: "M 35 61 Q 50 66 65 61", scaleY: 0.9, translateY: 0 }
  },
  neutral: {
    leftEye: { scaleY: 1, translateY: 0 },
    rightEye: { scaleY: 1, translateY: 0 },
    mouth: { d: "M 42 62 L 58 62", scaleY: 1, translateY: 0 }
  },
  focused: {
    leftEye: { scaleY: 0.8, translateY: 1 },
    rightEye: { scaleY: 0.8, translateY: 1 },
    mouth: { d: "M 40 62 Q 50 60 60 62", scaleY: 0.7, translateY: 1 },
    eyebrows: {
      left: { rotate: -8, translateY: 0 },
      right: { rotate: 8, translateY: 0 }
    }
  },
  worried: {
    leftEye: { scaleY: 0.9, translateY: 2 },
    rightEye: { scaleY: 0.9, translateY: 2 },
    mouth: { d: "M 35 64 Q 50 58 65 64", scaleY: 0.7, translateY: 2 },
    eyebrows: {
      left: { rotate: 12, translateY: -1 },
      right: { rotate: -12, translateY: -1 }
    },
    sweat: true
  },
  love: {
    leftEye: { scaleY: 0.8, translateY: 1 },
    rightEye: { scaleY: 0.8, translateY: 1 },
    mouth: { d: "M 30 58 Q 50 68 70 58", scaleY: 1.1, translateY: 0 },
    hearts: true,
    blush: true
  },
  dizzy: {
    leftEye: { scaleY: 0.4, translateY: 3 },
    rightEye: { scaleY: 0.4, translateY: 3 },
    mouth: { d: "M 40 63 Q 50 60 60 63", scaleY: 0.8, translateY: 1 },
    dizzyStars: true,
    eyebrows: {
      left: { rotate: -15, translateY: 2 },
      right: { rotate: 15, translateY: 2 }
    }
  },
  crying: {
    leftEye: { scaleY: 0.5, translateY: 3 },
    rightEye: { scaleY: 0.5, translateY: 3 },
    mouth: { d: "M 35 66 Q 50 56 65 66", scaleY: 0.7, translateY: 3 },
    tears: true,
    eyebrows: {
      left: { rotate: 20, translateY: -2 },
      right: { rotate: -20, translateY: -2 }
    }
  },
  laughing: {
    leftEye: { scaleY: 0.2, translateY: 4 },
    rightEye: { scaleY: 0.2, translateY: 4 },
    mouth: { d: "M 25 58 Q 50 72 75 58", scaleY: 1.3, translateY: -1 },
    blush: true,
    sparkles: true
  },
  skeptical: {
    leftEye: { scaleY: 0.7, translateY: 2 },
    rightEye: { scaleY: 0.5, translateY: 3 },
    mouth: { d: "M 38 63 L 62 63", scaleY: 1, translateY: 1 },
    eyebrows: {
      left: { rotate: -5, translateY: 0 },
      right: { rotate: -20, translateY: -1 }
    }
  },
  proud: {
    leftEye: { scaleY: 0.7, translateY: 1 },
    rightEye: { scaleY: 0.7, translateY: 1 },
    mouth: { d: "M 40 61 Q 50 63 60 61", scaleY: 0.9, translateY: 0 },
    sparkles: true,
    eyebrows: {
      left: { rotate: -10, translateY: -1 },
      right: { rotate: 10, translateY: -1 }
    }
  },
  shy: {
    leftEye: { scaleY: 0.6, translateY: 3 },
    rightEye: { scaleY: 0.6, translateY: 3 },
    mouth: { d: "M 42 62 Q 50 60 58 62", scaleY: 0.6, translateY: 1 },
    blush: true,
    eyebrows: {
      left: { rotate: 8, translateY: 1 },
      right: { rotate: -8, translateY: 1 }
    }
  },
  mischievous: {
    leftEye: { scaleY: 0.8, translateY: 1 },
    rightEye: { scaleY: 0.4, translateY: 3 },
    mouth: { d: "M 35 60 Q 50 65 68 58", scaleY: 1, translateY: 0 },
    eyebrows: {
      left: { rotate: -15, translateY: -1 },
      right: { rotate: -25, translateY: -2 }
    }
  },
  fighter: {
    leftEye: { scaleY: 0.6, translateY: 2 },
    rightEye: { scaleY: 0.6, translateY: 2 },
    mouth: { d: "M 40 64 L 60 64", scaleY: 1, translateY: 0 },
    eyebrows: {
      left: { rotate: 20, translateY: -1 },
      right: { rotate: -20, translateY: -1 }
    },
    sparkles: true
  }
};

export const BrainMascot: React.FC<BrainMascotProps> = ({
  expression = 'neutral',
  size = 'medium',
  animate = true,
  color = 'purple',
  className = '',
  onExpressionChange,
  skipInitialAnimation = false,
  speechText,
  speechBubblePosition = 'right',
  speechBubbleColor = 'white',
  speechBubbleType = 'talk'
}) => {
  const [currentExpression, setCurrentExpression] = useState<BrainExpression>(expression);
  const [isHovering, setIsHovering] = useState(false);
  
  const dimensions = sizeMap[size];
  const colors = colorMap[color];
  const expressionConfig = expressionData[currentExpression];
  const speechColors = speechBubbleColorMap[speechBubbleColor];

  useEffect(() => {
    // Add a small delay for smoother transition
    const timer = setTimeout(() => {
      setCurrentExpression(expression);
    }, 50);
    return () => clearTimeout(timer);
  }, [expression]);

  const handleClick = () => {
    if (onExpressionChange) {
      const expressions: BrainExpression[] = [
        'happy', 'excited', 'thinking', 'surprised', 'winking',
        'love', 'dizzy', 'crying', 'laughing', 'skeptical',
        'proud', 'shy', 'mischievous'
      ];
      const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
      setCurrentExpression(randomExpression);
      onExpressionChange(randomExpression);
    }
  };

  const pulseAnimation = animate ? {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  } : undefined;

  const hoverAnimation = isHovering ? {
    scale: 1.05,
    rotate: [0, -2, 2, 0],
    transition: { duration: 0.5 }
  } : undefined;

  // Calculate text dimensions first
  const calculateTextDimensions = (text: string) => {
    const maxCharsPerLine = 20;
    const charWidth = 8; // Approximate width per character
    const lineHeight = 18;
    const padding = { x: 16, y: 10 };
    
    // Split text into lines
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (testLine.length <= maxCharsPerLine) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) lines.push(currentLine);
    
    const maxLineLength = Math.max(...lines.map(line => line.length));
    const width = Math.max(50, Math.min(150, maxLineLength * charWidth + padding.x * 2));
    const height = lines.length * lineHeight + padding.y * 2;
    
    return { width, height, lines };
  };

  const textDimensions = speechText ? calculateTextDimensions(speechText) : null;

  // Calculate speech bubble position based on position prop and size
  const getBubblePosition = () => {
    const margin = 15; // Space between brain and bubble
    const bubbleWidth = textDimensions?.width || 70;
    const bubbleHeight = textDimensions?.height || 28;
    
    // Brain bounds approximately from 15 to 85 in viewBox coordinates
    const brainTop = 22;
    const brainBottom = 78;
    const brainLeft = 15;
    const brainRight = 85;
    
    const positions = {
      top: { 
        x: 50, 
        y: brainTop - margin - bubbleHeight/2,
        tailPath: `M 48 ${brainTop - margin - 2} L 50 ${brainTop - 5} L 52 ${brainTop - margin - 2} Z`
      },
      bottom: { 
        x: 50, 
        y: brainBottom + margin + bubbleHeight/2,
        tailPath: `M 48 ${brainBottom + margin + 2} L 50 ${brainBottom + 5} L 52 ${brainBottom + margin + 2} Z`
      },
      left: { 
        x: brainLeft - margin - bubbleWidth/2, 
        y: 50,
        tailPath: `M ${brainLeft - margin - 2} 48 L ${brainLeft - 5} 50 L ${brainLeft - margin - 2} 52 Z`
      },
      right: { 
        x: brainRight + margin + bubbleWidth/2, 
        y: 50,
        tailPath: `M ${brainRight + margin + 2} 48 L ${brainRight + 5} 50 L ${brainRight + margin + 2} 52 Z`
      }
    };
    return positions[speechBubblePosition];
  };

  const bubblePosition = getBubblePosition();

  return (
    <div 
      className={`relative inline-block cursor-pointer ${className}`}
      style={{ width: dimensions.width, height: dimensions.height }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Brain Body with gradient */}
        <defs>
          <radialGradient id={`brainGradient-${color}`} cx="0.5" cy="0.3" r="0.7">
            <stop offset="0%" stopColor={colors.accent} />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.primary} />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Speech Bubble - Outside the animated brain group */}
        <AnimatePresence>
          {speechText && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 25,
                duration: 0.2,
                delay: skipInitialAnimation ? 0 : 0.6 // Wait for brain animation
              }}
              style={{ transformOrigin: `${bubblePosition.x}px ${bubblePosition.y}px` }}
            >
              {/* Animated bubble shape */}
              <motion.path
                d=""
                fill={speechColors.background}
                stroke={speechBubbleType === 'whisper' ? speechColors.text : 'none'}
                strokeWidth={speechBubbleType === 'whisper' ? '1' : '0'}
                strokeDasharray={speechBubbleType === 'whisper' ? '3 3' : '0'}
                opacity={speechBubbleType === 'whisper' ? 0.85 : 0.95}
                animate={{
                  d: (() => {
                    const w = (textDimensions?.width || 70) / 2;
                    const h = (textDimensions?.height || 28) / 2;
                    const x = bubblePosition.x;
                    const y = bubblePosition.y;
                    
                    if (speechBubbleType === 'think') {
                      // Simple cloud shape with 3-4 bumps
                      const padding = 8;
                      const cloudW = w + padding;
                      const cloudH = h + padding;
                      const r = Math.min(cloudH * 0.8, 20); // Bump radius
                      
                      return `
                        M ${x - cloudW} ${y}
                        C ${x - cloudW} ${y - r}, ${x - cloudW + r} ${y - cloudH}, ${x - cloudW/2} ${y - cloudH}
                        C ${x - cloudW/3} ${y - cloudH - r/2}, ${x + cloudW/3} ${y - cloudH - r/2}, ${x + cloudW/2} ${y - cloudH}
                        C ${x + cloudW - r} ${y - cloudH}, ${x + cloudW} ${y - r}, ${x + cloudW} ${y}
                        C ${x + cloudW} ${y + r}, ${x + cloudW - r} ${y + cloudH}, ${x + cloudW/2} ${y + cloudH}
                        C ${x + cloudW/3} ${y + cloudH + r/2}, ${x - cloudW/3} ${y + cloudH + r/2}, ${x - cloudW/2} ${y + cloudH}
                        C ${x - cloudW + r} ${y + cloudH}, ${x - cloudW} ${y + r}, ${x - cloudW} ${y}
                        Z
                      `;
                    } else if (speechBubbleType === 'shout') {
                      // Spiky shape with zigzag edges - keep close to text size
                      const spike = 5;
                      const shoutW = w + spike;
                      const shoutH = h + spike/2;
                      return `
                        M ${x - shoutW} ${y - spike}
                        L ${x - shoutW + spike} ${y - shoutH}
                        L ${x - shoutW/2} ${y - shoutH + spike/2}
                        L ${x} ${y - shoutH - spike}
                        L ${x + shoutW/2} ${y - shoutH + spike/2}
                        L ${x + shoutW - spike} ${y - shoutH}
                        L ${x + shoutW} ${y - spike}
                        L ${x + shoutW - spike/2} ${y}
                        L ${x + shoutW} ${y + spike}
                        L ${x + shoutW - spike} ${y + shoutH}
                        L ${x + shoutW/2} ${y + shoutH - spike/2}
                        L ${x} ${y + shoutH + spike}
                        L ${x - shoutW/2} ${y + shoutH - spike/2}
                        L ${x - shoutW + spike} ${y + shoutH}
                        L ${x - shoutW} ${y + spike}
                        L ${x - shoutW + spike/2} ${y}
                        Z
                      `;
                    } else {
                      // Smooth rounded rectangle
                      const r = Math.min(h * 0.5, 14);
                      return `
                        M ${x - w + r} ${y - h}
                        Q ${x - w} ${y - h}, ${x - w} ${y - h + r}
                        L ${x - w} ${y + h - r}
                        Q ${x - w} ${y + h}, ${x - w + r} ${y + h}
                        L ${x + w - r} ${y + h}
                        Q ${x + w} ${y + h}, ${x + w} ${y + h - r}
                        L ${x + w} ${y - h + r}
                        Q ${x + w} ${y - h}, ${x + w - r} ${y - h}
                        Z
                      `;
                    }
                  })()
                }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.4, 0, 0.2, 1],
                  type: "tween"
                }}
              />
              
              {/* Animated tail */}
              {speechBubbleType === 'think' ? (
                // Thought bubble tail - small circles
                <>
                  {(() => {
                    const dx = speechBubblePosition === 'left' ? 20 : speechBubblePosition === 'right' ? -20 : 0;
                    const dy = speechBubblePosition === 'top' ? 20 : speechBubblePosition === 'bottom' ? -20 : 0;
                    return (
                      <>
                        <motion.circle 
                          cx={bubblePosition.x + dx * 0.8} 
                          cy={bubblePosition.y + dy * 0.8} 
                          r="4" 
                          fill={speechColors.background} 
                          opacity="0.95"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                        <motion.circle 
                          cx={bubblePosition.x + dx * 1.2} 
                          cy={bubblePosition.y + dy * 1.2} 
                          r="3" 
                          fill={speechColors.background} 
                          opacity="0.95"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                        />
                        <motion.circle 
                          cx={bubblePosition.x + dx * 1.5} 
                          cy={bubblePosition.y + dy * 1.5} 
                          r="2" 
                          fill={speechColors.background} 
                          opacity="0.95"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                        />
                      </>
                    );
                  })()}
                </>
              ) : (
                // Regular tail for talk/shout/whisper
                <motion.path
                  d={bubblePosition.tailPath}
                  fill={speechColors.background}
                  stroke={speechBubbleType === 'whisper' ? speechColors.text : 'none'}
                  strokeWidth={speechBubbleType === 'whisper' ? '1' : '0'}
                  strokeDasharray={speechBubbleType === 'whisper' ? '2 2' : '0'}
                  opacity={speechBubbleType === 'whisper' ? 0.85 : 0.95}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
              
              {/* Text - Multi-line support with style variations */}
              <motion.g
                animate={{
                  opacity: [0, 1],
                }}
                transition={{
                  duration: 0.2,
                  delay: 0.1,
                  ease: "easeOut"
                }}
              >
                {textDimensions?.lines.map((line, index) => (
                  <motion.text
                    key={`${line}-${index}`}
                    x={bubblePosition.x}
                    y={bubblePosition.y - ((textDimensions.lines.length - 1) * 9) + (index * 18)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={speechColors.text}
                    fontFamily="system-ui, -apple-system, sans-serif"
                    animate={{
                      fontSize: speechBubbleType === 'shout' ? 15 : speechBubbleType === 'whisper' ? 11 : 13,
                      fontWeight: speechBubbleType === 'shout' ? 700 : speechBubbleType === 'whisper' ? 300 : 500,
                      opacity: speechBubbleType === 'whisper' ? 0.7 : 1,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{
                      fontStyle: speechBubbleType === 'think' ? 'italic' : 'normal'
                    }}
                  >
                    {speechBubbleType === 'shout' ? line.toUpperCase() : line}
                  </motion.text>
                ))}
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Animated Brain Group */}
        <motion.g
          animate={hoverAnimation || pulseAnimation}
          initial={skipInitialAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          whileInView={skipInitialAnimation ? {} : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: "50px 50px" }}
        >
        {/* Cute Cloud-like Brain Shape */}
        <motion.path
          d="M 20 45 
             C 15 30, 25 22, 38 25
             C 42 18, 58 18, 62 25
             C 75 22, 85 30, 80 45
             C 85 55, 80 68, 68 72
             C 60 78, 40 78, 32 72
             C 20 68, 15 55, 20 45 Z"
          fill={`url(#brainGradient-${color})`}
          stroke={colors.primary}
          strokeWidth="2"
          filter="url(#glow)"
          animate={animate ? {
            scale: [1, 1.02, 1],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          } : {}}
        />

        {/* Cute Center Indent */}
        <motion.path
          d="M 50 25 C 48 30, 52 35, 50 40 C 48 45, 52 50, 50 55 C 48 60, 52 65, 50 70"
          stroke={colors.primary}
          strokeWidth="3"
          fill="none"
          opacity="0.8"
          strokeLinecap="round"
          animate={animate ? {
            pathOffset: [0, 0.1, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          } : {}}
        />

        {/* Little Brain Bumps - Left */}
        <motion.circle
          cx="30"
          cy="30"
          r="8"
          fill={colors.secondary}
          opacity="0.3"
          animate={animate ? {
            scale: [0.9, 1.1, 0.9],
            transition: { duration: 2.5, repeat: Infinity, delay: 0.5 }
          } : {}}
        />
        
        {/* Little Brain Bumps - Right */}
        <motion.circle
          cx="70"
          cy="30"
          r="8"
          fill={colors.secondary}
          opacity="0.3"
          animate={animate ? {
            scale: [0.9, 1.1, 0.9],
            transition: { duration: 2.5, repeat: Infinity, delay: 1 }
          } : {}}
        />

        {/* Cute Simple Brain Folds - Left */}
        <motion.path
          d="M 25 40 Q 35 38 42 42
             M 28 50 Q 38 48 42 52
             M 25 60 Q 35 58 40 62"
          stroke={colors.secondary}
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
          animate={animate ? {
            opacity: [0.3, 0.5, 0.3],
            transition: { duration: 4, repeat: Infinity, delay: 0.5 }
          } : {}}
        />

        {/* Cute Simple Brain Folds - Right */}
        <motion.path
          d="M 75 40 Q 65 38 58 42
             M 72 50 Q 62 48 58 52
             M 75 60 Q 65 58 60 62"
          stroke={colors.secondary}
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
          animate={animate ? {
            opacity: [0.3, 0.5, 0.3],
            transition: { duration: 4, repeat: Infinity, delay: 1 }
          } : {}}
        />

        {/* Cute Little Hearts - Symbol of Love */}
        <motion.g opacity="0.6">
          <motion.path
            d="M 15 25 C 15 23, 13 22, 12 23 C 11 22, 9 23, 9 25 C 9 27, 12 30, 12 30 C 12 30, 15 27, 15 25 Z"
            fill={colors.accent}
            animate={animate ? {
              scale: [0.8, 1.2, 0.8],
              transition: { duration: 2, repeat: Infinity, delay: 0 }
            } : {}}
          />
          <motion.path
            d="M 91 25 C 91 23, 89 22, 88 23 C 87 22, 85 23, 85 25 C 85 27, 88 30, 88 30 C 88 30, 91 27, 91 25 Z"
            fill={colors.accent}
            animate={animate ? {
              scale: [0.8, 1.2, 0.8],
              transition: { duration: 2, repeat: Infinity, delay: 1 }
            } : {}}
          />
        </motion.g>

        {/* Cute Eyebrows */}
        {expressionConfig.eyebrows && (
          <>
            <motion.path
              d="M 25 35 L 35 33"
              stroke={colors.primary}
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                rotate: expressionConfig.eyebrows.left.rotate,
                y: expressionConfig.eyebrows.left.translateY,
                transition: { duration: 0.4, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "30px 34px" }}
            />
            <motion.path
              d="M 65 33 L 75 35"
              stroke={colors.primary}
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                rotate: expressionConfig.eyebrows.right.rotate,
                y: expressionConfig.eyebrows.right.translateY,
                transition: { duration: 0.4, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "70px 34px" }}
            />
          </>
        )}

        {/* Big Kawaii Left Eye */}
        <motion.ellipse
          cx="35"
          cy="45"
          rx="10"
          ry="12"
          fill="#1F2937"
          animate={{
            scaleY: expressionConfig.leftEye.scaleY,
            y: expressionConfig.leftEye.translateY,
            transition: { duration: 0.4, ease: "easeInOut" }
          }}
        />
        {/* Eye Shine - Left */}
        <motion.ellipse
          cx="37"
          cy="42"
          rx="4"
          ry="5"
          fill="white"
          animate={{
            scaleY: expressionConfig.leftEye.scaleY,
            y: expressionConfig.leftEye.translateY,
            transition: { duration: 0.4, ease: "easeInOut" }
          }}
        />
        <motion.ellipse
          cx="33"
          cy="47"
          rx="2"
          ry="2.5"
          fill="white"
          opacity="0.8"
          animate={{
            scaleY: expressionConfig.leftEye.scaleY,
            y: expressionConfig.leftEye.translateY,
            transition: { duration: 0.4, ease: "easeInOut" }
          }}
        />

        {/* Big Kawaii Right Eye */}
        <motion.ellipse
          cx="65"
          cy="45"
          rx="10"
          ry="12"
          fill="#1F2937"
          animate={{
            scaleY: expressionConfig.rightEye.scaleY,
            y: expressionConfig.rightEye.translateY,
            transition: { duration: 0.4, ease: "easeInOut" }
          }}
        />
        {/* Eye Shine - Right */}
        <motion.ellipse
          cx="63"
          cy="42"
          rx="4"
          ry="5"
          fill="white"
          animate={{
            scaleY: expressionConfig.rightEye.scaleY,
            y: expressionConfig.rightEye.translateY,
            transition: { duration: 0.4, ease: "easeInOut" }
          }}
        />
        <motion.ellipse
          cx="67"
          cy="47"
          rx="2"
          ry="2.5"
          fill="white"
          opacity="0.8"
          animate={{
            scaleY: expressionConfig.rightEye.scaleY,
            y: expressionConfig.rightEye.translateY,
            transition: { duration: 0.4, ease: "easeInOut" }
          }}
        />

        {/* Cute Mouth */}
        <motion.path
          d={expressionConfig.mouth.d}
          stroke={colors.primary}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{
            scaleY: expressionConfig.mouth.scaleY || 1,
            y: expressionConfig.mouth.translateY || 0,
            transition: { duration: 0.4, ease: "easeInOut" }
          }}
        />

        {/* Cute Stars Instead of Neural Activity */}
        {animate && (
          <>
            <motion.path
              d="M 20 35 L 21 37 L 23 37 L 21 38 L 22 40 L 20 39 L 18 40 L 19 38 L 17 37 L 19 37 Z"
              fill={colors.accent}
              opacity="0.8"
              animate={{
                scale: [0.5, 1, 0.5],
                rotate: [0, 180, 360],
                opacity: [0.4, 0.8, 0.4],
                transition: { duration: 3, repeat: Infinity, delay: 0 }
              }}
            />
            <motion.path
              d="M 80 35 L 81 37 L 83 37 L 81 38 L 82 40 L 80 39 L 78 40 L 79 38 L 77 37 L 79 37 Z"
              fill={colors.accent}
              opacity="0.8"
              animate={{
                scale: [0.5, 1, 0.5],
                rotate: [0, -180, -360],
                opacity: [0.4, 0.8, 0.4],
                transition: { duration: 3, repeat: Infinity, delay: 1.5 }
              }}
            />
          </>
        )}

        {/* Cute Blush Circles */}
        <AnimatePresence>
          {expressionConfig.blush && (
            <>
              <motion.circle
                cx="22"
                cy="52"
                r="5"
                fill="#FFB6C1"
                opacity="0.7"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.circle
                cx="78"
                cy="52"
                r="5"
                fill="#FFB6C1"
                opacity="0.7"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Cute Sparkles */}
        <AnimatePresence>
          {expressionConfig.sparkles && (
            <>
              <motion.g 
                initial={{ scale: 0.5, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.path
                  d="M 10 18 L 12 22 L 16 20 L 12 24 L 14 28 L 10 24 L 6 28 L 8 24 L 4 20 L 8 22 Z"
                  fill={colors.accent}
                  opacity="0.9"
                  animate={{ 
                    scale: [0.5, 1.2, 0.5],
                    rotate: [0, 180, 360],
                    transition: { duration: 2, repeat: Infinity }
                  }}
                />
                <motion.path
                  d="M 90 18 L 92 22 L 96 20 L 92 24 L 94 28 L 90 24 L 86 28 L 88 24 L 84 20 L 88 22 Z"
                  fill={colors.accent}
                  opacity="0.9"
                  animate={{ 
                    scale: [0.5, 1.2, 0.5],
                    rotate: [0, -180, -360],
                    transition: { duration: 2, repeat: Infinity, delay: 0.5 }
                  }}
                />
                <motion.circle
                  cx="50"
                  cy="15"
                  r="2"
                  fill={colors.secondary}
                  opacity="0.8"
                  animate={{ 
                    scale: [0, 1.5, 0],
                    transition: { duration: 1.5, repeat: Infinity, delay: 1 }
                  }}
                />
              </motion.g>
            </>
          )}
        </AnimatePresence>

        {/* Sweat Drop */}
        <AnimatePresence>
          {expressionConfig.sweat && (
            <motion.path
              d="M 82 28 Q 84 31 82 35 Q 80 31 82 28"
              fill="#60A5FA"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 1],
                opacity: [0, 0.8, 0.8],
                y: [0, 0, 5],
                transition: { duration: 2, repeat: Infinity }
              }}
            />
          )}
        </AnimatePresence>

        {/* Sleep ZZZ */}
        <AnimatePresence>
          {expressionConfig.zzz && (
            <>
              <motion.text
                x="85"
                y="25"
                fill={colors.primary}
                fontSize="8"
                fontWeight="bold"
                initial={{ opacity: 0, y: 5 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [5, -5, -15],
                  transition: { duration: 2, repeat: Infinity, delay: 0 }
                }}
              >
                Z
              </motion.text>
              <motion.text
                x="92"
                y="20"
                fill={colors.secondary}
                fontSize="6"
                fontWeight="bold"
                initial={{ opacity: 0, y: 5 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [5, -5, -15],
                  transition: { duration: 2, repeat: Infinity, delay: 0.5 }
                }}
              >
                Z
              </motion.text>
              <motion.text
                x="97"
                y="15"
                fill={colors.accent}
                fontSize="4"
                fontWeight="bold"
                initial={{ opacity: 0, y: 5 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [5, -5, -15],
                  transition: { duration: 2, repeat: Infinity, delay: 1 }
                }}
              >
                Z
              </motion.text>
            </>
          )}
        </AnimatePresence>

        {/* Floating Hearts for Love Expression */}
        <AnimatePresence>
          {expressionConfig.hearts && (
            <>
              <motion.path
                d="M 25 20 C 25 17, 22 15, 20 17 C 18 15, 15 17, 15 20 C 15 23, 20 28, 20 28 C 20 28, 25 23, 25 20 Z"
                fill="#FF69B4"
                initial={{ scale: 0, opacity: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1, 1.2, 0],
                  opacity: [0, 1, 1, 1, 0],
                  y: [0, -10, -20, -30, -40],
                  x: [-5, -3, -5, -3, -5],
                  transition: { duration: 3, repeat: Infinity, delay: 0 }
                }}
              />
              <motion.path
                d="M 80 22 C 80 19, 77 17, 75 19 C 73 17, 70 19, 70 22 C 70 25, 75 30, 75 30 C 75 30, 80 25, 80 22 Z"
                fill="#FF1493"
                initial={{ scale: 0, opacity: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1, 1.2, 0],
                  opacity: [0, 1, 1, 1, 0],
                  y: [0, -10, -20, -30, -40],
                  x: [5, 3, 5, 3, 5],
                  transition: { duration: 3, repeat: Infinity, delay: 1 }
                }}
              />
              <motion.path
                d="M 55 15 C 55 13, 53 12, 51 13 C 49 12, 47 13, 47 15 C 47 17, 51 20, 51 20 C 51 20, 55 17, 55 15 Z"
                fill="#FFB6C1"
                initial={{ scale: 0, opacity: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0.8, 1, 0],
                  opacity: [0, 0.8, 0.8, 0.8, 0],
                  y: [0, -5, -15, -25, -35],
                  transition: { duration: 3, repeat: Infinity, delay: 1.5 }
                }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Tears for Crying Expression */}
        <AnimatePresence>
          {expressionConfig.tears && (
            <>
              <motion.path
                d="M 35 52 Q 33 55 35 58 Q 37 55 35 52"
                fill="#4FC3F7"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 1],
                  opacity: [0, 0.9, 0],
                  y: [0, 5, 15],
                  transition: { duration: 1.5, repeat: Infinity, delay: 0 }
                }}
              />
              <motion.path
                d="M 65 52 Q 63 55 65 58 Q 67 55 65 52"
                fill="#4FC3F7"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 1],
                  opacity: [0, 0.9, 0],
                  y: [0, 5, 15],
                  transition: { duration: 1.5, repeat: Infinity, delay: 0.3 }
                }}
              />
              <motion.circle
                cx="32"
                cy="58"
                r="2"
                fill="#81D4FA"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  y: [0, 8, 20],
                  transition: { duration: 1.5, repeat: Infinity, delay: 0.8 }
                }}
              />
              <motion.circle
                cx="68"
                cy="58"
                r="2"
                fill="#81D4FA"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  y: [0, 8, 20],
                  transition: { duration: 1.5, repeat: Infinity, delay: 1.1 }
                }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Dizzy Stars */}
        <AnimatePresence>
          {expressionConfig.dizzyStars && (
            <>
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  rotate: 360,
                  transition: { 
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 0.3 }
                  }
                }}
                style={{ transformOrigin: "50px 45px" }}
              >
                <motion.path
                  d="M 30 30 L 31 32 L 33 32 L 31 33 L 32 35 L 30 34 L 28 35 L 29 33 L 27 32 L 29 32 Z"
                  fill={colors.accent}
                  opacity="0.8"
                />
                <motion.path
                  d="M 70 30 L 71 32 L 73 32 L 71 33 L 72 35 L 70 34 L 68 35 L 69 33 L 67 32 L 69 32 Z"
                  fill={colors.secondary}
                  opacity="0.8"
                />
                <motion.path
                  d="M 50 20 L 51 22 L 53 22 L 51 23 L 52 25 L 50 24 L 48 25 L 49 23 L 47 22 L 49 22 Z"
                  fill={colors.primary}
                  opacity="0.6"
                />
                <motion.circle cx="35" cy="25" r="2" fill={colors.accent} opacity="0.7" />
                <motion.circle cx="65" cy="25" r="2" fill={colors.secondary} opacity="0.7" />
              </motion.g>
            </>
          )}
        </AnimatePresence>
        </motion.g>
      </svg>
    </div>
  );
};

export default BrainMascot;