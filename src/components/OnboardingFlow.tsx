'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, Code, Shield, Gamepad2, Zap, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { BrainMascot } from './BrainMascot';

interface OnboardingFlowProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface Step {
  id: string;
  target: string;
  title: string;
  content: React.ReactNode;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export default function OnboardingFlow({ isVisible, onClose, onComplete }: OnboardingFlowProps) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetElements, setTargetElements] = useState<{ [key: string]: DOMRect | null }>({});

  const steps = useMemo<Step[]>(() => [
    {
      id: 'welcome',
      target: 'body',
      title: 'Welcome! Great to have you onboard!',
      content: (
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <BrainMascot
              expression="happy"
              handGesture="wave"
              handDisplay="right"
              size="large"
              color="purple"
              animate={true}
            />
          </div>
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 mb-4 relative">
            {/* Speech bubble pointer */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-4 bg-gray-800/50 border-l border-t border-gray-600/30 transform rotate-45"></div>
            </div>
            <p className="text-gray-200 text-sm italic">
              "Hey there, future AI architect! 👋 I'm your friendly brain guide, and I'm absolutely thrilled you've joined our community of brilliant minds. Ready for a quick tour of this amazing platform? Trust me, you're going to love what we've built here!"
            </p>
          </div>
          <p className="text-gray-400 text-sm">
            Let me show you around our AI development playground – it'll only take 2 minutes, and you'll discover some pretty cool stuff! 🚀
          </p>
        </div>
      ),
      icon: Sparkles,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      placement: 'center'
    },
    {
      id: 'patterns',
      target: '#nav-tab-patterns',
      title: 'The Pattern Library (My Favorite!)',
      content: (
        <div>
          <div className="flex items-start gap-3 mb-4">
            <BrainMascot
              expression="excited"
              size="small"
              color="blue"
              animate={true}
            />
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 flex-1 relative">
              <div className="absolute -left-2 top-3">
                <div className="w-3 h-3 bg-gray-800/50 border-l border-b border-gray-600/30 transform rotate-45"></div>
              </div>
              <p className="text-gray-200 text-sm italic">
                "This is where the magic happens! We've got 150+ battle-tested AI patterns that'll make you feel like a wizard. Chain-of-Thought, Tree-of-Thoughts – all the cool stuff the big AI companies use!"
              </p>
            </div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-blue-300 text-sm">🎯 Pro tip: Start here if you want to understand how AI really thinks!</p>
          </div>
        </div>
      ),
      icon: BookOpen,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      placement: 'bottom'
    },
    {
      id: 'learning-hub',
      target: '#learning-hub-button',
      title: 'Learning Hub - Where Fun Meets Genius!',
      content: (
        <div>
          <div className="flex items-start gap-3 mb-4">
            <BrainMascot
              expression="happy"
              size="small"
              color="purple"
              animate={true}
              glasses={true}
            />
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 flex-1 relative">
              <div className="absolute -left-2 top-3">
                <div className="w-3 h-3 bg-gray-800/50 border-l border-b border-gray-600/30 transform rotate-45"></div>
              </div>
              <p className="text-gray-200 text-sm italic">
                "Who says learning can't be addictive? Earn XP, unlock achievements, battle other devs in epic AI challenges! I've seen people get so hooked they forget to eat lunch. Don't worry, I'll remind you! 😄"
              </p>
            </div>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
            <p className="text-rose-300 text-sm">🔥 Warning: May cause uncontrollable urges to solve AI problems!</p>
          </div>
        </div>
      ),
      icon: Gamepad2,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      placement: 'bottom'
    },
    {
      id: 'ai-red-teaming',
      target: '#nav-tab-ai-red-teaming',
      title: 'AI Security & Red Teaming - Time to Get Serious!',
      content: (
        <div>
          <div className="flex items-start gap-3 mb-4">
            <BrainMascot
              expression="angry"
              size="small"
              color="red"
              animate={true}
            />
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 flex-1 relative">
              <div className="absolute -left-2 top-3">
                <div className="w-3 h-3 bg-gray-800/50 border-l border-b border-gray-600/30 transform rotate-45"></div>
              </div>
              <p className="text-gray-200 text-sm italic">
                "Alright, time to put on my serious face! 😤 This is where we learn to defend against the dark side of AI. Hackers think they're clever? We'll show them what REAL intelligence looks like! Red teaming isn't just fun and games... okay, it's a little fun."
              </p>
            </div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-red-300 text-sm">⚔️ Essential for building bulletproof AI systems that laugh at hackers!</p>
          </div>
        </div>
      ),
      icon: Shield,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      placement: 'bottom'
    },
    {
      id: 'evaluation-lab',
      target: '#nav-tab-pattern-evaluation',
      title: 'Evaluation Laboratory - Mad Scientist Mode!',
      content: (
        <div>
          <div className="flex items-start gap-3 mb-4">
            <BrainMascot
              expression="thinking"
              size="small"
              color="purple"
              animate={true}
            />
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 flex-1 relative">
              <div className="absolute -left-2 top-3">
                <div className="w-3 h-3 bg-gray-800/50 border-l border-b border-gray-600/30 transform rotate-45"></div>
              </div>
              <p className="text-gray-200 text-sm italic">
                "Welcome to my laboratory! 🥽 This is where we put on our scientist goggles and test EVERYTHING. Compare models, patterns, run experiments, analyze results... It's like having your own AI testing playground! Sometimes I get so excited here I forget to blink."
              </p>
            </div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <p className="text-purple-300 text-sm">🔬 Warning: May cause spontaneous hypothesis formation!</p>
          </div>
        </div>
      ),
      icon: Code,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      placement: 'bottom'
    },
    {
      id: 'prompt-hub',
      target: '#nav-tab-prompt-hub',
      title: 'Prompt Hub - The Secret Vault!',
      content: (
        <div>
          <div className="flex items-start gap-3 mb-4">
            <BrainMascot
              expression="mischievous"
              size="small"
              color="amber"
              animate={true}
            />
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 flex-1 relative">
              <div className="absolute -left-2 top-3">
                <div className="w-3 h-3 bg-gray-800/50 border-l border-b border-gray-600/30 transform rotate-45"></div>
              </div>
              <p className="text-gray-200 text-sm italic">
                "Shhh... come closer! 🤫 This is where we keep the good stuff - leaked prompts from the big AI companies! And we analyze them to understand how they work and get inspired to create our own. It's like being a detective, but for prompt engineering. Don't tell anyone, but this is where I learned some of my best tricks!"
              </p>
            </div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
            <p className="text-orange-300 text-sm">🔓 Unlock the secrets behind the world's most powerful AI systems!</p>
          </div>
        </div>
      ),
      icon: Zap,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      placement: 'bottom'
    },
    {
      id: 'project-hub',
      target: '#nav-tab-project-hub',
      title: 'Project Hub - Discover Amazing Libraries!',
      content: (
        <div>
          <div className="flex items-start gap-3 mb-4">
            <BrainMascot
              expression="amazed"
              size="small"
              color="amber"
              animate={true}
            />
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 flex-1 relative">
              <div className="absolute -left-2 top-3">
                <div className="w-3 h-3 bg-gray-800/50 border-l border-b border-gray-600/30 transform rotate-45"></div>
              </div>
              <p className="text-gray-200 text-sm italic">
                "Oh wow, this is my treasure chest! 🎁 Here you'll discover incredible AI libraries and projects that'll blow your mind. Need reliable, trustworthy AI tools? I've curated the best ones! It's like having a personal librarian who only recommends the gems."
              </p>
            </div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <p className="text-yellow-300 text-sm">💎 Handpicked libraries for building reliable & trustworthy AI!</p>
          </div>
        </div>
      ),
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      placement: 'bottom'
    },
    {
      id: 'news-hub',
      target: '#nav-tab-news-hub',
      title: 'News Hub - Stay Updated Effortlessly!',
      content: (
        <div>
          <div className="flex items-start gap-3 mb-4">
            <BrainMascot
              expression="focused"
              size="small"
              color="green"
              animate={true}
            />
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 flex-1 relative">
              <div className="absolute -left-2 top-3">
                <div className="w-3 h-3 bg-gray-800/50 border-l border-b border-gray-600/30 transform rotate-45"></div>
              </div>
              <p className="text-gray-200 text-sm italic">
                "Keeping up with AI news? Harder than following JS frameworks! 😅 Don't worry, I've got your back. I find the gems, give you TL;DRs, and save you hours of scrolling. Stay updated without the FOMO!"
              </p>
            </div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <p className="text-green-300 text-sm">⚡ AI moves fast, but we move faster with smart curation!</p>
          </div>
        </div>
      ),
      icon: Zap,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      placement: 'bottom'
    },
    {
      id: 'mobile-nav',
      target: '#mobile-nav-toggle',
      title: 'Mobile Navigation - Always Accessible!',
      content: (
        <div>
          <div className="flex items-start gap-3 mb-4">
            <BrainMascot
              expression="love"
              size="small"
              color="blue"
              animate={true}
            />
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 flex-1 relative">
              <div className="absolute -left-2 top-3">
                <div className="w-3 h-3 bg-gray-800/50 border-l border-b border-gray-600/30 transform rotate-45"></div>
              </div>
              <p className="text-gray-200 text-sm italic">
                "On your phone? No problem! 📱 I made sure everything works perfectly on mobile too. Learning AI while waiting for coffee? Now we're talking! I'm pretty proud of how smooth this mobile experience is."
              </p>
            </div>
          </div>
          <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-3">
            <p className="text-gray-300 text-sm">🎯 Learn AI anywhere, anytime - even in your pajamas!</p>
          </div>
        </div>
      ),
      icon: BookOpen,
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/10',
      placement: 'left'
    },
    {
      id: 'cta',
      target: 'body',
      title: 'Ready to Become an AI Superstar?',
      content: (
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <BrainMascot
              expression="excited"
              size="large"
              color="purple"
              animate={true}
            />
          </div>
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 mb-4 relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-4 bg-gray-800/50 border-l border-t border-gray-600/30 transform rotate-45"></div>
            </div>
            <p className="text-gray-200 text-sm italic">
              "Alright, my brilliant friend! You've seen the tour, now it's time to unlock your AI superpowers! Create an account to save your progress, compete with other geniuses, and join our amazing community. Trust me, the best part is just getting started! 🌟"
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onComplete();
                router.push('/auth/register');
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
            >
              ✨ Create Free Account
            </button>
            <button
              onClick={() => {
                onComplete();
                router.push('/auth/register');
              }}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all duration-200"
            >
              🎮 Start Learning Hub
            </button>
            <button
              onClick={onComplete}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              📚 Continue Exploring
            </button>
          </div>
        </div>
      ),
      icon: Sparkles,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      placement: 'center'
    }
  ], [router, onClose, onComplete]);

  // Get target element positions
  useEffect(() => {
    if (!isVisible) return;

    const updateTargetPositions = () => {
      const newTargets: { [key: string]: DOMRect | null } = {};
      steps.forEach(step => {
        if (step.target !== 'body') {
          const element = document.querySelector(step.target);
          if (element) {
            const rect = element.getBoundingClientRect();
            newTargets[step.target] = rect;
          }
        }
      });
      setTargetElements(newTargets);
    };

    // Use a timeout to ensure DOM is ready
    const timeoutId = setTimeout(updateTargetPositions, 100);
    
    window.addEventListener('resize', updateTargetPositions);
    window.addEventListener('scroll', updateTargetPositions);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateTargetPositions);
      window.removeEventListener('scroll', updateTargetPositions);
    };
  }, [isVisible, currentStepIndex]); // Added currentStepIndex to update when step changes

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete(); // Mark as completed when finishing the tour
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const getTooltipPosition = () => {
    if (currentStep.placement === 'center' || currentStep.target === 'body') {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10002
      };
    }

    const targetRect = targetElements[currentStep.target];
    if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10002 };

    const tooltipWidth = 480; // Increased width to prevent text cropping
    const tooltipHeight = 280; // Increased height to account for content
    const padding = 24; // Increased padding to avoid overlap

    let top = 0;
    let left = 0;

    switch (currentStep.placement) {
      case 'bottom':
        top = targetRect.bottom + padding;
        left = Math.max(padding, Math.min(
          window.innerWidth - tooltipWidth - padding,
          targetRect.left + targetRect.width / 2 - tooltipWidth / 2
        ));
        break;
      case 'top':
        top = targetRect.top - tooltipHeight - padding;
        left = Math.max(padding, Math.min(
          window.innerWidth - tooltipWidth - padding,
          targetRect.left + targetRect.width / 2 - tooltipWidth / 2
        ));
        break;
      case 'left':
        top = Math.max(padding, Math.min(
          window.innerHeight - tooltipHeight - padding,
          targetRect.top + targetRect.height / 2 - tooltipHeight / 2
        ));
        left = targetRect.left - tooltipWidth - padding;
        break;
      case 'right':
        top = Math.max(padding, Math.min(
          window.innerHeight - tooltipHeight - padding,
          targetRect.top + targetRect.height / 2 - tooltipHeight / 2
        ));
        left = targetRect.right + padding;
        break;
      default:
        top = targetRect.bottom + padding;
        left = Math.max(padding, Math.min(
          window.innerWidth - tooltipWidth - padding,
          targetRect.left + targetRect.width / 2 - tooltipWidth / 2
        ));
    }

    // Ensure tooltip doesn't overlap with target element and stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Add extra margin for mobile devices
    const minMargin = viewportWidth < 768 ? 16 : padding;
    
    const finalTop = Math.max(minMargin, Math.min(viewportHeight - tooltipHeight - minMargin, top));
    const finalLeft = Math.max(minMargin, Math.min(viewportWidth - tooltipWidth - minMargin, left));

    return {
      top: `${finalTop}px`,
      left: `${finalLeft}px`,
      zIndex: 10002
    };
  };

  const getSpotlightStyle = () => {
    const targetRect = targetElements[currentStep.target];
    if (!targetRect || currentStep.target === 'body') return null;

    const padding = 4;
    return {
      top: `${targetRect.top - padding}px`,
      left: `${targetRect.left - padding}px`,
      width: `${targetRect.width + (padding * 2)}px`,
      height: `${targetRect.height + (padding * 2)}px`,
    };
  };

  if (!isVisible) return null;

  const Icon = currentStep.icon;
  const tooltipPosition = getTooltipPosition();
  const spotlightStyle = getSpotlightStyle();

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Persistent backdrop that stays during transitions */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: spotlightStyle 
            ? (() => {
                const centerX = parseInt(spotlightStyle.left) + parseInt(spotlightStyle.width) / 2;
                const centerY = parseInt(spotlightStyle.top) + parseInt(spotlightStyle.height) / 2;
                const radiusX = parseInt(spotlightStyle.width) / 2 + 6;
                const radiusY = parseInt(spotlightStyle.height) / 2 + 6;
                
                return `radial-gradient(ellipse ${radiusX}px ${radiusY}px at ${centerX}px ${centerY}px, 
                  transparent 0px, 
                  transparent ${Math.max(radiusX, radiusY)}px, 
                  rgba(0, 0, 0, 0.85) ${Math.max(radiusX, radiusY) + 20}px)`;
              })()
            : 'rgba(0, 0, 0, 0.85)'
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`onboarding-${currentStepIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="relative h-full"
        >
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.02); }
          }
        `}</style>

        {/* Click handler overlay */}
        <div
          className="absolute inset-0 bg-transparent"
          onClick={onClose}
        />

        {/* Spotlight border */}
        {spotlightStyle && (
          <div
            className="absolute pointer-events-none rounded-lg"
            style={{
              ...spotlightStyle,
              border: '2px solid rgba(139, 92, 246, 0.9)',
              background: 'transparent',
              zIndex: 1001,
              boxShadow: `
                0 0 0 1px rgba(255, 255, 255, 0.3),
                0 0 15px rgba(139, 92, 246, 0.6),
                0 0 30px rgba(139, 92, 246, 0.4)
              `,
              animation: 'pulse 2.5s ease-in-out infinite'
            }}
          />
        )}

        {/* Tooltip */}
        <div
          className="absolute bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-6 w-full mx-4"
          style={{
            ...tooltipPosition,
            opacity: 1,
            pointerEvents: 'auto',
            zIndex: 10003,
            maxWidth: '480px',
            minWidth: '320px'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`${currentStep.bgColor} w-10 h-10 rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${currentStep.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white">{currentStep.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            {currentStep.content}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStepIndex ? 'bg-purple-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {!isFirstStep && (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-1 px-3 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              
              <button
                onClick={nextStep}
                className="flex items-center gap-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
              >
                {isLastStep ? 'Complete' : 'Next'}
                {!isLastStep && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Skip button */}
          <div className="text-center mt-4">
            <button
              onClick={onComplete}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Skip tour
            </button>
          </div>
        </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}