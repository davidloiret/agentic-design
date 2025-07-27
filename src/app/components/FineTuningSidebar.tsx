"use client"

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  BookOpen, 
  Code, 
  Cloud, 
  Monitor, 
  Brain, 
  FileText, 
  Settings 
} from 'lucide-react';

interface SidebarItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  href: string;
}

export const FineTuningSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const items: SidebarItem[] = [
    {
      id: 'overview',
      title: 'Overview & Quick Start',
      icon: BookOpen,
      href: '/fine-tuning'
    },
    {
      id: 'cheatsheet',
      title: 'Cheatsheet & Best Practices',
      icon: FileText,
      href: '/fine-tuning/cheatsheet'
    },
    {
      id: 'techniques',
      title: 'Fine-Tuning Techniques',
      icon: Settings,
      href: '/fine-tuning/techniques'
    },
    {
      id: 'frameworks',
      title: 'Frameworks & Tools',
      icon: Code,
      href: '/fine-tuning/frameworks'
    },
    {
      id: 'cloud',
      title: 'Cloud Providers',
      icon: Cloud,
      href: '/fine-tuning/cloud'
    },
    {
      id: 'local',
      title: 'Local & Edge Setup',
      icon: Monitor,
      href: '/fine-tuning/local'
    },
    {
      id: 'models',
      title: 'Model Selection Guide',
      icon: Brain,
      href: '/fine-tuning/models'
    }
  ];

  const handleItemClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="p-6">
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
            (item.href === '/fine-tuning' && pathname === '/fine-tuning');
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                isActive 
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.title}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};