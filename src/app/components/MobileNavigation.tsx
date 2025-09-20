'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BookOpen,
  Brain,
  Trophy,
  Menu,
  X,
  Search,
  Star,
  Clock,
  TrendingUp,
  Grid3X3,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DesignSystem } from '@/lib/design-system';
import { usePlausible } from '@/hooks/usePlausible';

const navigationItems = [
  { id: 'home', label: 'Home', href: '/', icon: Home },
  { id: 'patterns', label: 'Patterns', href: '/patterns', icon: Grid3X3 },
  { id: 'learning', label: 'Learn', href: '/learning-hub', icon: Brain },
  { id: 'achievements', label: 'Progress', href: '/profile', icon: Trophy }
];

export const MobileBottomNavigation: React.FC = () => {
  const pathname = usePathname();
  const { trackEvent } = usePlausible();
  
  return (
    <nav className={`${DesignSystem.mobile.bottomNav} px-2 py-2 z-50 md:hidden`}>
      <div className="flex items-center justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center ${DesignSystem.mobile.touchTarget} px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => trackEvent('Mobile Navigation', {
                destination: item.id,
                current_page: pathname,
                is_active: isActive
              })}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-400 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: any[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, categories = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'popular' | 'recent' | 'bookmarked'>('all');
  
  const filters = [
    { id: 'all', label: 'All', icon: Grid3X3 },
    { id: 'popular', label: 'Popular', icon: TrendingUp },
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'bookmarked', label: 'Saved', icon: Star }
  ];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`${DesignSystem.mobile.drawer} fixed right-0 top-0 bottom-0 w-full max-w-sm p-6 overflow-y-auto`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Navigation</h2>
              <button
                onClick={onClose}
                className={`${DesignSystem.mobile.touchTarget} flex items-center justify-center rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors`}
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patterns..."
                  className={`${DesignSystem.components.input.base} pl-10`}
                />
              </div>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = selectedFilter === filter.id;
                
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id as any)}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-gray-800/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{filter.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/patterns/${category.id}`}
                    onClick={onClose}
                    className={`flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-200`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-white">{category.name}</div>
                      <div className="text-xs text-gray-400">{category.techniques?.length || 0} techniques</div>
                    </div>
                    <motion.div
                      whileHover={{ x: 3 }}
                      className="text-gray-400"
                    >
                      →
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-8 pt-8 border-t border-gray-700/50">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/learning-hub"
                  onClick={onClose}
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg text-center hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200"
                >
                  <Brain className="w-8 h-8 text-blue-400" />
                  <span className="text-sm font-medium text-white">Start Learning</span>
                </Link>
                <Link
                  href="/profile"
                  onClick={onClose}
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg text-center hover:from-amber-500/30 hover:to-orange-500/30 transition-all duration-200"
                >
                  <Trophy className="w-8 h-8 text-amber-400" />
                  <span className="text-sm font-medium text-white">View Progress</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Mobile menu trigger button
export const MobileMenuButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${DesignSystem.mobile.touchTarget} flex items-center justify-center rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors md:hidden`}
    >
      <Menu className="w-6 h-6 text-gray-400" />
    </button>
  );
};