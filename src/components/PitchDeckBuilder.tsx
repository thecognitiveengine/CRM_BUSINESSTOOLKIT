import React, { useState } from 'react';
import { Presentation, Download, Eye, Plus, ArrowLeft, ArrowRight } from 'lucide-react';

const PitchDeckBuilder: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [deckData, setDeckData] = useState({
    companyName: '',
    tagline: '',
    problem: '',
    solution: '',
    market: '',
    businessModel: '',
    traction: '',
    competition: '',
    team: '',
    financials: '',
    funding: '',
    useOfFunds: '',
  });

  const slideTemplates = [
    {
      id: 'title',
      title: 'Title Slide',
      description: 'Company name and tagline',
      fields: ['companyName', 'tagline'],
    },
    {
      id: 'problem',
      title: 'Problem',
      description: 'What problem are you solving?',
      fields: ['problem'],
    },
    {
      id: 'solution',
      title: 'Solution',
      description: 'How do you solve this problem?',
      fields: ['solution'],
    },
    {
      id: 'market',
      title: 'Market Opportunity',
      description: 'Size and scope of your market',
      fields: ['market'],
    },
    {
      id: 'business-model',
      title: 'Business Model',
      description: 'How do you make money?',
      fields: ['businessModel'],
    },
    {
      id: 'traction',
      title: 'Traction',
      description: 'Proof of concept and growth',
      fields: ['traction'],
    },
    {
      id: 'competition',
      title: 'Competition',
      description: 'Competitive landscape',
      fields: ['competition'],
    },
    {
      id: 'team',
      title: 'Team',
      description: 'Key team members',
      fields: ['team'],
    },
    {
      id: 'financials',
      title: 'Financial Projections',
      description: 'Revenue and growth projections',
      fields: ['financials'],
    },
    {
      id: 'funding',
      title: 'Funding Ask',
      description: 'How much and what for',
      fields: ['funding', 'useOfFunds'],
    },
  ];

  const fieldLabels: Record<string, string> = {
    companyName: 'Company Name',
    tagline: 'Company Tagline',
    problem: 'Problem Statement',
    solution: 'Solution Description',
    market: 'Market Opportunity',
    businessModel: 'Business Model',
    traction: 'Traction & Metrics',
    competition: 'Competitive Analysis',
    team: 'Team Information',
    financials: 'Financial Projections',
    funding: 'Funding Request',
    useOfFunds: 'Use of Funds',
  };

  const slideExamples: Record<string, string> = {
    problem: 'Small businesses spend 40+ hours per month on manual bookkeeping, leading to errors, compliance issues, and taking time away from growing their business.',
    solution: 'Our AI-powered bookkeeping platform automates 90% of financial tasks, reduces errors by 95%, and provides real-time insights to help businesses make better decisions.',
    market: 'The global small business accounting software market is $4.6B and growing at 8.5% annually. Our target market of 30M small businesses represents a $2B opportunity.',
    businessModel: 'SaaS subscription model: $29/month Basic, $79/month Pro, $149/month Enterprise. Additional revenue from professional services and integrations.',
    traction: '1,200 paying customers, $180K ARR, 15% month-over-month growth, 92% customer satisfaction, partnerships with 3 major banks.',
    competition: 'We compete with QuickBooks (complex, expensive) and FreshBooks (limited features). Our AI automation and real-time insights differentiate us significantly.',
    team: 'CEO: Jane Smith (15 years fintech), CTO: John Doe (ex-Google, ML expert), CFO: Sarah Johnson (CPA, startup experience). Advisory board includes industry veterans.',
    financials: 'Year 1: $500K revenue, Year 2: $2M, Year 3: $8M. Path to profitability by month 18. Gross margins of 85%, customer acquisition cost of $120.',
    funding: 'Seeking $2M Series A to accelerate growth and expand our AI capabilities.',
    useOfFunds: '60% engineering and product development, 25% sales and marketing, 10% operations, 5% working capital.',
  };

  const updateField = (field: string, value: string) => {
    setDeckData(prev => ({ ...prev, [field]: value }));
  };

  const generateSlideContent = (slideId: string) => {
    const slide = slideTemplates.find(s => s.id === slideId);
    if (!slide) return '';

    switch (slideId) {
      case 'title':
        return `${deckData.companyName}\n\n${deckData.tagline}`;
      case 'problem':
        return deckData.problem;
      case 'solution':
        return deckData.solution;
      case 'market':
        return deckData.market;
      case 'business-model':
        return deckData.businessModel;
      case 'traction':
        return deckData.traction;
      case 'competition':
        return deckData.competition;
      case 'team':
        return deckData.team;
      case 'financials':
        return deckData.financials;
      case 'funding':
        return `${deckData.funding}\n\nUse of Funds:\n${deckData.useOfFunds}`;
      default:
        return '';
    }
  };

  const exportPitchDeck = () => {
    let content = `# ${deckData.companyName} Pitch Deck\n\n`;
    
    slideTemplates.forEach((slide) => {
      content += `## ${slide.title}\n\n`;
      content += `${generateSlideContent(slide.id)}\n\n---\n\n`;
    });

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${deckData.companyName || 'pitch'}-deck.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const currentSlideData = slideTemplates[currentSlide];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold aurora-text-primary mb-2">Pitch Deck Builder</h1>
        <p className="aurora-text-secondary">Create a compelling pitch deck with professional templates and guidance.</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Slide Navigation */}
          <div className="lg:col-span-1">
            <div className="aurora-card rounded-lg p-6">
              <h2 className="text-lg font-semibold aurora-text-primary mb-4">Slides</h2>
              <div className="space-y-2">
                {slideTemplates.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-300 ${
                      index === currentSlide
                        ? 'aurora-button-primary'
                        : 'aurora-nav-item'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{slide.title}</div>
                        <div className="text-xs aurora-text-secondary mt-1">{slide.description}</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        generateSlideContent(slide.id).trim() 
                          ? 'bg-green-500' 
                          : 'bg-gray-500'
                      }`}></div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--aurora-border-light)' }}>
                <button
                  onClick={exportPitchDeck}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--aurora-glow-accent-green), var(--status-active-color-aurora))',
                    color: 'var(--aurora-bg-dark)'
                  }}
                >
                  <Download className="w-4 h-4" />
                  <span>Export Deck</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="aurora-card rounded-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold aurora-text-primary">
                    {currentSlideData.title}
                  </h2>
                  <p className="aurora-text-secondary mt-1">{currentSlideData.description}</p>
                </div>
                <div className="flex items-center space-x-2 text-sm aurora-text-secondary">
                  <span>{currentSlide + 1} of {slideTemplates.length}</span>
                </div>
              </div>

              <div className="space-y-6">
                {currentSlideData.fields.map((field) => (
                  <div key={field}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium aurora-text-primary">
                        {fieldLabels[field]}
                      </label>
                      {slideExamples[field] && (
                        <button
                          onClick={() => updateField(field, slideExamples[field])}
                          className="text-xs aurora-button-secondary px-2 py-1 rounded"
                        >
                          Use Example
                        </button>
                      )}
                    </div>
                    {field === 'tagline' || field === 'companyName' ? (
                      <input
                        type="text"
                        value={deckData[field as keyof typeof deckData]}
                        onChange={(e) => updateField(field, e.target.value)}
                        placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
                        className="w-full px-4 py-3 rounded-lg aurora-input"
                      />
                    ) : (
                      <textarea
                        value={deckData[field as keyof typeof deckData]}
                        onChange={(e) => updateField(field, e.target.value)}
                        placeholder={slideExamples[field] || `Enter ${fieldLabels[field].toLowerCase()}`}
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg aurora-input resize-vertical"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Slide Preview */}
              <div className="mt-8 pt-8" style={{ borderTop: '1px solid var(--aurora-border-light)' }}>
                <h3 className="text-lg font-semibold aurora-text-primary mb-4">Slide Preview</h3>
                <div className="aurora-card rounded-lg p-8 min-h-[300px]" 
                     style={{ background: 'var(--aurora-section-bg)', border: '2px dashed var(--aurora-border-light)' }}>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold aurora-text-primary mb-4">{currentSlideData.title}</h2>
                    <div className="text-left max-w-2xl mx-auto">
                      <pre className="whitespace-pre-wrap aurora-text-secondary font-sans leading-relaxed">
                        {generateSlideContent(currentSlideData.id) || `Add content for ${currentSlideData.title.toLowerCase()}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                  className="flex items-center space-x-2 px-6 py-2 aurora-button-secondary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                
                <button
                  onClick={() => setCurrentSlide(Math.min(slideTemplates.length - 1, currentSlide + 1))}
                  disabled={currentSlide === slideTemplates.length - 1}
                  className="flex items-center space-x-2 px-6 py-2 aurora-button-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeckBuilder;