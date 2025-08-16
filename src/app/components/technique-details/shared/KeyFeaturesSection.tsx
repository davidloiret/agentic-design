'use client';

import React from 'react';

interface KeyFeaturesSectionProps {
  features: string[];
}

export const KeyFeaturesSection: React.FC<KeyFeaturesSectionProps> = ({ features }) => {
  return (
    <section>
      <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feat, index) => (
          <div 
            key={feat} 
            className="group relative p-4 bg-gradient-to-br from-gray-800/40 to-gray-800/20 rounded-xl text-gray-300 text-sm border border-gray-700/40 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="absolute top-3 left-3 w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
              <span className="text-cyan-400 text-xs font-bold">{index + 1}</span>
            </div>
            <div className="ml-10">
              {feat}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeaturesSection;