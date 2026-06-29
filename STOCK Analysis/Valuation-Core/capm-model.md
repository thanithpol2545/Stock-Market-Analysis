# CAPM Model

## Formula

```
Kₑ = Rf + β × ERP
```

Where:
- **Kₑ** = Expected return on equity (cost of equity)
- **Rf** = Risk-free rate (typically 10-year US Treasury yield)
- **β** = Beta (systematic risk measure)
- **ERP** = Equity Risk Premium (also called MRP — Market Risk Premium)

## Sharpe-Lintner-Mossin (1964-1966)

The CAPM was independently developed by:
- **William Sharpe** (1964) — "Capital Asset Prices: A Theory of Market Equilibrium Under Conditions of Risk"
- **John Lintner** (1965) — "The Valuation of Risk Assets and the Selection of Risky Investments"
- **Jan Mossin** (1966) — "Equilibrium in a Capital Asset Market"

All three derived the same core insight: only **systematic risk** (non-diversifiable) is priced. Idiosyncratic risk can be diversified away.

## Risk-Free Rate (Rf)

| Currency | Proxy Instrument | Current (2026) |
|----------|-----------------|-----------------|
| USD | 10-year US Treasury | 4.50% |
| EUR | 10-year German Bund | 2.80% |
| GBP | 10-year UK Gilt | 4.20% |
| THB | 10-year Thai Government Bond | 3.60% |

**Principle:** Use the government bond that matches the **currency** of the cash flows, not the company's HQ location.

## Beta (β)

Beta measures co-movement with the market:

```
β = Cov(Rᵢ, Rₘ) / Var(Rₘ)
```

**Types:**
- **Historical β** (5-year monthly returns) — backward-looking, default
- **Adjusted β** (Blenheim/Merrill) — 2/3 historical + 1/3 market average (1.0)
- **Bottom-up β** (Damodaran) — industry-average unlevered β, re-levered for target D/E

### Unlever → Relever

```
βₗ = βᵤ × [1 + (D/E) × (1 − T)]
```

Used to compute a "pure-play" beta from comparable firms. See [[Market-Benchmarks/trading-comps]] for the comps process.

## Equity Risk Premium (ERP)

ERP = Expected market return − Risk-free rate

**Damodaran (Jan 2026) estimates:**
- US ERP: **4.94%** (implied from S&P 500)
- Global ERP: **5.20%** (blended)
- ERP is higher for non-US markets (country risk)

### Implied vs. Historical ERP

- **Historical ERP** (1928-2025): ~6-7% arithmetic average
- **Implied ERP** (forward-looking): ~4.5-5.5% (currently used by EquiValue)

**Recommendation:** Use Damodaran's implied ERP (updated annually) as the default. Let advanced users override.

## EquiValue Implementation

```typescript
function computeCostOfEquity(
  riskFreeRate: number,
  beta: number,
  equityRiskPremium: number
): number {
  return riskFreeRate + beta * equityRiskPremium;
}
```

Defaults (see [[Quick-Reference/constants]]):
- Rf: 4.50% (10Y US Treasury)
- ERP: 4.94% (Damodaran 2026)
- β: 1.0 (fallback when no data)

## Related

- [[Valuation-Core/wacc-theory]] — CAPM feeds Kₑ into WACC
- [[Valuation-Core/dcf-implementation]] — Kₑ is part of discount rate
- [[Quick-Reference/constants]] — current Rf, ERP values
- [[Implementation/typescript-types]] — ValuationInputs type definition
