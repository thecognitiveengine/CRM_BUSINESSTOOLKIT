import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, PieChart } from 'lucide-react';

const FinancialCalculators: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState('roi');
  
  // ROI Calculator State
  const [roiData, setRoiData] = useState({
    initialInvestment: '',
    finalValue: '',
    timePeriod: '',
  });

  // Break-even Calculator State
  const [breakEvenData, setBreakEvenData] = useState({
    fixedCosts: '',
    variableCostPerUnit: '',
    pricePerUnit: '',
  });

  // Cash Flow Projections State
  const [cashFlowData, setCashFlowData] = useState({
    monthlyRevenue: '',
    monthlyExpenses: '',
    initialCash: '',
    months: '12',
  });

  const calculators = [
    { id: 'roi', name: 'ROI Calculator', icon: TrendingUp },
    { id: 'breakeven', name: 'Break-even Analysis', icon: Calculator },
    { id: 'cashflow', name: 'Cash Flow Projections', icon: DollarSign },
    { id: 'valuation', name: 'Business Valuation', icon: PieChart },
  ];

  const calculateROI = () => {
    const initial = parseFloat(roiData.initialInvestment);
    const final = parseFloat(roiData.finalValue);
    if (initial && final) {
      const roi = ((final - initial) / initial) * 100;
      return roi.toFixed(2);
    }
    return '0';
  };

  const calculateBreakEven = () => {
    const fixed = parseFloat(breakEvenData.fixedCosts);
    const variable = parseFloat(breakEvenData.variableCostPerUnit);
    const price = parseFloat(breakEvenData.pricePerUnit);
    
    if (fixed && price && variable && price > variable) {
      const breakEvenUnits = fixed / (price - variable);
      const breakEvenRevenue = breakEvenUnits * price;
      return { units: Math.ceil(breakEvenUnits), revenue: breakEvenRevenue.toFixed(2) };
    }
    return { units: 0, revenue: '0' };
  };

  const calculateCashFlow = () => {
    const revenue = parseFloat(cashFlowData.monthlyRevenue);
    const expenses = parseFloat(cashFlowData.monthlyExpenses);
    const initial = parseFloat(cashFlowData.initialCash);
    const months = parseInt(cashFlowData.months);

    if (revenue && expenses && initial && months) {
      const monthlyFlow = revenue - expenses;
      const projections = [];
      let runningBalance = initial;

      for (let i = 1; i <= months; i++) {
        runningBalance += monthlyFlow;
        projections.push({
          month: i,
          revenue: revenue,
          expenses: expenses,
          netFlow: monthlyFlow,
          balance: runningBalance,
        });
      }
      return projections;
    }
    return [];
  };

  const renderROICalculator = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium aurora-text-primary mb-2">
            Initial Investment ($)
          </label>
          <input
            type="number"
            value={roiData.initialInvestment}
            onChange={(e) => setRoiData({ ...roiData, initialInvestment: e.target.value })}
            className="w-full px-4 py-3 rounded-lg aurora-input"
            placeholder="10000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium aurora-text-primary mb-2">
            Final Value ($)
          </label>
          <input
            type="number"
            value={roiData.finalValue}
            onChange={(e) => setRoiData({ ...roiData, finalValue: e.target.value })}
            className="w-full px-4 py-3 rounded-lg aurora-input"
            placeholder="15000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium aurora-text-primary mb-2">
            Time Period (years)
          </label>
          <input
            type="number"
            value={roiData.timePeriod}
            onChange={(e) => setRoiData({ ...roiData, timePeriod: e.target.value })}
            className="w-full px-4 py-3 rounded-lg aurora-input"
            placeholder="2"
          />
        </div>
      </div>
      
      <div className="aurora-card p-6 rounded-lg" 
           style={{ background: 'linear-gradient(135deg, var(--aurora-glow-accent-green)20, var(--aurora-glow-vibrant)20)' }}>
        <h3 className="text-lg font-semibold aurora-text-primary mb-2">ROI Results</h3>
        <div className="text-3xl font-bold" style={{ color: 'var(--aurora-glow-accent-green)' }}>
          {calculateROI()}%
        </div>
        <p className="aurora-text-secondary mt-2">
          Return on Investment over {roiData.timePeriod || 0} years
        </p>
      </div>
    </div>
  );

  const renderBreakEvenCalculator = () => {
    const results = calculateBreakEven();
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium aurora-text-primary mb-2">
              Fixed Costs ($)
            </label>
            <input
              type="number"
              value={breakEvenData.fixedCosts}
              onChange={(e) => setBreakEvenData({ ...breakEvenData, fixedCosts: e.target.value })}
              className="w-full px-4 py-3 rounded-lg aurora-input"
              placeholder="50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium aurora-text-primary mb-2">
              Variable Cost per Unit ($)
            </label>
            <input
              type="number"
              value={breakEvenData.variableCostPerUnit}
              onChange={(e) => setBreakEvenData({ ...breakEvenData, variableCostPerUnit: e.target.value })}
              className="w-full px-4 py-3 rounded-lg aurora-input"
              placeholder="20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium aurora-text-primary mb-2">
              Price per Unit ($)
            </label>
            <input
              type="number"
              value={breakEvenData.pricePerUnit}
              onChange={(e) => setBreakEvenData({ ...breakEvenData, pricePerUnit: e.target.value })}
              className="w-full px-4 py-3 rounded-lg aurora-input"
              placeholder="50"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aurora-card p-6 rounded-lg" 
               style={{ background: 'linear-gradient(135deg, var(--aurora-glow-vibrant)20, var(--aurora-glow-accent-purple)20)' }}>
            <h3 className="text-lg font-semibold aurora-text-primary mb-2">Break-even Units</h3>
            <div className="text-3xl font-bold" style={{ color: 'var(--aurora-glow-vibrant)' }}>
              {results.units.toLocaleString()}
            </div>
            <p className="aurora-text-secondary mt-2">Units needed to break even</p>
          </div>
          <div className="aurora-card p-6 rounded-lg" 
               style={{ background: 'linear-gradient(135deg, var(--aurora-glow-accent-purple)20, var(--status-planning-color-aurora)20)' }}>
            <h3 className="text-lg font-semibold aurora-text-primary mb-2">Break-even Revenue</h3>
            <div className="text-3xl font-bold" style={{ color: 'var(--aurora-glow-accent-purple)' }}>
              ${parseFloat(results.revenue).toLocaleString()}
            </div>
            <p className="aurora-text-secondary mt-2">Revenue needed to break even</p>
          </div>
        </div>
      </div>
    );
  };

  const renderCashFlowCalculator = () => {
    const projections = calculateCashFlow();
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium aurora-text-primary mb-2">
              Monthly Revenue ($)
            </label>
            <input
              type="number"
              value={cashFlowData.monthlyRevenue}
              onChange={(e) => setCashFlowData({ ...cashFlowData, monthlyRevenue: e.target.value })}
              className="w-full px-4 py-3 rounded-lg aurora-input"
              placeholder="25000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium aurora-text-primary mb-2">
              Monthly Expenses ($)
            </label>
            <input
              type="number"
              value={cashFlowData.monthlyExpenses}
              onChange={(e) => setCashFlowData({ ...cashFlowData, monthlyExpenses: e.target.value })}
              className="w-full px-4 py-3 rounded-lg aurora-input"
              placeholder="20000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium aurora-text-primary mb-2">
              Initial Cash ($)
            </label>
            <input
              type="number"
              value={cashFlowData.initialCash}
              onChange={(e) => setCashFlowData({ ...cashFlowData, initialCash: e.target.value })}
              className="w-full px-4 py-3 rounded-lg aurora-input"
              placeholder="50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium aurora-text-primary mb-2">
              Projection Period (months)
            </label>
            <input
              type="number"
              value={cashFlowData.months}
              onChange={(e) => setCashFlowData({ ...cashFlowData, months: e.target.value })}
              className="w-full px-4 py-3 rounded-lg aurora-input"
              placeholder="12"
            />
          </div>
        </div>
        
        {projections.length > 0 && (
          <div className="aurora-table rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium aurora-text-primary uppercase tracking-wider">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium aurora-text-primary uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium aurora-text-primary uppercase tracking-wider">Expenses</th>
                    <th className="px-6 py-3 text-left text-xs font-medium aurora-text-primary uppercase tracking-wider">Net Flow</th>
                    <th className="px-6 py-3 text-left text-xs font-medium aurora-text-primary uppercase tracking-wider">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {projections.slice(0, 12).map((projection) => (
                    <tr key={projection.month} className={projection.balance < 0 ? 'bg-red-900 bg-opacity-20' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium aurora-text-primary">
                        {projection.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm aurora-text-secondary">
                        ${projection.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm aurora-text-secondary">
                        ${projection.expenses.toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${projection.netFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${projection.netFlow.toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${projection.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${projection.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderValuationCalculator = () => (
    <div className="space-y-6">
      <div className="aurora-card p-8 rounded-lg text-center" 
           style={{ background: 'linear-gradient(135deg, var(--status-planning-color-aurora)20, var(--status-planning-color-aurora)10)' }}>
        <PieChart className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--status-planning-color-aurora)' }} />
        <h3 className="text-xl font-semibold aurora-text-primary mb-2">Business Valuation Tool</h3>
        <p className="aurora-text-secondary mb-4">
          Advanced business valuation calculator with multiple methodologies coming soon.
        </p>
        <div className="aurora-card p-4 rounded-lg">
          <p className="text-sm aurora-text-secondary">
            This feature will include DCF analysis, comparable company analysis, and asset-based valuation methods.
          </p>
        </div>
      </div>
    </div>
  );

  const renderActiveCalculator = () => {
    switch (activeCalculator) {
      case 'roi':
        return renderROICalculator();
      case 'breakeven':
        return renderBreakEvenCalculator();
      case 'cashflow':
        return renderCashFlowCalculator();
      case 'valuation':
        return renderValuationCalculator();
      default:
        return renderROICalculator();
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold aurora-text-primary mb-2">Financial Calculators</h1>
        <p className="aurora-text-secondary">Analyze your business finances with professional-grade calculators.</p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCalculator === calc.id
                    ? 'aurora-button-primary'
                    : 'aurora-button-secondary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{calc.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="aurora-card rounded-lg p-8">
        {renderActiveCalculator()}
      </div>
    </div>
  );
};

export default FinancialCalculators;