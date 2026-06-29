# Institutional Overview — 10 Valuation Methods

## Methodology

| # | Method | Formula (Simplified) | Best For | Who Uses It |
|---|--------|---------------------|----------|-------------|
| 1 | **DCF** | Σ FCFₜ/(1+WACC)ᵗ + TV/(1+WACC)ⁿ | Mature cash-flow-positive firms | ✅ All: IB, PE, Buyside |
| 2 | **Trading Comps** | EV = EBITDA × Industry Multiple | Quick public comp check | ✅ IB, ER, HF |
| 3 | **Precedent Transactions** | EV = EBITDA × M&A Multiple | M&A target pricing | ✅ IB, PE |
| 4 | **DDM (Dividend Discount)** | Σ Dₜ/(1+Kₑ)ᵗ | Banks, utilities, stable dividend payers | ✅ ER, AM |
| 5 | **LBO** | IRR ≥ hurdle → max entry price | Leveraged buyout targets | ✅ PE, IB |
| 6 | **SOTP** | Σ(RBV of each segment) | Conglomerates, holding companies | ✅ ER, IB |
| 7 | **Asset-Based** | Fair Value of Assets − Liabilities | Distressed, liquidation, NAV | ✅ PE, Distressed HF |
| 8 | **EVA (Economic Value Added)** | IC + Σ EVAₜ/(1+WACC)ᵗ | Capital-intensive value creation | ✅ Consulting, Buyside |
| 9 | **RIV (Residual Income)** | BV₀ + Σ RIₜ/(1+Kₑ)ᵗ | Banks, insurance (clean surplus) | ✅ ER, Academia |
| 10 | **Venture Capital** | Exit Value / (Target RoI) | Pre-revenue/pre-profit startups | ✅ VC, Angels |

## Institution Usage Summary

| Type | Primary Method | Secondary | Rarely |
|------|---------------|-----------|--------|
| **Investment Banking (IB)** | Trading Comps, Precedent Transactions | DCF | DDM, RIV |
| **Private Equity (PE)** | LBO, DCF | Precedent Transactions | DDM |
| **Equity Research (ER)** | DCF, Trading Comps | SOTP, DDM | LBO |
| **Asset Management (AM)** | DDM, DCF | Comps | LBO, VC |
| **Hedge Funds (HF)** | DCF, EVA | Asset-Based, SOTP | VC |
| **Venture Capital (VC)** | VC Method | DCF (stage-dependent) | LBO, DDM |
| **Consulting** | EVA, DCF | Comps | LBO |

## EquiValue Focus

EquiValue currently implements:
- **DCF** (primary — see [[Valuation-Core/dcf-implementation]])
- **Trading Comps** (planned — see [[Market-Benchmarks/trading-comps]])

Planned additions:
- DDM (for banks/utilities)
- SOTP (for conglomerates)
- Asset-Based (for distressed)

## Academic References

- Dodd & Graham — Security Analysis (original value investing)
- Damodaran, A. — "The Dark Side of Valuation" (distressed/young companies)
- McKinsey — "Valuation" 7th ed. (most comprehensive DCF guide)

## Related

- [[Research-Methods/dcf-vs-comps]] — intrinsic vs. relative comparison
- [[Research-Methods/lbo-and-sotp]] — LBO, SOTP, Asset-Based deep dive
- [[Research-Methods/football-field]] — visualization of multiple methods
