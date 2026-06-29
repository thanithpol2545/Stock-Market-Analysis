/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FinancialYear, StockAnalysis, DEFAULT_INPUTS, DEFAULT_RISK_SCORE } from '../types';

export const DUMMY_ANALYSIS: StockAnalysis = {
  id: 'apple-sample',
  ticker: 'AAPL',
  companyName: 'Apple Inc.',
  sector: 'Technology',
  currentPrice: 185.92,
  lastUpdated: new Date().toISOString(),
  riskScore: DEFAULT_RISK_SCORE,
  inputs: DEFAULT_INPUTS,
  history: [
    {
      year: 2024,
      revenue: 391035,
      operatingIncome: 123216,
      netIncome: 101900,
      depreciationAmortization: 11000,
      capex: 10500,
      changeInNWC: 1200,
      totalAssets: 337411,
      totalEquity: 74214,
      totalDebt: 106000,
      cashAndEquivalents: 73100,
      sharesOutstanding: 15400,
      dividends: 15500
    },
    {
      year: 2023,
      revenue: 383285,
      operatingIncome: 114300,
      netIncome: 96995,
      depreciationAmortization: 11519,
      capex: 10959,
      changeInNWC: 1000,
      totalAssets: 352583,
      totalEquity: 62146,
      totalDebt: 109280,
      cashAndEquivalents: 61555,
      sharesOutstanding: 15550,
      dividends: 15000
    }
  ]
};
