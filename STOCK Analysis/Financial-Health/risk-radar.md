# Risk Radar

## Overview

The Risk Radar is EquiValue's visual dashboard for financial health. It aggregates multiple risk dimensions into a single radar/spider chart.

## Dimensions

| Axis | Source | Range | Color |
|------|--------|-------|-------|
| Altman Z | [[Financial-Health/altman-z-score\|Z-Score computation]] | 0-5+ | Green ≥ 3.0, Yellow 1.8-3.0, Red < 1.8 |
| Piotroski F | [[Financial-Health/piotroski-f-score\|F-Score computation]] | 0-9 | Green ≥ 7, Yellow 4-6, Red ≤ 3 |
| Profitability | Net Margin (Net Income / Revenue) | % | Industry-relative |
| Leverage | Debt / Equity ratio | 0-5+ | Green < 1.0, Yellow 1.0-3.0, Red > 3.0 |
| Liquidity | Current Ratio (when available) | 0-5+ | Green > 2.0, Yellow 1.0-2.0, Red < 1.0 |
| Efficiency | Asset Turnover (Revenue / Assets) | 0-3+ | Industry-relative |

## Color Threshold System

```
Green Zone  → Low risk
Yellow Zone → Moderate risk (needs attention)
Red Zone    → High risk (warning)
```

## Implementation Plan

```typescript
type RiskRadarData = {
  axis: string;
  value: number;
  min: number;
  max: number;
  color: 'green' | 'yellow' | 'red';
}[];

function buildRiskRadar(scores: RiskScores): RiskRadarData {
  return [
    { axis: 'Altman Z', value: scores.zScore, min: 0, max: 5, color: zColor(scores.zScore) },
    { axis: 'Piotroski F', value: scores.fScore, min: 0, max: 9, color: fColor(scores.fScore) },
    { axis: 'Leverage', value: scores.debtToEquity, min: 0, max: 5, color: levColor(scores.debtToEquity) },
    // ...
  ];
}
```

## UI Design

- **Recharts Radar Chart** — 6 axes, filled area with color gradient
- **Tooltips** — show exact values and thresholds on hover
- **Score Cards** — below the chart: Z-score (numeric), F-score (numeric), overall assessment

### Assessment Labels

| Overall Score | Label |
|---------------|-------|
| 4-6 axes green | ⭐ Strong |
| 3-4 axes green | ✅ Moderate |
| 1-2 axes green | ⚠️ Cautious |
| 0 axes green | 🚨 Distressed |

## Related

- [[Financial-Health/overview]] — back to hub
- [[Implementation/data-flow-pipeline]] — scores pipeline
- [[Implementation/typescript-types]] — RiskScore type
- [[Valuation-Core/wacc-theory]] — discount rate adjustment for distressed firms
