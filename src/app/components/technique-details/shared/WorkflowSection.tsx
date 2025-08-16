'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface WorkflowSectionProps {
  steps: string[];
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ steps }) => {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Workflow / Steps</h2>
        <p className="text-gray-400 text-sm">Step-by-step implementation guide</p>
      </div>
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Connecting line for all steps except the last */}
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-[calc(100%+1.5rem)] bg-purple-500/20" />
            )}
            
            <div className="flex items-start gap-4">
              {/* Step number circle */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center border-2 border-purple-500/30">
                  <span className="text-lg font-bold text-purple-400">{index + 1}</span>
                </div>
              </div>
              
              {/* Step content card */}
              <div className="flex-1">
                <div className="group relative rounded-xl bg-gray-900/80 border border-gray-800 p-4 hover:border-purple-500/30 transition-all duration-300">
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {step}
                  </p>
                  
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ChevronRight className="w-4 h-4 text-purple-400" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkflowSection;