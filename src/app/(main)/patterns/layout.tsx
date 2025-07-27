"use client"

import { useState } from 'react';
import { ExpandableBottomSheet, type BottomSheetState } from '../../components/ExpandableBottomSheet';
import { Brain } from 'lucide-react';

export default function PatternsLayout({
  children,
  sidebar,
  content,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) {
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>('expanded');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  const handleReopen = () => {
    setIsBottomSheetOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto px-6 py-8 h-[calc(100vh-5rem)]">
        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 h-full overflow-hidden">
          {sidebar}
          {content}
        </div>
        
        {/* Mobile layout */}
        <div className="lg:hidden h-full">
          {/* Main content area for mobile */}
          <div className="h-full">
            {content || (
              <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center pb-20">
                <div className="text-center text-gray-400 px-6">
                  <Brain className="w-20 h-20 mx-auto mb-6 text-gray-600" />
                  <h3 className="text-2xl font-semibold mb-4 text-white">Welcome to Agentic Design</h3>
                  <p className="mb-6 text-lg leading-relaxed">Discover powerful AI design patterns and techniques to build more reliable AI systems.</p>
                  <p className="text-sm text-gray-500 mb-8">Swipe up to browse patterns</p>
                  <div className="flex items-center justify-center">
                    <div className="animate-bounce">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile bottom sheet */}
          <ExpandableBottomSheet
            isOpen={isBottomSheetOpen}
            onClose={handleClose}
            onReopen={handleReopen}
            initialState="expanded"
            onStateChange={setBottomSheetState}
            title="Patterns"
            showReopenButton={true}
          >
            {sidebar}
          </ExpandableBottomSheet>
        </div>
      </div>
    </div>
  );
}