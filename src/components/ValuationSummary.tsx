/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ValuationResult, StockAnalysis } from '../types';
import { formatCurrency, formatPercent } from '../lib/valuationUtils';
import { TrendingUp, DollarSign, Percent, PieChart } from 'lucide-react';

interface Props {
  valuation: ValuationResult;
  analysis: StockAnalysis;
}

export default function ValuationSummary({ valuation, analysis }: Props) {
  const sorted = [...analysis.history].sort((a, b) => a.year - b.year);
  const latest = sorted[sorted.length - 1];

  const cards = [
    {
      label: 'Enterprise Value',
      value: formatCurrency(valuation.enterpriseValue),
      icon: TrendingUp,
      desc: 'Market val of operating assets'
    },
    {
      label: 'WACC',
      value: formatPercent(valuation.wacc),
      icon: Percent,
      desc: 'Weighted avg cost of capital'
    },
    {
      label: 'Cost of Equity',
      value: formatPercent(valuation.costOfEquity),
      icon: PieChart,
      desc: 'Based on Beta: ' + analysis.inputs.beta
    },
    {
      label: 'Free Cash Flow',
      value: formatCurrency(latest.operatingIncome * 0.79), // Simplified proxy
      icon: DollarSign,
      desc: 'Base year FCFF (Normalized)'
    }
  ];

  return (
    <>
      {cards.map(card => (
        <div key={card.label} className="p-6 bg-white border border-slate-200 rounded-none hover:border-indigo-200 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="p-1.5 border border-slate-100 bg-slate-50">
              <card.icon className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
          <p className="text-2xl font-mono font-bold text-slate-900 mb-2 truncate">{card.value}</p>
          <p className="text-[10px] font-mono text-slate-400 uppercase leading-relaxed">{card.desc}</p>
        </div>
      ))}
    </>
  );
}
