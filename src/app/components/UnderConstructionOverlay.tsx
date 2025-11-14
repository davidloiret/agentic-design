"use client"

import React from 'react';
import { Construction, Sparkles } from 'lucide-react';

export const UnderConstructionOverlay = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 top-[120px] z-[100] flex items-center justify-center bg-gray-950/90 backdrop-blur-md">
      <div className="text-center p-8 max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl animate-pulse">
            <Construction className="w-16 h-16 text-teal-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Under Construction</h2>
        <p className="text-gray-400 mb-6">
          We're building something amazing! This section is coming soon.
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-lg">
          <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
          <span className="text-teal-400 font-semibold">Coming Soon</span>
        </div>
      </div>
    </div>
  );
};

export const withUnderConstruction = (children: React.ReactNode) => {
  return (
    <div className="relative min-h-screen">
      <UnderConstructionOverlay />
      <div className="filter blur-sm pointer-events-none">
        {children}
      </div>
    </div>
  );
};