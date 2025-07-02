import React from 'react';
import { 
  FileBarChart, 
  Calculator, 
  FileText, 
  CheckSquare, 
  TrendingUp, 
  Lightbulb, 
  Scale,
  Check
} from 'lucide-react';

interface ModuleSelectorProps {
  selectedModules: string[];
  onChange: (modules: string[]) => void;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({ selectedModules, onChange }) => {
  const availableModules = [
    {
      id: 'business-plan',
      name: 'Business Plan Generator',
      description: 'Create comprehensive business plans',
      icon: FileBarChart,
      color: 'var(--aurora-glow-vibrant)',
      recommended: true,
    },
    {
      id: 'financial',
      name: 'Financial Tools',
      description: 'ROI, break-even, cash flow calculators',
      icon: Calculator,
      color: 'var(--aurora-glow-accent-green)',
      recommended: true,
    },
    {
      id: 'documents',
      name: 'Document Templates',
      description: 'Invoices, contracts, proposals',
      icon: FileText,
      color: 'var(--aurora-glow-accent-purple)',
      recommended: true,
    },
    {
      id: 'projects',
      name: 'Project Manager',
      description: 'Task tracking and project management',
      icon: CheckSquare,
      color: 'var(--status-planning-color-aurora)',
      recommended: true,
    },
    {
      id: 'research',
      name: 'Market Research',
      description: 'Competitor analysis and market insights',
      icon: TrendingUp,
      color: 'var(--aurora-glow-vibrant)',
      recommended: false,
    },
    {
      id: 'pitch',
      name: 'Pitch Deck Builder',
      description: 'Create compelling investor presentations',
      icon: Lightbulb,
      color: 'var(--aurora-glow-accent-green)',
      recommended: false,
    },
    {
      id: 'legal',
      name: 'Legal Documents',
      description: 'NDAs, contracts, legal templates',
      icon: Scale,
      color: 'var(--aurora-glow-accent-purple)',
      recommended: false,
    },
  ];

  const toggleModule = (moduleId: string) => {
    if (selectedModules.includes(moduleId)) {
      onChange(selectedModules.filter(id => id !== moduleId));
    } else {
      onChange([...selectedModules, moduleId]);
    }
  };

  const selectRecommended = () => {
    const recommendedIds = availableModules
      .filter(module => module.recommended)
      .map(module => module.id);
    onChange(recommendedIds);
  };

  const selectAll = () => {
    onChange(availableModules.map(module => module.id));
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold aurora-text-primary">Choose Your Toolkit</h3>
          <p className="text-sm aurora-text-secondary">Select the tools you want to use (you can change this later)</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={selectRecommended}
            className="text-xs px-3 py-2 aurora-button-secondary rounded transition-all duration-300 hover:aurora-button-primary"
          >
            Recommended
          </button>
          <button
            onClick={selectAll}
            className="text-xs px-3 py-2 aurora-button-secondary rounded transition-all duration-300 hover:aurora-button-primary"
          >
            Select All
          </button>
          <button
            onClick={clearAll}
            className="text-xs px-3 py-2 aurora-button-secondary rounded transition-all duration-300 hover:aurora-button-primary"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* 🆕 FIXED: Better responsive grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {availableModules.map((module) => {
          const Icon = module.icon;
          const isSelected = selectedModules.includes(module.id);
          
          return (
            <button
              key={module.id}
              onClick={() => toggleModule(module.id)}
              className={`p-4 rounded-lg text-left transition-all duration-300 relative hover:scale-105 ${
                isSelected
                  ? 'aurora-button-primary shadow-lg'
                  : 'aurora-nav-item hover:aurora-button-secondary'
              }`}
              style={{
                boxShadow: isSelected 
                  ? `0 4px 20px ${module.color}40` 
                  : 'none'
              }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center aurora-icon-glow flex-shrink-0"
                     style={{ 
                       backgroundColor: `${module.color}20`, 
                       border: `1px solid ${module.color}40` 
                     }}>
                  <Icon className="w-5 h-5" style={{ color: module.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-sm">{module.name}</h4>
                    {module.recommended && (
                      <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ 
                              backgroundColor: 'var(--aurora-glow-accent-green)20',
                              color: 'var(--aurora-glow-accent-green)',
                              border: '1px solid var(--aurora-glow-accent-green)40'
                            }}>
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs aurora-text-secondary">{module.description}</p>
                </div>
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: 'var(--aurora-glow-accent-green)' }}>
                    <Check className="w-4 h-4" style={{ color: 'var(--aurora-bg-dark)' }} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 🆕 FIXED: Enhanced selection summary */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg aurora-card">
          <span className="text-sm aurora-text-primary font-medium">
            {selectedModules.length} of {availableModules.length} modules selected
          </span>
          {selectedModules.length === 0 && (
            <span className="text-xs aurora-text-secondary">
              (Select at least one to continue)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleSelector;