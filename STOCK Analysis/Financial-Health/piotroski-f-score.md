# Piotroski F-Score

## Academic Origin

**Piotroski, J.D. (2000). "Value Investing: The Use of Historical Financial Statement Information to Separate Winners from Losers." *Journal of Accounting Research*, 38, 1-41.**

Joseph Piotroski developed the F-Score to identify fundamentally strong firms within the universe of **high book-to-market (value) stocks**. The strategy generated a **23% annual return** over the sample period (1976-1996).

## Methodology

The F-Score is the sum of 9 binary criteria (1 = passes, 0 = fails). Maximum score = 9.

### Category 1: Profitability (4 points)

| # | Criterion | Pass Condition | XBRL Concept |
|---|-----------|----------------|--------------|
| 1 | Return on Assets (ROA) | Net Income > 0 | `us-gaap_NetIncomeLoss` / `us-gaap_Assets` |
| 2 | Operating Cash Flow (OCF) | OCF > 0 | `us-gaap_NetCashProvidedByUsedInOperatingActivities` |
| 3 | Accruals Quality | OCF > Net Income | Accrual = NI − OCF — negative accruals are better |
| 4 | Change in ROA | Current ROA > Prior ROA | Δ(NetIncome / TotalAssets) > 0 |

### Category 2: Leverage & Liquidity (3 points)

| # | Criterion | Pass Condition | XBRL Concept |
|---|-----------|----------------|--------------|
| 5 | Change in Leverage | Long-term Debt ratio decreased | Δ(LTDebt / TotalAssets) < 0 |
| 6 | Change in Liquidity | Current ratio increased | Δ(CurrentAssets / CurrentLiabilities) > 0 |
| 7 | No Equity Dilution | No new shares issued | Δ(sharesOutstanding) ≤ 0 or small increase |

### Category 3: Operating Efficiency (2 points)

| # | Criterion | Pass Condition | XBRL Concept |
|---|-----------|----------------|--------------|
| 8 | Gross Margin Improvement | Current GM > Prior GM | Δ(Revenue − COGS) / Revenue > 0 |
| 9 | Asset Turnover Improvement | Current Turnover > Prior Turnover | Δ(Revenue / TotalAssets) > 0 |

## Interpretation

| F-Score | Interpretation | Expected Return (Piotroski 2000) |
|---------|----------------|----------------------------------|
| 8-9 | Strong fundamentals | +13.4% annual (value portfolio) |
| 6-7 | Moderate | Market-level returns |
| 0-3 | Weak | −9.6% annual |

## Data Gap Status

EquiValue currently has:
- ✅ Net Income (from income statement)
- ✅ Revenue (from income statement)
- ✅ Total Assets (from balance sheet)
- ✅ Total Debt (from balance sheet)
- ✅ Shares Outstanding (from BS/profile)
- ❌ **Operating Cash Flow** — not in FinancialYear yet
- ❌ **Current Assets / Current Liabilities** — not in FinancialYear yet
- ❌ **COGS / Gross Profit** — not in FinancialYear yet
- ❌ **Prior-year data** — needs year-over-year comparison

## Implementation Priority

1. Add `operatingCashFlow`, `grossProfit`, `currentAssets`, `currentLiabilities` to [[Implementation/typescript-types\|FinancialYear]]
2. Compute all 9 binary criteria in `valuationUtils.ts`
3. Display in [[Financial-Health/risk-radar\|Risk Radar]]

## Academic References

- Piotroski, J.D. (2000). *Journal of Accounting Research* — original paper
- Piotroski, J.D. (2005). "Further Evidence on the Relation between Historical Changes in Financial Statement Items and Future Operating Performance."

## Related

- [[Financial-Health/altman-z-score]] — complementary bankruptcy prediction
- [[Data-Layer/gaap-concepts]] — XBRL tags needed for F-score
- [[Financial-Health/risk-radar]] — visualization of both scores
