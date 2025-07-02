import React, { useState } from 'react';
import { Scale, Download, FileText, Users, Shield, AlertTriangle } from 'lucide-react';

const LegalDocuments: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [documentData, setDocumentData] = useState({
    companyName: '',
    partnerName: '',
    date: new Date().toISOString().split('T')[0],
    duration: '',
    termination: '',
    description: '',
    compensation: '',
    confidentialInfo: '',
    jurisdiction: '',
    signerName: '',
    signerTitle: '',
  });

  const legalTemplates = [
    {
      id: 'nda',
      name: 'Non-Disclosure Agreement (NDA)',
      description: 'Protect confidential information',
      category: 'Confidentiality',
      icon: Shield,
    },
    {
      id: 'partnership',
      name: 'Partnership Agreement',
      description: 'Define business partnership terms',
      category: 'Partnership',
      icon: Users,
    },
    {
      id: 'employment',
      name: 'Employment Contract',
      description: 'Standard employment agreement',
      category: 'Employment',
      icon: FileText,
    },
    {
      id: 'consulting',
      name: 'Consulting Agreement',
      description: 'Independent contractor terms',
      category: 'Services',
      icon: FileText,
    },
    {
      id: 'liability',
      name: 'Liability Waiver',
      description: 'Limit liability exposure',
      category: 'Protection',
      icon: Shield,
    },
    {
      id: 'terms',
      name: 'Terms of Service',
      description: 'Website/app terms and conditions',
      category: 'Digital',
      icon: FileText,
    },
  ];

  const generateNDA = () => {
    return `
NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${documentData.date} between ${documentData.companyName} ("Disclosing Party") and ${documentData.partnerName} ("Receiving Party").

RECITALS
WHEREAS, the Disclosing Party possesses certain confidential and proprietary information;
WHEREAS, the Receiving Party desires to receive such information for the purpose of ${documentData.description || 'business evaluation'};

NOW, THEREFORE, the parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION
For purposes of this Agreement, "Confidential Information" includes:
${documentData.confidentialInfo || '- Technical data, trade secrets, know-how\n- Business plans, financial information\n- Customer lists and marketing strategies\n- Any other proprietary information'}

2. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees to:
a) Hold all Confidential Information in strict confidence
b) Not disclose Confidential Information to third parties
c) Use Confidential Information solely for the purpose stated above
d) Return all materials upon request

3. TERM
This Agreement shall remain in effect for ${documentData.duration || '2 years'} from the date of execution.

4. REMEDIES
The Receiving Party acknowledges that breach of this Agreement may cause irreparable harm, and the Disclosing Party shall be entitled to equitable relief.

5. GOVERNING LAW
This Agreement shall be governed by the laws of ${documentData.jurisdiction || '[State/Country]'}.

IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.

DISCLOSING PARTY:                    RECEIVING PARTY:

_________________________           _________________________
${documentData.companyName}          ${documentData.partnerName}

By: _____________________           By: _____________________
Name: ${documentData.signerName || '[Name]'}                  Name: [Name]
Title: ${documentData.signerTitle || '[Title]'}                Title: [Title]
Date: ${documentData.date}                     Date: ___________
    `.trim();
  };

  const generatePartnership = () => {
    return `
PARTNERSHIP AGREEMENT

This Partnership Agreement ("Agreement") is entered into on ${documentData.date} between ${documentData.companyName} and ${documentData.partnerName} (collectively, the "Partners").

RECITALS
WHEREAS, the Partners desire to form a partnership for ${documentData.description || 'business purposes'};

NOW, THEREFORE, the Partners agree as follows:

1. FORMATION OF PARTNERSHIP
The Partners hereby form a partnership under the name "${documentData.companyName}" for the purpose of ${documentData.description || '[Business Purpose]'}.

2. TERM
This partnership shall commence on ${documentData.date} and continue for ${documentData.duration || 'an indefinite period'} unless terminated as provided herein.

3. CAPITAL CONTRIBUTIONS
Each partner's initial capital contribution and ownership percentage:
- ${documentData.companyName}: [Amount] ([Percentage]%)
- ${documentData.partnerName}: [Amount] ([Percentage]%)

4. MANAGEMENT AND DECISION MAKING
- Partners shall have equal rights in management decisions
- Major decisions require unanimous consent
- Day-to-day operations may be managed by designated partner(s)

5. PROFIT AND LOSS DISTRIBUTION
Profits and losses shall be allocated based on ownership percentages unless otherwise agreed.

6. TERMINATION
This partnership may be terminated:
a) By mutual consent of all partners
b) ${documentData.termination || 'Upon 30 days written notice by any partner'}
c) Upon death or incapacity of a partner

7. GOVERNING LAW
This Agreement shall be governed by the laws of ${documentData.jurisdiction || '[State/Country]'}.

IN WITNESS WHEREOF, the partners have executed this Agreement.

_________________________           _________________________
${documentData.companyName}          ${documentData.partnerName}
Date: ${documentData.date}                     Date: ___________
    `.trim();
  };

  const generateEmployment = () => {
    return `
EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into on ${documentData.date} between ${documentData.companyName} ("Company") and ${documentData.partnerName} ("Employee").

1. POSITION AND DUTIES
Employee is hired as ${documentData.description || '[Job Title]'} and agrees to perform duties as assigned by the Company.

2. TERM OF EMPLOYMENT
This agreement shall commence on ${documentData.date} and continue until terminated by either party.

3. COMPENSATION
Employee shall receive compensation of ${documentData.compensation || '$[Amount] per [Period]'}, payable according to Company's standard payroll practices.

4. BENEFITS
Employee shall be eligible for benefits according to Company policies, including:
- Health insurance
- Vacation time
- Sick leave
- Other benefits as applicable

5. CONFIDENTIALITY
Employee agrees to maintain the confidentiality of all proprietary information and trade secrets of the Company.

6. TERMINATION
Either party may terminate this agreement:
a) With cause: Immediately upon written notice
b) Without cause: ${documentData.termination || '30 days written notice'}

7. POST-EMPLOYMENT OBLIGATIONS
Employee agrees not to compete with Company for ${documentData.duration || '12 months'} following termination.

8. GOVERNING LAW
This Agreement is governed by the laws of ${documentData.jurisdiction || '[State/Country]'}.

COMPANY:                             EMPLOYEE:

_________________________           _________________________
${documentData.companyName}          ${documentData.partnerName}

By: _____________________           Signature: _______________
Name: ${documentData.signerName || '[Name]'}                Date: ${documentData.date}
Title: ${documentData.signerTitle || '[Title]'}
Date: ${documentData.date}
    `.trim();
  };

  const generateConsulting = () => {
    return `
CONSULTING AGREEMENT

This Consulting Agreement ("Agreement") is entered into on ${documentData.date} between ${documentData.companyName} ("Company") and ${documentData.partnerName} ("Consultant").

1. SERVICES
Consultant agrees to provide the following services:
${documentData.description || '- [Service Description]\n- [Deliverables]\n- [Scope of Work]'}

2. TERM
This agreement shall commence on ${documentData.date} and continue for ${documentData.duration || '[Duration]'} unless terminated earlier.

3. COMPENSATION
Company shall pay Consultant ${documentData.compensation || '$[Amount] per [Period]'} for services rendered.
Payment terms: Net 30 days from invoice date.

4. INDEPENDENT CONTRACTOR
Consultant is an independent contractor, not an employee. Consultant is responsible for all taxes and benefits.

5. INTELLECTUAL PROPERTY
All work product created under this Agreement shall be owned by the Company.

6. CONFIDENTIALITY
Consultant agrees to maintain confidentiality of all Company information received during the engagement.

7. TERMINATION
Either party may terminate this agreement with ${documentData.termination || '30 days written notice'}.

8. INDEMNIFICATION
Consultant agrees to indemnify Company against claims arising from Consultant's negligent acts or omissions.

9. GOVERNING LAW
This Agreement is governed by the laws of ${documentData.jurisdiction || '[State/Country]'}.

COMPANY:                             CONSULTANT:

_________________________           _________________________
${documentData.companyName}          ${documentData.partnerName}

By: _____________________           Signature: _______________
Name: ${documentData.signerName || '[Name]'}                Date: ${documentData.date}
Title: ${documentData.signerTitle || '[Title]'}
Date: ${documentData.date}
    `.trim();
  };

  const generateLiabilityWaiver = () => {
    return `
LIABILITY WAIVER AND RELEASE

I, ${documentData.partnerName}, voluntarily participate in activities provided by ${documentData.companyName} ("Company").

ASSUMPTION OF RISK
I understand and acknowledge that participation in ${documentData.description || 'Company activities'} involves risks including but not limited to:
- Physical injury or property damage
- Other risks inherent to the activity

RELEASE OF LIABILITY
I hereby release, waive, and discharge Company, its officers, employees, and agents from any and all claims, demands, or causes of action arising from my participation.

INDEMNIFICATION
I agree to indemnify and hold harmless Company from any claims made by third parties arising from my participation.

MEDICAL EMERGENCY
I authorize Company to secure emergency medical treatment if necessary.

ACKNOWLEDGMENT
I have read this waiver and understand its contents. I sign voluntarily with full knowledge of its significance.

Participant Signature: _________________________
Print Name: ${documentData.partnerName}
Date: ${documentData.date}

Emergency Contact: _________________________
Phone: _________________________

WITNESS:
Signature: _________________________
Print Name: _________________________
Date: _________________________
    `.trim();
  };

  const generateTermsOfService = () => {
    return `
TERMS OF SERVICE

Last Updated: ${documentData.date}

AGREEMENT
These Terms of Service ("Terms") govern your use of ${documentData.companyName}'s website and services ("Service").

1. ACCEPTANCE OF TERMS
By accessing or using our Service, you agree to be bound by these Terms.

2. DESCRIPTION OF SERVICE
${documentData.companyName} provides ${documentData.description || '[Service Description]'}.

3. USER ACCOUNTS
- You are responsible for maintaining account security
- You must provide accurate information
- You are responsible for all activity under your account

4. ACCEPTABLE USE
You agree not to:
- Violate any laws or regulations
- Infringe on intellectual property rights
- Transmit harmful or malicious code
- Engage in unauthorized access

5. PRIVACY
Your privacy is governed by our Privacy Policy, incorporated by reference.

6. INTELLECTUAL PROPERTY
All content and materials are owned by ${documentData.companyName} or its licensors.

7. DISCLAIMERS
THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.

8. LIMITATION OF LIABILITY
${documentData.companyName}'s liability is limited to the maximum extent permitted by law.

9. TERMINATION
We may terminate or suspend your account at any time for violation of these Terms.

10. GOVERNING LAW
These Terms are governed by the laws of ${documentData.jurisdiction || '[State/Country]'}.

11. CONTACT INFORMATION
For questions about these Terms, contact:
${documentData.companyName}
[Address]
[Email]
[Phone]

By using our Service, you acknowledge that you have read and agree to these Terms.
    `.trim();
  };

  const generateDocument = () => {
    switch (selectedTemplate) {
      case 'nda':
        return generateNDA();
      case 'partnership':
        return generatePartnership();
      case 'employment':
        return generateEmployment();
      case 'consulting':
        return generateConsulting();
      case 'liability':
        return generateLiabilityWaiver();
      case 'terms':
        return generateTermsOfService();
      default:
        return '';
    }
  };

  const downloadDocument = () => {
    const content = generateDocument();
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedTemplate}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const categories = [...new Set(legalTemplates.map(t => t.category))];

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center aurora-icon-glow" 
               style={{ background: 'linear-gradient(135deg, var(--aurora-glow-accent-purple), var(--aurora-glow-vibrant))' }}>
            <Scale className="w-6 h-6" style={{ color: 'var(--aurora-bg-dark)' }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold aurora-text-primary">Legal Documents</h1>
            <p className="aurora-text-secondary">Generate professional legal documents and agreements.</p>
          </div>
        </div>
        
        <div className="aurora-card rounded-lg p-4 flex items-start space-x-3" 
             style={{ background: 'rgba(255, 165, 0, 0.1)', border: '1px solid rgba(255, 165, 0, 0.3)' }}>
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--status-planning-color-aurora)' }} />
          <div>
            <p className="text-sm aurora-text-primary">
              <strong>Legal Disclaimer:</strong> These templates are for informational purposes only and do not constitute legal advice. 
              Please consult with a qualified attorney before using any legal documents.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          <div className="lg:col-span-1">
            <div className="aurora-card rounded-lg p-6">
              <h2 className="text-lg font-semibold aurora-text-primary mb-4">Choose Document Type</h2>
              
              {categories.map((category) => (
                <div key={category} className="mb-6">
                  <h3 className="text-sm font-medium aurora-text-secondary uppercase tracking-wider mb-3">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {legalTemplates
                      .filter(t => t.category === category)
                      .map((template) => {
                        const Icon = template.icon;
                        return (
                          <button
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                              selectedTemplate === template.id
                                ? 'aurora-button-primary'
                                : 'aurora-nav-item'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <Icon className={`w-5 h-5 mt-0.5 ${
                                selectedTemplate === template.id ? 'text-current' : 'aurora-text-secondary'
                              }`} />
                              <div>
                                <div className="font-medium text-sm">{template.name}</div>
                                <div className="text-xs aurora-text-secondary mt-1">{template.description}</div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form and Preview */}
          <div className="lg:col-span-2">
            {selectedTemplate ? (
              <div className="space-y-6">
                {/* Form */}
                <div className="aurora-card rounded-lg p-6">
                  <h2 className="text-lg font-semibold aurora-text-primary mb-4">Document Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium aurora-text-primary mb-2">
                        Your Company/Name
                      </label>
                      <input
                        type="text"
                        value={documentData.companyName}
                        onChange={(e) => setDocumentData({ ...documentData, companyName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg aurora-input"
                        placeholder="Your Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium aurora-text-primary mb-2">
                        Other Party Name
                      </label>
                      <input
                        type="text"
                        value={documentData.partnerName}
                        onChange={(e) => setDocumentData({ ...documentData, partnerName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg aurora-input"
                        placeholder="Partner/Employee Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium aurora-text-primary mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={documentData.date}
                        onChange={(e) => setDocumentData({ ...documentData, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg aurora-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium aurora-text-primary mb-2">
                        Duration/Term
                      </label>
                      <input
                        type="text"
                        value={documentData.duration}
                        onChange={(e) => setDocumentData({ ...documentData, duration: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg aurora-input"
                        placeholder="e.g., 2 years, indefinite"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium aurora-text-primary mb-2">
                        Description/Purpose
                      </label>
                      <textarea
                        value={documentData.description}
                        onChange={(e) => setDocumentData({ ...documentData, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg aurora-input"
                        placeholder="Describe the purpose, services, or scope..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium aurora-text-primary mb-2">
                        Compensation (if applicable)
                      </label>
                      <input
                        type="text"
                        value={documentData.compensation}
                        onChange={(e) => setDocumentData({ ...documentData, compensation: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg aurora-input"
                        placeholder="e.g., $5000/month"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium aurora-text-primary mb-2">
                        Jurisdiction
                      </label>
                      <input
                        type="text"
                        value={documentData.jurisdiction}
                        onChange={(e) => setDocumentData({ ...documentData, jurisdiction: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg aurora-input"
                        placeholder="e.g., California, USA"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="aurora-card rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold aurora-text-primary">Document Preview</h2>
                    <button
                      onClick={downloadDocument}
                      className="flex items-center space-x-2 px-4 py-2 aurora-button-primary rounded-lg"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                  <div className="aurora-card p-6 rounded-lg max-h-96 overflow-y-auto" 
                       style={{ background: 'var(--aurora-section-bg)' }}>
                    <pre className="whitespace-pre-wrap text-sm aurora-text-primary font-mono leading-relaxed">
                      {generateDocument()}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aurora-card rounded-lg p-12 text-center">
                <Scale className="w-16 h-16 aurora-text-secondary mx-auto mb-4" />
                <h2 className="text-xl font-semibold aurora-text-primary mb-2">Select a Legal Document</h2>
                <p className="aurora-text-secondary">
                  Choose a document template from the left sidebar to get started.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDocuments;