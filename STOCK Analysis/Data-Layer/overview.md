# Data Layer — Petal Hub

## Overview

This petal covers everything about **where EquiValue gets its raw data**. The app uses Finnhub's free API as the primary source, with deterministic fallback via the [[Implementation/math-engine|Math Engine]].

## Leaves

| Leaf | What It Covers | Key Topics |
|------|----------------|------------|
| [[Data-Layer/finnhub-endpoints\|finnhub-endpoints]] | All Finnhub API calls used | `/quote`, `/stock/profile2`, `/stock/financials-reported`, `/stock/metric` |
| [[Data-Layer/gaap-concepts\|gaap-concepts]] | SEC XBRL GAAP concept mapping | Revenue, Net Income, Depreciation, Operating CF — exact tags and fallbacks |
| [[Data-Layer/sec-alternative\|sec-alternative]] | SEC EDGAR as backup source | SEC API, XBRL parsing, comparison with Finnhub |
| [[Data-Layer/data-quality\|data-quality]] | Gotchas, rate limits, sanity checks | 60 calls/min, 20-min price delay, zero-shares fix |

## Cross-Petal Connections

| Petal | Connection |
|-------|------------|
| [[Valuation-Core/overview|Valuation-Core]] | The data from this petal feeds directly into [[Valuation-Core/dcf-implementation\|DCF]], [[Valuation-Core/wacc-theory\|WACC]], and [[Valuation-Core/capm-model\|CAPM]] |
| [[Financial-Health/overview|Financial-Health]] | [[Financial-Health/altman-z-score\|Altman Z]] and [[Financial-Health/piotroski-f-score\|Piotroski F]] depend on specific XBRL concepts (e.g., `us-gaap_RetainedEarningsAccumulatedDeficit`) |
| [[Implementation/overview|Implementation]] | [[Implementation/data-flow-pipeline\|Data Flow Pipeline]] describes the full fetch-transform-render chain |
| [[Quick-Reference/overview|Quick-Reference]] | [[Quick-Reference/constants\|Constants]] has default risk-free rates and ERP values |
