# Valuation Core — Petal Hub

## Overview

The heart of EquiValue. This petal covers **intrinsic valuation** — the DCF framework and all its components (WACC, CAPM, Terminal Value, Sensitivity Analysis).

## Leaves

| Leaf | What It Covers | Key Topics |
|------|----------------|------------|
| [[Valuation-Core/wacc-theory\|wacc-theory]] | Weighted Average Cost of Capital | E/V, D/V, Kₑ, Kₐ, tax shield, Modigliani-Miller |
| [[Valuation-Core/capm-model\|capm-model]] | Capital Asset Pricing Model | Rf, β, ERP, Sharpe-Lintner-Mossin, Damodaran |
| [[Valuation-Core/dcf-implementation\|dcf-implementation]] | DCF step-by-step | FCF forecasting, discounting, terminal value integration |
| [[Valuation-Core/terminal-value\|terminal-value]] | Terminal value methods | Gordon Growth, Exit Multiple, TV-to-Enterprise Value ratio problem |
| [[Valuation-Core/sensitivity-analysis\|sensitivity-analysis]] | Matrix methodology | WACC × growth rate grid, tornado charts |

## Cross-Petal Connections

| Petal | Connection |
|-------|------------|
| [[Data-Layer/overview|Data-Layer]] | WACC needs risk-free rate from [[Quick-Reference/constants\|constants]]; CAPM needs beta from [[Data-Layer/finnhub-endpoints\|Finnhub metrics]]; DCF needs FCF data from [[Data-Layer/gaap-concepts\|GAAP concepts]] |
| [[Market-Benchmarks/overview|Market-Benchmarks]] | Terminal Value via exit multiple uses [[Market-Benchmarks/sector-ev-ebitda\|sector EV/EBITDA]]; DCF cross-check against [[Market-Benchmarks/trading-comps\|trading comps]] |
| [[Financial-Health/overview|Financial-Health]] | [[Financial-Health/risk-radar\|Risk Radar]] visualizes WACC components; high risk → higher discount rate |
| [[Research-Methods/overview|Research-Methods]] | [[Research-Methods/institutional-overview\|Institutional Overview]] compares DCF vs 9 other methods; [[Research-Methods/dcf-vs-comps\|DCF vs Comps]] explains when each is appropriate |
| [[Implementation/overview|Implementation]] | [[Implementation/data-flow-pipeline\|Data Flow Pipeline]] shows the calculation chain; [[Implementation/typescript-types\|TypeScript types]] define ValuationInputs |
