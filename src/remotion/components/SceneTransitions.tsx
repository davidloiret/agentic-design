import React from 'react';
import { 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate,
  Easing
} from 'remotion';

// Advanced scene transition effects
export const SceneTransition: React.FC<{
  children: React.ReactNode;
  startFrame: number;
  endFrame: number;
  transitionType?: 'fade' | 'slide' | 'morph' | 'zoom' | 'flip' | 'particle' | 'liquid';
  direction?: 'up' | 'down' | 'left' | 'right';
  easing?: keyof typeof easingFunctions;
}> = ({ 
  children, 
  startFrame, 
  endFrame, 
  transitionType = 'fade',
  direction = 'up',
  easing = 'smooth'
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const easingFunctions = {
    smooth: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    snappy: Easing.bezier(0.68, -0.55, 0.265, 1.55),
    organic: Easing.bezier(0.23, 1, 0.32, 1),
    mechanical: Easing.bezier(0.7, 0, 0.84, 0),
  };
  
  if (frame < startFrame || frame > endFrame) return null;
  
  const progress = (frame - startFrame) / (endFrame - startFrame);
  const easedProgress = interpolate(progress, [0, 1], [0, 1], { 
    easing: easingFunctions[easing] 
  });
  
  const getTransform = () => {
    switch (transitionType) {
      case 'slide':
        const slideDistance = direction === 'up' || direction === 'down' ? 1080 : 1920;
        const slideOffset = direction === 'up' || direction === 'left' ? -slideDistance : slideDistance;
        const axis = direction === 'up' || direction === 'down' ? 'Y' : 'X';
        return `translate${axis}(${interpolate(easedProgress, [0, 1], [slideOffset, 0])}px)`;
      
      case 'zoom':
        return `scale(${interpolate(easedProgress, [0, 1], [0.8, 1])})`;
      
      case 'flip':
        return `rotateY(${interpolate(easedProgress, [0, 1], [90, 0])}deg)`;
      
      case 'morph':
        return `scale(${interpolate(easedProgress, [0, 0.5, 1], [0.9, 1.05, 1])}) 
                rotateZ(${interpolate(easedProgress, [0, 1], [3, 0])}deg)`;
      
      default:
        return 'none';
    }
  };
  
  const getOpacity = () => {
    if (transitionType === 'particle') {
      return interpolate(easedProgress, [0, 0.3, 1], [0, 0.8, 1]);
    }
    return interpolate(easedProgress, [0, 1], [0, 1]);
  };
  
  const getFilter = () => {
    if (transitionType === 'liquid') {
      return `blur(${interpolate(easedProgress, [0, 0.5, 1], [10, 2, 0])}px)`;
    }
    return 'none';
  };
  
  return (
    <div
      style={{
        transform: getTransform(),
        opacity: getOpacity(),
        filter: getFilter(),
        transition: transitionType === 'liquid' ? 'filter 0.3s ease' : 'none',
      }}
    >
      {transitionType === 'particle' && (
        <ParticleEffect progress={easedProgress} />
      )}
      {children}
    </div>
  );
};

// Particle effect for dramatic transitions
const ParticleEffect: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const particleCount = 20;
  
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = interpolate(progress, [0, 1], [0, 300]);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const opacity = interpolate(progress, [0, 0.5, 1], [0, 1, 0]);
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(${x}px, ${y}px)`,
              width: '4px',
              height: '4px',
              background: '#3b82f6',
              borderRadius: '50%',
              opacity,
              boxShadow: '0 0 10px #3b82f6',
            }}
          />
        );
      })}
    </div>
  );
};

// Morphing background for seamless scene changes
export const MorphingBackground: React.FC<{
  scenes: Array<{
    startFrame: number;
    endFrame: number;
    colors: string[];
    pattern?: 'gradient' | 'dots' | 'waves' | 'geometric';
  }>;
}> = ({ scenes }) => {
  const frame = useCurrentFrame();
  
  const currentScene = scenes.find(scene => 
    frame >= scene.startFrame && frame <= scene.endFrame
  );
  
  if (!currentScene) return null;
  
  const sceneProgress = (frame - currentScene.startFrame) / 
    (currentScene.endFrame - currentScene.startFrame);
  
  const getBackgroundStyle = () => {
    const { colors, pattern = 'gradient' } = currentScene;
    
    switch (pattern) {
      case 'dots':
        return {
          background: `radial-gradient(circle at 20% 20%, ${colors[0]}30 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, ${colors[1]}30 0%, transparent 50%),
                      radial-gradient(circle at 40% 60%, ${colors[2] || colors[0]}20 0%, transparent 50%)`,
        };
      
      case 'waves':
        const waveOffset = sceneProgress * 100;
        return {
          background: `linear-gradient(45deg, 
            ${colors[0]} ${waveOffset}%, 
            ${colors[1]} ${waveOffset + 50}%, 
            ${colors[0]} ${waveOffset + 100}%)`,
          backgroundSize: '400% 400%',
        };
      
      case 'geometric':
        return {
          background: `conic-gradient(from ${sceneProgress * 360}deg, 
            ${colors[0]}, ${colors[1]}, ${colors[0]})`,
        };
      
      default:
        return {
          background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        };
    }
  };
  
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        ...getBackgroundStyle(),
        opacity: interpolate(sceneProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]),
      }}
    />
  );
};

// Camera movement system for cinematic effects
export const CinematicContainer: React.FC<{
  children: React.ReactNode;
  cameraMovements: Array<{
    startFrame: number;
    endFrame: number;
    from: { x: number; y: number; scale: number; rotation: number };
    to: { x: number; y: number; scale: number; rotation: number };
    easing?: string;
  }>;
}> = ({ children, cameraMovements }) => {
  const frame = useCurrentFrame();
  
  const currentMovement = cameraMovements.find(movement => 
    frame >= movement.startFrame && frame <= movement.endFrame
  );
  
  if (!currentMovement) {
    return <div>{children}</div>;
  }
  
  const progress = (frame - currentMovement.startFrame) / 
    (currentMovement.endFrame - currentMovement.startFrame);
  
  const { from, to } = currentMovement;
  
  const x = interpolate(progress, [0, 1], [from.x, to.x]);
  const y = interpolate(progress, [0, 1], [from.y, to.y]);
  const scale = interpolate(progress, [0, 1], [from.scale, to.scale]);
  const rotation = interpolate(progress, [0, 1], [from.rotation, to.rotation]);
  
  return (
    <div
      style={{
        transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
};

// Attention-grabbing highlight system
export const AttentionHighlight: React.FC<{
  children: React.ReactNode;
  active: boolean;
  type?: 'glow' | 'pulse' | 'shake' | 'spotlight';
  intensity?: number;
}> = ({ children, active, type = 'glow', intensity = 1 }) => {
  const frame = useCurrentFrame();
  
  if (!active) return <>{children}</>;
  
  const getHighlightStyle = () => {
    const pulse = Math.sin(frame * 0.1) * 0.5 + 0.5;
    
    switch (type) {
      case 'glow':
        return {
          filter: `drop-shadow(0 0 ${20 * intensity * pulse}px #3b82f6) brightness(${1 + 0.2 * intensity * pulse})`,
        };
      
      case 'pulse':
        return {
          transform: `scale(${1 + 0.05 * intensity * pulse})`,
        };
      
      case 'shake':
        const shake = Math.sin(frame * 0.5) * 2 * intensity;
        return {
          transform: `translateX(${shake}px)`,
        };
      
      case 'spotlight':
        return {
          position: 'relative',
          '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle, transparent 30%, rgba(0,0,0,${0.7 * intensity}) 70%)`,
            pointerEvents: 'none',
          }
        };
      
      default:
        return {};
    }
  };
  
  return (
    <div style={getHighlightStyle()}>
      {children}
    </div>
  );
};