import { staticFile } from 'remotion';

export interface NarrationSegment {
  id: string;
  text: string;
  filename: string;
  startFrame: number;
  endFrame: number;
  duration: number;
  durationFrames: number;
}

export interface VisualElement {
  startFrame: number;
  duration?: number;
  endFrame?: number;
}

export interface TimingConfig {
  version: string;
  generated: string;
  fps: number;
  totalFrames: number;
  totalDuration: number;
  narrationSegments: NarrationSegment[];
  visualElements: {
    titleAnimation: VisualElement;
    steps: Array<VisualElement & { id: string }>;
    benefits?: VisualElement;
    callToAction?: VisualElement;
  };
}

// Cache for timing configurations
const timingCache = new Map<string, TimingConfig>();

/**
 * Load timing configuration for a specific pattern
 * @param patternName - The pattern name (e.g., 'sequential-chaining')
 * @returns Promise<TimingConfig>
 */
export async function loadTimingConfig(patternName: string): Promise<TimingConfig> {
  // Check cache first
  if (timingCache.has(patternName)) {
    return timingCache.get(patternName)!;
  }

  try {
    const configPath = staticFile(`audio/${patternName}/timing-config.json`);
    const response = await fetch(configPath);
    
    if (!response.ok) {
      throw new Error(`Failed to load timing config: ${response.status}`);
    }
    
    const config: TimingConfig = await response.json();
    
    // Cache the configuration
    timingCache.set(patternName, config);
    
    console.log(`✅ Loaded timing config for ${patternName}:`, {
      duration: `${config.totalDuration}s`,
      frames: config.totalFrames,
      segments: config.narrationSegments.length
    });
    
    return config;
  } catch (error) {
    console.error(`❌ Failed to load timing config for ${patternName}:`, error);
    
    // Return fallback configuration
    return createFallbackConfig(patternName);
  }
}

/**
 * Create a fallback configuration if the timing config can't be loaded
 */
function createFallbackConfig(patternName: string): TimingConfig {
  console.warn(`⚠️ Using fallback timing config for ${patternName}`);
  
  return {
    version: "1.0.0",
    generated: new Date().toISOString(),
    fps: 30,
    totalFrames: 1500, // 50 seconds fallback
    totalDuration: 50,
    narrationSegments: [
      {
        id: "intro",
        text: "Loading...",
        filename: "seq-intro.wav",
        startFrame: 60,
        endFrame: 300,
        duration: 8,
        durationFrames: 240
      }
    ],
    visualElements: {
      titleAnimation: { startFrame: 0, endFrame: 60 },
      steps: [
        { id: "step1", startFrame: 60, duration: 240 }
      ]
    }
  };
}

/**
 * Get scene timing based on narration segments
 */
export function getSceneTiming(segments: NarrationSegment[]) {
  return segments.reduce((scenes, segment, index) => {
    scenes[segment.id] = {
      start: segment.startFrame,
      duration: segment.durationFrames
    };
    return scenes;
  }, {} as Record<string, { start: number; duration: number }>);
}

/**
 * Clear timing cache (useful for development/hot reload)
 */
export function clearTimingCache() {
  timingCache.clear();
  console.log('🧹 Timing cache cleared');
}