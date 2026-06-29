/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FinancialYear } from '../types';
import { formatCurrency } from '../lib/valuationUtils';

interface Props {
  history: FinancialYear[];
}

export default function FinancialTable({ history }: Props) {
  // Sort history by year descending
  const sorted = [...history].sort((a, b) => b.year - a.year);

  const rows = [
    { label: 'Revenue', key: 'revenue', format: formatCurrency },
    { label: 'EBIT', key: 'operatingIncome', format: formatCurrency },
    { label: 'Net Income', key: 'netIncome', format: formatCurrency },
    { label: 'Capex', key: 'capex', format: formatCurrency },
    { label: 'D&A', key: 'depreciationAmortization', format: formatCurrency },
    { label: 'Total Debt', key: 'totalDebt', format: formatCurrency },
    { label: 'Cash', key: 'cashAndEquivalents', format: formatCurrency },
    { label: 'Shares', key: 'sharesOutstanding', format: (v: number) => new Intl.NumberFormat().format(v) + 'M' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white sticky left-0 z-10">Data Block</th>
            {sorted.map(y => (
              <th key={y.year} className="py-4 px-6 text-sm font-mono font-bold text-slate-900 text-right">FY {y.year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.label} className="group border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="py-3 text-sm font-medium text-slate-600 bg-white group-hover:bg-slate-50 sticky left-0 z-10 border-r border-slate-50 pr-4">
                {row.label}
              </td>
              {sorted.map(y => (
                <td key={y.year} className="py-3 px-6 text-sm font-mono text-slate-500 text-right">
                  {row.format((y as any)[row.key])}
                </td>
              ))}
            </tr>
          ))}
          
          <tr className="bg-slate-900 text-white font-mono text-xs uppercase tracking-widest">
            <td className="py-2 px-4 sticky left-0 bg-slate-900">Analysis Metrics</td>
            {sorted.map(y => (
              <td key={y.year} className="py-2 px-6 text-right">
                ROE: {((y.netIncome / y.totalEquity) * 100).toFixed(1)}%
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      
      <div className="mt-8 flex items-center justify-between text-xs text-slate-400">
        <p>* All values in millions unless specified otherwise.</p>
        <p>Source: Standard Reporting Package (Normalized)</p>
      </div>
    </div>
  );
}
