import { Search, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Category } from '../categories';

interface TechniquesListProps {
  techniques: any[];
  categories: Category[];
  selectedTechnique: any;
  setSelectedTechnique: (technique: any) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredTechniques: any[];
}

export const TechniquesList = ({
  selectedTechnique,
  setSelectedTechnique,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  filteredTechniques,
  categories,
}: TechniquesListProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['reasoning', 'safety', 'chaining']));

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const parentCategories = categories.filter(cat => !cat.parent);
  const getChildCategories = (parentId: string) => categories.filter(cat => cat.parent === parentId);
  const getTechniquesForCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      return filteredTechniques;
    }
    return filteredTechniques.filter(technique => {
      if (technique.category === categoryId) return true;
      const category = categories.find(cat => cat.id === categoryId);
      return category?.children?.includes(technique.category);
    });
  };

  const renderTechnique = (technique: any) => {
    const isSelected = selectedTechnique?.id === technique.id;
    
    return (
      <button
        key={technique.id}
        onClick={() => setSelectedTechnique(technique)}
        className={`w-full text-left p-2 rounded-xl transition-all duration-200 group ml-4 ${
          isSelected
            ? 'bg-gradient-to-r ' + technique.color + ' shadow-lg scale-[0.98]'
            : 'bg-gray-800/30 hover:bg-gray-800/50 hover:scale-[0.99]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${
            isSelected ? 'bg-white/20 text-white' : 'bg-gray-700/50 text-gray-300 group-hover:bg-gray-600'
          }`}>
            {technique.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className={`font-medium text-sm truncate ${
                isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
              }`}>
                {technique.name}
                {technique.abbr && (
                  <span className={`text-xs ml-1 ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                    ({technique.abbr})
                  </span>
                )}
              </h4>
              <div className={`flex items-center gap-2 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  technique.complexity === 'low' ? 'bg-green-500/20 text-green-400' :
                  technique.complexity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {technique.complexity}
                </span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </button>
    );
  };

  const renderCategory = (category: Category, level = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const isSelected = selectedCategory === category.id;
    const categoryTechniques = getTechniquesForCategory(category.id);
    const hasMatchingTechniques = categoryTechniques.length > 0;
    const isParent = level === 0;

    // Always show parent categories, only filter child categories
    if (!isParent && !hasMatchingTechniques && !hasChildren) {
      return null;
    }

    const isSubcategory = level === 1;

    return (
      <div key={category.id} className="space-y-1">
        <div className={`w-full rounded-xl transition-all duration-200 text-left group ${
            isParent 
              ? `p-2 ${isSelected ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg' : 'bg-gray-800/60 hover:bg-gray-800/80'}`
              : `p-3 ml-4 ${isSelected ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-gray-800/30 hover:bg-gray-800/50'}`
          }`}>
          <div className="flex items-center gap-1">
            {(hasChildren || categoryTechniques.length > 0) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategory(category.id);
                }}
                className="p-1 rounded hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              >
                <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                  <ChevronRight className={`${isParent ? 'w-4 h-4' : 'w-3 h-3'} ${
                    isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                  }`} />
                </div>
              </button>
            )}
            
            <button 
              onClick={() => setSelectedCategory(category.id)}
              className="flex-1 flex items-center gap-3 cursor-pointer hover:scale-[0.99] transition-transform"
            >
              <div className={`${isParent ? 'w-10 h-10' : 'w-8 h-8'} rounded-xl flex items-center justify-center ${
                isSelected 
                  ? 'bg-white/20' 
                  : isParent 
                    ? 'bg-gray-700/50 group-hover:bg-gray-600/50' 
                    : 'bg-gray-700/30 group-hover:bg-gray-600/30'
              }`}>
                <span className={`${isParent ? 'text-lg' : 'text-base'}`}>
                  {category.icon}
                </span>
              </div>
              
              <div className="text-left flex-1 min-w-0">
                <h3 className={`font-semibold ${isParent ? 'text-base' : 'text-sm'} truncate ${
                  isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
                }`}>
                  {category.name}
                </h3>
                {/* {isParent && (
                  <p className={`text-xs mt-0.5 ${
                    isSelected ? 'text-white/70' : 'text-gray-400'
                  }`}>
                    {category.description}
                  </p>
                )} */}
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50'
                }`}>
                  {hasChildren ? getChildCategories(category.id).length : categoryTechniques.length}
                </span>
              </div>
            </button>
          </div>
        </div>
        
        {isExpanded && (
          <div className={`space-y-1 ${isParent ? 'ml-0' : 'ml-4'}`}>
            {hasChildren && getChildCategories(category.id).map(child => renderCategory(child, level + 1))}
            {!hasChildren && categoryTechniques.map(technique => renderTechnique(technique))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="lg:col-span-1 h-full flex flex-col">
      {/* Search */}
      <div className="relative flex-shrink-0 mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search patterns..."
          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 transition-all duration-200 text-gray-200 placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Categories Tree */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-8">
        <div className="flex items-center gap-2 px-1 pb-2">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Design Patterns & Techniques
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
        </div>
        
        <div className="space-y-2 pb-6">
          {parentCategories.map(category => renderCategory(category, 0))}
        </div>
      </div>
    </div>
  );
};