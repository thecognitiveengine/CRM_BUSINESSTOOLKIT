// OEM: App.tsx - Enhanced with CRM Integration (Aurora Theme Preserved)
// Version multi-langue, annotation complète, structure OEM respectée

import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { 
  BarChart3, FileText, Calculator, Users, Target, Briefcase,
  PlusCircle, Settings, Home, TrendingUp, CheckSquare,
  FileBarChart, Lightbulb, Scale, Calendar as CalendarIcon,
  UserCheck, // 🆕 NEW: CRM icon
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

// 🆕 FIXED: Simplified branding without French
const APP_NAME = 'Cognitive Nexus';

// Types
// ----------------------------------------------------------------------
type Tool = 'dashboard' | 'contacts' | 'calendar' | 'projects';

const navigation = [
  { id: 'dashboard' as Tool, name: 'Dashboard', icon: Home },
  { id: 'contacts' as Tool, name: 'Contacts', icon: Users },
  { id: 'calendar' as Tool, name: 'Calendar', icon: CalendarIcon },
  { id: 'projects' as Tool, name: 'Projects', icon: CheckSquare },
];

// Main Content Component
const AppContent: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>('dashboard');
  const [showCalendarSidebar, setShowCalendarSidebar] = useState(true);
  const { user, loading: authLoading, signOut } = useAuth();
  const [showAuth, setShowAuth] = useState<'login' | 'register'>('login');

  // 1. Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="aurora-card rounded-lg p-8 text-center">
          <div
            className="animate-spin w-8 h-8 border-2 border-current border-t-transparent rounded-full mx-auto mb-4"
            style={{ borderColor: 'var(--aurora-glow-vibrant)' }}
          />
          <p className="aurora-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // 2. Auth flow
  if (!user) {
    if (showAuth === 'register') {
      return (
        <div>
          <Register />
          <div className="fixed bottom-4 left-4">
            <button
              onClick={() => setShowAuth('login')}
              className="aurora-button-secondary px-4 py-2 rounded-lg"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Login />
        <div className="fixed bottom-4 left-4">
          <button
            onClick={() => setShowAuth('register')}
            className="aurora-button-secondary px-4 py-2 rounded-lg"
          >
            Create Account →
          </button>
        </div>
      </div>
    );
  }

  // 5. Renders the current tool
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

  // ----------------------------------------------------------------------
  // OEM: Sidebar, branding, user menu and layout (AURORA THEME PRESERVED)
  // ----------------------------------------------------------------------

  return (
    <div className="app-container flex">
      {/* 🆕 PRESERVED: Aurora Sidebar */}
      <div className="w-64 aurora-sidebar relative">
        <div
          className="p-6 border-b"
          style={{ borderColor: 'var(--aurora-border-light)' }}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center aurora-icon-glow"
              style={{
                background:
                  'linear-gradient(135deg, var(--aurora-glow-vibrant), var(--aurora-glow-accent-green))',
              }}
            >
              <Briefcase
                className="w-6 h-6"
                style={{ color: 'var(--aurora-bg-dark)' }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold aurora-gradient-text">
                {APP_NAME}
              </h1>
              <p className="text-sm aurora-text-secondary">
                Business Intelligence Platform
              </p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTool(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 aurora-nav-item ${
                  activeTool === item.id ? 'active' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* 🆕 PRESERVED: Aurora User menu */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 border-t"
          style={{ borderColor: 'var(--aurora-border-light)' }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'var(--aurora-glow-vibrant)' }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--aurora-bg-dark)' }}
              >
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium aurora-text-primary truncate">
                {user.email}
              </p>
              <p className="text-xs aurora-text-secondary">Logged in</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full aurora-button-secondary px-3 py-2 rounded-lg text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Content */}
        <div className="flex-1 overflow-auto">
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
          className="fixed top-4 right-4 p-2 aurora-button-secondary rounded-lg z-10"
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

// ----------------------------------------------------------------------
// OEM - Wrapping the app in all providers and router
// ----------------------------------------------------------------------
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}