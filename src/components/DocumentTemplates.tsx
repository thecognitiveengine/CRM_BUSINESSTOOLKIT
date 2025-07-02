import React, { useState } from 'react';
import { FileText, Download, Copy, Eye } from 'lucide-react';

const DocumentTemplates: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [documentData, setDocumentData] = useState({
    companyName: '',
    clientName: '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    description: '',
    terms: '',
  });

  const templates = [
    {
      id: 'invoice',
      name: 'Invoice Template',
      description: 'Professional invoice for services or products',
      category: 'Financial',
    },
    {
      id: 'proposal',
      name: 'Business Proposal',
      description: 'Comprehensive business proposal template',
      category: 'Sales',
    },
    {
      id: 'contract',
      name: 'Service Contract',
      description: 'Standard service agreement contract',
      category: 'Legal',
    },
    {
      id: 'nda',
      name: 'Non-Disclosure Agreement',
      description: 'Confidentiality agreement template',
      category: 'Legal',
    },
    {
      id: 'sow',
      name: 'Statement of Work',
      description: 'Detailed project scope and deliverables',
      category: 'Project',
    },
    {
      id: 'quote',
      name: 'Price Quote',
      description: 'Professional price quotation',
      category: 'Sales',
    },
  ];

  const generateInvoice = () => {
    return `
INVOICE

${documentData.companyName}
Date: ${documentData.date}
Invoice #: INV-${Date.now()}

Bill To:
${documentData.clientName}

Description: ${documentData.description}
Amount: $${documentData.amount}

Payment Terms: ${documentData.terms || 'Net 30'}

Total Due: $${documentData.amount}

Thank you for your business!
    `.trim();
  };

  const generateProposal = () => {
    return `
BUSINESS PROPOSAL

From: ${documentData.companyName}
To: ${documentData.clientName}
Date: ${documentData.date}

EXECUTIVE SUMMARY
We are pleased to submit this proposal for ${documentData.description}.

PROJECT OVERVIEW
${documentData.description}

INVESTMENT
Total Investment: $${documentData.amount}

TIMELINE
Project duration: ${documentData.terms || 'To be determined'}

NEXT STEPS
We look forward to discussing this proposal with you.

Best regards,
${documentData.companyName}
    `.trim();
  };

  const generateContract = () => {
    return `
SERVICE CONTRACT

This Service Contract ("Agreement") is entered into on ${documentData.date} between ${documentData.companyName} ("Service Provider") and ${documentData.clientName} ("Client").

SERVICES
The Service Provider agrees to provide: ${documentData.description}

COMPENSATION
Total compensation: $${documentData.amount}
Payment terms: ${documentData.terms || 'Net 30'}

TERM
This agreement shall commence on ${documentData.date} and continue until completion of services.

TERMINATION
Either party may terminate this agreement with written notice.

By signing below, both parties agree to the terms and conditions outlined in this contract.

_________________________        _________________________
Service Provider Signature       Client Signature

Date: ______________              Date: ______________
    `.trim();
  };

  const generateNDA = () => {
    return `
NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${documentData.date} between ${documentData.companyName} ("Disclosing Party") and ${documentData.clientName} ("Receiving Party").

CONFIDENTIAL INFORMATION
The Receiving Party acknowledges that it may receive confidential information from the Disclosing Party.

OBLIGATIONS
The Receiving Party agrees to:
1. Keep all confidential information strictly confidential
2. Not disclose confidential information to third parties
3. Use confidential information only for the purpose of ${documentData.description}

TERM
This agreement shall remain in effect for ${documentData.terms || '2 years'} from the date of execution.

NON-CIRCUMVENTION
The Receiving Party agrees not to circumvent the Disclosing Party in any business dealings.

_________________________        _________________________
Disclosing Party Signature       Receiving Party Signature

Date: ______________              Date: ______________
    `.trim();
  };

  const generateSOW = () => {
    return `
STATEMENT OF WORK

Project: ${documentData.description}
Client: ${documentData.clientName}
Service Provider: ${documentData.companyName}
Date: ${documentData.date}

PROJECT SCOPE
${documentData.description}

DELIVERABLES
- To be specified based on project requirements

TIMELINE
Project duration: ${documentData.terms || 'To be determined'}

BUDGET
Total project cost: $${documentData.amount}

TERMS AND CONDITIONS
Payment terms: Net 30 days
Changes to scope require written approval

ACCEPTANCE
By signing below, both parties agree to the terms outlined in this Statement of Work.

_________________________        _________________________
Service Provider Signature       Client Signature
    `.trim();
  };

  const generateQuote = () => {
    return `
PRICE QUOTATION

${documentData.companyName}
Date: ${documentData.date}
Quote #: QTE-${Date.now()}

Quote For:
${documentData.clientName}

SERVICE/PRODUCT DESCRIPTION
${documentData.description}

PRICING
Total Quote: $${documentData.amount}

TERMS
- Quote valid for ${documentData.terms || '30 days'}
- Payment terms: Net 30
- Prices subject to change without notice

To accept this quote, please sign and return a copy.

Thank you for considering our services.

Best regards,
${documentData.companyName}

_________________________
Authorized Signature
    `.trim();
  };

  const generateDocument = () => {
    switch (selectedTemplate) {
      case 'invoice':
        return generateInvoice();
      case 'proposal':
        return generateProposal();
      case 'contract':
        return generateContract();
      case 'nda':
        return generateNDA();
      case 'sow':
        return generateSOW();
      case 'quote':
        return generateQuote();
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

  const copyToClipboard = () => {
    const content = generateDocument();
    navigator.clipboard.writeText(content);
  };

  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold aurora-text-primary mb-2">Document Templates</h1>
        <p className="aurora-text-secondary">Generate professional business documents quickly and easily.</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          <div className="lg:col-span-1">
            <div className="aurora-card rounded-lg p-6">
              <h2 className="text-lg font-semibold aurora-text-primary mb-4">Choose Template</h2>
              
              {categories.map((category) => (
                <div key={category} className="mb-6">
                  <h3 className="text-sm font-medium aurora-text-secondary uppercase tracking-wider mb-2">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {templates
                      .filter(t => t.category === category)
                      .map((template) => (
                        <button
                          key={template.id}
                          onClick={() => setSelectedTemplate(template.id)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                            selectedTemplate === template.id
                              ? 'aurora-button-primary'
                              : 'aurora-nav-item'
                          }`}
                        >
                          <div className="font-medium text-sm">{template.name}</div>
                          <div className="text-xs aurora-text-secondary mt-1">{template.description}</div>
                        </button>
                      ))}
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
                  <h2 className="text-lg font-semibold aurora-text-primary mb-4">Document Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium aurora-text-primary mb-2">
                        Your Company Name
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
                        Client/Recipient Name
                      </label>
                      <input
                        type="text"
                        value={documentData.clientName}
                        onChange={(e) => setDocumentData({ ...documentData, clientName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg aurora-input"
                        placeholder="Client Name"
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
                        Amount ($)
                      </label>
                      <input
                        type="number"
                        value={documentData.amount}
                        onChange={(e) => setDocumentData({ ...documentData, amount: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg aurora-input"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium aurora-text-primary mb-2">
                        Description/Service
                      </label>
                      <textarea
                        value={documentData.description}
                        onChange={(e) => setDocumentData({ ...documentData, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg aurora-input"
                        placeholder="Describe the service or product..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium aurora-text-primary mb-2">
                        Terms/Notes
                      </label>
                      <input
                        type="text"
                        value={documentData.terms}
                        onChange={(e) => setDocumentData({ ...documentData, terms: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg aurora-input"
                        placeholder="Payment terms, conditions, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="aurora-card rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold aurora-text-primary">Document Preview</h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center space-x-2 px-4 py-2 aurora-button-secondary rounded-lg"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </button>
                      <button
                        onClick={downloadDocument}
                        className="flex items-center space-x-2 px-4 py-2 aurora-button-primary rounded-lg"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                  <div className="aurora-card p-4 rounded-lg" style={{ background: 'var(--aurora-section-bg)' }}>
                    <pre className="whitespace-pre-wrap text-sm aurora-text-primary font-mono">
                      {generateDocument()}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aurora-card rounded-lg p-12 text-center">
                <FileText className="w-16 h-16 aurora-text-secondary mx-auto mb-4" />
                <h2 className="text-xl font-semibold aurora-text-primary mb-2">Select a Template</h2>
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

export default DocumentTemplates;