"use client"

import { NavigationTabs } from '../components/NavigationTabs';
import { Header } from '../components/Header';
// ChatBot temporarily disabled (not working). Re-enable the import and the
// <ChatBot /> render below to restore it.
// import { ChatBot } from '../components/ChatBot';
import OnboardingFlow from '@/components/OnboardingFlow';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('patterns');
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Handle scroll restoration based on navbar state
  useScrollToTop();

  // Auto-open onboarding for new users
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      // Small delay to ensure the page has loaded
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for tour trigger from header
  useEffect(() => {
    const handleStartTour = () => {
      setShowOnboarding(true);
    };

    window.addEventListener('startOnboardingTour', handleStartTour);
    return () => window.removeEventListener('startOnboardingTour', handleStartTour);
  }, []);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    // Don't mark as seen when just closing - only on completion or skip
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
    // Notify header component that onboarding is completed
    window.dispatchEvent(new CustomEvent('onboardingCompleted'));
  };

  // Update active tab based on current route
  useEffect(() => {
    const routeToTab: { [key: string]: string } = {
      '/patterns': 'patterns',
      '/recommendations': 'recommendations',
      '/learning-hub': 'learning-hub',
      '/ai-red-teaming': 'ai-red-teaming',
      '/fine-tuning': 'fine-tuning',
      '/ai-inference': 'ai-inference',
      '/prompt-hub': 'prompt-hub',
      '/project-hub': 'project-hub',
      '/news-hub': 'news-hub',
      '/pattern-evaluation': 'pattern-evaluation',
      '/prompt-optimizer': 'prompt-optimizer',
    };

    // Check for exact match first, then check if pathname starts with any route
    let currentTab = routeToTab[pathname];
    if (!currentTab) {
      for (const [route, tab] of Object.entries(routeToTab)) {
        if (pathname.startsWith(route)) {
          currentTab = tab;
          break;
        }
      }
    }
    setActiveTab(currentTab || 'patterns');
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <Header />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="relative">
        {children}
      </main>
      {/* ChatBot temporarily disabled (not working).
      <ChatBot
        onRecommendationSelect={() => {}}
        getRecommendations={() => []}
      /> */}

      {/* Built by Kortexya - Always visible footer */}
      <div className="fixed bottom-2 left-4 z-40">
        <a
          href="https://kortexya.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200"
        >
          Built by <span className="font-medium">Kortexya</span>
        </a>
      </div>

      {/* Onboarding Flow */}
      <OnboardingFlow 
        isVisible={showOnboarding} 
        onClose={handleOnboardingClose}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
}