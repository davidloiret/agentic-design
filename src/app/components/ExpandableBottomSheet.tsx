"use client"

import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export type BottomSheetState = 'collapsed' | 'expanded' | 'fullscreen';

interface ExpandableBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialState?: BottomSheetState;
  onStateChange?: (state: BottomSheetState) => void;
}

const SHEET_HEIGHTS = {
  collapsed: '40vh',
  expanded: '80vh',
  fullscreen: '95vh'
} as const;

export const ExpandableBottomSheet: React.FC<ExpandableBottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  initialState = 'collapsed',
  onStateChange
}) => {
  const [sheetState, setSheetState] = useState<BottomSheetState>(initialState);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleStateChange = (newState: BottomSheetState) => {
    setSheetState(newState);
    onStateChange?.(newState);
  };

  const getNextState = (direction: 'up' | 'down'): BottomSheetState => {
    if (direction === 'up') {
      if (sheetState === 'collapsed') return 'expanded';
      if (sheetState === 'expanded') return 'fullscreen';
      return sheetState;
    } else {
      if (sheetState === 'fullscreen') return 'expanded';
      if (sheetState === 'expanded') return 'collapsed';
      return sheetState;
    }
  };

  const handleExpandClick = () => {
    const nextState = getNextState('up');
    handleStateChange(nextState);
  };

  const handleCollapseClick = () => {
    const nextState = getNextState('down');
    if (nextState === 'collapsed' && sheetState === 'expanded') {
      handleStateChange('collapsed');
    } else if (sheetState === 'fullscreen') {
      handleStateChange('expanded');
    }
  };

  // Touch/Mouse handlers for drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setCurrentY(e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setCurrentY(e.clientY);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    
    const deltaY = currentY - startY;
    const threshold = 50; // minimum drag distance to trigger state change
    
    if (Math.abs(deltaY) > threshold) {
      if (deltaY < 0) {
        // Dragged up
        const nextState = getNextState('up');
        handleStateChange(nextState);
      } else {
        // Dragged down
        const nextState = getNextState('down');
        handleStateChange(nextState);
      }
    }
    
    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Bottom sheet */}
      <div 
        ref={sheetRef}
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-950 rounded-t-xl shadow-2xl flex flex-col transition-all duration-300 ease-out ${
          isDragging ? 'transition-none' : ''
        }`}
        style={{
          height: SHEET_HEIGHTS[sheetState],
          transform: isDragging ? `translateY(${Math.max(0, currentY - startY)}px)` : 'translateY(0)'
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Drag handle and header */}
        <div className="flex-shrink-0">
          {/* Drag handle */}
          <div className="flex justify-center py-2 cursor-grab active:cursor-grabbing">
            <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
          </div>
          
          {/* Header with controls */}
          <div className="flex items-center justify-between px-4 pb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white">Browse Patterns</h2>
              <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
                {sheetState}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {/* Expand/Collapse buttons */}
              {sheetState !== 'fullscreen' && (
                <button
                  onClick={handleExpandClick}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  aria-label="Expand sheet"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              )}
              {sheetState !== 'collapsed' && (
                <button
                  onClick={handleCollapseClick}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  aria-label="Collapse sheet"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              )}
              {/* Close button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors ml-1"
                aria-label="Close patterns menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Content area */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
};