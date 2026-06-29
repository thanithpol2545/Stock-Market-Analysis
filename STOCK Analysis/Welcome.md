# EquiValue — Obsidian Knowledge Flower

## 🌸 The Flower Topology

```
                        ┌──────────────────┐
                        │   QUICK-REF      │
                        │  formulas/gloss  │
                        └────────┬─────────┘
                                 │
     ┌────────────┐    ┌────────┴────────┐    ┌───────────────┐
     │ DATA-LAYER │◄──►│     FLOWER      │◄──►│ VALUATION-    │
     │ API/GAAP   │    │    CENTER       │    │ CORE          │
     │ endpoints  │◄──►│  Welcome + Map  │◄──►│ WACC/CAPM/DCF │
     └────────────┘    └────────┬────────┘    └───────────────┘
                                 │
     ┌────────────┐    ┌────────┴────────┐    ┌───────────────┐
     │ FINANCIAL- │◄──►│   MARKET-       │◄──►│ RESEARCH-     │
     │ HEALTH     │    │   BENCHMARKS    │    │ METHODS       │
     │ Z/F-Score  │◄──►│   multiples     │◄──►│ 10 methods    │
     └────────────┘    └────────┬────────┘    └───────────────┘
                                 │
                        ┌────────┴────────┐
                        │ IMPLEMENTATION  │
                        │ data flow/types │
                        │ math engine     │
                        └─────────────────┘
```

## The 7 Petals

| # | Petal | Focus | Key Files |
|---|-------|-------|-----------|
| 1 | [[Data-Layer/overview|Data-Layer]] | Finnhub API, SEC XBRL, GAAP concepts | `finnhub-endpoints`, `gaap-concepts`, `sec-alternative`, `data-quality` |
| 2 | [[Valuation-Core/overview|Valuation-Core]] | WACC, CAPM, DCF, Terminal Value | `wacc-theory`, `capm-model`, `dcf-implementation`, `terminal-value`, `sensitivity-analysis` |
| 3 | [[Financial-Health/overview|Financial-Health]] | Bankruptcy & Quality Scores | `altman-z-score`, `piotroski-f-score`, `risk-radar` |
| 4 | [[Market-Benchmarks/overview|Market-Benchmarks]] | Sector Multiples, Trading Comps | `sector-ev-ebitda`, `pe-ratios`, `trading-comps`, `precedent-transactions` |
| 5 | [[Research-Methods/overview|Research-Methods]] | 10 Institutional Methods | `institutional-overview`, `dcf-vs-comps`, `lbo-and-sotp`, `football-field` |
| 6 | [[Implementation/overview|Implementation]] | Code Architecture, Fallback | `data-flow-pipeline`, `math-engine`, `typescript-types`, `error-handling` |
| 7 | [[Quick-Reference/overview|Quick-Reference]] | Formulas, Defaults, Glossary | `formulas`, `constants`, `glossary` |

## How to Navigate

- Each petal has a `overview.md` (hub) that lists its leaves and connects to other petals
- Each leaf file links to its hub, sibling leaves, and related leaves in other petals
- Open **Graph View** (Cmd+Shift+G) to see the full flower

---

## Project Essence

**EquiValue** is a deployable Vite/React stock valuation app that:
- Fetches real data from Finnhub free API (60 calls/min)
- Falls back to a deterministic math engine when offline
- Computes intrinsic value via DCF (Discounted Cash Flow)
- Displays risk radar, financial tables, sensitivity matrices
- Deploys to Vercel with SPA rewrites

**Codebase:** `D:\Project\Finance\Stock-Market-Analysis\`

---

*"Valuation is not a number — it is an argument supported by evidence." — Damodaran*
