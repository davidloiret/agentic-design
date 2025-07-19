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

  const renderTechnique = (technique: any, isNested = false) => {
    return (
      <button
        key={technique.id}
        onClick={() => setSelectedTechnique(technique)}
        className={`w-full text-left p-3 rounded-lg border transition-all group ${isNested ? 'ml-6' : ''} ${
          selectedTechnique?.id === technique.id
            ? 'bg-gradient-to-r ' + technique.color + ' border-transparent shadow-lg'
            : 'bg-gray-800/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
            selectedTechnique?.id === technique.id 
              ? 'bg-white/20' 
              : 'bg-gray-700 group-hover:bg-gray-600'
          }`}>
            {technique.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={`font-semibold text-sm truncate ${
                selectedTechnique?.id === technique.id ? 'text-white' : 'text-gray-200'
              }`}>
                {technique.name}
                {technique.abbr && (
                  <span className="text-xs ml-1 opacity-75">({technique.abbr})</span>
                )}
              </h3>
              <ChevronRight className={`w-4 h-4 flex-shrink-0 ml-2 ${
                selectedTechnique?.id === technique.id ? 'text-white/70' : 'text-gray-500'
              }`} />
            </div>
            <p className={`text-xs leading-relaxed line-clamp-2 ${
              selectedTechnique?.id === technique.id ? 'text-white/80' : 'text-gray-400'
            }`}>
              {technique.description}
            </p>
            <div className="mt-2">
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                selectedTechnique?.id === technique.id 
                  ? 'bg-white/20 text-white/90' 
                  : 'bg-gray-700 text-gray-300'
              }`}>
                Complexity: {technique.complexity}
              </span>
            </div>
          </div>
        </div>
      </button>
    );
  };

  const renderCategory = (category: Category, isChild = false) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const isSelected = selectedCategory === category.id;
    const categoryTechniques = getTechniquesForCategory(category.id);
    const hasMatchingTechniques = categoryTechniques.length > 0;

    if (!hasMatchingTechniques && !hasChildren) {
      return null;
    }

    return (
      <div key={category.id} className={isChild ? 'ml-4' : ''}>
        <button
          onClick={() => {
            setSelectedCategory(category.id);
            if (hasChildren || categoryTechniques.length > 0) {
              toggleCategory(category.id);
            }
          }}
          className={`w-full p-3 rounded-lg border transition-all text-left ${
            isSelected
              ? 'bg-blue-500 border-blue-400 text-white'
              : 'bg-gray-800 border-gray-700 hover:border-gray-600 text-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {(hasChildren || categoryTechniques.length > 0) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategory(category.id);
                }}
                className="p-0.5 hover:bg-white/10 rounded flex-shrink-0"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
            )}
            <span className="text-lg">{category.icon}</span>
            <div className="flex-1">
              <div className="font-medium text-sm">{category.name}</div>
              <div className="text-xs opacity-75">{category.description}</div>
            </div>
            {(hasChildren || categoryTechniques.length > 0) && (
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded">
                {hasChildren ? getChildCategories(category.id).length : categoryTechniques.length}
              </span>
            )}
          </div>
        </button>
        
        {isExpanded && (
          <div className="mt-2 space-y-1">
            {/* Render child categories first */}
            {hasChildren && getChildCategories(category.id).map(child => renderCategory(child, true))}
            
            {/* Render techniques for this category if it's a leaf category or no children match */}
            {!hasChildren && categoryTechniques.map(technique => renderTechnique(technique, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="lg:col-span-1">
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search patterns..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Categories</label>
          <div className="space-y-2">
            {parentCategories.map(category => renderCategory(category))}
          </div>
        </div>
      </div>
    </div>
  );
};