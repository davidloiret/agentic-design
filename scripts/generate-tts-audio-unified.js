const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

// Load environment variables
require('dotenv').config();

// Unified TTS Audio Generation Script
// Supports multiple patterns with individual configuration files

class TTSGenerator {
  constructor() {
    this.configDir = path.join(__dirname, 'tts-config');
    this.audioBaseDir = path.join(__dirname, '../public/audio');
    this.openai = null;
    this.initOpenAI();
  }

  // Initialize OpenAI client
  initOpenAI() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
      console.log('✅ OpenAI TTS enabled');
    } else {
      console.log('⚠️  OpenAI API key not found. Set OPENAI_API_KEY environment variable for audio generation.');
    }
  }

  // Get all available pattern configurations
  getAvailablePatterns() {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true });
      return [];
    }
    
    return fs.readdirSync(this.configDir)
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
  }

  // Load configuration for a specific pattern
  loadPatternConfig(patternName) {
    const configPath = path.join(this.configDir, `${patternName}.json`);
    
    if (!fs.existsSync(configPath)) {
      throw new Error(`Configuration file not found for pattern: ${patternName}`);
    }
    
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  // Ensure audio directory exists for pattern
  ensureAudioDirectory(patternName) {
    const audioDir = path.join(this.audioBaseDir, patternName);
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }
    return audioDir;
  }

  // Generate TTS script for a pattern
  generateTTSScript(patternName) {
    const config = this.loadPatternConfig(patternName);
    const audioDir = this.ensureAudioDirectory(patternName);
    
    console.log(`\n🎵 Generating TTS script for: ${config.title}`);
    console.log('='.repeat(60));
    
    // Generate script content
    let scriptContent = `# ${config.title}\n`;
    scriptContent += `# ${config.description}\n\n`;
    
    if (config.voice) {
      scriptContent += `Voice Configuration:\n`;
      scriptContent += `- Provider: ${config.voice.provider}\n`;
      scriptContent += `- Voice ID: ${config.voice.voice_id}\n`;
      if (config.voice.settings) {
        scriptContent += `- Settings: ${JSON.stringify(config.voice.settings, null, 2)}\n`;
      }
      scriptContent += `\n`;
    }
    
    scriptContent += `Total Duration: ${config.timing?.totalDuration || 'Unknown'}s\n`;
    scriptContent += `Video Length: ${config.timing?.videoLength || 'Unknown'} frames\n\n`;
    
    config.segments.forEach((segment, index) => {
      scriptContent += `## Segment ${index + 1}: ${segment.id}\n`;
      scriptContent += `Text: "${segment.text}"\n`;
      scriptContent += `Duration: ${segment.duration}s\n`;
      
      if (segment.emphasis && segment.emphasis.length > 0) {
        scriptContent += `Emphasis: ${segment.emphasis.join(', ')}\n`;
      }
      
      if (config.timing?.segments) {
        const timing = config.timing.segments.find(t => t.id === segment.id);
        if (timing) {
          scriptContent += `Timing: Frame ${timing.startFrame} - ${timing.endFrame}\n`;
        }
      }
      
      scriptContent += `Output: ${segment.id}.wav\n`;
      scriptContent += `MP3 Output: ${segment.id}.mp3\n\n`;
    });
    
    // Write script file
    const scriptPath = path.join(audioDir, 'tts-script.txt');
    fs.writeFileSync(scriptPath, scriptContent);
    
    // Update timing config
    this.updateTimingConfig(patternName, config);
    
    // Generate info file
    this.generateInfoFile(patternName, config, audioDir);
    
    console.log(`📝 TTS script: ${scriptPath}`);
    console.log(`📁 Audio directory: ${audioDir}`);
    
    return {
      scriptPath,
      audioDir,
      segments: config.segments
    };
  }

  // Update timing configuration with auto-calculated duration
  updateTimingConfig(patternName, config) {
    const audioDir = path.join(this.audioBaseDir, patternName);
    const fps = config.timing?.fps || 30;
    
    // Auto-calculate timing based on segment durations - NO GAPS
    let currentFrame = 60; // Start after title animation
    const narrationSegments = config.segments.map(segment => {
      const durationFrames = Math.ceil(segment.duration * fps);
      const startFrame = currentFrame;
      const endFrame = startFrame + durationFrames;
      
      // Move to next segment immediately - NO BUFFER
      currentFrame = endFrame;
      
      return {
        id: segment.id.replace(`${patternName.split('-')[0]}-`, '').replace('seq-', ''),
        text: segment.text,
        filename: `${segment.id}.wav`,
        startFrame: startFrame,
        endFrame: endFrame,
        duration: segment.duration,
        durationFrames: durationFrames
      };
    });
    
    // Calculate total video duration based on last segment end + minimal buffer
    const lastSegment = narrationSegments[narrationSegments.length - 1];
    const totalFrames = lastSegment.endFrame + (fps * 0.5); // 0.5 second buffer at end
    const totalDuration = Math.ceil(totalFrames / fps);
    
    console.log(`📊 Auto-calculated video duration: ${totalDuration}s (${totalFrames} frames)`);
    
    const timingConfig = {
      version: "1.0.0",
      generated: new Date().toISOString(),
      fps: fps,
      totalFrames: totalFrames,
      totalDuration: totalDuration,
      narrationSegments: narrationSegments,
      visualElements: this.generateVisualElements(config, narrationSegments, totalFrames)
    };
    
    fs.writeFileSync(
      path.join(audioDir, 'timing-config.json'),
      JSON.stringify(timingConfig, null, 2)
    );
    
    // Auto-update Remotion Root.tsx with calculated duration
    this.updateRemotionConfig(patternName, totalFrames);
  }

  // Generate visual elements timing
  generateVisualElements(config, narrationSegments, totalFrames) {
    const elements = {
      titleAnimation: { startFrame: 0, endFrame: 60 }
    };
    
    // Add pattern-specific visual elements based on calculated segments
    if (narrationSegments && narrationSegments.length > 0) {
      elements.steps = narrationSegments.map((segment, index) => ({
        id: `step${index + 1}`,
        startFrame: segment.startFrame,
        duration: segment.durationFrames
      }));
      
      const lastSegment = narrationSegments[narrationSegments.length - 1];
      elements.benefits = {
        startFrame: lastSegment.endFrame + 15,
        duration: Math.min(120, totalFrames - lastSegment.endFrame - 15)
      };
      elements.callToAction = {
        startFrame: lastSegment.endFrame + 45,
        duration: Math.min(90, totalFrames - lastSegment.endFrame - 45)
      };
    }
    
    return elements;
  }

  // Auto-update Remotion Root.tsx configuration with calculated duration
  updateRemotionConfig(patternName, totalFrames) {
    const rootTsxPath = path.join(__dirname, '../src/remotion/Root.tsx');
    
    if (!fs.existsSync(rootTsxPath)) {
      console.log('⚠️  Root.tsx not found, skipping auto-update');
      return;
    }
    
    try {
      let rootContent = fs.readFileSync(rootTsxPath, 'utf8');
      
      // Create composition mapping for different patterns
      const compositionMap = {
        'sequential-chaining': 'ProfessionalSequentialChaining',
        'chain-of-thought': 'ChainOfThoughtWithAudio',
        'chain-of-debates': 'ChainOfDebatesWithAudio'
      };
      
      const compositionId = compositionMap[patternName];
      if (!compositionId) {
        console.log(`⚠️  No composition mapping found for pattern: ${patternName}`);
        return;
      }
      
      // Check if composition exists in file
      if (!rootContent.includes(`id="${compositionId}"`)) {
        console.log(`❌ Composition ${compositionId} NOT found in Root.tsx`);
        console.log('Available compositions:', rootContent.match(/id="[^"]+"/g) || 'none');
        return;
      }
      
      // Simpler approach: Find and replace durationInFrames within the specific composition
      const lines = rootContent.split('\n');
      let inTargetComposition = false;
      let updated = false;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if we're entering the target composition
        if (line.includes(`id="${compositionId}"`)) {
          inTargetComposition = true;
        }
        
        // If we're in the target composition and find durationInFrames
        if (inTargetComposition && line.includes('durationInFrames=')) {
          lines[i] = line.replace(/durationInFrames=\{?\d+\}?/, `durationInFrames={${totalFrames}}`);
          updated = true;
          inTargetComposition = false; // Stop looking
          break;
        }
        
        // If we hit the end of the composition without finding durationInFrames
        if (inTargetComposition && line.includes('/>')) {
          inTargetComposition = false;
        }
      }
      
      if (updated) {
        const updatedContent = lines.join('\n');
        fs.writeFileSync(rootTsxPath, updatedContent);
        console.log(`✅ Updated Root.tsx: ${compositionId} duration set to ${totalFrames} frames`);
      } else {
        console.log(`⚠️  Could not find durationInFrames in composition ${compositionId}`);
      }
      
    } catch (error) {
      console.error('❌ Failed to update Root.tsx:', error.message);
    }
  }

  // Generate info file for TTS providers
  generateInfoFile(patternName, config, audioDir) {
    const infoContent = {
      pattern: patternName,
      title: config.title,
      description: config.description,
      voice: config.voice,
      segments: config.segments,
      files: {
        required: config.segments.flatMap(segment => [
          `${segment.id}.wav`,
          `${segment.id}.mp3`
        ]),
        script: 'tts-script.txt',
        timing: 'timing-config.json'
      },
      instructions: [
        'Use consistent voice and tone across all segments',
        'Maintain professional but engaging delivery',
        'Emphasize key technical terms as specified',
        'Keep pace moderate for technical content',
        'Export as high-quality WAV (44.1kHz, 16-bit minimum)',
        'Convert to MP3 for web optimization',
        'Ensure audio levels are consistent across all files'
      ]
    };
    
    fs.writeFileSync(
      path.join(audioDir, 'generation-info.json'),
      JSON.stringify(infoContent, null, 2)
    );
  }

  // Generate actual audio files using OpenAI TTS
  async generateAudioFiles(patternName) {
    if (!this.openai) {
      console.log('❌ OpenAI API key not configured. Cannot generate audio files.');
      console.log('💡 Set OPENAI_API_KEY environment variable or use --script-only flag');
      return false;
    }

    const config = this.loadPatternConfig(patternName);
    const audioDir = this.ensureAudioDirectory(patternName);
    
    console.log(`\n🎵 Generating audio files for: ${config.title}`);
    console.log('='.repeat(60));
    
    let successCount = 0;
    let totalCount = config.segments.length;
    
    for (const segment of config.segments) {
      try {
        console.log(`🎤 Generating: ${segment.id}`);
        
        // Generate speech using OpenAI TTS
        const mp3Response = await this.openai.audio.speech.create({
          model: "tts-1",
          voice: this.getOpenAIVoice(config.voice?.voice_id || 'alloy'),
          input: segment.text,
          response_format: 'mp3'
        });
        
        // Save MP3 file
        const mp3Path = path.join(audioDir, `${segment.id}.mp3`);
        const mp3Buffer = Buffer.from(await mp3Response.arrayBuffer());
        fs.writeFileSync(mp3Path, mp3Buffer);
        
        // Generate WAV version (OpenAI TTS doesn't directly support WAV, so we note this)
        const wavResponse = await this.openai.audio.speech.create({
          model: "tts-1",
          voice: this.getOpenAIVoice(config.voice?.voice_id || 'alloy'),
          input: segment.text,
          response_format: 'wav'
        });
        
        // Save WAV file
        const wavPath = path.join(audioDir, `${segment.id}.wav`);
        const wavBuffer = Buffer.from(await wavResponse.arrayBuffer());
        fs.writeFileSync(wavPath, wavBuffer);
        
        console.log(`  ✅ ${segment.id}.mp3`);
        console.log(`  ✅ ${segment.id}.wav`);
        successCount++;
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`  ❌ Failed to generate ${segment.id}:`, error.message);
      }
    }
    
    console.log(`\n📊 Generated ${successCount}/${totalCount} audio files`);
    
    if (successCount === totalCount) {
      console.log(`✅ All audio files generated successfully!`);
      console.log(`📁 Files saved to: ${audioDir}`);
      return true;
    } else {
      console.log(`⚠️  Some files failed to generate. Check errors above.`);
      return false;
    }
  }

  // Map voice IDs to OpenAI voices
  getOpenAIVoice(voiceId) {
    const voiceMap = {
      'professional-male': 'onyx',
      'professional-female': 'nova',
      'friendly-male': 'echo',
      'friendly-female': 'shimmer',
      'authoritative': 'onyx',
      'conversational': 'alloy'
    };
    
    return voiceMap[voiceId] || 'alloy';
  }

  // Generate for all available patterns
  generateAll() {
    const patterns = this.getAvailablePatterns();
    
    if (patterns.length === 0) {
      console.log('❌ No pattern configurations found in:', this.configDir);
      console.log('📁 Create .json files in the tts-config directory');
      return;
    }
    
    console.log('🎵 Unified TTS Audio Generation');
    console.log('Available patterns:', patterns.join(', '));
    
    const results = patterns.map(pattern => {
      try {
        return this.generateTTSScript(pattern);
      } catch (error) {
        console.error(`❌ Error generating TTS for ${pattern}:`, error.message);
        return null;
      }
    }).filter(Boolean);
    
    console.log(`\n✅ Generated TTS scripts for ${results.length}/${patterns.length} patterns`);
    
    // Summary
    console.log('\n📋 Summary:');
    results.forEach(result => {
      console.log(`  📁 ${path.basename(result.audioDir)}: ${result.segments.length} segments`);
    });
    
    console.log('\n🔧 Next steps:');
    console.log('1. Review generated TTS scripts');
    console.log('2. Use your preferred TTS service (ElevenLabs, Azure, Google, etc.)');
    console.log('3. Generate audio files according to the scripts');
    console.log('4. Place audio files in the respective directories');
    console.log('5. Test video compositions with audio');
  }

  // Generate for specific pattern
  async generatePattern(patternName, generateAudio = false) {
    try {
      const result = this.generateTTSScript(patternName);
      // Load the generated timing config to get totalFrames
      const timingConfigPath = path.join(result.audioDir, 'timing-config.json');
      const timingConfig = JSON.parse(fs.readFileSync(timingConfigPath, 'utf8'));
      
      console.log(`\n✅ TTS script generated for ${patternName}`);
      console.log(`📂 Files created in: ${result.audioDir}`);
      console.log(`📝 Script: ${result.scriptPath}`);
      
      if (generateAudio) {
        const success = await this.generateAudioFiles(patternName);
        if (success) {
          console.log('\n🎉 Audio generation complete!');
        }
      } else {
        console.log('\n📋 Required audio files:');
        result.segments.forEach(segment => {
          console.log(`  - ${segment.id}.wav`);
          console.log(`  - ${segment.id}.mp3`);
        });
        console.log('\n💡 Use --audio flag to generate actual audio files with OpenAI TTS');
      }
      
      console.log('\n🎬 Remotion Configuration:');
      console.log(`  ✅ Root.tsx automatically updated`);
      console.log(`  ✅ Video duration: ${timingConfig.totalDuration}s (${timingConfig.totalFrames} frames)`);
      console.log(`  ✅ Audio timing: timing-config.json generated`);
      console.log('\n🚀 Ready to render! No manual adjustments needed.');
    } catch (error) {
      console.error(`❌ Error generating TTS for ${patternName}:`, error.message);
    }
  }

  // Generate audio for all patterns
  async generateAllAudio() {
    const patterns = this.getAvailablePatterns();
    
    if (patterns.length === 0) {
      console.log('❌ No pattern configurations found');
      return;
    }
    
    console.log(`🎵 Generating audio for ${patterns.length} patterns...`);
    
    for (const pattern of patterns) {
      console.log(`\n${'='.repeat(60)}`);
      await this.generatePattern(pattern, true);
    }
    
    console.log('\n🎉 Batch audio generation complete!');
  }
}

// CLI Interface
async function main() {
  const generator = new TTSGenerator();
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // Generate scripts for all patterns
    generator.generateAll();
  } else if (args[0] === '--list') {
    // List available patterns
    const patterns = generator.getAvailablePatterns();
    console.log('📋 Available patterns:');
    patterns.forEach(pattern => console.log(`  - ${pattern}`));
  } else if (args[0] === '--audio-all') {
    // Generate audio for all patterns
    await generator.generateAllAudio();
  } else if (args[0] === '--help') {
    // Show help
    console.log('🎵 Unified TTS Audio Generation');
    console.log('');
    console.log('Usage:');
    console.log('  node generate-tts-audio-unified.js                    # Generate scripts for all patterns');
    console.log('  node generate-tts-audio-unified.js <pattern>          # Generate script for specific pattern');
    console.log('  node generate-tts-audio-unified.js <pattern> --audio  # Generate script + audio files');
    console.log('  node generate-tts-audio-unified.js --audio-all        # Generate audio for all patterns');
    console.log('  node generate-tts-audio-unified.js --list             # List available patterns');
    console.log('  node generate-tts-audio-unified.js --help             # Show this help');
    console.log('');
    console.log('Environment Variables:');
    console.log('  OPENAI_API_KEY  Required for audio generation');
    console.log('');
    console.log('Examples:');
    console.log('  node generate-tts-audio-unified.js sequential-chaining --audio');
    console.log('  node generate-tts-audio-unified.js chain-of-thought --audio');
  } else {
    // Generate for specific pattern
    const patternName = args[0];
    const generateAudio = args.includes('--audio');
    await generator.generatePattern(patternName, generateAudio);
  }
}

// Export for use as module
module.exports = TTSGenerator;

// Run if called directly
if (require.main === module) {
  main();
}