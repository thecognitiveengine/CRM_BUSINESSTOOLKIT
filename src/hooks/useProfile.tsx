import { useUserProfile } from '../contexts/UserProfileContext';

// 🆕 NEW ENHANCEMENT: Custom hook for profile management
// This hook provides a simplified interface for profile operations
export const useProfile = () => {
  const profile = useUserProfile();

  // 🆕 NEW: Helper functions for common profile operations
  const isModuleEnabled = (moduleId: string) => {
    return profile.selectedModules.includes(moduleId);
  };

  const getTeamSizeCategory = () => {
    if (profile.teamSize === 1) return 'Solo';
    if (profile.teamSize <= 3) return 'Small Team';
    if (profile.teamSize <= 6) return 'Medium Team';
    return 'Large Team';
  };

  const getRecommendedModules = () => {
    const baseModules = ['business-plan', 'financial', 'documents', 'projects'];
    
    // 🆕 NEW: Team size-based recommendations
    if (profile.teamSize > 5) {
      return [...baseModules, 'research', 'legal'];
    }
    
    return baseModules;
  };

  return {
    ...profile,
    isModuleEnabled,
    getTeamSizeCategory,
    getRecommendedModules,
  };
};

export default useProfile;