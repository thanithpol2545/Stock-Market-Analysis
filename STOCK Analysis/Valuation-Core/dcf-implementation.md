# DCF Implementation

## Formula

```
Enterprise Value = Σ [FCFₜ / (1 + WACC)ᵗ] + TV / (1 + WACC)ⁿ
```

**Intrinsic Value per Share** = `(Enterprise Value − Net Debt) / Shares Outstanding`

Where:
- **FCFₜ** = Free Cash Flow in year t
- **WACC** = Weighted Average Cost of Capital (see [[Valuation-Core/wacc-theory]])
- **TV** = Terminal Value (see [[Valuation-Core/terminal-value]])
- **n** = Projection period (typically 5 years)
- **Net Debt** = Total Debt − Cash & Equivalents

## Free Cash Flow to Firm (FCFF)

```
FCFF = Operating Income × (1 − Tax Rate) + D&A − CapEx − Δ Working Capital
```

In EquiValue (simplified for GAAP available data):
```
FCF = OperatingCF − CapEx
```

Where:
- **OperatingCF** = `us-gaap_NetCashProvidedByUsedInOperatingActivities` (see [[Data-Layer/gaap-concepts]])
- **CapEx** = `us-gaap_PaymentsToAcquirePropertyPlantAndEquipment`

## Step-by-Step DCF Process

### Step 1: Compute WACC
See [[Valuation-Core/wacc-theory]] and [[Valuation-Core/capm-model]].

### Step 2: Normalize FCF
Take the most recent year's FCF. If volatile, use 3-year average.

### Step 3: Forecast FCF
Apply growth rate for projection period:
```
FCFₜ = FCF₀ × (1 + g)ᵗ
```

For high-growth companies, use a 2-stage model:
- Stage 1 (years 1-5): high growth (e.g., 10-20%)
- Stage 2 (terminal): stable growth (≤ GDP growth)

### Step 4: Discount Cash Flows
```
PV(FCFₜ) = FCFₜ / (1 + WACC)ᵗ
```

### Step 5: Compute Terminal Value
See [[Valuation-Core/terminal-value]] for both methods.

### Step 6: Enterprise Value
Sum of discounted FCFs + discounted TV.

### Step 7: Equity Value
```
Equity Value = Enterprise Value − Total Debt + Cash & Equivalents
```

### Step 8: Per-Share Value
```
Intrinsic Value = Equity Value / Shares Outstanding
```

## Current EquiValue Implementation

```typescript
function computeDCF(params: ValuationInputs): number {
  const { fcf, growthRate, wacc, terminalGrowthRate, projectionYears } = params;

  let pvFcf = 0;
  for (let t = 1; t <= projectionYears; t++) {
    const fcfT = fcf * Math.pow(1 + growthRate, t);
    pvFcf += fcfT / Math.pow(1 + wacc, t);
  }

  const terminalFcf = fcf * Math.pow(1 + growthRate, projectionYears) * (1 + terminalGrowthRate);
  const terminalValue = terminalFcf / (wacc - terminalGrowthRate);
  const pvTv = terminalValue / Math.pow(1 + wacc, projectionYears);

  return pvFcf + pvTv; // Enterprise Value
}
```

## Sensitivity Analysis

DCF is highly sensitive to:
1. **Terminal growth rate** (gₜ) — see [[Valuation-Core/terminal-value]] (TV often = 60-80% of EV)
2. **WACC** — 1% change in WACC ≈ 10-15% change in EV
3. **FCF growth rate** (stage 1) — especially for young companies

See [[Valuation-Core/sensitivity-analysis]] for the matrix approach.

## Common Pitfalls

- **Terminal value dominance:** If TV > 80% of EV, the DCF is not meaningful
- **Negative FCF:** Use revenue-multiple method instead; see [[Research-Methods/dcf-vs-comps]]
- **Circularity:** WACC depends on D/E, which depends on market cap, which is the output

## Related

- [[Market-Benchmarks/trading-comps]] — cross-check DCF with comparable analysis
- [[Research-Methods/football-field]] — visualizing DCF alongside other methods
- [[Implementation/typescript-types]] — ValuationInputs type
