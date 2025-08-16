'use client';

import React from 'react';
import { 
  Search,
  PenTool,
  Cog,
  Target,
  FileText,
  GitBranch,
  Microscope,
  CheckCircle,
  Shuffle,
  BarChart,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BestUseCasesSectionProps {
  useCases: string[];
}

const getUseCaseIcon = (useCase: string) => {
  const lowerCase = useCase.toLowerCase();
  
  if (lowerCase.includes('analysis') || lowerCase.includes('multi-step')) {
    return Search;
  } else if (lowerCase.includes('content generation') || lowerCase.includes('draft')) {
    return PenTool;
  } else if (lowerCase.includes('data processing') || lowerCase.includes('pipeline')) {
    return Cog;
  } else if (lowerCase.includes('decision') || lowerCase.includes('evaluation')) {
    return Target;
  } else if (lowerCase.includes('document') || lowerCase.includes('parsing')) {
    return FileText;
  } else if (lowerCase.includes('workflow') || lowerCase.includes('process')) {
    return GitBranch;
  } else if (lowerCase.includes('research') || lowerCase.includes('search')) {
    return Microscope;
  } else if (lowerCase.includes('validation') || lowerCase.includes('verification')) {
    return CheckCircle;
  } else if (lowerCase.includes('transformation') || lowerCase.includes('conversion')) {
    return Shuffle;
  } else if (lowerCase.includes('summarization') || lowerCase.includes('summary')) {
    return BarChart;
  }
  return Sparkles;
};

const getUseCaseStyle = (index: number) => {
  const styles = [
    { gradient: 'from-purple-600/20 to-pink-600/20', iconBg: 'from-purple-500 to-pink-500', border: 'border-purple-500/20' },
    { gradient: 'from-blue-600/20 to-cyan-600/20', iconBg: 'from-blue-500 to-cyan-500', border: 'border-blue-500/20' },
    { gradient: 'from-emerald-600/20 to-teal-600/20', iconBg: 'from-emerald-500 to-teal-500', border: 'border-emerald-500/20' },
    { gradient: 'from-orange-600/20 to-red-600/20', iconBg: 'from-orange-500 to-red-500', border: 'border-orange-500/20' },
    { gradient: 'from-violet-600/20 to-indigo-600/20', iconBg: 'from-violet-500 to-indigo-500', border: 'border-violet-500/20' },
  ];
  return styles[index % styles.length];
};

export const BestUseCasesSection: React.FC<BestUseCasesSectionProps> = ({ useCases }) => {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Best Use Cases</h2>
        <p className="text-gray-400 text-sm">Perfect scenarios for this pattern</p>
      </div>
      
      <div className="grid gap-5">
        {useCases.map((useCase, index) => {
          const Icon = getUseCaseIcon(useCase);
          const style = getUseCaseStyle(index);
          
          return (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${style.gradient} backdrop-blur-sm border ${style.border} transition-all duration-500 hover:scale-[1.01]`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-900/70" />
              
              <div className="relative p-6 flex items-center gap-5">
                <div className="flex-shrink-0">
                  <div className={`w-14 h-14 bg-gradient-to-br ${style.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-100 text-base leading-relaxed font-medium">
                    {useCase}
                  </p>
                </div>
                
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 opacity-5">
                <Icon className="w-40 h-40" strokeWidth={0.5} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BestUseCasesSection;