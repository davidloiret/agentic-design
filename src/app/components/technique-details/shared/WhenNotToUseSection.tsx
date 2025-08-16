'use client';

import React from 'react';
import { X } from 'lucide-react';

interface WhenNotToUseSectionProps {
  items: string[];
}

export const WhenNotToUseSection: React.FC<WhenNotToUseSectionProps> = ({ items }) => {
  return (
    <section>
      <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-red-500 rounded-full"></div>
        When NOT to Use
      </h2>
      <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
        <div className="relative">
          {items.map((item, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 py-2"
            >
              <div className="flex-shrink-0 w-5 h-5 bg-red-500/15 rounded-full flex items-center justify-center mt-0.5">
                <X className="w-3 h-3 text-red-400" />
              </div>
              
              <div className="flex-1">
                <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhenNotToUseSection;