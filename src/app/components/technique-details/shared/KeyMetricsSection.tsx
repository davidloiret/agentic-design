import React from 'react';

interface Metric {
  metric: string;
  measure: string;
}

interface KeyMetricsSectionProps {
  metrics: Metric[];
}

const KeyMetricsSection: React.FC<KeyMetricsSectionProps> = ({ metrics }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">📊 Key Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((item, idx) => (
          <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="font-medium text-sm">{item.metric}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{item.measure}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyMetricsSection;