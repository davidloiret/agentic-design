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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feat) => (
          <div key={feat} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm border border-gray-700/40">
            {feat}
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeaturesSection;