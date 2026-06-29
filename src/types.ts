/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FinancialYear {
  year: number;
  revenue: number;
  operatingIncome: number; // EBIT
  netIncome: number;
  depreciationAmortization: number;
  capex: number;
  changeInNWC: number;
  totalAssets: number;
  totalEquity: number;
  totalDebt: number;
  cashAndEquivalents: number;
  sharesOutstanding: number;
  dividends: number;
}

export interface ValuationInputs {
  beta: number;
  riskFreeRate: number;
  equityRiskPremium: number;
  preTaxCostOfDebt: number;
  marginalTaxRate: number;
  terminalGrowthRate: number;
  targetDebtToEquity: number;
}

export interface ValuationResult {
  intrinsicValuePerShare: number;
  equityValue: number;
  enterpriseValue: number;
  wacc: number;
  costOfEquity: number;
  afterTaxCostOfDebt: number;
}

export interface ScenarioAdjustments {
  revenueGrowthModifier: number; // e.g. 1.2 for +20%
  marginModifier: number;
  waccModifier: number;
}

export enum ValuationScenario {
  BEAR = 'Bear',
  BASE = 'Base',
  BULL = 'Bull',
}

export interface RiskScore {
  business: number; // 1-5
  financial: number;
  management: number;
  governance: number;
  macro: number;
  regulatory: number;
}

export interface StockAnalysis {
  id: string;
  ticker: string;
  companyName: string;
  sector: string;
  currentPrice: number;
  history: FinancialYear[];
  inputs: ValuationInputs;
  riskScore: RiskScore;
  lastUpdated: string;
}

export const DEFAULT_RISK_SCORE: RiskScore = {
  business: 3,
  financial: 3,
  management: 3,
  governance: 3,
  macro: 3,
  regulatory: 3,
};

export const DEFAULT_INPUTS: ValuationInputs = {
  beta: 1.0,
  riskFreeRate: 0.04, // 4%
  equityRiskPremium: 0.05, // 5%
  preTaxCostOfDebt: 0.06, // 6%
  marginalTaxRate: 0.21, // 21%
  terminalGrowthRate: 0.02, // 2%
  targetDebtToEquity: 0.5,
};
