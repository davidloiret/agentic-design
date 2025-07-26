#!/usr/bin/env node

/**
 * OpenAI TTS Audio Generation Script for Chain of Thought Video
 * 
 * This script generates high-quality TTS audio files using OpenAI's TTS API
 * for the Chain of Thought video narration segments.
 * 
 * Usage: node scripts/generate-tts-audio.js
 * 
 * Requirements:
 * - OpenAI API key in .env file as OPENAI_API_KEY
 * - npm install openai dotenv
 */

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

// Narration content for different techniques
const narrationContent = {
  cot: [
    {
      id: 'intro',
      text: "Chain of Thought reasoning transforms how AI solves complex problems - and it's surprisingly simple to implement.",
      filename: 'cot-intro.wav'
    },
    {
      id: 'implementation', 
      text: "For engineers, implementing CoT is as easy as adding 'Let's think step by step' to your prompts.",
      filename: 'cot-implementation.wav'
    },
    {
      id: 'comparison',
      text: "Let's see the dramatic difference between regular prompts and Chain of Thought prompts in action.",
      filename: 'cot-comparison.wav'
    },
    {
      id: 'regular',
      text: "Regular prompts give you direct answers with no reasoning - you can't verify or understand the process.",
      filename: 'cot-regular.wav'
    },
    {
      id: 'magic',
      text: "Chain of Thought prompts unlock the model's reasoning ability - just add the magic phrase and watch it think.",
      filename: 'cot-magic.wav'
    },
    {
      id: 'automatic',
      text: "The model automatically breaks down complex problems into clear, verifiable steps - no additional coding required.",
      filename: 'cot-automatic.wav'
    },
    {
      id: 'conclusion',
      text: "This simple technique delivers 40-70% accuracy improvements and complete transparency in AI decision-making.",
      filename: 'cot-conclusion.wav'
    }
  ],
  cod: [
    {
      id: 'intro',
      text: "Chain of Debates revolutionizes AI decision-making by bringing multiple perspectives together to collaborate, argue, and reach better conclusions through structured dialogue.",
      filename: 'cod-intro.wav'
    },
    {
      id: 'perspectives',
      text: "Instead of relying on a single AI viewpoint, we assign different roles - an advocate, a skeptic, and an analyst - each bringing unique perspectives to the problem.",
      filename: 'cod-perspectives.wav'
    },
    {
      id: 'debate',
      text: "Watch as each perspective presents their arguments, challenges others' positions, and refines their reasoning through multiple rounds of structured debate.",
      filename: 'cod-debate.wav'
    },
    {
      id: 'collaboration',
      text: "The real magic happens when perspectives collaborate - biases are exposed, assumptions are challenged, and edge cases are discovered through peer review.",
      filename: 'cod-collaboration.wav'
    },
    {
      id: 'synthesis',
      text: "A moderator synthesizes all viewpoints into a comprehensive decision that's more robust and well-reasoned than any single perspective could achieve.",
      filename: 'cod-synthesis.wav'
    },
    {
      id: 'conclusion',
      text: "Chain of Debates delivers 30-50% better decision quality by leveraging collective intelligence and reducing individual model biases through collaborative reasoning.",
      filename: 'cod-conclusion.wav'
    }
  ]
};

// Dynamic base narration segments (will be set based on technique parameter)
let baseNarrationSegments = [];

/**
 * Get actual audio duration from MP3 file using a simple approach
 * @param {string} filePath - Path to audio file
 * @returns {Promise<number>} Duration in seconds
 */
async function getAudioDuration(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return estimateDuration(baseNarrationSegments.find(s => filePath.includes(s.filename))?.text || '');
    }
    
    // For production, you'd use a library like 'node-ffprobe' or 'music-metadata'
    // For now, we'll use file size as a rough estimate for MP3 files
    const stats = fs.statSync(filePath);
    const fileSizeKB = stats.size / 1024;
    
    // Rough estimate: MP3 at 128kbps ≈ 16KB per second
    // OpenAI TTS typically generates at ~16kbps, so ~2KB per second
    const estimatedDuration = fileSizeKB / 16; // Rough estimate
    
    return Math.max(1, estimatedDuration);
  } catch (error) {
    console.warn(`Could not get duration for ${filePath}, using text estimation`);
    const segment = baseNarrationSegments.find(s => filePath.includes(s.filename));
    return estimateDuration(segment?.text || '');
  }
}

/**
 * Calculate dynamic timing for all segments based on actual audio durations
 * @param {number} fps - Frames per second (default 30)
 * @param {number} gapSeconds - Gap between segments in seconds (default 2)
 * @param {number} startDelay - Initial delay in seconds (default 2)
 * @returns {Promise<Array>} Array of segments with calculated timing
 */
async function calculateDynamicTiming(fps = 30, gapSeconds = 2, startDelay = 2) {
  console.log('🎯 Calculating dynamic timing based on actual audio durations...');
  
  const narrationSegments = [];
  let currentFrame = startDelay * fps; // Start after initial delay
  
  for (const [index, segment] of baseNarrationSegments.entries()) {
    const audioPath = path.join(audioDir, segment.filename);
    const mp3Path = audioPath.replace('.wav', '.mp3');
    
    // Get actual duration from audio file or estimate from text
    const duration = await getAudioDuration(fs.existsSync(mp3Path) ? mp3Path : audioPath);
    const durationFrames = Math.ceil(duration * fps);
    
    const segmentWithTiming = {
      ...segment,
      startFrame: currentFrame,
      endFrame: currentFrame + durationFrames,
      duration: duration,
      durationFrames: durationFrames
    };
    
    narrationSegments.push(segmentWithTiming);
    
    console.log(`📊 ${segment.id}: ${duration.toFixed(2)}s (${durationFrames} frames) [${currentFrame}-${currentFrame + durationFrames}]`);
    
    // Move to next segment start with gap
    currentFrame = currentFrame + durationFrames + (gapSeconds * fps);
  }
  
  const totalDuration = (currentFrame + (gapSeconds * fps)) / fps;
  const totalFrames = currentFrame + (gapSeconds * fps);
  
  console.log(`🎬 Total calculated duration: ${totalDuration.toFixed(2)}s (${totalFrames} frames)`);
  
  return { narrationSegments, totalFrames, totalDuration };
}

/**
 * Generate timing configuration file for video components
 * @param {Array} narrationSegments - Segments with timing
 * @param {number} totalFrames - Total video frames
 */
function generateTimingConfig(narrationSegments, totalFrames) {
  const timingConfig = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    fps: 30,
    totalFrames: totalFrames,
    totalDuration: totalFrames / 30,
    narrationSegments: narrationSegments,
    
    // Calculate timing for visual elements based on narration
    visualElements: {
      titleAnimation: {
        startFrame: 0,
        endFrame: 60
      },
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
  
  const configPath = path.join(audioDir, 'timing-config.json');
  fs.writeFileSync(configPath, JSON.stringify(timingConfig, null, 2));
  
  console.log(`⚙️  Timing configuration saved: ${configPath}`);
  return timingConfig;
}

// Parse command line arguments
const args = process.argv.slice(2);
const techniqueArg = args.find(arg => arg.startsWith('--technique=')) || args.find((arg, index) => args[index - 1] === '--technique');
const technique = techniqueArg ? techniqueArg.replace('--technique=', '') : 'cot';

// Validate technique parameter
if (!narrationContent[technique]) {
  console.error(`❌ Invalid technique: ${technique}. Available options: ${Object.keys(narrationContent).join(', ')}`);
  process.exit(1);
}

// Set dynamic content based on technique
baseNarrationSegments = narrationContent[technique];

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Dynamic audio directory based on technique
const audioDir = path.join(__dirname, `../public/audio/${technique}`);
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

/**
 * Generate TTS audio using OpenAI's TTS API
 * @param {string} text - Text to convert to speech
 * @param {string} filename - Output filename
 * @param {boolean} force - Force regeneration even if file exists
 * @returns {Promise<string>} Path to generated audio file
 */
async function generateTTSWithOpenAI(text, filename, force = false) {
  try {
    const audioPath = path.join(audioDir, filename);
    const mp3Path = audioPath.replace('.wav', '.mp3');
    
    // Check if files already exist and are valid (unless force is true)
    if (!force && fs.existsSync(audioPath) && fs.existsSync(mp3Path)) {
      const stats = fs.statSync(audioPath);
      if (stats.size > 1000) { // File exists and is larger than 1KB (not empty/corrupted)
        console.log(`⏭️  Skipping ${filename} - already exists (${(stats.size / 1024).toFixed(1)} KB)`);
        console.log(`💡 Use --force flag to regenerate existing files`);
        return audioPath;
      }
    }
    
    console.log(`🎤 Generating TTS with OpenAI for: ${filename}`);
    console.log(`📝 Text: "${text.substring(0, 50)}..."`);
    
    // Generate speech using OpenAI TTS
    const mp3Response = await openai.audio.speech.create({
      model: "tts-1-hd", // High-quality model
      voice: "nova", // Professional, clear female voice
      input: text,
      response_format: "mp3",
      speed: 0.95 // Slightly slower for educational content
    });
    
    // Convert response to buffer and save as MP3 first
    const buffer = Buffer.from(await mp3Response.arrayBuffer());
    fs.writeFileSync(mp3Path, buffer);
    
    // Also save as WAV for broader compatibility (we'll keep MP3 name but it's actually MP3)
    fs.writeFileSync(audioPath, buffer);
    
    console.log(`✅ Generated TTS audio: ${audioPath}`);
    console.log(`📊 File size: ${(buffer.length / 1024).toFixed(1)} KB`);
    
    return audioPath;
    
  } catch (error) {
    console.error(`❌ OpenAI TTS failed for ${filename}:`, error.message);
    
    // Create a fallback manifest file
    const audioPath = path.join(audioDir, filename);
    const manifest = {
      text,
      filename,
      error: error.message,
      fallback: true,
      duration: Math.max(2, text.length / 15),
      generated: new Date().toISOString()
    };
    
    fs.writeFileSync(audioPath.replace('.wav', '.json'), JSON.stringify(manifest, null, 2));
    throw error;
  }
}

/**
 * Calculate estimated duration based on text length and speaking rate
 * @param {string} text - Text content
 * @returns {number} Estimated duration in seconds
 */
function estimateDuration(text) {
  // Average speaking rate: ~150 words per minute, ~5 characters per word
  const wordsPerMinute = 150;
  const charactersPerWord = 5;
  const charactersPerMinute = wordsPerMinute * charactersPerWord;
  
  return Math.max(1, (text.length / charactersPerMinute) * 60);
}

/**
 * Generate all TTS audio files
 */
async function generateAllTTSAudio() {
  // Parse force flag (args already parsed globally)
  const forceRegenerate = args.includes('--force') || args.includes('-f');
  
  const techniqueNames = {
    cot: 'Chain of Thought',
    cod: 'Chain of Debates'
  };
  console.log(`🚀 Starting OpenAI TTS audio generation for ${techniqueNames[technique]} video...`);
  console.log(`📁 Output directory: ${audioDir}`);
  console.log(`🔑 Using OpenAI API key: ${process.env.OPENAI_API_KEY ? '✅ Found' : '❌ Missing'}`);
  console.log(`🔄 Force regeneration: ${forceRegenerate ? '✅ Enabled' : '❌ Disabled (will skip existing files)'}`);
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OpenAI API key not found in .env file!');
    console.error('Please add OPENAI_API_KEY=your_key_here to your .env file');
    process.exit(1);
  }
  
  const results = [];
  let totalCost = 0;
  let generatedCount = 0;
  let skippedCount = 0;
  
  console.log(`\n📋 Processing ${baseNarrationSegments.length} narration segments...\n`);
  
  for (const [index, segment] of baseNarrationSegments.entries()) {
    try {
      const progress = `[${index + 1}/${baseNarrationSegments.length}]`;
      console.log(`${progress} Processing: ${segment.id}`);
      
      const audioPath = await generateTTSWithOpenAI(segment.text, segment.filename, forceRegenerate);
      const estimatedDuration = estimateDuration(segment.text);
      
      // Check if file was actually generated or skipped
      const wasGenerated = !(!forceRegenerate && fs.existsSync(audioPath) && fs.statSync(audioPath).size > 1000);
      
      if (wasGenerated || forceRegenerate) {
        // Estimate cost only for newly generated files (OpenAI TTS-1-HD pricing: $30 per 1M characters)
        const segmentCost = (segment.text.length / 1000000) * 30;
        totalCost += segmentCost;
        generatedCount++;
        
        console.log(`   💰 Estimated cost: $${segmentCost.toFixed(4)}`);
      } else {
        skippedCount++;
        console.log(`   💰 Cost saved: $${((segment.text.length / 1000000) * 30).toFixed(4)} (cached)`);
      }
      
      results.push({
        id: segment.id,
        success: true,
        path: audioPath,
        duration: estimatedDuration,
        frameRange: `${segment.startFrame}-${segment.endFrame}`,
        textLength: segment.text.length,
        estimatedCost: wasGenerated ? (segment.text.length / 1000000) * 30 : 0,
        cached: !wasGenerated && !forceRegenerate
      });
      
      console.log(`   ⏱️  Duration: ~${estimatedDuration.toFixed(1)}s`);
      console.log('');
      
    } catch (error) {
      console.error(`❌ Failed to generate TTS for ${segment.id}:`, error.message);
      results.push({
        id: segment.id,
        success: false,
        error: error.message
      });
    }
  }
  
  // Generate comprehensive summary
  console.log('\n🎯 === TTS Generation Summary ===');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`🆕 Generated: ${generatedCount}`);
  console.log(`💾 Cached (skipped): ${skippedCount}`);
  console.log(`💰 Total estimated cost: $${totalCost.toFixed(4)}`);
  console.log(`💰 Cost saved from caching: $${(results.filter(r => r.cached).reduce((sum, r) => sum + ((r.textLength / 1000000) * 30), 0)).toFixed(4)}`);
  
  if (failed > 0) {
    console.log('\n❌ Failed segments:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.id}: ${r.error}`);
    });
  }
  
  if (successful > 0) {
    console.log('\n✅ Successfully processed:');
    results.filter(r => r.success).forEach(r => {
      const status = r.cached ? '💾 cached' : '🆕 generated';
      console.log(`  - ${r.id}: ${r.frameRange} frames (~${r.duration.toFixed(1)}s) [${status}]`);
    });
  }
  
  // Create comprehensive audio index
  const audioIndex = {
    generated: new Date().toISOString(),
    model: 'tts-1-hd',
    voice: 'nova',
    totalSegments: baseNarrationSegments.length,
    successfulSegments: successful,
    failedSegments: failed,
    generatedSegments: generatedCount,
    cachedSegments: skippedCount,
    totalEstimatedCost: totalCost,
    forceRegenerate: forceRegenerate,
    segments: baseNarrationSegments.map(segment => {
      const result = results.find(r => r.id === segment.id);
      return {
        ...segment,
        audioPath: `/audio/${technique}/${segment.filename}`,
        success: result?.success || false,
        duration: result?.duration || 0,
        cached: result?.cached || false,
        error: result?.error || null
      };
    })
  };
  
  const indexPath = path.join(audioDir, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(audioIndex, null, 2));
  
  console.log(`\n📋 Audio index updated: ${indexPath}`);
  console.log('\n🎉 TTS generation complete!');
  
  if (successful === baseNarrationSegments.length) {
    console.log('\n🎬 All audio files ready for video production!');
    
    // Calculate dynamic timing based on actual audio durations
    try {
      console.log('\n🎯 Generating dynamic timing configuration...');
      const { narrationSegments, totalFrames, totalDuration } = await calculateDynamicTiming();
      const timingConfig = generateTimingConfig(narrationSegments, totalFrames);
      
      console.log(`📐 Dynamic timing complete:`);
      console.log(`   📏 Total duration: ${totalDuration.toFixed(2)}s`);
      console.log(`   🎬 Total frames: ${totalFrames}`);
      console.log(`   ⚙️  Config saved: timing-config.json`);
      
      // Update the audio index with dynamic timing
      audioIndex.dynamicTiming = {
        totalFrames,
        totalDuration,
        narrationSegments,
        configPath: `/audio/${technique}/timing-config.json`
      };
      
      fs.writeFileSync(indexPath, JSON.stringify(audioIndex, null, 2));
      
    } catch (error) {
      console.warn('⚠️  Could not generate dynamic timing:', error.message);
    }
    
    console.log(`You can now use the ${technique === 'cot' ? 'ChainOfThoughtVideoWithAudio' : 'ChainOfDebatesVideoWithAudio'} component.`);
    
    if (skippedCount > 0) {
      console.log(`\n💡 Tips:`);
  console.log(`   - Use "--force" to regenerate existing files`);
  console.log(`   - Use "--technique cod" to generate Chain of Debates audio`);
  console.log(`   - Use "--technique cot" to generate Chain of Thought audio (default)`);
    }
  }
  
  return results;
}

/**
 * Print setup and usage instructions
 */
function printSetupInstructions() {
  console.log('\n📖 === OpenAI TTS Setup Instructions ===\n');
  
  console.log('1. 🔑 API Key Setup:');
  console.log('   - Get your OpenAI API key from: https://platform.openai.com/api-keys');
  console.log('   - Add to your .env file: OPENAI_API_KEY=your_key_here\n');
  
  console.log('2. 📦 Dependencies:');
  console.log('   npm install openai dotenv\n');
  
  console.log('3. 💰 Pricing (as of 2024):');
  console.log('   - TTS-1: $15 per 1M characters');
  console.log('   - TTS-1-HD: $30 per 1M characters (higher quality)');
  console.log('   - This script uses TTS-1-HD for best quality\n');
  
  console.log('4. 🎤 Voice Options:');
  console.log('   - alloy, echo, fable, onyx, nova, shimmer');
  console.log('   - Current: nova (professional, clear female voice)\n');
  
  console.log('5. 🚀 Usage:');
  console.log('   node scripts/generate-tts-audio.js                           # Generate CoT files, skip existing');
  console.log('   node scripts/generate-tts-audio.js --technique cod           # Generate Chain of Debates');
  console.log('   node scripts/generate-tts-audio.js --force                   # Force regenerate CoT files');
  console.log('   node scripts/generate-tts-audio.js --technique cod --force   # Force regenerate CoD files');
  console.log('   npm run tts:generate                                         # Same as first option');
  console.log('   npm run tts:generate -- --technique cod                      # Generate CoD via npm\n');
  
  console.log('6. 💾 Smart Caching:');
  console.log('   - Existing audio files are automatically detected and skipped');
  console.log('   - Saves API costs and generation time on subsequent runs');
  console.log('   - Use --force flag to regenerate all files if needed');
  console.log('   - Files smaller than 1KB are considered corrupted and regenerated\n');
}

// Cleanup function for graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️  TTS generation interrupted by user');
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('\n💥 Uncaught exception:', error.message);
  process.exit(1);
});

// Run the script
if (require.main === module) {
  printSetupInstructions();
  generateAllTTSAudio().catch((error) => {
    console.error('\n💥 TTS generation failed:', error.message);
    process.exit(1);
  });
}

module.exports = {
  generateAllTTSAudio,
  baseNarrationSegments,
  generateTTSWithOpenAI,
  calculateDynamicTiming,
  generateTimingConfig,
  getAudioDuration
}; 