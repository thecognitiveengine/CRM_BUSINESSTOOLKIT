import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface UserProfile {
  teamSize: number;
  selectedModules: string[];
  isProfileSetup: boolean;
  companyName: string;
  industry: string;
  updateTeamSize: (size: number) => void;
  updateModules: (modules: string[]) => void;
  updateCompanyInfo: (name: string, industry: string) => void;
  completeProfileSetup: () => void;
  resetProfile: () => void;
}

const UserProfileContext = createContext<UserProfile | undefined>(undefined);

interface UserProfileProviderProps {
  children: ReactNode;
}

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({ children }) => {
  const [teamSize, setTeamSize] = useState<number>(1);
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'business-plan',
    'financial',
    'documents',
    'projects',
    'research',
    'pitch',
    'legal'
  ]);
  const [isProfileSetup, setIsProfileSetup] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');

  // 🆕 FIXED: Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setTeamSize(profile.teamSize || 1);
        setSelectedModules(profile.selectedModules || []);
        setIsProfileSetup(profile.isProfileSetup || false);
        setCompanyName(profile.companyName || '');
        setIndustry(profile.industry || '');
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    }
  }, []);

  // 🆕 FIXED: Save profile to localStorage whenever state changes
  useEffect(() => {
    const profile = {
      teamSize,
      selectedModules,
      isProfileSetup,
      companyName,
      industry
    };
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [teamSize, selectedModules, isProfileSetup, companyName, industry]);

  const updateTeamSize = (size: number) => setTeamSize(size);
  
  const updateModules = (modules: string[]) => setSelectedModules(modules);
  
  const updateCompanyInfo = (name: string, industryType: string) => {
    setCompanyName(name);
    setIndustry(industryType);
  };
  
  const completeProfileSetup = () => setIsProfileSetup(true);
  
  const resetProfile = () => {
    setTeamSize(1);
    setSelectedModules([]);
    setIsProfileSetup(false);
    setCompanyName('');
    setIndustry('');
    localStorage.removeItem('userProfile');
  };

  return (
    <UserProfileContext.Provider value={{ 
      teamSize, 
      selectedModules, 
      isProfileSetup,
      companyName,
      industry,
      updateTeamSize, 
      updateModules,
      updateCompanyInfo,
      completeProfileSetup,
      resetProfile
    }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within UserProfileProvider");
  }
  return context;
};