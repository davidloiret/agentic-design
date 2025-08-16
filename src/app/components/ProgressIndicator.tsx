'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Lock, Sparkles } from 'lucide-react';
import { DesignSystem } from '@/lib/design-system';

interface ProgressStep {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'upcoming' | 'locked';
  progress?: number; // 0-100 for current step
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  variant?: 'linear' | 'circular' | 'milestone';
  showLabels?: boolean;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  variant = 'linear',
  showLabels = true,
  className = ''
}) => {
  if (variant === 'linear') {
    return <LinearProgress steps={steps} showLabels={showLabels} className={className} />;
  } else if (variant === 'circular') {
    return <CircularProgress steps={steps} showLabels={showLabels} className={className} />;
  } else {
    return <MilestoneProgress steps={steps} showLabels={showLabels} className={className} />;
  }
};

// Linear progress indicator
const LinearProgress: React.FC<ProgressIndicatorProps> = ({ steps, showLabels, className }) => {
  const currentIndex = steps.findIndex(step => step.status === 'current');
  const completedCount = steps.filter(step => step.status === 'completed').length;
  const totalProgress = ((completedCount + (currentIndex >= 0 ? 0.5 : 0)) / steps.length) * 100;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Progress bar */}
      <div className="relative">
        <div className="w-full bg-gray-700/50 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        </div>
        
        {/* Step markers */}
        <div className="absolute inset-0 flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isLocked = step.status === 'locked';
            
            return (
              <motion.div
                key={step.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-green-500' :
                  isCurrent ? 'bg-blue-500 ring-4 ring-blue-500/30' :
                  isLocked ? 'bg-gray-700' :
                  'bg-gray-600'
                }`}
              >
                {isCompleted && <CheckCircle className="w-5 h-5 text-white" />}
                {isCurrent && <Circle className="w-5 h-5 text-white animate-pulse" />}
                {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                {!isCompleted && !isCurrent && !isLocked && (
                  <span className="text-xs text-gray-300">{index + 1}</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Labels */}
      {showLabels && (
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center flex-1"
            >
              <p className={`text-xs font-medium ${
                step.status === 'completed' ? 'text-green-400' :
                step.status === 'current' ? 'text-blue-400' :
                step.status === 'locked' ? 'text-gray-500' :
                'text-gray-400'
              }`}>
                {step.label}
              </p>
              {step.status === 'current' && step.progress !== undefined && (
                <p className="text-xs text-gray-500 mt-1">{step.progress}%</p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Circular progress indicator
const CircularProgress: React.FC<ProgressIndicatorProps> = ({ steps, showLabels, className }) => {
  const completedCount = steps.filter(step => step.status === 'completed').length;
  const progress = (completedCount / steps.length) * 100;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-40 h-40">
        <svg className="transform -rotate-90 w-40 h-40">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-700/50"
          />
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              {Math.round(progress)}%
            </motion.div>
            <p className="text-xs text-gray-400 mt-1">
              {completedCount}/{steps.length} Complete
            </p>
          </div>
        </div>
      </div>
      
      {showLabels && (
        <div className="mt-6 space-y-2 w-full max-w-xs">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-2 text-sm ${
                step.status === 'completed' ? 'text-green-400' :
                step.status === 'current' ? 'text-blue-400' :
                'text-gray-400'
              }`}
            >
              {step.status === 'completed' && <CheckCircle className="w-4 h-4" />}
              {step.status === 'current' && <Circle className="w-4 h-4 animate-pulse" />}
              {step.status === 'upcoming' && <Circle className="w-4 h-4" />}
              {step.status === 'locked' && <Lock className="w-4 h-4" />}
              <span>{step.label}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Milestone progress indicator
const MilestoneProgress: React.FC<ProgressIndicatorProps> = ({ steps, showLabels, className }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Connection line */}
      <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-700/50" />
      
      {/* Milestones */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';
          const isLocked = step.status === 'locked';
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              {/* Milestone marker */}
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                    isCurrent ? 'bg-gradient-to-br from-blue-500 to-purple-600 ring-4 ring-blue-500/30' :
                    isLocked ? 'bg-gray-700' :
                    'bg-gray-600'
                  }`}
                >
                  {isCompleted && <CheckCircle className="w-6 h-6 text-white" />}
                  {isCurrent && <Sparkles className="w-6 h-6 text-white animate-pulse" />}
                  {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
                  {!isCompleted && !isCurrent && !isLocked && (
                    <span className="text-sm text-gray-300 font-medium">{index + 1}</span>
                  )}
                </motion.div>
                
                {/* Progress ring for current step */}
                {isCurrent && step.progress !== undefined && (
                  <svg className="absolute inset-0 w-12 h-12">
                    <circle
                      cx="24"
                      cy="24"
                      r="22"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-blue-500/20"
                    />
                    <motion.circle
                      cx="24"
                      cy="24"
                      r="22"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      className="text-blue-400"
                      strokeDasharray={138.23}
                      initial={{ strokeDashoffset: 138.23 }}
                      animate={{ strokeDashoffset: 138.23 - (step.progress / 100) * 138.23 }}
                      style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                    />
                  </svg>
                )}
              </div>
              
              {/* Content */}
              {showLabels && (
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    isCompleted ? 'text-green-400' :
                    isCurrent ? 'text-blue-400' :
                    isLocked ? 'text-gray-500' :
                    'text-gray-300'
                  }`}>
                    {step.label}
                  </h4>
                  {isCurrent && step.progress !== undefined && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{step.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${step.progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Overall progress summary component
export const ProgressSummary: React.FC<{
  totalPatterns: number;
  completedPatterns: number;
  inProgressPatterns: number;
  categories: { name: string; progress: number }[];
}> = ({ totalPatterns, completedPatterns, inProgressPatterns, categories }) => {
  const overallProgress = (completedPatterns / totalPatterns) * 100;
  
  return (
    <div className={`${DesignSystem.components.card.base} ${DesignSystem.components.card.padding.md} space-y-6`}>
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Overall Progress</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Total Progress</span>
            <span className="text-white font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-green-400">{completedPatterns}</div>
          <div className="text-xs text-gray-400">Completed</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-400">{inProgressPatterns}</div>
          <div className="text-xs text-gray-400">In Progress</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-400">{totalPatterns - completedPatterns - inProgressPatterns}</div>
          <div className="text-xs text-gray-400">Not Started</div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-400 mb-3">By Category</h4>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={category.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300">{category.name}</span>
                <span className="text-gray-400">{Math.round(category.progress)}%</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                <motion.div
                  className={`h-1.5 rounded-full ${
                    index % 3 === 0 ? 'bg-blue-500' :
                    index % 3 === 1 ? 'bg-purple-500' :
                    'bg-green-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${category.progress}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};