# Altman Z-Score

## Academic Origin

**Altman, E.I. (1968). "Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy." *Journal of Finance*, 23(4), 589-609.**

Edward Altman used **Multiple Discriminant Analysis (MDA)** on 66 firms (33 bankrupt, 33 solvent) from 1946-1965. The methodology was revolutionary — it replaced univariate ratio analysis with a multivariate model.

## Formula (Public Manufacturing)

```
Z = 1.2X₁ + 1.4X₂ + 3.3X₃ + 0.6X₄ + 1.0X₅
```

| Variable | Ratio | What It Measures |
|----------|-------|------------------|
| X₁ | Working Capital / Total Assets | Liquidity |
| X₂ | Retained Earnings / Total Assets | Cumulative profitability |
| X₃ | EBIT / Total Assets | Operating efficiency |
| X₄ | Market Cap / Total Liabilities | Leverage (market-based) |
| X₅ | Revenue / Total Assets | Asset turnover |

## Thresholds (Original Model)

| Z-Score | Zone | Interpretation |
|---------|------|----------------|
| Z > 2.99 | Safe Zone | Low bankruptcy risk (0.5% within 2 years) |
| 1.81 < Z < 2.99 | Grey Zone | Moderate risk — 95% of Altman's sample fell here |
| Z < 1.81 | Distress Zone | High bankruptcy risk (72% accuracy 2 years prior) |

## Z' — Private Manufacturing (1983)

```
Z' = 0.717X₁ + 0.847X₂ + 3.107X₃ + 0.420X₄' + 0.998X₅
```

X₄' = Book Equity / Total Liabilities (removes market cap requirement)

**Thresholds:** Z' > 2.90 (Safe), 1.23-2.90 (Grey), < 1.23 (Distress)

## Z'' — Emerging Markets & Non-Manufacturing (1995)

```
Z'' = 3.25 + 6.56X₁ + 3.26X₂ + 6.72X₃ + 1.05X₄'
```

Drops X₅ (asset turnover) — removes industry bias.

**Thresholds:** Z'' > 2.60 (Safe), 1.10-2.60 (Grey), < 1.10 (Distress)

## Data Gap Status

EquiValue currently has:
- ✅ Total Assets
- ✅ Total Liabilities  
- ✅ EBIT (Operating Income)
- ✅ Revenue
- ✅ Market Cap (price × shares)
- ❌ **Retained Earnings** — not in FinancialYear yet
- ❌ **Current Assets / Current Liabilities** — not in FinancialYear yet

→ Current approximation: Working capital = Total Assets − Total Debt (underestimates X₁)

## Implementation Priority

1. Add `retainedEarnings`, `currentAssets`, `currentLiabilities` to [[Implementation/typescript-types\|FinancialYear]]
2. Compute Z, Z', Z'' in `valuationUtils.ts`
3. Display in [[Financial-Health/risk-radar\|Risk Radar]] with color thresholds

## Academic References

- Altman, E.I. (1968). *Journal of Finance* — original paper
- Altman, E.I., Hartzell, J. & Peck, M. (1995). "Emerging Markets Corporate Bonds: A Scoring System." — Z'' model
- Altman, E.I. (2000). "Predicting Financial Distress of Companies: Revisiting the Z-Score and ZETA® Models."

## Related

- [[Financial-Health/piotroski-f-score]] — complementary quality score
- [[Data-Layer/gaap-concepts]] — the XBRL tags needed for each ratio
- [[Financial-Health/overview]] — back to hub
