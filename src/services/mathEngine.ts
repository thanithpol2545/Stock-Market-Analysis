import { StockAnalysis, FinancialYear, RiskScore, ValuationInputs } from '../types';

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function range(seed: number, min: number, max: number): number {
  return min + seededRandom(seed) * (max - min);
}

function intRange(seed: number, min: number, max: number): number {
  return Math.floor(range(seed, min, max + 1));
}

const SECTORS = [
  { name: 'Technology', revBase: 50000, revGrowth: 0.12, margin: 0.22, multiple: 25 },
  { name: 'Healthcare', revBase: 30000, revGrowth: 0.08, margin: 0.18, multiple: 20 },
  { name: 'Financials', revBase: 40000, revGrowth: 0.06, margin: 0.30, multiple: 15 },
  { name: 'Consumer Cyclical', revBase: 25000, revGrowth: 0.07, margin: 0.12, multiple: 18 },
  { name: 'Energy', revBase: 35000, revGrowth: 0.05, margin: 0.15, multiple: 12 },
  { name: 'Industrials', revBase: 28000, revGrowth: 0.06, margin: 0.14, multiple: 16 },
  { name: 'Basic Materials', revBase: 20000, revGrowth: 0.04, margin: 0.16, multiple: 14 },
  { name: 'Real Estate', revBase: 15000, revGrowth: 0.05, margin: 0.35, multiple: 22 },
  { name: 'Utilities', revBase: 18000, revGrowth: 0.03, margin: 0.20, multiple: 17 },
  { name: 'Consumer Defensive', revBase: 22000, revGrowth: 0.04, margin: 0.13, multiple: 20 },
  { name: 'Communication Services', revBase: 32000, revGrowth: 0.09, margin: 0.20, multiple: 19 },
];

const COMPANY_PREFIXES = ['Global', 'United', 'American', 'Pacific', 'First', 'Premier', 'National', 'International', 'Digital', 'Strategic'];
const COMPANY_SUFFIXES = ['Corp', 'Inc', 'Group', 'Holdings', 'Technologies', 'Ventures', 'Partners', 'Industries', 'Solutions', 'Systems'];

function generateCompanyName(ticker: string): string {
  const seed = hashString(ticker);
  const prefix = COMPANY_PREFIXES[seed % COMPANY_PREFIXES.length];
  const suffix = COMPANY_SUFFIXES[(seed * 7 + 13) % COMPANY_SUFFIXES.length];
  if (ticker.length <= 3) return `${prefix} ${ticker} ${suffix}`;
  return `${ticker} ${suffix}`;
}

function generateFinancialYear(
  baseSeed: number,
  yearOffset: number,
  sector: typeof SECTORS[0],
): FinancialYear {
  const seed = baseSeed + yearOffset * 31;
  const growthFactor = Math.pow(1 + sector.revGrowth * (1 + seededRandom(seed + 1) * 0.3 - 0.15), yearOffset);
  const revenue = Math.round(sector.revBase * growthFactor * (0.8 + seededRandom(seed + 2) * 0.4));
  const operatingMargin = sector.margin * (0.85 + seededRandom(seed + 3) * 0.3);
  const operatingIncome = Math.round(revenue * operatingMargin);
  const netIncome = Math.round(operatingIncome * (0.65 + seededRandom(seed + 4) * 0.15));
  const depreciationAmortization = Math.round(revenue * 0.03 * (0.8 + seededRandom(seed + 5) * 0.4));
  const capex = Math.round(revenue * 0.04 * (0.7 + seededRandom(seed + 6) * 0.6));
  const changeInNWC = Math.round(revenue * 0.01 * (0.5 + seededRandom(seed + 7) * 1.0));
  const totalAssets = Math.round(revenue * 1.2 * (0.8 + seededRandom(seed + 8) * 0.4));
  const debtRatio = 0.25 + seededRandom(seed + 9) * 0.35;
  const totalDebt = Math.round(totalAssets * debtRatio);
  const equityRatio = 0.30 + seededRandom(seed + 10) * 0.25;
  const totalEquity = Math.round(totalAssets * equityRatio);
  const cashRatio = 0.10 + seededRandom(seed + 11) * 0.15;
  const cashAndEquivalents = Math.round(totalAssets * cashRatio);
  const sharesOutstanding = intRange(seed + 12, 50, 2000);
  const dividends = Math.round(netIncome * (0.15 + seededRandom(seed + 13) * 0.25));

  return {
    year: 2026 + yearOffset - 5,
    label: `FY ${2026 + yearOffset - 5}`,
    revenue,
    operatingIncome,
    netIncome,
    depreciationAmortization,
    capex,
    changeInNWC,
    totalAssets,
    totalEquity,
    totalDebt,
    cashAndEquivalents,
    sharesOutstanding,
    dividends,
  };
}

function generateQuarterly(
  baseSeed: number,
  year: number,
  q: number,
  annual: FinancialYear,
): FinancialYear {
  const seed = baseSeed + year * 100 + q * 7;
  const weight = [0.22, 0.24, 0.25, 0.29][q - 1];
  const wiggle = 0.85 + seededRandom(seed) * 0.3;

  return {
    year,
    quarter: q,
    label: `Q${q} ${year}`,
    revenue: Math.round(annual.revenue * weight * wiggle),
    operatingIncome: Math.round(annual.operatingIncome * weight * wiggle),
    netIncome: Math.round(annual.netIncome * weight * wiggle),
    depreciationAmortization: Math.round(annual.depreciationAmortization * weight * wiggle),
    capex: Math.round(annual.capex * weight * wiggle),
    changeInNWC: Math.round(annual.changeInNWC * weight * wiggle),
    totalAssets: Math.round(annual.totalAssets * (0.9 + seededRandom(seed + 1) * 0.2)),
    totalEquity: Math.round(annual.totalEquity * (0.9 + seededRandom(seed + 2) * 0.2)),
    totalDebt: Math.round(annual.totalDebt * (0.9 + seededRandom(seed + 3) * 0.2)),
    cashAndEquivalents: Math.round(annual.cashAndEquivalents * (0.9 + seededRandom(seed + 4) * 0.2)),
    sharesOutstanding: annual.sharesOutstanding,
    dividends: 0,
  };
}

function generateRiskScore(seed: number, sector: typeof SECTORS[0]): RiskScore {
  return {
    business: Math.round(range(seed + 1, 1.5, 4.5) * 10) / 10,
    financial: Math.round(range(seed + 2, 1.5, 4.5) * 10) / 10,
    management: Math.round(range(seed + 3, 1.5, 4.5) * 10) / 10,
    governance: Math.round(range(seed + 4, 1.5, 4.5) * 10) / 10,
    macro: Math.round(range(seed + 5, 1.5, 4.5) * 10) / 10,
    regulatory: Math.round(range(seed + 6, 1.5, 4.5) * 10) / 10,
  };
}

function generateInputs(seed: number): ValuationInputs {
  return {
    beta: Math.round(range(seed + 1, 0.5, 2.0) * 100) / 100,
    riskFreeRate: 0.043,
    equityRiskPremium: 0.052,
    preTaxCostOfDebt: Math.round(range(seed + 2, 0.035, 0.085) * 1000) / 1000,
    marginalTaxRate: 0.21,
    terminalGrowthRate: Math.round(range(seed + 3, 0.015, 0.035) * 1000) / 1000,
    targetDebtToEquity: Math.round(range(seed + 4, 0.2, 1.2) * 100) / 100,
  };
}

function getCurrentPrice(seed: number, history: FinancialYear[], sector: typeof SECTORS[0]): number {
  const latest = history[history.length - 1];
  const eps = latest.netIncome / latest.sharesOutstanding;
  const pe = sector.multiple * (0.8 + seededRandom(seed + 99) * 0.4);
  return Math.round(eps * pe * 100) / 100;
}

export function generateAnalysis(query: string): StockAnalysis {
  const ticker = query.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5) || 'UNKN';
  const seed = hashString(ticker || 'UNKN');
  const sectorIndex = seed % SECTORS.length;
  const sector = SECTORS[sectorIndex];
  const companyName = generateCompanyName(ticker);

  const years: FinancialYear[] = [];
  for (let i = 0; i < 5; i++) {
    years.push(generateFinancialYear(seed, i, sector));
  }

  const quarters: FinancialYear[] = [];
  for (const y of years) {
    for (let q = 1; q <= 4; q++) {
      quarters.push(generateQuarterly(seed, y.year, q, y));
    }
  }

  return {
    id: ticker.toLowerCase(),
    ticker,
    companyName,
    sector: sector.name,
    currentPrice: getCurrentPrice(seed, years, sector),
    lastUpdated: new Date().toISOString(),
    riskScore: generateRiskScore(seed, sector),
    inputs: generateInputs(seed),
    history: years,
    quarterlyHistory: quarters,
  };
}
