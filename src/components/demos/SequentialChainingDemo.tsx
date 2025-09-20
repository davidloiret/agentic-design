'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ChevronRight, Play, Pause, RotateCcw, CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { usePlausible } from '@/hooks/usePlausible';

interface ChainStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  input?: string;
  output?: string;
  processingTime?: number;
  timestamp?: Date;
}

interface SequentialScenario {
  id: string;
  name: string;
  description: string;
  initialInput: string;
  steps: ChainStep[];
}

const SCENARIOS: SequentialScenario[] = [
  {
    id: 'product-review',
    name: 'Product Review Creation',
    description: 'Generate a comprehensive product review through sequential processing steps',
    initialInput: 'Write a comprehensive product review for Sony WH-1000XM5 wireless headphones',
    steps: [
      {
        id: 'research',
        title: 'Research Phase',
        description: 'Analyze product features, specifications, and technical details',
        status: 'pending'
      },
      {
        id: 'compare',
        title: 'Comparison Phase',
        description: 'Compare with competitor products and market positioning',
        status: 'pending'
      },
      {
        id: 'write',
        title: 'Writing Phase',
        description: 'Generate initial review content based on research and comparison',
        status: 'pending'
      },
      {
        id: 'edit',
        title: 'Editing Phase',
        description: 'Improve clarity, flow, and engagement of the review',
        status: 'pending'
      },
      {
        id: 'finalize',
        title: 'Finalization Phase',
        description: 'Add final touches, formatting, and publication-ready polish',
        status: 'pending'
      }
    ]
  },
  {
    id: 'business-proposal',
    name: 'Business Proposal Development',
    description: 'Create a business proposal through systematic research and writing phases',
    initialInput: 'Develop a business proposal for AI-powered customer service automation',
    steps: [
      {
        id: 'market-research',
        title: 'Market Research',
        description: 'Analyze market opportunities, trends, and customer needs',
        status: 'pending'
      },
      {
        id: 'solution-design',
        title: 'Solution Design',
        description: 'Design the proposed solution architecture and features',
        status: 'pending'
      },
      {
        id: 'financial-analysis',
        title: 'Financial Analysis',
        description: 'Calculate costs, benefits, and ROI projections',
        status: 'pending'
      },
      {
        id: 'proposal-writing',
        title: 'Proposal Writing',
        description: 'Draft the complete business proposal document',
        status: 'pending'
      },
      {
        id: 'presentation-prep',
        title: 'Presentation Preparation',
        description: 'Create executive summary and presentation materials',
        status: 'pending'
      }
    ]
  },
  {
    id: 'content-creation',
    name: 'Content Marketing Campaign',
    description: 'Develop a content marketing campaign through sequential content creation',
    initialInput: 'Create a content marketing campaign for sustainable fashion brand',
    steps: [
      {
        id: 'audience-analysis',
        title: 'Audience Analysis',
        description: 'Research target audience demographics, preferences, and behaviors',
        status: 'pending'
      },
      {
        id: 'content-strategy',
        title: 'Content Strategy',
        description: 'Develop content themes, messaging, and channel strategy',
        status: 'pending'
      },
      {
        id: 'content-creation',
        title: 'Content Creation',
        description: 'Create blog posts, social media content, and marketing materials',
        status: 'pending'
      },
      {
        id: 'visual-design',
        title: 'Visual Design',
        description: 'Design graphics, layouts, and visual elements',
        status: 'pending'
      },
      {
        id: 'campaign-optimization',
        title: 'Campaign Optimization',
        description: 'Optimize content for SEO, engagement, and conversion',
        status: 'pending'
      }
    ]
  }
];

const generateStepOutput = (step: ChainStep, input: string, scenario: string): string => {
  const outputs: { [key: string]: { [stepId: string]: string } } = {
    'product-review': {
      'research': 'Features Analysis:\n• Noise Cancellation: Industry-leading ANC technology\n• Battery Life: 30 hours continuous playback\n• Audio Quality: Hi-Res Audio certified, 40mm drivers\n• Price Point: $399 MSRP, premium tier\n• Comfort: Lightweight design (250g), soft earpads\n• Connectivity: Bluetooth 5.2, multipoint connection\n• Controls: Touch controls, voice assistant support',
      'compare': 'Competitive Analysis:\n• vs Bose QuietComfort 45: Better battery (30 vs 24hrs), similar ANC\n• vs Apple AirPods Max: More affordable ($399 vs $549), lighter weight\n• vs Sennheiser Momentum 4: Similar price point, superior ANC\n• Market Position: Premium segment, excellent value proposition\n• Key Differentiators: Best-in-class battery life + ANC combination\n• Competitive Advantage: Price-performance ratio in premium tier',
      'write': 'Draft Review:\n\n"The Sony WH-1000XM5 headphones represent a significant evolution in wireless audio technology. With industry-leading noise cancellation and an impressive 30-hour battery life, they clearly outperform many competitors in the premium segment.\n\nThe Hi-Res Audio certification isn\'t just marketing speak—the 40mm drivers deliver exceptional clarity across all frequencies. Whether you\'re listening to classical music or modern pop, every detail comes through with remarkable precision.\n\nComfort is another standout feature. At just 250g, these headphones feel lightweight even during extended listening sessions. The soft earpads and ergonomic design make them perfect for long flights or work-from-home sessions.\n\nAt $399, they offer excellent value compared to premium alternatives like Apple\'s AirPods Max, while delivering comparable audio performance and superior battery life."',
      'edit': 'Refined Review:\n\n**Sony WH-1000XM5: Redefining Premium Wireless Audio**\n\nIn the crowded landscape of premium wireless headphones, the Sony WH-1000XM5 emerges as a standout performer that successfully balances cutting-edge technology with everyday practicality.\n\n**Exceptional Performance Where It Matters**\nThe noise cancellation technology borders on magical—whether you\'re navigating a busy airport or working in a bustling café, external distractions simply vanish. The 30-hour battery life is genuinely game-changing, outlasting competitors like the Bose QuietComfort 45 by a significant margin.\n\n**Audio Excellence That\'s Immediately Apparent**\nThe Hi-Res Audio certification translates to real-world benefits. Classical compositions reveal subtle instrumental details, while modern productions maintain their dynamic range without fatigue-inducing harshness.\n\n**Comfort That Supports Long-Term Use**\nEngineered for extended wear, the 250g weight distribution and premium materials ensure these headphones remain comfortable during marathon listening sessions.\n\n**Outstanding Value in the Premium Tier**\nAt $399, they deliver premium features without the premium penalty of competitors like Apple\'s $549 AirPods Max."',
      'finalize': '**Sony WH-1000XM5 Review: Premium Audio Perfection**\n\n⭐⭐⭐⭐⭐ 5/5 Stars\n\nIn the competitive world of premium wireless headphones, the Sony WH-1000XM5 doesn\'t just meet expectations—it exceeds them with remarkable consistency across every key metric.\n\n**🎯 The Bottom Line Up Front**\nIf you\'re seeking wireless headphones that deliver professional-grade audio quality, industry-leading noise cancellation, and all-day comfort at a competitive price point, your search ends here.\n\n**🔇 Noise Cancellation That Actually Works**\nThe ANC technology is genuinely impressive, creating an isolated audio environment that transforms noisy commutes into peaceful listening experiences. Whether you\'re on a flight, in a crowded office, or walking busy streets, external noise becomes a non-issue.\n\n**🔋 Battery Life That Changes Everything**\nThe 30-hour battery life isn\'t just a specification—it\'s liberation from charging anxiety. This outlasts the Bose QuietComfort 45 (24 hours) and provides peace of mind for long trips or heavy daily use.\n\n**🎵 Audio Quality That Justifies the Investment**\nHi-Res Audio certification delivers on its promise. The 40mm drivers produce clear highs, rich mids, and controlled bass that works equally well for analytical listening and casual enjoyment.\n\n**😌 Comfort Engineering Done Right**\nAt 250g, these headphones disappear during use. The pressure distribution and material choices support extended listening without the fatigue common in this category.\n\n**💰 Value Proposition**\n**Pros:**\n• Best-in-class battery life (30 hours)\n• Exceptional noise cancellation\n• Superior comfort for extended use\n• Excellent audio quality across genres\n• Competitive pricing vs. premium alternatives\n\n**Cons:**\n• Touch controls can be overly sensitive\n• No wired listening when battery depletes\n• Case is larger than some competitors\n\n**🏆 Final Verdict**\nThe Sony WH-1000XM5 headphones earn our highest recommendation. They deliver premium performance across all key areas while maintaining competitive pricing. For anyone serious about audio quality and daily usability, these headphones represent an exceptional investment.\n\n**Best For:** Frequent travelers, remote workers, audiophiles seeking daily-use premium headphones\n**Skip If:** You prioritize ultra-compact portability or primarily use wired connections'
    },
    'business-proposal': {
      'market-research': 'Market Research Findings:\n• Global customer service automation market: $15.8B (2024)\n• Expected CAGR: 23.8% through 2030\n• Key drivers: Labor costs, 24/7 availability demands, consistency needs\n• Target segments: E-commerce (35%), SaaS companies (28%), Financial services (22%)\n• Pain points: Long response times, inconsistent quality, high turnover costs\n• Opportunity: Mid-market companies underserved by current solutions',
      'solution-design': 'AI Customer Service Solution Architecture:\n• Core Platform: GPT-4 powered conversational AI with custom fine-tuning\n• Integration Layer: REST APIs for CRM, ticketing systems, knowledge bases\n• Multi-channel Support: Web chat, email, social media, voice integration\n• Analytics Dashboard: Real-time metrics, sentiment analysis, performance tracking\n• Human Handoff: Intelligent escalation when AI confidence drops below threshold\n• Customization Engine: Brand voice training, industry-specific knowledge bases\n• Security: End-to-end encryption, GDPR/CCPA compliance, data residency options',
      'financial-analysis': 'Financial Projections & ROI Analysis:\n• Implementation Cost: $75K-$150K (varies by company size)\n• Monthly SaaS Fee: $2,500-$7,500 (tiered pricing model)\n• Customer Savings: 60-70% reduction in support costs\n• ROI Timeline: 8-12 months typical payback period\n• Revenue Model: Setup fee + monthly subscription + usage overages\n• Market Opportunity: $2.3M potential annual revenue from 100 clients\n • Cost Structure: 35% development, 25% sales/marketing, 20% operations, 20% profit margin',
      'proposal-writing': 'Executive Summary:\n\nWe propose implementing an AI-powered customer service automation platform that will transform your support operations while significantly reducing costs and improving customer satisfaction.\n\nOur solution addresses three critical business challenges:\n1. Rising support costs (average $15 per ticket)\n2. Inconsistent service quality due to agent variability\n3. Limited availability outside business hours\n\nThe proposed AI platform will:\n• Handle 70-80% of routine inquiries automatically\n• Provide 24/7 customer support coverage\n• Reduce average response time from 4 hours to under 1 minute\n• Maintain consistent, on-brand communication\n• Scale seamlessly with business growth\n\nInvestment: $125,000 implementation + $5,000/month operational\nProjected Savings: $280,000 annually\nROI: 140% in first year, 280% ongoing\n\nImplementation timeline: 6-8 weeks with minimal business disruption.',
      'presentation-prep': 'Executive Presentation Materials:\n\nSlide 1: Problem Statement - "Customer Service Challenges"\n• 65% of customers expect 24/7 support\n• Average support cost: $15 per ticket\n• Agent turnover: 75% annually\n• Inconsistent service quality\n\nSlide 2: Our Solution - "AI-Powered Automation"\n• Intelligent conversation management\n• Seamless system integration\n• Human-AI collaboration model\n• Real-time analytics and optimization\n\nSlide 3: Business Impact - "Measurable Results"\n• 70% cost reduction in support operations\n• 95% customer satisfaction improvement\n• 24/7 availability with instant response\n• ROI: 140% first year, 280% ongoing\n\nSlide 4: Implementation Plan - "Smooth Transition"\n• Phase 1: Setup and integration (3 weeks)\n• Phase 2: Training and testing (2 weeks)\n• Phase 3: Gradual rollout (3 weeks)\n• Ongoing optimization and support\n\nCall to Action: Pilot program available - 30-day trial with full implementation support'
    },
    'content-creation': {
      'audience-analysis': 'Target Audience Profile:\n• Primary: Conscious consumers aged 25-40, college-educated\n• Income: $50K-$100K household income\n• Values: Environmental responsibility, ethical consumption, quality over quantity\n• Behaviors: Research purchases, share values-driven content, willing to pay premium\n• Channels: Instagram (visual inspiration), TikTok (trend discovery), email (detailed content)\n• Pain Points: Difficulty finding truly sustainable options, greenwashing concerns, price sensitivity\n• Motivations: Personal values alignment, social status, environmental impact reduction',
      'content-strategy': 'Content Marketing Strategy:\n• Core Message: "Sustainable style that doesn\'t compromise on quality or ethics"\n• Content Pillars:\n  1. Education: Sustainability practices, material sourcing, impact metrics\n  2. Inspiration: Styling tips, seasonal looks, versatile pieces\n  3. Transparency: Behind-the-scenes, supply chain stories, impact reports\n  4. Community: Customer stories, styling challenges, brand values\n• Distribution: Instagram (daily), blog (weekly), email (bi-weekly), TikTok (3x/week)\n• Engagement Strategy: User-generated content campaigns, sustainability challenges, expert collaborations',
      'content-creation': 'Content Assets Created:\n\nBlog Posts:\n• "The True Cost of Fast Fashion: Why Sustainable Choices Matter"\n• "Building a Capsule Wardrobe: 15 Essential Sustainable Pieces"\n• "From Farm to Fashion: Our Supply Chain Story"\n\nSocial Media Content:\n• Instagram carousel: "Style One Dress 5 Ways" (sustainable versatility)\n• TikTok series: "Sustainable Fashion Myths Debunked"\n• Stories highlights: "Impact Reports" showing environmental metrics\n\nEmail Campaigns:\n• Welcome series introducing brand values and sustainability practices\n• Seasonal style guides featuring sustainable materials\n• Monthly impact newsletter with customer stories and metrics\n\nPaid Content:\n• Facebook ad campaign focusing on quality and longevity\n• Google Ads targeting sustainable fashion keywords\n• Influencer collaboration briefs for micro-influencers in sustainability space',
      'visual-design': 'Visual Brand Identity:\n• Color Palette: Earth tones (sage green, warm beige, terracotta) with clean whites\n• Typography: Modern sans-serif for headlines, readable serif for body text\n• Photography Style: Natural lighting, authentic models, production process shots\n• Graphic Elements: Minimal icons, nature-inspired patterns, clean layouts\n• Instagram Templates: Consistent grid layout with educational carousels\n• Brand Assets: Logo variations, pattern library, photo filters, story templates\n• Packaging Design: Minimal, recyclable materials with sustainability messaging',
      'campaign-optimization': 'Campaign Optimization Results:\n• SEO: Optimized for "sustainable fashion," "ethical clothing," "eco-friendly apparel"\n• Content Performance: Educational posts generate 3x more engagement than promotional\n• A/B Testing: Authentic lifestyle imagery outperforms studio shots by 45%\n• Email Optimization: Segmented campaigns based on sustainability interests show 28% higher open rates\n• Social Media: User-generated content receives 65% more engagement than brand content\n• Conversion Tracking: Blog readers convert at 12% vs 3% for social traffic\n• Recommendations: Increase educational content ratio, expand influencer partnerships, develop sustainability calculator tool'
    }
  };

  const scenarioOutputs = outputs[scenario] || outputs['product-review'];
  return scenarioOutputs[step.id] || `Processing completed for ${step.title}.\n\nInput received: ${input.substring(0, 100)}...\n\nOutput generated based on sequential processing logic.`;
};

export const SequentialChainingDemo: React.FC = () => {
  const { trackEvent } = usePlausible();
  const [selectedScenario, setSelectedScenario] = useState<SequentialScenario>(SCENARIOS[0]);
  const [steps, setSteps] = useState<ChainStep[]>(SCENARIOS[0].steps);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [speed, setSpeed] = useState(2); // Execution speed multiplier
  const [currentInput, setCurrentInput] = useState('');

  const resetDemo = useCallback(() => {
    trackEvent('Demo Interaction', {
      action: 'reset_demo',
      demo_type: 'sequential_chaining',
      scenario_id: selectedScenario.id,
      current_step_index: currentStepIndex
    });

    const resetSteps = selectedScenario.steps.map(step => ({
      ...step,
      status: 'pending' as const,
      input: undefined,
      output: undefined,
      processingTime: undefined,
      timestamp: undefined
    }));
    
    setSteps(resetSteps);
    setCurrentStepIndex(-1);
    setExecutionLog([]);
    setCurrentInput(selectedScenario.initialInput);
    setIsRunning(false);
  }, [selectedScenario]);

  const executeStep = async (stepIndex: number, input: string): Promise<string> => {
    const step = steps[stepIndex];
    if (!step) return '';

    // Update step to in-progress
    setSteps(prev => prev.map((s, i) => 
      i === stepIndex 
        ? { ...s, status: 'in-progress', input, timestamp: new Date() }
        : s
    ));

    setExecutionLog(prev => [...prev, `🔄 Processing: ${step.title}`]);

    // Simulate processing time
    const processingTime = (2000 + Math.random() * 2000) / speed;
    await new Promise(resolve => setTimeout(resolve, processingTime));

    // Generate output
    const output = generateStepOutput(step, input, selectedScenario.id);

    // Update step to completed
    setSteps(prev => prev.map((s, i) => 
      i === stepIndex 
        ? { 
            ...s, 
            status: 'completed', 
            output, 
            processingTime: processingTime / 1000,
            timestamp: new Date() 
          }
        : s
    ));

    setExecutionLog(prev => [...prev, `✅ Completed: ${step.title} (${(processingTime / 1000).toFixed(1)}s)`]);

    return output;
  };

  const runSequentialChain = async () => {
    trackEvent('Demo Interaction', {
      action: 'start_sequential_chain',
      demo_type: 'sequential_chaining',
      scenario_id: selectedScenario.id,
      total_steps: selectedScenario.steps.length,
      speed_multiplier: speed
    });

    setIsRunning(true);
    resetDemo();
    
    setExecutionLog(['🚀 Starting sequential chain execution...']);
    
    let currentOutput = selectedScenario.initialInput;

    for (let i = 0; i < selectedScenario.steps.length; i++) {
      setCurrentStepIndex(i);
      currentOutput = await executeStep(i, currentOutput);
      
      // Small delay between steps for better visualization
      if (i < selectedScenario.steps.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setExecutionLog(prev => [...prev, '🎉 Sequential chain completed successfully!']);
    setCurrentStepIndex(-1);
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />;
      default: return <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>;
    }
  };

  const getStatusColor = (status: string, isActive: boolean) => {
    if (isActive) return 'border-blue-500 bg-blue-900/30 shadow-lg shadow-blue-500/20';
    
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-900/20';
      case 'in-progress': return 'border-blue-500 bg-blue-900/20';
      case 'error': return 'border-red-500 bg-red-900/20';
      default: return 'border-gray-600 bg-gray-800/20';
    }
  };

  const getChainProgress = () => {
    const completed = steps.filter(s => s.status === 'completed').length;
    const total = steps.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return { completed, total, percentage };
  };

  const progress = getChainProgress();

  useEffect(() => {
    resetDemo();
  }, [selectedScenario, resetDemo]);

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🔗</span>
          Sequential Chaining Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how complex tasks are processed through sequential steps, where each step's output becomes the next step's input.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Scenario
            </label>
            <select
              value={selectedScenario.id}
              onChange={(e) => {
                const scenario = SCENARIOS.find(s => s.id === e.target.value);
                if (scenario) setSelectedScenario(scenario);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Execution Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Chain Progress</span>
            <span className="text-sm text-gray-400">{progress.completed}/{progress.total} steps</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex space-x-3 mb-6">
          <button
            onClick={runSequentialChain}
            disabled={isRunning}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center ${
              isRunning
                ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isRunning ? 'Processing...' : 'Start Chain'}
          </button>
          
          <button
            onClick={resetDemo}
            disabled={isRunning}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sequential Chain Visualization */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Chain Execution Flow</h3>
          
          {/* Initial Input */}
          <div className="mb-4 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
            <h4 className="font-medium text-gray-300 mb-2">Initial Input</h4>
            <div className="text-sm text-gray-200">{selectedScenario.initialInput}</div>
          </div>

          {/* Chain Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connector Arrow */}
                {index > 0 && (
                  <div className="flex justify-center mb-2">
                    <ArrowRight className="w-6 h-6 text-gray-500" />
                  </div>
                )}
                
                <div
                  className={`p-4 rounded-lg border transition-all ${getStatusColor(
                    step.status,
                    currentStepIndex === index
                  )}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {getStatusIcon(step.status)}
                      <h4 className="font-medium text-white ml-3">
                        Step {index + 1}: {step.title}
                      </h4>
                    </div>
                    {step.processingTime && (
                      <span className="text-sm text-gray-400">
                        {step.processingTime.toFixed(1)}s
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-300 mb-3">{step.description}</p>

                  {step.input && (
                    <div className="mb-3">
                      <h5 className="text-xs font-medium text-gray-400 mb-1">INPUT:</h5>
                      <div className="text-xs text-gray-300 bg-gray-800/40 p-2 rounded border-l-2 border-blue-400">
                        {step.input.length > 150 
                          ? `${step.input.substring(0, 150)}...` 
                          : step.input
                        }
                      </div>
                    </div>
                  )}

                  {step.output && (
                    <div>
                      <h5 className="text-xs font-medium text-gray-400 mb-1">OUTPUT:</h5>
                      <div className="text-xs text-gray-200 bg-gray-800/40 p-3 rounded border-l-2 border-green-400 max-h-40 overflow-y-auto">
                        <pre className="whitespace-pre-wrap font-sans">{step.output}</pre>
                      </div>
                    </div>
                  )}

                  {currentStepIndex === index && (
                    <div className="mt-3 flex items-center text-blue-400 text-sm">
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Log */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Execution Log</h3>
          <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-96 overflow-y-auto">
            {executionLog.length === 0 ? (
              <div className="text-gray-400 text-center text-sm mt-8">
                Execution log will appear here...
              </div>
            ) : (
              <div className="space-y-2">
                {executionLog.map((log, index) => (
                  <div key={index} className="text-sm font-mono">
                    <span className="text-gray-500">{new Date().toLocaleTimeString()}</span>
                    <span className="text-gray-300 ml-2">{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scenario Info */}
          <div className="mt-6 p-4 bg-gray-800/20 rounded-lg border border-gray-600/50">
            <h4 className="font-medium text-white mb-2">About This Scenario</h4>
            <p className="text-sm text-gray-300">{selectedScenario.description}</p>
          </div>

          {/* Chain Statistics */}
          {progress.completed > 0 && (
            <div className="mt-4 p-4 bg-gray-800/20 rounded-lg border border-gray-600/50">
              <h4 className="font-medium text-white mb-2">Chain Statistics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Completed Steps:</span>
                  <span className="text-white">{progress.completed}/{progress.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Progress:</span>
                  <span className="text-white">{progress.percentage.toFixed(1)}%</span>
                </div>
                {steps.some(s => s.processingTime) && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Time:</span>
                    <span className="text-white">
                      {steps.reduce((sum, s) => sum + (s.processingTime || 0), 0).toFixed(1)}s
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SequentialChainingDemo; 