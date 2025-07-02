import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  ArrowRight,
  BarChart3,
  FileText,
  CheckCircle,
  Clock,
  Settings
} from 'lucide-react';
// 🆕 NEW ENHANCEMENT: Profile integration
import { useUserProfile } from '../contexts/UserProfileContext';

interface DashboardProps {
  onNavigate: (tool: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  // 🆕 NEW ENHANCEMENT: Profile context integration
  const { teamSize, companyName, industry, selectedModules, resetProfile } = useUserProfile();

  const quickStats = [
    { label: 'Active Projects', value: '12', icon: Target, color: 'var(--aurora-glow-vibrant)' },
    { label: 'Revenue Target', value: '$250K', icon: DollarSign, color: 'var(--aurora-glow-accent-green)' },
    // 🆕 NEW ENHANCEMENT: Dynamic team size display
    { label: 'Team Members', value: teamSize.toString(), icon: Users, color: 'var(--aurora-glow-accent-purple)' },
    { label: 'Completion Rate', value: '87%', icon: TrendingUp, color: 'var(--status-planning-color-aurora)' },
  ];

  // 🆕 NEW ENHANCEMENT: Dynamic quick actions based on selected modules
  const allQuickActions = [
    { 
      title: 'Create Business Plan', 
      description: 'Generate a comprehensive business plan',
      tool: 'business-plan',
      icon: FileText,
      color: 'var(--aurora-glow-vibrant)'
    },
    { 
      title: 'Financial Analysis', 
      description: 'Calculate ROI, break-even, and projections',
      tool: 'financial',
      icon: BarChart3,
      color: 'var(--aurora-glow-accent-green)'
    },
    { 
      title: 'Generate Documents', 
      description: 'Create contracts, proposals, and invoices',
      tool: 'documents',
      icon: FileText,
      color: 'var(--aurora-glow-accent-purple)'
    },
    { 
      title: 'Manage Projects', 
      description: 'Track tasks and project progress',
      tool: 'projects',
      icon: CheckCircle,
      color: 'var(--status-planning-color-aurora)'
    },
  ];

  // 🆕 NEW ENHANCEMENT: Filter actions based on selected modules
  const quickActions = allQuickActions.filter(action => 
    selectedModules.includes(action.tool)
  );

  const recentActivity = [
    { action: 'Business plan updated', time: '2 hours ago', icon: FileText },
    { action: 'Financial projection completed', time: '1 day ago', icon: BarChart3 },
    { action: 'Contract template created', time: '2 days ago', icon: FileText },
    { action: 'Market research initiated', time: '3 days ago', icon: TrendingUp },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        {/* 🆕 NEW ENHANCEMENT: Personalized welcome message */}
        <h1 className="text-3xl font-bold aurora-text-primary mb-2">
          Welcome back{companyName ? `, ${companyName}` : ''}!
        </h1>
        <p className="aurora-text-secondary">
          Here's what's happening with your business.
          {/* 🆕 NEW ENHANCEMENT: Show industry if available */}
          {industry && ` Industry: ${industry}`}
        </p>
      </div>

      {/* 🆕 NEW ENHANCEMENT: Profile Summary Card */}
      <div className="mb-8 aurora-card rounded-lg p-6" 
           style={{ background: 'linear-gradient(135deg, var(--aurora-glow-vibrant)10, var(--aurora-glow-accent-purple)10)' }}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold aurora-text-primary mb-2">Your Setup</h2>
            <div className="flex items-center space-x-6 text-sm aurora-text-secondary">
              <span>Team Size: {teamSize} member{teamSize !== 1 ? 's' : ''}</span>
              <span>Active Modules: {selectedModules.length}</span>
              {industry && <span>Industry: {industry}</span>}
            </div>
          </div>
          <button
            onClick={resetProfile}
            className="flex items-center space-x-2 px-4 py-2 aurora-button-secondary rounded-lg text-sm"
          >
            <Settings className="w-4 h-4" />
            <span>Reconfigure</span>
          </button>
        </div>
      </div>

      {/* Quick Stats - EXISTING FUNCTIONALITY PRESERVED */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="aurora-card aurora-glow-hover rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium aurora-text-secondary mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold aurora-text-primary">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center aurora-icon-glow"
                     style={{ backgroundColor: `${stat.color}20`, border: `1px solid ${stat.color}40` }}>
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions - EXISTING FUNCTIONALITY PRESERVED WITH ENHANCEMENT */}
        <div className="aurora-card rounded-lg p-6">
          <h2 className="text-xl font-semibold aurora-text-primary mb-4">Quick Actions</h2>
          {/* 🆕 NEW ENHANCEMENT: Show message if no modules selected */}
          {quickActions.length === 0 ? (
            <div className="text-center py-8">
              <p className="aurora-text-secondary mb-4">No modules selected in your toolkit.</p>
              <button
                onClick={resetProfile}
                className="aurora-button-primary px-4 py-2 rounded-lg"
              >
                Configure Modules
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => onNavigate(action.tool)}
                    className="w-full flex items-center space-x-4 p-4 rounded-lg aurora-button-secondary transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center aurora-icon-glow"
                         style={{ backgroundColor: `${action.color}20`, border: `1px solid ${action.color}40` }}>
                      <Icon className="w-5 h-5" style={{ color: action.color }} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium aurora-text-primary">{action.title}</h3>
                      <p className="text-sm aurora-text-secondary">{action.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 aurora-text-secondary group-hover:aurora-text-primary transition-colors" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Activity - EXISTING FUNCTIONALITY PRESERVED */}
        <div className="aurora-card rounded-lg p-6">
          <h2 className="text-xl font-semibold aurora-text-primary mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: 'var(--aurora-section-bg)', border: '1px solid var(--aurora-border-light)' }}>
                    <Icon className="w-4 h-4 aurora-text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium aurora-text-primary">{activity.action}</p>
                    <p className="text-xs aurora-text-secondary">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Business Insights - EXISTING FUNCTIONALITY PRESERVED */}
      <div className="mt-8 aurora-card rounded-lg p-6" 
           style={{ background: 'linear-gradient(135deg, var(--aurora-glow-vibrant)20, var(--aurora-glow-accent-purple)20)' }}>
        <h2 className="text-xl font-semibold mb-2 aurora-text-primary">Business Insights</h2>
        <p className="mb-4 aurora-text-secondary">
          Your projects are 87% complete on average. Consider focusing on the remaining 13% to maximize ROI.
        </p>
        {/* 🆕 NEW ENHANCEMENT: Conditional button based on module availability */}
        {selectedModules.includes('research') ? (
          <button 
            onClick={() => onNavigate('research')}
            className="aurora-button-primary px-4 py-2 rounded-lg font-medium transition-all duration-300"
          >
            View Market Analysis
          </button>
        ) : (
          <button
            onClick={resetProfile}
            className="aurora-button-secondary px-4 py-2 rounded-lg font-medium transition-all duration-300"
          >
            Add Market Research Module
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;