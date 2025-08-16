'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface CommonPitfallsSectionProps {
  pitfalls: string[];
}

export const CommonPitfallsSection: React.FC<CommonPitfallsSectionProps> = ({ pitfalls }) => {
  return (
    <section>
      <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
        Common Pitfalls
      </h2>
      <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
        <div className="relative">
          {pitfalls.map((pitfall, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 py-2"
            >
              <div className="flex-shrink-0 w-5 h-5 bg-amber-500/15 rounded-full flex items-center justify-center mt-0.5">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
              </div>
              
              <div className="flex-1">
                <p className="text-gray-300 text-sm leading-relaxed">{pitfall}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommonPitfallsSection;