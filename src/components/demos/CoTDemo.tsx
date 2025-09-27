'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Brain, ArrowRight, Sparkles, Zap, Copy, CheckCircle, XCircle, RefreshCw, Lightbulb, MessageSquare, Wand2 } from 'lucide-react';

interface Example {
  id: string;
  title: string;
  problem: string;
  standardPrompt: string;
  cotPrompt: string;
  standardResponse: string;
  cotResponse: string;
  improvement: string;
}

export default function CoTDemo() {
  const [selectedExample, setSelectedExample] = useState<string>('math');
  const [showComparison, setShowComparison] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activePromptType, setActivePromptType] = useState<'standard' | 'cot' | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const examples: Example[] = [
    {
      id: 'math',
      title: 'Math Problem',
      problem: 'I went to the market and bought 10 apples. I gave 2 apples to the neighbor and 2 to the repairman. Then I went back and bought 5 more apples and ate 1. How many apples do I have?',
      standardPrompt: 'I went to the market and bought 10 apples. I gave 2 apples to the neighbor and 2 to the repairman. Then I went back and bought 5 more apples and ate 1. How many apples do I have?',
      cotPrompt: 'I went to the market and bought 10 apples. I gave 2 apples to the neighbor and 2 to the repairman. Then I went back and bought 5 more apples and ate 1. How many apples do I have?\n\nLet\'s think step by step.',
      standardResponse: '10 apples.',
      cotResponse: 'Let\'s think step by step:\n\n1. Started with 10 apples\n2. Gave 2 to neighbor: 10 - 2 = 8 apples\n3. Gave 2 to repairman: 8 - 2 = 6 apples\n4. Bought 5 more: 6 + 5 = 11 apples\n5. Ate 1 apple: 11 - 1 = 10 apples\n\nFinal answer: 10 apples',
      improvement: '✅ Shows clear reasoning steps\n✅ Easy to verify calculation\n✅ Catches potential errors'
    },
    {
      id: 'logic',
      title: 'Logic Puzzle',
      problem: 'All roses are flowers. Some flowers fade quickly. Can we conclude that some roses fade quickly?',
      standardPrompt: 'All roses are flowers. Some flowers fade quickly. Can we conclude that some roses fade quickly?',
      cotPrompt: 'All roses are flowers. Some flowers fade quickly. Can we conclude that some roses fade quickly?\n\nLet\'s think step by step.',
      standardResponse: 'Yes, some roses fade quickly.',
      cotResponse: 'Let\'s think step by step:\n\n1. Given: All roses are flowers\n2. Given: Some flowers fade quickly\n3. Question: Do some roses fade quickly?\n\n4. Analysis: Just because roses are a subset of flowers, and some flowers fade quickly, doesn\'t mean those quickly-fading flowers are roses.\n5. The quickly-fading flowers might be other types (tulips, daisies, etc.)\n6. We cannot logically conclude that roses are among the quickly-fading flowers.\n\nFinal answer: No, we cannot conclude that some roses fade quickly.',
      improvement: '✅ Avoids logical fallacy\n✅ Explains reasoning clearly\n✅ Correct answer through analysis'
    },
    {
      id: 'word',
      title: 'Word Problem',
      problem: 'A farmer has 17 sheep. All but 9 die. How many sheep are left?',
      standardPrompt: 'A farmer has 17 sheep. All but 9 die. How many sheep are left?',
      cotPrompt: 'A farmer has 17 sheep. All but 9 die. How many sheep are left?\n\nLet\'s think step by step.',
      standardResponse: '8 sheep are left.',
      cotResponse: 'Let\'s think step by step:\n\n1. The farmer starts with 17 sheep\n2. The phrase "all but 9 die" is key here\n3. "All but 9" means "all except 9"\n4. So 9 sheep survive (don\'t die)\n5. The rest die: 17 - 9 = 8 sheep die\n\nFinal answer: 9 sheep are left (the ones that survived)',
      improvement: '✅ Catches language trick\n✅ Parses "all but X" correctly\n✅ Avoids subtraction error'
    },
    {
      id: 'reasoning',
      title: 'Multi-step Reasoning',
      problem: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
      standardPrompt: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
      cotPrompt: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?\n\nLet\'s think step by step.',
      standardResponse: '100 minutes.',
      cotResponse: 'Let\'s think step by step:\n\n1. 5 machines make 5 widgets in 5 minutes\n2. So each machine makes 1 widget in 5 minutes\n3. Rate per machine: 1 widget / 5 minutes\n\n4. With 100 machines:\n5. Each makes 1 widget in 5 minutes\n6. 100 machines make 100 widgets in 5 minutes\n\nFinal answer: 5 minutes',
      improvement: '✅ Identifies rate per machine\n✅ Scales correctly\n✅ Avoids proportional thinking trap'
    }
  ];

  const cotVariations = [
    { phrase: 'Let\'s think step by step', description: 'Most common and effective' },
    { phrase: 'Let\'s break this down step by step', description: 'Alternative phrasing' },
    { phrase: 'Let\'s work this out in a step by step way to be sure we have the right answer', description: 'Discovered by Automatic Prompt Engineer' },
    { phrase: 'First, let me understand the problem. Then I\'ll solve it step by step.', description: 'Two-stage approach' }
  ];

  const getCurrentExample = () => examples.find(e => e.id === selectedExample) || examples[0];

  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 800;
    const height = 250;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;

    ctx.clearRect(0, 0, width, height);

    // Background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(1, '#1e293b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('Chain-of-Thought: Same Problem, Different Prompt', width/2, 25);

    const centerY = height / 2;
    const boxHeight = 50;
    const boxWidth = 140;

    // Single problem box on the left
    const problemX = 60;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(problemX, centerY - boxHeight/2, boxWidth, boxHeight);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.strokeRect(problemX, centerY - boxHeight/2, boxWidth, boxHeight);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('❓ Problem', problemX + boxWidth/2, centerY);

    // Fork point - split into two paths
    const forkX = problemX + boxWidth + 30;
    const forkY = centerY;

    // Draw fork lines
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(problemX + boxWidth, centerY);
    ctx.lineTo(forkX, forkY);
    ctx.stroke();

    // Standard path (top)
    const standardY = centerY - 55;

    // Arrow to standard
    ctx.strokeStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(forkX, forkY);
    ctx.lineTo(forkX + 50, standardY);
    ctx.lineTo(forkX + 120, standardY);
    ctx.stroke();

    // Standard prompt box
    const promptBoxX = forkX + 125;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(promptBoxX, standardY - boxHeight/2, boxWidth + 20, boxHeight);
    ctx.strokeStyle = '#ef4444';
    ctx.strokeRect(promptBoxX, standardY - boxHeight/2, boxWidth + 20, boxHeight);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Direct to LLM', promptBoxX + (boxWidth + 20)/2, standardY);

    // Arrow to LLM
    ctx.beginPath();
    ctx.moveTo(promptBoxX + boxWidth + 20, standardY);
    ctx.lineTo(promptBoxX + boxWidth + 50, standardY);
    ctx.stroke();

    // LLM box (standard)
    const llmX = promptBoxX + boxWidth + 55;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(llmX, standardY - boxHeight/2, boxWidth, boxHeight);
    ctx.strokeStyle = '#64748b';
    ctx.strokeRect(llmX, standardY - boxHeight/2, boxWidth, boxHeight);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🤖 LLM', llmX + boxWidth/2, standardY - 8);
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.fillText('Quick Answer', llmX + boxWidth/2, standardY + 8);

    // Arrow to answer
    ctx.strokeStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(llmX + boxWidth, standardY);
    ctx.lineTo(llmX + boxWidth + 30, standardY);
    ctx.stroke();

    // Answer box (standard)
    const answerX = llmX + boxWidth + 35;
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(answerX, standardY - boxHeight/2, boxWidth, boxHeight);
    ctx.strokeStyle = '#ef4444';
    ctx.strokeRect(answerX, standardY - boxHeight/2, boxWidth, boxHeight);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('❌ Often Wrong', answerX + boxWidth/2, standardY);

    // CoT path (bottom)
    const cotY = centerY + 55;

    // Arrow to CoT
    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(forkX, forkY);
    ctx.lineTo(forkX + 50, cotY);
    ctx.lineTo(forkX + 120, cotY);
    ctx.stroke();

    // Magic phrase box
    ctx.fillStyle = '#065f46';
    ctx.fillRect(promptBoxX, cotY - boxHeight/2, boxWidth + 20, boxHeight);
    ctx.strokeStyle = '#10b981';
    ctx.strokeRect(promptBoxX, cotY - boxHeight/2, boxWidth + 20, boxHeight);

    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('+ "Let\'s think', promptBoxX + (boxWidth + 20)/2, cotY - 8);
    ctx.fillText('step by step"', promptBoxX + (boxWidth + 20)/2, cotY + 8);

    // Magic sparkles around the phrase box
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('✨', promptBoxX - 15, cotY - 15);
    ctx.fillText('✨', promptBoxX + boxWidth + 25, cotY + 15);

    // Arrow to LLM
    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(promptBoxX + boxWidth + 20, cotY);
    ctx.lineTo(promptBoxX + boxWidth + 50, cotY);
    ctx.stroke();

    // LLM box (CoT)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(llmX, cotY - boxHeight/2, boxWidth, boxHeight);
    ctx.strokeStyle = '#10b981';
    ctx.strokeRect(llmX, cotY - boxHeight/2, boxWidth, boxHeight);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🤖 Same LLM', llmX + boxWidth/2, cotY - 8);
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#10b981';
    ctx.fillText('Step-by-Step', llmX + boxWidth/2, cotY + 8);

    // Arrow to answer
    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(llmX + boxWidth, cotY);
    ctx.lineTo(llmX + boxWidth + 30, cotY);
    ctx.stroke();

    // Answer box (CoT)
    ctx.fillStyle = '#14532d';
    ctx.fillRect(answerX, cotY - boxHeight/2, boxWidth, boxHeight);
    ctx.strokeStyle = '#10b981';
    ctx.strokeRect(answerX, cotY - boxHeight/2, boxWidth, boxHeight);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('✅ Correct', answerX + boxWidth/2, cotY);

    // Labels for paths
    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.textAlign = 'left';
    ctx.fillText('STANDARD', forkX + 60, standardY - 25);

    ctx.fillStyle = '#10b981';
    ctx.fillText('CHAIN-OF-THOUGHT', forkX + 60, cotY + 30);

    // Highlight active path
    if (activePromptType === 'standard') {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(forkX, forkY);
      ctx.lineTo(forkX + 50, standardY);
      ctx.lineTo(answerX + boxWidth, standardY);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (activePromptType === 'cot') {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(forkX, forkY);
      ctx.lineTo(forkX + 50, cotY);
      ctx.lineTo(answerX + boxWidth, cotY);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  useEffect(() => {
    drawVisualization();
  }, [activePromptType]);

  const processExample = async () => {
    setIsProcessing(true);
    setShowComparison(false);
    setActivePromptType(null);

    // Simulate processing standard prompt
    setActivePromptType('standard');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate processing CoT prompt
    setActivePromptType('cot');
    await new Promise(resolve => setTimeout(resolve, 1500));

    setActivePromptType(null);
    setShowComparison(true);
    setIsProcessing(false);
  };

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(id);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const example = getCurrentExample();

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">Chain-of-Thought Prompting</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Simply adding "Let's think step by step" to your prompt dramatically improves reasoning.
          This technique, called Zero-Shot CoT, requires no examples - just one magic phrase.
        </p>
      </div>

      {/* Example Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {examples.map(ex => (
          <button
            key={ex.id}
            onClick={() => {
              setSelectedExample(ex.id);
              setShowComparison(false);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedExample === ex.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {ex.title}
          </button>
        ))}
      </div>

      {/* Problem Statement */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          Problem
        </h3>
        <p className="text-white bg-slate-800 rounded-lg p-4">{example.problem}</p>
      </div>

      {/* Side-by-side Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Standard Prompt */}
        <div className={`bg-slate-900/50 border rounded-xl p-6 backdrop-blur-sm transition-all duration-300 ${
          activePromptType === 'standard' ? 'border-red-500/50 shadow-lg shadow-red-500/20' : 'border-slate-700'
        }`}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <XCircle className="w-5 h-5 text-red-400" />
            Standard Prompt
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-400">Prompt sent to model:</label>
                <button
                  onClick={() => copyPrompt(example.standardPrompt, 'standard')}
                  className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors flex items-center gap-1"
                >
                  {copiedPrompt === 'standard' ? (
                    <><CheckCircle className="w-3 h-3" /> Copied!</>
                  ) : (
                    <><Copy className="w-3 h-3" /> Copy</>
                  )}
                </button>
              </div>
              <pre className="bg-slate-800 rounded-lg p-3 text-sm text-slate-300 whitespace-pre-wrap font-mono">
                {example.standardPrompt}
              </pre>
            </div>

            {showComparison && (
              <div>
                <label className="text-sm font-medium text-slate-400 mb-2 block">Model Response:</label>
                <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-3 text-sm text-red-200">
                  {example.standardResponse}
                </div>
                <div className="mt-2 text-xs text-red-400">
                  ❌ Often incorrect or lacks reasoning
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CoT Prompt */}
        <div className={`bg-slate-900/50 border rounded-xl p-6 backdrop-blur-sm transition-all duration-300 ${
          activePromptType === 'cot' ? 'border-green-500/50 shadow-lg shadow-green-500/20' : 'border-slate-700'
        }`}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Chain-of-Thought Prompt
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-400">Prompt sent to model:</label>
                <button
                  onClick={() => copyPrompt(example.cotPrompt, 'cot')}
                  className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors flex items-center gap-1"
                >
                  {copiedPrompt === 'cot' ? (
                    <><CheckCircle className="w-3 h-3" /> Copied!</>
                  ) : (
                    <><Copy className="w-3 h-3" /> Copy</>
                  )}
                </button>
              </div>
              <pre className="bg-slate-800 rounded-lg p-3 text-sm text-slate-300 whitespace-pre-wrap font-mono">
                {example.cotPrompt}
              </pre>
              <div className="mt-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-300 inline-block">
                ✨ Magic phrase added!
              </div>
            </div>

            {showComparison && (
              <div>
                <label className="text-sm font-medium text-slate-400 mb-2 block">Model Response:</label>
                <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-3 text-sm text-green-200 whitespace-pre-wrap">
                  {example.cotResponse}
                </div>
                <div className="mt-2 text-xs text-green-400 whitespace-pre-wrap">
                  {example.improvement}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Run Comparison Button */}
      <div className="text-center">
        <button
          onClick={processExample}
          disabled={isProcessing}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Compare Responses
            </span>
          )}
        </button>
      </div>

      {/* CoT Variations */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-purple-400" />
          CoT Prompt Variations
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {cotVariations.map((variation, idx) => (
            <div key={idx} className="bg-slate-800/50 rounded-lg p-4">
              <code className="text-sm text-blue-300 font-mono block mb-2">"{variation.phrase}"</code>
              <p className="text-xs text-slate-400">{variation.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Flow Visualization */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          How It Works
        </h3>
        <div className="relative overflow-x-auto">
          <canvas
            ref={canvasRef}
            className="w-full"
            style={{ minHeight: '250px', maxWidth: '100%' }}
          />
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4 text-white">Key Insights</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">1</span>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Zero-Shot CoT</h4>
              <p className="text-slate-400 text-xs">No examples needed - just add "Let's think step by step"</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">2</span>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Same Model</h4>
              <p className="text-slate-400 text-xs">Uses the exact same LLM - only the prompt changes</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">3</span>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Improved Accuracy</h4>
              <p className="text-slate-400 text-xs">Significantly better performance on reasoning tasks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}