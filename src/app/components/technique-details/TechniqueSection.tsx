'use client';

import React from 'react';

interface TechniqueSectionProps {
  title: string;
  colorClass?: string;
  gradient?: string;
  borderClass?: string;
  children: React.ReactNode;
}

export const TechniqueSection: React.FC<TechniqueSectionProps> = ({ 
  title, 
  colorClass = 'bg-blue-500', 
  gradient = 'from-blue-500/10 to-purple-500/10',
  borderClass = 'border-blue-500/20',
  children 
}) => {
  return (
    <section>
      <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <div className={`w-1 h-6 ${colorClass} rounded-full`}></div>
        {title}
      </h2>
      <div className={`bg-gradient-to-br ${gradient} border ${borderClass} rounded-xl p-6`}>
        {children}
      </div>
    </section>
  );
};

export default TechniqueSection;