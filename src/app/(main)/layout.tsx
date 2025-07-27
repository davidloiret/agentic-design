"use client"

import { NavigationTabs } from '../components/NavigationTabs';
import { Header } from '../components/Header';
import { ChatBot } from '../components/ChatBot';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('patterns');

  // Update active tab based on current route
  useEffect(() => {
    const routeToTab: { [key: string]: string } = {
      '/patterns': 'patterns',
      '/learning-hub': 'learning-hub', 
      '/ai-red-teaming': 'ai-red-teaming',
      '/fine-tuning': 'fine-tuning',
      '/ai-inference': 'ai-inference',
      '/prompt-hub': 'prompt-hub',
      '/project-hub': 'project-hub',
      '/news-hub': 'news-hub',
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
      <ChatBot 
        onRecommendationSelect={() => {}}
        getRecommendations={() => []}
      />
    </div>
  );
}