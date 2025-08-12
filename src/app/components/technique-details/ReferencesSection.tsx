'use client';

import React from 'react';

interface Reference {
  title: string;
  url: string;
}

interface ReferenceCategory {
  title: string;
  items: Reference[];
}

interface ReferencesSectionProps {
  categories: ReferenceCategory[];
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({ categories }) => {
  return (
    <section>
      <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
        References & Further Reading
      </h2>
      <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-4">
        {categories.map((category) => (
          <div key={category.title}>
            <h3 className="text-white font-semibold mb-2 text-sm">{category.title}</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              {category.items.map((item) => (
                <li key={item.url}>
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReferencesSection;