interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: string;
}

interface NarrationSegment {
  id: string;
  text: string;
  startFrame: number;
  endFrame: number;
  options?: TTSOptions;
}

export class TTSService {
  private static instance: TTSService;
  private audioCache: Map<string, string> = new Map();

  private constructor() {}

  static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService();
    }
    return TTSService.instance;
  }

  // Generate TTS audio using Web Speech API
  async generateTTSAudio(text: string, options: TTSOptions = {}): Promise<string> {
    const cacheKey = `${text}-${JSON.stringify(options)}`;
    
    if (this.audioCache.has(cacheKey)) {
      return this.audioCache.get(cacheKey)!;
    }

    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        // Fallback: return a silent audio data URL
        const silentAudio = this.createSilentAudio(2); // 2 seconds of silence
        this.audioCache.set(cacheKey, silentAudio);
        resolve(silentAudio);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate || 0.85;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 1.0;

      // Find the best voice
      const voices = speechSynthesis.getVoices();
      let selectedVoice = voices.find(voice => voice.name === options.voice);
      
      if (!selectedVoice) {
        // Prefer English voices for educational content
        selectedVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('samantha'))
        ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Estimate duration (rough calculation: average 5 characters per second)
      const estimatedDuration = Math.max(2, text.length / 5);
      
      utterance.onend = () => {
        // For now, we'll create a data URL representing the text
        // In a real implementation, this would capture actual audio
        const audioDataUrl = this.createTTSDataUrl(text, estimatedDuration);
        this.audioCache.set(cacheKey, audioDataUrl);
        resolve(audioDataUrl);
      };

      utterance.onerror = (error) => {
        console.warn('TTS Error:', error);
        // Fallback to silent audio
        const silentAudio = this.createSilentAudio(2);
        this.audioCache.set(cacheKey, silentAudio);
        resolve(silentAudio);
      };

      // Use a timeout to ensure we don't hang
      setTimeout(() => {
        const fallbackAudio = this.createTTSDataUrl(text, estimatedDuration);
        this.audioCache.set(cacheKey, fallbackAudio);
        resolve(fallbackAudio);
      }, 100);

      speechSynthesis.speak(utterance);
    });
  }

  // Generate multiple TTS audio files for narration segments
  async generateNarrationAudio(segments: NarrationSegment[]): Promise<Map<string, string>> {
    const audioMap = new Map<string, string>();
    
    for (const segment of segments) {
      try {
        const audioUrl = await this.generateTTSAudio(segment.text, segment.options);
        audioMap.set(segment.id, audioUrl);
      } catch (error) {
        console.warn(`Failed to generate TTS for segment ${segment.id}:`, error);
        // Use silent audio as fallback
        audioMap.set(segment.id, this.createSilentAudio(2));
      }
    }
    
    return audioMap;
  }

  // Create a simple TTS data URL (placeholder implementation)
  private createTTSDataUrl(text: string, duration: number): string {
    // This is a simplified approach - in production, you'd want to:
    // 1. Use a proper TTS service (Google Cloud TTS, Amazon Polly, etc.)
    // 2. Generate actual audio files
    // 3. Host them on a CDN
    
    // For now, we'll create a data URL that represents the text
    const audioData = {
      text,
      duration,
      timestamp: Date.now()
    };
    
    return `data:audio/wav;base64,${btoa(JSON.stringify(audioData))}`;
  }

  // Create silent audio data URL
  private createSilentAudio(duration: number): string {
    // Generate minimal WAV file data for silence
    const sampleRate = 44100;
    const samples = Math.floor(sampleRate * duration);
    const buffer = new ArrayBuffer(44 + samples * 2);
    const view = new DataView(buffer);
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples * 2, true);
    
    // Silent samples (all zeros)
    for (let i = 0; i < samples; i++) {
      view.setInt16(44 + i * 2, 0, true);
    }
    
    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  }

  // Clear audio cache
  clearCache(): void {
    // Revoke object URLs to prevent memory leaks
    this.audioCache.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    this.audioCache.clear();
  }
}

export default TTSService; 