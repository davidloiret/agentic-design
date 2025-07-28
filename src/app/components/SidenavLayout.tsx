"use client"

import { useState, ReactNode, ReactElement, cloneElement, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { ExpandableBottomSheet, type BottomSheetState } from './ExpandableBottomSheet';
import { Brain } from 'lucide-react';

interface SidenavLayoutProps {
  children: ReactNode;
  sidebarContent: ReactElement;
  sidebarTitle?: string;
  gridCols?: number;
  sidebarSpan?: number;
  emptyState?: ReactNode;
  pathSegmentIndex?: number;
  className?: string;
}

interface DefaultEmptyStateProps {
  title: string;
  description: string;
  actionText: string;
}

const DefaultEmptyState = ({ title, description, actionText }: DefaultEmptyStateProps) => (
  <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center pb-20">
    <div className="text-center text-gray-400 px-6">
      <Brain className="w-20 h-20 mx-auto mb-6 text-gray-600" />
      <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
      <p className="mb-6 text-lg leading-relaxed">{description}</p>
      <p className="text-sm text-gray-500 mb-8">{actionText}</p>
      <div className="flex items-center justify-center">
        <div className="animate-bounce">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export const SidenavLayout = ({
  children,
  sidebarContent,
  sidebarTitle = "Browse",
  gridCols = 4,
  sidebarSpan = 1,
  emptyState,
  pathSegmentIndex = 1,
  className = ""
}: SidenavLayoutProps) => {
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>('expanded');
  const params = useParams();
  const pathname = usePathname();
  
  // Extract category and technique from URL based on pathSegmentIndex
  const pathSegments = pathname.split('/').filter(Boolean);
  const selectedCategory = pathSegments[pathSegmentIndex] || undefined;
  const selectedTechnique = pathSegments[pathSegmentIndex + 1] || undefined;
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(!selectedCategory && !selectedTechnique);

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  const handleReopen = () => {
    setIsBottomSheetOpen(true);
  };

  // Clone sidebar content with extracted props
  const enhancedSidebarContent = cloneElement<any>(sidebarContent, {
    selectedCategory,
    selectedTechnique,
  });

  // Default empty state
  const defaultEmptyState = (
    <DefaultEmptyState
      title="Welcome to Agentic Design"
      description="Discover powerful AI design patterns and techniques to build more reliable AI systems."
      actionText="Swipe up to browse patterns"
    />
  );

  const gridColsClass = `lg:grid-cols-${gridCols}`;
  const sidebarColSpan = sidebarSpan > 1 ? `lg:col-span-${sidebarSpan}` : '';
  const contentColSpan = gridCols - sidebarSpan > 1 ? `lg:col-span-${gridCols - sidebarSpan}` : '';

  useEffect(() => {
    if (selectedCategory || selectedTechnique) {
      setIsBottomSheetOpen(false);
    }
  }, [selectedCategory, selectedTechnique]);

  return (
    <div className={`min-h-screen bg-gray-950 text-white ${className}`}>
      <div className="mx-auto px-4 sm:px-6 py-4 sm:py-8)]">
        {/* Desktop layout */}
        <div className={`hidden lg:grid ${gridColsClass} gap-6 h-full`}>
          <div className={`${sidebarColSpan} sticky top-14 overflow-y-auto h-[calc(100vh-58px)]`}>
            {enhancedSidebarContent}
          </div>
          <div className={`${contentColSpan} pt-6 h-full overflow-y-auto`}>
            {children}
          </div>
        </div>
        
        {/* Mobile layout */}
        <div className="lg:hidden h-full">
          {/* Main content area for mobile */}
          <div className="h-full">
            {children || emptyState || defaultEmptyState}
          </div>
          
          {/* Mobile bottom sheet */}
          <ExpandableBottomSheet
            isOpen={isBottomSheetOpen}
            onClose={handleClose}
            onReopen={handleReopen}
            initialState="expanded"
            onStateChange={setBottomSheetState}
            title={sidebarTitle}
            showReopenButton={true}
          >
            {enhancedSidebarContent}
          </ExpandableBottomSheet>
        </div>
      </div>
    </div>
  );
};