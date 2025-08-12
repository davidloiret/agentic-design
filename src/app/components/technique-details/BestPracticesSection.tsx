'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface BestPracticesSectionProps {
  practices: string[];
}

export const BestPracticesSection: React.FC<BestPracticesSectionProps> = ({ practices }) => {
  return (
    <section>
      <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-green-500 rounded-full"></div>
        Best Practices
      </h2>
      <div className="grid gap-3">
        {practices.map((tip) => (
          <div key={tip} className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg">
            <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm leading-relaxed">{tip}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestPracticesSection;