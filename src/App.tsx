import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Calendar as CalendarIcon,
  FolderOpen,
  Settings, 
  Home,
  UserCheck,
  Briefcase,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import ContactManager from './components/CRM/ContactManager';
import Calendar from './components/Calendar/Calendar';
import ProjectManager from './components/Projects/ProjectManager';
import CalendarSidebar from './components/Sidebar/CalendarSidebar';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import { AuthProvider, useAuth } from './contexts/AuthContext';

type Tool = 'dashboard' | 'contacts' | 'calendar' | 'projects';

const navigation = [
  { id: 'dashboard' as Tool, name: 'Dashboard', icon: Home },
  { id: 'contacts' as Tool, name: 'Contacts', icon: Users },
  { id: 'calendar' as Tool, name: 'Calendar', icon: CalendarIcon },
  { id: 'projects' as Tool, name: 'Projects', icon: FolderOpen },
];

const AppContent: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>('dashboard');
  const [showCalendarSidebar, setShowCalendarSidebar] = useState(true);
  const { user, loading: authLoading, signOut } = useAuth();
  const [showAuth, setShowAuth] = useState<'login' | 'register'>('login');

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (showAuth === 'register') {
      return (
        <div className="bg-gray-900 min-h-screen">
          <Register />
          <div className="fixed bottom-4 left-4">
            <button
              onClick={() => setShowAuth('login')}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-600"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-gray-900 min-h-screen">
        <Login />
        <div className="fixed bottom-4 left-4">
          <button
            onClick={() => setShowAuth('register')}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-600"
          >
            Create Account →
          </button>
        </div>
      </div>
    );
  }

  const renderTool = () => {
    switch (activeTool) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTool} />;
      case 'contacts':
        return <ContactManager />;
      case 'calendar':
        return <Calendar />;
      case 'projects':
        return <ProjectManager />;
      default:
        return <Dashboard onNavigate={setActiveTool} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Main Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Business CRM</h1>
              <p className="text-sm text-gray-400">Management Platform</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTool(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeTool === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.email}
              </p>
              <p className="text-xs text-gray-400">Logged in</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-900">
          {renderTool()}
        </div>

        {/* Calendar Sidebar */}
        {showCalendarSidebar && (
          <CalendarSidebar 
            onEventClick={(event) => {
              console.log('Event clicked:', event);
              // Handle event click - could open modal or navigate
            }}
            onDateSelect={(date) => {
              console.log('Date selected:', date);
              // Handle date selection
            }}
          />
        )}

        {/* Calendar Sidebar Toggle */}
        <button
          onClick={() => setShowCalendarSidebar(!showCalendarSidebar)}
          className="fixed top-4 right-4 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-600 z-10"
        >
          {showCalendarSidebar ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}