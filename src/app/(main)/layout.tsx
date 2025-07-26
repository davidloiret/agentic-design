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
      '/project-hub': 'project-hub',
      '/news-hub': 'news-hub',
    };

    const currentTab = routeToTab[pathname] || 'patterns';
    setActiveTab(currentTab);
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