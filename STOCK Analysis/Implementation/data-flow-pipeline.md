# Data Flow Pipeline

## Full Architecture

```
User Input (Ticker)
       │
       ▼
┌──────────────────────┐
│  1. SEARCH           │ ← Validates ticker format
│  App.tsx             │    e.g., "AAPL", "MSFT"
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  2. FETCH            │ ← Calls Finnhub API
│  stockApi.ts         │    ├─ /quote (price)
│                      │    ├─ /stock/profile2 (metadata)
│                      │    ├─ /stock/financials-reported (financials)
│                      │    └─ /stock/metric (beta, ratios)
│                      │    ↓
│                      │  On failure → fallback to mathEngine.ts
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  3. TRANSFORM        │ ← Parse GAAP XBRL → typed data
│  stockApi.ts         │    ├─ group by report year
│  → buildPeriod()     │    ├─ concept lookups (revenue, NI, operatingCF)
│                      │    ├─ fallback chain for shares/cash
│                      │    └─ create FinancialYear[]
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  4. CALCULATE        │ ← Core valuation engine
│  valuationUtils.ts   │    ├─ computeDCF()
│                      │    ├─ computeWACC()
│                      │    ├─ computeCostOfEquity()
│                      │    └─ computeScores() (planned)
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  5. STORE            │ ← React state
│  App.tsx             │    └─ stockAnalysis: StockAnalysis | null
│  useState            │       └─ stockPrice, financials, valuation
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  6. RENDER           │ ← UI Components
│  components/         │    ├─ FinancialTable.tsx (annual/quarterly toggle)
│                      │    ├─ StockSearch.tsx (search input)
│                      │    ├─ DcfDisplay.tsx (DCF results)
│                      │    └─ RiskRadar.tsx (planned)
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  7. DEPLOY           │ ← Vercel
│  vercel.json         │    └─ SPA rewrites → index.html
└──────────────────────┘
```

## File Dependencies

```
App.tsx
  ├── services/stockApi.ts
  │     ├── finnhubQuote()
  │     ├── finnhubProfile()
  │     ├── finnhubFinancials() ⬄ mathEngine.ts (fallback)
  │     └── buildPeriod()
  ├── lib/valuationUtils.ts
  │     ├── computeDCF()
  │     ├── computeWACC()
  │     └── computeCostOfEquity()
  ├── components/FinancialTable.tsx
  ├── components/StockSearch.tsx
  └── types.ts

config/
  ├── vercel.json (SPA rewrites)
  ├── vite.config.ts (VITE_ env prefix)
  └── .env (VITE_FINNHUB_API_KEY)
```

## Type Flow

```
fetchFinancials(form10K) → rawReport[]
       ↓
buildPeriod(rawReport[]) → FinancialYear {
  year, revenue, netIncome, operatingCashflow,
  totalAssets, totalDebt, totalEquity, cashAndEquivalents,
  sharesOutstanding, depreciation, capitalExpenditure  // partial
}
       ↓
computeDCF(FinancialYear ×, ValuationInputs) → number (Enterprise Value)
       ↓
StockAnalysis {
  symbol, stockPrice, companyName, sector, marketCap,
  financials: FinancialYear[],
  quarterlyHistory: FinancialYear[],
  valuation: { dcfValue, wacc, ... }
}
```

## Related

- [[Data-Layer/finnhub-endpoints]] — source data
- [[Data-Layer/gaap-concepts]] — the concept mapping within buildPeriod()
- [[Implementation/math-engine]] — what happens when Finnhub fails
- [[Implementation/typescript-types]] — all type definitions
- [[Implementation/error-handling]] — error flow
