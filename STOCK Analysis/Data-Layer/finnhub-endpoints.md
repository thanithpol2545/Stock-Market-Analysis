# Finnhub Endpoints

## Endpoint Summary

| Endpoint | Path | Used For | Free Tier |
|----------|------|----------|-----------|
| Quote | `/quote?symbol={SYM}` | Current price, daily change | ✅ Yes (~20min delay) |
| Profile2 | `/stock/profile2?symbol={SYM}` | Company name, sector, shares outstanding | ✅ Yes |
| Financials Reported | `/stock/financials-reported?symbol={SYM}&freq=annual` | Full SEC XBRL financials (ic, bs, cf) | ✅ Yes |
| Financials Reported | `/stock/financials-reported?symbol={SYM}&freq=quarterly` | Quarterly SEC XBRL data | ✅ Yes |
| Basic Financials | `/stock/metric?symbol={SYM}&metric=all` | Market cap, beta, 52W high/low, P/E | ✅ Yes |

## Quote Endpoint

```json
{
  "c": 185.32,   // Current price
  "d": 1.25,     // Change
  "dp": 0.68,    // Percent change
  "h": 186.50,   // High of the day
  "l": 183.90,   // Low of the day
  "o": 184.10,   // Open
  "pc": 184.07,  // Previous close
  "t": 1719788400 // Timestamp (Unix)
}
```

**Gotcha:** Free tier has ~20-min delay on quote data. This is acceptable for fundamental DCF analysis (not day trading).

## Financials Reported — Why This Endpoint

We use `financials-reported` instead of `stock/financials` because the latter is **not available on the free tier**. The reported endpoint returns raw SEC XBRL data:

```json
{
  "data": [
    {
      "symbol": "AAPL",
      "cik": "0000320193",
      "accessNumber": "0000320193-24-000108",
      "year": 2024,
      "quarter": 3,
      "report": {
        "ic": [
          {"concept": "us-gaap_RevenueFromContractWithCustomerExcludingAssessedTax", "label": "Revenue", "unit": "USD", "value": 85770000000},
          ...
        ],
        "bs": [...],
        "cf": [...]
      }
    }
  ]
}
```

## Build Period Logic

We group reports by year, merging quarterly into annual totals where needed. See [[Implementation/data-flow-pipeline]] for the exact transformation.

## Rate Limits

- 60 API calls/minute (free tier)
- Key optimization: cache profile data, only refresh quote and metrics
- See [[Data-Layer/data-quality]] for the rate-limit-safe fetch pattern

## Related

- [[Data-Layer/gaap-concepts]] — details on each XBRL concept tag and fallback order
- [[Data-Layer/sec-alternative]] — backing up with SEC EDGAR when Finnhub rate-limits
- [[Data-Layer/_index]] — back to Data-Layer hub
