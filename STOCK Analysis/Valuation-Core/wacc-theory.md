# WACC Theory

## Formula

```
WACC = (E/V) × Kₑ + (D/V) × Kₐ × (1 − T)
```

Where:
- **E/V** = Equity / (Equity + Debt) = market weight of equity
- **D/V** = Debt / (Equity + Debt) = market weight of debt
- **Kₑ** = Cost of equity (via CAPM) — see [[Valuation-Core/capm-model]]
- **Kₐ** = Cost of debt (pre-tax) — typically YTM on bonds
- **T** = Tax rate (effective marginal rate)

## Modigliani-Miller Theorem (1958, 1963)

The tax shield (`D/V × Kₐ × T`) reflects MM Proposition I with taxes — debt financing creates value via interest tax deductibility. However, this is offset by financial distress costs (trade-off theory).

## Component Estimation

### Cost of Debt (Kₐ)

For companies with traded bonds:
```
Kₐ = YTM on longest-maturity bond (or synthetic rating)
```

For companies without bonds:
```
Kₐ = Rf + default spread (by rating or interest coverage ratio)
```

**Default spread by S&P rating (Damodaran, 2026):**

| Rating | Spread |
|--------|--------|
| AAA | 0.65% |
| AA | 0.85% |
| A | 1.10% |
| BBB | 1.60% |
| BB | 3.00% |
| B | 4.50% |
| CCC+ | 7.50% |
| CC | 10.00% |
| C | 13.00% |

### Debt-to-Equity Weights

Use **market value** of equity (price × shares outstanding), not book value. Debt can be book value if market value is unavailable (bond prices not always observable).

## Country Risk Adjustment

For non-US companies, add a country risk premium (CRP):

```
WACC (emerging market) = WACC (US) + CRP
```

CRP = Country Default Spread × (σₑ / σₔ)

See [[Quick-Reference/constants]] for current country risk premiums.

## EquiValue Implementation

In our codebase, WACC is computed in `valuationUtils.ts`:

```typescript
function computeWACC(
  marketCap: number,
  totalDebt: number,
  costOfEquity: number,
  costOfDebt: number,
  taxRate: number
): number {
  const E = marketCap;
  const D = totalDebt;
  const V = E + D;
  return (E / V) * costOfEquity + (D / V) * costOfDebt * (1 - taxRate);
}
```

## Academic References

- Modigliani, F. & Miller, M. (1958). "The Cost of Capital, Corporation Finance and the Theory of Investment." *American Economic Review*
- Modigliani, F. & Miller, M. (1963). "Corporate Income Taxes and the Cost of Capital." *American Economic Review*
- Damodaran, A. (2012). "Investment Valuation." 3rd ed., Ch. 7-8
- Koller, T., Goedhart, M. & Wessels, D. (2020). "Valuation: Measuring and Managing the Value of Companies." 7th ed., McKinsey & Co.

## Related

- [[Valuation-Core/capm-model]] — how Kₑ is derived
- [[Valuation-Core/dcf-implementation]] — WACC as the discount rate
- [[Quick-Reference/constants]] — current risk-free rate (Rf) and ERP defaults
