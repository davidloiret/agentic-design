'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, Swords, Trophy, User, ArrowLeft, 
  Sparkles, BookOpen, Gamepad2
} from 'lucide-react';
import Link from 'next/link';

interface UnifiedPatternHeaderProps {
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
}

export const UnifiedPatternHeader: React.FC<UnifiedPatternHeaderProps> = ({
  currentView,
  title,
  subtitle,
  onBack,
  showNavigation = true,
  player
}) => {
  const navItems = [
    {
      id: 'collection',
      label: 'Collection',
      icon: Package,
      href: '/pattern-cards',
      active: currentView === 'collection'
    },
    {
      id: 'game',
      label: 'Game',
      icon: Gamepad2,
      href: '/pattern-card-game',
      active: currentView === 'game'
    }
  ];

  return (
    <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
            )}
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-gray-400">{subtitle}</p>
                )}
              </div>
            </div>
          </div>

          {/* Center navigation */}
          {showNavigation && (
            <div className="hidden md:flex items-center space-x-1 bg-gray-800/50 rounded-lg p-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.id} href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        flex items-center space-x-2 px-3 py-2 rounded-md transition-all cursor-pointer
                        ${item.active 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right section - Player info */}
          <div className="flex items-center space-x-3">
            {player && (
              <div className="flex items-center space-x-3">
                {/* Coins */}
                <div className="flex items-center space-x-1.5 bg-gray-800/50 rounded-lg px-3 py-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-white">{player.coins}</span>
                </div>
                
                {/* Player */}
                <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-3 py-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div className="text-sm">
                    <span className="text-white font-medium">{player.name}</span>
                    <span className="text-gray-400 ml-1">Lv.{player.level}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};