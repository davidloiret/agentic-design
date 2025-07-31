'use client';

import React from 'react';
import { UnifiedPatternHeader } from './UnifiedPatternHeader';

interface UnifiedPatternLayoutProps {
  children: React.ReactNode;
  currentView: 'collection' | 'game' | 'battle';
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showNavigation?: boolean;
  player?: {
    name: string;
    level: number;
    coins: number;
  };
  className?: string;
}

export const UnifiedPatternLayout: React.FC<UnifiedPatternLayoutProps> = ({
  children,
  currentView,
  title,
  subtitle,
  onBack,
  showNavigation = true,
  player,
  className = ''
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
      {/* Unified Header */}
      <UnifiedPatternHeader
        currentView={currentView}
        title={title}
        subtitle={subtitle}
        onBack={onBack}
        showNavigation={showNavigation}
        player={player}
      />

      {/* Main Content */}
      <main className={`relative ${className}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};