interface TimingConfig {
  version: string;
  generated: string;
  fps: number;
  totalFrames: number;
  totalDuration: number;
  narrationSegments: NarrationSegment[];
  visualElements: {
    titleAnimation: { startFrame: number; endFrame: number };
    promptComparison: { startFrame: number; duration: number };
    steps: Array<{ id: string; startFrame: number; duration: number }>;
    benefits: { startFrame: number; duration: number };
    callToAction: { startFrame: number; duration: number };
  };
}

interface NarrationSegment {
  id: string;
  text: string;
  filename: string;
  startFrame: number;
  endFrame: number;
  duration: number;
  durationFrames: number;
}

interface AudioIndex {
  dynamicTiming?: {
    totalFrames: number;
    totalDuration: number;
    narrationSegments: NarrationSegment[];
    configPath: string;
  };
}

export class DynamicTimingService {
  private static instance: DynamicTimingService;
  private timingConfig: TimingConfig | null = null;
  private audioIndex: AudioIndex | null = null;

  private constructor() {}

  static getInstance(): DynamicTimingService {
    if (!DynamicTimingService.instance) {
      DynamicTimingService.instance = new DynamicTimingService();
    }
    return DynamicTimingService.instance;
  }

  /**
   * Load timing configuration from audio index or timing config file
   * @param audioPath - Path to audio directory (e.g., '/audio/cot/')
   * @returns Promise<TimingConfig | null>
   */
  async loadTimingConfig(audioPath: string = '/audio/cot/'): Promise<TimingConfig | null> {
    try {
      // First try to load from audio index
      const indexResponse = await fetch(`${audioPath}index.json`);
      if (indexResponse.ok) {
        this.audioIndex = await indexResponse.json();
        
        // If dynamic timing is available in the index, use it
        if (this.audioIndex?.dynamicTiming) {
          const dynamicTiming = this.audioIndex.dynamicTiming;
          
          // Try to load the full timing config
          try {
            const configResponse = await fetch(dynamicTiming.configPath);
            if (configResponse.ok) {
              this.timingConfig = await configResponse.json();
              console.log('✅ Loaded dynamic timing configuration');
              return this.timingConfig;
            }
          } catch (error) {
            console.warn('Could not load timing config file, using index data');
          }
          
          // Fallback: construct basic timing from index data
          this.timingConfig = this.constructTimingFromIndex(dynamicTiming);
          return this.timingConfig;
        }
      }
      
      console.warn('No dynamic timing configuration found, using fallback timing');
      return null;
    } catch (error) {
      console.error('Failed to load timing configuration:', error);
      return null;
    }
  }

  /**
   * Get timing for narration segments
   * @returns NarrationSegment[] | null
   */
  getNarrationSegments(): NarrationSegment[] | null {
    return this.timingConfig?.narrationSegments || this.audioIndex?.dynamicTiming?.narrationSegments || null;
  }

  /**
   * Get total video duration in frames
   * @returns number
   */
  getTotalFrames(): number {
    return this.timingConfig?.totalFrames || this.audioIndex?.dynamicTiming?.totalFrames || 900; // fallback
  }

  /**
   * Get timing for a specific visual element
   * @param elementType - Type of visual element
   * @returns Object with timing info or null
   */
  getVisualElementTiming(elementType: keyof TimingConfig['visualElements']) {
    return this.timingConfig?.visualElements[elementType] || null;
  }

  /**
   * Get timing for a specific step
   * @param stepIndex - Index of the step (0-based)
   * @returns Object with timing info or null
   */
  getStepTiming(stepIndex: number) {
    const steps = this.timingConfig?.visualElements.steps;
    return steps && steps[stepIndex] ? steps[stepIndex] : null;
  }

  /**
   * Check if a frame is within a narration segment
   * @param frame - Current frame
   * @param segmentId - ID of the narration segment
   * @returns boolean
   */
  isFrameInNarrationSegment(frame: number, segmentId: string): boolean {
    const segments = this.getNarrationSegments();
    if (!segments) return false;
    
    const segment = segments.find(s => s.id === segmentId);
    return segment ? frame >= segment.startFrame && frame <= segment.endFrame : false;
  }

  /**
   * Get the active narration segment for a given frame
   * @param frame - Current frame
   * @returns NarrationSegment | null
   */
  getActiveNarrationSegment(frame: number): NarrationSegment | null {
    const segments = this.getNarrationSegments();
    if (!segments) return null;
    
    return segments.find(segment => 
      frame >= segment.startFrame && frame <= segment.endFrame
    ) || null;
  }

  /**
   * Construct basic timing config from audio index data
   * @param dynamicTiming - Dynamic timing data from audio index
   * @returns TimingConfig
   */
  private constructTimingFromIndex(dynamicTiming: AudioIndex['dynamicTiming']): TimingConfig {
    if (!dynamicTiming) throw new Error('No dynamic timing data provided');
    
    const { totalFrames, narrationSegments } = dynamicTiming;
    
    return {
      version: '1.0.0',
      generated: new Date().toISOString(),
      fps: 30,
      totalFrames,
      totalDuration: totalFrames / 30,
      narrationSegments,
      visualElements: {
        titleAnimation: { startFrame: 0, endFrame: 60 },
        promptComparison: { 
          startFrame: Math.max(60, narrationSegments[2]?.startFrame - 30 || 650), 
          duration: 300 
        },
        steps: narrationSegments.slice(0, 3).map((segment, index) => ({
          id: `step${index + 1}`,
          startFrame: segment.endFrame + 30,
          duration: 300
        })),
        benefits: { 
          startFrame: narrationSegments[narrationSegments.length - 1]?.endFrame + 60 || totalFrames - 300, 
          duration: 200 
        },
        callToAction: { 
          startFrame: totalFrames - 100, 
          duration: 100 
        }
      }
    };
  }

  /**
   * Clear cached timing configuration
   */
  clearCache(): void {
    this.timingConfig = null;
    this.audioIndex = null;
  }
}

export default DynamicTimingService; 