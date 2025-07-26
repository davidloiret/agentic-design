import { Sparkles, Search, Settings } from 'lucide-react';

export const Header = () => {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-b border-gray-700/50 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10"></div>
      
      <div className="relative mx-auto px-4 sm:px-6 py-2">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left side - Logo and Title */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Agentic Design Patterns
                </h1>
                <span className="hidden lg:inline text-xs text-gray-400 font-medium">
                  • Learn how to build reliable and secure AI systems
                </span>
              </div>
            </div>
          </div>

          {/* Middle - Search Bar */}
          <div className="flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 transition-all duration-200 text-gray-200 placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Right side - Settings and Status */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Status indicator */}
            <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 bg-gray-800/50 rounded-full border border-gray-700/50">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-gray-300">Live</span>
            </div>
            
            {/* Settings icon */}
            <button className="p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors duration-200 group" aria-label="Settings">
              <Settings className="w-5 h-5 text-gray-400 hover:text-gray-300 group-hover:rotate-90 transition-all duration-200" />
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <h1 className="text-base font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Agentic Design
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <button className="p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors duration-200" aria-label="Settings">
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};