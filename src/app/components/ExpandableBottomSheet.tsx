"use client"

import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export type BottomSheetState = 'closed' | 'collapsed' | 'expanded' | 'fullscreen';

interface ExpandableBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onReopen?: () => void;
  children: React.ReactNode;
  initialState?: BottomSheetState;
  onStateChange?: (state: BottomSheetState) => void;
  title?: string;
  showReopenButton?: boolean;
}

const SHEET_HEIGHTS = {
  closed: '0px',
  collapsed: '40vh',
  expanded: '80vh',
  fullscreen: '95vh'
} as const;

export const ExpandableBottomSheet: React.FC<ExpandableBottomSheetProps> = ({
  isOpen,
  onClose,
  onReopen,
  children,
  initialState = 'collapsed',
  onStateChange,
  title = 'Browse Patterns',
  showReopenButton = true
}) => {
  const [sheetState, setSheetState] = useState<BottomSheetState>(isOpen ? initialState : 'closed');
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleStateChange = (newState: BottomSheetState) => {
    setSheetState(newState);
    onStateChange?.(newState);
    
    if (newState === 'closed') {
      onClose();
    }
  };

  const handleReopen = () => {
    handleStateChange('collapsed');
    onReopen?.();
  };

  const handleClose = () => {
    handleStateChange('closed');
  };

  const getNextState = (direction: 'up' | 'down'): BottomSheetState => {
    if (direction === 'up') {
      if (sheetState === 'closed') return 'collapsed';
      if (sheetState === 'collapsed') return 'expanded';
      if (sheetState === 'expanded') return 'fullscreen';
      return sheetState;
    } else {
      if (sheetState === 'fullscreen') return 'expanded';
      if (sheetState === 'expanded') return 'collapsed';
      if (sheetState === 'collapsed') return 'closed';
      return sheetState;
    }
  };

  const handleExpandClick = () => {
    const nextState = getNextState('up');
    handleStateChange(nextState);
  };

  const handleCollapseClick = () => {
    const nextState = getNextState('down');
    handleStateChange(nextState);
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
        if (nextState === 'closed' && sheetState === 'collapsed') {
          // Only close if dragged down significantly from collapsed state
          const dragDistance = Math.abs(deltaY);
          if (dragDistance > 100) {
            handleStateChange('closed');
          }
        } else {
          handleStateChange(nextState);
        }
      }
    }
    
    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sheetState !== 'closed') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [sheetState]);

  // Update sheet state when isOpen changes
  useEffect(() => {
    if (isOpen && sheetState === 'closed') {
      setSheetState(initialState);
    } else if (!isOpen && sheetState !== 'closed') {
      setSheetState('closed');
    }
  }, [isOpen, initialState, sheetState]);

  return (
    <>
      {/* Backdrop - only show when sheet is not closed */}
      {sheetState !== 'closed' && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={handleClose}
        />
      )}
      
      {/* Reopen button - show when closed and showReopenButton is true */}
      {sheetState === 'closed' && showReopenButton && (
        <div className="md:hidden fixed bottom-5 left-4 z-40">
          <button
            onClick={handleReopen}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2 animate-in slide-in-from-bottom-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950"
            aria-label={`Open ${title}`}
          >
            <ChevronUp className="w-5 h-5" />
            <span className="text-sm font-medium truncate max-w-32">{title}</span>
          </button>
        </div>
      )}
      
      {/* Bottom sheet */}
      <div 
        ref={sheetRef}
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-950 rounded-t-xl shadow-2xl flex flex-col transition-all duration-300 ease-out ${
          isDragging ? 'transition-none' : ''
        } ${
          sheetState === 'closed' ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
        style={{
          height: SHEET_HEIGHTS[sheetState],
          transform: isDragging && sheetState !== 'closed' ? `translateY(${Math.max(0, currentY - startY)}px)` : 'translateY(0)',
          opacity: sheetState === 'closed' ? 0 : 1
        }}
        onPointerDown={sheetState !== 'closed' ? handlePointerDown : undefined}
        onPointerMove={sheetState !== 'closed' ? handlePointerMove : undefined}
        onPointerUp={sheetState !== 'closed' ? handlePointerUp : undefined}
        onPointerLeave={sheetState !== 'closed' ? handlePointerUp : undefined}
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
              <h2 className="text-base font-semibold text-white">{title}</h2>
              <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
                {sheetState}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {/* Expand/Collapse buttons */}
              {(sheetState === 'collapsed' || sheetState === 'expanded') && (
                <button
                  onClick={handleExpandClick}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  aria-label="Expand sheet"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              )}
              {(sheetState === 'expanded' || sheetState === 'fullscreen') && (
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
                onClick={handleClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors ml-1"
                aria-label="Close sheet"
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