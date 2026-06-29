# Terminal Value

## The Critical Question

Terminal Value (TV) typically represents **60-80%** of total Enterprise Value in a DCF. Getting it right is the most important — and most error-prone — part of the analysis.

## Method 1: Gordon Growth Model (Perpetuity)

```
TV = FCFₙ × (1 + g) / (WACC − g)
```

Where:
- **FCFₙ** = Free Cash Flow in the last projected year
- **g** = Perpetual growth rate (terminal growth rate)
- **WACC** = Discount rate (must be > g)

**Constraint:** `g ≤ nominal GDP growth rate` (typically 2-3% for mature economies). Never use g > 3% for a US company — a company cannot grow faster than the economy forever.

**Current default:** g = 2.50% (long-term US GDP growth estimate)

## Method 2: Exit Multiple

```
TV = EBITDAₙ × Industry Multiple
```

Where:
- **EBITDAₙ** = Projected EBITDA in final year
- **Multiple** = Industry-average EV/EBITDA (see [[Market-Benchmarks/sector-ev-ebitda]])

**Example:** If a software company's EBITDA in year 5 is $100M and sector EV/EBITDA is 25×:
```
TV = 100 × 25 = $2,500M
```

## EquiValue Choice

We use **Gordon Growth Model** as primary (more transparent, less market-dependent). The terminal growth rate is currently hardcoded at **2.50%**.

## TV Dominance Warning

If `TV / Enterprise Value > 80%`, the DCF is effectively a terminal value argument, not a cash flow argument. The model should:
1. Display a warning flag
2. Suggest a longer projection period
3. Cross-check with multiples (see [[Market-Benchmarks/trading-comps]])

## Sensitivity

```
TV(2.50%, 8%) = FCF₆ / (0.08 − 0.025) = FCF₆ / 0.055
TV(2.50%, 9%) = FCF₆ / (0.09 − 0.025) = FCF₆ / 0.065
```

**Result:** A 1% change in WACC → ~18% change in TV. See [[Valuation-Core/sensitivity-analysis]] for the full matrix.

## Academic References

- Gordon, M.J. (1962). "The Investment, Financing, and Valuation of the Corporation." — Origin of the Gordon Growth Model
- Koller et al. (2020). "Valuation." McKinsey, Ch. 5 — "The terminal value is often the largest component of DCF value"

## Related

- [[Valuation-Core/dcf-implementation]] — where TV integrates into the DCF
- [[Valuation-Core/sensitivity-analysis]] — TV sensitivity matrix
- [[Market-Benchmarks/sector-ev-ebitda]] — sector multiples for exit method
