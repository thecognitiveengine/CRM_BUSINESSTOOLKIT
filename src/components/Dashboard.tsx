import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  FolderOpen,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';

interface DashboardProps {
  onNavigate: (tool: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;
    
    try {
      const dashboardStats = await dataService.getDashboardStats(user.id);
      setStats(dashboardStats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-current border-t-transparent rounded-full mx-auto mb-4"
               style={{ borderColor: 'var(--aurora-glow-vibrant)' }}></div>
          <p className="aurora-text-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const quickStats = [
    { 
      label: 'Total Contacts', 
      value: stats?.contacts?.total || 0, 
      icon: Users, 
      color: 'var(--aurora-glow-vibrant)'
    },
    { 
      label: 'Active Projects', 
      value: stats?.projects?.active || 0, 
      icon: FolderOpen, 
      color: 'var(--aurora-glow-accent-green)'
    },
    { 
      label: 'Pending Tasks', 
      value: (stats?.tasks?.todo || 0) + (stats?.tasks?.inProgress || 0), 
      icon: CheckCircle, 
      color: 'var(--status-planning-color-aurora)'
    },
    { 
      label: 'Total Deal Value', 
      value: `$${(stats?.deals?.totalValue || 0).toLocaleString()}`, 
      icon: DollarSign, 
      color: 'var(--aurora-glow-accent-purple)'
    },
  ];

  const quickActions = [
    { 
      title: 'Add New Contact', 
      description: 'Create a new business contact',
      tool: 'contacts',
      icon: Users,
      color: 'var(--aurora-glow-vibrant)'
    },
    { 
      title: 'Schedule Meeting', 
      description: 'Add event to your calendar',
      tool: 'calendar',
      icon: Calendar,
      color: 'var(--aurora-glow-accent-green)'
    },
    { 
      title: 'Create Project', 
      description: 'Start a new project',
      tool: 'projects',
      icon: FolderOpen,
      color: 'var(--aurora-glow-accent-purple)'
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold aurora-text-primary mb-2">
          Welcome back!
        </h1>
        <p className="aurora-text-secondary">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Quick Stats */}
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
        {/* Quick Actions */}
        <div className="aurora-card rounded-lg p-6">
          <h2 className="text-xl font-semibold aurora-text-primary mb-4">Quick Actions</h2>
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
        </div>

        {/* Activity Summary */}
        <div className="aurora-card rounded-lg p-6">
          <h2 className="text-xl font-semibold aurora-text-primary mb-4">Activity Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 aurora-card rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: 'var(--aurora-glow-vibrant)20', border: '1px solid var(--aurora-glow-vibrant)40' }}>
                  <Users className="w-4 h-4" style={{ color: 'var(--aurora-glow-vibrant)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium aurora-text-primary">Contacts</p>
                  <p className="text-xs aurora-text-secondary">
                    {stats?.contacts?.leads || 0} leads, {stats?.contacts?.active || 0} active
                  </p>
                </div>
              </div>
              <span className="text-sm aurora-text-secondary">{stats?.contacts?.total || 0} total</span>
            </div>

            <div className="flex items-center justify-between p-3 aurora-card rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: 'var(--aurora-glow-accent-green)20', border: '1px solid var(--aurora-glow-accent-green)40' }}>
                  <CheckCircle className="w-4 h-4" style={{ color: 'var(--aurora-glow-accent-green)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium aurora-text-primary">Tasks</p>
                  <p className="text-xs aurora-text-secondary">
                    {stats?.tasks?.completed || 0} completed, {stats?.tasks?.inProgress || 0} in progress
                  </p>
                </div>
              </div>
              <span className="text-sm aurora-text-secondary">{stats?.tasks?.total || 0} total</span>
            </div>

            <div className="flex items-center justify-between p-3 aurora-card rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: 'var(--aurora-glow-accent-purple)20', border: '1px solid var(--aurora-glow-accent-purple)40' }}>
                  <FolderOpen className="w-4 h-4" style={{ color: 'var(--aurora-glow-accent-purple)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium aurora-text-primary">Projects</p>
                  <p className="text-xs aurora-text-secondary">
                    {stats?.projects?.active || 0} active, {stats?.projects?.completed || 0} completed
                  </p>
                </div>
              </div>
              <span className="text-sm aurora-text-secondary">{stats?.projects?.total || 0} total</span>
            </div>

            <div className="flex items-center justify-between p-3 aurora-card rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: 'var(--status-planning-color-aurora)20', border: '1px solid var(--status-planning-color-aurora)40' }}>
                  <DollarSign className="w-4 h-4" style={{ color: 'var(--status-planning-color-aurora)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium aurora-text-primary">Deals</p>
                  <p className="text-xs aurora-text-secondary">
                    {stats?.deals?.won || 0} won, {stats?.deals?.lost || 0} lost
                  </p>
                </div>
              </div>
              <span className="text-sm aurora-text-secondary">${(stats?.deals?.totalValue || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Insights */}
      <div className="mt-8 aurora-card rounded-lg p-6" 
           style={{ background: 'linear-gradient(135deg, var(--aurora-glow-vibrant)20, var(--aurora-glow-accent-purple)20)' }}>
        <h2 className="text-xl font-semibold mb-2 aurora-text-primary">Business Insights</h2>
        <p className="mb-4 aurora-text-secondary">
          Your business is performing well with {stats?.contacts?.total || 0} contacts and {stats?.projects?.active || 0} active projects.
        </p>
        <button 
          onClick={() => onNavigate('contacts')}
          className="aurora-button-primary px-4 py-2 rounded-lg font-medium transition-all duration-300"
        >
          View All Contacts
        </button>
      </div>
    </div>
  );
};

export default Dashboard;