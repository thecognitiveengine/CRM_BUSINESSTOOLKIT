import React, { useState } from 'react';
import { useUserProfile } from '../../contexts/UserProfileContext';
import TeamSizeSelector from './TeamSizeSelector';
import ModuleSelector from './ModuleSelector';
import { Briefcase, ArrowRight, ArrowLeft, Building, CheckCircle } from 'lucide-react';

const ProfileSelection: React.FC = () => {
  const { 
    teamSize, 
    selectedModules, 
    companyName,
    industry,
    updateTeamSize, 
    updateModules,
    updateCompanyInfo,
    completeProfileSetup 
  } = useUserProfile();

  const [currentStep, setCurrentStep] = useState(0);
  const [localCompanyName, setLocalCompanyName] = useState(companyName);
  const [localIndustry, setLocalIndustry] = useState(industry);

  const steps = [
    { title: 'Company Info', description: 'Tell us about your business' },
    { title: 'Team Size', description: 'How big is your team?' },
    { title: 'Choose Tools', description: 'Select your toolkit' },
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing',
    'Real Estate', 'Consulting', 'Marketing', 'Food & Beverage', 'Transportation',
    'Entertainment', 'Non-profit', 'Agriculture', 'Energy', 'Other'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    updateCompanyInfo(localCompanyName, localIndustry);
    completeProfileSetup();
  };

  // 🆕 FIXED: Enhanced validation logic
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return localCompanyName.trim().length > 0 && localIndustry.length > 0;
      case 1:
        return teamSize > 0;
      case 2:
        return selectedModules.length > 0;
      default:
        return false;
    }
  };

  // 🆕 FIXED: Skip to dashboard function for quick access
  const skipToMain = () => {
    // Set default values if not provided
    if (!localCompanyName.trim()) {
      setLocalCompanyName('My Business');
    }
    if (!localIndustry) {
      setLocalIndustry('Other');
    }
    updateCompanyInfo(localCompanyName || 'My Business', localIndustry || 'Other');
    
    // Ensure at least basic modules are selected
    if (selectedModules.length === 0) {
      updateModules(['business-plan', 'financial', 'documents', 'projects']);
    }
    
    completeProfileSetup();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center aurora-icon-glow" 
                   style={{ background: 'linear-gradient(135deg, var(--aurora-glow-vibrant), var(--aurora-glow-accent-green))' }}>
                <Building className="w-7 h-7" style={{ color: 'var(--aurora-bg-dark)' }} />
              </div>
              <div>
                <h3 className="text-xl font-semibold aurora-text-primary">Company Information</h3>
                <p className="text-sm aurora-text-secondary">Let's start with the basics</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium aurora-text-primary mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={localCompanyName}
                  onChange={(e) => setLocalCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                  className="w-full px-4 py-3 rounded-lg aurora-input"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium aurora-text-primary mb-2">
                  Industry *
                </label>
                <select
                  value={localIndustry}
                  onChange={(e) => setLocalIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg aurora-input"
                >
                  <option value="">Select your industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 1:
        return <TeamSizeSelector currentSize={teamSize} onChange={updateTeamSize} />;

      case 2:
        return <ModuleSelector selectedModules={selectedModules} onChange={updateModules} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ paddingBottom: '120px' }}>
      <div className="w-full max-w-4xl">
        <div className="aurora-card rounded-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center aurora-icon-glow" 
                   style={{ background: 'linear-gradient(135deg, var(--aurora-glow-vibrant), var(--aurora-glow-accent-green))' }}>
                <Briefcase className="w-7 h-7" style={{ color: 'var(--aurora-bg-dark)' }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold aurora-gradient-text">Welcome to EntrepreneKit</h1>
                <p className="aurora-text-secondary">Let's set up your business toolkit</p>
              </div>
            </div>
            
            {/* 🆕 FIXED: Quick skip option */}
            <div className="mt-4">
              <button
                onClick={skipToMain}
                className="text-sm aurora-text-secondary hover:aurora-text-primary transition-colors underline"
              >
                Skip setup and use defaults
              </button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 md:space-x-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    index === currentStep
                      ? 'aurora-button-primary'
                      : index < currentStep
                      ? 'aurora-button-secondary'
                      : 'aurora-nav-item'
                  }`}>
                    {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      index === currentStep ? 'aurora-text-primary' : 'aurora-text-secondary'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs aurora-text-secondary">{step.description}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-4 md:w-8 h-0.5 mx-2 md:mx-4 aurora-nav-item"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8 min-h-[400px]">
            {renderStep()}
          </div>

          {/* 🆕 FIXED: Enhanced Navigation with better spacing and accessibility */}
          <div className="border-t pt-6" style={{ borderColor: 'var(--aurora-border-light)' }}>
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 aurora-button-secondary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {/* Step indicator for mobile */}
              <div className="flex sm:hidden items-center space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? 'bg-current'
                        : index < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}
                    style={{ 
                      backgroundColor: index === currentStep 
                        ? 'var(--aurora-glow-vibrant)' 
                        : index < currentStep 
                        ? 'var(--aurora-glow-accent-green)'
                        : 'var(--aurora-border-light)'
                    }}
                  />
                ))}
              </div>

              {/* Next/Complete Button */}
              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleComplete}
                  disabled={!canProceed()}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    background: canProceed() 
                      ? 'linear-gradient(135deg, var(--aurora-glow-accent-green), var(--status-active-color-aurora))'
                      : 'var(--aurora-section-bg)',
                    color: canProceed() ? 'var(--aurora-bg-dark)' : 'var(--text-secondary)',
                    boxShadow: canProceed() ? '0 4px 15px rgba(0, 255, 204, 0.3)' : 'none'
                  }}
                >
                  <span>Complete Setup</span>
                  <Briefcase className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 aurora-button-primary rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 🆕 FIXED: Help text for current step */}
            <div className="mt-4 text-center">
              <p className="text-xs aurora-text-secondary">
                {currentStep === 0 && "Enter your company details to personalize your experience"}
                {currentStep === 1 && "Select your team size to get relevant recommendations"}
                {currentStep === 2 && "Choose the tools you need (you can change this later)"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;