# Math Engine — Deterministic Fallback

## Purpose

When no Finnhub API key is available or when API calls fail, the math engine generates **deterministic financial data** based on the ticker symbol hash. This allows the app to function fully without any external data source.

## How It Works

```typescript
function generateFinancials(ticker: string): FinancialYear[] {
  const hash = hashString(ticker);  // deterministic → same ticker = same data
  // Sector → derived from hash % number of sectors
  // Revenue → hash-based growth curve over 5 years
  // Margins → sector-specific margin profiles
  // Balance Sheet → sector-specific capital structure
}
```

## Sector Assignment

Each ticker maps deterministically to a sector:

| Sector | Hash Range | Revenue Profile | Net Margin |
|--------|-----------|-----------------|------------|
| Technology | 0-20% | High growth, low initial | 15-25% |
| Healthcare | 20-35% | Stable growth | 10-20% |
| Consumer | 35-50% | Moderate growth | 5-12% |
| Energy | 50-60% | Cyclical | 3-8% |
| Financial | 60-70% | Interest-driven | 10-18% |
| Real Estate | 70-80% | Stable/REIT | 8-15% |
| Manufacturing | 80-90% | Slow growth | 3-8% |
| Utilities | 90-100% | Regulated, stable | 8-12% |

## Generated Output

```typescript
{
  symbol: "AAPL",
  companyName: "AAPL [Simulated]",
  sector: "Technology",
  stockPrice: 178.42,  // hash-based, not real
  financials: [
    {
      year: 2025,
      revenue: 383_285_000_000,
      netIncome: 93_736_000_000,
      operatingCashflow: 110_543_000_000,
      totalAssets: 352_583_000_000,
      totalDebt: 105_416_000_000,
      cashAndEquivalents: 30_999_000_000,
      sharesOutstanding: 15_500_000_000
    },
    // ... 4 more years of data
  ],
  valuation: {
    dcfValue: 195.28,
    wacc: 0.092,
    costOfEquity: 0.104,
  }
}
```

## When It Activates

1. **No API key** — `VITE_FINNHUB_API_KEY` not set or empty
2. **API error** — Finnhub returns 401, 429, or network error
3. **Invalid ticker** — Finnhub returns empty data

## Risk Scores (Planned)

The math engine will also generate deterministic risk scores:

```typescript
function generateRiskScores(ticker: string): RiskScores {
  return {
    altmanZ: 2.5 + (hash % 40) / 10,    // 2.5 – 6.5
    piotroskiF: 4 + (hash % 6),          // 4 – 9
    debtToEquity: hash % 200,            // 0% – 199%
    currentRatio: 1.0 + (hash % 30) / 10 // 1.0 – 4.0
  };
}
```

## Related

- [[Implementation/data-flow-pipeline]] — where math engine fits in the architecture
- [[Implementation/error-handling]] — when fallback triggers
- [[Data-Layer/finnhub-endpoints]] — the real data source
- [[Data-Layer/data-quality]] — data quality gotchas
