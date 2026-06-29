# Trading Comps — 5-Step Methodology

## Overview

Trading Comps (Comparable Company Analysis) is the most widely used relative valuation method in investment banking. It answers: **"What is this company worth based on what similar companies trade for?"**

## Step 1: Select the Universe

Choose 5-15 comparable companies based on:
- **Industry** (same SIC/NAICS)
- **Size** (market cap ±50%)
- **Growth profile** (revenue growth ±10%)
- **Profitability** (margin ±10%)
- **Geography** (same regional market)

### Sources for Universe

- [[Market-Benchmarks/sector-ev-ebitda]] — sector classification
- [[Data-Layer/finnhub-endpoints]] — Finnhub profile2 for industry/sector

## Step 2: Gather Financial Data

Collect LTM (Last Twelve Months) or most recent fiscal year:
- Revenue, EBITDA, Net Income
- Book Value of Equity
- Shares Outstanding
- Total Debt, Cash & Equivalents

**LTM Calculation:** Most recent fiscal year + trailing quarters
```
LTM Revenue = FY2024 Revenue + Q1 2025 − Q1 2024
```

## Step 3: Calculate Multiples

| Multiple | Formula | Best For |
|----------|---------|----------|
| EV/Revenue | EV / Revenue | Unprofitable companies, startups |
| EV/EBITDA | EV / EBITDA | Profitable, capital-intensive firms |
| EV/EBIT | EV / EBIT | D&A-heavy industries |
| P/E | Price / EPS | Proven profitability |
| P/BV | Price / Book Value | Banks, insurance (asset-heavy) |

Enterprise Value (EV):
```
EV = Market Cap + Total Debt − Cash & Equivalents
```

## Step 4: Normalize and Adjust

- **Remove one-time items** (restructuring charges, asset sales)
- **Cycle-adjust** for commodity/cyclical companies (use normalized EBITDA)
- **Control for size** — small-cap often trades at lower multiples

## Step 5: Derive Valuation Range

```
Target Value = Median Multiple × Target Metric
```

### Example

| Company | EV/EBITDA |
|---------|-----------|
| MSFT | 28.0× |
| ORCL | 25.5× |
| CRM | 26.2× |
| **Median** | **26.2×** |
| ADBE | 31.0× |
| SAP | 22.8× |

**If target EBITDA = $100M:**
```
Implied EV = 26.2 × $100M = $2,620M
Range (25-75 percentile): 24.5×−28.8× → $2,450M−$2,880M
```

## EquiValue Implementation

Planned as a separate tab: **Comps** with:
- Auto-select industry comps (or user-selectable)
- Display multiples grid (Mean, Median, Min, Max)
- Highlight target company vs. set

## Related

- [[Market-Benchmarks/sector-ev-ebitda]] — where the sector averages come from
- [[Market-Benchmarks/precedent-transactions]] — M&A variant
- [[Research-Methods/dcf-vs-comps]] — when to use comps vs. DCF
- [[Research-Methods/football-field]] — visual synthesis
