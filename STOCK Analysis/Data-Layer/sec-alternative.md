# SEC EDGAR Alternative

## Why SEC EDGAR?

Finnhub's free tier has a 60 calls/min limit. For batch processing or when rate-limited, SEC's own EDGAR API provides unlimited access.

## SEC REST API

**Base URL:** `https://data.sec.gov/api/`

**CIK-to-Ticker:** `https://www.sec.gov/files/company_tickers.json`

```json
{
  "AAPL": {"cik": 320193, "title": "Apple Inc."},
  "MSFT": {"cik": 789019, "title": "Microsoft Corp"}
}
```

**Company Facts:** `https://data.sec.gov/api/xbrl/companyfacts/CIK0000320193.json`

This returns all XBRL facts the company has ever reported — the same data Finnhub's `financials-reported` endpoint returns, but unfiltered.

## XBRL vs. Reported

SEC EDGAR returns **raw XBRL facts** (every single disclosure), while Finnhub pre-groups them by report. SEC data requires more parsing but is more complete.

## Comparison

| Aspect | Finnhub | SEC EDGAR |
|--------|---------|-----------|
| Rate Limit | 60/min | No formal limit (be polite) |
| Data Format | Pre-grouped by report | Raw XBRL facts |
| Coverage | Same SEC source | Same SEC source |
| Ease of Use | Easy (free tier) | Needs custom parsing |
| Latency | Faster (CDN) | Direct SEC servers |

## Implementation Priority

We use Finnhub first, with EDGAR as a potential future backup. The [[Implementation/math-engine|Math Engine]] provides the zero-dependency fallback.

## Related

- [[Data-Layer/finnhub-endpoints]] — primary data source
- [[Data-Layer/gaap-concepts]] — understanding the XBRL tags
- [[Implementation/data-flow-pipeline]] — data transformation chain
