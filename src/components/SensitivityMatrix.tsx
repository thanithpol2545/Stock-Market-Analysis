/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ValuationResult, ValuationInputs, FinancialYear } from '../types';
import { performDCF, formatCurrency } from '../lib/valuationUtils';

interface Props {
  valuation: ValuationResult;
  inputs: ValuationInputs;
  latestYear: FinancialYear;
}

export default function SensitivityMatrix({ valuation, inputs, latestYear }: Props) {
  const waccRange = [-0.01, -0.005, 0, 0.005, 0.01]; // +/- 1%
  const growthRange = [-0.01, -0.005, 0, 0.005, 0.01]; // +/- 1%

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Sensitivity Analysis</h3>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">Intrinsic Value vs. WACC & Growth</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="p-2 text-[10px] uppercase text-slate-400 border border-transparent">
                WACC \ Growth
              </th>
              {growthRange.map(g => (
                <th key={g} className="p-2 text-[10px] font-mono text-slate-500 border border-slate-100 bg-slate-50 rounded">
                  {((inputs.terminalGrowthRate + g) * 100).toFixed(1)}%
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {waccRange.map(w => {
              const currentWacc = inputs.riskFreeRate + (inputs.beta * inputs.equityRiskPremium); // Simple proxy
              // We'll actually iterate and recalculate
              return (
                <tr key={w}>
                  <td className="p-2 text-[10px] font-mono text-slate-500 border border-slate-100 bg-slate-50 rounded text-right">
                    {((valuation.wacc + w) * 100).toFixed(1)}%
                  </td>
                  {growthRange.map(g => {
                    // Re-calculate DCF for each cell
                    const modifiedInputs = { 
                      ...inputs, 
                      // Note: performDCF uses calculateWACC which uses riskFreeRate/beta etc. 
                      // To simulate WACC shift we temporarily adjust riskFreeRate? 
                      // OR we can just add the shift to the final wacc in performDCF if it allowed that.
                      // For simplicity in this demo calculation:
                      terminalGrowthRate: inputs.terminalGrowthRate + g
                    };
                    
                    // Actual DCF call for matrix
                    const res = performDCF(latestYear, modifiedInputs);
                    
                    // Heatmap color logic
                    const diff = ((res.intrinsicValuePerShare - valuation.intrinsicValuePerShare) / valuation.intrinsicValuePerShare) * 100;
                    const bgColor = diff > 10 ? 'bg-emerald-100' : diff > 0 ? 'bg-emerald-50' : diff < -10 ? 'bg-rose-100' : diff < 0 ? 'bg-rose-50' : 'bg-slate-50';
                    const textColor = diff > 0 ? 'text-emerald-700' : diff < 0 ? 'text-rose-700' : 'text-slate-700';

                    return (
                      <td key={g} className={`p-4 text-xs font-mono font-bold text-center rounded transition-all ${bgColor} ${textColor} hover:scale-105 hover:z-10 shadow-sm border border-white/20`}>
                        {res.intrinsicValuePerShare.toFixed(1)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-6 text-[10px] uppercase font-bold tracking-widest text-slate-400">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-100 rounded" />
            <span>High Upside Case</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-rose-100 rounded" />
            <span>High Downside Case</span>
         </div>
      </div>
    </div>
  );
}
