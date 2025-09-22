import React from 'react';

interface QuickOverviewSectionProps {
  pattern: string;
  why: string;
  keyInsight: string;
}

const QuickOverviewSection: React.FC<QuickOverviewSectionProps> = ({
  pattern,
  why,
  keyInsight
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">🎯 30-Second Overview</h3>
      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="text-sm mb-2 text-gray-200">
          <strong>Pattern:</strong> {pattern}
        </p>
        <p className="text-sm mb-2 text-gray-200">
          <strong>Why:</strong> {why}
        </p>
        <p className="text-sm text-gray-200">
          <strong>Key Insight:</strong> {keyInsight}
        </p>
      </div>
    </div>
  );
};

export default QuickOverviewSection;