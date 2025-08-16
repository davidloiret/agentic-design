'use client';

import React from 'react';
import { 
  BookOpen, 
  FileText, 
  Code2, 
  Users,
  ExternalLink,
  GraduationCap,
  Wrench,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';

interface Reference {
  title: string;
  url: string;
}

interface ReferenceCategory {
  title: string;
  items: Reference[];
}

interface ReferencesSectionProps {
  categories: ReferenceCategory[];
}

const getCategoryIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('academic') || lowerTitle.includes('paper')) {
    return GraduationCap;
  } else if (lowerTitle.includes('implementation') || lowerTitle.includes('guide')) {
    return FileText;
  } else if (lowerTitle.includes('tool') || lowerTitle.includes('librar')) {
    return Wrench;
  } else if (lowerTitle.includes('community') || lowerTitle.includes('discussion')) {
    return MessageSquare;
  } else if (lowerTitle.includes('code') || lowerTitle.includes('example')) {
    return Code2;
  } else if (lowerTitle.includes('people') || lowerTitle.includes('team')) {
    return Users;
  }
  return BookOpen;
};

const getCategoryStyle = (index: number) => {
  const styles = [
    { bg: 'from-blue-500/10 to-indigo-500/10', border: 'border-blue-500/20', icon: 'text-blue-400' },
    { bg: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-500/20', icon: 'text-purple-400' },
    { bg: 'from-emerald-500/10 to-teal-500/10', border: 'border-emerald-500/20', icon: 'text-emerald-400' },
    { bg: 'from-orange-500/10 to-red-500/10', border: 'border-orange-500/20', icon: 'text-orange-400' },
  ];
  return styles[index % styles.length];
};

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({ categories }) => {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">References & Further Reading</h2>
        <p className="text-gray-400 text-sm">Deepen your understanding with these curated resources</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((category, categoryIndex) => {
          const Icon = getCategoryIcon(category.title);
          const style = getCategoryStyle(categoryIndex);
          
          return (
            <div
              key={category.title}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${style.bg} backdrop-blur-sm border ${style.border}`}
            >
              <div className="absolute inset-0 bg-gray-900/70" />
              
              <div className="relative p-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-700">
                    <Icon className={`w-5 h-5 ${style.icon}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>
                
                {/* Reference Links */}
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <a
                      key={item.url}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link block"
                    >
                      <div className="relative overflow-hidden rounded-lg bg-gray-800/50 border border-gray-700/50 p-3 hover:border-gray-600 transition-all duration-300">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-sm text-gray-200 group-hover/link:text-white transition-colors line-clamp-2">
                              {item.title}
                            </p>
                          </div>
                          <div className="flex-shrink-0 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/link:translate-x-0">
                            <ArrowUpRight className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                          </div>
                        </div>
                        
                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/10 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-500 -translate-x-full group-hover/link:translate-x-full" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Call to Action */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 p-6">
        <div className="absolute inset-0 bg-gray-900/80" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-orange-400" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Contribute to this collection</h3>
              <p className="text-xs text-gray-400 mt-0.5">Know a great resource? Submit a pull request to add it.</p>
            </div>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-sm text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>Contribute</span>
            <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReferencesSection;