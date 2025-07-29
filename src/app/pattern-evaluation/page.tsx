'use client';

import React, { useState } from 'react';
import { NavigationTabs } from '../components/NavigationTabs';
import { PatternEvaluationTab } from '../components/PatternEvaluationTab';

export default function PatternEvaluationPage() {
  const [activeTab, setActiveTab] = useState('pattern-evaluation');

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <PatternEvaluationTab />
      </main>
    </div>
  );
}