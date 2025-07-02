import React from 'react';
import { Users } from 'lucide-react';

interface TeamSizeSelectorProps {
  currentSize: number;
  onChange: (size: number) => void;
}

const TeamSizeSelector: React.FC<TeamSizeSelectorProps> = ({ currentSize, onChange }) => {
  const teamSizeOptions = [
    { value: 1, label: 'Solo Entrepreneur', description: 'Just me building my business' },
    { value: 2, label: 'Small Team (2)', description: 'Co-founder or key partner' },
    { value: 3, label: 'Small Team (3)', description: 'Core founding team' },
    { value: 4, label: 'Growing Team (4)', description: 'Small but expanding' },
    { value: 5, label: 'Team (5)', description: 'Established small team' },
    { value: 6, label: 'Team (6)', description: 'Medium-sized team' },
    { value: 7, label: 'Team (7)', description: 'Growing organization' },
    { value: 8, label: 'Team (8)', description: 'Larger team structure' },
    { value: 9, label: 'Team (9)', description: 'Substantial team' },
    { value: 10, label: 'Large Team (10+)', description: 'Enterprise-level team' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center aurora-icon-glow" 
             style={{ background: 'linear-gradient(135deg, var(--aurora-glow-vibrant), var(--aurora-glow-accent-green))' }}>
          <Users className="w-6 h-6" style={{ color: 'var(--aurora-bg-dark)' }} />
        </div>
        <div>
          <h3 className="text-lg font-semibold aurora-text-primary">Team Size</h3>
          <p className="text-sm aurora-text-secondary">How many people are in your team?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {teamSizeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`p-4 rounded-lg text-left transition-all duration-300 ${
              currentSize === option.value
                ? 'aurora-button-primary'
                : 'aurora-nav-item'
            }`}
          >
            <div className="font-medium text-sm">{option.label}</div>
            <div className="text-xs aurora-text-secondary mt-1">{option.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeamSizeSelector;