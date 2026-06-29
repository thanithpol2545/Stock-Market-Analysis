# Implementation — Petal Hub

## Overview

This petal covers the **actual code architecture** of EquiValue — how data flows through the app, the math engine fallback, TypeScript types, and the error handling strategy.

## Leaves

| Leaf | What It Covers | Key Topics |
|------|----------------|------------|
| [[Implementation/data-flow-pipeline\|data-flow-pipeline]] | Full architecture diagram | Search → Fetch → Transform → Calculate → Render, 7 stages |
| [[Implementation/math-engine\|math-engine]] | Deterministic fallback system | Hash-based financials, sector assignment, price generation |
| [[Implementation/typescript-types\|typescript-types]] | Type definitions | FinancialYear, StockAnalysis, ValuationInputs, RiskScores |
| [[Implementation/error-handling\|error-handling]] | Failover strategy | 3-tier fallback, error boundaries, user feedback |

## Cross-Petal Connections

| Petal | Connection |
|-------|------------|
| [[Data-Layer/overview|Data-Layer]] | Implementation fetches from Finnhub via [[Data-Layer/finnhub-endpoints\|endpoints]]; transforms [[Data-Layer/gaap-concepts\|GAAP concepts]] into typed data |
| [[Valuation-Core/overview|Valuation-Core]] | `valuationUtils.ts` implements [[Valuation-Core/dcf-implementation\|DCF]], [[Valuation-Core/wacc-theory\|WACC]], [[Valuation-Core/capm-model\|CAPM]] |
| [[Financial-Health/overview|Financial-Health]] | Score computation functions (future) in `valuationUtils.ts` |
| [[Market-Benchmarks/overview|Market-Benchmarks]] | Multiples comparison with sector data |
| [[Quick-Reference/overview|Quick-Reference]] | [[Quick-Reference/constants\|Constants]] used as defaults in math engine |
