'use client';

import React, { useState, useEffect } from 'react';
import { PatternEvaluationTab } from '../../components/PatternEvaluationTab';
import { Construction, AlertTriangle, Zap, X } from 'lucide-react';

export default function PatternEvaluationPage() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    // Check if user has seen the disclaimer before
    const hasSeenDisclaimer = localStorage.getItem('pattern-lab-disclaimer-seen');
    if (!hasSeenDisclaimer) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleDismissDisclaimer = () => {
    localStorage.setItem('pattern-lab-disclaimer-seen', 'true');
    setShowDisclaimer(false);
  };

  const handleTryAnyway = () => {
    handleDismissDisclaimer();
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <PatternEvaluationTab />
      </div>

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
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full">
                <Construction className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Pattern Evaluation Lab</h2>
                <p className="text-yellow-400 font-medium">🚧 Under Construction</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 mb-8 text-gray-300">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Early Preview Version</h3>
                  <p className="text-sm">
                    This feature is currently in active development. Some functionality may be incomplete, 
                    and the interface is subject to change.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">What's Working</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Pattern comparison across different reasoning approaches</li>
                    <li>• Custom prompt configuration for each pattern</li>
                    <li>• Side-by-side diff analysis of outputs</li>
                    <li>• Simulated model responses for testing</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h3 className="font-semibold text-blue-300 mb-2">Coming Soon</h3>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• Real API integrations with GPT-4, Claude, and other models</li>
                  <li>• Advanced metrics and performance analytics</li>
                  <li>• Export and sharing capabilities</li>
                  <li>• Saved evaluation templates and presets</li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleTryAnyway}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Try it Anyway
              </button>
              <button
                onClick={handleDismissDisclaimer}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors"
              >
                Maybe Later
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              This disclaimer won't show again once dismissed. Your feedback helps us improve!
            </p>
          </div>
        </div>
      )}
    </>
  );
}