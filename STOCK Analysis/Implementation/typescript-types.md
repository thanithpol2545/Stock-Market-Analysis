# TypeScript Types

## Core Types

### FinancialYear

```typescript
interface FinancialYear {
  year: number;
  revenue: number;
  netIncome: number;
  operatingIncome: number;          // EBIT (for Z-score X₃)
  operatingCashflow: number;        // for FCF, F-score
  totalAssets: number;
  totalDebt: number;
  totalEquity: number;
  cashAndEquivalents: number;
  sharesOutstanding: number;
  depreciation: number;
  capitalExpenditure: number;

  // ⬇️ PLANNED ADDITIONS (for Altman Z + Piotroski F)
  retainedEarnings?: number;        // Z-score X₂
  currentAssets?: number;           // Z-score X₁, F-score #6
  currentLiabilities?: number;      // Z-score X₁, F-score #6
  grossProfit?: number;             // F-score #8
}
```

### StockAnalysis

```typescript
interface StockAnalysis {
  symbol: string;
  stockPrice: number;
  companyName: string;
  sector: string;
  marketCap: number;
  financials: FinancialYear[];         // Annual
  quarterlyHistory: FinancialYear[];   // Quarterly
  valuation: ValuationResult;
  scores?: RiskScores;                // (planned)
}
```

### ValuationInputs

```typescript
interface ValuationInputs {
  fcf: number;
  growthRate: number;           // Stage 1 growth (default: 0.08)
  wacc: number;                 // Computed from computeWACC()
  terminalGrowthRate: number;   // Stage 2 growth (default: 0.025)
  projectionYears: number;      // Default: 5
}
```

### ValuationResult

```typescript
interface ValuationResult {
  enterpriseValue: number;
  equityValue: number;
  dcfValue: number;              // Per-share intrinsic value
  wacc: number;
  costOfEquity: number;
  sensitivityMatrix?: number[][]; // (planned)
}
```

### RiskScores (Planned)

```typescript
interface RiskScores {
  altmanZ: number;              // 0-5+ (bankruptcy risk)
  piotroskiF: number;           // 0-9 (quality score)
  debtToEquity: number;        // Leverage ratio
  currentRatio: number;        // Liquidity (when data available)
  netMargin: number;           // Profitability ratio
  assetTurnover: number;       // Efficiency ratio
}
```

## Type Guards

```typescript
function isValidFinancialYear(fy: any): fy is FinancialYear {
  return fy && typeof fy.revenue === 'number' && typeof fy.totalAssets === 'number';
}
```

## Related

- [[Implementation/data-flow-pipeline]] — how types flow through the app
- [[Data-Layer/gaap-concepts]] — how raw XBRL maps to these fields
- [[Financial-Health/altman-z-score]] — why retainedEarnings/currentAssets/currentLiabilities are needed
- [[Financial-Health/piotroski-f-score]] — why operatingCashflow/grossProfit are needed
