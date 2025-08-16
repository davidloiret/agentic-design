'use client';

import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';

interface BestPracticesSectionProps {
  practices: string[];
}

export const BestPracticesSection: React.FC<BestPracticesSectionProps> = ({ practices }) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section>
      <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-green-500 rounded-full"></div>
        Best Practices
      </h2>
      <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
        <div className="relative">
          {practices.map((practice, index) => {
            const isLongText = practice.length > 120;
            const isExpanded = expandedItems.has(index);
            const displayText = isLongText && !isExpanded 
              ? `${practice.slice(0, 120)}...` 
              : practice;
            
            return (
              <div 
                key={`${practice}-${index}`}
                className="flex items-start gap-3 py-2"
              >
                <div className="flex-shrink-0 w-5 h-5 bg-green-500/15 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-green-400" />
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {displayText}
                  </p>
                  
                  {isLongText && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="inline-flex items-center gap-1 mt-1.5 text-xs text-green-400 hover:text-green-300 transition-colors duration-200 group/btn"
                    >
                      <span>
                        {isExpanded ? 'Show less' : 'Read more'}
                      </span>
                      <ChevronRight 
                        className={`w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 ${
                          isExpanded ? 'rotate-90' : ''
                        }`} 
                      />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestPracticesSection;