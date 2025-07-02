import React, { useState } from 'react';
import { 
  BarChart3, FileText, Calculator, Users, Target, Briefcase,
  PlusCircle, Settings, Home, TrendingUp, CheckSquare,
  FileBarChart, Lightbulb, Scale, Calendar as CalendarIcon
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import BusinessPlanGenerator from './components/BusinessPlanGenerator';
import FinancialCalculators from './components/FinancialCalculators';
import DocumentTemplates from './components/DocumentTemplates';
import ProjectManager from './components/ProjectManager';
import MarketResearch from './components/MarketResearch';
import PitchDeckBuilder from './components/PitchDeckBuilder';
import LegalDocuments from './components/LegalDocuments';
// ------- FIX: Comment/Remove CalendarView, file missing --------
// import CalendarView from './components/Calendar/CalendarView';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProfileSelection from './components/ProfileSelection/ProfileSelection';

import { UserProfileProvider, useUserProfile } from './contexts/UserProfileContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

type Tool =
  | 'dashboard'
  | 'business-plan'
  | 'financial'
  | 'documents'
  | 'projects'
  | 'research'
  | 'pitch'
  | 'legal'
  | 'calendar';

const navigation = [
  { id: 'dashboard' as Tool, name: 'Dashboard', icon: Home },
  { id: 'business-plan' as Tool, name: 'Business Plan', icon: FileBarChart },
  { id: 'financial' as Tool, name: 'Financial Tools', icon: Calculator },
  { id: 'documents' as Tool, name: 'Documents', icon: FileText },
  { id: 'projects' as Tool, name: 'Project Manager', icon: CheckSquare },
  { id: 'research' as Tool, name: 'Market Research', icon: TrendingUp },
  { id: 'pitch' as Tool, name: 'Pitch Deck', icon: Lightbulb },
  { id: 'legal' as Tool, name: 'Legal Docs', icon: Scale },
  { id: 'calendar' as Tool, name: 'Calendar', icon: CalendarIcon },
];

const AppContent: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>('dashboard');
  const { user, loading: authLoading, signOut } = useAuth();
  const { isProfileSetup, selectedModules, companyName } = useUserProfile();

  const [showAuth, setShowAuth] = useState<'login' | 'register'>('login');

  // 1️⃣ Loading spinner
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

  // 2️⃣ Authentication flow
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

  // 3️⃣ Profile setup
  if (!isProfileSetup) {
    return <ProfileSelection />;
  }

  // 4️⃣ Filter navigation by enabled modules
  const filteredNavigation = navigation.filter(
    (item) => item.id === 'dashboard' || selectedModules.includes(item.id)
  );

  // 5️⃣ Render the selected tool
  const renderTool = () => {
    switch (activeTool) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTool} />;
      case 'business-plan':
        return <BusinessPlanGenerator />;
      case 'financial':
        return <FinancialCalculators />;
      case 'documents':
        return <DocumentTemplates />;
      case 'projects':
        return <ProjectManager />;
      case 'research':
        return <MarketResearch />;
      case 'pitch':
        return <PitchDeckBuilder />;
      case 'legal':
        return <LegalDocuments />;
      // ---------- FIX: CalendarView removed because file is missing ----------
      // case 'calendar':
      //   return <CalendarView />;
      default:
        return <Dashboard onNavigate={setActiveTool} />;
    }
  };

  return (
    <div className="app-container flex">
      {/* Sidebar */}
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
                EntrepreneKit
              </h1>
              <p className="text-sm aurora-text-secondary">
                {companyName || 'Business Toolkit'}
              </p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {filteredNavigation.map((item) => {
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

        {/* User menu */}
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

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{renderTool()}</div>
    </div>
  );
};

// OEM FIX : UserProfileProvider englobe AuthProvider pour permettre l’utilisation du contexte partout
export default function App() {
  return (
    <UserProfileProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </UserProfileProvider>
  );
}
