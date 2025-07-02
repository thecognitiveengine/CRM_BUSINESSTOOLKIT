import React, { useState } from 'react';
import { Search, TrendingUp, Users, Target, BarChart3, Globe } from 'lucide-react';

const MarketResearch: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState('competitor');
  const [researchData, setResearchData] = useState({
    industry: '',
    targetMarket: '',
    competitor: '',
    location: '',
    keywords: '',
  });

  const tools = [
    { id: 'competitor', name: 'Competitor Analysis', icon: Target },
    { id: 'market', name: 'Market Sizing', icon: BarChart3 },
    { id: 'customer', name: 'Customer Personas', icon: Users },
    { id: 'trends', name: 'Industry Trends', icon: TrendingUp },
    { id: 'swot', name: 'SWOT Analysis', icon: Search },
  ];

  const competitorFramework = {
    directCompetitors: [
      'Identify companies offering identical products/services',
      'Analyze their pricing strategies',
      'Evaluate their market positioning',
      'Review their customer reviews and feedback',
    ],
    indirectCompetitors: [
      'Identify alternative solutions to your problem',
      'Analyze substitute products or services',
      'Evaluate market share and growth trends',
      'Assess threat level and differentiation opportunities',
    ],
    analysisPoints: [
      'Product/Service Features',
      'Pricing Strategy',
      'Marketing Channels',
      'Customer Base',
      'Strengths & Weaknesses',
      'Market Share',
      'Revenue Model',
      'Technology Stack',
    ],
  };

  const marketSizingFramework = {
    tamSamSom: [
      'TAM (Total Addressable Market): All potential customers',
      'SAM (Serviceable Addressable Market): Customers you can reach',
      'SOM (Serviceable Obtainable Market): Realistic market share',
    ],
    calculationMethods: [
      'Top-down: Start with industry reports and narrow down',
      'Bottom-up: Build from individual customer segments',
      'Value theory: Estimate based on value delivered',
    ],
    dataSource: [
      'Industry reports (IBISWorld, Statista)',
      'Government databases',
      'Trade associations',
      'Competitor financial reports',
      'Customer surveys',
    ],
  };

  const customerPersonas = {
    demographics: [
      'Age, Gender, Income',
      'Education, Location',
      'Job Title, Industry',
      'Family Status',
    ],
    psychographics: [
      'Values and Beliefs',
      'Lifestyle and Interests',
      'Personality Traits',
      'Attitudes and Opinions',
    ],
    behaviorPatterns: [
      'Purchase Decision Process',
      'Brand Loyalty',
      'Technology Adoption',
      'Communication Preferences',
    ],
    painPoints: [
      'Current Problems',
      'Unmet Needs',
      'Frustrations',
      'Desired Outcomes',
    ],
  };

  const swotTemplate = {
    strengths: [
      'Unique value proposition',
      'Strong team expertise',
      'Proprietary technology',
      'Strategic partnerships',
      'Cost advantages',
    ],
    weaknesses: [
      'Limited resources',
      'Lack of brand recognition',
      'Skills gaps',
      'Operational constraints',
      'Limited market presence',
    ],
    opportunities: [
      'Market growth trends',
      'Emerging technologies',
      'Regulatory changes',
      'Competitor weaknesses',
      'Customer needs evolution',
    ],
    threats: [
      'New competitors',
      'Economic downturns',
      'Regulatory challenges',
      'Technology disruption',
      'Changing customer preferences',
    ],
  };

  const renderCompetitorAnalysis = () => (
    <div className="space-y-6">
      <div className="aurora-card p-6 rounded-lg" 
           style={{ background: 'linear-gradient(135deg, var(--aurora-glow-vibrant)20, var(--aurora-glow-accent-purple)20)' }}>
        <h3 className="text-lg font-semibold aurora-text-primary mb-4">Competitor Analysis Framework</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium aurora-text-primary mb-3">Direct Competitors</h4>
            <ul className="space-y-2">
              {competitorFramework.directCompetitors.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" 
                       style={{ backgroundColor: 'var(--aurora-glow-vibrant)' }}></div>
                  <span className="text-sm aurora-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium aurora-text-primary mb-3">Indirect Competitors</h4>
            <ul className="space-y-2">
              {competitorFramework.indirectCompetitors.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" 
                       style={{ backgroundColor: 'var(--aurora-glow-accent-purple)' }}></div>
                  <span className="text-sm aurora-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="aurora-card rounded-lg p-6">
        <h4 className="font-medium aurora-text-primary mb-4">Analysis Checklist</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {competitorFramework.analysisPoints.map((point, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded aurora-input" />
              <label className="text-sm aurora-text-secondary">{point}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMarketSizing = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="aurora-card p-6 rounded-lg" 
             style={{ background: 'linear-gradient(135deg, var(--aurora-glow-accent-green)20, var(--aurora-glow-vibrant)20)' }}>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
               style={{ backgroundColor: 'var(--aurora-glow-accent-green)20', border: '1px solid var(--aurora-glow-accent-green)40' }}>
            <Globe className="w-6 h-6" style={{ color: 'var(--aurora-glow-accent-green)' }} />
          </div>
          <h3 className="text-lg font-semibold aurora-text-primary mb-2">TAM</h3>
          <p className="text-sm aurora-text-secondary">Total Addressable Market - The entire market demand</p>
        </div>
        
        <div className="aurora-card p-6 rounded-lg" 
             style={{ background: 'linear-gradient(135deg, var(--aurora-glow-vibrant)20, var(--aurora-glow-accent-purple)20)' }}>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
               style={{ backgroundColor: 'var(--aurora-glow-vibrant)20', border: '1px solid var(--aurora-glow-vibrant)40' }}>
            <Target className="w-6 h-6" style={{ color: 'var(--aurora-glow-vibrant)' }} />
          </div>
          <h3 className="text-lg font-semibold aurora-text-primary mb-2">SAM</h3>
          <p className="text-sm aurora-text-secondary">Serviceable Addressable Market - Your reachable market</p>
        </div>
        
        <div className="aurora-card p-6 rounded-lg" 
             style={{ background: 'linear-gradient(135deg, var(--aurora-glow-accent-purple)20, var(--status-planning-color-aurora)20)' }}>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
               style={{ backgroundColor: 'var(--aurora-glow-accent-purple)20', border: '1px solid var(--aurora-glow-accent-purple)40' }}>
            <BarChart3 className="w-6 h-6" style={{ color: 'var(--aurora-glow-accent-purple)' }} />
          </div>
          <h3 className="text-lg font-semibold aurora-text-primary mb-2">SOM</h3>
          <p className="text-sm aurora-text-secondary">Serviceable Obtainable Market - Realistic capture</p>
        </div>
      </div>

      <div className="aurora-card rounded-lg p-6">
        <h4 className="font-medium aurora-text-primary mb-4">Calculation Methods</h4>
        <div className="space-y-4">
          {marketSizingFramework.calculationMethods.map((method, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                   style={{ backgroundColor: 'var(--aurora-glow-vibrant)20', border: '1px solid var(--aurora-glow-vibrant)40' }}>
                <span className="text-xs font-medium" style={{ color: 'var(--aurora-glow-vibrant)' }}>{index + 1}</span>
              </div>
              <p className="text-sm aurora-text-secondary">{method}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="aurora-card rounded-lg p-6">
        <h4 className="font-medium aurora-text-primary mb-4">Data Sources</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketSizingFramework.dataSource.map((source, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Search className="w-4 h-4 aurora-text-secondary" />
              <span className="text-sm aurora-text-secondary">{source}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCustomerPersonas = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aurora-card rounded-lg p-6">
          <h4 className="font-medium aurora-text-primary mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" style={{ color: 'var(--aurora-glow-vibrant)' }} />
            Demographics
          </h4>
          <ul className="space-y-2">
            {customerPersonas.demographics.map((item, index) => (
              <li key={index} className="text-sm aurora-text-secondary flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--aurora-glow-vibrant)' }}></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="aurora-card rounded-lg p-6">
          <h4 className="font-medium aurora-text-primary mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" style={{ color: 'var(--aurora-glow-accent-purple)' }} />
            Psychographics
          </h4>
          <ul className="space-y-2">
            {customerPersonas.psychographics.map((item, index) => (
              <li key={index} className="text-sm aurora-text-secondary flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--aurora-glow-accent-purple)' }}></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="aurora-card rounded-lg p-6">
          <h4 className="font-medium aurora-text-primary mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" style={{ color: 'var(--aurora-glow-accent-green)' }} />
            Behavior Patterns
          </h4>
          <ul className="space-y-2">
            {customerPersonas.behaviorPatterns.map((item, index) => (
              <li key={index} className="text-sm aurora-text-secondary flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--aurora-glow-accent-green)' }}></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="aurora-card rounded-lg p-6">
          <h4 className="font-medium aurora-text-primary mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2" style={{ color: 'var(--status-high-color-aurora)' }} />
            Pain Points
          </h4>
          <ul className="space-y-2">
            {customerPersonas.painPoints.map((item, index) => (
              <li key={index} className="text-sm aurora-text-secondary flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--status-high-color-aurora)' }}></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderSWOTAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aurora-card rounded-lg p-6" 
             style={{ background: 'linear-gradient(135deg, rgba(0, 255, 204, 0.1), rgba(0, 255, 204, 0.05))' }}>
          <h4 className="font-semibold mb-4" style={{ color: 'var(--aurora-glow-accent-green)' }}>Strengths</h4>
          <ul className="space-y-2">
            {swotTemplate.strengths.map((item, index) => (
              <li key={index} className="text-sm aurora-text-secondary flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--aurora-glow-accent-green)' }}></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="aurora-card rounded-lg p-6" 
             style={{ background: 'linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(220, 20, 60, 0.05))' }}>
          <h4 className="font-semibold mb-4" style={{ color: 'var(--status-high-color-aurora)' }}>Weaknesses</h4>
          <ul className="space-y-2">
            {swotTemplate.weaknesses.map((item, index) => (
              <li key={index} className="text-sm aurora-text-secondary flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--status-high-color-aurora)' }}></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="aurora-card rounded-lg p-6" 
             style={{ background: 'linear-gradient(135deg, rgba(102, 204, 238, 0.1), rgba(102, 204, 238, 0.05))' }}>
          <h4 className="font-semibold mb-4" style={{ color: 'var(--aurora-glow-vibrant)' }}>Opportunities</h4>
          <ul className="space-y-2">
            {swotTemplate.opportunities.map((item, index) => (
              <li key={index} className="text-sm aurora-text-secondary flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--aurora-glow-vibrant)' }}></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="aurora-card rounded-lg p-6" 
             style={{ background: 'linear-gradient(135deg, rgba(187, 102, 255, 0.1), rgba(187, 102, 255, 0.05))' }}>
          <h4 className="font-semibold mb-4" style={{ color: 'var(--aurora-glow-accent-purple)' }}>Threats</h4>
          <ul className="space-y-2">
            {swotTemplate.threats.map((item, index) => (
              <li key={index} className="text-sm aurora-text-secondary flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--aurora-glow-accent-purple)' }}></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderIndustryTrends = () => (
    <div className="space-y-6">
      <div className="aurora-card p-6 rounded-lg" 
           style={{ background: 'linear-gradient(135deg, var(--aurora-glow-vibrant)20, var(--aurora-glow-accent-purple)20)' }}>
        <h3 className="text-lg font-semibold aurora-text-primary mb-4">Industry Trend Analysis</h3>
        <p className="aurora-text-secondary mb-4">
          Track and analyze key trends affecting your industry to stay ahead of the competition.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="aurora-card p-4 rounded-lg">
            <h4 className="font-medium aurora-text-primary mb-2">Technology Trends</h4>
            <p className="text-sm aurora-text-secondary">AI/ML adoption, automation, digital transformation</p>
          </div>
          <div className="aurora-card p-4 rounded-lg">
            <h4 className="font-medium aurora-text-primary mb-2">Consumer Behavior</h4>
            <p className="text-sm aurora-text-secondary">Changing preferences, sustainability focus</p>
          </div>
          <div className="aurora-card p-4 rounded-lg">
            <h4 className="font-medium aurora-text-primary mb-2">Market Dynamics</h4>
            <p className="text-sm aurora-text-secondary">Regulatory changes, economic factors</p>
          </div>
        </div>
      </div>
      
      <div className="aurora-card rounded-lg p-6">
        <h4 className="font-medium aurora-text-primary mb-4">Research Sources</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium aurora-text-primary mb-2">Industry Reports</h5>
            <ul className="text-sm aurora-text-secondary space-y-1">
              <li>• McKinsey Global Institute</li>
              <li>• Deloitte Insights</li>
              <li>• PwC Industry Reports</li>
              <li>• Gartner Research</li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium aurora-text-primary mb-2">Data Sources</h5>
            <ul className="text-sm aurora-text-secondary space-y-1">
              <li>• Google Trends</li>
              <li>• Industry associations</li>
              <li>• Government statistics</li>
              <li>• Academic research</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTool = () => {
    switch (selectedTool) {
      case 'competitor':
        return renderCompetitorAnalysis();
      case 'market':
        return renderMarketSizing();
      case 'customer':
        return renderCustomerPersonas();
      case 'swot':
        return renderSWOTAnalysis();
      case 'trends':
        return renderIndustryTrends();
      default:
        return renderCompetitorAnalysis();
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold aurora-text-primary mb-2">Market Research</h1>
        <p className="aurora-text-secondary">Comprehensive tools and frameworks for market analysis and research.</p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedTool === tool.id
                    ? 'aurora-button-primary'
                    : 'aurora-button-secondary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tool.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="aurora-card rounded-lg p-8">
        {renderActiveTool()}
      </div>
    </div>
  );
};

export default MarketResearch;