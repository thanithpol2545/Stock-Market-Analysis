import React, { useState, useMemo } from 'react';
import { FinancialYear, Frequency } from '../types';
import { formatCurrency } from '../lib/valuationUtils';

interface Props {
  annual: FinancialYear[];
  quarterly: FinancialYear[];
}

export default function FinancialTable({ annual, quarterly }: Props) {
  const [freq, setFreq] = useState<Frequency>('annual');

  const data = useMemo(() => {
    const source = freq === 'annual' ? annual : quarterly;
    return [...source].sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return (b.quarter || 0) - (a.quarter || 0);
    });
  }, [freq, annual, quarterly]);

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
    <div>
      <div className="flex items-center gap-4 mb-6 border-b border-slate-200 pb-4">
        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Intelligence Phase:</span>
        <div className="flex bg-slate-100 border border-slate-200">
          <button
            onClick={() => setFreq('annual')}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${
              freq === 'annual' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Annual
          </button>
          <button
            onClick={() => setFreq('quarterly')}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${
              freq === 'quarterly' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Quarterly
          </button>
        </div>
        <span className="text-[10px] text-slate-400 font-mono ml-auto">
          {freq === 'quarterly' ? `${data.length} quarters` : `${data.length} fiscal years`}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white sticky left-0 z-10">Data Block</th>
              {data.map(p => (
                <th key={`${p.year}-${p.quarter || 0}`} className="py-4 px-6 text-sm font-mono font-bold text-slate-900 text-right">
                  {p.label || (p.quarter ? `Q${p.quarter} ${p.year}` : `FY ${p.year}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.label} className="group border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-3 text-sm font-medium text-slate-600 bg-white group-hover:bg-slate-50 sticky left-0 z-10 border-r border-slate-50 pr-4">
                  {row.label}
                </td>
                {data.map(p => (
                  <td key={`${p.year}-${p.quarter || 0}-${row.key}`} className="py-3 px-6 text-sm font-mono text-slate-500 text-right">
                    {row.format((p as any)[row.key])}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-slate-900 text-white font-mono text-xs uppercase tracking-widest">
              <td className="py-2 px-4 sticky left-0 bg-slate-900">ROE</td>
              {data.map(p => (
                <td key={`${p.year}-${p.quarter || 0}-roe`} className="py-2 px-6 text-right">
                  {p.totalEquity > 0 ? `${((p.netIncome / p.totalEquity) * 100).toFixed(1)}%` : 'N/A'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <div className="mt-8 flex items-center justify-between text-xs text-slate-400">
          <p>* All values in millions USD.</p>
          <p>Source: Finnhub (SEC Filings)</p>
        </div>
      </div>
    </div>
  );
}
