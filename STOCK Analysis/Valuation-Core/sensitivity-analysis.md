# Sensitivity Analysis

## Purpose

DCF is a point estimate. Sensitivity analysis shows **how value changes when assumptions change** — revealing which inputs matter most.

## The WACC × Growth Matrix

The most common sensitivity table:

```
         │  WACC
─────────┼──────────────────────────
Terminal │  7.0%   7.5%   8.0%   8.5%
Growth   │
─────────┼──────────────────────────
  2.0%   │ $158   $142   $129   $118
  2.5%   │ $175   $155   $139   $126
  3.0%   │ $197   $171   $151   $136
  3.5%   │ $228   $192   $167   $148
```

## Tornado Chart

A bar chart showing the range of values when each input varies ±1 standard deviation:

```
WACC (±1%)         ████████████░░░░░░░░░░  $120—$195
Growth (±0.5%)     ██████████░░░░░░░░░░░   $130—$185
FCF (±10%)         ████████░░░░░░░░░░░░░   $140—$175
Shares (±5%)       ████░░░░░░░░░░░░░░░░░   $152—$163
```

## Implementation

EquiValue's sensitivity module (planned):

```typescript
type SensitivityResult = {
  wacc: number;
  growth: number;
  value: number;
}[];

function buildSensitivityMatrix(
  baseFcf: number,
  baseWacc: number,
  baseGrowth: number,
  waccRange: [number, number, number], // min, max, step
  growthRange: [number, number, number]
): SensitivityResult {
  const results: SensitivityResult = [];
  for (let w = waccRange[0]; w <= waccRange[1]; w += waccRange[2]) {
    for (let g = growthRange[0]; g <= growthRange[1]; g += growthRange[2]) {
      const ev = computeDCF({ fcf: baseFcf, wacc: w, terminalGrowthRate: g, ... });
      results.push({ wacc: w, growth: g, value: ev });
    }
  }
  return results;
}
```

## Visualization

- **Heat map table** (WACC × Growth) — planned with Recharts
- **Tornado chart** (single-variable sensitivity) — planned
- Located in [[Research-Methods/football-field]] as part of the synthesis view

## Related

- [[Valuation-Core/dcf-implementation]] — the DCF being sensitivity-tested
- [[Valuation-Core/terminal-value]] — the most sensitive input
- [[Research-Methods/football-field]] — where sensitivity is visualized alongside other methods
- [[Quick-Reference/formulas]] — formula reference
