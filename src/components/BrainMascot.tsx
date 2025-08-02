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
  | 'fighter'
  | 'thumbsUp'
  | 'thumbsDown'
  | 'applause'
  | 'disapproval'
  | 'amazed'
  | 'satisfied'
  | 'bored'
  | 'celebration';

export type SpeechBubbleType = 'talk' | 'think' | 'shout' | 'whisper';

export type HandGesture = 
  | 'none'
  | 'thumbsUp' 
  | 'thumbsDown'
  | 'wave'
  | 'applause'
  | 'pointUp'
  | 'pointDown'
  | 'openHands';

export type HandDisplay = 'both' | 'left' | 'right' | 'none';

export interface BrainMascotProps {
  expression?: BrainExpression;
  handGesture?: HandGesture;
  handDisplay?: HandDisplay;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  animate?: boolean;
  color?: 'purple' | 'blue' | 'green' | 'amber' | 'red';
  className?: string;
  onExpressionChange?: (expression: BrainExpression) => void;
  onHandGestureChange?: (gesture: HandGesture) => void;
  onHandDisplayChange?: (display: HandDisplay) => void;
  skipInitialAnimation?: boolean;
  speechText?: string;
  speechBubblePosition?: 'top' | 'bottom' | 'left' | 'right';
  speechBubbleColor?: 'white' | 'purple' | 'blue' | 'green' | 'amber' | 'red';
  speechBubbleType?: SpeechBubbleType;
  glasses?: boolean;
  coffeeMug?: boolean;
  hat?: boolean;
}

// Convenience reaction helper types
export type ReactionType = 'positive' | 'negative' | 'neutral' | 'excited' | 'thinking';

export const getReactionExpression = (reaction: ReactionType): BrainExpression => {
  const reactionMap: Record<ReactionType, BrainExpression[]> = {
    positive: ['thumbsUp', 'applause', 'happy', 'celebration', 'satisfied', 'proud'],
    negative: ['thumbsDown', 'disapproval', 'sad', 'angry', 'bored'],
    neutral: ['neutral', 'thinking', 'focused'],
    excited: ['excited', 'amazed', 'surprised', 'celebration'],
    thinking: ['thinking', 'focused', 'confused']
  };
  
  const expressions = reactionMap[reaction];
  return expressions[Math.floor(Math.random() * expressions.length)];
};

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
  },
  thumbsUp: {
    leftEye: { scaleY: 0.7, translateY: 1 },
    rightEye: { scaleY: 0.7, translateY: 1 },
    mouth: { d: "M 35 60 Q 50 68 65 60", scaleY: 1, translateY: 0 },
    eyebrows: {
      left: { rotate: -8, translateY: -1 },
      right: { rotate: 8, translateY: -1 }
    },
    sparkles: true,
    blush: true
  },
  thumbsDown: {
    leftEye: { scaleY: 0.8, translateY: 2 },
    rightEye: { scaleY: 0.8, translateY: 2 },
    mouth: { d: "M 35 65 Q 50 57 65 65", scaleY: 0.8, translateY: 2 },
    eyebrows: {
      left: { rotate: 12, translateY: -1 },
      right: { rotate: -12, translateY: -1 }
    }
  },
  applause: {
    leftEye: { scaleY: 0.6, translateY: 2 },
    rightEye: { scaleY: 0.6, translateY: 2 },
    mouth: { d: "M 30 58 Q 50 70 70 58", scaleY: 1.2, translateY: 0 },
    sparkles: true,
    blush: true
  },
  disapproval: {
    leftEye: { scaleY: 0.5, translateY: 3 },
    rightEye: { scaleY: 0.5, translateY: 3 },
    mouth: { d: "M 35 66 Q 50 58 65 66", scaleY: 0.8, translateY: 3 },
    eyebrows: {
      left: { rotate: 20, translateY: 0 },
      right: { rotate: -20, translateY: 0 }
    }
  },
  amazed: {
    leftEye: { scaleY: 1.5, translateY: -2 },
    rightEye: { scaleY: 1.5, translateY: -2 },
    mouth: { d: "M 45 58 Q 50 70 55 58", scaleY: 1.8, translateY: 0 },
    eyebrows: {
      left: { rotate: 0, translateY: -5 },
      right: { rotate: 0, translateY: -5 }
    },
    sparkles: true
  },
  satisfied: {
    leftEye: { scaleY: 0.5, translateY: 3 },
    rightEye: { scaleY: 0.5, translateY: 3 },
    mouth: { d: "M 38 61 Q 50 64 62 61", scaleY: 0.9, translateY: 0 },
    eyebrows: {
      left: { rotate: -5, translateY: 1 },
      right: { rotate: 5, translateY: 1 }
    },
    blush: true
  },
  bored: {
    leftEye: { scaleY: 0.4, translateY: 4 },
    rightEye: { scaleY: 0.4, translateY: 4 },
    mouth: { d: "M 42 62 L 58 62", scaleY: 1, translateY: 0 },
    eyebrows: {
      left: { rotate: 0, translateY: 2 },
      right: { rotate: 0, translateY: 2 }
    }
  },
  celebration: {
    leftEye: { scaleY: 0.2, translateY: 4 },
    rightEye: { scaleY: 0.2, translateY: 4 },
    mouth: { d: "M 25 55 Q 50 75 75 55", scaleY: 1.4, translateY: -2 },
    sparkles: true,
    hearts: true,
    blush: true
  }
};

export const BrainMascot: React.FC<BrainMascotProps> = ({
  expression = 'neutral',
  handGesture = 'none',
  handDisplay = 'both',
  size = 'medium',
  animate = true,
  color = 'purple',
  className = '',
  onExpressionChange,
  onHandGestureChange,
  onHandDisplayChange,
  skipInitialAnimation = true,
  speechText,
  speechBubblePosition = 'right',
  speechBubbleColor = 'white',
  speechBubbleType = 'talk',
  glasses = false,
  coffeeMug = false,
  hat = false
}) => {
  const [currentExpression, setCurrentExpression] = useState<BrainExpression>(expression);
  const [currentHandGesture, setCurrentHandGesture] = useState<HandGesture>(handGesture);
  const [currentHandDisplay, setCurrentHandDisplay] = useState<HandDisplay>(handDisplay);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentHandGesture(handGesture);
    }, 50);
    return () => clearTimeout(timer);
  }, [handGesture]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentHandDisplay(handDisplay);
    }, 50);
    return () => clearTimeout(timer);
  }, [handDisplay]);

  const handleClick = () => {
    if (onExpressionChange) {
      const expressions: BrainExpression[] = [
        'happy', 'excited', 'thinking', 'surprised', 'winking',
        'love', 'dizzy', 'crying', 'laughing', 'skeptical',
        'proud', 'shy', 'mischievous', 'thumbsUp', 'thumbsDown',
        'applause', 'disapproval', 'amazed', 'satisfied', 'bored', 'celebration'
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

  // Individual Hand Components
  const renderLeftHand = (gesture: HandGesture) => {
    const handProps = {
      fill: colors.secondary,
      stroke: colors.primary,
      strokeWidth: "2",
      strokeLinejoin: "round" as const,
      strokeLinecap: "round" as const
    };

    switch (gesture) {
      case 'thumbsUp':
        return (
          <motion.g
            animate={animate ? {
              rotate: [-5, 5, -5],
              y: [0, -2, 0],
              transition: { duration: 1.5, repeat: Infinity }
            } : {}}
            style={{ transformOrigin: "25px 95px" }}
          >
            {/* Hand shadow */}
            <ellipse cx="25" cy="105" rx="10" ry="3" fill="black" opacity="0.1" />
            
            {/* SVG Thumbs Up Icon */}
            <g transform="translate(25, 79) scale(-0.25, 0.25)">
              <path 
                fill={colors.secondary}
                stroke={colors.primary}
                strokeWidth="1"
                d="M64,28c0-3.314-2.687-6-6-6H41l0,0h-0.016H41l2-18c0.209-2.188-1.287-4-3.498-4h-4.001
                   C33,0,31.959,1.75,31,4l-8,18c-2.155,5.169-5,6-7,6c-1,0-2,0-2,0v-2c0-2.212-1.789-4-4-4H4c-2.211,0-4,1.788-4,4v34
                   c0,2.21,1.789,4,4,4h6c2.211,0,4-1.79,4-4v-2c1,0,3.632,0.052,6.21,2.697C23.324,63.894,27.043,64,29,64h23c3.313,0,6-2.688,6-6
                   c0-1.731-0.737-3.288-1.91-4.383C58.371,52.769,60,50.577,60,48c0-1.731-0.737-3.288-1.91-4.383
                   C60.371,42.769,62,40.577,62,38c0-1.731-0.737-3.288-1.91-4.383C62.371,32.769,64,30.577,64,28z"
              />
              
              {/* Thumb base highlight */}
              <ellipse cx="7" cy="45" rx="3" ry="8" fill={colors.accent} opacity="0.3" />
              
              {/* Success sparkle effect */}
              <motion.g
                animate={animate ? {
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                  transition: { duration: 2, repeat: Infinity }
                } : {}}
              >
                <circle cx="50" cy="15" r="2" fill={colors.accent} opacity="0.8" />
                <circle cx="15" cy="20" r="1.5" fill={colors.accent} opacity="0.6" />
              </motion.g>
            </g>
          </motion.g>
        );

      case 'thumbsDown':
        return (
          <motion.g
            animate={animate ? {
              rotate: [-5, 5, -5],
              y: [0, 2, 0],
              transition: { duration: 1.5, repeat: Infinity }
            } : {}}
            style={{ transformOrigin: "25px 95px" }}
          >
            {/* Hand shadow */}
            <ellipse cx="25" cy="105" rx="10" ry="3" fill="black" opacity="0.1" />
            
            {/* SVG Thumbs Down Icon (rotated thumb up) */}
            <g transform="translate(25, 95) scale(-0.25, -0.25)">
              <path 
                fill={colors.secondary}
                stroke={colors.primary}
                strokeWidth="1"
                d="M64,28c0-3.314-2.687-6-6-6H41l0,0h-0.016H41l2-18c0.209-2.188-1.287-4-3.498-4h-4.001
                   C33,0,31.959,1.75,31,4l-8,18c-2.155,5.169-5,6-7,6c-1,0-2,0-2,0v-2c0-2.212-1.789-4-4-4H4c-2.211,0-4,1.788-4,4v34
                   c0,2.21,1.789,4,4,4h6c2.211,0,4-1.79,4-4v-2c1,0,3.632,0.052,6.21,2.697C23.324,63.894,27.043,64,29,64h23c3.313,0,6-2.688,6-6
                   c0-1.731-0.737-3.288-1.91-4.383C58.371,52.769,60,50.577,60,48c0-1.731-0.737-3.288-1.91-4.383
                   C60.371,42.769,62,40.577,62,38c0-1.731-0.737-3.288-1.91-4.383C62.371,32.769,64,30.577,64,28z"
              />
              
              {/* Thumb base highlight */}
              <ellipse cx="7" cy="45" rx="3" ry="8" fill="#ef4444" opacity="0.4" />
              
              {/* Negative effect */}
              <motion.g
                animate={animate ? {
                  rotate: [0, -360],
                  scale: [0.8, 1.2, 0.8],
                  transition: { duration: 2, repeat: Infinity }
                } : {}}
              >
                <circle cx="50" cy="50" r="2" fill="#ef4444" opacity="0.8" />
                <circle cx="15" cy="45" r="1.5" fill="#ef4444" opacity="0.6" />
              </motion.g>
            </g>
          </motion.g>
        );

      case 'wave':
        return (
          <motion.g
            animate={animate ? {
              rotate: [-15, 15, -15],
              transition: { duration: 0.8, repeat: Infinity }
            } : {}}
            style={{ transformOrigin: "32px 76px" }}
          >
            {/* Waving hand SVG - scaled and positioned for left hand */}
            <g transform="scale(0.4) translate(-40, 120)">
              <path d="M5.946 30.785c-2.999 7.189 2.213 15.866 9.784 17.387c-5.9-3.962-9.584-10.327-9.784-17.387" fill={colors.primary}></path>
              <path d="M15.73 48.172l-.184-.039c.023.006.078.015.184.039" fill={colors.primary}></path>
              <path d="M2 44.261c.489 6.02 8.039 9.878 13.457 7.412C9.879 50.475 6.179 49.378 2 44.261" fill={colors.primary}></path>
              <path d="M46.504 22.794c3.512-7.168-1.475-16.036-9.055-17.963c5.799 4.233 9.239 10.824 9.055 17.963" fill={colors.primary}></path>
              <path d="M48.865 17.848c4.192-3.709 2.502-11.088-2.332-13.49c2.33 4.565 3.151 8.421 2.332 13.49" fill={colors.primary}></path>
              <path d="M60.519 14.345a5.43 5.43 0 0 0-3.303-1.116c-7.206 0-8.498 9.386-10.097 13.05c0 0-7.389-15.469-9.959-20.573c-2.65-5.265-8.307-4.177-9.964-1.311C23.26.316 15.823 3.609 16.771 8.568c-5.104-.392-7.167 4.643-6.034 7.871c-3.945-.122-5.789 4.757-4.455 8.25c.069.182 7.073 13.966 8.959 18.662c.219.545.44 1.128.672 1.742c1.525 4.032 3.614 9.554 8.84 13.989C27.003 60.991 30.118 62 33.764 62c6.426 0 13.581-3.189 18.229-8.126c4.163-4.421 6.158-9.848 5.77-15.695c-.348-5.256 1.324-10.208 2.667-14.188c1.457-4.319 2.607-7.731.089-9.646m-5.947 23.66c.813 11.628-10.842 21.439-20.73 21.439c-3.021 0-6.15-.488-8.105-2.147c-5.606-4.758-7.013-10.646-8.638-14.684c-1.941-4.831-6.705-14.114-9.014-18.784c-.945-1.912.634-5.981 3.384-5.981L19.4 34.716l3.005 1.804s-6.882-14.998-9.061-20.167c-1.272-3.018.92-6.662 3.874-6.187l9.846 21.016l3.006 1.808L18.594 8.757c-.046-4.295 5.831-4.362 7.197-1.854c3.457 6.348 9.947 20.279 9.947 20.279l3.004 1.807L27.969 6.146c2.104-2.754 5.816-2.368 7.416.975c1.922 4.015 10.061 21.454 10.061 21.454c-8.035 3.012-13.52 11.743-7.777 20.35c-4.557-9.41 3.516-16.06 8.285-18.258c1.805-.833 2.469-2.408 2.469-2.408l-.004.001c.629-1.139.592-2.662 1.342-5.127c1.625-5.335 3.854-8.162 7.125-8.162c.754 0 1.704.564 2.14 1.207c2.203 3.251-5.21 11.023-4.454 21.827" fill={colors.secondary} stroke={colors.primary} strokeWidth="0.5"></path>
            </g>
          </motion.g>
        );

      case 'applause':
        return (
          <motion.g
            animate={animate ? {
              x: [0, 10, 0],
              rotate: [0, -15, 0],
              transition: { duration: 0.3, repeat: Infinity }
            } : {}}
            style={{ transformOrigin: "30px 90px" }}
          >
            {/* Hand shadow */}
            <ellipse cx="25" cy="95" rx="15" ry="4" fill="black" opacity="0.15" />
            
            {/* Arm connection */}
            <rect x="22" y="80" width="6" height="8" rx="3" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" />
            
            {/* Palm - angled for clapping */}
            <ellipse cx="28" cy="88" rx="11" ry="12" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="2" 
              transform="rotate(-15 28 88)" />
            
            {/* Fingers grouped together - simplified */}
            <g transform="rotate(-15 28 88)">
              <rect x="28" y="78" width="12" height="8" rx="4" 
                fill={colors.secondary} 
                stroke={colors.primary} 
                strokeWidth="1.5" />
              <circle cx="40" cy="82" r="4" 
                fill={colors.secondary} 
                stroke={colors.primary} 
                strokeWidth="1.5" />
            </g>
            
            {/* Thumb tucked */}
            <ellipse cx="20" cy="92" rx="4" ry="6" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              transform="rotate(-45 20 92)" />
            
            {/* Palm highlight */}
            <ellipse cx="26" cy="87" rx="5" ry="6" fill={colors.accent} opacity="0.3" />
            
            {/* Clap impact effect */}
            <motion.g
              animate={animate ? {
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.8, 0.5],
                transition: { duration: 0.3, repeat: Infinity }
              } : {}}
            >
              <g transform="translate(32, 78) scale(0.15)">
                <svg width="25" height="25" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.0001 1C15.0001 0.447715 14.5524 0 14.0001 0C13.4478 0 13.0001 0.447715 13.0001 1V3C13.0001 3.55228 13.4478 4 14.0001 4C14.5524 4 15.0001 3.55228 15.0001 3V1ZM10.7072 1.29289C10.3167 0.902369 9.68349 0.902369 9.29297 1.29289C8.90244 1.68342 8.90244 2.31658 9.29297 2.70711L10.293 3.70711C10.6835 4.09763 11.3167 4.09763 11.7072 3.70711C12.0977 3.31658 12.0977 2.68342 11.7072 2.29289L10.7072 1.29289ZM18.7072 2.70711C19.0977 2.31658 19.0977 1.68342 18.7072 1.29289C18.3167 0.902369 17.6835 0.902369 17.293 1.29289L16.293 2.29289C15.9024 2.68342 15.9024 3.31658 16.293 3.70711C16.6835 4.09763 17.3167 4.09763 17.7072 3.70711L18.7072 2.70711ZM9.80864 5.39611C9.35019 4.93767 8.73884 4.55126 8.06021 4.41553C7.34665 4.27282 6.54739 4.41472 5.91955 5.04256C5.7265 5.23561 5.57939 5.44487 5.47237 5.66286C5.28204 5.58105 5.0832 5.51719 4.87823 5.47619C4.16467 5.33348 3.36541 5.47538 2.73757 6.10322C2.10972 6.73107 1.96783 7.53032 2.11054 8.24388C2.15154 8.44885 2.2154 8.64769 2.29721 8.83803C2.07922 8.94504 1.86996 9.09215 1.67691 9.2852C1.04906 9.91305 0.907169 10.7123 1.04988 11.4259C1.18561 12.1045 1.57202 12.7158 2.03046 13.1743L2.06719 13.211C1.93173 13.2987 1.80097 13.4038 1.67691 13.5278C1.04906 14.1557 0.907169 14.9549 1.04988 15.6685C1.18561 16.3471 1.57202 16.9585 2.03046 17.4169L6.98021 22.3667C8.99817 24.3846 12.157 24.4841 14.8588 23.0676C16.9438 23.5374 19.2576 23.0196 21.2058 21.0713C22.9322 19.345 24.0001 16.6238 24.0001 14.3642C24.0001 12.0101 22.8954 10.0118 21.0135 8.12529L20.4277 7.52569L20.4278 7.52564L20.4196 7.51743C19.9611 7.05899 19.3498 6.67258 18.6711 6.53685C17.9576 6.39414 17.1583 6.53604 16.5305 7.16388C16.4058 7.28858 16.3 7.42003 16.2117 7.55626L16.1726 7.51743L16.1713 7.5161C15.713 7.05824 15.1021 6.67245 14.4242 6.53685C13.7106 6.39414 12.9114 6.53604 12.2835 7.16388C12.1594 7.28794 12.0544 7.4187 11.9667 7.55417L9.80864 5.39611ZM11.2228 11.053L7.68732 7.51743C7.43865 7.26877 7.29473 6.99624 7.25368 6.79099C7.21962 6.62067 7.2545 6.53604 7.33376 6.45677C7.41302 6.37751 7.49765 6.34263 7.66798 6.37669C7.87323 6.41774 8.14576 6.56167 8.39442 6.81033L12.6362 11.0521L12.6371 11.053L14.7584 13.1743C15.1489 13.5648 15.7821 13.5648 16.1726 13.1743C16.5631 12.7838 16.5631 12.1506 16.1726 11.7601L14.0513 9.63875L14.0506 9.63807C13.8024 9.38959 13.6587 9.11737 13.6176 8.91231C13.5836 8.74199 13.6185 8.65736 13.6977 8.57809C13.777 8.49883 13.8616 8.46395 14.0319 8.49801C14.2372 8.53906 14.5097 8.68299 14.7584 8.93165L14.7607 8.93397L16.8716 11.0311L17.58 11.7532L17.58 11.7533L17.5868 11.7601C18.3172 12.4905 18.6048 13.7688 18.2856 15.3647C17.9715 16.9354 17.0962 18.6147 15.819 19.8918C15.3118 20.3991 14.7707 20.8132 14.2176 21.1369C11.9736 22.4503 9.67717 22.2352 8.39442 20.9525L3.44468 16.0027C3.19601 15.7541 3.05209 15.4815 3.01104 15.2763C2.97698 15.1059 3.01186 15.0213 3.09112 14.9421C3.17038 14.8628 3.25501 14.8279 3.42534 14.862C3.63059 14.903 3.90312 15.0469 4.15178 15.2956L6.2731 17.4169C6.66363 17.8075 7.29679 17.8075 7.68732 17.4169C8.07784 17.0264 8.07784 16.3932 7.68732 16.0027L5.566 13.8814L3.44468 11.7601C3.19601 11.5114 3.05209 11.2389 3.01104 11.0336C2.97698 10.8633 3.01186 10.7787 3.09112 10.6994C3.17038 10.6202 3.25501 10.5853 3.42534 10.6193C3.63059 10.6604 3.90312 10.8043 4.15178 11.053L7.68732 14.5885C8.07784 14.979 8.71101 14.979 9.10153 14.5885C9.49205 14.198 9.49205 13.5648 9.10153 13.1743L5.566 9.63875L4.50534 8.57809C4.25667 8.32943 4.11275 8.0569 4.0717 7.85165C4.03764 7.68133 4.07252 7.5967 4.15178 7.51743C4.23104 7.43817 4.31567 7.40329 4.486 7.43735C4.69125 7.4784 4.96378 7.62233 5.21244 7.87099L6.2731 8.93165L9.80864 12.4672C10.1992 12.8577 10.8323 12.8577 11.2228 12.4672C11.6134 12.0767 11.6134 11.4435 11.2228 11.053ZM19.7916 19.6571C19.0398 20.4089 18.2461 20.8594 17.4576 21.0748C18.8876 19.5558 19.873 17.6255 20.2468 15.7569C20.6344 13.8189 20.3923 11.7403 19.0046 10.3494L18.2949 9.62592L18.2949 9.62589L18.2881 9.61909C18.0379 9.3689 17.8988 9.10223 17.8602 8.90582C17.829 8.74692 17.8598 8.66298 17.9447 8.57809C18.0239 8.49883 18.1086 8.46395 18.2789 8.49801C18.4831 8.53886 18.754 8.68156 19.0016 8.92797L19.5867 9.52674L19.5866 9.52678L19.5942 9.53435C21.2556 11.1988 22.0001 12.7199 22.0001 14.3642C22.0001 16.1046 21.135 18.3137 19.7916 19.6571Z" fill={colors.accent}/>
                </svg>
              </g>
            </motion.g>
          </motion.g>
        );
        
      case 'pointUp':
        return (
          <motion.g
            animate={animate ? {
              y: [-1, 1, -1],
              transition: { duration: 2, repeat: Infinity }
            } : {}}
            style={{ transformOrigin: "25px 90px" }}
          >
            {/* Hand shadow */}
            <ellipse cx="25" cy="95" rx="15" ry="4" fill="black" opacity="0.15" />
            
            {/* Arm connection */}
            <rect x="22" y="80" width="6" height="8" rx="3" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" />
            
            {/* Palm */}
            <ellipse cx="25" cy="88" rx="11" ry="10" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="2" />
            
            {/* Index finger pointing up - simple and clear */}
            <rect x="22" y="74" width="6" height="14" rx="3" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="2" />
            <circle cx="25" cy="72" r="4" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="2" />
            
            {/* Other fingers folded - simplified */}
            <rect x="28" y="85" width="7" height="6" rx="3" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" />
            <rect x="28" y="89" width="7" height="5" rx="2.5" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" />
            
            {/* Thumb */}
            <ellipse cx="17" cy="85" rx="4" ry="5" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              transform="rotate(-45 17 85)" />
            
            {/* Palm highlight */}
            <ellipse cx="23" cy="87" rx="5" ry="5" fill={colors.accent} opacity="0.3" />
            
            {/* Pointing emphasis */}
            <motion.circle
              cx="25" cy="72"
              r="6"
              fill={colors.accent}
              opacity="0"
              animate={animate ? {
                opacity: [0, 0.4, 0],
                scale: [0.8, 1.3, 0.8],
                transition: { duration: 1.5, repeat: Infinity }
              } : {}}
            />
          </motion.g>
        );

      case 'pointDown':
        return (
          <motion.g
            animate={animate ? {
              y: [1, -1, 1],
              transition: { duration: 2, repeat: Infinity }
            } : {}}
            style={{ transformOrigin: "25px 90px" }}
          >
            {/* Hand shadow */}
            <ellipse cx="25" cy="95" rx="15" ry="4" fill="black" opacity="0.15" />
            
            {/* Arm connection */}
            <rect x="22" y="80" width="6" height="8" rx="3" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" />
            
            {/* Palm */}
            <ellipse cx="25" cy="86" rx="11" ry="10" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="2" />
            
            {/* Index finger pointing down - simple */}
            <rect x="22" y="88" width="6" height="14" rx="3" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="2" />
            <circle cx="25" cy="104" r="4" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="2" />
            
            {/* Other fingers folded */}
            <rect x="28" y="83" width="7" height="6" rx="3" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" />
            <rect x="28" y="87" width="7" height="5" rx="2.5" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" />
            
            {/* Thumb */}
            <ellipse cx="17" cy="83" rx="4" ry="5" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              transform="rotate(-45 17 83)" />
            
            {/* Palm highlight */}
            <ellipse cx="23" cy="85" rx="5" ry="5" fill={colors.accent} opacity="0.3" />
            
            {/* Pointing emphasis downward */}
            <motion.path
              d="M 25 106 L 25 110 M 23 108 L 25 110 L 27 108"
              stroke={colors.accent}
              strokeWidth="2"
              fill="none"
              opacity="0"
              animate={animate ? {
                opacity: [0, 0.6, 0],
                y: [0, 3, 0],
                transition: { duration: 1.5, repeat: Infinity }
              } : {}}
            />
          </motion.g>
        );

      case 'openHands':
        return (
          <motion.g
            animate={animate ? {
              scale: [1, 1.03, 1],
              rotate: [-3, 3, -3],
              transition: { duration: 2.5, repeat: Infinity }
            } : {}}
            style={{ transformOrigin: "25px 90px" }}
          >
            {/* Hand shadow */}
            <ellipse cx="25" cy="95" rx="16" ry="5" fill="black" opacity="0.15" />
            
            {/* Arm connection */}
            <rect x="22" y="80" width="6" height="8" rx="3" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" />
            
            {/* Palm - large and open */}
            <ellipse cx="25" cy="88" rx="14" ry="12" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="2" />
            
            {/* All fingers spread - simplified cartoon style */}
            {/* Thumb */}
            <ellipse cx="12" cy="85" rx="4" ry="7" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              transform="rotate(-50 12 85)" />
            {/* Fingers as simple rounded rectangles */}
            <rect x="14" y="74" width="6" height="12" rx="3" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              transform="rotate(-20 17 80)" />
            <rect x="21" y="72" width="6" height="13" rx="3" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              transform="rotate(-5 24 78.5)" />
            <rect x="28" y="72" width="6" height="13" rx="3" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              transform="rotate(5 31 78.5)" />
            <rect x="34" y="74" width="5" height="11" rx="2.5" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              transform="rotate(20 36.5 79.5)" />
            
            {/* Palm lines for detail */}
            <path d="M 18 88 Q 25 90 32 88" 
              fill="none" 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              opacity="0.3" />
            <path d="M 20 92 Q 25 90 30 92" 
              fill="none" 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              opacity="0.3" />
            
            {/* Central highlight */}
            <ellipse cx="25" cy="88" rx="8" ry="8" fill={colors.accent} opacity="0.25" />
            
            {/* Welcoming glow */}
            <motion.ellipse 
              cx="25" cy="88" 
              rx="16" ry="14" 
              fill={colors.accent} 
              opacity="0"
              animate={animate ? {
                opacity: [0, 0.2, 0],
                scale: [0.9, 1.1, 0.9],
                transition: { duration: 2, repeat: Infinity }
              } : {}}
            />
          </motion.g>
        );

      default:
        return null;
    }
  };

  const renderRightHand = (gesture: HandGesture) => {
    const handProps = {
      fill: colors.secondary,
      stroke: colors.primary,
      strokeWidth: "2",
      strokeLinejoin: "round" as const,
      strokeLinecap: "round" as const
    };

    switch (gesture) {
      case 'thumbsUp':
        return (
          <motion.g
            animate={animate ? {
              rotate: [5, -5, 5],
              y: [0, -2, 0],
              transition: { duration: 1.5, repeat: Infinity, delay: 0.3 }
            } : {}}
            style={{ transformOrigin: "75px 95px" }}
          >
            {/* Hand shadow */}
            <ellipse cx="75" cy="105" rx="10" ry="3" fill="black" opacity="0.1" />
            
            {/* SVG Thumbs Up Icon (mirrored) */}
            <g transform="translate(75, 79) scale(0.25)">
              <path 
                fill={colors.secondary}
                stroke={colors.primary}
                strokeWidth="1"
                d="M64,28c0-3.314-2.687-6-6-6H41l0,0h-0.016H41l2-18c0.209-2.188-1.287-4-3.498-4h-4.001
                   C33,0,31.959,1.75,31,4l-8,18c-2.155,5.169-5,6-7,6c-1,0-2,0-2,0v-2c0-2.212-1.789-4-4-4H4c-2.211,0-4,1.788-4,4v34
                   c0,2.21,1.789,4,4,4h6c2.211,0,4-1.79,4-4v-2c1,0,3.632,0.052,6.21,2.697C23.324,63.894,27.043,64,29,64h23c3.313,0,6-2.688,6-6
                   c0-1.731-0.737-3.288-1.91-4.383C58.371,52.769,60,50.577,60,48c0-1.731-0.737-3.288-1.91-4.383
                   C60.371,42.769,62,40.577,62,38c0-1.731-0.737-3.288-1.91-4.383C62.371,32.769,64,30.577,64,28z"
              />
              
              {/* Thumb base highlight */}
              <ellipse cx="7" cy="45" rx="3" ry="8" fill={colors.accent} opacity="0.3" />
              
              {/* Success sparkle effect */}
              <motion.g
                animate={animate ? {
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                  transition: { duration: 2, repeat: Infinity, delay: 0.3 }
                } : {}}
              >
                <circle cx="50" cy="15" r="2" fill={colors.accent} opacity="0.8" />
                <circle cx="15" cy="20" r="1.5" fill={colors.accent} opacity="0.6" />
              </motion.g>
            </g>
          </motion.g>
        );

      case 'thumbsDown':
        return (
          <motion.g
            animate={animate ? {
              rotate: [5, -5, 5],
              y: [0, 2, 0],
              transition: { duration: 1.5, repeat: Infinity, delay: 0.3 }
            } : {}}
            style={{ transformOrigin: "75px 95px" }}
          >
            {/* Hand shadow */}
            <ellipse cx="75" cy="105" rx="10" ry="3" fill="black" opacity="0.1" />
            
            {/* SVG Thumbs Down Icon (rotated and mirrored) */}
            <g transform="translate(75, 95) scale(0.25, -0.25)">
              <path 
                fill={colors.secondary}
                stroke={colors.primary}
                strokeWidth="1"
                d="M64,28c0-3.314-2.687-6-6-6H41l0,0h-0.016H41l2-18c0.209-2.188-1.287-4-3.498-4h-4.001
                   C33,0,31.959,1.75,31,4l-8,18c-2.155,5.169-5,6-7,6c-1,0-2,0-2,0v-2c0-2.212-1.789-4-4-4H4c-2.211,0-4,1.788-4,4v34
                   c0,2.21,1.789,4,4,4h6c2.211,0,4-1.79,4-4v-2c1,0,3.632,0.052,6.21,2.697C23.324,63.894,27.043,64,29,64h23c3.313,0,6-2.688,6-6
                   c0-1.731-0.737-3.288-1.91-4.383C58.371,52.769,60,50.577,60,48c0-1.731-0.737-3.288-1.91-4.383
                   C60.371,42.769,62,40.577,62,38c0-1.731-0.737-3.288-1.91-4.383C62.371,32.769,64,30.577,64,28z"
              />
              
              {/* Thumb base highlight */}
              <ellipse cx="7" cy="45" rx="3" ry="8" fill="#ef4444" opacity="0.4" />
              
              {/* Negative effect */}
              <motion.g
                animate={animate ? {
                  rotate: [0, -360],
                  scale: [0.8, 1.2, 0.8],
                  transition: { duration: 2, repeat: Infinity, delay: 0.3 }
                } : {}}
              >
                <circle cx="50" cy="50" r="2" fill="#ef4444" opacity="0.8" />
                <circle cx="15" cy="45" r="1.5" fill="#ef4444" opacity="0.6" />
              </motion.g>
            </g>
          </motion.g>
        );

      case 'wave':
        return (
          <motion.g
            animate={animate ? {
              rotate: [15, -15, 15],
              transition: { duration: 0.8, repeat: Infinity }
            } : {}}
            style={{ transformOrigin: "68px 76px" }}
          >
            {/* Waving hand SVG - scaled and positioned for right hand */}
            <g transform="scale(0.4) translate(290, 120) scale(-1, 1)">
              <path d="M5.946 30.785c-2.999 7.189 2.213 15.866 9.784 17.387c-5.9-3.962-9.584-10.327-9.784-17.387" fill={colors.primary}></path>
              <path d="M15.73 48.172l-.184-.039c.023.006.078.015.184.039" fill={colors.primary}></path>
              <path d="M2 44.261c.489 6.02 8.039 9.878 13.457 7.412C9.879 50.475 6.179 49.378 2 44.261" fill={colors.primary}></path>
              <path d="M46.504 22.794c3.512-7.168-1.475-16.036-9.055-17.963c5.799 4.233 9.239 10.824 9.055 17.963" fill={colors.primary}></path>
              <path d="M48.865 17.848c4.192-3.709 2.502-11.088-2.332-13.49c2.33 4.565 3.151 8.421 2.332 13.49" fill={colors.primary}></path>
              <path d="M60.519 14.345a5.43 5.43 0 0 0-3.303-1.116c-7.206 0-8.498 9.386-10.097 13.05c0 0-7.389-15.469-9.959-20.573c-2.65-5.265-8.307-4.177-9.964-1.311C23.26.316 15.823 3.609 16.771 8.568c-5.104-.392-7.167 4.643-6.034 7.871c-3.945-.122-5.789 4.757-4.455 8.25c.069.182 7.073 13.966 8.959 18.662c.219.545.44 1.128.672 1.742c1.525 4.032 3.614 9.554 8.84 13.989C27.003 60.991 30.118 62 33.764 62c6.426 0 13.581-3.189 18.229-8.126c4.163-4.421 6.158-9.848 5.77-15.695c-.348-5.256 1.324-10.208 2.667-14.188c1.457-4.319 2.607-7.731.089-9.646m-5.947 23.66c.813 11.628-10.842 21.439-20.73 21.439c-3.021 0-6.15-.488-8.105-2.147c-5.606-4.758-7.013-10.646-8.638-14.684c-1.941-4.831-6.705-14.114-9.014-18.784c-.945-1.912.634-5.981 3.384-5.981L19.4 34.716l3.005 1.804s-6.882-14.998-9.061-20.167c-1.272-3.018.92-6.662 3.874-6.187l9.846 21.016l3.006 1.808L18.594 8.757c-.046-4.295 5.831-4.362 7.197-1.854c3.457 6.348 9.947 20.279 9.947 20.279l3.004 1.807L27.969 6.146c2.104-2.754 5.816-2.368 7.416.975c1.922 4.015 10.061 21.454 10.061 21.454c-8.035 3.012-13.52 11.743-7.777 20.35c-4.557-9.41 3.516-16.06 8.285-18.258c1.805-.833 2.469-2.408 2.469-2.408l-.004.001c.629-1.139.592-2.662 1.342-5.127c1.625-5.335 3.854-8.162 7.125-8.162c.754 0 1.704.564 2.14 1.207c2.203 3.251-5.21 11.023-4.454 21.827" fill={colors.secondary} stroke={colors.primary} strokeWidth="0.5"></path>
            </g>
          </motion.g>
        );

      case 'applause':
        return (
          <motion.g
            animate={animate ? {
              x: [0, -12, 0],
              rotate: [0, 20, 0],
              transition: { duration: 0.3, repeat: Infinity }
            } : {}}
            style={{ transformOrigin: "70px 70px" }}
          >
            {/* Hand shadow */}
            <ellipse cx="75" cy="82" rx="12" ry="5" fill="black" opacity="0.15" />
            
            {/* Arm/Wrist */}
            <rect x="70" y="70" width="10" height="12" rx="5" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="2" />
            
            {/* Palm - angled for clapping */}
            <path d="M 62 58 C 62 53, 67 48, 72 48 C 77 48, 82 53, 82 58 L 82 68 C 82 73, 77 78, 72 78 C 67 78, 62 73, 62 68 Z" 
              {...handProps} 
              transform="rotate(15 72 63)" />
            
            {/* Fingers together for clapping */}
            <g transform="rotate(15 72 48)">
              <ellipse cx="68" cy="48" rx="3" ry="6" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" />
              <ellipse cx="72" cy="46" rx="3" ry="7" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" />
              <ellipse cx="76" cy="48" rx="3" ry="6" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" />
            </g>
            
            {/* Thumb */}
            <ellipse cx="65" cy="58" rx="3" ry="5" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" 
              transform="rotate(15 65 58)" />
            
            {/* Inner palm detail */}
            <path d="M 67 63 Q 72 61 77 63" 
              fill="none" 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              opacity="0.3" />
            
            {/* Clap effect */}
            <motion.g
              animate={animate ? {
                opacity: [0, 1, 0],
                scale: [0.8, 1.5, 0.8],
                transition: { duration: 0.3, repeat: Infinity }
              } : {}}
            >
              <g transform="translate(48, 48) scale(0.15)">
                <svg width="25" height="25" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.0001 1C15.0001 0.447715 14.5524 0 14.0001 0C13.4478 0 13.0001 0.447715 13.0001 1V3C13.0001 3.55228 13.4478 4 14.0001 4C14.5524 4 15.0001 3.55228 15.0001 3V1ZM10.7072 1.29289C10.3167 0.902369 9.68349 0.902369 9.29297 1.29289C8.90244 1.68342 8.90244 2.31658 9.29297 2.70711L10.293 3.70711C10.6835 4.09763 11.3167 4.09763 11.7072 3.70711C12.0977 3.31658 12.0977 2.68342 11.7072 2.29289L10.7072 1.29289ZM18.7072 2.70711C19.0977 2.31658 19.0977 1.68342 18.7072 1.29289C18.3167 0.902369 17.6835 0.902369 17.293 1.29289L16.293 2.29289C15.9024 2.68342 15.9024 3.31658 16.293 3.70711C16.6835 4.09763 17.3167 4.09763 17.7072 3.70711L18.7072 2.70711ZM9.80864 5.39611C9.35019 4.93767 8.73884 4.55126 8.06021 4.41553C7.34665 4.27282 6.54739 4.41472 5.91955 5.04256C5.7265 5.23561 5.57939 5.44487 5.47237 5.66286C5.28204 5.58105 5.0832 5.51719 4.87823 5.47619C4.16467 5.33348 3.36541 5.47538 2.73757 6.10322C2.10972 6.73107 1.96783 7.53032 2.11054 8.24388C2.15154 8.44885 2.2154 8.64769 2.29721 8.83803C2.07922 8.94504 1.86996 9.09215 1.67691 9.2852C1.04906 9.91305 0.907169 10.7123 1.04988 11.4259C1.18561 12.1045 1.57202 12.7158 2.03046 13.1743L2.06719 13.211C1.93173 13.2987 1.80097 13.4038 1.67691 13.5278C1.04906 14.1557 0.907169 14.9549 1.04988 15.6685C1.18561 16.3471 1.57202 16.9585 2.03046 17.4169L6.98021 22.3667C8.99817 24.3846 12.157 24.4841 14.8588 23.0676C16.9438 23.5374 19.2576 23.0196 21.2058 21.0713C22.9322 19.345 24.0001 16.6238 24.0001 14.3642C24.0001 12.0101 22.8954 10.0118 21.0135 8.12529L20.4277 7.52569L20.4278 7.52564L20.4196 7.51743C19.9611 7.05899 19.3498 6.67258 18.6711 6.53685C17.9576 6.39414 17.1583 6.53604 16.5305 7.16388C16.4058 7.28858 16.3 7.42003 16.2117 7.55626L16.1726 7.51743L16.1713 7.5161C15.713 7.05824 15.1021 6.67245 14.4242 6.53685C13.7106 6.39414 12.9114 6.53604 12.2835 7.16388C12.1594 7.28794 12.0544 7.4187 11.9667 7.55417L9.80864 5.39611ZM11.2228 11.053L7.68732 7.51743C7.43865 7.26877 7.29473 6.99624 7.25368 6.79099C7.21962 6.62067 7.2545 6.53604 7.33376 6.45677C7.41302 6.37751 7.49765 6.34263 7.66798 6.37669C7.87323 6.41774 8.14576 6.56167 8.39442 6.81033L12.6362 11.0521L12.6371 11.053L14.7584 13.1743C15.1489 13.5648 15.7821 13.5648 16.1726 13.1743C16.5631 12.7838 16.5631 12.1506 16.1726 11.7601L14.0513 9.63875L14.0506 9.63807C13.8024 9.38959 13.6587 9.11737 13.6176 8.91231C13.5836 8.74199 13.6185 8.65736 13.6977 8.57809C13.777 8.49883 13.8616 8.46395 14.0319 8.49801C14.2372 8.53906 14.5097 8.68299 14.7584 8.93165L14.7607 8.93397L16.8716 11.0311L17.58 11.7532L17.58 11.7533L17.5868 11.7601C18.3172 12.4905 18.6048 13.7688 18.2856 15.3647C17.9715 16.9354 17.0962 18.6147 15.819 19.8918C15.3118 20.3991 14.7707 20.8132 14.2176 21.1369C11.9736 22.4503 9.67717 22.2352 8.39442 20.9525L3.44468 16.0027C3.19601 15.7541 3.05209 15.4815 3.01104 15.2763C2.97698 15.1059 3.01186 15.0213 3.09112 14.9421C3.17038 14.8628 3.25501 14.8279 3.42534 14.862C3.63059 14.903 3.90312 15.0469 4.15178 15.2956L6.2731 17.4169C6.66363 17.8075 7.29679 17.8075 7.68732 17.4169C8.07784 17.0264 8.07784 16.3932 7.68732 16.0027L5.566 13.8814L3.44468 11.7601C3.19601 11.5114 3.05209 11.2389 3.01104 11.0336C2.97698 10.8633 3.01186 10.7787 3.09112 10.6994C3.17038 10.6202 3.25501 10.5853 3.42534 10.6193C3.63059 10.6604 3.90312 10.8043 4.15178 11.053L7.68732 14.5885C8.07784 14.979 8.71101 14.979 9.10153 14.5885C9.49205 14.198 9.49205 13.5648 9.10153 13.1743L5.566 9.63875L4.50534 8.57809C4.25667 8.32943 4.11275 8.0569 4.0717 7.85165C4.03764 7.68133 4.07252 7.5967 4.15178 7.51743C4.23104 7.43817 4.31567 7.40329 4.486 7.43735C4.69125 7.4784 4.96378 7.62233 5.21244 7.87099L6.2731 8.93165L9.80864 12.4672C10.1992 12.8577 10.8323 12.8577 11.2228 12.4672C11.6134 12.0767 11.6134 11.4435 11.2228 11.053ZM19.7916 19.6571C19.0398 20.4089 18.2461 20.8594 17.4576 21.0748C18.8876 19.5558 19.873 17.6255 20.2468 15.7569C20.6344 13.8189 20.3923 11.7403 19.0046 10.3494L18.2949 9.62592L18.2949 9.62589L18.2881 9.61909C18.0379 9.3689 17.8988 9.10223 17.8602 8.90582C17.829 8.74692 17.8598 8.66298 17.9447 8.57809C18.0239 8.49883 18.1086 8.46395 18.2789 8.49801C18.4831 8.53886 18.754 8.68156 19.0016 8.92797L19.5867 9.52674L19.5866 9.52678L19.5942 9.53435C21.2556 11.1988 22.0001 12.7199 22.0001 14.3642C22.0001 16.1046 21.135 18.3137 19.7916 19.6571Z" fill={colors.accent}/>
                </svg>
              </g>
            </motion.g>
          </motion.g>
        );
        
      case 'pointUp':
        return (
          <motion.g
            animate={animate ? {
              y: [-2, 2, -2],
              transition: { duration: 2, repeat: Infinity }
            } : {}}
            style={{ transformOrigin: "75px 70px" }}
          >
            {/* Hand shadow */}
            <ellipse cx="75" cy="82" rx="12" ry="5" fill="black" opacity="0.15" />
            
            {/* Arm/Wrist */}
            <rect x="70" y="70" width="10" height="15" rx="5" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="2" />
            
            {/* Palm */}
            <path d="M 65 58 C 65 53, 70 48, 75 48 C 80 48, 85 53, 85 58 L 85 68 C 85 73, 80 78, 75 78 C 70 78, 65 73, 65 68 Z" 
              {...handProps} />
            
            {/* Index finger pointing up */}
            <ellipse cx="75" cy="42" rx="4" ry="10" fill={colors.secondary} stroke={colors.primary} strokeWidth="2" />
            <circle cx="75" cy="38" r="4" fill={colors.secondary} stroke={colors.primary} strokeWidth="2" />
            
            {/* Other fingers curled */}
            <ellipse cx="70" cy="58" rx="3" ry="5" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" />
            <ellipse cx="80" cy="58" rx="3" ry="5" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" />
            
            {/* Thumb */}
            <ellipse cx="84" cy="55" rx="3" ry="5" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" 
              transform="rotate(45 84 55)" />
            
            {/* Inner palm detail */}
            <path d="M 70 63 Q 75 61 80 63" 
              fill="none" 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              opacity="0.3" />
            
            {/* Highlight on fingertip */}
            <circle cx="75" cy="38" r="2" fill={colors.accent} opacity="0.5" />
          </motion.g>
        );

      case 'pointDown':
        return (
          <motion.g
            animate={animate ? {
              y: [2, -2, 2],
              transition: { duration: 2, repeat: Infinity }
            } : {}}
            style={{ transformOrigin: "75px 70px" }}
          >
            {/* Hand shadow */}
            <ellipse cx="75" cy="82" rx="12" ry="5" fill="black" opacity="0.15" />
            
            {/* Arm/Wrist */}
            <rect x="70" y="68" width="10" height="15" rx="5" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="2" />
            
            {/* Palm - rotated */}
            <path d="M 65 55 C 65 50, 70 45, 75 45 C 80 45, 85 50, 85 55 L 85 65 C 85 70, 80 75, 75 75 C 70 75, 65 70, 65 65 Z" 
              {...handProps} 
              transform="rotate(180 75 60)" />
            
            {/* Index finger pointing down */}
            <ellipse cx="75" cy="83" rx="4" ry="10" fill={colors.secondary} stroke={colors.primary} strokeWidth="2" />
            <circle cx="75" cy="87" r="4" fill={colors.secondary} stroke={colors.primary} strokeWidth="2" />
            
            {/* Other fingers curled */}
            <g transform="rotate(180 75 60)">
              <ellipse cx="70" cy="52" rx="3" ry="5" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" />
              <ellipse cx="80" cy="52" rx="3" ry="5" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" />
            </g>
            
            {/* Thumb */}
            <ellipse cx="66" cy="65" rx="3" ry="5" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" 
              transform="rotate(-45 66 65)" />
            
            {/* Inner palm detail */}
            <path d="M 70 57 Q 75 59 80 57" 
              fill="none" 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              opacity="0.3" />
            
            {/* Highlight on fingertip */}
            <circle cx="75" cy="87" r="2" fill={colors.accent} opacity="0.5" />
          </motion.g>
        );

      case 'openHands':
        return (
          <motion.g
            animate={animate ? {
              scale: [1, 1.05, 1],
              rotate: [5, -5, 5],
              transition: { duration: 2.5, repeat: Infinity }
            } : {}}
            style={{ transformOrigin: "75px 70px" }}
          >
            {/* Hand shadow */}
            <ellipse cx="75" cy="82" rx="14" ry="6" fill="black" opacity="0.15" />
            
            {/* Arm/Wrist */}
            <rect x="70" y="68" width="10" height="15" rx="5" 
              fill={colors.secondary} 
              stroke={colors.primary} 
              strokeWidth="2" />
            
            {/* Palm - open and facing forward */}
            <path d="M 62 52 C 62 47, 68 42, 75 42 C 82 42, 88 47, 88 52 L 88 65 C 88 70, 82 75, 75 75 C 68 75, 62 70, 62 65 Z" 
              {...handProps} />
            
            {/* All fingers spread open */}
            {/* Thumb */}
            <ellipse cx="88" cy="55" rx="3" ry="6" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" 
              transform="rotate(45 88 55)" />
            {/* Index finger */}
            <ellipse cx="82" cy="44" rx="3" ry="8" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" 
              transform="rotate(15 82 44)" />
            {/* Middle finger */}
            <ellipse cx="75" cy="42" rx="3" ry="9" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" />
            {/* Ring finger */}
            <ellipse cx="68" cy="44" rx="3" ry="8" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" 
              transform="rotate(-15 68 44)" />
            {/* Pinky */}
            <ellipse cx="62" cy="48" rx="3" ry="7" fill={colors.secondary} stroke={colors.primary} strokeWidth="1.5" 
              transform="rotate(-30 62 48)" />
            
            {/* Palm lines */}
            <path d="M 68 58 Q 75 60 82 58" 
              fill="none" 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              opacity="0.3" />
            <path d="M 70 65 Q 75 63 80 65" 
              fill="none" 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              opacity="0.3" />
            
            {/* Highlight */}
            <ellipse cx="75" cy="57" rx="8" ry="10" fill={colors.accent} opacity="0.3" />
          </motion.g>
        );

      default:
        return null;
    }
  };

  // Main Hand Rendering Function
  const renderHands = () => {
    if (currentHandGesture === 'none' || currentHandDisplay === 'none') return null;

    const shouldShowLeft = currentHandDisplay === 'both' || currentHandDisplay === 'left';
    const shouldShowRight = currentHandDisplay === 'both' || currentHandDisplay === 'right';

    return (
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {shouldShowLeft && renderLeftHand(currentHandGesture)}
        {shouldShowRight && renderRightHand(currentHandGesture)}
      </motion.g>
    );
  };

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
        
        {/* Hands - Rendered last so they appear on top */}
        <AnimatePresence>
          {renderHands()}
        </AnimatePresence>

        {/* Glasses - Rendered after hands with high z-index to force on top */}
        {glasses && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ 
              zIndex: 9999,
              pointerEvents: 'none'
            }}
          >
            {/* Left lens frame */}
            <circle
              cx="35"
              cy="45"
              r="12"
              fill="none"
              stroke="#374151"
              strokeWidth="2.5"
              style={{ zIndex: 9999 }}
            />
            {/* Right lens frame */}
            <circle
              cx="65"
              cy="45"
              r="12"
              fill="none"
              stroke="#374151"
              strokeWidth="2.5"
              style={{ zIndex: 9999 }}
            />
            {/* Bridge */}
            <path
              d="M 47 45 L 53 45"
              stroke="#374151"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ zIndex: 9999 }}
            />
            {/* Left temple */}
            <path
              d="M 23 45 Q 17 45 17 50"
              stroke="#374151"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              style={{ zIndex: 9999 }}
            />
            {/* Right temple */}
            <path
              d="M 77 45 Q 83 45 83 50"
              stroke="#374151"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              style={{ zIndex: 9999 }}
            />
            {/* Lens glint effect */}
            <ellipse
              cx="38"
              cy="39"
              rx="2"
              ry="3"
              fill="white"
              opacity="0.7"
              style={{ zIndex: 9999 }}
            />
            <ellipse
              cx="68"
              cy="39"
              rx="2"
              ry="3"
              fill="white"
              opacity="0.7"
              style={{ zIndex: 9999 }}
            />
          </motion.g>
        )}

        {/* Coffee Mug - Using provided SVG */}
        {coffeeMug && (
          <motion.g
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          >
            {/* Steam lines */}
            <motion.g
              animate={{
                y: [0, -2, 0],
                opacity: [0.6, 0.3, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path
                d="M 45 72 Q 45 68 47 68 Q 49 68 49 72"
                stroke="white"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
                strokeLinecap="round"
              />
              <path
                d="M 49 70 Q 49 66 51 66 Q 53 66 53 70"
                stroke="white"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
                strokeLinecap="round"
              />
              <path
                d="M 53 72 Q 53 68 55 68 Q 57 68 57 72"
                stroke="white"
                strokeWidth="1"
                fill="none"
                opacity="0.5"
                strokeLinecap="round"
              />
            </motion.g>
            
            {/* Your provided SVG */}
            <g transform="translate(37, 75) scale(0.8)">
              <path d="M367.028169,4964.99989 C367.587944,4964.99989 368.042254,4964.5519 368.042254,4963.99991 L368.042254,4960.99998 C368.042254,4960.44799 367.587944,4960 367.028169,4960 C366.468394,4960 366.014085,4960.44799 366.014085,4960.99998 L366.014085,4963.99991 C366.014085,4964.5519 366.468394,4964.99989 367.028169,4964.99989 L367.028169,4964.99989 Z M379.197183,4968.99981 L377.169014,4968.99981 L377.169014,4971.99974 L379.197183,4971.99974 C381.563042,4971.99974 381.563042,4968.99981 379.197183,4968.99981 L379.197183,4968.99981 Z M375.140845,4968.99981 L368.042254,4968.99981 C367.482479,4968.99981 367.028169,4969.4478 367.028169,4969.99978 L367.028169,4971.82775 C367.028169,4973.9167 368.576676,4975.78266 370.685972,4975.98066 C373.105577,4976.20865 375.140845,4974.33869 375.140845,4971.99974 L375.140845,4968.99981 Z M379.197183,4973.9997 L376.815099,4973.9997 C375.903437,4976.53864 373.316507,4978.29561 370.359437,4977.95861 C367.25938,4977.60462 365,4974.86768 365,4971.78975 L365,4968.99981 C365,4967.89483 365.907606,4966.99985 367.028169,4966.99985 L377.169014,4966.99985 L379.197183,4966.99985 C384.267606,4966.99985 384.267606,4973.9997 379.197183,4973.9997 L379.197183,4973.9997 Z M375.140845,4964.99989 C375.70062,4964.99989 376.15493,4964.5519 376.15493,4963.99991 L376.15493,4960.99998 C376.15493,4960.44799 375.70062,4960 375.140845,4960 C374.58107,4960 374.126761,4960.44799 374.126761,4960.99998 L374.126761,4963.99991 C374.126761,4964.5519 374.58107,4964.99989 375.140845,4964.99989 L375.140845,4964.99989 Z M370.070423,4963.99991 L370.070423,4960.99998 C370.070423,4960.44799 370.524732,4960 371.084507,4960 C371.644282,4960 372.098592,4960.44799 372.098592,4960.99998 L372.098592,4963.99991 C372.098592,4964.5519 371.644282,4964.99989 371.084507,4964.99989 C370.524732,4964.99989 370.070423,4964.5519 370.070423,4963.99991 L370.070423,4963.99991 Z" 
                fill="#8B4513" 
                transform="translate(-365, -4960)"
              />
            </g>
          </motion.g>
        )}

        {/* Graduation Cap - Positioned on top of brain */}
        {hat && (
          <motion.g
            initial={{ scale: 0, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
          >
            {/* Using your provided graduation cap SVG */}
            <g transform="translate(50, 6) scale(1.8)">
              {/* Cap base (the part that sits on head) */}
              <ellipse
                cx="-2"
                cy="8"
                rx="6"
                ry="3"
                fill="#1a1a1a"
                stroke="#333"
                strokeWidth="0.3"
                transform="translate(2, 0)"
              />
              
              <path 
                d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" 
                fill="#1a1a1a"
                stroke="#333"
                strokeWidth="0.5"
                transform="translate(-12, -5)"
              />
              
              {/* Fixed connection line from cap */}
              <path 
                d="M10 5 L10 11" 
                stroke="#1a1a1a"
                strokeWidth="1"
                strokeLinecap="round"
              />
              
              {/* Tassel */}
              <motion.g
                animate={{
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: "10px 11px" }}
              >
                <circle cx="10" cy="11" r="1" fill="#DAA520" />
                <path 
                  d="M10 12 L10 16 M9 16 L11 16" 
                  stroke="#DAA520"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </motion.g>
            </g>
          </motion.g>
        )}
        
        </motion.g>
      </svg>
    </div>
  );
};

export default BrainMascot;