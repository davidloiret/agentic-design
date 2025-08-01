'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BrainMascot, BrainExpression, SpeechBubbleType } from '@/components/BrainMascot';
import { motion } from 'framer-motion';

const expressions: BrainExpression[] = [
  'neutral', 'happy', 'sad', 'excited', 'confused', 'thinking', 
  'surprised', 'angry', 'sleepy', 'winking', 'focused', 'worried',
  'love', 'dizzy', 'crying', 'laughing', 'skeptical', 'proud', 
  'shy', 'mischievous'
];

const colors = ['purple', 'blue', 'green', 'amber', 'red'] as const;
const sizes = ['small', 'medium', 'large'] as const;

// Dialog simulation script
const dialogScript = [
  { text: "Hello! I'm Brain!", expression: 'happy' as BrainExpression, type: 'talk' as SpeechBubbleType, duration: 1800 },
  { text: "How can I help you today?", expression: 'happy' as BrainExpression, type: 'talk' as SpeechBubbleType, duration: 1800 },
  { text: "Hmm... Let me think about that", expression: 'thinking' as BrainExpression, type: 'think' as SpeechBubbleType, duration: 2200 },
  { text: "I GOT IT!", expression: 'excited' as BrainExpression, type: 'shout' as SpeechBubbleType, duration: 1500 },
  { text: "The answer is 42", expression: 'proud' as BrainExpression, type: 'talk' as SpeechBubbleType, duration: 1800 },
  { text: "...or maybe not", expression: 'confused' as BrainExpression, type: 'whisper' as SpeechBubbleType, duration: 1800 },
  { text: "Actually, I'm not sure", expression: 'worried' as BrainExpression, type: 'think' as SpeechBubbleType, duration: 1800 },
  { text: "WAIT! I KNOW NOW!", expression: 'surprised' as BrainExpression, type: 'shout' as SpeechBubbleType, duration: 1500 },
  { text: "Just kidding!", expression: 'mischievous' as BrainExpression, type: 'talk' as SpeechBubbleType, duration: 1500 },
  { text: "*wink wink*", expression: 'winking' as BrainExpression, type: 'whisper' as SpeechBubbleType, duration: 1500 },
  { text: "I love helping people!", expression: 'love' as BrainExpression, type: 'talk' as SpeechBubbleType, duration: 1800 },
  { text: "Zzz... so sleepy", expression: 'sleepy' as BrainExpression, type: 'whisper' as SpeechBubbleType, duration: 2200 },
];

export default function BrainMascotDemo() {
  const [currentExpression, setCurrentExpression] = useState<BrainExpression>('happy');
  const [currentColor, setCurrentColor] = useState<typeof colors[number]>('purple');
  const [currentSize, setCurrentSize] = useState<typeof sizes[number]>('medium');
  const [animate, setAnimate] = useState(true);
  const [speechText, setSpeechText] = useState('Hello! How can I help you today?');
  const [showSpeech, setShowSpeech] = useState(true);
  const [speechPosition, setSpeechPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('right');
  const [speechBubbleColor, setSpeechBubbleColor] = useState<'white' | 'purple' | 'blue' | 'green' | 'amber' | 'red'>('white');
  const [speechBubbleType, setSpeechBubbleType] = useState<SpeechBubbleType>('talk');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
  const simulationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dialog simulation effect
  useEffect(() => {
    if (isSimulating && currentDialogIndex < dialogScript.length) {
      const currentDialog = dialogScript[currentDialogIndex];
      
      // Fade out current bubble
      setShowSpeech(false);
      
      // After fade out, update content and fade back in
      setTimeout(() => {
        setSpeechText(currentDialog.text);
        setCurrentExpression(currentDialog.expression);
        setSpeechBubbleType(currentDialog.type);
        setShowSpeech(true);
      }, 200); // Wait for fade out animation
      
      // Schedule next dialog
      simulationTimeoutRef.current = setTimeout(() => {
        if (currentDialogIndex < dialogScript.length - 1) {
          setCurrentDialogIndex(currentDialogIndex + 1);
        } else {
          // Reset after last dialog
          setIsSimulating(false);
          setCurrentDialogIndex(0);
          setTimeout(() => {
            setSpeechText("Hello! How can I help you today?");
            setCurrentExpression('happy');
            setSpeechBubbleType('talk');
          }, 300);
        }
      }, currentDialog.duration);
    }
    
    return () => {
      if (simulationTimeoutRef.current) {
        clearTimeout(simulationTimeoutRef.current);
      }
    };
  }, [isSimulating, currentDialogIndex]);

  const startSimulation = () => {
    setIsSimulating(true);
    setCurrentDialogIndex(0);
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    setCurrentDialogIndex(0);
    if (simulationTimeoutRef.current) {
      clearTimeout(simulationTimeoutRef.current);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Brain Mascot Demo
          </h1>
          <p className="text-gray-400 text-lg">
            An animated brain mascot with multiple expressions and customization options
          </p>
        </div>

        {/* Main Demo Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Brain Display */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 mb-6">
              <BrainMascot
                expression={currentExpression}
                size={currentSize}
                color={currentColor}
                animate={animate}
                onExpressionChange={(newExpression) => setCurrentExpression(newExpression)}
                speechText={showSpeech ? speechText : undefined}
                speechBubblePosition={speechPosition}
                speechBubbleColor={speechBubbleColor}
                speechBubbleType={speechBubbleType}
              />
            </div>
            <p className="text-gray-400 text-sm text-center max-w-xs">
              Click on the brain to trigger random expressions!
            </p>
            
            {/* Dialog Simulation Button */}
            <motion.button
              onClick={isSimulating ? stopSimulation : startSimulation}
              className={`mt-4 px-6 py-2 rounded-lg font-medium transition-all border ${
                isSimulating
                  ? 'bg-red-500 text-white border-red-400'
                  : 'bg-purple-500 text-white border-purple-400'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSimulating ? 'Stop Dialog' : 'Start Dialog Simulation'}
            </motion.button>
          </div>

          {/* Controls */}
          <div className="space-y-8">
            {/* Expression Selector */}
            <div className={isSimulating ? 'opacity-50 pointer-events-none' : ''}>
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Expressions</h3>
              <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto pr-2">
                {expressions.map((expression) => (
                  <motion.button
                    key={expression}
                    onClick={() => setCurrentExpression(expression)}
                    className={`p-2 rounded-lg font-medium text-sm transition-all border ${
                      currentExpression === expression
                        ? 'bg-purple-500 text-white border-purple-400'
                        : 'bg-gray-800/30 text-gray-300 border-gray-700/50 hover:bg-gray-800/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {expression}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Colors</h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <motion.button
                    key={color}
                    onClick={() => setCurrentColor(color)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all border capitalize ${
                      currentColor === color
                        ? 'bg-blue-500 text-white border-blue-400'
                        : 'bg-gray-800/30 text-gray-300 border-gray-700/50 hover:bg-gray-800/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-400">Sizes</h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setCurrentSize(size)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all border capitalize ${
                      currentSize === size
                        ? 'bg-green-500 text-white border-green-400'
                        : 'bg-gray-800/30 text-gray-300 border-gray-700/50 hover:bg-gray-800/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Animation Toggle */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-amber-400">Animation</h3>
              <motion.button
                onClick={() => setAnimate(!animate)}
                className={`px-6 py-3 rounded-lg font-medium transition-all border ${
                  animate
                    ? 'bg-amber-500 text-white border-amber-400'
                    : 'bg-gray-800/30 text-gray-300 border-gray-700/50 hover:bg-gray-800/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {animate ? 'Animation On' : 'Animation Off'}
              </motion.button>
            </div>

            {/* Speech Bubble Controls */}
            <div className={`space-y-4 ${isSimulating ? 'opacity-50 pointer-events-none' : ''}`}>
              <h3 className="text-xl font-semibold mb-4 text-pink-400">Speech Bubble</h3>
              
              {/* Speech Toggle */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => setShowSpeech(!showSpeech)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all border ${
                    showSpeech
                      ? 'bg-pink-500 text-white border-pink-400'
                      : 'bg-gray-800/30 text-gray-300 border-gray-700/50 hover:bg-gray-800/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showSpeech ? 'Speech On' : 'Speech Off'}
                </motion.button>
                
                <input
                  type="text"
                  value={speechText}
                  onChange={(e) => setSpeechText(e.target.value)}
                  placeholder="Enter speech text"
                  className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-300 placeholder-gray-500 focus:border-pink-400 focus:outline-none"
                  maxLength={100}
                />
              </div>

              {/* Speech Position */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Position</p>
                <div className="flex gap-2">
                  {(['top', 'bottom', 'left', 'right'] as const).map((position) => (
                    <motion.button
                      key={position}
                      onClick={() => setSpeechPosition(position)}
                      className={`px-3 py-1 rounded-lg font-medium text-sm transition-all border capitalize ${
                        speechPosition === position
                          ? 'bg-pink-500 text-white border-pink-400'
                          : 'bg-gray-800/30 text-gray-300 border-gray-700/50 hover:bg-gray-800/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {position}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Speech Bubble Color */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Bubble Color</p>
                <div className="grid grid-cols-3 gap-2">
                  {(['white', 'purple', 'blue', 'green', 'amber', 'red'] as const).map((bubbleColor) => (
                    <motion.button
                      key={bubbleColor}
                      onClick={() => setSpeechBubbleColor(bubbleColor)}
                      className={`px-3 py-1 rounded-lg font-medium text-sm transition-all border capitalize ${
                        speechBubbleColor === bubbleColor
                          ? 'bg-pink-500 text-white border-pink-400'
                          : 'bg-gray-800/30 text-gray-300 border-gray-700/50 hover:bg-gray-800/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {bubbleColor}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Speech Bubble Type */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Bubble Type</p>
                <div className="flex gap-2">
                  {(['talk', 'think', 'shout', 'whisper'] as const).map((type) => (
                    <motion.button
                      key={type}
                      onClick={() => setSpeechBubbleType(type)}
                      className={`px-3 py-1 rounded-lg font-medium text-sm transition-all border capitalize ${
                        speechBubbleType === type
                          ? 'bg-pink-500 text-white border-pink-400'
                          : 'bg-gray-800/30 text-gray-300 border-gray-700/50 hover:bg-gray-800/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expression Gallery */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Expression Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {expressions.map((expression) => (
              <motion.div
                key={expression}
                className="flex flex-col items-center p-4 bg-gray-800/20 rounded-xl border border-gray-700/30 hover:bg-gray-800/40 transition-all cursor-pointer"
                onClick={() => setCurrentExpression(expression)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <BrainMascot
                  expression={expression}
                  size="small"
                  color="purple"
                  animate={false}
                />
                <p className="text-sm text-gray-400 mt-2 capitalize">{expression}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Usage Example */}
        <div className="bg-gray-800/20 rounded-xl p-8 border border-gray-700/30">
          <h2 className="text-2xl font-bold mb-6 text-center">Usage Example</h2>
          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-gray-300">
              <code>{`import { BrainMascot } from '@/components/BrainMascot';

// Basic usage
<BrainMascot expression="happy" />

// With speech bubble
<BrainMascot
  expression="thinking"
  speechText="Hmm..."
  speechBubblePosition="top"
  speechBubbleColor="white"
/>

// Full customization
<BrainMascot
  expression="excited"
  size="large"
  color="blue"
  animate={true}
  speechText="Wow!"
  speechBubblePosition="right"
  speechBubbleColor="blue"
  onExpressionChange={(newExpression) => {
    console.log('Expression changed to:', newExpression);
  }}
/>

// Available expressions:
// 'neutral', 'happy', 'sad', 'excited', 'confused', 
// 'thinking', 'surprised', 'angry', 'sleepy', 'winking', 
// 'focused', 'worried', 'love', 'dizzy', 'crying',
// 'laughing', 'skeptical', 'proud', 'shy', 'mischievous'

// Available colors: 'purple', 'blue', 'green', 'amber', 'red'
// Available sizes: 'small', 'medium', 'large'
// Speech positions: 'top', 'bottom', 'left', 'right'
// Speech bubble colors: 'white', 'purple', 'blue', 'green', 'amber', 'red'`}</code>
            </pre>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/20 rounded-xl p-6 border border-gray-700/30">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• 20 different expressions with unique animations</li>
              <li>• 5 color themes to match your brand</li>
              <li>• 3 size options (small, medium, large)</li>
              <li>• Speech bubbles with customizable text and colors</li>
              <li>• 4 speech bubble positions (top, bottom, left, right)</li>
              <li>• Smooth Framer Motion animations</li>
              <li>• Interactive click handling</li>
              <li>• Hover effects and visual feedback</li>
              <li>• Customizable animation toggle</li>
            </ul>
          </div>
          <div className="bg-gray-800/20 rounded-xl p-6 border border-gray-700/30">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Expression Details</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• <strong>Happy:</strong> Squinted eyes, upward mouth, sparkles</li>
              <li>• <strong>Love:</strong> Heart eyes, wide smile, floating hearts</li>
              <li>• <strong>Laughing:</strong> Closed eyes, huge smile, sparkles + blush</li>
              <li>• <strong>Crying:</strong> Sad eyes, tears flowing down</li>
              <li>• <strong>Dizzy:</strong> Spinning stars, confused expression</li>
              <li>• <strong>Mischievous:</strong> Asymmetric wink, sly smile</li>
              <li>• <strong>And 14 more...</strong> Each with unique animations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}