'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PromptOptimizerStepper from '@/components/PromptOptimizerStepper';
import { EvalLabAuthPrompt } from '../../components/EvalLabAuthPrompt';
import { Wand2, AlertTriangle, Zap, X } from 'lucide-react';

export default function PromptOptimizerPage() {
  const { user, loading } = useAuth();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    // Set document title
    document.title = 'Prompt Optimizer | Agentic Design';
  }, []);

  useEffect(() => {
    // Only check disclaimer for authenticated users
    if (user) {
      // Check if user has seen the disclaimer before
      const hasSeenDisclaimer = localStorage.getItem('prompt-optimizer-disclaimer-seen');
      if (!hasSeenDisclaimer) {
        setShowDisclaimer(true);
      }
    }
  }, [user]);

  const handleDismissDisclaimer = () => {
    localStorage.setItem('prompt-optimizer-disclaimer-seen', 'true');
    setShowDisclaimer(false);
  };

  const handleTryAnyway = () => {
    handleDismissDisclaimer();
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // Show authentication prompt page if user is not authenticated
  if (!user) {
    return (
      <EvalLabAuthPrompt
        feature="Prompt Optimizer"
        description="Optimize your AI prompts using DSPy and advanced optimization techniques to improve performance, accuracy, and consistency"
      />
    );
  }

  return (
    <>
      <PromptOptimizerStepper />

      {/* Disclaimer Overlay */}
      {showDisclaimer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
            {/* Close button */}
            <button
              onClick={handleDismissDisclaimer}
              className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-pink-500/20 rounded-full">
                <Wand2 className="w-8 h-8 text-pink-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Prompt Optimizer</h2>
                <p className="text-pink-400 font-medium">🚀 Ready to Use</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 mb-8 text-gray-300">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">DSPy-Powered Optimization</h3>
                  <p className="text-sm">
                    This feature uses DSPy (Declarative Self-improving Python) to automatically optimize your prompts 
                    through systematic iterations and training examples.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Available Optimization Strategies</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Bootstrap Few-Shot - Generate optimized examples from minimal data</li>
                    <li>• MIPRO - Multi-stage instruction and prompt optimization</li>
                    <li>• COPRO - Chain-of-thought prompt optimization</li>
                    <li>• Bootstrap Fine-Tune - Training-based optimization</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h3 className="font-semibold text-blue-300 mb-2">How It Works</h3>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• Define your task and provide training examples</li>
                  <li>• Select an optimization strategy that fits your needs</li>
                  <li>• Let DSPy automatically generate and test improved prompts</li>
                  <li>• Compare results and deploy the best performing version</li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleTryAnyway}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start Optimizing
              </button>
              <button
                onClick={handleDismissDisclaimer}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors"
              >
                Maybe Later
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              This disclaimer won't show again once dismissed. Happy optimizing!
            </p>
          </div>
        </div>
      )}
    </>
  );
}