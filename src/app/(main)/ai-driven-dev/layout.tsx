"use client"

import { AIDrivenDevSidebar } from '@/app/components/AIDrivenDevSidebar';
import { useState } from 'react';

export default function AIDrivenDevLayout({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started', 'methodologies', 'workflows', 'tools-platforms', 'examples']);

  return (
    <div className="flex relative">
      <AIDrivenDevSidebar
        expandedSections={expandedSections}
        setExpandedSections={setExpandedSections}
      />
      <main className="flex-1 min-h-screen">
        {content || children}
      </main>
    </div>
  );
}