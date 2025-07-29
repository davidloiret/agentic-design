import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Lightbulb, Share2, FlaskConical, Brain, Boxes, Newspaper, FolderOpen, Cpu, Settings, ChevronDown, Menu, X, GraduationCap, Shield, FileText, FlaskRound } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
  route: string;
}

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const NavigationTabs = ({ activeTab, setActiveTab }: NavigationTabsProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  // Measure navbar height on mount
  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  // Handle scroll for sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      // Header height is now more compact - approximately 44px (py-2 * 2 + compact content)
      const headerHeight = 44;
      const shouldBeFixed = window.scrollY > headerHeight;
      
      // Only update if state actually changes to avoid unnecessary re-renders
      if (shouldBeFixed !== isScrolled) {
        setIsScrolled(shouldBeFixed);
      }
    };
    
    // Check initial scroll position on mount
    handleScroll();
    
    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isScrolled]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const getTabClasses = (tabId: string, isActive: boolean) => {
    const baseClasses = 'relative group transition-all duration-200 font-medium';
    
    if (!isActive) {
      return `${baseClasses} text-gray-400 hover:text-gray-200 hover:bg-gray-800/50`;
    }

    const colorMap = {
      'patterns': 'text-blue-400',
      'learning-hub': 'text-rose-400',
      'fine-tuning': 'text-violet-400',
      'ai-inference': 'text-indigo-400',
      'prompt-hub': 'text-orange-400',
      'project-hub': 'text-yellow-400',
      'news-hub': 'text-emerald-400',
      'ai-red-teaming': 'text-red-400',
      'pattern-evaluation': 'text-purple-400',
    };

    return `${baseClasses} ${colorMap[tabId as keyof typeof colorMap]}`;
  };

  const getActiveIndicatorColor = (tabId: string) => {
    const colorMap = {
      'patterns': 'bg-blue-400',
      'learning-hub': 'bg-rose-400',
      'fine-tuning': 'bg-violet-400',
      'ai-inference': 'bg-indigo-400',
      'prompt-hub': 'bg-orange-400',
      'project-hub': 'bg-yellow-400',
      'news-hub': 'bg-emerald-400',
      'ai-red-teaming': 'bg-red-400',
      'pattern-evaluation': 'bg-purple-400',
    };
    return colorMap[tabId as keyof typeof colorMap] || 'bg-blue-400';
  };

  // Main slot navigation routes
  const tabGroups = [
    {
      name: 'Main Navigation',
      tabs: [
        { id: 'patterns', label: 'Patterns', icon: BookOpen, description: 'Browse AI design patterns', route: '/patterns' },
        { id: 'pattern-evaluation', label: 'Eval Lab', icon: FlaskRound, description: 'Evaluate patterns with different models', route: '/pattern-evaluation' },
        { id: 'ai-red-teaming', label: 'AI Red Teaming', icon: Shield, description: 'AI security & defensive techniques', route: '/ai-red-teaming' },
        { id: 'fine-tuning', label: 'Fine Tuning', icon: Settings, description: 'Model optimization', route: '/fine-tuning' },
        { id: 'ai-inference', label: 'AI Inference', icon: Cpu, description: 'Inference strategies', route: '/ai-inference' },
        { id: 'prompt-hub', label: 'Prompt Hub', icon: FileText, description: 'Leaked AI system prompts', route: '/prompt-hub' },
        { id: 'project-hub', label: 'Project Hub', icon: FolderOpen, description: 'Example projects', route: '/project-hub' },
        { id: 'news-hub', label: 'News Hub', icon: Newspaper, description: 'Latest updates', route: '/news-hub' },
        { id: 'learning-hub', label: 'Learning Hub', icon: GraduationCap, description: 'Gamified learning & certification', route: '/learning-hub' },
      ]
    }
  ];

  const allTabs = tabGroups.flatMap(group => group.tabs);

  const handleTabClick = (tabId: string, route?: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    if (route) {
      router.push(route);
      // Scroll behavior is now handled globally by useScrollToTop hook
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, tabId: string, route?: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(tabId, route);
    }
  };

  return (
    <>
      {/* Spacer to prevent content jump when navbar becomes fixed */}
      {isScrolled && <div style={{ height: navbarHeight }} />}
      
      {/* Desktop Navigation - Always Visible */}
      <div 
        ref={navbarRef}
        className={`z-50 transition-all duration-200 ease-in-out ${
          isScrolled 
            ? 'fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/80 shadow-lg' 
            : 'relative bg-gray-900 border-b border-gray-700'
        }`} 
        style={{ 
          display: 'block', 
          visibility: 'visible'
        }}>
        <div className="mx-auto px-4 sm:px-6">
          {/* Desktop Tabs */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {allTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id, tab.route)}
                    onKeyDown={(e) => handleKeyDown(e, tab.id, tab.route)}
                    className={`cursor-pointer px-4 py-4 rounded-lg transition-all duration-200 ${getTabClasses(tab.id, isActive)}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${tab.id}-panel`}
                    title={tab.description}
                  >
                    <Icon className={`w-4 h-4 inline mr-2 transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    }`} />
                    <span className="text-sm font-medium">{tab.label}</span>
                    {isActive && (
                      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 rounded-full ${getActiveIndicatorColor(tab.id)} transition-all duration-200`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              {allTabs.find(tab => tab.id === activeTab) && (
                <>
                  {React.createElement(allTabs.find(tab => tab.id === activeTab)!.icon, { 
                    className: `w-5 h-5 ${getTabClasses(activeTab, true).split(' ').find(c => c.startsWith('text-'))}` 
                  })}
                  <span className="font-medium text-white">
                    {allTabs.find(tab => tab.id === activeTab)!.label}
                  </span>
                </>
              )}
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div 
            ref={mobileMenuRef}
            className="absolute top-0 right-0 w-80 max-w-[90vw] h-full bg-gray-900 border-l border-gray-700 shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Navigation</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto h-full pb-20">
              {tabGroups.map((group, groupIndex) => (
                <div key={group.name} className={groupIndex > 0 ? 'mt-6' : ''}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    {group.name}
                  </h3>
                  <div className="space-y-1">
                    {group.tabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleTabClick(tab.id, tab.route)}
                          onKeyDown={(e) => handleKeyDown(e, tab.id, tab.route)}
                          className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                            isActive 
                              ? `${getTabClasses(tab.id, true)} shadow-lg` 
                              : 'text-gray-400 hover:text-white hover:bg-gray-800'
                          }`}
                          role="tab"
                          aria-selected={isActive}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{tab.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{tab.description}</div>
                          </div>
                          {isActive && (
                            <div className={`w-2 h-2 rounded-full ${getActiveIndicatorColor(tab.id)}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </>
  );
};