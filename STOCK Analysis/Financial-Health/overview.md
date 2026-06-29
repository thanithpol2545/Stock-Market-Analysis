# Financial Health — Petal Hub

## Overview

This petal covers **financial health assessment** — quantitative bankruptcy prediction and quality scoring. These scores are displayed in EquiValue's Risk Radar tab alongside WACC components.

## Leaves

| Leaf | What It Covers | Key Topics |
|------|----------------|------------|
| [[Financial-Health/altman-z-score\|altman-z-score]] | Altman Z-Score (1968) | Formula, Z' (private), Z'' (emerging markets), thresholds, cutting scores |
| [[Financial-Health/piotroski-f-score\|piotroski-f-score]] | Piotroski F-Score (2000) | 9 binary criteria, profitability/leverage/efficiency, 23% annual outperformance |
| [[Financial-Health/risk-radar\|risk-radar]] | EquiValue risk visualization | Radar chart design, score aggregation, color thresholds |

## Cross-Petal Connections

| Petal | Connection |
|-------|------------|
| [[Data-Layer/overview|Data-Layer]] | Z-score needs `retainedEarnings`, `currentAssets`, `currentLiabilities` from [[Data-Layer/gaap-concepts\|GAAP concepts]]; F-score needs `operatingCashFlow`, `grossProfit`, `totalAssets` |
| [[Valuation-Core/overview|Valuation-Core]] | Financial health feeds into **discount rate adjustment** — distressed firms → higher WACC; see [[Valuation-Core/wacc-theory]] |
| [[Market-Benchmarks/overview|Market-Benchmarks]] | Bankruptcy rates vary by sector — default spreads from [[Market-Benchmarks/sector-ev-ebitda\|sector data]] |
| [[Research-Methods/overview|Research-Methods]] | Distressed firms → asset-based valuation; see [[Research-Methods/lbo-and-sotp\|SOTP and LBO]] |
| [[Implementation/overview|Implementation]] | Scores computed in `valuationUtils.ts`; see [[Implementation/data-flow-pipeline\|Data Flow]] |
