import { Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Agentic Design Patterns
            </h1>
            <p className="text-gray-400 mt-1">Comprehensive cheatsheet for building agentic systems</p>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};