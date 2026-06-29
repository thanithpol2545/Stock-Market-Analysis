/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FinancialYear, StockAnalysis, DEFAULT_INPUTS, DEFAULT_RISK_SCORE } from '../types';

function q(annual: FinancialYear, qNum: number): FinancialYear {
  const w = [0.22, 0.24, 0.25, 0.29][qNum - 1];
  return {
    ...annual,
    quarter: qNum,
    label: `Q${qNum} ${annual.year}`,
    revenue: Math.round(annual.revenue * w),
    operatingIncome: Math.round(annual.operatingIncome * w),
    netIncome: Math.round(annual.netIncome * w),
    depreciationAmortization: Math.round(annual.depreciationAmortization * w),
    capex: Math.round(annual.capex * w),
    changeInNWC: Math.round(annual.changeInNWC * w),
    dividends: 0,
  };
}

const years: FinancialYear[] = [
  {
    year: 2024, label: 'FY 2024',
    revenue: 391035, operatingIncome: 123216, netIncome: 101900,
    depreciationAmortization: 11000, capex: 10500, changeInNWC: 1200,
    totalAssets: 337411, totalEquity: 74214, totalDebt: 106000,
    cashAndEquivalents: 73100, sharesOutstanding: 15400, dividends: 15500,
  },
  {
    year: 2023, label: 'FY 2023',
    revenue: 383285, operatingIncome: 114300, netIncome: 96995,
    depreciationAmortization: 11519, capex: 10959, changeInNWC: 1000,
    totalAssets: 352583, totalEquity: 62146, totalDebt: 109280,
    cashAndEquivalents: 61555, sharesOutstanding: 15550, dividends: 15000,
  },
];

const quarters: FinancialYear[] = [];
for (const y of years) {
  for (let i = 1; i <= 4; i++) {
    quarters.push(q(y, i));
  }
}

export const DUMMY_ANALYSIS: StockAnalysis = {
  id: 'apple-sample',
  ticker: 'AAPL',
  companyName: 'Apple Inc.',
  sector: 'Technology',
  currentPrice: 185.92,
  lastUpdated: new Date().toISOString(),
  riskScore: DEFAULT_RISK_SCORE,
  inputs: DEFAULT_INPUTS,
  history: years,
  quarterlyHistory: quarters,
};
