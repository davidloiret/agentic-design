import { BookOpen, Lightbulb, Share2, FlaskConical, Brain, Boxes } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const NavigationTabs = ({ activeTab, setActiveTab }: NavigationTabsProps) => {
  const getTabClasses = (tabId: string, isActive: boolean) => {
    if (!isActive) {
      return 'text-gray-400 border-transparent hover:text-gray-200';
    }

    switch (tabId) {
      case 'explore':
        return 'text-blue-400 border-blue-400';
      case 'recommend':
        return 'text-purple-400 border-purple-400';
      case 'graph':
        return 'text-green-400 border-green-400';
      case 'evaluate':
        return 'text-orange-400 border-orange-400';
      case 'mindmap':
        return 'text-pink-400 border-pink-400';
      case 'builder':
        return 'text-cyan-400 border-cyan-400';
      default:
        return 'text-blue-400 border-blue-400';
    }
  };

  const tabs = [
    { id: 'explore', label: 'Explore Patterns', icon: BookOpen },
    { id: 'recommend', label: 'Get Recommendations', icon: Lightbulb },
    { id: 'graph', label: 'Pattern Network', icon: Share2 },
    { id: 'mindmap', label: 'Mind Map', icon: Brain },
    { id: 'builder', label: 'System Builder', icon: Boxes },
    { id: 'evaluate', label: 'Evaluate & Compare', icon: FlaskConical },
  ];

  return (
    <div className="bg-gray-900 border-b border-gray-700">
      <div className="mx-auto px-6">
        <div className="flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-tab={tab.id}
                className={`py-4 px-6 font-medium transition-all border-b-2 ${getTabClasses(tab.id, activeTab === tab.id)}`}
              >
                <Icon className="w-4 h-4 inline mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};