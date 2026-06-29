import { StockAnalysis, RiskScore, FinancialYear } from '../types';
import { generateAnalysis } from './mathEngine';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY || '';
const BASE = 'https://finnhub.io/api/v1';

async function fetchJson(path: string): Promise<any> {
  if (!API_KEY) return null;
  try {
    const res = await fetch(`${BASE}${path}&token=${API_KEY}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function gaapVal(report: any[], ...concepts: string[]): number {
  for (const c of concepts) {
    const found = report?.find((r: any) => r.concept === c);
    if (found && parseFloat(found.value) !== 0) return parseFloat(found.value);
  }
  return 0;
}

function buildPeriod(
  year: number,
  quarter: number | undefined,
  ic: any[],
  bs: any[],
  cf: any[],
  profileShares?: number,
): FinancialYear {
  const revenue = gaapVal(ic, 'us-gaap_RevenueFromContractWithCustomerExcludingAssessedTax');
  const operatingIncome = gaapVal(ic, 'us-gaap_OperatingIncomeLoss');
  const netIncome = gaapVal(cf, 'us-gaap_NetIncomeLoss') || gaapVal(ic, 'us-gaap_NetIncomeLoss');
  const depreciationAmortization = gaapVal(cf, 'us-gaap_DepreciationDepletionAndAmortization');
  const capex = Math.abs(gaapVal(cf, 'us-gaap_PaymentsToAcquirePropertyPlantAndEquipment'));

  const ar = gaapVal(cf, 'us-gaap_IncreaseDecreaseInAccountsReceivable');
  const inv = gaapVal(cf, 'us-gaap_IncreaseDecreaseInInventories');
  const ap = gaapVal(cf, 'us-gaap_IncreaseDecreaseInAccountsPayable');
  const oa = gaapVal(cf, 'us-gaap_IncreaseDecreaseInOtherOperatingAssets');
  const ol = gaapVal(cf, 'us-gaap_IncreaseDecreaseInOtherOperatingLiabilities');
  const or = gaapVal(cf, 'us-gaap_IncreaseDecreaseInOtherReceivables');
  const changeInNWC = Math.abs(ar + or + inv + oa - ap - ol);

  const totalAssets = gaapVal(bs, 'us-gaap_Assets');
  const totalEquity = gaapVal(bs, 'us-gaap_StockholdersEquity');
  const ltDebt = gaapVal(bs, 'us-gaap_LongTermDebtNoncurrent');
  const stDebt = gaapVal(bs, 'us-gaap_LongTermDebtCurrent');
  const cp = gaapVal(bs, 'us-gaap_CommercialPaper');
  const totalDebt = ltDebt + stDebt + cp;
  const cashTotal = gaapVal(bs,
    'us-gaap_CashAndCashEquivalentsAtCarryingValue',
    'us-gaap_Cash',
    'us-gaap_CashAndDueFromBanks',
    'us-gaap_CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents',
  );
  const sharesFromBS = gaapVal(bs,
    'us-gaap_CommonStockSharesOutstanding',
    'us-gaap_CommonStockSharesIssued',
    'us-gaap_WeightedAverageNumberOfDilutedSharesOutstanding',
    'us-gaap_WeightedAverageNumberOfBasicSharesOutstanding',
  );
  const dividends = Math.abs(gaapVal(cf, 'us-gaap_PaymentsOfDividends'));

  const label = quarter ? `Q${quarter} ${year}` : `FY ${year}`;

  const sharesM = sharesFromBS / 1e6;
  const profileM = profileShares || 0;

  return {
    year,
    quarter,
    label,
    revenue: revenue / 1e6,
    operatingIncome: operatingIncome / 1e6,
    netIncome: netIncome / 1e6,
    depreciationAmortization: depreciationAmortization / 1e6,
    capex: capex / 1e6,
    changeInNWC: changeInNWC / 1e6,
    totalAssets: totalAssets / 1e6,
    totalEquity: totalEquity / 1e6,
    totalDebt: totalDebt / 1e6,
    cashAndEquivalents: cashTotal / 1e6,
    sharesOutstanding: sharesM || profileM,
    dividends: dividends / 1e6,
  };
}

function extractYears(data: any[], profileShares?: number): FinancialYear[] {
  const list: FinancialYear[] = [];
  const seen = new Set<number>();
  for (const r of (data || []).sort((a: any, b: any) => b.year - a.year)) {
    const year = parseInt(r.year);
    if (!year || seen.has(year) || r.quarter !== 0) continue;
    seen.add(year);
    list.push(buildPeriod(year, undefined, r.report?.ic || [], r.report?.bs || [], r.report?.cf || [], profileShares));
  }
  return list.sort((a, b) => a.year - b.year);
}

function extractQuarters(data: any[], profileShares?: number): FinancialYear[] {
  const list: FinancialYear[] = [];
  for (const r of (data || []).sort((a: any, b: any) => (b.year - a.year) || (b.quarter - a.quarter))) {
    const year = parseInt(r.year);
    const q = parseInt(r.quarter);
    if (!year || !q) continue;
    list.push(buildPeriod(year, q, r.report?.ic || [], r.report?.bs || [], r.report?.cf || [], profileShares));
  }
  return list.sort((a, b) => (a.year - b.year) || ((a.quarter || 0) - (b.quarter || 0)));
}

export async function fetchRealData(ticker: string): Promise<StockAnalysis | null> {
  const sym = ticker.trim().toUpperCase();
  if (!sym) return null;

  const [quote, profile, annualData, quarterlyData, metric] = await Promise.all([
    fetchJson(`/quote?symbol=${sym}`),
    fetchJson(`/stock/profile2?symbol=${sym}`),
    fetchJson(`/stock/financials-reported?symbol=${sym}&freq=annual`),
    fetchJson(`/stock/financials-reported?symbol=${sym}&freq=quarterly`),
    fetchJson(`/stock/metric?symbol=${sym}&metric=all`),
  ]);

  if (!quote || !profile) return null;

  const profileShares = profile.shareOutstanding || 0;

  const history = extractYears(annualData?.data, profileShares);
  const quarterlyHistory = extractQuarters(quarterlyData?.data, profileShares);

  if (history.length === 0 && quarterlyHistory.length === 0) return null;

  const beta = metric?.metric?.beta || 1.0;
  const latest = history[history.length - 1] || quarterlyHistory[quarterlyHistory.length - 1];
  const dte = latest?.totalEquity > 0 ? (latest.totalDebt / latest.totalEquity) : 0.5;

  const riskScore: RiskScore = {
    business: metric?.metric?.qualityScore ? Math.round(metric.metric.qualityScore * 10) / 10 : 3.0,
    financial: 3.0,
    management: 3.0,
    governance: 3.0,
    macro: 3.0,
    regulatory: 3.0,
  };

  return {
    id: sym.toLowerCase(),
    ticker: sym,
    companyName: profile.name || sym,
    sector: profile.finnhubIndustry || 'N/A',
    currentPrice: quote.c,
    lastUpdated: new Date().toISOString(),
    riskScore,
    inputs: {
      beta,
      riskFreeRate: 0.043,
      equityRiskPremium: 0.052,
      preTaxCostOfDebt: 0.05,
      marginalTaxRate: 0.21,
      terminalGrowthRate: 0.025,
      targetDebtToEquity: Math.round(dte * 100) / 100,
    },
    history,
    quarterlyHistory,
  };
}

export async function getStockData(query: string): Promise<StockAnalysis> {
  if (API_KEY) {
    try {
      const real = await fetchRealData(query);
      if (real) return real;
    } catch {
      // fall through
    }
  }
  return generateAnalysis(query);
}
