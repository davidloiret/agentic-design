"use client"

import React, { Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Shield, FileText, LayoutDashboard, Activity, CheckCircle, BarChart3, Archive } from 'lucide-react';
import { CategoryNavigationLayout, NavigationItem, NavigationCategory } from './CategoryNavigationLayout';
import { redTeamingCategories, allRedTeamingTechniques } from '../red-teaming';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface RoutedRedTeamingTechniquesListProps {
  selectedCategory?: string;
  selectedTechnique?: string;
}

const options = {
  keys: ['name', 'abbr', 'description', 'category'],
  threshold: 0.3
};

const RoutedRedTeamingTechniquesListInner = ({ selectedCategory, selectedTechnique }: RoutedRedTeamingTechniquesListProps) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const isAuditSection = pathname.includes('/audit');
  
  // Convert techniques to NavigationItem format
  const convertedTechniques: NavigationItem[] = allRedTeamingTechniques.map(tech => ({
    id: tech.id,
    name: tech.name,
    category: tech.category,
    complexity: tech.complexity,
    abbr: tech.abbr,
    icon: '🛡️',
    href: `/ai-red-teaming/${tech.category}/${tech.id}`
  }));

  // Convert categories to NavigationCategory format
  const convertedCategories: NavigationCategory[] = Object.entries(redTeamingCategories).map(([id, category]) => ({
    id,
    name: category.name,
    icon: category.icon
  }));

  // Custom filter function using Fuse.js
  const filterTechniques = (techniques: NavigationItem[], searchQuery: string) => {
    if (!searchQuery) return techniques;
    const fuse = new Fuse(techniques, options);
    return fuse.search(searchQuery).map(result => result.item);
  };

  // Get the currently selected category from URL
  const currentCategory = selectedCategory || null;
  
  const auditNavItems = [
    {
      href: '/ai-red-teaming/audit',
      icon: LayoutDashboard,
      label: 'Dashboard',
      isActive: pathname === '/ai-red-teaming/audit'
    },
    {
      href: '/ai-red-teaming/audit/active',
      icon: Activity,
      label: 'Active Audits',
      badge: '3',
      isActive: pathname === '/ai-red-teaming/audit/active'
    },
    {
      href: '/ai-red-teaming/audit/completed',
      icon: CheckCircle,
      label: 'Completed',
      isActive: pathname === '/ai-red-teaming/audit/completed'
    },
    {
      href: '/ai-red-teaming/audit/reports',
      icon: FileText,
      label: 'Reports',
      isActive: pathname === '/ai-red-teaming/audit/reports'
    },
    {
      href: '/ai-red-teaming/audit/templates',
      icon: Archive,
      label: 'Templates',
      isActive: pathname === '/ai-red-teaming/audit/templates'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {isAuditSection && user ? (
        // Audit Navigation - Only show if in audit section AND authenticated
        <div className="space-y-6">
          <div className="">
            <div className="flex items-center gap-2 px-1 pb-3">
              <Shield className="w-4 h-4 text-red-400" />
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Audit Lab
              </h2>
            </div>
            <div className="text-xs text-gray-400 px-1">Security Professional</div>
          </div>
          
          <nav className="space-y-1">
            {auditNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  item.isActive
                    ? 'bg-red-600/20 text-red-300 border border-red-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs bg-blue-600/20 text-blue-300 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      ) : (
        // Default Red Teaming Navigation
        <>
          {/* Audit Methodology Section - Only show for authenticated users */}
          {user && (
            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-2 px-1 pb-2">
                <Shield className="w-4 h-4 text-red-400" />
                <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Audit Tools
                </h2>
              </div>
              
              <Link 
                href="/ai-red-teaming/audit"
                className="block w-full p-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl hover:from-red-500/20 hover:to-orange-500/20 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-red-300 transition-colors">
                      Security Audit Methodology
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Comprehensive framework for AI system audits
                  </div>
                </div>
              </div>
            </Link>
            </div>
          )}

          {/* Existing Techniques Navigation */}
          <div className="flex-1 min-h-0">
            <CategoryNavigationLayout
              items={convertedTechniques}
              categories={convertedCategories}
              searchPlaceholder="Search techniques..."
              sectionTitle="AI Red Teaming Techniques"
              basePath="/ai-red-teaming"
              accentColor="red"
              enableCategoryNavigation={true}
              defaultExpandedCategories={currentCategory ? [currentCategory] : []}
              filterItems={filterTechniques}
            />
          </div>
        </>
      )}
    </div>
  );
};

export const RoutedRedTeamingTechniquesList = ({ selectedCategory, selectedTechnique }: RoutedRedTeamingTechniquesListProps = {}) => {
  return (
    <Suspense fallback={<div className="lg:col-span-1 h-full flex flex-col min-h-0">
      <div className="relative flex-shrink-0 mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search techniques..."
          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 transition-all duration-200 text-gray-200 placeholder-gray-400"
          disabled
        />
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 min-h-0">
        <div className="flex items-center gap-2 px-1 pb-2">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Loading...
          </h2>
        </div>
      </div>
    </div>}>
      <RoutedRedTeamingTechniquesListInner 
        selectedCategory={selectedCategory} 
        selectedTechnique={selectedTechnique} 
      />
    </Suspense>
  );
};