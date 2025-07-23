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
          curve: 'basis',
          padding: 20,
          nodeSpacing: 50,
          rankSpacing: 80
        },
        themeVariables: {
          primaryColor: '#1e40af',
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#3b82f6',
          lineColor: '#94a3b8',
          secondaryColor: '#0f172a',
          tertiaryColor: '#1e293b',
          background: '#0f172a',
          mainBkg: '#1e293b',
          secondBkg: '#334155',
          tertiaryBkg: '#475569',
          darkMode: true,
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '14px',
          nodeBorder: '#64748b',
          clusterBkg: '#1e293b',
          clusterBorder: '#475569',
          edgeLabelBackground: '#1e293b',
          nodeTextColor: '#ffffff'
        }
      });
      
      const uniqueId = `${id}-${Date.now()}`;
      mermaidRef.current.innerHTML = `<div class="mermaid" id="${uniqueId}">${chart}</div>`;
      
      mermaid.run({
        querySelector: `#${uniqueId}`
      }).then(() => {
        // After rendering, optimize SVG display and text rendering
        const svgElement = mermaidRef.current?.querySelector('svg');
        if (svgElement) {
          svgElement.style.maxWidth = 'none';
          svgElement.style.height = 'auto';
          svgElement.style.fontFamily = 'Inter, system-ui, sans-serif';
          
          // Fix text rendering and ensure proper sizing
          const textElements = svgElement.querySelectorAll('text');
          textElements.forEach((text: Element) => {
            (text as SVGTextElement).style.fill = '#ffffff';
            (text as SVGTextElement).style.fontSize = '14px';
            (text as SVGTextElement).style.fontWeight = '500';
          });
          
          // Improve node styling
          const rectElements = svgElement.querySelectorAll('rect');
          rectElements.forEach((rect: Element) => {
            (rect as SVGRectElement).style.stroke = '#64748b';
            (rect as SVGRectElement).style.strokeWidth = '2';
          });
          
          // Improve path styling
          const pathElements = svgElement.querySelectorAll('path');
          pathElements.forEach((path: Element) => {
            (path as SVGPathElement).style.stroke = '#94a3b8';
            (path as SVGPathElement).style.strokeWidth = '2';
          });
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
                className="mermaid-container p-6 select-none"
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
    <div className="mermaid-wrapper bg-slate-900 rounded-xl border border-slate-600 overflow-hidden w-full shadow-2xl" style={{ height: '500px' }}>
      {diagramContent}
    </div>
  );
};