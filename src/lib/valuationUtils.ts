/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FinancialYear, ValuationInputs, ValuationResult } from '../types';

export function calculateWACC(inputs: ValuationInputs): { wacc: number; costOfEquity: number; afterTaxCostOfDebt: number } {
  const { beta, riskFreeRate, equityRiskPremium, preTaxCostOfDebt, marginalTaxRate, targetDebtToEquity } = inputs;

  const costOfEquity = riskFreeRate + (beta * equityRiskPremium);
  const afterTaxCostOfDebt = preTaxCostOfDebt * (1 - marginalTaxRate);
  
  // Weights: E/(D+E) and D/(D+E)
  // D/E = ratio => D = ratio * E
  // Weight E = E / (ratio*E + E) = 1 / (ratio + 1)
  const weightEquity = 1 / (targetDebtToEquity + 1);
  const weightDebt = 1 - weightEquity;

  const wacc = (weightEquity * costOfEquity) + (weightDebt * afterTaxCostOfDebt);

  return { wacc, costOfEquity, afterTaxCostOfDebt };
}

export function performDCF(
  latestYear: FinancialYear,
  inputs: ValuationInputs,
  yearsToForecast: number = 5
): ValuationResult {
  const { wacc, costOfEquity, afterTaxCostOfDebt } = calculateWACC(inputs);
  const { terminalGrowthRate } = inputs;

  // Assuming FCFF = EBIT * (1-T) + D&A - Capex - dNWC
  const baseOperatingCashFlow = latestYear.operatingIncome * (1 - inputs.marginalTaxRate) + 
                               latestYear.depreciationAmortization - 
                               latestYear.capex - 
                               latestYear.changeInNWC;

  let totalPVOfFCFF = 0;
  let currentFCFF = baseOperatingCashFlow;
  
  // Simplified growth: use historical average or provided growth? 
  // Let's assume a standard growth of 5% for first explicit phase for demo, 
  // but in real app users would input growth per year.
  const growthRate = 0.05; 

  for (let i = 1; i <= yearsToForecast; i++) {
    currentFCFF *= (1 + growthRate);
    const pv = currentFCFF / Math.pow(1 + wacc, i);
    totalPVOfFCFF += pv;
  }

  const terminalValue = (currentFCFF * (1 + terminalGrowthRate)) / (wacc - terminalGrowthRate);
  const pvOfTerminalValue = terminalValue / Math.pow(1 + wacc, yearsToForecast);

  const enterpriseValue = totalPVOfFCFF + pvOfTerminalValue;

  // Bridge to Equity Value: EV + Cash - Debt
  const equityValue = enterpriseValue + latestYear.cashAndEquivalents - latestYear.totalDebt;
  const intrinsicValuePerShare = latestYear.sharesOutstanding > 0 ? equityValue / latestYear.sharesOutstanding : 0;

  return {
    intrinsicValuePerShare,
    equityValue,
    enterpriseValue,
    wacc,
    costOfEquity,
    afterTaxCostOfDebt
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: value > 1000000 ? 'compact' : 'standard',
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}
