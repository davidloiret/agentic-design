'use client';

import React, { useState } from 'react';
import { BrainMascot, BrainExpression } from '@/components/BrainMascot';
import { motion } from 'framer-motion';

const expressions: BrainExpression[] = [
  'neutral', 'happy', 'sad', 'excited', 'confused', 'thinking', 
  'surprised', 'angry', 'sleepy', 'winking', 'focused', 'worried',
  'love', 'dizzy', 'crying', 'laughing', 'skeptical', 'proud', 
  'shy', 'mischievous'
];

const colors = ['purple', 'blue', 'green', 'amber', 'red'] as const;
const sizes = ['small', 'medium', 'large'] as const;

export default function BrainMascotDemo() {
  const [currentExpression, setCurrentExpression] = useState<BrainExpression>('happy');
  const [currentColor, setCurrentColor] = useState<typeof colors[number]>('purple');
  const [currentSize, setCurrentSize] = useState<typeof sizes[number]>('medium');
  const [animate, setAnimate] = useState(true);

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
              />
            </div>
            <p className="text-gray-400 text-sm text-center max-w-xs">
              Click on the brain to trigger random expressions!
            </p>
          </div>

          {/* Controls */}
          <div className="space-y-8">
            {/* Expression Selector */}
            <div>
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

// With customization
<BrainMascot
  expression="thinking"
  size="large"
  color="blue"
  animate={true}
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
// Available sizes: 'small', 'medium', 'large'`}</code>
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