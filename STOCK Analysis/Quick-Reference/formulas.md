# Formulas — Quick Reference

## Valuation

### DCF (Enterprise Value)

```
EV = Σᵗ₌₁ⁿ FCFₜ/(1+WACC)ᵗ + TV/(1+WACC)ⁿ
```

### Gordon Growth Terminal Value

```
TV = FCFₙ × (1+g) / (WACC − g)
```

### Equity Value Per Share

```
Fair Value = (EV − Total Debt + Cash) / Shares Outstanding
```

## Cost of Capital

### WACC

```
WACC = (E/V) × Kₑ + (D/V) × Kₐ × (1−T)
```

### CAPM (Cost of Equity)

```
Kₑ = Rf + β × ERP
```

### Unlever → Relever Beta

```
βₗ = βᵤ × [1 + (D/E) × (1−T)]
```

### Cost of Debt

```
Kₐ = Rf + Default Spread  (or YTM on bonds)
```

## Financial Health

### Altman Z-Score (Public Mfg)

```
Z = 1.2X₁ + 1.4X₂ + 3.3X₃ + 0.6X₄ + 1.0X₅
  X₁ = Working Capital / Total Assets
  X₂ = Retained Earnings / Total Assets
  X₃ = EBIT / Total Assets
  X₄ = Market Cap / Total Liabilities
  X₅ = Revenue / Total Assets
```

### Altman Z' (Private Mfg)

```
Z' = 0.717X₁ + 0.847X₂ + 3.107X₃ + 0.420X₄' + 0.998X₅
```

### Altman Z'' (Emerging Markets)

```
Z'' = 3.25 + 6.56X₁ + 3.26X₂ + 6.72X₃ + 1.05X₄'
```

### Piotroski F-Score

```
F = Σ(criteria 1-9)
  Each criterion = 1 (pass) or 0 (fail)
  Range: 0-9
  Strong ≥ 7, Weak ≤ 3
```

### Free Cash Flow (FCFF)

```
FCF = OperatingCF − CapEx
     = EBIT × (1−T) + D&A − CapEx − ΔWC
```

## Market Multiples

### Enterprise Value

```
EV = Market Cap + Total Debt − Cash & Equivalents
```

### Implied Value from Comps

```
Implied EV = Target Metric × Median Peer Multiple
Implied Equity Value = Implied EV − Net Debt
Implied Price = Implied Equity Value / Shares Outstanding
```

## Ratios

```
P/E      = Price / EPS(ttm)
P/BV     = Price / Book Value Per Share
EV/EBITDA = Enterprise Value / EBITDA
ROA      = Net Income / Total Assets
ROE      = Net Income / Shareholders' Equity
Debt/Equity = Total Debt / Total Equity
Current Ratio = Current Assets / Current Liabilities
Asset Turnover = Revenue / Total Assets
Gross Margin = (Revenue − COGS) / Revenue
Net Margin = Net Income / Revenue
```

## Related

- [[Quick-Reference/constants]] — default values for formulas
- [[Quick-Reference/glossary]] — definitions of key terms
- [[Quick-Reference/_index]] — back to hub
