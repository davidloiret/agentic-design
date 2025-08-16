'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const pathname = usePathname();
  
  // Auto-generate breadcrumbs from pathname if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/', icon: <Home className="w-4 h-4" /> }
    ];
    
    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        label,
        href: index === paths.length - 1 ? undefined : currentPath
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbItems = items || generateBreadcrumbs();
  
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center space-x-2 text-sm ${className}`}
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
            )}
            
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  {item.icon && (
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </span>
                  )}
                  <span className="hover:underline underline-offset-2">
                    {item.label}
                  </span>
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 text-white font-medium">
                  {item.icon}
                  {item.label}
                </span>
              )}
            </motion.div>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

// Breadcrumb container with consistent styling
export const BreadcrumbContainer: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {children}
      </div>
    </div>
  );
};

// Mobile-optimized breadcrumb
export const MobileBreadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const breadcrumbItems = items || [];
  const currentItem = breadcrumbItems[breadcrumbItems.length - 1];
  const parentItem = breadcrumbItems[breadcrumbItems.length - 2];
  
  if (!parentItem) return null;
  
  return (
    <div className={`flex items-center space-x-2 text-sm ${className}`}>
      <Link
        href={parentItem.href || '/'}
        className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-200"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        <span>{parentItem.label}</span>
      </Link>
      <span className="text-gray-500">•</span>
      <span className="text-white font-medium truncate">
        {currentItem?.label}
      </span>
    </div>
  );
};