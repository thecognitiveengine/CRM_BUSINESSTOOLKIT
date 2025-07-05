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
  BarChart3
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
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const quickStats = [
    { 
      label: 'Total Contacts', 
      value: stats?.contacts?.total || 0, 
      icon: Users, 
      color: 'text-blue-400',
      bgColor: 'bg-blue-600'
    },
    { 
      label: 'Active Projects', 
      value: stats?.projects?.active || 0, 
      icon: FolderOpen, 
      color: 'text-green-400',
      bgColor: 'bg-green-600'
    },
    { 
      label: 'Pending Tasks', 
      value: (stats?.tasks?.todo || 0) + (stats?.tasks?.inProgress || 0), 
      icon: CheckCircle, 
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-600'
    },
    { 
      label: 'Total Deal Value', 
      value: `$${(stats?.deals?.totalValue || 0).toLocaleString()}`, 
      icon: DollarSign, 
      color: 'text-purple-400',
      bgColor: 'bg-purple-600'
    },
  ];

  const quickActions = [
    { 
      title: 'Add New Contact', 
      description: 'Create a new business contact',
      tool: 'contacts',
      icon: Users,
      color: 'bg-blue-600'
    },
    { 
      title: 'Schedule Meeting', 
      description: 'Add event to your calendar',
      tool: 'calendar',
      icon: Calendar,
      color: 'bg-green-600'
    },
    { 
      title: 'Create Project', 
      description: 'Start a new project',
      tool: 'projects',
      icon: FolderOpen,
      color: 'bg-purple-600'
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back!
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => onNavigate(action.tool)}
                  className="w-full flex items-center space-x-4 p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-white">{action.title}</h3>
                    <p className="text-sm text-gray-400">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Activity Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Contacts</p>
                  <p className="text-xs text-gray-400">
                    {stats?.contacts?.leads || 0} leads, {stats?.contacts?.active || 0} active
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{stats?.contacts?.total || 0} total</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Tasks</p>
                  <p className="text-xs text-gray-400">
                    {stats?.tasks?.completed || 0} completed, {stats?.tasks?.inProgress || 0} in progress
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{stats?.tasks?.total || 0} total</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <FolderOpen className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Projects</p>
                  <p className="text-xs text-gray-400">
                    {stats?.projects?.active || 0} active, {stats?.projects?.completed || 0} completed
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{stats?.projects?.total || 0} total</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Deals</p>
                  <p className="text-xs text-gray-400">
                    {stats?.deals?.won || 0} won, {stats?.deals?.lost || 0} lost
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-400">${(stats?.deals?.totalValue || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;