import { Search, ChevronRight } from 'lucide-react';

interface TechniquesListProps {
  techniques: any[];
  categories: any[];
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
          <div className="grid grid-cols-1 gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-lg border transition-all text-left ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 border-blue-400 text-white'
                    : 'bg-gray-800 border-gray-700 hover:border-gray-600 text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <div>
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs opacity-75">{category.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {filteredTechniques.map((technique) => (
          <button
            key={technique.id}
            onClick={() => setSelectedTechnique(technique)}
            className={`w-full text-left p-4 rounded-lg border transition-all group ${
              selectedTechnique?.id === technique.id
                ? 'bg-gradient-to-r ' + technique.color + ' border-transparent shadow-lg'
                : 'bg-gray-800/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
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
                    {categories.find(c => c.id === technique.category)?.name}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};