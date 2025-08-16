// Design System Constants for Agentic Design Patterns
// This file centralizes all design tokens for consistency across the application

export const DesignSystem = {
  // Color System
  colors: {
    // Complexity levels with consistent, accessible colors
    complexity: {
      beginner: {
        primary: '#10B981', // Emerald 500
        secondary: '#34D399', // Emerald 400
        background: 'from-emerald-500/20 to-emerald-600/20',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      },
      intermediate: {
        primary: '#3B82F6', // Blue 500
        secondary: '#60A5FA', // Blue 400
        background: 'from-blue-500/20 to-blue-600/20',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      },
      advanced: {
        primary: '#F59E0B', // Amber 500
        secondary: '#FBBF24', // Amber 400
        background: 'from-amber-500/20 to-amber-600/20',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      },
      expert: {
        primary: '#EF4444', // Red 500
        secondary: '#F87171', // Red 400
        background: 'from-red-500/20 to-red-600/20',
        border: 'border-red-500/30',
        text: 'text-red-400',
        badge: 'bg-red-500/10 text-red-400 border-red-500/20'
      }
    },
    
    // Category-specific colors for visual distinction
    categories: {
      'prompt-chaining': {
        gradient: 'from-blue-500 to-blue-600',
        light: 'from-blue-500/20 to-blue-600/20',
        border: 'border-blue-500/30',
        text: 'text-blue-400'
      },
      'routing': {
        gradient: 'from-emerald-500 to-emerald-600',
        light: 'from-emerald-500/20 to-emerald-600/20',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400'
      },
      'parallelization': {
        gradient: 'from-amber-500 to-amber-600',
        light: 'from-amber-500/20 to-amber-600/20',
        border: 'border-amber-500/30',
        text: 'text-amber-400'
      },
      'multi-agent': {
        gradient: 'from-purple-500 to-purple-600',
        light: 'from-purple-500/20 to-purple-600/20',
        border: 'border-purple-500/30',
        text: 'text-purple-400'
      },
      'tool-use': {
        gradient: 'from-orange-500 to-orange-600',
        light: 'from-orange-500/20 to-orange-600/20',
        border: 'border-orange-500/30',
        text: 'text-orange-400'
      },
      'memory-management': {
        gradient: 'from-indigo-500 to-indigo-600',
        light: 'from-indigo-500/20 to-indigo-600/20',
        border: 'border-indigo-500/30',
        text: 'text-indigo-400'
      },
      'reasoning-techniques': {
        gradient: 'from-pink-500 to-pink-600',
        light: 'from-pink-500/20 to-pink-600/20',
        border: 'border-pink-500/30',
        text: 'text-pink-400'
      },
      'default': {
        gradient: 'from-gray-500 to-gray-600',
        light: 'from-gray-500/20 to-gray-600/20',
        border: 'border-gray-500/30',
        text: 'text-gray-400'
      }
    },
    
    // Status indicators
    status: {
      success: {
        primary: '#10B981',
        background: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400'
      },
      warning: {
        primary: '#F59E0B',
        background: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-400'
      },
      error: {
        primary: '#EF4444',
        background: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400'
      },
      info: {
        primary: '#3B82F6',
        background: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400'
      }
    }
  },
  
  // Component styles
  components: {
    card: {
      base: 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl transition-all duration-200',
      hover: 'hover:bg-gray-800/70 hover:border-gray-600/50 hover:shadow-lg',
      active: 'bg-gray-700/70 border-blue-500/50 shadow-xl',
      padding: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
      }
    },
    
    section: {
      container: 'space-y-8',
      header: 'text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2',
      content: 'text-gray-300 text-base leading-relaxed',
      highlight: 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6',
      divider: 'w-1 h-6 rounded-full'
    },
    
    button: {
      base: 'font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center',
      primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl',
      secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-100 border border-gray-600',
      ghost: 'hover:bg-gray-800/50 text-gray-300 hover:text-white',
      sizes: {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-4 py-2 text-base gap-2',
        lg: 'px-6 py-3 text-lg gap-2.5'
      }
    },
    
    badge: {
      base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      primary: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      secondary: 'bg-gray-700/50 text-gray-300 border border-gray-600/50'
    },
    
    input: {
      base: 'w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200',
      error: 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
    }
  },
  
  // Layout system
  layout: {
    maxWidth: {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full'
    },
    
    spacing: {
      page: 'px-4 sm:px-6 lg:px-8',
      section: 'py-12 sm:py-16 lg:py-20',
      component: 'space-y-6',
      tight: 'space-y-3'
    },
    
    grid: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      },
      gap: {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8'
      }
    }
  },
  
  // Mobile-specific styles
  mobile: {
    touchTarget: 'min-h-[44px] min-w-[44px]', // iOS HIG recommendation
    bottomNav: 'fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800',
    drawer: 'fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-lg'
  },
  
  // Animation presets
  animations: {
    fadeIn: 'animate-in fade-in duration-200',
    slideIn: 'animate-in slide-in-from-bottom-4 duration-300',
    scaleIn: 'animate-in zoom-in-95 duration-200',
    shimmer: 'animate-pulse bg-gray-700/50 rounded'
  },
  
  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
    notification: 70
  }
} as const;

// Helper functions for consistent styling
export const getComplexityColor = (complexity: string) => {
  const complexityKey = complexity.toLowerCase() as keyof typeof DesignSystem.colors.complexity;
  return DesignSystem.colors.complexity[complexityKey] || DesignSystem.colors.complexity.beginner;
};

export const getCategoryColor = (category: string) => {
  return DesignSystem.colors.categories[category as keyof typeof DesignSystem.colors.categories] || DesignSystem.colors.categories.default;
};

export const getStatusColor = (status: 'success' | 'warning' | 'error' | 'info') => {
  return DesignSystem.colors.status[status];
};

// Responsive helper
export const getResponsiveValue = <T,>(mobile: T, tablet?: T, desktop?: T) => {
  return {
    base: mobile,
    md: tablet || mobile,
    lg: desktop || tablet || mobile
  };
};