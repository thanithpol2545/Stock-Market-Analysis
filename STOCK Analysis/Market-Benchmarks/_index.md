# Market Benchmarks — Petal Hub

## Overview

This petal covers **relative valuation** — using comparable companies and market multiples to derive valuation ranges. This is the primary cross-check for the DCF intrinsic value.

## Leaves

| Leaf | What It Covers | Key Topics |
|------|----------------|------------|
| [[Market-Benchmarks/sector-ev-ebitda\|sector-ev-ebitda]] | EV/EBITDA, EV/Revenue by industry | Damodaran Jan 2026 data, 60+ industries, interpretation |
| [[Market-Benchmarks/pe-ratios\|pe-ratios]] | P/E, P/BV, P/S by sector | Historical averages, cyclically adjusted (CAPE) |
| [[Market-Benchmarks/trading-comps\|trading-comps]] | 5-step investment banking comps process | Universe selection, LTM normalization, multiples derivation |
| [[Market-Benchmarks/precedent-transactions\|precedent-transactions]] | M&A transaction multiples | Control premium, synergy adjustments, illiquidity discount |

## Cross-Petal Connections

| Petal | Connection |
|-------|------------|
| [[Valuation-Core/_index\|Valuation-Core]] | Terminal Value via [[Valuation-Core/terminal-value\|Exit Multiple]] uses sector EV/EBITDA; DCF output vs. comps range → [[Research-Methods/football-field\|football field]] |
| [[Data-Layer/_index\|Data-Layer]] | P/E needs price from [[Data-Layer/finnhub-endpoints\|Finnhub quote]]; book value per share from [[Data-Layer/gaap-concepts\|GAAP concepts]] |
| [[Financial-Health/_index\|Financial-Health]] | Distressed firms attract lower multiples; bankruptcy risk affects comp selection |
| [[Research-Methods/_index\|Research-Methods]] | [[Research-Methods/dcf-vs-comps\|DCF vs Comps]] — when relative value dominates; [[Research-Methods/football-field\|football field]] synthesizes both |
| [[Implementation/_index\|Implementation]] | Multiples displayed in FinancialTable; see [[Implementation/data-flow-pipeline\|Data Flow]] |
