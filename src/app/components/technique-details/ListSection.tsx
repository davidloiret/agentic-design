'use client';

import React from 'react';

interface ListSectionProps {
  title: string;
  items: string[];
  colorClass?: string;
  ordered?: boolean;
}

export const ListSection: React.FC<ListSectionProps> = ({ 
  title, 
  items, 
  colorClass = 'bg-red-500',
  ordered = false 
}) => {
  return (
    <section>
      <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <div className={`w-1 h-6 ${colorClass} rounded-full`}></div>
        {title}
      </h2>
      <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
        {ordered ? (
          <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        ) : (
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ListSection;