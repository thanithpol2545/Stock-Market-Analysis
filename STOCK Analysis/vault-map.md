# Vault Map — Navigation Guide

## Graph Topology

This vault uses a **flower topology**: one center, 7 petals, each petal with 3-5 leaves. Every leaf connects to its hub, adjacent leaves, and at least one leaf from every other petal.

## Connection Density

| Petal | Hub | Leaves | Cross-Petal Links |
|-------|-----|--------|-------------------|
| [[Data-Layer/_index\|Data-Layer]] | `Data-Layer/_index` | finnhub-endpoints, gaap-concepts, sec-alternative, data-quality | → Valuation (input data), → Health (financial statements) |
| [[Valuation-Core/_index\|Valuation-Core]] | `Valuation-Core/_index` | wacc-theory, capm-model, dcf-implementation, terminal-value, sensitivity-analysis | → Data (inputs), → Benchmarks (cross-check) |
| [[Financial-Health/_index\|Financial-Health]] | `Financial-Health/_index` | altman-z-score, piotroski-f-score, risk-radar | → Data (financials), → Benchmarks (sector context) |
| [[Market-Benchmarks/_index\|Market-Benchmarks]] | `Market-Benchmarks/_index` | sector-ev-ebitda, pe-ratios, trading-comps, precedent-transactions | → Research (DCF vs Comps), → Valuation (cross-check) |
| [[Research-Methods/_index\|Research-Methods]] | `Research-Methods/_index` | institutional-overview, dcf-vs-comps, lbo-and-sotp, football-field | → Valuation (methods), → Benchmarks (multiples) |
| [[Implementation/_index\|Implementation]] | `Implementation/_index` | data-flow-pipeline, math-engine, typescript-types, error-handling | → Data (API), → Valuation (calculation) |
| [[Quick-Reference/_index\|Quick-Reference]] | `Quick-Reference/_index` | formulas, constants, glossary | → ALL petals (reference layer) |

## Reading Order by Role

**New to valuation:** Welcome → Data-Layer → Valuation-Core → Market-Benchmarks → Financial-Health → Research-Methods

**Developer integrating EquiValue:** Welcome → Implementation → Data-Layer → Valuation-Core → Quick-Reference

**Investor wanting methodology:** Welcome → Research-Methods → Valuation-Core → Market-Benchmarks → Financial-Health

## File Count

- 7 petal hubs (`_index.md`)
- 24 leaf files
- 2 center files (Welcome, vault-map)
- **Total: 33 files**, 150+ cross-links
