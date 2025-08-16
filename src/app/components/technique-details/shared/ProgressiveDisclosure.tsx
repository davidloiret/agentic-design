'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, EyeOff, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DesignSystem } from '@/lib/design-system';

interface ProgressiveDisclosureProps {
  overview: {
    keyPoints: string[];
    visualDiagram?: React.ReactNode;
    complexity: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  };
  detailed: {
    content: React.ReactNode;
  };
  advanced?: {
    content: React.ReactNode;
  };
}

export const ProgressiveDisclosure: React.FC<ProgressiveDisclosureProps> = ({
  overview,
  detailed,
  advanced
}) => {
  const [activeLevel, setActiveLevel] = useState<'overview' | 'detailed' | 'advanced'>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']));
  
  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };
  
  const levels = [
    { id: 'overview', label: 'Overview', icon: Eye, available: true },
    { id: 'detailed', label: 'Detailed', icon: Layers, available: true },
    { id: 'advanced', label: 'Advanced', icon: EyeOff, available: !!advanced }
  ];
  
  return (
    <div className="space-y-4">
      {/* Level Selector */}
      <div className="flex items-center gap-2 p-1 bg-gray-800/50 rounded-lg">
        {levels.map((level) => {
          if (!level.available) return null;
          const Icon = level.icon;
          const isActive = activeLevel === level.id;
          
          return (
            <button
              key={level.id}
              onClick={() => setActiveLevel(level.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{level.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeLevel === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Key Points */}
            <div className={`${DesignSystem.components.card.base} ${DesignSystem.components.card.padding.md}`}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">📌</span>
                Key Points
              </h3>
              <ul className="space-y-3">
                {overview.keyPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-300">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* Visual Diagram */}
            {overview.visualDiagram && (
              <div className={`${DesignSystem.components.card.base} ${DesignSystem.components.card.padding.md}`}>
                <button
                  onClick={() => toggleSection('diagram')}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="text-2xl">🎨</span>
                    Visual Diagram
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedSections.has('diagram') ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {expandedSections.has('diagram') && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-700/50">
                        {overview.visualDiagram}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
        
        {activeLevel === 'detailed' && (
          <motion.div
            key="detailed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`${DesignSystem.components.card.base} ${DesignSystem.components.card.padding.md}`}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Detailed Information
              </h3>
              <div className="prose prose-invert max-w-none">
                {detailed.content}
              </div>
            </div>
          </motion.div>
        )}
        
        {activeLevel === 'advanced' && advanced && (
          <motion.div
            key="advanced"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`${DesignSystem.components.card.base} ${DesignSystem.components.card.padding.md}`}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Advanced Topics
              </h3>
              <div className="prose prose-invert max-w-none">
                {advanced.content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Collapsible Section Component for use within content
export const CollapsibleSection: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}> = ({ title, children, defaultOpen = false, icon }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border border-gray-700/50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-200 flex items-center justify-between"
      >
        <span className="flex items-center gap-2 font-medium text-white">
          {icon}
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-700/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};