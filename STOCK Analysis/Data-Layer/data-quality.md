# Data Quality — Gotchas & Sanity Checks

## Known Gotchas

### 1. Zero Shares Outstanding
**Problem:** `us-gaap_CommonStockSharesOutstanding` returns `null` for some companies (e.g., INTC)
**Fix (3-tier fallback):**
1. GAAP concept → `commonStockSharesOutstanding`
2. Profile endpoint → `profile.shareOutstanding`
3. Math engine → deterministic hash-based value

### 2. Cash Concept Variability
**Problem:** Some companies report cash under `us-gaap_CashAndCashEquivalentsAtCarryingValue`, others under the longer `us-gaap_CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents`
**Fix:** Try both in order; see [[Data-Layer/gaap-concepts]] for fallback chain

### 3. Price Delay on Free Tier
**Problem:** Finnhub free tier has ~20-min price delay
**Fix:** Acceptable for DCF-based intrinsic valuation; flag in UI with "(delayed)" indicator

### 4. Negative Free Cash Flow
**Problem:** High-growth companies often have negative FCF → DCF produces negative intrinsic value
**Fix:** Display warning; recommend revenue-multiple method instead; see [[Research-Methods/dcf-vs-comps]]

### 5. Missing Retained Earnings
**Problem:** Some companies don't report `us-gaap_RetainedEarningsAccumulatedDeficit` in every period
**Impact:** Altman Z-score needs retained earnings for X₂. Missing data disables Z-score.

## Sanity Checks

| Check | Rule | Action |
|-------|------|--------|
| Price ≥ 0 | Must be positive | Use 0, show error indicator |
| Market Cap ≥ 0 | Computed: price × shares | Must match basic-financials |
| Revenue ≥ 0 | Must be positive, non-zero | Use math engine fallback |
| Total Assets ≥ 0 | Must be positive | Reject if negative |
| Debt ≠ Missing | Try multiple concepts | Default to 0 if truly missing |
| Equity ≠ Negative | Allowed (distressed firms) | Forward to Altman Z as warning |
| Cash ≤ Total Assets | Sanity check | Cap at Total Assets if exceeded |

## Rate Limit Strategy

```typescript
// Pseudocode for rate-limit-safe fetching
async function safeFetch(symbol: string) {
  await rateLimiter.wait();     // 1 call / 1 second
  const quote = await fetchQuote(symbol);
  const profile = await fetchProfile(symbol);   // Cached for session
  const financials = await fetchFinancials(symbol);
  return { quote, profile, financials };
}
```

## Related

- [[Implementation/error-handling]] — full error handling strategy
- [[Implementation/data-flow-pipeline]] — data flow with validation stages
