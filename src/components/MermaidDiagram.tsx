'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
  id?: string;
}

export const MermaidDiagram = ({ chart, id = 'mermaid-diagram' }: MermaidDiagramProps) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.initialize({ 
        startOnLoad: false,
        theme: 'dark',
        flowchart: {
          useMaxWidth: false,
          htmlLabels: true,
          curve: 'basis'
        },
        themeVariables: {
          primaryColor: '#3b82f6',
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#1e40af',
          lineColor: '#6b7280',
          secondaryColor: '#1f2937',
          tertiaryColor: '#374151',
          background: '#111827',
          mainBkg: '#1f2937',
          secondBkg: '#374151',
          tertiaryBkg: '#4b5563'
        }
      });
      
      const uniqueId = `${id}-${Date.now()}`;
      mermaidRef.current.innerHTML = `<div class="mermaid" id="${uniqueId}">${chart}</div>`;
      
      mermaid.run({
        querySelector: `#${uniqueId}`
      }).then(() => {
        // After rendering, let SVG maintain its natural size
        const svgElement = mermaidRef.current?.querySelector('svg');
        if (svgElement) {
          svgElement.style.maxWidth = 'none';
          svgElement.style.height = 'auto';
        }
      }).catch(console.error);
    }
  }, [chart, id]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const diagramContent = (
    <div className="relative w-full h-full">
      <TransformWrapper
        initialScale={0.8}
        minScale={0.3}
        maxScale={3}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: false }}
        panning={{ velocityDisabled: true }}
        limitToBounds={false}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Control Panel */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={() => zoomIn()}
                className="p-2 bg-gray-800/90 hover:bg-gray-700 text-white rounded-lg shadow-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => zoomOut()}
                className="p-2 bg-gray-800/90 hover:bg-gray-700 text-white rounded-lg shadow-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => resetTransform()}
                className="p-2 bg-gray-800/90 hover:bg-gray-700 text-white rounded-lg shadow-lg transition-colors"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-gray-800/90 hover:bg-gray-700 text-white rounded-lg shadow-lg transition-colors"
                title="Toggle Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-4 z-10">
              <div className="bg-gray-800/90 px-3 py-2 rounded-lg text-xs text-gray-300">
                <div>Scroll to zoom • Drag to pan • Double-click to center</div>
              </div>
            </div>

            <TransformComponent
              wrapperClass="w-full h-full"
              contentClass="w-full h-full flex items-center justify-center"
            >
              <div 
                ref={mermaidRef} 
                className="mermaid-container p-4 select-none"
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-900">
        <div className="w-full h-full">
          {diagramContent}
        </div>
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 left-4 z-50 p-3 bg-gray-800/90 hover:bg-gray-700 text-white rounded-lg shadow-lg transition-colors"
        >
          <span className="text-sm">Exit Fullscreen</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mermaid-wrapper bg-gray-900 rounded-lg border border-gray-700 overflow-hidden w-full" style={{ height: '500px' }}>
      {diagramContent}
    </div>
  );
};