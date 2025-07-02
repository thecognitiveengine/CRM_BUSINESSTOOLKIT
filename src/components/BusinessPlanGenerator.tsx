import React, { useState } from 'react';
import { FileText, Download, Save, Plus, ChevronRight } from 'lucide-react';

const BusinessPlanGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessPlan, setBusinessPlan] = useState({
    companyName: '',
    industry: '',
    mission: '',
    vision: '',
    executiveSummary: '',
    marketAnalysis: '',
    targetMarket: '',
    competitiveAnalysis: '',
    productService: '',
    marketingStrategy: '',
    operationsPlan: '',
    managementTeam: '',
    financialProjections: '',
    fundingRequest: '',
  });

  const steps = [
    { title: 'Company Overview', fields: ['companyName', 'industry', 'mission', 'vision'] },
    { title: 'Executive Summary', fields: ['executiveSummary'] },
    { title: 'Market Analysis', fields: ['marketAnalysis', 'targetMarket', 'competitiveAnalysis'] },
    { title: 'Products & Services', fields: ['productService'] },
    { title: 'Marketing & Sales', fields: ['marketingStrategy'] },
    { title: 'Operations', fields: ['operationsPlan'] },
    { title: 'Management Team', fields: ['managementTeam'] },
    { title: 'Financial Projections', fields: ['financialProjections', 'fundingRequest'] },
  ];

  const fieldLabels: Record<string, string> = {
    companyName: 'Company Name',
    industry: 'Industry',
    mission: 'Mission Statement',
    vision: 'Vision Statement',
    executiveSummary: 'Executive Summary',
    marketAnalysis: 'Market Analysis',
    targetMarket: 'Target Market',
    competitiveAnalysis: 'Competitive Analysis',
    productService: 'Products & Services Description',
    marketingStrategy: 'Marketing & Sales Strategy',
    operationsPlan: 'Operations Plan',
    managementTeam: 'Management Team',
    financialProjections: 'Financial Projections',
    fundingRequest: 'Funding Request',
  };

  const updateField = (field: string, value: string) => {
    setBusinessPlan(prev => ({ ...prev, [field]: value }));
  };

  const generateSampleContent = (field: string) => {
    const samples: Record<string, string> = {
      mission: 'To provide innovative solutions that transform how businesses operate and deliver exceptional value to our customers.',
      vision: 'To become the leading provider of cutting-edge technology solutions in our industry.',
      executiveSummary: 'Our company addresses a critical market need by offering innovative products that solve key customer pain points. With a strong management team and clear go-to-market strategy, we are positioned for significant growth.',
      marketAnalysis: 'The market size is estimated at $10B globally, with a projected CAGR of 15% over the next 5 years. Key trends include digital transformation and increasing demand for automation.',
      targetMarket: 'Our primary target market consists of mid-sized businesses (100-500 employees) in the technology and professional services sectors.',
      competitiveAnalysis: 'We compete with established players but differentiate through superior customer service, innovative features, and competitive pricing.',
    };
    return samples[field] || 'Enter your content here...';
  };

  const exportBusinessPlan = () => {
    const content = `
# ${businessPlan.companyName} Business Plan

## Executive Summary
${businessPlan.executiveSummary}

## Company Overview
**Industry:** ${businessPlan.industry}
**Mission:** ${businessPlan.mission}
**Vision:** ${businessPlan.vision}

## Market Analysis
${businessPlan.marketAnalysis}

### Target Market
${businessPlan.targetMarket}

### Competitive Analysis
${businessPlan.competitiveAnalysis}

## Products & Services
${businessPlan.productService}

## Marketing & Sales Strategy
${businessPlan.marketingStrategy}

## Operations Plan
${businessPlan.operationsPlan}

## Management Team
${businessPlan.managementTeam}

## Financial Projections
${businessPlan.financialProjections}

## Funding Request
${businessPlan.fundingRequest}
    `;

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${businessPlan.companyName || 'business'}-plan.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold aurora-text-primary mb-2">Business Plan Generator</h1>
        <p className="aurora-text-secondary">Create a comprehensive business plan step by step.</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="aurora-card rounded-lg p-6">
              <h2 className="text-lg font-semibold aurora-text-primary mb-4">Progress</h2>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                      index === currentStep
                        ? 'aurora-button-primary'
                        : index < currentStep
                        ? 'aurora-button-secondary'
                        : 'aurora-nav-item'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{step.title}</span>
                      {index < currentStep && <ChevronRight className="w-4 h-4" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="aurora-card rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold aurora-text-primary mb-2">
                  {currentStepData.title}
                </h2>
                <p className="aurora-text-secondary">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>

              <div className="space-y-6">
                {currentStepData.fields.map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium aurora-text-primary mb-2">
                      {fieldLabels[field]}
                    </label>
                    {['mission', 'vision', 'executiveSummary', 'marketAnalysis', 'targetMarket', 'competitiveAnalysis', 'productService', 'marketingStrategy', 'operationsPlan', 'managementTeam', 'financialProjections', 'fundingRequest'].includes(field) ? (
                      <div className="relative">
                        <textarea
                          value={businessPlan[field as keyof typeof businessPlan]}
                          onChange={(e) => updateField(field, e.target.value)}
                          placeholder={generateSampleContent(field)}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg aurora-input resize-vertical"
                        />
                        <button
                          onClick={() => updateField(field, generateSampleContent(field))}
                          className="absolute top-2 right-2 text-xs aurora-button-secondary px-2 py-1 rounded"
                        >
                          Use Sample
                        </button>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={businessPlan[field as keyof typeof businessPlan]}
                        onChange={(e) => updateField(field, e.target.value)}
                        placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
                        className="w-full px-4 py-3 rounded-lg aurora-input"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-6 py-2 aurora-button-secondary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex space-x-4">
                  <button
                    onClick={exportBusinessPlan}
                    className="flex items-center space-x-2 px-6 py-2 rounded-lg transition-all duration-300"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--aurora-glow-accent-green), var(--status-active-color-aurora))',
                      color: 'var(--aurora-bg-dark)'
                    }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Plan</span>
                  </button>
                  
                  {currentStep < steps.length - 1 ? (
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="px-6 py-2 aurora-button-primary rounded-lg"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={exportBusinessPlan}
                      className="flex items-center space-x-2 px-6 py-2 rounded-lg"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--aurora-glow-accent-purple), var(--aurora-glow-vibrant))',
                        color: 'var(--aurora-bg-dark)'
                      }}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Complete Plan</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanGenerator;