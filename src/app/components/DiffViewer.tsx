import React from 'react';
import * as Diff from 'diff';

interface DiffViewerProps {
  leftContent: string;
  rightContent: string;
  leftLabel?: string;
  rightLabel?: string;
  mode?: 'lines' | 'words' | 'chars';
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ 
  leftContent, 
  rightContent, 
  leftLabel = 'Left', 
  rightLabel = 'Right',
  mode = 'words'
}) => {
  const getDiff = () => {
    switch (mode) {
      case 'lines':
        return Diff.diffLines(leftContent, rightContent);
      case 'chars':
        return Diff.diffChars(leftContent, rightContent);
      case 'words':
      default:
        return Diff.diffWords(leftContent, rightContent);
    }
  };

  const diff = getDiff();

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex">
        <div className="flex-1 text-sm font-medium text-gray-300">{leftLabel}</div>
        <div className="flex-1 text-sm font-medium text-gray-300 border-l border-gray-700 pl-4">{rightLabel}</div>
      </div>

      {/* Diff Content */}
      <div className="p-4 font-mono text-sm">
        <div className="space-y-1">
          {diff.map((part, index) => {
            if (part.added) {
              return (
                <span 
                  key={index} 
                  className="bg-green-900/50 text-green-300 px-1 rounded"
                  style={{ textDecoration: 'underline', textDecorationColor: '#10b981' }}
                >
                  {part.value}
                </span>
              );
            } else if (part.removed) {
              return (
                <span 
                  key={index} 
                  className="bg-red-900/50 text-red-300 px-1 rounded line-through"
                >
                  {part.value}
                </span>
              );
            } else {
              return <span key={index} className="text-gray-300">{part.value}</span>;
            }
          })}
        </div>
      </div>
    </div>
  );
};

interface SideBySideDiffViewerProps {
  leftContent: string;
  rightContent: string;
  leftLabel?: string;
  rightLabel?: string;
}

export const SideBySideDiffViewer: React.FC<SideBySideDiffViewerProps> = ({
  leftContent,
  rightContent,
  leftLabel = 'Left',
  rightLabel = 'Right'
}) => {
  const leftLines = leftContent.split('\n');
  const rightLines = rightContent.split('\n');
  const maxLines = Math.max(leftLines.length, rightLines.length);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 grid grid-cols-2">
        <div className="px-4 py-2 text-sm font-medium text-gray-300">{leftLabel}</div>
        <div className="px-4 py-2 text-sm font-medium text-gray-300 border-l border-gray-700">{rightLabel}</div>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-800">
        {Array.from({ length: maxLines }).map((_, lineIndex) => {
          const leftLine = leftLines[lineIndex] || '';
          const rightLine = rightLines[lineIndex] || '';
          const isDifferent = leftLine !== rightLine;

          return (
            <div key={lineIndex} className="grid grid-cols-2 text-sm font-mono">
              {/* Line numbers */}
              <div className={`flex ${isDifferent ? 'bg-red-950/30' : ''}`}>
                <div className="w-12 px-2 py-1 text-gray-500 text-right border-r border-gray-800 select-none">
                  {lineIndex + 1}
                </div>
                <div className="flex-1 px-3 py-1">
                  <span className={isDifferent ? 'text-red-300' : 'text-gray-300'}>
                    {leftLine || <span className="text-gray-600">{'<empty>'}</span>}
                  </span>
                </div>
              </div>
              
              <div className={`flex border-l border-gray-700 ${isDifferent ? 'bg-green-950/30' : ''}`}>
                <div className="w-12 px-2 py-1 text-gray-500 text-right border-r border-gray-800 select-none">
                  {lineIndex + 1}
                </div>
                <div className="flex-1 px-3 py-1">
                  <span className={isDifferent ? 'text-green-300' : 'text-gray-300'}>
                    {rightLine || <span className="text-gray-600">{'<empty>'}</span>}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};